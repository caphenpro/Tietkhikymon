import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI Chuyên gia Thiên văn Lịch pháp & Kỳ Môn Độn Giáp (Skyfield Precision Astronomical Engine).
Nhiệm vụ của bạn là giải đáp, phân tích và hướng dẫn người dùng về tất cả các khái niệm, thuật ngữ và ngữ cảnh trong ứng dụng:
1. Thiên văn 24 Tiết Khí (Kinh độ Mặt Trời, 12 Tiết Lệnh, 12 Trung Khí, 8 Cung Bát Quái).
2. Lịch Sóc Âm Dương (Điểm Sóc New Moon, ngày Mùng 1, Tháng đủ/thiếu).
3. Bát Tự Tứ Trụ (Trụ Năm đổi theo Lập Xuân, Trụ Tháng theo Tiết Lệnh & Ngũ Hổ Độn, Trụ Giờ theo Ngũ Thử Độn).
4. Kỳ Môn Độn Giáp (Phù Đầu Giáp/Kỷ, Tam Nguyên, Siêu Thần - Tiếp Khí - Nhuận Cục, Dương Độn/Âm Độn).
5. Phân tích cụ thể ngữ cảnh thời gian thực tế người dùng đang tra cứu.
Luôn phản hồi bằng tiếng Việt trang nhã, chính xác, sử dụng định dạng Markdown rõ ràng.`;

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { messages, currentContext } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing GEMINI_API_KEY environment variable on Netlify" }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = (messages || []).map((m: any) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (currentContext && contents.length > 0) {
      const last = contents[contents.length - 1];
      if (last.role === "user") {
        last.parts[0].text = `[Ngữ cảnh hệ thống:
- Thời gian: ${currentContext.formattedDateTime || "Hiện tại"}
- Tiết khí: ${currentContext.termName || "N/A"} (${currentContext.sunLongitude || "N/A"})
- Bát Tự: Năm ${currentContext.canChiYear || "N/A"}, Tháng ${currentContext.canChiMonth || "N/A"}, Ngày ${currentContext.canChiDay || "N/A"}, Giờ ${currentContext.canChiHour || "N/A"}
- Phù Đầu: ${currentContext.phuDau || "N/A"} (${currentContext.nguyenName || "N/A"})
- Tình trạng: ${currentContext.trangThaiCuc || "N/A"} (Lệch ${currentContext.doLechDays ?? 0} ngày)
- Kết luận: ${currentContext.cucKetLuan || "N/A"} (${currentContext.amDuongDon || "N/A"})]

Câu hỏi: ${last.parts[0].text}`;
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "model",
        content: response.text || "Không có phản hồi từ máy chủ.",
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error?.message || "Lỗi xử lý AI" }),
    };
  }
};
