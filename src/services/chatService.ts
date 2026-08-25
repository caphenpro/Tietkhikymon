import { GoogleGenAI } from '@google/genai';
import { ChatMessage, ChatContextPayload } from '../types';
import { generateSmartLocalResponse, ContextInfo } from './offlineKnowledge';

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI Chuyên gia Thiên văn Lịch pháp & Kỳ Môn Độn Giáp (Skyfield Precision Astronomical Engine).
Nhiệm vụ của bạn là giải đáp, phân tích và hướng dẫn người dùng về tất cả các khái niệm, thuật ngữ và ngữ cảnh trong ứng dụng:
1. Thiên văn 24 Tiết Khí (Kinh độ Mặt Trời, 12 Tiết Lệnh, 12 Trung Khí, 8 Cung Bát Quái).
2. Lịch Sóc Âm Dương (Điểm Sóc New Moon, ngày Mùng 1, Tháng đủ/thiếu).
3. Bát Tự Tứ Trụ (Trụ Năm đổi theo Lập Xuân, Trụ Tháng theo Tiết Lệnh & Ngũ Hổ Độn, Trụ Giờ theo Ngũ Thử Độn).
4. Kỳ Môn Độn Giáp (Phù Đầu Giáp/Kỷ, Tam Nguyên, Siêu Thần - Tiếp Khí - Nhuận Cục, Dương Độn/Âm Độn).
5. Phân tích cụ thể ngữ cảnh thời gian thực tế người dùng đang tra cứu.
Luôn phản hồi bằng tiếng Việt trang nhã, chính xác, sử dụng định dạng Markdown rõ ràng.`;

export async function requestChatResponse(
  messages: { role: string; content: string }[],
  currentContext?: ChatContextPayload
): Promise<string> {
  const latestUserPrompt =
    messages[messages.length - 1]?.content || 'Xin chào';

  // 1. First, try backend API endpoint (/api/chat) or Netlify functions
  const apiEndpoints = ['/api/chat', '/.netlify/functions/chat'];
  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          currentContext,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          return data.content;
        }
      }
    } catch (_err) {
      // Try next endpoint or fall back
    }
  }

  // 2. Second, try client-side Gemini if API key is in environment
  const clientApiKey =
    (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_GEMINI_API_KEY) ||
    (typeof process !== 'undefined' && process?.env?.GEMINI_API_KEY) ||
    '';

  if (clientApiKey && clientApiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({
        apiKey: clientApiKey,
      });

      const contents = messages.map((m) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Inject context into latest message
      if (currentContext && contents.length > 0) {
        const last = contents[contents.length - 1];
        if (last.role === 'user') {
          const contextSnippet = `[Ngữ cảnh hệ thống:
- Thời gian: ${currentContext.formattedDateTime || 'Hiện tại'}
- Tiết khí: ${currentContext.termName || 'N/A'} (Kinh độ: ${currentContext.sunLongitude || 'N/A'})
- Bát Tự: Năm ${currentContext.canChiYear || 'N/A'}, Tháng ${currentContext.canChiMonth || 'N/A'}, Ngày ${currentContext.canChiDay || 'N/A'}, Giờ ${currentContext.canChiHour || 'N/A'}
- Phù Đầu: ${currentContext.phuDau || 'N/A'} (${currentContext.nguyenName || 'N/A'})
- Tình trạng: ${currentContext.trangThaiCuc || 'N/A'} (Lệch ${currentContext.doLechDays ?? 0} ngày)
- Kết luận Cục: ${currentContext.cucKetLuan || 'N/A'} (${currentContext.amDuongDon || 'N/A'})]

Câu hỏi: ${last.parts[0].text}`;
          last.parts[0].text = contextSnippet;
        }
      }

      const res = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (res.text) {
        return res.text;
      }
    } catch (clientGeminiError) {
      console.warn('Client-side Gemini API call error:', clientGeminiError);
    }
  }

  // 3. Third, High-Precision Local Knowledge and Astronomical Reasoning Engine
  // This guarantees the chatbot always works reliably even on static hosts (Netlify, GitHub Pages, etc.)
  return generateSmartLocalResponse(latestUserPrompt, currentContext as ContextInfo);
}
