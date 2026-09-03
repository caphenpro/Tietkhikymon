import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Activity,
  TrendingUp,
  Clock,
  Compass,
  Sparkles,
  Zap,
  Sliders,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Shield,
  Star,
  DoorOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Flame,
  Scale,
} from 'lucide-react';
import {
  analyzeKyMonEnergyTimeline,
  HourEnergyDataPoint,
  DayEnergyDataPoint,
  RadarPalaceDataPoint,
  ElementBalanceDataPoint,
} from '../astronomy/kymonEnergyTimeline';

interface KyMonEnergyTrendsChartProps {
  currentDate: Date;
  onSelectTime?: (date: Date) => void;
  onSelectPalace?: (palaceNum: number) => void;
  onNavigateTab?: (tabId: string) => void;
}

type ViewMode = 'hours_timeline' | 'radar_palaces' | 'month_dynamics' | 'element_balance';
type PalaceFilter = 'overall' | 'all_palaces' | 'truc_phu_su' | 'tam_cat_mon' | 'specific_palace';

const PALACE_COLORS: Record<string, string> = {
  Kham1: '#38bdf8', // Light Blue (Bắc - Thủy)
  Khon2: '#f59e0b', // Amber (Tây Nam - Thổ)
  Chan3: '#10b981', // Emerald (Đông - Mộc)
  Ton4: '#34d399', // Mint (Đông Nam - Mộc)
  Trung5: '#eab308', // Yellow (Trung Cung - Thổ)
  Can6: '#94a3b8', // Slate (Tây Bắc - Kim)
  Doai7: '#cbd5e1', // Silver/White (Tây - Kim)
  Can8: '#d97706', // Ochre (Đông Bắc - Thổ)
  Ly9: '#f43f5e', // Rose/Red (Nam - Hỏa)
};

