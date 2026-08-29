import React, { useState } from 'react';
import {
  Moon,
  Calendar,
  Clock,
  Sparkles,
  Orbit,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowLeft,
  ArrowRight,
  Compass,
  BookOpen,
  Info,
  Sun,
  ChevronRight,
  HelpCircle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { NewMoonInfo } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

// Helper formatting Vietnamese Date and Time with exact hours, minutes, seconds
function formatVNTimeDetails(date: Date) {
  const d = new Date(date.getTime() + 7 * 3600 * 1000);
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, '0');
  const D = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return {
    timeHms: `${h}:${m}:${s}`,
    timeHm: `${h}:${m}`,
    dateSlash: `${D}/${M}/${Y}`,
    fullString: `${h}:${m}:${s}, ngày ${D}/${M}/${Y}`,
    compactString: `${h}:${m}:${s} • ${D}/${M}/${Y}`,
    timeAndDate: `${h}:${m} (${D}/${M})`,
    isoDate: `${Y}-${M}-${D}`,
  };
}

interface LunarNewMoonSectionProps {
  newMoon: NewMoonInfo;
  calculationDate: Date;
  onNavigateTab?: (tabId: string) => void;
}

export const LunarNewMoonSection: React.FC<LunarNewMoonSectionProps> = ({
  newMoon,
  calculationDate,
  onNavigateTab,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const percentComplete = Math.min(
    100,
    Math.max(0, Math.round((newMoon.lunarDay / newMoon.totalMonthDays) * 100))
  );

  const leapInfo = newMoon.yearLeapInfo;

  return (
    <div className="space-y-6">
      {/* Top Main Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-56 h-56 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Moon className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Âm Lịch & Điểm Sóc Thiên Văn
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  newMoon.isLeapMonth
                    ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                }`}>
                  {newMoon.fullMonthDisplay}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {newMoon.monthType}
                </span>
                {leapInfo && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    leapInfo.hasLeapMonth
                      ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {leapInfo.hasLeapMonth ? `Năm Nhuận (${leapInfo.leapMonthDisplay})` : 'Năm Không Nhuận'}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Định vị chu kỳ hội tụ Nhật - Nguyệt • Khoảng cách 2 điểm Sóc & Tiết Khí định tháng
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-left md:text-right shrink-0">
            <div className="text-[11px] uppercase text-slate-400 font-semibold tracking-wider">
              Hôm nay Âm Lịch (UTC+7)
            </div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono mt-0.5">
              Ngày {newMoon.lunarDay < 10 ? `Mùng ${newMoon.lunarDay}` : newMoon.lunarDay}
            </div>
            <div className="text-xs font-mono text-slate-300 mt-0.5">
              {newMoon.fullMonthDisplay} • Năm {newMoon.lunarYearCanChi}
            </div>
          </div>
        </div>

        {/* Full Date Banner */}
        <div className="mt-5 bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs text-slate-400 font-medium">Toàn văn ngày tháng âm lịch:</span>
              <div className="text-base sm:text-lg font-bold text-white font-mono">
                {newMoon.lunarFullDateText}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {newMoon.lunarDay} / {newMoon.totalMonthDays} ngày ({percentComplete}% tuần trăng)
          </div>
        </div>

        {/* Lunar Month Timeline Visualizer */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Tiến độ tuần trăng trong tháng: Ngày {newMoon.lunarDay} / {newMoon.totalMonthDays}</span>
            <span className="font-mono text-cyan-400 font-semibold">{percentComplete}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          {/* 4 Moon Phases Markers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-base mb-1">🌑</div>
              <div className="font-semibold text-slate-200">Điểm Sóc (0°)</div>
              <div className="text-[10px] text-slate-400">Mùng 1 (Trăng mới)</div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-base mb-1">🌓</div>
              <div className="font-semibold text-slate-200">Thượng Huyền (90°)</div>
              <div className="text-[10px] text-slate-400">Mùng 7 - Mùng 8</div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-base mb-1">🌕</div>
              <div className="font-semibold text-slate-200">Điểm Vọng (180°)</div>
              <div className="text-[10px] text-slate-400">Ngày 15 (Trăng tròn)</div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-base mb-1">🌗</div>
              <div className="font-semibold text-slate-200">Hạ Huyền (270°)</div>
              <div className="text-[10px] text-slate-400">Ngày 22 - Ngày 23</div>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED LEAP MONTH & YEAR CYCLE SECTION */}
      {leapInfo && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-5">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${
                leapInfo.hasLeapMonth
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Tháng Nhuận & Chu Kỳ Năm Âm Lịch {leapInfo.lunarYearCanChi}</span>
                  <span className="text-xs font-mono text-slate-400 font-normal">({leapInfo.lunarYear})</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Tra cứu chi tiết tình trạng tháng nhuận, độ dài năm và danh sách các tháng âm lịch
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                leapInfo.hasLeapMonth
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
              }`}>
                {leapInfo.hasLeapMonth ? `NĂM NHUẬN (${leapInfo.totalMonthsInYear} Tháng)` : `NĂM THƯỜNG (${leapInfo.totalMonthsInYear} Tháng)`}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                {leapInfo.totalDaysInYear} ngày
              </span>
            </div>
          </div>

          {/* Main Leap Status Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: Leap Status Highlight (2 cols) */}
            <div className={`lg:col-span-2 p-4 sm:p-5 rounded-xl border space-y-3.5 ${
              leapInfo.hasLeapMonth
                ? 'bg-amber-950/20 border-amber-500/30'
                : 'bg-slate-950/60 border-slate-800'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${leapInfo.hasLeapMonth ? 'text-amber-300' : 'text-emerald-300'}`}>
                    {leapInfo.hasLeapMonth ? `🌙 ${leapInfo.leapMonthDisplay}` : '✨ Năm Nay Không Có Tháng Nhuận'}
                  </span>
                </div>

                {leapInfo.hasLeapMonth && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    leapInfo.leapMonthStatus === 'current'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 animate-pulse'
                      : leapInfo.leapMonthStatus === 'upcoming'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {leapInfo.leapMonthStatus === 'current'
                      ? '● Hiện Đang Là Tháng Nhuận Này'
                      : leapInfo.leapMonthStatus === 'upcoming'
                      ? '⏳ Sắp Tới Trong Năm'
                      : '✓ Đã Kết Thúc Trong Năm'}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {leapInfo.leapStatusDescription}
              </p>

              {/* Date Interval and Details for Leap Month */}
              {leapInfo.hasLeapMonth && leapInfo.leapMonthStartDate && leapInfo.leapMonthEndDate && (() => {
                const sLeap = formatVNTimeDetails(leapInfo.leapMonthStartDate);
                const eLeap = formatVNTimeDetails(leapInfo.leapMonthEndDate);
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[11px] block flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" />
                        Mùng 1 (Bắt đầu DL):
                      </span>
                      <span className="font-mono font-bold text-white block">
                        {sLeap.timeHms}
                      </span>
                      <span className="font-mono text-slate-300 text-[11px] block">
                        {sLeap.dateSlash} (Dương lịch)
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[11px] block flex items-center gap-1">
                        <Moon className="w-3 h-3 text-cyan-400" />
                        Hết tháng (Kết thúc DL):
                      </span>
                      <span className="font-mono font-bold text-white block">
                        {eLeap.timeHms}
                      </span>
                      <span className="font-mono text-slate-300 text-[11px] block">
                        {eLeap.dateSlash} (Dương lịch)
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[11px] block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Độ dài tháng nhuận:
                      </span>
                      <span className="font-mono font-bold text-amber-300 block">
                        {leapInfo.leapMonthTotalDays} ngày
                      </span>
                      <span className="text-slate-400 text-[11px] block">
                        {leapInfo.leapMonthDaysType}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Status Note */}
              <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                <strong className="text-cyan-300">Nhận định trạng thái: </strong>
                <span>{leapInfo.leapMonthStatusText}</span>
              </div>
            </div>

            {/* Right: Astronomical Reason (1 col) */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Orbit className="w-4 h-4 text-cyan-400" />
                  <span>Nguyên Lý Thiên Văn Lịch</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {leapInfo.leapAstronomicalReason}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200">Chu kỳ Meton 19 năm:</div>
                <p>19 năm dương lịch = 235 tuần trăng = 19 năm âm lịch + 7 tháng nhuận.</p>
              </div>
            </div>
          </div>

          {/* All Months in This Lunar Year Visual Grid / Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Bảng Danh Sách {leapInfo.totalMonthsInYear} Tháng Trong Năm {leapInfo.lunarYearCanChi}</span>
                  <span className="text-xs font-mono font-normal text-slate-400">({leapInfo.lunarYear})</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Thời gian bắt đầu (Mùng 1 - Điểm Sóc) đến khi kết thúc tháng (Điểm Sóc kế) quy đổi chính xác theo Dương lịch (UTC+7)
                </p>
              </div>

              {/* View Mode Toggle Switch */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'cards'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Dạng Thẻ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'table'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Dạng Bảng</span>
                </button>
              </div>
            </div>

            {/* CARDS VIEW */}
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-xs">
                {leapInfo.months.map((m, idx) => {
                  const sInfo = formatVNTimeDetails(m.startDate);
                  const eInfo = formatVNTimeDetails(m.endDate);

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all space-y-3 relative flex flex-col justify-between ${
                        m.isCurrent
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-lg ring-1 ring-cyan-500/50'
                          : m.isLeap
                          ? 'bg-amber-950/20 border-amber-500/50 hover:border-amber-500/80'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${
                                m.isCurrent
                                  ? 'text-cyan-300'
                                  : m.isLeap
                                  ? 'text-amber-300'
                                  : 'text-white'
                              }`}>
                                {m.monthName}
                              </span>
                              {m.isCurrent && (
                                <span className="flex h-2 w-2 relative">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {m.totalDays === 30 ? 'Tháng Đủ (30 ngày)' : 'Tháng Thiếu (29 ngày)'}
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                              m.isLeap
                                ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                                : 'bg-slate-900 text-slate-300 border-slate-700'
                            }`}>
                              {m.isLeap ? 'Tháng Nhuận' : 'Chính Tháng'}
                            </span>
                            {m.isCurrent && (
                              <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-wider bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/40">
                                Đang diễn ra
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Solar Datetime Timeline Container */}
                        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 space-y-2 mt-2">
                          {/* Solar Start */}
                          <div className="space-y-0.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="flex items-center gap-1 font-medium text-slate-300">
                                <Sun className="w-3 h-3 text-amber-400 shrink-0" />
                                <span>Bắt đầu (Mùng 1):</span>
                              </span>
                              <span className="font-mono text-cyan-300 font-bold">{sInfo.timeHms}</span>
                            </div>
                            <div className="text-right font-mono text-[11px] text-slate-200">
                              {sInfo.dateSlash} <span className="text-slate-400 text-[10px]">(Dương lịch)</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-800/80 my-1" />

                          {/* Solar End */}
                          <div className="space-y-0.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="flex items-center gap-1 font-medium text-slate-300">
                                <Moon className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span>Kết thúc (Hết tháng):</span>
                              </span>
                              <span className="font-mono text-amber-300 font-bold">{eInfo.timeHms}</span>
                            </div>
                            <div className="text-right font-mono text-[11px] text-slate-200">
                              {eInfo.dateSlash} <span className="text-slate-400 text-[10px]">(Dương lịch)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tiết Khí contained in month */}
                      {m.terms && m.terms.length > 0 && (
                        <div className="pt-1 text-[11px] border-t border-slate-800/70 space-y-1">
                          <span className="text-[10px] text-slate-400 block font-medium">Tiết Khí trong tháng:</span>
                          <div className="flex flex-wrap gap-1">
                            {m.terms.map((t, tidx) => {
                              const tTime = formatVNTimeDetails(t.exactDate);
                              return (
                                <span
                                  key={tidx}
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                                    t.category === 'Tiết'
                                      ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                                      : 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
                                  }`}
                                  title={`${t.category} ${t.name}: ${tTime.fullString}`}
                                >
                                  {t.name} ({tTime.timeAndDate})
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* DETAILED TABLE VIEW */
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px]">
                      <th className="p-3 font-semibold">Tháng Âm Lịch</th>
                      <th className="p-3 font-semibold">Bắt Đầu (Mùng 1 - Giờ & Ngày DL)</th>
                      <th className="p-3 font-semibold">Kết Thúc (Hết Tháng - Giờ & Ngày DL)</th>
                      <th className="p-3 font-semibold text-center">Độ Dài</th>
                      <th className="p-3 font-semibold">Tiết Khí Trong Tháng</th>
                      <th className="p-3 font-semibold text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leapInfo.months.map((m, idx) => {
                      const sInfo = formatVNTimeDetails(m.startDate);
                      const eInfo = formatVNTimeDetails(m.endDate);

                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            m.isCurrent
                              ? 'bg-cyan-950/30 text-cyan-100 font-medium'
                              : m.isLeap
                              ? 'bg-amber-950/15 hover:bg-amber-950/25'
                              : 'hover:bg-slate-900/60 text-slate-300'
                          }`}
                        >
                          {/* Month Name */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${
                                m.isCurrent
                                  ? 'text-cyan-300'
                                  : m.isLeap
                                  ? 'text-amber-300'
                                  : 'text-white'
                              }`}>
                                {m.monthName}
                              </span>
                              {m.isLeap && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                                  Nhuận
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Start Solar */}
                          <td className="p-3 font-mono">
                            <div className="text-cyan-300 font-bold">{sInfo.timeHms}</div>
                            <div className="text-slate-300 text-[11px]">{sInfo.dateSlash}</div>
                          </td>

                          {/* End Solar */}
                          <td className="p-3 font-mono">
                            <div className="text-amber-300 font-bold">{eInfo.timeHms}</div>
                            <div className="text-slate-300 text-[11px]">{eInfo.dateSlash}</div>
                          </td>

                          {/* Length */}
                          <td className="p-3 text-center font-mono">
                            <span className={`px-2 py-0.5 rounded text-[11px] ${
                              m.totalDays === 30
                                ? 'bg-slate-900 text-slate-200 border border-slate-700'
                                : 'bg-slate-900/60 text-slate-400'
                            }`}>
                              {m.totalDays} ngày ({m.totalDays === 30 ? 'Đủ' : 'Thiếu'})
                            </span>
                          </td>

                          {/* Terms */}
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {m.terms && m.terms.length > 0 ? (
                                m.terms.map((t, tidx) => {
                                  const tTime = formatVNTimeDetails(t.exactDate);
                                  return (
                                    <span
                                      key={tidx}
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                                        t.category === 'Tiết'
                                          ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                                          : 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
                                      }`}
                                    >
                                      {t.name} ({tTime.timeAndDate})
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-slate-500 text-[11px] italic">Vô trung khí</span>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="p-3 text-center">
                            {m.isCurrent ? (
                              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/40 inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                Đang diễn ra
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rules & Solar Terms Analysis for this Lunar Month */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules & Definition Card (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Quy Chuẩn Thiên Văn Định Tháng Âm Lịch</h4>
              <p className="text-xs text-slate-400">Nguyên lý điểm Sóc & phối hợp Tiết Khí</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">1. Khoảng cách giữa 2 điểm Sóc:</span>
                <p className="text-slate-400 mt-0.5">
                  Tháng âm lịch bắt đầu chính xác từ Điểm Sóc (Mùng 1) đến Điểm Sóc tiếp theo. Độ dài chu kỳ giao hội là 29 ngày (tháng thiếu) hoặc 30 ngày (tháng đủ).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">2. Điều kiện đủ Tiết khí và Trung khí:</span>
                <p className="text-slate-400 mt-0.5">
                  Một tháng âm lịch chính quy phải chứa đủ cả 1 Tiết (Tiết lệnh) và 1 Khí (Trung khí). Cụ thể <strong>Tháng 1 (Tháng Giêng)</strong> là tháng chứa Tiết <em>Lập Xuân</em> và Trung khí <em>Vũ Thủy</em>.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">3. Quy tắc Tháng Nhuận:</span>
                <p className="text-slate-400 mt-0.5">
                  Nếu một tháng âm lịch chỉ có Khí mà không có Tiết (hoặc thiếu cặp Tiết & Khí chuẩn), tháng đó được xác định là <strong>Tháng Nhuận</strong> của tháng đó (như Tháng 2 Nhuận, Tháng 6 Nhuận...).
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-medium">
            <span className="text-amber-400 font-semibold">Kết luận tháng hiện tại: </span>
            <span>{newMoon.monthRuleExplanation}</span>
          </div>
        </div>

        {/* Solar Terms Inside This Month (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Orbit className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Tiết Khí Trong Tháng Này</h4>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                {newMoon.termsInMonth.length} Sự kiện
              </span>
            </div>

            <div className="space-y-2.5 mt-3">
              {newMoon.termsInMonth.length === 0 && (
                <div className="p-3 rounded-xl bg-slate-950/60 text-slate-400 text-xs text-center">
                  Không có tiết khí nào rơi vào khoảng giữa 2 điểm Sóc này.
                </div>
              )}

              {newMoon.termsInMonth.map((term, idx) => {
                const isTiet = term.category === 'Tiết';
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{term.name} ({term.degree}°)</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                          isTiet
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {isTiet ? 'Tiết lệnh' : 'Trung khí'}
                      </span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px]">
                      {formatVietnamDateTime(term.exactDate)} (UTC+7)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 font-mono">
            {newMoon.hasTiet && newMoon.hasKhi
              ? '✓ Đủ cả Tiết và Khí (Tháng chính)'
              : newMoon.hasKhi && !newMoon.hasTiet
              ? '⚠ Chỉ có Khí không có Tiết (Tháng nhuận)'
              : '⚠ Thiếu Tiết hoặc Khí'}
          </div>
        </div>
      </div>

      {/* Two Detailed Sóc Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Sóc */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Điểm Sóc Trước Đó (Mùng 1 Đầu Tháng)</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-500/30">
              Đã diễn ra
            </span>
          </div>

          <div className="text-xs space-y-2 text-slate-300">
            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Thời điểm chính xác:</span>
              <span className="font-mono text-white font-medium">
                {formatVietnamDateTime(newMoon.prevSocDate)}
              </span>
            </div>

            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Đã trôi qua:</span>
              <span className="font-mono text-emerald-300 font-medium">
                {newMoon.prevPassedString}
              </span>
            </div>

            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Quy đổi số ngày:</span>
              <span className="font-mono text-slate-300">
                {newMoon.prevPassedDays.toFixed(4)} ngày
              </span>
            </div>
          </div>
        </div>

        {/* Next Sóc */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Điểm Sóc Tiếp Theo (Mùng 1 Tháng Sau)</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-500/30">
              Sắp tới
            </span>
          </div>

          <div className="text-xs space-y-2 text-slate-300">
            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Thời điểm chính xác:</span>
              <span className="font-mono text-white font-medium">
                {formatVietnamDateTime(newMoon.nextSocDate)}
              </span>
            </div>

            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Còn lại:</span>
              <span className="font-mono text-cyan-300 font-medium">
                {newMoon.nextRemainingString}
              </span>
            </div>

            <div className="flex justify-between py-1 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400">Quy đổi số ngày:</span>
              <span className="font-mono text-slate-300">
                {newMoon.nextRemainingDays.toFixed(4)} ngày
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      {onNavigateTab && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            id="btn-moon-back-overview"
            onClick={() => onNavigateTab('overview')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Tổng Quát</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-moon-goto-table"
              onClick={() => onNavigateTab('table')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Bảng 24 Tiết Khí</span>
            </button>

            <button
              id="btn-moon-goto-chart"
              onClick={() => onNavigateTab('kymon-chart')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bàn Kỳ Môn 9 Cung</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-moon-goto-prognostication"
              onClick={() => onNavigateTab('kymon-prognostication')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dự Trắc Kỳ Môn</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
