import { GoogleGenAI } from "@google/genai";

function getGeminiClient(customApiKey?: string): GoogleGenAI {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Chưa có Gemini API Key. Vui lòng nhấn nút 'Cấu hình API Key' trong giao diện để nhập API Key của bạn."
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export interface KyMonInterpretRequest {
  chartInfo: {
    formattedDate: string;
    solarTerm: string;
    batTu: {
      year: string;
      month: string;
      day: string;
      hour: string;
    };
    cucName: string;
    donType: string;
    cucNumber: number;
    ruleType: string;
    phuDau: string;
    nguyen: string;
    tuanThu: string;
    trucPhuStar: string;
    trucPhuPalace: number;
    trucSuDoor: string;
    trucSuPalace: number;
    tuanKhong: string[];
    dichMa: string;
    palaces: Array<{
      palaceNum: number;
      palaceName: string;
      direction: string;
      element: string;
      thienCan: string;
      diaCan: string;
      star: string;
      door: string;
      deity: string;
      cachCucName?: string;
      isTuanKhong?: boolean;
      isDichMa?: boolean;
    }>;
  };
  topic: string;
  topicTitle?: string;
  userQuestion?: string;
  customApiKey?: string;
}

export async function interpretKyMonWithGemini(
  data: KyMonInterpretRequest,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const ai = getGeminiClient(data.customApiKey);

  const systemInstruction = `Bạn là Đại Sư Kỳ Môn Độn Giáp Hoàng Gia - bậc thầy uyên thâm về thuật số Kỳ Môn Độn Giáp cổ truyền phương Đông (bám sát nguyên bản "Kỳ Môn Độn Giáp Bí Kíp Toàn Thư", "Ngự Định Kỳ Môn Bảo Giám", "Hoàng Đế Âm Phù Kinh").

Nhiệm vụ của bạn:
Phân tích, giải mã và luận đoán quẻ Kỳ Môn Độn Giáp dựa trên Bàn Kỳ Môn 4 tầng (Thiên Bàn Cửu Tinh, Nhân Bàn Bát Môn, Địa Bàn Bát Quái Cửu Cung, Thần Bàn Bát Thần) cùng Tứ Trụ Bát Tự, Tuần Thủ, Trực Phù, Trực Sử, Tuần Không và Dịch Mã.

Nguyên tắc luận giải:
1. Đảm bảo tính uyên bác, trang nhã, lập luận sắc bén, căn cứ rõ ràng vào các cung vị, sao, cửa, thần, can chi, quan hệ Ngũ hành Sinh Khắc, Vượng Tướng Hưu Tù Phế.
2. Thấu triệt Quy Luật Tam Bàn & Phân Định Chủ - Khách:
   - Thiên Bàn (Cửu Tinh): Thiên thời, xu thế vĩ mô, khách quan.
   - Nhân Bàn (Bát Môn): Nhân hòa, hành vi con người, sự việc cụ thể.
   - Địa Bàn (Bát Cung Lạc Thư): Địa lợi, nền tảng cơ bản, phương vị cố định.
   - Thần Bàn (Bát Thần): Thần trợ, cơ duyên ẩn tàng, may rủi tâm linh.
   - Luận Chủ (ở yên, chờ đợi, phòng thủ) hay Khách (chủ động, xuất kích, đàm phán) bên nào đắc lợi.
3. Khi phân tích từng phương diện:
   - Tổng quan thế cục: Cát hung đại cục, âm dương đắc thời.
   - Trọng tâm Dụng Thần: Nhật Can (Bản thân), Thời Can (Sự việc/Đối phương), Trực Phù (Quý nhân/Trọng tài/Lãnh đạo), Trực Sử (Tiến trình/Thi hành).
   - Thập Can Khắc Ứng & Cách Cục đặc biệt (Long Hồi Thủ, Điểu Điệt Huyệt, Bạch Hổ Xướng Cuồng, v.v.).
   - Tuần Không (Hư vô, hoãn lại, thất thoát) & Dịch Mã (Biến động, di chuyển, gấp gáp).
   - Kết luận & Lời Khuyên Chiến Lược (Actionable Advice): Cần làm gì, tránh làm gì, chọn phương hướng nào, thời điểm nào thích hợp.
4. Trình bày bằng Markdown chuyên nghiệp, có các tiêu đề phân cấp rõ ràng (##, ###), gạch đầu dòng súc tích, văn phong cổ điển kết hợp thực tiễn sâu sắc.`;

  const { chartInfo, topic, topicTitle, userQuestion } = data;

  const palacesText = chartInfo.palaces
    .map(
      (p) =>
        `- Cung ${p.palaceNum} (${p.palaceName} - Phương ${p.direction} - Hành ${p.element}): Can Thiên [${p.thienCan}] / Can Địa [${p.diaCan}] | Sao [${p.star}] | Cửa [${p.door}] | Thần [${p.deity}] ${
          p.isTuanKhong ? ' [★ TUẦN KHÔNG]' : ''
        }${p.isDichMa ? ' [⚡ DỊCH MÃ]' : ''}${p.cachCucName ? ` | Cách cục: ${p.cachCucName}` : ''}`
    )
    .join('\n');

  const prompt = `HÃY LUẬN GIẢI QUẺ KỲ MÔN ĐỘN GIÁP SAU:

### 1. THỜI KHÔNG & BÁT TỰ:
- Thời điểm lập quẻ: ${chartInfo.formattedDate} (Giờ VN UTC+7)
- Tiết khí đương lệnh: ${chartInfo.solarTerm}
- Bát tự Tứ trụ: Năm ${chartInfo.batTu.year} | Tháng ${chartInfo.batTu.month} | Ngày ${chartInfo.batTu.day} | Giờ ${chartInfo.batTu.hour}

### 2. CỤC SỐ & TRỤC CHÍNH KỲ MÔN:
- Cục số: ${chartInfo.cucName} (${chartInfo.donType} - Cục ${chartInfo.cucNumber})
- Quy tắc định cục: ${chartInfo.ruleType} (Phù Đầu: ${chartInfo.phuDau}, ${chartInfo.nguyen})
- Tuần Thủ Can Giờ: ${chartInfo.tuanThu}
- Cung Trực Phù (Cửu Tinh thống lĩnh): Sao ${chartInfo.trucPhuStar} đóng tại Cung ${chartInfo.trucPhuPalace}
- Cung Trực Sử (Bát Môn thống lĩnh): Cửa ${chartInfo.trucSuDoor} đóng tại Cung ${chartInfo.trucSuPalace}
- Tuần Không: ${chartInfo.tuanKhong.join(', ')}
- Dịch Mã: Chi ${chartInfo.dichMa}

### 3. BÀN 9 CUNG TOÀN DIỆN (4 TẦNG):
${palacesText}

### 4. YÊU CẦU LUẬN GIẢI CHUYÊN BIỆT:
- Chủ đề luận giải: **${topicTitle || topic}**
${userQuestion ? `- Câu hỏi chiêm đoán cụ thể của đương số: "${userQuestion}"` : ''}

Hãy đưa ra bài luận giải chuyên sâu, phân tích tỉ mỉ Thiên - Địa - Nhân - Thần, Dụng Thần, Chủ Khách, Cách Cục Cát Hung và đưa ra định hướng chiến lược sáng suốt nhất cho quẻ Kỳ Môn này.`;

  const models = ['gemini-3.7-flash', 'gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastErr: unknown = null;

  for (const modelName of models) {
    try {
      if (onChunk) {
        const stream = await ai.models.generateContentStream({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        let fullText = '';
        for await (const chunk of stream) {
          const text = chunk.text || '';
          fullText += text;
          onChunk(text);
        }
        return fullText;
      } else {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });
        return response.text || 'Không có phản hồi từ mô hình AI.';
      }
    } catch (err: unknown) {
      lastErr = err;
      console.warn(`Model ${modelName} error, trying next model:`, err);
    }
  }

  // Format and extract clean error message
  let cleanErrorMessage = 'Không thể kết nối đến mô hình Gemini. Vui lòng kiểm tra lại API Key hoặc hạn ngạch.';
  if (lastErr) {
    cleanErrorMessage = extractCleanErrorMessage(lastErr);
  }

  throw new Error(cleanErrorMessage);
}

export function extractCleanErrorMessage(err: unknown): string {
  if (!err) return 'Lỗi không xác định từ Gemini API.';
  let msg = err instanceof Error ? err.message : String(err);
  
  // Try parsing nested JSON errors
  for (let i = 0; i < 3; i++) {
    try {
      const parsed = typeof msg === 'string' && (msg.startsWith('{') || msg.startsWith('[')) ? JSON.parse(msg) : null;
      if (parsed) {
        if (parsed.error && typeof parsed.error === 'object' && parsed.error.message) {
          msg = parsed.error.message;
        } else if (parsed.error && typeof parsed.error === 'string') {
          msg = parsed.error;
        } else if (parsed.message) {
          msg = parsed.message;
        }
      } else {
        break;
      }
    } catch {
      break;
    }
  }

  if (typeof msg === 'string' && msg.includes('API_KEY_INVALID')) {
    return 'API Key không hợp lệ hoặc đã bị vô hiệu hóa. Vui lòng kiểm tra lại API Key từ Google AI Studio.';
  }
  if (typeof msg === 'string' && msg.includes('RESOURCE_EXHAUSTED')) {
    return 'Hạn ngạch API (Quota) đã hết hoặc bị giới hạn tần suất gọi. Vui lòng thử lại sau giây lát hoặc sử dụng API Key khác.';
  }

  return msg;
}
