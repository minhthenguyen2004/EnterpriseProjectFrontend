/**
 * Hằng số cấu hình cho màn hình Quản lý Chuyền Tự Động (Autoline Management)
 */

export const MACHINE_STATUS = {
  RUN: 'RUN',
  IDLE: 'IDLE',
  STOP: 'STOP',
  ERROR: 'ERROR',
};

export const STATUS_CONFIG = {
  [MACHINE_STATUS.RUN]: {
    label: { vi: 'ĐANG CHẠY', en: 'RUNNING', zh: '运行中' },
    code: 'RUN',
    colorHex: '#10B981',
    light: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      dotBg: 'bg-emerald-500',
      glow: 'shadow-emerald-500/20',
      borderAccent: 'border-emerald-500/30',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    dark: {
      badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/50',
      dotBg: 'bg-emerald-400',
      glow: 'shadow-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
      borderAccent: 'border-emerald-500/40',
      gradient: 'from-emerald-500/15 to-transparent',
    },
  },
  [MACHINE_STATUS.IDLE]: {
    label: { vi: 'CHỜ PHÔI', en: 'IDLE', zh: '待机 / 等料' },
    code: 'IDLE',
    colorHex: '#F59E0B',
    light: {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-300',
      dotBg: 'bg-amber-500',
      glow: 'shadow-amber-500/20',
      borderAccent: 'border-amber-500/30',
      gradient: 'from-amber-500/10 to-transparent',
    },
    dark: {
      badgeBg: 'bg-amber-950/60 text-amber-400 border-amber-500/50',
      dotBg: 'bg-amber-400',
      glow: 'shadow-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.35)]',
      borderAccent: 'border-amber-500/40',
      gradient: 'from-amber-500/15 to-transparent',
    },
  },
  [MACHINE_STATUS.STOP]: {
    label: { vi: 'TẠM DỪNG', en: 'STOPPED', zh: '停机 / 保养' },
    code: 'STOP',
    colorHex: '#64748B',
    light: {
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
      dotBg: 'bg-slate-400',
      glow: 'shadow-slate-500/10',
      borderAccent: 'border-slate-300',
      gradient: 'from-slate-500/10 to-transparent',
    },
    dark: {
      badgeBg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      dotBg: 'bg-zinc-400',
      glow: 'shadow-zinc-500/20',
      borderAccent: 'border-zinc-700',
      gradient: 'from-zinc-500/15 to-transparent',
    },
  },
  [MACHINE_STATUS.ERROR]: {
    label: { vi: 'BÁO LỖI', en: 'ALARM / ERROR', zh: '报警 / 故障' },
    code: 'ERROR',
    colorHex: '#EF4444',
    light: {
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-300',
      dotBg: 'bg-rose-500',
      glow: 'shadow-rose-500/25',
      borderAccent: 'border-rose-500/40',
      gradient: 'from-rose-500/15 to-transparent',
    },
    dark: {
      badgeBg: 'bg-rose-950/70 text-rose-400 border-rose-500/60',
      dotBg: 'bg-rose-500',
      glow: 'shadow-rose-500/40 shadow-[0_0_16px_rgba(239,68,68,0.5)]',
      borderAccent: 'border-rose-500/60',
      gradient: 'from-rose-500/20 to-transparent',
    },
  },
};

export const TIME_PRESETS = [
  { id: 'shift_1', label: { vi: 'Ca 1 (08:00 - 16:00)', en: 'Shift 1 (08:00 - 16:00)', zh: '早班 (08:00 - 16:00)' } },
  { id: 'shift_2', label: { vi: 'Ca 2 (16:00 - 00:00)', en: 'Shift 2 (16:00 - 00:00)', zh: '中班 (16:00 - 00:00)' } },
  { id: 'shift_3', label: { vi: 'Ca 3 (00:00 - 08:00)', en: 'Shift 3 (00:00 - 08:00)', zh: '晚班 (00:00 - 08:00)' } },
  { id: 'today', label: { vi: 'Hôm nay (24h)', en: 'Today (Full Day)', zh: '今日整天' } },
  { id: 'last_7_days', label: { vi: '7 Ngày gần nhất', en: 'Last 7 Days', zh: '最近7天' } },
];
