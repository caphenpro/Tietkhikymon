import { ComprehensiveResult } from '../types';
import { buildCompleteKyMonChart } from '../astronomy/kymonChart';
import { buildLucNhamChart } from '../astronomy/lucNham';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

export interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  isPro?: boolean;
  recommended?: boolean;
}

export const AI_MODELS: AIModelOption[] = [
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'Phản hồi cực nhanh, chính xác, tối ưu hóa cho tra cứu & diễn giải bảng số',
    recommended: true,
  },
  {
    id: 'google/gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    provider: 'Google',
    description: 'Phiên bản siêu nhẹ, tiết kiệm tài nguyên, tốc độ tức thì',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    description: 'Mô hình toàn năng mạnh mẽ, am hiểu sâu sắc văn hóa và triết học phương Đông',
  },
  {
    id: 'deepseek/deepseek-r1',
    name: 'DeepSeek R1 (Suy Luận)',
    provider: 'DeepSeek',
    description: 'Tư duy logic bước-từng-bước, bóc tách chuỗi quan hệ sinh khắc tỉ mỉ',
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    description: 'Văn phong mạch lạc, học thuật, phân tích nhân sự & triết lý uyển chuyển',
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Cân bằng tốc độ, tóm tắt ý chính và giải đáp câu hỏi tổng quát',
  },
];

export const DEFAULT_OPENROUTER_KEY = '';

/**
 * Tạo dữ liệu ngữ cảnh phong phú từ state ứng dụng (Thiên Văn, Tiết Khí, Bát Tự, Kỳ Môn 9 Cung, Lục Nhâm)
 */
