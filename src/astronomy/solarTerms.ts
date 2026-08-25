import { SolarTerm, BaguaPalace } from '../types';

/**
 * 24 Tiết Khí (Solar Terms)
 * Xen kẽ: Tiết (Tiết lệnh) -> Khí (Trung khí)
 * Bắt đầu từ Lập Xuân (315°) theo truyền thống nông lịch, hoặc Xuân Phân (0°) theo thiên văn học.
 */
export const SOLAR_TERMS: SolarTerm[] = [
  { degree: 315, name: 'Lập Xuân', category: 'Tiết' },
  { degree: 330, name: 'Vũ Thủy', category: 'Khí' },
  { degree: 345, name: 'Kinh Trập', category: 'Tiết' },
  { degree: 0, name: 'Xuân Phân', category: 'Khí' },
  { degree: 15, name: 'Thanh Minh', category: 'Tiết' },
  { degree: 30, name: 'Cốc Vũ', category: 'Khí' },
  { degree: 45, name: 'Lập Hạ', category: 'Tiết' },
  { degree: 60, name: 'Tiểu Mãn', category: 'Khí' },
  { degree: 75, name: 'Mang Chủng', category: 'Tiết' },
  { degree: 90, name: 'Hạ Chí', category: 'Khí' },
  { degree: 105, name: 'Tiểu Thử', category: 'Tiết' },
  { degree: 120, name: 'Đại Thử', category: 'Khí' },
  { degree: 135, name: 'Lập Thu', category: 'Tiết' },
  { degree: 150, name: 'Xử Thử', category: 'Khí' },
  { degree: 165, name: 'Bạch Lộ', category: 'Tiết' },
  { degree: 180, name: 'Thu Phân', category: 'Khí' },
  { degree: 195, name: 'Hàn Lộ', category: 'Tiết' },
  { degree: 210, name: 'Sương Giáng', category: 'Khí' },
  { degree: 225, name: 'Lập Đông', category: 'Tiết' },
  { degree: 240, name: 'Tiểu Tuyết', category: 'Khí' },
  { degree: 255, name: 'Đại Tuyết', category: 'Tiết' },
  { degree: 270, name: 'Đông Chí', category: 'Khí' },
  { degree: 285, name: 'Tiểu Hàn', category: 'Tiết' },
  { degree: 300, name: 'Đại Hàn', category: 'Khí' },
];

/**
 * Bảng tra Cục Âm/Dương Kỳ Môn Độn Giáp
 * key: Tên Tiết Khí
 * value: [isDuongDon (boolean), [Thượng Nguyên, Trung Nguyên, Hạ Nguyên]]
 */
export const KY_MON_JU_TABLE: Record<string, [boolean, [number, number, number]]> = {
  'Đông Chí': [true, [1, 7, 4]],
  'Tiểu Hàn': [true, [2, 8, 5]],
  'Đại Hàn': [true, [3, 9, 6]],
  'Lập Xuân': [true, [8, 5, 2]],
  'Vũ Thủy': [true, [9, 6, 3]],
  'Kinh Trập': [true, [1, 7, 4]],
  'Xuân Phân': [true, [3, 9, 6]],
  'Thanh Minh': [true, [4, 1, 7]],
  'Cốc Vũ': [true, [5, 2, 8]],
  'Lập Hạ': [true, [4, 1, 7]],
  'Tiểu Mãn': [true, [5, 2, 8]],
  'Mang Chủng': [true, [6, 3, 9]],
  'Hạ Chí': [false, [9, 3, 6]],
  'Tiểu Thử': [false, [8, 2, 5]],
  'Đại Thử': [false, [7, 1, 4]],
  'Lập Thu': [false, [2, 5, 8]],
  'Xử Thử': [false, [1, 4, 7]],
  'Bạch Lộ': [false, [9, 3, 6]],
  'Thu Phân': [false, [7, 1, 4]],
  'Hàn Lộ': [false, [6, 9, 3]],
  'Sương Giáng': [false, [5, 8, 2]],
  'Lập Đông': [false, [6, 9, 3]],
  'Tiểu Tuyết': [false, [5, 8, 2]],
  'Đại Tuyết': [false, [4, 7, 1]],
};

/**
 * Bản đồ phân bố 24 Tiết Khí vào 8 Cung Bát Quái
 */
