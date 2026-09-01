import { CAN, CHI, getLocalComponents, tinhCanChiNgay } from './canChi';
import { getAstronomicalLunarDate } from './lunarCalendar';
import { calculateComprehensiveResult } from './calculator';
import {
  HOANG_HAC_12_STARS,
  getHoangDaoDayStar,
  getHourHoangHacStar,
  calculateTrucDay,
  calculateDayThanSat,
  getQuyDangThienMon,
  getGioNguBatNgo,
  getGioTrietLoKhongVong,
  DungSuCategory,
  DUNG_SU_60_CATEGORIES,
  evaluateDungSuSuitability,
  ThanSatItem,
  TrucInfo,
} from './trachCatEngine';

export interface HoangDaoHour {
  chi: string;
  canChi: string;
  timeRange: string;
  isHoangDao: boolean;
  starName: string;
  starType: string;
  index: number;
}

export interface DailyAlmanacInfo {
  solarDate: Date;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  dayOfWeekText: string; // THỨ HAI, THỨ BA, ..., CHỦ NHẬT
  dayOfWeekShort: string;
  
  // Lunar info
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeapMonth: boolean;
  lunarMonthText: string; // THÁNG GIÊNG, THÁNG HAI, ..., THÁNG CHẠP
  lunarYearCanChi: string;
  lunarMonthCanChi: string;
  lunarDayCanChi: string;
  canNgay: string;
  chiNgay: string;
  
  // Hoang Dao / Hac Dao Day (Hiệp Kỷ Biện Phương Thư)
  isHoangDaoDay: boolean;
  hoangDaoDayText: string; // "Ngày Hoàng đạo" | "Ngày Hắc đạo"
  hoangDaoStarName: string; // Thanh Long, Minh Đường, Kim Quỹ...
  hoangDaoStarMeaning: string;
  
  // Hoang Dao Hours (6 hours)
  hoangDaoHours: HoangDaoHour[];
  allHours: HoangDaoHour[];
  
  // Current time details
  currentTimeFormatted: string;
  currentHourCanChi: string;
  currentSolarTermName: string;
  
  // Hiệp Kỷ Biện Phương Thư Trạch Cát Systems
  truc: TrucInfo;
  catThan: ThanSatItem[];
  hungThan: ThanSatItem[];
  trachCatScore: number;
  trachCatRank: string;
  
  // Good & Bad actions for the day (Nghi & Kỵ)
  viecNenLam: string[];
  viecKiengKy: string[];
  
  // Quý Đăng Thiên Môn, Ngũ Bất Ngộ, Triệt Lộ Không Vong
  quyDangThienMon: { dayHour: string; nightHour: string };
  gioNguBatNgo: string;
  gioTrietLoKhongVong: string;
  
  // Traditional Almanac Extras
  nhiThapBatTu: { name: string; animal: string; element: string; nature: 'Cát' | 'Hung' | 'Bình'; description: string };
  xuatHanh: { hyThan: string; taiThan: string; hacThan: string };
  
  // Quote & Historical Event
  historicalEvent: string;
  quote: { text: string; author: string };
  
  // Animal Zodiac Symbol
  zodiacAnimal: string;
}

// Hour Ranges for the 12 Chi
export const CHI_HOUR_RANGES: Record<string, string> = {
  Tý: '23h-1h',
  Sửu: '1h-3h',
  Dần: '3h-5h',
  Mão: '5h-7h',
  Thìn: '7h-9h',
  Tị: '9h-11h',
  Ngọ: '11h-13h',
  Mùi: '13h-15h',
  Thân: '15h-17h',
  Dậu: '17h-19h',
  Tuất: '19h-21h',
  Hợi: '21h-23h',
};

