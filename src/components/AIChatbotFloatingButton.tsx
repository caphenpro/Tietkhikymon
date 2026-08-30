import React, { useState } from 'react';
import { Sparkles, Bot, MessageSquare } from 'lucide-react';

interface AIChatbotFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AIChatbotFloatingButton: React.FC<AIChatbotFloatingButtonProps> = ({
  onClick,
  isOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen) return null;

  return (
    <aside
      aria-label="Khung cố vấn AI Luận Giải"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="bg-slate-900/95 border border-amber-500/40 text-amber-200 text-xs px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md animate-fadeIn hidden sm:flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Hỏi AI Luận Giải Cổ Thuật</span>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="btn-floating-ai-chatbot"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group p-3.5 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-purple-700 text-slate-950 shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-amber-300/80 cursor-pointer"
        title="Mở AI Đại Sư Luận Giải Cổ Thuật"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-2xl bg-amber-400 opacity-40 blur-sm group-hover:opacity-75 animate-pulse"></span>

        <div className="relative flex items-center gap-1.5 font-bold text-xs text-slate-950">
          <Bot className="w-6 h-6 text-slate-950" />
          <span className="hidden md:inline font-sans text-xs tracking-tight">AI Luận Giải</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1 border border-slate-950"></span>
        </div>
      </button>
    </aside>
  );
};
