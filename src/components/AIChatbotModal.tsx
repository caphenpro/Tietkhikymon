import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  Send,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sliders,
  HelpCircle,
  Key,
  Bot,
  User,
  AlertCircle,
  ArrowRight,
  Shield,
  BookOpen,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { ComprehensiveResult } from '../types';
import {
  AI_MODELS,
  AIModelOption,
  buildCosmicSystemContext,
  getMetaphysicsSystemPrompt,
  sendOpenRouterChatMessage,
  ChatCompletionRequestMessage,
  DEFAULT_OPENROUTER_KEY,
} from '../services/aiChatService';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  isError?: boolean;
}

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComprehensiveResult;
  currentDate: Date;
  initialQuestion?: string;
  onNavigateTab?: (tabId: string) => void;
}

const STORAGE_KEY = 'skyfield_ai_chat_history_v1';
const MODEL_STORAGE_KEY = 'skyfield_ai_selected_model_v1';
const API_KEY_STORAGE_KEY = 'skyfield_ai_custom_api_key_v1';

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({
  isOpen,
  onClose,
  result,
  currentDate,
  initialQuestion,
  onNavigateTab,
}) => {
  // Model state
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem(MODEL_STORAGE_KEY) || 'google/gemini-2.5-flash';
  });

  // Custom API key state
  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  });
  const [tempApiKeyInput, setTempApiKeyInput] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  });
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(() => {
    // If user has not set an API key yet, open the config by default to make it immediately obvious
    return !localStorage.getItem(API_KEY_STORAGE_KEY);
  });
  const [showKeyPassword, setShowKeyPassword] = useState<boolean>(false);
  const [keySavedToast, setKeySavedToast] = useState<boolean>(false);
  const [keyRequiredNotice, setKeyRequiredNotice] = useState<boolean>(false);

  const apiKeyInputRef = useRef<HTMLInputElement>(null);

  // Chat message history state
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showContextPreview, setShowContextPreview] = useState<boolean>(false);
  const [includeAppContext, setIncludeAppContext] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Save messages to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Save selected model
  useEffect(() => {
    localStorage.setItem(MODEL_STORAGE_KEY, selectedModel);
  }, [selectedModel]);

  // Save custom key
  useEffect(() => {
    if (customApiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, customApiKey);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, [customApiKey]);

  // Scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      textareaRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  // Handle initial question injection if passed
  useEffect(() => {
    if (isOpen && initialQuestion && initialQuestion.trim() !== '') {
      handleSendMessage(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuestion]);

  // Build real-time context summary
  const contextString = useMemo(() => {
    return buildCosmicSystemContext(result, currentDate);
  }, [result, currentDate]);

  // Helper to extract follow-up suggestions from AI response text
  const extractFollowUpSuggestions = (content: string): string[] => {
    const suggestions: string[] = [];
    const lines = content.split('\n');
    let inSuggestionSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (
        trimmed.includes('Gợi ý mở rộng chuyên môn') ||
        trimmed.includes('Dẫn chuyện tiếp theo') ||
        trimmed.includes('Gợi ý mở rộng')
      ) {
        inSuggestionSection = true;
        continue;
      }

      if (inSuggestionSection) {
        if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
          let cleaned = trimmed
            .replace(/^[-*•\d.]+\s*/, '')
            .replace(/^[➡️👉🔹🔸🔮✨]+\s*/, '')
            .replace(/^\[.*?\]:\s*/, '')
            .trim();
          // Remove bold markdown wrap if entire line is wrapped
          cleaned = cleaned.replace(/^\*\*(.*?)\*\*$/, '$1').trim();
          if (cleaned.length > 5 && !cleaned.startsWith('#')) {
            suggestions.push(cleaned);
          }
        } else if (trimmed.startsWith('#') || trimmed.startsWith('---')) {
          inSuggestionSection = false;
        }
      }
    }

    return suggestions.slice(0, 3);
  };

  const quickPrompts = [
    {
      label: '🔮 Luận Cát/Hung toàn cục Bàn Kỳ Môn hiện tại',
      prompt:
        'Xin đánh giá ngắn gọn Cát/Hung toàn cục Bàn Kỳ Môn thời điểm này: Trọng tâm Cung Trực Phù, Trực Sử và cách cục nổi bật nhất?',
    },
    {
      label: '🧭 Tam Truyền Lục Nhâm: Khởi đầu, Quá trình & Kết cục',
      prompt:
        'Xin phân tích súc tích Tam Truyền & Tứ Khoa Lục Nhâm hiện tại: Sự việc sẽ khởi phát ra sao, diễn biến thế nào và kết cục cát hay hung?',
    },
    {
      label: '💼 Công Danh & Sự Nghiệp (Khai Môn & Trực Phù)',
      prompt:
        'Xin chiêm đoán ngắn gọn về Công Danh, Sự Nghiệp, Thi cử thời điểm này: Cung Khai Môn và Trực Phù báo hiệu cơ hội hay thử thách gì?',
    },
    {
      label: '💰 Tài Lộc, Đầu Tư & Ký Kết Hợp Đồng (Sinh Môn)',
      prompt:
        'Xin luận đoán ngắn gọn về Tài Lộc, Đầu Tư, Hợp Đồng: Cung Sinh Môn và Thần Tướng tài lộc đang ở thế sinh hay khắc?',
    },
    {
      label: '⚔️ Sách Lược Chủ - Khách: Nên Chủ Động Hay Chờ Đón?',
      prompt:
        'Dựa trên Can Ngày/Giờ và Thiên/Địa Bàn Kỳ Môn hiện tại, trong đàm phán hoặc hành động tôi nên làm Khách (chủ động tiến) hay làm Chủ (tĩnh chờ đón)?',
    },
    {
      label: '❤️ Tình Cảm, Gia Đạo & Hòa Hợp (Cung Lục Hợp)',
      prompt:
        'Xin phân tích ngắn gọn về Tình Duyên, Gia Đạo lúc này: Cung Lục Hợp và Can tương phối có hòa hợp không?',
    },
    {
      label: '🏥 Sức Khỏe, Tạng Phủ & Phương Vị Dưỡng Sinh',
      prompt:
        'Xin tra cứu Cung Thiên Nhuế, Tử Môn và chỉ dẫn phương vị nạp Sinh Khí tốt nhất để bồi bổ sức khỏe lúc này?',
    },
    {
      label: '🚪 Phương Vị Cát Lợi (Sinh, Khai, Hưu) Xuất Hành',
      prompt:
        'Xin chỉ ra 2 phương vị đắc cát lợi nhất để xuất hành/giao dịch trong giờ này và phương vị nào cần tuyệt đối tránh?',
    },
  ];

  const handleSaveApiKey = () => {
    const cleanKey = tempApiKeyInput.trim();
    if (!cleanKey) {
      alert('Vui lòng nhập chuỗi API Key hợp lệ (bắt đầu bằng sk-or-v1-...)');
      return;
    }
    setCustomApiKey(cleanKey);
    localStorage.setItem(API_KEY_STORAGE_KEY, cleanKey);
    setKeyRequiredNotice(false);
    setKeySavedToast(true);
    setTimeout(() => {
      setKeySavedToast(false);
      setShowKeyConfig(false);
    }, 1500);
  };

  const handleClearApiKey = () => {
    setCustomApiKey('');
    setTempApiKeyInput('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setShowKeyConfig(true);
  };

  const handleSendMessage = async (promptToSend?: string) => {
    const text = (promptToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    // Check if API key is provided
    if (!customApiKey.trim()) {
      setKeyRequiredNotice(true);
      setShowKeyConfig(true);
      setTimeout(() => {
        apiKeyInputRef.current?.focus();
      }, 100);
      return;
    }

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: formatVietnamDateTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!promptToSend) {
      setInputPrompt('');
    }
    setIsLoading(true);

    try {
      // Build conversation payload
      const systemPrompt = includeAppContext
        ? getMetaphysicsSystemPrompt(contextString)
        : 'Bạn là chuyên gia cố vấn Á Đông cổ truyền uyên bác về Kỳ Môn Độn Giáp, Đại Lục Nhâm, 24 Tiết Khí và Bát Tự.';

      const apiMessages: ChatCompletionRequestMessage[] = [
        {
          role: 'system',
          content: systemPrompt,
        },
      ];

      // Add last conversation history (up to 8 turns to conserve context)
      const recentHistory = messages.slice(-8);
      for (const m of recentHistory) {
        apiMessages.push({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        });
      }

      // Add current message
      apiMessages.push({
        role: 'user',
        content: text,
      });

      const responseText = await sendOpenRouterChatMessage({
        messages: apiMessages,
        model: selectedModel,
        customApiKey: customApiKey.trim() || undefined,
        temperature: 0.7,
      });

      const assistantMessage: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: formatVietnamDateTime(new Date()),
        modelUsed: AI_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      const errorMessage: ChatMessageItem = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Không thể kết nối đến mô hình AI:** ${
          err.message || 'Đã có lỗi xảy ra khi xử lý phản hồi từ OpenRouter API.'
        }\n\n*Gợi ý:* Hãy kiểm tra lại kết nối mạng hoặc thử đổi mô hình sang **Gemini 2.5 Flash** / cung cấp OpenRouter API Key cá nhân trong phần cài đặt bên dưới.`,
        timestamp: formatVietnamDateTime(new Date()),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử cuộc trò chuyện này?')) {
      setMessages([]);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="ai-chatbot-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="ai-chatbot-window"
        className={`bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized
            ? 'w-full h-full max-w-none rounded-none'
            : 'w-full max-w-4xl h-[92vh] max-h-[850px]'
        }`}
      >
        {/* TOP BAR */}
        <div className="bg-slate-950/90 border-b border-slate-800 p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0 relative">
              <Bot className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5 font-sans">
                  <span>AI Đại Sư Luận Giải Cổ Thuật</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 font-mono">
                    OpenRouter AI
                  </span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Tự động đồng bộ Bàn Kỳ Môn 9 Cung, Lục Nhâm & 24 Tiết Khí thực</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Model Selector */}
            <div className="relative">
              <select
                id="select-ai-model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-slate-800 hover:bg-slate-700/80 text-amber-300 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400 cursor-pointer pr-6 appearance-none shadow-xs"
                title="Chọn mô hình AI suy luận"
              >
                {AI_MODELS.map((model) => (
                  <option key={model.id} value={model.id} className="bg-slate-900 text-white">
                    {model.name} {model.recommended ? '⭐ (Khuyên Dùng)' : model.isPro ? '💎' : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>

            {/* API Key Status & Config Button */}
            <button
              id="btn-toggle-key-config"
              onClick={() => {
                setShowKeyConfig((prev) => !prev);
                setKeyRequiredNotice(false);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                customApiKey
                  ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300 font-medium'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400 text-amber-200 font-bold animate-pulse'
              }`}
              title="Cấu hình API Key OpenRouter để kết nối AI"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {customApiKey ? 'API Key: Đã lưu' : '🔑 Nhập API Key'}
              </span>
              {customApiKey ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            {/* Maximize / Minimize Button */}
            <button
              id="btn-toggle-maximize"
              onClick={() => setIsMaximized((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-all cursor-pointer hidden sm:flex items-center justify-center"
              title={isMaximized ? 'Thu nhỏ' : 'Mở toàn màn hình'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              id="btn-close-ai-chat"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs transition-all cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PROMINENT OPENROUTER API KEY SETUP CARD (SHOWN WHEN NO KEY OR WHEN EXPANDED) */}
        {(showKeyConfig || !customApiKey || keyRequiredNotice) && (
          <div
            id="openrouter-api-key-setup-card"
            className={`border-b p-3.5 sm:p-4 text-xs animate-fadeIn transition-all space-y-3 ${
              keyRequiredNotice
                ? 'bg-amber-950/70 border-amber-400'
                : !customApiKey
                ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-amber-500/50 shadow-inner'
                : 'bg-slate-950 border-emerald-500/40'
            }`}
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                    <span>Thiết Lập Khóa OpenRouter API Key</span>
                    {!customApiKey && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                        Bắt buộc
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Cung cấp API Key OpenRouter để kết nối các mô hình AI (Gemini 2.5, DeepSeek, Claude, GPT).
                  </p>
                </div>
              </div>

              {/* Get Key Link Button */}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>Lấy API Key Miễn Phí Tại OpenRouter.ai</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick 3-Step Instruction */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 text-[11px] text-slate-300">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <span>Truy cập <strong>openrouter.ai/keys</strong> và đăng nhập miễn phí.</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <span>Bấm <strong>Create Key</strong> & sao chép mã khóa dạng <code>sk-or-v1-...</code></span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <span>Dán vào ô bên dưới rồi bấm <strong>Lưu & Kích Hoạt</strong>.</span>
              </div>
            </div>

            {/* Input Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={apiKeyInputRef}
                  id="input-custom-api-key"
                  type={showKeyPassword ? 'text' : 'password'}
                  value={tempApiKeyInput}
                  onChange={(e) => setTempApiKeyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSaveApiKey();
                    }
                  }}
                  placeholder="Dán API Key OpenRouter của bạn tại đây (sk-or-v1-...)"
                  className="w-full bg-slate-900 border border-amber-500/40 focus:border-amber-400 rounded-xl pl-3 pr-10 py-2 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                  title={showKeyPassword ? 'Ẩn khóa' : 'Hiện khóa'}
                >
                  {showKeyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  id="btn-save-api-key"
                  onClick={handleSaveApiKey}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Lưu & Kích Hoạt</span>
                </button>

                {customApiKey && (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs transition-colors cursor-pointer"
                  >
                    Xóa Key
                  </button>
                )}

                {customApiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowKeyConfig(false);
                      setKeyRequiredNotice(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                )}
              </div>
            </div>

            {/* Saved Toast */}
            {keySavedToast && (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Đã lưu API Key thành công! Bạn có thể bắt đầu trò chuyện ngay bây giờ.</span>
              </div>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                <strong>Bảo mật:</strong> Khóa API của bạn được lưu an toàn 100% trên trình duyệt (localStorage), không lưu trữ trên máy chủ hoặc mã nguồn git.
              </span>
            </div>
          </div>
        )}

        {/* ACTIVE COSMIC CONTEXT CHIP BAR */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
            <span className="text-amber-400 font-bold">Dữ liệu nạp:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
              {result.batTu.hourCanChi} • {result.batTu.dayCanChi} • {result.batTu.monthCanChi} • {result.batTu.yearCanChi}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
              {result.currentTerm.name} • {result.kyMon.cucResultText}
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium hidden sm:inline">
              Âm lịch: {result.newMoon.lunarDay}/{result.newMoon.lunarMonth}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={includeAppContext}
                onChange={(e) => setIncludeAppContext(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
              />
              <span>Đính kèm bàn quẻ</span>
            </label>

            <button
              onClick={() => setShowContextPreview((prev) => !prev)}
              className="text-amber-400 hover:text-amber-300 text-[11px] underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{showContextPreview ? 'Ẩn xem trước' : 'Xem trước ngữ cảnh'}</span>
              {showContextPreview ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* CONTEXT PREVIEW COLLAPSIBLE */}
        {showContextPreview && (
          <div className="bg-slate-950 p-3 border-b border-slate-800 max-h-48 overflow-y-auto font-mono text-[10px] text-slate-400 whitespace-pre-wrap leading-relaxed animate-fadeIn">
            {contextString}
          </div>
        )}

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 bg-slate-900/60">
          {messages.length === 0 ? (
            <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
                <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-white font-sans">
                  Chào mừng bạn đến với AI Luận Đoán Cổ Tam Thức
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Tôi đã nạp đầy đủ dữ liệu thời điểm chiêm quẻ hiện tại: <strong>{result.batTu.hourCanChi}</strong> ngày{' '}
                  <strong>{result.batTu.dayCanChi}</strong>, Tiết khí <strong>{result.currentTerm.name}</strong> ({result.kyMon.cucResultText}), cùng toàn bộ bố cục 9 Cung Kỳ Môn và Tam Truyền Tứ Khoa Lục Nhâm. Hãy chọn câu hỏi gợi ý bên dưới hoặc đặt câu hỏi tự do!
                </p>
              </div>

              {/* Quick Prompt Cards */}
              <div className="w-full space-y-2 text-left">
                {!customApiKey && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <strong>Lưu ý:</strong> Vui lòng nhập API Key OpenRouter ở bảng trên để bắt đầu luận đoán quẻ với AI.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowKeyConfig(true);
                        apiKeyInputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shrink-0 cursor-pointer"
                    >
                      Nhập Key Ngay
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Gợi ý câu hỏi phân tích nhanh:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.prompt)}
                      className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left transition-all group flex items-start justify-between gap-2 cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-200 group-hover:text-amber-300">
                        {q.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-md relative group ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 font-medium rounded-tr-none'
                      : msg.isError
                      ? 'bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-tl-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  {/* Top Bar for Assistant Message: Model & Copy */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-mono text-amber-400 font-semibold">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{msg.modelUsed || 'AI Master'}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="hover:text-white p-1 rounded hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message Content with React-Markdown */}
                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-slate-200 space-y-2 [&>h3]:text-amber-300 [&>h3]:font-bold [&>h3]:text-sm [&>h4]:text-cyan-300 [&>h4]:font-bold [&>h4]:text-xs [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>blockquote]:border-l-2 [&>blockquote]:border-amber-500/50 [&>blockquote]:pl-3 [&>blockquote]:italic [&>table]:w-full [&>table]:border-collapse [&>table]:text-xs [&>table_th]:border [&>table_th]:border-slate-700 [&>table_th]:p-1.5 [&>table_th]:bg-slate-900 [&>table_td]:border [&>table_td]:border-slate-800 [&>table_td]:p-1.5 [&>p>strong]:text-amber-300">
                        <Markdown>{msg.content}</Markdown>
                      </div>

                      {/* Interactive Follow-Up Chips */}
                      {!msg.isError && (() => {
                        const suggestions = extractFollowUpSuggestions(msg.content);
                        if (suggestions.length === 0) return null;
                        return (
                          <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5 animate-fadeIn">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>Dẫn chuyện & mở rộng chuyên môn (Nhấp để hỏi ngay):</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {suggestions.map((sug, sIdx) => (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => handleSendMessage(sug)}
                                  disabled={isLoading}
                                  className="text-left text-xs text-slate-300 hover:text-amber-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl p-2 transition-all flex items-start justify-between gap-2 group cursor-pointer disabled:opacity-50 shadow-sm"
                                >
                                  <span className="leading-snug">➡️ {sug}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-amber-400/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-0.5" />
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {msg.role === 'user' && (
                    <div className="text-[10px] text-amber-950/80 pt-1 text-right font-mono">
                      {msg.timestamp}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-3 shadow-md">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse [animation-delay:0.4s]"></span>
                </div>
                <span>Đang tra cứu cổ thư, tính toán Tam Bàn & tổng hợp luận giải...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* FOOTER INPUT AREA */}
        <div className="bg-slate-950 border-t border-slate-800 p-3 sm:p-4 space-y-2.5 shrink-0">
          {/* Quick suggestions pills when in chat */}
          {messages.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] text-amber-400 font-bold whitespace-nowrap">Hỏi tiếp:</span>
              {quickPrompts.slice(0, 5).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 text-[11px] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Text Input Row */}
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-slate-900 border border-slate-700 focus-within:border-amber-400 rounded-2xl p-2 transition-colors relative shadow-inner">
              <textarea
                ref={textareaRef}
                id="input-ai-prompt"
                rows={2}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi chiêm quẻ, phân tích sự nghiệp, tài lộc, tình cảm, xuất hành... (Nhấn Enter để gửi)"
                disabled={isLoading}
                className="w-full bg-transparent text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none resize-none no-scrollbar leading-relaxed"
              />

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                <span>Shift + Enter để xuống dòng</span>
                <span className="font-mono text-slate-400">
                  {inputPrompt.length > 0 ? `${inputPrompt.length} ký tự` : 'OpenRouter Engine'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                id="btn-send-ai-message"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputPrompt.trim()}
                className="w-11 h-11 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Gửi câu hỏi"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>

              {messages.length > 0 && (
                <button
                  id="btn-clear-ai-history"
                  onClick={handleClearHistory}
                  className="w-11 h-8 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 flex items-center justify-center transition-all cursor-pointer"
                  title="Xóa lịch sử trò chuyện"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
