// Constants for Machine Configuration Form Modal

export const FORM_TABS = [
  {
    id: 'machine-config',
    label: 'Machine Config',
    icon: '⚙️',
    badge: 'Core',
    description: 'Cấu hình tham số truyền thông PLC, cổng kết nối, timeout và chu kỳ polling của máy trạm.'
  },
  {
    id: 'validation-keys',
    label: 'Validation Keys',
    icon: '🔑',
    badge: 'Rules',
    description: 'Quản lý danh sách các khóa xác thực, mã linh kiện bắt buộc (Keyparts) khi sản phẩm qua trạm.'
  },
  {
    id: 'routing-configs',
    label: 'Routing Configs',
    icon: '🔀',
    badge: 'Routing',
    description: 'Quy tắc định tuyến chuyền, phân luồng sản phẩm Pass / Fail và liên kết trạm kế tiếp.'
  },
  {
    id: 'uph-config',
    label: 'UPH Config',
    icon: '⏱️',
    badge: 'Target',
    description: 'Chỉ tiêu năng suất Units Per Hour (UPH), thời gian chu kỳ chuẩn (Cycle Time) và cảnh báo tắc nghẽn.'
  },
  {
    id: 'screw-config',
    label: 'Screw Config',
    icon: '🔩',
    badge: 'Torque',
    description: 'Tọa độ vị trí siết ốc tự động, dải lực mô-men xoắn (Torque Min/Max) và góc xoay kiểm soát.'
  },
  {
    id: 'pressfit-config',
    label: 'Pressfit Config',
    icon: '🗜️',
    badge: 'Force',
    description: 'Đường cong lực ép (Force-Distance Curve), hành trình ép chân linh kiện và ngưỡng giới hạn dung sai.'
  },
  {
    id: 'history-restore',
    label: 'History & Restore',
    icon: '📜',
    badge: 'Audit',
    description: 'Nhật ký kiểm toán thay đổi cấu hình, so sánh diff phiên bản và tính năng hoàn tác (Rollback).'
  }
];

// Danh sách gợi ý datalist cho các trường nhập text
export const SUGGESTED_CUSTOMERS = ['NVIDIA', 'Foxconn', 'Apple', 'Cisco', 'Google', 'Microsoft'];
export const SUGGESTED_FACTORIES = ['Nhà máy F01 - Bắc Ninh', 'Nhà máy F02 - Bắc Ninh', 'Nhà máy F03 - Bắc Giang', 'Nhà máy F05 - Hải Phòng'];
export const SUGGESTED_FLOORS = ['1F', '2F', '3F', '4F'];
export const SUGGESTED_PRODUCT_NAMES = ['NVIDIA HGX B200', 'NVIDIA GB200 NVL72', 'NVIDIA H100 SXM5', 'NVIDIA H200 Tensor Core', 'Foxconn Server Rack Mount 4U'];
export const SUGGESTED_PRODUCT_TYPES = ['AI GPU Accelerator Board', 'High-Density Server Tray', 'Switch Mainboard', 'Power Distribution Module'];
export const SUGGESTED_GROUPS = ['SMT Surface Mount Group A', 'SMT Surface Mount Group B', 'AOI & SPI Inspection Group', 'Reflow Furnace Group', 'Mechanical Assembly Group'];
export const SUGGESTED_STEPS = ['ST01 - Solder Paste Printing (SPP)', 'ST02 - Solder Paste Inspection (SPI)', 'ST03 - High-Speed Pick & Place', 'ST06 - 3D Automated Optical Inspection (AOI)', 'ST08 - Automated Screwdriving & Torque Check'];

// Danh sách kiểu dữ liệu cho Validation Keys
export const VALUE_TYPES = [
  { value: 'string', label: 'string (Chuỗi ký tự)' },
  { value: 'double', label: 'double (Số thực / Dấu phẩy động)' },
  { value: 'boolean', label: 'boolean (Giá trị True / False)' },
  { value: 'integer', label: 'integer (Số nguyên)' }
];

