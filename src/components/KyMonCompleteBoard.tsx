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
  Heart,
  GraduationCap,
  Search,
  Scale,
  User,
  ExternalLink,
} from 'lucide-react';
import { CAN, CHI } from '../astronomy/canChi';
import { buildCompleteKyMonChart, CompleteKyMonChart, PalaceData, PALACE_RING_CW } from '../astronomy/kymonChart';
import { KyMonInfo, BatTuInfo } from '../types';

interface KyMonCompleteBoardProps {
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
  onOpenPrognostication?: () => void;
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

  // Selected Palace detail modal / panel
  const [selectedPalaceNum, setSelectedPalaceNum] = useState<number>(1);
  const [palaceDetailTab, setPalaceDetailTab] = useState<'canKhacUng' | 'batMon' | 'tinhThan' | 'special' | 'overview'>('canKhacUng');

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

  return (
    <div className="space-y-6">
      {/* Top Banner: Lập Bàn Kỳ Môn Hoàn Chỉnh */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
              <Compass className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Lập Bàn Kỳ Môn Độn Giáp Hoàn Chỉnh
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 font-mono">
                  {chart.cucName}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
                  Tuần thủ: {chart.tuanThuGiap} ({chart.tuanThuCan})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Đầy đủ 4 tầng: Thần Bàn (Bát Thần) • Thiên Bàn (Cửu Tinh + Can Trời) • Nhân Bàn (Bát Môn) • Địa Bàn (9 Cung Lạc Thư + Can Đất)
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
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

        {/* Configuration Bar when in Manual Mode */}
        {mode === 'manual' && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
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

        {/* Quick Highlights info */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Trực Phù (Sao):</span>
            <span className="font-bold text-cyan-300 text-sm">{chart.trucPhuStar}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Gốc: Cung {chart.trucPhuPalace} → Đến Cung {chart.trucPhuNewPalace}
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Trực Sử (Cửa):</span>
            <span className="font-bold text-emerald-300 text-sm">{chart.trucSuDoor}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Gốc: Cung {chart.trucSuPalace} → Đến Cung {chart.trucSuNewPalace}
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Can Chi Xem:</span>
            <span className="font-bold text-white text-sm">
              Ngày {chart.dayCanChi} • Giờ {chart.hourCanChi}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
              Tuần {chart.tuanThuGiap} ({chart.tuanThuCan})
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Tuần Không (Không Vong):</span>
            <span className="font-bold text-rose-300 text-sm">
              {chart.tuanKhongChi.join(', ')}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Cung {chart.tuanKhongChi.map((c) => (c === 'Tuất' || c === 'Hợi' ? '6' : c === 'Thân' || c === 'Dậu' ? '7' : c === 'Ngọ' || c === 'Mùi' ? '2/9' : '4/3')).join(', ')}
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Dịch Mã Tinh:</span>
            <span className="font-bold text-amber-300 text-sm">
              Mã tại {chart.dichMaChi}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Lợi xuất hành, di chuyển
            </span>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Cách Cục Nổi Bật:</span>
            <span className="font-bold text-amber-400 text-xs truncate block">
              {chart.specialFormations.length > 0
                ? chart.specialFormations[0].split('(')[0]
                : 'Bình thường'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Tổng cộng {chart.specialFormations.length} cách cục
            </span>
          </div>
        </div>
      </div>

      {/* Main 9-Palaces Visual Matrix + Palace Detail Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 9 Palaces Matrix (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h4 className="text-base sm:text-lg font-bold text-white">
                Bản Đồ Bàn Cửu Cung Lạc Thư (Kỳ Môn Ma Trận)
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Thần
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Sao
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Cửa
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" /> Can Thiên/Địa
              </span>
            </div>
          </div>

          {/* 3x3 Grid Layout */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 aspect-square max-w-2xl mx-auto">
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
                    onClick={() => setSelectedPalaceNum(palaceNum)}
                    className={`rounded-2xl p-2.5 sm:p-3.5 flex flex-col justify-between cursor-pointer transition-all border relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800/95 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-950/50 scale-[1.02] z-10'
                        : 'bg-slate-950/85 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Palace Header: Name, Direction, Number */}
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                          {palace.guaName} {palace.palaceName}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          ({palace.direction})
                        </span>
                      </div>

                      {/* Element & Palace Number Badge */}
                      <div className="flex items-center gap-1">
                        {isTrucPhuPalace && (
                          <span
                            className="px-1 py-0.2 text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                            title="Cung đóng Thần Trực Phù"
                          >
                            Phù
                          </span>
                        )}
                        {isTrucSuPalace && (
                          <span
                            className="px-1 py-0.2 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            title="Cung đóng Cửa Trực Sử"
                          >
                            Sử
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300">
                          {palace.palaceNum}
                        </span>
                      </div>
                    </div>

                    {/* Middle: 4 Layers Layout (Thần - Sao - Cửa - Can) */}
                    <div className="my-1.5 space-y-1 text-center">
                      {/* Thần Bàn */}
                      {palace.god && (
                        <div className="text-[11px] sm:text-xs font-bold truncate">
                          <span className={`px-2 py-0.5 rounded-md border inline-block ${getGodColor(palace.god)}`}>
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
                          <span className={`px-2 py-0.5 rounded-md border inline-block ${getDoorColor(palace.door)}`}>
                            {palace.door}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom: Can Địa Bàn & Thần Sát Badges */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                      {/* Can Địa Bàn */}
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Địa:</span>
                        <span className="font-bold text-white font-mono bg-slate-900 px-1 rounded border border-slate-700">
                          {palace.earthStem}
                          {palace.earthStem2 ? ` (${palace.earthStem2})` : ''}
                        </span>
                      </div>

                      {/* Badges: Không, Mã, Lộc, Quý */}
                      <div className="flex items-center gap-1 font-bold">
                        {palace.isTuanKhong && (
                          <span className="text-rose-400 bg-rose-950/60 px-1 rounded border border-rose-500/40" title="Tuần Không (Không Vong)">
                            Không
                          </span>
                        )}
                        {palace.isDichMa && (
                          <span className="text-amber-400 bg-amber-950/60 px-1 rounded border border-amber-500/40" title="Dịch Mã Tinh">
                            Mã
                          </span>
                        )}
                        {palace.isLocVi && (
                          <span className="text-emerald-400 bg-emerald-950/60 px-1 rounded border border-emerald-500/40" title="Lộc Vị Nhật Can">
                            Lộc
                          </span>
                        )}
                        {(palace.isDuongQuy || palace.isAmQuy) && (
                          <span className="text-purple-300 bg-purple-950/60 px-1 rounded border border-purple-500/40" title="Quý Nhân">
                            Quý
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            💡 Nhấp vào từng ô Cung trong bảng để xem luận đoán chi tiết về Bát Thần, Cửu Tinh, Bát Môn và Cách Cục tương ứng.
          </div>
        </div>

        {/* Selected Palace Detailed Analysis Explorer (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header of selected palace */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 font-mono text-base shadow-inner">
                  {selectedPalace?.palaceNum}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>
                      {selectedPalace?.guaName} Cung {selectedPalace?.palaceName}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getElementBadgeColor(selectedPalace?.element || '')}`}>
                      Hành {selectedPalace?.element}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">Phương {selectedPalace?.direction}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
                {selectedPalace?.isTuanKhong && (
                  <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-semibold">
                    Tuần Không
                  </span>
                )}
                {selectedPalace?.isDichMa && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-semibold">
                    Dịch Mã
                  </span>
                )}
                {selectedPalace?.isLocVi && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold">
                    Lộc Vị
                  </span>
                )}
              </div>
            </div>

            {/* 4 Layers Summary Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">1. Thần Bàn:</span>
                <span className={`font-bold text-xs block mt-0.5 truncate ${getGodColor(selectedPalace?.god || '')}`}>
                  {selectedPalace?.god || 'Trung Cung (Không)'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">2. Cửu Tinh:</span>
                <span className="font-bold text-xs text-amber-300 block mt-0.5 truncate">
                  {selectedPalace?.heavenStar}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">3. Bát Môn:</span>
                <span className={`font-bold text-xs block mt-0.5 truncate ${getDoorColor(selectedPalace?.door || '')}`}>
                  {selectedPalace?.door || 'Trung Cung'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">4. Thiên/Địa Can:</span>
                <span className="font-bold text-xs text-white font-mono block mt-0.5 truncate">
                  {selectedPalace?.heavenStem} (T) / {selectedPalace?.earthStem} (Đ)
                </span>
              </div>
            </div>

            {/* Navigation Tabs inside Palace Inspector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] overflow-x-auto no-scrollbar">
              <button
                id="tab-can-khac-ung"
                onClick={() => setPalaceDetailTab('canKhacUng')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap transition-all ${
                  palaceDetailTab === 'canKhacUng'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scroll className="w-3 h-3" />
                <span>Can Khắc Ứng</span>
              </button>

              <button
                id="tab-bat-mon"
                onClick={() => setPalaceDetailTab('batMon')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap transition-all ${
                  palaceDetailTab === 'batMon'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <DoorOpen className="w-3 h-3" />
                <span>Bát Môn & Cung</span>
              </button>

              <button
                id="tab-tinh-than"
                onClick={() => setPalaceDetailTab('tinhThan')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap transition-all ${
                  palaceDetailTab === 'tinhThan'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Tinh & Thần</span>
              </button>

              <button
                id="tab-special"
                onClick={() => setPalaceDetailTab('special')}
                className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap transition-all ${
                  palaceDetailTab === 'special'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Cách Cục ({selectedPalace?.formations.length || 0})</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="min-h-[220px]">
              {/* TAB 1: THẬP CAN KHẮC ỨNG */}
              {palaceDetailTab === 'canKhacUng' && (
                <div className="space-y-3 animate-fadeIn">
                  {selectedPalace?.stemComboDetail ? (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {selectedPalace.heavenStem} (Thiên) + {selectedPalace.earthStem} (Địa)
                          </span>
                          <span className="font-bold text-sm text-amber-300">
                            {selectedPalace.stemComboDetail.name}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                            selectedPalace.stemComboDetail.nature.includes('Cát')
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              : selectedPalace.stemComboDetail.nature.includes('Hung')
                              ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {selectedPalace.stemComboDetail.nature}
                        </span>
                      </div>

                      {/* Khẩu Quyết Thơ Cổ */}
                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 italic font-serif">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] not-italic mb-1 font-sans">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Khẩu Quyết Bí Kíp Toàn Thư:</span>
                        </div>
                        "{selectedPalace.stemComboDetail.poem}"
                      </div>

                      {/* Ý nghĩa tổng quan */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                        <span className="text-slate-400 font-bold block mb-1">Ý Nghĩa Toàn Diện:</span>
                        <p className="leading-relaxed">{selectedPalace.stemComboDetail.meaning}</p>
                      </div>

                      {/* 4 Cards: Career, Wealth, Travel, Health */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                          <span className="text-cyan-400 font-semibold flex items-center gap-1 mb-0.5">
                            <Briefcase className="w-3 h-3" /> Công Danh
                          </span>
                          <p className="text-slate-300 line-clamp-2">{selectedPalace.stemComboDetail.career}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                          <span className="text-amber-400 font-semibold flex items-center gap-1 mb-0.5">
                            <Coins className="w-3 h-3" /> Tài Vận
                          </span>
                          <p className="text-slate-300 line-clamp-2">{selectedPalace.stemComboDetail.wealth}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                          <span className="text-emerald-400 font-semibold flex items-center gap-1 mb-0.5">
                            <Plane className="w-3 h-3" /> Xuất Hành
                          </span>
                          <p className="text-slate-300 line-clamp-2">{selectedPalace.stemComboDetail.travel}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                          <span className="text-rose-400 font-semibold flex items-center gap-1 mb-0.5">
                            <HeartPulse className="w-3 h-3" /> Bệnh Tật
                          </span>
                          <p className="text-slate-300 line-clamp-2">{selectedPalace.stemComboDetail.health}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 text-slate-400 text-xs text-center">
                      Cung trung hòa hoặc Can phối hợp bình ổn.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: BÁT MÔN & CUNG KHẮC ỨNG */}
              {palaceDetailTab === 'batMon' && (
                <div className="space-y-3 animate-fadeIn text-xs">
                  {selectedPalace?.doorPalaceDetail ? (
                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-slate-400 text-[10px]">Cửa & Cung Lâm Bàn:</span>
                          <h5 className="font-bold text-sm text-white">
                            {selectedPalace.door} lâm {selectedPalace.palaceName} ({selectedPalace.element})
                          </h5>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {selectedPalace.doorPalaceDetail.relation}
                        </span>
                      </div>

                      {/* Tượng Tĩnh */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-cyan-400 font-bold block mb-1 flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Tượng Tĩnh (Nội bộ, mưu kín, dưỡng sinh):
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedPalace.doorPalaceDetail.staticSign}
                        </p>
                      </div>

                      {/* Tượng Động */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-bold block mb-1 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Tượng Động (Khởi sự, xuất quân, công phá):
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedPalace.doorPalaceDetail.dynamicSign}
                        </p>
                      </div>

                      {/* Lời Bàn Cổ Thư */}
                      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 italic">
                        <span className="text-amber-400 font-bold not-italic block mb-0.5">
                          Bí Kíp Toàn Thư Bình Luận:
                        </span>
                        "{selectedPalace.doorPalaceDetail.description}"
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950 text-slate-400 text-xs text-center">
                      Cửa tại vị trí trung cung hoặc không có biến hóa môn cung khắc hại.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: TINH & THẦN */}
              {palaceDetailTab === 'tinhThan' && (
                <div className="space-y-3 animate-fadeIn text-xs">
                  {/* Cửu Tinh */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        Sao {selectedPalace?.heavenStar}
                      </span>
                      {selectedPalace?.starProfile && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          Hành {selectedPalace.starProfile.element} • {selectedPalace.starProfile.nature}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedPalace?.starProfile?.baseSign || 'Chủ các biến động về thiên thời và cơ hội bên ngoài.'}
                    </p>
                  </div>

                  {/* Bát Thần */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-cyan-300 font-bold flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        Thần {selectedPalace?.god || 'Trung Cung'}
                      </span>
                      {selectedPalace?.godProfile && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                          Hành {selectedPalace.godProfile.element}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      {selectedPalace?.godProfile ? (
                        <>
                          <p><strong className="text-white">Ý Nghĩa Hộ Trì:</strong> {selectedPalace.godProfile.significance}</p>
                          <p><strong className="text-white">Việc Quân & Binh Pháp:</strong> {selectedPalace.godProfile.military}</p>
                          <p><strong className="text-white">Dự Trắc Đời Thường:</strong> {selectedPalace.godProfile.divination}</p>
                        </>
                      ) : (
                        <p>Thần Bàn hộ trì, bảo vệ phương vị.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CÁCH CỤC & TRẬN THẾ ĐẶC BIỆT */}
              {palaceDetailTab === 'special' && (
                <div className="space-y-2.5 animate-fadeIn text-xs">
                  {/* Special Badges Alert */}
                  {selectedPalace?.kichHinh && (
                    <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-200">
                      <div className="font-bold flex items-center gap-1 text-rose-300">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Lục Nghi Kích Hình</span>
                      </div>
                      <p className="mt-0.5 text-[11px]">{selectedPalace.kichHinh}</p>
                    </div>
                  )}

                  {selectedPalace?.nhapMo && (
                    <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/50 text-purple-200">
                      <div className="font-bold flex items-center gap-1 text-purple-300">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Tam Kỳ Nhập Mộ</span>
                      </div>
                      <p className="mt-0.5 text-[11px]">{selectedPalace.nhapMo}</p>
                    </div>
                  )}

                  {selectedPalace?.thangDien && (
                    <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-200">
                      <div className="font-bold flex items-center gap-1 text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>Tam Kỳ Thăng Điện</span>
                      </div>
                      <p className="mt-0.5 text-[11px]">{selectedPalace.thangDien}</p>
                    </div>
                  )}

                  {selectedPalace?.baThang && (
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-200">
                      <div className="font-bold flex items-center gap-1 text-emerald-300">
                        <Crown className="w-3.5 h-3.5 shrink-0" />
                        <span>Cung Ba Thắng Binh Pháp</span>
                      </div>
                      <p className="mt-0.5 text-[11px]">{selectedPalace.baThang}</p>
                    </div>
                  )}

                  {selectedPalace?.batKhaKich && (
                    <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/50 text-cyan-200">
                      <div className="font-bold flex items-center gap-1 text-cyan-300">
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span>Năm Cung Bất Khả Kích</span>
                      </div>
                      <p className="mt-0.5 text-[11px]">{selectedPalace.batKhaKich}</p>
                    </div>
                  )}

                  {/* Formations list in this palace */}
                  <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pt-1">
                    {selectedPalace?.formations && selectedPalace.formations.length > 0 ? (
                      selectedPalace.formations.map((f, idx) => {
                        const isGood = f.includes('Cát') || f.includes('★') || f.includes('Thắng') || f.includes('Toại');
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg text-xs border ${
                              isGood
                                ? 'bg-emerald-950/40 text-emerald-200 border-emerald-500/30'
                                : 'bg-rose-950/40 text-rose-200 border-rose-500/30'
                            }`}
                          >
                            <div className="font-semibold flex items-center gap-1">
                              {isGood ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              )}
                              <span>{f}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-950 text-slate-400 text-xs text-center">
                        Không phạm đại cách hung, các sao môn bình hòa.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Palace Summary Footer */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Toạ phương: {selectedPalace?.direction}</span>
            <span className="font-mono text-amber-400">Trực Phù: Cung {chart.trucPhuNewPalace}</span>
          </div>
        </div>
      </div>

      {/* DEDICATED PROGNOSTICATION SECTION (DỰ TRẮC BÀN KỲ MÔN ĐƯỢC LẬP) */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/40 p-5 sm:p-7 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Dự Trắc Bàn Kỳ Môn Được Lập (Kỳ Môn Toàn Thư)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {chart.cucName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Toàn bộ phương pháp chiêm nghiệm cát hung: <strong>Tam Bàn (Thiên - Nhân - Địa)</strong>, <strong>Chủ - Khách</strong>, <strong>Thân Mệnh (Sang Hèn)</strong> và <strong>6 Phương Diện Đời Sống Cụ Thể</strong>.
              </p>
            </div>
          </div>

          {onOpenPrognostication && (
            <button
              id="btn-goto-prognostication-page"
              onClick={onOpenPrognostication}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 shrink-0 cursor-pointer group"
            >
              <span>Xem Trang Dự Trắc Chi Tiết</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* 8 Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          {/* 1. Tam Bàn & Chủ Khách */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>Tam Bàn & Chủ Khách</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • <strong>Thiên thời:</strong> Sao khắc Môn cát, Môn khắc Sao hung.
              <br />
              • <strong>Nhân sự:</strong> Môn khắc Cung cát, Cung khắc Môn hung.
              <br />
              • <strong>Chủ Khách:</strong> Khách sinh Chủ ít hao tổn đại lợi.
            </p>
          </div>

          {/* 2. Thân Mệnh Sang Hèn */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <User className="w-4 h-4" />
              <span>Thân Mệnh (Lục Thân)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • Niên can (Cha Mẹ), Nguyệt (Anh Em), Nhật (Bản Thân), Thời (Con Nhỏ).
              <br />
              • Đắc Tam Kỳ vượng tướng phú quý; vào Tử Tù Mộ Tuyệt bần hàn.
            </p>
          </div>

          {/* 3. Hôn Nhân & Vợ Chồng */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Heart className="w-4 h-4" />
              <span>1. Hôn Nhân & Vợ Chồng</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • <strong>Chồng (Canh)</strong> vs <strong>Vợ (Ất)</strong>, Lục Hợp làm mối.
              <br />
              • Cung Ất và Canh tương sinh tương hợp thì hạnh phúc trăm năm.
            </p>
          </div>

          {/* 4. Y Học & Trị Bệnh */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <HeartPulse className="w-4 h-4" />
              <span>2. Y Học & Trị Bệnh</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • <strong>Thiên Nhuế (Bệnh):</strong> Chỉ tạng phủ & chứng bệnh 8 cung.
              <br />
              • <strong>Thiên Tâm / Kỳ Ất:</strong> Lương y khắc chế Thần Bệnh thì khỏi.
            </p>
          </div>

          {/* 5. Cầu Tài & Giao Dịch */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Coins className="w-4 h-4" />
              <span>3. Cầu Tài & Buôn Bán</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • <strong>Giáp Tý Mậu</strong> là vốn, <strong>Sinh Môn</strong> là lợi tức.
              <br />
              • Sinh Môn sinh Mậu buôn bán đại lợi; Mậu sinh Sinh Môn phải bù vốn.
            </p>
          </div>

          {/* 6. Thi Cử & Công Danh */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>4. Thi Cử & Công Danh</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • Nhật can (Sĩ tử), Trực Phù (Chủ khảo), Kỳ Đinh (Bài thi văn chương).
              <br />
              • Khai Môn thăng quan văn, Đỗ Môn thăng quan võ.
            </p>
          </div>

          {/* 7. Tìm Người & Mất Vật */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Search className="w-4 h-4" />
              <span>5. Mất Vật & Kẻ Trộm</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • Can giờ chỉ nơi rơi mất và giống loài đồ vật trong 8 cung.
              <br />
              • Sao <strong>Thiên Bồng</strong> chủ kẻ trộm; Phản Ngâm nhanh tìm lại.
            </p>
          </div>

          {/* 8. Kiện Tụng & Tranh Chấp */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <Scale className="w-4 h-4" />
              <span>6. Kiện Tụng & Tranh Chấp</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              • Nhật can (Nguyên cáo), Thời can (Bị cáo), Trực Phù (Quan tòa).
              <br />
              • <strong>Kinh Môn & Cảnh Môn</strong> chỉ văn thư đơn kiện được chuẩn phê.
            </p>
          </div>
        </div>

        {/* Action Bar at bottom */}
        {onOpenPrognostication && (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Nhấn vào nút bên dưới để mở toàn bộ trang luận giải dự trắc chuyên sâu theo đúng quẻ hiện tại:</span>
            </div>
            <button
              onClick={onOpenPrognostication}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Xem Toàn Bộ Nội Dung Trang Dự Trắc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 6 Steps Detailed Breakdown & Classical Manuals from Bí Kíp Toàn Thư */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Quy Trình 6 Bước Lập Bàn Kỳ Môn Chi Tiết (Theo Bí Kíp Toàn Thư)
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Phương pháp lập bàn thời bàn Kỳ Môn chuyển bàn (Phi Bàn / Chuyển Bàn Lạc Thư) chuẩn xác
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/30 font-medium">
            <span>Quẻ Đang Lập:</span>
            <span className="font-bold text-white">{chart.cucName}</span>
            <span>•</span>
            <span className="font-mono">{chart.hourCanChi}</span>
          </div>
        </div>

        {/* Step-by-step detailed Cards */}
        <div className="space-y-4">
          {/* BƯỚC 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  1
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-300">
                  BƯỚC 1: AN ĐỊA BÀN KỲ NGHI (Tam Kỳ & Lục Nghi Địa Bàn)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {chart.isDuongDon ? 'Dương Độn: Đi Thuận' : 'Âm Độn: Đi Nghịch'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Cơ sở lý pháp:</strong> Địa bàn 9 cung là cố định theo đồ hình Lạc Thư: <em>Khảm 1, Khôn 2, Chấn 3, Tốn 4, Trung 5, Càn 6, Đoài 7, Cấn 8, Ly 9</em>. Đất chủ Tĩnh, 5 ngày (1 nguyên) mới đổi một lần.
                </p>
                <p>
                  <strong className="text-white">Quy luật phân bổ:</strong> Lấy số Cục làm cung khởi đầu để đặt <strong>Lục Mậu (Giáp Tý)</strong>. Sau đó phân bổ theo chuỗi Lục Nghi & Tam Kỳ bất biến:
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-center text-amber-200 text-xs">
                  Mậu → Kỷ → Canh → Tân → Nhâm → Quý → Đinh → Bính → Ất
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li><strong className="text-slate-200">Dương Độn:</strong> Nghi đi thuận, Kỳ đi nghịch (chạy thuận theo thứ tự số cung 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9).</li>
                  <li><strong className="text-slate-200">Âm Độn:</strong> Nghi đi nghịch, Kỳ đi thuận (chạy nghịch theo thứ tự số cung 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2 → 1).</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Kết quả phân bổ Địa bàn quẻ hiện tại ({chart.cucName}):
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((pNum) => (
                    <div key={pNum} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cung {pNum}</div>
                      <div className="font-bold text-amber-300 text-sm">
                        {chart.palaces[pNum].earthStem}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  * Mậu khởi tại Cung {chart.cucNumber}, lần lượt bay qua 9 cung theo chiều {chart.isDuongDon ? 'thuận' : 'nghịch'}.
                </p>
              </div>
            </div>
          </div>

          {/* BƯỚC 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  2
                </span>
                <span className="text-sm sm:text-base font-bold text-cyan-300">
                  BƯỚC 2: XÁC ĐỊNH TUẦN THỦ, TÌM SAO TRỰC PHÙ & CỬA TRỰC SỬ GỐC
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">
                Tuần: {chart.tuanThuGiap} ({chart.tuanThuCan})
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Bản chất Độn Giáp:</strong> Mười can trời dùng 9 (Lục Nghi, Tam Kỳ), riêng nguyên soái <strong>Giáp</strong> quý tối cao nên luôn ẩn giấu (độn) dưới 6 Nghi gọi là <strong>Lục Giáp Tuần Thủ</strong>:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[11px] text-center">
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Tý ẩn Mậu</span>
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Tuất ẩn Kỷ</span>
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Thân ẩn Canh</span>
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Ngọ ẩn Tân</span>
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Thìn ẩn Nhâm</span>
                  <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200">Giáp Dần ẩn Quý</span>
                </div>
                <p>
                  <strong className="text-white">Quy tắc tìm Phù - Sử:</strong> Tìm xem Can đại diện Tuần thủ (<em>{chart.tuanThuCan}</em>) đang ở Cung Địa Bàn nào:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li>Sao bản cung của cung đó chính là <strong className="text-cyan-300">Sao Trực Phù</strong>.</li>
                  <li>Cửa bản cung của cung đó chính là <strong className="text-emerald-300">Cửa Trực Sử</strong>.</li>
                  <li><em>Ngoại lệ:</em> Nếu rơi vào Trung cung 5 (Thiên Cầm) $\rightarrow$ ký gửi sang cung Khôn 2 (Sao Thiên Cầm/Nhuế, Cửa Tử Môn).</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Tra cứu cụ thể cho giờ {chart.hourCanChi}:
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Giờ dự trắc:</span>
                    <span className="font-bold text-white font-mono">{chart.hourCanChi}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Thuộc Tuần Thủ:</span>
                    <span className="font-bold text-cyan-300 font-mono">{chart.tuanThuGiap} (Độn Can {chart.tuanThuCan})</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Can {chart.tuanThuCan} ở Địa Bàn:</span>
                    <span className="font-bold text-amber-300 font-mono">Cung {chart.trucPhuPalace} ({chart.palaces[chart.trucPhuPalace].palaceName})</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Sao Trực Phù gốc:</span>
                    <span className="font-bold text-cyan-300 font-mono">{chart.trucPhuStar} (Cung {chart.trucPhuPalace})</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Cửa Trực Sử gốc:</span>
                    <span className="font-bold text-emerald-300 font-mono">{chart.trucSuDoor} (Cung {chart.trucSuPalace})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BƯỚC 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  3
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-300">
                  BƯỚC 3: AN THIÊN BÀN CỬU TINH (Chuyển Dịch Sao Trực Phù)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                {chart.trucPhuStar} → Cung {chart.trucPhuNewPalace}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Quy luật:</strong> <em>"Trực Phù thường di gia thời can"</em> (Sao Trực Phù luôn bay đến ngự trên cung Địa bàn chứa Can của Giờ).
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
                  <li>Xác định Can của giờ ({chart.hourCanChi.split(' ')[0]}) đang ở cung Địa bàn nào (nếu giờ là Giáp thì lấy Can của Tuần thủ).</li>
                  <li>Bốc sao <strong className="text-cyan-300">{chart.trucPhuStar}</strong> đặt vào cung Địa bàn chứa Can giờ đó (Cung {chart.trucPhuNewPalace}).</li>
                  <li>Bố trí 8 sao còn lại xoay vòng thuận chiều kim đồng hồ quanh 8 cung chu vi Lạc Thư theo đúng thứ tự gốc: <em>Bồng (1) → Nhậm (8) → Xung (3) → Phụ (4) → Anh (9) → Nhuế/Cầm (2) → Trụ (7) → Tâm (6)</em>.</li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Vị trí Cửu Tinh trên Thiên Bàn:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  {PALACE_RING_CW.map((pNum) => (
                    <div key={pNum} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cung {pNum} ({chart.palaces[pNum].palaceName})</div>
                      <div className="font-bold text-amber-300 text-xs">
                        {chart.palaces[pNum].heavenStar}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BƯỚC 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-purple-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  4
                </span>
                <span className="text-sm sm:text-base font-bold text-purple-300">
                  BƯỚC 4: AN CAN THIÊN BÀN (Kỳ Nghi Bay Theo Cửu Tinh)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 font-mono">
                Can Gốc Tinh → Thiên Bàn
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Quy luật:</strong> Các Can Kỳ Nghi Địa bàn ở cung gốc của mỗi Sao sẽ được <em>"mang theo"</em> cùng ngôi sao đó khi bay lên Thiên bàn tại vị trí mới.
                </p>
                <p>
                  <strong className="text-white">Ký gửi Trung Cung 5:</strong> Sao Thiên Cầm ở Trung cung 5 gửi ở Khôn 2 cùng sao Thiên Nhuế. Do đó, cung nào đón nhận sao Thiên Nhuế/Thiên Cầm sẽ mang cả Can gốc cung 2 và Can gốc cung 5 (như <em>{chart.palaces[chart.trucPhuNewPalace].heavenStem2 ? 'Ất/Mậu...' : 'Can Kép'}</em>).
                </p>
                <p className="text-slate-400">
                  Can Thiên bàn chồng lên Can Địa bàn tại mỗi cung tạo thành các thế <strong>10 Can Tương Khắc Ứng</strong> nổi tiếng trong binh thư.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                  Cặp Can Thiên / Can Địa tại 9 Cung:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((pNum) => (
                    <div key={pNum} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cung {pNum}</div>
                      <div className="font-bold text-white text-xs">
                        <span className="text-amber-300">{chart.palaces[pNum].heavenStem}</span>
                        {chart.palaces[pNum].heavenStem2 && <span className="text-purple-300">/{chart.palaces[pNum].heavenStem2}</span>}
                        <span className="text-slate-500"> trên </span>
                        <span className="text-emerald-300">{chart.palaces[pNum].earthStem}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BƯỚC 5 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-rose-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-rose-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  5
                </span>
                <span className="text-sm sm:text-base font-bold text-rose-300">
                  BƯỚC 5: AN BÁT MÔN NHÂN BÀN (Chuyển Dịch Cửa Trực Sử)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-mono">
                {chart.trucSuDoor} → Cung {chart.trucSuNewPalace}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Quy luật:</strong> <em>"Trực Sử thuận nghịch Độn trung khứ"</em> (Trực Sử di chuyển từng cung theo Địa Chi của giờ, bắt đầu từ Chi gốc của Tuần thủ).
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
                  <li>Khởi Chi của Tuần thủ (<em>{chart.tuanThuGiap.split(' ')[1]}</em>) tại cung gốc Trực Sử (Cung {chart.trucSuPalace}).</li>
                  <li>Đếm theo Địa chi (Tý, Sửu, Dần, Mão...) tới Chi giờ ({chart.hourCanChi.split(' ')[1]}):
                    <span className="block pl-4 text-slate-300">
                      • {chart.isDuongDon ? 'Dương Độn: Đếm tiến theo số cung 1→2→3→4→5→6→7→8→9.' : 'Âm Độn: Đếm lùi theo số cung 9→8→7→6→5→4→3→2→1.'}
                    </span>
                    <span className="block pl-4 text-slate-400 italic">
                      • Nếu đếm đến Trung Cung 5: Dương Độn ký gửi Cấn 8 (hoặc Khôn 2), Âm Độn ký gửi Khôn 2.
                    </span>
                  </li>
                  <li>Cung dừng lại là nơi Cửa Trực Sử (<strong className="text-emerald-300">{chart.trucSuDoor}</strong>) đóng tại Cung <strong>{chart.trucSuNewPalace}</strong>.</li>
                  <li>Bố trí 7 cửa còn lại xoay vòng <strong>thuận chiều kim đồng hồ</strong> quanh 8 cung chu vi: <em>Hưu → Sinh → Thương → Đỗ → Cảnh → Tử → Kinh → Khai</em>.</li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                  Vị trí Bát Môn trên Nhân Bàn:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  {PALACE_RING_CW.map((pNum) => (
                    <div key={pNum} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cung {pNum} ({chart.palaces[pNum].palaceName})</div>
                      <div className={`font-bold text-xs ${getDoorColor(chart.palaces[pNum].door)}`}>
                        {chart.palaces[pNum].door}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BƯỚC 6 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-blue-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono shadow">
                  6
                </span>
                <span className="text-sm sm:text-base font-bold text-blue-300">
                  BƯỚC 6: AN BÁT THẦN (Thần Bàn / Bát Thần Trụ)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/40 font-mono">
                {chart.isDuongDon ? 'Dương Độn: Thần Xoay Thuận' : 'Âm Độn: Thần Xoay Nghịch'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">Quy luật Bát Thần:</strong> Bát Thần là tầng khí vi diệu chủ quản các điềm ứng thần cơ, gồm:
                </p>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-center text-cyan-200 text-xs">
                  Trực Phù → Đằng Xà → Thái Âm → Lục Hợp → Bạch Hổ (Câu Trận) → Huyền Vũ (Chu Tước) → Cửu Địa → Cửu Thiên
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li>Thần đứng đầu là <strong className="text-cyan-300">Trực Phù (Bát Thần)</strong> luôn được an tại cung của Sao Trực Phù trên Thiên Bàn (Cung <strong>{chart.trucPhuNewPalace}</strong>).</li>
                  <li><strong className="text-white">Dương Độn:</strong> 8 Thần phân bổ xoay <strong>thuận chiều kim đồng hồ</strong> quanh 8 cung chu vi.</li>
                  <li><strong className="text-white">Âm Độn:</strong> 8 Thần phân bổ xoay <strong>ngược chiều kim đồng hồ</strong> quanh 8 cung chu vi.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                  Vị trí Bát Thần trên Thần Bàn:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  {PALACE_RING_CW.map((pNum) => (
                    <div key={pNum} className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cung {pNum} ({chart.palaces[pNum].palaceName})</div>
                      <div className={`font-bold text-xs ${getGodColor(chart.palaces[pNum].god)}`}>
                        {chart.palaces[pNum].god}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
