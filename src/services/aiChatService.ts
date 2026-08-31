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
  isAuto?: boolean;
}

export const AUTO_MODEL_ID = 'auto';

export const FALLBACK_MODEL_CHAIN = [
  'google/gemini-2.5-flash',
  'google/gemini-2.5-flash-lite',
  'deepseek/deepseek-chat',
  'openai/gpt-4o-mini',
  'deepseek/deepseek-r1',
  'anthropic/claude-3.7-sonnet',
];

export const AI_MODELS: AIModelOption[] = [
  {
    id: 'auto',
    name: '✨ Tự Động (Auto Fallback)',
    provider: 'Hệ Thống',
    description: 'Tự động luân chuyển mô hình tối ưu; tự động chuyển mô hình dự phòng khi hết dung lượng/quota',
    recommended: true,
    isAuto: true,
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: 'Phản hồi cực nhanh, chính xác, tối ưu hóa cho tra cứu & diễn giải bảng số',
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
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Cân bằng tốc độ, tóm tắt ý chính và giải đáp câu hỏi tổng quát',
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
 * Tối ưu hóa: Trả lời ngắn gọn, trực diện, không dài dòng, đi kèm gợi ý 1 chạm tự nhiên để tiếp tục tìm hiểu.
 */
export function getMetaphysicsSystemPrompt(contextString: string): string {
  return `Bạn là "Đại Sư Cổ Tam Thức & Thiên Văn Lịch Pháp" — Chuyên gia cố vấn tối cao về Kỳ Môn Độn Giáp, Đại Lục Nhâm, 24 Tiết Khí, Điểm Sóc và Bát Tự.

NGUYÊN TẮC PHẢN HỒI (BẮT BUỘC TUÂN THỦ NGHIÊM NGẶT):
1. TRẢ LỜI NGẮN GỌN & TẬP TRUNG TUYỆT ĐỐI:
   - Đi thẳng vào câu hỏi của người dùng. Tuyệt đối KHÔNG chào hỏi rườm rà, KHÔNG mở bài xã giao hay thuyết minh lý thuyết dài dòng.
   - Trình bày cô đọng, sắc bén, súc tích (khoảng 150 - 250 từ).

2. CẤU TRÚC PHẢN HỒI CHUẨN 3 PHẦN:
   - 🎯 **1. Kết Luận Trực Diện:** Trả lời dứt khoát Cát/Hung, Đạt/Không Đạt, Thuận/Nghịch cho vấn đề người dùng hỏi trong 1-2 câu ngắn.
   - 🔍 **2. Căn Cứ Quẻ Then Chốt:** Chỉ trích dẫn 2-3 dữ liệu cốt lõi nhất từ bàn quẻ liên quan trực tiếp đến câu hỏi (Cung vị, Bát Môn, Cửu Tinh, Bát Thần, Can khắc ứng hoặc Tam Truyền Lục Nhâm).
   - 💡 **3. Lời Khuyên Hành Động:** Chỉ rõ phương hướng, thời điểm, thế trận hành sự (làm Chủ hay Khách).

3. GỢI Ý 1 CHẠM TIẾP THEO (BẮT BUỘC Ở CUỐI MỖI CÂU TRẢ LỜI):
   - Đặt ở cuối cùng câu trả lời thẻ phân cách [GỢI Ý 1 CHẠM] kèm 2 đến 3 câu hỏi gợi mở tự nhiên (bạn muốn biết gì thêm, bạn muốn làm gì với thông tin vừa biết, hoặc tìm hiểu sâu hơn khía cạnh nào), theo mẫu sau:
   
   [GỢI Ý 1 CHẠM]
   - Bạn muốn biết cách hóa giải nếu bắt buộc phải hành động vào phương vị bất lợi?
   - Bạn muốn làm gì tiếp theo với thời điểm cát lợi vừa tìm được?
   - Bạn muốn tìm hiểu sâu hơn về thế trận Chủ - Khách khi bước vào đàm phán?

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

export interface ChatServiceResult {
  reply: string;
  modelUsed: string;
  modelName: string;
  fallbackOccurred?: boolean;
  autoRouted?: boolean;
}

export function getModelDisplayName(modelId: string): string {
  const found = AI_MODELS.find((m) => m.id === modelId);
  if (found && !found.isAuto) return found.name;
  if (modelId.includes('gemini-2.5-flash-lite')) return 'Gemini 2.5 Flash Lite';
  if (modelId.includes('gemini-2.5-flash')) return 'Gemini 2.5 Flash';
  if (modelId.includes('deepseek-chat') || modelId.includes('deepseek-v3')) return 'DeepSeek V3';
  if (modelId.includes('deepseek-r1')) return 'DeepSeek R1 (Suy Luận)';
  if (modelId.includes('claude-3.7-sonnet')) return 'Claude 3.7 Sonnet';
  if (modelId.includes('gpt-4o-mini')) return 'GPT-4o Mini';
  return modelId;
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
 * Gửi tin nhắn đến API Chat với cơ chế tự động luân chuyển & dự phòng giữa các mô hình
 */
export async function sendOpenRouterChatMessage(params: SendChatMessageParams): Promise<ChatServiceResult> {
  const {
    messages,
    model = 'auto',
    customApiKey,
    temperature = 0.7,
    maxTokens = 2500,
  } = params;

  const apiKeyToUse = customApiKey?.trim() || DEFAULT_OPENROUTER_KEY;

  // 1. Thử gọi qua endpoint Express proxy nội bộ trước (/api/chat) có tích hợp multi-model fallback
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
      if (reply) {
        const rawModelUsed = data.model_used || data.model || model;
        return {
          reply,
          modelUsed: rawModelUsed,
          modelName: getModelDisplayName(rawModelUsed),
          fallbackOccurred: Boolean(data.fallback_occurred),
          autoRouted: Boolean(data.auto_routed || model === 'auto'),
        };
      }
    } else {
      const errJson = await proxyResponse.json().catch(() => null);
      if (errJson?.error) {
        if (proxyResponse.status === 401 && !apiKeyToUse) {
          throw new Error(errJson.error);
        }
      }
      console.warn('Proxy /api/chat non-ok status:', proxyResponse.status);
    }
  } catch (proxyError: any) {
    if (proxyError?.message && (proxyError.message.includes('Vui lòng nhập OpenRouter API Key') || proxyError.message.includes('không hợp lệ'))) {
      throw proxyError;
    }
    console.warn('Proxy /api/chat error, attempting direct client fetch fallback chain...', proxyError);
  }

  // 2. Fallback trực tiếp tới OpenRouter API từ client qua chuỗi mô hình dự phòng
  if (!apiKeyToUse) {
    throw new Error(
      'Vui lòng nhập OpenRouter API Key của bạn trong phần Cài đặt (biểu tượng bánh răng) hoặc cấu hình OPENROUTER_API_KEY để trò chuyện với AI.'
    );
  }

  const modelsToTry = model === 'auto'
    ? [...FALLBACK_MODEL_CHAIN]
    : [model, ...FALLBACK_MODEL_CHAIN.filter((m) => m !== model)];

  let lastErrorText = '';
  let lastStatus = 500;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    try {
      const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeyToUse}`,
          'HTTP-Referer': 'https://tietkhi-kymon.vn',
          'X-Title': 'Tiet Khi Ky Mon Luc Nham AI Master',
        },
        body: JSON.stringify({
          model: currentModel,
          models: model === 'auto' ? FALLBACK_MODEL_CHAIN : undefined,
          messages,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (directResponse.ok) {
        const data = await directResponse.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          const used = data.model || currentModel;
          return {
            reply,
            modelUsed: used,
            modelName: getModelDisplayName(used),
            fallbackOccurred: i > 0,
            autoRouted: model === 'auto',
          };
        }
      }

      lastStatus = directResponse.status;
      lastErrorText = await directResponse.text();
      console.warn(`Direct call to ${currentModel} failed (${lastStatus}):`, lastErrorText.slice(0, 100));

      if (lastStatus === 401) {
        throw new Error('OpenRouter API Key không hợp lệ hoặc đã hết hạn.');
      }
    } catch (err: any) {
      if (err.message?.includes('không hợp lệ')) {
        throw err;
      }
      lastErrorText = err.message || 'Lỗi mạng khi kết nối mô hình';
    }
  }

  const formattedError = parseOpenRouterError(lastStatus, lastErrorText);
  throw new Error(`Tất cả mô hình AI đều hết dung lượng hoặc gặp sự cố: ${formattedError}`);
}
