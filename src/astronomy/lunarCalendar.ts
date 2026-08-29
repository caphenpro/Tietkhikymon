import {
  findExactNewMoonTime,
  findExactSolarTermTime,
  getMoonSunDiff,
  getSunEclipticLongitude,
} from './sunMoon';
import { SOLAR_TERMS, formatVietnamDateTime, formatTimedeltaHMS } from './solarTerms';
import { getLocalComponents, CAN, CHI } from './canChi';
import { LunarDateInfo, LunarYearLeapInfo, LunarYearMonthSummary } from '../types';

export interface LunarMonthDetail {
  monthIndex: number; // 1..12
  monthName: string;
  isLeap: boolean;
  lunarYear: number;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  terms: { name: string; category: 'Tiết' | 'Khí'; degree: number; date: Date }[];
  tiets: string[];
  khis: string[];
}

const MONTH_NAMES: Record<number, string> = {
  1: 'Tháng Giêng (Tháng 1)',
  2: 'Tháng Hai (Tháng 2)',
  3: 'Tháng Ba (Tháng 3)',
  4: 'Tháng Tư (Tháng 4)',
  5: 'Tháng Năm (Tháng 5)',
  6: 'Tháng Sáu (Tháng 6)',
  7: 'Tháng Bảy (Tháng 7)',
  8: 'Tháng Tám (Tháng 8)',
  9: 'Tháng Chín (Tháng 9)',
  10: 'Tháng Mười (Tháng 10)',
  11: 'Tháng Mười Một (Tháng 11)',
  12: 'Tháng Chạp (Tháng 12)',
};

/**
 * Thuật toán Thiên văn Lịch Âm Dương:
 * 1. Tháng Âm lịch là khoảng cách giữa 2 điểm Sóc (Trăng mới) liên tiếp.
 * 2. Một tháng âm lịch chính quy phải có đủ cả Tiết (Tiết lệnh) và Khí (Trung khí).
 * 3. Tháng 1 (Tháng Giêng) là tháng chứa tiết Lập Xuân và trung khí Vũ Thủy (hoặc bắt đầu năm âm lịch).
 * 4. Nếu tháng âm lịch chỉ có Khí không có Tiết (hoặc thiếu cặp Tiết & Khí), tháng đó là Tháng Nhuận của tháng đó.
 */
