/**
 * ĐỘNG CƠ THẨM DUYỆT VƯỢNG NHƯỢC BÁT TỰ (SỨC MẠNH NHẬT CHỦ)
 * =========================================================
 * Chuẩn hóa theo phương pháp Tử Bình cổ điển:
 * I. 4 Yếu Tố Sinh Trợ (Lực lượng làm Thân vượng):
 *    1. Đắc Lệnh: Nhật can sinh vào tháng vượng (Trường Sinh, Mộc Dục, Quan Đới, Lâm Quan, Đế Vượng).
 *    2. Đắc Địa: Nhật can có gốc (căn) ở các địa chi khác (năm, ngày, giờ) là Trường Sinh, Lộc, Kình Dương (Nhận), Mộ khố.
 *    3. Được Sinh: Nhật can được Chính Ấn, Thiên Ấn của các can chi trong tứ trụ sinh cho.
 *    4. Được Trợ Giúp: Nhật can gặp các can chi khác trong tứ trụ cùng ngũ hành (Tỷ Kiên, Kiếp Tài).
 *
 * II. Các Điều Kiện Phân Đoán Thân Vượng / Thân Nhược:
 *    - Thân vượng (khi đắc lệnh): Đắc lệnh + có thêm ít nhất 1 yếu tố (đắc địa, được sinh, được trợ).
 *      + Nếu có thêm 2 yếu tố: Thiên vượng thiên cường.
 *      + Nếu đủ cả 3 yếu tố: Quá vượng (vượng tới cực).
 *    - Thân vượng (khi thất lệnh): Thất lệnh nhưng có từ 2 yếu tố trở lên có lực.
 *    - Lưu ý đặc biệt:
 *      + "Vượng mà hóa không vượng": Đắc lệnh nhưng không đắc địa, không sinh, không trợ, bị khắc-hao-tiết áp đảo.
 *      + "Nhược mà không phải nhược": Thất lệnh nhưng được đắc địa, nhiều sinh trợ có lực.
 *
 * III. 3 Lực Lượng Làm Thân Nhược (Khắc - Hao - Tiết):
 *    - Khắc: Quan Sát (Chính Quan, Thất Sát)
 *    - Hao: Tài Tinh (Chính Tài, Thiên Tài)
 *    - Tiết: Thực Thương (Thực Thần, Thương Quan)
 *
 * IV. Tổng Hòa So Sánh Tương Quan Thực Tế (Trọng số gần - xa):
 *    - Chi Tháng: 40%
 *    - Chi Ngày: 18%
 *    - Can Tháng: 12%
 *    - Can Giờ: 12%
 *    - Chi Giờ: 10%
 *    - Can Năm: 4%
 *    - Chi Năm: 4%
 */

export type NguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
export type AmDuong = 'Dương' | 'Âm';

export type ThapThan =
  | 'Tỷ Kiên'
  | 'Kiếp Tài'
  | 'Thực Thần'
  | 'Thương Quan'
  | 'Chính Tài'
  | 'Thiên Tài'
  | 'Chính Quan'
  | 'Thất Sát'
  | 'Chính Ấn'
  | 'Thiên Ấn';

export type TruongSinhTrangThai =
  | 'Trường Sinh'
  | 'Mộc Dục'
  | 'Quan Đới'
  | 'Lâm Quan'
  | 'Đế Vượng'
  | 'Suy'
  | 'Bệnh'
  | 'Tử'
  | 'Mộ'
  | 'Tuyệt'
  | 'Thai'
  | 'Dưỡng';

export type VuongNhuocLevel =
  | 'Quá Vượng (Cực Vượng)'
  | 'Thiên Vượng Thiên Cường'
  | 'Thân Vượng'
  | 'Vượng mà hóa Nhược'
  | 'Nhược mà hóa Vượng'
  | 'Bình Hòa'
  | 'Thân Nhược'
  | 'Thiên Nhược'
  | 'Quá Nhược (Cực Nhược)';

export interface TangCanItem {
  can: string;
  nguHanh: NguHanh;
  amDuong: AmDuong;
  role: 'Bản khí' | 'Trung khí' | 'Dư khí';
  percentage: number;
  thapThan: ThapThan;
}

export interface PillarEvaluation {
  name: 'Trụ Năm' | 'Trụ Tháng' | 'Trụ Ngày' | 'Trụ Giờ';
  can: string;
  chi: string;
  canNguHanh: NguHanh;
  canAmDuong: AmDuong;
  canThapThan: ThapThan | 'Nhật Chủ (Bản Thân)';
  truongSinhChi: TruongSinhTrangThai;
  tangCan: TangCanItem[];
  distanceWeight: number; // Điểm trọng số khoảng cách
  supportScore: number;   // Điểm đóng góp vào phe Sinh Trợ
  weakenScore: number;    // Điểm đóng góp vào phe Khắc Hao Tiết
}

export interface DacDiaItem {
  chi: string;
  pillar: string;
  type: 'Lộc (Lâm Quan)' | 'Kình Dương (Đế Vượng)' | 'Trường Sinh' | 'Mộ Khố' | 'Bản Khí / Gốc Vững';
  detail: string;
}

export interface BatTuVuongNhuocResult {
  nhatCan: string;
  nhatCanNguHanh: NguHanh;
  nhatCanAmDuong: AmDuong;
  
  // Tứ trụ can chi
  pillars: {
    year: PillarEvaluation;
    month: PillarEvaluation;
    day: PillarEvaluation;
    hour: PillarEvaluation;
  };

