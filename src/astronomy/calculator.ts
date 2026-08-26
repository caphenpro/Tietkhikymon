import { ComprehensiveResult, NewMoonInfo, SolarTermEvent } from '../types';
import {
  formatDegreeToDMS,
  formatTimedeltaHMS,
  formatVietnamDateTime,
  SOLAR_TERMS,
  TIET_KHI_CUNG_MAP,
} from './solarTerms';
import {
  findExactSolarTermTime,
  getSunEclipticLongitude,
} from './sunMoon';
import { tinhBatTu } from './canChi';
import { getNextSolarTermEvent, getRealSolarTermEvent, luanCucKyMonSieuThan } from './kyMon';
import { getAstronomicalLunarDate } from './lunarCalendar';

/**
 * Lấy thông tin Âm lịch & Điểm Sóc chi tiết theo thuật toán thiên văn
 */
export function getNewMoonInfo(date: Date): NewMoonInfo {
  return getAstronomicalLunarDate(date);
}

/**
 * Tính toán toàn bộ thông tin chi tiết cho một thời điểm bất kỳ
 */
export function calculateComprehensiveResult(date: Date): ComprehensiveResult {
  const currentTermEvent = getRealSolarTermEvent(date);
  const nextTermEvent = getNextSolarTermEvent(date);

  const lonNow = currentTermEvent.lonNow;
  const lonDms = formatDegreeToDMS(lonNow);

  const termPassedMs = date.getTime() - currentTermEvent.exactDate.getTime();
  const termRemainingMs = nextTermEvent.exactNextDate.getTime() - date.getTime();

  const batTu = tinhBatTu(date, lonNow);
  const newMoon = getAstronomicalLunarDate(date);
  const kyMon = luanCucKyMonSieuThan(date);

  const currentCung = TIET_KHI_CUNG_MAP[currentTermEvent.termName] || { cungName: 'Khác', cungNumber: 0 };
  const nextCung = TIET_KHI_CUNG_MAP[nextTermEvent.nextTermName] || { cungName: 'Khác', cungNumber: 0 };

  return {
    calculationTime: date,
    solarLongitude: lonNow,
    solarLongitudeDMS: lonDms,
    currentTerm: {
      name: currentTermEvent.termName,
      degree: currentTermEvent.targetDegree,
      category: currentTermEvent.termCategory,
      startDate: currentTermEvent.exactDate,
      passedString: formatTimedeltaHMS(termPassedMs),
      passedSeconds: Math.floor(termPassedMs / 1000),
      cungName: currentCung.cungName,
      cungNumber: currentCung.cungNumber,
    },
    nextTerm: {
      name: nextTermEvent.nextTermName,
      degree: nextTermEvent.nextDegree,
      category: nextTermEvent.nextCategory,
      startDate: nextTermEvent.exactNextDate,
      remainingString: formatTimedeltaHMS(termRemainingMs),
      remainingSeconds: Math.floor(termRemainingMs / 1000),
      cungName: nextCung.cungName,
      cungNumber: nextCung.cungNumber,
    },
    batTu,
    newMoon,
    kyMon,
  };
}

/**
 * Tính toán danh sách 24 Tiết Khí trọn vẹn cho 1 năm dương lịch
 */
export function calculateSolarTermsForYear(year: number): SolarTermEvent[] {
  // Tạo mốc bắt đầu và kết thúc năm theo UTC (hoặc UTC+7)
  const startUtc = new Date(Date.UTC(year, 0, 1, 0, 0, 0) - 7 * 3600 * 1000);
  const endUtc = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0) - 7 * 3600 * 1000);

  const results: SolarTermEvent[] = [];
  let currentDt = new Date(startUtc.getTime());
  const oneDayMs = 24 * 3600 * 1000;

  while (currentDt.getTime() < endUtc.getTime()) {
    const nextDt = new Date(Math.min(currentDt.getTime() + oneDayMs, endUtc.getTime()));
    const lon1 = getSunEclipticLongitude(currentDt);
    const lon2 = getSunEclipticLongitude(nextDt);

    for (const term of SOLAR_TERMS) {
      let diff1 = (lon1 - term.degree) % 360;
      if (diff1 < 0) diff1 += 360;
      let diff2 = (lon2 - term.degree) % 360;
      if (diff2 < 0) diff2 += 360;

      if (diff1 > 180 && diff2 < 180) {
        const exactDate = findExactSolarTermTime(term.degree, currentDt, nextDt, 500);
        const cungInfo = TIET_KHI_CUNG_MAP[term.name] || { cungName: '-', cungNumber: 0, direction: '-' };

        results.push({
          name: term.name,
          degree: term.degree,
          category: term.category,
          exactDate,
          cungName: cungInfo.cungName,
          cungNumber: cungInfo.cungNumber,
          direction: cungInfo.direction,
        });
      }
    }

    currentDt = nextDt;
  }

  // Sắp xếp theo thời gian chuyển tiết tăng dần
  results.sort((a, b) => a.exactDate.getTime() - b.exactDate.getTime());
  return results;
}

