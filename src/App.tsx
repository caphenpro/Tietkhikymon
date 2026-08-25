import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { TimeInputControl } from './components/TimeInputControl';
import { OverviewCard } from './components/OverviewCard';
import { KyMonDunJiaPanel } from './components/KyMonDunJiaPanel';
import { NinePalacesCompass } from './components/NinePalacesCompass';
import { YearTermsTable } from './components/YearTermsTable';
import { LunarNewMoonSection } from './components/LunarNewMoonSection';
import { AlgorithmGuideModal } from './components/AlgorithmGuideModal';
import { ExportModal } from './components/ExportModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { calculateComprehensiveResult, calculateSolarTermsForYear } from './astronomy/calculator';
import { SolarTermEvent } from './types';
import { Bot, Sparkles, MessageSquareText } from 'lucide-react';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals & Chat state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(false);

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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFloatingChat={() => setIsFloatingChatOpen((prev) => !prev)}
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <OverviewCard result={result} />
            <KyMonDunJiaPanel kyMon={result.kyMon} />
          </div>
        )}

        {activeTab === 'compass' && (
          <div className="space-y-6">
            <NinePalacesCompass result={result} />
          </div>
        )}

        {activeTab === 'table' && (
          <div className="space-y-6">
            <YearTermsTable
              initialYear={currentYear}
              currentTermName={result.currentTerm.name}
              onSelectTermDate={handleSelectTermDate}
              onExportMarkdown={handleExportMarkdown}
            />
          </div>
        )}

        {activeTab === 'moon' && (
          <div className="space-y-6">
            <LunarNewMoonSection
              newMoon={result.newMoon}
              calculationDate={currentDate}
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-6">
            <GeminiChatbot result={result} />
          </div>
        )}
      </main>

      {/* Floating Chat Trigger Button (only visible if floating chat is closed and not on full chat tab) */}
      {!isFloatingChatOpen && activeTab !== 'chat' && (
        <button
          id="btn-floating-chat-trigger"
          onClick={() => setIsFloatingChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl shadow-xl shadow-amber-950/50 hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all group"
          title="Mở Trợ lý AI Hỏi Đáp Kỳ Môn"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1.5 -right-1.5 animate-spin [animation-duration:4s]" />
          </div>
          <span className="text-xs sm:text-sm">Hỏi Kỳ Môn AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isFloatingChatOpen && activeTab !== 'chat' && (
        <GeminiChatbot
          result={result}
          isFloating={true}
          onClose={() => setIsFloatingChatOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>Tính Tiết Khí & Kỳ Môn Độn Giáp • </span>
            <span className="text-slate-400 font-mono">Jean Meeus & Skyfield Precision Astronomical Engine</span>
          </div>
          <div className="flex items-center gap-3">
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
            <span>•</span>
            <button
              onClick={() => setActiveTab('chat')}
              className="hover:text-amber-300 text-amber-400/90 font-medium transition-colors"
            >
              Hỏi đáp AI
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
    </div>
  );
}

