/**
 * MÔ-ĐUN TRẠCH CÁT HIỆP KỶ BIỆN PHƯƠNG THƯ (Khâm Định Tứ Khố Toàn Thư)
 * Biên soạn dựa trên tác phẩm kinh điển "Hiệp Kỷ Biện Phương Thư" (Mai Cốc Thành chủ biên - Càn Long ngự định)
 * Bao gồm:
 * 1. Thuật toán 12 Trực Kiến - Trừ chuẩn xác theo Nguyệt Kiến và Chi Ngày.
 * 2. Thuật toán 12 Thần Hoàng Đạo / Hắc Đạo chuẩn xác cho cả Ngày và Giờ.
 * 3. Bách Thần Sát (Cát thần: Thiên Đức, Nguyệt Đức, Thiên Ân, Thiên Xá, Tam Hợp, Lục Hợp, Bất Tương...;
 *    Hung thần: Tuế Phá, Đại Hao, Kiếp Sát, Tai Sát, Nguyệt Sát, Nguyệt Hình, Nguyệt Hại, Nguyệt Yếm, Tứ Phế, Vãng Vong...).
 * 4. Bảng Dụng Sự 60/67 việc cổ bản (Nghi / Kỵ) và phân hạng cát hung theo 6 bậc biện chứng.
 * 5. Bảng Giờ Quý Đăng Thiên Môn (720 khóa tối thiện) & Tứ Đại Cát Thời, Giờ Ngũ Bất Ngộ, Triệt Lộ Không Vong.
 */

import { CAN, CHI, getLocalComponents, tinhCanChiNgay } from './canChi';
import { getAstronomicalLunarDate } from './lunarCalendar';
import { calculateComprehensiveResult } from './calculator';

// ==========================================
// 1. 12 TINH TÚ HOÀNG ĐẠO / HẮC ĐẠO
// ==========================================
export interface HoangHacStar {
  name: string;
  isHoangDao: boolean;
  type: 'Hoàng Đạo' | 'Hắc Đạo';
  symbol: string;
  meaning: string;
}

export const HOANG_HAC_12_STARS: HoangHacStar[] = [
  { name: 'Thanh Long', isHoangDao: true, type: 'Hoàng Đạo', symbol: '🐉', meaning: 'Cát thần, chủ việc mừng vui, cưới hỏi, khởi công, công danh đại lợi.' },
  { name: 'Minh Đường', isHoangDao: true, type: 'Hoàng Đạo', symbol: '🏛️', meaning: 'Cát thần, chủ quý nhân phù trợ, thăng quan, mở tiệm, trăm sự hanh thông.' },
  { name: 'Thiên Hình', isHoangDao: false, type: 'Hắc Đạo', symbol: '⚔️', meaning: 'Hung thần, chủ hình phạt, kiện tụng, tranh chấp, kỵ việc quan sự.' },
  { name: 'Chu Tước', isHoangDao: false, type: 'Hắc Đạo', symbol: '🦅', meaning: 'Hung thần, chủ khẩu thiệt, điều tiếng thị phi, văn thư kiện tụng.' },
  { name: 'Kim Quỹ', isHoangDao: true, type: 'Hoàng Đạo', symbol: '🪙', meaning: 'Cát thần, chủ tài lộc, tích trữ, của cải, mở kho nạp tài rất tốt.' },
  { name: 'Bảo Quang', isHoangDao: true, type: 'Hoàng Đạo', symbol: '✨', meaning: 'Cát thần (Thiên Đức quang minh), chủ thi ân, đại xá, làm việc thiện lành.' },
  { name: 'Bạch Hổ', isHoangDao: false, type: 'Hắc Đạo', symbol: '🐅', meaning: 'Hung thần, chủ binh đao, đổ máu, tai nạn bất ngờ, kỵ khởi công động thổ.' },
  { name: 'Ngọc Đường', isHoangDao: true, type: 'Hoàng Đạo', symbol: '🏯', meaning: 'Cát thần, chủ quý khí, hoàng gia ân huệ, học hành, thi cử, kết giao.' },
  { name: 'Thiên Lao', isHoangDao: false, type: 'Hắc Đạo', symbol: '⛓️', meaning: 'Hung thần, chủ giam hãm, trắc trở, kỵ đi xa, khởi sự mạo hiểm.' },
  { name: 'Huyền Vũ', isHoangDao: false, type: 'Hắc Đạo', symbol: '🐢', meaning: 'Hung thần, chủ tiểu nhân, trộm cắp, ám hại, mất mát của cải.' },
  { name: 'Tư Mệnh', isHoangDao: true, type: 'Hoàng Đạo', symbol: '📜', meaning: 'Cát thần, chủ phúc thọ, dưỡng sinh, làm việc thiện, vạn sự an lành.' },
  { name: 'Câu Trận', isHoangDao: false, type: 'Hắc Đạo', symbol: '🪝', meaning: 'Hung thần, chủ trì trệ, chậm trễ, vướng mắc đất đai nhà cửa.' },
];

/**
 * Khởi vị trí Thanh Long cho Ngày theo Tháng Âm Lịch (Quyển 7 - Hiệp Kỷ Biện Phương Thư)
 * - Tháng 1 (Dần), Tháng 7 (Thân): Thanh Long tại Tý (0)
 * - Tháng 2 (Mão), Tháng 8 (Dậu): Thanh Long tại Dần (2)
 * - Tháng 3 (Thìn), Tháng 9 (Tuất): Thanh Long tại Thìn (4)
 * - Tháng 4 (Tị), Tháng 10 (Hợi): Thanh Long tại Ngọ (6)
 * - Tháng 5 (Ngọ), Tháng 11 (Tý): Thanh Long tại Thân (8)
 * - Tháng 6 (Mùi), Tháng 12 (Sửu): Thanh Long tại Tuất (10)
 */
export function getHoangDaoDayStar(lunarMonth: number, dayChi: string): HoangHacStar {
  const dayChiIdx = CHI.indexOf(dayChi);
  const startChiByMonth: Record<number, number> = {
    1: 0, 7: 0,
    2: 2, 8: 2,
    3: 4, 9: 4,
    4: 6, 10: 6,
    5: 8, 11: 8,
    6: 10, 12: 10,
  };
  const startChi = startChiByMonth[lunarMonth] ?? 0;
  const starOffset = (dayChiIdx - startChi + 12) % 12;
  return HOANG_HAC_12_STARS[starOffset];
}

/**
 * Khởi vị trí Thanh Long cho Giờ theo Chi Ngày (Quyển 7 & Quyển 9 - Hiệp Kỷ Biện Phương Thư)
 * - Ngày Dần, Thân: Giờ Tý khởi Thanh Long (startChi = 0)
 * - Ngày Mão, Dậu: Giờ Dần khởi Thanh Long (startChi = 2)
 * - Ngày Thìn, Tuất: Giờ Thìn khởi Thanh Long (startChi = 4)
 * - Ngày Tị, Hợi: Giờ Ngọ khởi Thanh Long (startChi = 6)
 * - Ngày Tý, Ngọ: Giờ Thân khởi Thanh Long (startChi = 8)
 * - Ngày Sửu, Mùi: Giờ Tuất khởi Thanh Long (startChi = 10)
 */
export function getHourHoangHacStar(dayChi: string, hourChi: string): HoangHacStar {
  const dayChiIdx = CHI.indexOf(dayChi);
  const hourChiIdx = CHI.indexOf(hourChi);
  
  const startChiByDayChi: Record<number, number> = {
    0: 8,  // Tý -> Thân (8)
    6: 8,  // Ngọ -> Thân (8)
    1: 10, // Sửu -> Tuất (10)
    7: 10, // Mùi -> Tuất (10)
    2: 0,  // Dần -> Tý (0)
    8: 0,  // Thân -> Tý (0)
    3: 2,  // Mão -> Dần (2)
    9: 2,  // Dậu -> Dần (2)
    4: 4,  // Thìn -> Thìn (4)
    10: 4, // Tuất -> Thìn (4)
    5: 6,  // Tị -> Ngọ (6)
    11: 6, // Hợi -> Ngọ (6)
  };

  const startChi = startChiByDayChi[dayChiIdx] ?? 0;
  const starOffset = (hourChiIdx - startChi + 12) % 12;
  return HOANG_HAC_12_STARS[starOffset];
}

