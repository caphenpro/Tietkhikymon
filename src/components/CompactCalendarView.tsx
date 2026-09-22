import React, { useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sun,
  Moon,
} from 'lucide-react';
import { calculateDailyAlmanac, DailyAlmanacInfo } from '../astronomy/dailyAlmanac';
import { calculateComprehensiveResult } from '../astronomy/calculator';

interface CompactCalendarViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNavigateTab: (tabId: string) => void;
}

export const CompactCalendarView: React.FC<CompactCalendarViewProps> = ({
  currentDate,
  onDateChange,
  onNavigateTab,
}) => {
  const almanac: DailyAlmanacInfo = useMemo(() => {
    return calculateDailyAlmanac(currentDate);
  }, [currentDate]);

  const result = useMemo(() => {
    return calculateComprehensiveResult(currentDate);
  }, [currentDate]);

  const handlePrevDay = () => {
    const prev = new Date(currentDate.getTime() - 24 * 3600 * 1000);
    onDateChange(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate.getTime() + 24 * 3600 * 1000);
    onDateChange(next);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const getLocalDateInputVal = (d: Date) => {
    const vn = new Date(d.getTime() + 7 * 3600 * 1000);
    const y = vn.getUTCFullYear();
    const m = String(vn.getUTCMonth() + 1).padStart(2, '0');
    const day = String(vn.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split('-').map(Number);
    const currentVN = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    const h = currentVN.getUTCHours();
    const min = currentVN.getUTCMinutes();
    const s = currentVN.getUTCSeconds();
    const utcMillis = Date.UTC(y, m - 1, d, h, min, s) - 7 * 3600 * 1000;
    onDateChange(new Date(utcMillis));
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. TOP HEADER & DATE PICKER STRIP */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-500" />
            <span>Tra Cứu Lịch & Tiết Khí Tối Giản</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dữ liệu hỗ trợ đối chiếu ngày giờ cát hung trước khi gieo quẻ Kỳ Môn & Lục Nhâm
          </p>
        </div>

        {/* Quick Date Control */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Ngày trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <input
            type="date"
            value={getLocalDateInputVal(currentDate)}
            onChange={handleDateSelect}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          />

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            title="Ngày sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleToday}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Về ngày hôm nay"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Hôm nay</span>
          </button>
        </div>
      </div>

      {/* 2. CORE INFORMATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CARD 1: DƯƠNG LỊCH & ÂM LỊCH THIÊN VĂN */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Lịch Dương & Âm
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-mono">
              {almanac.dayOfWeekText}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 min-w-[70px]">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {almanac.solarDay}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">
                Tháng {almanac.solarMonth}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Âm Lịch:</span>
                <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                  {almanac.lunarDay}/{almanac.lunarMonth}
                  {almanac.isLeapMonth ? ' (Nhuận)' : ''}
                </strong>
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                Năm <strong>{almanac.lunarYearCanChi}</strong>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                Ngày <strong>{almanac.lunarDayCanChi}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: BÁT TỰ TỨ TRỤ & TIẾT KHÍ */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Bát Tự Tứ Trụ
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5" />
              <span>{almanac.currentSolarTermName}</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Năm</span>
              <strong className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {almanac.batTu.yearCanChi}
              </strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Tháng</span>
              <strong className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {almanac.batTu.monthCanChi}
              </strong>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block font-bold">Ngày</span>
              <strong className="text-xs font-mono text-amber-700 dark:text-amber-300">
                {almanac.batTu.dayCanChi}
              </strong>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 block font-bold">Giờ</span>
              <strong className="text-xs font-mono text-cyan-700 dark:text-cyan-300">
                {almanac.batTu.hourCanChi}
              </strong>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 flex items-center justify-between">
            <span>Cục Kỳ Môn: <strong>{result.kyMon.cucResultText}</strong></span>
            <span>Tiết Khí: <strong>{result.currentTerm.name}</strong></span>
          </div>
        </div>

        {/* CARD 3: HOÀNG ĐẠO & TRỰC NGÀY */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Cát Hung Hiệp Kỷ
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                almanac.isHoangDaoDay
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {almanac.isHoangDaoDay ? '✨ Ngày Hoàng Đạo' : 'Ngày Hắc Đạo'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Trực ngày (12 Trực):</span>
              <strong className="text-slate-800 dark:text-slate-200 font-medium">
                Trực {almanac.truc.name} ({almanac.truc.category})
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Nhị Thập Bát Tú:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-medium">
                Sao {almanac.nhiThapBatTu.name} ({almanac.nhiThapBatTu.nature})
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Sao Chủ Ngày:</span>
              <strong className="text-slate-800 dark:text-slate-200 font-medium">
                {almanac.hoangDaoStarName}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GIỜ HOÀNG ĐẠO TRONG NGÀY */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Giờ Hoàng Đạo Trong Ngày (Giờ Tốt Chiêm Quẻ)</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Chọn giờ tốt để tăng độ ứng nghiệm khi cầu sự
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {almanac.hoangDaoHours.map((h, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300/40 dark:border-emerald-500/30 text-center"
            >
              <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 font-mono">
                {h.chi} ({h.timeRange})
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                {h.starName} ({h.canChi})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FAST JUMP TO DIVINATION CHARTS (CHÍNH YẾU CỦA ỨNG DỤNG) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-indigo-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Bắt Đầu Lập Quẻ Với Thời Khắc Này</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Toàn bộ thông số Tứ Trụ, Tiết Khí, Can Chi của ngày giờ đã chọn sẽ tự động nạp thẳng vào bàn cờ Kỳ Môn Độn Giáp 9 Cung và Đại Lục Nhâm Tam Truyền.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigateTab('kymon-chart')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>🔮</span>
            <span>Mở Quẻ Kỳ Môn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('luc-nham')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>🧭</span>
            <span>Mở Quẻ Lục Nhâm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
