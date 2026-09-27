import { CAN, CHI, CAN_NGU_HANH, CHI_CON_GIAP } from './canChi';

export interface ThienTuongInfo {
  name: string;
  element: string;
  nature: 'Cát' | 'Hung' | 'Trung';
  symbol: string;
  meaning: string;
  description: string;
}

export const LUC_THAP_HOA_GIAP_NAP_AM: Record<string, string> = {
  'Giáp Tý': 'Hải Trung Kim',
  'Ất Sửu': 'Hải Trung Kim',
  'Bính Dần': 'Lư Trung Hỏa',
  'Đinh Mão': 'Lư Trung Hỏa',
  'Mậu Thìn': 'Đại Lâm Mộc',
  'Kỷ Tị': 'Đại Lâm Mộc',
  'Canh Ngọ': 'Lộ Bàng Thổ',
  'Tân Mùi': 'Lộ Bàng Thổ',
  'Nhâm Thân': 'Kiếm Phong Kim',
  'Quý Dậu': 'Kiếm Phong Kim',
  'Giáp Tuất': 'Sơn Đầu Hỏa',
  'Ất Hợi': 'Sơn Đầu Hỏa',
  'Bính Tý': 'Giản Hạ Thủy',
  'Đinh Sửu': 'Giản Hạ Thủy',
  'Mậu Dần': 'Thành Đầu Thổ',
  'Kỷ Mão': 'Thành Đầu Thổ',
  'Canh Thìn': 'Bạch Lạp Kim',
  'Tân Tị': 'Bạch Lạp Kim',
  'Nhâm Ngọ': 'Dương Liễu Mộc',
  'Quý Mùi': 'Dương Liễu Mộc',
  'Giáp Thân': 'Tuyền Trung Thủy',
  'Ất Dậu': 'Tuyền Trung Thủy',
  'Bính Tuất': 'Ốc Thượng Thổ',
  'Đinh Hợi': 'Ốc Thượng Thổ',
  'Mậu Tý': 'Tích Lịch Hỏa',
  'Kỷ Sửu': 'Tích Lịch Hỏa',
  'Canh Dần': 'Tùng Bách Mộc',
  'Tân Mão': 'Tùng Bách Mộc',
  'Nhâm Thìn': 'Trường Lưu Thủy',
  'Quý Tị': 'Trường Lưu Thủy',
  'Giáp Ngọ': 'Sa Trung Kim',
  'Ất Mùi': 'Sa Trung Kim',
  'Bính Thân': 'Sơn Hạ Hỏa',
  'Đinh Dậu': 'Sơn Hạ Hỏa',
  'Mậu Tuất': 'Bình Địa Mộc',
  'Kỷ Hợi': 'Bình Địa Mộc',
  'Canh Tý': 'Bích Thượng Thổ',
  'Tân Sửu': 'Bích Thượng Thổ',
  'Nhâm Dần': 'Kim Bạc Kim',
  'Quý Mão': 'Kim Bạc Kim',
  'Giáp Thìn': 'Phúc Đăng Hỏa',
  'Ất Tị': 'Phúc Đăng Hỏa',
  'Bính Ngọ': 'Thiên Hà Thủy',
  'Đinh Mùi': 'Thiên Hà Thủy',
  'Mậu Thân': 'Đại Trạch Thổ',
  'Kỷ Dậu': 'Đại Trạch Thổ',
  'Canh Tuất': 'Thoa Xuyến Kim',
  'Tân Hợi': 'Thoa Xuyến Kim',
  'Nhâm Tý': 'Tang Đố Mộc',
  'Quý Sửu': 'Tang Đố Mộc',
  'Giáp Dần': 'Đại Khê Thủy',
  'Ất Mão': 'Đại Khê Thủy',
  'Bính Thìn': 'Sa Trung Thổ',
  'Đinh Tị': 'Sa Trung Thổ',
  'Mậu Ngọ': 'Thiên Thượng Hỏa',
  'Kỷ Mùi': 'Thiên Thượng Hỏa',
  'Canh Thân': 'Thạch Lựu Mộc',
  'Tân Dậu': 'Thạch Lựu Mộc',
  'Nhâm Tuất': 'Đại Hải Thủy',
  'Quý Hợi': 'Đại Hải Thủy',
};

export const THAP_NHI_THIEN_TUONG: Record<string, ThienTuongInfo> = {
  'Quý Nhân': {
    name: 'Quý Nhân',
    element: 'Dương Thổ',
    nature: 'Cát',
    symbol: '👑',
    meaning: 'Cát thần đệ nhất, tôn quý, phúc thọ, quan quý, giải hung',
    description: 'Chủ về bậc tôn trưởng, lãnh đạo, quý nhân phò trợ, kiện tụng đắc lý, trăm sự giải ách.',
  },
  'Đằng Xà': {
    name: 'Đằng Xà',
    element: 'Âm Hỏa',
    nature: 'Hung',
    symbol: '🐍',
    meaning: 'Kinh hãi, quái dị, ác mộng, hỏa hoạn, dây dưa',
    description: 'Chủ về việc kinh sợ, bất an, dối trá, nghi ngờ, thị phi, tai ương bất ngờ.',
  },
  'Chu Tước': {
    name: 'Chu Tước',
    element: 'Dương Hỏa',
    nature: 'Hung',
    symbol: '🦚',
    meaning: 'Văn thư, khẩu thiệt, tranh chấp, tin tức, tiếng tăm',
    description: 'Chủ về văn thư thi cử, tin tức phương xa, nhưng thường kèm khẩu thiệt cãi vã, quan tụng thị phi.',
  },
  'Lục Hợp': {
    name: 'Lục Hợp',
    element: 'Âm Mộc',
    nature: 'Cát',
    symbol: '🤝',
    meaning: 'Hòa hợp, hôn nhân, giao dịch, mai mối, sum họp',
    description: 'Chủ về việc tác hợp lương duyên, buôn bán ký kết hợp đồng, kết bạn, hòa giải tranh chấp.',
  },
  'Câu Trận': {
    name: 'Câu Trận',
    element: 'Dương Thổ',
    nature: 'Hung',
    symbol: '⚔️',
    meaning: 'Trì trệ, kiện tụng, tranh chấp đất đai, lao tù',
    description: 'Chủ về cản trở, đình trệ, việc cũ dây dưa, tranh chấp điền sản, đấu tụng trước cửa quan.',
  },
  'Thanh Long': {
    name: 'Thanh Long',
    element: 'Dương Mộc',
    nature: 'Cát',
    symbol: '🐉',
    meaning: 'Tài lộc, hỷ khánh, thăng tiến, quý hiển, phát tài',
    description: 'Cát tướng chủ đại tài lộc, thi cử đỗ đạt, thăng quan tiến chức, gặp may mắn trong mọi việc.',
  },
  'Thiên Không': {
    name: 'Thiên Không',
    element: 'Dương Thổ',
    nature: 'Hung',
    symbol: '💨',
    meaning: 'Hư trá, lừa lọc, không vong, hão huyền, xuất gia',
    description: 'Chủ về lời nói dối trá, hữu danh vô thực, tiền tài hao tán, chỉ lợi cho việc tu hành xuất thế.',
  },
  'Bạch Hổ': {
    name: 'Bạch Hổ',
    element: 'Dương Kim',
    nature: 'Hung',
    symbol: '🐅',
    meaning: 'Hung sát, tai nạn, tật bệnh, tang phục, huyết quang',
    description: 'Hung thần chủ về đau ốm hiểm nghèo, tai nạn xe cộ, việc hình phạt, tang tóc, tranh đấu đổ máu.',
  },
  'Thái Thường': {
    name: 'Thái Thường',
    element: 'Âm Thổ',
    nature: 'Cát',
    symbol: '🍷',
    meaning: 'Yến tiệc, bổng lộc, y phục, lễ nghi, vui mừng',
    description: 'Chủ về ăn uống tiệc tùng, bổng lộc triều đình, nhận bằng khen, may mặc, hòa hảo thân tình.',
  },
  'Huyền Vũ': {
    name: 'Huyền Vũ',
    element: 'Âm Thủy',
    nature: 'Hung',
    symbol: '🐢',
    meaning: 'Trộm cắp, lừa đảo, mờ ám, gian tà, tiểu nhân',
    description: 'Chủ về mất trộm của cải, tiểu nhân gian manh hãm hại, việc mờ ám khó lường, tư tình vụng trộm.',
  },
  'Thái Âm': {
    name: 'Thái Âm',
    element: 'Âm Kim',
    nature: 'Cát',
    symbol: '🌙',
    meaning: 'Mưu kín, âm đức, phụ nữ, che chở, kín đáo',
    description: 'Chủ về việc kín đáo, âm thầm mưu tính, được nữ quý nhân giúp đỡ, tích đức vô hình.',
  },
  'Thiên Hậu': {
    name: 'Thiên Hậu',
    element: 'Dương Thủy',
    nature: 'Cát',
    symbol: '👸',
    meaning: 'Ân trạch, hòa thuận, tình cảm, quý phụ, từ ái',
    description: 'Chủ về phúc ấm gia đình, tình cảm vợ chồng thắm thiết, mẹ hiền dâu thảo, được bề trên bao bọc.',
  },
};

