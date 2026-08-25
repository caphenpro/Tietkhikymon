import React, { useState } from 'react';
import { Compass, Info, CheckCircle2, Sparkles, Orbit } from 'lucide-react';
import { BAGUA_PALACES, TIET_KHI_CUNG_MAP, SOLAR_TERMS, KY_MON_JU_TABLE } from '../astronomy/solarTerms';
import { BaguaPalace, ComprehensiveResult } from '../types';

interface NinePalacesCompassProps {
  result: ComprehensiveResult;
}

// Trigram symbols for the 8 Trigrams
const TRIGRAM_SYMBOLS: Record<number, string> = {
  1: '☵', // Khảm (Water)
  2: '☷', // Khôn (Earth)
  3: '☳', // Chấn (Thunder)
  4: '☴', // Tốn (Wind)
  5: '☯', // Trung Cung (Taiji)
  6: '☰', // Kiền (Heaven)
  7: '☱', // Đoài (Lake)
  8: '☶', // Cấn (Mountain)
  9: '☲', // Ly (Fire)
};

export const NinePalacesCompass: React.FC<NinePalacesCompassProps> = ({ result }) => {
  const [selectedPalaceNum, setSelectedPalaceNum] = useState<number>(result.kyMon.cungNumber || 1);

  // Traditional 3x3 Luoshu Layout (South on top, North on bottom):
  // Row 1: Tốn 4 (SE), Ly 9 (S), Khôn 2 (SW)
  // Row 2: Chấn 3 (E), Trung 5 (Center), Đoài 7 (W)
  // Row 3: Cấn 8 (NE), Khảm 1 (N), Kiền 6 (NW)
  const gridOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const currentTermName = result.currentTerm.name;
  const activePalaceNumber = result.kyMon.cungNumber;

  const selectedPalace = BAGUA_PALACES.find((p) => p.number === selectedPalaceNum) || BAGUA_PALACES[0];

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Bản Đồ Bát Quái 9 Cung & 24 Tiết Khí
            </h2>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Lạc Thư Cửu Cung
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Phân bổ 24 Tiết khí vào 8 hướng Hậu Thiên Bát Quái và bảng 18 Cục Kỳ Môn Độn Giáp
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 self-start md:self-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-400">Cung đương lệnh:</span>
          <span className="font-bold text-amber-300 font-mono">
            {result.kyMon.cungName} (Cung {result.kyMon.cungNumber})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 9-Palaces Visual Grid (8 columns on lg) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Cửu Cung Độn Giáp (Nam trên - Bắc dưới)
            </h3>
            <span className="text-[11px] text-slate-400">Nhấn vào từng cung để xem chi tiết</span>
          </div>

          {/* 3x3 Luoshu Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-lg mx-auto aspect-square">
            {gridOrder.map((palaceNum) => {
              const palace = BAGUA_PALACES.find((p) => p.number === palaceNum)!;
              const isSelected = selectedPalaceNum === palaceNum;
              const isCurrentActive = activePalaceNumber === palaceNum;
              const containsCurrentTerm = palace.terms.includes(currentTermName);

              return (
                <button
                  key={palaceNum}
                  id={`palace-cell-${palaceNum}`}
                  type="button"
                  onClick={() => setSelectedPalaceNum(palaceNum)}
                  className={`relative rounded-xl p-2.5 sm:p-3 flex flex-col justify-between text-left transition-all border ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500/50'
                      : isCurrentActive
                      ? 'border-purple-500/80 bg-purple-950/30'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  {/* Top Bar inside cell: Trigram & Palace Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-serif text-slate-400 select-none">
                      {TRIGRAM_SYMBOLS[palaceNum]}
                    </span>
                    <div className="flex items-center gap-1">
                      {isCurrentActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {palaceNum}
                      </span>
                    </div>
                  </div>

                  {/* Name & Direction */}
                  <div className="my-1">
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      Cung {palace.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{palace.direction}</div>
                  </div>

                  {/* Terms indicator */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {palace.terms.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] px-1 py-0.2 rounded truncate ${
                          t === currentTermName
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500/80 inline-block" />
              Cung Dùng Cục Hiện Tại
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400 text-slate-950 inline-block text-[9px] font-bold text-center leading-3">
                ★
              </span>
              Tiết Khí Thiên Văn Đang Chạy
            </span>
          </div>
        </div>

        {/* Palace Detail Inspector (5 columns on lg) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl font-serif text-amber-400">
                  {TRIGRAM_SYMBOLS[selectedPalace.number]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Cung {selectedPalace.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedPalace.hskName}</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg">
                Cung số {selectedPalace.number}
              </span>
            </div>

            {/* Attributes list */}
            <div className="space-y-3 my-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Phương vị:</span>
                <span className="font-semibold text-slate-200">{selectedPalace.direction}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Ngũ hành:</span>
                <span className="font-semibold text-emerald-400">{selectedPalace.element}</span>
              </div>

              <div className="py-2">
                <div className="text-slate-400 mb-1.5 font-medium">3 Tiết Khí quản lý:</div>
                <div className="grid grid-cols-3 gap-2">
                  {selectedPalace.terms.map((term, i) => {
                    const isCurrent = term === currentTermName;
                    const juData = KY_MON_JU_TABLE[term];
                    const donStr = juData ? (juData[0] ? 'Dương' : 'Âm') : '-';
                    const juList = juData ? juData[1].join(', ') : '-';

                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-center ${
                          isCurrent
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="text-xs font-semibold">{term}</div>
                        {juData && (
                          <div className="text-[10px] text-slate-400 mt-1">
                            {donStr} Cục ({juList})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">Quy tắc Độn: </span>
            {selectedPalace.number === 1 || selectedPalace.number === 8 || selectedPalace.number === 3 || selectedPalace.number === 4
              ? 'Nửa năm Dương Độn (từ Đông Chí đến Mang Chủng, khí thuận tiến)'
              : selectedPalace.number === 9 || selectedPalace.number === 2 || selectedPalace.number === 7 || selectedPalace.number === 6
              ? 'Nửa năm Âm Độn (từ Hạ Chí đến Đại Tuyết, khí nghịch thoái)'
              : 'Trung Cung phân chia ký cung theo Dương / Âm Độn'}
          </div>
        </div>
      </div>
    </div>
  );
};