// 28 Nhị Thập Bát Tú
const NHI_THAP_BAT_TU = [
  { name: 'Giác', animal: 'Mộc Giác Giao', element: 'Mộc', nature: 'Cát' as const, description: 'Thi cử đỗ đạt, xuất hành vinh quy, hôn nhân thuận ý.' },
  { name: 'Cang', animal: 'Kim Cang Long', element: 'Kim', nature: 'Hung' as const, description: 'Đề phòng tranh chấp, kiện tụng, nên cẩn trọng khẩu thiệt.' },
  { name: 'Đê', animal: 'Thổ Đê Lạc', element: 'Thổ', nature: 'Hung' as const, description: 'Tránh khởi công công trình lớn, động thổ, cẩn trọng tiền bạc.' },
  { name: 'Phòng', animal: 'Nhật Phòng Thố', element: 'Thái Dương', nature: 'Cát' as const, description: 'Vượng tài lộc, gia đạo hưng long, xây dựng khởi tạo tốt.' },
  { name: 'Tâm', animal: 'Nguyệt Tâm Hồ', element: 'Thái Âm', nature: 'Hung' as const, description: 'Nên phòng trộm cắp, tránh tranh chấp tài sản, cẩn mật.' },
  { name: 'Vĩ', animal: 'Hỏa Vĩ Hổ', element: 'Hỏa', nature: 'Cát' as const, description: 'Gia đạo hỷ tín, mua bán thuận buồm xuôi gió, thăng tiến.' },
  { name: 'Cơ', animal: 'Thủy Cơ Báo', element: 'Thủy', nature: 'Cát' as const, description: 'Gặp quý nhân phù trợ, cầu tài đắc tài, khai trương hanh thông.' },
  { name: 'Đẩu', animal: 'Mộc Đẩu Giải', element: 'Mộc', nature: 'Cát' as const, description: 'Khởi tạo công trình, gieo trồng, cầu công danh rất đắc lợi.' },
  { name: 'Ngưu', animal: 'Kim Ngưu Ngưu', element: 'Kim', nature: 'Hung' as const, description: 'Tránh tranh cãi, chớ nên cho vay mượn lớn, dĩ hòa vi quý.' },
  { name: 'Nữ', animal: 'Thổ Nữ Bức', element: 'Thổ', nature: 'Hung' as const, description: 'Kỵ việc tranh kiện, nên tĩnh tâm làm việc thiện lành.' },
  { name: 'Hư', animal: 'Nhật Hư Thử', element: 'Thái Dương', nature: 'Hung' as const, description: 'Hao tổn nhỏ, tránh xuất hành xa đêm khuya, chú ý sức khỏe.' },
  { name: 'Nguy', animal: 'Nguyệt Nguy Yến', element: 'Thái Âm', nature: 'Bình' as const, description: 'Cẩn trọng đi đường sông nước, thích hợp tĩnh tâm tu bổ.' },
  { name: 'Thất', animal: 'Hỏa Thất Trư', element: 'Hỏa', nature: 'Cát' as const, description: 'Xây dựng nhà cửa, khai trương, mở tiệm làm ăn đại cát.' },
  { name: 'Bích', animal: 'Thủy Bích Du', element: 'Thủy', nature: 'Cát' as const, description: 'Cưới hỏi tốt lành, xuất hành gặp may, cầu tài hanh thông.' },
  { name: 'Khuê', animal: 'Mộc Khuê Mộc Lang', element: 'Mộc', nature: 'Hung' as const, description: 'Tránh khởi công việc đột xuất, nên làm việc theo kế hoạch.' },
  { name: 'Lâu', animal: 'Kim Lâu Cẩu', element: 'Kim', nature: 'Cát' as const, description: 'Học hành, thi cử, kết giao bạn tốt, phát triển sự nghiệp.' },
  { name: 'Vị', animal: 'Thổ Vị Trĩ', element: 'Thổ', nature: 'Cát' as const, description: 'Gom tụ tài bảo, kinh doanh có lời, mừng rỡ trong nhà.' },
  { name: 'Mão', animal: 'Nhật Mão Kê', element: 'Thái Dương', nature: 'Hung' as const, description: 'Kỵ tranh chấp, nên thận trọng ký kết văn bản pháp lý.' },
  { name: 'Tất', animal: 'Nguyệt Tất Nguyệt', element: 'Thái Âm', nature: 'Cát' as const, description: 'Khai quang, xuất hành, dựng nhà, chăn nuôi phát triển.' },
  { name: 'Chủy', animal: 'Hỏa Chủy Hầu', element: 'Hỏa', nature: 'Hung' as const, description: 'Tránh khẩu thiệt, chớ vội vàng quyết định việc trọng đại.' },
  { name: 'Sâm', animal: 'Thủy Sâm Viên', element: 'Thủy', nature: 'Cát' as const, description: 'Gặp đối tác tốt, kinh doanh thuận lợi, mở mang xưởng hiệu.' },
  { name: 'Tỉnh', animal: 'Mộc Tỉnh Can', element: 'Mộc', nature: 'Cát' as const, description: 'Đào giếng, trị thủy, làm từ thiện, tạo phúc tích đức.' },
  { name: 'Quỷ', animal: 'Kim Quỷ Dương', element: 'Kim', nature: 'Hung' as const, description: 'Kỵ việc xuất hành xa, nên chú ý dưỡng sinh tĩnh dưỡng.' },
  { name: 'Liễu', animal: 'Thổ Liễu Chương', element: 'Thổ', nature: 'Hung' as const, description: 'Tránh vay mượn, cẩn thận lửa củi và an toàn điện nước.' },
  { name: 'Tinh', animal: 'Nhật Tinh Mã', element: 'Thái Dương', nature: 'Cát' as const, description: 'Cưới hỏi, lập gia thất, động thổ, vạn sự hưng vượng.' },
  { name: 'Trương', animal: 'Nguyệt Trương Lộc', element: 'Thái Âm', nature: 'Cát' as const, description: 'May áo mới, ăn mừng, tiệc tùng hội ngộ, gia đình sum vầy.' },
  { name: 'Dực', animal: 'Hỏa Dực Xà', element: 'Hỏa', nature: 'Hung' as const, description: 'Tránh khởi công việc lớn, nên củng cố nền tảng sẵn có.' },
  { name: 'Chẩn', animal: 'Thủy Chẩn Dẫn', element: 'Thủy', nature: 'Cát' as const, description: 'Thăng quan tiến chức, xuất hành bình an, vạn sự đắc ý.' },
];

