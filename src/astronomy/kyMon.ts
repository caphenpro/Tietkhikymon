import { KyMonInfo, KyMonRuleType, NguyenType } from '../types';
import { CHI, tinhCanChiNgay, getLocalComponents } from './canChi';
import { KY_MON_JU_TABLE, TIET_KHI_CUNG_MAP, formatVietnamDateTime, SOLAR_TERMS } from './solarTerms';
import { getSunEclipticLongitude, findExactSolarTermTime } from './sunMoon';

/**
 * Lấy Tiết Khí thực tế và thời điểm bắt đầu của nó tại thời điểm bất kỳ
 */
export function getRealSolarTermEvent(date: Date): {
  termName: string;
  targetDegree: number;
  termCategory: 'Tiết' | 'Khí';
  exactDate: Date;
  lonNow: number;
} {
  const lonNow = getSunEclipticLongitude(date);
  const targetDegree = Math.floor(lonNow / 15) * 15;

  const termInfo = SOLAR_TERMS.find((t) => t.degree === targetDegree)!;
  const termName = termInfo.name;
  const termCategory = termInfo.category;

  // Search backward ~20 days for exact transition
  const startSearch = new Date(date.getTime() - 20 * 86400 * 1000);
  const exactDate = findExactSolarTermTime(targetDegree, startSearch, date);

  return {
    termName,
    targetDegree,
    termCategory,
    exactDate,
    lonNow,
  };
}

/**
 * Lấy Tiết Khí tiếp theo và thời điểm bắt đầu
 */
export function getNextSolarTermEvent(date: Date): {
  nextTermName: string;
  nextDegree: number;
  nextCategory: 'Tiết' | 'Khí';
  exactNextDate: Date;
} {
  const { targetDegree } = getRealSolarTermEvent(date);
  const termDegreesOrder = SOLAR_TERMS.map((t) => t.degree);
  const currentIdx = termDegreesOrder.indexOf(targetDegree);
  const nextIdx = (currentIdx + 1) % 24;

  const nextTerm = SOLAR_TERMS[nextIdx];
  const exactNextDate = findExactSolarTermTime(
    nextTerm.degree,
    date,
    new Date(date.getTime() + 25 * 86400 * 1000)
  );

  return {
    nextTermName: nextTerm.name,
    nextDegree: nextTerm.degree,
    nextCategory: nextTerm.category,
    exactNextDate,
  };
}

/**
 * Tính ngày Phù Đầu Thượng Nguyên gần nhất quản lý
 */
export function tinhPhuDauThuongNguyenGanNhat(date: Date): {
  dtPhuDauTn: Date;
  tnCycleIdx: number;
  tnCanChiStr: string;
} {
  const [dayCycleIdx] = tinhCanChiNgay(date);
  const daysFromPhuDau = dayCycleIdx % 5;
  const phuDauIdx = (dayCycleIdx - daysFromPhuDau + 60) % 60;
  const phuDauChiIdx = phuDauIdx % 12;

  let offsetDays: number;
  // Tý (0), Mão (3), Ngọ (6), Dậu (9) -> Thượng Nguyên
  if ([0, 3, 6, 9].includes(phuDauChiIdx)) {
    offsetDays = daysFromPhuDau;
  }
  // Dần (2), Tị (5), Thân (8), Hợi (11) -> Trung Nguyên
  else if ([2, 5, 8, 11].includes(phuDauChiIdx)) {
    offsetDays = daysFromPhuDau + 5;
  }
  // Thìn (4), Tuất (10), Sửu (1), Mùi (7) -> Hạ Nguyên
  else {
    offsetDays = daysFromPhuDau + 10;
  }

  const dtPhuDauTn = new Date(date.getTime() - offsetDays * 86400 * 1000);
  const tnCycleIdx = (dayCycleIdx - offsetDays + 60) % 60;
  const [, tnCanChiStr] = tinhCanChiNgay(dtPhuDauTn);

  return {
    dtPhuDauTn,
    tnCycleIdx,
    tnCanChiStr,
  };
}

/**
 * So sánh ngày dương lịch (bỏ qua giờ phút giây)
 */
function getDaysDifference(d1: Date, d2: Date): number {
  const loc1 = getLocalComponents(d1);
  const loc2 = getLocalComponents(d2);
  const utc1 = Date.UTC(loc1.year, loc1.month - 1, loc1.day);
  const utc2 = Date.UTC(loc2.year, loc2.month - 1, loc2.day);
  return Math.round((utc1 - utc2) / (86400 * 1000));
}

/**
 * Luận Cục Kỳ Môn Độn Giáp theo phương pháp Siêu Thần Tiếp Khí Nhuận Cục
 */