export const KyMonEnergyTrendsChart: React.FC<KyMonEnergyTrendsChartProps> = ({
  currentDate,
  onSelectTime,
  onNavigateTab,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('hours_timeline');
  const [palaceFilter, setPalaceFilter] = useState<PalaceFilter>('overall');
  const [selectedSpecificPalace, setSelectedSpecificPalace] = useState<number>(1);
  const [selectedHourDetail, setSelectedHourDetail] = useState<HourEnergyDataPoint | null>(null);

  // Compute energy analysis
  const analysis = useMemo(() => {
    return analyzeKyMonEnergyTimeline(currentDate);
  }, [currentDate]);

  // Set default selected hour to current hour
  const activeHour = selectedHourDetail || analysis.hourTimeline.find((h) => h.isCurrentHour) || analysis.hourTimeline[0];

  // Custom Tooltip for Timeline Area / Line chart
  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as HourEnergyDataPoint;
      return (
        <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="font-bold text-amber-400 text-sm">
              Giờ {data.hourCanChi} ({data.chiGio})
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                data.totalScore >= 70
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : data.totalScore >= 50
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {data.level} ({data.totalScore}đ)
            </span>
          </div>

          <div className="text-slate-300 text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Khung giờ:</span>
              <span className="font-mono text-slate-200">{data.timeRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cung Cát nhất:</span>
              <span className="font-bold text-emerald-400">
                {data.bestPalace.name} ({data.bestPalace.direction}) - {data.bestPalace.score}đ
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Trực Phù / Trực Sử:</span>
              <span className="text-cyan-300">
                {data.trucPhuName} / {data.trucSuDoor}
              </span>
            </div>
            {data.isPhucNgam && <div className="text-amber-400 text-[10px] font-medium">⚠️ Toàn bàn phạm Phục Ngâm</div>}
            {data.isPhanNgam && <div className="text-rose-400 text-[10px] font-medium">⚠️ Toàn bàn phạm Phản Ngâm</div>}
          </div>

          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 text-center italic">
            Nhấn vào điểm để xem chi tiết hoặc chuyển giờ
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Radar Chart
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as RadarPalaceDataPoint;
      return (
        <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-1.5 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-cyan-400 text-sm">
              {data.fullLabel}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
              {data.score} / 100đ
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-300 pt-1">
            <div><span className="text-slate-400">Thiên/Địa Can:</span> <strong className="text-white">{data.heavenStem}/{data.earthStem}</strong></div>
            <div><span className="text-slate-400">Hành:</span> <strong className="text-amber-300">{data.element}</strong></div>
            <div><span className="text-slate-400">Bát Môn:</span> <strong className="text-emerald-400">{data.door}</strong></div>
            <div><span className="text-slate-400">Cửu Tinh:</span> <strong className="text-cyan-300">{data.star}</strong></div>
            <div className="col-span-2"><span className="text-slate-400">Bát Thần:</span> <strong className="text-purple-300">{data.god}</strong></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="kymon-energy-trends-section" className="w-full space-y-6">
      {/* 4 SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Giờ Đại Cát Nhất Ngày */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Giờ Đại Cát Nhất
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                {analysis.bestHourOfDay.totalScore} Điểm
              </span>
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              Giờ {analysis.bestHourOfDay.hourCanChi} ({analysis.bestHourOfDay.chiGio})
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Khung: <span className="font-mono text-slate-200">{analysis.bestHourOfDay.timeRange}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Vượng cung:</span>
            <span className="font-bold text-emerald-400">
              {analysis.bestHourOfDay.bestPalace.name} ({analysis.bestHourOfDay.bestPalace.direction})
            </span>
          </div>
        </div>

        {/* Card 2: Cung Cát Khí Đỉnh Cao Hiện Tại */}
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Compass className="w-3.5 h-3.5" />
                Cung Vượng Nhất Hiện Tại
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                {analysis.topPalaceCurrent.score} Điểm
              </span>
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              {analysis.topPalaceCurrent.palaceName} {analysis.topPalaceCurrent.palaceNum} ({analysis.topPalaceCurrent.direction})
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Môn / Tinh: <span className="text-emerald-400 font-semibold">{analysis.topPalaceCurrent.door}</span> • <span className="text-cyan-400">{analysis.topPalaceCurrent.star}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Thần hộ vị:</span>
            <span className="font-bold text-purple-300">{analysis.topPalaceCurrent.god}</span>
          </div>
        </div>

        {/* Card 3: Cơ Chế Vận Chuyển Cục */}
        <div className="bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <RotateCcw className="w-3.5 h-3.5" />
                Quy Luật Chuyển Cục
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                {analysis.cucTransitionInfo.isDuongDon ? 'Dương Độn' : 'Âm Độn'}
              </span>
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              {analysis.cucTransitionInfo.currentCuc}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Tiết khí: <span className="text-cyan-300 font-semibold">{analysis.cucTransitionInfo.currentTerm}</span> • {analysis.cucTransitionInfo.currentNguyen}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Chuyển Nguyên sau:</span>
            <span className="font-bold text-amber-400">{analysis.cucTransitionInfo.daysUntilNextNguyen} ngày nữa</span>
          </div>
        </div>

        {/* Card 4: Cân Bằng Ngũ Hành */}
        <div className="bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 border border-purple-500/30 rounded-2xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                <Scale className="w-3.5 h-3.5" />
                Khí Ngũ Hành Vượng
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/30">
                5 Cung Tương Tác
              </span>
            </div>
            {(() => {
              const topElem = [...analysis.elementBalance].sort((a, b) => b.score - a.score)[0];
              return (
                <>
                  <div className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span style={{ color: topElem.color }}>Hành {topElem.element} Vượng</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-normal">
                      {topElem.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {topElem.description}
                  </div>
                </>
              );
            })()}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Phân bố:</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              {analysis.elementBalance.map((eb) => (
                <span key={eb.element} style={{ color: eb.color }}>
                  {eb.element[0]}:{eb.percentage}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CHART CONTAINER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">
        {/* CHART CONTROLS & TABS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <span>Biểu Đồ Xu Hướng Năng Lượng & Biến Thiên Cục Kỳ Môn</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Quan sát trực quan mức độ Cát - Hung của 9 Cung qua thời gian và phân tích đa chiều bằng D3/Recharts.
            </p>
          </div>

          {/* MODE SELECTOR PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('hours_timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'hours_timeline'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>12 Canh Giờ</span>
            </button>

            <button
              onClick={() => setViewMode('radar_palaces')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'radar_palaces'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Mạng Nhện 9 Cung</span>
            </button>

            <button
              onClick={() => setViewMode('month_dynamics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'month_dynamics'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>30 Ngày Trong Tháng</span>
            </button>

            <button
              onClick={() => setViewMode('element_balance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'element_balance'
                  ? 'bg-purple-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Ngũ Hành Cục</span>
            </button>
          </div>
        </div>

        {/* SUB-FILTERS FOR 12 HOURS VIEW */}
        {viewMode === 'hours_timeline' && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-300">Bộ lọc Cung hiển thị:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPalaceFilter('overall')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  palaceFilter === 'overall'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                ⭐ Điểm Tổng Cục
              </button>

              <button
                onClick={() => setPalaceFilter('truc_phu_su')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  palaceFilter === 'truc_phu_su'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                🛡️ Trực Phù & Trực Sử
              </button>

              <button
                onClick={() => setPalaceFilter('tam_cat_mon')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  palaceFilter === 'tam_cat_mon'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                🚪 Tam Cát Môn (Sinh/Khai/Hưu)
              </button>

              <button
                onClick={() => setPalaceFilter('all_palaces')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                  palaceFilter === 'all_palaces'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                🧭 Toàn Bộ 8 Cung
              </button>

              <select
                value={selectedSpecificPalace}
                onChange={(e) => {
                  setPalaceFilter('specific_palace');
                  setSelectedSpecificPalace(Number(e.target.value));
                }}
                className="bg-slate-900 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value={1}>Khảm 1 (Chính Bắc - Thủy)</option>
                <option value={8}>Cấn 8 (Đông Bắc - Thổ)</option>
                <option value={3}>Chấn 3 (Chính Đông - Mộc)</option>
                <option value={4}>Tốn 4 (Đông Nam - Mộc)</option>
                <option value={9}>Ly 9 (Chính Nam - Hỏa)</option>
                <option value={2}>Khôn 2 (Tây Nam - Thổ)</option>
                <option value={7}>Đoài 7 (Chính Tây - Kim)</option>
                <option value={6}>Càn 6 (Tây Bắc - Kim)</option>
                <option value={5}>Trung Cung 5 (Thổ)</option>
              </select>
            </div>
          </div>
        )}

        {/* 1. VIEW 1: 12 CANH GIỜ (AREA / LINE CHART) */}
        {viewMode === 'hours_timeline' && (
          <div className="space-y-4">
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analysis.hourTimeline}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      const d = e.activePayload[0].payload as HourEnergyDataPoint;
                      setSelectedHourDetail(d);
                    }
                  }}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="totalScoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />

                  <XAxis
                    dataKey="chiGio"
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickFormatter={(val, idx) => {
                      const item = analysis.hourTimeline[idx];
                      return item ? `${val}` : val;
                    }}
                  />

                  <YAxis
                    domain={[20, 100]}
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickCount={5}
                  />

                  <Tooltip content={<CustomTimelineTooltip />} />

                  {/* Benchmark lines */}
                  <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Đại Cát (≥80)', fill: '#10b981', fontSize: 10 }} />
                  <ReferenceLine y={50} stroke="#64748b" strokeDasharray="3 3" label={{ value: 'Bình Hòa (50)', fill: '#64748b', fontSize: 10 }} />
                  <ReferenceLine y={35} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Hung (<35)', fill: '#f43f5e', fontSize: 10 }} />

                  {/* OVERALL SCORE LINE */}
                  {(palaceFilter === 'overall' || palaceFilter === 'tam_cat_mon') && (
                    <Area
                      type="monotone"
                      dataKey="totalScore"
                      name="Điểm Toàn Cục"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#totalScoreGrad)"
                      activeDot={{ r: 7, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                    />
                  )}

                  {/* TRỰC PHÙ & TRỰC SỬ */}
                  {palaceFilter === 'truc_phu_su' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="totalScore"
                        name="Toàn Cục"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Kham1"
                        name="Cung Khảm (Bắc)"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Ly9"
                        name="Cung Ly (Nam)"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        dot={false}
                      />
                    </>
                  )}

                  {/* ALL PALACES */}
                  {palaceFilter === 'all_palaces' && (
                    <>
                      <Line type="monotone" dataKey="Kham1" name="Khảm 1 (Bắc)" stroke={PALACE_COLORS.Kham1} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Can8" name="Cấn 8 (ĐB)" stroke={PALACE_COLORS.Can8} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Chan3" name="Chấn 3 (Đông)" stroke={PALACE_COLORS.Chan3} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Ton4" name="Tốn 4 (ĐN)" stroke={PALACE_COLORS.Ton4} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Ly9" name="Ly 9 (Nam)" stroke={PALACE_COLORS.Ly9} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Khon2" name="Khôn 2 (TN)" stroke={PALACE_COLORS.Khon2} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Doai7" name="Đoài 7 (Tây)" stroke={PALACE_COLORS.Doai7} strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Can6" name="Càn 6 (TB)" stroke={PALACE_COLORS.Can6} strokeWidth={1.5} dot={false} />
                    </>
                  )}

                  {/* SPECIFIC PALACE */}
                  {palaceFilter === 'specific_palace' && (
                    <>
                      <Area
                        type="monotone"
                        dataKey={`Kham1`}
                        name="Điểm Cung Chọn"
                        stroke="#38bdf8"
                        strokeWidth={2.5}
                        fill="url(#cyanGrad)"
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalScore"
                        name="Tổng Cục (So sánh)"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </>
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* QUICK TIME SELECTOR BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-1.5">
              {analysis.hourTimeline.map((h) => {
                const isSelected = activeHour.hourIndex === h.hourIndex;
                const isGreat = h.totalScore >= 75;
                return (
                  <button
                    key={h.hourIndex}
                    onClick={() => setSelectedHourDetail(h)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                        : h.isCurrentHour
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400">{h.chiGio}</div>
                    <div className={`font-bold text-xs ${isGreat ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {h.hourCanChi.split(' ')[0]}
                    </div>
                    <div className="font-mono text-[10px] font-semibold text-amber-300">
                      {h.totalScore}đ
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SELECTED HOUR SPOTLIGHT PANEL */}
            {activeHour && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      Chi Tiết Canh Giờ {activeHour.hourCanChi} ({activeHour.chiGio})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      {activeHour.timeRange}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        activeHour.totalScore >= 70
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {activeHour.level} ({activeHour.totalScore}đ)
                    </span>
                  </div>
                  <p className="text-slate-400">
                    Cung đắc vượng nhất: <strong className="text-emerald-400">{activeHour.bestPalace.name} ({activeHour.bestPalace.direction})</strong> ({activeHour.bestPalace.door} • {activeHour.bestPalace.star} • {activeHour.bestPalace.god}) — Điểm số: <strong>{activeHour.bestPalace.score}/100</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {onSelectTime && (
                    <button
                      onClick={() => onSelectTime(activeHour.date)}
                      className="w-full md:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer text-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                      <span>Xem Bàn Kỳ Môn Giờ Này</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. VIEW 2: MẠNG NHỆN RADAR 9 CUNG */}
        {viewMode === 'radar_palaces' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Radar Chart */}
              <div className="lg:col-span-7 h-72 sm:h-80 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysis.radarPalaces}>
                    <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="fullLabel"
                      stroke="#94a3b8"
                      tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="#475569"
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <Radar
                      name="Điểm Năng Lượng Cung"
                      dataKey="score"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.4}
                    />
                    <Tooltip content={<CustomRadarTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* 9 Palaces breakdown cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {analysis.radarPalaces.map((rp) => {
                  const isTop = rp.palaceNum === analysis.topPalaceCurrent.palaceNum;
                  return (
                    <div
                      key={rp.palaceNum}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isTop
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">
                          {rp.palaceName} {rp.palaceNum} ({rp.direction})
                        </span>
                        <span className="font-mono font-bold text-amber-400">
                          {rp.score}đ
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span className="text-emerald-400">{rp.door}</span>
                        <span className="text-cyan-300">{rp.star}</span>
                        <span className="text-purple-300">{rp.god}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. VIEW 3: 30 NGÀY TRONG THÁNG (MONTH DYNAMICS) */}
        {viewMode === 'month_dynamics' && (
          <div className="space-y-4">
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysis.monthTimeline} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="solarDateStr" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis domain={[30, 95]} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload as DayEnergyDataPoint;
                        return (
                          <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 z-50">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                              <span className="font-bold text-amber-400">
                                Ngày {d.solarDateStr} ({d.dayCanChi})
                              </span>
                              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                                {d.cucName}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-300 space-y-0.5">
                              <div>Tiết khí: <strong className="text-slate-200">{d.termName}</strong> ({d.nguyen})</div>
                              <div>Điểm trung bình ngày: <strong className="text-emerald-400">{d.averageScore}đ</strong></div>
                              <div>Giờ đỉnh cao: <strong className="text-amber-300">Giờ {d.peakHourName} ({d.peakHourScore}đ)</strong></div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Cát Lợi (70)', fill: '#10b981', fontSize: 10 }} />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    name="Điểm Trung Bình Ngày"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="peakHourScore"
                    name="Giờ Đỉnh Cao Nhất"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              * Biểu đồ mô phỏng xu hướng chuyển giao năng lượng theo chu kỳ Thượng - Trung - Hạ Nguyên và sự tương tác giữa Can Chi ngày với Cục Kỳ Môn.
            </p>
          </div>
        )}

        {/* 4. VIEW 4: CÂN BẰNG NGŨ HÀNH (BAR CHART) */}
        {viewMode === 'element_balance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis.elementBalance} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="element" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 'bold' }} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload as ElementBalanceDataPoint;
                          return (
                            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs space-y-1 z-50">
                              <div className="font-bold text-sm" style={{ color: d.color }}>
                                Hành {d.element}
                              </div>
                              <div className="text-slate-300">Điểm năng lượng: <strong>{d.score} / 100</strong></div>
                              <div className="text-slate-300">Tỷ trọng toàn Cục: <strong>{d.percentage}%</strong></div>
                              <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">{d.description}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="score" name="Điểm Vượng Tướng" radius={[6, 6, 0, 0]}>
                      {analysis.elementBalance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Element details */}
              <div className="lg:col-span-5 space-y-2.5 text-xs">
                {analysis.elementBalance.map((eb) => (
                  <div key={eb.element} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: eb.color }} />
                        <span className="font-bold text-white text-sm">Hành {eb.element}</span>
                        <span className="text-[10px] text-slate-400">({eb.palaceCount} cung)</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-slate-200">{eb.score}đ</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {eb.percentage}%
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-[11px]">{eb.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
