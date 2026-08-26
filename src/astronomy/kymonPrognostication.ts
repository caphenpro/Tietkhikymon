import { CompleteKyMonChart, PalaceData } from './kymonChart';

export interface AspectPrognostication {
  id: string;
  title: string;
  category: string;
  iconName: string;
  keyFactors: { label: string; value: string; palace: number; status: 'good' | 'neutral' | 'bad' }[];
  summary: string;
  classicalPoem?: string;
  detailedAnalysis: string[];
  recommendation: string;
}

// 8 Cung bệnh tật của Thiên Nhuế
export const THIEN_NHUE_DISEASE_MAP: Record<number, { internal: string; external: string; summary: string }> = {
  9: {
    internal: 'Bệnh tim, tâm huyết, hỏa nhiệt, thần kinh, khí huyết bốc lên',
    external: 'Bệnh ở đầu, mắt, mặt, sốt cao, mê sảng',
    summary: 'Thiên Nhuế lâm Cung Ly (Hỏa): Chủ bệnh về tim mạch, huyết áp, đầu mắt và các chứng nhiệt bốc.',
  },
  2: {
    internal: 'Bệnh dạ dày (Vị), trướng bụng, tỳ vị hư hàn, ăn uống khó tiêu',
    external: 'Bệnh ngoài da, vai phải, tai phải, mụn nhọt kinh niên',
    summary: 'Thiên Nhuế bản cung Khôn (Thổ): Bệnh tích tụ lâu ngày, trướng bụng, tỳ vị suy nhược, nhọt độc bì phu.',
  },
  7: {
    internal: 'Phế quản, ho suyễn, thanh quản, ngọng ngịu, tổn thương phế khí',
    external: 'Răng miệng, yết hầu, hông sườn bên phải',
    summary: 'Thiên Nhuế lâm Cung Đoài (Kim): Bệnh hô hấp, viêm họng hạt, răng miệng và tổn thương sườn phải.',
  },
  6: {
    internal: 'Đại tràng, bàng quang, đái khó, táo bón, suy kiệt thần kinh cốt tủy',
    external: 'Đau gân cốt, tê buốt đầu, đùi, chân tay co quắp',
    summary: 'Thiên Nhuế lâm Cung Càn (Kim): Bệnh gân cốt, đau đầu, đại tiện và bàng quang bí tắc.',
  },
  1: {
    internal: 'Tiểu trường, thận khí suy, đan điền lạnh, thận hư',
    external: 'Di tinh, bạch đới, tiêu chảy, đau bụng dưới, bệnh sinh dục tiết niệu',
    summary: 'Thiên Nhuế lâm Cung Khảm (Thủy): Thận khí suy hàn, hệ tiết niệu sinh dục và đường ruột bất ổn.',
  },
  8: {
    internal: 'Tỳ vị hư trướng, khí tích tụ ở hoành cách mô',
    external: 'Đau chân, phong thấp cốt thống, bại liệt, mụn nhọt lở loét',
    summary: 'Thiên Nhuế lâm Cung Cấn (Thổ): Bệnh tỳ vị ứ trệ, phong thấp khớp chân và gân cốt bế tắc.',
  },
  3: {
    internal: 'Can đởm (gan, mật), khí uất kết, huyết hư, lao lực thổ huyết',
    external: 'Sườn trái, mắt mờ, tai điếc đột ngột, bong gân trật khớp',
    summary: 'Thiên Nhuế lâm Cung Chấn (Mộc): Bệnh can khí uất kết, gan mật tổn thương, sườn trái đau nhức, thị lực giảm.',
  },
  4: {
    internal: 'Can phế tổn thương, dạ dày co thắt, trúng phong đờm bế không nói được',
    external: 'Vai trái, tai trái, sườn trái, phù thũng nóng gân tay chân',
    summary: 'Thiên Nhuế lâm Cung Tốn (Mộc): Bệnh can mộc phạm vị, phong nhiệt tích tụ, khó thở phù nề.',
  },
};