export function luanCucKyMonSieuThan(date: Date): KyMonInfo {
  const [dayCycleIdx, ngayCanChi] = tinhCanChiNgay(date);
  const daysFromPhuDau = dayCycleIdx % 5;
  const phuDauIdx = (dayCycleIdx - daysFromPhuDau + 60) % 60;
  const dtPhuDauHienTai = new Date(date.getTime() - daysFromPhuDau * 86400 * 1000);
  const [, phuDauStr] = tinhCanChiNgay(dtPhuDauHienTai);

  const phuDauChiIdx = phuDauIdx % 12;
  const phuDauChi = CHI[phuDauChiIdx];

  let nguyenStr: NguyenType;
  let nguyenCode: number;

  if ([0, 3, 6, 9].includes(phuDauChiIdx)) {
    nguyenStr = 'Thượng Nguyên';
    nguyenCode = 0;
  } else if ([2, 5, 8, 11].includes(phuDauChiIdx)) {
    nguyenStr = 'Trung Nguyên';
    nguyenCode = 1;
  } else {
    nguyenStr = 'Hạ Nguyên';
    nguyenCode = 2;
  }

  const { dtPhuDauTn, tnCanChiStr } = tinhPhuDauThuongNguyenGanNhat(date);

  const { termName: termReal, exactDate: exactTermLocal } = getRealSolarTermEvent(dtPhuDauTn);
  const { nextTermName: nextTermReal, exactNextDate: exactNextTermLocal } = getNextSolarTermEvent(dtPhuDauTn);

  // So sánh ngày Phù đầu Thượng Nguyên với Tiết tiếp theo
  const diffDaysNext = getDaysDifference(exactNextTermLocal, dtPhuDauTn);

  let termDungCuc: string;
  let termKieu: KyMonRuleType;
  let lyDo: string;

  if (diffDaysNext > 0 && diffDaysNext <= 9) {
    termDungCuc = nextTermReal;
    termKieu = 'Siêu Thần';
    lyDo = `Phù đầu Thượng Nguyên (${tnCanChiStr}) đến trước Tiết ${nextTermReal} ${diffDaysNext} ngày ➔ Dùng Cục tiết ${nextTermReal}.`;
  } else if (diffDaysNext > 9) {
    const diffDaysCurrent = getDaysDifference(dtPhuDauTn, exactTermLocal);
    if (diffDaysCurrent === 0) {
      termDungCuc = termReal;
      termKieu = 'Chính Khí';
      lyDo = `Phù đầu Thượng Nguyên (${tnCanChiStr}) ứng hợp đúng ngày chuyển Tiết ${termReal}.`;
    } else if (diffDaysCurrent > 0) {
      termDungCuc = termReal;
      termKieu = 'Tiếp Khí';
      lyDo = `Phù đầu Thượng Nguyên (${tnCanChiStr}) đến sau Tiết ${termReal} ${diffDaysCurrent} ngày.`;
    } else {
      termDungCuc = termReal;
      termKieu = 'Siêu Thần';
      lyDo = `Phù đầu Thượng Nguyên (${tnCanChiStr}) đến trước Tiết ${termReal} ${Math.abs(diffDaysCurrent)} ngày.`;
    }
  } else {
    termDungCuc = termReal;
    termKieu = 'Nhuận Cục';
    lyDo = `Siêu thần vượt quá 9 ngày tại tiết ${termReal} ➔ Tiến hành Nhuận Cục.`;
  }

  const [isDuongDon, [thuong, trung, ha]] = KY_MON_JU_TABLE[termDungCuc] || [true, [1, 7, 4]];
  const donType = isDuongDon ? 'Dương độn' : 'Âm độn';
  const cucNumber = [thuong, trung, ha][nguyenCode];
  const cungInfo = TIET_KHI_CUNG_MAP[termDungCuc] || { cungName: 'Không xác định', cungNumber: 0, direction: 'Trung Tâm' };

  const fullAnalysisText = `1. Phù Đầu Hiện Tại: Ngày ${phuDauStr} (${formatVietnamDateTime(dtPhuDauHienTai).split(' ')[0]})
2. Phân Định Nguyên: Chi ${phuDauChi} ➔ ${nguyenStr}
   └─ Phù Đầu Thượng Nguyên Quản Táo: Ngày ${tnCanChiStr} (${formatVietnamDateTime(dtPhuDauTn).split(' ')[0]})
3. Quy Luật Vận Hành: ${termKieu}
   └─ Nguyên nhân: ${lyDo}
4. Tiết Khí Dùng Cục: ${termDungCuc} - ${nguyenStr}
   └─ Nhóm Cung Bát Quái: ${cungInfo.cungName} (Cung số ${cungInfo.cungNumber} - ${cungInfo.direction})
──────────────────────────────────────────────────
👉 KẾT LUẬN CỤC SỐ: ${donType.toUpperCase()} CỤC ${cucNumber}`;

  return {
    currentPhuDauDate: dtPhuDauHienTai,
    currentPhuDauCanChi: phuDauStr,
    nguyen: nguyenStr,
    nguyenCode,
    phuDauChi,
    phuDauThuongNguyenDate: dtPhuDauTn,
    phuDauThuongNguyenCanChi: tnCanChiStr,
    ruleType: termKieu,
    reason: lyDo,
    termUsed: termDungCuc,
    cungName: cungInfo.cungName,
    cungNumber: cungInfo.cungNumber,
    direction: cungInfo.direction,
    isDuongDon,
    donType,
    cucNumber,
    fullAnalysisText,
    cucResultText: `${donType.toUpperCase()} CỤC ${cucNumber}`,
  };
}