export const THIEN_TUONG_NAMES = [
  'Quý Nhân',
  'Đằng Xà',
  'Chu Tước',
  'Lục Hợp',
  'Câu Trận',
  'Thanh Long',
  'Thiên Không',
  'Bạch Hổ',
  'Thái Thường',
  'Huyền Vũ',
  'Thái Âm',
  'Thiên Hậu',
];

export const NGUYET_TUONG_MAP: Record<string, { chi: string; name: string; season: string; meaning: string }> = {
  'Hợi': { chi: 'Hợi', name: 'Đăng Minh', season: 'Vũ Thủy - Kinh Trập', meaning: 'Chủ quang minh, soi sáng mờ ám, giải trừ u tối' },
  'Tuất': { chi: 'Tuất', name: 'Hà Khôi', season: 'Xuân Phân - Thanh Minh', meaning: 'Chủ việc nghiêm ngặt, ngục đình, đóng cửa, phòng thủ' },
  'Dậu': { chi: 'Dậu', name: 'Tòng Khôi', season: 'Cốc Vũ - Lập Hạ', meaning: 'Chủ tòng lệnh, thu liễm, văn thư, ngọc ngà, yến tiệc' },
  'Thân': { chi: 'Thân', name: 'Truyền Tống', season: 'Tiểu Mãn - Mang Chủng', meaning: 'Chủ truyền tin, đi lại, dịch mã, thông thương, xa xứ' },
  'Mùi': { chi: 'Mùi', name: 'Tiểu Cát', season: 'Hạ Chí - Tiểu Thử', meaning: 'Chủ ẩm thực, hôn nhân, tiệc tùng, hòa hợp, bổng lộc' },
  'Ngọ': { chi: 'Ngọ', name: 'Thắng Quang', season: 'Đại Thử - Lập Thu', meaning: 'Chủ văn chương, ánh sáng, quang vinh, hỷ sự, quan trường' },
  'Tị': { chi: 'Tị', name: 'Thái Ất', season: 'Xử Thử - Bạch Lộ', meaning: 'Chủ xuất hành, xe cộ, biến động, tài năng, nhanh nhẹn' },
  'Thìn': { chi: 'Thìn', name: 'Thiên Cương', season: 'Thu Phân - Hàn Lộ', meaning: 'Chủ cương quyết, uy quyền, chỉ huy, hình luật, trừ tà' },
  'Mão': { chi: 'Mão', name: 'Thái Xung', season: 'Sương Giáng - Lập Đông', meaning: 'Chủ xung động, xuất hành, đò giang, cây cối, di chuyển' },
  'Dần': { chi: 'Dần', name: 'Công Tào', season: 'Tiểu Tuyết - Đại Tuyết', meaning: 'Chủ công môn, quan lại, khởi đầu sự nghiệp, tài lộc' },
  'Sửu': { chi: 'Sửu', name: 'Đại Cát', season: 'Đông Chí - Tiểu Hàn', meaning: 'Chủ điền trạch, quý nhân, kho báu, tích trữ, an định' },
  'Tý': { chi: 'Tý', name: 'Thần Hậu', season: 'Đại Hàn - Lập Xuân', meaning: 'Chủ hậu cung, sinh nở, mưu kín, dưỡng dục, nước nguồn' },
};

export const CHI_NGU_HANH: Record<string, string> = {
  'Tý': 'Dương Thủy',
  'Sửu': 'Âm Thổ',
  'Dần': 'Dương Mộc',
  'Mão': 'Âm Mộc',
  'Thìn': 'Dương Thổ',
  'Tị': 'Âm Hỏa',
  'Ngọ': 'Dương Hỏa',
  'Mùi': 'Âm Thổ',
  'Thân': 'Dương Kim',
  'Dậu': 'Âm Kim',
  'Tuất': 'Dương Thổ',
  'Hợi': 'Âm Thủy',
};

// Ký cung của 10 Thiên Can trên Địa bàn 12 Địa Chi
export const CAN_KY_CUNG: Record<string, string> = {
  'Giáp': 'Dần',
  'Ất': 'Thìn',
  'Bính': 'Tị',
  'Đinh': 'Mùi',
  'Mậu': 'Tị',
  'Kỷ': 'Mùi',
  'Canh': 'Thân',
  'Tân': 'Tuất',
  'Nhâm': 'Hợi',
  'Quý': 'Sửu',
};

export interface LucNhamPalace {
  diaChi: string;        // Địa bàn (Cố định)
  thienChi: string;      // Thiên bàn (Xoay chuyển)
  thienTuong: string;    // 12 Thần tướng
  thienTuongInfo: ThienTuongInfo;
  isTuanKhong: boolean;  // Tuần không
  isLocThan: boolean;    // Lộc thần
  isDichMa: boolean;     // Dịch mã
  isDuongNhan: boolean;  // Dương nhận
  isQuyNhan: boolean;    // Quý nhân đáo
  isBanMenh?: boolean;   // Bản mệnh người hỏi
  isHanhNien?: boolean;  // Hành niên người hỏi
  isCanKy?: boolean;     // Ký cung của Can ngày
  isChiNgay?: boolean;   // Cung Chi của ngày
  isSoTruyen?: boolean;  // Sơ Truyền đáo
  isTrungTruyen?: boolean; // Trung Truyền đáo
  isMatTruyen?: boolean; // Mạt Truyền đáo
  nguHanhDia: string;
  nguHanhThien: string;
  relation: string;      // Quan hệ Thiên - Địa sinh khắc
}

export interface LucNhamKhoa {
  index: number;
  name: string;
  role: string;
  thuongThan: string;     // Thiên bàn
  haThan: string;         // Địa bàn (hoặc Can Ngày)
  thuongNguHanh: string;
  haNguHanh: string;
  relation: string;       // Sinh / Khắc / Tỷ hòa
  isKhac: boolean;
  khacType?: 'Thượng khắc Hạ' | 'Hạ khắc Thượng' | 'Tỷ Hòa' | 'Tương Sinh';
  thienTuong: string;
}

export interface LucNhamTruyen {
  level: 'Sơ Truyền' | 'Trung Truyền' | 'Mạt Truyền';
  chi: string;
  thienTuong: string;
  thienTuongInfo: ThienTuongInfo;
  nguHanh: string;
  lucThan: string;        // Huynh Đệ, Phụ Mẫu, Tử Tôn, Thê Tài, Quan Quỷ
  meaning: string;
  isTuanKhong: boolean;
}

export interface QuerentInput {
  birthYear?: number;
  gender?: 'Nam' | 'Nữ';
  currentYear?: number;
  questionAspect?: string;
  yearCanChi?: string;
  monthCanChi?: string;
}

export interface BanMenhHanhNienInfo {
  birthYear: number;
  birthCanChi: string;
  birthNapAm: string;
  birthChi: string;
  birthCan: string;
  birthConGiap: string;
  gender: 'Nam' | 'Nữ';
  tuoiMu: number;
  currentYear: number;
  questionAspect: string;

  // Bản Mệnh (Căn)
  banMenhChi: string;
  banMenhThienChi: string;
  banMenhThienTuong: string;
  banMenhThienTuongInfo: ThienTuongInfo;
  banMenhRelation: string;
  banMenhKhacType: 'Sinh' | 'Khắc' | 'Được Sinh' | 'Bị Khắc' | 'Tỷ Hòa';
  banMenhVerdict: string;
  banMenhIsTuanKhong: boolean;
  banMenhIsQuyNhan: boolean;
  banMenhIsLocThan: boolean;
  banMenhIsDichMa: boolean;

  // Hành Niên (Diệp)
  hanhNienChi: string;
  hanhNienThienChi: string;
  hanhNienThienTuong: string;
  hanhNienThienTuongInfo: ThienTuongInfo;
  hanhNienRelation: string;
  hanhNienKhacType: 'Sinh' | 'Khắc' | 'Được Sinh' | 'Bị Khắc' | 'Tỷ Hòa';
  hanhNienVerdict: string;
  hanhNienIsTuanKhong: boolean;
  hanhNienIsQuyNhan: boolean;
  hanhNienIsLocThan: boolean;
  hanhNienIsDichMa: boolean;

  // Tương tác Thân - Mệnh với Tam Truyền
  inTamTruyen: {
    inSoTruyen: boolean;
    inTrungTruyen: boolean;
    inMatTruyen: boolean;
    roleDesc: string;
  };

  interactionSummary: string;
  classicalQuote: string;
}

export interface LucNhamChart {
  // Can Chi ngày giờ & Tứ Trụ
  ngayCanChi: string;
  dayCanChi: string;
  dayCan: string;
  dayChi: string;
  gioCanChi: string;
  hourChi: string;
  isDayTime: boolean; // Đán quý hay Dạ quý

