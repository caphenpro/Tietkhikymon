import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Compass,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Shield,
  Zap,
  AlertCircle,
  Briefcase,
  Coins,
  Heart,
  HeartPulse,
  Compass as CompassIcon,
  Swords,
  UserCheck,
  ChevronRight,
  Flame,
  Key,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { KyMonInfo, BatTuInfo, ComprehensiveResult } from '../types';
import { CompleteKyMonChart, buildCompleteKyMonChart } from '../astronomy/kymonChart';
import { formatVietnamDateTime } from '../astronomy/solarTerms';
import { GeminiApiKeyModal, getStoredGeminiKey } from './GeminiApiKeyModal';
import { streamKyMonAiInterpretation, KyMonAiPayload, formatClientErrorMessage } from '../utils/geminiAdvisorEngine';

interface GeminiKyMonAiAdvisorProps {
  currentKyMon?: KyMonInfo;
  currentBatTu?: BatTuInfo;
  calculationDate?: Date;
  onNavigateTab?: (tabId: string) => void;
}

interface TopicPreset {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  defaultQuestion?: string;
}

const AI_TOPICS: TopicPreset[] = [
  {
    id: 'overview',
    title: 'Tổng Luận Quẻ Đại Cục',
    shortDesc: 'Thiên - Địa - Nhân - Thần, đắc thất thời vận, đại cục cát hung',
    icon: Sparkles,
    color: 'amber',
    defaultQuestion: 'Hãy tổng luận đại cục quẻ Kỳ Môn này: phân tích Thiên thời (sao), Nhân hòa (cửa), Địa lợi (cung), Thần trợ (thần) và đánh giá chung về thời vận hiện tại.',
  },
  {
    id: 'career',
    title: 'Sự Nghiệp & Công Danh',
    shortDesc: 'Khai Môn, Trực Phù, Đinh/Bính Kỳ, thi cử và thăng tiến',
    icon: Briefcase,
    color: 'blue',
    defaultQuestion: 'Chiêm đoán về công danh, sự nghiệp, thi cử, cơ hội thăng tiến hoặc thay đổi công việc trong quẻ này.',
  },
  {
    id: 'wealth',
    title: 'Tài Vận & Đầu Tư Kinh Doanh',
    shortDesc: 'Sinh Môn, Giáp Tý Mậu, tiền vốn, lợi tức và giao dịch',
    icon: Coins,
    color: 'emerald',
    defaultQuestion: 'Chiêm đoán về tài lộc, đầu tư kinh doanh, thu hồi vốn và ký kết hợp đồng thương mại.',
  },
  {
    id: 'marriage',
    title: 'Hôn Nhân & Tình Duyên',
    shortDesc: 'Ất (Vợ) - Canh (Chồng), Lục Hợp, gia đạo hòa hợp',
    icon: Heart,
    color: 'rose',
    defaultQuestion: 'Luận giải về tình cảm, nhân duyên, sự hòa hợp vợ chồng và tiến triển quan hệ gia đạo.',
  },
  {
    id: 'health',
    title: 'Sức Khỏe & Trị Bệnh',
    shortDesc: 'Thiên Nhuế bệnh phù, Sinh/Tử Môn, Thiên Tâm thầy thuốc',
    icon: HeartPulse,
    color: 'cyan',
    defaultQuestion: 'Xem xét sức khỏe, tình trạng bệnh tật (qua sao Thiên Nhuế, Sinh - Tử Môn) và phương hướng điều dưỡng, tìm thầy thuốc (sao Thiên Tâm, Kỳ Ất).',
  },
  {
    id: 'strategy',
    title: 'Chiến Lược Chủ - Khách & Thế Trận',
    shortDesc: 'Phân định Chủ (Tĩnh) hay Khách (Động) bên nào đắc lợi',
    icon: Swords,
    color: 'purple',
    defaultQuestion: 'Phân tích quy luật Chủ - Khách trong quẻ này: nếu khởi sự hoặc đàm phán, nên chủ động xuất kích (làm Khách) hay án binh bất động, chờ thời (làm Chủ)?',
  },
  {
    id: 'travel',
    title: 'Xuất Hành & Phương Vị Cát Lợi',
    shortDesc: 'Tam Kỳ Đắc Sứ, Hưu - Sinh - Khai Môn, quý nhân tương trợ',
    icon: CompassIcon,
    color: 'amber',
    defaultQuestion: 'Tìm phương vị cát lợi nhất để xuất hành, gặp gỡ đối tác hoặc cầu viện quý nhân trong giờ này.',
  },
  {
    id: 'destiny',
    title: 'Thân Mệnh Lục Thân',
    shortDesc: 'Nhật can bản thân, Lục Thân, vinh khô sang hèn',
    icon: UserCheck,
    color: 'indigo',
    defaultQuestion: 'Chiêm đoán thân mệnh theo Bàn Kỳ Môn: phân tích bản thân (Nhật Can), gia đình (Lục Thân) và quý nhân hộ trì.',
  },
];

