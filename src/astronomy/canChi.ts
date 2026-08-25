import { BatTuInfo } from '../types';

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const CAN_NGU_HANH: Record<string, string> = {
  Giáp: 'Dương Mộc',
  Ất: 'Âm Mộc',
  Bính: 'Dương Hỏa',
  Đinh: 'Âm Hỏa',
  Mậu: 'Dương Thổ',
  Kỷ: 'Âm Thổ',
  Canh: 'Dương Kim',
  Tân: 'Âm Kim',
  Nhâm: 'Dương Thủy',
  Quý: 'Âm Thủy',
};

export const CHI_CON_GIAP: Record<string, string> = {
  Tý: 'Chuột',
  Sửu: 'Trâu',
  Dần: 'Hổ',
  Mão: 'Mèo',
  Thìn: 'Rồng',
  Tị: 'Rắn',
  Ngọ: 'Ngựa',
  Mùi: 'Dê',
  Thân: 'Khỉ',
  Dậu: 'Gà',
  Tuất: 'Chó',
  Hợi: 'Lợn',
};

/**
 * Lấy ngày cục bộ (local date object theo múi giờ UTC+7)
 */
export function getLocalComponents(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const d = new Date(date.getTime() + 7 * 3600 * 1000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
  };
}

/**
 * Tính số ngày từ mốc chuẩn 2000-01-01 (Giáp Thìn = 54 trong chu kỳ 60 hoa giáp)
 */
export function getDaysDiffFrom2000(date: Date): number {
  const local = getLocalComponents(date);
  const dateObj = Date.UTC(local.year, local.month - 1, local.day);
  const refObj = Date.UTC(2000, 0, 1);
  return Math.floor((dateObj - refObj) / (24 * 3600 * 1000));
}

/**
 * Tính Can Chi của Ngày (trả về index chu kỳ 0..59 và chuỗi Can Chi)
 */
export function tinhCanChiNgay(date: Date): [number, string] {
  const daysDiff = getDaysDiffFrom2000(date);
  let dayCycleIdx = (54 + daysDiff) % 60;
  if (dayCycleIdx < 0) dayCycleIdx += 60;

  const canIdx = dayCycleIdx % 10;
  const chiIdx = dayCycleIdx % 12;
  return [dayCycleIdx, `${CAN[canIdx]} ${CHI[chiIdx]}`];
}

/**
 * Tính Can Chi Giờ
 */
export function tinhCanChiGio(date: Date, canNgayIdx: number): string {
  const local = getLocalComponents(date);
  const chiGioIdx = Math.floor(((local.hour + 1) % 24) / 2);
  const canGioBase = (canNgayIdx % 5) * 2;
  const canGioIdx = (canGioBase + chiGioIdx) % 10;
  return `${CAN[canGioIdx]} ${CHI[chiGioIdx]}`;
}

/**
 * Tính Bát Tự (Tứ Trụ: Năm - Tháng - Ngày - Giờ) dựa vào thời điểm và Kinh độ Mặt Trời hiện tại
 */
export function tinhBatTu(date: Date, lonNow: number): BatTuInfo {
  const local = getLocalComponents(date);
  const [dayIdx, ngayStr] = tinhCanChiNgay(date);
  const canNgayIdx = dayIdx % 10;

  const chiGioIdx = Math.floor(((local.hour + 1) % 24) / 2);
  const canGioBase = (canNgayIdx % 5) * 2;
  const canGioIdx = (canGioBase + chiGioIdx) % 10;
  const gioStr = `${CAN[canGioIdx]} ${CHI[chiGioIdx]}`;

  // Năm thiên văn tính theo Tiết Lập Xuân (315°)
  const solarYear = lonNow < 315 && local.month <= 2 ? local.year - 1 : local.year;

  let canNamIdx = (solarYear - 4) % 10;
  if (canNamIdx < 0) canNamIdx += 10;
  let chiNamIdx = (solarYear - 4) % 12;
  if (chiNamIdx < 0) chiNamIdx += 12;
  const namStr = `${CAN[canNamIdx]} ${CHI[chiNamIdx]}`;

  // Chi Tháng theo Kinh độ Mặt Trời (Tiết khí lệnh)
  let chiThangIdx: number;
  if (lonNow >= 315 && lonNow < 345) chiThangIdx = 2; // Tháng Dần (Lập Xuân)
  else if (lonNow >= 345 || lonNow < 15) chiThangIdx = 3; // Tháng Mão (Kinh Trập)
  else if (lonNow >= 15 && lonNow < 45) chiThangIdx = 4; // Tháng Thìn (Thanh Minh)
  else if (lonNow >= 45 && lonNow < 75) chiThangIdx = 5; // Tháng Tị (Lập Hạ)
  else if (lonNow >= 75 && lonNow < 105) chiThangIdx = 6; // Tháng Ngọ (Mang Chủng)
  else if (lonNow >= 105 && lonNow < 135) chiThangIdx = 7; // Tháng Mùi (Tiểu Thử)
  else if (lonNow >= 135 && lonNow < 165) chiThangIdx = 8; // Tháng Thân (Lập Thu)
  else if (lonNow >= 165 && lonNow < 195) chiThangIdx = 9; // Tháng Dậu (Bạch Lộ)
  else if (lonNow >= 195 && lonNow < 225) chiThangIdx = 10; // Tháng Tuất (Hàn Lộ)
  else if (lonNow >= 225 && lonNow < 255) chiThangIdx = 11; // Tháng Hợi (Lập Đông)
  else if (lonNow >= 255 && lonNow < 285) chiThangIdx = 0; // Tháng Tý (Đại Tuyết)
  else chiThangIdx = 1; // Tháng Sửu (Tiểu Hàn)

  // Ngũ Hổ Độn: Tìm Can Tháng từ Can Năm
  const baseCanDan = ((canNamIdx % 5) * 2 + 2) % 10;
  let monthOffset = (chiThangIdx - 2) % 12;
  if (monthOffset < 0) monthOffset += 12;
  const canThangIdx = (baseCanDan + monthOffset) % 10;
  const thangStr = `${CAN[canThangIdx]} ${CHI[chiThangIdx]}`;

  return {
    yearCanChi: namStr,
    monthCanChi: thangStr,
    dayCanChi: ngayStr,
    hourCanChi: gioStr,
    solarYear,
    fullText: `Năm ${namStr} - Tháng ${thangStr} - Ngày ${ngayStr} - Giờ ${gioStr}`,
  };
}
