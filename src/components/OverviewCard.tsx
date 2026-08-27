import React, { useMemo } from 'react';
import {
  Sun,
  Moon,
  Calendar,
  Sparkles,
  Orbit,
  Clock,
  ChevronRight,
  Layers,
  Compass,
  ArrowRight,
  Shield,
  User,
  Heart,
  HeartPulse,
  Coins,
  GraduationCap,
  Search,
  Scale,
  BookOpen,
  MapPin,
  Flame,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { ComprehensiveResult } from '../types';
import { formatVietnamDateTime, BAGUA_PALACES } from '../astronomy/solarTerms';
import { buildCompleteKyMonChart, CompleteKyMonChart } from '../astronomy/kymonChart';
import { MiniCalendar } from './MiniCalendar';

interface OverviewCardProps {
  result: ComprehensiveResult;
  onNavigateTab?: (tabId: string) => void;
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
  isLive?: boolean;
  onSetLive?: (live: boolean) => void;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  result,
  onNavigateTab,
  currentDate = new Date(),
  onDateChange = () => {},
  isLive = false,
  onSetLive = () => {},
}) => {
  const { currentTerm, nextTerm, batTu, newMoon, kyMon, solarLongitude, solarLongitudeDMS } = result;

  const isTiet = currentTerm.category === 'Tiết';
  const isDuongDon = kyMon.isDuongDon;

  // Build complete Ky Mon chart for dynamic Trực Phù / Trực Sử / Thần Sát display
  const chart: CompleteKyMonChart = useMemo(() => {
    const isDuong = kyMon.isDuongDon;
    const cucNum = kyMon.cucNumber;

    let dCan = 'Giáp';
    let dChi = 'Tý';
    let hCan = 'Bính';
    let hChi = 'Dần';

    if (batTu) {
      const dParts = batTu.dayCanChi.split(' ');
      if (dParts.length >= 2) {
        dCan = dParts[0];
        dChi = dParts[1];
      }
      const hParts = batTu.hourCanChi.split(' ');
      if (hParts.length >= 2) {
        hCan = hParts[0];
        hChi = hParts[1];
      }
    }

    return buildCompleteKyMonChart(isDuong, cucNum, dCan, dChi, hCan, hChi);
  }, [kyMon, batTu]);

  const currentPalace = BAGUA_PALACES.find((p) => p.number === kyMon.cungNumber) || BAGUA_PALACES[0];

  const getRuleBadgeColor = (rule: string) => {
    switch (rule) {
      case 'Chính Khí':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Siêu Thần':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Tiếp Khí':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Nhuận Cục':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 0. EXECUTIVE HEADLINE STATUS STRIP: 5 Core Outcomes at a glance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tóm Lược Kết Quả Tổng Lực Toàn Chương Trình</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Thời khắc khảo sát (UTC+7)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Item 1: Tiết Khí */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">1. Tiết Khí Hiện Tại</div>
            <div className="text-sm sm:text-base font-extrabold text-amber-400 font-mono my-1 truncate">
              {currentTerm.name} ({currentTerm.degree}°)
            </div>
            <div className="text-[11px] text-slate-400">
              {isTiet ? 'Tiết Lệnh' : 'Trung Khí'} • {currentTerm.cungName}
            </div>
          </div>

          {/* Item 2: Bát Tự */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">2. Tứ Trụ Bát Tự</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono my-1 truncate">
              {batTu.yearCanChi} • {batTu.monthCanChi}
            </div>
            <div className="text-[11px] text-slate-300 font-mono truncate">
              {batTu.dayCanChi} • {batTu.hourCanChi}
            </div>
          </div>

          {/* Item 3: Âm Lịch */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">3. Âm Lịch Thiên Văn</div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono my-1 truncate">
              {newMoon.lunarDay < 10 ? `Mùng ${newMoon.lunarDay}` : newMoon.lunarDay} {newMoon.fullMonthDisplay}
            </div>
            <div className="text-[11px] text-slate-400">
              {newMoon.monthType} ({newMoon.totalMonthDays} ngày)
            </div>
          </div>

          {/* Item 4: Cục Số Kỳ Môn */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">4. Cục Số Kỳ Môn</div>
            <div className="text-sm sm:text-base font-extrabold text-purple-400 font-mono my-1 truncate">
              {kyMon.cucResultText}
            </div>
            <div className="text-[11px] text-slate-400">
              Quy tắc: <span className="text-amber-300 font-medium">{kyMon.ruleType}</span>
            </div>
          </div>

          {/* Item 5: Trực Phù & Trực Sử */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">5. Trực Phù & Trực Sử</div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono my-1 truncate">
              ⭐ {chart.trucPhuStar}
            </div>
            <div className="text-[11px] text-slate-300 font-mono truncate">
              🚪 {chart.trucSuDoor} ({chart.tuanThuGiap})
            </div>
          </div>
        </div>
      </div>

      {/* 1. THIÊN VĂN 24 TIẾT KHÍ & LỊCH THÁNG TƯƠNG TÁC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-5 h-full flex flex-col justify-between">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              {/* Main Term Highlight */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 animate-pulse" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Tiết Khí Đương Lệnh
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                        isTiet
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {isTiet ? 'Tiết Lệnh' : 'Trung Khí'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {currentTerm.cungName}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                    <span>{currentTerm.name}</span>
                    <span className="text-amber-400 text-base sm:text-lg font-mono font-semibold">
                      ({currentTerm.degree}°)
                    </span>
                  </h2>

                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400">Bắt đầu:</span>
                    <span className="font-mono text-white font-medium">
                      {formatVietnamDateTime(currentTerm.startDate)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Sun Ecliptic Longitude Card */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 min-w-[180px] flex flex-col justify-center">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Orbit className="w-3.5 h-3.5 text-amber-400" />
                    Kinh Độ ☉
                  </span>
                  <span className="font-mono text-[10px] text-amber-400/80">Hoàng Đạo</span>
                </div>
                <div className="text-lg font-mono font-bold text-amber-300 tracking-wide">
                  {solarLongitudeDMS}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {solarLongitude.toFixed(4)}°
                </div>
              </div>
            </div>

            {/* Term Elapsed / Remaining Progress Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/60 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Đã qua:
                </span>
                <span className="font-mono font-medium text-emerald-300 text-[11px]">
                  {currentTerm.passedString}
                </span>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/60 flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5 truncate mr-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Đến {nextTerm.name}:
                </span>
                <span className="font-mono font-medium text-amber-300 text-[11px] shrink-0">
                  {nextTerm.remainingString}
                </span>
              </div>
            </div>

            {/* Action Navigation Links for Module 1 */}
            {onNavigateTab && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-800/60">
                <button
                  id="btn-overview-goto-table"
                  onClick={() => onNavigateTab('table')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bảng 24 Tiết Khí</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-overview-goto-compass"
                  onClick={() => onNavigateTab('compass')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Bát Quái 9 Cung</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Persistent Mini Calendar Grid */}
        <div className="lg:col-span-5 flex flex-col">
          <MiniCalendar
            currentDate={currentDate}
            onDateChange={onDateChange}
            isLive={isLive}
            onSetLive={onSetLive}
          />
        </div>
      </div>

      {/* 2. BÁT TỰ TỨ TRỤ & ÂM LỊCH ĐIỂM SÓC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Bát Tự Tứ Trụ Can Chi */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mô-đun 2: Bát Tự (Tứ Trụ Can Chi)</h3>
                  <p className="text-xs text-slate-400">Tiết Lệnh thiên văn & Lập Xuân mốc năm</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 rounded">
                Năm TV {batTu.solarYear}
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-4 gap-2 text-center my-3">
              {/* Năm */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 sm:p-3">
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Năm
                </div>
                <div className="text-xs sm:text-base font-bold text-amber-300 font-mono">
                  {batTu.yearCanChi}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1">Lập Xuân</div>
              </div>

              {/* Tháng */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 sm:p-3">
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Tháng
                </div>
                <div className="text-xs sm:text-base font-bold text-cyan-300 font-mono">
                  {batTu.monthCanChi}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1">Tiết Lệnh</div>
              </div>

              {/* Ngày */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 sm:p-3">
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Ngày
                </div>
                <div className="text-xs sm:text-base font-bold text-emerald-300 font-mono">
                  {batTu.dayCanChi}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1">Nhật Nguyên</div>
              </div>

              {/* Giờ */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 sm:p-3">
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Trụ Giờ
                </div>
                <div className="text-xs sm:text-base font-bold text-purple-300 font-mono">
                  {batTu.hourCanChi}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 mt-1">Thời Trụ</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg font-mono border border-slate-800/80">
              <span className="text-slate-400">Chuỗi Bát Tự đầy đủ: </span>
              <span className="text-white font-semibold">{batTu.fullText}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            * Bát tự được dùng làm dữ liệu đầu vào cốt lõi để tính Tuần Thủ Giáp và phối bàn Kỳ Môn.
          </div>
        </div>

        {/* Card 2: Âm Lịch & Điểm Sóc Thiên Văn */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mô-đun 3: Âm Lịch & Điểm Sóc</h3>
                  <p className="text-xs text-slate-400">Giao hội Nhật - Nguyệt và Tiết Khí định tháng</p>
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
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Thời Điểm Âm Lịch Hiện Tại
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
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
            </div>

            {/* Sóc Previous and Sóc Next in short summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/50 border border-slate-800/60 rounded-lg p-2.5">
                <div className="text-slate-400 font-medium text-[11px] mb-0.5">
                  🌑 Điểm Sóc Đầu Tháng:
                </div>
                <div className="font-mono text-emerald-300 font-semibold">
                  {formatVietnamDateTime(newMoon.prevSocDate).split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400">Đã qua {newMoon.prevPassedDays.toFixed(1)} ngày</div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/60 rounded-lg p-2.5">
                <div className="text-slate-400 font-medium text-[11px] mb-0.5">
                  🌑 Điểm Sóc Tháng Sau:
                </div>
                <div className="font-mono text-cyan-300 font-semibold">
                  {formatVietnamDateTime(newMoon.nextSocDate).split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400">Còn lại {newMoon.nextRemainingDays.toFixed(1)} ngày</div>
              </div>
            </div>
          </div>

          {/* Action Navigation Link for Module 3 */}
          {onNavigateTab && (
            <div className="flex justify-end pt-1">
              <button
                id="btn-overview-goto-moon"
                onClick={() => onNavigateTab('moon')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Xem Chi Tiết Điểm Sóc & Âm Lịch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. BÀN KỲ MÔN 9 CUNG & TOÀN THƯ DỰ TRẮC PORTAL CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 3A: Bàn Kỳ Môn 9 Cung Tinh Túy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mô-đun 4: Bàn Kỳ Môn 9 Cung</h3>
                  <p className="text-xs text-slate-400">Tam Bàn (Thiên - Nhân - Địa) & Bát Thần</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                {chart.cucName}
              </span>
            </div>

            {/* Core 9-Palace Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Tuần Thủ Giáp</div>
                <div className="font-mono font-bold text-amber-300 text-sm mt-0.5">{chart.tuanThuGiap}</div>
                <div className="text-[10px] text-slate-400">Can {chart.tuanThuCan} thống lĩnh</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase">Sao Trực Phù</div>
                <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">{chart.trucPhuStar}</div>
                <div className="text-[10px] text-slate-400">Cung gốc: {chart.trucPhuPalace} &rarr; Mới: {chart.trucPhuNewPalace}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-slate-400 text-[10px] uppercase">Cửa Trực Sử</div>
                <div className="font-mono font-bold text-emerald-300 text-sm mt-0.5">{chart.trucSuDoor}</div>
                <div className="text-[10px] text-slate-400">Cung gốc: {chart.trucSuPalace} &rarr; Mới: {chart.trucSuNewPalace}</div>
              </div>
            </div>

            {/* Special formations badge */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tuần Không & Dịch Mã:</span>
                <span className="font-mono text-slate-200">
                  TK: {chart.tuanKhongChi.join(', ')} • Mã: {chart.dichMaChi}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Đặc tính:</span>
                <span className="text-amber-300/90 font-medium">
                  {chart.specialFormations.length > 0 ? chart.specialFormations.join(' • ') : 'Cục diện bình hòa'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Navigation Link for Module 4 */}
          {onNavigateTab && (
            <div className="flex justify-end pt-1">
              <button
                id="btn-overview-goto-chart"
                onClick={() => onNavigateTab('kymon-chart')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Mở Bàn Kỳ Môn Hoàn Chỉnh</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Card 3B: Toàn Thư Dự Trắc 6 Phương Diện & Thân Mệnh */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mô-đun 5: Toàn Thư Dự Trắc</h3>
                  <p className="text-xs text-slate-400">Chiêm nghiệm việc đời theo Bí Kíp Toàn Thư</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                8 Chuyên Đề
              </span>
            </div>

            {/* 6 Aspects Quick Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-rose-300">
                <Heart className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Hôn Nhân (Ất-Canh)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-emerald-300">
                <HeartPulse className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Y Học (Thiên Nhuế)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-amber-300">
                <Coins className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Cầu Tài (Mậu-Sinh)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-purple-300">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Công Danh (Khai Môn)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-blue-300">
                <Search className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Mất Vật (Thiên Bồng)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 text-teal-300">
                <Scale className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Kiện Tụng (Kinh-Cảnh)</span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-semibold">Bao gồm: </span>
              Quy luật Tam Bàn (Sao - Cửa - Cung), Phân định Chủ - Khách, Thân Mệnh Lục Thân (Sang Hèn, Tổ Nghiệp, Cô Hư) và 6 việc đời cụ thể.
            </div>
          </div>

          {/* Action Navigation Link for Module 5 */}
          {onNavigateTab && (
            <div className="flex justify-end pt-1">
              <button
                id="btn-overview-goto-prognostication"
                onClick={() => onNavigateTab('kymon-prognostication')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Xem Toàn Bộ Luận Giải Dự Trắc</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
