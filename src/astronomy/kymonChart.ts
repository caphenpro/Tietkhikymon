import { CAN, CHI } from './canChi';
import {
  STEM_COMBINATIONS,
  DOOR_PALACE_MATRIX,
  STAR_PROFILES,
  GOD_PROFILES,
  StemComboDetail,
  DoorPalaceDetail,
  GodDetail,
} from './kymonFormations';

// Danh sách Lục Nghi & Tam Kỳ chuẩn theo thứ tự vận hành

// Mậu -> Kỷ -> Canh -> Tân -> Nhâm -> Quý -> Đinh -> Bính -> Ất
export const KY_NGHI_SEQUENCE = ['Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý', 'Đinh', 'Bính', 'Ất'];

// Vòng 8 cung chu vi Lạc thư theo chiều kim đồng hồ (bỏ qua trung cung 5)
// Khảm 1 -> Cấn 8 -> Chấn 3 -> Tốn 4 -> Ly 9 -> Khôn 2 -> Đoài 7 -> Càn 6
export const PALACE_RING_CW = [1, 8, 3, 4, 9, 2, 7, 6];

// Vòng 9 sao gốc
export const STAR_ORIGINAL_PALACE: Record<number, string> = {
  1: 'Thiên Bồng',
  2: 'Thiên Nhuế',
  3: 'Thiên Xung',
  4: 'Thiên Phụ',
  5: 'Thiên Cầm',
  6: 'Thiên Tâm',
  7: 'Thiên Trụ',
  8: 'Thiên Nhậm',
  9: 'Thiên Anh',
};

// Vòng 8 cửa gốc
export const DOOR_ORIGINAL_PALACE: Record<number, string> = {
  1: 'Hưu Môn',
  8: 'Sinh Môn',
  3: 'Thương Môn',
  4: 'Đỗ Môn',
  9: 'Cảnh Môn',
  2: 'Tử Môn',
  7: 'Kinh Môn',
  6: 'Khai Môn',
};

// Thứ tự 8 cửa xoay vòng: Hưu -> Sinh -> Thương -> Đỗ -> Cảnh -> Tử -> Kinh -> Khai
export const DOORS_SEQUENCE = [
  'Hưu Môn',
  'Sinh Môn',
  'Thương Môn',
  'Đỗ Môn',
  'Cảnh Môn',
  'Tử Môn',
  'Kinh Môn',
  'Khai Môn',
];

// Thứ tự 8 Thần
export const EIGHT_GODS = [
  'Trực Phù',
  'Đằng Xà',
  'Thái Âm',
  'Lục Hợp',
  'Bạch Hổ',
  'Huyền Vũ',
  'Cửu Địa',
  'Cửu Thiên',
];

export interface PalaceData {
  palaceNum: number; // 1..9
  palaceName: string; // Khảm, Khôn, Chấn, Tốn, Trung Cung, Càn, Đoài, Cấn, Ly
  guaName: string; // ☵ Khảm, ☷ Khôn...
  direction: string; // Bắc, Tây Nam...
  element: string; // Thủy, Thổ, Mộc, Hỏa, Kim
  earthStem: string; // Can Địa Bàn
  earthStem2?: string; // Can phụ (như Trung Cung gửi Khôn)
  heavenStar: string; // Sao Thiên Bàn
  heavenStem: string; // Can Thiên Bàn
  heavenStem2?: string; // Can Thiên Cầm ký gửi nếu có
  door: string; // Cửa Nhân Bàn
  god: string; // Thần Bàn
  isTuanKhong: boolean; // Tuần Không
  isDichMa: boolean; // Dịch Mã
  isLocVi: boolean; // Lộc vị
  isDuongQuy: boolean; // Dương Quý Nhân
  isAmQuy: boolean; // Âm Quý Nhân
  formations: string[]; // Các cách cục cát hung tại cung
  battleSign?: string; // Khắc ứng việc quân / việc đời
  summary: string;
  stemComboDetail?: StemComboDetail;
  doorPalaceDetail?: DoorPalaceDetail;
  starProfile?: { element: string; nature: string; baseSign: string };
  godProfile?: GodDetail;
  kichHinh?: string;
  nhapMo?: string;
  thangDien?: string;
  baThang?: string;
  batKhaKich?: string;
}