  tuTru: {
    yearCanChi: string;
    monthCanChi: string;
    dayCanChi: string;
    hourCanChi: string;
    tietKhi: string;
    solarLongitude: number;
    solarLonDegree: string;
  };

  // Người Hỏi (Nhân Khí / Bản Mệnh & Hành Niên)
  querent: BanMenhHanhNienInfo;

  // Nguyệt Tướng
  nguyetTuongChi: string;
  nguyetTuongName: string;
  nguyetTuongSeason: string;

  // Quý Nhân
  quyNhanChi: string;
  quyNhanDirection: 'Thuận' | 'Nghịch';
  quyNhanType: 'Đán Quý (Ban Ngày)' | 'Dạ Quý (Ban Đêm)';

  // 12 Cung Bàn
  palaces: Record<string, LucNhamPalace>;
  palacesList: LucNhamPalace[];

  // Tứ Khoa
  tuKhoa: LucNhamKhoa[];

  // Tam Truyền
  tamTruyen: LucNhamTruyen[];
  tongMonName: string; // Tên môn (Nguyên Thủ, Trùng Thẩm, Tỷ Dụng, Thiệp Hại, Dao Khắc, Mão Tinh, Biệt Trạch, Bát Chuyên, Phục Ngâm, Phản Ngâm)
  tongMonDescription: string;

  // Thần Sát & Tuần Không
  tuanKhong: [string, string];
  tuanGiap: string;
  thanSat: {
    locThan: string;
    dichMa: string;
    duongNhan: string;
    thienDuc: string;
    nguyetDuc: string;
    thaiTue: string;
  };

  // Diễn giải quy trình lập quẻ theo Hiệp Kỷ Biện Phương Thư
  setupExplanation: {
    nguyetTuongRule: string;
    thienBanRule: string;
    quyNhanRule: string;
    tuKhoaRule: string;
    tamTruyenRule: string;
    menhNienRule: string;
  };

  // Đánh giá tổng quan
  score: number;
  stars: number;
  level: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung';
  verdict: string;
  summary: string;

  // Dự trắc chuyên đề
  prognostications: {
    cauTai: string;
    honNhan: string;
    quanVan: string;
    benhTat: string;
    kienTung: string;
    xuatHanh: string;
    giaDao?: string;
    thatVat?: string;
  };
}

/**
 * Xác định Nguyệt Tướng theo Kinh độ Mặt Trời (Solar Longitude)
 */
export function getNguyetTuong(solarLon: number): { chi: string; name: string; season: string; meaning: string } {
  // Normalize lon to 0..360
  let lon = (solarLon % 360 + 360) % 360;

  // Vũ Thủy (330°) -> Xuân Phân (0°): Hợi
  if (lon >= 330 || lon < 0) {
    return NGUYET_TUONG_MAP['Hợi'];
  } else if (lon >= 0 && lon < 30) {
    // Xuân Phân (0°) -> Cốc Vũ (30°): Tuất
    return NGUYET_TUONG_MAP['Tuất'];
  } else if (lon >= 30 && lon < 60) {
    // Cốc Vũ (30°) -> Tiểu Mãn (60°): Dậu
    return NGUYET_TUONG_MAP['Dậu'];
  } else if (lon >= 60 && lon < 90) {
    // Tiểu Mãn (60°) -> Hạ Chí (90°): Thân
    return NGUYET_TUONG_MAP['Thân'];
  } else if (lon >= 90 && lon < 120) {
    // Hạ Chí (90°) -> Đại Thử (120°): Mùi
    return NGUYET_TUONG_MAP['Mùi'];
  } else if (lon >= 120 && lon < 150) {
    // Đại Thử (120°) -> Xử Thử (150°): Ngọ
    return NGUYET_TUONG_MAP['Ngọ'];
  } else if (lon >= 150 && lon < 180) {
    // Xử Thử (150°) -> Thu Phân (180°): Tị
    return NGUYET_TUONG_MAP['Tị'];
  } else if (lon >= 180 && lon < 210) {
    // Thu Phân (180°) -> Sương Giáng (210°): Thìn
    return NGUYET_TUONG_MAP['Thìn'];
  } else if (lon >= 210 && lon < 240) {
    // Sương Giáng (210°) -> Tiểu Tuyết (240°): Mão
    return NGUYET_TUONG_MAP['Mão'];
  } else if (lon >= 240 && lon < 270) {
    // Tiểu Tuyết (240°) -> Đông Chí (270°): Dần
    return NGUYET_TUONG_MAP['Dần'];
  } else if (lon >= 270 && lon < 300) {
    // Đông Chí (270°) -> Đại Hàn (300°): Sửu
    return NGUYET_TUONG_MAP['Sửu'];
  } else {
    // Đại Hàn (300°) -> Vũ Thủy (330°): Tý
    return NGUYET_TUONG_MAP['Tý'];
  }
}

/**
 * Trích xuất nguyên tố ngũ hành đơn giản (Kim, Mộc, Thủy, Hỏa, Thổ)
 */
export function getBaseElement(nguHanhStr: string): 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' {
  if (nguHanhStr.includes('Kim')) return 'Kim';
  if (nguHanhStr.includes('Mộc')) return 'Mộc';
  if (nguHanhStr.includes('Thủy')) return 'Thủy';
  if (nguHanhStr.includes('Hỏa')) return 'Hỏa';
  return 'Thổ';
}

/**
 * Kiểm tra quan hệ sinh khắc giữa Thượng và Hạ
 */
export function checkSinhKhac(
  thuong: string,
  ha: string
): { relation: string; isKhac: boolean; khacType?: 'Thượng khắc Hạ' | 'Hạ khắc Thượng' | 'Tỷ Hòa' | 'Tương Sinh' } {
  const e1 = getBaseElement(thuong);
  const e2 = getBaseElement(ha);

  if (e1 === e2) {
    return { relation: `${e1} Tỷ Hòa ${e2}`, isKhac: false, khacType: 'Tỷ Hòa' };
  }

  // Khắc rules: Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc
  const khacMap: Record<string, string> = {
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
    'Kim': 'Mộc',
  };

  if (khacMap[e1] === e2) {
    return { relation: `${e1} khắc ${e2} (Thượng khắc Hạ - Tà Khắc)`, isKhac: true, khacType: 'Thượng khắc Hạ' };
  }

  if (khacMap[e2] === e1) {
    return { relation: `${e2} khắc ${e1} (Hạ khắc Thượng - Tố Khắc)`, isKhac: true, khacType: 'Hạ khắc Thượng' };
  }

  // Sinh rules: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc
  const sinhMap: Record<string, string> = {
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
    'Kim': 'Thủy',
    'Thủy': 'Mộc',
  };

  if (sinhMap[e1] === e2) {
    return { relation: `${e1} sinh ${e2} (Thượng sinh Hạ)`, isKhac: false, khacType: 'Tương Sinh' };
  }

  return { relation: `${e2} sinh ${e1} (Hạ sinh Thượng)`, isKhac: false, khacType: 'Tương Sinh' };
}

/**
 * Tính Lục Thân (Huynh Đệ, Tử Tôn, Thê Tài, Quan Quỷ, Phụ Mẫu) theo Can Ngày
 */
export function getLucThan(canNgay: string, chi: string): string {
  const canEl = getBaseElement(CAN_NGU_HANH[canNgay] || 'Dương Mộc');
  const chiEl = getBaseElement(CHI_NGU_HANH[chi] || 'Dương Thủy');

  if (canEl === chiEl) return 'Huynh Đệ';

  const sinhMap: Record<string, string> = {
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
    'Kim': 'Thủy',
    'Thủy': 'Mộc',
  };

  const khacMap: Record<string, string> = {
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
    'Kim': 'Mộc',
  };

  if (sinhMap[canEl] === chiEl) return 'Tử Tôn (Ta sinh)';
  if (sinhMap[chiEl] === canEl) return 'Phụ Mẫu (Sinh ta)';
  if (khacMap[canEl] === chiEl) return 'Thê Tài (Ta khắc)';
  if (khacMap[chiEl] === canEl) return 'Quan Quỷ (Khắc ta)';

  return 'Tỷ Hòa';
}

/**
 * Tìm Tuần Không của ngày
 */
export function getTuanKhong(dayCan: string, dayChi: string): { tuanKhong: [string, string]; tuanGiap: string } {
  const canIdx = CAN.indexOf(dayCan);
  const chiIdx = CHI.indexOf(dayChi);
  if (canIdx === -1 || chiIdx === -1) {
    return { tuanKhong: ['Tuất', 'Hợi'], tuanGiap: 'Giáp Tý' };
  }

  const diff = (chiIdx - canIdx + 12) % 12;
  const tuanGiapNames: Record<number, { tuan: string; khong: [string, string] }> = {
    0: { tuan: 'Giáp Tý', khong: ['Tuất', 'Hợi'] },
    10: { tuan: 'Giáp Tuất', khong: ['Thân', 'Dậu'] },
    8: { tuan: 'Giáp Thân', khong: ['Ngọ', 'Mùi'] },
    6: { tuan: 'Giáp Ngọ', khong: ['Thìn', 'Tị'] },
    4: { tuan: 'Giáp Thìn', khong: ['Dần', 'Mão'] },
    2: { tuan: 'Giáp Dần', khong: ['Tý', 'Sửu'] },
  };

  const item = tuanGiapNames[diff] || { tuan: 'Giáp Tý', khong: ['Tuất', 'Hợi'] as [string, string] };
  return { tuanKhong: item.khong, tuanGiap: item.tuan };
}

