import React, { useEffect } from 'react';
import {
  X,
  Scroll,
  DoorOpen,
  Shield,
  Sparkles,
  BookOpen,
  Briefcase,
  Coins,
  Plane,
  HeartPulse,
  Heart,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Swords,
  Crown,
} from 'lucide-react';
import { PalaceData, CompleteKyMonChart } from '../astronomy/kymonChart';

interface PalaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  palaceNum: number;
  onSelectPalace: (pNum: number) => void;
  chart: CompleteKyMonChart;
}

export const PalaceDetailModal: React.FC<PalaceDetailModalProps> = ({
  isOpen,
  onClose,
  palaceNum,
  onSelectPalace,
  chart,
}) => {
  const [activeTab, setActiveTab] = React.useState<'canKhacUng' | 'batMon' | 'tinhThan' | 'special'>('canKhacUng');

  const palace: PalaceData | undefined = chart.palaces[palaceNum];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !palace) return null;

  // Helper colors for Elements
  const getElementBadgeColor = (el: string) => {
    switch (el) {
      case 'Mộc':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50';
      case 'Hỏa':
        return 'bg-rose-950/90 text-rose-300 border-rose-500/50';
      case 'Thổ':
        return 'bg-amber-950/90 text-amber-300 border-amber-500/50';
      case 'Kim':
        return 'bg-slate-800 text-slate-200 border-slate-600';
      case 'Thủy':
        return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getDoorColor = (door: string) => {
    if (['Sinh Môn', 'Khai Môn', 'Hưu Môn'].includes(door)) {
      return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
    }
    if (['Cảnh Môn', 'Đỗ Môn'].includes(door)) {
      return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    }
    return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  };

  const getGodColor = (god: string) => {
    if (['Trực Phù', 'Cửu Thiên', 'Thái Âm', 'Lục Hợp'].includes(god)) {
      return 'text-cyan-300 bg-cyan-950/60 border-cyan-500/40';
    }
    if (['Cửu Địa'].includes(god)) {
      return 'text-amber-300 bg-amber-950/60 border-amber-500/40';
    }
    return 'text-rose-300 bg-rose-950/60 border-rose-500/40';
  };

  // 9 palaces navigation ordering
  const PALACES_LIST = [
    { num: 4, name: 'Tốn' },
    { num: 9, name: 'Ly' },
    { num: 2, name: 'Khôn' },
    { num: 3, name: 'Chấn' },
    { num: 5, name: 'Trung' },
    { num: 7, name: 'Đoài' },
    { num: 8, name: 'Cấn' },
    { num: 1, name: 'Khảm' },
    { num: 6, name: 'Càn' },
  ];

  const currentIndex = PALACES_LIST.findIndex((p) => p.num === palaceNum);
  const prevPalace = PALACES_LIST[(currentIndex - 1 + PALACES_LIST.length) % PALACES_LIST.length];
  const nextPalace = PALACES_LIST[(currentIndex + 1) % PALACES_LIST.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 font-mono text-xl shadow-inner shrink-0">
              {palace.palaceNum}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{palace.guaName}</span>
                  <span>Cung {palace.palaceName}</span>
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getElementBadgeColor(palace.element)}`}>
                  Hành {palace.element}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Phương {palace.direction}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Chi tiết 4 tầng năng lượng, Bát Thần, Cửu Tinh, Bát Môn, Thập Can Khắc Ứng và Cách Cục.
              </p>
            </div>
          </div>

          {/* Palace Selector Pills & Close Button */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Quick 9 Palaces Pills */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-[260px] sm:max-w-none no-scrollbar">
              {PALACES_LIST.map((p) => {
                const isSelected = p.num === palaceNum;
                return (
                  <button
                    key={p.num}
                    onClick={() => onSelectPalace(p.num)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title={`Chuyển sang Cung ${p.num} (${p.name})`}
                  >
                    {p.num}
                  </button>
                );
              })}
            </div>

            {/* Close Button */}
            <button
              id="btn-close-palace-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
              title="Đóng cửa sổ (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Active Shen Sha / Status Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Trạng thái tọa cung:</span>
            {palace.isTuanKhong && (
              <span className="px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/50 font-bold flex items-center gap-1">
                <span>🔴</span> Tuần Không (Không Vong)
              </span>
            )}
            {palace.isDichMa && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/50 font-bold flex items-center gap-1">
                <span>🐎</span> Dịch Mã Tinh (Chủ Biến Động)
              </span>
            )}
            {palace.isLocVi && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 font-bold flex items-center gap-1">
                <span>💰</span> Lộc Vị Nhật Can
              </span>
            )}
            {(palace.isDuongQuy || palace.isAmQuy) && (
              <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-500/50 font-bold flex items-center gap-1">
                <span>👑</span> Quý Nhân Tọa Trấn
              </span>
            )}
            {chart.trucPhuNewPalace === palace.palaceNum && (
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 font-bold flex items-center gap-1">
                <span>⚔️</span> Trực Phù Chi Cung
              </span>
            )}
            {chart.trucSuNewPalace === palace.palaceNum && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 font-bold flex items-center gap-1">
                <span>🚪</span> Trực Sử Chi Cung
              </span>
            )}
            {!palace.isTuanKhong && !palace.isDichMa && !palace.isLocVi && !palace.isDuongQuy && !palace.isAmQuy && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                Khí trường bình hòa
              </span>
            )}
          </div>

          {/* 4 Layers Matrix Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">1. Thần Bàn</span>
              <div className={`font-bold text-sm truncate ${getGodColor(palace.god || '')}`}>
                {palace.god || 'Trung Cung (Không Thần)'}
              </div>
              <span className="text-[10px] text-slate-500 block">Bát Thần Trụ Trấn</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">2. Cửu Tinh (Sao)</span>
              <div className="font-bold text-sm text-amber-300 truncate">
                {palace.heavenStar}
              </div>
              <span className="text-[10px] text-slate-500 block">Thiên Thời Vượng Tướng</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">3. Bát Môn (Cửa)</span>
              <div className={`font-bold text-sm truncate ${getDoorColor(palace.door || '')}`}>
                {palace.door || 'Trung Cung'}
              </div>
              <span className="text-[10px] text-slate-500 block">Nhân Sự Sinh Khắc</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">4. Thiên / Địa Can</span>
              <div className="font-bold text-sm text-white font-mono truncate">
                {palace.heavenStem}{palace.heavenStem2 ? `/${palace.heavenStem2}` : ''} (T) / {palace.earthStem}{palace.earthStem2 ? `/${palace.earthStem2}` : ''} (Đ)
              </div>
              <span className="text-[10px] text-slate-500 block">Thập Can Khắc Ứng</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs overflow-x-auto no-scrollbar">
            <button
              id="modal-tab-can-khac-ung"
              onClick={() => setActiveTab('canKhacUng')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'canKhacUng'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>1. Thập Can Khắc Ứng</span>
            </button>

            <button
              id="modal-tab-bat-mon"
              onClick={() => setActiveTab('batMon')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'batMon'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <DoorOpen className="w-3.5 h-3.5" />
              <span>2. Bát Môn & Cung Vị</span>
            </button>

            <button
              id="modal-tab-tinh-than"
              onClick={() => setActiveTab('tinhThan')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'tinhThan'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>3. Cửu Tinh & Bát Thần</span>
            </button>

            <button
              id="modal-tab-special"
              onClick={() => setActiveTab('special')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'special'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>4. Cách Cục & Thần Sát ({palace.formations.length})</span>
            </button>
          </div>

          {/* TAB 1: THẬP CAN KHẮC ỨNG */}
          {activeTab === 'canKhacUng' && (
            <div className="space-y-4 animate-fadeIn">
              {palace.stemComboDetail ? (
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">
                        Thiên Can <strong>{palace.heavenStem}</strong> + Địa Can <strong>{palace.earthStem}</strong>
                      </span>
                      <h4 className="font-black text-base sm:text-lg text-amber-300 mt-0.5">
                        {palace.stemComboDetail.name}
                      </h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-center ${
                        palace.stemComboDetail.nature.includes('Cát')
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : palace.stemComboDetail.nature.includes('Hung')
                          ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {palace.stemComboDetail.nature}
                    </span>
                  </div>

                  {/* Khẩu Quyết Thơ Cổ */}
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/95 italic font-serif">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs not-italic mb-1 font-sans">
                      <BookOpen className="w-4 h-4" />
                      <span>Khẩu Quyết Bí Kíp Cổ Bản:</span>
                    </div>
                    "{palace.stemComboDetail.poem}"
                  </div>

                  {/* Ý nghĩa toàn diện */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                    <span className="text-slate-400 font-bold block">Ý Nghĩa Toàn Diện:</span>
                    <p className="leading-relaxed">{palace.stemComboDetail.meaning}</p>
                  </div>

                  {/* 4 Cards: Career, Wealth, Travel, Health */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> Công Danh & Sự Nghiệp
                      </span>
                      <p className="text-slate-300 leading-relaxed">{palace.stemComboDetail.career}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Coins className="w-4 h-4" /> Tài Vận & Kinh Doanh
                      </span>
                      <p className="text-slate-300 leading-relaxed">{palace.stemComboDetail.wealth}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Plane className="w-4 h-4" /> Xuất Hành & Cầu Vận
                      </span>
                      <p className="text-slate-300 leading-relaxed">{palace.stemComboDetail.travel}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-rose-400 font-bold flex items-center gap-1.5">
                        <HeartPulse className="w-4 h-4" /> Sức Khỏe & Tật Bệnh
                      </span>
                      <p className="text-slate-300 leading-relaxed">{palace.stemComboDetail.health}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                  Trung Cung không có cặp Thiên/Địa can trực tiếp đối xung.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BÁT MÔN & CUNG VỊ */}
          {activeTab === 'batMon' && (
            <div className="space-y-4 animate-fadeIn">
              {palace.doorPalaceDetail ? (
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">
                        Cửa <strong>{palace.door}</strong> đè lên <strong>{palace.palaceName} Cung</strong> (Hành {palace.element})
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-emerald-300 mt-0.5">
                        {palace.doorPalaceDetail.relation}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getElementBadgeColor(palace.element)}`}>
                        Cung: {palace.element}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-slate-800 text-amber-300 border-slate-700">
                        {palace.doorPalaceDetail.status}
                      </span>
                    </div>
                  </div>

                  {/* Sinh khắc chi tiết */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold block">Phân Tích Tương Tác Cửa & Cung:</span>
                    <p className="text-slate-300 leading-relaxed">{palace.doorPalaceDetail.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-emerald-400 font-bold block">Tĩnh Ứng (Tại Nhà / Nội Vụ):</span>
                      <p className="text-slate-300 leading-relaxed">{palace.doorPalaceDetail.staticSign}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">Động Ứng (Xuất Hành / Giao Tế):</span>
                      <p className="text-slate-300 leading-relaxed">{palace.doorPalaceDetail.dynamicSign}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                  Trung Cung không an Bát Môn trực tiếp.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CỬU TINH & BÁT THẦN */}
          {activeTab === 'tinhThan' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Cửu Tinh */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Cửu Tinh: {palace.heavenStar}</span>
                    </div>
                    {palace.starProfile && (
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {palace.starProfile.nature} ({palace.starProfile.element})
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {palace.starProfile?.baseSign || 'Sao chủ quản thiên thời, năng lượng thời khắc và khí vận.'}
                  </p>
                </div>

                {/* Bát Thần */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className={`font-bold flex items-center gap-1.5 ${getGodColor(palace.god || '')}`}>
                      <Shield className="w-4 h-4" />
                      <span>Bát Thần: {palace.god || 'Trung Cung'}</span>
                    </div>
                    {palace.godProfile && (
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {palace.godProfile.nature} ({palace.godProfile.element})
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-slate-300 leading-relaxed">
                      {palace.godProfile?.significance || 'Bát Thần là cảnh giới vi diệu trợ lực cho việc mưu cầu tâm nguyện.'}
                    </p>
                    {palace.godProfile?.divination && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-200">
                        <strong>Dự trắc đời sống:</strong> {palace.godProfile.divination}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CÁCH CỤC & THẦN SÁT */}
          {activeTab === 'special' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    <span>Các Cách Cục Xuất Hiện Tại Cung ({palace.formations.length}):</span>
                  </div>

                  {palace.formations.length > 0 ? (
                    <div className="space-y-2">
                      {palace.formations.map((f, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-medium flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">Không có cách cục đặc biệt nổi bật tại cung này.</p>
                  )}
                </div>

                {/* Sát khí & Điều kiện đặc biệt */}
                {(palace.kichHinh || palace.nhapMo || palace.thangDien || palace.baThang || palace.batKhaKich) && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
                    <div className="font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Cảnh Báo Xung Sát & Nhập Mộ:</span>
                    </div>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {palace.kichHinh && <li><strong className="text-rose-300">Kích Hình:</strong> {palace.kichHinh}</li>}
                      {palace.nhapMo && <li><strong className="text-rose-300">Nhập Mộ:</strong> {palace.nhapMo}</li>}
                      {palace.thangDien && <li><strong className="text-emerald-300">Thăng Điện:</strong> {palace.thangDien}</li>}
                      {palace.baThang && <li><strong className="text-amber-300">Ba Thắng:</strong> {palace.baThang}</li>}
                      {palace.batKhaKich && <li><strong className="text-cyan-300">Bất Khả Kích:</strong> {palace.batKhaKich}</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={() => onSelectPalace(prevPalace.num)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Cung {prevPalace.num} ({prevPalace.name})</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
          >
            Đóng Cửa Sổ
          </button>

          <button
            onClick={() => onSelectPalace(nextPalace.num)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
          >
            <span>Cung {nextPalace.num} ({nextPalace.name})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