export interface CompleteKyMonChart {
  isDuongDon: boolean;
  cucNumber: number;
  cucName: string;
  dayCanChi: string;
  hourCanChi: string;
  tuanThuCan: string; // Mậu, Kỷ, Canh...
  tuanThuGiap: string; // Giáp Tý, Giáp Tuất...
  trucPhuStar: string; // Sao Trực Phù
  trucPhuPalace: number; // Cung gốc Trực Phù
  trucPhuNewPalace: number; // Cung mới của Trực Phù trên Thiên Bàn
  trucSuDoor: string; // Cửa Trực Sử
  trucSuPalace: number; // Cung gốc Trực Sử
  trucSuNewPalace: number; // Cung mới của Trực Sử trên Nhân Bàn
  tuanKhongChi: string[]; // 2 chi tuần không
  dichMaChi: string; // Chi Dịch mã
  palaces: Record<number, PalaceData>;
  specialFormations: string[]; // Toàn cục cách cục
}

/**
 * Tìm Tuần thủ của một Trụ Can Chi (vd: Bính Dần -> Tuần Giáp Tý / Mậu)
 */
export function getTuanThu(can: string, chi: string): { giap: string; stem: string; tuanKhong: string[] } {
  const canIdx = CAN.indexOf(can);
  const chiIdx = CHI.indexOf(chi);
  if (canIdx === -1 || chiIdx === -1) {
    return { giap: 'Giáp Tý', stem: 'Mậu', tuanKhong: ['Tuất', 'Hợi'] };
  }

  // Khoảng cách từ Can hiện tại về Giáp (index 0)
  let diff = (chiIdx - canIdx) % 12;
  if (diff < 0) diff += 12;

  // diff chính là Chi của Giáp trong tuần đó
  // 0: Tý (Giáp Tý), 10: Tuất (Giáp Tuất), 8: Thân (Giáp Thân), 6: Ngọ (Giáp Ngọ), 4: Thìn (Giáp Thìn), 2: Dần (Giáp Dần)
  if (diff === 0) {
    return { giap: 'Giáp Tý', stem: 'Mậu', tuanKhong: ['Tuất', 'Hợi'] };
  } else if (diff === 10) {
    return { giap: 'Giáp Tuất', stem: 'Kỷ', tuanKhong: ['Thân', 'Dậu'] };
  } else if (diff === 8) {
    return { giap: 'Giáp Thân', stem: 'Canh', tuanKhong: ['Ngọ', 'Mùi'] };
  } else if (diff === 6) {
    return { giap: 'Giáp Ngọ', stem: 'Tân', tuanKhong: ['Thìn', 'Tị'] };
  } else if (diff === 4) {
    return { giap: 'Giáp Thìn', stem: 'Nhâm', tuanKhong: ['Dần', 'Mão'] };
  } else {
    return { giap: 'Giáp Dần', stem: 'Quý', tuanKhong: ['Tý', 'Sửu'] };
  }
}

/**
 * Tìm Dịch Mã theo Chi (Dần Ngọ Tuất mã Thân, Thân Tý Thìn mã Dần, Tị Dậu Sửu mã Hợi, Hợi Mão Mùi mã Tị)
 */
export function getDichMa(chi: string): string {
  if (['Dần', 'Ngọ', 'Tuất'].includes(chi)) return 'Thân';
  if (['Thân', 'Tý', 'Thìn'].includes(chi)) return 'Dần';
  if (['Tị', 'Dậu', 'Sửu'].includes(chi)) return 'Hợi';
  if (['Hợi', 'Mão', 'Mùi'].includes(chi)) return 'Tị';
  return 'Thân';
}

/**
 * Tìm Lộc vị theo Can Ngày
 */
