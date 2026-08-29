import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false }) => {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const themeOptions: { mode: ThemeMode; label: string; subLabel: string; icon: React.FC<{ className?: string }> }[] = [
    {
      mode: 'system',
      label: 'Hệ thống',
      subLabel: 'Tự động theo trình duyệt',
      icon: Laptop,
    },
    {
      mode: 'light',
      label: 'Chế độ Sáng',
      subLabel: 'Thanh nhã, độ sáng cao',
      icon: Sun,
    },
    {
      mode: 'dark',
      label: 'Chế độ Tối',
      subLabel: 'Thiên văn huyền bí',
      icon: Moon,
    },
  ];

  const getActiveIcon = () => {
    if (themeMode === 'system') {
      return Laptop;
    }
    return resolvedTheme === 'dark' ? Moon : Sun;
  };

  const ActiveIcon = getActiveIcon();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="btn-theme-switcher"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all text-xs font-medium ${
          resolvedTheme === 'dark'
            ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-amber-300 hover:border-slate-700'
            : 'bg-slate-100/90 border-slate-200 text-slate-700 hover:text-amber-700 hover:border-slate-300 shadow-sm'
        }`}
        title={`Giao diện: ${
          themeMode === 'system'
            ? `Tự động (${resolvedTheme === 'dark' ? 'Đang Tối' : 'Đang Sáng'})`
            : themeMode === 'dark'
            ? 'Chế độ Tối'
            : 'Chế độ Sáng'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ActiveIcon
          className={`w-3.5 h-3.5 ${
            resolvedTheme === 'dark'
              ? themeMode === 'system'
                ? 'text-cyan-400'
                : 'text-amber-400'
              : themeMode === 'system'
              ? 'text-cyan-600'
              : 'text-amber-600'
          }`}
        />
        {!compact && (
          <span className="hidden xl:inline text-[11px]">
            {themeMode === 'system' ? 'Tự động' : themeMode === 'dark' ? 'Tối' : 'Sáng'}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="theme-dropdown-menu"
          className={`absolute right-0 mt-1.5 w-56 rounded-2xl p-1.5 shadow-2xl border z-50 animate-fadeIn backdrop-blur-md ${
            resolvedTheme === 'dark'
              ? 'bg-slate-950/95 border-slate-800 text-slate-200'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}
        >
          <div className="px-2.5 py-1.5 border-b border-slate-700/40 text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
            <span>Giao diện hiển thị</span>
            <span className="font-mono text-amber-500">
              {resolvedTheme === 'dark' ? 'Đang Tối' : 'Đang Sáng'}
            </span>
          </div>

          <div className="space-y-1 mt-1">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = themeMode === opt.mode;

              return (
                <button
                  key={opt.mode}
                  type="button"
                  id={`theme-opt-${opt.mode}`}
                  onClick={() => {
                    setThemeMode(opt.mode);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                    isSelected
                      ? resolvedTheme === 'dark'
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                        : 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : resolvedTheme === 'dark'
                      ? 'hover:bg-slate-900 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? resolvedTheme === 'dark'
                            ? 'bg-amber-500/30 text-amber-300'
                            : 'bg-amber-200 text-amber-800'
                          : resolvedTheme === 'dark'
                          ? 'bg-slate-900 text-slate-400'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold leading-none">{opt.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{opt.subLabel}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check
                      className={`w-4 h-4 ${
                        resolvedTheme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
