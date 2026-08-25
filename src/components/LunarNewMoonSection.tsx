import React from 'react';
import { Moon, Calendar, Clock, Sparkles, Orbit, Compass } from 'lucide-react';
import { NewMoonInfo } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface LunarNewMoonSectionProps {
  newMoon: NewMoonInfo;
  calculationDate: Date;
}

export const LunarNewMoonSection: React.FC<LunarNewMoonSectionProps> = ({
  newMoon,
  calculationDate,
}) => {
  const percentComplete = Math.min(
    100,
    Math.max(0, Math.round((newMoon.lunarDay / newMoon.totalMonthDays) * 100))
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Moon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Điểm Sóc Thiên Văn & Chu Kỳ Âm Lịch
                </h3>
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Hội Tụ Nhật - Nguyệt
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Xác định chính xác ngày Mùng 1 Âm lịch và phân định Tháng đủ (30 ngày) / Tháng thiếu (29 ngày)
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-right self-start md:self-auto">
            <div className="text-[10px] uppercase text-slate-400 font-semibold">Hôm nay Âm Lịch</div>
            <div className="text-xl font-bold text-cyan-300 font-mono">
              Ngày Mùng {newMoon.lunarDay}
            </div>
          </div>
        </div>

        {/* Lunar Month Timeline Visualizer */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Tiến độ tuần trăng: Ngày {newMoon.lunarDay} / {newMoon.totalMonthDays}</span>
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
          <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs">
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
    </div>
  );
};
