/**
 * Constants for Rack Configuration
 */

export const FACTORY_OPTIONS = [
  'F01 - Bắc Giang',
  'F02 - Quế Võ',
  'F03 - Bình Dương',
  'F06 - Vĩnh Phúc',
  'F07 - Đài Loan HQ'
];

export const FLOOR_OPTIONS = ['1F', '2F', '3F', '4F', '5F', 'B1'];

export const PRODUCT_OPTIONS = [
  'NVIDIA H100',
  'NVIDIA H200',
  'GB200 NVL72',
  'Hopper Super',
  'Grace CPU Superchip',
  'Blackwell B200',
  'Apple iPad Board',
  'Core Switch Fabric'
];

export const GROUP_OPTIONS = [
  'Group A (SMT)',
  'Group B (Testing)',
  'Group SMT',
  'Group ICT',
  'Group Assembly',
  'Group QC',
  'Group Packing',
  'Group Burn-In',
  'Group Network'
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const DEFAULT_RACK_FORM_VALUES = {
  factory: 'F01 - Bắc Giang',
  floor: '1F',
  room: '',
  product: 'NVIDIA H100',
  group: 'Group A (SMT)',
  rack: '',
  slot_number: 1,
  slot_name: '',
  ip_address: ''
};

export const IP_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const TABLE_COLUMNS = [
  { id: 'index', label: '#', align: 'center', width: 'w-12', isIndex: true },
  { id: 'factory', label: 'Factory', align: 'left', width: 'min-w-[150px]' },
  { id: 'floor', label: 'Floor', align: 'center', width: 'w-24' },
  { id: 'room', label: 'Room', align: 'left', width: 'min-w-[140px]' },
  { id: 'product', label: 'Product', align: 'left', width: 'min-w-[150px]' },
  { id: 'group', label: 'Group', align: 'left', width: 'min-w-[140px]' },
  { id: 'rack', label: 'Rack', align: 'left', width: 'min-w-[130px]' },
  { id: 'slot_number', label: 'Slot No.', align: 'center', width: 'w-28' },
  { id: 'slot_name', label: 'Slot Name', align: 'left', width: 'min-w-[140px]' },
  { id: 'ip_address', label: 'IP Address', align: 'left', width: 'min-w-[140px]' },
  { id: 'actions', label: 'Thao tác', align: 'center', width: 'w-36', isAction: true }
];

