import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Compass,
  Sun,
  Moon,
  Layers,
  Users,
  User,
  Heart,
  HeartPulse,
  Coins,
  GraduationCap,
  Search,
  Scale,
  Sparkles,
  Shield,
  Star,
  DoorOpen,
  Calendar,
  Clock,
  ChevronRight,
  Info,
  Bot,
  Zap,
} from 'lucide-react';
import { APP_VERSION } from '../version';

interface AlgorithmGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmGuideModal: React.FC<AlgorithmGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  if (!isOpen) return null;

  const sections = [
    { id: 'astronomy', title: '1. Thiên Văn 24 Tiết Khí', icon: Sun },
    { id: 'lunar', title: '2. Điểm Sóc & Âm Lịch', icon: Moon },
    { id: 'dinhcuc', title: '3. Siêu Thần Tiếp Khí Nhuận Cục', icon: Compass },
    { id: 'structure', title: '4. Cấu Trúc Bàn 9 Cung Kỳ Môn', icon: Layers },
    { id: 'tam-ban', title: '5. Quy Luật Tam Bàn & Chủ Khách', icon: Users },
    { id: 'destiny', title: '6. Dự Trắc Thân Mệnh (Sang Hèn)', icon: User },
    { id: 'aspects', title: '7. 6 Phương Diện Đời Sống Cụ Thể', icon: Sparkles },
    { id: 'gemini-ai', title: '8. Luận Giải AI Gemini Trích Xuất Dụng Thần', icon: Bot },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Thuyết Minh Thuật Toán & Nguyên Lý Kỳ Môn
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  v{APP_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tài liệu thuyết minh toàn diện: Thiên Văn Meeus • Siêu Thần Tiếp Khí • Bàn 9 Cung • Dự Trắc Toàn Thư
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Quick Filters */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              activeSection === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tất Cả Mục
          </button>
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* SECTION 1: THIÊN VĂN 24 TIẾT KHÍ */}
          {(activeSection === 'all' || activeSection === 'astronomy') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Sun className="w-4 h-4 text-amber-400" />
                1. Thiên Văn 24 Tiết Khí & Phân Định Tiết / Khí (Jean Meeus Engine)
              </h4>
              <p>
                Hệ thống sử dụng mô hình thiên văn chính xác cao <strong>Jean Meeus (Astronomical Algorithms)</strong> kết hợp lý thuyết hành tinh <strong>VSOP87</strong>. Kinh độ Hoàng đạo Mặt Trời (&lambda;<sub>Sun</sub>) trải dài từ 0° &rarr; 360°. Cứ mỗi 15° Mặt Trời dịch chuyển sẽ xác lập thời điểm bắt đầu một Tiết Khí chính xác đến từng giây.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block mb-1">12 Tiết (Tiết Lệnh):</strong>
                  <p className="text-slate-300">
                    Lập Xuân (315°), Kinh Trập (345°), Thanh Minh (15°), Lập Hạ (45°), Mang Chủng (75°), Tiểu Thử (105°), Lập Thu (135°), Bạch Lộ (165°), Hàn Lộ (195°), Lập Đông (225°), Đại Tuyết (255°), Tiểu Hàn (285°).
                  </p>
                  <p className="text-slate-400 italic text-[11px] pt-1">
                    * Tiết là thời điểm chuyển giao chính thức sang Tháng mới trong Bát Tự Tứ Trụ (ví dụ: chạm Lập Xuân là bước sang Tháng Dần).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block mb-1">12 Khí (Trung Khí):</strong>
                  <p className="text-slate-300">
                    Vũ Thủy (330°), Xuân Phân (0°), Cốc Vũ (30°), Tiểu Mãn (60°), Hạ Chí (90°), Đại Thử (120°), Xử Thử (150°), Thu Phân (180°), Sương Giáng (210°), Tiểu Tuyết (240°), Đông Chí (270°), Đại Hàn (300°).
                  </p>
                  <p className="text-slate-400 italic text-[11px] pt-1">
                    * Trung Khí nằm giữa hai Tiết, đóng vai trò bản lề để định vị tháng âm lịch chính quy và xác định tháng nhuận.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: ĐIỂM SÓC & ÂM LỊCH */}
          {(activeSection === 'all' || activeSection === 'lunar') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-cyan-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Moon className="w-4 h-4 text-cyan-400" />
                2. Điểm Sóc (New Moon) & Quy Chuẩn Tháng Âm Lịch Thiên Văn
              </h4>
              <p>
                <strong>Điểm Sóc</strong> là thời điểm giao hội Nhật - Nguyệt khi hiệu số kinh độ Hoàng đạo (&lambda;<sub>Moon</sub> - &lambda;<sub>Sun</sub>) = 0°. Ngày dương lịch chứa Điểm Sóc theo kinh tuyến múi giờ Việt Nam (UTC+7) được quy ước là <strong>ngày Mùng 1</strong> của tháng âm lịch.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-300">• Tháng Đủ (30 ngày) và Tháng Thiếu (29 ngày):</strong> Xác định hoàn toàn tự động bằng khoảng cách thời gian giữa 2 Điểm Sóc liên tiếp.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-300">• Quy tắc Tháng 1 (Tháng Giêng):</strong> Tháng Giêng bắt buộc phải chứa Tiết <em>Lập Xuân</em> (315°) và Trung Khí <em>Vũ Thủy</em> (330°).
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-purple-300">• Quy tắc Tháng Nhuận:</strong> Trong năm âm lịch có 13 Điểm Sóc, tháng đầu tiên không chứa Trung Khí (hoặc thiếu cặp Tiết/Khí tương ứng) sẽ được ấn định là <strong>Tháng Nhuận</strong>.
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: SIÊU THẦN TIẾP KHÍ NHUẬN CỤC */}
          {(activeSection === 'all' || activeSection === 'dinhcuc') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-purple-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Compass className="w-4 h-4 text-purple-400" />
                3. Phương Pháp Định Cục Kỳ Môn: Siêu Thần - Tiếp Khí - Nhuận Cục
              </h4>
              <p>
                Mỗi Tiết Khí gồm 15 ngày, quản lý 3 Nguyên (Thượng Nguyên 5 ngày, Trung Nguyên 5 ngày, Hạ Nguyên 5 ngày). Chu kỳ 5 ngày gắn liền với Can Chi của <strong>Phù Đầu</strong> (ngày Can Giáp hoặc Kỷ).
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-300 font-bold block mb-1">Quy tắc Phân Tam Nguyên theo Phù Đầu:</span>
                  <p className="text-slate-300">
                    • <strong>Tý, Ngọ, Mão, Dậu:</strong> Khởi Thượng Nguyên.
                    <br />• <strong>Dần, Thân, Tị, Hợi:</strong> Khởi Trung Nguyên.
                    <br />• <strong>Thìn, Tuất, Sửu, Mùi:</strong> Khởi Hạ Nguyên.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-300 font-bold block mb-1">Quan Hệ Giữa Phù Đầu Thượng Nguyên & Tiết Khí:</span>
                  <div className="space-y-1 text-slate-300">
                    <p>• <strong>Chính Khí (0 ngày):</strong> Phù đầu Thượng Nguyên đến đúng ngày chuyển Tiết khí.</p>
                    <p>• <strong>Siêu Thần (1 &rarr; 9 ngày):</strong> Phù đầu Thượng Nguyên đến trước ngày chuyển Tiết khí ➔ Dùng Cục của Tiết khí kế tiếp.</p>
                    <p>• <strong>Tiếp Khí:</strong> Phù đầu Thượng Nguyên đến sau ngày chuyển Tiết khí ➔ Dùng Cục của Tiết khí hiện tại.</p>
                    <p>• <strong>Nhuận Cục (&gt; 9 ngày):</strong> Khi Siêu Thần vượt quá 9 ngày, khí lực quá tải, bắt buộc tiến hành Nhuận Cục (lặp lại 15 ngày Tam Nguyên của tiết Mang Chủng hoặc Đại Tuyết) để tái lập cân bằng với thiên văn.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: CẤU TRÚC BÀN 9 CUNG KỲ MÔN */}
          {(activeSection === 'all' || activeSection === 'structure') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Layers className="w-4 h-4 text-amber-400" />
                4. Cấu Trúc Bàn Kỳ Môn 9 Cung (Thiên - Địa - Nhân - Thần)
              </h4>
              <p>
                Bàn Kỳ Môn Độn Giáp hoàn chỉnh phối hợp chặt chẽ 4 tầng không gian và thời gian trên ma trận Lạc Thư:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400 block mb-1">1. Địa Bàn (9 Cung & Tam Kỳ Lục Nghi):</strong>
                  <p className="text-slate-300">
                    An Lục Nghi Tam Kỳ theo thứ tự: Mậu, Kỷ, Canh, Tân, Nhâm, Quý, Đinh, Bính, Ất. Dương Độn đi thuận, Âm Độn đi nghịch.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-400 block mb-1">2. Thiên Bàn (Cửu Tinh):</strong>
                  <p className="text-slate-300">
                    Sao Trực Phù theo Tuần Thủ Giáp bay tới Cung của Can Giờ trên Địa bàn, kéo theo vòng Cửu Tinh chuyển dịch theo chiều kim đồng hồ.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">3. Nhân Bàn (Bát Môn):</strong>
                  <p className="text-slate-300">
                    Cửa Trực Sử từ bản cung bay theo thứ tự số cung Lạc Thư đến Cung của Địa Chi Giờ, sau đó các môn xoay chuyển thuận chiều kim đồng hồ.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-purple-400 block mb-1">4. Thần Bàn (Bát Thần):</strong>
                  <p className="text-slate-300">
                    Trực Phù, Đằng Xà, Thái Âm, Lục Hợp, Bạch Hổ, Huyền Vũ, Cửu Địa, Cửu Thiên. Thần Trực Phù luôn đóng cùng Sao Trực Phù (Dương thuận Âm nghịch).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: TAM BÀN & CHỦ KHÁCH */}
          {(activeSection === 'all' || activeSection === 'tam-ban') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Users className="w-4 h-4 text-amber-400" />
                5. Quy Luật Tam Bàn & Phân Định Chủ - Khách Trong Chiêm Nghiệm
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block mb-1">Quy Luật Tam Bàn (Thiên - Nhân - Địa):</strong>
                  <p>• <strong>Xem cát hung chung:</strong> Trọng 9 Sao (Thiên bàn) &rarr; Sao khắc Môn thì cát, Môn khắc Sao thì hung.</p>
                  <p>• <strong>Xem đi xa, di chuyển, ẩn lánh:</strong> Trọng 8 Cửa (Nhân bàn) &rarr; Môn khắc Cung thì cát, Cung khắc Môn thì hung.</p>
                  <p>• <strong>Xem xây dựng, chôn cất, dời đổi:</strong> Trọng 9 Cung (Địa bàn) &rarr; Môn Cung tương sinh thì cát, tương khắc thì hung.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block mb-1">Quy Tắc Chủ - Khách:</strong>
                  <p>• <strong>Ta chủ động đi tìm người:</strong> Ta là Khách (Sao Thiên bàn), người khác là Chủ (Sao Địa bàn).</p>
                  <p>• <strong>Người khác chủ động tìm ta:</strong> Người đó là Khách (Sao Thiên bàn), ta là Chủ (Sao Địa bàn).</p>
                  <p>• <strong>Sinh khắc:</strong> Khách sinh Chủ (đại lợi cho Chủ); Chủ sinh Khách (hao tán cho Chủ); Khách khắc Chủ (Chủ chịu tổn thất); Chủ khắc Khách (Khách tự bại).</p>
                  <p className="text-slate-400 italic text-[11px]">
                    * Ngày Âm thì sao Thiên bàn là Ta; Ngày Dương thì sao Địa bàn là Ta; Tỷ hòa thì vô tổn ích.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: DỰ TRẮC THÂN MỆNH */}
          {(activeSection === 'all' || activeSection === 'destiny') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-emerald-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <User className="w-4 h-4 text-emerald-400" />
                6. Dự Trắc Thân Mệnh & Xem Kiếp Người Sang Hèn (Chiêm Nhân Sinh Quý Tiện)
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block mb-1">Hệ Thống Lục Thân Trên Lá Số:</strong>
                  <p>• <strong>Can Năm (Niên can):</strong> Cha Mẹ (Phụ mẫu).</p>
                  <p>• <strong>Can Tháng (Nguyệt can):</strong> Anh em (Huynh đệ).</p>
                  <p>• <strong>Can Ngày (Nhật can):</strong> Bản thân ta (Bản thân).</p>
                  <p>• <strong>Can Giờ (Thời can):</strong> Con nhỏ (Tử tức / Nhi).</p>
                  <p>• <strong>Thê thiếp (Vợ):</strong> Kỳ Ất (Vợ cả), Kỳ Đinh (Vợ lẽ/Người yêu).</p>
                  <p>• <strong>Chồng:</strong> Can Canh.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block mb-1">Nguyên Lý Vinh Khô, Tổ Nghiệp & Cô Hư:</strong>
                  <p>• <strong>Vinh hiển sang trọng:</strong> Các cung Lục Thân vượng tướng đắc Tam Kỳ nâng đỡ.</p>
                  <p>• <strong>Bần hàn khó khăn:</strong> Rơi vào cung Tử, Tù, Mộ, Tuyệt hoặc bị Kích hình xung phá.</p>
                  <p>• <strong>Sản nghiệp tổ tiên (Sinh Môn):</strong> Sinh môn đắc Kỳ phú quý; gặp Canh xung hãm phải ly hương; bị cung khắc bán sạch gia sản.</p>
                  <p>• <strong>Cô - Hư:</strong> Ngày gặp Cô, giờ gặp Hư &rarr; tuổi trẻ bơ vơ; Giờ gặp Cô, ngày gặp Hư &rarr; về già cô đơn góa bụa.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: 6 PHƯƠNG DIỆN ĐỜI SỐNG CỤ THỂ */}
          {(activeSection === 'all' || activeSection === 'aspects') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-rose-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Sparkles className="w-4 h-4 text-rose-400" />
                7. 6 Phương Diện Dự Trắc Đời Sống Cụ Thể (Kỳ Môn Xem Việc)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-pink-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> 1. Hôn Nhân & Thê Thiếp:
                  </strong>
                  <p>Canh là Chồng, Ất là Vợ, Lục Hợp là Người mối. Ất Canh tương sinh tương hợp tất thành lương duyên; tương khắc chê bai khó thành.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-emerald-300 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5" /> 2. Y Học, Trị Bệnh & Tìm Thầy:
                  </strong>
                  <p>Thiên Nhuế là Thần Bệnh (tra 8 cung nội tạng/bên ngoài). Sinh Môn là sống, Tử Môn là nguy kịch. Thiên Tâm & Kỳ Ất (Thầy thuốc) khắc được Thiên Nhuế mới khỏi bệnh.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5" /> 3. Cầu Tài & Giao Dịch:
                  </strong>
                  <p>Giáp Tý Mậu là Vốn, Sinh Môn là Lợi tức. Sinh Môn sinh Mậu bội thu; Mậu sinh Sinh Môn phải đổ thêm vốn. Nhật can (Mua), Thời can (Bán).</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-purple-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> 4. Thi Cử & Công Danh:
                  </strong>
                  <p>Nhật can là Sĩ tử, Trực Phù là Chủ khảo, Trực Sử là Giám khảo, Kỳ Đinh là Bài thi. Khai Môn thăng quan văn, Đỗ Môn thăng quan võ.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-blue-300 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" /> 5. Tìm Người & Mất Vật:
                  </strong>
                  <p>Can Ngày là chủ mất, Can Giờ là đồ vật mất (8 cung ngũ hành vật phẩm). Sao Thiên Bồng là kẻ trộm. Phản Ngâm nhanh tìm lại được.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-teal-300 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" /> 6. Kiện Tụng & Tranh Chấp:
                  </strong>
                  <p>Nhật can là Nguyên cáo, Thời can là Bị cáo, Trực Phù là Quan tòa hỏi cung. Kinh Môn & Cảnh Môn là đơn trạng văn thư.</p>
                </div>
              </div>
            </div>
          )}

          {/* Section 8: Luận Giải AI Gemini */}
          {(activeSection === 'all' || activeSection === 'gemini-ai') && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-3">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" />
                8. Thuật Toán Luận Giải AI Gemini &amp; Cấu Hình API Key Cá Nhân
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hệ thống tích hợp mô hình ngôn ngữ lớn <strong>Gemini 3.7 &amp; 2.5 Flash</strong> với cơ chế phân tích cấu trúc Bàn Kỳ Môn chuyên sâu, xử lý toàn bộ 4 tầng (Thiên Bàn, Nhân Bàn, Địa Bàn, Thần Bàn), hỗ trợ cấu hình API Key cá nhân lưu trực tiếp vào <strong>localStorage</strong> và truyền phát kết quả theo thời gian thực (Streaming SSE &amp; Direct Fallback):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-amber-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" /> Trích Xuất Toàn Bộ Dữ Liệu Bàn Kỳ Môn:
                  </strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                    <li>Dữ liệu 9 Cung đầy đủ: Can Thiên Bàn, Can Địa Bàn, Cửu Tinh, Bát Môn, Bát Thần.</li>
                    <li>Cục số (Âm/Dương độn), Tiết khí lệnh tháng, Tuần Thủ, Trực Phù, Trực Sử.</li>
                    <li>Trạng thái không gian: Tuần Không (Không Vong), Dịch Mã, Tam Kỳ Thăng Điện/Nhập Mộ, Cát Hung Cách Cục.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-purple-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-400" /> Cơ Chế Cấu Hình &amp; Dự Trắc Cổ Thư:
                  </strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                    <li><strong>Cấu hình API Key:</strong> Người dùng có thể nạp Google AI Studio API Key cá nhân, lưu vĩnh viễn trong trình duyệt.</li>
                    <li>Xác định chính xác <strong>Dụng Thần</strong> theo câu hỏi của người hỏi (Sự nghiệp, Cầu tài, Hôn nhân, Sức khỏe, Xuất hành, Kiện tụng).</li>
                    <li>Xét quan hệ Ngũ Hành sinh khắc giữa Cung Dụng Thần và Cung Can Ngày (Người hỏi) / Cung Can Giờ (Sự việc).</li>
                    <li>Đưa ra phương án hóa giải, thời điểm ứng kỳ và chiến lược Chủ - Khách hành động thực tế.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            <span>Tài liệu đối chiếu: </span>
            <span className="text-amber-300/90 font-serif italic">Kỳ Môn Độn Giáp Bí Kíp Toàn Thư & Jean Meeus Algorithms</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Đã Hiểu Toàn Bộ
          </button>
        </div>
      </div>
    </div>
  );
};