  // I. 4 Yếu Tố Sinh Trợ (Lực lượng làm thân vượng)
  yeuToSinhTro: {
    // 1. Đắc lệnh
    dacLenh: {
      isDacLenh: boolean;
      chiThang: string;
      cungTrangSinh: TruongSinhTrangThai;
      description: string;
    };
    // 2. Đắc địa
    dacDia: {
      isDacDia: boolean;
      cacGoc: DacDiaItem[];
      description: string;
    };
    // 3. Được sinh (Ấn Tinh)
    duocSinh: {
      isDuocSinh: boolean;
      danhSachAnTinh: { location: string; canOrTang: string; thapThan: ThapThan; nguHanh: NguHanh }[];
      description: string;
    };
    // 4. Được trợ giúp (Tỷ Kiếp)
    duocTro: {
      isDuocTro: boolean;
      danhSachTyKiep: { location: string; canOrTang: string; thapThan: ThapThan; nguHanh: NguHanh }[];
      description: string;
    };
  };

  // III. 3 Lực Lượng Làm Thân Nhược (Khắc - Hao - Tiết)
  lucLuongLamNhuoc: {
    khacQuanSat: {
      items: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[];
      score: number;
      description: string;
    };
    haoTaiTinh: {
      items: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[];
      score: number;
      description: string;
    };
    tietThucThuong: {
      items: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[];
      score: number;
      description: string;
    };
  };

  // IV. Tổng Hòa So Sánh Tương Quan Thực Tế
  tongHoa: {
    sinhTroScore: number;    // % lực sinh phù
    khacHaoTietScore: number;// % lực khắc hao tiết
    ratioDescription: string;
    level: VuongNhuocLevel;
    shortTagline: string;
    dungThan: string[];
    hyThan: string[];
    kyThan: string[];
    canhBaoDacBiet?: string; // Ví dụ: "Vượng mà hóa không vượng" hoặc "Nhược mà không phải nhược"
    luanGiaiChiTiet: string;
  };
}

// 1. NGŨ HÀNH & ÂM DƯƠNG CỦA 10 THIÊN CAN
export const CAN_ELEMENTS: Record<string, { nguHanh: NguHanh; amDuong: AmDuong }> = {
  Giáp: { nguHanh: 'Mộc', amDuong: 'Dương' },
  Ất: { nguHanh: 'Mộc', amDuong: 'Âm' },
  Bính: { nguHanh: 'Hỏa', amDuong: 'Dương' },
  Đinh: { nguHanh: 'Hỏa', amDuong: 'Âm' },
  Mậu: { nguHanh: 'Thổ', amDuong: 'Dương' },
  Kỷ: { nguHanh: 'Thổ', amDuong: 'Âm' },
  Canh: { nguHanh: 'Kim', amDuong: 'Dương' },
  Tân: { nguHanh: 'Kim', amDuong: 'Âm' },
  Nhâm: { nguHanh: 'Thủy', amDuong: 'Dương' },
  Quý: { nguHanh: 'Thủy', amDuong: 'Âm' },
};

// 2. TÀNG CAN TRONG 12 ĐỊA CHI
export const CHI_TANG_CAN: Record<
  string,
  { can: string; role: 'Bản khí' | 'Trung khí' | 'Dư khí'; percentage: number }[]
> = {
  Tý: [{ can: 'Quý', role: 'Bản khí', percentage: 100 }],
  Sửu: [
    { can: 'Kỷ', role: 'Bản khí', percentage: 60 },
    { can: 'Quý', role: 'Trung khí', percentage: 30 },
    { can: 'Tân', role: 'Dư khí', percentage: 10 },
  ],
  Dần: [
    { can: 'Giáp', role: 'Bản khí', percentage: 60 },
    { can: 'Bính', role: 'Trung khí', percentage: 30 },
    { can: 'Mậu', role: 'Dư khí', percentage: 10 },
  ],
  Mão: [{ can: 'Ất', role: 'Bản khí', percentage: 100 }],
  Thìn: [
    { can: 'Mậu', role: 'Bản khí', percentage: 60 },
    { can: 'Ất', role: 'Trung khí', percentage: 30 },
    { can: 'Quý', role: 'Dư khí', percentage: 10 },
  ],
  Tị: [
    { can: 'Bính', role: 'Bản khí', percentage: 60 },
    { can: 'Mậu', role: 'Trung khí', percentage: 30 },
    { can: 'Canh', role: 'Dư khí', percentage: 10 },
  ],
  Ngọ: [
    { can: 'Đinh', role: 'Bản khí', percentage: 70 },
    { can: 'Kỷ', role: 'Trung khí', percentage: 30 },
  ],
  Mùi: [
    { can: 'Kỷ', role: 'Bản khí', percentage: 60 },
    { can: 'Đinh', role: 'Trung khí', percentage: 30 },
    { can: 'Ất', role: 'Dư khí', percentage: 10 },
  ],
  Thân: [
    { can: 'Canh', role: 'Bản khí', percentage: 60 },
    { can: 'Nhâm', role: 'Trung khí', percentage: 30 },
    { can: 'Mậu', role: 'Dư khí', percentage: 10 },
  ],
  Dậu: [{ can: 'Tân', role: 'Bản khí', percentage: 100 }],
  Tuất: [
    { can: 'Mậu', role: 'Bản khí', percentage: 60 },
    { can: 'Tân', role: 'Trung khí', percentage: 30 },
    { can: 'Đinh', role: 'Dư khí', percentage: 10 },
  ],
  Hợi: [
    { can: 'Nhâm', role: 'Bản khí', percentage: 70 },
    { can: 'Giáp', role: 'Trung khí', percentage: 30 },
  ],
};

