import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  Bookmark,
  X,
  Compass,
  Star,
  Layers,
  Flame,
  Sun,
  Moon,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { calculateDailyAlmanac, DailyAlmanacInfo } from '../astronomy/dailyAlmanac';

interface DailyCalendarViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onClose?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

// 12 Con Giáp SVG / Icons
const ZODIAC_EMOJIS: Record<string, string> = {
  Tý: '🐀',
  Sửu: '🐃',
  Dần: '🐅',
  Mão: '🐈',
  Thìn: '🐉',
  Tị: '🐍',
  Ngọ: '🐎',
  Mùi: '🐐',
  Thân: '🐒',
  Dậu: '🐓',
  Tuất: '🐕',
  Hợi: '🐖',
};

export const DailyCalendarView: React.FC<DailyCalendarViewProps> = ({
  currentDate,
  onDateChange,
  onClose,
  onNavigateTab,
}) => {
  // Temporary states for selector dropdowns
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    return vn.getUTCDate();
  });
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    return vn.getUTCMonth() + 1; // 1..12
  });
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    return vn.getUTCFullYear();
  });

  // Active almanac calculation
  const almanac: DailyAlmanacInfo = useMemo(() => {
    return calculateDailyAlmanac(currentDate);
  }, [currentDate]);

  // Sync internal dropdowns when currentDate changes externally
  useEffect(() => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    setSelectedDay(vn.getUTCDate());
    setSelectedMonth(vn.getUTCMonth() + 1);
    setSelectedYear(vn.getUTCFullYear());
  }, [currentDate]);

  // Max days in the selected month & year
  const daysInMonth = useMemo(() => {
    return new Date(Date.UTC(selectedYear, selectedMonth, 0)).getUTCDate();
  }, [selectedYear, selectedMonth]);

  // Handle "Xem" click from top dropdowns
  const handleApplyDate = () => {
    const validDay = Math.min(selectedDay, daysInMonth);
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    const h = vn.getUTCHours();
    const m = vn.getUTCMinutes();
    const s = vn.getUTCSeconds();
    const utcMillis = Date.UTC(selectedYear, selectedMonth - 1, validDay, h, m, s) - 7 * 3600 * 1000;
    onDateChange(new Date(utcMillis));
  };

  // Step days (-1 or +1)
  const handleStepDay = (days: number) => {
    const newDate = new Date(currentDate.getTime() + days * 86400 * 1000);
    onDateChange(newDate);
  };

  // Step months (-1 or +1)
  const handleStepMonth = (step: number) => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    let y = vn.getUTCFullYear();
    let m = vn.getUTCMonth() + step;
    let d = vn.getUTCDate();
    const h = vn.getUTCHours();
    const min = vn.getUTCMinutes();
    const s = vn.getUTCSeconds();

    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }

    const maxDays = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    d = Math.min(d, maxDays);

    const utcMillis = Date.UTC(y, m, d, h, min, s) - 7 * 3600 * 1000;
    onDateChange(new Date(utcMillis));
  };

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  // Year options 1900..2100
  const yearOptions = useMemo(() => {
    return Array.from({ length: 201 }, (_, i) => 1900 + i);
  }, []);

  return (
    <div id="daily-block-calendar-container" className="w-full max-w-2xl mx-auto space-y-4 font-sans pb-12">
      {/* 1. TOP SELECTION BAR (Dropdowns Ngày, Tháng, Năm + Nút Xem) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          {/* Day Select */}
          <div className="flex-1 min-w-[75px]">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Ngày</label>
            <select
              id="select-daily-day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-inner"
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Month Select */}
          <div className="flex-1 min-w-[85px]">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Tháng</label>
            <select
              id="select-daily-month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-inner"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div className="flex-1 min-w-[95px]">
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Năm</label>
            <select
              id="select-daily-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-inner"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Button Xem */}
          <div className="shrink-0 self-end">
            <button
              id="btn-daily-apply-date"
              type="button"
              onClick={handleApplyDate}
              className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Xem</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE MAIN DAILY BLOCK CALENDAR (LỊCH BLOCK TRUYỀN THỐNG VIỆT NAM) */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-800/60 dark:border-red-950/80 bg-[#fdf6ee] dark:bg-slate-900 transition-all">
        {/* ======================================================== */}
        {/* TOP CRIMSON / RED BLOCK: Solar Month, Big Day, Weekday, Quote */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-b from-[#d32f2f] via-[#c62828] to-[#b71c1c] text-white p-6 sm:p-8 relative shadow-inner select-none">
          {/* Top Month Title with Prev/Next Month Steppers */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-red-400/40">
            <button
              id="btn-step-prev-month"
              type="button"
              onClick={() => handleStepMonth(-1)}
              className="p-1.5 rounded-full hover:bg-black/20 active:scale-90 transition-transform cursor-pointer text-white/90 hover:text-white"
              title="Tháng trước"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-widest text-center text-white drop-shadow-sm font-sans">
              THÁNG {almanac.solarMonth} NĂM {almanac.solarYear}
            </h2>

            <button
              id="btn-step-next-month"
              type="button"
              onClick={() => handleStepMonth(1)}
              className="p-1.5 rounded-full hover:bg-black/20 active:scale-90 transition-transform cursor-pointer text-white/90 hover:text-white"
              title="Tháng sau"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center: Big Solar Day + Day of Week + Lateral Prev/Next Day Navigators */}
          <div className="relative py-6 sm:py-8 flex items-center justify-center">
            {/* Left Nav Arrow (Lùi 1 ngày) */}
            <button
              id="btn-lateral-prev-day"
              type="button"
              onClick={() => handleStepDay(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-16 sm:w-12 sm:h-20 bg-black/15 hover:bg-black/30 active:scale-95 rounded-r-2xl flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
              title="Lùi 1 ngày (Hôm qua)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Core Big Numbers */}
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-7xl sm:text-9xl font-black tracking-tighter text-white drop-shadow-md font-sans leading-none">
                {almanac.solarDay}
              </div>
              <div className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider text-white drop-shadow-sm font-sans pt-1">
                {almanac.dayOfWeekText}
              </div>
            </div>

            {/* Right Nav Arrow (Tiến 1 ngày) */}
            <button
              id="btn-lateral-next-day"
              type="button"
              onClick={() => handleStepDay(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-16 sm:w-12 sm:h-20 bg-black/15 hover:bg-black/30 active:scale-95 rounded-l-2xl flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
              title="Tiến 1 ngày (Ngày mai)"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Historical Event / Kỷ Niệm */}
          <div className="pt-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 border border-white/20 text-xs sm:text-sm font-medium text-amber-200 shadow-sm max-w-full">
              <Star className="w-3.5 h-3.5 text-amber-300 shrink-0 fill-amber-300" />
              <span className="truncate">{almanac.historicalEvent}</span>
            </div>
          </div>

          {/* Daily Inspirational Quote (Danh Ngôn) */}
          <div className="pt-4 text-center max-w-md mx-auto space-y-1">
            <p className="text-xs sm:text-sm italic text-white/95 leading-relaxed font-serif">
              &ldquo;{almanac.quote.text}&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-amber-200/90 font-sans">
              - {almanac.quote.author} -
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM WARM PARCHMENT BLOCK: Lunar Info & Hoang Dao Details */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 bg-[#fef8f0] dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Lunar Date, Can Chi, Realtime, Solar Term */}
            <div className="md:col-span-6 space-y-4">
              {/* Lunar Day & Lunar Month Header */}
              <div className="flex items-center gap-4 pb-3 border-b border-amber-900/15 dark:border-slate-800">
                {/* Zodiac Animal Art */}
                <div className="w-14 h-14 rounded-2xl bg-amber-600/15 dark:bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {ZODIAC_EMOJIS[almanac.chiNgay] || '🐅'}
                </div>

                {/* Big Lunar Day */}
                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-amber-300 font-mono tracking-tight">
                  {almanac.lunarDay}
                </div>

                {/* Divider */}
                <div className="w-[1.5px] h-10 bg-amber-900/20 dark:bg-slate-700"></div>

                {/* Lunar Month Text */}
                <div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    {almanac.lunarMonthText}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Âm Lịch Việt Nam
                  </div>
                </div>
              </div>

              {/* Breakdown Details List */}
              <div className="space-y-1.5 text-xs sm:text-sm font-medium">
                {/* Hoang Dao / Hac Dao Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      almanac.isHoangDaoDay
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {almanac.hoangDaoDayText} ({almanac.hoangDaoStarName})
                  </span>
                </div>

                {/* Can Chi Năm */}
                <div className="flex items-center justify-between py-1 border-b border-amber-900/10 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Năm Can Chi:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Năm {almanac.lunarYearCanChi}</span>
                </div>

                {/* Can Chi Tháng */}
                <div className="flex items-center justify-between py-1 border-b border-amber-900/10 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Tháng Can Chi:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Tháng {almanac.lunarMonthCanChi}</span>
                </div>

                {/* Can Chi Ngày */}
                <div className="flex items-center justify-between py-1 border-b border-amber-900/10 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Ngày Can Chi:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">Ngày {almanac.lunarDayCanChi}</span>
                </div>

                {/* Thời gian hiện tại */}
                <div className="flex items-center justify-between py-1 border-b border-amber-900/10 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Giờ Cục Bộ:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{almanac.currentTimeFormatted}</span>
                </div>

                {/* Giờ Can Chi */}
                <div className="flex items-center justify-between py-1 border-b border-amber-900/10 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Giờ Can Chi:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">Giờ {almanac.currentHourCanChi}</span>
                </div>

                {/* Tiết Khí Hiện Tại */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Tiết Khí Thiên Văn:</span>
                  <span className="font-bold text-cyan-700 dark:text-cyan-400">Tiết khí: {almanac.currentSolarTermName}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 6 Giờ Hoàng Đạo trong ngày & Phong Thủy Cát Hung */}
            <div className="md:col-span-6 space-y-4">
              {/* Giờ Hoàng Đạo Box */}
              <div className="bg-amber-500/10 dark:bg-slate-950/80 border border-amber-500/30 dark:border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 pb-2 border-b border-amber-500/20 dark:border-slate-800">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                    Giờ Hoàng Đạo trong ngày:
                  </h3>
                </div>

                <div className="space-y-1 text-xs sm:text-sm">
                  {almanac.hoangDaoHours.map((hour) => (
                    <div
                      key={hour.chi}
                      className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-amber-500/15 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {hour.canChi}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">
                          ({hour.timeRange})
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                        {hour.starName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12 Trực & Hướng Xuất Hành */}
              <div className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 p-3.5 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Trực ngày:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-300">
                    Trực {almanac.truc.name} ({almanac.truc.category}) - {almanac.truc.description}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Nhị thập bát tú:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Sao {almanac.nhiThapBatTu.name} ({almanac.nhiThapBatTu.nature})
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Hướng xuất hành:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Hỷ Thần: <strong className="text-red-600 dark:text-red-400">{almanac.xuatHanh.hyThan}</strong> • Tài Thần: <strong className="text-emerald-600 dark:text-emerald-400">{almanac.xuatHanh.taiThan}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="mt-6 pt-4 border-t border-amber-900/15 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            {/* Quick Step Day Buttons: Hôm qua | Hôm nay | Ngày mai */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-daily-yesterday"
                type="button"
                onClick={() => handleStepDay(-1)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
              >
                Hôm qua
              </button>
              <button
                id="btn-daily-today"
                type="button"
                onClick={handleTodayClick}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Hôm nay
              </button>
              <button
                id="btn-daily-tomorrow"
                type="button"
                onClick={() => handleStepDay(1)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
              >
                Ngày mai
              </button>
            </div>

            {/* Jump to Metaphysics Views or Close */}
            <div className="flex items-center gap-2">
              {onNavigateTab && (
                <>
                  <button
                    id="btn-daily-jump-kymon"
                    type="button"
                    onClick={() => onNavigateTab('kymon-chart')}
                    className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lập Bàn Kỳ Môn</span>
                  </button>
                  <button
                    id="btn-daily-jump-moon"
                    type="button"
                    onClick={() => onNavigateTab('moon')}
                    className="px-3 py-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-800 dark:text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Moon className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Xem Điểm Sóc</span>
                  </button>
                </>
              )}

              {onClose && (
                <button
                  id="btn-daily-close"
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
                  title="Đóng trang lịch"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
