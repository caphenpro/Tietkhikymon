import { CAN, CHI, getLocalComponents, tinhCanChiNgay, tinhCanChiGio } from './canChi';
import { getAstronomicalLunarDate } from './lunarCalendar';
import { calculateComprehensiveResult } from './calculator';

export interface HoangDaoHour {
  chi: string;
  canChi: string;
  timeRange: string;
  isHoangDao: boolean;
  starName: string;
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
  lunarMonthText: string; // THÁNG GIÊNG, THÁNG HAI, ..., THÁNG BẢY
  lunarYearCanChi: string;
  lunarMonthCanChi: string;
  lunarDayCanChi: string;
  canNgay: string;
  chiNgay: string;
  
  // Hoang Dao / Hac Dao
  isHoangDaoDay: boolean;
  hoangDaoDayText: string; // "Ngày Hoàng đạo" | "Ngày Hắc đạo"
  hoangDaoStarName: string; // Thanh Long, Minh Đường, Kim Quỹ...
  
  // Hoang Dao Hours (6 hours)
  hoangDaoHours: HoangDaoHour[];
  allHours: HoangDaoHour[];
  
  // Current time details
  currentTimeFormatted: string;
  currentHourCanChi: string;
  currentSolarTermName: string;
  
  // Traditional Almanac Extras
  truc: { name: string; category: string; description: string };
  nhiThapBatTu: { name: string; animal: string; element: string; nature: 'Cát' | 'Hung' | 'Bình'; description: string };
  xuatHanh: { hyThan: string; taiThan: string; hacThan: string };
  
  // Quote & Historical Event
  historicalEvent: string;
  quote: { text: string; author: string };
  
  // Animal Zodiac Symbol
  zodiacAnimal: string;
}

// 12 Stars of Hoang Dao / Hac Dao cycle
const THANH_LONG_STARS = [
  { name: 'Thanh Long', isHoangDao: true },
  { name: 'Minh Đường', isHoangDao: true },
  { name: 'Thiên Hình', isHoangDao: false },
  { name: 'Chu Tước', isHoangDao: false },
  { name: 'Kim Quỹ', isHoangDao: true },
  { name: 'Thiên Đức', isHoangDao: true }, // Bảo Quang
  { name: 'Bạch Hổ', isHoangDao: false },
  { name: 'Ngọc Đường', isHoangDao: true },
  { name: 'Thiên Lao', isHoangDao: false },
  { name: 'Huyền Vũ', isHoangDao: false },
  { name: 'Tư Mệnh', isHoangDao: true },
  { name: 'Câu Trận', isHoangDao: false },
];

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

// 12 Trực names
const TRUC_LIST = [
  { name: 'Kiến', category: 'Cát', description: 'Khởi đầu, xuất hành, giá thú, động thổ thuận lợi.' },
  { name: 'Trừ', category: 'Cát', description: 'Tẩy uế, giải trừ hung ách, chữa bệnh, dọn dẹp nhà cửa.' },
  { name: 'Mãn', category: 'Cát', description: 'Cầu tài, khai trương, nhập trạch, may áo mới trọn vẹn.' },
  { name: 'Bình', category: 'Bình', description: 'Bình ổn, an định, tu bổ, xây đắp đường sá, hòa giải.' },
  { name: 'Định', category: 'Cát', description: 'Định ước, ký kết hợp đồng, lập giao kèo, cưới hỏi bền vững.' },
  { name: 'Chấp', category: 'Cát', description: 'Bắt tay làm việc, gieo trồng, bắt trộm, khởi công.' },
  { name: 'Phá', category: 'Hung', description: 'Phá vỡ, dỡ nhà, phá dỡ công trình cũ, tránh cưới hỏi việc lớn.' },
  { name: 'Nguy', category: 'Hung', description: 'Cẩn trọng đi xa, trèo cao, thuyền bè sông nước, phòng ngừa tai nạn.' },
  { name: 'Thành', category: 'Đại Cát', description: 'Mọi việc đại thành, nhập học, khai trương, cưới hỏi, thăng quan.' },
  { name: 'Thâu', category: 'Cát', description: 'Thu hoạch, gom tài sản, thu nợ, mua sắm tài sản, tích lũy.' },
  { name: 'Khai', category: 'Cát', description: 'Khai trương, mở tiệm, kết hôn, nhập học, xuất hành hanh thông.' },
  { name: 'Bế', category: 'Hung', description: 'Đắp đê, ngăn nước, bế tắc, tránh mở mang việc lớn.' },
];

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
 * Tính 6 Giờ Hoàng Đạo trong ngày dựa theo Chi Ngày
 */
