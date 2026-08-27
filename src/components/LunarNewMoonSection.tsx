import React from 'react';
import { Moon, Calendar, Clock, Sparkles, Orbit, CheckCircle2, AlertCircle, Layers, ArrowLeft, ArrowRight, Compass, BookOpen } from 'lucide-react';
import { NewMoonInfo } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

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
  const percentComplete = Math.min(
    100,
    Math.max(0, Math.round((newMoon.lunarDay / newMoon.totalMonthDays) * 100))
  );

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
