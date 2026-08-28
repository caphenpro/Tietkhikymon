import { CompleteKyMonChart, PalaceData } from './kymonChart';

export interface PalaceEvaluation {
  palaceNum: number;
  palaceName: string;
  direction: string;
  score: number; // 0..100
  stars: number; // 1.0..5.0
  level: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  stemNature?: string;
  doorStatus?: string;
  pros: string[];
  cons: string[];
  summary: string;
  isTrucPhu: boolean;
  isTrucSu: boolean;
  starColor: string;
}

export interface KyMonEvaluationResult {
  score: number; // 0..100
  stars: number; // 1.0..5.0 (rounded to 1 decimal)
  level: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung';
  verdict: string;
  shortTagline: string;
  badgeClass: string;
  starColor: string;

  breakdown: {
    trucPhuScore: number;
    trucSuScore: number;
    stemScore: number;
    doorScore: number;
    starsGodsScore: number;
    specialBonusPenalty: number;
  };

  pros: string[];
  cons: string[];

  palaceEvaluations: Record<number, PalaceEvaluation>;
  bestPalaces: PalaceEvaluation[];
  worstPalaces: PalaceEvaluation[];

  actionAdvice: {
    recommended: string[];
    avoid: string[];
    bestDirection: string;
    strategy: string;
  };
}

/**
 * Đánh giá độ tốt/xấu của từng cung dựa trên phối hợp Thiên Can, Địa Can, Cửu Tinh, Bát Môn, Bát Thần và Thần Sát
 */
