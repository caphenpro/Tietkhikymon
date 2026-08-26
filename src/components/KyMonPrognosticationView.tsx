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
  Printer,
  Copy,
  Check,
  DoorOpen,
  Star,
} from 'lucide-react';
import { CompleteKyMonChart, buildCompleteKyMonChart } from '../astronomy/kymonChart';
import { KyMonInfo, BatTuInfo } from '../types';
import {
  generateComprehensivePrognostication,
  THIEN_NHUE_DISEASE_MAP,
  LOST_ITEMS_MAP,
  evaluateElementRelation,
} from '../astronomy/kymonPrognostication';

interface KyMonPrognosticationViewProps {
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
  onBackToBoard?: () => void;
}

export const KyMonPrognosticationView: React.FC<KyMonPrognosticationViewProps> = ({
  currentKyMon,
  currentBatTu,
  onBackToBoard,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'overview' | 'destiny' | 'marriage' | 'health' | 'wealth' | 'career' | 'lostItems' | 'lawsuit'
  >('overview');

  const [copied, setCopied] = useState<boolean>(false);

  // Chart data from current KyMon & BatTu
  const chart: CompleteKyMonChart = useMemo(() => {
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

    return buildCompleteKyMonChart(
      isDuong,
      cucNum,
      dCan,
      dChi,
      hCan,
      hChi
    );
  }, [currentKyMon, currentBatTu]);

  const pData = useMemo(() => generateComprehensivePrognostication(chart), [chart]);

  const handleCopySummary = () => {
    const text = `DỰ TRẮC KỲ MÔN ĐỘN GIÁP TOÀN THƯ (Quẻ ${chart.cucName} - Giờ ${chart.hourCanChi})
- Ngày/Giờ: ${chart.dayCanChi} / ${chart.hourCanChi}
- Tuần thủ: ${chart.tuanThuGiap} (${chart.tuanThuCan})
- Trực Phù: ${chart.trucPhuStar} (Cung ${chart.trucPhuNewPalace})
- Trực Sử: ${chart.trucSuDoor} (Cung ${chart.trucSuNewPalace})
- Tuần Không: ${chart.tuanKhongChi.join(', ')} | Dịch Mã: ${chart.dichMaChi}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Toàn Thư Dự Trắc Bàn Kỳ Môn Độn Giáp
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {chart.cucName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Hệ thống chiêm đoán cát hung toàn diện bám sát nguyên bản <strong>Kỳ Môn Độn Giáp Bí Kíp Toàn Thư</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onBackToBoard && (
              <button
                id="btn-back-to-kymon-board"
                onClick={onBackToBoard}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Quay Lại Bàn 9 Cung</span>
              </button>
            )}

            <button
              id="btn-copy-prognostication"
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã Sao Chép' : 'Sao Chép Tổng Quan'}</span>
            </button>
          </div>
        </div>

        {/* Quick Parameters Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Can Chi Giờ:</span>
            <span className="font-bold text-amber-300">{chart.hourCanChi}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Can Chi Ngày:</span>
            <span className="font-bold text-white">{chart.dayCanChi}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Tuần Thủ (Độn):</span>
            <span className="font-bold text-cyan-300">{chart.tuanThuGiap} ({chart.tuanThuCan})</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Sao Trực Phù:</span>
            <span className="font-bold text-amber-400">{chart.trucPhuStar} (C.{chart.trucPhuNewPalace})</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Cửa Trực Sử:</span>
            <span className="font-bold text-emerald-300">{chart.trucSuDoor} (C.{chart.trucSuNewPalace})</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Tuần Không / Mã:</span>
            <span className="font-bold text-rose-300">{chart.tuanKhongChi.join(', ')} / {chart.dichMaChi}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Prognostication Categories */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar shadow-lg">
        {[
          { id: 'overview', label: 'Tam Bàn & Chủ Khách', icon: Layers },
          { id: 'destiny', label: 'Thân Mệnh (Sang Hèn)', icon: User },
          { id: 'marriage', label: '1. Hôn Nhân & Vợ Chồng', icon: Heart },
          { id: 'health', label: '2. Y Học & Trị Bệnh', icon: HeartPulse },
          { id: 'wealth', label: '3. Cầu Tài & Giao Dịch', icon: Coins },
          { id: 'career', label: '4. Thi Cử & Công Danh', icon: GraduationCap },
          { id: 'lostItems', label: '5. Mất Vật & Kẻ Trộm', icon: Search },
          { id: 'lawsuit', label: '6. Kiện Tụng & Tranh Chấp', icon: Scale },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-prognostication-${tab.id}`}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md scale-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CATEGORY 1: TAM BÀN & CHỦ KHÁCH */}
      {activeCategory === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TAM BÀN CÁT HUNG */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Quy Luật Tam Bàn Trong Luận Đoán Cát Hung</h3>
                  <span className="text-xs text-slate-400">Cấu trúc Thiên (9 Sao) - Nhân (8 Cửa) - Địa (9 Cung)</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> 1. Xem Cát Hung Chung (Thiên Thời):
                  </span>
                  <p>
                    Đầu tiên xem nặng về <strong>9 Sao (Thiên Bàn)</strong>, vì Sao đại diện cho Thiên thời và cái cát hung đã được trời định sẵn.
                  </p>
                  <p className="text-slate-400 italic">
                    • Nguyên tắc: <strong>Sao (Tinh) khắc Môn thì cát</strong>, <strong>Môn khắc Sao thì hung</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <DoorOpen className="w-3.5 h-3.5" /> 2. Xem Đi Xa, Di Chuyển Hoặc Ẩn Lánh (Nhân Sự):
                  </span>
                  <p>
                    Xem nặng về <strong>8 Cửa (Nhân Bàn)</strong>, vì 8 Cửa là Nhân bàn, thể hiện sự chủ động chọn lựa hay hành động của con người để tự chiêm lấy cát hung.
                  </p>
                  <p className="text-slate-400 italic">
                    • Nguyên tắc: <strong>Môn khắc Cung thì cát</strong>, <strong>Cung khắc Môn thì hung</strong> (do Cung khắc Môn sẽ làm thương tổn con người nên hung).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> 3. Xem Xây Dựng, Chôn Cất, Dời Đổi (Địa Lợi):
                  </span>
                  <p>
                    Xem nặng về <strong>9 Cung (Địa Bàn)</strong>, vì mọi sự dời đổi, kiến tạo đều khởi đầu từ đất đai.
                  </p>
                  <p className="text-slate-400 italic">
                    • Nguyên tắc: <strong>Môn và Cung tương sinh thì đều cát</strong>, <strong>tương khắc thì đều hung</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* CHỦ - KHÁCH CHIÊM NGHIỆM */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Quy Tắc Phân Định Chủ - Khách Trong Chiêm Nghiệm</h3>
                  <span className="text-xs text-slate-400">Xác định ngôi vị ai được lợi, ai bị hao tổn khi giao sự</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                  <span className="text-cyan-300 font-bold block">1. Phân Định Ngôi Vị:</span>
                  <p>
                    • <strong>Nếu ta chủ động đi tìm người khác:</strong> Ta là <span className="text-amber-300 font-bold">Khách</span> (lấy Sao trên Thiên bàn đại diện), người khác là <span className="text-emerald-300 font-bold">Chủ</span> (lấy Sao dưới Địa bàn đại diện).
                  </p>
                  <p>
                    • <strong>Nếu người khác chủ động tìm đến ta:</strong> Người đó là <span className="text-amber-300 font-bold">Khách</span> (Sao Thiên bàn), ta là <span className="text-emerald-300 font-bold">Chủ</span> (Sao Địa bàn).
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-amber-400 font-bold block">2. Đánh Giá Sinh Khắc Tổn - Ích:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <strong className="text-emerald-400 block mb-0.5">Khách sinh Chủ (Thiên $\rightarrow$ Địa):</strong>
                      <span className="text-slate-300">Ít hao tốn, mang lại lợi ích lớn cho Chủ.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">Chủ sinh Khách (Địa $\rightarrow$ Thiên):</strong>
                      <span className="text-slate-300">Hao tán, chậm trễ, có lợi cho phía Khách.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <strong className="text-rose-400 block mb-0.5">Khách khắc Chủ (Thiên $\times$ Địa):</strong>
                      <span className="text-slate-300">Tổn thất thuộc về Chủ, mưu sự bất lợi.</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <strong className="text-purple-400 block mb-0.5">Chủ khắc Khách (Địa $\times$ Thiên):</strong>
                      <span className="text-slate-300">Tổn thất thuộc về Khách, mưu sự tự bại tự hòa.</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 italic font-serif">
                  * Ghi chú ngày Âm/Dương: Ngày Âm thì sao Thiên bàn là Ta, ngày Dương thì sao Địa bàn là Ta; nếu tỷ hòa nhau thì không có tổn ích gì.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: DỰ TRẮC THÂN MỆNH (NHÂN SINH QUÝ TIỆN) */}
      {activeCategory === 'destiny' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Lục Thân Mapping */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hệ Thống Lục Thân Đại Diện Trong Thân Mệnh</h3>
                <span className="text-xs text-slate-400">Chiêm Nhân Sinh Quý Tiện theo nguyên lý Kỳ Môn Độn Giáp</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block font-mono">1. Can Năm (Niên Can):</span>
                <span className="font-bold text-amber-300 text-sm block">Phụ Mẫu (Cha Mẹ)</span>
                <p className="text-slate-400 text-[11px]">Chủ về tổ nghiệp, sự bảo bọc của cha mẹ thuở ấu thơ.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block font-mono">2. Can Tháng (Nguyệt Can):</span>
                <span className="font-bold text-cyan-300 text-sm block">Huynh Đệ (Anh Em)</span>
                <p className="text-slate-400 text-[11px]">Chủ về tình nghĩa anh em, bè bạn đồng trang lứa.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block font-mono">3. Can Ngày (Nhật Can):</span>
                <span className="font-bold text-emerald-300 text-sm block">Bản Thân Ta (Bản Thân)</span>
                <p className="text-slate-400 text-[11px]">Đóng tại Cung {pData.dayPalace.palaceNum} ({pData.dayPalace.palaceName}) - Tọa chủ mệnh.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[11px] block font-mono">4. Can Giờ (Thời Can):</span>
                <span className="font-bold text-rose-300 text-sm block">Con Nhỏ (Tử Tức / Nhi)</span>
                <p className="text-slate-400 text-[11px]">Đóng tại Cung {pData.hourPalace.palaceNum} ({pData.hourPalace.palaceName}) - Chủ hậu vận.</p>
              </div>
            </div>

            {/* Vợ Chồng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-pink-400 font-bold block mb-1">Thê Thiếp (Vợ):</span>
                <p className="text-slate-300">
                  Lấy Kỳ Ất (Vợ cả) tại Cung {pData.atPalace.palaceNum} ({pData.atPalace.palaceName}) và Kỳ Đinh (Vợ lẽ/Người yêu) tại Cung {pData.dinhPalace.palaceNum} ({pData.dinhPalace.palaceName}).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Chồng:</span>
                <p className="text-slate-300">
                  Lấy Canh làm chồng, tọa tại Cung {pData.canhPalace.palaceNum} ({pData.canhPalace.palaceName}) để định vị cát hung không sai lệch.
                </p>
              </div>
            </div>
          </div>

          {/* NGUYÊN LÝ VINH KHÔ, SANG HÈN & TỔ NGHIỆP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl text-xs">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Sparkles className="w-4 h-4" /> Nguyên Lý Luận Đoán Vinh Khô & Sang Hèn
              </h4>
              <div className="space-y-2 text-slate-300">
                <p>
                  • <strong>Vinh hiển, giàu sang:</strong> Xem xét sự mạnh yếu (cường nhược) của các cung lục thân. Nếu các cung này rơi vào trạng thái <em>Vượng tướng và đắc Kỳ (Tam Kỳ Ất, Bính, Đinh nâng đỡ)</em> thì cuộc đời vừa phú quý, vừa sang trọng.
                </p>
                <p>
                  • <strong>Bần tiện, khó khăn:</strong> Nếu các cung mệnh rơi vào các trạng thái <em>Tử, Tù, Mộ, Tuyệt</em> thì cuộc đời chịu cảnh khốn khổ, hèn kém. Nếu can yếu thì phần gốc quả phương diện đó mong manh.
                </p>
                <p>
                  • <strong>Cô - Hư & Tuổi Trẻ - Hậu Vận:</strong>
                  <span className="block pl-3 text-slate-400 mt-1">
                    - Ngày gặp Cô, giờ gặp Hư (<em>Nhật Trực Cô thời trực Hư</em>): Tuổi trẻ không nơi nương tựa, cô độc.
                  </span>
                  <span className="block pl-3 text-slate-400">
                    - Giờ gặp Cô, ngày gặp Hư (<em>Thời lạc Cô nhật lạc Hư</em>): Về già chịu cảnh góa bụa, đơn độc.
                  </span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl text-xs">
              <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Coins className="w-4 h-4" /> Tổ Nghiệp & Ly Hương (Sinh Môn)
              </h4>
              <div className="space-y-2 text-slate-300">
                <p>
                  • <strong>Sinh môn đại diện cho sản nghiệp, ruộng vườn:</strong> Đang đóng tại Cung {pData.sinhMonPalace.palaceNum} ({pData.sinhMonPalace.palaceName}).
                </p>
                <p>
                  - Nếu Sinh môn đắc Kỳ thì giàu có như Thạch Sùng.
                </p>
                <p>
                  - Nếu Sinh môn gặp Thái Bạch (Canh) bị xung hãm thì chủ nhân phải xa tổ ly hương làm khách.
                </p>
                <p>
                  - Nếu Sinh môn bị cung xung khắc thì ruộng vườn tiên tổ bị bán sạch trơn.
                </p>
                <p>
                  - <em>Nội - Ngoại Cung:</em> Nếu Sinh môn ở ngoại cung mà thân (Nhật can) ở nội cung thì rời tổ ra ngoài mà phát phú. Thân ở ngoài mà Sinh môn ở trong thì cha mẹ để lại của nhưng bản thân vất vả gánh vác.
                </p>
              </div>
            </div>
          </div>

          {/* Ý NGHĨA CỬU TINH & BÁT MÔN TRONG THÂN MỆNH */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Ý Nghĩa Cửu Tinh & Bát Môn Trong Thân Mệnh (Phẩm Chất & Vận Số)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Phụ (Văn Tinh):</strong>
                <p className="text-slate-300">Vượng tướng đắc Kỳ Môn là bậc văn minh, đỗ đạt vườn Hàn. Thất thời làm thầy tu, thợ vẽ bon chen.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Xung (Võ Tinh):</strong>
                <p className="text-slate-300">Vượng tướng đắc Kỳ Nghi thì oai chấn biên cương, võ nghiệp hiển hách. Bối thời thì trôi dạt sông hồ thuyền ngựa.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Cầm (Trung Tôn):</strong>
                <p className="text-slate-300">Đóng trung cung, đắc Kỳ Môn là bậc trăm quan đầu sỏ, cực kỳ cao quý quyền uy.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Tâm (Trụ Cột):</strong>
                <p className="text-slate-300">Đắc địa là tài hoa, cột trụ đất nước, y thuật cao minh. Gặp Không Mộ rơi vào hàng cửu lưu thuật số.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Nhậm (Điền Sản):</strong>
                <p className="text-slate-300">Đắc địa thì ruộng vườn xe ngựa giàu sang phú túc. Bị khắc là nông phu cày cuốc khó nhọc.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-300 block mb-1">Thiên Bồng (Dũng Mãnh):</strong>
                <p className="text-slate-300">Được thời lệnh làm mãnh tướng trấn thủ biên cương. Thất địa chỉ là quân lính quèn hoặc phường giặc cướp.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 3: HÔN NHÂN & VỢ CHỒNG */}
      {activeCategory === 'marriage' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vị trí trên bàn cờ */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Heart className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Vị Trí Cung Hôn Nhân Trên Bàn Kỳ Môn Hiện Tại</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Người Chồng / Nhà Trai (Canh):</span>
                    <span className="font-bold text-amber-300 text-sm">
                      Cung {pData.canhPalace.palaceNum} ({pData.canhPalace.palaceName} - {pData.canhPalace.element})
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {pData.canhPalace.door} • {pData.canhPalace.heavenStar}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Người Vợ / Nhà Gái (Ất):</span>
                    <span className="font-bold text-emerald-300 text-sm">
                      Cung {pData.atPalace.palaceNum} ({pData.atPalace.palaceName} - {pData.atPalace.element})
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {pData.atPalace.door} • {pData.atPalace.heavenStar}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Người Mối / Mai Mối (Lục Hợp):</span>
                    <span className="font-bold text-cyan-300 text-sm">
                      Cung {pData.lucHopPalace.palaceNum} ({pData.lucHopPalace.palaceName} - {pData.lucHopPalace.element})
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{pData.lucHopPalace.door}</span>
                </div>

                {/* Tương quan Ngũ hành */}
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                  <span className="font-bold block mb-1">Tương Quan Sinh Khắc Vợ (Ất) - Chồng (Canh):</span>
                  <p>
                    Cung Ất ({pData.atPalace.element}) đối với Cung Canh ({pData.canhPalace.element}):{' '}
                    <strong>{evaluateElementRelation(pData.atPalace.element, pData.canhPalace.element)}</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Bí Kíp Toàn Thư Luận Đoán Hôn Nhân */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Khẩu Quyết Luận Đoán Hôn Nhân & Thê Thiếp
              </h3>
              <div className="space-y-2.5 text-slate-300 leading-relaxed">
                <p>
                  • <strong>Tương sinh, tương hợp:</strong> Nếu cung Ất và Canh tương sinh, tương hợp thì hôn nhân thành công mỹ mãn, vợ chồng hòa thuận trăm năm.
                </p>
                <p>
                  • <strong>Tương khắc:</strong> Nếu Ất khắc Canh hoặc Canh khắc Ất thì một trong hai bên chê bai, không thuận ý; nếu cưỡng ép lấy nhau thì về sau dễ hình khắc phân ly.
                </p>
                <p>
                  • <strong>Thê - Thiếp (Ất & Đinh):</strong> Nếu cung Ất sinh Canh và Đinh sinh Canh thì người nữ thuận lòng tòng phu. Nếu Ất khắc Đinh thì vợ cả ghen tuông không dung thứ vợ lẽ; Đinh khắc Ất thì vợ lẽ lấn lướt vợ cả.
                </p>
                <p>
                  • <strong>Mộ Tuyệt & Kích Hình:</strong> Nếu Ất và Đinh rơi vào cung Mộ, Tuyệt thì hôn nhân khó thành. Ất gặp Kích Hình thì tính người nữ hung dữ; đắc Đức Hợp thì người nữ hiền thục nết na.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 4: Y HỌC, TRỊ BỆNH & TÌM THẦY THUỐC */}
      {activeCategory === 'health' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chẩn Đoán Bệnh Chứng Hiện Tại */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <HeartPulse className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Chẩn Đoán Bệnh Chứng Qua Thiên Nhuế</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-amber-300 text-sm">
                      Thần Bệnh: Sao Thiên Nhuế lâm Cung {pData.thienNhuePalace.palaceNum} ({pData.thienNhuePalace.palaceName})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-mono text-[11px]">
                      Hành {pData.thienNhuePalace.element}
                    </span>
                  </div>
                  {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace.palaceNum] && (
                    <div className="space-y-2 text-slate-300">
                      <p>
                        <strong className="text-white">• Bệnh Nội Tạng (Bên trong):</strong>{' '}
                        {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace.palaceNum].internal}
                      </p>
                      <p>
                        <strong className="text-white">• Bệnh Thể Xác (Bên ngoài):</strong>{' '}
                        {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace.palaceNum].external}
                      </p>
                      <p className="text-amber-200/90 italic font-serif pt-1">
                        {THIEN_NHUE_DISEASE_MAP[pData.thienNhuePalace.palaceNum].summary}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Sinh Môn (Sự Sống):</span>
                    <span className="font-bold text-emerald-300">Cung {pData.sinhMonPalace.palaceNum} ({pData.sinhMonPalace.palaceName})</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Tử Môn (Nguy Kịch):</span>
                    <span className="font-bold text-rose-300">Cung {pData.tuMonPalace.palaceNum} ({pData.tuMonPalace.palaceName})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tìm Thầy Thuốc & Phương Thuốc */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Tìm Thầy Thuốc & Hiệu Lực Trị Bệnh
              </h3>

              <div className="space-y-3 text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">
                    Thần Thầy Thuốc: Sao Thiên Tâm & Kỳ Ất
                  </span>
                  <p>
                    • <strong>Thiên Tâm:</strong> Cung {pData.thienTamPalace.palaceNum} ({pData.thienTamPalace.palaceName} - {pData.thienTamPalace.element})
                  </p>
                  <p>
                    • <strong>Kỳ Ất (Dược Thần):</strong> Cung {pData.atPalace.palaceNum} ({pData.atPalace.palaceName} - {pData.atPalace.element})
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Quy Tắc Khắc Chế Bệnh Tật:</span>
                  <p>
                    Cung Thầy Thuốc (Thiên Tâm / Kỳ Ất) phải <strong>khắc được</strong> cung của Thần Bệnh (Thiên Nhuế) thì uống thuốc mới mau lành, gặp được danh y.
                  </p>
                  <p className="text-slate-400 mt-1">
                    Nếu Cung Bệnh (Thiên Nhuế) khắc ngược lại Cung Thầy Thuốc thì dù gặp thầy giỏi cũng khó cứu chữa, bệnh tình dai dẳng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 5: CẦU TÀI, KINH DOANH & GIAO DỊCH */}
      {activeCategory === 'wealth' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Coins className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Vị Trí Tài Thần & Sinh Môn Trên Bàn Cờ</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Vốn Liếng / Tiền Vốn (Giáp Tý Mậu):</span>
                  <span className="font-bold text-amber-300 text-sm">
                    Cung {pData.mauPalace.palaceNum} ({pData.mauPalace.palaceName} - {pData.mauPalace.element})
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Cửa: {pData.mauPalace.door} • Sao: {pData.mauPalace.heavenStar} • Thần: {pData.mauPalace.god}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Lợi Nhuận & Phương Vị Có Tài (Sinh Môn):</span>
                  <span className="font-bold text-emerald-300 text-sm">
                    Cung {pData.sinhMonPalace.palaceNum} ({pData.sinhMonPalace.palaceName} - {pData.sinhMonPalace.element})
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Sao: {pData.sinhMonPalace.heavenStar} • Thần: {pData.sinhMonPalace.god}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
                  <span className="font-bold block mb-1">Tương Quan Lợi Nhuận (Sinh Môn) & Tiền Vốn (Mậu):</span>
                  <p>
                    Sinh Môn ({pData.sinhMonPalace.element}) đối với Mậu ({pData.mauPalace.element}):{' '}
                    <strong>{evaluateElementRelation(pData.sinhMonPalace.element, pData.mauPalace.element)}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Bí Kíp Giao Dịch & Mua Bán
              </h3>
              <div className="space-y-2.5 text-slate-300 leading-relaxed">
                <p>
                  • <strong>Buôn Bán Lời Lỗ:</strong> Nếu cung Sinh môn được Kỳ Môn cát cách và sinh cho cung Mậu thì việc buôn bán được lời lớn, bội thu. Nếu Sinh môn khắc Mậu tất bị tổn hao tiền vốn.
                </p>
                <p>
                  • <strong>Giao Dịch Người Mua - Người Bán:</strong>
                  <span className="block pl-3 text-slate-400 mt-1">
                    - Nhật can là Ta (Người mua), Thời can là Người (Người bán), Lục Hợp là người môi giới.
                  </span>
                  <span className="block pl-3 text-slate-400">
                    - Nhật can sinh Thời can: Ta mua chịu; Thời can sinh Nhật can: Người bán thuận lòng bán.
                  </span>
                  <span className="block pl-3 text-slate-400">
                    - Lục Hợp sinh Nhật can: Người mối đứng về phía ta; nếu rơi vào Không Vong: Giao dịch bất thành.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 6: THI CỬ & CÔNG DANH */}
      {activeCategory === 'career' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Vị Trí Trường Thi Trên Bàn Cờ</h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Sĩ Tử Đi Thi (Nhật Can):</span>
                    <span className="font-bold text-amber-300">Cung {pData.dayPalace.palaceNum} ({pData.dayPalace.palaceName})</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Bài Thi / Văn Chương (Kỳ Đinh):</span>
                    <span className="font-bold text-rose-300">Cung {pData.dinhPalace.palaceNum} ({pData.dinhPalace.palaceName})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Quan Chủ Khảo (Trực Phù):</span>
                    <span className="font-bold text-cyan-300">Cung {pData.trucPhuPalace.palaceNum} ({pData.trucPhuPalace.palaceName})</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Giám Khảo Chấm Thi (Trực Sử):</span>
                    <span className="font-bold text-emerald-300">Cung {pData.trucSuPalace.palaceNum} ({pData.trucSuPalace.palaceName})</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Thăng Chức Quan Văn / Quan Võ:</span>
                  <p className="text-slate-200 mt-0.5">
                    • Quan Văn xem <strong>Khai Môn</strong> tại Cung {pData.khaiMonPalace.palaceNum} ({pData.khaiMonPalace.palaceName}).
                  </p>
                  <p className="text-slate-200">
                    • Quan Võ xem <strong>Đỗ Môn</strong> tại Cung {pData.doMonPalace.palaceNum} ({pData.doMonPalace.palaceName}).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Luận Đoán Đỗ Đạt Bảng Vàng
              </h3>
              <div className="space-y-2.5 text-slate-300 leading-relaxed">
                <p>
                  • <strong>Đỗ Bảng Vàng:</strong> Nếu Trực Phù và Trực Sử cùng tương sinh cho cung Can ngày (sĩ tử), bài thi Kỳ Đinh vượng tướng đắc Kỳ Môn thì thi cử đỗ đạt vinh hiển.
                </p>
                <p>
                  • <strong>Hỏng Thi / Trục Trặc:</strong> Nếu Trực Phù hoặc Trực Sử khắc Can ngày thì giám khảo gạt bỏ; nếu Kỳ Đinh rơi vào Hưu Tù Phế Mộ thì bài thi lạc đề, văn chương tối nghĩa.
                </p>
                <p>
                  • <strong>Phạm Quy:</strong> Kỳ Đinh rơi vào Không Vong thì bài làm dang dở; rơi vào Mộ thì phạm trường quy; gặp Huyền Vũ thì văn chương bị sai lệch.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 7: TÌM NGƯỜI & MẤT VẬT */}
      {activeCategory === 'lostItems' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Search className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Xác Định Đồ Vật & Phương Vị Rơi Mất</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Vật Bị Mất (Can Giờ đóng tại Cung):</span>
                  <span className="font-bold text-amber-300 text-sm">
                    Cung {pData.hourPalace.palaceNum} ({pData.hourPalace.palaceName} - {pData.hourPalace.direction})
                  </span>
                  {LOST_ITEMS_MAP[pData.hourPalace.palaceNum] && (
                    <div className="mt-2 space-y-1.5 text-slate-300">
                      <p>
                        <strong className="text-white">• Loại vật phẩm:</strong>{' '}
                        {LOST_ITEMS_MAP[pData.hourPalace.palaceNum].items}
                      </p>
                      <p>
                        <strong className="text-white">• Loài vật / Thú nuôi:</strong>{' '}
                        {LOST_ITEMS_MAP[pData.hourPalace.palaceNum].animal}
                      </p>
                      <p className="text-amber-200/90 italic pt-0.5">
                        {LOST_ITEMS_MAP[pData.hourPalace.palaceNum].nature}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Kẻ Lấy Cắp (Sao Thiên Bồng):</span>
                    <span className="font-bold text-rose-300">Cung {pData.thienBongPalace.palaceNum} ({pData.thienBongPalace.palaceName})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Thần: {pData.thienBongPalace.god}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Quy Tắc Tìm Lại Đồ Vật & Nhận Diện Kẻ Trộm
              </h3>
              <div className="space-y-2.5 text-slate-300 leading-relaxed">
                <p>
                  • <strong>Tìm Lại Được:</strong> Nếu cung Can giờ vượng tướng và tương sinh cho cung Can ngày (chủ mất), hoặc gặp Phản Ngâm thì vật mất tìm lại được rất nhanh.
                </p>
                <p>
                  • <strong>Không Tìm Thấy:</strong> Nếu Can giờ rơi vào Không Vong, Mộ, Tuyệt thì đồ vật đã bị tẩu tán hoặc không còn cơ hội tìm thấy.
                </p>
                <p>
                  • <strong>Nhận Diện Kẻ Trộm:</strong> Lấy sao Thiên Bồng làm chủ trộm. Nếu Thiên Bồng đắc khí đắc Kỳ Môn là kẻ sang trọng lấy cắp; thất khí là kẻ tiểu nhân bần hàn. Nếu Lục Hợp đi cùng là bị lừa dối dắt đi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 8: KIỆN TỤNG & TRANH CHẤP */}
      {activeCategory === 'lawsuit' && (
        <div className="space-y-6 animate-fadeIn text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Vị Trí Tòa Án & Kiện Tụng Trên Bàn Cờ</h3>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Nguyên Cáo / Người Kiện (Nhật Can):</span>
                    <span className="font-bold text-emerald-300">Cung {pData.dayPalace.palaceNum} ({pData.dayPalace.palaceName})</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Bị Cáo / Người Bị Kiện (Thời Can):</span>
                    <span className="font-bold text-rose-300">Cung {pData.hourPalace.palaceNum} ({pData.hourPalace.palaceName})</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Quan Tòa / Quan Xét Xử (Trực Phù):</span>
                  <span className="font-bold text-cyan-300 text-sm">
                    Cung {pData.trucPhuPalace.palaceNum} ({pData.trucPhuPalace.palaceName})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Đơn Trạng / Văn Thư (Kinh Môn):</span>
                    <span className="font-bold text-amber-300">Cung {pData.kinhMonPalace.palaceNum} ({pData.kinhMonPalace.palaceName})</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Văn Khế / Chứng Cứ (Cảnh Môn):</span>
                    <span className="font-bold text-purple-300">Cung {pData.canhMonPalace.palaceNum} ({pData.canhMonPalace.palaceName})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Luận Đoán Thắng Thua & Thụ Lý Đơn
              </h3>
              <div className="space-y-2.5 text-slate-300 leading-relaxed">
                <p>
                  • <strong>Quan Tòa Trách Phạt:</strong> Nếu cung Trực Phù khắc Can ngày thì quan trách phạt Nguyên Cáo; nếu khắc Can giờ thì trách phạt Bị Cáo. Nếu Trực Phù sinh Can ngày thì quan xử có lợi cho bên kiện.
                </p>
                <p>
                  • <strong>Đơn Từ Thụ Lý (Kinh & Cảnh):</strong> Nếu cửa Kinh và Cảnh vượng tướng đắc Kỳ Môn, không bị cửa Khai (quan trưởng) xung khắc thì đơn trạng được phê chuẩn nhanh chóng.
                </p>
                <p>
                  • <strong>Bác Đơn:</strong> Nếu Kinh, Cảnh rơi vào Mộ thì lời lẽ mờ mịt không rõ nên quan không chuẩn; nếu rơi vào Không Vong thì đơn bị hủy bỏ, không được thụ lý.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
