import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Check, X, Shield, ExternalLink, RefreshCw, AlertCircle, Sparkles, Trash2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { formatClientErrorMessage } from '../utils/geminiAdvisorEngine';

interface GeminiApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: (key: string) => void;
}

export const LOCAL_STORAGE_GEMINI_KEY = 'kymon_gemini_api_key';

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(LOCAL_STORAGE_GEMINI_KEY)?.trim() || '';
  } catch {
    return '';
  }
}

export function setStoredGeminiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(LOCAL_STORAGE_GEMINI_KEY, key.trim());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_GEMINI_KEY);
    }
  } catch (e) {
    console.error('Lỗi khi lưu API Key vào localStorage:', e);
  }
}

export const GeminiApiKeyModal: React.FC<GeminiApiKeyModalProps> = ({ isOpen, onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredGeminiKey();
      setApiKey(stored);
      setTestResult(null);
      setIsSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    setStoredGeminiKey(trimmed);
    setIsSavedSuccess(true);
    if (onKeySaved) {
      onKeySaved(trimmed);
    }
    setTimeout(() => {
      setIsSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setStoredGeminiKey('');
    setApiKey('');
    setTestResult(null);
    if (onKeySaved) {
      onKeySaved('');
    }
  };

  const handleTestKey = async () => {
    const keyToTest = apiKey.trim();
    if (!keyToTest) {
      setTestResult({ success: false, message: 'Vui lòng nhập API Key trước khi kiểm tra.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: keyToTest });
      const testModels = ['gemini-2.5-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
      let isOk = false;
      let lastTestErr: unknown = null;

      for (const modelName of testModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: 'Xin chào, hãy phản hồi chữ: KẾT NỐI THÀNH CÔNG',
          });

          if (response.text) {
            isOk = true;
            break;
          }
        } catch (mErr) {
          lastTestErr = mErr;
        }
      }

      if (isOk) {
        setTestResult({
          success: true,
          message: 'Tuyệt vời! API Key hợp lệ và kết nối mô hình Gemini thành công.',
        });
      } else {
        const cleanMsg = lastTestErr ? formatClientErrorMessage(lastTestErr) : 'API Key không hợp lệ hoặc đã hết hạn ngạch.';
        setTestResult({
          success: false,
          message: `Lỗi kết nối: ${cleanMsg}`,
        });
      }
    } catch (err: unknown) {
      console.error('Test API Key error:', err);
      const cleanMsg = formatClientErrorMessage(err);
      setTestResult({
        success: false,
        message: `Lỗi kết nối: ${cleanMsg}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Cấu Hình Gemini API Key</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-normal">
                  Cá nhân
                </span>
              </h3>
              <p className="text-xs text-slate-400">Lưu trực tiếp trong trình duyệt (localStorage)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs sm:text-sm text-slate-200">
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Bảo Mật &amp; Lưu Trữ Cục Bộ</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              API Key của bạn sẽ được lưu trực tiếp vào <strong>localStorage</strong> của trình duyệt trên thiết bị này. Lần sau mở ứng dụng bạn sẽ không cần phải nhập lại. Key được gửi an toàn trực tiếp để gọi các mô hình AI.
            </p>
          </div>

          {/* Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Khóa API Key (Google AI Studio):
            </label>
            <div className="relative flex items-center">
              <input
                id="input-gemini-api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Dán mã API Key của bạn (ví dụ: AIzaSy...)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 pr-20 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
                  title={showKey ? 'Ẩn Key' : 'Hiện Key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Test connection result display */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-red-950/40 border-red-800 text-red-300'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>{testResult.message}</div>
            </div>
          )}

          {isSavedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Đã lưu API Key thành công vào trình duyệt!</span>
            </div>
          )}

          {/* Instructions to get free Key */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Chưa có API Key?</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 underline underline-offset-2"
            >
              <span>Lấy API Key Miễn Phí Tại Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-2">
          {apiKey ? (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isTesting || !apiKey.trim()}
              onClick={handleTestKey}
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                isTesting || !apiKey.trim()
                  ? 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang thử...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kiểm Tra Kết Nối</span>
                </>
              )}
            </button>

            <button
              id="btn-save-gemini-key"
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Cấu Hình</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
