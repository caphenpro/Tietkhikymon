import React, { useState, useMemo } from 'react';
import {
  Compass,
  Shield,
  Star,
  DoorOpen,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Sliders,
  Briefcase,
  Coins,
  Plane,
  HeartPulse,
  BookOpen,
  Crown,
  Swords,
  Scroll,
  Eye,
  Flame,
  ArrowRight,
  ArrowLeft,
  Moon,
  Heart,
  GraduationCap,
  Search,
  Scale,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CAN, CHI } from '../astronomy/canChi';
import { buildCompleteKyMonChart, CompleteKyMonChart, PalaceData, PALACE_RING_CW } from '../astronomy/kymonChart';
import { evaluateKyMonTimeMoment } from '../astronomy/kymonEvaluation';
import { TimeEvaluationCard } from './TimeEvaluationCard';
import { PalaceDetailModal } from './PalaceDetailModal';
import { KyMonInfo, BatTuInfo } from '../types';

interface KyMonCompleteBoardProps {
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
  onOpenPrognostication?: () => void;
  onSwitchToLucNham?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

// Bố cục ma trận Lạc Thư 3x3 chuẩn Kỳ Môn Độn Giáp:
// Hàng 1 (Nam / Tây Nam / Tây): Tốn (4) - Ly (9) - Khôn (2)
// Hàng 2 (Đông / Trung / Tây):   Chấn (3) - Trung (5) - Đoài (7)
// Hàng 3 (Đông Bắc / Bắc / Tây Bắc): Cấn (8) - Khảm (1) - Càn (6)
const LAC_THU_GRID: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export const KyMonCompleteBoard: React.FC<KyMonCompleteBoardProps> = ({
  currentKyMon,
  currentBatTu,
  onOpenPrognostication,
  onSwitchToLucNham,
  onNavigateTab,
}) => {
  // Mode: 'auto' (đồng bộ với thời gian thực / tính toán thiên văn) hoặc 'manual' (tự chọn Cục & Can Chi)
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');

  // Manual configuration state
  const [manualIsDuongDon, setManualIsDuongDon] = useState<boolean>(true);
  const [manualCucNumber, setManualCucNumber] = useState<number>(1);
  const [manualDayCan, setManualDayCan] = useState<string>('Giáp');
  const [manualDayChi, setManualDayChi] = useState<string>('Tý');
  const [manualHourCan, setManualHourCan] = useState<string>('Bính');
  const [manualHourChi, setManualHourChi] = useState<string>('Dần');

  // Selected Palace detail modal
  const [selectedPalaceNum, setSelectedPalaceNum] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  // Extract from auto if available
  const autoConfig = useMemo(() => {
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

    return { isDuong, cucNum, dCan, dChi, hCan, hChi };
  }, [currentKyMon, currentBatTu]);

  // Current active chart data
  const chart: CompleteKyMonChart = useMemo(() => {
    if (mode === 'auto') {
      return buildCompleteKyMonChart(
        autoConfig.isDuong,
        autoConfig.cucNum,
        autoConfig.dCan,
        autoConfig.dChi,
        autoConfig.hCan,
        autoConfig.hChi
      );
    } else {
      return buildCompleteKyMonChart(
        manualIsDuongDon,
        manualCucNumber,
        manualDayCan,
        manualDayChi,
        manualHourCan,
        manualHourChi
      );
    }
  }, [mode, autoConfig, manualIsDuongDon, manualCucNumber, manualDayCan, manualDayChi, manualHourCan, manualHourChi]);

  const selectedPalace: PalaceData | undefined = chart.palaces[selectedPalaceNum];

  const evaluation = useMemo(() => {
    return evaluateKyMonTimeMoment(chart);
  }, [chart]);

  // Helper colors for Elements
  const getElementBadgeColor = (el: string) => {
    switch (el) {
      case 'Mộc':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Hỏa':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/40';
      case 'Thổ':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'Kim':
        return 'bg-slate-800 text-slate-200 border-slate-600';
      case 'Thủy':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Helper color for Doors (Bát Môn)
  const getDoorColor = (door: string) => {
    if (['Sinh Môn', 'Khai Môn', 'Hưu Môn'].includes(door)) {
      return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    }
    if (['Cảnh Môn', 'Đỗ Môn'].includes(door)) {
      return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    }
    return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  };

  // Helper color for Gods (Bát Thần)
  const getGodColor = (god: string) => {
    if (['Trực Phù', 'Cửu Thiên', 'Thái Âm', 'Lục Hợp'].includes(god)) {
      return 'text-cyan-300 bg-cyan-950/60 border-cyan-500/40';
    }
    if (['Cửu Địa'].includes(god)) {
      return 'text-amber-300 bg-amber-950/60 border-amber-500/40';
    }
    return 'text-rose-300 bg-rose-950/60 border-rose-500/40';
  };

  const handleCellClick = (palaceNum: number) => {
    setSelectedPalaceNum(palaceNum);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB SWITCHER: KỲ MÔN ĐỘN GIÁP vs ĐẠI LỤC NHÂM */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3.5 rounded-2xl shadow-lg">
        {/* Navigation & switch buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onNavigateTab && (
            <button
              id="btn-kymon-back-guide"
              onClick={() => onNavigateTab('guide')}
              className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="Quay lại Cẩm Nang Tri Thức"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cẩm Nang</span>
            </button>
          )}

          <button
            id="btn-switch-kymon-active"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 ring-2 ring-amber-400/40"
          >
            <span>🔮</span>
            <span>Kỳ Môn Độn Giáp</span>
          </button>

          {onSwitchToLucNham && (
            <button
              id="btn-switch-lucnham"
              onClick={onSwitchToLucNham}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🧭</span>
              <span>Đại Lục Nhâm</span>
            </button>
          )}

          {onOpenPrognostication && (
            <button
              id="btn-goto-prognostication"
              onClick={onOpenPrognostication}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Dự Trắc Chuyên Sâu</span>
            </button>
          )}
        </div>

        {/* Mode Switcher: Auto Astronomical vs Manual Custom */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
          <button
            id="btn-mode-auto"
            onClick={() => setMode('auto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'auto'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Đồng Bộ Thiên Văn</span>
          </button>
          <button
            id="btn-mode-manual"
            onClick={() => setMode('manual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'manual'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tự Chọn Cục Số</span>
          </button>
        </div>
      </div>

      {/* Manual Configuration Bar (When Mode === 'manual') */}
      {mode === 'manual' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs animate-fadeIn">
          {/* Độn */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Độn Pháp</label>
            <select
              id="select-manual-don"
              value={manualIsDuongDon ? 'duong' : 'am'}
              onChange={(e) => setManualIsDuongDon(e.target.value === 'duong')}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              <option value="duong">Dương Độn (Sau Đông Chí)</option>
              <option value="am">Âm Độn (Sau Hạ Chí)</option>
            </select>
          </div>

          {/* Cục số */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Cục Số (1 - 9)</label>
            <select
              id="select-manual-cuc"
              value={manualCucNumber}
              onChange={(e) => setManualCucNumber(Number(e.target.value))}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  Cục {n}
                </option>
              ))}
            </select>
          </div>

          {/* Can Ngày */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Can Ngày</label>
            <select
              id="select-manual-day-can"
              value={manualDayCan}
              onChange={(e) => setManualDayCan(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              {CAN.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Chi Ngày */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Chi Ngày</label>
            <select
              id="select-manual-day-chi"
              value={manualDayChi}
              onChange={(e) => setManualDayChi(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              {CHI.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Can Giờ */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Can Giờ</label>
            <select
              id="select-manual-hour-can"
              value={manualHourCan}
              onChange={(e) => setManualHourCan(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              {CAN.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Chi Giờ */}
          <div>
            <label className="text-[11px] text-slate-400 font-semibold uppercase">Chi Giờ</label>
            <select
              id="select-manual-hour-chi"
              value={manualHourChi}
              onChange={(e) => setManualHourChi(e.target.value)}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-amber-400 outline-none"
            >
              {CHI.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* 2. SUMMARY PARAMETERS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Trực Phù (Sao):</span>
          <span className="font-bold text-cyan-300 text-sm">{chart.trucPhuStar}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
            Cung {chart.trucPhuPalace} → Đến {chart.trucPhuNewPalace}
          </span>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Trực Sử (Cửa):</span>
          <span className="font-bold text-emerald-300 text-sm">{chart.trucSuDoor}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
            Cung {chart.trucSuPalace} → Đến {chart.trucSuNewPalace}
          </span>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Cục Độn & Tuần Thủ:</span>
          <span className="font-bold text-amber-300 text-sm">{chart.cucName}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
            {chart.tuanThuGiap} ({chart.tuanThuCan})
          </span>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Tuần Không (Không Vong):</span>
          <span className="font-bold text-rose-300 text-sm">
            {chart.tuanKhongChi.join(', ')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Chi Khuyết Vị
          </span>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Dịch Mã Tinh:</span>
          <span className="font-bold text-amber-300 text-sm">
            Mã tại {chart.dichMaChi}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Chủ biến động, xuất hành
          </span>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 block font-medium">Cách Cục Nổi Bật:</span>
          <span className="font-bold text-amber-400 text-xs truncate block">
            {chart.specialFormations.length > 0
              ? chart.specialFormations[0].split('(')[0]
              : 'Bình thường'}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Tổng {chart.specialFormations.length} cách cục
          </span>
        </div>
      </div>

      {/* 3. TIME MOMENT EVALUATION 5-STAR SCORE CARD */}
      <TimeEvaluationCard
        evaluation={evaluation}
        chart={chart}
        onSelectPalace={(pNum) => handleCellClick(pNum)}
      />

      {/* 4. MAIN WORKSPACE: BÀN CỜ 9 CUNG KỲ MÔN (LƯỚI GRID 3X3 LẠC THƯ) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Ma Trận Lạc Thư 9 Cung Kỳ Môn Độn Giáp
              </h3>
              <p className="text-xs text-slate-400">
                Thần Bàn • Thiên Bàn • Nhân Bàn • Địa Bàn (Nhấp vào bất kỳ ô cung để mở luận giải chi tiết)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Thần
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Sao
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Cửa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" /> Can Thiên/Địa
            </span>
          </div>
        </div>

        {/* 3x3 Grid Layout (Lạc Thư: Tốn 4 - Ly 9 - Khôn 2; Chấn 3 - Trung 5 - Đoài 7; Cấn 8 - Khảm 1 - Càn 6) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full aspect-square">
          {LAC_THU_GRID.flatMap((row) =>
            row.map((palaceNum) => {
              const palace = chart.palaces[palaceNum];
              const isSelected = selectedPalaceNum === palaceNum;
              const isTrucPhuPalace = chart.trucPhuNewPalace === palaceNum;
              const isTrucSuPalace = chart.trucSuNewPalace === palaceNum;

              return (
                <div
                  key={palaceNum}
                  id={`kymon-palace-cell-${palaceNum}`}
                  onClick={() => handleCellClick(palaceNum)}
                  className={`rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between cursor-pointer transition-all border relative overflow-hidden group shadow-md ${
                    isSelected
                      ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-950/60 scale-[1.02] z-10'
                      : 'bg-slate-950/90 hover:bg-slate-900/95 border-slate-800/90 hover:border-amber-500/40 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                >
                  {/* Top: Gua Name, Direction & Palace Number */}
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-base font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                        {palace.guaName} {palace.palaceName}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 hidden sm:inline">
                        ({palace.direction})
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isTrucPhuPalace && (
                        <span
                          className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          title="Cung đóng Thần Trực Phù"
                        >
                          Phù
                        </span>
                      )}
                      {isTrucSuPalace && (
                        <span
                          className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          title="Cung đóng Cửa Trực Sử"
                        >
                          Sử
                        </span>
                      )}
                      <span className="text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-300">
                        {palace.palaceNum}
                      </span>
                    </div>
                  </div>

                  {/* Middle: 4 Tiers Concise Summary */}
                  <div className="my-2 space-y-1 sm:space-y-1.5 text-center">
                    {/* Thần Bàn */}
                    {palace.god && (
                      <div className="text-[11px] sm:text-xs font-bold truncate">
                        <span className={`px-2.5 py-0.5 rounded-md border inline-block ${getGodColor(palace.god)}`}>
                          {palace.god}
                        </span>
                      </div>
                    )}

                    {/* Cửu Tinh & Can Thiên Bàn */}
                    <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-amber-300">
                      <span>{palace.heavenStar}</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 border border-amber-500/40 font-mono">
                        {palace.heavenStem}
                        {palace.heavenStem2 ? `/${palace.heavenStem2}` : ''}
                      </span>
                    </div>

                    {/* Bát Môn */}
                    {palace.door && (
                      <div className="text-[11px] sm:text-xs font-bold">
                        <span className={`px-2.5 py-0.5 rounded-md border inline-block ${getDoorColor(palace.door)}`}>
                          {palace.door}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Can Địa Bàn & Thần Sát Badges */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/80 text-[10px] sm:text-xs">
                    {/* Can Địa Bàn */}
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">Địa:</span>
                      <span className="font-bold text-white font-mono bg-slate-900 px-1.5 py-0.2 rounded border border-slate-700">
                        {palace.earthStem}
                        {palace.earthStem2 ? ` (${palace.earthStem2})` : ''}
                      </span>
                    </div>

                    {/* Badges: Không, Mã, Lộc, Quý */}
                    <div className="flex items-center gap-1 font-bold">
                      {palace.isTuanKhong && (
                        <span className="text-rose-400 bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-500/40" title="Tuần Không (Không Vong)">
                          Không
                        </span>
                      )}
                      {palace.isDichMa && (
                        <span className="text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/40" title="Dịch Mã Tinh">
                          Mã
                        </span>
                      )}
                      {palace.isLocVi && (
                        <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/40" title="Lộc Vị">
                          Lộc
                        </span>
                      )}
                      {(palace.isDuongQuy || palace.isAmQuy) && (
                        <span className="text-purple-300 bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-500/40" title="Quý Nhân">
                          Quý
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Hint Overlay Bar */}
                  <div className="absolute inset-x-0 bottom-0 py-0.5 bg-amber-500/90 text-slate-950 text-[9px] font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 Nhấp xem chi tiết
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="text-center text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
          <span>💡</span>
          <span>
            Nhấp vào bất kỳ ô Cung nào trong 9 cung để mở cửa sổ luận giải toàn diện (Thập Can Khắc Ứng, Bát Môn, Cửu Tinh, Cách Cục).
          </span>
        </div>
      </div>

      {/* 5. MODAL CHI TIẾT CUNG (CLICK-TO-MODAL / DRAWER) */}
      <PalaceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        palaceNum={selectedPalaceNum}
        onSelectPalace={(pNum) => setSelectedPalaceNum(pNum)}
        chart={chart}
      />

      {/* 6. COLLAPSIBLE STEP-BY-STEP CLASSICAL DERIVATION GUIDE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <button
          onClick={() => setIsTutorialOpen((prev) => !prev)}
          className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Thuyết Minh 6 Bước An Quẻ Cổ Truyền (Bí Điển Kỳ Môn)
              </h4>
              <p className="text-xs text-slate-400">
                Quy luật lập Địa Bàn, Tuần Thủ, Thiên Bàn (Cửu Tinh), Nhân Bàn (Bát Môn) và Thần Bàn (Bát Thần)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>{isTutorialOpen ? 'Thu gọn' : 'Xem chi tiết 6 bước'}</span>
            {isTutorialOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isTutorialOpen && (
          <div className="p-5 border-t border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 animate-fadeIn">
            {/* BƯỚC 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">1</span>
                <span>BƯỚC 1: XÁC ĐỊNH ÂM DƯƠNG ĐỘN VÀ CỤC SỐ (Địa Bàn Tam Kỳ Lục Nghi)</span>
              </div>
              <p className="text-slate-300">
                Dựa vào Tiết khí và Can Chi ngày giờ: <strong className="text-white">{chart.cucName}</strong>. Bố trí Lục Nghi Tam Kỳ: <em>Mậu → Kỷ → Canh → Tân → Nhâm → Quý → Đinh → Bính → Ất</em>.
                {chart.isDuongDon ? ' Dương Độn bay thuận 1→2→3...→9.' : ' Âm Độn bay nghịch 9→8→7...→1.'}
              </p>
            </div>

            {/* BƯỚC 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">2</span>
                <span>BƯỚC 2: TÌM TUẦN THỦ VÀ TRỰC PHÙ / TRỰC SỬ</span>
              </div>
              <p className="text-slate-300">
                Giờ xem là <strong className="text-white">{chart.hourCanChi}</strong> thuộc tuần <strong className="text-cyan-300">{chart.tuanThuGiap}</strong> (Nghi đầu là <strong>{chart.tuanThuCan}</strong>).
                Sao Trực Phù gốc: <strong className="text-amber-300">{chart.trucPhuStar}</strong> (Cung {chart.trucPhuPalace}), Cửa Trực Sử gốc: <strong className="text-emerald-300">{chart.trucSuDoor}</strong> (Cung {chart.trucSuPalace}).
              </p>
            </div>

            {/* BƯỚC 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">3</span>
                <span>BƯỚC 3: XOAY THIÊN BÀN (Cửu Tinh) THEO CAN GIỜ</span>
              </div>
              <p className="text-slate-300">
                Sao Trực Phù mang theo Can Tuần Thủ bay đến cung chứa Can Giờ ({chart.hourCanChi.split(' ')[0]}) trên Địa Bàn (Cung <strong>{chart.trucPhuNewPalace}</strong>), kéo theo 8 sao còn lại xoay chuyển thuận chiều kim đồng hồ.
              </p>
            </div>

            {/* BƯỚC 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">4</span>
                <span>BƯỚC 4: AN BÁT MÔN (Nhân Bàn) THEO CHI GIỜ</span>
              </div>
              <p className="text-slate-300">
                Đếm số bước từ Chi Tuần Thủ đến Chi Giờ xem theo thứ tự cung độn để tìm vị trí Cửa Trực Sử (<strong className="text-emerald-300">{chart.trucSuDoor}</strong> đóng tại Cung <strong>{chart.trucSuNewPalace}</strong>), rồi an 7 cửa còn lại xoay vòng thuận chiều kim đồng hồ quanh 8 cung chu vi.
              </p>
            </div>

            {/* BƯỚC 5 & 6 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">5</span>
                <span>BƯỚC 5 & 6: AN BÁT THẦN VÀ TRA CỨU THẦN SÁT / CÁCH CỤC</span>
              </div>
              <p className="text-slate-300">
                Thần Trực Phù an đè lên Sao Trực Phù tại Cung <strong>{chart.trucPhuNewPalace}</strong>. Dương Độn xoay thuận, Âm Độn xoay nghịch. Kết hợp Thần Sát (Tuần Không {chart.tuanKhongChi.join(', ')}, Dịch Mã {chart.dichMaChi}) và Thập Can Khắc Ứng tại từng cung.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Footer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">Khám Phá Cẩm Nang & Đại Lục Nhâm</h4>
            <p className="text-slate-400 text-xs">Tra cứu ý nghĩa 9 Sao, 8 Cửa, 8 Thần và đối chiếu với Lục Nhâm Tam Truyền.</p>
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

          {onSwitchToLucNham && (
            <button
              onClick={onSwitchToLucNham}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Sang Đại Lục Nhâm</span>
            </button>
          )}

          {onOpenPrognostication && (
            <button
              onClick={onOpenPrognostication}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Dự Trắc Chuyên Sâu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
