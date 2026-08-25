import React from 'react';
import { X, BookOpen, CheckCircle, Compass, Sun, Moon } from 'lucide-react';

interface AlgorithmGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmGuideModal: React.FC<AlgorithmGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Thuyết Minh Thuật Toán & Nguyên Lý Kỳ Môn
              </h3>
              <p className="text-xs text-slate-400">
                24 Tiết Khí • Lịch Sóc • Phương pháp Siêu Thần Tiếp Khí Nhuận Cục
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1: 24 Tiết Khí */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              1. Thiên Văn 24 Tiết Khí & Phân Định Tiết / Khí
            </h4>
            <p>
              Kinh độ Mặt Trời hoàng đạo $(\lambda_\odot)$ trải dài $0^\circ \to 360^\circ$. Cứ mỗi $15^\circ$ Mặt Trời đi qua tạo thành một Tiết Khí.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Tiết (Tiết Lệnh):</strong> Gồm 12 tiết: Lập Xuân ($315^\circ$), Kinh Trập ($345^\circ$), Thanh Minh ($15^\circ$), Lập Hạ ($45^\circ$), Mang Chủng ($75^\circ$), Tiểu Thử ($105^\circ$), Lập Thu ($135^\circ$), Bạch Lộ ($165^\circ$), Hàn Lộ ($195^\circ$), Lập Đông ($225^\circ$), Đại Tuyết ($255^\circ$), Tiểu Hàn ($285^\circ$). Tiết là thời điểm khởi đầu tháng mới trong Bát Tự Tứ Trụ.
              </li>
              <li>
                <strong className="text-slate-200">Khí (Trung Khí):</strong> Gồm 12 trung khí nằm ở giữa các tiết: Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn.
              </li>
            </ul>
          </div>

          {/* Section 2: Điểm Sóc & Âm Lịch */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-2">
              <Moon className="w-4 h-4 text-cyan-400" />
              2. Điểm Sóc (New Moon) & Ngày Mùng 1 Âm Lịch
            </h4>
            <p>
              Điểm Sóc là thời điểm giao hội Nhật - Nguyệt khi hiệu số kinh độ Hoàng đạo $(\lambda_{Moon} - \lambda_{Sun}) = 0^\circ$. Ngày dương lịch chứa điểm Sóc (theo múi giờ địa phương Việt Nam UTC+7) được quy ước làm <strong>ngày Mùng 1</strong> của tháng âm lịch.
            </p>
            <p className="text-slate-400">
              Khoảng cách giữa hai điểm Sóc liên tiếp quyết định tháng đó là <strong>Tháng đủ (30 ngày)</strong> hay <strong>Tháng thiếu (29 ngày)</strong>.
            </p>
          </div>

          {/* Section 3: Quy luật Siêu Thần - Tiếp Khí - Nhuận Cục */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-purple-400 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              3. Phương Pháp Luận Cục Kỳ Môn Độn Giáp: Siêu Thần Tiếp Khí
            </h4>
            <p>
              Trong Kỳ Môn Độn Giáp, chu kỳ Can Chi là bội số 5 ngày (Phù Đầu). Mỗi Tiết Khí quản lý 15 ngày gồm 3 Nguyên (Thượng Nguyên 5 ngày, Trung Nguyên 5 ngày, Hạ Nguyên 5 ngày).
            </p>

            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-amber-300">Bước 1 - Xác định Phù Đầu & Phân Nguyên:</strong>
                <p className="text-slate-400 mt-1">
                  Ngày Giáp hoặc Kỷ khởi đầu chu kỳ 5 ngày. Địa chi của Phù đầu phân định:
                  <br />• <strong>Tý, Ngọ, Mão, Dậu:</strong> Khởi Thượng Nguyên.
                  <br />• <strong>Dần, Thân, Tị, Hợi:</strong> Khởi Trung Nguyên.
                  <br />• <strong>Thìn, Tuất, Sửu, Mùi:</strong> Khởi Hạ Nguyên.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-emerald-300">Bước 2 - So sánh Phù Đầu Thượng Nguyên với Tiết Khí:</strong>
                <p className="text-slate-400 mt-1">
                  • <strong>Chính Khí:</strong> Phù đầu Thượng Nguyên đến đúng ngày chuyển Tiết khí (độ lệch 0 ngày).
                  <br />• <strong>Siêu Thần:</strong> Phù đầu Thượng Nguyên đến <em>trước</em> ngày chuyển Tiết khí từ 1 đến 9 ngày ➔ Dùng Cục của Tiết khí kế tiếp.
                  <br />• <strong>Tiếp Khí:</strong> Phù đầu Thượng Nguyên đến <em>sau</em> ngày chuyển Tiết khí ➔ Dùng Cục của Tiết khí hiện tại.
                  <br />• <strong>Nhuận Cục:</strong> Khi Siêu thần vượt quá 9 ngày, khí lực không thể gánh thêm, phải tiến hành Nhuận Cục (thường lặp lại Cục Mang Chủng hoặc Đại Tuyết) để cân bằng với chu kỳ thiên văn.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors"
          >
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
