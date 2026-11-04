/**
 * Constants & Mock Data cho phân hệ ALABEL Helper (Tab 3 - Thay thế AIOT Helpers)
 * Phục vụ: Tra cứu tiến trình 3 chế độ (SN, Carrier, Keypart), tự động nhận diện Model,
 * hệ thống 7 Sub-tabs điều khiển và Console log thực thi thời gian thực.
 */

// Danh mục Model CSDL tự động nạp (nằm trong Dropdown ẩn/mở rộng)
export const DB_ACTIVE_MODELS = [
  { id: 'HGX_B200_NVL', name: 'NVIDIA HGX B200 NVL (Blackwell)' },
  { id: 'GB200_NVL72', name: 'NVIDIA GB200 NVL72 Liquid Cooled' },
  { id: 'HGX_H100_SXM5', name: 'NVIDIA HGX H100 SXM5 8-GPU' },
  { id: 'HGX_H200_HBM3E', name: 'NVIDIA HGX H200 141GB HBM3e' },
  { id: 'NVLINK_SWITCH_TRAY', name: 'NVLink Switch System Tray' },
  { id: 'DGX_SUPERPOD_B200', name: 'DGX SuperPOD B200 Architecture' },
  { id: 'SPECTRUM4_SN5600', name: 'Spectrum-4 SN5600 64-Port 800GbE' },
  { id: 'CONNECTX7_IB', name: 'ConnectX-7 Single/Dual Port InfiniBand' },
];

// Danh sách 7 Sub-Tabs thao tác điều khiển ALABEL
export const ALABEL_SUB_TABS = [
  { id: 'undo_reset', label: 'Undo / Reset', icon: 'undo' },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'clear_undo', label: 'Clear Undo', icon: 'clear' },
  { id: 'compensate_detail', label: 'Bù sn_detail', icon: 'plus' },
  { id: 'change_keypart', label: 'Đổi Keypart', icon: 'refresh' },
  { id: 'sndetails', label: 'SNDetails', icon: 'database' },
  { id: 'error_logs', label: 'Error Logs', icon: 'alert' },
];

// Danh sách các bước Router khả dụng để hoàn tác hoặc điều chuyển (Target Steps)
export const ROUTER_STEPS_LIST = [
  { step: '010', station: 'ST01-FEEDER', label: 'Step 010 - ST01-FEEDER (Cấp phôi ban đầu)' },
  { step: '020', station: 'ST02-SMT-SURFACE', label: 'Step 020 - ST02-SMT-SURFACE (Dán bề mặt SMT)' },
  { step: '030', station: 'ST03-SMT-A', label: 'Step 030 - ST03-SMT-A (Lắp ráp Bo mạch SMT)' },
  { step: '040', station: 'ST04-ICT-TEST', label: 'Step 040 - ST04-ICT-TEST (Đo mạch In-Circuit)' },
  { step: '050', station: 'ST05-PRESSFIT', label: 'Step 050 - ST05-PRESSFIT (Ép khung tự động)' },
];

// Danh mục lý do Undo / Reset trạm
export const UNDO_REASONS = [
  { code: 'ERR_WRONG_COMPONENT_REV', label: 'Sai phiên bản linh kiện (Rev mismatch)' },
  { code: 'ERR_MISALIGNED_MOUNT', label: 'Lắp đặt lệch vị trí cơ khí / Jig lệch' },
  { code: 'ERR_FAIL_PRECHECK_SFC', label: 'SFC từ chối điều kiện tiền kiểm tra' },
  { code: 'ERR_OPERATOR_SCAN_MISTAKE', label: 'Nhân viên quét nhầm mã barcode' },
  { code: 'ERR_STATION_TIMEOUT', label: 'Quá thời gian chu kỳ trạm (Station timeout)' },
  { code: 'OTHER_MANUAL_RESET', label: 'Kỹ thuật viên yêu cầu reset quy trình thủ công' },
];

// Danh sách trạm dây chuyền phục vụ Transfer
export const STATIONS_LIST = [
  { id: 'ST01-FEEDER', name: 'ST01 - Trạm Cấp Liệu Ban Đầu' },
  { id: 'ST02-SMT-SURFACE', name: 'ST02 - Trạm Dán Bề Mặt SMT' },
  { id: 'ST03-SMT-A', name: 'ST03-SMT-A - Trạm Lắp Ráp Bo Mạch SMT' },
  { id: 'ST04-ICT-TEST', name: 'ST04 - Trạm Đo Mạch In-Circuit' },
  { id: 'ST05-PRESSFIT', name: 'ST05 - Trạm Ép Khung Tự Động' },
  { id: 'ST06-REWORK-LINE', name: 'ST06 - Trạm Sửa Chữa Kỹ Thuật (Rework)' },
  { id: 'ST07-QC-HOLD', name: 'ST07 - Trạm Kiểm Định Chất Lượng QC' },
];