export function getAstronomicalLunarDate(date: Date): LunarDateInfo {
  const currentUtcMs = date.getTime();

  // Search window: 600 ngày trước đến 600 ngày sau để bao phủ trọn vẹn các chu kỳ năm thiên văn
  const searchStart = new Date(currentUtcMs - 600 * 86400 * 1000);
  const searchEnd = new Date(currentUtcMs + 600 * 86400 * 1000);

  // 1. Tìm tất cả các Điểm Sóc (New Moons) trong dải tìm kiếm
  const newMoons: Date[] = [];
  let t = new Date(searchStart.getTime());
  const step = 6 * 3600 * 1000;

  while (t.getTime() < searchEnd.getTime()) {
    const tNext = new Date(t.getTime() + step);
    const d1 = getMoonSunDiff(t);
    const d2 = getMoonSunDiff(tNext);
    if (d1 > 180 && d2 < 180) {
      const nm = findExactNewMoonTime(t, tNext, 500);
      newMoons.push(nm);
    }
    t = tNext;
  }

  // 2. Tìm tất cả 24 Tiết Khí trong dải tìm kiếm
  const allTerms: { name: string; category: 'Tiết' | 'Khí'; degree: number; date: Date }[] = [];
  const startYear = searchStart.getUTCFullYear();
  const endYear = searchEnd.getUTCFullYear() + 1;

  for (let y = startYear; y <= endYear; y++) {
    const yStart = new Date(Date.UTC(y, 0, 1));
    const yEnd = new Date(Date.UTC(y + 1, 0, 1));
    let cur = yStart;
    while (cur < yEnd) {
      const next = new Date(Math.min(cur.getTime() + 86400000, yEnd.getTime()));
      const l1 = getSunEclipticLongitude(cur);
      const l2 = getSunEclipticLongitude(next);
      for (const st of SOLAR_TERMS) {
        let diff1 = (l1 - st.degree) % 360;
        if (diff1 < 0) diff1 += 360;
        let diff2 = (l2 - st.degree) % 360;
        if (diff2 < 0) diff2 += 360;
        if (diff1 > 180 && diff2 < 180) {
          const dt = findExactSolarTermTime(st.degree, cur, next, 500);
          allTerms.push({
            name: st.name,
            category: st.category as 'Tiết' | 'Khí',
            degree: st.degree,
            date: dt,
          });
        }
      }
      cur = next;
    }
  }
  allTerms.sort((a, b) => a.date.getTime() - b.date.getTime());

  // 3. Phân tách từng Tháng Âm Lịch (Khoảng cách giữa 2 điểm Sóc)
  const lunarMonths: LunarMonthDetail[] = [];
  for (let i = 0; i < newMoons.length - 1; i++) {
    const mStart = newMoons[i];
    const mEnd = newMoons[i + 1];

    const locS = getLocalComponents(mStart);
    const locE = getLocalComponents(mEnd);
    const utcS = Date.UTC(locS.year, locS.month - 1, locS.day);
    const utcE = Date.UTC(locE.year, locE.month - 1, locE.day);
    const totalDays = Math.round((utcE - utcS) / 86400000);

    const termsInMonth = allTerms.filter((term) => term.date >= mStart && term.date < mEnd);
    const tiets = termsInMonth.filter((term) => term.category === 'Tiết').map((term) => term.name);
    const khis = termsInMonth.filter((term) => term.category === 'Khí').map((term) => term.name);

    lunarMonths.push({
      monthIndex: 0,
      monthName: '',
      isLeap: false,
      lunarYear: 0,
      startDate: mStart,
      endDate: mEnd,
      totalDays: totalDays === 29 || totalDays === 30 ? totalDays : 30,
      terms: termsInMonth,
      tiets,
      khis,
    });
  }

  // 4. Xác định các tháng chứa Đông Chí (Trung Khí 270°) -> Luôn là Tháng 11
  const dongChiIndices: number[] = [];
  for (let i = 0; i < lunarMonths.length; i++) {
    if (lunarMonths[i].khis.includes('Đông Chí')) {
      dongChiIndices.push(i);
    }
  }

  // 5. Đánh số các tháng và xác định Năm Âm Lịch từ Đông Chí năm trước đến Đông Chí năm sau
  for (let d = 0; d < dongChiIndices.length - 1; d++) {
    const idx11_prev = dongChiIndices[d];
    const idx11_next = dongChiIndices[d + 1];
    const monthsCount = idx11_next - idx11_prev; // 12 (năm thường) hoặc 13 (năm nhuận)

    // Lấy năm dương lịch của điểm Đông Chí trước
    const dongChiTerm = lunarMonths[idx11_prev].terms.find((t) => t.name === 'Đông Chí');
    const dongChiYear = dongChiTerm
      ? getLocalComponents(dongChiTerm.date).year
      : getLocalComponents(lunarMonths[idx11_prev].startDate).year;

    lunarMonths[idx11_prev].monthIndex = 11;
    lunarMonths[idx11_prev].monthName = MONTH_NAMES[11];
    lunarMonths[idx11_prev].isLeap = false;
    lunarMonths[idx11_prev].lunarYear = dongChiYear;

    if (monthsCount === 12) {
      // Năm thường 12 tháng: 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      let curMonth = 12;
      for (let j = idx11_prev + 1; j < idx11_next; j++) {
        lunarMonths[j].monthIndex = curMonth;
        lunarMonths[j].monthName = MONTH_NAMES[curMonth] || `Tháng ${curMonth}`;
        lunarMonths[j].isLeap = false;
        // Tháng 12 thuộc năm cũ, Tháng 1..10 thuộc năm mới (dongChiYear + 1)
        lunarMonths[j].lunarYear = curMonth === 12 ? dongChiYear : dongChiYear + 1;
        curMonth = curMonth === 12 ? 1 : curMonth + 1;
      }
    } else if (monthsCount === 13) {
      // Năm nhuận 13 tháng: Tìm tháng đầu tiên không chứa Trung Khí (hoặc thiếu Tiết/Khí)
      let leapIndex = -1;
      for (let j = idx11_prev + 1; j < idx11_next; j++) {
        if (lunarMonths[j].khis.length === 0 || lunarMonths[j].tiets.length === 0) {
          leapIndex = j;
          break;
        }
      }
      if (leapIndex === -1) {
        for (let j = idx11_prev + 1; j < idx11_next; j++) {
          if (lunarMonths[j].khis.length === 0) {
            leapIndex = j;
            break;
          }
        }
      }

      let curMonth = 12;
      for (let j = idx11_prev + 1; j < idx11_next; j++) {
        if (j === leapIndex) {
          const actualM = curMonth - 1 === 0 ? 12 : curMonth - 1;
          lunarMonths[j].monthIndex = actualM;
          lunarMonths[j].monthName = `${MONTH_NAMES[actualM]} (Nhuận)`;
          lunarMonths[j].isLeap = true;
          lunarMonths[j].lunarYear = actualM === 12 ? dongChiYear : dongChiYear + 1;
        } else {
          lunarMonths[j].monthIndex = curMonth;
          lunarMonths[j].monthName = MONTH_NAMES[curMonth] || `Tháng ${curMonth}`;
          lunarMonths[j].isLeap = false;
          lunarMonths[j].lunarYear = curMonth === 12 ? dongChiYear : dongChiYear + 1;
          curMonth = curMonth === 12 ? 1 : curMonth + 1;
        }
      }
    }
  }

  // Đảm bảo gán lunarYear cho các tháng cuối
  if (dongChiIndices.length > 0) {
    const lastIdx = dongChiIndices[dongChiIndices.length - 1];
    if (lunarMonths[lastIdx]) {
      lunarMonths[lastIdx].monthIndex = 11;
      lunarMonths[lastIdx].monthName = MONTH_NAMES[11];
      const dongChiTerm = lunarMonths[lastIdx].terms.find((t) => t.name === 'Đông Chí');
      const y = dongChiTerm
        ? getLocalComponents(dongChiTerm.date).year
        : getLocalComponents(lunarMonths[lastIdx].startDate).year;
      lunarMonths[lastIdx].lunarYear = y;
    }
  }

  // 6. Tìm tháng âm lịch đang diễn ra tại thời điểm `date`
  let activeMonth: LunarMonthDetail | null = null;
  for (const lm of lunarMonths) {
    if (date >= lm.startDate && date < lm.endDate) {
      activeMonth = lm;
      break;
    }
  }

  if (!activeMonth && lunarMonths.length > 0) {
    activeMonth = lunarMonths[0];
  }

  const monthNum = activeMonth?.monthIndex || 1;
  const isLeap = activeMonth?.isLeap || false;
  const baseName = MONTH_NAMES[monthNum] || `Tháng ${monthNum}`;
  const fullMonthDisplay = isLeap ? `${baseName} (Nhuận)` : `${baseName} (Chính)`;

  // Tính ngày âm lịch trong tháng (Mùng 1..30)
  const locSelected = getLocalComponents(date);
  const locPrevSoc = getLocalComponents(activeMonth!.startDate);
  const locNextSoc = getLocalComponents(activeMonth!.endDate);

  const utcDaySelected = Date.UTC(locSelected.year, locSelected.month - 1, locSelected.day);
  const utcDayPrevSoc = Date.UTC(locPrevSoc.year, locPrevSoc.month - 1, locPrevSoc.day);
  const utcDayNextSoc = Date.UTC(locNextSoc.year, locNextSoc.month - 1, locNextSoc.day);

  const rawLunarDay = Math.floor((utcDaySelected - utcDayPrevSoc) / 86400000) + 1;
  const totalDays = Math.floor((utcDayNextSoc - utcDayPrevSoc) / 86400000);
  const lunarDay = Math.max(1, Math.min(rawLunarDay, totalDays));

  // Xác định Năm Âm Lịch & Can Chi Năm
  let lunarYear = activeMonth?.lunarYear || locSelected.year;
  if (!lunarYear || lunarYear === 0) {
    lunarYear = locSelected.year;
    if (locSelected.month === 1 || locSelected.month === 2) {
      if (monthNum >= 11) {
        lunarYear = locSelected.year - 1;
      }
    }
  }

  const canYear = CAN[(lunarYear + 6) % 10];
  const chiYear = CHI[(lunarYear + 8) % 12];
  const lunarYearCanChi = `${canYear} ${chiYear}`;

  const passedMs = date.getTime() - activeMonth!.startDate.getTime();
  const remainingMs = activeMonth!.endDate.getTime() - date.getTime();

  // Tạo lời giải thích thuật toán phân định tháng âm lịch
  let monthRuleExplanation = '';
  if (isLeap) {
    monthRuleExplanation = `Tháng này chỉ có ${
      activeMonth!.khis.length > 0 ? `Khí (${activeMonth!.khis.join(', ')})` : 'thiếu cặp Tiết & Khí'
    }, không có Tiết lệnh $\\rightarrow$ Là Tháng ${monthNum} Nhuận.`;
  } else {
    monthRuleExplanation = `Tháng này có đủ cả Tiết (${
      activeMonth!.tiets.join(', ') || 'Tiết'
    }) và Khí (${
      activeMonth!.khis.join(', ') || 'Khí'
    }) $\\rightarrow$ Là ${baseName} (Tháng Chính).`;
  }

  const formattedTermsInMonth = activeMonth!.terms.map((term) => ({
    name: term.name,
    category: term.category,
    degree: term.degree,
    exactDate: term.date,
  }));

  // 7. TÍNH TOÁN TOÀN BỘ THÔNG TIN THÁNG NHUẬN TRONG NĂM ÂM LỊCH NÀY
  // Lọc tất cả các tháng âm lịch thuộc năm lunarYear (từ Tháng Giêng đến Tháng Chạp)
  const monthsInYear = lunarMonths.filter((m) => m.lunarYear === lunarYear && m.monthIndex > 0);
  
  // Sắp xếp các tháng theo thời gian bắt đầu
  monthsInYear.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const leapMonthInYear = monthsInYear.find((m) => m.isLeap);
  const hasLeapMonth = !!leapMonthInYear;
  const totalMonthsInYear = monthsInYear.length;
  const totalDaysInYear = monthsInYear.reduce((sum, m) => sum + m.totalDays, 0);

  let leapMonthStatus: 'current' | 'upcoming' | 'passed' | 'none' = 'none';
  let leapMonthStatusText = 'Năm nay là năm thường (12 tháng), không có tháng nhuận.';

  if (hasLeapMonth && leapMonthInYear) {
    if (date >= leapMonthInYear.startDate && date < leapMonthInYear.endDate) {
      leapMonthStatus = 'current';
      leapMonthStatusText = `Hiện tại ĐANG LÀ ${leapMonthInYear.monthName} trong năm ${lunarYearCanChi}.`;
    } else if (date < leapMonthInYear.startDate) {
      leapMonthStatus = 'upcoming';
      leapMonthStatusText = `Năm ${lunarYearCanChi} có ${leapMonthInYear.monthName}, sẽ bắt đầu từ ngày ${formatVietnamDateTime(leapMonthInYear.startDate).split(' ')[0]}.`;
    } else {
      leapMonthStatus = 'passed';
      leapMonthStatusText = `${leapMonthInYear.monthName} trong năm ${lunarYearCanChi} đã kết thúc vào ngày ${formatVietnamDateTime(leapMonthInYear.endDate).split(' ')[0]}.`;
    }
  }

  let leapStatusDescription = '';
  if (hasLeapMonth && leapMonthInYear) {
    const leapNum = leapMonthInYear.monthIndex;
    const leapDays = leapMonthInYear.totalDays;
    const daysType = leapDays === 30 ? 'Đủ (30 ngày)' : 'Thiếu (29 ngày)';
    leapStatusDescription = `Năm Âm Lịch ${lunarYearCanChi} (${lunarYear}) là NĂM NHUẬN có tổng cộng 13 tháng âm lịch (${totalDaysInYear} ngày). Tháng Nhuận là ${MONTH_NAMES[leapNum]} Nhuận, độ dài ${daysType}, từ ngày ${formatVietnamDateTime(leapMonthInYear.startDate).split(' ')[0]} đến ${formatVietnamDateTime(leapMonthInYear.endDate).split(' ')[0]}.`;
  } else {
    leapStatusDescription = `Năm Âm Lịch ${lunarYearCanChi} (${lunarYear}) là NĂM THƯỜNG (không nhuận), gồm đúng 12 tháng âm lịch từ Tháng Giêng đến Tháng Chạp với tổng cộng ${totalDaysInYear > 0 ? totalDaysInYear : 354} ngày.`;
  }

  const leapAstronomicalReason = hasLeapMonth && leapMonthInYear
    ? `Do một năm dương lịch (~365.2422 ngày) dài hơn 12 tuần trăng (~354.367 ngày) khoảng 10.88 ngày, chu kỳ Meton 19 năm có 7 tháng nhuận. Trong năm ${lunarYearCanChi}, khoảng cách giữa 2 điểm Sóc của tháng này không chứa Trung Khí nên được quy ước là Tháng ${leapMonthInYear.monthIndex} Nhuận.`
    : `Trong chu kỳ 19 năm âm dương hợp lịch (chu kỳ Meton), mỗi năm dương lịch quay quanh Mặt Trời chênh lệch với tuần trăng. Năm ${lunarYearCanChi} có đủ 12 Trung Khí rơi đều vào 12 tháng âm lịch nên không phát sinh tháng nhuận.`;

  const yearMonthsSummary: LunarYearMonthSummary[] = monthsInYear.map((m) => ({
    monthIndex: m.monthIndex,
    monthName: m.monthName,
    isLeap: m.isLeap,
    startDate: m.startDate,
    endDate: m.endDate,
    totalDays: m.totalDays,
    isCurrent: m === activeMonth,
    terms: m.terms.map((t) => ({
      name: t.name,
      category: t.category,
      degree: t.degree,
      exactDate: t.date,
    })),
  }));

  const yearLeapInfo: LunarYearLeapInfo = {
    lunarYear,
    lunarYearCanChi,
    hasLeapMonth,
    leapMonthNumber: leapMonthInYear ? leapMonthInYear.monthIndex : undefined,
    leapMonthName: leapMonthInYear ? leapMonthInYear.monthName : undefined,
    leapMonthDisplay: leapMonthInYear ? `${MONTH_NAMES[leapMonthInYear.monthIndex]} Nhuận` : undefined,
    leapMonthStartDate: leapMonthInYear ? leapMonthInYear.startDate : undefined,
    leapMonthEndDate: leapMonthInYear ? leapMonthInYear.endDate : undefined,
    leapMonthTotalDays: leapMonthInYear ? leapMonthInYear.totalDays : undefined,
    leapMonthDaysType: leapMonthInYear ? (leapMonthInYear.totalDays === 30 ? 'Tháng đủ (30 ngày)' : 'Tháng thiếu (29 ngày)') : undefined,
    leapMonthStatus,
    leapMonthStatusText,
    totalMonthsInYear: totalMonthsInYear > 0 ? totalMonthsInYear : (hasLeapMonth ? 13 : 12),
    totalDaysInYear: totalDaysInYear > 0 ? totalDaysInYear : (hasLeapMonth ? 384 : 354),
    months: yearMonthsSummary,
    leapStatusDescription,
    leapAstronomicalReason,
  };

  return {
    lunarDay,
    lunarMonth: monthNum,
    lunarMonthName: baseName,
    isLeapMonth: isLeap,
    fullMonthDisplay,
    lunarYear,
    lunarYearCanChi,
    lunarFullDateText: `Ngày ${lunarDay < 10 ? `Mùng ${lunarDay}` : lunarDay} ${fullMonthDisplay} - Năm ${lunarYearCanChi}`,
    totalMonthDays: totalDays === 29 || totalDays === 30 ? totalDays : 30,
    monthType: totalDays === 30 ? 'Tháng đủ (30 ngày)' : 'Tháng thiếu (29 ngày)',
    prevSocDate: activeMonth!.startDate,
    nextSocDate: activeMonth!.endDate,
    prevPassedString: formatTimedeltaHMS(passedMs),
    prevPassedDays: passedMs / 86400000,
    nextRemainingString: formatTimedeltaHMS(remainingMs),
    nextRemainingDays: remainingMs / 86400000,
    termsInMonth: formattedTermsInMonth,
    tiets: activeMonth!.tiets,
    khis: activeMonth!.khis,
    hasTiet: activeMonth!.tiets.length > 0,
    hasKhi: activeMonth!.khis.length > 0,
    monthRuleExplanation,
    yearLeapInfo,
  };
}