// 8 Cung vật bị mất theo Can Giờ
export const LOST_ITEMS_MAP: Record<number, { items: string; animal: string; nature: string }> = {
  6: {
    items: 'Vàng bạc, tiền đồng, khóa sắt, đồ kim loại quý, vật tròn tròn, ấn tín báu vật',
    animal: 'Ngựa, thiên nga, chim ưng',
    nature: 'Cung Càn (Kim): Rơi ở hướng Tây Bắc, nơi trang nghiêm, góc nhà cao ráo hoặc tủ sắt khóa kín.',
  },
  1: {
    items: 'Thủy tinh, ngọc trai, bút mực, đồ uống, rượu trà, vật liệu dẻo mềm, giấy tờ ẩm ướt',
    animal: 'Lợn, cá, loài sống dưới nước',
    nature: 'Cung Khảm (Thủy): Rơi ở hướng Bắc, gần nguồn nước, rãnh mương, giếng nước, nhà vệ sinh hoặc bị ướt.',
  },
  8: {
    items: 'Đá quý, ngọc thạch, vải bạt che, đồ gốm sứ, đồ gạch ngói, túi xách cất kín',
    animal: 'Trâu, chó, mèo, muông thú núi rừng',
    nature: 'Cung Cấn (Thổ): Rơi ở hướng Đông Bắc, góc tường đất, gò đống, nơi chôn giấu hoặc gầm giường gầm tủ.',
  },
  3: {
    items: 'Xe cộ, thuyền bè, đồ gỗ quý, nhạc cụ, cây gậy, dụng cụ phát ra tiếng động',
    animal: 'Lừa, ngựa, rồng cá, chim hót',
    nature: 'Cung Chấn (Mộc): Rơi ở hướng Đông, khu vực cây cối, lối đi lại sầm uất hoặc nơi để xe cộ.',
  },
  4: {
    items: 'Tơ lụa, vải vóc, dây thừng, văn kiện cuộn tròn, vật dài thành cặp/đôi, đồ thủ công',
    animal: 'Gà, sâu bướm, chim chóc',
    nature: 'Cung Tốn (Mộc): Rơi ở hướng Đông Nam, nơi có gió thoảng, gác lửng, tủ quần áo hoặc bụi cây.',
  },
  9: {
    items: 'Sách vở, bản đồ, tranh vẽ, văn khế, ấn tín sắc lệnh, đồ điện tử sáng bóng',
    animal: 'Chim trĩ, chim màu sặc sỡ, ngựa lửa',
    nature: 'Cung Ly (Hỏa): Rơi ở hướng Nam, nơi có ánh sáng mạnh, nhà bếp, ban thờ hoặc bàn làm việc rực rỡ.',
  },
  2: {
    items: 'Đồng sắt vụn, trống khánh, đồ sành sứ cũ, bao tải, quần áo cũ, rương hòm cổ',
    animal: 'Trâu mẹ, dê, bò cái',
    nature: 'Cung Khôn (Thổ): Rơi ở hướng Tây Nam, góc tối ẩm thấp, nhà kho bẩn hoặc dưới đất.',
  },
  7: {
    items: 'Trang sức vàng bạc vụn, dao kéo, chén đĩa vỡ, nhạc cụ kim loại có lỗ/chuông reo',
    animal: 'Dê, gà, chim nhỏ',
    nature: 'Cung Đoài (Kim): Rơi ở hướng Tây, nơi cửa ngõ, tường rào sứt mẻ hoặc đầm ao cạn nước.',
  },
};

/**
 * Tìm Cung trên bàn Kỳ Môn chứa một Thiên Can cụ thể
 */
export function findPalaceByHeavenStem(chart: CompleteKyMonChart, stem: string): number {
  for (let p = 1; p <= 9; p++) {
    if (chart.palaces[p]?.heavenStem === stem || chart.palaces[p]?.heavenStem2 === stem) {
      return p;
    }
  }
  return 1;
}

/**
 * Tìm Cung trên bàn Kỳ Môn chứa một Ngôi Sao cụ thể
 */
export function findPalaceByStar(chart: CompleteKyMonChart, starName: string): number {
  for (let p = 1; p <= 9; p++) {
    if (chart.palaces[p]?.heavenStar.includes(starName)) {
      return p;
    }
  }
  return 1;
}

/**
 * Tìm Cung trên bàn Kỳ Môn chứa một Cửa Môn cụ thể
 */
export function findPalaceByDoor(chart: CompleteKyMonChart, doorName: string): number {
  for (let p = 1; p <= 9; p++) {
    if (chart.palaces[p]?.door === doorName) {
      return p;
    }
  }
  return 1;
}

/**
 * Tìm Cung trên bàn Kỳ Môn chứa một Vị Thần cụ thể
 */
export function findPalaceByGod(chart: CompleteKyMonChart, godName: string): number {
  for (let p = 1; p <= 9; p++) {
    if (chart.palaces[p]?.god === godName) {
      return p;
    }
  }
  return 1;
}

// Ngũ hành tương sinh tương khắc
export const ELEMENT_RELATION: Record<string, { sinh: string; khac: string; biSinh: string; biKhac: string }> = {
  Kim: { sinh: 'Thủy', khac: 'Mộc', biSinh: 'Thổ', biKhac: 'Hỏa' },
  Mộc: { sinh: 'Hỏa', khac: 'Thổ', biSinh: 'Thủy', biKhac: 'Kim' },
  Thủy: { sinh: 'Mộc', khac: 'Hỏa', biSinh: 'Kim', biKhac: 'Thổ' },
  Hỏa: { sinh: 'Thổ', khac: 'Kim', biSinh: 'Mộc', biKhac: 'Thủy' },
  Thổ: { sinh: 'Kim', khac: 'Thủy', biSinh: 'Hỏa', biKhac: 'Mộc' },
};

