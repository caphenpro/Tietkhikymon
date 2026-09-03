import { CompleteKyMonChart, PalaceData } from './kymonChart';
import { LucNhamChart, LucNhamTruyen } from './lucNham';
import { evaluateKyMonTimeMoment, PalaceEvaluation } from './kymonEvaluation';

export interface DirectionAnalysis {
  direction: string;
  palaceNum: number;
  palaceName: string;
  score: number;
  level: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  door: string;
  star: string;
  god: string;
  stemCombo: string;
  stemComboNature?: string;
  reason: string;
  advice: string;
  isFavorable: boolean;
}

export interface CombinedPrognosticationResult {
  overallScore: number;
  overallStars: number;
  overallLevel: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung';
  overallVerdict: string;
  overallTagline: string;

  // Kỳ Môn Section
  kyMon: {
    score: number;
    stars: number;
    level: string;
    verdict: string;
    trucPhu: string;
    trucSu: string;
    cucName: string;
    specialFormations: string[];
    bestDirections: DirectionAnalysis[];
    worstDirections: DirectionAnalysis[];
    allDirections: DirectionAnalysis[];
    suitableActivities: string[];
    unsuitableActivities: string[];
    directionSummary: string;
  };

  // Lục Nhâm Section (3 Giai Đoạn Tam Truyền)
  lucNham: {
    score: number;
    stars: number;
    level: string;
    verdict: string;
    tongMonName: string;
    tongMonDescription: string;
    nguyetTuong: string;
    quyNhanType: string;
    // 3 Giai đoạn tiến trình
    stages: {
      soTruyen: {
        stageName: 'Giai Đoạn 1: Sơ Truyền (Phát Đoan / Khởi Đầu)';
        chi: string;
        thienTuong: string;
        lucThan: string;
        nguHanh: string;
        meaning: string;
        detailedForecast: string;
        isTuanKhong: boolean;
      };
      trungTruyen: {
        stageName: 'Giai Đoạn 2: Trung Truyền (Di Dời / Diễn Biến)';
        chi: string;
        thienTuong: string;
        lucThan: string;
        nguHanh: string;
        meaning: string;
        detailedForecast: string;
        isTuanKhong: boolean;
      };
      matTruyen: {
        stageName: 'Giai Đoạn 3: Mạt Truyền (Quy Túc / Kết Quả)';
        chi: string;
        thienTuong: string;
        lucThan: string;
        nguHanh: string;
        meaning: string;
        detailedForecast: string;
        isTuanKhong: boolean;
      };
    };
    overallProcessAnalysis: string;
    sixAspects: {
      cauTai: string;
      honNhan: string;
      quanVan: string;
      benhTat: string;
      kienTung: string;
      xuatHanh: string;
    };
  };

  // Tổng hợp 2 môn phái
  synthesis: {
    whatToDo: {
      title: string;
      description: string;
      badge: string;
      category: string;
    }[];
    whatNotToDo: {
      title: string;
      description: string;
      badge: string;
      category: string;
    }[];
    favorableDirections: DirectionAnalysis[];
    unfavorableDirections: DirectionAnalysis[];
    optimalActionPlan: {
      corePhilosophy: string;
      timelineRoadmap: {
        beginning: string;
        middle: string;
        ending: string;
      };
      spatialTactics: string;
      tabooAlerts: string;
      masterRecommendation: string;
    };
  };
}

/**
 * Phân tích chi tiết 8 hướng của Bàn Kỳ Môn
 */