/**
 * Xuất dữ liệu ra file Markdown theo đúng chuẩn của file Python script
 */
export function generateMarkdownExport(
  year: number,
  selected: ComprehensiveResult,
  yearTerms: SolarTermEvent[]
): string {
  const dateStr = formatVietnamDateTime(selected.calculationTime);
  const termStartStr = formatVietnamDateTime(selected.currentTerm.startDate);

  let md = `# BẢNG DỮ LIỆU TIẾT KHÍ NĂM ${year}\n\n`;
  md += `- **Thời điểm kiểm tra**: ${dateStr} (Giờ Việt Nam UTC+7)\n`;
  md += `- **Kinh độ Mặt Trời**: ${selected.solarLongitudeDMS} (${selected.solarLongitude.toFixed(6)}°)\n`;
  md += `- **Âm lịch**: Ngày ${selected.newMoon.lunarDay} / ${selected.newMoon.totalMonthDays} ngày (${selected.newMoon.monthType})\n`;
  md += `- **Bát Tự**: ${selected.batTu.fullText}\n\n`;

  md += `## 1. THÔNG TIN TIẾT KHÍ THIÊN VĂN THỰC TẾ\n`;
  md += `- **Tên gọi**: ${selected.currentTerm.name} (${selected.currentTerm.degree}°)\n`;
  md += `- **Phân loại**: ${selected.currentTerm.category === 'Tiết' ? 'Tiết (Tiết lệnh)' : 'Khí (Trung khí)'}\n`;
  md += `- **Thời điểm bắt đầu**: ${termStartStr}\n`;
  md += `- **Đã trôi qua**: ${selected.currentTerm.passedString}\n`;
  md += `- **Còn lại đến ${selected.nextTerm.name}**: ${selected.nextTerm.remainingString}\n\n`;

  md += `## 2. THÔNG TIN ÂM LỊCH & ĐIỂM SÓC (TRĂNG MỚI)\n`;
  md += `- **Ngày Âm Lịch**: ${selected.newMoon.lunarFullDateText}\n`;
  md += `- **Tháng Âm Lịch**: ${selected.newMoon.fullMonthDisplay} (${selected.newMoon.monthType})\n`;
  md += `- **Quy tắc xác định**: ${selected.newMoon.monthRuleExplanation}\n`;
  md += `- **Tiết & Khí trong tháng**: Tiết [${selected.newMoon.tiets.join(', ') || 'Không có'}], Khí [${selected.newMoon.khis.join(', ') || 'Không có'}]\n`;
  md += `- **Điểm Sóc trước đó (Mùng 1)**: ${formatVietnamDateTime(selected.newMoon.prevSocDate)} (Cách đây: ${selected.newMoon.prevPassedString})\n`;
  md += `- **Điểm Sóc tiếp theo (Mùng 1 tháng sau)**: ${formatVietnamDateTime(selected.newMoon.nextSocDate)} (Còn lại: ${selected.newMoon.nextRemainingString})\n\n`;

  md += `## 3. LUẬN CỤC KỲ MÔN ĐỘN GIÁP (SIÊU THẦN TIẾP KHÍ)\n\`\`\`\n${selected.kyMon.fullAnalysisText}\n\`\`\`\n\n`;

  md += `## 4. DANH SÁCH 24 TIẾT KHÍ NĂM ${year}\n\n`;
  md += `| STT | Tên | Phân Loại | Cung Bát Quái | Kinh Độ | Thời Điểm Chuyển Tiết (UTC+7) |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  yearTerms.forEach((term, idx) => {
    const formatted = formatVietnamDateTime(term.exactDate);
    const cungDisplay = `${term.cungName} (${term.cungNumber})`;
    md += `| ${idx + 1} | ${term.name} | ${term.category} | ${cungDisplay} | ${term.degree}° | ${formatted} |\n`;
  });

  md += `\n---\n*Dữ liệu được xuất từ hệ thống **Tiết Khí & Kỳ Môn Độn Giáp v2.4.0** (Jean Meeus Astronomical Engine).*\n`;

  return md;
}