export function evaluateElementRelation(elemA: string, elemB: string): string {
  if (elemA === elemB) return 'Tỉ hòa (Đồng khí tương trợ)';
  if (ELEMENT_RELATION[elemA]?.sinh === elemB) return `${elemA} sinh ${elemB} (Sinh xuất - Hao khí)`;
  if (ELEMENT_RELATION[elemA]?.biSinh === elemB) return `${elemB} sinh ${elemA} (Sinh nhập - Đại lợi)`;
  if (ELEMENT_RELATION[elemA]?.khac === elemB) return `${elemA} khắc ${elemB} (Khắc xuất - Ta khắc được người)`;
  if (ELEMENT_RELATION[elemA]?.biKhac === elemB) return `${elemB} khắc ${elemA} (Khắc nhập - Bị tổn hại)`;
  return 'Bình hòa';
}

/**
 * Tạo báo cáo dự trắc toàn diện cho 6 phương diện đời sống + Thân Mệnh + Tam Bàn + Chủ Khách
 */
export function generateComprehensivePrognostication(chart: CompleteKyMonChart) {
  // Lấy các Can mốc
  const dayStem = chart.dayCanChi.split(' ')[0];
  const hourStem = chart.hourCanChi.split(' ')[0];

  // Tìm các cung vị quan trọng
  const dayPalace = chart.palaces[findPalaceByHeavenStem(chart, dayStem)] || chart.palaces[1];
  const hourPalace = chart.palaces[findPalaceByHeavenStem(chart, hourStem)] || chart.palaces[chart.trucPhuNewPalace];
  
  // Hôn nhân: Ất (Vợ), Canh (Chồng), Đinh (Thiếp), Lục Hợp (Mối lái)
  const atPalace = chart.palaces[findPalaceByHeavenStem(chart, 'Ất')];
  const canhPalace = chart.palaces[findPalaceByHeavenStem(chart, 'Canh')];
  const dinhPalace = chart.palaces[findPalaceByHeavenStem(chart, 'Đinh')];
  const lucHopPalace = chart.palaces[findPalaceByGod(chart, 'Lục Hợp')];

  // Y học: Thiên Nhuế (Bệnh), Thiên Tâm / Ất (Lương y), Sinh Môn & Tử Môn
  const thienNhuePalace = chart.palaces[findPalaceByStar(chart, 'Thiên Nhuế')];
  const thienTamPalace = chart.palaces[findPalaceByStar(chart, 'Thiên Tâm')];
  const sinhMonPalace = chart.palaces[findPalaceByDoor(chart, 'Sinh Môn')];
  const tuMonPalace = chart.palaces[findPalaceByDoor(chart, 'Tử Môn')];

  // Cầu tài: Giáp Tý Mậu (Vốn), Sinh Môn (Lợi nhuận)
  const mauPalace = chart.palaces[findPalaceByHeavenStem(chart, 'Mậu')];

  // Thi cử công danh: Nhật can (Sĩ tử), Trực Phù (Chủ khảo), Trực Sử (Giám khảo), Kỳ Đinh (Bài thi), Khai/Đỗ môn
  const trucPhuPalace = chart.palaces[chart.trucPhuNewPalace];
  const trucSuPalace = chart.palaces[chart.trucSuNewPalace];
  const khaiMonPalace = chart.palaces[findPalaceByDoor(chart, 'Khai Môn')];
  const doMonPalace = chart.palaces[findPalaceByDoor(chart, 'Đỗ Môn')];

  // Mất vật: Nhật can (Chủ mất), Thời can (Vật mất), Thiên Bồng (Kẻ trộm)
  const thienBongPalace = chart.palaces[findPalaceByStar(chart, 'Thiên Bồng')];

  // Kiện tụng: Kinh Môn, Cảnh Môn (Đơn từ)
  const kinhMonPalace = chart.palaces[findPalaceByDoor(chart, 'Kinh Môn')];
  const canhMonPalace = chart.palaces[findPalaceByDoor(chart, 'Cảnh Môn')];

  return {
    dayPalace,
    hourPalace,
    atPalace,
    canhPalace,
    dinhPalace,
    lucHopPalace,
    thienNhuePalace,
    thienTamPalace,
    sinhMonPalace,
    tuMonPalace,
    mauPalace,
    trucPhuPalace,
    trucSuPalace,
    khaiMonPalace,
    doMonPalace,
    thienBongPalace,
    kinhMonPalace,
    canhMonPalace,
  };
}