/**
 * Tính toán Bản Mệnh và Hành Niên theo Hiệp Kỷ Biện Phương Thư & Lục Nhâm Đại Toàn
 * "Nam nhất tuế khởi Dần thuận hành, Nữ nhất tuế khởi Thân nghịch hành"
 * "Chiêm sự dĩ Can vi Chủ, Chi vi Sự, Bản Mệnh vi Căn, Hành Niên vi Diệp"
 */
export function calculateBanMenhHanhNien(
  querentInput: QuerentInput | undefined,
  thienBanMap: Record<string, string>,
  thienTuongThienBan: Record<string, string>,
  tuanKhong: [string, string],
  locThan: string,
  dichMa: string,
  quyNhanChi: string,
  soTruyen: string,
  trungTruyen: string,
  matTruyen: string
): BanMenhHanhNienInfo {
  const currentYear = querentInput?.currentYear || 2026;
  const birthYear = querentInput?.birthYear || 1990;
  const gender: 'Nam' | 'Nữ' = querentInput?.gender || 'Nam';
  const questionAspect = querentInput?.questionAspect || 'all';

  // 1. Tính Can Chi & Nạp Âm của năm sinh
  let canNamIdx = (birthYear - 4) % 10;
  if (canNamIdx < 0) canNamIdx += 10;
  let chiNamIdx = (birthYear - 4) % 12;
  if (chiNamIdx < 0) chiNamIdx += 12;

  const birthCan = CAN[canNamIdx];
  const birthChi = CHI[chiNamIdx];
  const birthCanChi = `${birthCan} ${birthChi}`;
  const birthConGiap = CHI_CON_GIAP[birthChi] || '';
  const birthNapAm = LUC_THAP_HOA_GIAP_NAP_AM[birthCanChi] || 'Chưa định';
  const tuoiMu = Math.max(1, currentYear - birthYear + 1);

  // 2. Tính Cung Bản Mệnh (Căn)
  const banMenhChi = birthChi;
  const banMenhThienChi = thienBanMap[banMenhChi] || 'Tý';
  const banMenhThienTuong = thienTuongThienBan[banMenhThienChi] || 'Quý Nhân';
  const banMenhThienTuongInfo = THAP_NHI_THIEN_TUONG[banMenhThienTuong] || THAP_NHI_THIEN_TUONG['Quý Nhân'];
  const banMenhSk = checkSinhKhac(CHI_NGU_HANH[banMenhThienChi], CHI_NGU_HANH[banMenhChi]);

  let banMenhKhacType: 'Sinh' | 'Khắc' | 'Được Sinh' | 'Bị Khắc' | 'Tỷ Hòa' = 'Tỷ Hòa';
  let banMenhVerdict = '';
  if (banMenhSk.khacType === 'Tỷ Hòa') {
    banMenhKhacType = 'Tỷ Hòa';
    banMenhVerdict = `Thần Mệnh Tỷ Hòa (${banMenhThienChi} hòa ${banMenhChi}): Đương số có nội lực bình ổn, được bằng hữu đồng sự tương trợ, thế cục an định.`;
  } else if (banMenhSk.khacType === 'Thượng khắc Hạ') {
    banMenhKhacType = 'Bị Khắc';
    banMenhVerdict = `Thượng Thần khắc Bản Mệnh (${banMenhThienChi} khắc ${banMenhChi} - Thụ Khắc): Thân mệnh bị hoàn cảnh bức bách, đề phòng tật ách, thị phi hoặc cấp trên gây khó khăn. Nên thủ thế tĩnh lặng.`;
  } else if (banMenhSk.khacType === 'Hạ khắc Thượng') {
    banMenhKhacType = 'Khắc';
    banMenhVerdict = `Bản Mệnh khắc Thượng Thần (${banMenhChi} khắc ${banMenhThienChi} - Chế Thần): Bản thân làm chủ tình thế, mưu cầu tài lộc tất thành, chuyển biến nghịch cảnh thành thắng lợi.`;
  } else if (banMenhSk.relation.includes('Thượng sinh Hạ')) {
    banMenhKhacType = 'Được Sinh';
    banMenhVerdict = `Thượng Thần sinh Bản Mệnh (${banMenhThienChi} sinh ${banMenhChi} - Đắc Sinh): Đại cát! Được quý nhân nâng đỡ, phúc thọ tăng tiến, thân mệnh hưng thịnh, mưu sự đại lợi.`;
  } else {
    banMenhKhacType = 'Sinh';
    banMenhVerdict = `Bản Mệnh sinh Thượng Thần (${banMenhChi} sinh ${banMenhThienChi} - Tiết Khí): Bản thân phải lao tâm khổ tứ, hao tốn công sức tài lộc vì công việc người ngoài. Cần dưỡng sức tránh quá tải.`;
  }

  // 3. Tính Cung Hành Niên (Diệp)
  // Nam nhất tuế khởi Dần thuận hành; Nữ nhất tuế khởi Thân nghịch hành
  let hanhNienIdx = 0;
  if (gender === 'Nam') {
    hanhNienIdx = (CHI.indexOf('Dần') + (tuoiMu - 1)) % 12;
  } else {
    hanhNienIdx = (CHI.indexOf('Thân') - ((tuoiMu - 1) % 12) + 12) % 12;
  }
  const hanhNienChi = CHI[hanhNienIdx];
  const hanhNienThienChi = thienBanMap[hanhNienChi] || 'Tý';
  const hanhNienThienTuong = thienTuongThienBan[hanhNienThienChi] || 'Quý Nhân';
  const hanhNienThienTuongInfo = THAP_NHI_THIEN_TUONG[hanhNienThienTuong] || THAP_NHI_THIEN_TUONG['Quý Nhân'];
  const hanhNienSk = checkSinhKhac(CHI_NGU_HANH[hanhNienThienChi], CHI_NGU_HANH[hanhNienChi]);

  let hanhNienKhacType: 'Sinh' | 'Khắc' | 'Được Sinh' | 'Bị Khắc' | 'Tỷ Hòa' = 'Tỷ Hòa';
  let hanhNienVerdict = '';
  if (hanhNienSk.khacType === 'Tỷ Hòa') {
    hanhNienKhacType = 'Tỷ Hòa';
    hanhNienVerdict = `Hành Niên bình hòa, vận thế trong năm quân bình, duy trì ổn định việc cũ.`;
  } else if (hanhNienSk.khacType === 'Thượng khắc Hạ') {
    hanhNienKhacType = 'Bị Khắc';
    hanhNienVerdict = `Hành Niên bị Thượng Thần khắc chế (${hanhNienThienChi} khắc ${hanhNienChi}): Trong năm dễ gặp áp lực đột xuất hoặc hao tốn ngoại cảnh, cần giữ vững tâm lý.`;
  } else if (hanhNienSk.khacType === 'Hạ khắc Thượng') {
    hanhNienKhacType = 'Khắc';
    hanhNienVerdict = `Hành Niên khắc Thượng Thần (${hanhNienChi} khắc ${hanhNienThienChi}): Chủ động xoay chuyển cục diện trong năm, mưu cầu tài chính hoặc bứt phá sự nghiệp có cơ hội lớn.`;
  } else if (hanhNienSk.relation.includes('Thượng sinh Hạ')) {
    hanhNienKhacType = 'Được Sinh';
    hanhNienVerdict = `Hành Niên đắc Thượng Thần sinh dưỡng (${hanhNienThienChi} sinh ${hanhNienChi}): Năm nay gặp nhiều may mắn, có quý nhân trợ lực bất ngờ, mọi dự định phát triển suôn sẻ.`;
  } else {
    hanhNienKhacType = 'Sinh';
    hanhNienVerdict = `Hành Niên sinh Thượng Thần (${hanhNienChi} sinh ${hanhNienThienChi}): Năm nay việc nhiều hao tâm, chi xuất tài chính lớn, nên có kế hoạch chi tiêu cụ thể.`;
  }

  // 4. Kiểm tra Thần Sát & Tuần Không
  const banMenhIsTuanKhong = tuanKhong.includes(banMenhChi) || tuanKhong.includes(banMenhThienChi);
  const banMenhIsQuyNhan = quyNhanChi === banMenhThienChi;
  const banMenhIsLocThan = locThan === banMenhThienChi;
  const banMenhIsDichMa = dichMa === banMenhThienChi;

  const hanhNienIsTuanKhong = tuanKhong.includes(hanhNienChi) || tuanKhong.includes(hanhNienThienChi);
  const hanhNienIsQuyNhan = quyNhanChi === hanhNienThienChi;
  const hanhNienIsLocThan = locThan === hanhNienThienChi;
  const hanhNienIsDichMa = dichMa === hanhNienThienChi;

  // 5. Tương tác Thân - Mệnh với Tam Truyền
  const inSoTruyen = banMenhChi === soTruyen || hanhNienChi === soTruyen;
  const inTrungTruyen = banMenhChi === trungTruyen || hanhNienChi === trungTruyen;
  const inMatTruyen = banMenhChi === matTruyen || hanhNienChi === matTruyen;

  let roleDesc = 'Thân Mệnh không trực tiếp nhập Tam Truyền, sự việc diễn ra theo quy luật khách quan, đương số đóng vai trò quan sát và điều tiết hài hòa.';
  if (inSoTruyen) {
    roleDesc = 'Bản Mệnh hoặc Hành Niên nhập Sơ Truyền: Đương số là ngòi nổ, khởi xướng hoặc nguyên nhân trực tiếp làm phát sinh sự việc.';
  } else if (inMatTruyen) {
    roleDesc = 'Bản Mệnh hoặc Hành Niên nhập Mạt Truyền: Kết quả cuối cùng quy tụ vào bản thân đương số, gánh vác trách nhiệm và hưởng quả ngọt sau cùng.';
  } else if (inTrungTruyen) {
    roleDesc = 'Bản Mệnh hoặc Hành Niên nhập Trung Truyền: Đương số đứng giữa tâm điểm biến chuyển, có vai trò điều đình hóa giải xung đột.';
  }

  const interactionSummary = `Người hỏi sinh năm ${birthCanChi} (${birthNapAm}), tuổi mụ ${tuoiMu} (${gender}). Bản Mệnh tại cung ${banMenhChi}, Thượng Thần ${banMenhThienChi} (${banMenhThienTuong}). Hành Niên tại cung ${hanhNienChi}, Thượng Thần ${hanhNienThienChi} (${hanhNienThienTuong}). ${banMenhVerdict} ${hanhNienVerdict}`;

  const classicalQuote = `Hiệp Kỷ Biện Phương Thư (Quyển 32 - Lục Nhâm Khởi Hành Niên): "Chiêm nhân dĩ Can vi Chủ, Chi vi Sự, Bản Mệnh vi Căn, Hành Niên vi Diệp. Mệnh gia cát thần tắc thân vinh, gia hung thần tắc thân khốn; Hành Niên cát tắc đương niên thuận toại, hung tắc đương niên trắc trở. Nam nhất tuế khởi Dần thuận hành, Nữ nhất tuế khởi Thân nghịch hành."`;

  return {
    birthYear,
    birthCanChi,
    birthNapAm,
    birthChi,
    birthCan,
    birthConGiap,
    gender,
    tuoiMu,
    currentYear,
    questionAspect,
    banMenhChi,
    banMenhThienChi,
    banMenhThienTuong,
    banMenhThienTuongInfo,
    banMenhRelation: banMenhSk.relation,
    banMenhKhacType,
    banMenhVerdict,
    banMenhIsTuanKhong,
    banMenhIsQuyNhan,
    banMenhIsLocThan,
    banMenhIsDichMa,
    hanhNienChi,
    hanhNienThienChi,
    hanhNienThienTuong,
    hanhNienThienTuongInfo,
    hanhNienRelation: hanhNienSk.relation,
    hanhNienKhacType,
    hanhNienVerdict,
    hanhNienIsTuanKhong,
    hanhNienIsQuyNhan,
    hanhNienIsLocThan,
    hanhNienIsDichMa,
    inTamTruyen: {
      inSoTruyen,
      inTrungTruyen,
      inMatTruyen,
      roleDesc,
    },
    interactionSummary,
    classicalQuote,
  };
}