// Special Quotes Database
const FAMOUS_QUOTES = [
  { text: 'Tình yêu tiêu diệt cái chết hoặc biến nó thành ảo ảnh mờ nhạt.', author: 'L. Tolstoi' },
  { text: 'Học cho rộng, hỏi cho kỹ, nghĩ cho cẩn thận, phân biệt cho rõ, làm cho hết sức.', author: 'Khổng Tử' },
  { text: 'Không có con đường nào dẫn đến hòa bình, hòa bình chính là con đường.', author: 'Mahatma Gandhi' },
  { text: 'Người hạnh phúc nhất là người đem lại hạnh phúc cho nhiều người nhất.', author: 'Denis Diderot' },
  { text: 'Đời người như một giấc mộng dài, lấy nhân nghĩa làm gốc rễ thì muôn đời sáng tỏ.', author: 'Cổ nhân' },
  { text: 'Hành trình ngàn dặm bắt đầu từ một bước chân.', author: 'Lão Tử' },
  { text: 'Biết người là trí, biết mình là sáng. Thắng người là có sức, thắng mình là kiên cường.', author: 'Đạo Đức Kinh' },
  { text: 'Gặp thời một tốt cũng thành công, lỡ vận anh hùng đành nuốt hận.', author: 'Nguyễn Trãi' },
  { text: 'Tâm an thì vạn sự an, tâm bình thì thế giới bình.', author: 'Thiền ngữ' },
  { text: 'Hãy sống như thể bạn sẽ chết vào ngày mai. Hãy học như thể bạn sẽ sống mãi mãi.', author: 'Mahatma Gandhi' },
  { text: 'Thời gian là tài sản quý giá nhất, biết nắm bắt thời cơ thì vạn sự hanh thông.', author: 'Quỷ Cốc Tử' },
  { text: 'Sự kiên nhẫn và thời gian làm được nhiều hơn sức mạnh và sự giận dữ.', author: 'Jean de La Fontaine' },
];

