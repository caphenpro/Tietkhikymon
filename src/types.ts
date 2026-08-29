export interface SolarTerm {
  degree: number;
  name: string;
  category: 'Tiết' | 'Khí';
}

export interface SolarTermEvent {
  name: string;
  degree: number;
  category: 'Tiết' | 'Khí';
  exactDate: Date; // In local timezone (UTC+7)
  cungName: string;
  cungNumber: number;
  direction: string;
}

export interface LunarTermDetail {
  name: string;
  category: 'Tiết' | 'Khí';
  degree: number;
  exactDate: Date;
}

export interface LunarYearMonthSummary {
  monthIndex: number;
  monthName: string;
  isLeap: boolean;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  isCurrent: boolean;
  terms: LunarTermDetail[];
}

export interface LunarYearLeapInfo {
  lunarYear: number;
  lunarYearCanChi: string;
  hasLeapMonth: boolean;
  leapMonthNumber?: number;
  leapMonthName?: string;
  leapMonthDisplay?: string;
  leapMonthStartDate?: Date;
  leapMonthEndDate?: Date;
  leapMonthTotalDays?: number;
  leapMonthDaysType?: string;
  leapMonthStatus?: 'current' | 'upcoming' | 'passed' | 'none';
  leapMonthStatusText?: string;
  totalMonthsInYear: number; // 12 or 13
  totalDaysInYear: number; // e.g. 354, 355, 383, 384, 385
  months: LunarYearMonthSummary[];
  leapStatusDescription: string;
  leapAstronomicalReason: string;
}

export interface LunarDateInfo {
  lunarDay: number;
  lunarMonth: number;
  lunarMonthName: string;
  isLeapMonth: boolean;
  fullMonthDisplay: string;
  lunarYear: number;
  lunarYearCanChi: string;
  lunarFullDateText: string;
  totalMonthDays: number;
  monthType: string;
  prevSocDate: Date;
  nextSocDate: Date;
  prevPassedString: string;
  prevPassedDays: number;
  nextRemainingString: string;
  nextRemainingDays: number;
  termsInMonth: LunarTermDetail[];
  tiets: string[];
  khis: string[];
  hasTiet: boolean;
  hasKhi: boolean;
  monthRuleExplanation: string;
  yearLeapInfo: LunarYearLeapInfo;
}

export type NewMoonInfo = LunarDateInfo;

export interface BatTuInfo {
  yearCanChi: string;
  monthCanChi: string;
  dayCanChi: string;
  hourCanChi: string;
  fullText: string;
  solarYear: number;
}

export type KyMonRuleType = 'Chính Khí' | 'Siêu Thần' | 'Tiếp Khí' | 'Nhuận Cục';
export type NguyenType = 'Thượng Nguyên' | 'Trung Nguyên' | 'Hạ Nguyên';

export interface KyMonInfo {
  currentPhuDauDate: Date;
  currentPhuDauCanChi: string;
  nguyen: NguyenType;
  nguyenCode: number; // 0: Thuong, 1: Trung, 2: Ha
  phuDauChi: string;
  phuDauThuongNguyenDate: Date;
  phuDauThuongNguyenCanChi: string;
  ruleType: KyMonRuleType;
  reason: string;
  termUsed: string;
  cungName: string;
  cungNumber: number;
  direction: string;
  isDuongDon: boolean;
  donType: 'Dương độn' | 'Âm độn';
  cucNumber: number;
  fullAnalysisText: string;
  cucResultText: string;
}

export interface ComprehensiveResult {
  calculationTime: Date;
  solarLongitude: number;
  solarLongitudeDMS: string;
  currentTerm: {
    name: string;
    degree: number;
    category: 'Tiết' | 'Khí';
    startDate: Date;
    passedString: string;
    passedSeconds: number;
    cungName: string;
    cungNumber: number;
  };
  nextTerm: {
    name: string;
    degree: number;
    category: 'Tiết' | 'Khí';
    startDate: Date;
    remainingString: string;
    remainingSeconds: number;
    cungName: string;
    cungNumber: number;
  };
  batTu: BatTuInfo;
  newMoon: NewMoonInfo;
  kyMon: KyMonInfo;
}

export interface BaguaPalace {
  number: number;
  name: string;
  hskName: string;
  direction: string;
  element: string;
  terms: string[];
  duongJu: number[];
  amJu: number[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'assistant';
  content: string;
  timestamp: Date;
  error?: boolean;
}

export interface ChatContextPayload {
  formattedDateTime?: string;
  termName?: string;
  sunLongitude?: string;
  termType?: string;
  cungName?: string;
  canChiYear?: string;
  canChiMonth?: string;
  canChiDay?: string;
  canChiHour?: string;
  phuDau?: string;
  nguyenName?: string;
  trangThaiCuc?: string;
  doLechDays?: number;
  cucKetLuan?: string;
  amDuongDon?: string;
  lunarInfo?: string;
}