export function evaluatePalace(
  palace: PalaceData,
  isTrucPhuPalace: boolean,
  isTrucSuPalace: boolean
): PalaceEvaluation {
  let baseScore = 50; // Mặc định điểm trung hòa
  const pros: string[] = [];
  const cons: string[] = [];

  // 1. Đánh giá Thập Can Khắc Ứng (Thiên Bàn / Địa Bàn)
  if (palace.stemComboDetail) {
    const nature = palace.stemComboDetail.nature;
    if (nature === 'Đại Cát') {
      baseScore += 18;
      pros.push(`Đắc Cát Cách "${palace.stemComboDetail.name}": ${palace.heavenStem}/${palace.earthStem} đại cát hanh thông`);
    } else if (nature === 'Cát') {
      baseScore += 10;
      pros.push(`Đắc Cát Cách "${palace.stemComboDetail.name}": ${palace.heavenStem}/${palace.earthStem} thuận lợi`);
    } else if (nature === 'Hung') {
      baseScore -= 12;
      cons.push(`Phạm Hung Cách "${palace.stemComboDetail.name}": ${palace.heavenStem}/${palace.earthStem} có trở ngại`);
    } else if (nature === 'Đại Hung') {
      baseScore -= 20;
      cons.push(`Phạm Đại Hung Cách "${palace.stemComboDetail.name}": ${palace.heavenStem}/${palace.earthStem} hung hiểm`);
    }
  }

  // 2. Đánh giá Môn / Cung Sinh Khắc (Nhân Bàn / Địa Bàn)
  if (palace.doorPalaceDetail) {
    const status = palace.doorPalaceDetail.status;
    const rel = palace.doorPalaceDetail.relation;
    if (status === 'Đại Cát') {
      baseScore += 18;
      pros.push(`${palace.door} lâm ${palace.palaceName} (${rel}) đại cát`);
    } else if (status === 'Cát') {
      baseScore += 10;
      pros.push(`${palace.door} lâm ${palace.palaceName} (${rel})`);
    } else if (status === 'Hung') {
      baseScore -= 12;
      cons.push(`${palace.door} lâm ${palace.palaceName} (${rel}) bất lợi`);
    } else if (status === 'Đại Hung') {
      baseScore -= 20;
      cons.push(`${palace.door} lâm ${palace.palaceName} (${rel}) đại hung`);
    }
  }

  // Tam Cát Môn (Khai, Hưu, Sinh)
  if (['Khai Môn', 'Hưu Môn', 'Sinh Môn'].includes(palace.door)) {
    baseScore += 6;
    pros.push(`Được Tam Cát Môn (${palace.door}) ngự trị`);
  } else if (['Tử Môn', 'Kinh Môn', 'Thương Môn'].includes(palace.door)) {
    baseScore -= 6;
    cons.push(`Gặp Hung Môn (${palace.door}) chủ sát khí`);
  }

  // 3. Đánh giá Bát Thần
  const goodGods = ['Trực Phù', 'Thái Âm', 'Lục Hợp', 'Cửu Thiên', 'Cửu Địa'];
  const badGods = ['Bạch Hổ', 'Huyền Vũ', 'Đằng Xà'];
  if (goodGods.includes(palace.god)) {
    baseScore += 7;
    pros.push(`Cát Thần ${palace.god} phò trợ bảo vệ`);
  } else if (badGods.includes(palace.god)) {
    baseScore -= 7;
    cons.push(`Gặp Hung Thần ${palace.god} quấy nhiễu`);
  }

  // 4. Đánh giá Cửu Tinh
  const goodStars = ['Thiên Tâm', 'Thiên Cầm', 'Thiên Nhậm', 'Thiên Phụ'];
  const badStars = ['Thiên Bồng', 'Thiên Nhuế', 'Thiên Trụ'];
  if (goodStars.includes(palace.heavenStar)) {
    baseScore += 7;
    pros.push(`Cát Tinh ${palace.heavenStar} chiếu rọi`);
  } else if (badStars.includes(palace.heavenStar)) {
    baseScore -= 7;
    cons.push(`Hung Tinh ${palace.heavenStar} mang tạp khí`);
  }

  // 5. Thần Sát & Hình Mộ Khắc Ứng
  if (palace.kichHinh) {
    baseScore -= 20;
    cons.push(palace.kichHinh);
  }
  if (palace.nhapMo) {
    baseScore -= 16;
    cons.push(palace.nhapMo);
  }
  if (palace.isTuanKhong) {
    baseScore -= 14;
    cons.push('Rơi vào Cung Tuần Không (Năng lượng hư hao, việc khó thành)');
  }
  if (palace.thangDien) {
    baseScore += 16;
    pros.push(palace.thangDien);
  }
  if (palace.isLocVi) {
    baseScore += 8;
    pros.push('Đắc Lộc Vị (Chính tài vượng phát, bổng lộc dồi dào)');
  }
  if (palace.isDuongQuy || palace.isAmQuy) {
    baseScore += 8;
    pros.push('Đắc Quý Nhân tương trợ giải hạn');
  }
  if (palace.isDichMa) {
    baseScore += 4;
    pros.push('Có Dịch Mã (Chủ biến động, nhanh chóng, xuất hành phát tài)');
  }

  // Cung Trực Phù / Trực Sử
  if (isTrucPhuPalace) {
    baseScore += 10;
    pros.push('Trực Phù Tướng Soái đáo cung (Cát khí đệ nhất)');
  }
  if (isTrucSuPalace) {
    if (['Khai Môn', 'Hưu Môn', 'Sinh Môn'].includes(palace.door)) {
      baseScore += 10;
      pros.push('Trực Sử Cát Môn chấp pháp (Mệnh lệnh hanh thông)');
    } else {
      baseScore -= 6;
      cons.push(`Trực Sử mang ${palace.door} (Việc hành sự cần cẩn trọng)`);
    }
  }

  // Độn cách đặc biệt
  palace.formations.forEach((f) => {
    if (f.startsWith('★')) {
      baseScore += 15;
      pros.push(f);
    } else if (f.includes('Đệ Nhất Thắng') || f.includes('Đệ Nhị Thắng') || f.includes('Đệ Tam Thắng')) {
      baseScore += 12;
      pros.push(f);
    }
  });

  // Giới hạn điểm 5..98
  const finalScore = Math.max(8, Math.min(98, Math.round(baseScore)));

  // Tính số sao từ 1.0 đến 5.0
  let stars = 1.0;
  let level: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung' = 'Bình Hòa';
  let starColor = 'text-amber-400';

  if (finalScore >= 82) {
    stars = Number((4.5 + ((finalScore - 82) / 16) * 0.5).toFixed(1));
    stars = Math.min(5.0, stars);
    level = 'Đại Cát';
    starColor = 'text-amber-400';
  } else if (finalScore >= 68) {
    stars = Number((3.8 + ((finalScore - 68) / 14) * 0.6).toFixed(1));
    level = 'Cát';
    starColor = 'text-emerald-400';
  } else if (finalScore >= 48) {
    stars = Number((2.8 + ((finalScore - 48) / 20) * 0.9).toFixed(1));
    level = 'Bình Hòa';
    starColor = 'text-yellow-300';
  } else if (finalScore >= 32) {
    stars = Number((1.8 + ((finalScore - 32) / 16) * 0.9).toFixed(1));
    level = 'Hung';
    starColor = 'text-rose-400';
  } else {
    stars = Number((1.0 + (finalScore / 32) * 0.7).toFixed(1));
    level = 'Đại Hung';
    starColor = 'text-rose-500';
  }

  return {
    palaceNum: palace.palaceNum,
    palaceName: palace.palaceName,
    direction: palace.direction,
    score: finalScore,
    stars,
    level,
    stemNature: palace.stemComboDetail?.nature,
    doorStatus: palace.doorPalaceDetail?.status,
    pros: Array.from(new Set(pros)),
    cons: Array.from(new Set(cons)),
    summary: `${palace.heavenStem}/${palace.earthStem} • ${palace.door} • ${palace.heavenStar} (${level})`,
    isTrucPhu: isTrucPhuPalace,
    isTrucSu: isTrucSuPalace,
    starColor,
  };
}

