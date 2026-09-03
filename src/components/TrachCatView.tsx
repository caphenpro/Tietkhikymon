import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Search,
  ChevronRight,
  Shield,
  Star,
  Award,
  HelpCircle,
  Layers,
  ArrowRight,
  Sun,
  Flame,
  Info,
} from 'lucide-react';
import {
  calculateDailyAlmanac,
  DailyAlmanacInfo,
} from '../astronomy/dailyAlmanac';
import {
  DUNG_SU_60_CATEGORIES,
  DungSuCategory,
  evaluateDungSuSuitability,
  calculateDayThanSat,
  calculateTrucDay,
  getHoangDaoDayStar,
  getQuyDangThienMon,
  getGioNguBatNgo,
  getGioTrietLoKhongVong,
  HOANG_HAC_12_STARS,
} from '../astronomy/trachCatEngine';
import { CAN, CHI, getLocalComponents } from '../astronomy/canChi';
import { getAstronomicalLunarDate } from '../astronomy/lunarCalendar';

interface TrachCatViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const TrachCatView: React.FC<TrachCatViewProps> = ({
  currentDate,
  onDateChange,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'finder' | 'day-detail' | 'hours' | 'handbook'>('finder');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cuoi-hoi');
  const [searchMonthOffset, setSearchMonthOffset] = useState<number>(0);

  // Active almanac info of selected date
  const almanac: DailyAlmanacInfo = useMemo(() => {
    return calculateDailyAlmanac(currentDate);
  }, [currentDate]);

  // Selected Dung Su Category
  const selectedCategory: DungSuCategory = useMemo(() => {
    return DUNG_SU_60_CATEGORIES.find((c) => c.id === selectedCategoryId) || DUNG_SU_60_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Vietnam timezone components of selected date
  const vnYear = useMemo(() => {
    return new Date(currentDate.getTime() + 7 * 3600 * 1000).getUTCFullYear();
  }, [currentDate.getTime()]);

  const vnMonth = useMemo(() => {
    return new Date(currentDate.getTime() + 7 * 3600 * 1000).getUTCMonth();
  }, [currentDate.getTime()]);

  // Base days in the selected target month (fast O(1) day calculations with astronomical timeline cache)
  const targetMonthData = useMemo(() => {
    const m = vnMonth + searchMonthOffset; // 0..11 + offset
    const targetDate = new Date(Date.UTC(vnYear, m, 1));
    const targetYear = targetDate.getUTCFullYear();
    const targetMonth = targetDate.getUTCMonth();
    const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();

    const days = [];
    for (let d = 1; d <= daysInTargetMonth; d++) {
      const dayDate = new Date(Date.UTC(targetYear, targetMonth, d, 12, 0, 0) - 7 * 3600 * 1000);
      const dayAlmanac = calculateDailyAlmanac(dayDate);
      days.push({
        date: dayDate,
        dayNumber: d,
        almanac: dayAlmanac,
      });
    }

    return {
      targetYear,
      targetMonth: targetMonth + 1,
      days,
    };
  }, [vnYear, vnMonth, searchMonthOffset]);

  // Evaluated list for selected category (pure in-memory O(1) comparison per day)
  const evaluatedDaysInMonth = useMemo(() => {
    return targetMonthData.days.map((item) => {
      const suitability = evaluateDungSuSuitability(selectedCategory, {
        truc: item.almanac.truc,
        isHoangDao: item.almanac.isHoangDaoDay,
        catThan: item.almanac.catThan,
        hungThan: item.almanac.hungThan,
      });

      return {
        ...item,
        suitability,
      };
    });
  }, [targetMonthData, selectedCategory]);

  return (
    <div id="trach-cat-main-view" className="w-full max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* 1. HERO BANNER: Trạch Cát Hiệp Kỷ Biện Phương Thư */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-red-950 border border-amber-500/30 p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Khâm Định Hiệp Kỷ Biện Phương Thư • Tứ Khố Toàn Thư</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Chuyên Mục Trạch Cát & Tuyển Trạch Ngày Lành
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Hệ thống tính toán và tra cứu chuẩn mực theo bộ chính thư trạch cát hoàng triều do nhà thiên văn học <strong>Mai Cốc Thành</strong> chủ biên (thời vua Càn Long). Ứng dụng quy luật âm dương, ngũ hành, 12 Trực, 28 Tú, 12 Thần Hoàng Đạo, Bách Thần Sát và 6 bậc thẩm định cát hung biện chứng.
          </p>

          {/* Quick Date Summary Bar */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>
                Ngày đang chọn: <strong>{almanac.solarDay}/{almanac.solarMonth}/{almanac.solarYear}</strong> (Âm lịch: <strong>{almanac.lunarDay}/{almanac.lunarMonth} {almanac.lunarDayCanChi}</strong>)
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${almanac.isHoangDaoDay ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span>
                <strong>{almanac.hoangDaoDayText}</strong> ({almanac.hoangDaoStarName}) • <strong>Trực {almanac.truc.name}</strong>
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Đánh giá: <strong>{almanac.trachCatRank}</strong> ({almanac.trachCatScore}/100)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          id="tab-btn-finder"
          type="button"
          onClick={() => setActiveSubTab('finder')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'finder'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>🎯 Tìm Ngày Đẹp Theo Việc (Dụng Sự)</span>
        </button>

        <button
          id="tab-btn-day-detail"
          type="button"
          onClick={() => setActiveSubTab('day-detail')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'day-detail'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>⚖️ Biện Chứng Cát Hung Ngày Này</span>
        </button>

        <button
          id="tab-btn-hours"
          type="button"
          onClick={() => setActiveSubTab('hours')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'hours'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>🕰️ Giờ Hoàng Đạo & Quý Đăng Thiên Môn</span>
        </button>

        <button
          id="tab-btn-handbook"
          type="button"
          onClick={() => setActiveSubTab('handbook')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeSubTab === 'handbook'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>📖 Toàn Thư Cẩm Nang 13 Quyển</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: TÌM NGÀY ĐẸP THEO VIỆC (DỤNG SỰ) */}
      {/* ======================================================== */}
      {activeSubTab === 'finder' && (
        <div className="space-y-6">
          {/* Category Selector Grid */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>1. Chọn loại công việc dự định thực hiện:</span>
              </h3>

              {/* Month Selector for Filtering */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Xem tháng:</span>
                <select
                  value={searchMonthOffset}
                  onChange={(e) => setSearchMonthOffset(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value={0}>Tháng hiện tại (Tháng {almanac.solarMonth}/{almanac.solarYear})</option>
                  <option value={1}>Tháng kế tiếp</option>
                  <option value={2}>2 tháng tới</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {DUNG_SU_60_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-300 shadow-sm ring-2 ring-amber-500/30'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="text-xl mb-1">{cat.icon}</div>
                    <div className="font-bold text-xs leading-snug">{cat.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Rules Summary */}
            <div className="p-3.5 bg-amber-500/10 dark:bg-slate-950/80 border border-amber-500/30 rounded-xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="font-bold text-amber-800 dark:text-amber-300">
                {selectedCategory.icon} {selectedCategory.name}: {selectedCategory.description}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                <span>
                  <strong className="text-emerald-600 dark:text-emerald-400">Trực Cát Nên Dùng:</strong> {selectedCategory.preferredTruc.join(', ')}
                </span>
                <span>
                  <strong className="text-rose-600 dark:text-rose-400">Trực Kỵ Nên Tránh:</strong> {selectedCategory.avoidTruc.join(', ')}
                </span>
                <span>
                  <strong className="text-emerald-600 dark:text-emerald-400">Cát Thần Cần Có:</strong> {selectedCategory.goodStarsNeeded.slice(0, 5).join(', ')}...
                </span>
                <span>
                  <strong className="text-rose-600 dark:text-rose-400">Hung Sát Cần Tránh:</strong> {selectedCategory.badStarsAvoided.slice(0, 5).join(', ')}...
                </span>
              </div>
            </div>
          </div>

          {/* Evaluated Calendar Day Grid */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                2. Danh sách các ngày trong tháng và mức độ cát hung:
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                (Nhấp vào ngày để xem chi tiết hoặc mở Lịch Block)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {evaluatedDaysInMonth.map((item) => {
                const isCurrent =
                  item.almanac.solarDay === almanac.solarDay &&
                  item.almanac.solarMonth === almanac.solarMonth &&
                  item.almanac.solarYear === almanac.solarYear;

                let borderClass = 'border-slate-200 dark:border-slate-800';
                let badgeClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                if (item.suitability.verdict === 'Rất Tốt (Đại Cát)') {
                  borderClass = 'border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-950/20';
                  badgeClass = 'bg-emerald-500 text-white';
                } else if (item.suitability.verdict === 'Tốt (Cát)') {
                  borderClass = 'border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-950/20';
                  badgeClass = 'bg-cyan-600 text-white';
                } else if (item.suitability.verdict === 'Nên Tránh (Kỵ)') {
                  borderClass = 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10 opacity-75';
                  badgeClass = 'bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30';
                }

                return (
                  <div
                    key={item.dayNumber}
                    onClick={() => {
                      onDateChange(item.date);
                    }}
                    className={`p-3.5 rounded-xl border ${borderClass} hover:shadow-md transition-all cursor-pointer relative space-y-2 ${
                      isCurrent ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>
                            Ngày {item.almanac.solarDay}/{item.almanac.solarMonth} ({item.almanac.dayOfWeekShort})
                          </span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] rounded font-bold">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Âm: {item.almanac.lunarDay}/{item.almanac.lunarMonth} • {item.almanac.lunarDayCanChi}
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeClass}`}>
                        {item.suitability.verdict}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.almanac.isHoangDaoDay ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        <span>{item.almanac.hoangDaoDayText} ({item.almanac.hoangDaoStarName}) • Trực {item.almanac.truc.name}</span>
                      </div>
                    </div>

                    {/* Matched Good or Bad */}
                    <div className="text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800 space-y-0.5">
                      {item.suitability.matchedGood.length > 0 && (
                        <div className="text-emerald-700 dark:text-emerald-400 truncate">
                          ✓ Đắc: {item.suitability.matchedGood.join(', ')}
                        </div>
                      )}
                      {item.suitability.matchedBad.length > 0 && (
                        <div className="text-rose-700 dark:text-rose-400 truncate">
                          ✗ Phạm: {item.suitability.matchedBad.join(', ')}
                        </div>
                      )}
                    </div>

                    {/* Quick Button to Open Daily Block */}
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDateChange(item.date);
                          if (onNavigateTab) onNavigateTab('daily-calendar');
                        }}
                        className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Mở Lịch Block</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: BIỆN CHỨNG CÁT HUNG NGÀY NÀY */}
      {/* ======================================================== */}
      {activeSubTab === 'day-detail' && (
        <div className="space-y-6">
          {/* Card 1: 6 Bậc Biện Chứng Đánh Giá Cát Hung */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Đánh Giá Tổng Quan Ngày {almanac.solarDay}/{almanac.solarMonth}/{almanac.solarYear} (Ngày {almanac.lunarDayCanChi})
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs">
                {almanac.trachCatRank} ({almanac.trachCatScore}/100 điểm)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cát Thần Danh Mục */}
              <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cát Thần Hội Tụ ({almanac.catThan.length} vị thần)</span>
                </h4>
                {almanac.catThan.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Ngày này không hội tụ cát thần lớn.</p>
                ) : (
                  <div className="space-y-2">
                    {almanac.catThan.map((star, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-500/20 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-300">
                          <span>{star.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 rounded">
                            {star.nature}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{star.description}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] italic">{star.influence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hung Thần Danh Mục */}
              <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Hung Thần & Ác Sát ({almanac.hungThan.length} vị thần)</span>
                </h4>
                {almanac.hungThan.length === 0 ? (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 italic">Ngày thanh bình, không phạm hung thần ác sát lớn.</p>
                ) : (
                  <div className="space-y-2">
                    {almanac.hungThan.map((star, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-rose-500/20 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-rose-700 dark:text-rose-300">
                          <span>{star.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/20 text-rose-800 dark:text-rose-200 rounded">
                            {star.nature}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{star.description}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] italic">{star.influence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Việc Nên Làm & Việc Nên Tránh */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-1.5">
                <span className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                  ✓ Việc Nên Làm (Nghi):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {almanac.viecNenLam.map((v, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-extrabold uppercase text-rose-700 dark:text-rose-400">
                  ✗ Việc Nên Tránh (Kỵ):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {almanac.viecKiengKy.map((v, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20 text-xs font-semibold">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: GIỜ HOÀNG ĐẠO & QUÝ ĐĂNG THIÊN MÔN */}
      {/* ======================================================== */}
      {activeSubTab === 'hours' && (
        <div className="space-y-6">
          {/* Quý Đăng Thiên Môn Highlight */}
          <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-amber-500/30 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base">
                Giờ Quý Đăng Thiên Môn (Giờ Tối Thiện Trong Ngày)
              </h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Theo <em>Hiệp Kỷ Biện Phương Thư (Quyển 7 & Quyển 9)</em>: <strong>Quý Đăng Thiên Môn</strong> là giờ đệ nhất cát lợi trong thuật tuyển trạch. Trong giờ này, sáu cát thần (Thanh Long, Lục Hợp, Thái Thường, Thái Âm, Thiên Hậu, Quý Nhân) đều đắc vị vượng tướng, sáu hung thần (Đằng Xà, Chu Tước, Bạch Hổ, Câu Trận, Thiên Không, Huyền Vũ) đều tiềm phục tàng sát.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-500/30 text-xs space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold">Giờ Ban Ngày (Dương Quý):</span>
                <strong className="text-amber-700 dark:text-amber-300 text-sm font-mono block">
                  Giờ {almanac.quyDangThienMon.dayHour}
                </strong>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-500/30 text-xs space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold">Giờ Ban Đêm (Âm Quý):</span>
                <strong className="text-purple-700 dark:text-purple-300 text-sm font-mono block">
                  Giờ {almanac.quyDangThienMon.nightHour}
                </strong>
              </div>
            </div>
          </div>

          {/* 12 Giờ Trong Ngày Bảng Chi Tiết */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Bảng 12 Khung Giờ Trong Ngày: Hoàng Đạo & Hắc Đạo (Chuẩn Hiệp Kỷ)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {almanac.allHours.map((hour) => (
                <div
                  key={hour.chi}
                  className={`p-3 rounded-xl border transition-all ${
                    hour.isHoangDao
                      ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${hour.isHoangDao ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      <strong className="text-slate-900 dark:text-white text-xs sm:text-sm font-mono">
                        Giờ {hour.canChi}
                      </strong>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        hour.isHoangDao
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {hour.starName} ({hour.starType})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Khung giờ: {hour.timeRange}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Warnings: Ngũ Bất Ngộ & Triệt Lộ Không Vong */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-1">
                <strong className="text-rose-700 dark:text-rose-300 block font-bold">
                  ⚠️ Giờ Ngũ Bất Ngộ: {almanac.gioNguBatNgo}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Can giờ khắc Can ngày, là giờ tổn thương. Khởi sự xa vời, sớm đi tối thất bại.
                </p>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                <strong className="text-amber-800 dark:text-amber-300 block font-bold">
                  ⚠️ Giờ Triệt Lộ Không Vong: {almanac.gioTrietLoKhongVong}
                </strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Kỵ việc xuất hành, đi thuyền bè qua sông nước, ký hợp đồng lớn.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: CẨM NANG 13 QUYỂN HIỆP KỶ BIỆN PHƯƠNG THƯ */}
      {/* ======================================================== */}
      {activeSubTab === 'handbook' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Cấu Trúc 13 Quyển "Khâm Định Hiệp Kỷ Biện Phương Thư"</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-amber-600 dark:text-amber-400 font-bold block">Quyển 1 & 2: Cội Nguồn (Bản Thể Thiên Địa)</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Trình bày nền tảng triết học: Hà Đồ, Lạc Thư, Tiên Thiên & Hậu Thiên Bát Quái, Can Chi, 12 Luật, 28 Tú, Ngũ Hành Sinh Vượng, Nạp Giáp, Nạp Âm.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-amber-600 dark:text-amber-400 font-bold block">Quyển 3 đến 8: Nghĩa Lệ (Tổng Luận 4 Loại Thần Sát)</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Giải trình sâu sắc bản chất khoa học tự nhiên của thần sát Niên, Nguyệt, Nhật, Thời; phê phán mê tín dị đoan của các thuật sĩ giang hồ.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-amber-600 dark:text-amber-400 font-bold block">Quyển 9: Lập Thành (Biểu Bảng Tra Cứu Toàn Thư)</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hệ thống 46 biểu bảng tổng hợp thần sát 4 tầng, Quý Đăng Thiên Môn, Tứ Đại Cát Thời, Hoàng Hắc Đạo giúp tra cứu tức thì.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-amber-600 dark:text-amber-400 font-bold block">Quyển 10 & 11: Nghi Kỵ & Dụng Sự (Quy Tắc 60 Việc)</strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Nguyên tắc cốt lõi: <em>"Lấy việc làm kinh, lấy thần làm vĩ"</em>. Hướng dẫn phân định việc nên làm và việc kiêng kỵ theo 6 bậc biện chứng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