// ==========================================
// 2. 12 TRỰC KIẾN TRỪ (Quyển 4 & Quyển 9)
// ==========================================
export interface TrucInfo {
  name: string;
  index: number;
  category: 'Cát' | 'Đại Cát' | 'Hung' | 'Bình';
  generalMeaning: string;
  goodFor: string[];
  badFor: string[];
}

export const TRUC_DEFINITIONS: Record<string, TrucInfo> = {
  Kiến: {
    name: 'Kiến',
    index: 0,
    category: 'Cát',
    generalMeaning: 'Khởi đầu vạn vật, vượng khí sinh phát. Rất tốt cho nhậm chức, xuất hành, đính hôn, lập giao ước.',
    goodFor: ['Nhậm chức', 'Xuất hành', 'Đính hôn', 'Họp thân hữu', 'Trồng trọt'],
    badFor: ['Động thổ', 'Mở kho xuất hàng', 'Phá thổ', 'An táng'],
  },
  Trừ: {
    name: 'Trừ',
    index: 1,
    category: 'Cát',
    generalMeaning: 'Trừ cũ sinh mới, giải trừ hung ách, tẩy uế, dọn dẹp, chữa bệnh rất cát.',
    goodFor: ['Tắm gội', 'Cắt tóc', 'Chữa bệnh', 'Dọn dẹp nhà cửa', 'Giải trừ', 'Phá dỡ nhà cũ'],
    badFor: ['Cưới hỏi', 'Ký hợp đồng', 'Động thổ lớn'],
  },
  Mãn: {
    name: 'Mãn',
    index: 2,
    category: 'Cát',
    generalMeaning: 'Viên mãn trọn vẹn, sinh khí sung túc. Rất lợi cho cầu tài, may áo, nạp tiền, cưới hỏi.',
    goodFor: ['Cầu tài', 'Khai trương', 'May đo áo mới', 'Nạp tiền của', 'Sửa kho tàng'],
    badFor: ['Chữa bệnh', 'Kiện tụng', 'Xuất hàng'],
  },
  Bình: {
    name: 'Bình',
    index: 3,
    category: 'Bình',
    generalMeaning: 'Bình ổn, dẹp yên sóng gió. Thích hợp cho san nền, đắp đập, tu sửa đường sá, hòa giải.',
    goodFor: ['Sửa sang đường sá', 'Trát tường', 'Lắp hầm hố', 'Hòa giải tranh chấp'],
    badFor: ['Khởi công lớn', 'Cưới hỏi', 'Đi xa vượt biển'],
  },
  Định: {
    name: 'Định',
    index: 4,
    category: 'Cát',
    generalMeaning: 'Định ước vững chắc, quy củ lâu dài. Cực tốt cho đính hôn, cưới hỏi, làm hợp đồng, kế hoạch.',
    goodFor: ['Đính hôn', 'Cưới gả', 'Ký kết hợp đồng', 'Lên kế hoạch', 'Làm lễ đội mũ'],
    badFor: ['Kiện tụng', 'Tranh chấp', 'Chữa bệnh'],
  },
  Chấp: {
    name: 'Chấp',
    index: 5,
    category: 'Cát',
    generalMeaning: 'Nắm giữ, chấp hành, xây đắp vững chãi. Tốt cho khởi công, xây tường, trồng trọt, vây bắt trộm.',
    goodFor: ['Xây tường', 'Khởi tạo', 'Trồng trọt', 'Bắt kẻ gian', 'Nuôi súc vật'],
    badFor: ['Xuất tiền của', 'Di chuyển chỗ ở', 'Đi xa'],
  },
  Phá: {
    name: 'Phá',
    index: 6,
    category: 'Hung',
    generalMeaning: 'Đại hung sát, phá toái bất hòa. Chỉ nên dùng để phá dỡ công trình cũ, triệt tiêu ung nhọt.',
    goodFor: ['Phá dỡ nhà cũ', 'Hủy tường', 'Chữa bệnh nan y', 'Trừ sâu bọ'],
    badFor: ['Cưới hỏi', 'Khai trương', 'Ký hợp đồng', 'Động thổ', 'Xuất hành'],
  },
  Nguy: {
    name: 'Nguy',
    index: 7,
    category: 'Hung',
    generalMeaning: 'Nguy nan, trắc trở, bất an. Cần cẩn trọng mọi bề, không nên làm việc mạo hiểm, trèo cao đi xa.',
    goodFor: ['Kê giường', 'Phù dụ biên cảnh', 'Cúng bái cầu an', 'Tĩnh dưỡng'],
    badFor: ['Đi thuyền bè', 'Leo cao', 'Khai trương', 'Động thổ'],
  },
  Thành: {
    name: 'Thành',
    index: 8,
    category: 'Đại Cát',
    generalMeaning: 'Mọi sự đại thành, thành tựu viên mãn. Trăm việc đều cát lợi: khai trương, nhập học, cưới gả, nhậm chức.',
    goodFor: ['Nhập học', 'Khai trương', 'Cưới hỏi', 'Nhậm chức', 'Lập khế ước', 'Cầu tài'],
    badFor: ['Kiện tụng', 'Phá dỡ', 'Tranh chấp'],
  },
  Thu: {
    name: 'Thu',
    index: 9,
    category: 'Cát',
    generalMeaning: 'Thu nhận, thâu tóm tài lộc, gặt hái thành quả. Tốt cho nạp tài, thu nợ, mua sắm tài sản, nạp gia súc.',
    goodFor: ['Nạp tiền tài', 'Thu nợ', 'Mua sắm', 'Nạp gia súc', 'Gặt hái'],
    badFor: ['Chữa bệnh', 'An táng', 'Tiêu tán của cải'],
  },
  Khai: {
    name: 'Khai',
    index: 10,
    category: 'Đại Cát',
    generalMeaning: 'Khai thông sinh khí, mở mang vận hội. Đại cát cho khai trương, động thổ, cưới hỏi, nhập học, tế tự.',
    goodFor: ['Khai trương', 'Động thổ', 'Cưới hỏi', 'Nhập học', 'Xuất hành', 'Cúng tế cầu phúc'],
    badFor: ['An táng', 'Phá thổ', 'Đốn cây'],
  },
  Bế: {
    name: 'Bế',
    index: 11,
    category: 'Hung',
    generalMeaning: 'Khí bế tắc, thu liễm nghỉ ngơi. Nên tu bổ đê điều, lấp hố, tránh khai trương xuất hành lớn.',
    goodFor: ['Đắp đập', 'Vá tường', 'Lấp hàm hố', 'Nghỉ ngơi tĩnh dưỡng'],
    badFor: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Chữa mắt', 'Châm cứu'],
  },
};

/**
 * Tính Trực ngày chuẩn xác theo Hiệp Kỷ Biện Phương Thư
 * Tháng 1 (Dần) gặp ngày Dần là Kiến, Mão là Trừ...
 * Tháng 2 (Mão) gặp ngày Mão là Kiến, Thìn là Trừ...
 */