export const TIET_KHI_CUNG_MAP: Record<string, { cungName: string; cungNumber: number; direction: string }> = {
  'Đông Chí': { cungName: 'Cung Khảm', cungNumber: 1, direction: 'Chính Bắc (0°)' },
  'Tiểu Hàn': { cungName: 'Cung Khảm', cungNumber: 1, direction: 'Chính Bắc (0°)' },
  'Đại Hàn': { cungName: 'Cung Khảm', cungNumber: 1, direction: 'Chính Bắc (0°)' },

  'Lập Xuân': { cungName: 'Cung Cấn', cungNumber: 8, direction: 'Đông Bắc (45°)' },
  'Vũ Thủy': { cungName: 'Cung Cấn', cungNumber: 8, direction: 'Đông Bắc (45°)' },
  'Kinh Trập': { cungName: 'Cung Cấn', cungNumber: 8, direction: 'Đông Bắc (45°)' },

  'Xuân Phân': { cungName: 'Cung Chấn', cungNumber: 3, direction: 'Chính Đông (90°)' },
  'Thanh Minh': { cungName: 'Cung Chấn', cungNumber: 3, direction: 'Chính Đông (90°)' },
  'Cốc Vũ': { cungName: 'Cung Chấn', cungNumber: 3, direction: 'Chính Đông (90°)' },

  'Lập Hạ': { cungName: 'Cung Tốn', cungNumber: 4, direction: 'Đông Nam (135°)' },
  'Tiểu Mãn': { cungName: 'Cung Tốn', cungNumber: 4, direction: 'Đông Nam (135°)' },
  'Mang Chủng': { cungName: 'Cung Tốn', cungNumber: 4, direction: 'Đông Nam (135°)' },

  'Hạ Chí': { cungName: 'Cung Ly', cungNumber: 9, direction: 'Chính Nam (180°)' },
  'Tiểu Thử': { cungName: 'Cung Ly', cungNumber: 9, direction: 'Chính Nam (180°)' },
  'Đại Thử': { cungName: 'Cung Ly', cungNumber: 9, direction: 'Chính Nam (180°)' },

  'Lập Thu': { cungName: 'Cung Khôn', cungNumber: 2, direction: 'Tây Nam (225°)' },
  'Xử Thử': { cungName: 'Cung Khôn', cungNumber: 2, direction: 'Tây Nam (225°)' },
  'Bạch Lộ': { cungName: 'Cung Khôn', cungNumber: 2, direction: 'Tây Nam (225°)' },

  'Thu Phân': { cungName: 'Cung Đoài', cungNumber: 7, direction: 'Chính Tây (270°)' },
  'Hàn Lộ': { cungName: 'Cung Đoài', cungNumber: 7, direction: 'Chính Tây (270°)' },
  'Sương Giáng': { cungName: 'Cung Đoài', cungNumber: 7, direction: 'Chính Tây (270°)' },

  'Lập Đông': { cungName: 'Cung Kiền', cungNumber: 6, direction: 'Tây Bắc (315°)' },
  'Tiểu Tuyết': { cungName: 'Cung Kiền', cungNumber: 6, direction: 'Tây Bắc (315°)' },
  'Đại Tuyết': { cungName: 'Cung Kiền', cungNumber: 6, direction: 'Tây Bắc (315°)' },
};

/**
 * 9 Cung Hậu Thiên Bát Quái / Lạc Thư
 */