export function calculateHoangDaoHours(canNgay: string, chiNgay: string): {
  hoangDaoHours: HoangDaoHour[];
  allHours: HoangDaoHour[];
} {
  const chiNgayIdx = CHI.indexOf(chiNgay);
  const canNgayIdx = CAN.indexOf(canNgay);

  // Standard 6 pairs of Day Chi for starting Thanh Long:
  // Tý (0), Ngọ (6) -> [Tý, Sửu, Thìn, Tị, Mùi, Tuất] (indices: 0, 1, 4, 5, 7, 10)
  // Sửu (1), Mùi (7) -> [Dần, Mão, Tị, Thân, Tuất, Hợi] (indices: 2, 3, 5, 8, 10, 11)
  // Dần (2), Thân (8) -> [Tý, Sửu, Thìn, Tị, Mùi, Tuất] (indices: 0, 1, 4, 5, 7, 10)
  // Mão (3), Dậu (9) -> [Tý, Dần, Mão, Ngọ, Mùi, Dậu] (indices: 0, 2, 3, 6, 7, 9)
  // Thìn (4), Tuất (10) -> [Dần, Thìn, Tị, Thân, Dậu, Hợi] (indices: 2, 4, 5, 8, 9, 11)
  // Tị (5), Hợi (11) -> [Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi] (indices: 1, 4, 6, 7, 10, 11)

  const hoangDaoIndicesByPair: Record<number, number[]> = {
    0: [0, 1, 4, 5, 7, 10], // Tý, Ngọ
    1: [2, 3, 5, 8, 10, 11], // Sửu, Mùi
    2: [0, 1, 4, 5, 7, 10], // Dần, Thân (Tý, Sửu, Thìn, Tị, Mùi, Tuất)
    3: [0, 2, 3, 6, 7, 9],  // Mão, Dậu
    4: [2, 4, 5, 8, 9, 11], // Thìn, Tuất
    5: [1, 4, 6, 7, 10, 11], // Tị, Hợi
  };

  const pairKey = chiNgayIdx % 6;
  const hoangDaoIndices = hoangDaoIndicesByPair[pairKey] || [0, 1, 4, 5, 7, 10];

  const canGioBase = (canNgayIdx % 5) * 2;

  const allHours: HoangDaoHour[] = [];

  for (let i = 0; i < 12; i++) {
    const currentChi = CHI[i];
    const canGioIdx = (canGioBase + i) % 10;
    const currentCanChi = `${CAN[canGioIdx]} ${currentChi}`;
    const isHD = hoangDaoIndices.includes(i);
    const star = THANH_LONG_STARS[i % 12];

    allHours.push({
      chi: currentChi,
      canChi: currentCanChi,
      timeRange: CHI_HOUR_RANGES[currentChi] || '',
      isHoangDao: isHD,
      starName: isHD ? (star.name || 'Hoàng Đạo') : 'Hắc Đạo',
      index: i,
    });
  }

  const hoangDaoHours = allHours.filter((h) => h.isHoangDao);

  return { hoangDaoHours, allHours };
}

/**
 * Tính Ngày Hoàng Đạo / Hắc Đạo theo Tháng Âm Lịch & Chi Ngày
 */
export function calculateHoangDaoDay(lunarMonth: number, chiNgay: string): {
  isHoangDao: boolean;
  label: string;
  starName: string;
} {
  const chiNgayIdx = CHI.indexOf(chiNgay);

  // Month starts Thanh Long at:
  // Tháng 1 (Dần), Tháng 7 (Thân): Thanh Long tại Tý (0)
  // Tháng 2 (Mão), Tháng 8 (Dậu): Thanh Long tại Dần (2)
  // Tháng 3 (Thìn), Tháng 9 (Tuất): Thanh Long tại Thìn (4)
  // Tháng 4 (Tị), Tháng 10 (Hợi): Thanh Long tại Ngọ (6)
  // Tháng 5 (Ngọ), Tháng 11 (Tý): Thanh Long tại Thân (8)
  // Tháng 6 (Mùi), Tháng 12 (Sửu): Thanh Long tại Tuất (10)
  
  const startChiByMonth: Record<number, number> = {
    1: 0, 7: 0,
    2: 2, 8: 2,
    3: 4, 9: 4,
    4: 6, 10: 6,
    5: 8, 11: 8,
    6: 10, 12: 10,
  };

  const startChi = startChiByMonth[lunarMonth] ?? 0;
  const starOffset = (chiNgayIdx - startChi + 12) % 12;
  const star = THANH_LONG_STARS[starOffset];

  return {
    isHoangDao: star.isHoangDao,
    label: star.isHoangDao ? 'Ngày Hoàng đạo' : 'Ngày Hắc đạo',
    starName: star.name,
  };
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

  // Hoang Dao Day
  const hoangDaoDay = calculateHoangDaoDay(lunar.lunarMonth, chiNgay);

  // Hoang Dao Hours
  const { hoangDaoHours, allHours } = calculateHoangDaoHours(canNgay, chiNgay);

  // 12 Trực
  const trucOffset = (dayIdx + lunar.lunarMonth) % 12;
  const truc = TRUC_LIST[trucOffset] || TRUC_LIST[0];

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
    isHoangDaoDay: hoangDaoDay.isHoangDao,
    hoangDaoDayText: hoangDaoDay.label,
    hoangDaoStarName: hoangDaoDay.starName,
    hoangDaoHours,
    allHours,
    currentTimeFormatted: `${hh}:${mm}:${ss}`,
    currentHourCanChi: comprehensive.batTu.hourCanChi,
    currentSolarTermName: comprehensive.currentTerm.name,
    truc,
    nhiThapBatTu,
    xuatHanh,
    historicalEvent,
    quote,
    zodiacAnimal,
  };
}