export function getLocVi(can: string): string {
  const map: Record<string, string> = {
    Giáp: 'Dần',
    Ất: 'Mão',
    Bính: 'Tị',
    Mậu: 'Tị',
    Đinh: 'Ngọ',
    Kỷ: 'Ngọ',
    Canh: 'Thân',
    Tân: 'Dậu',
    Nhâm: 'Hợi',
    Quý: 'Tý',
  };
  return map[can] || 'Dần';
}

/**
 * Tìm Quý Nhân theo Can Ngày
 */
export function getQuyNhan(can: string): { duong: string; am: string } {
  // Giáp Mậu Canh: Sửu/Mùi; Ất Kỷ: Tý/Thân; Bính Đinh: Hợi/Dậu; Nhâm Quý: Tị/Mão; Tân: Dần/Ngọ
  const map: Record<string, { duong: string; am: string }> = {
    Giáp: { duong: 'Sửu', am: 'Mùi' },
    Mậu: { duong: 'Sửu', am: 'Mùi' },
    Canh: { duong: 'Sửu', am: 'Mùi' },
    Ất: { duong: 'Thân', am: 'Tý' },
    Kỷ: { duong: 'Tý', am: 'Thân' },
    Bính: { duong: 'Hợi', am: 'Dậu' },
    Đinh: { duong: 'Dậu', am: 'Hợi' },
    Nhâm: { duong: 'Tị', am: 'Mão' },
    Quý: { duong: 'Mão', am: 'Tị' },
    Tân: { duong: 'Dần', am: 'Ngọ' },
  };
  return map[can] || { duong: 'Sửu', am: 'Mùi' };
}

// Cung Lạc Thư tương ứng với Địa Chi
export const CHI_TO_PALACE: Record<string, number> = {
  Tý: 1,
  Sửu: 8,
  Dần: 8,
  Mão: 3,
  Thìn: 4,
  Tị: 4,
  Ngọ: 9,
  Mùi: 2,
  Thân: 2,
  Dậu: 7,
  Tuất: 6,
  Hợi: 6,
};

export const PALACE_INFO: Record<number, { name: string; gua: string; dir: string; element: string }> = {
  1: { name: 'Khảm', gua: '☵', dir: 'Chính Bắc', element: 'Thủy' },
  2: { name: 'Khôn', gua: '☷', dir: 'Tây Nam', element: 'Thổ' },
  3: { name: 'Chấn', gua: '☳', dir: 'Chính Đông', element: 'Mộc' },
  4: { name: 'Tốn', gua: '☴', dir: 'Đông Nam', element: 'Mộc' },
  5: { name: 'Trung Cung', gua: '☯', dir: 'Trung Ương', element: 'Thổ' },
  6: { name: 'Càn', gua: '☰', dir: 'Tây Bắc', element: 'Kim' },
  7: { name: 'Đoài', gua: '☱', dir: 'Chính Tây', element: 'Kim' },
  8: { name: 'Cấn', gua: '☶', dir: 'Đông Bắc', element: 'Thổ' },
  9: { name: 'Ly', gua: '☲', dir: 'Chính Nam', element: 'Hỏa' },
};

/**
 * THUẬT TOÁN 6 BƯỚC LẬP BÀN KỲ MÔN ĐỘN GIÁP HOÀN CHỈNH
 */
