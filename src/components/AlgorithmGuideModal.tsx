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
  Globe,
  Grid,
  Zap,
  CheckCircle2,
  HelpCircle,
  Award,
  Bookmark,
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
    { id: 'system-overview', title: '1. Hệ Thống Toàn Cảnh (Dành Cho Người Mới)', icon: Globe },
    { id: 'bat-trach', title: '2. Bát Trạch & 8 Phương Vị Nạp Khí', icon: Compass },
    { id: 'cuu-tinh', title: '3. Cửu Tinh Lạc Thư & Ma Trận 9 Cung', icon: Grid },
    { id: 'astronomy', title: '4. Thiên Văn 24 Tiết Khí', icon: Sun },
    { id: 'lunar', title: '5. Điểm Sóc & Âm Lịch Thiên Văn', icon: Moon },
    { id: 'ung-dung', title: '6. Mối Liên Hệ Hợp Nhất & Ứng Dụng Đời Sống', icon: Zap },
    { id: 'dinhcuc', title: '7. Siêu Thần Tiếp Khí Nhuận Cục', icon: Clock },
    { id: 'structure', title: '8. Cấu Trúc Bàn Kỳ Môn 9 Cung (4 Tầng)', icon: Layers },
    { id: 'tam-ban', title: '9. Quy Luật Tam Bàn & Chủ Khách', icon: Users },
    { id: 'destiny', title: '10. Dự Trắc Thân Mệnh (Sang Hèn)', icon: User },
    { id: 'aspects', title: '11. 6 Phương Diện Đời Sống Cụ Thể', icon: Sparkles },
    { id: 'evaluation', title: '12. Thuật Toán Đánh Giá Cát/Hung 5 Sao', icon: Award },
    { id: 'luc-nham', title: '13. Bí Tàng Đại Lục Nhâm Độn Đại Toàn', icon: Compass },
    { id: 'ux-ui', title: '14. Kiến Trúc Ma Trận Lạc Thư & Click-to-Modal', icon: Layers },
    { id: 'home-guide', title: '15. Cẩm Nang Tri Thức Trang Chủ & Toàn Thư Lục Nhâm', icon: BookOpen },
    { id: 'glossary', title: '16. Từ Điển Thuật Ngữ Kỳ Môn, Lục Nhâm & Thiên Văn', icon: Bookmark },
    { id: 'theme-mode', title: '17. Chế Độ Sáng / Tối (Auto & Custom Theme)', icon: Sun },
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
                  Cẩm Nang Tri Thức & Thuyết Minh Thuật Toán Toàn Cảnh
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  v{APP_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bát Trạch • Cửu Tinh Lạc Thư • 24 Tiết Khí • Điểm Sóc Âm Lịch • Mối Liên Hệ Hợp Nhất & Kỳ Môn Độn Giáp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Quick Filters */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
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
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
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
          {/* SECTION 1: HỆ THỐNG TOÀN CẢNH (CHO NGƯỜI MỚI TIẾP CẬN) */}
          {(activeSection === 'all' || activeSection === 'system-overview') && (
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <h4 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  1. Bức Tranh Toàn Cảnh: Mối Liên Hệ Tạo Thành Hệ Thống Vũ Trụ Hợp Nhất
                </h4>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Dành Cho Người Mới Bắt Đầu
                </span>
              </div>

              <p className="text-slate-300">
                Khi mới tiếp cận các môn cổ học phương Đông, người học thường cảm thấy bối rối vì có quá nhiều khái niệm tưởng chừng rời rạc: <em>Bát Trạch, Cửu Tinh Lạc Thư, 24 Tiết Khí, Điểm Sóc Âm Lịch, Bát Tự và Kỳ Môn Độn Giáp</em>. Tuy nhiên, cổ nhân không tạo ra những môn phái riêng rẽ, mà tất cả đều là <strong>4 Mảnh Ghép Của Một Hệ Tọa Độ Vũ Trụ Hợp Nhất (Thiên - Địa - Nhân - Thời - Không)</strong>:
              </p>

              {/* Sơ đồ 4 trụ cột */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {/* Trụ Cột 1: THỜI GIAN */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>TRỤC THỜI GIAN (THIÊN VẬN - MẶT TRỜI & MẶT TRĂNG)</span>
                  </div>
                  <p className="text-slate-300">
                    • <strong>24 Tiết Khí (Dương Lịch Khí):</strong> Đo lường chu kỳ chuyển động của Trái Đất quanh Mặt Trời, quyết định sự biến thiên của 4 mùa, nhiệt độ, sinh khí và dòng chảy năng lượng Âm - Dương trong năm.
                  </p>
                  <p className="text-slate-300">
                    • <strong>Điểm Sóc Âm Lịch (Chu Kỳ Trăng):</strong> Đo lường lực hấp dẫn và chu kỳ tròn khuyết của Mặt Trăng quanh Trái Đất, điều khiển thủy triều và tâm sinh lý con người.
                  </p>
                </div>

                {/* Trụ Cột 2: KHÔNG GIAN */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>TRỤC KHÔNG GIAN (ĐỊA THẾ - BÁT TRẠCH & LẠC THƯ)</span>
                  </div>
                  <p className="text-slate-300">
                    • <strong>Bát Trạch (8 Phương Vị Địa Lý):</strong> Chia không gian 360° theo 8 quẻ Hậu Thiên Bát Quái, xác định tính chất nạp khí (Cát/Hung) của từng phương hướng đối với ngôi nhà và con người.
                  </p>
                  <p className="text-slate-300">
                    • <strong>Cửu Tinh Lạc Thư (Ma Trận 9 Cung):</strong> Bản đồ ma phương 3x3 cân bằng năng lượng vũ trụ (tổng = 15), là tấm lưới số học để phân bổ trường năng lượng và các vì sao.
                  </p>
                </div>
              </div>

              {/* Điểm Giao Thoa: KỲ MÔN ĐỘN GIÁP */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-slate-900 border border-purple-500/40 space-y-2 text-xs">
                <div className="text-amber-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>ĐIỂM GIAO THOA HOÀN HẢO: KỲ MÔN ĐỘN GIÁP (THIÊN ĐỊA NHÂN HỢP NHẤT)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Khi <strong>Thời Gian (24 Tiết Khí & Can Chi)</strong> giao thoa với <strong>Không Gian (Bát Trạch 8 Hướng & 9 Cung Lạc Thư)</strong>, phương pháp <em>Siêu Thần Tiếp Khí</em> sẽ kích hoạt xoay chuyển 4 tầng bàn: <strong>Thiên Bàn (9 Sao - Thiên Thời), Nhân Bàn (8 Cửa - Nhân Hòa), Địa Bàn (9 Cung - Địa Lợi), Thần Bàn (8 Thần - Thần Trợ)</strong>. Từ đó giúp con người biết rõ thời điểm nào, tại phương vị nào đang chứa nguồn năng lượng cát lợi nhất để hành động thành công.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 2: BÁT TRẠCH */}
          {(activeSection === 'all' || activeSection === 'bat-trach') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Compass className="w-4 h-4 text-amber-400" />
                2. Ý Nghĩa Của Bát Trạch (Bát Quái Hậu Thiên & 8 Hướng Nạp Khí)
              </h4>
              <p>
                <strong>Bát Trạch</strong> (8 Ngôi nhà / 8 Hướng khí) là hệ thống phong thủy chia mặt bằng không gian 360° thành 8 phương vị tương ứng với 8 quẻ Hậu Thiên Bát Quái của Chu Văn Vương. Mỗi phương vị đại diện cho một dạng năng lượng tự nhiên, một hiện tượng vũ trụ và một thành viên trong gia đình:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-cyan-300 font-bold block">1. Cung Khảm (Bắc - Thủy):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Nước, dòng chảy, trí tuệ sâu thẳm, hiểm nạn, thận/tai, đại diện cho Trung Nam.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-300 font-bold block">2. Cung Khôn (Tây Nam - Thổ):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Đất mẹ, sự dung nạp, hậu phương nuôi dưỡng, bao dung, dạ dày, Người Mẹ/Người vợ.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-300 font-bold block">3. Cung Chấn (Đông - Mộc):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Sấm sét, sự bừng tỉnh mùa xuân, hành động dũng mãnh, gan/chân, Trưởng Nam.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-green-300 font-bold block">4. Cung Tốn (Đông Nam - Mộc):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Gió mát, uyển chuyển, tri thức, tài lộc sinh sôi, danh tiếng, mật, Trưởng Nữ.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-200 font-bold block">6. Cung Càn (Tây Bắc - Kim):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Trời, quyền uy tối thượng, lãnh đạo, kỷ cương, đầu/phổi, Người Cha/Trụ cột.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-rose-300 font-bold block">7. Cung Đoài (Tây - Kim):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Đầm hồ, niềm vui, ca hát, giao tiếp, hùng biện, miệng/răng, Thiếu Nữ (Con gái út).</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-yellow-300 font-bold block">8. Cung Cấn (Đông Bắc - Thổ):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Núi non, sự tĩnh lặng dừng nghỉ trước khi bừng sáng, tích lũy, tay/lưng, Thiếu Nam.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-red-300 font-bold block">9. Cung Ly (Nam - Hỏa):</span>
                  <p className="text-slate-300 text-[11px] mt-1">Lửa, ánh sáng mặt trời rực rỡ, văn minh, công danh sáng tỏ, tim/mắt, Trung Nữ.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="text-amber-300 font-bold">Phân Nhóm Đông Tứ Trạch & Tây Tứ Trạch:</span>
                <p className="mt-1">
                  • <strong>Đông Tứ Trạch:</strong> Khảm (1), Chấn (3), Tốn (4), Ly (9) &rarr; Thuộc Thủy, Mộc, Hỏa sinh dưỡng lẫn nhau, hướng về nguồn năng lượng Dương quang phát triển.
                  <br />• <strong>Tây Tứ Trạch:</strong> Khôn (2), Càn (6), Đoài (7), Cấn (8) &rarr; Thuộc Kim, Thổ tương sinh vững chắc, hướng về sự ổn định, kỷ cương và tích lũy.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 3: CỬU TINH LẠC THƯ */}
          {(activeSection === 'all' || activeSection === 'cuu-tinh') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-cyan-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Grid className="w-4 h-4 text-cyan-400" />
                3. Ý Nghĩa Của Cửu Tinh Lạc Thư & Ma Trận Ma Phương 3x3
              </h4>
              <p>
                <strong>Lạc Thư</strong> là đồ hình cổ xưa huyền diệu được khắc trên mai rùa thần thời Đại Vũ trị thủy. Lạc Thư phân bố 9 con số từ 1 đến 9 trên ma trận 3x3 hoàn hảo: tổng của bất kỳ hàng ngang, cột dọc hay đường chéo nào đều chính xác bằng <strong>15</strong> (số ngày của 1 Tiết Khí).
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                <span className="text-amber-300 font-bold block font-sans mb-1">Khẩu Quyết Định Cung Lạc Thư:</span>
                <p className="text-slate-300">
                  <em>"Đới cửu lý nhất (Đầu đội 9, chân đạp 1),<br />
                  Tả tam hữu thất (Trái 3, phải 7),<br />
                  Nhị tứ vi kiên (2 và 4 làm hai vai),<br />
                  Lục bát vi túc (6 và 8 làm hai chân),<br />
                  Ngũ cư trung cung (5 ở chính giữa trung tâm)."</em>
                </p>
              </div>

              <p className="text-xs text-slate-300">
                Mỗi cung số Lạc Thư gắn liền với một ngôi sao trong <strong>Cửu Tinh Bắc Đẩu</strong>, quy định trường khí đặc trưng:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-300 block">Nhất Bạch Tham Lang (1 - Thủy):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ tài lộc, đào hoa, danh tiếng học vấn, xuất ngoại.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400 block">Nhị Hắc Cự Môn (2 - Thổ):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ bệnh phù, ốm đau, nhưng cũng chủ điền sản đất đai.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400 block">Tam Bích Lộc Tồn (3 - Mộc):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ thị phi, tranh chấp, kiện tụng nhưng có tính đột phá.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-green-400 block">Tứ Lục Văn Khúc (4 - Mộc):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ thi cử đỗ đạt, văn chương nghệ thuật, danh vọng.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-yellow-300 block">Ngũ Hoàng Liêm Trinh (5 - Thổ):</strong>
                  <span className="text-slate-400 text-[11px]">Trung Cung, uy lực lớn nhất, chủ biến động, đại họa sát.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-slate-300 block">Lục Bạch Vũ Khúc (6 - Kim):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ quyền uy, lãnh đạo quan trường, thiên tài (lộc bất ngờ).</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-rose-300 block">Thất Xích Phá Quân (7 - Kim):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ phá bại, trộm cướp, khẩu thiệt, mổ xẻ tổn thương.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-300 block">Bát Bạch Tả Phụ (8 - Thổ):</strong>
                  <span className="text-slate-400 text-[11px]">Đại cát tinh đương vận, chủ tài lộc chân chính, nhà cửa thịnh.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-red-400 block">Cửu Tử Hữu Bật (9 - Hỏa):</strong>
                  <span className="text-slate-400 text-[11px]">Chủ hỷ khánh, hôn nhân, thăng tiến, ánh sáng trí tuệ.</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: THIÊN VĂN 24 TIẾT KHÍ */}
          {(activeSection === 'all' || activeSection === 'astronomy') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Sun className="w-4 h-4 text-amber-400" />
                4. Ý Nghĩa Của 24 Tiết Khí (Dương Lịch Thiên Văn Mặt Trời & 4 Mùa)
              </h4>
              <p>
                <strong>24 Tiết Khí</strong> thực chất là <strong>Dương Lịch thuần túy theo kinh độ Hoàng đạo Mặt Trời</strong> (&lambda;<sub>Sun</sub> từ 0° &rarr; 360°). Cứ mỗi 15° Mặt Trời dịch chuyển sẽ xác lập thời điểm bắt đầu một Tiết Khí chính xác đến từng giây. Đây là thước đo quy luật chuyển hóa Âm - Dương của Trời Đất:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block mb-1">12 Tiết (Tiết Lệnh) - Mốc Chuyển Tháng:</strong>
                  <p className="text-slate-300">
                    Lập Xuân (315°), Kinh Trập (345°), Thanh Minh (15°), Lập Hạ (45°), Mang Chủng (75°), Tiểu Thử (105°), Lập Thu (135°), Bạch Lộ (165°), Hàn Lộ (195°), Lập Đông (225°), Đại Tuyết (255°), Tiểu Hàn (285°).
                  </p>
                  <p className="text-slate-400 italic text-[11px] pt-1">
                    * Là thời điểm chuyển giao chính thức sang Tháng mới trong Bát Tự Tứ Trụ (ví dụ: chạm Lập Xuân là bước sang Tháng Dần, bất kể ngày âm lịch là ngày nào).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block mb-1">12 Khí (Trung Khí) - Mốc Cân Bằng & Định Tháng Nhuận:</strong>
                  <p className="text-slate-300">
                    Vũ Thủy (330°), Xuân Phân (0°), Cốc Vũ (30°), Tiểu Mãn (60°), Hạ Chí (90°), Đại Thử (120°), Xử Thử (150°), Thu Phân (180°), Sương Giáng (210°), Tiểu Tuyết (240°), Đông Chí (270°), Đại Hàn (300°).
                  </p>
                  <p className="text-slate-400 italic text-[11px] pt-1">
                    * Trung Khí nằm giữa hai Tiết, là chiếc chìa khóa quyết định tên tháng âm lịch chính quy và xác định tháng Nhuận.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: ĐIỂM SÓC & ÂM LỊCH */}
          {(activeSection === 'all' || activeSection === 'lunar') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-lg">
              <h4 className="font-bold text-cyan-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Moon className="w-4 h-4 text-cyan-400" />
                5. Ý Nghĩa Của Điểm Sóc (New Moon), Tháng Nhuận & Chu Kỳ Năm Âm Lịch Thiên Văn
              </h4>
              <p>
                <strong>Điểm Sóc (New Moon)</strong> là thời điểm giao hội Nhật - Nguyệt khi hiệu số kinh độ Hoàng đạo (&lambda;<sub>Moon</sub> - &lambda;<sub>Sun</sub>) = 0°. Lúc này Mặt Trăng nằm giữa Mặt Trời và Trái Đất, hoàn toàn quay mặt tối về phía Trái Đất.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-300">• Quy ước Mùng 1 Đầu Tháng:</strong> Ngày dương lịch chứa Điểm Sóc theo múi giờ Việt Nam (UTC+7) được quy ước là <strong>ngày Mùng 1</strong> của tháng âm lịch.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-amber-300">• Tháng Đủ (30 ngày) & Tháng Thiếu (29 ngày):</strong> Xác định hoàn toàn tự động bằng khoảng cách thời gian giữa 2 Điểm Sóc liên tiếp (chu kỳ tuần trăng trung bình là 29.53059 ngày).
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 bg-emerald-950/20 space-y-1">
                  <strong className="text-emerald-300 block">• Tích Hợp Lịch Tra Cứu Nhanh Trực Tiếp Trong Nhóm Điểm Sóc:</strong>
                  <p className="text-slate-300">
                    Hỗ trợ chọn ngày/tháng/năm nhanh chóng với giao diện Lịch Tra Cứu Nhanh (MiniCalendar) đặt ngay cạnh thẻ Điểm Sóc, cho phép nhảy nhanh đến bất kỳ mốc thời gian nào để quan sát ngay sự biến thiên của tuần trăng, 4 pha Mặt Trăng và tọa độ âm lịch tương ứng.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 bg-cyan-950/20 space-y-1">
                  <strong className="text-cyan-300 block">• Tọa Độ Thời Gian Dương Lịch Của Từng Tháng Âm Lịch:</strong>
                  <p className="text-slate-300">
                    Mỗi tháng trong 12 hoặc 13 tháng của năm Âm lịch đều được định vị chính xác từ thời điểm Điểm Sóc khởi đầu (Mùng 1 - Giờ:Phút:Giây, Ngày/Tháng/Năm Dương lịch) đến Điểm Sóc kế tiếp kết thúc tháng, kèm danh sách các Tiết Khí diễn ra trong tháng.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 bg-purple-950/20 space-y-2">
                  <strong className="text-purple-300 block text-xs">• Thuật Toán Thiên Văn Xác Định Tháng Nhuận & Chu Kỳ 13 Tháng (Mốc Đông Chí & Vô Trung Khí Pháp):</strong>
                  <ul className="text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>1. Quét Điểm Sóc & Tiết Khí Dải Rộng:</strong> Tính toán tất cả các thời điểm Sóc (New Moon) và 24 Tiết Khí (đặc biệt là 12 Trung Khí) trong phạm vi đa năm quanh thời điểm khảo sát.
                    </li>
                    <li>
                      <strong>2. Mốc Cứng Đông Chí = Tháng 11 Âm Lịch:</strong> Xác định ngày giờ diễn ra điểm Đông Chí (Mặt Trời đạt kinh độ 270°) của năm trước và năm đang xét. Tháng âm lịch (nằm giữa 2 điểm Sóc liên tiếp) nào chứa thời khắc Đông Chí sẽ được <strong>gán cứng cố định là Tháng 11 Âm Lịch</strong>.
                    </li>
                    <li>
                      <strong>3. Đếm Số Tháng Giữa 2 Lần Đông Chí Liên Tiếp:</strong>
                      <br />• Nếu có <strong>12 tháng</strong>: Chu kỳ bình thường (Năm thường không nhuận).
                      <br />• Nếu có <strong>13 tháng</strong>: Chu kỳ có tháng nhuận. Hệ thống tìm tháng đầu tiên nằm giữa 2 lần Đông Chí mà <strong>không chứa bất kỳ Trung Khí nào (Vô Trung Khí)</strong> để đánh dấu là <strong>Tháng Nhuận</strong>.
                    </li>
                    <li>
                      <strong>4. Lan Tỏa Số Thứ Tự Tháng Từ Mốc Tháng 11:</strong> Từ Tháng 11 (mốc Đông Chí), lan tỏa số thứ tự sang hai phía: tiến tới Tháng 12 (Chạp), Tháng 1 (Tháng Giêng năm mới), Tháng 2... (nếu gặp tháng Vô Trung Khí thì gán là Tháng Nhuận lặp lại số hiệu tháng trước), và lùi về Tháng 10, Tháng 9...
                    </li>
                    <li>
                      <strong>5. Cấu Trúc Trọn Vẹn Năm Âm Lịch (Can Chi):</strong> Toàn bộ các tháng từ Tháng 1 (Giêng) đến Tháng 12 (Chạp) (cộng thêm Tháng Nhuận nếu có) tạo thành trọn vẹn 12 hoặc 13 tháng của Năm Âm Lịch.
                    </li>
                  </ul>
                  <p className="text-slate-400 text-[11px] pt-1">
                    Chu kỳ Meton (19 năm Dương lịch = 235 tuần trăng = 19 năm Âm lịch + 7 Tháng Nhuận) đảm bảo các mùa trong năm và Tết cổ truyền luôn quay về đúng chu kỳ tuần hoàn tự nhiên của Trái Đất quanh Mặt Trời.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: MỐI LIÊN HỆ HỢP NHẤT & ỨNG DỤNG ĐỜI SỐNG */}
          {(activeSection === 'all' || activeSection === 'ung-dung') && (
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/40 space-y-3.5 shadow-xl">
              <h4 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                <Zap className="w-5 h-5 text-emerald-400" />
                6. Mối Liên Hệ Hợp Nhất & Ý Nghĩa Ứng Dụng Thực Tiễn Trong Cuộc Sống
              </h4>

              <p className="text-xs sm:text-sm text-slate-300">
                Làm thế nào để ứng dụng hệ thống Bát Trạch, Lạc Thư, Tiết Khí và Âm Lịch vào đời sống hàng ngày? Dưới đây là 4 trụ cột ứng dụng cốt lõi:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                {/* Ứng dụng 1: Thiên Thời */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>1. ĐẮC THIÊN THỜI (DƯỠNG SINH & KHỞI SỰ THUẬN TỰ NHIÊN)</span>
                  </div>
                  <p>
                    • <strong>Dưỡng sinh theo 24 Tiết khí:</strong> Xuân sinh (mở rộng tâm trí, giải độc gan), Hạ trưởng (vận động bồi bổ tim), Thu thu (thu liễm dưỡng phổi), Đông tàng (bảo tồn năng lượng dưỡng thận).
                    <br />• <strong>Khởi sự:</strong> Tránh các ngày giao tiết khí khí trường hỗn loạn; chọn ngày Sóc Vọng (Mùng 1, Rằm) để cân bằng tâm thế và khởi tạo kế hoạch mới.
                  </p>
                </div>

                {/* Ứng dụng 2: Địa Lợi */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>2. ĐẮC ĐỊA LỢI (PHONG THỦY BÁT TRẠCH & KHAI THÔNG KHÍ TRƯỜNG)</span>
                  </div>
                  <p>
                    • <strong>Định vị không gian:</strong> Bố trí bàn làm việc, cửa chính, phòng ngủ hướng vào cung Sinh Khí, Diên Niên, Thiên Y theo Bát Trạch.
                    <br />• <strong>Hóa giải hung tinh:</strong> Tra cứu cung đóng của sao Nhị Hắc (bệnh tật) và Ngũ Hoàng (tai ương) trên Cửu Cung Lạc Thư để giữ tĩnh lặng, đặt vật phẩm hóa giải.
                  </p>
                </div>

                {/* Ứng dụng 3: Nhân Hòa & Kỳ Môn Trạch Cát */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>3. ĐẮC NHÂN HÒA (KỲ MÔN TRẠCH CÁT & XUẤT HÀNH HÀNH ĐỘNG)</span>
                  </div>
                  <p>
                    • <strong>Xuất hành mưu sự:</strong> Chọn giờ và phương vị có Tam Kỳ (Ất, Bính, Đinh) hội cùng Tam Cát Môn (Khai, Hưu, Sinh) và Thần Trực Phù/Thái Âm để đàm phán, ký kết, cầu tài.
                    <br />• <strong>Chiến lược Chủ - Khách:</strong> Biết khi nào nên chủ động tiến công (làm Khách), khi nào nên tĩnh lặng chờ thời cơ (làm Chủ).
                  </p>
                </div>

                {/* Ứng dụng 4: Dự Trắc & Ra Quyết Định */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>4. DỰ TRẮC SỰ VIỆC & LÀM CHỦ VẬN THẾ</span>
                  </div>
                  <p>
                    • <strong>Soi rọi tương lai:</strong> Sử dụng hệ thống 8 cung Dụng Thần trong trang <em>"Dự Trắc Kỳ Môn"</em> để nhìn thấu bản chất của công danh sự nghiệp, tài vận, hôn nhân, sức khỏe, tìm đồ mất và kiện tụng.
                    <br />• <strong>Mục tiêu tối thượng:</strong> Giúp con người "Tri mệnh - Thuận thời - Hành động sáng suốt" để làm chủ cuộc đời.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: SIÊU THẦN TIẾP KHÍ NHUẬN CỤC */}
          {(activeSection === 'all' || activeSection === 'dinhcuc') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-purple-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Clock className="w-4 h-4 text-purple-400" />
                7. Phương Pháp Định Cục Kỳ Môn: Siêu Thần - Tiếp Khí - Nhuận Cục
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

          {/* SECTION 8: CẤU TRÚC BÀN 9 CUNG KỲ MÔN */}
          {(activeSection === 'all' || activeSection === 'structure') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Layers className="w-4 h-4 text-amber-400" />
                8. Cấu Trúc Bàn Kỳ Môn 9 Cung (Thiên - Địa - Nhân - Thần)
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

          {/* SECTION 9: TAM BÀN & CHỦ KHÁCH */}
          {(activeSection === 'all' || activeSection === 'tam-ban') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Users className="w-4 h-4 text-amber-400" />
                9. Quy Luật Tam Bàn & Phân Định Chủ - Khách Trong Chiêm Nghiệm
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

          {/* SECTION 10: DỰ TRẮC THÂN MỆNH */}
          {(activeSection === 'all' || activeSection === 'destiny') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-emerald-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <User className="w-4 h-4 text-emerald-400" />
                10. Dự Trắc Thân Mệnh & Xem Kiếp Người Sang Hèn (Chiêm Nhân Sinh Quý Tiện)
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

          {/* SECTION 11: 6 PHƯƠNG DIỆN ĐỜI SỐNG CỤ THỂ */}
          {(activeSection === 'all' || activeSection === 'aspects') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
              <h4 className="font-bold text-rose-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Sparkles className="w-4 h-4 text-rose-400" />
                11. 6 Phương Diện Dự Trắc Đời Sống Cụ Thể (Kỳ Môn Xem Việc)
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

          {/* SECTION 12: THUẬT TOÁN ĐÁNH GIÁ CÁT / HUNG 5 SAO */}
          {(activeSection === 'all' || activeSection === 'evaluation') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-slate-800/80">
                <Award className="w-4 h-4 text-amber-400" />
                12. Thuật Toán Đánh Giá Cát / Hung Mốc Thời Gian (Thang Điểm 5 Sao)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hệ thống đánh giá độ tốt/xấu của một mốc thời gian cụ thể (giờ/ngày) dựa trên sự kết hợp ma trận 4 chiều giữa <strong className="text-amber-300">Thiên bàn</strong>, <strong className="text-amber-300">Địa bàn</strong>, <strong className="text-amber-300">Nhân bàn (Bát Môn/Cung)</strong>, <strong className="text-amber-300">Thần bàn</strong> và hai cung chúa tể <strong className="text-amber-300">Trực Phù & Trực Sử</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>1. Thập Can Khắc Ứng (Thiên/Địa)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">20%</span>
                  </div>
                  <p className="text-slate-300">
                    Phối hợp 100 cặp Can Thiên bàn / Can Địa bàn: Thưởng điểm Cát cách (Thanh Long Phản Thủ, Phi Điểu Điệt Huyệt...) và phạt điểm Hung cách (Lục Nghi Kích Hình, Tam Kỳ Nhập Mộ, Bạch Hổ Cuồng Tố...).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>2. Môn Cung Sinh Khắc (Nhân/Địa)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">20%</span>
                  </div>
                  <p className="text-slate-300">
                    Bát Môn lâm 9 Cung: Môn Sinh Cung (Đại Cát), Cung Sinh Môn (Cát), Tỷ Hòa (Bình), Môn Bách (Cửa khắc Cung - Đại Hung), Cung Bách (Cung khắc Cửa - Hung). Ưu tiên Tam Cát Môn (Khai, Hưu, Sinh).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <span>3. Cung Trực Phù & Trực Sử</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">30%</span>
                  </div>
                  <p className="text-slate-300">
                    Trực Phù (Thiên Ất Tướng Soái) và Trực Sử (Quan Chấp Pháp lãnh ấn). Cung có Trực Phù và Trực Sử đáo mang trọng số quyết định toàn bàn; nếu gặp Tuần Không hoặc Môn Bách sẽ làm giảm điểm tổng lực.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>4. Thần Trợ, Tinh Lực & Thần Sát</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">30%</span>
                  </div>
                  <p className="text-slate-300">
                    Tích hợp 9 Độn (Thiên/Địa/Nhân/Thần Độn), Tam Trá, Ngũ Giả, Thần Sát (Lộc Vị, Quý Nhân, Dịch Mã) cộng điểm lớn; Phục Ngâm/Phản Ngâm toàn bàn trừ điểm và hướng dẫn chiến lược Chủ/Khách.
                  </p>
                </div>
              </div>

              {/* Thang quy đổi 5 sao */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                <div className="font-bold text-slate-200">Quy Chuẩn Thang Điểm 5 Sao:</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    <div className="font-bold">4.5 - 5.0 ⭐</div>
                    <div className="text-[10px] text-slate-400">Đại Cát (≥80đ)</div>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    <div className="font-bold">3.8 - 4.4 ⭐</div>
                    <div className="text-[10px] text-slate-400">Tiểu Cát (66-79đ)</div>
                  </div>
                  <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300">
                    <div className="font-bold">2.8 - 3.7 ⭐</div>
                    <div className="text-[10px] text-slate-400">Bình Hòa (48-65đ)</div>
                  </div>
                  <div className="p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    <div className="font-bold">1.8 - 2.7 ⭐</div>
                    <div className="text-[10px] text-slate-400">Tiểu Hung (34-47đ)</div>
                  </div>
                  <div className="p-2 rounded bg-rose-950 border border-rose-600/40 text-rose-200">
                    <div className="font-bold">1.0 - 1.7 ⭐</div>
                    <div className="text-[10px] text-slate-400">Đại Hung (&lt;34đ)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 13: BÍ TÀNG ĐẠI LỤC NHÂM ĐỘN ĐẠI TOÀN */}
          {(activeSection === 'all' || activeSection === 'luc-nham') && (
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-500/30 space-y-4 shadow-lg">
              <h4 className="font-bold text-indigo-400 text-sm sm:text-base flex items-center gap-2 pb-2 border-b border-indigo-900/50">
                <Compass className="w-4 h-4 text-indigo-400" />
                13. Bí Tàng Đại Lục Nhâm Độn Đại Toàn (Quy Trình Lập Quẻ Chuẩn Mực)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Đại Lục Nhâm là thuật số đứng đầu trong Cổ Tam Thức (Kỳ Môn - Lục Nhâm - Thái Ất), chuyên sâu về nhân sự, biến hóa tình huống và dự trắc thời khắc vi diệu. Quá trình lập bàn quẻ tuân theo 6 bước kinh điển:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                    <span>Bước 1: Xác Định Can Chi & Nguyệt Tướng Theo 24 Tiết Khí</span>
                  </div>
                  <p className="text-slate-300">
                    Thu thập Can Chi của Ngày và Chi của Giờ. Nguyệt Tướng xác định chuẩn xác dựa trên Kinh độ Mặt Trời (Solar Longitude): Vũ Thủy (Hợi - Đăng Minh), Xuân Phân (Tuất - Hà Khôi), Cốc Vũ (Dậu - Tòng Khôi), Tiểu Mãn (Thân - Truyền Tống), Hạ Chí (Mùi - Tiểu Cát), Đại Thử (Ngọ - Thắng Quang), Xử Thử (Tị - Thái Ất), Thu Phân (Thìn - Thiên Cương), Sương Giáng (Mão - Thái Xung), Tiểu Tuyết (Dần - Công Tào), Đông Chí (Sửu - Đại Cát), Đại Hàn (Tý - Thần Hậu).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">2</span>
                    <span>Bước 2: Lập Địa Bàn & An Thiên Bàn</span>
                  </div>
                  <p className="text-slate-300">
                    Địa bàn 12 Cung Tý..Hợi cố định phương vị. Đặt <strong>Nguyệt Tướng đè lên Chi của Giờ</strong> chiêm trên Địa bàn, rồi xoay thuận chiều kim đồng hồ 11 Địa Chi Thiên bàn tương ứng.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
                    <span>Bước 3: An Tứ Khoa (Bốn Trụ Năng Lượng Can Chi)</span>
                  </div>
                  <p className="text-slate-300">
                    Tra Ký Cung của Thiên Can ngày (Giáp Dần, Ất Thìn, Bính/Mậu Tị, Đinh/Kỷ Mùi, Canh Thân, Tân Tuất, Nhâm Hợi, Quý Sửu). 
                    <br />• <strong>Khoa 1:</strong> Can Thượng Thần / Can Địa Bàn (Bản thân, chủ thể)
                    <br />• <strong>Khoa 2:</strong> Can Thượng Thần Thượng Thần / Can Thượng Thần (Mưu kín, nội tâm)
                    <br />• <strong>Khoa 3:</strong> Chi Thượng Thần / Chi Địa Bàn (Đối phương, nhà cửa, nơi chốn)
                    <br />• <strong>Khoa 4:</strong> Chi Thượng Thần Thượng Thần / Chi Thượng Thần (Biến cố tiềm ẩn, hậu quả)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-purple-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">4</span>
                    <span>Bước 4: Khởi Tam Truyền Dựa Vào Cửu Tông Môn</span>
                  </div>
                  <p className="text-slate-300">
                    Áp dụng 9 môn phát đoán lọc quẻ: <strong>Nguyên Thủ khóa</strong> (1 Thượng khắc Hạ), <strong>Trùng Thẩm khóa</strong> (1 Hạ khắc Thượng), <strong>Tỷ Dụng khóa</strong> (Đồng khí Âm Dương với Can), <strong>Thiệp Hại khóa</strong> (So độ sâu cạn khi kinh qua cung khắc), <strong>Dao Khắc khóa</strong> (Can Thượng dao khắc), <strong>Mão Tinh khóa</strong> (Can Dương lấy Dậu, Can Âm lấy Mão), <strong>Biệt Trạch / Bát Chuyên</strong>, <strong>Phục Ngâm & Phản Ngâm</strong>. 
                    <br />• <strong>Trung Truyền</strong> = Thiên bàn đè lên Sơ Truyền; <strong>Mạt Truyền</strong> = Thiên bàn đè lên Trung Truyền.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">5</span>
                    <span>Bước 5: An 12 Thiên Tướng (Thập Nhị Thần Tướng)</span>
                  </div>
                  <p className="text-slate-300">
                    Phân biệt <strong>Đán Quý (Ban ngày: Mão..Thân)</strong> và <strong>Dạ Quý (Ban đêm: Dậu..Dần)</strong>. An Quý Nhân theo Can ngày: Giáp/Mậu/Canh (Sửu/Mùi), Ất/Kỷ (Tý/Thân), Bính/Đinh (Hợi/Dậu), Nhâm/Quý (Tị/Mão), Tân (Ngọ/Dần). Nếu Quý Nhân lâm cung Hợi..Tị (nửa Đông) $\rightarrow$ An THUẬN; lâm Ngọ..Tuất (nửa Tây) $\rightarrow$ An NGHỊCH 11 tướng: Đằng Xà, Chu Tước, Lục Hợp, Câu Trận, Thanh Long, Thiên Không, Bạch Hổ, Thái Thường, Huyền Vũ, Thái Âm, Thiên Hậu.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[10px]">6</span>
                    <span>Bước 6: An Tuần Không, Thần Sát & Chiêm Đoán 6 Chuyên Đề</span>
                  </div>
                  <p className="text-slate-300">
                    Xác định 2 cung Không Vong theo Lục Tuần Giáp, tra Lộc Thần, Dịch Mã, Dương Nhận, Thái Tuế. Kết hợp Lục Thân (Huynh Đệ, Tử Tôn, Thê Tài, Quan Quỷ, Phụ Mẫu) để dự trắc chuẩn xác 6 chuyên đề: Cầu Tài, Hôn Nhân, Quan Vận, Bệnh Tật, Kiện Tụng, Xuất Hành.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MỤC 14: KIẾN TRÚC GIAO DIỆN MA TRẬN LẠC THƯ & CLICK-TO-MODAL */}
          {(activeSection === 'all' || activeSection === 'ux-ui') && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm sm:text-base border-b border-amber-500/20 pb-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>14. Kiến Trúc UX/UI Ma Trận Lạc Thư 3x3 & Tương Tác Click-to-Modal (v2.12.0)</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Phiên bản v2.12.0 tối ưu hóa toàn diện trải nghiệm người dùng với mô hình kiến trúc giao diện hiện đại, giữ nguyên 100% logic thuật toán cổ truyền:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                    <span>Dải Header Thiên Văn Hợp Nhất</span>
                  </div>
                  <p className="text-slate-300">
                    Gom gọn đồng hồ thời gian thực (Live clock), Lịch Âm Dương, Can Chi Tứ Trụ (Năm, Tháng, Ngày, Giờ) và Tiết Khí vào một dải băng thông tin trên cùng, giải phóng toàn bộ không gian làm việc chính.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px]">2</span>
                    <span>Tab Switcher Tam Thức Trực Tiếp</span>
                  </div>
                  <p className="text-slate-300">
                    Hai nút chuyển đổi <code>[ Kỳ Môn Độn Giáp ]</code> và <code>[ Đại Lục Nhâm ]</code> đặt ngay góc trên bàn cờ cho phép chiêm nghiệm và so sánh đồng thời 2 môn bí truyền tại cùng một thời khắc.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
                    <span>Lưới Grid 3x3 Chuẩn Ma Trận Lạc Thư</span>
                  </div>
                  <p className="text-slate-300">
                    Bố trí 9 cung theo phương vị chuẩn: Hàng trên (Tốn 4 - Ly 9 - Khôn 2), Hàng giữa (Chấn 3 - Trung 5 - Đoài 7), Hàng dưới (Cấn 8 - Khảm 1 - Càn 6). Mỗi ô hiển thị súc tích Thần - Sao - Cửa - Can và các Thần sát nổi bật.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">4</span>
                    <span>Cơ Chế Click-to-Modal / Drawer Toàn Diện</span>
                  </div>
                  <p className="text-slate-300">
                    Nhấp vào bất kỳ ô cung nào để mở Modal chi tiết (Thập Can Khắc Ứng, Môn Cung Sinh Khắc, 4 Tầng Bàn, Cách Cục Cát Hung, Thần Sát) trên nền mờ, không làm xáo trộn hay kéo dãn trang chính.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 15: Home Knowledge Guide & Dai Luc Nham */}
          {(activeSection === 'all' || activeSection === 'home-guide') && (
            <div id="home-guide" className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>15. Cẩm Nang Tri Thức Trang Chủ & Toàn Thư Lục Nhâm</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Tại phiên bản <strong>v2.13.0</strong>, <strong>Cẩm Nang Tri Thức Toàn Cảnh</strong> được nâng lên làm <strong>Trang Chủ Mặc Định</strong> khi người dùng truy cập ứng dụng, giúp người học dễ dàng tiếp cận hệ thống tri thức trước khi thực hành chiêm quẻ. Đồng thời, toàn bộ kho tàng học thuật <strong>Đại Lục Nhâm</strong> được tích hợp đầy đủ:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <strong className="text-amber-300 block font-bold">1. Thập Nhị Nguyệt Tướng (12 Tướng Thái Dương)</strong>
                  <p className="text-slate-400">
                    Tính toán chính xác góc kinh độ Mặt Trời (Solar Longitude) theo 24 Tiết khí để định Nguyệt Tướng (từ Đăng Minh Hợi đến Thần Hậu Tý).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <strong className="text-cyan-300 block font-bold">2. An Tứ Khoa & Thể Dụng Tương Tương</strong>
                  <p className="text-slate-400">
                    Khoa 1 (Can Thượng Thần) & Khoa 2 (Can Âm) đại diện cho Thân Chủ; Khoa 3 (Chi Thượng Thần) & Khoa 4 (Chi Âm) đại diện cho Đối Tác/Gia Trạch.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <strong className="text-purple-300 block font-bold">3. Cửu Tông Môn Khởi Tam Truyền</strong>
                  <p className="text-slate-400">
                    Sơ Truyền (Nguyên nhân) → Trung Truyền (Diễn tiến) → Mạt Truyền (Kết cục) dựa trên 9 khóa cổ bản chuẩn xác.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <strong className="text-emerald-300 block font-bold">4. Thập Nhị Thần Tướng & Đán/Dạ Quý</strong>
                  <p className="text-slate-400">
                    An 12 Thần Tướng theo bài thơ Đán Quý Nhân (ngày) và Dạ Quý Nhân (đêm), cùng quy tắc Thuận/Nghịch hành tùy theo cung Địa bàn Quý Nhân ngự.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 16: Glossary Section */}
          {(activeSection === 'all' || activeSection === 'glossary') && (
            <div id="glossary" className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-cyan-400" />
                <span>16. Từ Điển Thuật Ngữ Kỳ Môn, Lục Nhâm & Thiên Văn (GlossarySection)</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Nhằm hỗ trợ người dùng mới dễ dàng tiếp cận và tra cứu các thuật ngữ chuyên sâu, ứng dụng tích hợp thành phần <strong>Từ Điển Thuật Ngữ (GlossarySection)</strong> ngay trên Trang Chủ với các tiêu chuẩn học thuật:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30 space-y-1.5">
                  <strong className="text-purple-300 block font-bold">🔮 Kỳ Môn Độn Giáp</strong>
                  <p className="text-slate-400">
                    Trực Phù, Trực Sử, Tam Kỳ (Ất-Bính-Đinh), Lục Nghi, Bát Môn, Cửu Tinh, Bát Thần, Siêu Thần Tiếp Khí, Phục Ngâm, Phản Ngâm, Kích Hình, Nhập Mộ.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1.5">
                  <strong className="text-amber-300 block font-bold">🧭 Đại Lục Nhâm</strong>
                  <p className="text-slate-400">
                    Nguyệt Tướng (12 Tướng Thái Dương), Tứ Khoa (Can/Chi Thượng Thần & Âm Thần), Tam Truyền (Sơ-Trung-Mạt), Cửu Tông Môn, Đán/Dạ Quý, Thuận/Nghịch hành.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
                  <strong className="text-cyan-300 block font-bold">☀️ Thiên Văn & Lạc Thư</strong>
                  <p className="text-slate-400">
                    Điểm Sóc thiên văn (New Moon), 24 Tiết Khí (Solar Longitude 15°), Cửu Cung Lạc Thư (tổng 15), Không Vong, Dịch Mã.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 17: Theme Mode & System Sync */}
          {(activeSection === 'all' || activeSection === 'theme-mode') && (
            <div id="theme-mode" className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <span>17. Chế Độ Sáng / Tối & Tương Thích Trình Duyệt (Theme Mode & System Sync)</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Hệ thống cung cấp cơ chế chuyển đổi giao diện linh hoạt, đáp ứng nhu cầu nghiên cứu trong nhiều điều kiện ánh sáng khác nhau:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
                  <strong className="text-cyan-300 block font-bold">💻 1. Tự Động Theo Hệ Thống (System)</strong>
                  <p className="text-slate-400">
                    Lắng nghe thuộc tính <code className="text-cyan-300 font-mono">prefers-color-scheme</code> từ hệ điều hành / trình duyệt. Tự động đồng bộ ngay khi thiết bị chuyển chế độ mà không cần tải lại trang.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1.5">
                  <strong className="text-amber-300 block font-bold">☀️ 2. Chế Độ Sáng (Light Mode)</strong>
                  <p className="text-slate-400">
                    Phong cách thanh nhã, độ tương phản cao đạt chuẩn WCAG AA, phù hợp cho việc đọc tài liệu, in ấn hoặc tra cứu ban ngày với ánh sáng mạnh.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30 space-y-1.5">
                  <strong className="text-purple-300 block font-bold">🌙 3. Chế Độ Tối (Dark Mode)</strong>
                  <p className="text-slate-400">
                    Không gian thiên văn huyền bí với nền Slate-950 và các dải màu Cửu Tinh, Bát Thần rực rỡ, bảo vệ thị lực khi chiêm quẻ ban đêm.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">Lưu trữ bền vững (Persistence):</span> Tùy chọn của người dùng được tự động lưu vào <code className="text-amber-300 font-mono">localStorage</code> để duy trì trạng thái yêu thích trong tất cả các phiên làm việc tiếp theo.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            <span>Tài liệu đối chiếu: </span>
            <span className="text-amber-300/90 font-serif italic">Kỳ Môn Độn Giáp Bí Kíp Toàn Thư, Lạc Thư Quỹ Đạo & Jean Meeus Algorithms</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Đã Hiểu Toàn Bộ Hệ Thống
          </button>
        </div>
      </div>
    </div>
  );
};

