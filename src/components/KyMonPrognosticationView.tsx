import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  Heart,
  HeartPulse,
  Coins,
  GraduationCap,
  Search,
  Scale,
  User,
  Users,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Flame,
  Zap,
  Info,
  Calendar,
  Clock,
  Copy,
  Check,
  DoorOpen,
  Star,
  AlertCircle,
  TrendingUp,
  Navigation,
  Award,
  ShieldAlert,
  Sliders,
  CheckCircle,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { CompleteKyMonChart, buildCompleteKyMonChart } from '../astronomy/kymonChart';
import { buildLucNhamChart, LucNhamChart } from '../astronomy/lucNham';
import {
  generateCombinedPrognostication,
  CombinedPrognosticationResult,
  DirectionAnalysis,
} from '../astronomy/prognosticationCombined';
import {
  generateComprehensivePrognostication,
  THIEN_NHUE_DISEASE_MAP,
  LOST_ITEMS_MAP,
} from '../astronomy/kymonPrognostication';
import { getLocalComponents } from '../astronomy/canChi';
import { KyMonInfo, BatTuInfo } from '../types';

interface KyMonPrognosticationViewProps {
  currentDate?: Date;
  solarLongitude?: number;
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
  onBackToBoard?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const KyMonPrognosticationView: React.FC<KyMonPrognosticationViewProps> = ({
  currentDate = new Date(),
  solarLongitude = 0,
  currentKyMon,
  currentBatTu,
  onBackToBoard,
  onNavigateTab,
}) => {
  // 3 Tab chính theo yêu cầu: 'synthesis' (Tổng hợp 2 môn), 'kymon' (Kỳ Môn Độn Giáp), 'lucnham' (Đại Lục Nhâm 3 giai đoạn)
  // Và 1 tab bổ trợ: 'classical' (6 Chủ đề cổ bản Kỳ Môn)
  const [activeMainTab, setActiveMainTab] = useState<'synthesis' | 'kymon' | 'lucnham' | 'classical'>('synthesis');

  // Sub tab cho mục Cổ Bản (Classical Topics)
  const [activeClassicalTopic, setActiveClassicalTopic] = useState<
    'overview' | 'destiny' | 'marriage' | 'health' | 'wealth' | 'career' | 'lostItems' | 'lawsuit'
  >('marriage');

  // Bộ lọc hướng trong Kỳ Môn
  const [directionFilter, setDirectionFilter] = useState<'all' | 'good' | 'bad'>('all');

  const [copied, setCopied] = useState<boolean>(false);

  const localTime = useMemo(() => getLocalComponents(currentDate), [currentDate]);

  // 1. Chart Kỳ Môn Độn Giáp
  const chartKyMon: CompleteKyMonChart = useMemo(() => {
    const isDuong = currentKyMon ? currentKyMon.isDuongDon : true;
    const cucNum = currentKyMon ? currentKyMon.cucNumber : 1;

    let dCan = 'Giáp';
    let dChi = 'Tý';
    let hCan = 'Bính';
    let hChi = 'Dần';

    if (currentBatTu) {
      const dParts = currentBatTu.dayCanChi.split(' ');
      if (dParts.length >= 2) {
        dCan = dParts[0];
        dChi = dParts[1];
      }
      const hParts = currentBatTu.hourCanChi.split(' ');
      if (hParts.length >= 2) {
        hCan = hParts[0];
        hChi = hParts[1];
      }
    }

    return buildCompleteKyMonChart(isDuong, cucNum, dCan, dChi, hCan, hChi);
  }, [currentKyMon, currentBatTu]);

  // 2. Chart Đại Lục Nhâm
  const chartLucNham: LucNhamChart = useMemo(() => {
    const dayCanChi = currentBatTu?.dayCanChi || `${chartKyMon.dayCanChi}`;
    const hourCanChi = currentBatTu?.hourCanChi || `${chartKyMon.hourCanChi}`;
    return buildLucNhamChart(solarLongitude, dayCanChi, hourCanChi, localTime.hour);
  }, [solarLongitude, currentBatTu, chartKyMon, localTime.hour]);

  // 3. Phân tích kết hợp Kỳ Môn & Lục Nhâm
  const combined: CombinedPrognosticationResult = useMemo(() => {
    return generateCombinedPrognostication(chartKyMon, chartLucNham);
  }, [chartKyMon, chartLucNham]);

  // 4. Dữ liệu chuyên đề cổ bản Kỳ Môn
  const pData = useMemo(() => generateComprehensivePrognostication(chartKyMon), [chartKyMon]);

  // Xử lý sao chép văn bản dự trắc
  const handleCopySummary = () => {
    const text = `=== BẢN DỰ TRẮC CHUYÊN SÂU SONG THỨC (KỲ MÔN & ĐẠI LỤC NHÂM) ===
Thời Điểm: ${chartKyMon.dayCanChi} (Ngày) • ${chartKyMon.hourCanChi} (Giờ)
- Kỳ Môn Độn Giáp: Quẻ ${chartKyMon.cucName} (Trực Phù: ${chartKyMon.trucPhuStar} - Trực Sử: ${chartKyMon.trucSuDoor})
- Đại Lục Nhâm: ${chartLucNham.tongMonName} (Nguyệt Tướng: ${chartLucNham.nguyetTuongName} - ${chartLucNham.quyNhanType})

1. ĐÁNH GIÁ THỜI ĐIỂM:
- Điểm Cát Hung Tổng Hợp: ${combined.overallScore}/100 (${combined.overallLevel}) - ${combined.overallStars}★
- Phán Từ: ${combined.overallVerdict}

2. NÊN LÀM GÌ:
${combined.synthesis.whatToDo.map((item, idx) => `${idx + 1}. [${item.badge}] ${item.title}: ${item.description}`).join('\n')}

3. KHÔNG NÊN LÀM GÌ:
${combined.synthesis.whatNotToDo.map((item, idx) => `${idx + 1}. [${item.badge}] ${item.title}: ${item.description}`).join('\n')}

4. CÁT HUNG CÁC HƯỚNG (8 HƯỚNG):
- Hướng Thuận Lợi (Cát Phương): ${combined.synthesis.favorableDirections.map((d) => `${d.direction} (${d.palaceName}: ${d.score}đ - Cửa ${d.door})`).join(', ') || 'Chưa có hướng vượt trội'}
- Hướng Bất Lợi (Hung Phương): ${combined.synthesis.unfavorableDirections.map((d) => `${d.direction} (${d.palaceName}: ${d.score}đ - Cửa ${d.door})`).join(', ') || 'Không có hung sát lớn'}

5. TIẾN TRÌNH 3 GIAI ĐOẠN (LỤC NHÂM TAM TRUYỀN):
- Sơ Truyền (Khởi Đầu): ${combined.lucNham.stages.soTruyen.chi} (${combined.lucNham.stages.soTruyen.lucThan} - ${combined.lucNham.stages.soTruyen.thienTuong}) -> ${combined.lucNham.stages.soTruyen.detailedForecast}
- Trung Truyền (Diễn Biến): ${combined.lucNham.stages.trungTruyen.chi} (${combined.lucNham.stages.trungTruyen.lucThan} - ${combined.lucNham.stages.trungTruyen.thienTuong}) -> ${combined.lucNham.stages.trungTruyen.detailedForecast}
- Mạt Truyền (Kết Quả): ${combined.lucNham.stages.matTruyen.chi} (${combined.lucNham.stages.matTruyen.lucThan} - ${combined.lucNham.stages.matTruyen.thienTuong}) -> ${combined.lucNham.stages.matTruyen.detailedForecast}

6. TƯ VẤN PHƯƠNG ÁN TỐT NHẤT:
${combined.synthesis.optimalActionPlan.masterRecommendation}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper render sao
  const renderStars = (stars: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.floor(stars);
          const half = !filled && i === Math.ceil(stars) && stars % 1 >= 0.3;
          return (
            <span
              key={i}
              className={`text-base ${
                filled
                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  : half
                  ? 'text-amber-300/80'
                  : 'text-slate-700'
              }`}
            >
              ★
            </span>
          );
        })}
        <span className="text-xs font-mono font-bold text-amber-300 ml-1.5">{stars.toFixed(1)}/5.0</span>
      </div>
    );
  };

  // Lọc hướng trong Kỳ Môn
  const filteredDirections = useMemo(() => {
    if (directionFilter === 'good') {
      return combined.kyMon.allDirections.filter((d) => d.score >= 55);
    }
    if (directionFilter === 'bad') {
      return combined.kyMon.allDirections.filter((d) => d.score < 55);
    }
    return combined.kyMon.allDirections;
  }, [combined.kyMon.allDirections, directionFilter]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER BANNER TỔNG QUAN THỜI KHÔNG */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/25 to-purple-500/25 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
              <Compass className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Dự Trắc Chuyên Sâu Song Thức
                </h2>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Kỳ Môn & Đại Lục Nhâm
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {chartKyMon.cucName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Hệ thống hội tụ <strong>Kỳ Môn Độn Giáp</strong> (Đoán định Cát Hung thời điểm & 8 Phương vị không gian) và <strong>Đại Lục Nhâm</strong> (Đoán định Tiến trình 3 giai đoạn Tam Truyền: Khởi đầu - Diễn biến - Kết quả).
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onNavigateTab && (
              <button
                id="btn-prognostication-to-kymon"
                onClick={() => onNavigateTab('kymon-chart')}
                className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/35 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Mở Bàn Kỳ Môn 9 Cung đầy đủ"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Bàn Kỳ Môn</span>
              </button>
            )}

            {onNavigateTab && (
              <button
                id="btn-prognostication-to-lucnham"
                onClick={() => onNavigateTab('luc-nham')}
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/35 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Mở Bàn Đại Lục Nhâm đầy đủ"
              >
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Bàn Lục Nhâm</span>
              </button>
            )}

            <button
              id="btn-copy-combined-prognostication"
              onClick={handleCopySummary}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg cursor-pointer hover:scale-102 active:scale-98"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã Sao Chép Toàn Bộ' : 'Sao Chép Dự Trắc'}</span>
            </button>
          </div>
        </div>

        {/* Thông số cốt lõi thời không */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Thời Gian (Can Chi):</span>
            <span className="font-bold text-amber-300">{chartKyMon.dayCanChi} • {chartKyMon.hourCanChi}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Tuần Không / Mã:</span>
            <span className="font-bold text-rose-300">{chartKyMon.tuanKhongChi.join(', ')} / {chartKyMon.dichMaChi}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Trực Phù (Kỳ Môn):</span>
            <span className="font-bold text-cyan-300">{chartKyMon.trucPhuStar} (C.{chartKyMon.trucPhuNewPalace})</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Trực Sử (Kỳ Môn):</span>
            <span className="font-bold text-emerald-300">{chartKyMon.trucSuDoor} (C.{chartKyMon.trucSuNewPalace})</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Tông Môn (Lục Nhâm):</span>
            <span className="font-bold text-purple-300 truncate block" title={chartLucNham.tongMonName}>{chartLucNham.tongMonName}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Nguyệt Tướng:</span>
            <span className="font-bold text-amber-400">{chartLucNham.nguyetTuongName} ({chartLucNham.quyNhanType.split(' ')[0]})</span>
          </div>
        </div>
      </div>

      {/* HỆ THỐNG TAB ĐIỀU HƯỚNG CHÍNH */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto no-scrollbar shadow-lg">
        {[
          {
            id: 'synthesis',
            label: '🌟 1. TỔNG HỢP SONG THỨC (NÊN & KHÔNG NÊN LÀM)',
            badge: 'Tư Vấn Tối Ưu',
            icon: Sparkles,
          },
          {
            id: 'kymon',
            label: '🧭 2. DỰ TRẮC KỲ MÔN (CÁT HUNG THỜI ĐIỂM & 8 HƯỚNG)',
            badge: 'Không Gian 8 Hướng',
            icon: Layers,
          },
          {
            id: 'lucnham',
            label: '🔮 3. DỰ TRẮC LỤC NHÂM (3 GIAI ĐOẠN TAM TRUYỀN)',
            badge: 'Tiến Trình Thời Gian',
            icon: Compass,
          },
          {
            id: 'classical',
            label: '📖 4. TRA CỨU VIỆC ĐỜI CỔ BẢN (6 CHỦ ĐỀ)',
            badge: 'Bí Kíp Toàn Thư',
            icon: BookOpen,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-prognostication-main-${tab.id}`}
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md scale-100 font-black'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* PHẦN 1: TỔNG HỢP SONG THỨC (NÊN LÀM GÌ, KHÔNG NÊN LÀM GÌ, HƯỚNG CÁT HUNG) */}
      {/* ========================================================================= */}
      {activeMainTab === 'synthesis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Card Điểm Cát Hung Thời Khắc Tổng Hòa */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black text-white">
                    Đánh Giá Năng Lượng Thời Khắc Hiện Tại
                  </h3>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-bold font-mono ${
                      combined.overallLevel === 'Đại Cát'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : combined.overallLevel === 'Tiểu Cát'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : combined.overallLevel === 'Tiểu Hung'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : combined.overallLevel === 'Đại Hung'
                        ? 'bg-red-500/25 text-red-400 border border-red-500/50'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {combined.overallLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tổng hợp điểm số định lượng và luận giải phong thủy từ Kỳ Môn Độn Giáp ({combined.kyMon.score}đ) và Đại Lục Nhâm ({combined.lucNham.score}đ)
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Điểm Số Thời Không</span>
                  <div className="text-2xl font-black font-mono text-amber-400">
                    {combined.overallScore}
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                {renderStars(combined.overallStars)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1.5">
              <strong className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>⚡ Phán Từ Khái Quát:</span>
                <span>{combined.overallVerdict}</span>
              </strong>
              <p className="text-xs leading-relaxed text-slate-300">
                {combined.overallTagline}
              </p>
            </div>
          </div>

          {/* GRID: THỜI KHẮC NÀY NÊN LÀM GÌ & KHÔNG NÊN LÀM GÌ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CỘT NÊN LÀM GÌ */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Thời Khắc Này NÊN LÀM GÌ?</h3>
                    <span className="text-xs text-slate-400">Các hành động đắc khí, đón nhận cát lộc và thành công</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 font-mono">
                  {combined.synthesis.whatToDo.length} Khuyến Nghị
                </span>
              </div>

              <div className="space-y-3">
                {combined.synthesis.whatToDo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {item.title}
                      </strong>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0 font-mono">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-3.5">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-slate-400 block pl-3.5 italic font-mono">
                      Lĩnh vực: {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CỘT KHÔNG NÊN LÀM GÌ */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Thời Khắc Này KHÔNG NÊN LÀM GÌ?</h3>
                    <span className="text-xs text-slate-400">Những việc tối kỵ cần tránh để không chuốc họa, hao tài</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 font-mono">
                  {combined.synthesis.whatNotToDo.length} Cảnh Báo
                </span>
              </div>

              <div className="space-y-3">
                {combined.synthesis.whatNotToDo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-rose-500/20 hover:border-rose-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs sm:text-sm font-bold text-rose-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        {item.title}
                      </strong>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 shrink-0 font-mono">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-3.5">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-slate-400 block pl-3.5 italic font-mono">
                      Cảnh báo: {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HƯỚNG NÀO THUẬN LỢI & HƯỚNG NÀO KHÔNG THUẬN LỢI */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <span>Cát Hung 8 Hướng: Hướng Nào Thuận Lợi & Hướng Nào Bất Lợi?</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Xác định phương vị cát tường (đón sinh khí, cầu tài, đàm phán) và phương vị hung hiểm (cần tránh xuất hành, động thổ)
                </p>
              </div>

              {/* Toggle Tab Hướng */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setDirectionFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    directionFilter === 'all'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất Cả 8 Hướng
                </button>
                <button
                  onClick={() => setDirectionFilter('good')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    directionFilter === 'good'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hướng Cát ({combined.synthesis.favorableDirections.length})
                </button>
                <button
                  onClick={() => setDirectionFilter('bad')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    directionFilter === 'bad'
                      ? 'bg-rose-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hướng Hung ({combined.synthesis.unfavorableDirections.length})
                </button>
              </div>
            </div>

            {/* Grid 8 hướng */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredDirections.map((dir) => {
                const isGood = dir.score >= 60;
                const isBad = dir.score <= 45;
                return (
                  <div
                    key={dir.palaceNum}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isGood
                        ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                        : isBad
                        ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{dir.direction}</span>
                          <span className="text-xs font-mono font-normal text-slate-400">({dir.palaceName})</span>
                        </strong>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          Môn: {dir.door} • Thần: {dir.god}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                            isGood
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : isBad
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {dir.score}đ • {dir.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div className="text-slate-400">
                        <strong className="text-slate-300">Phối hợp:</strong> Sao {dir.star} | Can: {dir.stemCombo}
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {dir.reason}
                      </p>
                    </div>

                    <div className="text-[11px] leading-relaxed pt-1">
                      <strong className={`${isGood ? 'text-emerald-400' : isBad ? 'text-rose-400' : 'text-amber-400'}`}>
                        Lời khuyên:
                      </strong>{' '}
                      <span className="text-slate-400">{dir.advice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TƯ VẤN PHƯƠNG ÁN TỐT NHẤT (MASTER ACTION PLAN) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-purple-950/30 border border-amber-500/40 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Tư Vấn Phương Án Tốt Nhất (Chiến Lược Hành Động Tối Ưu)
                </h3>
                <span className="text-xs text-slate-400">
                  Tổng hòa giữa Không Gian Kỳ Môn và Tiến Trình 3 Giai Đoạn Đại Lục Nhâm
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
                <h4 className="font-bold text-amber-300 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Kế Hoạch Hành Động Toàn Diện (Master Strategy):</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {combined.synthesis.optimalActionPlan.masterRecommendation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
                  <h5 className="font-bold text-cyan-300 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                    <span>Chiến Thuật Không Gian (Kỳ Môn):</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {combined.synthesis.optimalActionPlan.spatialTactics}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
                  <h5 className="font-bold text-purple-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Chiến Thuật Thời Khắc & Tiến Trình (Lục Nhâm):</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Khởi sự cần chuẩn bị kỹ lưỡng vì Sơ Truyền mang tính quyết định. Quá trình triển khai theo dõi sát Trung Truyền để điều chỉnh, và chủ động khép lại khi đạt được kết quả ở Mạt Truyền.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nguyên tắc cổ nhân:</strong> <em>"Thiên thời bất như Địa lợi, Địa lợi bất như Nhân hòa"</em>. Kỳ Môn cho ta phương vị và thời điểm, Lục Nhâm chỉ ra tiến trình nhân sự. Khi biết người biết ta, thuận theo lẽ trời, trăm sự ắt đạt được cát khánh.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 2: DỰ TRẮC THEO KỲ MÔN ĐỘN GIÁP (CÁT HUNG THỜI ĐIỂM & 8 HƯỚNG)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'kymon' && (
        <div className="space-y-6 animate-fadeIn">
          {/* LỜI DỰ ĐOÁN THỜI ĐIỂM ĐANG HIỂN THỊ */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">
                    Lời Dự Đoán Thời Điểm Đang Hiển Thị (Kỳ Môn Độn Giáp)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {chartKyMon.cucName}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Chiêm nghiệm cát hung toàn cục dựa trên Trực Phù, Trực Sử, Bát Môn và Thập Can Khắc Ứng
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-amber-300">
                  Điểm Cát Hung: {combined.kyMon.score}/100 ({combined.kyMon.level})
                </span>
              </div>
            </div>

            {/* Khối nhận định tổng quát */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Nhận Định Cát Hung Toàn Cục:</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {combined.kyMon.verdict}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {combined.kyMon.directionSummary}
              </p>
            </div>

            {/* Các việc PHÙ HỢP LÀM GÌ & KHÔNG PHÙ HỢP trong Kỳ Môn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <strong className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Thời Điểm Này Phù Hợp Làm Gì?</span>
                </strong>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {combined.kyMon.suitableActivities.map((act, i) => (
                    <li key={i} className="leading-relaxed">{act}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Thời Điểm Này KHÔNG Phù Hợp Làm Gì?</span>
                </strong>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {combined.kyMon.unsuitableActivities.map((act, i) => (
                    <li key={i} className="leading-relaxed">{act}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cách cục đặc biệt */}
            {chartKyMon.specialFormations.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cách Cục Đặc Biệt Của Bàn Kỳ Môn Hiện Tại ({chartKyMon.specialFormations.length}):</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {chartKyMon.specialFormations.map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-200 border border-amber-500/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CÁT HUNG CHI TIẾT TẤT CẢ CÁC HƯỚNG (8 HƯỚNG CUNG) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <span>Bảng Đánh Giá Cát Hung Chi Tiết 8 Hướng (9 Cung Bát Quái)</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Chi tiết Cửa Môn, Ngôi Sao, Thần Sát và Thập Can Khắc Ứng trên từng phương vị
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {combined.kyMon.allDirections.map((d) => (
                <div
                  key={d.palaceNum}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-white flex items-center gap-1">
                      <span>{d.direction}</span>
                      <span className="text-xs font-normal text-slate-400">({d.palaceName})</span>
                    </strong>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md ${
                        d.score >= 60
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : d.score <= 45
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {d.score}đ • {d.level}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cửa Môn:</span>
                      <span className="font-bold text-amber-300">{d.door}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cửu Tinh:</span>
                      <span className="text-cyan-300">{d.star}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bát Thần:</span>
                      <span className="text-purple-300">{d.god}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thiên/Địa Can:</span>
                      <span className="text-emerald-300 truncate max-w-[130px]">{d.stemCombo}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-900 pt-2">
                    {d.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 3: DỰ TRẮC THEO ĐẠI LỤC NHÂM (QUÁ TRÌNH 3 GIAI ĐOẠN TAM TRUYỀN)       */}
      {/* ========================================================================= */}
      {activeMainTab === 'lucnham' && (
        <div className="space-y-6 animate-fadeIn">
          {/* BANNER TỔNG QUAN LỤC NHÂM */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">
                    Dự Trắc Đại Lục Nhâm: Quá Trình 3 Giai Đoạn (Tam Truyền)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {chartLucNham.tongMonName}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Đại Lục Nhâm chuyên đoán định diễn tiến nhân sự qua 3 mắt xích thời gian: Sơ Truyền (Khởi đầu) $\rightarrow$ Trung Truyền (Diễn biến) $\rightarrow$ Mạt Truyền (Kết quả)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-purple-300">
                  Điểm Cát Hung: {combined.lucNham.score}/100 ({combined.lucNham.level})
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Luận Đoán Thể Thức (Tông Môn):</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {combined.lucNham.overallProcessAnalysis}
              </p>
            </div>
          </div>

          {/* QUÁ TRÌNH 3 GIAI ĐOẠN CHI TIẾT (TAM TRUYỀN) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GIAI ĐOẠN 1: SƠ TRUYỀN */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">SƠ TRUYỀN (Khởi Đầu)</h4>
                    <span className="text-[10px] text-slate-400">Phát Đoan • Duyên Cớ Ban Đầu</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {combined.lucNham.stages.soTruyen.chi}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Thần Tướng:</span>
                  <span className="text-amber-300 font-bold">{combined.lucNham.stages.soTruyen.thienTuong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lục Thân:</span>
                  <span className="text-cyan-300">{combined.lucNham.stages.soTruyen.lucThan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngũ Hành:</span>
                  <span className="text-emerald-300">{combined.lucNham.stages.soTruyen.nguHanh}</span>
                </div>
                {combined.lucNham.stages.soTruyen.isTuanKhong && (
                  <div className="text-rose-400 font-bold text-[10px]">
                    * Phạm Tuần Không (Hư đoan, chưa thực chất)
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block">Lời Dự Đoán Giai Đoạn 1:</strong>
                <p className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                  {combined.lucNham.stages.soTruyen.detailedForecast}
                </p>
              </div>
            </div>

            {/* GIAI ĐOẠN 2: TRUNG TRUYỀN */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">TRUNG TRUYỀN (Diễn Biến)</h4>
                    <span className="text-[10px] text-slate-400">Di Dời • Tiến Trình Thực Hiện</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {combined.lucNham.stages.trungTruyen.chi}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Thần Tướng:</span>
                  <span className="text-cyan-300 font-bold">{combined.lucNham.stages.trungTruyen.thienTuong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lục Thân:</span>
                  <span className="text-purple-300">{combined.lucNham.stages.trungTruyen.lucThan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngũ Hành:</span>
                  <span className="text-emerald-300">{combined.lucNham.stages.trungTruyen.nguHanh}</span>
                </div>
                {combined.lucNham.stages.trungTruyen.isTuanKhong && (
                  <div className="text-rose-400 font-bold text-[10px]">
                    * Phạm Tuần Không (Dễ đứt đoạn giữa chừng)
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-300 block">Lời Dự Đoán Giai Đoạn 2:</strong>
                <p className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                  {combined.lucNham.stages.trungTruyen.detailedForecast}
                </p>
              </div>
            </div>

            {/* GIAI ĐOẠN 3: MẠT TRUYỀN */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">MẠT TRUYỀN (Kết Quả)</h4>
                    <span className="text-[10px] text-slate-400">Quy Túc • Chung Cuộc Về Sau</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {combined.lucNham.stages.matTruyen.chi}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Thần Tướng:</span>
                  <span className="text-purple-300 font-bold">{combined.lucNham.stages.matTruyen.thienTuong}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lục Thân:</span>
                  <span className="text-amber-300">{combined.lucNham.stages.matTruyen.lucThan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ngũ Hành:</span>
                  <span className="text-emerald-300">{combined.lucNham.stages.matTruyen.nguHanh}</span>
                </div>
                {combined.lucNham.stages.matTruyen.isTuanKhong && (
                  <div className="text-rose-400 font-bold text-[10px]">
                    * Phạm Tuần Không (Kết quả hư ảo, quy về không)
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-purple-300 block">Lời Dự Đoán Giai Đoạn 3:</strong>
                <p className="bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                  {combined.lucNham.stages.matTruyen.detailedForecast}
                </p>
              </div>
            </div>
          </div>

          {/* DỰ TRẮC 6 LĨNH VỰC SỰ VỤ CỦA LỤC NHÂM */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>Dự Trắc 6 Lĩnh Vực Nhân Sinh Theo Lục Nhâm</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                <strong className="text-amber-300 block font-bold flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" /> Cầu Tài & Giao Thương
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.cauTai}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/20 space-y-1">
                <strong className="text-rose-300 block font-bold flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" /> Hôn Nhân & Gia Đạo
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.honNhan}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-1">
                <strong className="text-cyan-300 block font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" /> Công Danh & Thi Cử
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.quanVan}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-1">
                <strong className="text-emerald-300 block font-bold flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-400" /> Bệnh Tật & Sức Khỏe
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.benhTat}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-1">
                <strong className="text-purple-300 block font-bold flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-purple-400" /> Tranh Chấp & Kiện Tụng
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.kienTung}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-500/20 space-y-1">
                <strong className="text-blue-300 block font-bold flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-400" /> Xuất Hành & Đi Xa
                </strong>
                <p className="text-slate-300 leading-relaxed">{combined.lucNham.sixAspects.xuatHanh}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHẦN 4: TRA CỨU VIỆC ĐỜI CỔ BẢN (6 CHỦ ĐỀ KỲ MÔN BÍ KÍP)                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'classical' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub Navigation cho Cổ Bản */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar">
            {[
              { id: 'marriage', label: '1. Hôn Nhân', icon: Heart },
              { id: 'health', label: '2. Y Học & Bệnh', icon: HeartPulse },
              { id: 'wealth', label: '3. Cầu Tài Lộc', icon: Coins },
              { id: 'career', label: '4. Thi Cử Công Danh', icon: GraduationCap },
              { id: 'lostItems', label: '5. Mất Vật & Trộm', icon: Search },
              { id: 'lawsuit', label: '6. Kiện Tụng', icon: Scale },
              { id: 'destiny', label: 'Thân Mệnh Quý Tiện', icon: User },
              { id: 'overview', label: 'Tam Bàn & Chủ Khách', icon: Layers },
            ].map((topic) => {
              const Icon = topic.icon;
              const isActive = activeClassicalTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveClassicalTopic(topic.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>

          {/* Render từng chủ đề */}
          {activeClassicalTopic === 'marriage' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>Chiêm Hôn Nhân & Vợ Chồng Cổ Bản (Kỳ Môn Độn Giáp)</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> Lấy <strong>Ất Kỳ</strong> làm Nhà gái (Cô dâu / Vợ), <strong>Canh</strong> làm Nhà trai (Chú rể / Chồng), <strong>Lục Hợp</strong> làm Mối lái (Người trung gian, tác hợp).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Cung Vị Ất Kỳ (Nhà Gái):</strong>
                  <span>Cung {pData.atPalace?.palaceName} - Cửa: {pData.atPalace?.door} - Sao: {pData.atPalace?.heavenStar}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Cung Vị Canh (Nhà Trai):</strong>
                  <span>Cung {pData.canhPalace?.palaceName} - Cửa: {pData.canhPalace?.door} - Sao: {pData.canhPalace?.heavenStar}</span>
                </div>
              </div>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong>Nguyên tắc:</strong> Hai cung tương sinh tương hợp, hoặc Ất Canh đồng cung, Lục Hợp đắc cát môn thì hôn nhân đại cát, trăm năm hòa hợp. Nếu tương khắc, hoặc gặp Hung thần (Bạch Hổ, Huyền Vũ) thì hôn sự nhiều trắc trở, cần hóa giải.
              </p>
            </div>
          )}

          {activeClassicalTopic === 'health' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <span>Chiêm Y Học & Trị Bệnh Cổ Bản</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> <strong>Thiên Nhuế</strong> đại diện cho Bệnh tật, <strong>Thiên Tâm / Ất Kỳ</strong> là Lương y (Bác sĩ, thuốc men), <strong>Sinh Môn</strong> là Khí sống (Sinh khí), <strong>Tử Môn</strong> là Bệnh trầm kha.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-amber-300 block">Vị Trí Sao Thiên Nhuế (Bệnh):</strong>
                <span>Cung {pData.thienNhuePalace?.palaceName} ({pData.thienNhuePalace?.direction})</span>
                {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace?.palaceNum || 2] && (
                  <p className="text-slate-400 pt-1">
                    {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace?.palaceNum || 2].summary}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeClassicalTopic === 'wealth' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Chiêm Cầu Tài & Giao Thương Cổ Bản</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> <strong>Giáp Tý Mậu</strong> làm Vốn liếng (Tiền vốn ban đầu), <strong>Sinh Môn</strong> làm Lợi tức (Lợi nhuận thu về).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 block">Vốn Liếng (Mậu):</strong>
                  <span>Cung {pData.mauPalace?.palaceName} - {pData.mauPalace?.door}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-300 block">Lợi Nhuận (Sinh Môn):</strong>
                  <span>Cung {pData.sinhMonPalace?.palaceName} - {pData.sinhMonPalace?.direction}</span>
                </div>
              </div>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong>Quy luật:</strong> Cung Sinh Môn sinh cung Mậu hoặc cung Nhật Can thì buôn bán một vốn bốn lời. Nếu Sinh Môn khắc Mậu hoặc lạc Tuần Không thì cẩn trọng kẻo thâm hụt vốn.
              </p>
            </div>
          )}

          {activeClassicalTopic === 'career' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Chiêm Thi Cử & Công Danh Sự Nghiệp</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> <strong>Nhật Can</strong> đại diện cho Sĩ tử (Người đi thi/xin việc), <strong>Trực Phù</strong> là Chủ khảo (Cấp trên/Người tuyển dụng), <strong>Khai Môn</strong> là Chức vị/Cơ quan, <strong>Cảnh Môn</strong> là Bài thi/Văn bằng.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span>Trực Phù: Cung {chartKyMon.trucPhuNewPalace} ({chartKyMon.trucPhuStar})</span>
                <span className="block">Khai Môn: Cung {pData.khaiMonPalace?.palaceName}</span>
                <span className="block">Cảnh Môn: Cung {pData.canhMonPalace?.palaceName}</span>
              </div>
            </div>
          )}

          {activeClassicalTopic === 'lostItems' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" />
                <span>Chiêm Mất Của & Kẻ Trộm</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> <strong>Thời Can</strong> là Đồ vật bị mất, <strong>Thiên Bồng</strong> hoặc <strong>Huyền Vũ</strong> là Kẻ trộm, <strong>Sinh Môn</strong> là Nơi cất giấu / Tìm lại được.
              </p>
              {LOST_ITEMS_MAP[chartKyMon.trucPhuNewPalace] && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">Dấu vết đồ vật theo cung:</strong>
                  <p>{LOST_ITEMS_MAP[chartKyMon.trucPhuNewPalace].nature}</p>
                  <p className="text-slate-400">Đặc tính vật: {LOST_ITEMS_MAP[chartKyMon.trucPhuNewPalace].items}</p>
                </div>
              )}
            </div>
          )}

          {activeClassicalTopic === 'lawsuit' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-rose-400" />
                <span>Chiêm Kiện Tụng & Tranh Chấp</span>
              </h3>
              <p>
                <strong>Dụng thần:</strong> <strong>Trực Phù</strong> là Quan tòa / Trọng tài, <strong>Kinh Môn</strong> là Tranh cãi / Đấu lý, <strong>Cảnh Môn</strong> là Đơn từ khởi kiện, <strong>Can Ngày</strong> là Nguyên đơn, <strong>Can Giờ</strong> là Bị đơn.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span>Kinh Môn: Cung {pData.kinhMonPalace?.palaceName}</span>
                <span className="block">Cảnh Môn: Cung {pData.canhMonPalace?.palaceName}</span>
              </div>
            </div>
          )}

          {activeClassicalTopic === 'destiny' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <span>Chiêm Thân Mệnh (Nhân Sinh Quý Tiện)</span>
              </h3>
              <p>
                Xem cung Bản Mệnh dựa trên Thiên Can Ngày sinh hoặc Can Giờ chiêm: Nếu lâm Tam Cát Môn (Khai, Hưu, Sinh) đắc Trực Phù, Thái Âm, Lục Hợp là người tôn quý, phúc thọ song toàn. Nếu lâm Hung Môn (Tử, Kinh, Thương) lại bị Cung khắc thì cuộc đời nhiều bôn ba sóng gió, cần tu nhân tích đức để cải biến.
              </p>
            </div>
          )}

          {activeClassicalTopic === 'overview' && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Nguyên Lý Tam Bàn & Phân Định Chủ - Khách</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block">Quy Luật Tam Bàn:</strong>
                  <p>• Thiên Bàn (9 Sao): Đại diện cho Thiên thời, cát hung định sẵn.</p>
                  <p>• Nhân Bàn (8 Cửa): Đại diện cho Nhân sự, sự chủ động của con người.</p>
                  <p>• Địa Bàn (9 Cung): Đại diện cho Địa lợi, cơ sở đất đai vững chãi.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">Phân Định Chủ - Khách:</strong>
                  <p>• Ta chủ động tìm người: Ta là Khách (Thiên bàn), người là Chủ (Địa bàn).</p>
                  <p>• Người tìm đến ta: Ta là Chủ (Địa bàn), người là Khách (Thiên bàn).</p>
                  <p>• Khách sinh Chủ: Ít hao tốn, mang lại đại lợi cho phía Chủ.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
