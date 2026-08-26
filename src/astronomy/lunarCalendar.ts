import {
  findExactNewMoonTime,
  findExactSolarTermTime,
  getMoonSunDiff,
  getSunEclipticLongitude,
} from './sunMoon';
import { SOLAR_TERMS, formatVietnamDateTime, formatTimedeltaHMS } from './solarTerms';
import { getLocalComponents, CAN, CHI } from './canChi';
import { LunarDateInfo } from '../types';

export interface LunarMonthDetail {
  monthIndex: number; // 1..12
  monthName: string;
  isLeap: boolean;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  terms: { name: string; category: 'Tiết' | 'Khí'; degree: number; date: Date }[];
  tiets: string[];
  khis: string[];
}

/**
 * Thuật toán Thiên văn Lịch Âm Dương:
 * 1. Tháng Âm lịch là khoảng cách giữa 2 điểm Sóc (Trăng mới) liên tiếp.
 * 2. Một tháng âm lịch chính quy phải có đủ cả Tiết (Tiết lệnh) và Khí (Trung khí).
 * 3. Tháng 1 (Tháng Giêng) là tháng chứa tiết Lập Xuân và trung khí Vũ Thủy (hoặc bắt đầu năm âm lịch).
 * 4. Nếu tháng âm lịch chỉ có Khí không có Tiết (hoặc thiếu cặp Tiết & Khí), tháng đó là Tháng Nhuận của tháng đó.
 */
export function getAstronomicalLunarDate(date: Date): LunarDateInfo {
  const currentUtcMs = date.getTime();

  // Search window: 450 ngày trước đến 450 ngày sau để bao phủ trọn chu kỳ năm thiên văn
  const searchStart = new Date(currentUtcMs - 450 * 86400 * 1000);
  const searchEnd = new Date(currentUtcMs + 450 * 86400 * 1000);

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

  // 5. Đánh số các tháng từ Tháng 11 năm trước đến Tháng 11 năm sau
  for (let d = 0; d < dongChiIndices.length - 1; d++) {
    const idx11_prev = dongChiIndices[d];
    const idx11_next = dongChiIndices[d + 1];
    const monthsCount = idx11_next - idx11_prev; // 12 (năm thường) hoặc 13 (năm nhuận)

    lunarMonths[idx11_prev].monthIndex = 11;
    lunarMonths[idx11_prev].monthName = 'Tháng 11 (Một)';
    lunarMonths[idx11_prev].isLeap = false;

    if (monthsCount === 12) {
      // Năm thường 12 tháng: 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      let curMonth = 12;
      for (let j = idx11_prev + 1; j < idx11_next; j++) {
        lunarMonths[j].monthIndex = curMonth;
        lunarMonths[j].isLeap = false;
        curMonth = curMonth === 12 ? 1 : curMonth + 1;
      }
    } else if (monthsCount === 13) {
      // Năm nhuận 13 tháng: Tìm tháng đầu tiên chỉ có Khí không có Tiết (hoặc thiếu Tiết/Khí)
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
          lunarMonths[j].monthIndex = curMonth - 1 === 0 ? 12 : curMonth - 1;
          lunarMonths[j].isLeap = true;
        } else {
          lunarMonths[j].monthIndex = curMonth;
          lunarMonths[j].isLeap = false;
          curMonth = curMonth === 12 ? 1 : curMonth + 1;
        }
      }
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
  let lunarYear = locSelected.year;
  if (locSelected.month === 1 || locSelected.month === 2) {
    if (monthNum >= 11) {
      lunarYear = locSelected.year - 1;
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
  };
}
