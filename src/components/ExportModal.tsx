import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { ComprehensiveResult, SolarTermEvent } from '../types';
import { generateMarkdownExport } from '../astronomy/calculator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComprehensiveResult;
  yearTerms: SolarTermEvent[];
  year: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  result,
  yearTerms,
  year,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = generateMarkdownExport(year, result, yearTerms);

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tiet_Khi_Nam_${year}.md`;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Xuất Báo Cáo Markdown (Tiet_Khi_Nam_{year}.md)
              </h3>
              <p className="text-xs text-slate-400">
                Bảng dữ liệu thiên văn 24 Tiết khí, Bát Tự & Luận Cục Kỳ Môn Độn Giáp
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

        {/* Preview Markdown area */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-950">
          <pre className="text-xs font-mono text-slate-300 p-4 rounded-xl border border-slate-800 bg-slate-900/60 whitespace-pre-wrap leading-relaxed select-all">
            {markdownContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Tên file dự kiến: <span className="font-mono text-amber-300">Tiet_Khi_Nam_{year}.md</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải File .MD Về Máy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