export const BAGUA_PALACES: BaguaPalace[] = [
  {
    number: 1,
    name: 'Khảm (坎)',
    hskName: 'Nhất Bạch Thủy Tinh',
    direction: 'Chính Bắc',
    element: 'Thủy (Hành Thủy)',
    terms: ['Đông Chí', 'Tiểu Hàn', 'Đại Hàn'],
    duongJu: [1, 7, 4],
    amJu: [],
  },
  {
    number: 8,
    name: 'Cấn (艮)',
    hskName: 'Bát Bạch Thổ Tinh',
    direction: 'Đông Bắc',
    element: 'Thổ (Hành Thổ)',
    terms: ['Lập Xuân', 'Vũ Thủy', 'Kinh Trập'],
    duongJu: [8, 5, 2],
    amJu: [],
  },
  {
    number: 3,
    name: 'Chấn (震)',
    hskName: 'Tam Bích Mộc Tinh',
    direction: 'Chính Đông',
    element: 'Mộc (Hành Mộc)',
    terms: ['Xuân Phân', 'Thanh Minh', 'Cốc Vũ'],
    duongJu: [3, 9, 6],
    amJu: [],
  },
  {
    number: 4,
    name: 'Tốn (巽)',
    hskName: 'Tứ Lục Mộc Tinh',
    direction: 'Đông Nam',
    element: 'Mộc (Hành Mộc)',
    terms: ['Lập Hạ', 'Tiểu Mãn', 'Mang Chủng'],
    duongJu: [4, 1, 7],
    amJu: [],
  },
  {
    number: 9,
    name: 'Ly (離)',
    hskName: 'Cửu Tử Hỏa Tinh',
    direction: 'Chính Nam',
    element: 'Hỏa (Hành Hỏa)',
    terms: ['Hạ Chí', 'Tiểu Thử', 'Đại Thử'],
    duongJu: [],
    amJu: [9, 3, 6],
  },
  {
    number: 2,
    name: 'Khôn (坤)',
    hskName: 'Nhị Hắc Thổ Tinh',
    direction: 'Tây Nam',
    element: 'Thổ (Hành Thổ)',
    terms: ['Lập Thu', 'Xử Thử', 'Bạch Lộ'],
    duongJu: [],
    amJu: [2, 5, 8],
  },
  {
    number: 7,
    name: 'Đoài (兌)',
    hskName: 'Thất Xích Kim Tinh',
    direction: 'Chính Tây',
    element: 'Kim (Hành Kim)',
    terms: ['Thu Phân', 'Hàn Lộ', 'Sương Giáng'],
    duongJu: [],
    amJu: [7, 1, 4],
  },
  {
    number: 6,
    name: 'Kiền (乾)',
    hskName: 'Lục Bạch Kim Tinh',
    direction: 'Tây Bắc',
    element: 'Kim (Hành Kim)',
    terms: ['Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết'],
    duongJu: [],
    amJu: [6, 9, 3],
  },
  {
    number: 5,
    name: 'Trung Cung (中)',
    hskName: 'Ngũ Hoàng Thổ Tinh',
    direction: 'Trung Tâm',
    element: 'Thổ (Hành Thổ)',
    terms: ['Ký Cung Cấn 8 (Dương độn) / Cung Khôn 2 (Âm độn)'],
    duongJu: [5],
    amJu: [5],
  },
];

/**
 * Đổi kinh độ số thập phân sang dạng độ, phút, giây: X° Y' Z"
 */
export function formatDegreeToDMS(degFloat: number): string {
  const d = Math.floor(degFloat);
  const mFull = (degFloat - d) * 60;
  let m = Math.floor(mFull);
  let s = Math.round((mFull - m) * 60);

  if (s === 60) {
    s = 0;
    m += 1;
  }
  if (m === 60) {
    m = 0;
    return `${d + 1}° 0' 0"`;
  }
  return `${d}° ${m}' ${s}"`;
}

/**
 * Đổi khoảng thời gian millisecond thành chuỗi: X ngày Y giờ Z phút T giây
 */
export function formatTimedeltaHMS(ms: number): string {
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ngày`);
  if (hours > 0 || days > 0) parts.push(`${hours} giờ`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes} phút`);
  parts.push(`${seconds} giây`);

  return parts.join(' ');
}

/**
 * Định dạng ngày giờ UTC+7 thành chuỗi YYYY-MM-DD HH:mm:ss
 */
export function formatVietnamDateTime(date: Date): string {
  const d = new Date(date.getTime() + 7 * 3600 * 1000);
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, '0');
  const D = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

/**
 * Phân tích chuỗi số nhập nhanh dạng DDMMYYYY hoặc DDMMYYYYHHMMSS (theo giờ Việt Nam UTC+7)
 */
export function parseCompactDateTime(inputStr: string): Date {
  const digits = inputStr.replace(/\D/g, '');
  if (digits.length < 8) {
    throw new Error('Chuỗi thời gian phải có ít nhất 8 chữ số (DDMMYYYY)');
  }

  const day = parseInt(digits.slice(0, 2), 10);
  const month = parseInt(digits.slice(2, 4), 10);
  const year = parseInt(digits.slice(4, 8), 10);
  const hour = digits.length >= 10 ? parseInt(digits.slice(8, 10), 10) : 0;
  const minute = digits.length >= 12 ? parseInt(digits.slice(10, 12), 10) : 0;
  const second = digits.length >= 14 ? parseInt(digits.slice(12, 14), 10) : 0;

  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) {
    throw new Error('Giá trị ngày tháng giờ phút giây không hợp lệ!');
  }

  // Create UTC Date representing UTC+7
  const utcMillis = Date.UTC(year, month - 1, day, hour, minute, second) - 7 * 3600 * 1000;
  return new Date(utcMillis);
}
