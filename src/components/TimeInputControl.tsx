import React, { useState } from 'react';
import { Calendar, RefreshCw, Clock, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { parseCompactDateTime, formatVietnamDateTime } from '../astronomy/solarTerms';

interface TimeInputControlProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isLive: boolean;
  onSetLive: (live: boolean) => void;
}

export const TimeInputControl: React.FC<TimeInputControlProps> = ({
  currentDate,
  onDateChange,
  isLive,
  onSetLive,
}) => {
  const [compactInput, setCompactInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  // Format date for html datetime-local input (YYYY-MM-DDTHH:mm:ss in UTC+7)
  const getInputValue = (d: Date) => {
    const vnDate = new Date(d.getTime() + 7 * 3600 * 1000);
    const Y = vnDate.getUTCFullYear();
    const M = String(vnDate.getUTCMonth() + 1).padStart(2, '0');
    const D = String(vnDate.getUTCDate()).padStart(2, '0');
    const h = String(vnDate.getUTCHours()).padStart(2, '0');
    const m = String(vnDate.getUTCMinutes()).padStart(2, '0');
    const s = String(vnDate.getUTCSeconds()).padStart(2, '0');
    return `${Y}-${M}-${D}T${h}:${m}:${s}`;
  };

  const handleDateTimeLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    try {
      const [datePart, timePart] = val.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour = 0, minute = 0, second = 0] = timePart.split(':').map(Number);

      const utcMillis = Date.UTC(year, month - 1, day, hour, minute, second) - 7 * 3600 * 1000;
      const newDate = new Date(utcMillis);
      onSetLive(false);
      onDateChange(newDate);
      setInputError(null);
    } catch {
      setInputError('Lỗi định dạng thời gian!');
    }
  };

  const handleCompactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compactInput.trim()) return;
    try {
      const parsed = parseCompactDateTime(compactInput);
      onSetLive(false);
      onDateChange(parsed);
      setInputError(null);
      setCompactInput('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setInputError(err.message);
      } else {
        setInputError('Chuỗi thời gian không hợp lệ. Ví dụ đúng: 26122019 hoặc 26122019153000');
      }
    }
  };

  const setPreset = (offsetHours: number = 0, fixedDate?: Date) => {
    onSetLive(false);
    if (fixedDate) {
      onDateChange(fixedDate);
      return;
    }
    const d = new Date();
    d.setHours(d.getHours() + offsetHours);
    onDateChange(d);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Interactive Date & Time Picker */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Thời điểm tra cứu:</span>
          </div>

          <input
            id="input-datetime-picker"
            type="datetime-local"
            step="1"
            value={getInputValue(currentDate)}
            onChange={handleDateTimeLocalChange}
            className="bg-slate-950 border border-slate-700 text-amber-300 font-mono text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
          />

          <button
            id="btn-now-preset"
            type="button"
            onClick={() => {
              onSetLive(true);
              onDateChange(new Date());
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              isLive
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLive ? 'animate-spin' : ''}`} />
            <span>Thời Gian Hiện Tại</span>
          </button>
        </div>

        {/* Middle/Right: Compact CLI-style input parser */}
        <form onSubmit={handleCompactSubmit} className="flex items-center gap-2">
          <div className="relative">
            <input
              id="input-compact-time"
              type="text"
              placeholder="Nhập nhanh: 26122019 hoặc 26122019153000"
              value={compactInput}
              onChange={(e) => {
                setCompactInput(e.target.value);
                if (inputError) setInputError(null);
              }}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 font-mono px-3 py-2 rounded-lg w-72 sm:w-80 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            id="btn-compact-submit"
            type="submit"
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            title="Áp dụng chuỗi thời gian"
          >
            <span>Tính</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {inputError && (
        <div className="mt-2.5 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{inputError}</span>
        </div>
      )}

      {/* Fast Presets Bar */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center flex-wrap gap-1.5 text-xs">
        <span className="text-slate-400 flex items-center gap-1 mr-1">
          <Zap className="w-3 h-3 text-amber-400" />
          Mốc tra nhanh:
        </span>
        <button
          type="button"
          onClick={() => {
            const d = new Date();
            d.setHours(0, 0, 0, 0); // Giờ Tý
            setPreset(0, d);
          }}
          className="px-2.5 py-1 bg-slate-800/70 hover:bg-slate-800 text-slate-300 rounded border border-slate-700/60 transition-colors"
        >
          Giờ Tý (00:00)
        </button>
        <button
          type="button"
          onClick={() => {
            const d = new Date();
            d.setHours(12, 0, 0, 0); // Giờ Ngọ
            setPreset(0, d);
          }}
          className="px-2.5 py-1 bg-slate-800/70 hover:bg-slate-800 text-slate-300 rounded border border-slate-700/60 transition-colors"
        >
          Giờ Ngọ (12:00)
        </button>
        <button
          type="button"
          onClick={() => {
            // Lập Xuân 2026 (khoảng 04/02/2026)
            setPreset(0, new Date('2026-02-04T04:02:00Z'));
          }}
          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 transition-colors"
        >
          Lập Xuân 2026
        </button>
        <button
          type="button"
          onClick={() => {
            // Hạ Chí 2026 (khoảng 21/06/2026)
            setPreset(0, new Date('2026-06-21T09:24:00Z'));
          }}
          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 transition-colors"
        >
          Hạ Chí 2026 (Chuyển Âm độn)
        </button>
        <button
          type="button"
          onClick={() => {
            // Đông Chí 2026 (khoảng 21/12/2026)
            setPreset(0, new Date('2026-12-21T20:50:00Z'));
          }}
          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 transition-colors"
        >
          Đông Chí 2026 (Chuyển Dương độn)
        </button>
      </div>
    </div>
  );
};
