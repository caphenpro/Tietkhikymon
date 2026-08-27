import React from 'react';
import { Calendar, RefreshCw, Clock } from 'lucide-react';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

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
    } catch {
      // ignore parsing error on partial typing
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 sm:p-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
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
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
              isLive
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLive ? 'animate-spin' : ''}`} />
            <span>Thời Gian Thực (Live)</span>
          </button>
        </div>

        {/* Right: Current formatted readout */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300">{formatVietnamDateTime(currentDate)}</span>
          <span className="text-slate-500 text-[11px]">(UTC+7)</span>
        </div>
      </div>
    </div>
  );
};

