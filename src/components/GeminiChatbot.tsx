import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Compass,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Minimize2,
  Maximize2,
  X,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, ComprehensiveResult } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface GeminiChatbotProps {
  result?: ComprehensiveResult;
  isFloating?: boolean;
  onClose?: () => void;
}

const INITIAL_SUGGESTIONS = [
  'Giải thích nguyên lý Siêu Thần - Tiếp Khí - Nhuận Cục?',
  'Phân tích Cục Kỳ Môn Độn Giáp của thời điểm hiện tại?',
  'Ý nghĩa và cách phân định 24 Tiết Khí trong Bát Quái?',
  'Điểm Sóc là gì và tại sao tháng âm lịch có tháng 29, tháng 30 ngày?',
  'Tại sao Trụ Năm và Trụ Tháng Bát Tự lại tính theo Lập Xuân và Tiết Lệnh?',
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  result,
  isFloating = false,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: `Xin chào! Tôi là **Trợ lý AI Thiên văn & Kỳ Môn Độn Giáp**. 

Tôi có thể giải thích chi tiết cho bạn về:
- **24 Tiết Khí & Kinh độ Mặt Trời** (Tiết lệnh, Trung khí, Cung Bát quái).
- **Lịch Sóc Âm Dương** (Điểm Sóc New Moon, tháng đủ/thiếu).
- **Bát Tự Tứ Trụ Can Chi** (Khởi theo Lập Xuân, Ngũ Hổ Độn, Ngũ Thử Độn).
- **Định Cục Kỳ Môn Độn Giáp** (Phù Đầu, Tam Nguyên, Siêu Thần Tiếp Khí, Nhuận Cục).
- **Phân tích ngữ cảnh thời gian thực** mà bạn đang chọn trên màn hình.

Bạn có thể đặt câu hỏi hoặc chọn một trong các gợi ý bên dưới!`,
        timestamp: new Date(),
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [includeContext, setIncludeContext] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: 'Cuộc trò chuyện đã được làm mới. Tôi sẵn sàng giải đáp bất kỳ câu hỏi nào về Thiên văn Lịch pháp và Kỳ Môn Độn Giáp!',
        timestamp: new Date(),
      },
    ]);
  };

  const buildContextPayload = () => {
    if (!result) return undefined;
    return {
      formattedDateTime: formatVietnamDateTime(result.calculationTime),
      termName: result.currentTerm.name,
      sunLongitude: `${result.solarLongitude.toFixed(4)}° (${result.solarLongitudeDMS})`,
      termType: result.currentTerm.category,
      cungName: `${result.currentTerm.cungName} (Cung ${result.currentTerm.cungNumber})`,
      canChiYear: result.batTu.yearCanChi,
      canChiMonth: result.batTu.monthCanChi,
      canChiDay: result.batTu.dayCanChi,
      canChiHour: result.batTu.hourCanChi,
      phuDau: `${result.kyMon.currentPhuDauCanChi} (${formatVietnamDateTime(result.kyMon.currentPhuDauDate)})`,
      nguyenName: result.kyMon.nguyen,
      trangThaiCuc: result.kyMon.ruleType,
      doLechDays: Math.abs(Math.round((result.kyMon.phuDauThuongNguyenDate.getTime() - result.currentTerm.startDate.getTime()) / (24 * 3600 * 1000))),
      cucKetLuan: result.kyMon.cucResultText,
      amDuongDon: result.kyMon.donType,
      lunarInfo: `Ngày Mùng ${result.newMoon.lunarDay} (${result.newMoon.monthType} ${result.newMoon.totalMonthDays} ngày)`,
    };
  };

  const sendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customPrompt) {
      setInputPrompt('');
    }
    setIsLoading(true);

    try {
      // Prepare history formatted for API
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const contextData = includeContext ? buildContextPayload() : undefined;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          currentContext: contextData,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${response.status}: Lỗi máy chủ`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.content || 'Không có phản hồi từ máy chủ.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `⚠️ **Không thể kết nối đến Trợ lý AI:**\n${err.message || 'Đã có lỗi xảy ra trong quá trình xử lý.'}\n\n*Gợi ý:* Hãy kiểm tra kết nối mạng hoặc thử lại với câu hỏi ngắn hơn.`,
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isFloating
          ? 'fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[460px] max-h-[88vh] h-[640px]'
          : 'w-full h-[720px] max-h-[82vh]'
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-amber-500/40 to-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Bot className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>Trợ Lý Kỳ Môn AI</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Gemini 3.7
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Giải đáp thuật ngữ, thiên văn 24 Tiết khí & Kỳ Môn Độn Giáp
            </p>
          </div>
        </div>

        {/* Header Action buttons */}
        <div className="flex items-center gap-1">
          <button
            id="btn-clear-chat"
            onClick={handleClearHistory}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
            title="Xóa lịch sử cuộc trò chuyện"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {isFloating && onClose && (
            <button
              id="btn-close-chat"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              title="Đóng cửa sổ chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Context Badge Banner */}
      {result && (
        <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/70 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-slate-400">Ngữ cảnh:</span>
            <span className="font-semibold text-amber-300 truncate">
              {result.currentTerm.name} • {result.kyMon.cucResultText} • {result.batTu.dayCanChi}
            </span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer ml-2 flex-shrink-0 text-[11px]">
            <input
              type="checkbox"
              checked={includeContext}
              onChange={(e) => setIncludeContext(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500 h-3.5 w-3.5"
            />
            <span className={includeContext ? 'text-amber-300' : 'text-slate-500'}>
              {includeContext ? 'Đã đính kèm' : 'Tắt ngữ cảnh'}
            </span>
          </label>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/60 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex-shrink-0 flex items-center justify-center text-amber-400 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                  isUser
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                    : msg.error
                    ? 'bg-rose-950/40 border border-rose-800 text-rose-200 rounded-tl-xs'
                    : 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-xs'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-slate-200">
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                        strong: ({ node, ...props }) => <strong className="text-amber-300 font-semibold" {...props} />,
                        h1: ({ node, ...props }) => <h4 className="text-sm font-bold text-white mt-2 mb-1" {...props} />,
                        h2: ({ node, ...props }) => <h4 className="text-sm font-bold text-white mt-2 mb-1" {...props} />,
                        h3: ({ node, ...props }) => <h5 className="text-xs font-bold text-amber-400 mt-2 mb-1" {...props} />,
                        code: ({ node, ...props }) => (
                          <code className="bg-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono text-amber-300 border border-slate-800" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="border-l-2 border-amber-500/60 pl-3 italic my-2 text-slate-400" {...props} />
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Footer timestamp & copy action for AI messages */}
                {!isUser && !msg.error && (
                  <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                    <span>
                      {msg.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="flex items-center gap-1 hover:text-slate-200 transition-colors p-1 rounded"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex-shrink-0 flex items-center justify-center text-amber-300 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-start justify-start text-xs text-slate-400">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex-shrink-0 flex items-center justify-center text-amber-400">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-xs p-3 flex items-center gap-2">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse [animation-delay:200ms]"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse [animation-delay:400ms]"></span>
              </div>
              <span className="text-xs text-slate-300">Đang tra cứu và phân tích thiên văn...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex-shrink-0 text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Gợi ý:
          </span>
          {INITIAL_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => sendMessage(item)}
              className="flex-shrink-0 px-2.5 py-1 bg-slate-800 hover:bg-slate-700/90 text-slate-300 hover:text-white border border-slate-700 rounded-full text-[11px] transition-colors text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="relative flex-1 bg-slate-900 rounded-xl border border-slate-700/80 focus-within:border-amber-500/60 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all">
            <textarea
              id="input-chat-prompt"
              ref={inputRef}
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi về Tiết khí, Bát tự, Điểm Sóc, Kỳ Môn Độn Giáp... (Enter để gửi)"
              className="w-full bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none resize-none"
              disabled={isLoading}
            />
          </div>

          <button
            id="btn-submit-chat"
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`p-3 rounded-xl flex items-center justify-center font-medium transition-all shadow-sm ${
              inputPrompt.trim() && !isLoading
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
            title="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