export function buildCompleteKyMonChart(
  isDuongDon: boolean,
  cucNumber: number,
  dayCan: string,
  dayChi: string,
  hourCan: string,
  hourChi: string
): CompleteKyMonChart {
  // -------------------------------------------------------------
  // BƯỚC 1: AN ĐỊA BÀN KỲ NGHI
  // -------------------------------------------------------------
  const earthPalaceStems: Record<number, string> = {};

  if (isDuongDon) {
    // Dương độn: Khởi Mậu tại Cung = cucNumber, bay thuận cửu cung (1->2->3->4->5->6->7->8->9)
    for (let i = 0; i < 9; i++) {
      let pNum = ((cucNumber - 1 + i) % 9) + 1;
      earthPalaceStems[pNum] = KY_NGHI_SEQUENCE[i];
    }
  } else {
    // Âm độn: Khởi Mậu tại Cung = cucNumber, bay nghịch cửu cung (9->8->7->6->5->4->3->2->1)
    for (let i = 0; i < 9; i++) {
      let pNum = ((cucNumber - 1 - i) % 9) + 1;
      if (pNum <= 0) pNum += 9;
      earthPalaceStems[pNum] = KY_NGHI_SEQUENCE[i];
    }
  }

  // -------------------------------------------------------------
  // BƯỚC 2: TÌM TUẦN THỦ, TRỰC PHÙ VÀ TRỰC SỬ GỐC
  // -------------------------------------------------------------
  const tuanThu = getTuanThu(hourCan, hourChi);
  const tuanThuStem = tuanThu.stem; // vd: Mậu, Kỷ, Canh...

  // Tìm cung Địa bàn chứa Can Tuần thủ
  let trucPhuPalace = 1;
  for (let p = 1; p <= 9; p++) {
    if (earthPalaceStems[p] === tuanThuStem) {
      trucPhuPalace = p;
      break;
    }
  }

  // Nếu Tuần thủ rơi vào Trung Cung 5 -> Ký gửi ở Khôn 2
  const trucPhuPalaceEffective = trucPhuPalace === 5 ? 2 : trucPhuPalace;
  const trucPhuStar = STAR_ORIGINAL_PALACE[trucPhuPalaceEffective] || 'Thiên Bồng';
  const trucSuDoor = DOOR_ORIGINAL_PALACE[trucPhuPalaceEffective] || 'Hưu Môn';
  const trucSuPalace = trucPhuPalaceEffective;

  // -------------------------------------------------------------
  // BƯỚC 3: AN THIÊN BÀN CHÍN SAO (Trực Phù bay theo Can Giờ)
  // -------------------------------------------------------------
  // Nếu Can giờ là Giáp -> Giáp ẩn dưới Tuần thủ stem
  const effectiveHourCan = hourCan === 'Giáp' ? tuanThuStem : hourCan;

  // Tìm cung Địa bàn chứa Can Giờ
  let hourCanEarthPalace = 1;
  for (let p = 1; p <= 9; p++) {
    if (earthPalaceStems[p] === effectiveHourCan) {
      hourCanEarthPalace = p;
      break;
    }
  }
  const trucPhuNewPalace = hourCanEarthPalace === 5 ? 2 : hourCanEarthPalace;

  // Xoay vòng 8 sao theo vòng chu vi PALACE_RING_CW
  // Tìm vị trí của trucPhuPalaceEffective trong PALACE_RING_CW và trucPhuNewPalace trong PALACE_RING_CW
  const origRingIdxStar = PALACE_RING_CW.indexOf(trucPhuPalaceEffective);
  const newRingIdxStar = PALACE_RING_CW.indexOf(trucPhuNewPalace);
  const starOffset = (newRingIdxStar - origRingIdxStar + 8) % 8;

  const heavenStars: Record<number, string> = {};
  const heavenStems: Record<number, string> = {};
  const heavenStems2: Record<number, string | undefined> = {};

  // Trung cung 5 sao giữ Thiên Cầm hoặc bay theo Thiên Nhuế
  const centerEarthStem = earthPalaceStems[5];

  for (let i = 0; i < 8; i++) {
    const origP = PALACE_RING_CW[i];
    const targetRingIdx = (i + starOffset) % 8;
    const targetP = PALACE_RING_CW[targetRingIdx];

    const starName = STAR_ORIGINAL_PALACE[origP];
    heavenStars[targetP] = starName;
    heavenStems[targetP] = earthPalaceStems[origP];

    // Nếu sao Thiên Nhuế (ở Khôn 2 gốc) bay đến targetP -> Thiên Cầm và Can cung 5 đi cùng
    if (origP === 2) {
      heavenStars[targetP] = `${starName}/Cầm`;
      heavenStems2[targetP] = centerEarthStem;
    }
  }

  // -------------------------------------------------------------
  // BƯỚC 5: AN TÁM CỬA (Trực Sử bay theo Chi Giờ)
  // Dương độn bay xuôi cửu cung, Âm độn bay ngược cửu cung
  // -------------------------------------------------------------
  // Tìm Chi của Tuần thủ (Giáp Tý -> Tý, Giáp Tuất -> Tuất, ...)
  const tuanThuChiMap: Record<string, string> = {
    'Giáp Tý': 'Tý',
    'Giáp Tuất': 'Tuất',
    'Giáp Thân': 'Thân',
    'Giáp Ngọ': 'Ngọ',
    'Giáp Thìn': 'Thìn',
    'Giáp Dần': 'Dần',
  };
  const startChi = tuanThuChiMap[tuanThu.giap] || 'Tý';
  const startChiIdx = CHI.indexOf(startChi);
  const targetChiIdx = CHI.indexOf(hourChi);
  let chiStep = (targetChiIdx - startChiIdx + 12) % 12;

  let trucSuNewPalace = trucSuPalace;
  if (isDuongDon) {
    // Đếm tiến cửu cung
    trucSuNewPalace = ((trucSuPalace - 1 + chiStep) % 9) + 1;
  } else {
    // Đếm lùi cửu cung
    trucSuNewPalace = ((trucSuPalace - 1 - chiStep) % 9) + 1;
    if (trucSuNewPalace <= 0) trucSuNewPalace += 9;
  }

  // Nếu gặp Trung cung 5: Dương độn ký Cấn 8 (hoặc Càn 6 / Khôn 2), theo Bí Kíp Toàn Thư gửi Khôn 2
  if (trucSuNewPalace === 5) {
    trucSuNewPalace = 2;
  }

  // Bố trí 8 cửa xoay thuận chiều kim đồng hồ quanh 8 cung
  const origDoorIdx = DOORS_SEQUENCE.indexOf(trucSuDoor);
  const targetRingIdxDoor = PALACE_RING_CW.indexOf(trucSuNewPalace);

  const heavenDoors: Record<number, string> = {};
  for (let i = 0; i < 8; i++) {
    const doorName = DOORS_SEQUENCE[(origDoorIdx + i) % 8];
    const targetP = PALACE_RING_CW[(targetRingIdxDoor + i) % 8];
    heavenDoors[targetP] = doorName;
  }

  // -------------------------------------------------------------
  // BƯỚC 6: AN TÁM THẦN (Bát Thần Bàn)
  // Thần Trực Phù đóng tại cung của Sao Trực Phù trên Thiên bàn
  // Dương độn: xoay thuận kim đồng hồ | Âm độn: xoay ngược kim đồng hồ
  // -------------------------------------------------------------
  const heavenGods: Record<number, string> = {};
  const trucPhuRingIdx = PALACE_RING_CW.indexOf(trucPhuNewPalace);

  for (let i = 0; i < 8; i++) {
    const godName = EIGHT_GODS[i];
    let targetP: number;
    if (isDuongDon) {
      targetP = PALACE_RING_CW[(trucPhuRingIdx + i) % 8];
    } else {
      targetP = PALACE_RING_CW[(trucPhuRingIdx - i + 8) % 8];
    }
    heavenGods[targetP] = godName;
  }

  // Thần sát: Tuần không, Dịch mã, Lộc vị, Quý nhân
  const dichMaChi = getDichMa(hourChi);
  const dichMaPalace = CHI_TO_PALACE[dichMaChi] || 2;
  const locViChi = getLocVi(dayCan);
  const locViPalace = CHI_TO_PALACE[locViChi] || 8;
  const quyNhan = getQuyNhan(dayCan);
  const duongQuyPalace = CHI_TO_PALACE[quyNhan.duong] || 8;
  const amQuyPalace = CHI_TO_PALACE[quyNhan.am] || 2;

  const tuanKhongPalaces = tuanThu.tuanKhong.map((c) => CHI_TO_PALACE[c] || 1);

  // -------------------------------------------------------------
  // PHÂN TÍCH CÁCH CỤC & TƯƠNG TÁC TẠI TỪNG CUNG (Theo Bí Kíp Toàn Thư)
  // -------------------------------------------------------------
  const palaces: Record<number, PalaceData> = {};
  const allFormations: string[] = [];

  for (let p = 1; p <= 9; p++) {
    const info = PALACE_INFO[p];
    const eStem = earthPalaceStems[p] || '';
    const hStar = heavenStars[p] || (p === 5 ? 'Thiên Cầm' : '');
    const hStem = heavenStems[p] || (p === 5 ? centerEarthStem : '');
    const hStem2 = heavenStems2[p];
    const door = heavenDoors[p] || (p === 5 ? 'Trung Cung' : '');
    const god = heavenGods[p] || (p === 5 ? '' : '');

    const isTk = tuanKhongPalaces.includes(p);
    const isDm = dichMaPalace === p;
    const isLv = locViPalace === p;
    const isDq = duongQuyPalace === p;
    const isAq = amQuyPalace === p;

    // Formations collection
    const forms: string[] = [];

    // Retrieve detailed combo models
    const stemCombo = hStem && eStem ? STEM_COMBINATIONS[hStem]?.[eStem] : undefined;
    const doorDetail = door ? DOOR_PALACE_MATRIX[door]?.[p] : undefined;
    const starProf = hStar ? STAR_PROFILES[hStar] : undefined;
    const godProf = god ? GOD_PROFILES[god] : undefined;

    if (stemCombo) {
      forms.push(`${stemCombo.name} (${stemCombo.nature})`);
    }

    // 10 Can tương khắc ứng bổ sung nếu chưa có trong stemCombo
    if (hStem && eStem) {
      if (hStem === 'Mậu' && eStem === 'Bính') forms.push('Long Hồi Thủ (Thanh Long phản thủ - Rất cát)');
      if (hStem === 'Bính' && eStem === 'Mậu') forms.push('Phi Điểu Điệt Huyệt (Chim bay về tổ - Đại cát)');
      if (hStem === 'Ất' && eStem === 'Tân') forms.push('Thanh Long Đào Tẩu (Rồng xanh chạy trốn - Hung)');
      if (hStem === 'Tân' && eStem === 'Ất') forms.push('Bạch Hổ Xướng Cuồng (Hổ trắng gào thét - Hung)');
      if (hStem === 'Đinh' && eStem === 'Quý') forms.push('Chu Tước Đầu Giang (Sẻ son lao sông - Hung)');
      if (hStem === 'Quý' && eStem === 'Đinh') forms.push('Đằng Xà Yêu Kiều (Rắn bay uốn éo - Hung)');
    }

    // Lục Nghi Kích Hình
    let kichHinhStr: string | undefined = undefined;
    if (hStem === 'Mậu' && p === 3) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Tý Mậu đáo Chấn 3 (Tý Mão tương hình - Hung)';
    else if (hStem === 'Kỷ' && p === 2) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Tuất Kỷ đáo Khôn 2 (Tuất Mùi tương hình - Hung)';
    else if (hStem === 'Canh' && p === 8) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Thân Canh đáo Cấn 8 (Thân Dần tương hình/xung - Đại Hung)';
    else if (hStem === 'Tân' && p === 9) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Ngọ Tân đáo Ly 9 (Ngọ Ngọ tự hình - Hung)';
    else if (hStem === 'Nhâm' && p === 4) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Thìn Nhâm đáo Tốn 4 (Thìn Thìn tự hình - Hung)';
    else if (hStem === 'Quý' && p === 4) kichHinhStr = 'Lục Nghi Kích Hình: Giáp Dần Quý đáo Tốn 4 (Dần Tị tương hình - Hung)';

    if (kichHinhStr) forms.push(kichHinhStr);

    // Tam Kỳ Nhập Mộ
    let nhapMoStr: string | undefined = undefined;
    if (hStem === 'Ất' && (p === 6 || p === 2)) nhapMoStr = `Tam Kỳ Nhập Mộ: Nhật Kỳ Ất Mộc nhập Mộ tại ${info.name} (Hào quang u ám - Hung)`;
    else if (hStem === 'Bính' && p === 6) nhapMoStr = 'Tam Kỳ Nhập Mộ: Nguyệt Kỳ Bính Hỏa nhập Mộ tại Càn 6 (Mặt trời lặn hướng Tây Bắc - Hung)';
    else if (hStem === 'Đinh' && p === 8) nhapMoStr = 'Tam Kỳ Nhập Mộ: Tinh Kỳ Đinh Hỏa nhập Mộ tại Cấn 8 (Sao mờ trong núi sâu - Hung)';

    if (nhapMoStr) forms.push(nhapMoStr);

    // Tam Kỳ Thăng Điện
    let thangDienStr: string | undefined = undefined;
    if (hStem === 'Ất' && p === 3) thangDienStr = 'Tam Kỳ Thăng Điện: Ất đáo Chấn 3 (Nhật xuất Lôi môn - Rực rỡ quang minh)';
    else if (hStem === 'Bính' && p === 9) thangDienStr = 'Tam Kỳ Thăng Điện: Bính đáo Ly 9 (Nguyệt chiếu Đoan môn - Đại Cát)';
    else if (hStem === 'Đinh' && p === 7) thangDienStr = 'Tam Kỳ Thăng Điện: Đinh đáo Đoài 7 (Tinh xuất Kim môn - Đại Cát)';

    if (thangDienStr) forms.push(thangDienStr);

    // 9 Độn Biến Hóa
    if (['Sinh Môn', 'Khai Môn'].includes(door) && hStem === 'Bính' && (eStem === 'Đinh' || god === 'Cửu Địa' || god === 'Thái Âm')) {
      forms.push('★ Thiên Độn (Được tinh Nguyệt che chở - Trăm việc đại cát)');
    }
    if (['Khai Môn', 'Sinh Môn', 'Hưu Môn'].includes(door) && hStem === 'Ất' && (eStem === 'Kỷ' || ['Cửu Địa', 'Thái Âm', 'Lục Hợp'].includes(god))) {
      forms.push('★ Địa Độn (Được tinh Nhật che chở - Lợi mai phục, mưu lược)');
    }
    if (door === 'Hưu Môn' && hStem === 'Đinh' && god === 'Thái Âm') {
      forms.push('★ Nhân Độn (Được tinh Sao che chở - Hòa hợp, mưu việc đắc lợi)');
    }
    if (door === 'Sinh Môn' && hStem === 'Bính' && god === 'Cửu Thiên') {
      forms.push('★ Thần Độn (Thần linh trợ uy - Tế lễ cầu phúc đại thắng)');
    }
    if (door === 'Hưu Môn' && hStem === 'Đinh' && god === 'Cửu Địa' && p === 8) {
      forms.push('★ Quỷ Độn (Quỷ thần che chở - Thám thính cướp trại)');
    }
    if (['Khai Môn', 'Hưu Môn', 'Sinh Môn'].includes(door) && hStem === 'Ất' && p === 4) {
      forms.push('★ Phong Độn (Thuận buồm xuôi gió, lợi hỏa công)');
    }
    if (['Khai Môn', 'Hưu Môn', 'Sinh Môn'].includes(door) && hStem === 'Ất' && (eStem === 'Tân' || p === 2)) {
      forms.push('★ Vân Độn (Mây lành che chở, cầu mưa phong thu)');
    }
    if (door === 'Hưu Môn' && hStem === 'Ất' && (eStem === 'Quý' || p === 1)) {
      forms.push('★ Long Độn (Rồng che chở, lợi thủy chiến, cầu đảo)');
    }
    if ((door === 'Hưu Môn' && hStem === 'Ất' && eStem === 'Tân' && p === 8) || (door === 'Sinh Môn' && hStem === 'Tân' && p === 8)) {
      forms.push('★ Hổ Độn (Oai hổ giúp sức, lợi chiêu an giữ hiểm)');
    }

    // Tam Trá & Ngũ Giả
    if (['Khai Môn', 'Hưu Môn', 'Sinh Môn'].includes(door) && ['Ất', 'Bính', 'Đinh'].includes(hStem)) {
      if (god === 'Thái Âm') forms.push('Chân Trá (Dối đúng - Lợi thi ân, cầu đảo)');
      if (god === 'Lục Hợp') forms.push('Hưu Trá (Dối lành - Lợi luyện thuốc, giải tai)');
      if (god === 'Cửu Địa') forms.push('Trọng Trá (Dối nặng - Lợi thu nạp, bái thụ)');
    }

    // Cung Ba Thắng & Năm Cung Không Kích Được
    let baThangStr: string | undefined = undefined;
    if (p === trucPhuNewPalace) {
      baThangStr = 'Cung Đệ Nhất Thắng (Thiên Ất Trực Phù lâm - Kích phương xung thắng lớn)';
      forms.push(baThangStr);
    }
    if (god === 'Cửu Thiên') {
      baThangStr = 'Cung Đệ Nhị Thắng (Cửu Thiên cư - Oai phong lẫm liệt, đánh đâu thắng đó)';
      forms.push(baThangStr);
    }
    if (door === 'Sinh Môn') {
      baThangStr = 'Cung Đệ Tam Thắng (Sinh Môn cư - Đánh từ Sinh sang Tử bách chiến bách thắng)';
      forms.push(baThangStr);
    }

    let batKhaKichStr: string | undefined = undefined;
    if (['Trực Phù', 'Cửu Thiên', 'Cửu Địa', 'Thái Âm', 'Lục Hợp'].includes(god)) {
      batKhaKichStr = `Năm Cung Bất Khả Kích: Phương ${info.name} có ${god} ngự, kỵ tấn công trực diện`;
      forms.push(batKhaKichStr);
    }

    // Môn Bách & Cung Bách
    if (doorDetail?.relation.includes('Môn Bách')) {
      forms.push(`Môn Bách (${doorDetail.relation})`);
    } else if (doorDetail?.relation.includes('Môn Chế')) {
      forms.push(`Môn Chế (${doorDetail.relation})`);
    }

    // Phục Ngâm & Phản Ngâm
    if (door === DOOR_ORIGINAL_PALACE[p]) forms.push('Môn Phục Ngâm (Cửa đóng bản cung)');
    if (hStar === STAR_ORIGINAL_PALACE[p]) forms.push('Tinh Phục Ngâm (Sao đóng bản cung)');

    forms.forEach((f) => {
      if (!allFormations.includes(f)) allFormations.push(f);
    });

    let battleSign = '';
    if (godProf) {
      battleSign = `${godProf.significance} ${godProf.military}`;
    }

    palaces[p] = {
      palaceNum: p,
      palaceName: info.name,
      guaName: info.gua,
      direction: info.dir,
      element: info.element,
      earthStem: eStem,
      earthStem2: p === 2 ? centerEarthStem : undefined,
      heavenStar: hStar,
      heavenStem: hStem,
      heavenStem2: hStem2,
      door: door,
      god: god,
      isTuanKhong: isTk,
      isDichMa: isDm,
      isLocVi: isLv,
      isDuongQuy: isDq,
      isAmQuy: isAq,
      formations: Array.from(new Set(forms)),
      battleSign,
      summary: `${god ? god + ' • ' : ''}${hStar} • ${door} • ${hStem}/${eStem}`,
      stemComboDetail: stemCombo,
      doorPalaceDetail: doorDetail,
      starProfile: starProf,
      godProfile: godProf,
      kichHinh: kichHinhStr,
      nhapMo: nhapMoStr,
      thangDien: thangDienStr,
      baThang: baThangStr,
      batKhaKich: batKhaKichStr,
    };
  }

  const cucName = `${isDuongDon ? 'Dương Độn' : 'Âm Độn'} ${cucNumber} Cục`;

  return {
    isDuongDon,
    cucNumber,
    cucName,
    dayCanChi: `${dayCan} ${dayChi}`,
    hourCanChi: `${hourCan} ${hourChi}`,
    tuanThuCan: tuanThuStem,
    tuanThuGiap: tuanThu.giap,
    trucPhuStar,
    trucPhuPalace: trucPhuPalaceEffective,
    trucPhuNewPalace,
    trucSuDoor,
    trucSuPalace,
    trucSuNewPalace,
    tuanKhongChi: tuanThu.tuanKhong,
    dichMaChi,
    palaces,
    specialFormations: allFormations,
  };
}
