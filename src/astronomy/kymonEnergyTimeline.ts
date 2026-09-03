import { luanCucKyMonSieuThan } from './kyMon';
import { tinhCanChiNgay, tinhCanChiGio, getLocalComponents, CAN, CHI } from './canChi';
import { buildCompleteKyMonChart, CompleteKyMonChart, PalaceData } from './kymonChart';
import { evaluateKyMonTimeMoment, PalaceEvaluation, KyMonEvaluationResult } from './kymonEvaluation';
import { getSunEclipticLongitude } from './sunMoon';
import { SOLAR_TERMS } from './solarTerms';

export interface HourEnergyDataPoint {
  hourIndex: number; // 0..11 (Tý..Hợi)
  chiGio: string; // 'Tý', 'Sửu'...
  timeRange: string; // '23:00 - 01:00', '01:00 - 03:00'...
  hourCanChi: string; // 'Giáp Tý'...
  date: Date;
  isCurrentHour: boolean;
  totalScore: number; // 0..100
  stars: number; // 1.0..5.0
  level: string; // 'Đại Cát', 'Tiểu Cát'...
  
  // Palace scores
  Kham1: number;
  Khon2: number;
  Chan3: number;
  Ton4: number;
  Trung5: number;
  Can6: number;
  Doai7: number;
  Can8: number;
  Ly9: number;

  bestPalace: {
    num: number;
    name: string;
    direction: string;
    score: number;
    door: string;
    star: string;
    god: string;
  };
  worstPalace: {
    num: number;
    name: string;
    direction: string;
    score: number;
  };

  trucPhuPalace: number;
  trucSuPalace: number;
  trucPhuName: string;
  trucSuDoor: string;
  
  specialFormationsCount: number;
  isPhucNgam: boolean;
  isPhanNgam: boolean;
}

export interface DayEnergyDataPoint {
  dayIndex: number; // 1..30
  solarDate: Date;
  solarDateStr: string;
  dayCanChi: string;
  isCurrentDay: boolean;
  cucName: string; // 'Dương Độn 1 Cục'...
  cucNumber: number;
  isDuongDon: boolean;
  nguyen: string; // 'Thượng Nguyên', 'Trung Nguyên', 'Hạ Nguyên'
  termName: string;
  averageScore: number;
  peakHourScore: number;
  peakHourName: string;
  bestDirection: string;
}

export interface RadarPalaceDataPoint {
  palaceNum: number;
  palaceName: string;
  fullLabel: string; // 'Khảm 1 (Bắc)'
  direction: string;
  element: string;
  score: number;
  heavenStem: string;
  earthStem: string;
  star: string;
  door: string;
  god: string;
  level: string;
  isTrucPhu: boolean;
  isTrucSu: boolean;
}

export interface ElementBalanceDataPoint {
  element: string; // 'Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'
  score: number;
  percentage: number;
  palaceCount: number;
  color: string;
  description: string;
}

export interface KyMonEnergyAnalysis {
  currentChart: CompleteKyMonChart;
  currentEvaluation: KyMonEvaluationResult;
  hourTimeline: HourEnergyDataPoint[];
  monthTimeline: DayEnergyDataPoint[];
  radarPalaces: RadarPalaceDataPoint[];
  elementBalance: ElementBalanceDataPoint[];
  
  // High-level insights
  bestHourOfDay: HourEnergyDataPoint;
  worstHourOfDay: HourEnergyDataPoint;
  topPalaceCurrent: RadarPalaceDataPoint;
  cucTransitionInfo: {
    currentTerm: string;
    currentNguyen: string;
    currentCuc: string;
    isDuongDon: boolean;
    daysFromPhuDau: number;
    daysUntilNextNguyen: number;
  };
}

const HOUR_RANGES = [
  '23:00 - 01:00',
  '01:00 - 03:00',
  '03:00 - 05:00',
  '05:00 - 07:00',
  '07:00 - 09:00',
  '09:00 - 11:00',
  '11:00 - 13:00',
  '13:00 - 15:00',
  '15:00 - 17:00',
  '17:00 - 19:00',
  '19:00 - 21:00',
  '21:00 - 23:00',
];