// Danh sách chuyền đích cho tác vụ Transfer
export const PRODUCTION_LINES = [
  { id: 'LINE_01_NVL72', name: 'Chuyền Tự Động 01 (NVIDIA GB200 NVL72)' },
  { id: 'LINE_02_B200', name: 'Chuyền Tự Động 02 (HGX B200 High Density)' },
  { id: 'LINE_03_REWORK', name: 'Chuyền Sửa Chữa Kỹ Thuật (Rework Buffer)' },
  { id: 'LINE_04_QC_HOLD', name: 'Chuyền Cách Ly Kiểm Tra Chất Lượng QC' },
];

// Loại linh kiện phổ biến cho tác vụ Đổi Keypart
export const KEYPART_CATEGORIES = [
  { id: 'MOTHERBOARD_ASSY', label: 'Motherboard Assembly (Bo Mạch Chủ)' },
  { id: 'GPU_MODULE_01', label: 'GPU Module Slot 01' },
  { id: 'GPU_MODULE_02', label: 'GPU Module Slot 02' },
  { id: 'HEATSINK_VAPOR', label: 'Heatsink Vapor Chamber (Bộ Tản Nhiệt)' },
  { id: 'POWER_SUPPLY_UNIT', label: 'PSU (Bộ Nguồn 3300W)' },
  { id: 'DIMM_DDR5_SLOT1', label: 'DIMM DDR5 Memory 64GB' },
  { id: 'NVME_SSD_GEN5', label: 'NVMe Gen5 Enterprise SSD' },
];

// Dữ liệu mẫu ban đầu cho kết quả tra cứu tiến trình
export const INITIAL_PROCESS_RESULT = {
  identifier: 'SN8839210492-NV',
  type: 'sn',
  detectedModel: 'NVIDIA HGX B200 NVL (Blackwell)',
  modelCode: 'HGX_B200_NVL',
  carrierId: 'CARRIER-RFID-8819',
  carrierStatus: 'ATTACHED_ON_CONVEYOR',
  currentStation: 'ST03-SMT-A',
  currentStationName: 'Trạm Lắp Ráp Bo Mạch SMT',
  routerStep: '030',
  stepName: 'KEYPART_PRECHECK_&_ASSEMBLY',
  wipStatus: 'IN_PROCESS', // 'IN_PROCESS' | 'PASSED' | 'REWORK_HOLD' | 'FAILED'
  keypartsCount: {
    bound: 4,
    total: 5,
  },
  lastUpdated: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
  routeHistory: [
    { step: '010', station: 'ST01-FEEDER', status: 'PASS', time: '09:20:15' },
    { step: '020', station: 'ST02-SMT-SURFACE', status: 'PASS', time: '09:35:42' },
    { step: '030', station: 'ST03-SMT-A', status: 'IN_PROCESS', time: '09:48:10' },
  ],
};

// Dữ liệu mẫu bảng sn_detail cho Sub-tab 6 (SNDetails)
export const MOCK_SN_DETAILS = [
  { id: 1, key: 'bios_uuid', value: '4C4C4544-0046-4B10-8032-B2C04F4A5033', station: 'ST01-FEEDER', updatedAt: '2026-11-04 09:20:18', status: 'ACTIVE' },
  { id: 2, key: 'mac_eth0', value: '00:1B:44:11:3A:F0', station: 'ST02-SMT-SURFACE', updatedAt: '2026-11-04 09:35:50', status: 'ACTIVE' },
  { id: 3, key: 'mac_eth1', value: '00:1B:44:11:3A:F1', station: 'ST02-SMT-SURFACE', updatedAt: '2026-11-04 09:35:51', status: 'ACTIVE' },
  { id: 4, key: 'vendor_pn', value: 'NV-HGX-B200-NVL-998', station: 'ST01-FEEDER', updatedAt: '2026-11-04 09:20:25', status: 'ACTIVE' },
  { id: 5, key: 'board_rev', value: 'REV_2.4_PROD', station: 'ST02-SMT-SURFACE', updatedAt: '2026-11-04 09:36:02', status: 'ACTIVE' },
  { id: 6, key: 'power_lot', value: 'DELTA-LOT-2026W42', station: 'ST03-SMT-A', updatedAt: '2026-11-04 09:48:15', status: 'ACTIVE' },
  { id: 7, key: 'firmware_ver', value: 'FW_v4.1.28-SECURE-SIGNED', station: 'ST02-SMT-SURFACE', updatedAt: '2026-11-04 09:36:10', status: 'ACTIVE' },
  { id: 8, key: 'carrier_rfid', value: 'CARRIER-RFID-8819', station: 'ST01-FEEDER', updatedAt: '2026-11-04 09:20:12', status: 'ACTIVE' },
];

