/**
 * Constants & Mock Data cho phân hệ Điều Khiển Chuyền Tự Động (Automation Line Control)
 * Hỗ trợ giao thức SFC Switch, SFC Adapter, AIOT và Action Logs
 */

export const PRODUCT_FAMILIES = [
  { id: 'HGX_B200', name: 'NVIDIA HGX B200 NVL (Blackwell)' },
  { id: 'GB200_NVL72', name: 'NVIDIA GB200 NVL72 Liquid Cooled' },
  { id: 'HGX_H100', name: 'NVIDIA HGX H100 SXM5 8-GPU' },
  { id: 'HGX_H200', name: 'NVIDIA HGX H200 141GB HBM3e' },
  { id: 'NVLINK_SWITCH', name: 'NVLink Switch System Tray' },
  { id: 'POWER_SHELF_33KW', name: 'High-Power 33kW Rectifier Shelf' },
];

export const STATION_GROUPS = [
  { id: 'SMT_ASSY', name: 'SMT_ASSY - Trạm Lắp Ráp Bo Mạch SMT' },
  { id: 'ICT_TEST', name: 'ICT_TEST - Trạm Đo Mạch In Circuit' },
  { id: 'PRESSFIT_AUTO', name: 'PRESSFIT_AUTO - Trạm Ép Khung Tự Động' },
  { id: 'SCREW_FASTEN', name: 'SCREW_FASTEN - Trạm Bắn Vít Dung Sai' },
  { id: 'FCT_FINAL', name: 'FCT_FINAL - Trạm Kiểm Thử Chức Năng' },
  { id: 'SYS_BURNIN', name: 'SYS_BURNIN - Trạm Thử Tải Lão Hóa' },
  { id: 'PACKING_LINE', name: 'PACKING_LINE - Trạm Đóng Gói Hoàn Thiện' },
];

export const DEFAULT_FILTER = {
  searchTerm: 'SN8839210492-NV',
  productFamily: 'HGX_B200',
  stationGroup: 'SMT_ASSY',
  host: 'sfc-switch-prod01.fii.foxconn',
  stationIp: '192.168.10.45',
};

export const INITIAL_KEYPARTS = [
  {
    id: 'kp-001',
    selected: true,
    keyName: 'MOTHERBOARD_ASSY',
    keyValue: 'MB-FOX-2026-X0192',
    step: '010',
    sfcFlag: 'Y',
    sfcPrecheck: 'PASSED',
    isRequired: true,
    type: 'Board',
  },
  {
    id: 'kp-002',
    selected: true,
    keyName: 'GPU_MODULE_01',
    keyValue: 'NV-B200-GPU-88910',
    step: '020',
    sfcFlag: 'Y',
    sfcPrecheck: 'PASSED',
    isRequired: true,
    type: 'Processor',
  },
  {
    id: 'kp-003',
    selected: true,
    keyName: 'GPU_MODULE_02',
    keyValue: 'NV-B200-GPU-88921',
    step: '020',
    sfcFlag: 'Y',
    sfcPrecheck: 'PASSED',
    isRequired: true,
    type: 'Processor',
  },
  {
    id: 'kp-004',
    selected: true,
    keyName: 'HEATSINK_VAPOR_CHAMBER',
    keyValue: 'HS-CU-BLK-00924',
    step: '030',
    sfcFlag: 'Y',
    sfcPrecheck: 'PASSED',
    isRequired: false,
    type: 'Mechanical',
  },
  {
    id: 'kp-005',
    selected: false,
    keyName: 'MAC_ADDRESS_NIC0',
    keyValue: '00:1B:44:11:3A:F0',
    step: '040',
    sfcFlag: 'N',
    sfcPrecheck: 'PENDING',
    isRequired: true,
    type: 'Network',
  },
  {
    id: 'kp-006',
    selected: false,
    keyName: 'POWER_SUPPLY_UNIT_A',
    keyValue: 'PSU-DELTA-3300W-01',
    step: '045',
    sfcFlag: 'Y',
    sfcPrecheck: 'PASSED',
    isRequired: false,
    type: 'Power',
  },
  {
    id: 'kp-007',
    selected: false,
    keyName: 'DIMM_DDR5_SLOT1',
    keyValue: 'MEM-64GB-ECC-4800-01',
    step: '015',
    sfcFlag: 'Y',
    sfcPrecheck: 'WARNING',
    isRequired: true,
    type: 'Memory',
  },
];

export const INITIAL_TRANSACTION = {
  transactionId: 'TX-SFC-20261103-094512',
  actionName: 'READY',
  status: 'SUCCESS',
  httpCode: 200,
  sfcReturnCode: '0',
  latencyMs: 38,
  timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
  message: '[SFC_SYSTEM_ONLINE] Kết nối trạm SFC Switch ổn định. Sẵn sàng nhận lệnh.',
  requestPayload: {
    stationIp: '192.168.10.45',
    host: 'sfc-switch-prod01.fii.foxconn',
    group: 'SMT_ASSY',
    status: 'ONLINE'
  },
  responseData: {
    status: 'READY',
    return_code: 0,
    active_line: 'LINE_01_NVL72',
    server_time: new Date().toISOString()
  }
};