function analyzeKyMonDirections(chart: CompleteKyMonChart, palaceEvals: Record<number, PalaceEvaluation>): DirectionAnalysis[] {
  // 8 Cung phương vị (loại trừ Trung Cung 5)
  const directionPalaceOrder = [
    { num: 1, dir: 'Chính Bắc', name: 'Khảm 1' },
    { num: 8, dir: 'Đông Bắc', name: 'Cấn 8' },
    { num: 3, dir: 'Chính Đông', name: 'Chấn 3' },
    { num: 4, dir: 'Đông Nam', name: 'Tốn 4' },
    { num: 9, dir: 'Chính Nam', name: 'Ly 9' },
    { num: 2, dir: 'Tây Nam', name: 'Khôn 2' },
    { num: 7, dir: 'Chính Tây', name: 'Đoài 7' },
    { num: 6, dir: 'Tây Bắc', name: 'Càn 6' },
  ];

  return directionPalaceOrder.map((dp) => {
    const p = chart.palaces[dp.num];
    const ev = palaceEvals[dp.num];
    const score = ev?.score ?? 50;

    let level: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung' = 'Bình Hòa';
    if (score >= 75) level = 'Đại Cát';
    else if (score >= 60) level = 'Cát';
    else if (score <= 35) level = 'Đại Hung';
    else if (score <= 45) level = 'Hung';

    const door = p?.door || 'Đỗ Môn';
    const star = p?.heavenStar || 'Thiên Cầm';
    const god = p?.god || 'Trực Phù';
    const stemCombo = p?.stemComboDetail ? `${p.heavenStem}/${p.earthStem} (${p.stemComboDetail.name})` : `${p?.heavenStem || ''}/${p?.earthStem || ''}`;
    const stemComboNature = p?.stemComboDetail?.nature;

    let reason = '';
    let advice = '';

    if (level === 'Đại Cát' || level === 'Cát') {
      const goodDoors = ['Sinh Môn', 'Khai Môn', 'Hưu Môn'];
      const hasGoodDoor = goodDoors.includes(door);
      reason = `${hasGoodDoor ? `Đắc tam cát môn ${door}` : `Cửa ${door}`}, thần khí ${god} phò hộ. ${ev?.pros?.slice(0, 2).join('. ') || 'Khí trường vượng thịnh.'}`;
      advice = `Thích hợp làm phương vị xuất hành, đàm phán, cầu tài lộc, mở cửa hàng hoặc ngồi hướng về phương này.`;
    } else if (level === 'Hung' || level === 'Đại Hung') {
      reason = `Gặp cửa hung ${door}, hội hợp ${god}. ${ev?.cons?.slice(0, 2).join('. ') || 'Trường khí xung khắc, trở ngại bế tắc.'}`;
      advice = `Không nên khởi hành, động thổ, ký kết hợp đồng hay tìm kiếm nhân sự về phương vị này; nên tránh né hoặc dùng phương án tĩnh tọa.`;
    } else {
      reason = `Khí trường bình ổn, cửa ${door} phối hợp ${god}, hung cát đan xen.`;
      advice = `Có thể tiến hành công việc thường nhật, không nên mạo hiểm thực hiện việc lớn then chốt.`;
    }

    return {
      direction: dp.dir,
      palaceNum: dp.num,
      palaceName: dp.name,
      score,
      level,
      door,
      star,
      god,
      stemCombo,
      stemComboNature,
      reason,
      advice,
      isFavorable: score >= 60,
    };
  });
}

/**
 * Phân tích dự đoán chi tiết cho 3 giai đoạn Lục Nhâm (Sơ - Trung - Mạt Truyền)
 */