const QUICK_PROMPTS = [
  'Việc hợp tác kinh doanh sắp tới có thuận lợi và sinh lời không?',
  'Dự định chuyển việc hoặc xin thăng chức trong thời điểm này có tốt không?',
  'Tôi nên xuất hành theo hướng nào trong giờ này để đón cát khí?',
  'Trong cuộc đàm phán sắp tới, tôi nên làm Chủ (phòng thủ) hay làm Khách (chủ động)?',
  'Tình duyên và khúc mắc hiện tại có hướng giải quyết êm đẹp không?',
];

export const GeminiKyMonAiAdvisor: React.FC<GeminiKyMonAiAdvisorProps> = ({
  currentKyMon,
  currentBatTu,
  calculationDate = new Date(),
  onNavigateTab,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('overview');
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(false);
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasCustomKey(Boolean(getStoredGeminiKey()));
  }, []);

  // Build complete chart details
  const chart: CompleteKyMonChart = useMemo(() => {
    const isDuong = currentKyMon ? currentKyMon.isDuongDon : true;
    const cucNum = currentKyMon ? currentKyMon.cucNumber : 1;

    let dCan = 'Giáp';
    let dChi = 'Tý';
    let hCan = 'Bính';
    let hChi = 'Dần';

    if (currentBatTu) {
      const dParts = currentBatTu.dayCanChi.split(' ');
      if (dParts.length >= 2) {
        dCan = dParts[0];
        dChi = dParts[1];
      }
      const hParts = currentBatTu.hourCanChi.split(' ');
      if (hParts.length >= 2) {
        hCan = hParts[0];
        hChi = hParts[1];
      }
    }

    return buildCompleteKyMonChart(isDuong, cucNum, dCan, dChi, hCan, hChi);
  }, [currentKyMon, currentBatTu]);

  const activeTopic = useMemo(
    () => AI_TOPICS.find((t) => t.id === selectedTopicId) || AI_TOPICS[0],
    [selectedTopicId]
  );

  // Prepare payload for Gemini interpretation
  const preparePayload = (topicId: string, question?: string): KyMonAiPayload => {
    const topicObj = AI_TOPICS.find((t) => t.id === topicId) || AI_TOPICS[0];

    const palacesData = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((pNum) => {
      const p = chart.palaces[pNum];
      return {
        palaceNum: pNum,
        palaceName: p?.palaceName || '',
        direction: p?.direction || '',
        element: p?.element || '',
        thienCan: p?.heavenStem || '',
        diaCan: p?.earthStem || '',
        star: p?.heavenStar || '',
        door: p?.door || '',
        deity: p?.god || '',
        cachCucName: p?.formations?.[0] || undefined,
        isTuanKhong: p?.isTuanKhong,
        isDichMa: p?.isDichMa,
      };
    });

    return {
      chartInfo: {
        formattedDate: formatVietnamDateTime(calculationDate),
        solarTerm: currentKyMon?.termUsed || 'Chưa xác định',
        batTu: {
          year: currentBatTu?.yearCanChi || '',
          month: currentBatTu?.monthCanChi || '',
          day: currentBatTu?.dayCanChi || '',
          hour: currentBatTu?.hourCanChi || '',
        },
        cucName: chart.cucName,
        donType: chart.isDuongDon ? 'Dương độn' : 'Âm độn',
        cucNumber: chart.cucNumber,
        ruleType: currentKyMon?.ruleType || 'Siêu Thần Tiếp Khí',
        phuDau: currentKyMon?.currentPhuDauCanChi || '',
        nguyen: currentKyMon?.nguyen || 'Thượng Nguyên',
        tuanThu: `${chart.tuanThuGiap} (${chart.tuanThuCan})`,
        trucPhuStar: chart.trucPhuStar,
        trucPhuPalace: chart.trucPhuNewPalace,
        trucSuDoor: chart.trucSuDoor,
        trucSuPalace: chart.trucSuNewPalace,
        tuanKhong: chart.tuanKhongChi,
        dichMa: chart.dichMaChi,
        palaces: palacesData,
      },
      topic: topicId,
      topicTitle: topicObj.title,
      userQuestion: question || topicObj.defaultQuestion,
    };
  };

  const handleGenerateInterpretation = async (
    topicId: string = selectedTopicId,
    overrideQuestion?: string
  ) => {
    setIsLoading(true);
    setErrorMsg(null);
    setAiResponse('');

    const questionToSend = overrideQuestion !== undefined ? overrideQuestion : customQuestion;
    const payload = preparePayload(topicId, questionToSend);

    try {
      let accumulated = '';
      await streamKyMonAiInterpretation(payload, (chunk) => {
        accumulated += chunk;
        setAiResponse(accumulated);
      });
    } catch (err: unknown) {
      console.error('Gemini Stream Error:', err);
      const msg = formatClientErrorMessage(err);
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* API Key Modal */}
      <GeminiApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={(key) => {
          setHasCustomKey(Boolean(key));
          if (key) {
            setErrorMsg(null);
          }
        }}
      />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Luận Giải AI Kỳ Môn Độn Giáp</span>
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Gemini 3.7 / 2.5 Flash</span>
                </span>
                {hasCustomKey ? (
                  <span className="text-xs px-2 py-0.5 rounded font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <Key className="w-3 h-3 text-emerald-400" />
                    <span>Đã nạp Key cá nhân</span>
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    Hệ thống AI
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Phân tích chuyên sâu quẻ Kỳ Môn dựa trên nguyên bản cổ thư, luận giải Dụng Thần, Tam Bàn, Chủ - Khách &amp; đưa ra lời khuyên thực tế.
              </p>
            </div>
          </div>

          {/* Action & API Key Config Button */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="btn-open-api-key-modal"
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border shadow-sm ${
                hasCustomKey
                  ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border-amber-500/40'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>{hasCustomKey ? 'Cấu Hình API Key' : '🔑 Cấu Hình API Key'}</span>
            </button>

            {/* Current Chart Summary Pill */}
            <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-xl shadow-inner text-xs font-mono">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Quẻ Hiện Tại</div>
                <div className="text-amber-300 font-bold">{chart.cucName}</div>
                <div className="text-slate-400 text-[11px]">Giờ {chart.hourCanChi}</div>
              </div>
              <div className="w-2 h-7 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>

        {/* Quick Topic Presets Selector Grid */}
        <div className="mt-4 pt-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Chọn Chuyên Đề Luận Giải Nhanh:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {AI_TOPICS.map((topic) => {
              const IconComp = topic.icon;
              const isSelected = selectedTopicId === topic.id;

              return (
                <button
                  key={topic.id}
                  id={`btn-topic-${topic.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setCustomQuestion('');
                    handleGenerateInterpretation(topic.id, topic.defaultQuestion);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        isSelected ? 'text-amber-300' : 'text-slate-200'
                      }`}
                    >
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {topic.shortDesc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Question Input Box & Quick Prompts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Đặt Câu Hỏi Chiêm Đoán Tùy Biến:</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Chuyên đề đang chọn: <strong className="text-amber-300">{activeTopic.title}</strong>
          </span>
        </div>

        {/* Text Input Area */}
        <div className="relative">
          <textarea
            id="input-ai-custom-question"
            rows={2}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder={`Nhập câu hỏi chiêm đoán cụ thể của bạn (hoặc nhấn nút "Luận Giải" để dùng câu hỏi mặc định theo chuyên đề ${activeTopic.title})...`}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
            <Zap className="w-3 h-3 text-amber-400" />
            Gợi ý nhanh:
          </span>
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCustomQuestion(promptText);
                handleGenerateInterpretation(selectedTopicId, promptText);
              }}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-[11px] transition-colors cursor-pointer text-left"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Thời điểm lập quẻ: {formatVietnamDateTime(calculationDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            {aiResponse && (
              <button
                id="btn-ai-copy"
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép kết quả'}</span>
              </button>
            )}

            <button
              id="btn-ai-submit"
              type="button"
              disabled={isLoading}
              onClick={() => handleGenerateInterpretation(selectedTopicId, customQuestion)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                isLoading
                  ? 'bg-amber-600/50 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Đang Giải Mã Quẻ...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Luận Giải Quẻ Bằng AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert Display with Instant Configure API Key Button */}
      {errorMsg && (
        <div className="bg-red-950/40 border border-red-800/80 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-red-300 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <div className="font-bold text-red-200">Lỗi khi gọi mô hình Gemini AI:</div>
              <div className="text-red-300 leading-relaxed">{errorMsg}</div>
              <div className="text-slate-400 text-xs mt-1">
                Bạn có thể nhấn nút <strong>&quot;Cấu hình API Key&quot;</strong> bên dưới để dán API Key cá nhân miễn phí từ Google AI Studio (tự động lưu vào trình duyệt localStorage).
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 border-t border-red-900/50">
            <button
              id="btn-error-config-api-key"
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Cấu hình API Key Cá Nhân</span>
            </button>

            <button
              type="button"
              onClick={() => handleGenerateInterpretation(selectedTopicId, customQuestion)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Thử Lại</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton / Pulse View */}
      {isLoading && !aiResponse && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-lg">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
            <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Đại Sư Gemini Đang Trích Xuất Bàn Kỳ Môn...</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Đang phối hợp Thiên Bàn Cửu Tinh, Nhân Bàn Bát Môn, Địa Bàn Cửu Cung, Thần Bàn Bát Thần và quan hệ Ngũ Hành để lập bài luận giải chuyên sâu.
            </p>
          </div>
        </div>
      )}

      {/* Main AI Output Viewer (Markdown Rendered) */}
      {aiResponse && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4">
          {/* Header with Title & Action */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Bài Luận Giải Chi Tiết</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal">
                    {activeTopic.title}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Được tạo bởi Gemini AI (Kỳ Môn Độn Giáp Engine)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-ai-copy-top"
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>

              <button
                id="btn-ai-regen"
                type="button"
                disabled={isLoading}
                onClick={() => handleGenerateInterpretation(selectedTopicId, customQuestion)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
                title="Tạo lại bài luận"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-3.5 text-slate-200">
            <div className="markdown-body">
              <Markdown>{aiResponse}</Markdown>
            </div>
          </div>

          <div ref={responseEndRef} />

          {/* Footer of Output */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Căn cứ: <em>Kỳ Môn Độn Giáp Bí Kíp Toàn Thư &amp; Ngự Định Kỳ Môn Bảo Giám</em>
            </span>

            {onNavigateTab && (
              <button
                id="btn-goto-full-board-from-ai"
                type="button"
                onClick={() => onNavigateTab('kymon-chart')}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Đối chiếu Bàn Kỳ Môn 9 Cung</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Initial Empty State Banner if no response yet */}
      {!aiResponse && !isLoading && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white">Sẵn Sàng Luận Giải Quẻ Kỳ Môn</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Chọn một trong các chuyên đề phía trên hoặc nhập câu hỏi chiêm đoán riêng của bạn rồi nhấn nút <strong>&quot;Luận Giải Quẻ Bằng AI&quot;</strong> để nhận bài luận giải chi tiết tức thì.
          </p>
        </div>
      )}
    </div>
  );
};
