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
} from 'lucide-react';
import { CAN, CHI } from '../astronomy/canChi';
import { buildCompleteKyMonChart, CompleteKyMonChart, PalaceData } from '../astronomy/kymonChart';
import { KyMonInfo, BatTuInfo } from '../types';

interface KyMonCompleteBoardProps {
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
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
          <div>
            {/* Header of selected palace */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 font-mono">
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

              <div className="flex items-center gap-1 font-mono text-xs">
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
              </div>
            </div>

            {/* 4 Layers Detailed Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-semibold">1. Thần Bàn:</span>
                <span className={`font-bold text-sm block mt-0.5 ${getGodColor(selectedPalace?.god || '')}`}>
                  {selectedPalace?.god || 'Trung Cung (Không Thần)'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-semibold">2. Cửu Tinh:</span>
                <span className="font-bold text-sm text-amber-300 block mt-0.5">
                  {selectedPalace?.heavenStar}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-semibold">3. Bát Môn:</span>
                <span className={`font-bold text-sm block mt-0.5 ${getDoorColor(selectedPalace?.door || '')}`}>
                  {selectedPalace?.door || 'Trung Cung'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-semibold">4. Thiên/Địa Can:</span>
                <span className="font-bold text-sm text-white font-mono block mt-0.5">
                  {selectedPalace?.heavenStem} (Thiên) / {selectedPalace?.earthStem} (Địa)
                </span>
              </div>
            </div>

            {/* Formations list in this palace */}
            <div className="mt-4 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Cách Cục & Khắc Ứng Tại Cung Này
              </span>

              {selectedPalace?.formations && selectedPalace.formations.length > 0 ? (
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                  {selectedPalace.formations.map((f, idx) => {
                    const isGood = f.includes('Cát') || f.includes('★') || f.includes('Thắng');
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
                          {isGood ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                          <span>{f}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950 text-slate-400 text-xs">
                  Không phạm đại cách hung, các sao môn bình hòa.
                </div>
              )}
            </div>

            {/* Military & Life Prognostication */}
            {selectedPalace?.battleSign && (
              <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
                <span className="text-cyan-400 font-bold block mb-1">Ứng Nghiệm Binh Thư & Dụng Sự:</span>
                <p>{selectedPalace.battleSign}</p>
              </div>
            )}
          </div>

          {/* Quick Palace Summary Footer */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Toạ phương: {selectedPalace?.direction}</span>
            <span className="font-mono text-amber-400">Trực Phù: Cung {chart.trucPhuNewPalace}</span>
          </div>
        </div>
      </div>

      {/* 6 Steps Explanation & Classical Manuals from Bí Kíp Toàn Thư */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Info className="w-5 h-5 text-amber-400" />
          <h4 className="text-base sm:text-lg font-bold text-white">
            Quy Trình 6 Bước Lập Bàn Kỳ Môn (Theo Bí Kíp Toàn Thư)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-400 text-sm">Bước 1: An Địa Bàn Kỳ Nghi</div>
            <p className="text-slate-300">
              Khởi Mậu tại cung <strong>{chart.cucNumber}</strong> ({chart.isDuongDon ? 'Dương Độn bay thuận' : 'Âm Độn bay nghịch'} 9 cung Lạc Thư). Chuỗi can: Mậu → Kỷ → Canh → Tân → Nhâm → Quý → Đinh → Bính → Ất.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-400 text-sm">Bước 2: Tìm Tuần Thủ & Phù Sử Gốc</div>
            <p className="text-slate-300">
              Giờ <strong>{chart.hourCanChi}</strong> thuộc tuần <strong>{chart.tuanThuGiap}</strong> (Can <strong>{chart.tuanThuCan}</strong>). Can này đóng ở Địa bàn cung <strong>{chart.trucPhuPalace}</strong> → Sao Trực Phù là <strong>{chart.trucPhuStar}</strong>, Cửa Trực Sử là <strong>{chart.trucSuDoor}</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400 text-sm">Bước 3: An Thiên Bàn Chín Sao</div>
            <p className="text-slate-300">
              Trực Phù bay theo Can Giờ ({chart.hourCanChi.split(' ')[0]}). Sao <strong>{chart.trucPhuStar}</strong> bay tới cung <strong>{chart.trucPhuNewPalace}</strong>. 8 sao còn lại xoay vòng thuận chu vi 8 cung.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-purple-400 text-sm">Bước 4: An Can Thiên Bàn</div>
            <p className="text-slate-300">
              Các Can Địa bàn ở cung gốc đi theo các Sao lên Thiên bàn. Can Trung Cung (Cung 5) ký gửi cùng sao Thiên Cầm bay theo Thiên Nhuế.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-rose-400 text-sm">Bước 5: An Bát Môn (Nhân Bàn)</div>
            <p className="text-slate-300">
              Khởi từ cung gốc tuần thủ, đếm theo Địa chi giờ ({chart.isDuongDon ? 'Dương độn đếm tiến' : 'Âm độn đếm lùi'}) cửu cung. Cửa <strong>{chart.trucSuDoor}</strong> đến cung <strong>{chart.trucSuNewPalace}</strong>, 8 cửa xoay thuận vòng quanh 8 cung.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="font-bold text-blue-400 text-sm">Bước 6: An Bát Thần (Thần Bàn)</div>
            <p className="text-slate-300">
              Thần Trực Phù đóng tại cung của Sao Trực Phù ({chart.trucPhuNewPalace}). {chart.isDuongDon ? 'Dương độn: 8 Thần xoay thuận kim đồng hồ' : 'Âm độn: 8 Thần xoay ngược kim đồng hồ'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
