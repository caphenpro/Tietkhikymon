import React, { useState } from 'react';
import {
  Compass,
  Info,
  CheckCircle2,
  Sparkles,
  Orbit,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  BookOpen,
  Globe,
  Grid,
  Sun,
  Moon,
  Zap,
  HelpCircle,
  Shield,
  Heart,
  Coins,
  Scale,
} from 'lucide-react';
import { BAGUA_PALACES, TIET_KHI_CUNG_MAP, SOLAR_TERMS, KY_MON_JU_TABLE } from '../astronomy/solarTerms';
import { BaguaPalace, ComprehensiveResult } from '../types';

interface NinePalacesCompassProps {
  result: ComprehensiveResult;
  onNavigateTab?: (tabId: string) => void;
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

export const NinePalacesCompass: React.FC<NinePalacesCompassProps> = ({ result, onNavigateTab }) => {
  const [selectedPalaceNum, setSelectedPalaceNum] = useState<number>(result.kyMon.cungNumber || 1);
  const [activeGuideTab, setActiveGuideTab] = useState<
    'overview' | 'battrach' | 'cuutinh' | 'tietkhi' | 'diemsoc' | 'ungdung'
  >('overview');

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
            Phân bổ 24 Tiết khí vào 8 hướng Hậu Thiên Bát Quái và ma trận 18 Cục Kỳ Môn Độn Giáp
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

      {/* EDUCATIONAL KNOWLEDGE GUIDE DECK (FOR BEGINNERS & ADVANCED) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Cẩm Nang Tri Thức Vũ Trụ: Bát Trạch • Cửu Tinh • Tiết Khí • Điểm Sóc
              </h3>
              <p className="text-xs text-slate-400">
                Khám phá mối liên hệ mật thiết giữa Thời Gian (Thiên) - Không Gian (Địa) - Con Người (Nhân)
              </p>
            </div>
          </div>

          {/* Guide Sub-tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setActiveGuideTab('overview')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🌟 Mối Liên Hệ Tổng Thể
            </button>
            <button
              onClick={() => setActiveGuideTab('battrach')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'battrach'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🧭 Bát Trạch 8 Hướng
            </button>
            <button
              onClick={() => setActiveGuideTab('cuutinh')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'cuutinh'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🔢 Cửu Tinh Lạc Thư
            </button>
            <button
              onClick={() => setActiveGuideTab('tietkhi')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'tietkhi'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              ☀️ 24 Tiết Khí
            </button>
            <button
              onClick={() => setActiveGuideTab('diemsoc')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'diemsoc'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🌙 Điểm Sóc Âm Lịch
            </button>
            <button
              onClick={() => setActiveGuideTab('ungdung')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeGuideTab === 'ungdung'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🎯 Ứng Dụng Thực Tiễn
            </button>
          </div>
        </div>

        {/* Content of selected Guide Tab */}
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {activeGuideTab === 'overview' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
                <h4 className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  Mô Hình Hợp Nhất 4 Mảnh Ghép Vũ Trụ Học (Thiên - Địa - Nhân - Thời - Không)
                </h4>
                <p>
                  Hệ thống cổ học phương Đông không phải là những môn phái tách rời mà liên kết chặt chẽ theo cấu trúc <strong>Hệ Tọa Độ Vũ Trụ 4 Chiều</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-amber-300 block">1. Trục Thời Gian (Thiên Vận):</strong>
                    <p>• <strong>24 Tiết Khí:</strong> Đo lường vị trí Mặt Trời & sự tuần hoàn 4 mùa, quy định 12 Tiết lệnh của tháng Bát Tự và chu kỳ Âm/Dương Độn.</p>
                    <p>• <strong>Điểm Sóc Âm Lịch:</strong> Đo lường chu kỳ Mặt Trăng quanh Trái Đất (Sóc - Vọng), quy định Mùng 1 và nhịp điệu sinh học.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 block">2. Trục Không Gian (Địa Thế):</strong>
                    <p>• <strong>Bát Trạch (8 Phương):</strong> Phân chia 360° theo 8 quẻ Hậu Thiên, định dạng phương vị nạp khí lành/dữ cho nhà ở.</p>
                    <p>• <strong>Cửu Tinh Lạc Thư:</strong> Ma trận 9 ô cân bằng hoàn hảo (tổng = 15), là tấm lưới số học định vị năng lượng các vì sao.</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-slate-300 text-xs">
                  <strong className="text-purple-300">👉 Điểm Giao Hòa Kỳ Môn Độn Giáp:</strong> Bằng phương pháp <em>Siêu Thần Tiếp Khí</em>, Thời Gian được nạp vào Không Gian 9 Cung Lạc Thư, làm xoay chuyển 9 Sao (Thiên), 8 Cửa (Nhân), 9 Cung (Địa) và 8 Thần, tạo nên công cụ dự trắc và trạch cát chuẩn xác nhất.
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'battrach' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Ý Nghĩa Bát Trạch & 8 Phương Vị Nạp Khí Hậu Thiên Bát Quái
                </h4>
                <p className="text-xs">
                  <strong>Bát Trạch</strong> định vị 8 hướng không gian xung quanh con người, mỗi hướng mang trường khí ngũ hành và thuộc tính nhân sinh riêng:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-cyan-300 block">Bắc (Khảm - 1):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Thủy, trí tuệ, trầm tĩnh, con trai giữa.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400 block">Tây Nam (Khôn - 2):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Thổ, nuôi dưỡng, bao dung, Người Mẹ/Vợ.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400 block">Đông (Chấn - 3):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Mộc, sấm dậy, khởi phát mùa xuân, Trưởng nam.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-green-400 block">Đông Nam (Tốn - 4):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Mộc, gió mát, học vấn tài lộc, Trưởng nữ.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-slate-300 block">Tây Bắc (Càn - 6):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Kim, quyền lực lãnh đạo, Người Cha/Trụ cột.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-rose-300 block">Tây (Đoài - 7):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Kim, niềm vui, hùng biện, con gái út.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-yellow-300 block">Đông Bắc (Cấn - 8):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Thổ, núi tĩnh, tích lũy, con trai út.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-red-400 block">Nam (Ly - 9):</strong>
                    <span className="text-slate-400 text-[11px]">Hành Hỏa, ánh sáng văn minh, công danh, con gái giữa.</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1 italic">
                  * Ứng dụng: Giúp chọn hướng nhà, bố trí phòng làm việc, bàn thờ, bếp nạp khí lành (Sinh Khí, Thiên Y, Diên Niên) và tránh khí độc (Tuyệt Mệnh, Ngũ Quỷ).
                </p>
              </div>
            </div>
          )}

