/**
 * mesErrorCodeConstants.js
 * Các hằng số, cấu hình nhãn, màu sắc huy hiệu và bộ lọc cho module MES ERROR CODE LIST
 */

export const MES_ERROR_CODES_STORAGE_KEY = 'mes_error_codes_master_list';

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const OWNER_OPTIONS = [
  { value: 'ALL', label: 'Tất cả bộ phận' },
  { value: 'PE', label: 'PE (Process Engineering)' },
  { value: 'TE', label: 'TE (Test Engineering)' },
  { value: 'ME', label: 'ME (Mechanical / Automation)' },
  { value: 'QA', label: 'QA (Quality Assurance)' },
  { value: 'MES/IT', label: 'MES / IT (System Engineering)' },
];

export const SEVERITY_OPTIONS = [
  { value: 'Critical', label: 'Nghiêm trọng (Critical)' },
  { value: 'Major', label: 'Mức cao (Major)' },
  { value: 'Minor', label: 'Mức trung bình (Minor)' },
  { value: 'Warning', label: 'Cảnh báo (Warning)' },
];

export const OWNER_BADGE_CONFIG = {
  PE: {
    label: 'PE / Process',
    foxconnClass: 'bg-blue-100 text-blue-800 border-blue-200',
    nvidiaClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  TE: {
    label: 'TE / Test',
    foxconnClass: 'bg-purple-100 text-purple-800 border-purple-200',
    nvidiaClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
  ME: {
    label: 'ME / Auto',
    foxconnClass: 'bg-amber-100 text-amber-800 border-amber-200',
    nvidiaClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  QA: {
    label: 'QA / Quality',
    foxconnClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    nvidiaClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  'MES/IT': {
    label: 'MES / IT',
    foxconnClass: 'bg-rose-100 text-rose-800 border-rose-200',
    nvidiaClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  },
};

export const SEVERITY_BADGE_CONFIG = {
  Critical: {
    label: 'CRITICAL',
    foxconnClass: 'bg-rose-50 text-rose-700 border-rose-300',
    nvidiaClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  },
  Major: {
    label: 'MAJOR',
    foxconnClass: 'bg-amber-50 text-amber-700 border-amber-300',
    nvidiaClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  Minor: {
    label: 'MINOR',
    foxconnClass: 'bg-blue-50 text-blue-700 border-blue-300',
    nvidiaClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  },
  Warning: {
    label: 'WARNING',
    foxconnClass: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    nvidiaClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  },
};