// Special Events Database for Calendar Days
const HISTORICAL_EVENTS: Record<string, string> = {
  '1-1': 'Tết Dương Lịch • Khởi đầu năm mới dương lịch toàn cầu',
  '9-1': 'Ngày Truyền thống Học sinh - Sinh viên Việt Nam (1950)',
  '3-2': 'Kỷ niệm Ngày thành lập Đảng Cộng sản Việt Nam (1930)',
  '14-2': 'Ngày Lễ Tình Nhân (Valentine\'s Day)',
  '27-2': 'Ngày Thầy thuốc Việt Nam (1955)',
  '8-3': 'Ngày Quốc tế Phụ nữ (International Women\'s Day)',
  '26-3': 'Ngày thành lập Đoàn TNCS Hồ Chí Minh (1931)',
  '21-4': 'Ngày Sách và Văn hóa đọc Việt Nam',
  '30-4': 'Ngày Giải phóng Miền Nam, Thống nhất Đất nước (1975)',
  '1-5': 'Ngày Quốc tế Lao động (International Workers\' Day)',
  '7-5': 'Kỷ niệm Chiến thắng Điện Biên Phủ lịch sử (1954)',
  '19-5': 'Kỷ niệm Ngày sinh Chủ tịch Hồ Chí Minh (1890)',
  '1-6': 'Ngày Quốc tế Thiếu nhi',
  '21-6': 'Ngày Báo chí Cách mạng Việt Nam (1925)',
  '28-6': 'Ngày Gia đình Việt Nam',
  '27-7': 'Ngày Thương binh - Liệt sĩ Việt Nam (1947)',
  '19-8': 'Kỷ niệm Cách mạng Tháng Tám thành công (1945)',
  '1-9': 'Chiến tranh thế giới thứ hai bùng nổ (1.9.1939)',
  '2-9': 'Ngày Quốc Khánh nước CHXHCN Việt Nam (2.9.1945)',
  '10-10': 'Ngày Giải phóng Thủ đô Hà Nội (1954)',
  '20-10': 'Ngày Phụ nữ Việt Nam (1930)',
  '20-11': 'Ngày Nhà giáo Việt Nam (1982)',
  '22-12': 'Ngày thành lập Quân đội Nhân dân Việt Nam (1944)',
};

const LUNAR_MONTH_NAMES_TEXT: Record<number, string> = {
  1: 'THÁNG GIÊNG',
  2: 'THÁNG HAI',
  3: 'THÁNG BA',
  4: 'THÁNG TƯ',
  5: 'THÁNG NĂM',
  6: 'THÁNG SÁU',
  7: 'THÁNG BẢY',
  8: 'THÁNG TÁM',
  9: 'THÁNG CHÍN',
  10: 'THÁNG MƯỜI',
  11: 'THÁNG MƯỜI MỘT',
  12: 'THÁNG CHẠP',
};

const DAY_OF_WEEK_NAMES = [
  'CHỦ NHẬT',
  'THỨ HAI',
  'THỨ BA',
  'THỨ TƯ',
  'THỨ NĂM',
  'THỨ SÁU',
  'THỨ BẢY',
];

const DAY_OF_WEEK_SHORTS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/**
 * Tính 6 Giờ Hoàng Đạo trong ngày chuẩn xác theo Hiệp Kỷ Biện Phương Thư (Quyển 7 & Quyển 9)
 */
export function calculateHoangDaoHours(canNgay: string, chiNgay: string): {
  hoangDaoHours: HoangDaoHour[];
  allHours: HoangDaoHour[];
} {
  const canNgayIdx = CAN.indexOf(canNgay);
  const canGioBase = (canNgayIdx % 5) * 2;

  const allHours: HoangDaoHour[] = [];

  for (let i = 0; i < 12; i++) {
    const currentChi = CHI[i];
    const canGioIdx = (canGioBase + i) % 10;
    const currentCanChi = `${CAN[canGioIdx]} ${currentChi}`;
    
    // Tra cứu sao Hoàng Hắc Đạo cho giờ theo Chi Ngày
    const star = getHourHoangHacStar(chiNgay, currentChi);

    allHours.push({
      chi: currentChi,
      canChi: currentCanChi,
      timeRange: CHI_HOUR_RANGES[currentChi] || '',
      isHoangDao: star.isHoangDao,
      starName: star.name,
      starType: star.type,
      index: i,
    });
  }

  const hoangDaoHours = allHours.filter((h) => h.isHoangDao);

  return { hoangDaoHours, allHours };
}

/**
 * Lấy Hướng Xuất Hành (Hỷ Thần, Tài Thần, Hạc Thần)
 */
