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
  AlertTriangle,
  Info,
  Shield,
  BookOpen,
} from 'lucide-react';
import { calculateDailyAlmanac, DailyAlmanacInfo } from '../astronomy/dailyAlmanac';
import { BatTuVuongNhuocCard } from './BatTuVuongNhuocCard';

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

  // State toggles for viewing all 12 hours and detailed star spirits
  const [showAllHours, setShowAllHours] = useState<boolean>(false);
  const [showStarsDetail, setShowStarsDetail] = useState<boolean>(false);

  // Keep state synced when currentDate prop changes
  useEffect(() => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    setSelectedDay(vn.getUTCDate());
    setSelectedMonth(vn.getUTCMonth() + 1);
    setSelectedYear(vn.getUTCFullYear());
  }, [currentDate]);

  // Calculate Daily Almanac
  const almanac: DailyAlmanacInfo = useMemo(() => {
    return calculateDailyAlmanac(currentDate);
  }, [currentDate]);

  // Real-time ticking clock for second-by-second updates
  const [nowTimeStr, setNowTimeStr] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const vn = new Date(d.getTime() + 7 * 3600 * 1000);
      const hh = String(vn.getUTCHours()).padStart(2, '0');
      const mm = String(vn.getUTCMinutes()).padStart(2, '0');
      const ss = String(vn.getUTCSeconds()).padStart(2, '0');
      setNowTimeStr(`${hh}:${mm}:${ss}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle stepping days (Prev / Next)
  const handleStepDay = (step: number) => {
    const newDate = new Date(currentDate.getTime() + step * 24 * 3600 * 1000);
    onDateChange(newDate);
  };

  // Handle stepping months
  const handleStepMonth = (step: number) => {
    const vn = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    const y = vn.getUTCFullYear();
    const m = vn.getUTCMonth() + step;
    const d = vn.getUTCDate();
    const newDate = new Date(Date.UTC(y, m, d, 12, 0, 0) - 7 * 3600 * 1000);
    onDateChange(newDate);
  };

  // Handle Today Click
  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  // Handle Apply Date Selector
  const handleApplyDate = () => {
    const newDate = new Date(Date.UTC(selectedYear, selectedMonth - 1, selectedDay, 12, 0, 0) - 7 * 3600 * 1000);
    onDateChange(newDate);
  };

  // Generate Year options around current year (-20 .. +20)
  const yearOptions = useMemo(() => {
    const list = [];
    for (let y = 1945; y <= 2075; y++) {
      list.push(y);
    }
    return list;
  }, []);

  // Days count in selected month/year
  const daysInSelectedMonth = useMemo(() => {
    return new Date(Date.UTC(selectedYear, selectedMonth, 0)).getUTCDate();
  }, [selectedYear, selectedMonth]);

  return (
    <div id="daily-calendar-view" className="w-full max-w-4xl mx-auto space-y-6 font-sans">
      {/* 1. TOP NAVIGATION CONTROLS & DATE JUMP */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Back button */}
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                id="btn-daily-back"
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                title="Quay lại bảng lịch tra cứu"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
            )}
            <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-extrabold text-sm sm:text-base tracking-wide uppercase">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
              <span>Lịch Ngày Chi Tiết & Trạch Cát</span>
            </div>
          </div>

          {/* Real-time Clock & Jump to Today */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold shadow-inner">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{nowTimeStr || almanac.currentTimeFormatted}</span>
            </div>

            <button
              id="btn-daily-today-header"
              type="button"
              onClick={handleTodayClick}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hôm Nay</span>
            </button>
          </div>
        </div>

        {/* Date Jump Selectors */}
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Day Selector */}
          <div className="flex-1 min-w-[70px]">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Ngày
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-inner"
            >
              {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selector */}
          <div className="flex-1 min-w-[90px]">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Tháng
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => {
                const newM = Number(e.target.value);
                setSelectedMonth(newM);
                const maxD = new Date(Date.UTC(selectedYear, newM, 0)).getUTCDate();
                if (selectedDay > maxD) setSelectedDay(maxD);
              }}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-inner"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div className="flex-1 min-w-[90px]">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Năm
            </label>
            <select
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
        <div className="p-6 sm:p-8 bg-[#fef8f0] dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 transition-colors space-y-6">
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
                {/* Hoang Dao / Hac Dao Badge with Hiệp Kỷ Star Name */}
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
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    Trực: <strong className="text-amber-700 dark:text-amber-300">{almanac.truc.name}</strong>
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
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{nowTimeStr || almanac.currentTimeFormatted}</span>
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
              {/* Giờ Hoàng Đạo / Hắc Đạo Box (Hiệp Kỷ Biện Phương Thư Chuẩn Hóa) */}
              <div className="bg-amber-500/10 dark:bg-slate-950/80 border border-amber-500/30 dark:border-slate-800 p-4 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-extrabold text-xs sm:text-sm text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                      {showAllHours ? '12 Canh Giờ Trong Ngày:' : '6 Giờ Hoàng Đạo Trong Ngày:'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllHours((prev) => !prev)}
                    className="text-[10px] text-amber-700 dark:text-amber-400 hover:underline font-bold cursor-pointer"
                  >
                    {showAllHours ? 'Chỉ xem giờ Hoàng Đạo' : 'Xem đủ 12 giờ'}
                  </button>
                </div>

                <div className="space-y-1 text-xs sm:text-sm max-h-56 overflow-y-auto pr-1">
                  {(showAllHours ? almanac.allHours : almanac.hoangDaoHours).map((hour) => (
                    <div
                      key={hour.chi}
                      className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors ${
                        hour.isHoangDao
                          ? 'hover:bg-amber-500/15 dark:hover:bg-slate-800/60'
                          : 'opacity-75 hover:opacity-100 hover:bg-rose-500/10 dark:hover:bg-rose-950/30'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            hour.isHoangDao ? 'bg-emerald-500' : 'bg-rose-400'
                          }`}
                        ></span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {hour.canChi}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">
                          ({hour.timeRange})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-[10px] font-semibold font-mono ${
                            hour.isHoangDao
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-500 dark:text-rose-400'
                          }`}
                        >
                          {hour.starName}
                        </span>
                        <span
                          className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                            hour.isHoangDao
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                          }`}
                        >
                          {hour.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12 Trực, Nhị Thập Bát Tú & Hướng Xuất Hành */}
              <div className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 p-3.5 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Trực ngày:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-300">
                    Trực {almanac.truc.name} ({almanac.truc.category}) - {almanac.truc.generalMeaning}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Nhị thập bát tú:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Sao {almanac.nhiThapBatTu.name} ({almanac.nhiThapBatTu.nature}) - {almanac.nhiThapBatTu.element}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Hướng xuất hành:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Hỷ Thần: <strong className="text-red-600 dark:text-red-400">{almanac.xuatHanh.hyThan}</strong> • Tài Thần: <strong className="text-emerald-600 dark:text-emerald-400">{almanac.xuatHanh.taiThan}</strong> • Hạc Thần (Kỵ): <strong className="text-slate-600 dark:text-slate-400">{almanac.xuatHanh.hacThan}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* THẨM DUYỆT VƯỢNG NHƯỢC BÁT TỰ TỬ BÌNH */}
          {almanac.batTu?.vuongNhuoc && (
            <div className="pt-2">
              <BatTuVuongNhuocCard vuongNhuoc={almanac.batTu.vuongNhuoc} compact={true} />
            </div>
          )}

          {/* TRẠCH CÁT HIỆP KỶ BIỆN PHƯƠNG THƯ: CÁT THẦN, HUNG THẦN, NGHI & KỴ */}
          <div className="pt-4 border-t border-amber-900/15 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Trạch Cát Hiệp Kỷ Biện Phương Thư
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  {almanac.trachCatRank} ({almanac.trachCatScore}/100)
                </span>
                {onNavigateTab && (
                  <button
                    id="btn-jump-to-trach-cat-full"
                    type="button"
                    onClick={() => onNavigateTab('trach-cat')}
                    className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Tra cứu chi tiết</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Nghi & Kỵ Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Việc nên làm (Nghi):</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  {almanac.viecNenLam.join(', ')}
                </p>
              </div>

              <div className="p-3 bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-1">
                <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Việc nên tránh (Kỵ):</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  {almanac.viecKiengKy.join(', ')}
                </p>
              </div>
            </div>

            {/* Cát Tinh (Sao Tốt) & Hung Tinh (Sao Xấu) Elements */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowStarsDetail((prev) => !prev)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showStarsDetail ? 'Thu gọn Thần Sát' : 'Xem Thần Sát Cát Tinh & Hung Tinh chi tiết'}</span>
              </button>

              {showStarsDetail && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs">
                  {/* Cát Thần */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-emerald-500/30 rounded-xl space-y-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cát Thần (Sao Tốt - {almanac.catThan.length}):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {almanac.catThan.map((s, idx) => (
                        <span
                          key={idx}
                          title={s.description}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-[11px] font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hung Thần */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-rose-500/30 rounded-xl space-y-2">
                    <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Hung Thần (Sao Xấu - {almanac.hungThan.length}):</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {almanac.hungThan.map((s, idx) => (
                        <span
                          key={idx}
                          title={s.description}
                          className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/20 text-[11px] font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="pt-4 border-t border-amber-900/15 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
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
            <div className="flex flex-wrap items-center gap-2">
              {onNavigateTab && (
                <>
                  <button
                    id="btn-daily-jump-kymon"
                    type="button"
                    onClick={() => onNavigateTab('kymon-chart')}
                    className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-bold rounded-xl border border-amber-500/40 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Lập Quẻ Kỳ Môn (Không - Thời Gian)</span>
                  </button>
                  <button
                    id="btn-daily-jump-lucnham"
                    type="button"
                    onClick={() => onNavigateTab('luc-nham')}
                    className="px-3.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-900 dark:text-purple-200 text-xs font-bold rounded-xl border border-purple-500/40 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Lập Quẻ Lục Nhâm (Quá Trình Thành Bại)</span>
                  </button>
                  <button
                    id="btn-daily-jump-prognostication"
                    type="button"
                    onClick={() => onNavigateTab('kymon-prognostication')}
                    className="px-3 py-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-900 dark:text-cyan-200 text-xs font-bold rounded-xl border border-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>Dự Trắc Song Thức</span>
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
