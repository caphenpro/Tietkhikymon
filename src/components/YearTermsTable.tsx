import React, { useState, useMemo } from 'react';
import { Calendar, Search, Download, Copy, Check, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { SolarTermEvent } from '../types';
import { calculateSolarTermsForYear } from '../astronomy/calculator';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

interface YearTermsTableProps {
  initialYear: number;
  currentTermName?: string;
  onSelectTermDate?: (date: Date) => void;
  onExportMarkdown: (year: number, terms: SolarTermEvent[]) => void;
}

export const YearTermsTable: React.FC<YearTermsTableProps> = ({
  initialYear,
  currentTermName,
  onSelectTermDate,
  onExportMarkdown,
}) => {
  const [year, setYear] = useState<number>(initialYear);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'Tiết' | 'Khí'>('ALL');
  const [copied, setCopied] = useState(false);

  // Compute 24 solar terms for the active year
  const termsList = useMemo(() => {
    return calculateSolarTermsForYear(year);
  }, [year]);

  // Filter terms based on search & category
  const filteredTerms = useMemo(() => {
    return termsList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cungName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.degree.toString().includes(searchTerm);
      const matchCat = filterCategory === 'ALL' || item.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [termsList, searchTerm, filterCategory]);

  const copyAsTable = () => {
    let text = `BẢNG 24 TIẾT KHÍ NĂM ${year} (GIỜ VIỆT NAM UTC+7)\n`;
    text += `STT\tCung Bát Quái\tTên Tiết Khí\tPhân Loại\tKinh Độ\tThời Điểm Chuyển Tiết\n`;
    termsList.forEach((t, idx) => {
      text += `${idx + 1}\t${t.cungName} (${t.cungNumber})\t${t.name}\t${t.category}\t${t.degree}°\t${formatVietnamDateTime(t.exactDate)}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCSV = () => {
    let csv = `STT,Nhóm Cung Bát Quái,Tên Gọi,Phân Loại,Kinh Độ,Thời Điểm Chuyển Tiết (UTC+7)\n`;
    termsList.forEach((t, idx) => {
      csv += `${idx + 1},"${t.cungName} (${t.cungNumber})","${t.name}","${t.category}","${t.degree}°","${formatVietnamDateTime(t.exactDate)}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bang_24_Tiet_Khi_Nam_${year}.csv`;
    link.click();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-5">
      {/* Top Header & Year Navigator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Bảng Thời Điểm Chuyển 24 Tiết Khí Năm {year}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tính toán thiên văn chính xác đến từng giây (Múi giờ Việt Nam UTC+7)
          </p>
        </div>

        {/* Year Selector & Quick Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setYear((y) => y - 1)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
            title="Năm trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <input
            type="number"
            min="1900"
            max="2100"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10) || year)}
            className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-center font-bold text-amber-400 font-mono text-sm focus:outline-none focus:border-amber-500"
          />

          <button
            type="button"
            onClick={() => setYear((y) => y + 1)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
            title="Năm sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Bar: Search, Category Filter, Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center flex-wrap gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm tiết khí, cung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg w-52 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                filterCategory === 'ALL'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả (24)
            </button>
            <button
              onClick={() => setFilterCategory('Tiết')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                filterCategory === 'Tiết'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tiết (12)
            </button>
            <button
              onClick={() => setFilterCategory('Khí')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                filterCategory === 'Khí'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Khí (12)
            </button>
          </div>
        </div>

        {/* Export & Copy Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyAsTable}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            title="Sao chép bảng vào bộ nhớ tạm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            title="Tải file CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => onExportMarkdown(year, termsList)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg transition-colors"
            title="Xuất file Markdown theo chuẩn Python Script"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất .MD</span>
          </button>
        </div>
      </div>

      {/* 24 Terms Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-3.5 text-center w-12">STT</th>
              <th className="py-3 px-3.5 text-center">Nhóm Cung Bát Quái</th>
              <th className="py-3 px-3.5">Tên Tiết Khí</th>
              <th className="py-3 px-3.5 text-center">Phân Loại</th>
              <th className="py-3 px-3.5 text-right font-mono">Kinh Độ</th>
              <th className="py-3 px-4 text-center font-mono">Thời Điểm Chuyển Tiết (UTC+7)</th>
              <th className="py-3 px-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredTerms.map((term, idx) => {
              const isCurrent = term.name === currentTermName;
              const formattedDate = formatVietnamDateTime(term.exactDate);

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isCurrent
                      ? 'bg-amber-500/10 hover:bg-amber-500/15'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-2.5 px-3.5 text-center text-slate-400 font-mono">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3.5 text-center font-medium text-cyan-300">
                    {term.cungName} ({term.cungNumber})
                  </td>
                  <td className="py-2.5 px-3.5 font-bold text-white flex items-center gap-1.5">
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    )}
                    <span>{term.name}</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        term.category === 'Tiết'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {term.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-mono text-amber-300 font-semibold">
                    {term.degree}°
                  </td>
                  <td className="py-2.5 px-4 text-center font-mono text-slate-200">
                    {formattedDate}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {onSelectTermDate && (
                      <button
                        onClick={() => onSelectTermDate(term.exactDate)}
                        className="px-2 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded text-[11px] font-medium transition-colors"
                        title="Xem chi tiết thời điểm chuyển tiết này"
                      >
                        Tra Cứu
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
