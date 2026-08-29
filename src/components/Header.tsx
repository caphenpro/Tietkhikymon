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

interface HeaderProps {
  currentDate: Date;
  isLive: boolean;
  onToggleLive: () => void;
  onOpenGuide: () => void;
  onOpenExport: () => void;
  onOpenChangelog?: () => void;
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
  activeTab,
  setActiveTab,
  result,
  onDateChange,
}) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Grouped Navigation Structure
  const navGroups = [
    {
      groupName: 'Bàn Quẻ Tam Thức',
      tabs: [
        { id: 'kymon-chart', label: 'Kỳ Môn Độn Giáp', icon: '🔮', badge: '9 Cung 3x3' },
        { id: 'luc-nham', label: 'Đại Lục Nhâm', icon: '🧭', badge: 'Tam Truyền' },
      ],
    },
    {
      groupName: 'Dự Trắc & Phân Tích',
      tabs: [
        { id: 'kymon-prognostication', label: 'Dự Trắc Chuyên Sâu', icon: '🎯', badge: '6 Chủ Đề' },
        { id: 'overview', label: 'Tổng Quan & Luận Cục', icon: '📜', badge: 'Định Cục' },
        { id: 'compass', label: 'Bát Quái & 9 Cung', icon: '🧭', badge: 'Phong Thủy' },
      ],
    },
    {
      groupName: 'Lịch & Tiết Khí',
      tabs: [
        { id: 'table', label: '24 Tiết Khí Năm', icon: '📅', badge: 'Toàn Niên' },
        { id: 'moon', label: 'Điểm Sóc & Âm Lịch', icon: '🌙', badge: 'Sóc Vọng' },
      ],
    },
    {
      groupName: 'Tri Thức',
      tabs: [
        { id: 'guide', label: 'Cẩm Nang Tri Thức', icon: '📚', badge: 'Bí Điển' },
      ],
    },
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
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 space-y-2.5">
        {/* ROW 1: Brand Title + Cosmic Real-Time Information Strip + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* Brand & Logo */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-[spin_40s_linear_infinite]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
                    <span>Kỳ Môn & Lục Nhâm</span>
                  </h1>

                  {/* Version Badge */}
                  <button
                    id="btn-header-version"
                    onClick={onOpenChangelog}
                    title="Xem ghi chú cập nhật phiên bản mới nhất"
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 hover:border-amber-400 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>v{APP_VERSION}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Cổ Tam Thức • Thiên Văn 24 Tiết Khí • Siêu Thần Tiếp Khí
                </p>
              </div>
            </div>

            {/* Mobile Actions Hamburger/Trigger */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <button
                onClick={onToggleLive}
                className={`p-1.5 rounded-lg border text-xs ${
                  isLive
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
                title="Bật/Tắt Live"
              >
                <Clock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsTimePickerOpen((prev) => !prev)}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-300"
                title="Chọn thời gian"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COSMIC REAL-TIME COMPACT READOUT STRIP (Can Chi, Tiết Khí, Âm Dương Lịch) */}
          {result && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] bg-slate-950/80 p-1.5 sm:p-2 rounded-xl border border-slate-800">
              {/* Live Button & Time */}
              <button
                id="btn-live-toggle"
                onClick={onToggleLive}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  isLive
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
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
                <span className="font-mono font-bold">{formatVietnamDateTime(currentDate).split(' ')[1]}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400 hidden md:inline">
                  {isLive ? 'Live' : 'Đã chọn'}
                </span>
              </button>

              {/* Âm Dương Lịch */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-bold">AL:</span>
                <span className="font-medium text-amber-200">
                  {result.newMoon.lunarDay}/{result.newMoon.lunarMonth}
                  {result.newMoon.isLeapMonth ? ' (Nhuận)' : ''}
                </span>
                <span className="text-slate-500 text-[10px] hidden sm:inline">
                  ({result.newMoon.lunarYearCanChi})
                </span>
              </div>

              {/* Can Chi Tứ Trụ (Năm - Tháng - Ngày - Giờ) */}
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-slate-200 font-mono">
                <span className="text-cyan-400 font-bold hidden sm:inline">Tứ Trụ:</span>
                <span className="text-slate-300">
                  {result.batTu.yearCanChi} • {result.batTu.monthCanChi} •{' '}
                  <strong className="text-amber-300">{result.batTu.dayCanChi}</strong> •{' '}
                  <strong className="text-cyan-300">{result.batTu.hourCanChi}</strong>
                </span>
              </div>

              {/* Tiết Khí & Cục Số */}
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded-lg border border-amber-500/20 text-amber-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{result.currentTerm.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 border border-amber-500/40 font-mono">
                  {result.kyMon.cucResultText}
                </span>
              </div>

              {/* Time Picker Toggle Button on Desktop */}
              <button
                id="btn-toggle-time-picker"
                onClick={() => setIsTimePickerOpen((prev) => !prev)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isTimePickerOpen
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Mở bảng chỉnh giờ chiêm quẻ"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action Buttons: Thuyết Minh, Báo Cáo */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs shrink-0">
            <button
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
              title="Thuyết minh nguyên lý thuật toán cổ truyền"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Thuyết minh</span>
            </button>

            <button
              id="btn-open-export"
              onClick={onOpenExport}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg transition-colors"
              title="Xuất báo cáo quẻ Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Xuất Báo Cáo</span>
            </button>
          </div>
        </div>

        {/* TIME PICKER POPUP BAR (WHEN EXPANDED) */}
        {isTimePickerOpen && (
          <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-300">Tùy chọn thời điểm chiêm quẻ:</span>
              <input
                id="input-header-datetime-picker"
                type="datetime-local"
                step="1"
                value={getInputValue(currentDate)}
                onChange={handleDateTimeLocalChange}
                className="bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
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
                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Trở Về Hiện Tại (Live)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* ROW 2: GROUPED NAVIGATION TABS (Categorized & Modern) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 pt-1 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="flex items-center space-x-1 shrink-0">
              {group.tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="hidden sm:inline text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 font-mono">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              {gIdx < navGroups.length - 1 && (
                <span className="h-4 w-px bg-slate-800 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};
