import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Tag,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Check,
  ExternalLink,
  GitCommit,
  Layers,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import {
  APP_VERSION,
  APP_RELEASE_DATE,
  APP_CODENAME,
  APP_GITHUB_REPO,
  CHANGELOG_DATA,
  ChangelogItem,
} from '../version';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState<string>(APP_VERSION);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'single' | 'timeline'>('single');

  if (!isOpen) return null;

  const currentItem: ChangelogItem =
    CHANGELOG_DATA.find((item) => item.version === selectedVersion) || CHANGELOG_DATA[0];

  const handleCopyMarkdown = () => {
    const md = `## [${currentItem.version}] - ${currentItem.releaseDate}
### Codename: ${currentItem.codename}
${currentItem.tagline}

#### 🌟 Điểm Nhấn Chính:
${currentItem.highlights.map((h) => `- ${h}`).join('\n')}

#### ✨ Tính Năng Mới (Added):
${currentItem.added.map((a) => `- ${a}`).join('\n')}

#### ⚡ Cải Tiến (Improved):
${currentItem.improved.map((i) => `- ${i}`).join('\n')}
${
  currentItem.fixed && currentItem.fixed.length > 0
    ? `\n#### 🐞 Sửa Lỗi (Fixed):\n${currentItem.fixed.map((f) => `- ${f}`).join('\n')}`
    : ''
}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Nhật Ký Phiên Bản & Cập Nhật</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/40 font-semibold">
                    v{APP_VERSION}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Ghi chép chi tiết các tính năng, nâng cấp thuật toán và sửa đổi của hệ thống
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                id="btn-view-single"
                onClick={() => setViewMode('single')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  viewMode === 'single'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chi Tiết Bản
              </button>
              <button
                id="btn-view-timeline"
                onClick={() => setViewMode('timeline')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                  viewMode === 'timeline'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Toàn Bộ Lịch Sử
              </button>
            </div>

            <button
              id="btn-close-changelog"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {viewMode === 'single' ? (
            <div className="space-y-6">
              {/* Version Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800/80">
                {CHANGELOG_DATA.map((item) => (
                  <button
                    key={item.version}
                    onClick={() => setSelectedVersion(item.version)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                      selectedVersion === item.version
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>v{item.version}</span>
                    {item.isLatest && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/80 text-amber-300 border border-amber-400/40">
                        Mới nhất
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Version Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">Phiên bản {currentItem.version}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                      {currentItem.codename}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ngày phát hành: {currentItem.releaseDate}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-serif italic text-amber-200/90">
                  "{currentItem.tagline}"
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Điểm Nhấn Nổi Bật Ở Phiên Bản Này</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {currentItem.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Added */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Tính Năng Mới (Added)
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {currentItem.added.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" /> Cải Tiến & Tối Ưu (Improved)
                  </span>
                  <ul className="space-y-1.5 text-slate-300">
                    {currentItem.improved.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fixed (if any) */}
                {currentItem.fixed && currentItem.fixed.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <span className="text-rose-400 font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5" /> Sửa Lỗi (Fixed)
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {currentItem.fixed.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Astronomy Notes (if any) */}
                {currentItem.astronomyNotes && currentItem.astronomyNotes.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" /> Thuật Toán & Thiên Văn
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {currentItem.astronomyNotes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Timeline Full View */
            <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {CHANGELOG_DATA.map((item, idx) => (
                <div key={idx} className="relative pl-9 space-y-3">
                  <div className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-4 border-slate-900 shadow-sm" />
                  
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">v{item.version}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {item.codename}
                        </span>
                        {item.isLatest && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                            Hiện tại
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        {item.releaseDate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic font-serif text-amber-200/80">
                      {item.tagline}
                    </p>

                    <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <GitCommit className="w-4 h-4 text-amber-400" />
            <span>Định dạng chuẩn Keep a Changelog & Semantic Versioning (v{APP_VERSION})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="btn-copy-release-md"
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép Markdown' : 'Sao chép ghi chú bản này'}</span>
            </button>

            <a
              href={`${APP_GITHUB_REPO}/blob/main/CHANGELOG.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md"
            >
              <span>Xem trên GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