const PALACE_NAMES_SHORT: Record<number, { name: string; dir: string; elem: string }> = {
  1: { name: 'Khảm', dir: 'Bắc', elem: 'Thủy' },
  2: { name: 'Khôn', dir: 'Tây Nam', elem: 'Thổ' },
  3: { name: 'Chấn', dir: 'Đông', elem: 'Mộc' },
  4: { name: 'Tốn', dir: 'Đông Nam', elem: 'Mộc' },
  5: { name: 'Trung', dir: 'Trung Cung', elem: 'Thổ' },
  6: { name: 'Càn', dir: 'Tây Bắc', elem: 'Kim' },
  7: { name: 'Đoài', dir: 'Tây', elem: 'Kim' },
  8: { name: 'Cấn', dir: 'Đông Bắc', elem: 'Thổ' },
  9: { name: 'Ly', dir: 'Nam', elem: 'Hỏa' },
};

/**
 * Phân tích toàn diện chuỗi năng lượng Kỳ Môn Độn Giáp theo thời gian (12 giờ, 30 ngày, Radar, Ngũ Hành)
 */
export function analyzeKyMonEnergyTimeline(baseDate: Date): KyMonEnergyAnalysis {
  const local = getLocalComponents(baseDate);
  const currentHourIdx = Math.floor(((local.hour + 1) % 24) / 2);

  // 1. Phân tích Cục cơ bản của ngày hiện tại
  const kyMonInfo = luanCucKyMonSieuThan(baseDate);
  const [dayCycleIdx, dayCanChi] = tinhCanChiNgay(baseDate);
  const daysFromPhuDau = dayCycleIdx % 5;
  const daysUntilNextNguyen = 5 - daysFromPhuDau;

  // 2. Tính toán chuỗi 12 Canh Giờ trong ngày (Tý -> Hợi)
  const hourTimeline: HourEnergyDataPoint[] = [];

  // Mốc giờ trung tâm của từng canh giờ:
  // Tý: 00:00 (hoặc 23:30 hôm trước), Sửu: 02:00, Dần: 04:00, Mão: 06:00, Thìn: 08:00, Tị: 10:00,
  // Ngọ: 12:00, Mùi: 14:00, Thân: 16:00, Dậu: 18:00, Tuất: 20:00, Hợi: 22:00
  const hourOffsets = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

  let bestHourOfDay: HourEnergyDataPoint | null = null;
  let worstHourOfDay: HourEnergyDataPoint | null = null;

  const [dCan, dChi] = dayCanChi.split(' ');

  for (let i = 0; i < 12; i++) {
    const hourVal = hourOffsets[i];
    const hourDate = new Date(Date.UTC(local.year, local.month - 1, local.day, hourVal, 0, 0) - 7 * 3600 * 1000);
    const hourCanChi = tinhCanChiGio(hourDate, dayCycleIdx % 10);
    const [hCan, hChi] = hourCanChi.split(' ');
    
    // Xây dựng đồ bàn Kỳ Môn cho giờ này
    const chart = buildCompleteKyMonChart(
      kyMonInfo.isDuongDon,
      kyMonInfo.cucNumber,
      dCan || 'Giáp',
      dChi || 'Tý',
      hCan || 'Giáp',
      hChi || 'Tý'
    );

    const evaluation = evaluateKyMonTimeMoment(chart);

    // Lấy điểm số từng cung
    const getPScore = (pNum: number) => evaluation.palaceEvaluations[pNum]?.score ?? 50;

    // Tìm cung tốt nhất & xấu nhất
    let bPalace = { num: 1, name: 'Khảm', direction: 'Bắc', score: 0, door: '', star: '', god: '' };
    let wPalace = { num: 1, name: 'Khảm', direction: 'Bắc', score: 100 };

    for (let p = 1; p <= 9; p++) {
      if (p === 5) continue; // Bỏ qua Trung Cung khi xét 8 phương
      const sc = getPScore(p);
      const pal = chart.palaces[p];
      if (sc > bPalace.score) {
        bPalace = {
          num: p,
          name: pal?.palaceName || `Cung ${p}`,
          direction: pal?.direction || '',
          score: sc,
          door: pal?.door || '',
          star: pal?.heavenStar || '',
          god: pal?.god || '',
        };
      }
      if (sc < wPalace.score) {
        wPalace = {
          num: p,
          name: pal?.palaceName || `Cung ${p}`,
          direction: pal?.direction || '',
          score: sc,
        };
      }
    }

    const point: HourEnergyDataPoint = {
      hourIndex: i,
      chiGio: CHI[i],
      timeRange: HOUR_RANGES[i],
      hourCanChi,
      date: hourDate,
      isCurrentHour: i === currentHourIdx,
      totalScore: evaluation.score,
      stars: evaluation.stars,
      level: evaluation.level,

      Kham1: getPScore(1),
      Khon2: getPScore(2),
      Chan3: getPScore(3),
      Ton4: getPScore(4),
      Trung5: getPScore(5),
      Can6: getPScore(6),
      Doai7: getPScore(7),
      Can8: getPScore(8),
      Ly9: getPScore(9),

      bestPalace: bPalace,
      worstPalace: wPalace,
      trucPhuPalace: chart.trucPhuNewPalace,
      trucSuPalace: chart.trucSuNewPalace,
      trucPhuName: chart.trucPhuStar,
      trucSuDoor: chart.trucSuDoor,

      specialFormationsCount: chart.specialFormations.length,
      isPhucNgam: chart.specialFormations.some((f) => f.includes('Phục Ngâm')),
      isPhanNgam: chart.specialFormations.some((f) => f.includes('Phản Ngâm')),
    };

    hourTimeline.push(point);

    if (!bestHourOfDay || point.totalScore > bestHourOfDay.totalScore) {
      bestHourOfDay = point;
    }
    if (!worstHourOfDay || point.totalScore < worstHourOfDay.totalScore) {
      worstHourOfDay = point;
    }
  }

  // 3. Đồ bàn và đánh giá tại mốc giờ hiện tại
  const currentHourCanChi = tinhCanChiGio(baseDate, dayCycleIdx % 10);
  const [curHCan, curHChi] = currentHourCanChi.split(' ');
  const currentChart = buildCompleteKyMonChart(
    kyMonInfo.isDuongDon,
    kyMonInfo.cucNumber,
    dCan || 'Giáp',
    dChi || 'Tý',
    curHCan || 'Giáp',
    curHChi || 'Tý'
  );
  const currentEvaluation = evaluateKyMonTimeMoment(currentChart);

  // 4. Mạng Nhện Radar 9 Cung tại thời điểm hiện tại
  const radarPalaces: RadarPalaceDataPoint[] = [];
  // Thứ tự hiển thị theo vòng phương vị Lạc Thư: Khảm (Bắc) -> Cấn (ĐB) -> Chấn (Đông) -> Tốn (ĐN) -> Ly (Nam) -> Khôn (TN) -> Đoài (Tây) -> Càn (TB) -> Trung Cung
  const radarOrder = [1, 8, 3, 4, 9, 2, 7, 6, 5];

  let topPalaceCurrent: RadarPalaceDataPoint | null = null;

  radarOrder.forEach((pNum) => {
    const pal = currentChart.palaces[pNum];
    const ev = currentEvaluation.palaceEvaluations[pNum];
    const meta = PALACE_NAMES_SHORT[pNum];
    
    if (pal && ev) {
      const rp: RadarPalaceDataPoint = {
        palaceNum: pNum,
        palaceName: meta.name,
        fullLabel: `${meta.name} ${pNum} (${meta.dir})`,
        direction: meta.dir,
        element: meta.elem,
        score: ev.score,
        heavenStem: pal.heavenStem,
        earthStem: pal.earthStem,
        star: pal.heavenStar,
        door: pal.door,
        god: pal.god,
        level: ev.level,
        isTrucPhu: pNum === currentChart.trucPhuNewPalace,
        isTrucSu: pNum === currentChart.trucSuNewPalace,
      };
      radarPalaces.push(rp);

      if (!topPalaceCurrent || (pNum !== 5 && rp.score > topPalaceCurrent.score)) {
        topPalaceCurrent = rp;
      }
    }
  });

  // 5. Cân Bằng Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ)
  const elementScores: Record<string, { totalScore: number; count: number }> = {
    Kim: { totalScore: 0, count: 0 },
    Mộc: { totalScore: 0, count: 0 },
    Thủy: { totalScore: 0, count: 0 },
    Hỏa: { totalScore: 0, count: 0 },
    Thổ: { totalScore: 0, count: 0 },
  };

  radarPalaces.forEach((rp) => {
    if (elementScores[rp.element]) {
      elementScores[rp.element].totalScore += rp.score;
      elementScores[rp.element].count += 1;
    }
  });

  const sumAllScores = Object.values(elementScores).reduce((acc, cur) => acc + cur.totalScore, 0) || 1;

  const elementDescriptions: Record<string, { color: string; desc: string }> = {
    Kim: { color: '#e2e8f0', desc: 'Chủ thu liễm, cương trực, pháp lệnh, quyết đoán' },
    Mộc: { color: '#10b981', desc: 'Chủ sinh sôi, mưu lược, phát triển, giáo dục' },
    Thủy: { color: '#06b6d4', desc: 'Chủ trí tuệ, lưu thông, quyền biến, ngoại giao' },
    Hỏa: { color: '#f43f5e', desc: 'Chủ danh tiếng, lễ nghi, văn minh, bộc phát' },
    Thổ: { color: '#f59e0b', desc: 'Chủ trung dung, bao dung, tích lũy điền sản' },
  };

  const elementBalance: ElementBalanceDataPoint[] = Object.keys(elementScores).map((elem) => {
    const raw = elementScores[elem];
    const avgScore = raw.count > 0 ? Math.round(raw.totalScore / raw.count) : 50;
    const pct = Math.round((raw.totalScore / sumAllScores) * 100);
    const meta = elementDescriptions[elem] || { color: '#94a3b8', desc: '' };

    return {
      element: elem,
      score: avgScore,
      percentage: pct,
      palaceCount: raw.count,
      color: meta.color,
      description: meta.desc,
    };
  });

  // 6. Tính toán chuỗi 30 ngày trong tháng (Xu hướng Cục & Nguyên)
  const monthTimeline: DayEnergyDataPoint[] = [];
  const daysInMonth = new Date(Date.UTC(local.year, local.month, 0)).getUTCDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(Date.UTC(local.year, local.month - 1, d, 12, 0, 0) - 7 * 3600 * 1000);
    const dKyMon = luanCucKyMonSieuThan(dDate);
    const [dCycleIdx, dCanChi] = tinhCanChiNgay(dDate);
    const [dDayCan, dDayChi] = dCanChi.split(' ');

    // Tính điểm 3 giờ đặc trưng (Tý, Ngọ, Dậu) để lấy trung bình nhanh
    const sampleHours = [0, 12, 18];
    let dayTotalScore = 0;
    let peakScore = 0;
    let peakHourName = 'Ngọ';

    sampleHours.forEach((hVal) => {
      const hDate = new Date(Date.UTC(local.year, local.month - 1, d, hVal, 0, 0) - 7 * 3600 * 1000);
      const hCanChi = tinhCanChiGio(hDate, dCycleIdx % 10);
      const [hCan, hChi] = hCanChi.split(' ');
      const c = buildCompleteKyMonChart(
        dKyMon.isDuongDon,
        dKyMon.cucNumber,
        dDayCan || 'Giáp',
        dDayChi || 'Tý',
        hCan || 'Giáp',
        hChi || 'Tý'
      );
      const ev = evaluateKyMonTimeMoment(c);
      dayTotalScore += ev.score;
      if (ev.score > peakScore) {
        peakScore = ev.score;
        peakHourName = CHI[Math.floor(((hVal + 1) % 24) / 2)];
      }
    });

    const avgScore = Math.round(dayTotalScore / sampleHours.length);

    monthTimeline.push({
      dayIndex: d,
      solarDate: dDate,
      solarDateStr: `${String(d).padStart(2, '0')}/${String(local.month).padStart(2, '0')}`,
      dayCanChi: dCanChi,
      isCurrentDay: d === local.day,
      cucName: dKyMon.cucResultText,
      cucNumber: dKyMon.cucNumber,
      isDuongDon: dKyMon.isDuongDon,
      nguyen: dKyMon.nguyen,
      termName: dKyMon.termUsed,
      averageScore: avgScore,
      peakHourScore: peakScore,
      peakHourName,
      bestDirection: avgScore >= 65 ? 'Chính Nam / Đông Nam' : 'Tây Bắc / Chính Bắc',
    });
  }

  return {
    currentChart,
    currentEvaluation,
    hourTimeline,
    monthTimeline,
    radarPalaces,
    elementBalance,
    bestHourOfDay: bestHourOfDay || hourTimeline[0],
    worstHourOfDay: worstHourOfDay || hourTimeline[0],
    topPalaceCurrent: topPalaceCurrent || radarPalaces[0],
    cucTransitionInfo: {
      currentTerm: kyMonInfo.termUsed,
      currentNguyen: kyMonInfo.nguyen,
      currentCuc: kyMonInfo.cucResultText,
      isDuongDon: kyMonInfo.isDuongDon,
      daysFromPhuDau,
      daysUntilNextNguyen,
    },
  };
}
