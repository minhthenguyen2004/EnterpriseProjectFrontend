export const MACHINE_STATUS = {
  RUN: 'RUN',
  IDLE: 'IDLE',
  STOP: 'STOP',
  ERROR: 'ERROR',
};

export const MACHINE_STATUS_CONFIG = {
  RUN: {
    label: 'RUNNING',
    shortLabel: 'RUN',
    color: 'emerald',
    textFoxconn: 'text-emerald-700',
    bgFoxconn: 'bg-emerald-50',
    borderFoxconn: 'border-emerald-300',
    textNvidia: 'text-emerald-400',
    bgNvidia: 'bg-emerald-950/60',
    borderNvidia: 'border-emerald-500/50',
    dotColor: 'bg-emerald-500',
    glowNvidia: 'shadow-[0_0_10px_rgba(16,185,129,0.4)]',
  },
  IDLE: {
    label: 'IDLE / CHỜ',
    shortLabel: 'IDLE',
    color: 'amber',
    textFoxconn: 'text-amber-700',
    bgFoxconn: 'bg-amber-50',
    borderFoxconn: 'border-amber-300',
    textNvidia: 'text-amber-400',
    bgNvidia: 'bg-amber-950/60',
    borderNvidia: 'border-amber-500/50',
    dotColor: 'bg-amber-400',
    glowNvidia: 'shadow-[0_0_8px_rgba(245,158,11,0.3)]',
  },
  STOP: {
    label: 'STOPPED',
    shortLabel: 'STOP',
    color: 'slate',
    textFoxconn: 'text-slate-700',
    bgFoxconn: 'bg-slate-100',
    borderFoxconn: 'border-slate-300',
    textNvidia: 'text-zinc-200',
    bgNvidia: 'bg-zinc-800',
    borderNvidia: 'border-zinc-700',
    dotColor: 'bg-slate-400',
    glowNvidia: 'shadow-none',
  },
  ERROR: {
    label: 'ERROR / ALARM',
    shortLabel: 'ERROR',
    color: 'rose',
    textFoxconn: 'text-rose-700',
    bgFoxconn: 'bg-rose-50',
    borderFoxconn: 'border-rose-300',
    textNvidia: 'text-rose-400',
    bgNvidia: 'bg-rose-950/60',
    borderNvidia: 'border-rose-500/50',
    dotColor: 'bg-rose-500',
    glowNvidia: 'shadow-[0_0_12px_rgba(244,63,94,0.6)]',
  },
};

export const FACTORIES = [
  { id: 'all', name: 'Tất cả nhà máy' },
  { id: 'factory_01', name: 'Nhà máy F01 - KCN Quế Võ (Bắc Ninh)' },
  { id: 'factory_02', name: 'Nhà máy F02 - KCN Yên Phong (Bắc Ninh)' },
  { id: 'factory_03', name: 'Nhà máy F03 - KCN Quang Châu (Bắc Giang)' },
  { id: 'factory_05', name: 'Nhà máy F05 - KCN Đình Vũ (Hải Phòng)' },
];

export const FLOORS = [
  { id: 'all', name: 'Tất cả các tầng' },
  { id: 'floor_01', name: 'Tầng 1 (F1) - Xưởng Gia Công Sơ Bộ' },
  { id: 'floor_02', name: 'Tầng 2 (F2) - Xưởng SMT Cao Tốc & Cleanroom' },
  { id: 'floor_03', name: 'Tầng 3 (F3) - Xưởng Lắp Ráp Hệ Thống & Kiểm Tra' },
];

export const AREAS = [
  { id: 'all', name: 'Tất cả khu vực' },
  { id: 'area_smt', name: 'Khu Vực SMT & Gắn Linh Kiện' },
  { id: 'area_assembly', name: 'Khu Vực Lắp Ráp Tray / Chassis' },
  { id: 'area_aoi', name: 'Khu Vực Kiểm Tra Tự Động (AOI / SPI)' },
  { id: 'area_testing', name: 'Khu Vực Thử Nghiệm ICT & Burn-in' },
  { id: 'area_packing', name: 'Khu Vực Đóng Gói Tự Động & Xuất Xưởng' },
];

export const STATUS_FILTER_OPTIONS = [
  { id: 'all', label: 'Tất cả trạng thái', color: 'neutral' },
  { id: 'RUN', label: 'Đang chạy (RUN)', color: 'emerald' },
  { id: 'IDLE', label: 'Chờ hàng (IDLE)', color: 'amber' },
  { id: 'STOP', label: 'Dừng máy (STOP)', color: 'slate' },
  { id: 'ERROR', label: 'Cảnh báo lỗi (ERROR)', color: 'rose' },
];

export const DEFAULT_FILTERS = {
  factoryId: 'all',
  floorId: 'all',
  areaId: 'all',
  status: 'all',
  searchQuery: '',
};