function forecastStage(truyen: LucNhamTruyen, stageIndex: 1 | 2 | 3): string {
  const { chi, thienTuong, lucThan, isTuanKhong } = truyen;
  
  if (stageIndex === 1) {
    // Sơ Truyền: Khởi đầu
    let text = `Sự việc bắt đầu từ chi ${chi}, thuộc ${lucThan}, được ${thienTuong} chủ trì. `;
    if (isTuanKhong) {
      text += `Lâm Tuần Không: Điềm báo việc khởi đầu có phần hư ảo, hữu danh vô thực, hoặc nghe ngóng tin tức ban đầu chưa chuẩn xác, chớ vội xuất tiền tài ngay. `;
    }
    if (['Quý Nhân', 'Thanh Long', 'Lục Hợp'].includes(thienTuong)) {
      text += `Khởi đầu rất thuận buồm xuôi gió, có quý nhân chìa tay giúp đỡ, gặp gỡ đối tác hòa nhã, có cơ hội may mắn xuất hiện ngay từ bước đầu.`;
    } else if (['Bạch Hổ', 'Đằng Xà', 'Huyền Vũ'].includes(thienTuong)) {
      text += `Khởi đầu có trắc trở, tâm trạng bồn chồn lo sợ, hoặc có kẻ tiểu nhân dòm ngó, cần kiểm tra thật cẩn thận giấy tờ, hợp đồng và tình trạng pháp lý.`;
    } else if (thienTuong === 'Chu Tước') {
      text += `Khởi sự phát sinh từ thư từ, văn bản, thông báo hoặc có chút khẩu thiệt tranh cãi nhỏ cần tháo gỡ.`;
    } else {
      text += `Khởi đầu diễn ra bình hòa, tuần tự theo kế hoạch, không có đột biến bất ngờ.`;
    }
    return text;
  }

  if (stageIndex === 2) {
    // Trung Truyền: Diễn biến
    let text = `Trong quá trình tiến hành, sự việc chuyển dời sang chi ${chi} (${lucThan}), dưới ảnh hưởng của ${thienTuong}. `;
    if (isTuanKhong) {
      text += `Trung truyền lạc Tuần Không: Đang làm thì bị gián đoạn, đứt gãy mạch nối giữa chừng hoặc đối tác thay lòng đổi ý tạm thời, cần bền chí không bỏ cuộc. `;
    }
    if (['Thanh Long', 'Thái Thường', 'Lục Hợp'].includes(thienTuong)) {
      text += `Tiến trình nhận thêm trợ lực, các khúc mắc dần được khai thông, hợp tác thêm gắn bó, xuất hiện thêm cơ hội mở rộng thuận lợi.`;
    } else if (['Câu Trận', 'Bạch Hổ'].includes(thienTuong)) {
      text += `Giai đoạn giữa dễ gặp trì trệ, chậm trễ lịch hẹn hoặc phát sinh mâu thuẫn tranh cãi, cần hết sức nhẫn nại giải quyết từng nút thắt.`;
    } else if (thienTuong === 'Thiên Không') {
      text += `Giai đoạn giữa có hiện tượng lời hứa suông, ảo tưởng quá mức hoặc tốn kém chi phí phát sinh ngoài dự kiến.`;
    } else {
      text += `Tiến trình tiếp tục chuyển vận theo hướng ổn định, từng bước thích nghi với bối cảnh thực tế.`;
    }
    return text;
  }

  // Mạt Truyền: Kết quả
  let text = `Chung cuộc sự việc quy túc về chi ${chi} (${lucThan}), chịu sự định đoạt của ${thienTuong}. `;
  if (isTuanKhong) {
    text += `Mạt truyền lâm Tuần Không: Kết quả cuối cùng khó trọn vẹn 100% như kỳ vọng ban đầu, hoặc thu hoạch được kinh nghiệm tinh thần nhiều hơn vật chất, sự việc hóa giải thành không. `;
  }
  if (['Quý Nhân', 'Thanh Long', 'Thái Âm', 'Lục Hợp'].includes(thienTuong)) {
    text += `Kết quả đại cát hanh thông, thu được tài lộc, giữ được chữ tín và quan hệ lâu dài, hậu vận an lành viên mãn.`;
  } else if (['Bạch Hổ', 'Huyền Vũ'].includes(thienTuong)) {
    text += `Cần đề phòng hao tổn về sau, tránh kéo dài việc cũ kẻo phát sinh tranh chấp hoặc thất thoát tài chính; đạt được mục tiêu cơ bản nên thu quân giữ mình.`;
  } else if (thienTuong === 'Thái Thường') {
    text += `Kết thúc trong niềm vui sum họp, có tiệc mừng, nhận được sự khen ngợi công nhận từ cấp trên hoặc người thân.`;
  } else {
    text += `Kết quả ở mức bình hòa, bảo toàn được vốn liếng và công sức đã bỏ ra.`;
  }
  return text;
}

/**
 * TỔNG HỢP TOÀN DIỆN HAI HỆ THỐNG KỲ MÔN ĐỘN GIÁP & ĐẠI LỤC NHÂM
 */
