import React, { useState, useEffect } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Zap,
  Star,
  Shield,
  DoorOpen,
  Target,
  Sliders,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface OnboardingTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
  onOpenAIChat?: () => void;
  onOpenAlgorithmModal?: () => void;
}

export const ONBOARDING_STORAGE_KEY = 'kymon_has_completed_onboarding_tour_v2';

export const OnboardingTourModal: React.FC<OnboardingTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenAIChat,
  onOpenAlgorithmModal,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(true);

  // Handle keyboard navigation (Left/Right arrow, Escape)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      } else if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    }
    onClose();
  };

  const steps = [
    // BƯỚC 1: CHÀO MỪNG & HỢP NHẤT THIÊN VĂN - CỔ TAM THỨC
    {
      id: 'welcome',
      title: 'Chào Mừng Đến Với Hệ Thống Tiết Khí & Kỳ Môn Độn Giáp',
      subtitle: 'Hệ Tọa Độ Thời - Không Vũ Trụ 4 Chiều (Thiên Văn Chính Xác & Cổ Tam Thức)',
      icon: Compass,
      badge: 'Tổng Quan Hệ Thống',
      color: 'amber',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p className="text-slate-200">
            Ứng dụng là sự kết tinh hoàn hảo giữa <strong>Mô Hình Tính Toán Thiên Văn Hiện Đại</strong> (chuẩn VSOP87 & ELP2000) và <strong>Tam Đại Bí Thuật Cổ Học Phương Đông</strong> (Kỳ Môn Độn Giáp, Đại Lục Nhâm, Thái Ất Thần Kinh).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>1. Thiên Thời (Trời)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                24 Tiết Khí Mặt Trời, Điểm Sóc Mặt Trăng, Cửu Tinh và phân chia Âm Dương Độn chính xác từng giây.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>2. Địa Lợi (Đất)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Lạc Thư Cửu Cung, Bát Quái Hậu Thiên, 8 Phương Hướng Phong Thủy và Lục Nghi Tam Kỳ Địa Bàn.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>3. Nhân Hòa (Người)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Bát Môn (Hưu, Sinh, Thương, Đỗ, Cảnh, Tử, Kinh, Khai), Chủ - Khách và Tứ Trụ Bát Tự Thân Mệnh.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Điểm độc đáo:</strong> Toàn bộ dữ liệu được tính toán thời gian thực (Live Engine), không sử dụng bảng tra cứu tĩnh hay phép tính xấp xỉ sai lệch.
            </span>
          </div>
        </div>
      ),
    },

    // BƯỚC 2: THANH THÔNG TIN THỜI GIAN THỰC & CHỌN MỐC THỜI GIAN
    {
      id: 'header-controls',
      title: 'Thanh Trạng Thái Thiên Văn & Công Cụ Thời Gian',
      subtitle: 'Nắm bắt Tứ Trụ, Tiết Khí, Cục Số và chủ động định thời điểm chiêm quẻ',
      icon: Clock,
      badge: 'Thanh Header',
      color: 'emerald',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Trên thanh tiêu đề (Top Bar), bạn luôn có một cái nhìn toàn diện tức thời về dòng chảy năng lượng vũ trụ:
          </p>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs">
                LIVE
              </div>
              <div>
                <h5 className="font-bold text-white text-xs">Nút Chế Độ Live (Thời Gian Thực)</h5>
                <p className="text-slate-400 text-xs mt-0.5">
                  Đang cập nhật từng giây theo đồng hồ hệ thống. Nhấp vào để dừng thời gian nếu muốn phân tích một khoảnh khắc cụ thể.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-xs">
                TỨ TRỤ
              </div>
              <div>
                <h5 className="font-bold text-white text-xs">Tứ Trụ Bát Tự & Âm Dương Lịch</h5>
                <p className="text-slate-400 text-xs mt-0.5">
                  Hiển thị Can Chi 4 Trụ (Năm, Tháng, Ngày, Giờ) cùng ngày Âm Lịch (xác thực qua điểm Sóc thiên văn 0°).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-xs">
                <Sliders className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h5 className="font-bold text-white text-xs">Bộ Chọn Thời Điểm Tùy Chỉnh (Time Picker)</h5>
                <p className="text-slate-400 text-xs mt-0.5">
                  Nhấp vào biểu tượng thanh trượt <Sliders className="w-3 h-3 inline text-amber-400 mx-1" /> để chọn ngày giờ trong quá khứ hoặc tương lai nhằm lập quẻ dự trắc cho các sự kiện quan trọng.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // BƯỚC 3: HƯỚNG DẪN ĐỌC MA TRẬN BÀN KỲ MÔN 9 CUNG
    {
      id: 'kymon-palace-structure',
      title: 'Cách Đọc Một Cung Kỳ Môn Độn Giáp (Ma Trận 9 Cung)',
      subtitle: 'Nguyên lý Tam Bàn (Thần - Thiên - Nhân - Địa) trong từng cung vị',
      icon: Layers,
      badge: 'Cốt Lõi Kỳ Môn',
      color: 'amber',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Mỗi Cung trong ma trận 3x3 Lạc Thư là một trường năng lượng đa tầng, tích hợp 4 yếu tố trọng yếu:
          </p>

          {/* Palace Anatomy Diagram */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/40">
                  Cung Ly (9) • Hướng Nam
                </span>
                <span className="text-[10px] text-slate-400">Ngũ hành: Hỏa</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-bold">
                <span className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40">🐎 Mã Tinh</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">〇 Không</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {/* Thần Bàn */}
              <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/40">
                <span className="text-[10px] text-purple-400 block font-bold uppercase tracking-wider">1. Bát Thần</span>
                <span className="text-sm font-black text-purple-200">Trực Phù</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Quý nhân, cát thần tối thượng</span>
              </div>

              {/* Cửu Tinh */}
              <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <span className="text-[10px] text-cyan-400 block font-bold uppercase tracking-wider">2. Cửu Tinh</span>
                <span className="text-sm font-black text-cyan-200">Thiên Anh</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Thiên thời, hào quang, trí tuệ</span>
              </div>

              {/* Bát Môn */}
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[10px] text-emerald-400 block font-bold uppercase tracking-wider">3. Bát Môn</span>
                <span className="text-sm font-black text-emerald-200">Cảnh Môn</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Văn thư, giấy tờ, danh tiếng</span>
              </div>

              {/* Can Khí Phối Hợp */}
              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <span className="text-[10px] text-amber-400 block font-bold uppercase tracking-wider">4. Thiên/Địa Can</span>
                <span className="text-sm font-black text-amber-200">Bính / Mậu</span>
                <span className="text-[10px] text-amber-400 block mt-0.5">Phi Điểu Điệp Huyệt (Đại Cát)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-amber-400">💡 Nhấp Vào Từng Cung:</strong> Nhấp trực tiếp vào bất kỳ ô nào trên bàn Kỳ Môn để mở <strong>Bảng Phân Tích Cung Chi Tiết</strong> (đầy đủ sinh khắc, đại cát hung, ứng dụng thực tiễn).
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <strong className="text-cyan-400">🔍 Chế Độ Tự Lập Quẻ (Manual):</strong> Chuyển sang tab Chỉnh Tay để thử nghiệm bất kỳ Cục số hay Can Chi nào theo ý muốn.
            </div>
          </div>
        </div>
      ),
    },

    // BƯỚC 4: QUY LUẬT CHỦ - KHÁCH & TRỰC PHÙ - TRỰC SỬ
    {
      id: 'kymon-chu-khach',
      title: 'Nguyên Lý Quyết Đoán: Chủ - Khách & Trực Phù - Trực Sử',
      subtitle: 'Quy tắc vàng giúp bạn chọn chiến lược: Nên Chủ Động Tấn Công hay Phòng Thủ Đón Đầu',
      icon: Target,
      badge: 'Chiến Lược & Ứng Dụng',
      color: 'cyan',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Kỳ Môn Độn Giáp nổi tiếng là <strong>Binh Pháp Quân Sự & Thuật Đàm Phán Tối Thượng</strong> nhờ nguyên tắc phân định Chủ - Khách rõ ràng:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                  K
                </span>
                <span>Bên Khách (Động • Tiến • Đi Trước)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                • Đại diện bởi <strong>Can Giờ</strong> và <strong>Thiên Bàn</strong>.
                <br />• Ứng với: Người khởi xướng, người đi vay, người tìm đến đàm phán, bên tấn công, người đi bán hàng.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                  C
                </span>
                <span>Bên Chủ (Tĩnh • Thủ • Đón Sau)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                • Đại diện bởi <strong>Can Ngày</strong> và <strong>Địa Bàn</strong>.
                <br />• Ứng với: Chủ nhà, người cho vay, bên tiếp nhận đề nghị, bên phòng thủ, người mua hàng.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <h5 className="font-bold text-white text-xs flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Cung Trực Phù & Trực Sử:</span>
            </h5>
            <p className="text-[11px] text-slate-400">
              • <strong>Cung Trực Phù:</strong> Đại diện cho người lãnh đạo, quý nhân che chở, cơ quan chủ quản tối cao.
              <br />• <strong>Cung Trực Sử:</strong> Đại diện cho sứ giả thực thi, người thừa hành, tiến trình vận động cụ thể của sự việc.
            </p>
          </div>
        </div>
      ),
    },

    // BƯỚC 5: DỰ TRẮC CHUYÊN SÂU 6 CHỦ ĐỀ ĐỜI SỐNG
    {
      id: 'prognostication-6-topics',
      title: 'Dự Trắc Chuyên Sâu 6 Chủ Đề Đời Sống',
      subtitle: 'Ứng dụng vào Thân Mệnh, Tài Vận, Hôn Nhân, Công Danh, Sức Khỏe và Đàm Phán',
      icon: BookOpen,
      badge: 'Dự Trắc Ứng Dụng',
      color: 'amber',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Tab <strong>Dự Trắc Chuyên Sâu</strong> cung cấp phân tích logic tự động theo Dụng Thần cổ truyền cho 6 lĩnh vực quan trọng:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
              <span className="font-bold text-amber-300 text-xs block">1. Thân Mệnh & Vận Hạn</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Dụng Thần Can Ngày, Cung Mệnh, Thần Sát.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
              <span className="font-bold text-emerald-300 text-xs block">2. Tài Vận & Đầu Tư</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Sinh Môn, Mậu thổ, Thiên Nhậm tinh.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/30">
              <span className="font-bold text-rose-300 text-xs block">3. Tình Duyên & Hôn Nhân</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Ất Canh tương hợp, Lục Hợp thần.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30">
              <span className="font-bold text-cyan-300 text-xs block">4. Công Danh & Sự Nghiệp</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Khai Môn, Trực Phù, Bính/Đinh kỳ.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30">
              <span className="font-bold text-purple-300 text-xs block">5. Sức Khỏe & Tật Bệnh</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Thiên Nhuệ, Tử Môn, Ất Kỳ (dược thảo).</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-indigo-500/30">
              <span className="font-bold text-indigo-300 text-xs block">6. Xuất Hành & Đàm Phán</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Hướng Cát Môn (Khai/Hưu/Sinh), Trực Sử.</span>
            </div>
          </div>

          <p className="text-slate-400 text-xs">
            👉 Mỗi mục đều có điểm đánh giá Cát/Hung, lời khuyên hành động và chiến lược chuyển hóa phong thủy cụ thể.
          </p>
        </div>
      ),
    },

    // BƯỚC 6: BÀN ĐẠI LỤC NHÂM & 24 TIẾT KHÍ NĂM
    {
      id: 'lucnham-and-astronomy',
      title: 'Đại Lục Nhâm Tam Thức & Bảng 24 Tiết Khí Toàn Niên',
      subtitle: 'Xem tiến trình Nhân sự qua Nguyệt Tướng - Tam Truyền và lịch thiên văn chính xác',
      icon: Compass,
      badge: 'Mở Rộng Tri Thức',
      color: 'emerald',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Hệ thống tích hợp liền mạch các công cụ thiên văn & cổ thuật mở rộng:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
              <h5 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Đại Lục Nhâm (Tam Truyền - Tứ Khóa)</span>
              </h5>
              <p className="text-[11px] text-slate-300">
                • Xác định chính xác <strong>Nguyệt Tướng Thiên Văn</strong> (theo mặt trời quá cung 24 Tiết Khí).
                <br />• Khám phá diễn tiến nhân sự: <strong>Sơ Truyền</strong> (khởi sự) ➔ <strong>Trung Truyền</strong> (chuyển biến) ➔ <strong>Mạt Truyền</strong> (kết quả cuối cùng).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <h5 className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-cyan-400" />
                <span>Bảng 24 Tiết Khí & Điểm Sóc Âm Lịch</span>
              </h5>
              <p className="text-[11px] text-slate-300">
                • Bảng tra cứu toàn niên 24 Tiết Khí với độ chính xác kinh độ hoàng đạo tới giây cung.
                <br />• Chi tiết các Điểm Sóc (Trăng Mới), Trăng Tròn (Vọng) và xuất báo cáo Markdown chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // BƯỚC 7: TRỢ LÝ AI LUẬN GIẢI CỔ THUẬT TOÀN NĂNG (OPENROUTER)
    {
      id: 'ai-metaphysics-advisor',
      title: 'Trợ Lý AI Luận Giải Cổ Thuật Toàn Năng',
      subtitle: 'Đối thoại thông minh cùng các mô hình AI hàng đầu (Gemini, DeepSeek, Claude, GPT)',
      icon: Sparkles,
      badge: 'Trí Tuệ Nhân Tạo',
      color: 'amber',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p className="text-slate-200">
            Bạn có thể trò chuyện trực tiếp với <strong>AI Luận Giải Cổ Thuật</strong> bất kỳ lúc nào để nhận giải đáp chuyên sâu cho mọi câu hỏi thực tế!
          </p>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-cyan-950/40 border border-amber-500/40 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Ưu Điểm Vượt Trội Của AI Chatbot:</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Tự Động Nạp Ngữ Cảnh Thời Gian Thực:</strong> AI tự đọc toàn bộ Bát Tự Tứ Trụ, 24 Tiết Khí, Bàn Kỳ Môn 9 Cung và Lục Nhâm hiện tại của bạn.
              </li>
              <li>
                <strong>Đa Dạng Mô Hình:</strong> Hỗ trợ Gemini 2.5 Flash, DeepSeek V3/R1, Claude 3.5 Sonnet, GPT-4o Mini qua OpenRouter.
              </li>
              <li>
                <strong>Bảo Mật Tuyệt Đối:</strong> Dán API Key cá nhân từ <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-semibold">openrouter.ai/keys</a>, lưu an toàn 100% trong trình duyệt.
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-400">
              Nhấp vào nút <Sparkles className="w-3.5 h-3.5 inline text-amber-400 mx-1" /> nổi ở góc phải màn hình hoặc trên thanh Header để mở AI Chatbot bất cứ lúc nào.
            </span>
            {onOpenAIChat && (
              <button
                type="button"
                onClick={() => {
                  handleFinish();
                  onOpenAIChat();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow transition-all shrink-0 cursor-pointer"
              >
                Mở AI Chatbot Ngay
              </button>
            )}
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  const step = steps[currentStep];
  const IconComponent = step.icon;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={handleFinish}
    >
      <div
        className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5">
          <div
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  {step.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Bước {currentStep + 1} / {steps.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-onboarding-tour"
            onClick={handleFinish}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Đóng tour hướng dẫn (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-slate-300 custom-scrollbar">
          <div className="text-xs sm:text-sm text-amber-400/90 font-medium">
            {step.subtitle}
          </div>
          {step.content}
        </div>

        {/* Modal Footer / Navigation Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Checkbox: Don't show again on load */}
          <label className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500/30 cursor-pointer"
            />
            <span>Đã hiểu, không tự động hiện lại khi vào trang</span>
          </label>

          {/* Buttons: Back / Next / Finish */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isFirstStep && (
              <button
                type="button"
                id="btn-tour-prev-step"
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay Lại</span>
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                id="btn-tour-next-step"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Tiếp Tục</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-tour-finish"
                onClick={handleFinish}
                className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Bắt Đầu Trải Nghiệm Ngay</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
