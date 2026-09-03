import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Award,
  Layers,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  Heart,
  Briefcase,
  Activity,
  Scale,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Eye,
  Info,
} from 'lucide-react';
import { ComprehensiveResult } from '../types';
import { buildLucNhamChart, LucNhamChart, LucNhamPalace, THAP_NHI_THIEN_TUONG, NGUYET_TUONG_MAP } from '../astronomy/lucNham';
import { getLocalComponents } from '../astronomy/canChi';

interface LucNhamPanelProps {
  result: ComprehensiveResult;
  currentDate: Date;
  onOpenAlgorithmModal?: () => void;
  onSwitchToKyMon?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const LucNhamPanel: React.FC<LucNhamPanelProps> = ({
  result,
  currentDate,
  onOpenAlgorithmModal,
  onSwitchToKyMon,
  onNavigateTab,
}) => {
  const [selectedPalaceChi, setSelectedPalaceChi] = useState<string>('Tý');
  const [activeAspect, setActiveAspect] = useState<'all' | 'cautai' | 'honnhan' | 'quanvan' | 'benhtat' | 'kientung' | 'xuathanh'>('all');

  const localTime = useMemo(() => getLocalComponents(currentDate), [currentDate]);

  const chart: LucNhamChart = useMemo(() => {
    return buildLucNhamChart(
      result.solarLongitude,
      result.batTu.dayCanChi,
      result.batTu.hourCanChi,
      localTime.hour
    );
  }, [result.solarLongitude, result.batTu, localTime.hour]);

  const selectedPalace: LucNhamPalace | undefined = chart.palaces[selectedPalaceChi];

  // Helper colors for Elements
  const getElementColor = (el: string) => {
    if (el.includes('Mộc')) return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';
    if (el.includes('Hỏa')) return 'bg-rose-950/60 border-rose-500/40 text-rose-300';
    if (el.includes('Thổ')) return 'bg-amber-950/60 border-amber-500/40 text-amber-300';
    if (el.includes('Kim')) return 'bg-slate-800/80 border-slate-400/40 text-slate-200';
    if (el.includes('Thủy')) return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
    return 'bg-slate-900 border-slate-700 text-slate-300';
  };

  const getNatureBadge = (nature: 'Cát' | 'Hung' | 'Trung') => {
    if (nature === 'Cát') {
      return <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">Cát</span>;
    }
    if (nature === 'Hung') {
      return <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">Hung</span>;
    }
    return <span className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-300 border border-slate-600/40 text-[10px] font-bold">Trung</span>;
  };

  // Rendering 5 stars
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
                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                  : half
                  ? 'text-amber-300/80'
                  : 'text-slate-700'
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

  // Evaluation of Process Success/Failure through 3 stages (Tam Truyen)
  const processEvaluation = useMemo(() => {
    const so = chart.tamTruyen[0];
    const trung = chart.tamTruyen[1];
    const mat = chart.tamTruyen[2];

    const isSoGood = so.thienTuongInfo.nature === 'Cát' && !so.isTuanKhong;
    const isTrungGood = trung.thienTuongInfo.nature !== 'Hung';
    const isMatGood = mat.thienTuongInfo.nature === 'Cát' && !mat.isTuanKhong;

    let outcomeTitle = 'Thành Công Thuận Lợi';
    let outcomeBadge = 'Đại Cát';
    let outcomeColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    let advice = '';

    if (mat.isTuanKhong) {
      outcomeTitle = 'Hoa Trong Gương, Trăng Dưới Nước (Dây Dưa / Hư Vọng Khó Thành)';
      outcomeBadge = 'Cần Thận Trọng';
      outcomeColor = 'text-amber-400 border-amber-500/40 bg-amber-950/30';
      advice = 'Mạt Truyền lâm Tuần Không, kết quả cuối cùng dễ bị hụt hẫng hoặc không như dự kiến. Cần chuẩn bị phương án dự phòng và kiên định nền tảng thực chất.';
    } else if (mat.thienTuongInfo.nature === 'Hung') {
      outcomeTitle = 'Có Trở Ngại Cuối Đường / Dễ Thất Bại';
      outcomeBadge = 'Hung';
      outcomeColor = 'text-rose-400 border-rose-500/40 bg-rose-950/30';
      advice = `Mạt Truyền gặp hung tướng ${mat.thienTuong}, kết cục dễ phát sinh hao tổn hoặc tranh chấp. Nên thu hẹp quy mô, không nên dấn sâu vào mạo hiểm.`;
    } else if (isSoGood && isTrungGood && isMatGood) {
      outcomeTitle = 'Đại Cát Đại Lợi - Việc Tất Thành';
      outcomeBadge = 'Đại Cát';
      outcomeColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
      advice = 'Cả ba giai đoạn từ Khởi đầu đến Diễn biến và Kết thúc đều có cát thần che chở. Hãy tự tin dốc toàn lực thực thi mục tiêu.';
    } else if (!isSoGood && isMatGood) {
      outcomeTitle = 'Tiền Nan Hậu Dị (Khởi Đầu Khó Khăn Nhưng Cuối Cùng Thành Công)';
      outcomeBadge = 'Cát';
      outcomeColor = 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
      advice = 'Khởi đầu gặp chút trắc trở gian nan nhưng càng về sau càng hanh thông nhờ Mạt Truyền quy tụ cát khí. Cần kiên nhẫn vượt qua thử thách ban đầu.';
    } else {
      outcomeTitle = 'Tiến Triển Bình Hòa / Tùy Thuộc Nỗ Lực Bản Thân';
      outcomeBadge = 'Bình Hòa';
      outcomeColor = 'text-indigo-400 border-indigo-500/40 bg-indigo-950/30';
      advice = 'Tiến trình bình ổn, sự thành bại phụ thuộc vào sự cẩn trọng và xử lý mềm dẻo của bản thân trong từng bước.';
    }

    return {
      soDesc: isSoGood ? 'Khởi đầu thuận lợi, có nhân duyên mở lối' : 'Khởi đầu có vướng mắc hoặc hao phí, cần chuẩn bị kỹ',
      trungDesc: isTrungGood ? 'Diễn biến có chuyển biến tích cực, từng bước đi vào quỹ đạo' : 'Giai đoạn giữa có biến động hoặc thử thách, cần kiên trì',
      matDesc: isMatGood ? 'Kết quả sáng sủa, công việc đạt mục tiêu' : 'Kết quả cần nỗ lực duy trì, tránh sơ suất phút chót',
      outcomeTitle,
      outcomeBadge,
      outcomeColor,
      advice,
    };
  }, [chart.tamTruyen]);

  return (
    <div className="space-y-6">
      {/* TOP TAB SWITCHER: KỲ MÔN ĐỘN GIÁP vs ĐẠI LỤC NHÂM */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3.5 rounded-2xl shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          {onNavigateTab && (
            <button
              id="btn-lucnham-back-guide"
              onClick={() => onNavigateTab('guide')}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="Quay lại Cẩm Nang Tri Thức"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cẩm Nang</span>
            </button>
          )}

          {onSwitchToKyMon && (
            <button
              id="btn-lucnham-switch-kymon"
              onClick={onSwitchToKyMon}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🔮</span>
              <span>Kỳ Môn Độn Giáp</span>
            </button>
          )}

          <button
            id="btn-lucnham-switch-active"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 ring-2 ring-indigo-400/40"
          >
            <span>🧭</span>
            <span>Đại Lục Nhâm</span>
          </button>

          {onNavigateTab && (
            <button
              id="btn-lucnham-goto-prognostication"
              onClick={() => onNavigateTab('kymon-prognostication')}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Dự Trắc Chuyên Sâu</span>
            </button>
          )}
        </div>

        {onOpenAlgorithmModal && (
          <button
            onClick={onOpenAlgorithmModal}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 self-end sm:self-auto transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Thuyết Minh Cửu Tông Môn</span>
          </button>
        )}
      </div>

      {/* 1. HEADER BANNER & THỜI ĐIỂM CHIÊM QUẺ */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5 animate-[spin_20s_linear_infinite]" />
                <span>BÍ TÀNG ĐẠI LỤC NHÂM TOÀN THƯ</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                Tam Thức Chi Nhất (Thiên Kỳ Môn - Địa Lục Nhâm - Nhân Thái Ất)
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Bàn Quẻ Đại Lục Nhâm Độn Giáp</span>
              <span className="text-indigo-400 text-sm sm:text-base font-normal">({chart.tongMonName})</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Lập bàn quẻ Lục Nhâm theo chuẩn cổ bản: Lấy <strong>Nguyệt Tướng</strong> theo Tiết khí gia lên <strong>Chi Giờ</strong> trên Địa bàn, khởi <strong>Tứ Khoa</strong>, phát động <strong>Tam Truyền (Cửu Tông Môn)</strong> và gia lâm <strong>12 Thần Tướng</strong> để thông tỏ quá khứ, hiện tại và tương lai.
            </p>
          </div>

          {/* Quick Score & Star Rating */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 shadow-inner flex flex-col items-center justify-center min-w-[200px] text-center shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Đánh Giá Cát Hung
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {chart.stars}
              </span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <div className="mt-1">{renderStars(chart.stars)}</div>
            <div className="mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              {chart.level} ({chart.score}/100đ)
            </div>
          </div>
        </div>

        {/* Status Parameters Pill Bar */}
        <div className="mt-5 pt-4 border-t border-indigo-900/40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Ngày Chiêm Quẻ</div>
            <div className="font-bold text-amber-300 font-mono mt-0.5">{chart.ngayCanChi}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Giờ Chiêm Quẻ</div>
            <div className="font-bold text-amber-300 font-mono mt-0.5">{chart.gioCanChi}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Nguyệt Tướng (Tiết Khí)</div>
            <div className="font-bold text-indigo-300 font-mono mt-0.5">
              {chart.nguyetTuongName} ({chart.nguyetTuongChi})
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Khởi Quý Nhân</div>
            <div className="font-bold text-cyan-300 font-mono mt-0.5">
              {chart.quyNhanChi} ({chart.quyNhanDirection === 'Thuận' ? 'Thuận Hành' : 'Nghịch Hành'})
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Thời Khắc Chiêm</div>
            <div className="font-bold text-purple-300 font-mono mt-0.5">{chart.quyNhanType}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400">Tuần Không</div>
            <div className="font-bold text-rose-300 font-mono mt-0.5">
              {chart.tuanKhong.join(', ')} ({chart.tuanGiap})
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAM TRUYỀN & TỨ KHOA (CORE ENGINE OF LUC NHAM) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TAM TRUYỀN (SƠ - TRUNG - MẠT) - 5 cols */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Tam Truyền (Diễn Biến Thời Gian)</span>
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
                {chart.tongMonName}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
              {chart.tongMonDescription}
            </p>

            <div className="space-y-3">
              {chart.tamTruyen.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    idx === 0
                      ? 'bg-amber-950/30 border-amber-500/40 shadow-sm'
                      : idx === 1
                      ? 'bg-indigo-950/25 border-indigo-500/30'
                      : 'bg-emerald-950/25 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          idx === 0
                            ? 'bg-amber-500 text-slate-950'
                            : idx === 1
                            ? 'bg-indigo-500 text-white'
                            : 'bg-emerald-500 text-slate-950'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-100 text-sm">{t.level}:</span>
                      <span className="font-bold text-amber-300 font-mono text-base">{t.chi}</span>
                      <span className="text-xs text-slate-400 font-mono">({t.nguHanh})</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1">
                        <span>{t.thienTuongInfo.symbol}</span>
                        <span>{t.thienTuong}</span>
                      </span>
                      {getNatureBadge(t.thienTuongInfo.nature)}
                      {t.isTuanKhong && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                          Triệt Không
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400">Lục Thân: </span>
                      <strong className="text-indigo-300">{t.lucThan}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {t.meaning}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
            <strong className="text-amber-300">Quy Luật Tam Truyền: </strong>
            Sơ Truyền chủ về khởi sự (quá khứ/nguyên nhân), Trung Truyền chủ về chuyển biến (hiện tại), Mạt Truyền định đoạt kết quả (tương lai).
          </div>
        </div>

        {/* TỨ KHOA (BỐN KHOA) - 7 cols */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Tứ Khoa (Bốn Trụ Cột Năng Lượng Can Chi)</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Khoa 4 ➔ Khoa 3 ➔ Khoa 2 ➔ Khoa 1
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4">
              Tứ Khoa phân định ranh giới giữa <strong>Can (Chủ thể/Người)</strong> và <strong>Chi (Khách thể/Nhà/Việc)</strong>; Thượng Thần biểu hiện trạng thái lộ rõ, Hạ Thần biểu hiện nền tảng gốc rễ.
            </p>

            {/* 4 Khoa Cards Grid (Reversed from 4 to 1 like classical books) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[...chart.tuKhoa].reverse().map((k) => (
                <div
                  key={k.index}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                    <span className="font-bold text-xs text-indigo-300">{k.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      #{k.index}
                    </span>
                  </div>

                  {/* Fraction style: Thuong Than / Ha Than */}
                  <div className="py-2 flex flex-col items-center justify-center bg-slate-900/90 rounded-lg border border-slate-800/60 space-y-1">
                    <div className="text-center">
                      <div className="text-[10px] text-slate-400">Thượng Thần (Thiên)</div>
                      <div className="text-base font-black text-amber-300 font-mono">{k.thuongThan}</div>
                      <div className="text-[10px] text-slate-400">{k.thuongNguHanh}</div>
                    </div>

                    <div className="w-12 h-px bg-slate-700 my-1"></div>

                    <div className="text-center">
                      <div className="text-base font-black text-cyan-300 font-mono">{k.haThan}</div>
                      <div className="text-[10px] text-slate-400">Hạ Thần (Địa)</div>
                    </div>
                  </div>

                  {/* Thien Tuong & Sinh Khac Relation */}
                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Thần:</span>
                      <span className="font-bold text-slate-200">{k.thienTuong}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate" title={k.relation}>
                      {k.relation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-slate-300">
              <strong className="text-amber-300">Khoa 1 & Khoa 2 (Can Thượng/Can Âm): </strong>
              Đại diện cho ta, bản thân, nhân tâm, ý chí chủ quan và gia đạo nội bộ.
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-slate-300">
              <strong className="text-indigo-300">Khoa 3 & Khoa 4 (Chi Thượng/Chi Âm): </strong>
              Đại diện cho người ngoài, hoàn cảnh khách quan, nhà cửa, nơi chốn và đối tác.
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 LUẬN BÀN QUÁ TRÌNH THÀNH BẠI (3 GIAI ĐOẠN: SƠ - TRUNG - MẠT) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Luận Bàn Quá Trình Thành Bại (Đại Lục Nhâm 3 Giai Đoạn)
              </h3>
              <p className="text-xs text-slate-400">
                Đại Lục Nhâm chuyên biệt luận giải tiến trình nhân quả: Khởi nguyên ➔ Biến chuyển ➔ Kết cục quy túc
              </p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-xl border text-xs font-bold font-mono ${processEvaluation.outcomeColor}`}>
            {processEvaluation.outcomeBadge}
          </div>
        </div>

        {/* 3 Stages Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {/* Stage 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <span>Giai Đoạn 1: Khởi Sự</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Sơ Truyền ({chart.tamTruyen[0].chi})</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {processEvaluation.soDesc}. Thần tướng: <strong>{chart.tamTruyen[0].thienTuong}</strong> ({chart.tamTruyen[0].thienTuongInfo.nature}).
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Chủ về: {chart.tamTruyen[0].meaning}
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <span>Giai Đoạn 2: Diễn Biến</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Trung Truyền ({chart.tamTruyen[1].chi})</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {processEvaluation.trungDesc}. Thần tướng: <strong>{chart.tamTruyen[1].thienTuong}</strong> ({chart.tamTruyen[1].thienTuongInfo.nature}).
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Chủ về: {chart.tamTruyen[1].meaning}
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <span>Giai Đoạn 3: Kết Cục</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Mạt Truyền ({chart.tamTruyen[2].chi})</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {processEvaluation.matDesc}. Thần tướng: <strong>{chart.tamTruyen[2].thienTuong}</strong> ({chart.tamTruyen[2].thienTuongInfo.nature}).
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              Chủ về: {chart.tamTruyen[2].meaning}
            </div>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className={`p-4 rounded-xl border ${processEvaluation.outcomeColor} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-300">Định Đoạt Thành Bại Chung Cuộc:</div>
            <div className="text-sm sm:text-base font-extrabold text-white">
              {processEvaluation.outcomeTitle}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              {processEvaluation.advice}
            </p>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('kymon-prognostication')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Xem Luận Giải Song Thức</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. BÀN 12 CUNG ĐẠI LỤC NHÂM (THIÊN BÀN - ĐỊA BÀN - 12 THẦN TƯỚNG) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 12 Palaces Matrix (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Bàn 12 Cung Đại Lục Nhâm (Địa Bàn & Thiên Bàn)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Nhấp vào từng cung để tra cứu chi tiết Thần Tướng, Nguyệt Tướng và Sinh Khắc.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Nguyệt Tướng: <strong className="text-indigo-300">{chart.nguyetTuongName} ({chart.nguyetTuongChi})</strong>
              </span>
            </div>
          </div>

          {/* 12 Cung Grid (arranged in 3 rows x 4 cols or classical 12-palace circle) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {chart.palacesList.map((p) => {
              const isSelected = selectedPalaceChi === p.diaChi;
              const isSoTruyen = chart.tamTruyen[0].chi === p.thienChi;
              const isTrungTruyen = chart.tamTruyen[1].chi === p.thienChi;
              const isMatTruyen = chart.tamTruyen[2].chi === p.thienChi;

              return (
                <div
                  key={p.diaChi}
                  onClick={() => setSelectedPalaceChi(p.diaChi)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  {/* Indicator Pills */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Cung {p.diaChi}
                    </span>

                    <div className="flex items-center gap-1">
                      {isSoTruyen && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold">
                          Sơ
                        </span>
                      )}
                      {isTrungTruyen && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500 text-white font-bold">
                          Trung
                        </span>
                      )}
                      {isMatTruyen && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500 text-slate-950 font-bold">
                          Mạt
                        </span>
                      )}
                      {p.isTuanKhong && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                          Không
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Core Value: Thien Chi over Dia Chi */}
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Thiên Bàn</div>
                      <div className="text-base font-black text-amber-300 font-mono">{p.thienChi}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <div className="text-right">
                      <div className="text-[9px] text-slate-400 uppercase">Địa Bàn</div>
                      <div className="text-base font-black text-cyan-300 font-mono">{p.diaChi}</div>
                    </div>
                  </div>

                  {/* Thien Tuong & Badges */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 flex items-center gap-1">
                        <span>{p.thienTuongInfo.symbol}</span>
                        <span>{p.thienTuong}</span>
                      </span>
                      {getNatureBadge(p.thienTuongInfo.nature)}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {p.isQuyNhan && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
                          👑 Quý Nhân
                        </span>
                      )}
                      {p.isLocThan && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                          💰 Lộc Thần
                        </span>
                      )}
                      {p.isDichMa && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40">
                          🐎 Dịch Mã
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Palace Details Explorer (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
          {selectedPalace ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                    Chi Tiết Cung Địa Bàn
                  </div>
                  <h4 className="font-black text-xl text-amber-400 font-mono">
                    Cung {selectedPalace.diaChi}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedPalace.nguHanhDia}
                  </span>
                </div>
              </div>

              {/* Thien Ban over Dia Ban info */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Quan Hệ Thiên - Địa Bàn:</div>
                <div className="text-xs text-slate-300">
                  Thiên bàn <strong className="text-amber-300 font-mono">{selectedPalace.thienChi}</strong> ({selectedPalace.nguHanhThien}) đè lên Địa bàn <strong className="text-cyan-300 font-mono">{selectedPalace.diaChi}</strong> ({selectedPalace.nguHanhDia}).
                </div>
                <div className="text-xs text-indigo-300 font-medium">
                  {selectedPalace.relation}
                </div>
              </div>

              {/* Thien Tuong details */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <span className="text-base">{selectedPalace.thienTuongInfo.symbol}</span>
                    <span>Thần Tướng: {selectedPalace.thienTuong}</span>
                  </div>
                  {getNatureBadge(selectedPalace.thienTuongInfo.nature)}
                </div>
                <div className="text-xs text-slate-400">
                  Ngũ Hành: <strong className="text-slate-200">{selectedPalace.thienTuongInfo.element}</strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedPalace.thienTuongInfo.description}
                </p>
              </div>

              {/* Than Sat in this palace */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-slate-200">Thần Sát & Tương Tác:</div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {selectedPalace.isQuyNhan && <li>Có <strong className="text-amber-300">Quý Nhân</strong> tọa trấn đem lại cát lợi, che chở trăm sự.</li>}
                  {selectedPalace.isLocThan && <li>Gặp <strong className="text-emerald-300">Lộc Thần</strong> chủ tiền tài, bổng lộc tăng trưởng.</li>}
                  {selectedPalace.isDichMa && <li>Lâm <strong className="text-indigo-300">Dịch Mã</strong> chủ biến động, di chuyển, đi xa có lợi.</li>}
                  {selectedPalace.isTuanKhong && <li>Phạm <strong className="text-rose-300">Tuần Không</strong> chủ sự tình hư ảo, chưa thành hình.</li>}
                  {!selectedPalace.isQuyNhan && !selectedPalace.isLocThan && !selectedPalace.isDichMa && !selectedPalace.isTuanKhong && (
                    <li>Cung vị bình hòa, không có xung sát đặc biệt.</li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs">
              Chọn một cung trên bàn để xem chi tiết
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Đại Lục Nhâm định vị chuẩn xác theo kinh vĩ độ thời gian thiên văn.
          </div>
        </div>
      </div>

      {/* 4. DỰ TRẮC CHUYÊN ĐỀ 6 PHƯƠNG DIỆN ĐỜI SỐNG */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Dự Trắc Đại Lục Nhâm 6 Phương Diện Đời Sống</span>
            </h3>
            <p className="text-xs text-slate-400">
              Tổng luận chiêm đoán các vấn đề thực tiễn theo Tam Truyền, Tứ Khoa và Thần Tướng.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'cautai', label: 'Cầu Tài' },
              { id: 'honnhan', label: 'Hôn Nhân' },
              { id: 'quanvan', label: 'Công Danh' },
              { id: 'benhtat', label: 'Sức Khỏe' },
              { id: 'kientung', label: 'Kiện Tụng' },
              { id: 'xuathanh', label: 'Xuất Hành' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAspect(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  activeAspect === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activeAspect === 'all' || activeAspect === 'cautai') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>1. Cầu Tài & Giao Thương</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.cauTai}
              </p>
            </div>
          )}

          {(activeAspect === 'all' || activeAspect === 'honnhan') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>2. Tình Duyên & Hôn Nhân</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.honNhan}
              </p>
            </div>
          )}

          {(activeAspect === 'all' || activeAspect === 'quanvan') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>3. Công Danh & Sự Nghiệp</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.quanVan}
              </p>
            </div>
          )}

          {(activeAspect === 'all' || activeAspect === 'benhtat') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>4. Sức Khỏe & Tật Bệnh</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.benhTat}
              </p>
            </div>
          )}

          {(activeAspect === 'all' || activeAspect === 'kientung') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Scale className="w-4 h-4" />
                <span>5. Tranh Chấp & Pháp Lý</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.kienTung}
              </p>
            </div>
          )}

          {(activeAspect === 'all' || activeAspect === 'xuathanh') && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Navigation className="w-4 h-4" />
                <span>6. Xuất Hành & Cầu Vận</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {chart.prognostications.xuatHanh}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Footer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">Khám Phá Cẩm Nang Tri Thức & Kỳ Môn Độn Giáp</h4>
            <p className="text-slate-400 text-xs">Tra cứu ý nghĩa Tứ Khoa, Tam Truyền, Thần Tướng và đối chiếu với Bàn Kỳ Môn 9 Cung.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('guide')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cẩm Nang Tri Thức</span>
            </button>
          )}

          {onSwitchToKyMon && (
            <button
              onClick={onSwitchToKyMon}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Sang Bàn Kỳ Môn 9 Cung</span>
            </button>
          )}

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('kymon-prognostication')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dự Trắc Chuyên Sâu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
