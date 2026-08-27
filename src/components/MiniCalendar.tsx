import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  RotateCcw,
  Sparkles,
  Clock,
  ChevronDown,
} from 'lucide-react';

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isLive?: boolean;
  onSetLive?: (live: boolean) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  currentDate,
  onDateChange,
  isLive,
  onSetLive,
}) => {
  // Convert date to Vietnam timezone (UTC+7) components
  const getVNComponents = (d: Date) => {
    const vnTime = new Date(d.getTime() + 7 * 3600 * 1000);
    return {
      year: vnTime.getUTCFullYear(),
      month: vnTime.getUTCMonth(), // 0..11
      day: vnTime.getUTCDate(),
      hours: vnTime.getUTCHours(),
      minutes: vnTime.getUTCMinutes(),
      seconds: vnTime.getUTCSeconds(),
    };
  };

  const activeVN = useMemo(() => getVNComponents(currentDate), [currentDate]);

  // Today in VN timezone
  const todayVN = useMemo(() => getVNComponents(new Date()), []);

  // Viewing month and year state
  const [viewYear, setViewYear] = useState<number>(activeVN.year);
  const [viewMonth, setViewMonth] = useState<number>(activeVN.month);

  // Sync view when active date changes externally
  useEffect(() => {
    setViewYear(activeVN.year);
    setViewMonth(activeVN.month);
  }, [activeVN.year, activeVN.month]);

  // Handle month step
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleTodayClick = () => {
    const now = new Date();
    onSetLive?.(true);
    onDateChange(now);
  };

  const handleSelectDay = (year: number, month: number, day: number) => {
    const utcMillis =
      Date.UTC(year, month, day, activeVN.hours, activeVN.minutes, activeVN.seconds) -
      7 * 3600 * 1000;
    const newDate = new Date(utcMillis);
    onSetLive?.(false);
    onDateChange(newDate);
  };

  const handleStepDay = (days: number) => {
    const newDate = new Date(currentDate.getTime() + days * 86400 * 1000);
    onSetLive?.(false);
    onDateChange(newDate);
  };

  // Generate calendar grid (Monday to Sunday)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(Date.UTC(viewYear, viewMonth, 1));
    // getUTCDay: 0 (Sun), 1 (Mon), ..., 6 (Sat)
    let startDayOfWeek = firstDayOfMonth.getUTCDay();
    // Convert to Monday = 0, ..., Sunday = 6
    let mondayOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const daysInCurrentMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const daysInPrevMonth = new Date(Date.UTC(viewYear, viewMonth, 0)).getUTCDate();

    const days: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      isActive: boolean;
      isToday: boolean;
    }> = [];

    // Preceding month days
    for (let i = mondayOffset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
      days.push({
        day: d,
        month: prevM,
        year: prevY,
        isCurrentMonth: false,
        isActive:
          prevY === activeVN.year && prevM === activeVN.month && d === activeVN.day,
        isToday:
          prevY === todayVN.year && prevM === todayVN.month && d === todayVN.day,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      days.push({
        day: d,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
        isActive:
          viewYear === activeVN.year &&
          viewMonth === activeVN.month &&
          d === activeVN.day,
        isToday:
          viewYear === todayVN.year &&
          viewMonth === todayVN.month &&
          d === todayVN.day,
      });
    }

    // Trailing next month days to complete 6-row or 5-row grid (multiple of 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
      days.push({
        day: d,
        month: nextM,
        year: nextY,
        isCurrentMonth: false,
        isActive:
          nextY === activeVN.year && nextM === activeVN.month && d === activeVN.day,
        isToday:
          nextY === todayVN.year && nextM === todayVN.month && d === todayVN.day,
      });
    }

    return days;
  }, [viewYear, viewMonth, activeVN, todayVN]);

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const weekDayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div
      id="persistent-mini-calendar"
      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
    >
      {/* Top Header: Title & Quick Date Step */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Lịch Tra Cứu Nhanh</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-normal">
                {activeVN.day}/{activeVN.month + 1}/{activeVN.year}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Nhấp vào ô ngày để chuyển thời điểm</p>
          </div>
        </div>

        {/* Step Prev/Next Day + Today */}
        <div className="flex items-center gap-1">
          <button
            id="btn-cal-prev-day"
            type="button"
            onClick={() => handleStepDay(-1)}
            title="Lùi 1 ngày"
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-mono transition-colors cursor-pointer border border-slate-700"
          >
            -1N
          </button>
          <button
            id="btn-cal-today"
            type="button"
            onClick={handleTodayClick}
            title="Về thời điểm hiện tại"
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer border flex items-center gap-1 ${
              isLive
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <RotateCcw className={`w-3 h-3 ${isLive ? 'animate-spin' : ''}`} />
            <span>Hôm nay</span>
          </button>
          <button
            id="btn-cal-next-day"
            type="button"
            onClick={() => handleStepDay(1)}
            title="Tiến 1 ngày"
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-mono transition-colors cursor-pointer border border-slate-700"
          >
            +1N
          </button>
        </div>
      </div>

      {/* Month & Year Navigation Selector */}
      <div className="flex items-center justify-between bg-slate-950/80 rounded-xl p-2 border border-slate-800/80 mb-3">
        <button
          id="btn-cal-prev-month"
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tháng trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <select
            id="select-cal-month"
            value={viewMonth}
            onChange={(e) => setViewMonth(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-xs font-semibold text-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {monthNames.map((mName, idx) => (
              <option key={idx} value={idx}>
                {mName}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          <input
            id="input-cal-year"
            type="number"
            value={viewYear}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 1000 && val <= 3000) {
                setViewYear(val);
              }
            }}
            className="bg-slate-900 border border-slate-700 text-xs font-mono font-semibold text-amber-300 rounded-lg px-2 py-1 w-20 text-center focus:outline-none focus:border-amber-500 cursor-pointer"
          />
        </div>

        <button
          id="btn-cal-next-month"
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tháng sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-1.5">
        {weekDayLabels.map((wd, i) => (
          <div
            key={wd}
            className={`py-1 ${
              i === 6 ? 'text-rose-400/90' : i === 5 ? 'text-amber-400/90' : 'text-slate-400'
            }`}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar Grid Cells */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {calendarDays.map((cell, idx) => {
          const isWeekend = idx % 7 === 5 || idx % 7 === 6;

          let cellClass =
            'relative h-8 sm:h-9 flex items-center justify-center rounded-lg font-mono text-xs transition-all cursor-pointer select-none';

          if (cell.isActive) {
            cellClass +=
              ' bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/30 ring-2 ring-amber-300 ring-offset-1 ring-offset-slate-900 scale-105 z-10';
          } else if (cell.isToday) {
            cellClass +=
              ' bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/40 hover:bg-emerald-500/25';
          } else if (cell.isCurrentMonth) {
            if (isWeekend) {
              cellClass +=
                ' bg-slate-950/70 text-slate-200 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-800/60';
            } else {
              cellClass +=
                ' bg-slate-950/50 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/40';
            }
          } else {
            // Out of current month
            cellClass +=
              ' bg-slate-950/20 text-slate-600 hover:bg-slate-800/50 hover:text-slate-400 border border-transparent';
          }

          return (
            <button
              key={`${cell.year}-${cell.month}-${cell.day}-${idx}`}
              type="button"
              onClick={() => handleSelectDay(cell.year, cell.month, cell.day)}
              className={cellClass}
              title={`Ngày ${cell.day}/${cell.month + 1}/${cell.year}`}
            >
              <span>{cell.day}</span>
              {cell.isToday && !cell.isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info / Selected Date Detail */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
          <span>Đang chọn:</span>
          <span className="font-mono text-amber-300 font-semibold">
            {String(activeVN.day).padStart(2, '0')}/{String(activeVN.month + 1).padStart(2, '0')}/{activeVN.year}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>
            {String(activeVN.hours).padStart(2, '0')}:{String(activeVN.minutes).padStart(2, '0')}:{String(activeVN.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
