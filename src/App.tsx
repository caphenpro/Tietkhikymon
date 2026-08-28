import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { TimeInputControl } from './components/TimeInputControl';
import { OverviewCard } from './components/OverviewCard';
import { KyMonDunJiaPanel } from './components/KyMonDunJiaPanel';
import { NinePalacesCompass } from './components/NinePalacesCompass';
import { YearTermsTable } from './components/YearTermsTable';
import { LunarNewMoonSection } from './components/LunarNewMoonSection';
import { KyMonCompleteBoard } from './components/KyMonCompleteBoard';
import { KyMonPrognosticationView } from './components/KyMonPrognosticationView';
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
  const [activeTab, setActiveTab] = useState<string>('overview');

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

  // Handler to select a term date from the table and jump to overview
  const handleSelectTermDate = useCallback((date: Date) => {
    setIsLive(false);
    setCurrentDate(date);
    setActiveTab('overview');
  }, []);

  const handleExportMarkdown = useCallback((_year: number, _terms: SolarTermEvent[]) => {
    setIsExportOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 relative">
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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Time Control Bar */}
        <TimeInputControl
          currentDate={currentDate}
          onDateChange={(d) => setCurrentDate(d)}
          isLive={isLive}
          onSetLive={(live) => setIsLive(live)}
        />

        {/* Tab Content */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <CosmicKnowledgeGuide
              result={result}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
              onOpenAlgorithmModal={() => setIsGuideOpen(true)}
            />
          </div>
        )}

        {activeTab === 'overview' && (
           <div className="space-y-6">
             <OverviewCard
               result={result}
               currentDate={currentDate}
               onDateChange={(d) => setCurrentDate(d)}
               isLive={isLive}
               onSetLive={(live) => setIsLive(live)}
               onNavigateTab={(tabId: string) => setActiveTab(tabId)}
             />
             <KyMonDunJiaPanel
               kyMon={result.kyMon}
               onOpenCompleteBoard={() => setActiveTab('kymon-chart')}
               onOpenPrognostication={() => setActiveTab('kymon-prognostication')}
             />
           </div>
         )}

         {activeTab === 'kymon-chart' && (
           <div className="space-y-6">
             <KyMonCompleteBoard
               currentKyMon={result.kyMon}
               currentBatTu={result.batTu}
               onOpenPrognostication={() => setActiveTab('kymon-prognostication')}
             />
           </div>
         )}

         {activeTab === 'kymon-prognostication' && (
           <div className="space-y-6">
             <KyMonPrognosticationView
               currentKyMon={result.kyMon}
               currentBatTu={result.batTu}
               onBackToBoard={() => setActiveTab('kymon-chart')}
             />
           </div>
         )}

         {activeTab === 'compass' && (
          <div className="space-y-6">
            <NinePalacesCompass
              result={result}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}

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

        {activeTab === 'moon' && (
          <div className="space-y-6">
            <LunarNewMoonSection
              newMoon={result.newMoon}
              calculationDate={currentDate}
              onNavigateTab={(tabId: string) => setActiveTab(tabId)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>Tính Tiết Khí & Kỳ Môn Độn Giáp • </span>
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="inline-flex items-center gap-1 font-mono text-amber-400 hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 transition-colors"
              title="Nhấn để xem ghi chú phiên bản"
            >
              <span>v{APP_VERSION}</span>
              <span className="text-[10px] text-slate-400 font-normal">({APP_RELEASE_DATE})</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChangelogOpen(true)}
              className="hover:text-amber-300 transition-colors text-amber-400/90 font-medium"
            >
              Nhật ký cập nhật
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-amber-300 transition-colors"
            >
              Thuyết minh thuật toán
            </button>
            <span>•</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-amber-300 transition-colors"
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
