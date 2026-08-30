import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Download,
  HelpCircle,
  FileText,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  BookOpen,
  Eye,
  Sliders,
  RefreshCw,
} from 'lucide-react';
import { formatVietnamDateTime } from '../astronomy/solarTerms';
import { ComprehensiveResult } from '../types';
import { APP_VERSION } from '../version';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  currentDate: Date;
  isLive: boolean;
  onToggleLive: () => void;
  onOpenGuide: () => void;
  onOpenExport: () => void;
  onOpenChangelog?: () => void;
  onOpenAIChat?: () => void;
  onOpenOnboardingTour?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  result?: ComprehensiveResult;
  onDateChange?: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  isLive,
  onToggleLive,
  onOpenGuide,
  onOpenExport,
  onOpenChangelog,
  onOpenAIChat,
  onOpenOnboardingTour,
  activeTab,
  setActiveTab,
  result,
  onDateChange,
}) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Streamlined Navigation Tabs: Cẩm Nang Tri Thức -> Điểm Sóc & Âm Lịch -> Dự Trắc Chuyên Sâu -> 24 Tiết Khí Năm
  const navTabs = [
    { id: 'guide', label: 'Cẩm Nang Tri Thức', icon: '📚', badge: 'Trang Chủ' },
    { id: 'moon', label: 'Điểm Sóc & Âm Lịch', icon: '🌙', badge: 'Thiên Văn' },
    { id: 'kymon-prognostication', label: 'Dự Trắc Chuyên Sâu', icon: '🎯', badge: '6 Chủ Đề' },
    { id: 'table', label: '24 Tiết Khí Năm', icon: '📅', badge: 'Toàn Niên' },
  ];

  // Format date for datetime-local picker
  const getInputValue = (d: Date) => {
    const vnDate = new Date(d.getTime() + 7 * 3600 * 1000);
    const Y = vnDate.getUTCFullYear();
    const M = String(vnDate.getUTCMonth() + 1).padStart(2, '0');
    const D = String(vnDate.getUTCDate()).padStart(2, '0');
    const h = String(vnDate.getUTCHours()).padStart(2, '0');
    const m = String(vnDate.getUTCMinutes()).padStart(2, '0');
    const s = String(vnDate.getUTCSeconds()).padStart(2, '0');
    return `${Y}-${M}-${D}T${h}:${m}:${s}`;
  };

  const handleDateTimeLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val || !onDateChange) return;
    try {
      const [datePart, timePart] = val.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour = 0, minute = 0, second = 0] = timePart.split(':').map(Number);
      const utcMillis = Date.UTC(year, month - 1, day, hour, minute, second) - 7 * 3600 * 1000;
      const newDate = new Date(utcMillis);
      if (isLive) onToggleLive();
      onDateChange(newDate);
    } catch {
      // ignore parsing error
    }
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-md dark:shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 space-y-2.5">
        {/* ROW 1: Brand Title + Cosmic Real-Time Information Strip + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* Brand & Logo */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0 overflow-hidden relative">
                <img
                  src="/logo.png"
                  alt="Tiết Khí Kỳ Môn Lục Nhâm Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to hidden if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 dark:text-amber-400 animate-[spin_40s_linear_infinite] absolute inset-0 m-auto -z-10 pointer-events-none" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                    <span>Kỳ Môn & Lục Nhâm</span>
                  </h1>

                  {/* Version Badge */}
                  <button
                    id="btn-header-version"
                    onClick={onOpenChangelog}
                    title="Xem ghi chú cập nhật phiên bản mới nhất"
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 hover:border-amber-400 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                    <span>v{APP_VERSION}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  Cổ Tam Thức • Thiên Văn 24 Tiết Khí • Siêu Thần Tiếp Khí
                </p>
              </div>
            </div>

            {/* Mobile Actions Hamburger/Trigger */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <ThemeSwitcher compact={true} />
              {onOpenOnboardingTour && (
                <button
                  id="btn-header-mobile-tour"
                  onClick={onOpenOnboardingTour}
                  className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300"
                  title="Tour Hướng Dẫn Nhanh"
                >
                  <Compass className="w-4 h-4 text-amber-500" />
                </button>
              )}
              {onOpenAIChat && (
                <button
                  id="btn-header-mobile-ai-chat"
                  onClick={onOpenAIChat}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/50 text-amber-600 dark:text-amber-300"
                  title="Hỏi AI Luận Giải"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                </button>
              )}
              <button
                onClick={onToggleLive}
                className={`p-1.5 rounded-lg border text-xs ${
                  isLive
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500/50 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                title="Bật/Tắt Live"
              >
                <Clock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsTimePickerOpen((prev) => !prev)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-amber-600 dark:text-amber-300"
                title="Chọn thời gian"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COSMIC REAL-TIME COMPACT READOUT STRIP (Can Chi, Tiết Khí, Âm Dương Lịch) */}
          {result && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] bg-slate-100/90 dark:bg-slate-950/80 p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              {/* Live Button & Time */}
              <button
                id="btn-live-toggle"
                onClick={onToggleLive}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  isLive
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500/50 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
                title="Nhấn để bật/tắt cập nhật thời gian thực tự động"
              >
                <span className="relative flex h-2 w-2">
                  {isLive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isLive ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'
                    }`}
                  ></span>
                </span>
                <span className="font-mono font-bold">{formatVietnamDateTime(currentDate).split(' ')[1]}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 hidden md:inline">
                  {isLive ? 'Live' : 'Đã chọn'}
                </span>
              </button>

              {/* Âm Dương Lịch */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-900/90 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
                <span className="text-amber-600 dark:text-amber-400 font-bold">AL:</span>
                <span className="font-medium text-amber-800 dark:text-amber-200">
                  {result.newMoon.lunarDay}/{result.newMoon.lunarMonth}
                  {result.newMoon.isLeapMonth ? ' (Nhuận)' : ''}
                </span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">
                  ({result.newMoon.lunarYearCanChi})
                </span>
              </div>

              {/* Can Chi Tứ Trụ (Năm - Tháng - Ngày - Giờ) */}
              <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900/90 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold hidden sm:inline">Tứ Trụ:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {result.batTu.yearCanChi} • {result.batTu.monthCanChi} •{' '}
                  <strong className="text-amber-600 dark:text-amber-300">{result.batTu.dayCanChi}</strong> •{' '}
                  <strong className="text-cyan-600 dark:text-cyan-300">{result.batTu.hourCanChi}</strong>
                </span>
              </div>

              {/* Tiết Khí & Cục Số */}
              <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900/90 rounded-lg border border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                <span>{result.currentTerm.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40 font-mono">
                  {result.kyMon.cucResultText}
                </span>
              </div>

              {/* Time Picker Toggle Button on Desktop */}
              <button
                id="btn-toggle-time-picker"
                onClick={() => setIsTimePickerOpen((prev) => !prev)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isTimePickerOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Mở bảng chỉnh giờ chiêm quẻ"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action Buttons: ThemeSwitcher, Thuyết Minh, Báo Cáo, AI Luận Giải */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs shrink-0">
            {/* Light / Dark / System Theme Switcher */}
            <ThemeSwitcher />

            {onOpenAIChat && (
              <button
                id="btn-header-open-ai-chat"
                onClick={onOpenAIChat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:via-purple-500/30 hover:to-cyan-500/30 text-amber-800 dark:text-amber-300 border border-amber-500/40 rounded-xl transition-all shadow-xs font-semibold group cursor-pointer"
                title="Hỏi AI Đại Sư Luận Giải Cổ Thuật"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">AI Luận Giải</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            )}

            {onOpenOnboardingTour && (
              <button
                id="btn-open-onboarding-tour"
                onClick={onOpenOnboardingTour}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-xl transition-all shadow-xs font-semibold cursor-pointer group"
                title="Mở Tour hướng dẫn nhanh cho người mới (Onboarding)"
              >
                <Compass className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
                <span className="hidden md:inline">Tour Hướng Dẫn</span>
              </button>
            )}

            <button
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors shadow-xs cursor-pointer"
              title="Thuyết minh nguyên lý thuật toán cổ truyền"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span className="hidden md:inline">Thuyết minh</span>
            </button>

            <button
              id="btn-open-export"
              onClick={onOpenExport}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-xl transition-colors shadow-xs cursor-pointer"
              title="Xuất báo cáo quẻ Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Xuất Báo Cáo</span>
            </button>
          </div>
        </div>

        {/* TIME PICKER POPUP BAR (WHEN EXPANDED) */}
        {isTimePickerOpen && (
          <div className="p-3 bg-white dark:bg-slate-950 border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Tùy chọn thời điểm chiêm quẻ:</span>
              <input
                id="input-header-datetime-picker"
                type="datetime-local"
                step="1"
                value={getInputValue(currentDate)}
                onChange={handleDateTimeLocalChange}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-amber-700 dark:text-amber-300 font-mono text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onDateChange) {
                    onDateChange(new Date());
                    onToggleLive();
                  }
                  setIsTimePickerOpen(false);
                }}
                className="px-3 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Trở Về Hiện Tại (Live)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* ROW 2: STREAMLINED NAVIGATION TABS */}
        <nav className="flex items-center space-x-1 sm:space-x-2 pt-1 border-t border-slate-200 dark:border-slate-800/80 overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-md font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 dark:bg-amber-500/30 text-amber-900 dark:text-amber-200 font-mono font-semibold">
                    {tab.badge}
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