export function buildCosmicSystemContext(result: ComprehensiveResult, currentDate: Date): string {
  const vnTimeStr = formatVietnamDateTime(currentDate);

  const [dayCan, dayChi] = result.batTu.dayCanChi.split(' ');
  const [hourCan, hourChi] = result.batTu.hourCanChi.split(' ');
  const vnDate = new Date(currentDate.getTime() + 7 * 3600 * 1000);
  const localHour = vnDate.getUTCHours();

  // Tính toán bàn Kỳ Môn đầy đủ
  const kyMonChart = buildCompleteKyMonChart(
    result.kyMon.isDuongDon,
    result.kyMon.cucNumber,
    dayCan || 'Giáp',
    dayChi || 'Tý',
    hourCan || 'Giáp',
    hourChi || 'Tý'
  );

  // Tính toán bàn Đại Lục Nhâm đầy đủ
  const lucNhamChart = buildLucNhamChart(
    result.solarLongitude,
    result.batTu.dayCanChi,
    result.batTu.hourCanChi,
    localHour
  );

  // Chi tiết 9 Cung Kỳ Môn
  const kymonPalacesSummary = Object.values(kyMonChart.palaces)
    .map((p) => {
      const isTrucPhu = p.palaceNum === kyMonChart.trucPhuNewPalace;
      const isTrucSu = p.palaceNum === kyMonChart.trucSuNewPalace;
      const markers = [
        isTrucPhu ? '[TRỰC PHÙ ĐÁO]' : '',
        isTrucSu ? '[TRỰC SỬ ĐÁO]' : '',
        p.isTuanKhong ? '[TUẦN KHÔNG]' : '',
        p.isDichMa ? '[DỊCH MÃ]' : '',
        p.isLocVi ? '[LỘC VỊ]' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `  - Cung ${p.palaceNum} (${p.palaceName} - ${p.direction} - Hành ${p.element}) ${markers}:
      * Thần: ${p.god}
      * Sao (Cửu Tinh): ${p.heavenStar}
      * Cửa (Bát Môn): ${p.door}
      * Thiên Can: ${p.heavenStem}${p.heavenStem2 ? ' + ' + p.heavenStem2 : ''} | Địa Can: ${p.earthStem}${p.earthStem2 ? ' + ' + p.earthStem2 : ''}
      * Cách cục: ${p.formations.length > 0 ? p.formations.join('; ') : 'Bình hòa'}
      * Tóm lược: ${p.summary}`;
    })
    .join('\n');

  // Chi tiết Tứ Khoa & Tam Truyền Lục Nhâm
  const tuKhoaSummary = lucNhamChart.tuKhoa
    .map(
      (k) =>
        `  - ${k.name} (${k.role}): Thượng thần [${k.thuongThan} - ${k.thuongNguHanh}] cư Hạ thần [${k.haThan} - ${k.haNguHanh}] • Quan hệ: ${k.relation} • Thần tướng: ${k.thienTuong}`
    )
    .join('\n');

  const tamTruyenSummary = lucNhamChart.tamTruyen
    .map(
      (t) =>
        `  - ${t.level}: Chi [${t.chi}] • Lục Thân: [${t.lucThan}] • Thiên Tướng: [${t.thienTuong}] (${t.thienTuongInfo.nature} - ${t.thienTuongInfo.element}) • Ngũ Hành: ${t.nguHanh} • Ý nghĩa: ${t.meaning}`
    )
    .join('\n');

  return `=== DỮ LIỆU THIÊN VĂN & BÀN QUẺ THỜI GIAN THỰC ĐANG HIỂN THỊ TRÊN ỨNG DỤNG ===
1. THỜI ĐIỂM CHIÊM QUẺ:
- Dương lịch (Giờ chuẩn VN UTC+7): ${vnTimeStr}
- Âm lịch: Ngày ${result.newMoon.lunarDay} tháng ${result.newMoon.lunarMonth}${
    result.newMoon.isLeapMonth ? ' (Nhuận)' : ''
  } năm ${result.newMoon.lunarYearCanChi}
- Điểm Sóc (Trăng mới) gần nhất: ${formatVietnamDateTime(result.newMoon.prevSocDate)} (${result.newMoon.prevPassedString})
- Điểm Sóc kế tiếp: ${formatVietnamDateTime(result.newMoon.nextSocDate)} (${result.newMoon.nextRemainingString})

2. TỨ TRỤ BÁT TỰ:
- Năm: ${result.batTu.yearCanChi}
- Tháng: ${result.batTu.monthCanChi}
- Ngày: ${result.batTu.dayCanChi} (Nhật Can: ${result.batTu.dayCanChi.split(' ')[0]})
- Giờ: ${result.batTu.hourCanChi} (Thời Chi: ${result.batTu.hourCanChi.split(' ')[1]})

3. 24 TIẾT KHÍ THIÊN VĂN (VSOP87 / ELP2000):
- Tiết khí hiện tại: ${result.currentTerm.name} (${result.currentTerm.category}, Kinh độ Mặt Trời: ${result.solarLongitudeDMS})
- Thời điểm giao tiết: ${formatVietnamDateTime(result.currentTerm.startDate)} (${result.currentTerm.passedString})
- Tiết khí kế tiếp: ${result.nextTerm.name} (vào ${formatVietnamDateTime(result.nextTerm.startDate)})

4. BÀN KỲ MÔN ĐỘN GIÁP (SIÊU THẦN TIẾP KHÍ & LẠC THƯ 9 CUNG):
- Thể loại độn: ${result.kyMon.donType}
- Cục số: ${result.kyMon.cucNumber} (${result.kyMon.cucResultText})
- Nguyên: ${result.kyMon.nguyen} | Phù Đầu Can Chi: ${result.kyMon.currentPhuDauCanChi}
- Quy tắc định cục: ${result.kyMon.ruleType}
- Trực Phù (Cửu Tinh chỉ huy): ${kyMonChart.trucPhuStar} (Cung gốc: ${kyMonChart.trucPhuPalace} -> Thiên Bàn đáo Cung ${kyMonChart.trucPhuNewPalace})
- Trực Sử (Bát Môn hành sự): ${kyMonChart.trucSuDoor} (Cung gốc: ${kyMonChart.trucSuPalace} -> Nhân Bàn đáo Cung ${kyMonChart.trucSuNewPalace})
- Tuần Thủ: ${kyMonChart.tuanThuGiap} (${kyMonChart.tuanThuCan}) | Tuần Không: ${kyMonChart.tuanKhongChi.join(', ')} | Dịch Mã: ${kyMonChart.dichMaChi}
- Chi tiết 9 Cung Kỳ Môn:
${kymonPalacesSummary}

5. BÀN ĐẠI LỤC NHÂM (TAM TRUYỀN & TỨ KHOA):
- Nguyệt Tướng: ${lucNhamChart.nguyetTuongName} (${lucNhamChart.nguyetTuongChi}) lâm Thời Chi ${lucNhamChart.hourChi}
- Quý Nhân: ${lucNhamChart.quyNhanType} tại ${lucNhamChart.quyNhanChi} (Hành trình ${lucNhamChart.quyNhanDirection})
- Tông Môn (Cửu Tông Môn): ${lucNhamChart.tongMonName} (${lucNhamChart.tongMonDescription})
- Điểm Cát Hung: ${lucNhamChart.score}/100 ⭐ (${lucNhamChart.level})
- Tứ Khoa:
${tuKhoaSummary}
- Tam Truyền:
${tamTruyenSummary}
- Thần Sát: Lộc Thần (${lucNhamChart.thanSat.locThan}), Dịch Mã (${lucNhamChart.thanSat.dichMa}), Dương Nhận (${lucNhamChart.thanSat.duongNhan})
- Tóm tắt sơ bộ từ cổ thư: ${lucNhamChart.verdict}
========================================================================`;
}

/**
 * System Instruction cao cấp cho AI Chuyên Gia Luận Đoán Cổ Thuật
 * Tối ưu hóa: Trả lời ngắn gọn, trực diện, không dài dòng, đi kèm gợi ý dẫn chuyện chuyên môn sâu sắc.
 */
export function getMetaphysicsSystemPrompt(contextString: string): string {
  return `Bạn là "Đại Sư Cổ Tam Thức & Thiên Văn Lịch Pháp" — Chuyên gia cố vấn tối cao về Kỳ Môn Độn Giáp, Đại Lục Nhâm, 24 Tiết Khí, Điểm Sóc và Bát Tự.

NGUYÊN TẮC PHẢN HỒI (BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT):
1. TRẢ LỜI NGẮN GỌN & TẬP TRUNG TUYỆT ĐỐI:
   - Đi thẳng vào câu hỏi của người dùng. Tuyệt đối KHÔNG chào hỏi rườm rà, KHÔNG mở bài xã giao hay thuyết minh lý thuyết dài dòng.
   - Trình bày cô đọng, sắc bén, súc tích (khoảng 150 - 300 từ cho phần luận giải chính).

2. CẤU TRÚC PHẢN HỒI CHUẨN 3 PHẦN:
   - 🎯 **1. Kết Luận Trực Diện (Trọng Tâm):** Trả lời dứt khoát Cát/Hung, Đạt/Không Đạt, Thuận/Nghịch cho vấn đề người dùng hỏi trong 1-2 câu.
   - 🔍 **2. Căn Cứ Quẻ Then Chốt:** Chỉ trích dẫn 2-3 dữ liệu cốt lõi nhất từ bàn quẻ liên quan trực tiếp đến câu hỏi (Ví dụ: Cung vị, Bát Môn, Cửu Tinh, Bát Thần, Can khắc ứng, hoặc Tam Truyền Lục Nhâm). Không dàn trải cả 9 cung.
   - 💡 **3. Lời Khuyên Hành Động:** Chỉ rõ phương hướng, thời điểm, thế trận hành sự (làm Chủ hay Khách).

3. GỢI Ý MỞ RỘNG CHUYÊN MÔN & DẪN CHUYỆN (BẮT BUỘC Ở CUỐI MỖI CÂU TRẢ LỜI):
   - Luôn kết thúc câu trả lời bằng phần danh sách 2 đến 3 câu hỏi/chủ đề dẫn dắt mở rộng sang các khía cạnh chuyên môn sâu sắc liên quan, tuân thủ đúng định dạng:
   
   🔮 **Gợi ý mở rộng chuyên môn & Dẫn chuyện tiếp theo:**
   - ➡️ [Khía cạnh chuyên môn 1]: Câu hỏi gợi ý mở rộng cụ thể (Ví dụ: kiểm tra rủi ro pháp lý Cung Cảnh Môn, tiến độ Lục Nhâm Tam Truyền, phong thủy xuất hành,...)
   - ➡️ [Khía cạnh chuyên môn 2]: Câu hỏi gợi ý mở rộng cụ thể...
   - ➡️ [Khía cạnh chuyên môn 3]: Câu hỏi gợi ý mở rộng cụ thể...

4. BẢO ĐẢM TÍNH CHÍNH XÁC THỜI GIAN THỰC:
   - Sử dụng chính xác dữ liệu từ [DỮ LIỆU THIÊN VĂN & BÀN QUẺ THỜI GIAN THỰC] bên dưới để đối chiếu.

${contextString}`;
}

export interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface SendChatMessageParams {
  messages: ChatCompletionRequestMessage[];
  model?: string;
  customApiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Format OpenRouter error message cleanly for users
 */
function parseOpenRouterError(status: number, rawText: string): string {
  try {
    const json = JSON.parse(rawText);
    if (json.error?.message) {
      if (json.error.message.includes('requires more credits') || json.error.message.includes('max_tokens')) {
        return 'Tài khoản yêu cầu giảm giới hạn token hoặc bổ sung credits. Hệ thống đã tự động tối ưu token đầu ra.';
      }
      return json.error.message;
    }
  } catch {
    // raw text
  }
  return `Lỗi kết nối OpenRouter API (${status}): ${rawText}`;
}

/**
 * Gửi tin nhắn đến API Chat (thông qua server Express proxy hoặc fallback direct)
 */
export async function sendOpenRouterChatMessage(params: SendChatMessageParams): Promise<string> {
  const {
    messages,
    model = 'google/gemini-2.5-flash',
    customApiKey,
    temperature = 0.7,
    maxTokens = 2500,
  } = params;

  const apiKeyToUse = customApiKey?.trim() || DEFAULT_OPENROUTER_KEY;

  // 1. Thử gọi qua endpoint Express proxy nội bộ trước (/api/chat)
  try {
    const proxyResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model,
        temperature,
        max_tokens: maxTokens,
        apiKey: apiKeyToUse || undefined,
      }),
    });

    if (proxyResponse.ok) {
      const data = await proxyResponse.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) return reply;
    } else {
      const errJson = await proxyResponse.json().catch(() => null);
      if (errJson?.error) {
        // If it's a known auth or config error from server, pass it along
        if (proxyResponse.status === 401 && !apiKeyToUse) {
          throw new Error(errJson.error);
        }
      }
      console.warn('Proxy /api/chat non-ok status:', proxyResponse.status);
    }
  } catch (proxyError: any) {
    if (proxyError?.message && proxyError.message.includes('Vui lòng nhập OpenRouter API Key')) {
      throw proxyError;
    }
    console.warn('Proxy /api/chat error, attempting direct client fetch fallback...', proxyError);
  }

  // 2. Fallback trực tiếp tới OpenRouter API từ client (nếu có API Key)
  if (!apiKeyToUse) {
    throw new Error(
      'Vui lòng nhập OpenRouter API Key của bạn trong phần Cài đặt (biểu tượng bánh răng) hoặc cấu hình OPENROUTER_API_KEY để trò chuyện với AI.'
    );
  }

  const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKeyToUse}`,
      'HTTP-Referer': 'https://tietkhi-kymon.vn',
      'X-Title': 'Tiet Khi Ky Mon Luc Nham AI Master',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!directResponse.ok) {
    const errorText = await directResponse.text();
    const formattedError = parseOpenRouterError(directResponse.status, errorText);
    throw new Error(formattedError);
  }

  const data = await directResponse.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('AI không trả về nội dung hợp lệ. Vui lòng thử lại.');
  }

  return reply;
}
