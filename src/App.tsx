import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { YearTermsTable } from './components/YearTermsTable';
import { LunarNewMoonSection } from './components/LunarNewMoonSection';
import { DailyCalendarView } from './components/DailyCalendarView';
import { TrachCatView } from './components/TrachCatView';
import { KyMonCompleteBoard } from './components/KyMonCompleteBoard';
import { KyMonPrognosticationView } from './components/KyMonPrognosticationView';
import { LucNhamPanel } from './components/LucNhamPanel';
import { AlgorithmGuideModal } from './components/AlgorithmGuideModal';
import { ExportModal } from './components/ExportModal';
import { ChangelogModal } from './components/ChangelogModal';
import { OnboardingTourModal, ONBOARDING_STORAGE_KEY } from './components/OnboardingTourModal';
import { calculateComprehensiveResult, calculateSolarTermsForYear } from './astronomy/calculator';
import { SolarTermEvent } from './types';
import { APP_VERSION, APP_RELEASE_DATE } from './version';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  // Trọng tâm 1: Mặc định hiển thị Lịch Vạn Niên (Cát Hung)
  const [activeTab, setActiveTab] = useState<string>('daily-calendar');

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState<boolean>(false);
  const [isOnboardingTourOpen, setIsOnboardingTourOpen] = useState<boolean>(() => {
    // Open by default if first time user
    return !localStorage.getItem(ONBOARDING_STORAGE_KEY);
  });

  // Live timer effect
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Calculate comprehensive calculation result for the active timestamp
  const result = useMemo(() => {
    return calculateComprehensiveResult(currentDate);
  }, [currentDate]);

  // Current year for the solar terms
  const currentYear = useMemo(() => {
    const vnDate = new Date(currentDate.getTime() + 7 * 3600 * 1000);
    return vnDate.getUTCFullYear();
  }, [currentDate]);

  // Solar terms for export
  const yearTerms = useMemo(() => {
    return calculateSolarTermsForYear(currentYear);
  }, [currentYear]);

  // Handler to select a term date from the table and jump to moon or table
  const handleSelectTermDate = useCallback((date: Date) => {
    setIsLive(false);
    setCurrentDate(date);
    setActiveTab('daily-calendar');
  }, []);

  const handleExportMarkdown = useCallback((_year: number, _terms: SolarTermEvent[]) => {
    setIsExportOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200 relative transition-colors duration-200">
      {/* Header */}
      <Header
        currentDate={currentDate}
        isLive={isLive}
        onToggleLive={() => setIsLive((prev) => !prev)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onOpenOnboardingTour={() => setIsOnboardingTourOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        result={result}
        onDateChange={(d) => setCurrentDate(d)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TRỤ CỘT 1: LỊCH VẠN NIÊN - CÁC YẾU TỐ CẤU THÀNH & CÁT HUNG */}
        {activeTab === 'daily-calendar' && (
          <div className="space-y-6">
            <DailyCalendarView
              currentDate={currentDate}
              onDateChange={(d) => {
                setIsLive(false);
                setCurrentDate(d);
              }}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* TRỤ CỘT 2: LẬP QUẺ KỲ MÔN (LUẬN BÀN KHÔNG - THỜI GIAN) */}
        {activeTab === 'kymon-chart' && (
          <div className="space-y-6">
            <KyMonCompleteBoard
              currentDate={currentDate}
              onDateChange={(d) => {
                setIsLive(false);
                setCurrentDate(d);
              }}
              currentKyMon={result.kyMon}
              currentBatTu={result.batTu}
              onOpenPrognostication={() => setActiveTab('kymon-prognostication')}
              onSwitchToLucNham={() => setActiveTab('luc-nham')}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* TRỤ CỘT 2: LẬP QUẺ LỤC NHÂM (LUẬN BÀN QUÁ TRÌNH THÀNH BẠI) */}
        {activeTab === 'luc-nham' && (
          <div className="space-y-6">
            <LucNhamPanel
              result={result}
              currentDate={currentDate}
              onOpenAlgorithmModal={() => setIsGuideOpen(true)}
              onSwitchToKyMon={() => setActiveTab('kymon-chart')}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* TỔNG HỢP SONG THỨC: DỰ TRẮC KẾT HỢP KỲ MÔN & LỤC NHÂM */}
        {activeTab === 'kymon-prognostication' && (
          <div className="space-y-6">
            <KyMonPrognosticationView
              currentDate={currentDate}
              solarLongitude={result.solarLongitude}
              currentKyMon={result.kyMon}
              currentBatTu={result.batTu}
              onBackToBoard={() => setActiveTab('kymon-chart')}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* CHUYÊN MỤC TRẠCH CÁT HIỆP KỶ BIỆN PHƯƠNG THƯ */}
        {activeTab === 'trach-cat' && (
          <div className="space-y-6">
            <TrachCatView
              currentDate={currentDate}
              onDateChange={(d) => {
                setIsLive(false);
                setCurrentDate(d);
              }}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* ĐIỂM SÓC & ÂM LỊCH THIÊN VĂN */}
        {activeTab === 'moon' && (
          <div className="space-y-6">
            <LunarNewMoonSection
              newMoon={result.newMoon}
              calculationDate={currentDate}
              currentDate={currentDate}
              onDateChange={(d) => setCurrentDate(d)}
              isLive={isLive}
              onSetLive={(live) => setIsLive(live)}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* 24 TIẾT KHÍ NĂM */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <YearTermsTable
              initialYear={currentYear}
              currentTermName={result.currentTerm.name}
              onSelectTermDate={handleSelectTermDate}
              onExportMarkdown={handleExportMarkdown}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 py-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>Tiết Khí, Lịch Vạn Niên & Kỳ Môn - Lục Nhâm • </span>
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="inline-flex items-center gap-1 font-mono text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 transition-colors"
              title="Nhấn để xem ghi chú phiên bản"
            >
              <span>v{APP_VERSION}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({APP_RELEASE_DATE})</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnboardingTourOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1"
            >
              <span>Tour hướng dẫn</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors text-slate-600 dark:text-slate-400 font-medium"
            >
              Nhật ký cập nhật
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Thuyết minh thuật toán
            </button>
            <span>•</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Xuất dữ liệu (.MD)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <OnboardingTourModal
        isOpen={isOnboardingTourOpen}
        onClose={() => setIsOnboardingTourOpen(false)}
        onNavigateTab={(tabId) => {
          setActiveTab(tabId);
          setIsOnboardingTourOpen(false);
        }}
        onOpenAlgorithmModal={() => {
          setIsOnboardingTourOpen(false);
          setIsGuideOpen(true);
        }}
      />

      <AlgorithmGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        result={result}
        yearTerms={yearTerms}
        year={currentYear}
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />
    </div>
  );
}