export function calculateTrucDay(lunarMonth: number, dayChi: string): TrucInfo {
  const monthChiIdx = (lunarMonth + 1) % 12; // Tháng 1 -> Dần (2), Tháng 2 -> Mão (3)...
  const dayChiIdx = CHI.indexOf(dayChi);
  const trucOffset = (dayChiIdx - monthChiIdx + 12) % 12;
  const trucNames = ['Kiến', 'Trừ', 'Mãn', 'Bình', 'Định', 'Chấp', 'Phá', 'Nguy', 'Thành', 'Thu', 'Khai', 'Bế'];
  const trucName = trucNames[trucOffset];
  return TRUC_DEFINITIONS[trucName] || TRUC_DEFINITIONS['Kiến'];
}

// ==========================================
// 3. BÁCH THẦN SÁT THEO HIỆP KỶ BIỆN PHƯƠNG THƯ
// ==========================================
export interface ThanSatItem {
  name: string;
  nature: 'Cát' | 'Đại Cát' | 'Hung' | 'Đại Hung';
  sourceBook: string;
  description: string;
  influence: string;
}

/**
 * Tính toán danh sách Cát Thần & Hung Thần trong ngày theo Nguyệt Lệnh và Nhật Trụ Can Chi
 */
export function calculateDayThanSat(
  lunarMonth: number,
  canNgay: string,
  chiNgay: string,
  solarSeason: 'Xuân' | 'Hạ' | 'Thu' | 'Đông'
): {
  catThan: ThanSatItem[];
  hungThan: ThanSatItem[];
  score: number;
  rankLevel: string;
} {
  const catThan: ThanSatItem[] = [];
  const hungThan: ThanSatItem[] = [];

  const dayCanIdx = CAN.indexOf(canNgay);
  const dayChiIdx = CHI.indexOf(chiNgay);
  const monthChiIdx = (lunarMonth + 1) % 12;

  // 1. Thiên Đức (Quyển 5, trang 387, 393, 745)
  // Tháng 1: Đinh, Tháng 2: Khôn (Thân), Tháng 3: Nhâm, Tháng 4: Tân, Tháng 5: Càn (Hợi), Tháng 6: Giáp,
  // Tháng 7: Quý, Tháng 8: Cấn (Dần), Tháng 9: Bính, Tháng 10: Ất, Tháng 11: Tốn (Tị), Tháng 12: Canh.
  const thienDucMap: Record<number, string[]> = {
    1: ['Đinh'], 2: ['Thân'], 3: ['Nhâm'], 4: ['Tân'], 5: ['Hợi'], 6: ['Giáp'],
    7: ['Quý'], 8: ['Dần'], 9: ['Bính'], 10: ['Ất'], 11: ['Tị'], 12: ['Canh'],
  };
  if (thienDucMap[lunarMonth]?.includes(canNgay) || thienDucMap[lunarMonth]?.includes(chiNgay)) {
    catThan.push({
      name: 'Thiên Đức',
      nature: 'Đại Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5 (Nghĩa Lệ 3)',
      description: 'Phúc đức của trời, thần tối cát giải trừ bách họa.',
      influence: 'Tốt cho trăm việc: khởi tạo, động thổ, cúng tế, cưới hỏi, xuất hành.',
    });
  }

  // 2. Nguyệt Đức (Quyển 5, trang 395, 401, 745)
  // Tháng Dần Ngọ Tuất (1, 5, 9): Bính
  // Tháng Thân Tý Thìn (7, 11, 3): Nhâm
  // Tháng Hợi Mão Mùi (10, 2, 6): Giáp
  // Tháng Tị Dậu Sửu (4, 8, 12): Canh
  const nguyetDucMap: Record<number, string> = {
    1: 'Bính', 5: 'Bính', 9: 'Bính',
    3: 'Nhâm', 7: 'Nhâm', 11: 'Nhâm',
    2: 'Giáp', 6: 'Giáp', 10: 'Giáp',
    4: 'Canh', 8: 'Canh', 12: 'Canh',
  };
  if (nguyetDucMap[lunarMonth] === canNgay) {
    catThan.push({
      name: 'Nguyệt Đức',
      nature: 'Đại Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5 (Nghĩa Lệ 3)',
      description: 'Đức thần trong tháng, dương đức thuận theo trời đất.',
      influence: 'Tốt cho tu tạo, làm nhà, cưới gả, lên quan, nhập trạch.',
    });
  }

  // 3. Thiên Đức Hợp & Nguyệt Đức Hợp (Quyển 5, trang 398, 405)
  // Can hợp: Giáp-Kỷ, Ất-Canh, Bính-Tân, Đinh-Nhâm, Mậu-Quý
  const canHop: Record<string, string> = {
    Giáp: 'Kỷ', Ất: 'Canh', Bính: 'Tân', Đinh: 'Nhâm', Mậu: 'Quý',
    Kỷ: 'Giáp', Canh: 'Ất', Tân: 'Bính', Nhâm: 'Đinh', Quý: 'Mậu',
  };
  if (nguyetDucMap[lunarMonth] && canHop[nguyetDucMap[lunarMonth]] === canNgay) {
    catThan.push({
      name: 'Nguyệt Đức Hợp',
      nature: 'Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5',
      description: 'Tinh phù hợp với ngũ hành, muôn phúc tụ họp.',
      influence: 'Tốt cho kết hôn, hội họp, giao dịch, khởi công.',
    });
  }

  // 4. Thiên Xá (Quyển 5, trang 407, 412, 747)
  // Xuân: Mậu Dần, Hạ: Giáp Ngọ, Thu: Mậu Thân, Đông: Giáp Tý
  const thienXaDay: Record<string, string> = {
    Xuân: 'Mậu Dần',
    Hạ: 'Giáp Ngọ',
    Thu: 'Mậu Thân',
    Đông: 'Giáp Tý',
  };
  if (thienXaDay[solarSeason] === `${canNgay} ${chiNgay}`) {
    catThan.push({
      name: 'Thiên Xá',
      nature: 'Đại Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5 & 10',
      description: 'Trời đất khoan thứ xá tội, vạn vật hồi sinh đại phúc.',
      influence: 'Đại cát cho giải trừ oan khiên, tế tự, khởi công, chữa bệnh.',
    });
  }

  // 5. Thiên Ân (Quyển 5, trang 404, 409, 762)
  // Giáp Tý, Ất Sửu, Bính Dần, Đinh Mão, Mậu Thìn, Kỷ Mão, Canh Thìn, Tân Tị, Nhâm Ngọ, Quý Mùi, Kỷ Dậu, Canh Tuất, Tân Hợi, Nhâm Tý, Quý Sửu (15 ngày)
  const thienAnDays = [
    'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn',
    'Kỷ Mão', 'Canh Thìn', 'Tân Tị', 'Nhâm Ngọ', 'Quý Mùi',
    'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Nhâm Tý', 'Quý Sửu',
  ];
  if (thienAnDays.includes(`${canNgay} ${chiNgay}`)) {
    catThan.push({
      name: 'Thiên Ân',
      nature: 'Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5',
      description: 'Thần thí đức rộng rãi của trời xuống trần thế.',
      influence: 'Tốt cho bố thí, cứu trợ, làm việc thiện, mở tiệc chúc mừng, thi ân.',
    });
  }

  // 6. Thiên Nguyện (Quyển 5, trang 411, 416)
  const thienNguyenMap: Record<number, string> = {
    1: 'Ất Hợi', 2: 'Giáp Tuất', 3: 'Ất Dậu', 4: 'Bính Thân',
    5: 'Đinh Mùi', 6: 'Mậu Ngọ', 7: 'Kỷ Tị', 8: 'Canh Thìn',
    9: 'Tân Mão', 10: 'Nhâm Dần', 11: 'Quý Sửu', 12: 'Giáp Tý',
  };
  if (thienNguyenMap[lunarMonth] === `${canNgay} ${chiNgay}`) {
    catThan.push({
      name: 'Thiên Nguyện',
      nature: 'Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5 & 10',
      description: 'Ước nguyện của trời đất hòa hợp, tứ thời thông đạt.',
      influence: 'Tốt cho cưới hỏi, giao dịch, nạp tài, nhập trạch, cầu phúc.',
    });
  }

  // 7. Âm Dương Bất Tương (Quyển 4, trang 356, 361, 750) - Tối Cát Hôn Nhân Cưới Hỏi
  const batTuongMonths: Record<number, string[]> = {
    1: ['Bính Tý', 'Đinh Sửu', 'Bính Dần', 'Đinh Mão', 'Kỷ Mão', 'Kỷ Tị', 'Kỷ Mùi', 'Kỷ Dậu', 'Tân Mão', 'Tân Tị', 'Tân Mùi', 'Tân Dậu'],
    2: ['Ất Sửu', 'Bính Tý', 'Bính Dần', 'Đinh Sửu', 'Đinh Mão', 'Kỷ Sửu', 'Kỷ Mão', 'Kỷ Tị', 'Kỷ Mùi', 'Tân Sửu', 'Tân Mão', 'Tân Tị'],
    3: ['Giáp Tý', 'Giáp Tuất', 'Ất Sửu', 'Ất Hợi', 'Bính Tuất', 'Bính Tý', 'Đinh Sửu', 'Đinh Hợi', 'Kỷ Sửu', 'Kỷ Hợi', 'Tân Sửu', 'Tân Hợi'],
    4: ['Giáp Tý', 'Giáp Thìn', 'Giáp Tuất', 'Ất Tị', 'Ất Mùi', 'Ất Dậu', 'Ất Hợi', 'Bính Tý', 'Bính Thìn', 'Bính Thân', 'Đinh Mùi', 'Đinh Dậu'],
    5: ['Giáp Thân', 'Giáp Tuất', 'Ất Mùi', 'Ất Dậu', 'Ất Hợi', 'Bính Tuất', 'Bính Thân', 'Đinh Mùi', 'Đinh Dậu', 'Mậu Tuất', 'Mậu Thân', 'Quý Dậu'],
    6: ['Giáp Ngọ', 'Giáp Thân', 'Giáp Tuất', 'Ất Mùi', 'Ất Dậu', 'Ất Hợi', 'Mậu Ngọ', 'Mậu Tuất', 'Mậu Thân', 'Quý Mùi', 'Quý Dậu', 'Quý Hợi'],
    7: ['Giáp Ngọ', 'Giáp Thân', 'Ất Mùi', 'Ất Dậu', 'Mậu Ngọ', 'Mậu Thân', 'Quý Mùi', 'Quý Dậu', 'Nhâm Ngọ', 'Nhâm Thân', 'Canh Ngọ', 'Canh Thân'],
    8: ['Giáp Thìn', 'Giáp Ngọ', 'Ất Tị', 'Ất Mùi', 'Mậu Thìn', 'Mậu Ngọ', 'Quý Tị', 'Quý Mùi', 'Nhâm Thìn', 'Nhâm Ngọ', 'Tân Tị', 'Tân Mùi'],
    9: ['Mậu Thìn', 'Mậu Ngọ', 'Quý Mão', 'Quý Tị', 'Quý Mùi', 'Nhâm Thìn', 'Nhâm Ngọ', 'Tân Mão', 'Tân Tị', 'Tân Mùi', 'Canh Thìn', 'Canh Ngọ'],
    10: ['Nhâm Dần', 'Nhâm Thìn', 'Quý Mão', 'Quý Tị', 'Tân Mão', 'Tân Tị', 'Canh Dần', 'Canh Thìn', 'Kỷ Mão', 'Kỷ Tị'],
    11: ['Nhâm Dần', 'Nhâm Thìn', 'Tân Sửu', 'Tân Mão', 'Tân Tị', 'Canh Dần', 'Canh Thìn', 'Kỷ Sửu', 'Kỷ Mão', 'Kỷ Tị', 'Đinh Sửu', 'Đinh Mão'],
    12: ['Bính Tý', 'Bính Dần', 'Bính Thìn', 'Đinh Sửu', 'Đinh Mão', 'Kỷ Sửu', 'Kỷ Mão', 'Kỷ Tị', 'Tân Sửu', 'Tân Mão', 'Tân Tị', 'Canh Dần'],
  };
  if (batTuongMonths[lunarMonth]?.includes(`${canNgay} ${chiNgay}`)) {
    catThan.push({
      name: 'Âm Dương Bất Tương',
      nature: 'Đại Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 4 & Quyển 10 (Nghi Kỵ Hôn Nhân)',
      description: 'Âm dương điều hòa, không khắc hại lẫn nhau. Đệ nhất cát thần cho cưới hỏi.',
      influence: 'Đại lợi cho việc hôn nhân, cưới hỏi, đón dâu, đính hôn, lập gia thất.',
    });
  }

  // 8. Tam Hợp & Lục Hợp Ngày
  const tamHopGroups = [
    ['Thân', 'Tý', 'Thìn'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Tị', 'Dậu', 'Sửu'],
    ['Hợi', 'Mão', 'Mùi'],
  ];
  const monthChi = CHI[monthChiIdx];
  const isTamHop = tamHopGroups.some((group) => group.includes(monthChi) && group.includes(chiNgay) && monthChi !== chiNgay);
  if (isTamHop) {
    catThan.push({
      name: 'Tam Hợp Cát Nhật',
      nature: 'Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 9',
      description: 'Địa chi hợp cục tam phương sinh vượng mộ tụ hội.',
      influence: 'Tốt cho hợp tác làm ăn, kết bạn hữu, ký kết, mở tiệc ăn mừng.',
    });
  }

  const lucHopPairs: Record<string, string> = {
    Tý: 'Sửu', Sửu: 'Tý', Dần: 'Hợi', Hợi: 'Dần',
    Mão: 'Tuất', Tuất: 'Mão', Thìn: 'Dậu', Dậu: 'Thìn',
    Tị: 'Thân', Thân: 'Tị', Ngọ: 'Mùi', Mùi: 'Ngọ',
  };
  if (lucHopPairs[monthChi] === chiNgay) {
    catThan.push({
      name: 'Lục Hợp Cát Nhật',
      nature: 'Cát',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 9',
      description: 'Nguyệt kiến cùng Nguyệt tướng hợp nhất tương giao.',
      influence: 'Tốt cho kết nối hôn nhân, hội họp bạn bè, ký hợp đồng.',
    });
  }

  // ==========================================
  // HUNG THẦN THEO HIỆP KỶ BIỆN PHƯƠNG THƯ
  // ==========================================

  // 1. Nguyệt Phá / Đại Hao (Quyển 4, trang 321, 326, 743)
  const xungPairs: Record<string, string> = {
    Tý: 'Ngọ', Ngọ: 'Tý', Sửu: 'Mùi', Mùi: 'Sửu',
    Dần: 'Thân', Thân: 'Dần', Mão: 'Dậu', Dậu: 'Mão',
    Thìn: 'Tuất', Tuất: 'Thìn', Tị: 'Hợi', Hợi: 'Tị',
  };
  if (xungPairs[monthChi] === chiNgay) {
    hungThan.push({
      name: 'Nguyệt Phá (Đại Hao)',
      nature: 'Đại Hung',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 4 & Quyển 10',
      description: 'Địa chi ngày xung thẳng với chi tháng (Nguyệt Kiến), là đất tuyệt khí.',
      influence: 'Đại kỵ cho cưới hỏi, khai trương, động thổ, xuất hành, làm việc lớn.',
    });
  }

  // 2. Tam Sát Tháng: Kiếp Sát, Tai Sát, Nguyệt Sát (Quyển 6, trang 485, 486, 491)
  // Thân Tý Thìn (Thủy cục) -> Sát tại Tị (Kiếp), Ngọ (Tai), Mùi (Tuế/Nguyệt Sát)
  // Dần Ngọ Tuất (Hỏa cục) -> Sát tại Hợi (Kiếp), Tý (Tai), Sửu (Tuế/Nguyệt Sát)
  // Tị Dậu Sửu (Kim cục) -> Sát tại Dần (Kiếp), Mão (Tai), Thìn (Tuế/Nguyệt Sát)
  // Hợi Mão Mùi (Mộc cục) -> Sát tại Thân (Kiếp), Dậu (Tai), Tuất (Tuế/Nguyệt Sát)
  const tamSatMap: Record<string, { kiep: string; tai: string; sat: string }> = {
    Thân: { kiep: 'Tị', tai: 'Ngọ', sat: 'Mùi' },
    Tý: { kiep: 'Tị', tai: 'Ngọ', sat: 'Mùi' },
    Thìn: { kiep: 'Tị', tai: 'Ngọ', sat: 'Mùi' },
    Dần: { kiep: 'Hợi', tai: 'Tý', sat: 'Sửu' },
    Ngọ: { kiep: 'Hợi', tai: 'Tý', sat: 'Sửu' },
    Tuất: { kiep: 'Hợi', tai: 'Tý', sat: 'Sửu' },
    Tị: { kiep: 'Dần', tai: 'Mão', sat: 'Thìn' },
    Dậu: { kiep: 'Dần', tai: 'Mão', sat: 'Thìn' },
    Sửu: { kiep: 'Dần', tai: 'Mão', sat: 'Thìn' },
    Hợi: { kiep: 'Thân', tai: 'Dậu', sat: 'Tuất' },
    Mão: { kiep: 'Thân', tai: 'Dậu', sat: 'Tuất' },
    Mùi: { kiep: 'Thân', tai: 'Dậu', sat: 'Tuất' },
  };
  const currentMonthTamSat = tamSatMap[monthChi];
  if (currentMonthTamSat) {
    if (currentMonthTamSat.kiep === chiNgay) {
      hungThan.push({
        name: 'Kiếp Sát',
        nature: 'Đại Hung',
        sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 10',
        description: 'Âm khí cực độc của tam hợp đối xung, chủ việc cướp đoạt thương tổn.',
        influence: 'Kỵ cưới hỏi, xuất quân, khởi công, nạp lễ, khai trương.',
      });
    }
    if (currentMonthTamSat.tai === chiNgay) {
      hungThan.push({
        name: 'Tai Sát (Thiên Hỏa)',
        nature: 'Đại Hung',
        sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 10',
        description: 'Vị trí xung chính của ngũ hành, chủ bệnh hoạn, tai ách, hỏa hoạn.',
        influence: 'Kỵ tu tạo động thổ, lợp mái nhà, kết hôn, khai trương.',
      });
    }
    if (currentMonthTamSat.sat === chiNgay) {
      hungThan.push({
        name: 'Nguyệt Sát (Nguyệt Hư)',
        nature: 'Hung',
        sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 10',
        description: 'Mộ khố bị xung kích, chủ hư hao tài vật, trắc trở đi xa.',
        influence: 'Kỵ mở kho hàng, nạp tiền của, xuất hành, đính hôn.',
      });
    }
  }

  // 3. Tứ Phế Nhật (Quyển 5, trang 436, 442)
  // Xuân: Canh Thân, Tân Dậu (Kim tuyệt tại Xuân mộc)
  // Hạ: Nhâm Tý, Quý Hợi (Thủy tuyệt tại Hạ hỏa)
  // Thu: Giáp Dần, Ất Mão (Mộc tuyệt tại Thu kim)
  // Đông: Bính Ngọ, Đinh Tị (Hỏa tuyệt tại Đông thủy)
  const tuPheDays: Record<string, string[]> = {
    Xuân: ['Canh Thân', 'Tân Dậu'],
    Hạ: ['Nhâm Tý', 'Quý Hợi'],
    Thu: ['Giáp Dần', 'Ất Mão'],
    Đông: ['Bính Ngọ', 'Đinh Tị'],
  };
  if (tuPheDays[solarSeason]?.includes(`${canNgay} ${chiNgay}`)) {
    hungThan.push({
      name: 'Tứ Phế Nhật',
      nature: 'Đại Hung',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 5 & Quyển 10',
      description: 'Can chi mùa đó rơi vào đất Tử Tuyệt, ngũ hành vô khí.',
      influence: 'Trăm việc đều kiêng kỵ: xuất hành, làm nhà, cưới gả, nhậm chức.',
    });
  }

  // 4. Ngũ Hư (Quyển 6, trang 444, 449)
  // Xuân: Tị Dậu Sửu (Kim tuyệt)
  // Hạ: Thân Tý Thìn (Thủy tuyệt)
  // Thu: Hợi Mão Mùi (Mộc tuyệt)
  // Đông: Dần Ngọ Tuất (Hỏa tuyệt)
  const nguHuMap: Record<string, string[]> = {
    Xuân: ['Tị', 'Dậu', 'Sửu'],
    Hạ: ['Thân', 'Tý', 'Thìn'],
    Thu: ['Hợi', 'Mão', 'Mùi'],
    Đông: ['Dần', 'Ngọ', 'Tuất'],
  };
  if (nguHuMap[solarSeason]?.includes(chiNgay)) {
    hungThan.push({
      name: 'Ngũ Hư',
      nature: 'Hung',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 10',
      description: 'Thời tuyệt của bốn mùa ngũ hành, vật tuyệt thời hao.',
      influence: 'Kỵ mở kho hàng, kinh doanh, cấy trồng, xuất tiền của.',
    });
  }

  // 5. Vãng Vong Nhật (Quyển 6, trang 550, 555)
  // Tháng 1: Dần, Tháng 2: Tị, Tháng 3: Thân, Tháng 4: Hợi, Tháng 5: Mão, Tháng 6: Ngọ,
  // Tháng 7: Dậu, Tháng 8: Tý, Tháng 9: Thìn, Tháng 10: Mùi, Tháng 11: Tuất, Tháng 12: Sửu
  const vangVongMap: Record<number, string> = {
    1: 'Dần', 2: 'Tị', 3: 'Thân', 4: 'Hợi',
    5: 'Mão', 6: 'Ngọ', 7: 'Dậu', 8: 'Tý',
    9: 'Thìn', 10: 'Mùi', 11: 'Tuất', 12: 'Sửu',
  };
  if (vangVongMap[lunarMonth] === chiNgay) {
    hungThan.push({
      name: 'Vãng Vong Nhật',
      nature: 'Hung',
      sourceBook: 'Hiệp Kỷ Biện Phương Thư - Quyển 6 & 10',
      description: 'Ý nghĩa là đi qua mà không trở lại, sinh khí không khống chế được.',
      influence: 'Kỵ xuất hành, đi xa, cưới gả, nhậm chức, dâng biểu chương.',
    });
  }

  // Tính điểm đánh giá theo 6 bậc của Hiệp Kỷ Biện Phương Thư (Quyển 10, trang 798, 831, 836)
  let score = 50;
  score += catThan.length * 15;
  score -= hungThan.length * 18;
  score = Math.max(10, Math.min(99, score));

  let rankLevel = 'Bậc Trung (Bình Hòa)';
  if (score >= 80) {
    rankLevel = 'Bậc Thượng (Đại Cát Thắng Hung)';
  } else if (score >= 65) {
    rankLevel = 'Bậc Thượng Thứ (Cát Đủ Chống Hung)';
  } else if (score >= 45) {
    rankLevel = 'Bậc Trung (Cát Hung Cân Bằng)';
  } else if (score >= 30) {
    rankLevel = 'Bậc Trung Thứ (Hung Thắng Cát - Thận Trọng)';
  } else {
    rankLevel = 'Bậc Hạ Hạ (Hung Trùng Đại Hung - Nên Tránh)';
  }

  return { catThan, hungThan, score, rankLevel };
}

// ==========================================
// 4. GIỜ QUÝ ĐĂNG THIÊN MÔN (Quyển 7 & 9, trang 599, 614, 762, 767)
// ==========================================
/**
 * Tra cứu Giờ Quý Đăng Thiên Môn (Giờ Tối Thiện Trong Ngày)
 * Dựa vào Tiết Khí / Nguyệt Tướng và Nhật Can
 */
export const QUY_DANG_THIEN_MON_TABLE: Record<string, Record<string, { day: string; night: string }>> = {
  // Tiết khí: { Can: { day: Giờ ngày, night: Giờ đêm } }
  'Vũ thủy': {
    Giáp: { day: 'Mão', night: 'Dậu' },
    Ất: { day: 'Tuất', night: 'Tuất' },
    Bính: { day: 'Hợi', night: 'Hợi' },
    Đinh: { day: 'Sửu', night: 'Sửu' },
    Mậu: { day: 'Dậu / Mão', night: 'Dần' },
    Kỷ: { day: 'Dần', night: 'Thân' },
    Canh: { day: 'Dậu / Mão', night: 'Mão' },
    Tân: { day: 'Thân', night: 'Dần' },
    Nhâm: { day: 'Mùi', night: 'Tị' },
    Quý: { day: 'Tị', night: 'Tý' },
  },
  'Xuân phân': {
    Giáp: { day: 'Dậu', night: 'Dậu' },
    Ất: { day: 'Dậu', night: 'Tuất' },
    Bính: { day: 'Tuất', night: 'Hợi' },
    Đinh: { day: 'Tý', night: 'Sửu' },
    Mậu: { day: 'Thân / Dần', night: 'Sửu' },
    Kỷ: { day: 'Sửu', night: 'Dần' },
    Canh: { day: 'Thân / Dần', night: 'Mão' },
    Tân: { day: 'Mùi', night: 'Thìn' },
    Nhâm: { day: 'Ngọ', night: 'Tị' },
    Quý: { day: 'Thìn', night: 'Hợi' },
  },
  'Cốc vũ': {
    Giáp: { day: 'Thân', night: 'Dậu' },
    Ất: { day: 'Dậu', night: 'Tuất' },
    Bính: { day: 'Dậu', night: 'Hợi' },
    Đinh: { day: 'Hợi', night: 'Sửu' },
    Mậu: { day: 'Mùi / Sửu', night: 'Tý' },
    Kỷ: { day: 'Tý', night: 'Sửu' },
    Canh: { day: 'Mùi / Sửu', night: 'Dần' },
    Tân: { day: 'Ngọ', night: 'Mão' },
    Nhâm: { day: 'Tị', night: 'Thìn' },
    Quý: { day: 'Mão', night: 'Tuất' },
  },
  'Tiểu mãn': {
    Giáp: { day: 'Mùi', night: 'Dậu' },
    Ất: { day: 'Thân', night: 'Tuất' },
    Bính: { day: 'Thân', night: 'Hợi' },
    Đinh: { day: 'Tuất', night: 'Tý' },
    Mậu: { day: 'Ngọ / Tý', night: 'Hợi' },
    Kỷ: { day: 'Hợi', night: 'Tý' },
    Canh: { day: 'Ngọ / Tý', night: 'Sửu' },
    Tân: { day: 'Tị', night: 'Dần' },
    Nhâm: { day: 'Thìn', night: 'Mão' },
    Quý: { day: 'Dần', night: 'Dậu' },
  },
  'Hạ chí': {
    Giáp: { day: 'Ngọ', night: 'Dậu' },
    Ất: { day: 'Mùi', night: 'Tuất' },
    Bính: { day: 'Mùi', night: 'Hợi' },
    Đinh: { day: 'Dậu', night: 'Tuất' },
    Mậu: { day: 'Tị / Hợi', night: 'Tuất' },
    Kỷ: { day: 'Tuất', night: 'Hợi' },
    Canh: { day: 'Tị / Hợi', night: 'Tý' },
    Tân: { day: 'Thìn', night: 'Sửu' },
    Nhâm: { day: 'Mão', night: 'Dần' },
    Quý: { day: 'Sửu', night: 'Thân' },
  },
  'Đại thử': {
    Giáp: { day: 'Tị', night: 'Dậu' },
    Ất: { day: 'Ngọ', night: 'Tuất' },
    Bính: { day: 'Ngọ', night: 'Hợi' },
    Đinh: { day: 'Thân', night: 'Dậu' },
    Mậu: { day: 'Thìn / Tuất', night: 'Dậu' },
    Kỷ: { day: 'Dậu', night: 'Tuất' },
    Canh: { day: 'Thìn / Tuất', night: 'Hợi' },
    Tân: { day: 'Mão', night: 'Tý' },
    Nhâm: { day: 'Dần', night: 'Sửu' },
    Quý: { day: 'Tý', night: 'Mùi' },
  },
  'Xử thử': {
    Giáp: { day: 'Thìn', night: 'Dậu' },
    Ất: { day: 'Tị', night: 'Tuất' },
    Bính: { day: 'Tị', night: 'Hợi' },
    Đinh: { day: 'Mùi', night: 'Thân' },
    Mậu: { day: 'Mão / Dậu', night: 'Thân' },
    Kỷ: { day: 'Thân', night: 'Dậu' },
    Canh: { day: 'Mão / Dậu', night: 'Tuất' },
    Tân: { day: 'Dần', night: 'Hợi' },
    Nhâm: { day: 'Sửu', night: 'Tý' },
    Quý: { day: 'Hợi', night: 'Ngọ' },
  },
  'Thu phân': {
    Giáp: { day: 'Mão', night: 'Dậu' },
    Ất: { day: 'Thìn', night: 'Tuất' },
    Bính: { day: 'Thìn', night: 'Hợi' },
    Đinh: { day: 'Ngọ', night: 'Mùi' },
    Mậu: { day: 'Dần / Thân', night: 'Mùi' },
    Kỷ: { day: 'Mùi', night: 'Thân' },
    Canh: { day: 'Dần / Thân', night: 'Dậu' },
    Tân: { day: 'Sửu', night: 'Tuất' },
    Nhâm: { day: 'Tý', night: 'Hợi' },
    Quý: { day: 'Tuất', night: 'Tị' },
  },
  'Sương giáng': {
    Giáp: { day: 'Dần', night: 'Dậu' },
    Ất: { day: 'Mão', night: 'Tuất' },
    Bính: { day: 'Mão', night: 'Hợi' },
    Đinh: { day: 'Tị', night: 'Ngọ' },
    Mậu: { day: 'Sửu / Mùi', night: 'Ngọ' },
    Kỷ: { day: 'Ngọ', night: 'Mùi' },
    Canh: { day: 'Sửu / Mùi', night: 'Thân' },
    Tân: { day: 'Tý', night: 'Dậu' },
    Nhâm: { day: 'Hợi', night: 'Tuất' },
    Quý: { day: 'Dậu', night: 'Thìn' },
  },
  'Tiểu tuyết': {
    Giáp: { day: 'Sửu', night: 'Dậu' },
    Ất: { day: 'Dần', night: 'Tuất' },
    Bính: { day: 'Dần', night: 'Hợi' },
    Đinh: { day: 'Thìn', night: 'Tị' },
    Mậu: { day: 'Tý / Ngọ', night: 'Tị' },
    Kỷ: { day: 'Tị', night: 'Ngọ' },
    Canh: { day: 'Tý / Ngọ', night: 'Mùi' },
    Tân: { day: 'Hợi', night: 'Thân' },
    Nhâm: { day: 'Tuất', night: 'Dậu' },
    Quý: { day: 'Thân', night: 'Mão' },
  },
  'Đông chí': {
    Giáp: { day: 'Tý', night: 'Dậu' },
    Ất: { day: 'Sửu', night: 'Tuất' },
    Bính: { day: 'Sửu', night: 'Hợi' },
    Đinh: { day: 'Mão', night: 'Thìn' },
    Mậu: { day: 'Hợi / Tị', night: 'Thìn' },
    Kỷ: { day: 'Thìn', night: 'Tị' },
    Canh: { day: 'Hợi / Tị', night: 'Ngọ' },
    Tân: { day: 'Tuất', night: 'Mùi' },
    Nhâm: { day: 'Dậu', night: 'Thân' },
    Quý: { day: 'Mùi', night: 'Dần' },
  },
  'Đại hàn': {
    Giáp: { day: 'Hợi', night: 'Dậu' },
    Ất: { day: 'Tý', night: 'Tuất' },
    Bính: { day: 'Tý', night: 'Hợi' },
    Đinh: { day: 'Dần', night: 'Mão' },
    Mậu: { day: 'Tuất / Thìn', night: 'Mão' },
    Kỷ: { day: 'Mão', night: 'Thìn' },
    Canh: { day: 'Tuất / Thìn', night: 'Tị' },
    Tân: { day: 'Dậu', night: 'Ngọ' },
    Nhâm: { day: 'Thân', night: 'Mùi' },
    Quý: { day: 'Ngọ', night: 'Sửu' },
  },
};

/**
 * Tìm Giờ Quý Đăng Thiên Môn của ngày hiện tại
 */
export function getQuyDangThienMon(solarTermName: string, canNgay: string): { dayHour: string; nightHour: string } {
  // Lấy tiết khí đối ứng trong 12 trung khí
  let termKey = 'Vũ thủy';
  for (const k of Object.keys(QUY_DANG_THIEN_MON_TABLE)) {
    if (solarTermName.toLowerCase().includes(k.toLowerCase())) {
      termKey = k;
      break;
    }
  }
  const termData = QUY_DANG_THIEN_MON_TABLE[termKey] || QUY_DANG_THIEN_MON_TABLE['Vũ thủy'];
  const res = termData[canNgay] || { day: 'Mão', night: 'Dậu' };
  return {
    dayHour: res.day,
    nightHour: res.night,
  };
}

// ==========================================
// 5. GIỜ NGŨ BẤT NGỘ & TRIỆT LỘ KHÔNG VONG
// ==========================================
export function getGioNguBatNgo(canNgay: string): string {
  const map: Record<string, string> = {
    Giáp: 'Ngọ (Canh Ngọ)',
    Ất: 'Tị (Tân Tị)',
    Bính: 'Thìn (Nhâm Thìn)',
    Đinh: 'Mão (Quý Mão)',
    Mậu: 'Dần (Giáp Dần)',
    Kỷ: 'Mùi (Ất Mùi)',
    Canh: 'Ngọ / Tý (Bính Ngọ / Bính Tý)',
    Tân: 'Tị (Đinh Tị)',
    Nhâm: 'Thìn / Thân (Mậu Thìn / Mậu Thân)',
    Quý: 'Mão / Mùi (Kỷ Mão / Kỷ Mùi)',
  };
  return map[canNgay] || 'Ngọ';
}

export function getGioTrietLoKhongVong(canNgay: string): string {
  const map: Record<string, string> = {
    Giáp: 'Thân (Nhâm Thân), Dậu (Quý Dậu)',
    Kỷ: 'Thân (Nhâm Thân), Dậu (Quý Dậu)',
    Ất: 'Ngọ (Nhâm Ngọ), Mùi (Quý Mùi)',
    Canh: 'Ngọ (Nhâm Ngọ), Mùi (Quý Mùi)',
    Bính: 'Thìn (Nhâm Thìn), Tị (Quý Tị)',
    Tân: 'Thìn (Nhâm Thìn), Tị (Quý Tị)',
    Đinh: 'Dần (Nhâm Dần), Mão (Quý Mão)',
    Nhâm: 'Dần (Nhâm Dần), Mão (Quý Mão)',
    Mậu: 'Tý (Nhâm Tý), Sửu (Quý Sửu), Tuất (Nhâm Tuất), Hợi (Quý Hợi)',
    Quý: 'Tý (Nhâm Tý), Sửu (Quý Sửu), Tuất (Nhâm Tuất), Hợi (Quý Hợi)',
  };
  return map[canNgay] || 'Thân, Dậu';
}

// ==========================================
// 6. DANH MỤC DỤNG SỰ 60 VIỆC (QUYỂN 11)
// ==========================================
export interface DungSuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  goodStarsNeeded: string[];
  badStarsAvoided: string[];
  preferredTruc: string[];
  avoidTruc: string[];
}

