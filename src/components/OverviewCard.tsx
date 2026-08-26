import React from 'react';
import { Sun, Moon, Calendar, Sparkles, Orbit, Clock, ChevronRight, Layers } from 'lucide-react';
import { ComprehensiveResult } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface OverviewCardProps {
  result: ComprehensiveResult;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ result }) => {
  const { currentTerm, nextTerm, batTu, newMoon, solarLongitude, solarLongitudeDMS } = result;

  const isTiet = currentTerm.category === 'Tiết';

  return (
    <div className="space-y-6">
      {/* Top Main Banner: Current Solar Term & Solar Coordinates */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        {/* Subtle background decorative element */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Term Highlight */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Sun className="w-8 h-8 sm:w-9 sm:h-9 text-amber-400 animate-pulse" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Tiết Khí Thiên Văn Đương Lệnh
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                    isTiet
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {isTiet ? 'Tiết (Tiết Lệnh Quản Bát Tự)' : 'Khí (Trung Khí)'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  {currentTerm.cungName} (Cung {currentTerm.cungNumber})
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                <span>{currentTerm.name}</span>
                <span className="text-amber-400 text-lg sm:text-xl font-mono font-semibold">
                  ({currentTerm.degree}°)
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 flex items-center gap-2">
                <span className="text-slate-400">Bắt đầu:</span>
                <span className="font-mono text-white font-medium">
                  {formatVietnamDateTime(currentTerm.startDate)}
                </span>
                <span className="text-slate-400">(Giờ VN UTC+7)</span>
              </p>
            </div>
          </div>

          {/* Sun Ecliptic Longitude Card */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 min-w-[260px] flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Orbit className="w-3.5 h-3.5 text-amber-400" />
                Kinh Độ Mặt Trời (☉)
              </span>
              <span className="font-mono text-[11px] text-amber-400/80">Hoàng Đạo</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300 tracking-wide">
              {solarLongitudeDMS}
            </div>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              {solarLongitude.toFixed(6)}°
            </div>
          </div>
        </div>

        {/* Term Elapsed / Remaining Progress Info */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/60 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Đã trôi qua trong tiết:
            </span>
            <span className="font-mono font-medium text-emerald-300">
              {currentTerm.passedString}
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/60 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Còn lại đến <span className="text-amber-300 font-semibold">{nextTerm.name} ({nextTerm.degree}°)</span>:
            </span>
            <span className="font-mono font-medium text-amber-300">
              {nextTerm.remainingString}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Two Core Cards: Bát Tự & Âm Lịch Điểm Sóc */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Bát Tự Tứ Trụ Can Chi */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bát Tự (Tứ Trụ Can Chi)</h3>
                  <p className="text-xs text-slate-400">Tính theo Tiết Lệnh thiên văn & Hoa Giáp</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 rounded">
                Năm TV {batTu.solarYear}
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-4 gap-2 text-center my-3">
              {/* Năm */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Năm
                </div>
                <div className="text-sm sm:text-base font-bold text-amber-300 font-mono">
                  {batTu.yearCanChi}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Lập Xuân mốc</div>
              </div>

              {/* Tháng */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Tháng
                </div>
                <div className="text-sm sm:text-base font-bold text-cyan-300 font-mono">
                  {batTu.monthCanChi}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Tiết Lệnh</div>
              </div>

              {/* Ngày */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Ngày
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
                  {batTu.dayCanChi}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Nhật Nguyên</div>
              </div>

              {/* Giờ */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Giờ
                </div>
                <div className="text-sm sm:text-base font-bold text-purple-300 font-mono">
                  {batTu.hourCanChi}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Thời Trụ</div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg font-mono">
            <span className="text-slate-400">Bát tự đầy đủ: </span>
            <span className="text-white font-semibold">{batTu.fullText}</span>
          </div>
        </div>

        {/* Card 2: Âm Lịch & Điểm Sóc Thiên Văn */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Âm Lịch & Chu Kỳ Điểm Sóc</h3>
                  <p className="text-xs text-slate-400">Khoảng cách 2 điểm Sóc & Tiết Khí định tháng</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
                  Ngày {newMoon.lunarDay < 10 ? `Mùng ${newMoon.lunarDay}` : newMoon.lunarDay}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  newMoon.isLeapMonth 
                    ? 'bg-amber-950/70 text-amber-300 border-amber-500/40' 
                    : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                }`}>
                  {newMoon.fullMonthDisplay}
                </span>
              </div>
            </div>

            {/* Lunar Full Date Banner */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Thời Điểm Âm Lịch
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                    {newMoon.lunarFullDateText}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${
                  newMoon.totalMonthDays === 30
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {newMoon.monthType}
                </span>
              </div>

              {/* Solar Terms contained in this Lunar Month */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-1 text-slate-300">
                <span className="text-slate-400">Tiết khí trong tháng:</span>
                <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
                  {newMoon.tiets.length > 0 ? (
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                      Tiết: {newMoon.tiets.join(', ')}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-800/50">
                      Không có Tiết
                    </span>
                  )}
                  {newMoon.khis.length > 0 ? (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                      Khí: {newMoon.khis.join(', ')}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-800/50">
                      Không có Khí
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sóc Previous and Sóc Next */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950/50 border border-slate-800/60 rounded-lg p-2.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    Điểm Sóc trước đó (Mùng 1 đầu tháng):
                  </span>
                  <span className="font-mono text-emerald-300 font-medium">
                    {formatVietnamDateTime(newMoon.prevSocDate)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                  <span>Khoảng cách:</span>
                  <span className="font-mono">{newMoon.prevPassedString} ({newMoon.prevPassedDays.toFixed(2)} ngày)</span>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/60 rounded-lg p-2.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                    Điểm Sóc tiếp theo (Mùng 1 tháng sau):
                  </span>
                  <span className="font-mono text-cyan-300 font-medium">
                    {formatVietnamDateTime(newMoon.nextSocDate)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                  <span>Còn lại:</span>
                  <span className="font-mono">{newMoon.nextRemainingString} ({newMoon.nextRemainingDays.toFixed(2)} ngày)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
