import React, { useState, useMemo } from 'react';
import {
  Compass,
  Grid,
  Sun,
  Moon,
  Zap,
  Globe,
  Sparkles,
  Layers,
  Users,
  User,
  Heart,
  Coins,
  Shield,
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Cpu,
  Bookmark
} from 'lucide-react';
import { ComprehensiveResult } from '../types';
import { GlossarySection } from './GlossarySection';

interface CosmicKnowledgeGuideProps {
  result?: ComprehensiveResult;
  onNavigateTab: (tabId: string) => void;
  onOpenAlgorithmModal?: () => void;
}

export const CosmicKnowledgeGuide: React.FC<CosmicKnowledgeGuideProps> = ({
  result,
  onNavigateTab,
  onOpenAlgorithmModal
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'unified' | 'battrach' | 'cuutinh' | 'tietkhi' | 'diemsoc' | 'kymon' | 'lucnham' | 'ungdung' | 'glossary'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất Cả Tri Thức', icon: BookOpen },
    { id: 'glossary', label: '📖 Tra Cứu Thuật Ngữ', icon: Bookmark },
    { id: 'lucnham', label: '🧭 Đại Lục Nhâm Tam Thức', icon: Compass },
    { id: 'kymon', label: '🌀 Kỳ Môn Độn Giáp', icon: Layers },
    { id: 'unified', label: '🌟 Hợp Nhất 4 Chiều', icon: Globe },
    { id: 'battrach', label: '🧭 Bát Trạch 8 Hướng', icon: Compass },
    { id: 'cuutinh', label: '🔢 Cửu Tinh Lạc Thư', icon: Grid },
    { id: 'tietkhi', label: '☀️ 24 Tiết Khí & Độn Cục', icon: Sun },
    { id: 'diemsoc', label: '🌙 Điểm Sóc & Âm Lịch', icon: Moon },
    { id: 'ungdung', label: '🎯 Ứng Dụng Thực Tiễn', icon: Zap },
  ];

  const knowledgeItems = useMemo(() => {
    return [
      // 1. Unified Model
      {
        id: 'unified-coords',
        category: 'unified',
        title: 'Mô Hình Hệ Tọa Độ Vũ Trụ 4 Chiều (Thiên - Địa - Nhân - Thời - Không)',
        subtitle: 'Bản đồ hợp nhất tri thức Cổ Học Phương Đông & Khoa học Thiên văn Hiện đại',
        keywords: ['hợp nhất', 'thiên địa nhân', 'thời gian', 'không gian', 'tọa độ vũ trụ', '4 chiều'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Cổ học phương Đông không phải là các môn phái phong thủy hay bói toán rời rạc, mà là một hệ thống 
              <strong> Vật Lý Học Vũ Trụ & Thời-Không 4 Chiều</strong> hoàn chỉnh:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>1. Trục Thời Gian (Thiên Vận & Chu Kỳ)</span>
                </div>
                <p className="text-slate-400 text-xs">
                  • <strong>24 Tiết Khí (Mặt Trời):</strong> Vị trí quỹ đạo Trái Đất quay quanh Mặt Trời, quy định 12 Tiết lệnh tháng Bát Tự và chu kỳ phân cực Dương Độn / Âm Độn.
                </p>
                <p className="text-slate-400 text-xs">
                  • <strong>Điểm Sóc (Mặt Trăng):</strong> Chu kỳ Mặt Trăng quanh Trái Đất (0° Sóc - 180° Vọng), quyết định ngày Mùng 1, tháng Đủ/Thiếu và nhịp triều sinh học.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>2. Trục Không Gian (Địa Thế & Phương Vị)</span>
                </div>
                <p className="text-slate-400 text-xs">
                  • <strong>Bát Trạch (8 Phương Vị):</strong> 8 hướng Hậu Thiên Bát Quái, xác định từ trường, hướng gió, ánh sáng và mức độ tương thích với Trạch Mệnh con người.
                </p>
                <p className="text-slate-400 text-xs">
                  • <strong>Cửu Tinh Lạc Thư (Ma Trận 3x3):</strong> Hệ ma phương năng lượng cân bằng tuyệt đối (tổng 15), đại diện cho 9 trường năng lượng sao chiếu xuống mặt đất.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
              <strong className="text-purple-300">Điểm Giao Hòa Tối Cao - Kỳ Môn Độn Giáp:</strong> Bằng quy tắc <em>Siêu Thần Tiếp Khí</em>, Thời Gian được nạp trực tiếp vào Ma Trận Không Gian 9 Cung. Lúc này, 9 Sao (Thiên), 8 Cửa (Nhân), 9 Cung (Địa) và 8 Thần cùng chuyển động đồng bộ để hiển thị chính xác tương tác năng lượng từng giờ.
            </div>
          </div>
        )
      },

      // 2. Bat Trach
      {
        id: 'battrach-8huong',
        category: 'battrach',
        title: 'Bát Trạch 8 Hướng & Hậu Thiên Bát Quái',
        subtitle: 'Ý nghĩa 8 phương vị không gian, ngũ hành tương phối và thuộc tính nhân sự',
        keywords: ['bát trạch', 'hậu thiên bát quái', '8 hướng', 'khảm', 'ly', 'chấn', 'đoài', 'càn', 'khôn', 'cấn', 'tốn'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Bát Trạch</strong> phân chia 360° không gian thành 8 phương vị quẻ Hậu Thiên. Mỗi phương mang một trường năng lượng ngũ hành và đại diện cho các thành viên trong gia đình:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <div className="text-cyan-300 font-bold flex items-center justify-between">
                  <span>Bắc (Khảm - Cung 1)</span>
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Thủy (Nước)</p>
                  <p>• <strong>Nhân sự:</strong> Trung nam (Con trai thứ)</p>
                  <p>• <strong>Đặc tính:</strong> Trí tuệ, thâm sâu, hiểm hóc, luân chuyển.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <div className="text-amber-400 font-bold flex items-center justify-between">
                  <span>Tây Nam (Khôn - Cung 2)</span>
                  <Mountain className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Thổ (Đất ẩm)</p>
                  <p>• <strong>Nhân sự:</strong> Người Mẹ / Người Vợ</p>
                  <p>• <strong>Đặc tính:</strong> Bao dung, dưỡng dục, khiêm nhường, tĩnh tại.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <div className="text-emerald-300 font-bold flex items-center justify-between">
                  <span>Đông (Chấn - Cung 3)</span>
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Mộc (Dương Mộc / Sấm)</p>
                  <p>• <strong>Nhân sự:</strong> Trưởng nam (Con trai cả)</p>
                  <p>• <strong>Đặc tính:</strong> Chấn động, khởi phát, vươn lên mùa xuân.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-green-500/30 space-y-1">
                <div className="text-green-300 font-bold flex items-center justify-between">
                  <span>Đông Nam (Tốn - Cung 4)</span>
                  <Wind className="w-3.5 h-3.5 text-green-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Mộc (Âm Mộc / Gió)</p>
                  <p>• <strong>Nhân sự:</strong> Trưởng nữ (Con gái cả)</p>
                  <p>• <strong>Đặc tính:</strong> Thâm nhập, tài lộc, danh tiếng học vấn.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-500/30 space-y-1">
                <div className="text-slate-200 font-bold flex items-center justify-between">
                  <span>Tây Bắc (Càn - Cung 6)</span>
                  <Shield className="w-3.5 h-3.5 text-slate-300" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Kim (Dương Kim / Trời)</p>
                  <p>• <strong>Nhân sự:</strong> Người Cha / Trụ cột gia đình</p>
                  <p>• <strong>Đặc tính:</strong> Cương kiện, lãnh đạo, quyền uy tối thượng.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
                <div className="text-rose-300 font-bold flex items-center justify-between">
                  <span>Tây (Đoài - Cung 7)</span>
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Kim (Âm Kim / Đầm nước)</p>
                  <p>• <strong>Nhân sự:</strong> Thiếu nữ (Con gái út)</p>
                  <p>• <strong>Đặc tính:</strong> Hỷ lạc, hùng biện, nghệ thuật, khuyết hãm.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-yellow-500/30 space-y-1">
                <div className="text-yellow-300 font-bold flex items-center justify-between">
                  <span>Đông Bắc (Cấn - Cung 8)</span>
                  <Mountain className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Thổ (Dương Thổ / Núi cao)</p>
                  <p>• <strong>Nhân sự:</strong> Thiếu nam (Con trai út)</p>
                  <p>• <strong>Đặc tính:</strong> Dừng lại, vững chãi, tích tụ, thành tựu.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                <div className="text-red-400 font-bold flex items-center justify-between">
                  <span>Nam (Ly - Cung 9)</span>
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <p>• <strong>Ngũ hành:</strong> Hỏa (Lửa / Ánh sáng)</p>
                  <p>• <strong>Nhân sự:</strong> Trung nữ (Con gái thứ)</p>
                  <p>• <strong>Đặc tính:</strong> Sáng suốt, văn minh, công danh rực rỡ.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },

      // 3. Cuu Tinh Lac Thu
      {
        id: 'cuutinh-lacthu',
        category: 'cuutinh',
        title: 'Cửu Tinh Lạc Thư & Ma Trận Ma Phương 3x3 Cân Bằng',
        subtitle: 'Ý nghĩa số học năng lượng vũ trụ: tổng hàng ngang, dọc và chéo luôn bằng 15',
        keywords: ['cửu tinh', 'lạc thư', 'ma trận 3x3', 'ma phương', 'tham lang', 'cự môn', 'lộc tồn', 'văn khúc', 'liêm trinh', 'vũ khúc', 'phá quân', 'tả phụ', 'hữu bật'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <p>
                Khẩu quyết Lạc Thư truyền đời: <em>"Đới cửu lý nhất (Đầu đội 9, chân đạp 1), tả tam hữu thất (trái 3, phải 7), nhị tứ vi kiên (2, 4 làm vai), lục bát vi túc (6, 8 làm chân), ngũ cư trung cung (5 ở giữa)"</em>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <strong className="text-cyan-300 block text-xs">1. Nhất Bạch Tham Lang (Thủy)</strong>
                <p className="text-slate-400 text-xs">Cát tinh chủ về khoa bảng đỗ đạt, trí tuệ mẫn tiệp, danh tiếng thanh nhã và đào hoa tốt lành.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <strong className="text-amber-400 block text-xs">2. Nhị Hắc Cự Môn (Thổ)</strong>
                <p className="text-slate-400 text-xs">Bệnh phù hung tinh, chủ tật bệnh, u ám, nhưng là chính tinh điền sản và đất đai rộng lớn.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <strong className="text-emerald-300 block text-xs">3. Tam Bích Lộc Tồn (Mộc)</strong>
                <p className="text-slate-400 text-xs">Hung tinh thị phi, kiện tụng, tranh chấp, tính hiếu thắng nhưng đem lại đột phá mạnh mẽ.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-green-500/30 space-y-1">
                <strong className="text-green-300 block text-xs">4. Tứ Lục Văn Khúc (Mộc)</strong>
                <p className="text-slate-400 text-xs">Văn tinh chủ về thi cử xuất sắc, văn chương, nghệ thuật sáng tạo, đỗ đạt cử khoa.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-yellow-500/30 space-y-1">
                <strong className="text-yellow-300 block text-xs">5. Ngũ Hoàng Liêm Trinh (Thổ - Trung Cung)</strong>
                <p className="text-slate-400 text-xs">Đại sát tinh trung tâm vũ trụ, chủ uy lực tối cao, biến động kinh thiên động địa, cần an tĩnh.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-400/30 space-y-1">
                <strong className="text-slate-200 block text-xs">6. Lục Bạch Vũ Khúc (Kim)</strong>
                <p className="text-slate-400 text-xs">Cát tinh quan lộc, quyền uy quân sự, lãnh đạo doanh nghiệp, chủ thiên tài hoạch phát.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
                <strong className="text-rose-300 block text-xs">7. Thất Xích Phá Quân (Kim)</strong>
                <p className="text-slate-400 text-xs">Hung tinh đạo tặc, đổ vỡ, dao kéo, tổn thương thân thể nhưng sắc bén trong tài biện luận.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-amber-300/30 space-y-1">
                <strong className="text-amber-300 block text-xs">8. Bát Bạch Tả Phụ (Thổ)</strong>
                <p className="text-slate-400 text-xs">Đại cát tinh đương vận, chủ giàu sang bền vững, chính tài vượng phát, bất động sản hanh thông.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                <strong className="text-red-400 block text-xs">9. Cửu Tử Hữu Bật (Hỏa)</strong>
                <p className="text-slate-400 text-xs">Cát tinh hỷ khánh, hôn nhân hạnh phúc, công danh thăng tiến rực rỡ, ánh sáng văn minh khai mở.</p>
              </div>
            </div>
          </div>
        )
      },

      // 4. Tiet Khi
      {
        id: 'tietkhi-duongam',
        category: 'tietkhi',
        title: 'Thiên Văn 24 Tiết Khí & Quy Luật Dương Độn / Âm Độn',
        subtitle: 'Chu kỳ Mặt Trời 360°, 12 Tiết Lệnh định tháng Bát Tự và 12 Trung Khí định tháng Âm lịch',
        keywords: ['24 tiết khí', 'tiết lệnh', 'trung khí', 'dương độn', 'âm độn', 'đông chí', 'hạ chí', 'lập xuân'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Mỗi <strong>Tiết khí</strong> tương ứng góc 15° kinh độ Mặt Trời (360° = 24 Tiết khí). Hệ thống chia đều thành 2 nhóm mang sứ mệnh khác nhau:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                <strong className="text-amber-300 block text-xs sm:text-sm">1. 12 Tiết (Tiết Lệnh) - Chuyển Tháng Bát Tự</strong>
                <p className="text-slate-400 text-xs">
                  Gồm: Lập Xuân, Kinh Trập, Thanh Minh, Lập Hạ, Mang Chủng, Tiểu Thử, Lập Thu, Bạch Lộ, Hàn Lộ, Lập Đông, Đại Tuyết, Tiểu Hàn.
                </p>
                <p className="text-xs text-amber-200/80 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20">
                  ⚡ <strong>Quy luật:</strong> Khi Mặt Trời chạm đúng thời khắc Tiết Lệnh, tháng Bát Tự lập tức đổi sang tháng mới (ví dụ Lập Xuân = bắt đầu tháng Dần).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <strong className="text-cyan-300 block text-xs sm:text-sm">2. 12 Khí (Trung Khí) - Quy Định Tháng Nhuận</strong>
                <p className="text-slate-400 text-xs">
                  Gồm: Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn.
                </p>
                <p className="text-xs text-cyan-200/80 bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20">
                  🌙 <strong>Quy luật:</strong> Nếu một tháng Âm lịch không chứa bất kỳ Trung Khí nào, tháng đó tự động trở thành Tháng Nhuận của năm.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-slate-200 block text-xs sm:text-sm">Chu Kỳ 18 Cục Kỳ Môn:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/20 text-amber-300">
                  <strong>☀️ Dương Độn (9 Cục: Cục 1 đến Cục 9):</strong> Từ sau Đông Chí đến Mang Chủng (Dương khí lớn dần, Lục Nghi bay thuận).
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/20 text-indigo-300">
                  <strong>🌙 Âm Độn (9 Cục: Cục 9 đến Cục 1):</strong> Từ sau Hạ Chí đến Đại Tuyết (Âm khí sinh sôi, Lục Nghi bay nghịch).
                </div>
              </div>
            </div>
          </div>
        )
      },

      // 5. Diem Soc
      {
        id: 'diemsoc-amlich',
        category: 'diemsoc',
        title: 'Điểm Sóc Thiên Văn & Bí Quyết Tính Âm Lịch Khoa Học',
        subtitle: 'Giao hội Mặt Trăng - Mặt Trời (0° New Moon) và cách xác định ngày Mùng 1 chuẩn xác',
        keywords: ['điểm sóc', 'sóc vọng', 'mùng 1', 'tháng đủ', 'tháng thiếu', 'tháng nhuận', 'mặt trăng', 'thủy triều'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Điểm Sóc (New Moon)</strong> là thời điểm hiệu số kinh độ Hoàng đạo Mặt Trăng và Mặt Trời chính xác bằng 0°. Đây là nền tảng số học duy nhất của Lịch Âm Dương:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-cyan-300 block text-xs font-bold">1. Định Ngày Mùng 1</strong>
                <p className="text-slate-400 text-xs">Ngày nào chứa Điểm Sóc (từ 00:00 đến 23:59 múi giờ +7) thì ngày đó chắc chắn là ngày Mùng 1 Âm lịch.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-amber-300 block text-xs font-bold">2. Tháng Đủ (30) / Thiếu (29)</strong>
                <p className="text-slate-400 text-xs">Được quyết định hoàn toàn bởi số ngày giữa 2 Điểm Sóc liên tiếp (trung bình 29.53 ngày).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <strong className="text-purple-300 block text-xs font-bold">3. Tháng Nhuận Khoa Học</strong>
                <p className="text-slate-400 text-xs">Khi năm có 13 Điểm Sóc, tháng đầu tiên sau Đông Chí không chứa Trung Khí sẽ được chọn làm tháng nhuận.</p>
              </div>
            </div>
          </div>
        )
      },

      // 6. Ky Mon Dun Jia
      {
        id: 'kymon-tamthuc',
        category: 'kymon',
        title: 'Kỳ Môn Độn Giáp: Đỉnh Cao Tam Thức Cổ Đại',
        subtitle: 'Cấu trúc 4 tầng (Thiên - Địa - Nhân - Thần), Tam Bàn và quy luật Chủ - Khách',
        keywords: ['kỳ môn độn giáp', 'tam thức', 'tam bàn', 'chủ khách', 'bát môn', 'cửu tinh', 'bát thần', 'trực phù', 'trực sử', 'thân mệnh'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Được tôn vinh là <strong>"Đế Vương Chi Thuật"</strong>, Kỳ Môn Độn Giáp bố trí 4 tầng năng lượng trên cùng một ma trận 9 Cung:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-slate-300 block text-xs">1. Địa Bàn (Cung Gốc)</strong>
                <p className="text-slate-400 text-xs">Tượng trưng cho thế đất, địa lợi, bất động sản, nền tảng sẵn có và thế lực nội tại.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <strong className="text-cyan-300 block text-xs">2. Thiên Bàn (Cửu Tinh)</strong>
                <p className="text-slate-400 text-xs">Tượng trưng cho thiên thời, thời cơ lớn, thời tiết, xu thế vĩ mô và tính cách thiên bẩm.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <strong className="text-emerald-300 block text-xs">3. Nhân Bàn (Bát Môn)</strong>
                <p className="text-slate-400 text-xs">Tượng trưng cho nhân hòa, hành động, quyết định, cửa ải sinh tử (Khai, Hưu, Sinh là Tam Cát Môn).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                <strong className="text-purple-300 block text-xs">4. Thần Bàn (Bát Thần)</strong>
                <p className="text-slate-400 text-xs">Tượng trưng cho năng lượng huyền bí, linh cảm trực giác, bảo hộ vô hình (Trực Phù, Thái Âm, Cửu Địa).</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2">
              <strong className="text-amber-300 block text-xs sm:text-sm">Quy Tắc Chủ - Khách Trong Kỳ Môn:</strong>
              <p className="text-xs text-slate-300">
                • <strong>Làm Khách (Động):</strong> Đi xa, xuất quân, đàm phán chủ động, ký kết trước, tấn công trước. Thiên bàn là Khách.
                <br />• <strong>Làm Chủ (Tĩnh):</strong> Ở nhà, phòng thủ, chờ đợi đối phương ra giá, an tĩnh vững vàng. Địa bàn là Chủ.
              </p>
            </div>
          </div>
        )
      },

      // 7. Dai Luc Nham Overview
      {
        id: 'lucnham-tongquan',
        category: 'lucnham',
        title: 'Đại Lục Nhâm: Đỉnh Cao Chiêm Đoán Nhân Sự Cổ Tam Thức',
        subtitle: 'Hợp nhất Cổ Tam Thức: Thiên Kỳ Môn (Quân sự, Không gian) - Địa Lục Nhâm (Nhân sự vi tế) - Nhân Thái Ất (Vận nước)',
        keywords: ['đại lục nhâm', 'lục nhâm', 'tam thức', 'thái ất', 'kỳ môn', 'tứ khoa', 'tam truyền', 'nguyệt tướng', 'thần tướng'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Trong kho tàng thuật số phương Đông, <strong>Cổ Tam Thức</strong> là ba bộ môn tối cao: 
              <em> "Thiên Kỳ Môn - Địa Lục Nhâm - Nhân Thái Ất"</em>. Nếu Kỳ Môn chuyên về bố trận, phương vị không gian 9 cung thì 
              <strong> Đại Lục Nhâm</strong> là đỉnh cao quán triệt về <strong>mọi chuyển biến nhân sự, tâm lý, diễn tiến chi tiết của việc đời</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>1. Thái Dương Nguyệt Tướng</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Sử dụng vị trí thực của Mặt Trời đi qua 12 Cung Hoàng đạo theo 24 Tiết khí để định <strong>Nguyệt Tướng</strong>, nạp thời gian thiên văn vào Địa bàn 12 Chi.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>2. Tứ Khoa (Bốn Cột Trụ)</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Thiết lập mối tương tác giữa <strong>Can Ngày (Chủ/Ta)</strong> và <strong>Chi Ngày (Khách/Đối tác/Nhà đất)</strong> để thấy rõ mầm mống họa phúc ban đầu.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>3. Tam Truyền (Dòng Thời Gian)</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Truy tìm quy luật chuyển hóa nhân quả 3 chặng: <strong>Sơ Truyền (Phát Khởi)</strong> → <strong>Trung Truyền (Diễn Biến)</strong> → <strong>Mạt Truyền (Kết Cục)</strong>.
                </p>
              </div>
            </div>
          </div>
        )
      },

      // 8. Thap Nhi Nguyet Tuong & Thien Ban
      {
        id: 'lucnham-nguyettuong',
        category: 'lucnham',
        title: 'Thập Nhị Nguyệt Tướng & Bí Quyết Khởi Thiên Bàn',
        subtitle: '12 Tướng Thái Dương theo 24 Tiết Khí và quy tắc xoay chuyển Thiên Bàn đè lên Địa Bàn',
        keywords: ['nguyệt tướng', 'thái dương', 'thiên bàn', 'địa bàn', 'thắng quang', 'tiểu cát', 'truyền tống', 'thần hậu', 'đại cát', 'đăng minh'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Nguyệt Tướng</strong> chính là vị trí của Thái Dương (Mặt Trời) ở mỗi cung hoàng đạo ứng với 12 Tiết lệnh trong năm:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <strong className="text-amber-300 block">1. Đăng Minh (Hợi)</strong>
                <span className="text-slate-400">Tiết Vũ Thủy → Xuân Phân</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <strong className="text-amber-300 block">2. Hà Khôi (Tuất)</strong>
                <span className="text-slate-400">Tiết Xuân Phân → Cốc Vũ</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <strong className="text-amber-300 block">3. Tùng Khôi (Dậu)</strong>
                <span className="text-slate-400">Tiết Cốc Vũ → Tiểu Mãn</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <strong className="text-amber-300 block">4. Truyền Tống (Thân)</strong>
                <span className="text-slate-400">Tiết Tiểu Mãn → Hạ Chí</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                <strong className="text-cyan-300 block">5. Tiểu Cát (Mùi)</strong>
                <span className="text-slate-400">Tiết Hạ Chí → Đại Thử</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-cyan-300 block space-y-0.5">
                <strong className="text-cyan-300 block">6. Thắng Quang (Ngọ)</strong>
                <span className="text-slate-400">Tiết Đại Thử → Xử Thử</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-cyan-300 block space-y-0.5">
                <strong className="text-cyan-300 block">7. Thái Ất (Tị)</strong>
                <span className="text-slate-400">Tiết Xử Thử → Thu Phân</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-cyan-300 block space-y-0.5">
                <strong className="text-cyan-300 block">8. Thiên Cương (Thìn)</strong>
                <span className="text-slate-400">Tiết Thu Phân → Sương Giáng</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 space-y-0.5">
                <strong className="text-purple-300 block">9. Thái Xung (Mão)</strong>
                <span className="text-slate-400">Tiết Sương Giáng → Tiểu Tuyết</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 space-y-0.5">
                <strong className="text-purple-300 block">10. Công Tào (Dần)</strong>
                <span className="text-slate-400">Tiết Tiểu Tuyết → Đông Chí</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 space-y-0.5">
                <strong className="text-purple-300 block">11. Đại Cát (Sửu)</strong>
                <span className="text-slate-400">Tiết Đông Chí → Đại Hàn</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 space-y-0.5">
                <strong className="text-purple-300 block">12. Thần Hậu (Tý)</strong>
                <span className="text-slate-400">Tiết Đại Hàn → Vũ Thủy</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs">
              <strong className="text-amber-300 block mb-1">🌀 Quy Tắc Lập Thiên Bàn:</strong>
              <p className="text-slate-300">
                Đem <strong>Nguyệt Tướng</strong> đặt lên cung <strong>Chi của Giờ chiêm quẻ</strong> trên Địa Bàn, sau đó an thuận 11 cung tiếp theo. Đây là sự lồng ghép giữa <em>Thời Gian Của Năm (Nguyệt Tướng)</em> và <em>Thời Gian Của Giờ (Chi Giờ)</em>.
              </p>
            </div>
          </div>
        )
      },

      // 9. Tu Khoa
      {
        id: 'lucnham-tukhoa',
        category: 'lucnham',
        title: 'Bí Kíp An Tứ Khoa: Thể Dụng Tương Tương & Chủ Khách',
        subtitle: 'Can Thượng Thần (Ta), Can Âm (Ẩn tình của Ta), Chi Thượng Thần (Khách/Nhà), Chi Âm (Ẩn tình đối phương)',
        keywords: ['tứ khoa', 'can thượng thần', 'can âm', 'chi thượng thần', 'chi âm', 'chủ khách', 'ký cung'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Tứ Khoa (Bốn Khoa)</strong> là bức tranh thu nhỏ mô tả vị thế của người hỏi và đối tượng hữu quan:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                <strong className="text-emerald-300 block font-bold text-xs sm:text-sm">
                  Khoa 1 & Khoa 2 (Can Khoa - Chủ Thể / Bản Thân)
                </strong>
                <p className="text-slate-400 text-xs">
                  • <strong>Khoa 1 (Can Thượng Thần):</strong> Lấy Thần trên Thiên Bàn đè lên Cung Ký của Can ngày. Tượng trưng cho diện mạo, hành động công khai, thân thể của Ta.
                  <br />• <strong>Khoa 2 (Can Âm):</strong> Lấy Thần trên Thiên Bàn đè lên Khoa 1. Tượng trưng cho nội tâm, tâm tư thầm kín, việc xảy ra sau lưng hoặc hậu vận của Ta.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
                <strong className="text-cyan-300 block font-bold text-xs sm:text-sm">
                  Khoa 3 & Khoa 4 (Chi Khoa - Khách Thể / Nhà Cửa / Đối Tác)
                </strong>
                <p className="text-slate-400 text-xs">
                  • <strong>Khoa 3 (Chi Thượng Thần):</strong> Lấy Thần trên Thiên Bàn đè lên Chi ngày. Tượng trưng cho đối tác, gia đạo, nơi cư ngụ, hoàn cảnh bên ngoài.
                  <br />• <strong>Khoa 4 (Chi Âm):</strong> Lấy Thần trên Thiên Bàn đè lên Khoa 3. Tượng trưng cho mưu toan ngấm ngầm của đối phương hoặc điềm ẩn tàng của nhà cửa.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
              ⚡ <strong>Quy Luật Khắc Sinh:</strong> Thượng Thần khắc Hạ Thần gọi là <em>Khắc Hạ (Tặc)</em> - tượng trưng tai họa từ ngoài ập tới. Hạ Thần khắc Thượng Thần gọi là <em>Thượng Khắc</em> - tượng trưng nội bộ phát sinh sự biến. Đây là mấu chốt để khởi Tam Truyền.
            </div>
          </div>
        )
      },

      // 10. Tam Truyen & Cuu Tong Mon
      {
        id: 'lucnham-tamtruyen',
        category: 'lucnham',
        title: 'Cửu Tông Môn Khởi Tam Truyền: Sơ - Trung - Mạt Truyền',
        subtitle: '9 Phép khởi Tam Truyền tinh diệu: Tặc Khắc, Tỷ Dụng, Thiệp Hại, Dao Khắc, Mão Tinh, Biệt Trạch, Bát Chuyên, Phục Ngâm, Phản Ngâm',
        keywords: ['cửu tông môn', 'tam truyền', 'sơ truyền', 'trung truyền', 'mạt truyền', 'tặc khắc', 'tỷ dụng', 'thiệp hại', 'dao khắc', 'mão tinh', 'biệt trạch', 'bát chuyên', 'phục ngâm', 'phản ngâm'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Tam Truyền</strong> là tiến trình ba giai đoạn của vạn sự:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <strong className="text-amber-300 block text-xs">1. Sơ Truyền (Phát Đoan)</strong>
                <p className="text-slate-400 text-xs">Khởi đầu sự việc, nguyên nhân cốt lõi, động cơ thúc đẩy ban đầu.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <strong className="text-cyan-300 block text-xs">2. Trung Truyền (Di Chuyển)</strong>
                <p className="text-slate-400 text-xs">Quá trình diễn biến thực tế, những trở ngại, chuyển giao nhân sự giữa đường.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                <strong className="text-purple-300 block text-xs">3. Mạt Truyền (Quy Túc)</strong>
                <p className="text-slate-400 text-xs">Kết quả cuối cùng, hậu vận của sự việc, cái kết thành hay bại.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <strong className="text-slate-200 block text-xs font-bold">Cửu Tông Môn (9 Phương Pháp Khởi Sơ Truyền):</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400">1. Tặc Khắc (Nguyên Thủ/Trùng Thẩm):</strong> Ưu tiên lấy Thượng thần khắc Hạ thần hoặc Hạ thần khắc Thượng thần độc nhất làm Sơ truyền.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-amber-400">2. Tỷ Dụng (Tri Nhất):</strong> Khi có từ 2 khắc trở lên, chọn Thần nào đồng tính Âm/Dương với Can Ngày.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-400">3. Thiệp Hại (Kiến Cơ/Sát Gian):</strong> Khi các thần khắc đều đồng tính Âm/Dương, so sánh số lần vượt qua các cung khắc trên Địa bàn.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-cyan-400">4. Dao Khắc (Cảo Cừu/Dao Khắc):</strong> Tứ khoa không có khắc, tìm Thần ở xa khắc Can Ngày hoặc Can Ngày khắc Thần.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-purple-400">5. Mão Tinh:</strong> Không có khắc lẫn nhau, mượn thần Dậu (Mão Tinh) để kích phát sự việc.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-purple-400">6. Biệt Trạch:</strong> Bất toàn khoa, lấy Can hợp hoặc Chi thần làm Sơ truyền.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-rose-400">7. Bát Chuyên:</strong> Can Chi đồng vị (ngày Giáp Dần, Kỷ Mùi...), không khắc, mượn Dương thần/Âm thần.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-rose-400">8. Phục Ngâm:</strong> Thiên bàn trùng khít Địa bàn, vạn sự đình trệ, lấy Hình Sát làm Sơ truyền.
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <strong className="text-emerald-400">9. Phản Ngâm:</strong> Thiên bàn đối xung 180° Địa bàn, biến động mãnh liệt, lấy Dịch Mã làm Sơ truyền.
                </div>
              </div>
            </div>
          </div>
        )
      },

      // 11. Thap Nhi Than Tuong
      {
        id: 'lucnham-thapnhithantuong',
        category: 'lucnham',
        title: 'Thập Nhị Thần Tướng Lục Nhâm: Đán Quý / Dạ Quý & Thuận Nghịch',
        subtitle: '12 Vị Thần Tướng biểu trưng năng lượng tâm lý, hoàn cảnh và phúc họa trong cuộc sống',
        keywords: ['thập nhị thần tướng', 'quý nhân', 'thanh long', 'chu tước', 'lục hợp', 'câu trận', 'đằng xà', 'bạch hổ', 'thái thường', 'huyền vũ', 'thái âm', 'thiên hậu', 'thiên không', 'đán quý', 'dạ quý'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              12 Thần Tướng Đại Lục Nhâm là các trường năng lượng bao trùm lên 12 Cung Thiên Bàn:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
                <strong className="text-amber-300 block font-bold">1. Quý Nhân (Cát Thần)</strong>
                <p className="text-slate-400">Vua của bách thần, cứu khổ ban ơn, gặp quý nhân trợ giúp, hóa hung thành cát.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
                <strong className="text-rose-400 block font-bold">2. Đằng Xà (Hung Thần)</strong>
                <p className="text-slate-400">Quái dị, ác mộng, lo sợ kinh hãi, ngấm ngầm hãm hại, bệnh tật dây dưa.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                <strong className="text-red-400 block font-bold">3. Chu Tước (Khẩu Thiệt)</strong>
                <p className="text-slate-400">Văn thư, thư từ, tin tức, tranh cãi thị phi, khẩu thiệt kiện tụng nảy lửa.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <strong className="text-emerald-300 block font-bold">4. Lục Hợp (Hôn Nhân/Hòa Hợp)</strong>
                <p className="text-slate-400">Hôn nhân giai ngẫu, ký kết hợp đồng, trung gian môi giới, bạn bè thân thiết.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-yellow-500/30 space-y-1">
                <strong className="text-yellow-400 block font-bold">5. Câu Trận (Trì Trệ/Tranh Tụng)</strong>
                <p className="text-slate-400">Tranh chấp đất đai, nhà tù ngục hình, vướng mắc pháp lý, công việc ứ đọng.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <strong className="text-cyan-300 block font-bold">6. Thanh Long (Đại Tài Lộc)</strong>
                <p className="text-slate-400">Tài chính hưng vượng, hỷ khánh phát tài, thăng quan tiến chức, quý nhân trao tiền của.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-600/30 space-y-1">
                <strong className="text-slate-300 block font-bold">7. Thiên Không (Hư Vô)</strong>
                <p className="text-slate-400">Lời hứa suông, lừa dối, hư vô không thực, nhưng rất tốt cho tu dưỡng tâm linh, Phật đạo.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-400/40 space-y-1">
                <strong className="text-slate-200 block font-bold">8. Bạch Hổ (Đại Hung Sát)</strong>
                <p className="text-slate-400">Tang tóc, đổ máu, tai nạn bất ngờ, bệnh tật nguy cấp, dao kéo phẫu thuật.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-300/30 space-y-1">
                <strong className="text-amber-200 block font-bold">9. Thái Thường (Yến Tiệc/Lễ Nghi)</strong>
                <p className="text-slate-400">Hội họp ăn uống, nhận bằng khen, quần áo trang phục, rượu chè yến tiệc.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-1">
                <strong className="text-indigo-300 block font-bold">10. Huyền Vũ (Trộm Cắp/Mờ Ám)</strong>
                <p className="text-slate-400">Mất trộm, tiểu nhân lừa gạt, gian tà tà dâm, sự việc mờ ám khó tỏ tường.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-400/30 space-y-1">
                <strong className="text-purple-300 block font-bold">11. Thái Âm (Che Chở/Âm Đức)</strong>
                <p className="text-slate-400">Mưu kế kín đáo, người nữ che chở, âm đức tổ tiên phù hộ, sự việc bình an bí mật.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-pink-400/30 space-y-1">
                <strong className="text-pink-300 block font-bold">12. Thiên Hậu (Ân Sủng/Nữ Giới)</strong>
                <p className="text-slate-400">Ân điển bề trên, quý phụ nữ giúp đỡ, tình duyên êm đẹp, thai sản cát lợi.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs">
              <strong className="text-cyan-300 block mb-1">⚖️ Quy Luật Đán/Dạ Quý & Thuận/Nghịch Hành:</strong>
              <p className="text-slate-300">
                • <strong>Đán Quý (Ban ngày):</strong> Giờ từ Mão đến Dậu dùng bài thơ Đán Quý Nhân.
                <br />• <strong>Dạ Quý (Ban đêm):</strong> Giờ từ Dậu đến Mão dùng bài thơ Dạ Quý Nhân.
                <br />• <strong>Thuận / Nghịch hành:</strong> Nếu vị trí Quý Nhân lâm vào các cung từ Hợi, Tý, Sửu, Dần, Mão, Thìn trên Địa bàn thì Thần Tướng <strong>đi Thuận</strong>; nếu lâm vào Tị, Ngọ, Mùi, Thân, Dậu, Tuất thì <strong>đi Nghịch</strong>.
              </p>
            </div>
          </div>
        )
      },

      // 12. Dai Luc Nham Ung Dung
      {
        id: 'lucnham-ungdung-chuyensau',
        category: 'lucnham',
        title: 'Ứng Dụng Đại Lục Nhâm Dự Trắc 6 Lĩnh Vực Đời Sống',
        subtitle: 'Cầu tài thương mại, Hôn nhân tình duyên, Công danh sự nghiệp, Bệnh tật sức khỏe, Pháp lý tranh chấp, Xuất hành mưu sự',
        keywords: ['ứng dụng lục nhâm', 'cầu tài', 'hôn nhân', 'công danh', 'bệnh tật', 'tranh chấp', 'xuất hành'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <strong className="text-amber-300 block text-xs sm:text-sm">💰 1. Cầu Tài & Giao Thương</strong>
                <p className="text-slate-400">
                  Xem Can Thượng Thần và Sơ Truyền gặp Thanh Long, Thái Thường hay Thiên Tài là đắc tài hanh thông. Gặp Huyền Vũ, Thiên Không hay Huynh Đệ là hao tài, phá của, lừa đảo.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-pink-500/30 space-y-1">
                <strong className="text-pink-300 block text-xs sm:text-sm">❤️ 2. Tình Duyên & Hôn Nhân</strong>
                <p className="text-slate-400">
                  Can là Nam, Chi là Nữ. Can Chi tương sinh, gặp Lục Hợp, Thiên Hậu, Thái Âm là lương duyên mỹ mãn. Gặp Bạch Hổ, Đằng Xà, Huyền Vũ là khẩu thiệt, nghi kỵ, chia lìa.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <strong className="text-cyan-300 block text-xs sm:text-sm">📜 3. Công Danh & Sự Nghiệp</strong>
                <p className="text-slate-400">
                  Xem Sơ Truyền gặp Quan Tinh, Quý Nhân, Chu Tước sinh vượng là đỗ đạt thăng chức. Gặp Tử Tuyệt, Phục Ngâm hay Không Vong là chức vị bị giáng, công việc đình trệ.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <strong className="text-emerald-300 block text-xs sm:text-sm">🌿 4. Sức Khỏe & Tật Bệnh</strong>
                <p className="text-slate-400">
                  Khắc Can là chứng bệnh nguy cấp, gặp Bạch Hổ là đau đớn, phẫu thuật, gặp Đằng Xà là ma quái tâm thần. Sơ truyền gặp Tử Tôn (Thần Dược) là gặp thầy gặp thuốc cứu mạng.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
                <strong className="text-rose-400 block text-xs sm:text-sm">⚖️ 5. Tranh Chấp & Pháp Lý</strong>
                <p className="text-slate-400">
                  Can là Nguyên đơn, Chi là Bị đơn. Bên nào được Quý Nhân, Quan Tinh sinh trợ thì bên đó thắng lý. Gặp Câu Trận, Chu Tước là tranh kiện dây dưa kéo dài nhiều năm.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                <strong className="text-purple-300 block text-xs sm:text-sm">🚀 6. Xuất Hành & Cầu Vận</strong>
                <p className="text-slate-400">
                  Xem Sơ Truyền gặp Dịch Mã, Thanh Long là đi xa đắc ý, tài lộc dồi dào. Gặp Bát Chuyên, Phục Ngâm là cản trở giữa đường, không nên xuất hành.
                </p>
              </div>
            </div>
          </div>
        )
      },

      // 13. Practical Applications
      {
        id: 'ungdung-thuctien',
        category: 'ungdung',
        title: 'Ứng Dụng Thực Tiễn Trong Đời Sống Hằng Ngày',
        subtitle: 'Dưỡng sinh thuận mùa, trạch cát xuất hành, bố trí không gian sống và dự trắc việc đời',
        keywords: ['ứng dụng', 'dưỡng sinh', 'trạch cát', 'xuất hành', 'phong thủy', 'dự trắc', 'thi cử', 'kinh doanh', 'sức khỏe'],
        content: (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>1. Dưỡng Sinh Thuận Theo 24 Tiết Khí</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Mùa Xuân (Mộc vượng) dưỡng Gan; Mùa Hạ (Hỏa vượng) dưỡng Tim; Mùa Thu (Kim vượng) dưỡng Phổi; Mùa Đông (Thủy vượng) dưỡng Thận. Ăn uống và ngủ nghỉ thuận theo thời khắc giao mùa giúp phòng tránh bệnh tật.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>2. Bố Trí Không Gian Sống Theo Bát Trạch</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Đặt phòng ngủ, bàn làm việc, cửa chính nạp khí cát (Sinh Khí, Thiên Y, Diên Niên) tương ứng với quẻ mệnh. Kiểm soát và hóa giải các phương vị có Nhị Hắc (Bệnh) và Ngũ Hoàng (Sát).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs sm:text-sm">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>3. Trạch Cát Xuất Hành & Ký Kết</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Chọn giờ và phương vị có <strong>Tam Cát Môn (Khai - Hưu - Sinh)</strong> gặp Cát Tinh (Tâm, Cầm, Nhậm) và Thần Tốt (Trực Phù, Cửu Thiên) để xuất hành đàm phán, thi cử, cầu tài hanh thông thắng lợi.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>4. Dự Trắc Việc Đời Sáng Suốt</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Soi rọi 6 phương diện đời sống (Sự nghiệp quan lộc, Tài chính kinh doanh, Tình duyên hôn nhân, Học vấn thi cử, Sức khỏe tật bệnh, Kiện tụng tranh chấp) để biết thời cơ nên tiến hay nên lùi.
                </p>
              </div>
            </div>
          </div>
        )
      }
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return knowledgeItems.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchSubtitle = item.subtitle.toLowerCase().includes(query);
      const matchKeyword = item.keywords.some((k) => k.toLowerCase().includes(query));
      return matchTitle || matchSubtitle || matchKeyword;
    });
  }, [knowledgeItems, activeCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cẩm Nang Tri Thức Toàn Cảnh • Cổ Tam Thức & Thiên Văn Vũ Trụ</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Kỳ Môn Độn Giáp • Đại Lục Nhâm • Bát Trạch • Cửu Tinh • 24 Tiết Khí
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Khám phá mối tương tác vi diệu giữa <strong className="text-amber-300">Thiên Vận (Thời gian)</strong>,{' '}
              <strong className="text-cyan-300">Địa Thế (Không gian)</strong>, và{' '}
              <strong className="text-emerald-300">Nhân Sự (Con người)</strong>. Mọi biến chuyển của đời sống đều vận hành theo những quy luật toán học và thiên văn chính xác tuyệt đối.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigateTab('kymon-chart')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all group"
            >
              <Layers className="w-4 h-4 text-slate-950" />
              <span>Bàn Kỳ Môn 9 Cung (3x3)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigateTab('luc-nham')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Bàn Đại Lục Nhâm (Tam Truyền)</span>
            </button>
            <button
              onClick={() => setActiveCategory('glossary')}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Tra Cứu Thuật Ngữ</span>
            </button>
            <button
              onClick={() => onNavigateTab('overview')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
            >
              <span>Tổng Quan & Luận Cục</span>
            </button>
            <button
              onClick={() => onNavigateTab('compass')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bát Quái 9 Cung</span>
            </button>
            {onOpenAlgorithmModal && (
              <button
                onClick={onOpenAlgorithmModal}
                className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Thuyết Minh Thuật Toán</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chủ đề (ví dụ: Bát Trạch, Cửu Tinh, Dương Độn, Điểm Sóc, Khai Môn...)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Hiển thị {filteredItems.length} chuyên đề tri thức</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Knowledge Cards List / Glossary */}
      {activeCategory === 'glossary' ? (
        <GlossarySection />
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`guide-card-${item.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-5 sm:p-6 shadow-md transition-all space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400">✦</span>
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>

                {/* Tag / Category Badge */}
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-950 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div>{item.content}</div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">Không tìm thấy nội dung phù hợp</p>
              <p className="text-xs text-slate-500">
                Hãy thử tìm kiếm với từ khóa khác như "Bát Trạch", "Cửu Tinh", "Tiết Khí", "Điểm Sóc" hoặc chọn "Tất Cả Tri Thức".
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors inline-block mt-2"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

          {/* If viewing All, show GlossarySection at the bottom of the list */}
          {activeCategory === 'all' && !searchQuery && (
            <div className="pt-2">
              <GlossarySection />
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Khám Phá Luận Cục Trực Tiếp</h4>
            <p className="text-slate-400 text-xs">Xem chi tiết Bàn Kỳ Môn và dự trắc thời gian thực cho thời điểm hiện tại.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('overview')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Đến Trang Tổng Quan & Luận Cục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
