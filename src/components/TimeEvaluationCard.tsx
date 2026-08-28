import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  Shield,
  Compass,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Flame,
  Info,
} from 'lucide-react';
import { KyMonEvaluationResult, PalaceEvaluation } from '../astronomy/kymonEvaluation';
import { CompleteKyMonChart } from '../astronomy/kymonChart';

interface TimeEvaluationCardProps {
  evaluation: KyMonEvaluationResult;
  chart: CompleteKyMonChart;
  onNavigateTab?: (tabId: string) => void;
  onSelectPalace?: (palaceNum: number) => void;
}

export const TimeEvaluationCard: React.FC<TimeEvaluationCardProps> = ({
  evaluation,
  chart,
  onNavigateTab,
  onSelectPalace,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'palaces' | 'action'>('overview');

  const {
    score,
    stars,
    level,
    verdict,
    shortTagline,
    badgeClass,
    starColor,
    breakdown,
    pros,
    cons,
    bestPalaces,
    worstPalaces,
    actionAdvice,
    palaceEvaluations,
  } = evaluation;

  // Render 5 Star Icons with precise half/full fill
  const renderStars = (starCount: number, size = 'w-5 h-5') => {
    const fullStars = Math.floor(starCount);
    const hasHalf = starCount - fullStars >= 0.3 && starCount - fullStars <= 0.7;
    const extraFull = starCount - fullStars > 0.7 ? 1 : 0;
    const totalFilled = fullStars + extraFull;

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((idx) => {
          if (idx <= totalFilled) {
            return (
              <Star
                key={idx}
                className={`${size} fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]`}
              />
            );
          } else if (idx === totalFilled + 1 && hasHalf) {
            return (
              <div key={idx} className="relative">
                <Star className={`${size} text-slate-600`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${size} fill-amber-400 text-amber-400`} />
                </div>
              </div>
            );
          } else {
            return <Star key={idx} className={`${size} text-slate-700`} />;
          }
        })}
      </div>
    );
  };

  // Mini Star render for badges
  const renderMiniStars = (starCount: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((idx) => (
          <Star
            key={idx}
            className={`w-3 h-3 ${
              idx <= Math.round(starCount)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* 1. TOP HEADER BANNER */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span>Đánh Giá Cát / Hung Mốc Thời Gian</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold font-mono">
                      Thang 5 Sao
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phối hợp tổng lực giữa <strong className="text-slate-200">Thiên bàn</strong>, <strong className="text-slate-200">Địa bàn</strong>, <strong className="text-slate-200">Bát Môn/Cung</strong> & <strong className="text-slate-200">Trực Phù / Trực Sử</strong>
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800/80 rounded-xl px-3.5 py-2.5 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{verdict}</span>
            </div>
          </div>

          {/* Right rating widget */}
          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl flex flex-col items-center sm:items-end justify-center shrink-0 min-w-[240px]">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-black text-amber-400 font-mono tracking-tight flex items-baseline gap-1">
                  <span>{stars.toFixed(1)}</span>
                  <span className="text-sm font-normal text-slate-400">/ 5.0</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {score} / 100 Điểm Khí Vận
                </div>
              </div>
              <div className="flex flex-col items-center">
                {renderStars(stars, 'w-5 h-5')}
                <div className={`mt-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${badgeClass}`}>
                  {level}
                </div>
              </div>
            </div>

            {/* Score progress bar */}
            <div className="w-full mt-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono">
                <span>Đại Hung</span>
                <span>Bình Hòa</span>
                <span>Đại Cát</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    score >= 75
                      ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                      : score >= 50
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                      : score >= 35
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                      : 'bg-gradient-to-r from-rose-600 to-rose-400'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Phân Tích 4 Cột Trụ</span>
          </button>

          <button
            onClick={() => setActiveSubTab('palaces')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'palaces'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Đánh Giá 8 Hướng (9 Cung)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('action')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'action'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Khuyến Nghị Hành Động</span>
          </button>

          <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cục Số: <strong className="text-slate-200">{chart.cucName}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT BASED ON ACTIVE SUB TAB */}
      <div className="p-5 sm:p-6">
        {/* SUB TAB 1: 4 CỘT TRỤ PHỐI HỢP */}
        {activeSubTab === 'overview' && (
          <div className="space-y-5">
            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Pillar 1: Thiên Bàn / Địa Bàn */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">1. Thiên Bàn / Địa Bàn</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-[10px]">
                      Thập Can
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 my-1">
                    Thập Can Khắc Ứng
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3">
                    Đánh giá tương tác giữa Can Thiên Bàn và Can Địa Bàn trên 9 cung (Thanh Long, Điểu Điệt, Kích Hình...).
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Điểm phối hợp:</span>
                  <span className="font-bold text-amber-400">{breakdown.stemScore}/100</span>
                </div>
              </div>

              {/* Pillar 2: Bát Môn & Cung */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">2. Nhân Bàn & Cung Vị</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px]">
                      Môn Cung
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 my-1">
                    Môn Cung Sinh Khắc
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3">
                    Đánh giá vị thế của 8 Cửa khi nhập 9 Cung: Môn Sinh Cung (Đại Cát), Tỷ Hòa, Môn Bách, Môn Chế.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Điểm môn vị:</span>
                  <span className="font-bold text-emerald-400">{breakdown.doorScore}/100</span>
                </div>
              </div>

              {/* Pillar 3: Trực Phù & Trực Sử */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">3. Tướng Soái & Chấp Pháp</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-[10px]">
                      Then Chốt
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 my-1">
                    Trực Phù & Trực Sử
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3">
                    ⭐ {chart.trucPhuStar} (Cung {chart.trucPhuNewPalace}) • 🚪 {chart.trucSuDoor} (Cung {chart.trucSuNewPalace}). Hai cung chủ soái định đoạt vĩ mô.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Trực Phù / Trực Sử:</span>
                  <span className="font-bold text-purple-400">{breakdown.trucPhuScore} / {breakdown.trucSuScore}</span>
                </div>
              </div>

              {/* Pillar 4: Bát Thần & Cửu Tinh */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">4. Thần Trợ & Thiên Thời</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[10px]">
                      Thần Tinh
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 my-1">
                    Cửu Tinh & Bát Thần
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3">
                    Phối hợp năng lượng Thiên Thời (Thiên Tâm, Thiên Cầm, Thiên Nhậm) và Hộ Thần (Trực Phù, Thái Âm, Lục Hợp, Cửu Thiên).
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Điểm thần tinh:</span>
                  <span className="font-bold text-amber-400">{breakdown.starsGodsScore}/100</span>
                </div>
              </div>
            </div>

            {/* Pros & Cons list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Pros */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Các Điểm Cát Lợi Tiêu Biểu (+ Điểm)</span>
                </div>
                <div className="space-y-1.5 pl-1">
                  {pros.length > 0 ? (
                    pros.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 italic">Khí trường trung hòa, không có điểm cát nổi trội</div>
                  )}
                </div>
              </div>

              {/* Cons */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/20 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Các Điểm Hung Hiểm Cần Phòng Tránh (- Điểm)</span>
                </div>
                <div className="space-y-1.5 pl-1">
                  {cons.length > 0 ? (
                    cons.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 italic">Không có đại hung cách nào cản trở</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB TAB 2: ĐÁNH GIÁ 8 HƯỚNG (9 CUNG) */}
        {activeSubTab === 'palaces' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>Bảng điểm sao chi tiết từng phương vị trong không gian:</span>
              <span className="text-amber-400 font-medium">Nhấp vào một Cung để xem chi tiết trên Bàn Kỳ Môn</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 8, 3, 4, 9, 2, 7, 6].map((pNum) => {
                const pe = palaceEvaluations[pNum];
                if (!pe) return null;

                const isBest = bestPalaces.some((b) => b.palaceNum === pNum);
                const isWorst = worstPalaces.some((w) => w.palaceNum === pNum);

                return (
                  <div
                    key={pNum}
                    onClick={() => {
                      if (onSelectPalace) onSelectPalace(pNum);
                      if (onNavigateTab) onNavigateTab('kymon-board');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${
                      isBest
                        ? 'bg-amber-950/30 border-amber-500/40 shadow-sm'
                        : isWorst
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200">
                        {pe.palaceName} ({pe.direction})
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {pe.stars} ⭐
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      {renderMiniStars(pe.stars)}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          pe.level === 'Đại Cát'
                            ? 'bg-amber-500/20 text-amber-300'
                            : pe.level === 'Cát'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : pe.level === 'Bình Hòa'
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {pe.level}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono truncate mb-1">
                      {pe.summary}
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1 mt-2 text-[10px]">
                      {pe.isTrucPhu && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          Trực Phù
                        </span>
                      )}
                      {pe.isTrucSu && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          Trực Sử
                        </span>
                      )}
                      {isBest && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          ★ Cát Vị
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick summary for travel / meeting */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">
                  Phương vị đắc cát khí cao nhất lúc này:{' '}
                  <strong className="text-amber-400 font-semibold">{actionAdvice.bestDirection}</strong>
                </span>
              </div>
              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('kymon-board')}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Xem bàn 9 Cung chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* SUB TAB 3: KHUYẾN NGHỊ HÀNH ĐỘNG */}
        {activeSubTab === 'action' && (
          <div className="space-y-4">
            {/* Strategy Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Chiến Lược Chủ - Khách Phù Hợp</div>
                  <div className="text-sm font-bold text-slate-100">{actionAdvice.strategy}</div>
                </div>
              </div>
              <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                Thang điểm: {stars} / 5.0 ⭐
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Should do */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Việc Nên Tiến Hành Trong Khung Giờ Này</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  {actionAdvice.recommended.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Should avoid */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Những Việc Cần Thận Trọng / Kiêng Kỵ</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  {actionAdvice.avoid.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0 mt-0.5">✗</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
