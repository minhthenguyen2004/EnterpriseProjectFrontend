/**
 * Constants for Rack Overview Layout Configuration
 */

export const LOCATION_OPTIONS = [
  'F01 - 2F - Cleanroom 01',
  'F01 - 1F - SMT Main Floor',
  'F02 - 3F - Server Lab C',
  'F03 - 2F - Assembly Line 01',
  'F06 - 4F - QC Inspection Area'
];

export const PRODUCT_LINE_OPTIONS = [
  'NVIDIA H100',
  'NVIDIA H200',
  'GB200 NVL72',
  'Hopper Super',
  'Grace CPU Superchip',
  'Blackwell B200'
];

export const GROUP_NAME_OPTIONS = [
  'Group A (SMT)',
  'Group B (Testing)',
  'Group C (Burn-in)',
  'Group ICT',
  'Group Assembly'
];

export const SLOT_STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved (Đã duyệt)', color: 'emerald' },
  { value: 'rejected', label: 'Rejected (Từ chối / Chưa duyệt)', color: 'rose' }
];

export const TIPS_AND_SHORTCUTS = [
  { icon: '🖱️', text: 'Click vào Rack hoặc Slot để mở bảng sửa thuộc tính.' },
  { icon: '🔄', text: 'Kéo thả đổi chỗ: Kéo Slot thả lên Slot khác để đổi vị trí tức thì.' },
  { icon: '↔️', text: 'Đổi thứ tự Rack: Kéo đầu Rack thả lên Rack khác để đổi chỗ cột.' },
  { icon: '⌨️', text: 'Phím tắt: Ctrl + S Lưu, Esc Bỏ chọn, Delete Xóa.' }
];