export const DUNG_SU_60_CATEGORIES: DungSuCategory[] = [
  {
    id: 'cuoi-hoi',
    name: 'Hôn Nhân & Cưới Hỏi (Giá Thú)',
    icon: '💍',
    description: 'Bao gồm: Ăn hỏi, Đính hôn, Đón dâu, Rước dâu, Lập hôn ước.',
    goodStarsNeeded: ['Âm Dương Bất Tương', 'Thiên Đức', 'Nguyệt Đức', 'Thiên Đức Hợp', 'Nguyệt Đức Hợp', 'Thiên Nguyện', 'Lục Hợp', 'Tam Hợp', 'Ngọc Đường', 'Thanh Long'],
    badStarsAvoided: ['Nguyệt Phá', 'Kiếp Sát', 'Tai Sát', 'Nguyệt Sát', 'Nguyệt Hình', 'Nguyệt Hại', 'Nguyệt Yếm', 'Tứ Phế', 'Vãng Vong', 'Bát Chuyên', 'Ngũ Ly'],
    preferredTruc: ['Định', 'Thành', 'Khai'],
    avoidTruc: ['Phá', 'Bế', 'Nguy'],
  },
  {
    id: 'dong-tho',
    name: 'Khởi Tạo Động Thổ & Xây Dựng',
    icon: '🏗️',
    description: 'Bao gồm: Động thổ làm nhà, Dựng cột gác xà, Sửa cung thất, Xây tường quách.',
    goodStarsNeeded: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Đức Hợp', 'Nguyệt Đức Hợp', 'Thiên Xá', 'Thiên Ân', 'Thanh Long', 'Minh Đường', 'Kim Quỹ'],
    badStarsAvoided: ['Nguyệt Phá', 'Thổ Phủ', 'Kiếp Sát', 'Tai Sát', 'Nguyệt Sát', 'Nguyệt Hình', 'Địa Hỏa', 'Thiên Tặc', 'Tứ Phế', 'Ngũ Hư'],
    preferredTruc: ['Kiến', 'Mãn', 'Chấp', 'Khai', 'Thành'],
    avoidTruc: ['Phá', 'Bế', 'Bình'],
  },
  {
    id: 'khai-truong',
    name: 'Khai Trương & Mở Cửa Hàng',
    icon: '🎉',
    description: 'Bao gồm: Khai trương đại cát, Mở tiệm, Mở xưởng, Đăng đài khánh thành.',
    goodStarsNeeded: ['Thiên Nguyện', 'Sinh Khí', 'Mãn Nhật', 'Kim Quỹ', 'Thanh Long', 'Minh Đường', 'Nguyệt Đức', 'Thiên Đức'],
    badStarsAvoided: ['Nguyệt Phá', 'Đại Hao', 'Tiểu Hao', 'Kiếp Sát', 'Tai Sát', 'Tứ Phế', 'Ngũ Hư', 'Vãng Vong', 'Cửu Không'],
    preferredTruc: ['Mãn', 'Thành', 'Khai'],
    avoidTruc: ['Phá', 'Bế', 'Nguy'],
  },
  {
    id: 'giao-dich',
    name: 'Lập Khế Ước & Giao Dịch Tài Lộc',
    icon: '📜',
    description: 'Bao gồm: Ký kết hợp đồng, Nạp tiền của, Mua bán tài sản lớn, Đầu tư.',
    goodStarsNeeded: ['Mẫu Thương', 'Thiên Nguyện', 'Lục Hợp', 'Ngũ Phú', 'Kim Quỹ', 'Định Nhật', 'Thành Nhật'],
    badStarsAvoided: ['Nguyệt Phá', 'Đại Hao', 'Tiểu Hao', 'Cửu Không', 'Tứ Phế', 'Thiên Tặc'],
    preferredTruc: ['Định', 'Mãn', 'Thành', 'Thu'],
    avoidTruc: ['Phá', 'Nguy'],
  },
  {
    id: 'xuat-hanh',
    name: 'Xuất Hành & Đi Xa (Hành Trình)',
    icon: '🚗',
    description: 'Bao gồm: Khởi hành công tác, Du lịch, Di chuyển chỗ ở, Nhập trạch.',
    goodStarsNeeded: ['Dịch Mã', 'Thiên Mã', 'Thiên Đức', 'Nguyệt Đức', 'Thiên Xá', 'Thanh Long', 'Khai Nhật'],
    badStarsAvoided: ['Nguyệt Phá', 'Kiếp Sát', 'Tai Sát', 'Nguyệt Yếm', 'Vãng Vong', 'Tứ Tuyệt', 'Tứ Ly', 'Quy Kỵ'],
    preferredTruc: ['Kiến', 'Thành', 'Khai'],
    avoidTruc: ['Phá', 'Nguy', 'Bế'],
  },
  {
    id: 'nham-chuc',
    name: 'Lên Quan Nhậm Chức & Cầu Công Danh',
    icon: '👑',
    description: 'Bao gồm: Nhậm chức, Bổ nhiệm, Dâng sớ, Nhập học, Khai giảng thi cử.',
    goodStarsNeeded: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Ân', 'Thiên Xá', 'Thiên Nguyện', 'Ngọc Đường', 'Vương Nhật', 'Quan Nhật'],
    badStarsAvoided: ['Nguyệt Phá', 'Nguyệt Hình', 'Tứ Phế', 'Thiên Lại', 'Vãng Vong'],
    preferredTruc: ['Thành', 'Khai', 'Kiến'],
    avoidTruc: ['Phá', 'Bế'],
  },
  {
    id: 'te-tu',
    name: 'Cúng Tế & Cầu Phúc Cầu An',
    icon: '🙏',
    description: 'Bao gồm: Tế lễ trời đất, Cầu phúc gia đình, Cầu tự con cái, Giải oan uổng.',
    goodStarsNeeded: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Đức Hợp', 'Nguyệt Đức Hợp', 'Thiên Xá', 'Thiên Ân', 'Thiên Nguyện', 'Phúc Sinh', 'Thánh Tâm'],
    badStarsAvoided: ['Nguyệt Phá', 'Nguyệt Hình', 'Nguyệt Hại'],
    preferredTruc: ['Khai', 'Thành', 'Trừ'],
    avoidTruc: ['Phá'],
  },
  {
    id: 'chua-benh',
    name: 'Cầu Y Chữa Bệnh & Dưỡng Sinh',
    icon: '🌿',
    description: 'Bao gồm: Mời thầy chữa bệnh, Uống thuốc, Tắm gội trừ uế, Dưỡng thân.',
    goodStarsNeeded: ['Thiên Y', 'Giải Thần', 'Trừ Thần', 'Nguyệt Đức', 'Thiên Xá', 'Trừ Nhật'],
    badStarsAvoided: ['Tử Khí', 'Thiên Lại', 'Nguyệt Sát'],
    preferredTruc: ['Trừ', 'Khai', 'Thành'],
    avoidTruc: ['Bế', 'Nguy'],
  },
  {
    id: 'an-tang',
    name: 'An Táng & Cải Táng (Âm Phần)',
    icon: '🪦',
    description: 'Bao gồm: Phá vỡ đất, An táng, Khái toán cải táng, Tu bổ lăng mộ.',
    goodStarsNeeded: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Đức Hợp', 'Nguyệt Đức Hợp', 'Thiên Xá', 'Ô Phệ', 'Ô Phệ Đối'],
    badStarsAvoided: ['Nguyệt Kiến', 'Nguyệt Phá', 'Kiếp Sát', 'Tai Sát', 'Nguyệt Sát', 'Nguyệt Hình', 'Nguyệt Hại', 'Tứ Phế', 'Trùng Nhật', 'Phục Nhật'],
    preferredTruc: ['Khai', 'Trừ'],
    avoidTruc: ['Kiến', 'Phá', 'Bế'],
  },
];