// Dữ liệu mẫu bảng Error Logs cho Sub-tab 7
export const MOCK_ERROR_LOGS = [
  { id: 'ERR-1092', station: 'ST03-SMT-A', code: 'ERR_BARCODE_MISMATCH', level: 'ERROR', message: 'Mã linh kiện Heatsink HS-CU-BLK-00924 không khớp định dạng revision kiểm toán BOM.', time: '09:47:10', sopLink: 'SOP-SFC-MOD-042' },
  { id: 'ERR-1088', station: 'ST02-SMT-SURFACE', code: 'WARN_RFID_SIGNAL_WEAK', level: 'WARNING', message: 'Tín hiệu đọc thẻ RFID Pallet CARRIER-RFID-8819 chỉ đạt 68% tại đầu đọc cổng trạm.', time: '09:35:30', sopLink: 'SOP-RFID-ANT-01' },
  { id: 'ERR-1085', station: 'ST03-SMT-A', code: 'ERR_ROUTER_SEQUENCE_CONFLICT', level: 'ERROR', message: 'Sản phẩm chưa hoàn tất trạm kiểm tra ICT (ST04) trước khi chuyển vào trạm Ép khung.', time: '09:12:44', sopLink: 'SOP-ROUTER-WF-008' },
  { id: 'ERR-1079', station: 'ST01-FEEDER', code: 'INFO_CARRIER_CLEARED', level: 'INFO', message: 'Đã giải phóng liên kết Carrier khay cũ sau chu kỳ hoàn thành đóng gói.', time: '08:50:02', sopLink: 'SOP-CARRIER-RECYC-01' },
];

// Danh sách Log khởi tạo cho khối Terminal Console phía dưới
export const INITIAL_ALABEL_LOGS = [
  {
    id: 'log-1',
    timestamp: '09:50:12.140',
    level: 'SUCCESS',
    action: 'UNDO_RESET',
    target: 'SN8839210492-NV',
    latencyMs: 24,
    message: '[UNDO_OK] Hoàn tác trạng thái trạm ST03-SMT-A thành công. Router được đưa về Step 020.',
    payload: { sn: 'SN8839210492-NV', station: 'ST03-SMT-A', reason: 'ERR_WRONG_COMPONENT_REV' },
    response: { status: 'SUCCESS', newStation: 'ST02-SMT-SURFACE', rollback_step: '020' }
  },
  {
    id: 'log-2',
    timestamp: '09:48:45.892',
    level: 'SUCCESS',
    action: 'COMPENSATE_DETAIL',
    target: 'SN8839210492-NV',
    latencyMs: 31,
    message: '[COMPENSATE_OK] Đã chèn bù 2 thuộc tính (mac_eth0, vendor_pn) vào bảng sn_detail.',
    payload: { sn: 'SN8839210492-NV', items: [{ key: 'mac_eth0', val: '00:1B:44:11:3A:F0' }] },
    response: { status: 'SUCCESS', rows_inserted: 2 }
  },
  {
    id: 'log-3',
    timestamp: '09:47:10.024',
    level: 'WARNING',
    action: 'CHANGE_KEYPART',
    target: 'MB-FOX-2026-X0192',
    latencyMs: 45,
    message: '[WARN_KEYPART] Đã gửi yêu cầu đổi linh kiện GPU_01 sang NV-B200-GPU-88921-REV2. Chờ xác nhận kiểm toán SFC.',
    payload: { sn: 'SN8839210492-NV', keyName: 'GPU_MODULE_01', oldVal: 'NV-B200-GPU-88910', newVal: 'NV-B200-GPU-88921-REV2' },
    response: { status: 'PENDING_APPROVAL', audit_id: 'AUD-88921' }
  },
  {
    id: 'log-4',
    timestamp: '09:45:22.711',
    level: 'ERROR',
    action: 'TRANSFER',
    target: 'SN8839210488-NV',
    latencyMs: 18,
    message: '[TRANSFER_REJECTED] Lỗi 409 Conflict: Không thể chuyển trạm ST04-TEST do chưa hoàn thành kiểm thử ICT.',
    payload: { sn: 'SN8839210488-NV', toStation: 'ST04-TEST', toLine: 'LINE_01_NVL72' },
    response: { status: 'ERROR', error_code: 409, detail: 'Route sequence mismatch: Step 030 missing' }
  },
  {
    id: 'log-5',
    timestamp: '09:42:01.050',
    level: 'INFO',
    action: 'CLEAR_UNDO',
    target: 'CARRIER-RFID-8819',
    latencyMs: 15,
    message: '[CLEAR_UNDO_OK] Đã giải phóng cờ khóa Undo trên khay đồ gá CARRIER-RFID-8819. Băng tải tiếp tục vận hành.',
    payload: { carrierId: 'CARRIER-RFID-8819', forceUnlock: true },
    response: { status: 'SUCCESS', unlocked: true }
  }
];
