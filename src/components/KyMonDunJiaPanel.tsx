import React from 'react';
import { Compass, Shield, CheckCircle2, ArrowRight, BookOpen, AlertCircle, MapPin, Sparkles } from 'lucide-react';
import { KyMonInfo } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface KyMonDunJiaPanelProps {
  kyMon: KyMonInfo;
  onOpenCompleteBoard?: () => void;
  onOpenPrognostication?: () => void;
  onOpenAiAdvisor?: () => void;
}

export const KyMonDunJiaPanel: React.FC<KyMonDunJiaPanelProps> = ({
  kyMon,
  onOpenCompleteBoard,
  onOpenPrognostication,
  onOpenAiAdvisor,
}) => {
  const isDuongDon = kyMon.isDuongDon;

  const getRuleBadgeColor = (rule: string) => {
    switch (rule) {
      case 'Chính Khí':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Siêu Thần':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Tiếp Khí':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Nhuận Cục':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
      {/* Header with Major Outcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Luận Cục Kỳ Môn Độn Giáp
              </h3>
              <span className="text-xs px-2 py-0.5 rounded font-medium bg-purple-950 text-purple-300 border border-purple-500/30">
                Siêu Thần Tiếp Khí
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Quy tắc chuẩn xác phân định Phù Đầu, Nguyên, Tiết Khí Dùng Cục và Cục Số
            </p>
          </div>
        </div>

        {/* Big Result Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl shadow-inner">
          <div className="text-right">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Kết luận Cục Số
            </div>
            <div
              className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${
                isDuongDon ? 'text-amber-400' : 'text-cyan-400'
              }`}
            >
              {kyMon.cucResultText}
            </div>
          </div>
          <div
            className={`w-3 h-10 rounded-full ${
              isDuongDon ? 'bg-amber-500' : 'bg-cyan-500'
            }`}
          />
          {onOpenCompleteBoard && (
            <button
              id="btn-goto-kymon-chart"
              onClick={onOpenCompleteBoard}
              className="ml-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              title="Mở Bàn Kỳ Môn 9 Cung đầy đủ 4 tầng"
            >
              <span>Xem Bàn 9 Cung</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4-Step Deduction Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Step 1: Phù Đầu hiện tại */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                Phù Đầu Hiện Tại
              </span>
            </div>
            <div className="text-lg font-bold text-white font-mono mt-1">
              Ngày {kyMon.currentPhuDauCanChi}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Bắt đầu: {formatVietnamDateTime(kyMon.currentPhuDauDate).split(' ')[0]}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
            Chu kỳ 5 ngày (Giáp/Kỷ thống lĩnh)
          </div>
        </div>

        {/* Step 2: Phân định Nguyên */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                Phân Định Nguyên
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-500/30">
                Chi {kyMon.phuDauChi}
              </span>
            </div>
            <div className="text-lg font-bold text-cyan-300 mt-1">
              {kyMon.nguyen}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Thượng Nguyên quản: <span className="font-mono text-slate-200">{kyMon.phuDauThuongNguyenCanChi}</span> ({formatVietnamDateTime(kyMon.phuDauThuongNguyenDate).split(' ')[0]})
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
            Tý/Ngọ/Mão/Dậu = Thượng • Dần/Thân/Tị/Hợi = Trung • Thìn/Tuất/Sửu/Mùi = Hạ
          </div>
        </div>

        {/* Step 3: Quy luật vận hành */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                Quy Luật Vận Hành
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`text-base font-bold px-2.5 py-1 rounded-lg border inline-block ${getRuleBadgeColor(
                  kyMon.ruleType
                )}`}
              >
                {kyMon.ruleType}
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed" title={kyMon.reason}>
              {kyMon.reason}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
            Độ lệch Phù Đầu Thượng Nguyên & Tiết Khí
          </div>
        </div>

        {/* Step 4: Tiết Khí Dùng Cục */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-bold">
                  4
                </span>
                Tiết Khí Dùng Cục
              </span>
            </div>
            <div className="text-lg font-bold text-purple-300 mt-1">
              {kyMon.termUsed} <span className="text-xs text-slate-400 font-normal">({kyMon.nguyen})</span>
            </div>
            <div className="text-xs text-slate-300 mt-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{kyMon.cungName} (Cung {kyMon.cungNumber})</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900">
            Phương vị: {kyMon.direction}
          </div>
        </div>
      </div>

      {/* Terminal / Code Box displaying exact output format */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
          <span className="font-mono flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
            Chi tiết suy luận logic thuật toán Kỳ Môn Độn Giáp:
          </span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-inner">
          {kyMon.fullAnalysisText}
        </div>
      </div>

      {/* Direct Quick Nav Action Links */}
      {(onOpenCompleteBoard || onOpenPrognostication || onOpenAiAdvisor) && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3 text-xs">
          {onOpenAiAdvisor && (
            <button
              id="btn-panel-open-ai"
              onClick={onOpenAiAdvisor}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Luận Giải AI Gemini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenCompleteBoard && (
            <button
              id="btn-panel-open-chart"
              onClick={onOpenCompleteBoard}
              className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Xem Bàn Kỳ Môn 9 Cung Đầy Đủ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenPrognostication && (
            <button
              id="btn-panel-open-prognostication"
              onClick={onOpenPrognostication}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem Toàn Bộ Luận Giải Dự Trắc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