// 3. BẢNG 12 CUNG TRƯỜNG SINH CỦA 10 THIÊN CAN
export const TRUONG_SINH_TABLE: Record<string, Record<string, TruongSinhTrangThai>> = {
  Giáp: {
    Hợi: 'Trường Sinh',
    Tý: 'Mộc Dục',
    Sửu: 'Quan Đới',
    Dần: 'Lâm Quan',
    Mão: 'Đế Vượng',
    Thìn: 'Suy',
    Tị: 'Bệnh',
    Ngọ: 'Tử',
    Mùi: 'Mộ',
    Thân: 'Tuyệt',
    Dậu: 'Thai',
    Tuất: 'Dưỡng',
  },
  Ất: {
    Ngọ: 'Trường Sinh',
    Tị: 'Mộc Dục',
    Thìn: 'Quan Đới',
    Mão: 'Lâm Quan',
    Dần: 'Đế Vượng',
    Sửu: 'Suy',
    Tý: 'Bệnh',
    Hợi: 'Tử',
    Tuất: 'Mộ',
    Dậu: 'Tuyệt',
    Thân: 'Thai',
    Mùi: 'Dưỡng',
  },
  Bính: {
    Dần: 'Trường Sinh',
    Mão: 'Mộc Dục',
    Thìn: 'Quan Đới',
    Tị: 'Lâm Quan',
    Ngọ: 'Đế Vượng',
    Mùi: 'Suy',
    Thân: 'Bệnh',
    Dậu: 'Tử',
    Tuất: 'Mộ',
    Hợi: 'Tuyệt',
    Tý: 'Thai',
    Sửu: 'Dưỡng',
  },
  Đinh: {
    Dậu: 'Trường Sinh',
    Thân: 'Mộc Dục',
    Mùi: 'Quan Đới',
    Ngọ: 'Lâm Quan',
    Tị: 'Đế Vượng',
    Thìn: 'Suy',
    Mão: 'Bệnh',
    Dần: 'Tử',
    Sửu: 'Mộ',
    Tý: 'Tuyệt',
    Hợi: 'Thai',
    Tuất: 'Dưỡng',
  },
  Mậu: {
    Dần: 'Trường Sinh',
    Mão: 'Mộc Dục',
    Thìn: 'Quan Đới',
    Tị: 'Lâm Quan',
    Ngọ: 'Đế Vượng',
    Mùi: 'Suy',
    Thân: 'Bệnh',
    Dậu: 'Tử',
    Tuất: 'Mộ',
    Hợi: 'Tuyệt',
    Tý: 'Thai',
    Sửu: 'Dưỡng',
  },
  Kỷ: {
    Dậu: 'Trường Sinh',
    Thân: 'Mộc Dục',
    Mùi: 'Quan Đới',
    Ngọ: 'Lâm Quan',
    Tị: 'Đế Vượng',
    Thìn: 'Suy',
    Mão: 'Bệnh',
    Dần: 'Tử',
    Sửu: 'Mộ',
    Tý: 'Tuyệt',
    Hợi: 'Thai',
    Tuất: 'Dưỡng',
  },
  Canh: {
    Tị: 'Trường Sinh',
    Ngọ: 'Mộc Dục',
    Mùi: 'Quan Đới',
    Thân: 'Lâm Quan',
    Dậu: 'Đế Vượng',
    Tuất: 'Suy',
    Hợi: 'Bệnh',
    Tý: 'Tử',
    Sửu: 'Mộ',
    Dần: 'Tuyệt',
    Mão: 'Thai',
    Thìn: 'Dưỡng',
  },
  Tân: {
    Tý: 'Trường Sinh',
    Hợi: 'Mộc Dục',
    Tuất: 'Quan Đới',
    Dậu: 'Lâm Quan',
    Thân: 'Đế Vượng',
    Mùi: 'Suy',
    Ngọ: 'Bệnh',
    Tị: 'Tử',
    Thìn: 'Mộ',
    Mão: 'Tuyệt',
    Dần: 'Thai',
    Sửu: 'Dưỡng',
  },
  Nhâm: {
    Thân: 'Trường Sinh',
    Dậu: 'Mộc Dục',
    Tuất: 'Quan Đới',
    Hợi: 'Lâm Quan',
    Tý: 'Đế Vượng',
    Sửu: 'Suy',
    Dần: 'Bệnh',
    Mão: 'Tử',
    Thìn: 'Mộ',
    Tị: 'Tuyệt',
    Ngọ: 'Thai',
    Mùi: 'Dưỡng',
  },
  Quý: {
    Mão: 'Trường Sinh',
    Dần: 'Mộc Dục',
    Sửu: 'Quan Đới',
    Tý: 'Lâm Quan',
    Hợi: 'Đế Vượng',
    Tuất: 'Suy',
    Dậu: 'Bệnh',
    Thân: 'Tử',
    Mùi: 'Mộ',
    Ngọ: 'Tuyệt',
    Tị: 'Thai',
    Thìn: 'Dưỡng',
  },
};

// 4. BẢNG XÁC ĐỊNH LỘC, KÌNH DƯƠNG, MỘ KHỐ VÀ GỐC VỮNG CỦA 10 CAN
export const CAN_ROOTS: Record<
  string,
  {
    loc: string;
    kinhDuong: string;
    truongSinh: string;
    moKho: string;
    dongKhiChi: string[];
  }