/**
 * Đánh giá tổng quan toàn bộ Bàn Kỳ Môn của một mốc thời gian theo thang điểm 5 sao
 */
export function evaluateKyMonTimeMoment(chart: CompleteKyMonChart): KyMonEvaluationResult {
  const palaceEvaluations: Record<number, PalaceEvaluation> = {};
  const evalList: PalaceEvaluation[] = [];

  // Đánh giá từng cung trong 9 Cung
  for (let p = 1; p <= 9; p++) {
    const palace = chart.palaces[p];
    if (!palace) continue;

    const isTrucPhu = p === chart.trucPhuNewPalace;
    const isTrucSu = p === chart.trucSuNewPalace;
    const ev = evaluatePalace(palace, isTrucPhu, isTrucSu);
    palaceEvaluations[p] = ev;
    if (p !== 5) {
      evalList.push(ev);
    }
  }

  // 1. Trực Phù Palace Evaluation
  const trucPhuEv = palaceEvaluations[chart.trucPhuNewPalace] || evalList[0];
  // 2. Trực Sử Palace Evaluation
  const trucSuEv = palaceEvaluations[chart.trucSuNewPalace] || evalList[0];

  // 3. Điểm trung bình 8 cung chu vi
  const avgPalacesScore = evalList.reduce((acc, cur) => acc + cur.score, 0) / evalList.length;

  // 4. Toàn cục cách cục (Special Formations)
  let globalBonus = 0;
  const globalPros: string[] = [];
  const globalCons: string[] = [];

  chart.specialFormations.forEach((f) => {
    if (f.startsWith('★')) {
      globalBonus += 6;
      globalPros.push(f);
    } else if (f.includes('Phục Ngâm')) {
      globalBonus -= 5;
      globalCons.push('Toàn bàn phạm Phục Ngâm (Chủ trì trệ, không nên tiến công)');
    } else if (f.includes('Phản Ngâm')) {
      globalBonus -= 6;
      globalCons.push('Toàn bàn phạm Phản Ngâm (Chủ biến động tráo trở, phản phúc)');
    }
  });

  // Tính tổng điểm trọng số:
  // - Trực Phù (Tướng soái thiên thời): 25%
  // - Trực Sử (Chấp pháp nhân sự): 25%
  // - Tổng hòa 8 Cung chu vi: 40%
  // - Hiệu ứng toàn cục: 10%
  const weightedScore =
    trucPhuEv.score * 0.25 +
    trucSuEv.score * 0.25 +
    avgPalacesScore * 0.4 +
    Math.min(20, Math.max(-20, globalBonus));

  const totalScore = Math.max(10, Math.min(96, Math.round(weightedScore)));

  // Chuyển đổi ra thang 5 sao
  let stars = 3.0;
  let level: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung' = 'Bình Hòa';
  let badgeClass = 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
  let starColor = 'text-yellow-400';
  let shortTagline = 'Thời vận bình hòa, nên giữ nếp cũ';

  if (totalScore >= 80) {
    stars = Number((4.5 + ((totalScore - 80) / 16) * 0.5).toFixed(1));
    stars = Math.min(5.0, stars);
    level = 'Đại Cát';
    badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm';
    starColor = 'text-amber-400';
    shortTagline = 'Đại cát đại lợi • Khí vượng vạn sự thông';
  } else if (totalScore >= 66) {
    stars = Number((3.8 + ((totalScore - 66) / 14) * 0.6).toFixed(1));
    level = 'Tiểu Cát';
    badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    starColor = 'text-emerald-400';
    shortTagline = 'Thời cơ thuận lợi • Nhiều phương vị hanh thông';
  } else if (totalScore >= 48) {
    stars = Number((2.8 + ((totalScore - 48) / 18) * 0.9).toFixed(1));
    level = 'Bình Hòa';
    badgeClass = 'bg-blue-500/10 text-blue-300 border-blue-500/30';
    starColor = 'text-blue-400';
    shortTagline = 'Âm dương cân bằng • Giữ tĩnh làm chủ';
  } else if (totalScore >= 34) {
    stars = Number((1.8 + ((totalScore - 34) / 14) * 0.9).toFixed(1));
    level = 'Tiểu Hung';
    badgeClass = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    starColor = 'text-rose-400';
    shortTagline = 'Nhiều trở ngại • Cần thận trọng từng bước';
  } else {
    stars = Number((1.0 + (totalScore / 34) * 0.7).toFixed(1));
    level = 'Đại Hung';
    badgeClass = 'bg-rose-600/20 text-rose-200 border-rose-600/40 shadow-sm';
    starColor = 'text-rose-500';
    shortTagline = 'Sát khí nặng nề • Tuyệt đối không nên manh động';
  }

  // Top Cung Tốt Nhất & Xấu Nhất
  const sortedPalaces = [...evalList].sort((a, b) => b.score - a.score);
  const bestPalaces = sortedPalaces.slice(0, 3);
  const worstPalaces = sortedPalaces.slice(-2).reverse();

  // Tổng hợp Pros & Cons tiêu biểu
  const allPros: string[] = [...globalPros];
  const allCons: string[] = [...globalCons];

  evalList.forEach((p) => {
    p.pros.forEach((item) => {
      if (allPros.length < 6 && !allPros.includes(item)) {
        allPros.push(`[${p.palaceName} - ${p.direction}] ${item}`);
      }
    });
    p.cons.forEach((item) => {
      if (allCons.length < 5 && !allCons.includes(item)) {
        allCons.push(`[${p.palaceName} - ${p.direction}] ${item}`);
      }
    });
  });

  // Lời khuyên hành động thực tiễn (Action Advice)
  const bestDir = bestPalaces[0]
    ? `${bestPalaces[0].palaceName} (${bestPalaces[0].direction}) - Đạt ${bestPalaces[0].stars}⭐`
    : 'Chính Bắc (Khảm)';

  let strategy = 'Chủ động tiến hành (Làm Khách đắc thắng)';
  if (totalScore < 50 || chart.specialFormations.some((f) => f.includes('Phục Ngâm'))) {
    strategy = 'An tĩnh phòng thủ (Làm Chủ giữ thế vững vàng)';
  }

  const recommended: string[] = [];
  const avoid: string[] = [];

  if (level === 'Đại Cát' || level === 'Tiểu Cát') {
    recommended.push(`Xuất hành, khai trương, đàm phán về hướng cát: ${bestPalaces.map((p) => p.direction).join(', ')}`);
    recommended.push('Ký kết hợp đồng, mưu cầu công danh, triển khai kế hoạch lớn');
    recommended.push('Hẹn gặp đối tác quan trọng và quý nhân phò trợ');
    avoid.push(`Tránh hành sự ở phương vị có sát khí: ${worstPalaces.map((p) => p.direction).join(', ')}`);
    avoid.push('Không nên chần chừ làm lỡ mất thời cơ thiên thời');
  } else if (level === 'Bình Hòa') {
    recommended.push('Xử lý công việc định kỳ, củng cố nội bộ, học tập tích lũy');
    recommended.push(`Nếu cần xuất hành hãy ưu tiên hướng: ${bestDir}`);
    avoid.push('Hạn chế vay mượn lớn hoặc đầu tư mạo hiểm');
    avoid.push('Tránh tranh luận gay gắt nơi công cộng');
  } else {
    recommended.push('An tĩnh nghỉ ngơi, tu tâm dưỡng tính, củng cố phòng thủ');
    recommended.push('Kiểm tra kỹ lưỡng các giấy tờ pháp lý, đề phòng sai sót');
    avoid.push('Kỵ khởi công xây dựng, xuất hành đi xa, ký kết giao dịch lớn');
    avoid.push(`Tuyệt đối tránh hướng hung hiểm: ${worstPalaces.map((p) => p.direction).join(', ')}`);
  }

  // Lời phán tổng quan (Verdict)
  let verdict = '';
  if (level === 'Đại Cát') {
    verdict = `Thời khắc hội tụ trường khí đại cát (${stars}/5.0 ⭐). Trực Phù ${chart.trucPhuStar} tọa vượng vị, Trực Sử ${chart.trucSuDoor} lâm cung cát lợi. Thích hợp mưu đại sự, xuất hành, đàm phán và đón nhận tài lộc.`;
  } else if (level === 'Tiểu Cát') {
    verdict = `Thời vận thuận hòa (${stars}/5.0 ⭐), nhiều phương vị đắc Tam Cát Môn và Thần trợ. Việc lành nên làm, việc lớn triển khai chu đáo tất gặt hái thành công tốt đẹp.`;
  } else if (level === 'Bình Hòa') {
    verdict = `Khí trường ở thế quân bình (${stars}/5.0 ⭐). Thuận lợi và trở ngại đan xen. Nên giữ tĩnh làm chủ, làm các việc thường nhật, chú trọng chi tiết.`;
  } else if (level === 'Tiểu Hung') {
    verdict = `Thời khắc có nhiều điểm xung khắc (${stars}/5.0 ⭐). Trực Sử hoặc các cung trọng yếu gặp Môn Bách hoặc Hung sát. Nên cẩn trọng trong giao dịch, hạn chế tranh chấp.`;
  } else {
    verdict = `Thời điểm sát khí áp đảo (${stars}/5.0 ⭐). Gặp cách cục hung hiểm hoặc Kích hình, Nhập mộ. Tuyệt đối không nên manh động, xuất hành đại sự cần đổi sang giờ cát khác.`;
  }

  return {
    score: totalScore,
    stars,
    level,
    verdict,
    shortTagline,
    badgeClass,
    starColor,
    breakdown: {
      trucPhuScore: trucPhuEv.score,
      trucSuScore: trucSuEv.score,
      stemScore: Math.round(avgPalacesScore),
      doorScore: Math.round((trucSuEv.score + avgPalacesScore) / 2),
      starsGodsScore: Math.round((trucPhuEv.score + avgPalacesScore) / 2),
      specialBonusPenalty: globalBonus,
    },
    pros: allPros,
    cons: allCons,
    palaceEvaluations,
    bestPalaces,
    worstPalaces,
    actionAdvice: {
      recommended,
      avoid,
      bestDirection: bestDir,
      strategy,
    },
  };
}