export function getXuatHanhHuong(canNgay: string): { hyThan: string; taiThan: string; hacThan: string } {
  const hyThanMap: Record<string, string> = {
    Giáp: 'Đông Bắc',
    Ất: 'Tây Bắc',
    Bính: 'Tây Nam',
    Đinh: 'Chính Nam',
    Mậu: 'Đông Nam',
    Kỷ: 'Đông Bắc',
    Canh: 'Tây Bắc',
    Tân: 'Tây Nam',
    Nhâm: 'Chính Nam',
    Quý: 'Đông Nam',
  };

  const taiThanMap: Record<string, string> = {
    Giáp: 'Đông Nam',
    Ất: 'Đông Nam',
    Bính: 'Chính Đông',
    Đinh: 'Chính Đông',
    Mậu: 'Chính Bắc',
    Kỷ: 'Chính Nam',
    Canh: 'Tây Nam',
    Tân: 'Tây Nam',
    Nhâm: 'Tây Bắc',
    Quý: 'Chính Tây',
  };

  const hacThanMap: Record<string, string> = {
    Giáp: 'Tại Thiên',
    Ất: 'Đông Nam',
    Bính: 'Chính Đông',
    Đinh: 'Chính Đông',
    Mậu: 'Chính Nam',
    Kỷ: 'Chính Nam',
    Canh: 'Tây Nam',
    Tân: 'Chính Tây',
    Nhâm: 'Tây Bắc',
    Quý: 'Chính Bắc',
  };

  return {
    hyThan: hyThanMap[canNgay] || 'Đông Nam',
    taiThan: taiThanMap[canNgay] || 'Chính Đông',
    hacThan: hacThanMap[canNgay] || 'Tại Thiên',
  };
}

/**
 * Tính toàn bộ thông tin Lịch Vạn Niên / Lịch Block Ngày cho một ngày bất kỳ
 * Đối chiếu chuẩn xác theo Hiệp Kỷ Biện Phương Thư
 */