> = {
  Giáp: {
    loc: 'Dần',
    kinhDuong: 'Mão',
    truongSinh: 'Hợi',
    moKho: 'Mùi',
    dongKhiChi: ['Dần', 'Mão', 'Hợi', 'Thìn', 'Mùi'],
  },
  Ất: {
    loc: 'Mão',
    kinhDuong: 'Dần',
    truongSinh: 'Ngọ',
    moKho: 'Mùi',
    dongKhiChi: ['Mão', 'Dần', 'Thìn', 'Hợi', 'Mùi'],
  },
  Bính: {
    loc: 'Tị',
    kinhDuong: 'Ngọ',
    truongSinh: 'Dần',
    moKho: 'Tuất',
    dongKhiChi: ['Tị', 'Ngọ', 'Dần', 'Tuất', 'Mùi'],
  },
  Đinh: {
    loc: 'Ngọ',
    kinhDuong: 'Tị',
    truongSinh: 'Dậu',
    moKho: 'Tuất',
    dongKhiChi: ['Ngọ', 'Tị', 'Tuất', 'Dần', 'Mùi'],
  },
  Mậu: {
    loc: 'Tị',
    kinhDuong: 'Ngọ',
    truongSinh: 'Dần',
    moKho: 'Tuất',
    dongKhiChi: ['Thìn', 'Tuất', 'Sửu', 'Mùi', 'Tị', 'Ngọ'],
  },
  Kỷ: {
    loc: 'Ngọ',
    kinhDuong: 'Tị',
    truongSinh: 'Dậu',
    moKho: 'Sửu',
    dongKhiChi: ['Sửu', 'Mùi', 'Thìn', 'Tuất', 'Ngọ', 'Tị'],
  },
  Canh: {
    loc: 'Thân',
    kinhDuong: 'Dậu',
    truongSinh: 'Tị',
    moKho: 'Sửu',
    dongKhiChi: ['Thân', 'Dậu', 'Tị', 'Sửu', 'Tuất'],
  },
  Tân: {
    loc: 'Dậu',
    kinhDuong: 'Thân',
    truongSinh: 'Tý',
    moKho: 'Sửu',
    dongKhiChi: ['Dậu', 'Thân', 'Sửu', 'Tuất', 'Tị'],
  },
  Nhâm: {
    loc: 'Hợi',
    kinhDuong: 'Tý',
    truongSinh: 'Thân',
    moKho: 'Thìn',
    dongKhiChi: ['Hợi', 'Tý', 'Thân', 'Thìn', 'Sửu'],
  },
  Quý: {
    loc: 'Tý',
    kinhDuong: 'Hợi',
    truongSinh: 'Mão',
    moKho: 'Thìn',
    dongKhiChi: ['Tý', 'Hợi', 'Thìn', 'Thân', 'Sửu'],
  },
};

// 5. TƯƠNG QUAN NGŨ HÀNH SINH KHẮC
const NGU_HANH_SINH: Record<NguHanh, NguHanh> = {
  Mộc: 'Hỏa',
  Hỏa: 'Thổ',
  Thổ: 'Kim',
  Kim: 'Thủy',
  Thủy: 'Mộc',
};

const NGU_HANH_KHAC: Record<NguHanh, NguHanh> = {
  Mộc: 'Thổ',
  Thổ: 'Thủy',
  Thủy: 'Hỏa',
  Hỏa: 'Kim',
  Kim: 'Mộc',
};

/**
 * Tính Thập Thần của canTarget so với canNhat
 */
export function getThapThan(canNhat: string, canTarget: string): ThapThan {
  const nhat = CAN_ELEMENTS[canNhat] || { nguHanh: 'Mộc', amDuong: 'Dương' };
  const target = CAN_ELEMENTS[canTarget] || { nguHanh: 'Mộc', amDuong: 'Dương' };

  const samePolarity = nhat.amDuong === target.amDuong;

  // Cùng hành -> Tỷ Kiên / Kiếp Tài
  if (nhat.nguHanh === target.nguHanh) {
    return samePolarity ? 'Tỷ Kiên' : 'Kiếp Tài';
  }

  // Nhật sinh Target -> Thực Thần / Thương Quan (Tiết)
  if (NGU_HANH_SINH[nhat.nguHanh] === target.nguHanh) {
    return samePolarity ? 'Thực Thần' : 'Thương Quan';
  }

  // Target sinh Nhật -> Chính Ấn / Thiên Ấn (Được sinh)
  if (NGU_HANH_SINH[target.nguHanh] === nhat.nguHanh) {
    return samePolarity ? 'Thiên Ấn' : 'Chính Ấn';
  }

  // Nhật khắc Target -> Chính Tài / Thiên Tài (Hao)
  if (NGU_HANH_KHAC[nhat.nguHanh] === target.nguHanh) {
    return samePolarity ? 'Thiên Tài' : 'Chính Tài';
  }

  // Target khắc Nhật -> Chính Quan / Thất Sát (Khắc)
  if (NGU_HANH_KHAC[target.nguHanh] === nhat.nguHanh) {
    return samePolarity ? 'Thất Sát' : 'Chính Quan';
  }

  return 'Tỷ Kiên';
}

/**
 * Phân loại Thập Thần theo Sinh Trợ vs Khắc-Hao-Tiết
 */
export function classifyThapThan(thapThan: ThapThan): {
  type: 'Sinh' | 'Trợ' | 'Khắc' | 'Hao' | 'Tiết';
  isSupport: boolean;
} {
  switch (thapThan) {
    case 'Chính Ấn':
    case 'Thiên Ấn':
      return { type: 'Sinh', isSupport: true };
    case 'Tỷ Kiên':
    case 'Kiếp Tài':
      return { type: 'Trợ', isSupport: true };
    case 'Chính Quan':
    case 'Thất Sát':
      return { type: 'Khắc', isSupport: false };
    case 'Chính Tài':
    case 'Thiên Tài':
      return { type: 'Hao', isSupport: false };
    case 'Thực Thần':
    case 'Thương Quan':
      return { type: 'Tiết', isSupport: false };
  }
}

/**
 * ĐỘNG CƠ CHÍNH: Thẩm duyệt Vượng Nhược Nhật Chủ của Lá Số Bát Tự
 */