/**
 * LẬP QUẺ ĐẠI LỤC NHÂM HOÀN CHỈNH
 */
export function buildLucNhamChart(
  solarLon: number,
  dayCanChi: string,
  hourCanChi: string,
  localHour: number,
  querentInput?: QuerentInput
): LucNhamChart {
  const [dayCan, dayChi] = dayCanChi.split(' ');
  const [_hourCan, hourChi] = hourCanChi.split(' ');

  // 1. Xác định Nguyệt Tướng
  const nguyetTuong = getNguyetTuong(solarLon);

  // 2. Lập Thiên Bàn đè lên Địa Bàn
  // Địa bàn: Tý..Hợi (0..11)
  // Nguyệt Tướng (nguyetTuong.chi) đè lên Giờ (hourChi) trên Địa bàn
  const hourChiIdx = CHI.indexOf(hourChi);
  const ntChiIdx = CHI.indexOf(nguyetTuong.chi);

  // thienBanMap[diaChi] = thienChi
  const thienBanMap: Record<string, string> = {};
  const diaBanFromThienMap: Record<string, string> = {};

  for (let i = 0; i < 12; i++) {
    const diaChi = CHI[i];
    // Offset từ giờ chiêm
    const offset = (i - hourChiIdx + 12) % 12;
    const thienChiIdx = (ntChiIdx + offset) % 12;
    const thienChi = CHI[thienChiIdx];
    thienBanMap[diaChi] = thienChi;
    diaBanFromThienMap[thienChi] = diaChi;
  }

  // 3. Khởi Quý Nhân (Đán / Dạ)
  // Giờ ban ngày: Mão (5-7h) đến Thân (15-17h) -> localHour >= 5 && localHour < 17
  const isDayTime = localHour >= 5 && localHour < 17;
  let quyNhanChi = 'Sửu';

  if (['Giáp', 'Mậu', 'Canh'].includes(dayCan)) {
    quyNhanChi = isDayTime ? 'Sửu' : 'Mùi';
  } else if (['Ất', 'Kỷ'].includes(dayCan)) {
    quyNhanChi = isDayTime ? 'Tý' : 'Thân';
  } else if (['Bính', 'Đinh'].includes(dayCan)) {
    quyNhanChi = isDayTime ? 'Hợi' : 'Dậu';
  } else if (['Nhâm', 'Quý'].includes(dayCan)) {
    quyNhanChi = isDayTime ? 'Tị' : 'Mão';
  } else if (dayCan === 'Tân') {
    quyNhanChi = isDayTime ? 'Ngọ' : 'Dần';
  }

  // Xác định vị trí Quý Nhân trên Địa Bàn (nghĩa là Địa bàn nào có Thiên Bàn là quyNhanChi)
  const quyNhanDiaChi = diaBanFromThienMap[quyNhanChi] || 'Sửu';
  const quyNhanDiaIdx = CHI.indexOf(quyNhanDiaChi);

  // Chiều an: Nửa Đông (Hợi, Tý, Sửu, Dần, Mão, Thìn, Tị = indices 11, 0, 1, 2, 3, 4, 5) -> THUẬN
  // Nửa Tây (Ngọ, Mùi, Thân, Dậu, Tuất = indices 6, 7, 8, 9, 10) -> NGHỊCH
  const isThuan = [11, 0, 1, 2, 3, 4, 5].includes(quyNhanDiaIdx);
  const quyNhanDirection: 'Thuận' | 'Nghịch' = isThuan ? 'Thuận' : 'Nghịch';

  // An 12 Thần Tướng lên Thiên Bàn
  // thienTuongThienBan[thienChi] = Tên Thần Tướng
  const thienTuongThienBan: Record<string, string> = {};
  const qnThienIdx = CHI.indexOf(quyNhanChi);

  for (let t = 0; t < 12; t++) {
    const tuongName = THAP_NHI_THIEN_TUONG[THIEN_TUONG_NAMES[t]].name;
    let targetThienIdx = 0;
    if (isThuan) {
      targetThienIdx = (qnThienIdx + t) % 12;
    } else {
      targetThienIdx = (qnThienIdx - t + 12) % 12;
    }
    const targetThienChi = CHI[targetThienIdx];
    thienTuongThienBan[targetThienChi] = tuongName;
  }

  // 4. An Tứ Khoa
  // Ký cung của Can ngày
  const canKyCung = CAN_KY_CUNG[dayCan] || 'Dần';
  const canNguHanh = CAN_NGU_HANH[dayCan] || 'Dương Mộc';

  // Khoa 1: Can Thượng Thần / Can Ngày (Ký Cung)
  const k1Thuong = thienBanMap[canKyCung];
  const k1Ha = canKyCung;
  const k1Sk = checkSinhKhac(CHI_NGU_HANH[k1Thuong], canNguHanh);

  // Khoa 2: Thượng Thần của k1Thuong / k1Thuong
  const k2Thuong = thienBanMap[k1Thuong];
  const k2Ha = k1Thuong;
  const k2Sk = checkSinhKhac(CHI_NGU_HANH[k2Thuong], CHI_NGU_HANH[k2Ha]);

  // Khoa 3: Chi Thượng Thần / Chi Ngày
  const k3Thuong = thienBanMap[dayChi];
  const k3Ha = dayChi;
  const k3Sk = checkSinhKhac(CHI_NGU_HANH[k3Thuong], CHI_NGU_HANH[k3Ha]);

  // Khoa 4: Thượng Thần của k3Thuong / k3Thuong
  const k4Thuong = thienBanMap[k3Thuong];
  const k4Ha = k3Thuong;
  const k4Sk = checkSinhKhac(CHI_NGU_HANH[k4Thuong], CHI_NGU_HANH[k4Ha]);

  const tuKhoa: LucNhamKhoa[] = [
    {
      index: 1,
      name: 'Khoa 1 (Can Thượng)',
      role: 'Chủ thể, bản thân người xem, ngoại tượng Can',
      thuongThan: k1Thuong,
      haThan: dayCan,
      thuongNguHanh: CHI_NGU_HANH[k1Thuong],
      haNguHanh: canNguHanh,
      relation: k1Sk.relation,
      isKhac: k1Sk.isKhac,
      khacType: k1Sk.khacType,
      thienTuong: thienTuongThienBan[k1Thuong] || 'Quý Nhân',
    },
    {
      index: 2,
      name: 'Khoa 2 (Can Âm)',
      role: 'Mưu tính kín đáo, nội tượng của Can, gia đạo bên trong',
      thuongThan: k2Thuong,
      haThan: k2Ha,
      thuongNguHanh: CHI_NGU_HANH[k2Thuong],
      haNguHanh: CHI_NGU_HANH[k2Ha],
      relation: k2Sk.relation,
      isKhac: k2Sk.isKhac,
      khacType: k2Sk.khacType,
      thienTuong: thienTuongThienBan[k2Thuong] || 'Quý Nhân',
    },
    {
      index: 3,
      name: 'Khoa 3 (Chi Thượng)',
      role: 'Đối phương, khách thể, nơi chốn, nhà cửa, sự việc',
      thuongThan: k3Thuong,
      haThan: dayChi,
      thuongNguHanh: CHI_NGU_HANH[k3Thuong],
      haNguHanh: CHI_NGU_HANH[dayChi],
      relation: k3Sk.relation,
      isKhac: k3Sk.isKhac,
      khacType: k3Sk.khacType,
      thienTuong: thienTuongThienBan[k3Thuong] || 'Quý Nhân',
    },
    {
      index: 4,
      name: 'Khoa 4 (Chi Âm)',
      role: 'Biến cố tiềm ẩn, hậu quả sự việc, nội tình đối phương',
      thuongThan: k4Thuong,
      haThan: k4Ha,
      thuongNguHanh: CHI_NGU_HANH[k4Thuong],
      haNguHanh: CHI_NGU_HANH[k4Ha],
      relation: k4Sk.relation,
      isKhac: k4Sk.isKhac,
      khacType: k4Sk.khacType,
      thienTuong: thienTuongThienBan[k4Thuong] || 'Quý Nhân',
    },
  ];

  // 5. Khởi Tam Truyền (Cửu Tông Môn)
  const { tuanKhong, tuanGiap } = getTuanKhong(dayCan, dayChi);

  let soTruyen = k1Thuong;
  let tongMonName = 'Nguyên Thủ Khóa';
  let tongMonDescription = 'Thượng khắc Hạ duy nhất, sự tình minh bạch, thuận theo đạo trời mà hành xử.';

  // Kiểm tra các cặp khắc trong Tứ Khoa
  const khacKhoas = tuKhoa.filter((k) => k.isKhac);
  const thuongKhacHa = tuKhoa.filter((k) => k.khacType === 'Thượng khắc Hạ');
  const haKhacThuong = tuKhoa.filter((k) => k.khacType === 'Hạ khắc Thượng');

  // Xét Phục Ngâm / Phản Ngâm trước
  const isPhucNgam = nguyetTuong.chi === hourChi;
  const isPhanNgam = (ntChiIdx + 6) % 12 === hourChiIdx;

  if (isPhucNgam) {
    tongMonName = 'Phục Ngâm Khóa';
    tongMonDescription = 'Thiên bàn trùng Địa bàn, sự việc bất động, đình trệ, nên giữ tĩnh làm chủ, thủ hộ cựu nghiệp.';
    soTruyen = canKyCung;
  } else if (isPhanNgam) {
    tongMonName = 'Phản Ngâm Khóa';
    tongMonDescription = 'Thiên bàn đối xung Địa bàn, chủ biến động kịch liệt, tráo trở, phản phục nhanh chóng.';
    // Dịch mã
    const dichMaMap: Record<string, string> = {
      'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
      'Hợi': 'Tị', 'Mão': 'Tị', 'Mùi': 'Tị',
      'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
      'Tị': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
    };
    soTruyen = dichMaMap[dayChi] || k1Thuong;
  } else if (thuongKhacHa.length === 1 && haKhacThuong.length === 0) {
    // 1. Nguyên Thủ Khóa
    tongMonName = 'Nguyên Thủ Khóa (Tặc Khắc)';
    tongMonDescription = 'Có duy nhất một cặp Thượng khắc Hạ (Tà Khắc). Khí thế thuận lý thành chương, chính đạo hanh thông.';
    soTruyen = thuongKhacHa[0].thuongThan;
  } else if (haKhacThuong.length === 1 && thuongKhacHa.length === 0) {
    // 2. Trùng Thẩm Khóa
    tongMonName = 'Trùng Thẩm Khóa (Tặc Khắc)';
    tongMonDescription = 'Có duy nhất một cặp Hạ khắc Thượng (Tố Khắc). Việc bắt đầu từ dưới dấy lên, cần xét nét kỹ lưỡng nội bộ.';
    soTruyen = haKhacThuong[0].thuongThan;
  } else if (thuongKhacHa.length > 1 || haKhacThuong.length > 1 || (thuongKhacHa.length > 0 && haKhacThuong.length > 0)) {
    // 3. Tỷ Dụng / Thiệp Hại Khóa
    const targetGroup = thuongKhacHa.length > 0 ? thuongKhacHa : haKhacThuong;
    const isDuongCan = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(dayCan);

    // Tìm thần cùng dương/âm với Can ngày
    const duongChiList = ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'];
    const matched = targetGroup.filter((k) => {
      const isDuongChi = duongChiList.includes(k.thuongThan);
      return isDuongCan ? isDuongChi : !isDuongChi;
    });

    if (matched.length === 1) {
      tongMonName = 'Tỷ Dụng Khóa (Trí Dung)';
      tongMonDescription = 'Có nhiều cặp khắc nhưng Thượng thần đồng khí Âm Dương với Can ngày. Chọn thần đồng loại để ứng phó sự việc.';
      soTruyen = matched[0].thuongThan;
    } else {
      tongMonName = 'Thiệp Hại Khóa (Kiến Cơ)';
      tongMonDescription = 'Các cặp khắc tương đồng, sự việc kinh qua nhiều chông gai thử thách, cần xem độ sâu cạn để giải quyết.';
      soTruyen = (matched.length > 0 ? matched[0] : targetGroup[0]).thuongThan;
    }
  } else {
    // Không có Thượng Hạ khắc -> Xét Dao Khắc hoặc Mão Tinh
    // Dao khắc: Can ngày khắc Thượng thần (Cảo Đạn) hoặc Thượng thần khắc Can ngày (Đạn Xạ)
    let daoKhacKhoa: LucNhamKhoa | undefined;
    for (const k of tuKhoa) {
      const sk = checkSinhKhac(canNguHanh, CHI_NGU_HANH[k.thuongThan]);
      if (sk.isKhac) {
        daoKhacKhoa = k;
        break;
      }
    }

    if (daoKhacKhoa) {
      tongMonName = 'Dao Khắc Khóa (Dao Vọng)';
      tongMonDescription = 'Tứ khoa không có khắc trực diện nhưng Can ngày và Thượng thần dao khắc lẫn nhau. Sự việc đến từ phương xa, bất ngờ.';
      soTruyen = daoKhacKhoa.thuongThan;
    } else {
      // Mão Tinh Khóa
      const isDuongCan = ['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm'].includes(dayCan);
      if (isDuongCan) {
        tongMonName = 'Mão Tinh Khóa (Cương Mão)';
        tongMonDescription = 'Tứ khoa hòa bình không khắc. Can Dương lấy Thượng thần của sao Dậu làm Sơ truyền.';
        soTruyen = thienBanMap['Dậu'];
      } else {
        tongMonName = 'Mão Tinh Khóa (Nhu Mão)';
        tongMonDescription = 'Tứ khoa hòa bình không khắc. Can Âm lấy Hạ thần đè dưới sao Mão làm Sơ truyền.';
        soTruyen = diaBanFromThienMap['Mão'];
      }
    }
  }

  // Trung Truyền = Thiên Bàn đè lên Sơ Truyền
  const trungTruyen = thienBanMap[soTruyen] || k2Thuong;
  // Mạt Truyền = Thiên Bàn đè lên Trung Truyền
  const matTruyen = thienBanMap[trungTruyen] || k3Thuong;

  const tamTruyen: LucNhamTruyen[] = [
    {
      level: 'Sơ Truyền',
      chi: soTruyen,
      thienTuong: thienTuongThienBan[soTruyen] || 'Quý Nhân',
      thienTuongInfo: THAP_NHI_THIEN_TUONG[thienTuongThienBan[soTruyen] || 'Quý Nhân'],
      nguHanh: CHI_NGU_HANH[soTruyen],
      lucThan: getLucThan(dayCan, soTruyen),
      meaning: 'Khởi đầu sự việc, nguyên nhân phát sinh, giai đoạn đầu',
      isTuanKhong: tuanKhong.includes(soTruyen),
    },
    {
      level: 'Trung Truyền',
      chi: trungTruyen,
      thienTuong: thienTuongThienBan[trungTruyen] || 'Quý Nhân',
      thienTuongInfo: THAP_NHI_THIEN_TUONG[thienTuongThienBan[trungTruyen] || 'Quý Nhân'],
      nguHanh: CHI_NGU_HANH[trungTruyen],
      lucThan: getLucThan(dayCan, trungTruyen),
      meaning: 'Quá trình diễn biến, giai đoạn phát triển trung gian, nhân tố xúc tác',
      isTuanKhong: tuanKhong.includes(trungTruyen),
    },
    {
      level: 'Mạt Truyền',
      chi: matTruyen,
      thienTuong: thienTuongThienBan[matTruyen] || 'Quý Nhân',
      thienTuongInfo: THAP_NHI_THIEN_TUONG[thienTuongThienBan[matTruyen] || 'Quý Nhân'],
      nguHanh: CHI_NGU_HANH[matTruyen],
      lucThan: getLucThan(dayCan, matTruyen),
      meaning: 'Kết quả cuối cùng, hậu vận, đích đến của sự việc',
      isTuanKhong: tuanKhong.includes(matTruyen),
    },
  ];

  // 6. Thần Sát
  const locThanMap: Record<string, string> = {
    'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tị', 'Đinh': 'Ngọ', 'Mậu': 'Tị',
    'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý',
  };
  const dichMaMap: Record<string, string> = {
    'Thân': 'Dần', 'Tý': 'Dần', 'Thìn': 'Dần',
    'Hợi': 'Tị', 'Mão': 'Tị', 'Mùi': 'Tị',
    'Dần': 'Thân', 'Ngọ': 'Thân', 'Tuất': 'Thân',
    'Tị': 'Hợi', 'Dậu': 'Hợi', 'Sửu': 'Hợi',
  };
  const duongNhanMap: Record<string, string> = {
    'Giáp': 'Mão', 'Ất': 'Thìn', 'Bính': 'Ngọ', 'Đinh': 'Mùi', 'Mậu': 'Ngọ',
    'Kỷ': 'Mùi', 'Canh': 'Dậu', 'Tân': 'Tuất', 'Nhâm': 'Tý', 'Quý': 'Sửu',
  };

  const locThan = locThanMap[dayCan] || 'Dần';
  const dichMa = dichMaMap[dayChi] || 'Thân';
  const duongNhan = duongNhanMap[dayCan] || 'Mão';

  // 6.5. Tính toán Thân Mệnh Người Hỏi (Bản Mệnh & Hành Niên theo Hiệp Kỷ Biện Phương Thư)
  const querent = calculateBanMenhHanhNien(
    querentInput,
    thienBanMap,
    thienTuongThienBan,
    tuanKhong,
    locThan,
    dichMa,
    quyNhanChi,
    soTruyen,
    trungTruyen,
    matTruyen
  );

  // 7. Lập danh sách 12 Cung Bàn
  const palaces: Record<string, LucNhamPalace> = {};
  const palacesList: LucNhamPalace[] = [];

  for (let i = 0; i < 12; i++) {
    const dChi = CHI[i];
    const tChi = thienBanMap[dChi];
    const tTuong = thienTuongThienBan[tChi] || 'Quý Nhân';
    const tuongInfo = THAP_NHI_THIEN_TUONG[tTuong] || THAP_NHI_THIEN_TUONG['Quý Nhân'];

    const nguHanhDia = CHI_NGU_HANH[dChi];
    const nguHanhThien = CHI_NGU_HANH[tChi];
    const sk = checkSinhKhac(nguHanhThien, nguHanhDia);

    const palaceItem: LucNhamPalace = {
      diaChi: dChi,
      thienChi: tChi,
      thienTuong: tTuong,
      thienTuongInfo: tuongInfo,
      isTuanKhong: tuanKhong.includes(dChi) || tuanKhong.includes(tChi),
      isLocThan: locThan === tChi,
      isDichMa: dichMa === tChi,
      isDuongNhan: duongNhan === tChi,
      isQuyNhan: quyNhanChi === tChi,
      isBanMenh: dChi === querent.banMenhChi,
      isHanhNien: dChi === querent.hanhNienChi,
      isCanKy: dChi === canKyCung,
      isChiNgay: dChi === dayChi,
      isSoTruyen: tChi === soTruyen,
      isTrungTruyen: tChi === trungTruyen,
      isMatTruyen: tChi === matTruyen,
      nguHanhDia,
      nguHanhThien,
      relation: sk.relation,
    };

    palaces[dChi] = palaceItem;
    palacesList.push(palaceItem);
  }

  // 8. Đánh giá Cát Hung & Điểm số (0..100 -> 1.0..5.0 sao)
  let score = 55;
  if (tuKhoa[0].thienTuong === 'Quý Nhân' || tuKhoa[0].thienTuong === 'Thanh Long') score += 15;
  if (tuKhoa[0].thienTuong === 'Bạch Hổ' || tuKhoa[0].thienTuong === 'Đằng Xà') score -= 14;
  if (tamTruyen[0].thienTuongInfo.nature === 'Cát') score += 10;
  if (tamTruyen[0].thienTuongInfo.nature === 'Hung') score -= 10;
  if (tamTruyen[2].thienTuongInfo.nature === 'Cát') score += 12;
  if (tamTruyen[0].isTuanKhong) score -= 15;
  if (tamTruyen[2].isTuanKhong) score -= 10;
  if (tongMonName.includes('Nguyên Thủ')) score += 8;
  if (isPhanNgam || isPhucNgam) score -= 8;

  // Ảnh hưởng từ Bản Mệnh & Hành Niên
  if (querent.banMenhKhacType === 'Được Sinh') score += 8;
  if (querent.banMenhKhacType === 'Bị Khắc') score -= 8;
  if (querent.hanhNienKhacType === 'Được Sinh') score += 6;
  if (querent.hanhNienKhacType === 'Bị Khắc') score -= 6;
  if (querent.banMenhIsTuanKhong) score -= 10;
  if (querent.hanhNienIsTuanKhong) score -= 8;
  if (querent.banMenhIsQuyNhan || querent.banMenhIsLocThan) score += 7;
  if (querent.hanhNienIsQuyNhan || querent.hanhNienIsLocThan) score += 5;

  score = Math.max(12, Math.min(96, score));

  let stars = 3.0;
  let level: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung' = 'Bình Hòa';
  if (score >= 80) {
    stars = Number((4.5 + ((score - 80) / 16) * 0.5).toFixed(1));
    level = 'Đại Cát';
  } else if (score >= 66) {
    stars = Number((3.8 + ((score - 66) / 14) * 0.6).toFixed(1));
    level = 'Tiểu Cát';
  } else if (score >= 48) {
    stars = Number((2.8 + ((score - 48) / 18) * 0.9).toFixed(1));
    level = 'Bình Hòa';
  } else if (score >= 34) {
    stars = Number((1.8 + ((score - 34) / 14) * 0.9).toFixed(1));
    level = 'Tiểu Hung';
  } else {
    stars = Number((1.0 + (score / 34) * 0.7).toFixed(1));
    level = 'Đại Hung';
  }

  // 9. Lời đoán chuyên đề kết hợp Bàn Quẻ & Thân Mệnh Người Hỏi
  const soTuong = tamTruyen[0].thienTuong;
  const matTuong = tamTruyen[2].thienTuong;

  const menhNote = `[Thân Mệnh: Tuổi ${querent.birthCanChi} (${querent.birthNapAm}), Hành Niên lâm ${querent.hanhNienChi} - ${querent.hanhNienVerdict}]`;

  const prognostications = {
    cauTai: ['Thanh Long', 'Lục Hợp', 'Thái Thường'].includes(soTuong) || ['Thanh Long', 'Lục Hợp'].includes(matTuong)
      ? `Đắc Cát thần phò trợ tài lộc, giao thương phát đạt, mưu cầu lợi ích tất thành, tiền của hanh thông. ${menhNote}`
      : ['Huyền Vũ', 'Thiên Không'].includes(soTuong)
      ? `Cẩn phòng mất trộm hoặc bị tiểu nhân lừa gạt tài sản, không nên cho vay mượn hay đầu tư mạo hiểm. ${menhNote}`
      : `Tài vận ở mức bình ổn, nên lấy chữ tín làm đầu, tích tiểu thành đại. ${menhNote}`,
    honNhan: ['Lục Hợp', 'Thiên Hậu', 'Thái Âm'].includes(soTuong) || ['Lục Hợp', 'Thiên Hậu'].includes(matTuong)
      ? `Duyên lành hội ngộ, gia đạo êm ấm, vợ chồng hòa thuận, mưu cầu hôn phối đại cát. ${menhNote}`
      : ['Đằng Xà', 'Chu Tước', 'Câu Trận'].includes(soTuong)
      ? `Gia đạo phát sinh bất hòa, nghi kỵ, có khẩu thiệt thị phi, cần nhẫn nại lắng nghe để giữ hòa khí. ${menhNote}`
      : `Tình cảm bình hòa, thuận theo tự nhiên sẽ an lành. ${menhNote}`,
    quanVan: ['Quý Nhân', 'Thanh Long', 'Thắng Quang'].includes(soTuong)
      ? `Được bề trên cất nhắc, quan lộc hanh thông, thi cử đỗ đạt, công danh thăng tiến vững vàng. ${menhNote}`
      : ['Câu Trận', 'Bạch Hổ'].includes(soTuong)
      ? `Công việc gặp trắc trở, cản trở từ thủ tục hoặc cấp trên khắt khe, cần thận trọng từng bước. ${menhNote}`
      : `Giữ vững vị trí hiện tại, trau dồi chuyên môn chờ đợi thời cơ chín muồi. ${menhNote}`,
    benhTat: ['Bạch Hổ', 'Đằng Xà'].includes(soTuong) || tamTruyen[0].lucThan.includes('Quan Quỷ')
      ? `Bệnh tật phát tác cấp tính hoặc do tâm lý lo âu thái quá, cần sớm thăm khám thầy thuốc chuyên khoa. ${menhNote}`
      : `Thân thể bình an, được cát tinh che chở, nếu có bệnh nhẹ cũng mau chóng thuyên giảm hồi phục. ${menhNote}`,
    kienTung: ['Chu Tước', 'Câu Trận'].includes(soTuong)
      ? `Tranh chấp kéo dài, khẩu thiệt kiện tụng bất lợi, nên tìm phương án hòa giải đôi bên cùng có lợi. ${menhNote}`
      : ['Quý Nhân', 'Thái Âm'].includes(soTuong)
      ? `Được người phân xử công minh, đắc lý sáng tỏ, giải tỏa được oan ức. ${menhNote}`
      : `Không nên sinh sự đôi co, tránh việc bé xé ra to. ${menhNote}`,
    xuatHanh: ['Dịch Mã', 'Thái Ất', 'Truyền Tống'].includes(soTuong) || tamTruyen[0].chi === dichMa
      ? `Dịch Mã động chiếu, xuất hành phương xa gặp nhiều may mắn, mở rộng giao lưu tài lộc. ${menhNote}`
      : ['Thiên Không', 'Bạch Hổ'].includes(soTuong)
      ? `Đường đi có trở ngại hoặc hao tài tốn của, nên hoãn chuyến đi hoặc chuẩn bị phương tiện chu đáo. ${menhNote}`
      : `Xuất hành bình an, thuận buồm xuôi gió. ${menhNote}`,
    giaDao: `Gia đạo nội trạch xét theo Cung Chi Ngày (${dayChi}) và Cung Hành Niên (${querent.hanhNienChi}): ${
      querent.hanhNienKhacType === 'Bị Khắc'
        ? 'Nội trạch có chút áp lực hoặc hao phí sửa sang, cần giữ hòa khí anh em gia đình.'
        : 'Nội trạch hưng vượng, người nhà hòa mục, đón niềm vui bất ngờ.'
    }`,
    thatVat: ['Huyền Vũ'].includes(soTuong)
      ? 'Đồ vật mất do người quen lấy hoặc đánh rơi nơi khuất lấp, tìm về hướng Bắc hoặc nơi ẩm thấp.'
      : ['Lục Hợp', 'Thái Âm'].includes(soTuong)
      ? 'Đồ vật còn trong nhà hoặc nơi kín đáo, bình tĩnh tìm kiếm sẽ thấy lại.'
      : 'Đồ vật thất lạc có thể tìm được nhờ người khác giúp sức chỉ dẫn.',
  };

  const verdict = `Quẻ đắc ${tongMonName} (${stars}/5.0 ⭐ - ${level}). Nguyệt Tướng ${nguyetTuong.name} (${nguyetTuong.chi}) lâm Giờ ${hourChi}. Sơ Truyền ${soTruyen} (${soTuong}) ➔ Mạt Truyền ${matTruyen} (${matTuong}). Bản Mệnh ${querent.banMenhChi} (${querent.banMenhThienTuong}), Hành Niên ${querent.hanhNienChi} (${querent.hanhNienThienTuong}). ${
    score >= 66 ? 'Trường khí hanh thông, trăm sự cát tường thuận lợi.' : score >= 48 ? 'Khí trường quân bình, nên giữ tĩnh làm chủ.' : 'Có nhiều điểm xung khắc trở ngại, cần thận trọng hành sự.'
  }`;

  // 10. Thuyết minh quy trình lập quẻ theo Hiệp Kỷ Biện Phương Thư
  const setupExplanation = {
    nguyetTuongRule: `Thái Dương triền cung tại hoàng đạo ${solarLon.toFixed(2)}° (khoảng Tiết khí ${nguyetTuong.season}), Nguyệt Tướng định vị là ${nguyetTuong.name} (Địa chi ${nguyetTuong.chi}).`,
    thienBanRule: `Đem Nguyệt Tướng ${nguyetTuong.chi} gia lâm lên Chi Giờ chiêm quẻ (${hourChi}) trên Địa bàn, an thuận hành 12 Thiên Chi tạo thành Thiên Bàn.`,
    quyNhanRule: `Thời khắc chiêm thuộc ${isDayTime ? 'Ban Ngày (Đán Quý)' : 'Ban Đêm (Dạ Quý)'}, Nhật Can là ${dayCan}. Quý Nhân khởi tại ${quyNhanChi}. Cung ${quyNhanDiaChi} trên Địa bàn thuộc ${isThuan ? 'Nửa Đông (Hợi đến Tị)' : 'Nửa Tây (Ngọ đến Tuất)'}, nên 12 Thiên Tướng an ${quyNhanDirection} hành.`,
    tuKhoaRule: `Khoa 1: Can Thượng (${k1Thuong}/${dayCan} ký ${canKyCung}); Khoa 2: Can Âm (${k2Thuong}/${k2Ha}); Khoa 3: Chi Thượng (${k3Thuong}/${dayChi}); Khoa 4: Chi Âm (${k4Thuong}/${k4Ha}).`,
    tamTruyenRule: `Xét tương tác khắc chế Tứ Khoa, quẻ phát động theo ${tongMonName}: Sơ Truyền ${soTruyen} (${soTuong}) ➔ Trung Truyền ${trungTruyen} ➔ Mạt Truyền ${matTruyen} (${matTuong}).`,
    menhNienRule: `Theo Hiệp Kỷ Biện Phương Thư: Người hỏi sinh năm ${querent.birthCanChi} (${querent.birthNapAm}), Bản Mệnh tại ${querent.banMenhChi}. ${querent.gender === 'Nam' ? 'Nam 1 tuổi khởi Dần thuận hành' : 'Nữ 1 tuổi khởi Thân nghịch hành'}, tuổi mụ ${querent.tuoiMu} nên Hành Niên đáo cung ${querent.hanhNienChi}.`,
  };

  return {
    ngayCanChi: dayCanChi,
    dayCanChi,
    dayCan,
    dayChi,
    gioCanChi: hourCanChi,
    hourChi,
    isDayTime,
    tuTru: {
      yearCanChi: querentInput?.yearCanChi || 'Bính Ngọ',
      monthCanChi: querentInput?.monthCanChi || 'Kỷ Mùi',
      dayCanChi,
      hourCanChi,
      tietKhi: nguyetTuong.season,
      solarLongitude: solarLon,
      solarLonDegree: `${solarLon.toFixed(2)}°`,
    },
    querent,
    nguyetTuongChi: nguyetTuong.chi,
    nguyetTuongName: nguyetTuong.name,
    nguyetTuongSeason: nguyetTuong.season,
    quyNhanChi,
    quyNhanDirection,
    quyNhanType: isDayTime ? 'Đán Quý (Ban Ngày)' : 'Dạ Quý (Ban Đêm)',
    palaces,
    palacesList,
    tuKhoa,
    tamTruyen,
    tongMonName,
    tongMonDescription,
    tuanKhong,
    tuanGiap,
    thanSat: {
      locThan,
      dichMa,
      duongNhan,
      thienDuc: 'Đinh',
      nguyetDuc: 'Bính',
      thaiTue: 'Bính Ngọ',
    },
    setupExplanation,
    score,
    stars,
    level,
    verdict,
    summary: `${tongMonName} • ${soTruyen} (${soTuong}) ➔ ${trungTruyen} ➔ ${matTruyen} (${matTuong}) • Thân Mệnh: ${querent.banMenhChi}/${querent.hanhNienChi}`,
    prognostications,
  };
}
