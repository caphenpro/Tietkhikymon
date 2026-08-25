import React from 'react';
import { Compass, Clock, Calendar, Sparkles, Download, HelpCircle, Bot } from 'lucide-react';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface HeaderProps {
  currentDate: Date;
  isLive: boolean;
  onToggleLive: () => void;
  onOpenGuide: () => void;
  onOpenExport: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenFloatingChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  isLive,
  onToggleLive,
  onOpenGuide,
  onOpenExport,
  activeTab,
  setActiveTab,
  onOpenFloatingChat,
}) => {
  const tabs = [
    { id: 'overview', label: 'Tổng Quan & Luận Cục' },
    { id: 'compass', label: 'Bát Quái & 9 Cung' },
    { id: 'table', label: 'Bảng 24 Tiết Khí Năm' },
    { id: 'moon', label: 'Điểm Sóc & Âm Lịch' },
    { id: 'chat', label: 'Hỏi Đáp Kỳ Môn AI', isAi: true },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shadow-inner">
              <Compass className="w-6 h-6 text-amber-400 animate-[spin_30s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>Tiết Khí & Kỳ Môn Độn Giáp</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Skyfield Engine
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Thiên văn 24 Tiết Khí • Lịch Sóc Âm Dương • Định Cục Siêu Thần Tiếp Khí
              </p>
            </div>
          </div>

          {/* Right Controls: Live status & Actions */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Live Clock toggle badge */}
            <button
              id="btn-live-toggle"
              onClick={onToggleLive}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                isLive
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
              title="Nhấn để bật/tắt cập nhật thời gian thực tự động"
            >
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isLive ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                ></span>
              </span>
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono">{formatVietnamDateTime(currentDate)}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                {isLive ? 'Live' : 'Đã chọn'}
              </span>
            </button>

            {/* Guide Button */}
            <button
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Thuyết minh</span>
            </button>

            {/* Export Markdown Button */}
            <button
              id="btn-open-export"
              onClick={onOpenExport}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Báo Cáo</span>
            </button>

            {/* Quick Ask AI button if floating chat exists */}
            {onOpenFloatingChat && (
              <button
                id="btn-quick-ai"
                onClick={onOpenFloatingChat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 border border-amber-500/40 rounded-lg transition-all shadow-sm"
                title="Mở cửa sổ Trợ lý AI Hỏi Đáp"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-semibold">Hỏi AI</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 mt-3.5 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.isAi ? (
                  <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400 animate-pulse' : 'text-amber-400/70'}`} />
                ) : null}
                <span>{tab.label}</span>
                {tab.isAi && (
                  <span className="text-[9px] px-1 rounded font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
