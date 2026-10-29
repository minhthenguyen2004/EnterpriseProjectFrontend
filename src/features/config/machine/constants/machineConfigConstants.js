// Danh mục các hằng số chuẩn cho Cấu hình Máy móc (Machine Configuration)

export const CUSTOMER_OPTIONS = [
  'NVIDIA',
  'Foxconn',
  'Apple',
  'Cisco',
  'Google',
  'Microsoft'
];

export const FACTORY_OPTIONS = [
  'Nhà máy F01 - Bắc Ninh',
  'Nhà máy F02 - Bắc Ninh',
  'Nhà máy F03 - Bắc Giang',
  'Nhà máy F05 - Hải Phòng'
];

export const FLOOR_OPTIONS = [
  '1F',
  '2F',
  '3F',
  '4F'
];

export const PRODUCT_TYPE_OPTIONS = [
  'AI GPU Accelerator Board',
  'High-Density Server Tray',
  'Switch Mainboard',
  'Power Distribution Module',
  'Cooling System Manifold'
];

export const PRODUCT_NAME_OPTIONS = [
  'NVIDIA HGX B200',
  'NVIDIA GB200 NVL72',
  'NVIDIA H100 SXM5',
  'NVIDIA H200 Tensor Core',
  'Foxconn Server Rack Mount 4U',
  'Cisco Nexus 9000 Switch Board'
];

export const LINE_OPTIONS = [
  { id: 1, name: 'Line 01 - High-Speed SMT', factory: 'Nhà máy F01 - Bắc Ninh', floor: '1F' },
  { id: 2, name: 'Line 02 - Advanced GPU Packaging', factory: 'Nhà máy F01 - Bắc Ninh', floor: '1F' },
  { id: 3, name: 'Line 03 - Server Tray Assembly', factory: 'Nhà máy F01 - Bắc Ninh', floor: '2F' },
  { id: 4, name: 'Line 04 - Auto Optical & ICT Test', factory: 'Nhà máy F03 - Bắc Giang', floor: '1F' },
  { id: 5, name: 'Line 05 - Final System Integration', factory: 'Nhà máy F03 - Bắc Giang', floor: '2F' }
];

export const STEP_OPTIONS = [
  'ST01 - Solder Paste Printing (SPP)',
  'ST02 - Solder Paste Inspection (SPI)',
  'ST03 - High-Speed Pick & Place',
  'ST04 - Multi-Function Component Mounter',
  'ST05 - Reflow Soldering Furnace',
  'ST06 - 3D Automated Optical Inspection (AOI)',
  'ST07 - In-Circuit Testing (ICT)',
  'ST08 - Automated Screwdriving & Torque Check',
  'ST09 - Thermal Interface Material (TIM) Dispense',
  'ST10 - Functional Testing & Burn-in'
];

export const GROUP_NAME_OPTIONS = [
  'SMT Surface Mount Group A',
  'SMT Surface Mount Group B',
  'AOI & SPI Inspection Group',
  'Reflow Furnace Group',
  'ICT & Test Station Group',
  'Mechanical Assembly Group',
  'Dispensing & Thermal Group'
];

export const ACTION_FILTER_OPTIONS = [
  { value: 'all', label: 'Tất cả các dòng (Mặc định)' },
  { value: 'has_details', label: '1. Máy có thông tin chi tiết đầy đủ' },
  { value: 'can_edit', label: '2. Máy được phép sửa cấu hình' },
  { value: 'can_delete', label: '3. Máy có thể xóa / đang chờ dọn dẹp' }
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Danh sách các cột của bảng
export const MACHINE_TABLE_COLUMNS = [
  { id: 'customer', label: 'Customer', field: 'customer', width: 'w-28 min-w-[110px]' },
  { id: 'factory', label: 'Factory', field: 'factory', width: 'w-44 min-w-[170px]' },
  { id: 'floor', label: 'Floor', field: 'floor', width: 'w-20 min-w-[80px]' },
  { id: 'productName', label: 'Product Name', field: 'productName', width: 'w-44 min-w-[170px]' },
  { id: 'productType', label: 'Prod. Type', field: 'productType', width: 'w-44 min-w-[170px]' },
  { id: 'lineName', label: 'Line Name', field: 'lineName', width: 'w-48 min-w-[190px]' },
  { id: 'step', label: 'Step', field: 'step', width: 'w-48 min-w-[190px]' },
  { id: 'keys', label: 'Keys', field: 'keys', width: 'w-32 min-w-[125px]' },
  { id: 'groupName', label: 'Group Name', field: 'groupName', width: 'w-48 min-w-[190px]' },
  { id: 'machineName', label: 'Machine Name', field: 'machineName', width: 'w-52 min-w-[205px]' },
  { id: 'stationIp', label: 'IP Address', field: 'stationIp', width: 'w-36 min-w-[140px]' },
  { id: 'hostName', label: 'Host Name', field: 'hostName', width: 'w-48 min-w-[190px]' },
  { id: 'actions', label: 'Thao tác', field: 'actions', width: 'w-36 min-w-[145px]', isAction: true }
];
