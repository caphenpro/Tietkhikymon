import React, { useState } from 'react';
import {
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Flame,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { BatTuVuongNhuocResult } from '../astronomy/batTuVuongNhuoc';

interface BatTuVuongNhuocCardProps {
  vuongNhuoc: BatTuVuongNhuocResult;
  compact?: boolean;
}

export const BatTuVuongNhuocCard: React.FC<BatTuVuongNhuocCardProps> = ({
  vuongNhuoc,
  compact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(!compact);

  const { nhatCan, nhatCanNguHanh, nhatCanAmDuong, pillars, yeuToSinhTro, lucLuongLamNhuoc, tongHoa } =
    vuongNhuoc;

  // Màu sắc theo Ngũ Hành Nhật Chủ
  const elementColors: Record<string, { badge: string; text: string; bg: string }> = {
    Mộc: {
      badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500',
    },
    Hỏa: {
      badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      text: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500',
    },
    Thổ: {
      badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500',
    },
    Kim: {
      badge: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30',
      text: 'text-slate-600 dark:text-slate-300',
      bg: 'bg-slate-400',
    },
    Thủy: {
      badge: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
      text: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500',
    },
  };

  const elStyle = elementColors[nhatCanNguHanh] || elementColors.Mộc;

  // Màu sắc theo Cấp độ Vượng Nhược
  const isStrong = [
    'Quá Vượng (Cực Vượng)',
    'Thiên Vượng Thiên Cường',
    'Thân Vượng',
    'Nhược mà hóa Vượng',
  ].includes(tongHoa.level);

  const isWarningSpecial = !!tongHoa.canhBaoDacBiet;

  return (
    <div className="bg-white dark:bg-slate-900 border border-amber-900/15 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all">
      {/* HEADER SECTION */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-slate-50 to-amber-500/5 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-b border-amber-900/10 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-600/15 text-amber-900 dark:text-amber-300 border border-amber-600/30 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Bát Tự Tử Bình</span>
              </span>

              {/* Nhật Chủ Badge */}
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${elStyle.badge}`}>
                Nhật Chủ: {nhatCan} ({nhatCanAmDuong} {nhatCanNguHanh})
              </span>

              {/* Đắc Lệnh / Thất Lệnh Badge */}
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                  yeuToSinhTro.dacLenh.isDacLenh
                    ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30'
                }`}
              >
                {yeuToSinhTro.dacLenh.isDacLenh ? 'Đắc Lệnh' : 'Thất Lệnh'} (Tháng {yeuToSinhTro.dacLenh.chiThang} - {yeuToSinhTro.dacLenh.cungTrangSinh})
              </span>
            </div>

            {/* Main Result Headline */}
            <div className="pt-1 flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Thẩm Định Thân Mệnh:</span>
                <span
                  className={`underline decoration-2 underline-offset-4 ${
                    isStrong
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : tongHoa.level === 'Bình Hòa'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {tongHoa.level}
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic">
              {tongHoa.shortTagline}
            </p>
          </div>

          {/* Toggle Accordion Button */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Cảnh báo đặc biệt (Vượng mà hóa nhược / Nhược mà hóa vượng) */}
        {isWarningSpecial && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold">Nhận định bí truyền:</strong>
              <p className="text-[11px] leading-relaxed opacity-90">{tongHoa.canhBaoDacBiet}</p>
            </div>
          </div>
        )}

        {/* PROGRESS BAR TƯƠNG QUAN LỰC LƯỢNG */}
        <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Lực Sinh Phù (Ấn & Tỷ Kiếp): {tongHoa.sinhTroScore}%</span>
            </span>
            <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Lực Khắc - Hao - Tiết: {tongHoa.khacHaoTietScore}%</span>
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${tongHoa.sinhTroScore}%` }}
              title={`Lực Sinh Phù: ${tongHoa.sinhTroScore}%`}
            ></div>
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-600 transition-all duration-500"
              style={{ width: `${tongHoa.khacHaoTietScore}%` }}
              title={`Lực Khắc - Hao - Tiết: ${tongHoa.khacHaoTietScore}%`}
            ></div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Chi Tháng quyết định ~40% lực lượng toàn cục</span>
            <span className="font-mono font-medium">{tongHoa.ratioDescription}</span>
          </div>
        </div>
      </div>

      {/* DETAILED CONTENT SECTION */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5 text-xs text-slate-700 dark:text-slate-300">
          {/* 1. BẢNG TỨ TRỤ CAN CHI & THẬP THẦN */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Bảng Phối Bát Tự & Thập Thần Tứ Trụ:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Trụ Năm */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-bold">Trụ Năm (Xa)</span>
                  <span className="font-mono text-[10px]">Trọng số: 8%</span>
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-amber-200 font-mono">
                  {pillars.year.can} {pillars.year.chi}
                </div>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  Can: {pillars.year.canThapThan}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Cung chi: {pillars.year.truongSinhChi}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Tàng: {pillars.year.tangCan.map((t) => `${t.can} (${t.thapThan})`).join(', ')}
                </div>
              </div>

              {/* Trụ Tháng */}
              <div className="p-3 bg-amber-500/5 dark:bg-amber-950/20 border-2 border-amber-500/30 rounded-xl space-y-1 shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-300">
                  <span className="font-bold">Trụ Tháng (Lệnh)</span>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                    Trọng số: 52% ⭐
                  </span>
                </div>
                <div className="text-sm font-black text-amber-900 dark:text-amber-200 font-mono">
                  {pillars.month.can} {pillars.month.chi}
                </div>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                  Can: {pillars.month.canThapThan}
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  Cung chi: {pillars.month.truongSinhChi} ({yeuToSinhTro.dacLenh.isDacLenh ? 'Đắc lệnh' : 'Thất lệnh'})
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
                  Tàng: {pillars.month.tangCan.map((t) => `${t.can} (${t.thapThan})`).join(', ')}
                </div>
              </div>

              {/* Trụ Ngày */}
              <div className="p-3 bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-emerald-500/30 rounded-xl space-y-1 shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300">
                  <span className="font-bold">Trụ Ngày (Thân)</span>
                  <span className="font-mono text-[10px]">Trọng số: 18%</span>
                </div>
                <div className="text-sm font-black text-emerald-900 dark:text-emerald-200 font-mono">
                  {pillars.day.can} {pillars.day.chi}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                  Nhật Chủ: {pillars.day.can}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Tọa chi: {pillars.day.truongSinhChi}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
                  Tàng: {pillars.day.tangCan.map((t) => `${t.can} (${t.thapThan})`).join(', ')}
                </div>
              </div>

              {/* Trụ Giờ */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-bold">Trụ Giờ (Gần)</span>
                  <span className="font-mono text-[10px]">Trọng số: 22%</span>
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-amber-200 font-mono">
                  {pillars.hour.can} {pillars.hour.chi}
                </div>
                <div className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                  Can: {pillars.hour.canThapThan}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Cung chi: {pillars.hour.truongSinhChi}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Tàng: {pillars.hour.tangCan.map((t) => `${t.can} (${t.thapThan})`).join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* 2. 4 YẾU TỐ SINH TRỢ (LỰC LƯỢNG LÀM THÂN VƯỢNG) */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>I. 4 Yếu Tố Sinh Trợ (Lực Lượng Làm Thân Vượng):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 1. Đắc Lệnh */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>1. Đắc Lệnh (Nguyệt Lệnh):</span>
                  </span>
                  <span
                    className={`font-bold text-[11px] ${
                      yeuToSinhTro.dacLenh.isDacLenh
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-500'
                    }`}
                  >
                    {yeuToSinhTro.dacLenh.isDacLenh ? 'ĐẮC LỆNH' : 'THẤT LỆNH'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {yeuToSinhTro.dacLenh.description}
                </p>
              </div>

              {/* 2. Đắc Địa */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>2. Đắc Địa (Gốc Rễ Chi Khác):</span>
                  </span>
                  <span
                    className={`font-bold text-[11px] ${
                      yeuToSinhTro.dacDia.isDacDia
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {yeuToSinhTro.dacDia.isDacDia ? `ĐẮC ĐỊA (${yeuToSinhTro.dacDia.cacGoc.length} GỐC)` : 'KHÔNG ĐẮC ĐỊA'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {yeuToSinhTro.dacDia.description}
                </p>
              </div>

              {/* 3. Được Sinh */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <span>3. Được Sinh (Chính Ấn / Thiên Ấn):</span>
                  </span>
                  <span
                    className={`font-bold text-[11px] ${
                      yeuToSinhTro.duocSinh.isDuocSinh
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {yeuToSinhTro.duocSinh.isDuocSinh ? `CÓ ẤN (${yeuToSinhTro.duocSinh.danhSachAnTinh.length})` : 'THIẾU ẤN'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {yeuToSinhTro.duocSinh.description}
                </p>
              </div>

              {/* 4. Được Trợ Giúp */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>4. Được Trợ Giúp (Tỷ Kiên / Kiếp Tài):</span>
                  </span>
                  <span
                    className={`font-bold text-[11px] ${
                      yeuToSinhTro.duocTro.isDuocTro
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {yeuToSinhTro.duocTro.isDuocTro ? `CÓ TRỢ (${yeuToSinhTro.duocTro.danhSachTyKiep.length})` : 'ĐỘC LẬP'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {yeuToSinhTro.duocTro.description}
                </p>
              </div>
            </div>
          </div>

          {/* 3. 3 LỰC LƯỢNG LÀM THÂN NHƯỢC (KHẮC - HAO - TIẾT) */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>II. 3 Lực Lượng Làm Thân Nhược (Khắc - Hao - Tiết):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Khắc: Quan Sát */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <span className="font-bold text-rose-700 dark:text-rose-400 block">
                  • Khắc (Chính Quan / Thất Sát):
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {lucLuongLamNhuoc.khacQuanSat.description}
                </p>
                {lucLuongLamNhuoc.khacQuanSat.items.length > 0 && (
                  <div className="text-[10px] text-slate-500 flex flex-wrap gap-1 pt-0.5">
                    {lucLuongLamNhuoc.khacQuanSat.items.map((it, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300">
                        {it.name} ({it.thapThan})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hao: Tài Tinh */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <span className="font-bold text-amber-700 dark:text-amber-400 block">
                  • Hao (Chính Tài / Thiên Tài):
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {lucLuongLamNhuoc.haoTaiTinh.description}
                </p>
                {lucLuongLamNhuoc.haoTaiTinh.items.length > 0 && (
                  <div className="text-[10px] text-slate-500 flex flex-wrap gap-1 pt-0.5">
                    {lucLuongLamNhuoc.haoTaiTinh.items.map((it, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        {it.name} ({it.thapThan})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tiết: Thực Thương */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-1">
                <span className="font-bold text-cyan-700 dark:text-cyan-400 block">
                  • Tiết (Thực Thần / Thương Quan):
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {lucLuongLamNhuoc.tietThucThuong.description}
                </p>
                {lucLuongLamNhuoc.tietThucThuong.items.length > 0 && (
                  <div className="text-[10px] text-slate-500 flex flex-wrap gap-1 pt-0.5">
                    {lucLuongLamNhuoc.tietThucThuong.items.map((it, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                        {it.name} ({it.thapThan})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. DỤNG THẦN, HỶ THẦN & KỴ THẦN */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-100 to-amber-500/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-amber-500/30 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>III. Định Hướng Dụng Thần & Hỷ Kỵ Thần:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  ⭐ Dụng Thần (Then Chốt):
                </span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  {tongHoa.dungThan.join(', ')}
                </p>
              </div>

              <div className="p-2.5 bg-teal-500/10 border border-teal-500/30 rounded-lg space-y-1">
                <span className="font-bold text-teal-800 dark:text-teal-300 block">
                  ✨ Hỷ Thần (Phò Trợ):
                </span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  {tongHoa.hyThan.join(', ')}
                </p>
              </div>

              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg space-y-1">
                <span className="font-bold text-rose-800 dark:text-rose-300 block">
                  ⚠️ Kỵ Thần (Cần Tránh):
                </span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">
                  {tongHoa.kyThan.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
