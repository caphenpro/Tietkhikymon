import { ComprehensiveResult, NewMoonInfo, SolarTermEvent } from '../types';
import {
  formatDegreeToDMS,
  formatTimedeltaHMS,
  formatVietnamDateTime,
  SOLAR_TERMS,
  TIET_KHI_CUNG_MAP,
} from './solarTerms';
import {
  findExactNewMoonTime,
  findExactSolarTermTime,
  getMoonSunDiff,
  getSunEclipticLongitude,
} from './sunMoon';
import { tinhBatTu, getLocalComponents } from './canChi';
import { getNextSolarTermEvent, getRealSolarTermEvent, luanCucKyMonSieuThan } from './kyMon';

/**
 * Tìm điểm Sóc trước đó (Mùng 1 tháng hiện tại) và điểm Sóc tiếp theo (Mùng 1 tháng sau)
 */
export function getNewMoonInfo(date: Date): NewMoonInfo {
  // Tìm điểm Sóc trước đó trong vòng 35 ngày trước
  const startSearchPrev = new Date(date.getTime() - 35 * 86400 * 1000);
  let socAPrev: Date | null = null;

  // Quét theo bước 6 giờ để tìm đoạn đổi dấu (d1 > 180 và d2 < 180)
  let tCheck = new Date(date.getTime());
  const stepMs = 6 * 3600 * 1000;

  while (tCheck.getTime() > startSearchPrev.getTime()) {
    const tPrev = new Date(tCheck.getTime() - stepMs);
    const d1 = getMoonSunDiff(tPrev);
    const d2 = getMoonSunDiff(tCheck);

    if (d1 > 180 && d2 < 180) {
      socAPrev = findExactNewMoonTime(tPrev, tCheck, 500);
      break;
    }
    tCheck = tPrev;
  }

  // Nếu không tìm thấy bằng quét ngược, tìm quét xuôi
  if (!socAPrev) {
    let t = new Date(startSearchPrev.getTime());
    while (t.getTime() < date.getTime()) {
      const tNext = new Date(t.getTime() + stepMs);
      const d1 = getMoonSunDiff(t);
      const d2 = getMoonSunDiff(tNext);
      if (d1 > 180 && d2 < 180) {
        socAPrev = findExactNewMoonTime(t, tNext, 500);
        break;
      }
      t = tNext;
    }
  }

  // Điểm Sóc tiếp theo
  let socBNext: Date | null = null;
  const searchStartB = socAPrev ? new Date(socAPrev.getTime() + 20 * 86400 * 1000) : new Date(date.getTime());
  const searchEndB = new Date(searchStartB.getTime() + 16 * 86400 * 1000);

  let tCheckB = new Date(searchStartB.getTime());
  while (tCheckB.getTime() < searchEndB.getTime()) {
    const tNext = new Date(Math.min(tCheckB.getTime() + stepMs, searchEndB.getTime()));
    const d1 = getMoonSunDiff(tCheckB);
    const d2 = getMoonSunDiff(tNext);
    if (d1 > 180 && d2 < 180) {
      socBNext = findExactNewMoonTime(tCheckB, tNext, 500);
      break;
    }
    tCheckB = tNext;
  }

  const prevSocDate = socAPrev || new Date(date.getTime() - 15 * 86400 * 1000);
  const nextSocDate = socBNext || new Date(date.getTime() + 15 * 86400 * 1000);

  // Tính ngày âm lịch theo lịch Việt Nam (UTC+7)
  const locSelected = getLocalComponents(date);
  const locPrevSoc = getLocalComponents(prevSocDate);
  const locNextSoc = getLocalComponents(nextSocDate);

  const utcDaySelected = Date.UTC(locSelected.year, locSelected.month - 1, locSelected.day);
  const utcDayPrevSoc = Date.UTC(locPrevSoc.year, locPrevSoc.month - 1, locPrevSoc.day);
  const utcDayNextSoc = Date.UTC(locNextSoc.year, locNextSoc.month - 1, locNextSoc.day);

  const lunarDay = Math.floor((utcDaySelected - utcDayPrevSoc) / 86400000) + 1;
  const totalMonthDays = Math.floor((utcDayNextSoc - utcDayPrevSoc) / 86400000);

  const passedMs = date.getTime() - prevSocDate.getTime();
  const remainingMs = nextSocDate.getTime() - date.getTime();

  return {
    prevSocDate,
    prevPassedString: formatTimedeltaHMS(passedMs),
    prevPassedDays: passedMs / 86400000,
    nextSocDate,
    nextRemainingString: formatTimedeltaHMS(remainingMs),
    nextRemainingDays: remainingMs / 86400000,
    lunarDay: Math.max(1, Math.min(lunarDay, 30)),
    totalMonthDays: totalMonthDays >= 28 && totalMonthDays <= 31 ? totalMonthDays : 30,
    monthType: totalMonthDays === 30 ? 'Tháng đủ' : 'Tháng thiếu',
  };
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
  const newMoon = getNewMoonInfo(date);
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

  md += `## 2. THÔNG TIN ĐIỂM SÓC (TRĂNG MỚI)\n`;
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

  return md;
}
