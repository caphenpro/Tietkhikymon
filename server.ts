import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chat requests might fail.");
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI Chuyên gia Thiên văn Lịch pháp & Kỳ Môn Độn Giáp (Skyfield Precision Astronomical Engine).
Nhiệm vụ của bạn là giải đáp, phân tích và hướng dẫn người dùng về tất cả các khái niệm, thuật ngữ và ngữ cảnh trong ứng dụng:

1. Thiên văn 24 Tiết Khí:
   - Kinh độ Hoàng đạo của Mặt Trời (0° đến 360°), mỗi 15° là một Tiết Khí.
   - Phân biệt Tiết (12 Tiết Lệnh dùng định tháng Bát Tự) và Khí (12 Trung Khí).
   - Ý nghĩa các tiết khí chuyển mùa: Đông Chí, Lập Xuân, Xuân Phân, Lập Hạ, Hạ Chí, Lập Thu, Thu Phân, Lập Đông...
   - Phân bổ 24 Tiết khí vào 8 Cung Hậu Thiên Bát Quái (Khảm 1, Cấn 8, Chấn 3, Tốn 4, Ly 9, Khôn 2, Đoài 7, Càn 6).

2. Lịch Sóc Âm Dương:
   - Điểm Sóc (New Moon): thời điểm giao hội khi hiệu kinh độ Hoàng đạo Mặt Trăng và Mặt Trời bằng 0°.
   - Ngày dương lịch chứa điểm Sóc (theo giờ Việt Nam UTC+7) là ngày Mùng 1 Âm lịch.
   - Xác định Tháng đủ (30 ngày) và Tháng thiếu (29 ngày) dựa vào khoảng cách 2 điểm Sóc liên tiếp.

3. Bát Tự Can Chi (Tứ Trụ):
   - Trụ Năm: Đổi năm mới theo mốc Tiết Lập Xuân (315°), không phải theo Tết Âm lịch hay Tết Dương lịch.
   - Trụ Tháng: Đổi tháng theo 12 Tiết Lệnh (Lập Xuân khởi Dần, Kinh Trập khởi Mão...) kết hợp thuật toán Ngũ Hổ Độn.
   - Trụ Ngày: Chu kỳ 60 Hoa Giáp liên tục.
   - Trụ Giờ: 12 canh giờ kèm thuật toán Ngũ Thử Độn.

4. Kỳ Môn Độn Giáp & Thuật toán Định Cục:
   - Phù Đầu: Ngày Giáp hoặc Kỷ khởi đầu chu kỳ 5 ngày.
   - Tam Nguyên: Thượng Nguyên (Chi Tý, Ngọ, Mão, Dậu), Trung Nguyên (Dần, Thân, Tị, Hợi), Hạ Nguyên (Thìn, Tuất, Sửu, Mùi).
   - Phương pháp Luận Cục "Siêu Thần - Tiếp Khí - Nhuận Cục":
     + Chính Khí: Phù đầu Thượng Nguyên đến đúng ngày Tiết khí (độ lệch 0 ngày).
     + Siêu Thần: Phù đầu Thượng Nguyên đến trước ngày Tiết khí từ 1 đến 9 ngày -> dùng Cục của Tiết khí kế tiếp.
     + Tiếp Khí: Phù đầu Thượng Nguyên đến sau ngày Tiết khí -> dùng Cục của Tiết khí hiện tại.
     + Nhuận Cục: Khi Siêu Thần vượt quá 9 ngày, khí lực quá tải -> tiến hành Nhuận Cục (lặp lại Mang Chủng hoặc Đại Tuyết).
   - Quy luật Dương Độn (từ Đông Chí đến trước Hạ Chí: Cung 1,8,3,4,9,2,7,6 tiến) và Âm Độn (từ Hạ Chí đến trước Đông Chí: lùi).

5. Ngữ cảnh Thời gian thực:
   - Nếu người dùng cung cấp thông tin thời gian tra cứu hiện tại (Tiết khí, Bát Tự, Cục Kỳ Môn, Điểm Sóc), hãy sử dụng thông tin đó để phân tích cụ thể, giải thích vì sao lại ra kết quả như vậy.

Phong cách trả lời:
- Luôn phản hồi bằng tiếng Việt chuẩn xác, uyên bác, trang nhã, dễ hiểu.
- Sử dụng Markdown với tiêu đề rõ ràng, danh sách gạch đầu dòng và điểm nhấn in đậm giúp người đọc nắm bắt nhanh kiến thức.
- Giải thích kết hợp hài hòa giữa cơ sở thiên văn toán học hiện đại và nguyên lý triết học Đông phương cổ điển.`;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "10mb" }));

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Skyfield Ky Mon AI Engine" });
  });

  // API Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, currentContext } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
      }

      const ai = getGenAI();

      // Format conversation history for Gemini API
      // Transform client messages into SDK contents
      const contents = messages.map((m: { role: string; content: string }) => {
        let role = m.role === "assistant" || m.role === "model" ? "model" : "user";
        return {
          role,
          parts: [{ text: m.content }],
        };
      });

      // If context information is provided and this is the latest turn or prompt, inject context
      if (currentContext) {
        const lastIndex = contents.length - 1;
        if (lastIndex >= 0 && contents[lastIndex].role === "user") {
          const originalText = contents[lastIndex].parts[0].text;
          const contextSnippet = `[Ngữ cảnh hệ thống đang hiển thị trên web app:
- Thời gian tra cứu: ${currentContext.formattedDateTime || "Hiện tại"}
- Tiết khí hiện tại: ${currentContext.termName || "Không xác định"} (Kinh độ Mặt Trời: ${currentContext.sunLongitude || "N/A"})
- Phân loại: ${currentContext.termType || "N/A"} (${currentContext.cungName || "N/A"})
- Bát Tự Can Chi: Năm ${currentContext.canChiYear || "N/A"}, Tháng ${currentContext.canChiMonth || "N/A"}, Ngày ${currentContext.canChiDay || "N/A"}, Giờ ${currentContext.canChiHour || "N/A"}
- Phù Đầu hiện tại: ${currentContext.phuDau || "N/A"} (${currentContext.nguyenName || "N/A"})
- Tình trạng Cục: ${currentContext.trangThaiCuc || "N/A"} (Lệch ${currentContext.doLechDays ?? 0} ngày)
- Kết luận Cục Kỳ Môn: ${currentContext.cucKetLuan || "N/A"} (${currentContext.amDuongDon || "N/A"})
- Âm lịch & Điểm Sóc: ${currentContext.lunarInfo || "N/A"}]

Câu hỏi của người dùng:
${originalText}`;
          contents[lastIndex].parts[0].text = contextSnippet;
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

      const replyText = response.text || "Xin lỗi, hiện tại tôi chưa thể đưa ra câu trả lời. Vui lòng thử lại.";

      return res.json({
        role: "model",
        content: replyText,
      });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      return res.status(500).json({
        error: "Lỗi xử lý câu hỏi từ máy chủ AI.",
        details: error?.message || String(error),
      });
    }
  });

  // Vite development middleware vs Static Production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Skyfield Engine Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
