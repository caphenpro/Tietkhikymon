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

  // OpenRouter AI Chat Proxy Endpoint with Multi-Model Fallback
  app.post("/api/chat", async (req, res) => {
    try {
      const {
        messages,
        model = "auto",
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

      // Priority list of models for auto routing and fallback
      const DEFAULT_FALLBACK_CHAIN = [
        "google/gemini-2.5-flash",
        "google/gemini-2.5-flash-lite",
        "deepseek/deepseek-chat",
        "openai/gpt-4o-mini",
        "deepseek/deepseek-r1",
        "anthropic/claude-3.7-sonnet",
      ];

      // Build model trial list
      let modelsToTry: string[] = [];
      if (model === "auto" || !model) {
        modelsToTry = [...DEFAULT_FALLBACK_CHAIN];
      } else {
        // If a specific model was requested, try it first, then fallback to other models
        modelsToTry = [model, ...DEFAULT_FALLBACK_CHAIN.filter((m) => m !== model)];
      }

      let lastError: any = null;
      let successfulResponseData: any = null;
      let usedModelName: string = modelsToTry[0];
      let fallbackTriggered = false;

      for (let i = 0; i < modelsToTry.length; i++) {
        const currentModel = modelsToTry[i];
        try {
          const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${activeApiKey}`,
              "HTTP-Referer": "https://tietkhi-kymon.vn",
              "X-Title": "Tiet Khi Ky Mon Luc Nham AI Master",
            },
            body: JSON.stringify({
              model: currentModel,
              models: model === "auto" ? DEFAULT_FALLBACK_CHAIN : undefined,
              messages,
              temperature,
              max_tokens: Number(max_tokens) || 2500,
            }),
          });

          if (openRouterResponse.ok) {
            const data = await openRouterResponse.json();
            if (data.choices?.[0]?.message?.content) {
              successfulResponseData = data;
              usedModelName = data.model || currentModel;
              fallbackTriggered = i > 0;
              break;
            }
          }

          // If not ok, inspect status (429 rate limit, 402 credits, 503 capacity/overload, 404 model not found)
          const errorText = await openRouterResponse.text();
          console.warn(`Model ${currentModel} failed (${openRouterResponse.status}): ${errorText.slice(0, 150)}`);
          lastError = {
            status: openRouterResponse.status,
            text: errorText,
            model: currentModel,
          };

          // If auth error (401), don't loop through all models as key is invalid
          if (openRouterResponse.status === 401) {
            return res.status(401).json({
              error: "OpenRouter API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại API Key.",
            });
          }
        } catch (err: any) {
          console.warn(`Error attempting model ${currentModel}:`, err.message);
          lastError = {
            status: 500,
            text: err.message,
            model: currentModel,
          };
        }
      }

      if (successfulResponseData) {
        return res.json({
          ...successfulResponseData,
          model_used: usedModelName,
          fallback_occurred: fallbackTriggered,
          auto_routed: model === "auto",
        });
      }

      // If all models failed
      console.error("All fallback models failed:", lastError);
      return res.status(lastError?.status || 500).json({
        error: `Tất cả các mô hình AI dự phòng đều gặp sự cố hoặc hết dung lượng (${lastError?.status || 500}): ${lastError?.text || "Unknown error"}`,
      });
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