export function generateCombinedPrognostication(
  chartKyMon: CompleteKyMonChart,
  chartLucNham: LucNhamChart
): CombinedPrognosticationResult {
  const kmEval = evaluateKyMonTimeMoment(chartKyMon);
  const lnScore = chartLucNham.score;

  // 1. Điểm tổng hợp trọng số: Kỳ Môn (50%) + Lục Nhâm (50%)
  const overallScore = Math.round(kmEval.score * 0.5 + lnScore * 0.5);
  const overallStars = Number(((kmEval.stars + chartLucNham.stars) / 2).toFixed(1));

  let overallLevel: 'Đại Cát' | 'Tiểu Cát' | 'Bình Hòa' | 'Tiểu Hung' | 'Đại Hung' = 'Bình Hòa';
  if (overallScore >= 75) overallLevel = 'Đại Cát';
  else if (overallScore >= 60) overallLevel = 'Tiểu Cát';
  else if (overallScore <= 35) overallLevel = 'Đại Hung';
  else if (overallScore <= 45) overallLevel = 'Tiểu Hung';

  let overallVerdict = '';
  let overallTagline = '';

  if (overallLevel === 'Đại Cát') {
    overallVerdict = 'Thời Không Tương Hợp • Song Thức Đắc Khí • Đại Lợi Khởi Sự';
    overallTagline = 'Kỳ Môn đắc cát môn cát cách, Lục Nhâm Tam Truyền thuận sinh; thời khắc này là Khung Giờ Hoàng Kim để tiến hành việc lớn.';
  } else if (overallLevel === 'Tiểu Cát') {
    overallVerdict = 'Khí Trường Thuận Lợi • Mưu Sự Khả Thành • Chủ Động Nắm Bắt';
    overallTagline = 'Thiên thời địa lợi có phần ưu thế, thích hợp triển khai kế hoạch, đàm phán thương thảo và hành động bài bản.';
  } else if (overallLevel === 'Tiểu Hung') {
    overallVerdict = 'Nội Ẩn Trở Ngại • Thận Trọng Từng Bước • Tránh Khởi Việc Lớn';
    overallTagline = 'Tồn tại xung khắc ngầm giữa môn phái và phương vị, nên giữ thế thủ, cẩn trọng lời ăn tiếng nói và rà soát kỹ lưỡng.';
  } else if (overallLevel === 'Đại Hung') {
    overallVerdict = 'Thời Không Xung Phá • Tam Bàn Bế Tắc • Dĩ Tĩnh Chế Động';
    overallTagline = 'Cả Kỳ Môn và Lục Nhâm đều cảnh báo hung sát, bất lợi cho mọi hành động mạo hiểm; tuyệt đối nên nhẫn nại thủ hộ cựu nghiệp.';
  } else {
    overallVerdict = 'Bình Hòa Ổn Định • Hành Sự Thường Nhật • Chờ Đợi Thời Cơ';
    overallTagline = 'Khí trường trung tính cân bằng, thuận lợi cho việc sinh hoạt thường nhật, tu dưỡng học tập, chưa nên mạo hiểm.';
  }

  // 2. Phân tích 8 hướng Kỳ Môn
  const allDirections = analyzeKyMonDirections(chartKyMon, kmEval.palaceEvaluations);
  const bestDirections = [...allDirections].filter((d) => d.score >= 60).sort((a, b) => b.score - a.score);
  const worstDirections = [...allDirections].filter((d) => d.score < 50).sort((a, b) => a.score - b.score);

  // 3. Phân tích 3 giai đoạn Lục Nhâm
  const st = chartLucNham.tamTruyen[0] || {
    level: 'Sơ Truyền',
    chi: 'Dần',
    thienTuong: 'Quý Nhân',
    thienTuongInfo: {} as any,
    nguHanh: 'Mộc',
    lucThan: 'Phụ Mẫu',
    meaning: 'Khởi đầu',
    isTuanKhong: false,
  };
  const tt = chartLucNham.tamTruyen[1] || {
    level: 'Trung Truyền',
    chi: 'Ngọ',
    thienTuong: 'Thanh Long',
    thienTuongInfo: {} as any,
    nguHanh: 'Hỏa',
    lucThan: 'Tử Tôn',
    meaning: 'Diễn biến',
    isTuanKhong: false,
  };
  const mt = chartLucNham.tamTruyen[2] || {
    level: 'Mạt Truyền',
    chi: 'Tuất',
    thienTuong: 'Thái Thường',
    thienTuongInfo: {} as any,
    nguHanh: 'Thổ',
    lucThan: 'Thê Tài',
    meaning: 'Kết quả',
    isTuanKhong: false,
  };

  const stages = {
    soTruyen: {
      stageName: 'Giai Đoạn 1: Sơ Truyền (Phát Đoan / Khởi Đầu)' as const,
      chi: st.chi,
      thienTuong: st.thienTuong,
      lucThan: st.lucThan,
      nguHanh: st.nguHanh,
      meaning: st.meaning,
      detailedForecast: forecastStage(st, 1),
      isTuanKhong: st.isTuanKhong,
    },
    trungTruyen: {
      stageName: 'Giai Đoạn 2: Trung Truyền (Di Dời / Diễn Biến)' as const,
      chi: tt.chi,
      thienTuong: tt.thienTuong,
      lucThan: tt.lucThan,
      nguHanh: tt.nguHanh,
      meaning: tt.meaning,
      detailedForecast: forecastStage(tt, 2),
      isTuanKhong: tt.isTuanKhong,
    },
    matTruyen: {
      stageName: 'Giai Đoạn 3: Mạt Truyền (Quy Túc / Kết Quả)' as const,
      chi: mt.chi,
      thienTuong: mt.thienTuong,
      lucThan: mt.lucThan,
      nguHanh: mt.nguHanh,
      meaning: mt.meaning,
      detailedForecast: forecastStage(mt, 3),
      isTuanKhong: mt.isTuanKhong,
    },
  };

  // Tổng quan quá trình Lục Nhâm
  const overallProcessAnalysis = `Quẻ đắc ${chartLucNham.tongMonName}: Sự việc khởi đầu từ ${st.chi} (${st.lucThan} - ${st.thienTuong}), qua diễn biến tại ${tt.chi} (${tt.lucThan} - ${tt.thienTuong}), và sau cùng chốt hạ ở ${mt.chi} (${mt.lucThan} - ${mt.thienTuong}). ${chartLucNham.tongMonDescription} Về tổng quan, tiến trình phản ánh mức độ ${chartLucNham.level.toLowerCase()}, ${chartLucNham.summary}`;

  // 4. Kỳ Môn: Việc phù hợp & không phù hợp
  const kmSuitable: string[] = [];
  const kmUnsuitable: string[] = [];

  const trucSuDoor = chartKyMon.trucSuDoor;
  if (['Sinh Môn', 'Khai Môn'].includes(trucSuDoor)) {
    kmSuitable.push('Cầu tài, mở rộng kinh doanh, khai trương văn phòng, đàm phán hợp đồng');
    kmSuitable.push('Khởi sự công việc mới, đón nhận nhân sự hoặc ra mắt sản phẩm');
  } else if (trucSuDoor === 'Hưu Môn') {
    kmSuitable.push('Cầu an, dưỡng sinh, gặp gỡ quý nhân, hàn gắn mối quan hệ và nghỉ ngơi tĩnh tâm');
    kmSuitable.push('Đính ước, dạm ngõ hôn nhân, bàn thảo hợp tác hữu hảo');
  } else if (trucSuDoor === 'Cảnh Môn') {
    kmSuitable.push('Văn thư, quảng bá thương hiệu, hội thảo ra mắt, thi cử phỏng vấn');
  } else if (trucSuDoor === 'Đỗ Môn') {
    kmSuitable.push('Nghiên cứu học thuật chuyên sâu, bảo mật dữ liệu, ẩn mình lập kế hoạch kín đáo');
    kmUnsuitable.push('Khai trương rầm rộ, xuất hành công khai, phát hành thông tin đại chúng');
  } else if (['Tử Môn', 'Kinh Môn', 'Thương Môn'].includes(trucSuDoor)) {
    kmUnsuitable.push('Tránh động thổ, cưới hỏi, ký hợp đồng lớn hay khởi hành đi xa');
    kmUnsuitable.push('Tránh tranh chấp khẩu thiệt, tranh tụng kiện cáo kẻo gặp rắc rối dây dưa');
  }

  // 5. Tổng Hợp Song Thức: NÊN LÀM GÌ & KHÔNG NÊN LÀM GÌ
  const whatToDo: { title: string; description: string; badge: string; category: string }[] = [];
  const whatNotToDo: { title: string; description: string; badge: string; category: string }[] = [];

  // NÊN LÀM
  if (overallScore >= 55) {
    whatToDo.push({
      title: 'Triển khai công việc trọng tâm & Ký kết thỏa thuận',
      description: `Thời không đắc trợ từ Kỳ Môn (${trucSuDoor}) và Lục Nhâm (${st.thienTuong}), rất thích hợp để đưa ra các quyết định quan trọng, xúc tiến hợp tác.`,
      badge: 'Đại Cát',
      category: 'Kinh Doanh & Sự Nghiệp',
    });
  } else {
    whatToDo.push({
      title: 'Duy trì công việc thường nhật & Bảo toàn thực lực',
      description: 'Nên tập trung hoàn thành các hạng mục cũ còn dang dở, rà soát lại quy trình nội bộ, không nên bành trướng quy mô.',
      badge: 'Bình Hòa',
      category: 'Vận Hành',
    });
  }

  if (bestDirections.length > 0) {
    const topDir = bestDirections[0];
    whatToDo.push({
      title: `Khai thác cát phương hướng ${topDir.direction} (${topDir.palaceName})`,
      description: `Phương vị ${topDir.direction} đạt điểm cát ấn tượng (${topDir.score}/100) hội tụ cửa ${topDir.door}, sao ${topDir.star} và thần ${topDir.god}. Nên đặt bàn làm việc hoặc xuất hành theo hướng này.`,
      badge: 'Cát Phương',
      category: 'Phương Vị & Không Gian',
    });
  }

  whatToDo.push({
    title: 'Ứng dụng đạo lý Dĩ Tĩnh Chế Động & Tôn Trọng Tiến Trình',
    description: `Theo Lục Nhâm ${chartLucNham.tongMonName}, việc gì cũng phải trải qua 3 chặng Sơ - Trung - Mạt rõ ràng. Hãy kiên trì từng bước, tôn trọng quy luật tự nhiên, ắt gặt hái thành quả.`,
    badge: 'Tâm Pháp',
    category: 'Chiến Lược',
  });

  // KHÔNG NÊN LÀM
  if (worstDirections.length > 0) {
    const worstDir = worstDirections[0];
    whatNotToDo.push({
      title: `Tránh xuất hành hoặc kích hoạt hướng ${worstDir.direction} (${worstDir.palaceName})`,
      description: `Phương vị ${worstDir.direction} rơi vào thế suy (${worstDir.score}/100), gặp cửa hung ${worstDir.door}. Tránh đặt các sự kiện quan trọng hay khởi hành về hướng này.`,
      badge: 'Hung Phương',
      category: 'Phương Vị Kiêng Kỵ',
    });
  }

  if (['Bạch Hổ', 'Huyền Vũ', 'Đằng Xà'].includes(st.thienTuong) || ['Tử Môn', 'Kinh Môn'].includes(trucSuDoor)) {
    whatNotToDo.push({
      title: 'Tuyệt đối tránh tranh chấp, kiện tụng & Đôi co thị phi',
      description: 'Trường khí có điềm báo khẩu thiệt, mâu thuẫn dễ leo thang thành xung đột pháp lý tốn kém. Hãy lấy chữ Nhẫn làm đầu.',
      badge: 'Đại Kỵ',
      category: 'Nhân Sự & Ứng Xử',
    });
  }

  whatNotToDo.push({
    title: 'Không đầu tư tài chính liều lĩnh hoặc tin vào lời hứa thiếu căn cứ',
    description: 'Tránh các khoản chi tiêu cảm tính hoặc các dự án chưa kiểm chứng rõ ràng về mặt pháp lý và năng lực đối tác.',
    badge: 'Cảnh Báo',
    category: 'Tài Chính',
  });

  // 6. Phương án hành động tối ưu (Master Action Plan)
  const masterRecommendation = `Phương án tối ưu nhất cho thời điểm hiện tại: Về MẶT KHÔNG GIAN, hãy ưu tiên hướng ${bestDirections[0]?.direction || 'Cát Lợi'} để nghênh tiếp sinh khí. Về MẶT THỜI GIAN VÀ TIẾN TRÌNH, tuân thủ chặt chẽ 3 giai đoạn của Lục Nhâm: Bước đầu (${st.chi}) cần kiểm tra thực chứng cẩn trọng, bước giữa (${tt.chi}) kiên định tháo gỡ điểm nghẽn, và bước kết thúc (${mt.chi}) chủ động thu xếp gọn gàng để bảo toàn thắng lợi. Tránh xa các thị phi không đáng có để giữ tâm an trí sáng.`;

  return {
    overallScore,
    overallStars,
    overallLevel,
    overallVerdict,
    overallTagline,

    kyMon: {
      score: kmEval.score,
      stars: kmEval.stars,
      level: kmEval.level,
      verdict: kmEval.verdict,
      trucPhu: chartKyMon.trucPhuStar,
      trucSu: chartKyMon.trucSuDoor,
      cucName: chartKyMon.cucName,
      specialFormations: chartKyMon.specialFormations,
      bestDirections,
      worstDirections,
      allDirections,
      suitableActivities: kmSuitable.length > 0 ? kmSuitable : ['Học tập, tu dưỡng, duy trì công việc hàng ngày'],
      unsuitableActivities: kmUnsuitable.length > 0 ? kmUnsuitable : ['Hạn chế mạo hiểm quyết định nóng vội'],
      directionSummary: `Trong 8 hướng, có ${bestDirections.length} hướng cát lợi đón khí vượng (${bestDirections.map((d) => d.direction).join(', ') || 'Đang chờ chuyển giờ'}) và ${worstDirections.length} hướng mang khí bế tắc cần tránh.`,
    },

    lucNham: {
      score: chartLucNham.score,
      stars: chartLucNham.stars,
      level: chartLucNham.level,
      verdict: chartLucNham.verdict,
      tongMonName: chartLucNham.tongMonName,
      tongMonDescription: chartLucNham.tongMonDescription,
      nguyetTuong: chartLucNham.nguyetTuongName,
      quyNhanType: chartLucNham.quyNhanType,
      stages,
      overallProcessAnalysis,
      sixAspects: chartLucNham.prognostications,
    },

    synthesis: {
      whatToDo,
      whatNotToDo,
      favorableDirections: bestDirections,
      unfavorableDirections: worstDirections,
      optimalActionPlan: {
        corePhilosophy: `Hợp nhất Thiên Thời (Kỳ Môn ${chartKyMon.cucName}) và Nhân Sự (Lục Nhâm ${chartLucNham.tongMonName})`,
        timelineRoadmap: {
          beginning: stages.soTruyen.detailedForecast,
          middle: stages.trungTruyen.detailedForecast,
          ending: stages.matTruyen.detailedForecast,
        },
        spatialTactics: `Đại lợi hướng ${bestDirections[0]?.direction || 'Cát phương'} (Cung ${bestDirections[0]?.palaceName || ''}) đạt ${bestDirections[0]?.score || 70} điểm; Tránh hướng ${worstDirections[0]?.direction || 'Hung phương'} (${worstDirections[0]?.palaceName || ''}) có nhiều sát khí.`,
        tabooAlerts: `Không động thổ hay tiến quân theo hướng ${worstDirections[0]?.direction || 'xung phá'}; không tham gia vào các giao kèo mờ ám hoặc tranh chấp tay đôi.`,
        masterRecommendation,
      },
    },
  };
}
