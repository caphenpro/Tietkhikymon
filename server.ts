import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { interpretKyMonWithGemini, KyMonInterpretRequest } from "./server/geminiService";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "10mb" }));

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Skyfield Astronomical & Ky Mon Engine",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Gemini Ky Mon Interpretation Endpoint (Streaming SSE or JSON)
  app.post("/api/gemini/kymon-interpret", async (req, res) => {
    try {
      const payload = req.body as KyMonInterpretRequest;
      const isStream = req.query.stream === "true" || req.headers.accept?.includes("text/event-stream");

      if (!payload || !payload.chartInfo) {
        res.status(400).json({
          error: "Dữ liệu quẻ Kỳ Môn không hợp lệ.",
        });
        return;
      }

      if (isStream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        await interpretKyMonWithGemini(payload, (chunk) => {
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
        });

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      } else {
        const fullResponse = await interpretKyMonWithGemini(payload);
        res.json({
          success: true,
          content: fullResponse,
        });
      }
    } catch (err: unknown) {
      console.error("Gemini Interpretation Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi khi gọi Gemini API.";
      if (!res.headersSent) {
        res.status(500).json({
          error: errorMessage,
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
        res.end();
      }
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