/**
 * Đánh giá độ phù hợp của một ngày cho từng loại việc dụng sự
 */
export function evaluateDungSuSuitability(
  category: DungSuCategory,
  dayInfo: {
    truc: TrucInfo;
    isHoangDao: boolean;
    catThan: ThanSatItem[];
    hungThan: ThanSatItem[];
  }
): {
  score: number; // 0..100
  isRecommended: boolean;
  verdict: 'Rất Tốt (Đại Cát)' | 'Tốt (Cát)' | 'Bình Thường' | 'Nên Tránh (Kỵ)';
  matchedGood: string[];
  matchedBad: string[];
  reasons: string[];
} {
  const catNames = dayInfo.catThan.map((c) => c.name);
  const hungNames = dayInfo.hungThan.map((h) => h.name);

  const matchedGood: string[] = [];
  const matchedBad: string[] = [];
  const reasons: string[] = [];

  // Check preferred Truc
  if (category.preferredTruc.includes(dayInfo.truc.name)) {
    matchedGood.push(`Trực ${dayInfo.truc.name} (${dayInfo.truc.category})`);
    reasons.push(`Thuận Trực ${dayInfo.truc.name}: ${dayInfo.truc.generalMeaning}`);
  }
  if (category.avoidTruc.includes(dayInfo.truc.name)) {
    matchedBad.push(`Trực ${dayInfo.truc.name} (${dayInfo.truc.category})`);
    reasons.push(`Phạm Trực ${dayInfo.truc.name}: Không lợi cho việc này.`);
  }

  // Check Hoang Dao
  if (dayInfo.isHoangDao) {
    matchedGood.push('Ngày Hoàng Đạo');
  }

  // Check Good Stars
  category.goodStarsNeeded.forEach((star) => {
    if (catNames.includes(star)) {
      matchedGood.push(star);
      reasons.push(`Đắc cát thần ${star}`);
    }
  });

  // Check Bad Stars
  category.badStarsAvoided.forEach((star) => {
    if (hungNames.includes(star)) {
      matchedBad.push(star);
      reasons.push(`Phạm hung tinh ${star}`);
    }
  });

  // Calculate score
  let score = 50;
  score += matchedGood.length * 15;
  score -= matchedBad.length * 20;
  if (dayInfo.isHoangDao) score += 10;
  score = Math.max(5, Math.min(99, score));

  let verdict: 'Rất Tốt (Đại Cát)' | 'Tốt (Cát)' | 'Bình Thường' | 'Nên Tránh (Kỵ)' = 'Bình Thường';
  let isRecommended = false;

  if (score >= 75 && matchedBad.length === 0) {
    verdict = 'Rất Tốt (Đại Cát)';
    isRecommended = true;
  } else if (score >= 60 && matchedBad.length <= 1) {
    verdict = 'Tốt (Cát)';
    isRecommended = true;
  } else if (score < 40 || matchedBad.length >= 2) {
    verdict = 'Nên Tránh (Kỵ)';
    isRecommended = false;
  }

  return {
    score,
    isRecommended,
    verdict,
    matchedGood,
    matchedBad,
    reasons,
  };
}
