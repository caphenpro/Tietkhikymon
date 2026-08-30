import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

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
    });
  });

  // OpenRouter AI Chat Proxy Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const {
        messages,
        model = "google/gemini-2.5-flash",
        temperature = 0.7,
        max_tokens = 2500,
        apiKey: customApiKey,
      } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array is required" });
      }

      const activeApiKey =
        customApiKey?.trim() ||
        process.env.OPENROUTER_API_KEY?.trim();

      if (!activeApiKey) {
        return res.status(401).json({
          error: "Vui lòng nhập OpenRouter API Key của bạn trong phần Cài đặt của AI Chatbot hoặc cấu hình biến môi trường OPENROUTER_API_KEY.",
        });
      }

      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeApiKey}`,
          "HTTP-Referer": "https://tietkhi-kymon.vn",
          "X-Title": "Tiet Khi Ky Mon Luc Nham AI Master",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: Number(max_tokens) || 2500,
        }),
      });

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        console.error("OpenRouter API error:", openRouterResponse.status, errorText);
        return res.status(openRouterResponse.status).json({
          error: `OpenRouter error (${openRouterResponse.status}): ${errorText}`,
        });
      }

      const data = await openRouterResponse.json();
      return res.json(data);
    } catch (err: any) {
      console.error("Server /api/chat error:", err);
      return res.status(500).json({
        error: err.message || "Internal server error occurred while connecting to AI",
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
