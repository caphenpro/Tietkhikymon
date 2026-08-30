import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { YearTermsTable } from './components/YearTermsTable';
import { LunarNewMoonSection } from './components/LunarNewMoonSection';
import { KyMonCompleteBoard } from './components/KyMonCompleteBoard';
import { KyMonPrognosticationView } from './components/KyMonPrognosticationView';
import { LucNhamPanel } from './components/LucNhamPanel';
import { CosmicKnowledgeGuide } from './components/CosmicKnowledgeGuide';
import { AlgorithmGuideModal } from './components/AlgorithmGuideModal';
import { ExportModal } from './components/ExportModal';
import { ChangelogModal } from './components/ChangelogModal';
import { calculateComprehensiveResult, calculateSolarTermsForYear } from './astronomy/calculator';
import { SolarTermEvent } from './types';
import { APP_VERSION, APP_RELEASE_DATE } from './version';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('guide');

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState<boolean>(false);

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
    setActiveTab('moon');
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        result={result}
        onDateChange={(d) => setCurrentDate(d)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Cẩm Nang Tri Thức (Trang Chủ) */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <CosmicKnowledgeGuide
              result={result}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
              onOpenAlgorithmModal={() => setIsGuideOpen(true)}
            />
          </div>
        )}

        {/* Tab 2: Điểm Sóc & Âm Lịch (Thiên Văn) */}
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

        {/* Bàn Kỳ Môn Độn Giáp 9 Cung (Điều hướng từ Cẩm Nang) */}
        {activeTab === 'kymon-chart' && (
          <div className="space-y-6">
            <KyMonCompleteBoard
              currentKyMon={result.kyMon}
              currentBatTu={result.batTu}
              onOpenPrognostication={() => setActiveTab('kymon-prognostication')}
              onSwitchToLucNham={() => setActiveTab('luc-nham')}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* Bàn Đại Lục Nhâm Tam Truyền (Điều hướng từ Cẩm Nang) */}
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

        {/* Tab 3: Dự Trắc Chuyên Sâu Kỳ Môn */}
        {activeTab === 'kymon-prognostication' && (
          <div className="space-y-6">
            <KyMonPrognosticationView
              currentKyMon={result.kyMon}
              currentBatTu={result.batTu}
              onBackToBoard={() => setActiveTab('guide')}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

        {/* Tab 4: 24 Tiết Khí Năm */}
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
            <span>Tính Tiết Khí & Kỳ Môn Độn Giáp • </span>
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
              onClick={() => setIsChangelogOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors text-amber-600 dark:text-amber-400/90 font-medium"
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