          {activeGuideTab === 'cuutinh' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-cyan-400" />
                  Ý Nghĩa Cửu Tinh Lạc Thư & Ma Trận Ma Phương Cân Bằng Năng Lượng
                </h4>
                <p className="text-xs">
                  <strong>Ma trận Lạc Thư 3x3</strong> có tổng các hàng ngang, cột dọc và đường chéo đều bằng <strong>15</strong>. Khẩu quyết: <em>"Đới cửu lý nhất, tả tam hữu thất, nhị tứ vi kiên, lục bát vi túc, ngũ cư trung cung"</em>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-cyan-300 block">1. Nhất Bạch Tham Lang (Thủy):</strong>
                    <span className="text-slate-400 text-[11px]">Tài vận, công danh đỗ đạt, đào hoa thanh nhã.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400 block">2. Nhị Hắc Cự Môn (Thổ):</strong>
                    <span className="text-slate-400 text-[11px]">Bệnh phù tinh, ốm đau nhưng chủ điền sản đất đai.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400 block">3. Tam Bích Lộc Tồn (Mộc):</strong>
                    <span className="text-slate-400 text-[11px]">Thị phi, khẩu thiệt, tính cạnh tranh quyết liệt.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-green-400 block">4. Tứ Lục Văn Khúc (Mộc):</strong>
                    <span className="text-slate-400 text-[11px]">Văn chương, thi cử, nghệ thuật sáng tạo, danh tiếng.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-yellow-300 block">5. Ngũ Hoàng Liêm Trinh (Thổ):</strong>
                    <span className="text-slate-400 text-[11px]">Đại sát tinh trung tâm, chủ chuyển biến lớn, tai họa.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-slate-300 block">6. Lục Bạch Vũ Khúc (Kim):</strong>
                    <span className="text-slate-400 text-[11px]">Quyền uy lãnh đạo, quan lộc, thiên tài bất ngờ.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-rose-300 block">7. Thất Xích Phá Quân (Kim):</strong>
                    <span className="text-slate-400 text-[11px]">Phá tài, tranh chấp, đạo tặc, phẫu thuật tổn thương.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-amber-300 block">8. Bát Bạch Tả Phụ (Thổ):</strong>
                    <span className="text-slate-400 text-[11px]">Đại cát tinh đương vận, chính tài dồi dào vững bền.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-red-400 block">9. Cửu Tử Hữu Bật (Hỏa):</strong>
                    <span className="text-slate-400 text-[11px]">Hỷ khánh, nhân duyên, thăng tiến, ánh sáng trí tuệ.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'tietkhi' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Ý Nghĩa 24 Tiết Khí (Dương Lịch Thiên Văn Theo Mặt Trời & 4 Mùa)
                </h4>
                <p className="text-xs">
                  <strong>24 Tiết Khí</strong> đo góc kinh độ Hoàng đạo Mặt Trời (mỗi cung 15° = 1 Tiết khí). 24 Tiết khí được chia thành:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-amber-300 block mb-1">12 Tiết (Tiết Lệnh) - Chuyển Tháng:</strong>
                    <p className="text-slate-300 text-[11px]">Lập Xuân, Kinh Trập, Thanh Minh, Lập Hạ, Mang Chủng, Tiểu Thử, Lập Thu, Bạch Lộ, Hàn Lộ, Lập Đông, Đại Tuyết, Tiểu Hàn. Bắt đầu thời điểm một tháng mới trong Bát Tự.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <strong className="text-cyan-300 block mb-1">12 Khí (Trung Khí) - Định Tháng Nhuận:</strong>
                    <p className="text-slate-300 text-[11px]">Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn. Dùng để định vị tháng âm lịch chính quy.</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  • <strong>Dương Độn (Khí thuận tiến):</strong> Từ Đông Chí đến Mang Chủng (Dương khí lớn dần).
                  <br />• <strong>Âm Độn (Khí nghịch thoái):</strong> Từ Hạ Chí đến Đại Tuyết (Âm khí sinh sôi).
                </p>
              </div>
            </div>
          )}

          {activeGuideTab === 'diemsoc' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-cyan-400" />
                  Ý Nghĩa Điểm Sóc (New Moon) & Âm Lịch Thiên Văn
                </h4>
                <p className="text-xs">
                  <strong>Điểm Sóc</strong> là thời điểm hiệu số kinh độ Mặt Trăng và Mặt Trời bằng 0°. Đây là mốc khoa học để quy định ngày Mùng 1 âm lịch:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                  <li><strong>Tháng Đủ (30 ngày) / Tháng Thiếu (29 ngày):</strong> Dựa vào khoảng cách thời gian chính xác giữa 2 Điểm Sóc liên tiếp.</li>
                  <li><strong>Quy luật Thủy Triều & Sinh Học:</strong> Mặt Trăng ảnh hưởng mạnh mẽ đến tuần hoàn chất lỏng trên Trái Đất và nhịp sinh học, cảm xúc con người.</li>
                  <li><strong>Tháng Nhuận:</strong> Khi một năm có 13 Điểm Sóc, tháng đầu tiên không chứa Trung Khí sẽ được chọn làm Tháng Nhuận để điều chỉnh chu kỳ Mặt Trăng ăn khớp hoàn hảo với 4 mùa Mặt Trời.</li>
                </ul>
              </div>
            </div>
          )}

          {activeGuideTab === 'ungdung' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                <h4 className="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Ý Nghĩa Ứng Dụng Thực Tiễn Trong Đời Sống Hàng Ngày
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" /> Dưỡng Sinh & Hành Động Thuận Mùa:
                    </strong>
                    <p className="text-slate-300 text-[11px]">Thuận theo 24 Tiết khí để ăn uống, sinh hoạt, tập luyện; tránh những ngày thời tiết giao chuyển đột ngột làm nhiễu loạn sinh khí.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-300 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" /> Khai Thông Phương Vị & Nhà Ở:
                    </strong>
                    <p className="text-slate-300 text-[11px]">Bố trí không gian sống theo Bát Trạch và kiểm soát các vị trí sao xấu (Nhị Hắc, Ngũ Hoàng) theo Cửu Tinh Lạc Thư.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-purple-300 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Kỳ Môn Trạch Cát Xuất Hành:
                    </strong>
                    <p className="text-slate-300 text-[11px]">Chọn giờ tốt và phương vị đắc Tam Cát Môn (Khai, Hưu, Sinh) để đàm phán, xuất hành, thi cử, ký kết giao dịch.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Dự Trắc Việc Đời & Định Hướng:
                    </strong>
                    <p className="text-slate-300 text-[11px]">Sử dụng 8 chuyên đề Dự Trắc Kỳ Môn để nhìn rõ thế cuộc, biết rõ khi nào nên tiến (làm Khách), khi nào nên thủ (làm Chủ).</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      {onNavigateTab && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              id="btn-compass-goto-guide"
              onClick={() => onNavigateTab('guide')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Xem Cẩm Nang Tri Thức</span>
            </button>

            <button
              id="btn-compass-back-overview"
              onClick={() => onNavigateTab('overview')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về Tổng Quát</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-compass-goto-table"
              onClick={() => onNavigateTab('table')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Bảng 24 Tiết Khí</span>
            </button>

            <button
              id="btn-compass-goto-chart"
              onClick={() => onNavigateTab('kymon-chart')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bàn Kỳ Môn 9 Cung</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-compass-goto-prognostication"
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