export function evaluateBatTuVuongNhuoc(
  yearCanChi: string,
  monthCanChi: string,
  dayCanChi: string,
  hourCanChi: string
): BatTuVuongNhuocResult {
  const [canNam, chiNam] = yearCanChi.split(' ');
  const [canThang, chiThang] = monthCanChi.split(' ');
  const [canNgay, chiNgay] = dayCanChi.split(' ');
  const [canGio, chiGio] = hourCanChi.split(' ');

  const nhatCan = canNgay;
  const nhatCanInfo = CAN_ELEMENTS[nhatCan] || { nguHanh: 'Mộc', amDuong: 'Dương' };
  const rootInfo = CAN_ROOTS[nhatCan] || {
    loc: 'Dần',
    kinhDuong: 'Mão',
    truongSinh: 'Hợi',
    moKho: 'Mùi',
    dongKhiChi: ['Dần', 'Mão'],
  };

  // Trọng số vị trí (Tổng = 100)
  // Chi Tháng: 40 | Chi Ngày: 18 | Can Tháng: 12 | Can Giờ: 12 | Chi Giờ: 10 | Can Năm: 4 | Chi Năm: 4
  const WEIGHT_CHI_THANG = 40;
  const WEIGHT_CHI_NGAY = 18;
  const WEIGHT_CAN_THANG = 12;
  const WEIGHT_CAN_GIO = 12;
  const WEIGHT_CHI_GIO = 10;
  const WEIGHT_CAN_NAM = 4;
  const WEIGHT_CHI_NAM = 4;

  // 1. Phân tích từng trụ
  const evaluatePillar = (
    name: 'Trụ Năm' | 'Trụ Tháng' | 'Trụ Ngày' | 'Trụ Giờ',
    can: string,
    chi: string,
    canWeight: number,
    chiWeight: number,
    isNhatChu = false
  ): PillarEvaluation => {
    const canInfo = CAN_ELEMENTS[can] || { nguHanh: 'Mộc', amDuong: 'Dương' };
    const canThapThan = isNhatChu ? 'Nhật Chủ (Bản Thân)' : getThapThan(nhatCan, can);
    const truongSinhChi =
      TRUONG_SINH_TABLE[nhatCan]?.[chi] || ('Thai' as TruongSinhTrangThai);

    const rawTang = CHI_TANG_CAN[chi] || [];
    const tangCan: TangCanItem[] = rawTang.map((t) => {
      const el = CAN_ELEMENTS[t.can] || { nguHanh: 'Mộc', amDuong: 'Dương' };
      const tt = getThapThan(nhatCan, t.can);
      return {
        can: t.can,
        nguHanh: el.nguHanh,
        amDuong: el.amDuong,
        role: t.role,
        percentage: t.percentage,
        thapThan: tt,
      };
    });

    // Tính điểm Sinh Trợ vs Khắc Hao Tiết cho trụ này
    let support = 0;
    let weaken = 0;

    // A. Điểm Can
    if (!isNhatChu && canThapThan !== 'Nhật Chủ (Bản Thân)') {
      const cls = classifyThapThan(canThapThan);
      if (cls.isSupport) {
        support += canWeight;
      } else {
        weaken += canWeight;
      }
    }

    // B. Điểm Chi (dựa trên tàng can tỷ trọng)
    let chiSupportRatio = 0;
    for (const t of tangCan) {
      const cls = classifyThapThan(t.thapThan);
      if (cls.isSupport) {
        chiSupportRatio += t.percentage / 100;
      }
    }
    // Đồng thời nếu chi rơi vào Trường Sinh, Lộc, Kình Dương thì khí trợ rất mạnh
    const isMajorVigor = ['Trường Sinh', 'Lâm Quan', 'Đế Vượng'].includes(truongSinhChi);
    if (isMajorVigor && chiSupportRatio < 0.6) {
      chiSupportRatio = Math.max(chiSupportRatio, 0.7);
    }

    support += chiWeight * chiSupportRatio;
    weaken += chiWeight * (1 - chiSupportRatio);

    return {
      name,
      can,
      chi,
      canNguHanh: canInfo.nguHanh,
      canAmDuong: canInfo.amDuong,
      canThapThan,
      truongSinhChi,
      tangCan,
      distanceWeight: canWeight + chiWeight,
      supportScore: Math.round(support * 10) / 10,
      weakenScore: Math.round(weaken * 10) / 10,
    };
  };

  const pYear = evaluatePillar('Trụ Năm', canNam, chiNam, WEIGHT_CAN_NAM, WEIGHT_CHI_NAM);
  const pMonth = evaluatePillar('Trụ Tháng', canThang, chiThang, WEIGHT_CAN_THANG, WEIGHT_CHI_THANG);
  const pDay = evaluatePillar('Trụ Ngày', canNgay, chiNgay, 0, WEIGHT_CHI_NGAY, true);
  const pHour = evaluatePillar('Trụ Giờ', canGio, chiGio, WEIGHT_CAN_GIO, WEIGHT_CHI_GIO);

  // ========================================================
  // I. 4 YẾU TỐ SINH TRỢ (LỰC LƯỢNG LÀM THÂN VƯỢNG)
  // ========================================================

  // 1. ĐẮC LỆNH (Chi Tháng)
  const cungTrangSinhThang = TRUONG_SINH_TABLE[nhatCan]?.[chiThang] || 'Thai';
  const VIGOR_STAGES: TruongSinhTrangThai[] = [
    'Trường Sinh',
    'Mộc Dục',
    'Quan Đới',
    'Lâm Quan',
    'Đế Vượng',
  ];
  // Kiểm tra tháng sinh có cùng hành hoặc được sinh không
  const isDacLenh = VIGOR_STAGES.includes(cungTrangSinhThang);
  const dacLenhDesc = isDacLenh
    ? `Đắc Lệnh: Nhật can ${nhatCan} (${nhatCanInfo.nguHanh}) sinh vào tháng ${chiThang} tọa cung [${cungTrangSinhThang}], nắm giữ khí vượng tối thượng của nguyệt lệnh (quyết định ~40% lực lượng toàn cục).`
    : `Thất Lệnh: Nhật can ${nhatCan} (${nhatCanInfo.nguHanh}) sinh vào tháng ${chiThang} tọa cung [${cungTrangSinhThang}], không nắm được thiên thời của mùa vụ. Cần xem xét gốc rễ ở địa chi và sự sinh phù từ các trụ khác.`;

  // 2. ĐẮC ĐỊA (Căn ở các địa chi khác: Năm, Ngày, Giờ)
  const cacGoc: DacDiaItem[] = [];
  const otherChis = [
    { chi: chiNam, pillar: 'Trụ Năm' },
    { chi: chiNgay, pillar: 'Trụ Ngày' },
    { chi: chiGio, pillar: 'Trụ Giờ' },
  ];

  for (const item of otherChis) {
    if (item.chi === rootInfo.loc) {
      cacGoc.push({
        chi: item.chi,
        pillar: item.pillar,
        type: 'Lộc (Lâm Quan)',
        detail: `Chi ${item.chi} là Lộc vị của ${nhatCan}, gốc rễ vững chãi, tài lộc dồi dào.`,
      });
    } else if (item.chi === rootInfo.kinhDuong) {
      cacGoc.push({
        chi: item.chi,
        pillar: item.pillar,
        type: 'Kình Dương (Đế Vượng)',
        detail: `Chi ${item.chi} là Kình Dương của ${nhatCan}, khí dũng mãnh tột bực, ý chí kiên định.`,
      });
    } else if (item.chi === rootInfo.truongSinh) {
      cacGoc.push({
        chi: item.chi,
        pillar: item.pillar,
        type: 'Trường Sinh',
        detail: `Chi ${item.chi} là đất Trường Sinh của ${nhatCan}, sinh khí trường tồn, dẻo dai.`,
      });
    } else if (item.chi === rootInfo.moKho) {
      cacGoc.push({
        chi: item.chi,
        pillar: item.pillar,
        type: 'Mộ Khố',
        detail: `Chi ${item.chi} là Mộ khố của ${nhatCanInfo.nguHanh}, có kho tàng nâng đỡ âm thầm.`,
      });
    } else if (rootInfo.dongKhiChi.includes(item.chi)) {
      cacGoc.push({
        chi: item.chi,
        pillar: item.pillar,
        type: 'Bản Khí / Gốc Vững',
        detail: `Chi ${item.chi} chứa tàng can tương trợ cho bản mệnh ${nhatCan}.`,
      });
    }
  }

  const isDacDia = cacGoc.length > 0;
  const dacDiaDesc = isDacDia
    ? `Đắc Địa: Nhật can thông căn vững chắc tại ${cacGoc.length} địa chi (${cacGoc.map((g) => `${g.pillar} [${g.chi} - ${g.type}]`).join(', ')}). Nhật chủ có rễ cắm sâu, bản lĩnh tự chủ cao.`
    : `Không Đắc Địa: Nhật can không có gốc Lộc, Nhận, Trường Sinh hay Mộ khố tại các chi Năm, Ngày, Giờ (gọi là Can không rễ hoặc phù phiếm). Rất cần sự sinh trợ từ Ấn Tinh.`;

  // 3. ĐƯỢC SINH (Ấn Tinh: Chính Ấn, Thiên Ấn)
  const danhSachAnTinh: { location: string; canOrTang: string; thapThan: ThapThan; nguHanh: NguHanh }[] = [];
  const allCanAndTang = [
    { loc: 'Can Năm', can: canNam },
    { loc: 'Can Tháng', can: canThang },
    { loc: 'Can Giờ', can: canGio },
    ...pYear.tangCan.map((t) => ({ loc: `Tàng chi Năm (${chiNam})`, can: t.can })),
    ...pMonth.tangCan.map((t) => ({ loc: `Tàng chi Tháng (${chiThang})`, can: t.can })),
    ...pDay.tangCan.map((t) => ({ loc: `Tàng chi Ngày (${chiNgay})`, can: t.can })),
    ...pHour.tangCan.map((t) => ({ loc: `Tàng chi Giờ (${chiGio})`, can: t.can })),
  ];

  for (const item of allCanAndTang) {
    const tt = getThapThan(nhatCan, item.can);
    const el = CAN_ELEMENTS[item.can] || { nguHanh: 'Mộc', amDuong: 'Dương' };
    if (tt === 'Chính Ấn' || tt === 'Thiên Ấn') {
      danhSachAnTinh.push({
        location: item.loc,
        canOrTang: item.can,
        thapThan: tt,
        nguHanh: el.nguHanh,
      });
    }
  }

  const isDuocSinh = danhSachAnTinh.length > 0;
  const duocSinhDesc = isDuocSinh
    ? `Được Sinh: Được ${danhSachAnTinh.length} nguồn Ấn Tinh (${danhSachAnTinh.map((a) => `${a.location} [${a.thapThan} - ${a.canOrTang}]`).join(', ')}) sinh dưỡng, nhận được che chở của trưởng bối, học vấn và quý nhân.`
    : `Không Được Sinh: Toàn cục thiếu vắng hoặc không có Ấn Tinh sinh cho Nhật can. Phải tự lực cánh sinh, ít trông chờ vào sự bao bọc bên ngoài.`;

  // 4. ĐƯỢC TRỢ GIÚP (Tỷ Kiên, Kiếp Tài)
  const danhSachTyKiep: { location: string; canOrTang: string; thapThan: ThapThan; nguHanh: NguHanh }[] = [];
  for (const item of allCanAndTang) {
    const tt = getThapThan(nhatCan, item.can);
    const el = CAN_ELEMENTS[item.can] || { nguHanh: 'Mộc', amDuong: 'Dương' };
    if (tt === 'Tỷ Kiên' || tt === 'Kiếp Tài') {
      danhSachTyKiep.push({
        location: item.loc,
        canOrTang: item.can,
        thapThan: tt,
        nguHanh: el.nguHanh,
      });
    }
  }

  const isDuocTro = danhSachTyKiep.length > 0;
  const duocTroDesc = isDuocTro
    ? `Được Trợ Giúp: Gặp ${danhSachTyKiep.length} vị trí Tỷ Kiên / Kiếp Tài (${danhSachTyKiep.map((t) => `${t.location} [${t.thapThan} - ${t.canOrTang}]`).join(', ')}) đồng loại trợ lực, có anh em bạn bè chí cốt kề vai sát cánh.`
    : `Không Được Trợ: Thiếu vắng Tỷ Kiếp cùng ngũ hành trên thiên can địa chi, mang tính chất độc lập tác chiến.`;

  // ========================================================
  // III. 3 LỰC LƯỢNG LÀM THÂN NHƯỢC (KHẮC - HAO - TIẾT)
  // ========================================================
  const itemsQuanSat: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[] = [];
  const itemsTaiTinh: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[] = [];
  const itemsThucThuong: { location: string; name: string; thapThan: ThapThan; nguHanh: NguHanh }[] = [];

  for (const item of allCanAndTang) {
    const tt = getThapThan(nhatCan, item.can);
    const el = CAN_ELEMENTS[item.can] || { nguHanh: 'Mộc', amDuong: 'Dương' };
    if (tt === 'Chính Quan' || tt === 'Thất Sát') {
      itemsQuanSat.push({ location: item.loc, name: item.can, thapThan: tt, nguHanh: el.nguHanh });
    } else if (tt === 'Chính Tài' || tt === 'Thiên Tài') {
      itemsTaiTinh.push({ location: item.loc, name: item.can, thapThan: tt, nguHanh: el.nguHanh });
    } else if (tt === 'Thực Thần' || tt === 'Thương Quan') {
      itemsThucThuong.push({ location: item.loc, name: item.can, thapThan: tt, nguHanh: el.nguHanh });
    }
  }

  // ========================================================
  // IV. TỔNG HÒA SO SÁNH TƯƠNG QUAN & PHÂN LOẠI THÂN VƯỢNG/NHƯỢC
  // ========================================================
  const totalSupport = Math.round((pYear.supportScore + pMonth.supportScore + pDay.supportScore + pHour.supportScore) * 10) / 10;
  const totalWeaken = Math.round((100 - totalSupport) * 10) / 10;

  const countExtraSupport = (isDacDia ? 1 : 0) + (isDuocSinh ? 1 : 0) + (isDuocTro ? 1 : 0);

  let level: VuongNhuocLevel = 'Bình Hòa';
  let shortTagline = '';
  let canhBaoDacBiet: string | undefined;
  let dungThan: string[] = [];
  let hyThan: string[] = [];
  let kyThan: string[] = [];
  let luanGiai = '';

  // Quy tắc phân đoán theo đúng yêu cầu chi tiết của người dùng:
  if (isDacLenh) {
    // NHẬT CAN ĐẮC LỆNH
    if (countExtraSupport === 0 && totalWeaken >= 55) {
      // Ngoại lệ: "Vượng mà lại không vượng"
      level = 'Vượng mà hóa Nhược';
      shortTagline = 'Đắc lệnh chi tháng nhưng thiếu gốc rễ, bị khắc hao tiết áp đảo';
      canhBaoDacBiet =
        'Vượng mà hóa không vượng: Nhật can dù đắc lệnh chi tháng nhưng hoàn toàn không đắc địa, không được sinh, không được trợ giúp, đồng thời bị lực lượng Khắc - Hao - Tiết vây hãm quá lớn dẫn đến "ngoại vượng nội hư".';
      dungThan = ['Chính Ấn', 'Thiên Ấn'];
      hyThan = ['Tỷ Kiên', 'Kiếp Tài'];
      kyThan = ['Quan Sát (Khắc)', 'Tài Tinh (Hao)', 'Thực Thương (Tiết)'];
    } else if (countExtraSupport === 3 && totalSupport >= 75) {
      // Đủ cả 3 yếu tố hỗ trợ -> Quá vượng (vượng tới cực)
      level = 'Quá Vượng (Cực Vượng)';
      shortTagline = 'Đắc lệnh + Đắc địa + Được sinh + Được trợ (Khí thế hùng hậu tột bực)';
      dungThan = ['Thực Thần', 'Thương Quan (Tiết tú xả khí)'];
      hyThan = ['Tài Tinh (Khai thông tài lộ)'];
      kyThan = ['Chính Ấn', 'Thiên Ấn', 'Tỷ Kiếp (Kỵ thêm sinh trợ vì thái quá sinh suy)'];
    } else if (countExtraSupport >= 2 && totalSupport >= 60) {
      // Đắc lệnh + 2 yếu tố hỗ trợ -> Thiên vượng thiên cường
      level = 'Thiên Vượng Thiên Cường';
      shortTagline = 'Đắc lệnh hội tụ 2 đại lực sinh trợ, nguyên khí sung túc vững chãi';
      dungThan = ['Chính Quan / Thất Sát (Ước thúc kỷ luật)', 'Tài Tinh'];
      hyThan = ['Thực Thần', 'Thương Quan'];
      kyThan = ['Chính Ấn', 'Thiên Ấn', 'Tỷ Kiên', 'Kiếp Tài'];
    } else {
      // Thân vượng thông thường
      level = 'Thân Vượng';
      shortTagline = 'Đắc lệnh có sinh trợ, lực sinh phù áp đảo lực khắc hao tiết';
      dungThan = ['Thực Thương (Phát huy sở trường)', 'Tài Tinh (Cầu tài định sự)'];
      hyThan = ['Chính Quan (Thăng tiến quan lộc)'];
      kyThan = ['Ấn Tinh', 'Tỷ Kiếp'];
    }
  } else {
    // NHẬT CAN THẤT LỆNH
    if (countExtraSupport >= 2 && totalSupport >= 52) {
      // Ngoại lệ: "Nhược mà không phải nhược" -> Thân vượng khi thất lệnh
      level = 'Nhược mà hóa Vượng';
      shortTagline = 'Thất lệnh mùa sinh nhưng đắc địa vững chắc và được nhiều sinh trợ';
      canhBaoDacBiet =
        'Nhược mà không phải nhược: Nhật can tuy thất lệnh (sinh vào tháng suy), nhưng nhờ đắc địa (có Lộc, Kình Dương, Trường Sinh, Mộ khố) và nhận nhiều sinh trợ có ích từ Ấn Tinh, Tỷ Kiếp nên chuyển thành Thân Vượng vững vàng.';
      dungThan = ['Tài Tinh', 'Thực Thương'];
      hyThan = ['Chính Quan'];
      kyThan = ['Ấn Tinh quá vượng', 'Tỷ Kiếp'];
    } else if (totalSupport < 25 && totalWeaken >= 75) {
      level = 'Quá Nhược (Cực Nhược)';
      shortTagline = 'Hoàn toàn không rễ, không sinh, không trợ (Khí thế tòng cách)';
      canhBaoDacBiet =
        'Tòng Thế Cách: Nhật chủ quá nhược không thể tự lập, nên thuận theo thế độc vượng của ngũ hành áp đảo (Tòng Tài, Tòng Sát hoặc Tòng Nhi) để đạt đại phú đại quý.';
      dungThan = ['Theo khí cục vượng nhất (Tài hoặc Sát hoặc Thương)'];
      hyThan = ['Ngũ hành sinh trợ cho khí cục đó'];
      kyThan = ['Ấn Tinh', 'Tỷ Kiếp (Kỵ phản kích)'];
    } else if (totalSupport < 42) {
      level = 'Thiên Nhược';
      shortTagline = 'Thất lệnh, ít gốc rễ, bị Quan Sát / Tài / Thực Thương áp đảo';
      dungThan = ['Chính Ấn', 'Thiên Ấn (Sinh thân trợ lực)'];
      hyThan = ['Tỷ Kiên', 'Kiếp Tài (Hợp lực chia sẻ gánh nặng)'];
      kyThan = ['Chính Quan', 'Thất Sát', 'Chính Tài', 'Thiên Tài'];
    } else if (totalSupport >= 45 && totalSupport <= 52) {
      level = 'Bình Hòa';
      shortTagline = 'Thế trận cân bằng giữa lực Sinh Phù và Khắc Hao Tiết (Trung Dung)';
      dungThan = ['Tùy đại vận lưu niên để chọn dụng thần điều hòa'];
      hyThan = ['Ngũ hành thiếu hụt trong mệnh cục'];
      kyThan = ['Các ngũ hành tạo xung phá mãnh liệt'];
    } else {
      level = 'Thân Nhược';
      shortTagline = 'Thất lệnh, lực khắc hao tiết chiếm ưu thế hơn lực sinh trợ';
      dungThan = ['Chính Ấn', 'Thiên Ấn (Dưỡng mệnh)'];
      hyThan = ['Tỷ Kiên (Trợ thân)'];
      kyThan = ['Quan Sát (Khắc thân)', 'Tài Tinh (Hao khí)'];
    }
  }

  // Soạn lời luận giải chi tiết theo các đề mục người dùng yêu cầu
  luanGiai = `Nhật Chủ là [${nhatCan} - ${nhatCanInfo.nguHanh} ${nhatCanInfo.amDuong}]. 
Tổng hòa mệnh cục: Lực Sinh Phù chiếm ${totalSupport}% so với Lực Khắc-Hao-Tiết chiếm ${totalWeaken}%.
- Về Thời Lệnh: ${dacLenhDesc}
- Về Địa Thế: ${dacDiaDesc}
- Về Ấn Tinh: ${duocSinhDesc}
- Về Tỷ Kiếp: ${duocTroDesc}
- Về Khắc-Hao-Tiết: Bị ${itemsQuanSat.length} Quan Sát khắc chế, ${itemsTaiTinh.length} Tài Tinh làm tiêu hao và ${itemsThucThuong.length} Thực Thương tiết khí.
=> Kết luận phân định: [${level}]. ${shortTagline}.${canhBaoDacBiet ? `\nLƯU Ý: ${canhBaoDacBiet}` : ''}`;

  return {
    nhatCan,
    nhatCanNguHanh: nhatCanInfo.nguHanh,
    nhatCanAmDuong: nhatCanInfo.amDuong,
    pillars: {
      year: pYear,
      month: pMonth,
      day: pDay,
      hour: pHour,
    },
    yeuToSinhTro: {
      dacLenh: {
        isDacLenh,
        chiThang,
        cungTrangSinh: cungTrangSinhThang,
        description: dacLenhDesc,
      },
      dacDia: {
        isDacDia,
        cacGoc,
        description: dacDiaDesc,
      },
      duocSinh: {
        isDuocSinh,
        danhSachAnTinh,
        description: duocSinhDesc,
      },
      duocTro: {
        isDuocTro,
        danhSachTyKiep,
        description: duocTroDesc,
      },
    },
    lucLuongLamNhuoc: {
      khacQuanSat: {
        items: itemsQuanSat,
        score: Math.round(itemsQuanSat.length * 10),
        description: `Có ${itemsQuanSat.length} Quan Sát khắc chế Nhật can (gây áp lực, ước thúc kỷ cương).`,
      },
      haoTaiTinh: {
        items: itemsTaiTinh,
        score: Math.round(itemsTaiTinh.length * 10),
        description: `Có ${itemsTaiTinh.length} Tài Tinh làm hao tổn sức lực (quản lý tiền của, sự vụ).`,
      },
      tietThucThuong: {
        items: itemsThucThuong,
        score: Math.round(itemsThucThuong.length * 10),
        description: `Có ${itemsThucThuong.length} Thực Thương tiết khí (phát tiết hoa văn, tài hoa trí tuệ).`,
      },
    },
    tongHoa: {
      sinhTroScore: totalSupport,
      khacHaoTietScore: totalWeaken,
      ratioDescription: `Sinh Phù ${totalSupport}% - Khắc Hao Tiết ${totalWeaken}%`,
      level,
      shortTagline,
      dungThan,
      hyThan,
      kyThan,
      canhBaoDacBiet,
      luanGiaiChiTiet: luanGiai,
    },
  };
}