// Cấu hình cờ vận hành trạm máy (Tab 1: Machine Config)
export const MACHINE_FLAGS_CONFIG = [
  {
    key: 'isAutoLine',
    label: 'Is Auto Line (Máy tự động hóa)',
    description: 'Đánh dấu máy thuộc dây chuyền tự động. Kích hoạt liên kết Group, Step & quy trình 3 pha.',
    tag: 'Auto Line'
  },
  {
    key: 'isSfcPreCheck',
    label: 'Is SFC PreCheck (Kiểm tra PreCheck với SFC)',
    description: 'Kích hoạt giao tiếp kiểm tra PreCheck với hệ thống SFC (MES) trước khi sản phẩm vào trạm.',
    tag: 'SFC Check'
  },
  {
    key: 'isSfcStation',
    label: 'Is SFC Station (Trạm gửi kết quả SFC)',
    description: 'Đánh dấu trạm gửi kết quả (Insert Result) lên hệ thống SFC (MES). Gom SFC KeyParts (IsSFC=1).',
    tag: 'Insert Result'
  },
  {
    key: 'sendSfcOnPassOnly',
    label: 'Send SFC On Pass Only (Chỉ gửi SFC khi PASS)',
    description: 'Chỉ gửi dữ liệu sang SFC khi kết quả Client là PASS. Kết quả khác chỉ lưu nội bộ AutoLine.',
    tag: 'Pass Filter'
  },
  {
    key: 'allowFailPassThrough',
    label: 'Allow Fail Pass-Through (Cho phép Fail qua trạm)',
    description: 'Khi kết quả đo đạc FAIL thì sản phẩm vẫn được đi tiếp mà không làm tắc nghẽn chuyền.',
    tag: 'Pass-Through'
  }
];

// Dữ liệu mẫu ban đầu cho Validation Keys
export const DEFAULT_MACHINE_VALIDATION_KEYS = [
  {
    id: 1,
    step: 'ST01',
    keyName: 'BARCODE_MAIN',
    displayName: 'Mã vạch Mainboard',
    valueType: 'string',
    isRequired: true,
    isBypass: false,
    isVerify: true,
    isSfcKeyPart: true,
    isActive: true
  },
  {
    id: 2,
    step: 'ST01',
    keyName: 'MAC_ADDRESS',
    displayName: 'Địa chỉ MAC Card Mạng',
    valueType: 'string',
    isRequired: true,
    isBypass: false,
    isVerify: false,
    isSfcKeyPart: true,
    isActive: true
  },
  {
    id: 3,
    step: 'ST01',
    keyName: 'TORQUE_SCREW_01',
    displayName: 'Lực siết ốc vị trí #1',
    valueType: 'double',
    isRequired: false,
    isBypass: true,
    isVerify: false,
    isSfcKeyPart: false,
    isActive: true
  }
];

// Cấu hình chế độ định tuyến (Tab 3: Routing Configs)
export const ROUTING_MODES = [
  { value: 0, label: 'Mode 0: Standard', description: 'Tiêu chuẩn - Kiểm tra định tuyến trước' },
  { value: 1, label: 'Mode 1: Upload Data First', description: 'Đẩy dữ liệu lên trước khi chuyển bước' }
];

export const DEFAULT_STEP_ROUTING = {
  mainKey: 'BARCODE_MAIN',
  mode: 0
};

// Dữ liệu mẫu ban đầu cho Routing Configs (Tab 3)
export const DEFAULT_MACHINE_ROUTING_CONFIGS = [
  {
    id: 1,
    product: 'NVIDIA HGX B200',
    line: 'Line 01 - High-Speed SMT',
    step: 'ST01',
    twinStep: 11,
    mode: 0,
    allowCarrierSwap: true,
    isPicker: true,
    sfcTriggerStep: null,
    isActive: true
  },
  {
    id: 2,
    product: 'NVIDIA HGX B200',
    line: 'Line 01 - High-Speed SMT',
    step: 'ST01',
    twinStep: 12,
    mode: 0,
    allowCarrierSwap: false,
    isPicker: false,
    sfcTriggerStep: null,
    isActive: true
  }
];

// Cấu hình định mức sản lượng & nhịp chuyền (Tab 4: UPH Config)
export const DEFAULT_UPH_CONFIG = {
  targetUph: 120,
  targetCycleTime: 30.00,
  warningTolerance: 5.0,
  enableUphMonitoring: true
};