export function calculateDailyAlmanac(date: Date): DailyAlmanacInfo {
  const local = getLocalComponents(date);
  const comprehensive = calculateComprehensiveResult(date);
  const lunar = getAstronomicalLunarDate(date);
  
  // Day of week
  const vnDate = new Date(date.getTime() + 7 * 3600 * 1000);
  const dayOfWeekIdx = vnDate.getUTCDay(); // 0: CN, 1: T2...
  const dayOfWeekText = DAY_OF_WEEK_NAMES[dayOfWeekIdx];
  const dayOfWeekShort = DAY_OF_WEEK_SHORTS[dayOfWeekIdx];

  // Can Chi of Day
  const [dayIdx, dayCanChi] = tinhCanChiNgay(date);
  const canNgay = CAN[dayIdx % 10];
  const chiNgay = CHI[dayIdx % 12];

  // Mùa khí tiết (Xuân, Hạ, Thu, Đông)
  const month = local.month;
  let solarSeason: 'Xuân' | 'Hạ' | 'Thu' | 'Đông' = 'Xuân';
  if (month >= 3 && month <= 5) solarSeason = 'Xuân';
  else if (month >= 6 && month <= 8) solarSeason = 'Hạ';
  else if (month >= 9 && month <= 11) solarSeason = 'Thu';
  else solarSeason = 'Đông';

  // 1. Ngày Hoàng Đạo / Hắc Đạo theo Hiệp Kỷ Biện Phương Thư (Quyển 7)
  const hoangDaoDayStar = getHoangDaoDayStar(lunar.lunarMonth, chiNgay);

  // 2. 6 Giờ Hoàng Đạo chuẩn xác (Quyển 7 & 9)
  const { hoangDaoHours, allHours } = calculateHoangDaoHours(canNgay, chiNgay);

  // 3. 12 Trực Kiến - Trừ chuẩn xác (Quyển 4 & 9)
  const truc = calculateTrucDay(lunar.lunarMonth, chiNgay);

  // 4. Bách Thần Sát (Cát Thần & Hung Thần)
  const { catThan, hungThan, score: trachCatScore, rankLevel: trachCatRank } = calculateDayThanSat(
    lunar.lunarMonth,
    canNgay,
    chiNgay,
    solarSeason
  );

  // 5. Quý Đăng Thiên Môn, Ngũ Bất Ngộ, Triệt Lộ Không Vong
  const quyDangThienMon = getQuyDangThienMon(comprehensive.currentTerm.name, canNgay);
  const gioNguBatNgo = getGioNguBatNgo(canNgay);
  const gioTrietLoKhongVong = getGioTrietLoKhongVong(canNgay);

  // 6. Tổng hợp Việc Nên Làm (Nghi) & Việc Kiêng Kỵ (Kỵ)
  const viecNenLamSet = new Set<string>();
  const viecKiengKySet = new Set<string>();

  // Từ Trực
  truc.goodFor.forEach((g) => viecNenLamSet.add(g));
  truc.badFor.forEach((b) => viecKiengKySet.add(b));

  // Từ Dụng sự categories
  DUNG_SU_60_CATEGORIES.forEach((cat) => {
    const evalResult = evaluateDungSuSuitability(cat, {
      truc,
      isHoangDao: hoangDaoDayStar.isHoangDao,
      catThan,
      hungThan,
    });
    if (evalResult.isRecommended) {
      viecNenLamSet.add(cat.name);
    } else if (evalResult.verdict === 'Nên Tránh (Kỵ)') {
      viecKiengKySet.add(cat.name);
    }
  });

  const viecNenLam = Array.from(viecNenLamSet).slice(0, 6);
  const viecKiengKy = Array.from(viecKiengKySet).slice(0, 6);

  // 28 Tú
  const daysDiff = Math.floor(date.getTime() / (24 * 3600 * 1000));
  const tuIdx = (Math.abs(daysDiff) + 15) % 28;
  const nhiThapBatTu = NHI_THAP_BAT_TU[tuIdx] || NHI_THAP_BAT_TU[0];

  // Xuất hành
  const xuatHanh = getXuatHanhHuong(canNgay);

  // Quote & Event
  const dateKey = `${local.day}-${local.month}`;
  const historicalEvent = HISTORICAL_EVENTS[dateKey] || (
    local.month === 9 && local.day === 1
      ? 'Chiến tranh thế giới thứ hai bùng nổ (1.9.1939)'
      : 'Ngày hòa khí thiên địa giao hòa, vạn vật hanh thông sinh sôi.'
  );

  const quoteIdx = (local.year * 365 + local.month * 31 + local.day) % FAMOUS_QUOTES.length;
  const quote = FAMOUS_QUOTES[quoteIdx];

  // Animal zodiac
  const zodiacAnimal = CHI[lunar.lunarDay % 12] || 'Dần';

  // Format Current Time
  const hh = String(local.hour).padStart(2, '0');
  const mm = String(local.minute).padStart(2, '0');
  const ss = String(local.second).padStart(2, '0');

  const lunarMonthText = (lunar.isLeapMonth ? 'THÁNG ' : '') + (LUNAR_MONTH_NAMES_TEXT[lunar.lunarMonth] || `THÁNG ${lunar.lunarMonth}`) + (lunar.isLeapMonth ? ' (NHUẬN)' : '');

  return {
    solarDate: date,
    solarDay: local.day,
    solarMonth: local.month,
    solarYear: local.year,
    dayOfWeekText,
    dayOfWeekShort,
    lunarDay: lunar.lunarDay,
    lunarMonth: lunar.lunarMonth,
    lunarYear: lunar.lunarYear,
    isLeapMonth: lunar.isLeapMonth,
    lunarMonthText,
    lunarYearCanChi: lunar.lunarYearCanChi,
    lunarMonthCanChi: comprehensive.batTu.monthCanChi,
    lunarDayCanChi: dayCanChi,
    canNgay,
    chiNgay,
    isHoangDaoDay: hoangDaoDayStar.isHoangDao,
    hoangDaoDayText: hoangDaoDayStar.isHoangDao ? 'Ngày Hoàng đạo' : 'Ngày Hắc đạo',
    hoangDaoStarName: hoangDaoDayStar.name,
    hoangDaoStarMeaning: hoangDaoDayStar.meaning,
    hoangDaoHours,
    allHours,
    currentTimeFormatted: `${hh}:${mm}:${ss}`,
    currentHourCanChi: comprehensive.batTu.hourCanChi,
    currentSolarTermName: comprehensive.currentTerm.name,
    truc,
    catThan,
    hungThan,
    trachCatScore,
    trachCatRank,
    viecNenLam,
    viecKiengKy,
    quyDangThienMon,
    gioNguBatNgo,
    gioTrietLoKhongVong,
    nhiThapBatTu,
    xuatHanh,
    historicalEvent,
    quote,
    zodiacAnimal,
  };
}
