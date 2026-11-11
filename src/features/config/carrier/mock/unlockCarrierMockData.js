// src/features/config/carrier/mock/unlockCarrierMockData.js


/**
 * Danh sách khay mẫu phục vụ tính năng Unlock Carrier
 * Bao gồm các khay đang ở trạng thái LOCKED, INSPECTION_REQUIRED, WARNING
 */


export const INITIAL_LOCKED_CARRIERS = [
  {
    id: 'CRR-001',
    carrierCode: 'CRR-A089',
    rfidTag: 'E280-1160-2000-7489',
    lineName: 'Line01',
    stationName: 'SMT-Mount-01',
    productName: 'GB200 NVL72',
    carrierType: 'GPU Component Tray',
    carrierTypeCategory: 'GPU_TRAY',
    currentCycles: 2000,
    maxCycles: 2000,
    usagePercentage: 100.0,
    hoursSinceLastInspection: 744,
    lastInspectionDate: '2026-09-01 09:15',
    lastInspector: 'V109281 - Nguyễn Văn An (QC)',
    status: 'LOCKED',
    severity: 'critical',
    lockReason: 'Đã đạt 100% định mức chu kỳ cơ học tối đa. Cưỡng bức khóa bởi AutoLine PLC.',
    dimensions: '350 x 250 x 40 mm',
    material: 'Anodized Aluminum ESD Safe',
    coplanarityDeviation: 0.18,
    lastMaintenanceStation: 'QC-ST01',
  },
  {
    id: 'CRR-002',
    carrierCode: 'CRR-B012',
    rfidTag: 'E280-1160-2000-7512',
    lineName: 'Line02',
    stationName: 'Screw-Auto-02',
    productName: 'B200 HGX',
    carrierType: 'Assembly Pallet B',
    carrierTypeCategory: 'PALLET',
    currentCycles: 1924,
    maxCycles: 2000,
    usagePercentage: 96.2,
    hoursSinceLastInspection: 312,
    lastInspectionDate: '2026-10-18 14:30',
    lastInspector: 'V108455 - Trần Quốc Huy (QC)',
    status: 'LOCKED',
    severity: 'urgent',
    lockReason: 'Độ phẳng bề mặt sai lệch 0.12mm (vượt ngưỡng cho phép 0.08mm).',
    dimensions: '420 x 300 x 55 mm',
    material: 'PEEK Composite ESD Safe',
    coplanarityDeviation: 0.12,
    lastMaintenanceStation: 'MAINT-B02',
  },
  {
    id: 'CRR-003',
    carrierCode: 'CRR-C034',
    rfidTag: 'E280-1160-2000-7634',
    lineName: 'Line01',
    stationName: 'Pressfit-01',
    productName: 'GB200 NVL72',
    carrierType: 'GPU Component Tray',
    carrierTypeCategory: 'GPU_TRAY',
    currentCycles: 2050,
    maxCycles: 2000,
    usagePercentage: 102.5,
    hoursSinceLastInspection: 820,
    lastInspectionDate: '2026-08-20 11:00',
    lastInspector: 'V1029384 - Lê Thị Mai (QC)',
    status: 'LOCKED',
    severity: 'critical',
    lockReason: 'Vượt quá chu kỳ 2050/2000 vòng. Khóa khẩn cấp tại trạm Pressfit-01.',
    dimensions: '350 x 250 x 40 mm',
    material: 'Anodized Aluminum ESD Safe',
    coplanarityDeviation: 0.15,
    lastMaintenanceStation: 'QC-ST02',
  },
  {
    id: 'CRR-004',
    carrierCode: 'CRR-A045',
    rfidTag: 'E280-1160-2000-7445',
    lineName: 'Line03',
    stationName: 'AOI-Inspect-03',
    productName: 'H100 SXM5',
    carrierType: 'AI Server Base Tray',
    carrierTypeCategory: 'GPU_TRAY',
    currentCycles: 1880,
    maxCycles: 2000,
    usagePercentage: 94.0,
    hoursSinceLastInspection: 410,
    lastInspectionDate: '2026-10-05 16:20',
    lastInspector: 'V105672 - Phạm Tuấn Nam (QC)',
    status: 'LOCKED',
    severity: 'warning',
    lockReason: 'Cảm biến quang trạm AOI phát hiện kẹt chốt định vị cơ khí.',
    dimensions: '380 x 270 x 45 mm',
    material: 'Antistatic POM',
    coplanarityDeviation: 0.09,
    lastMaintenanceStation: 'MAINT-A01',
  },
  {
    id: 'CRR-005',
    carrierCode: 'CRR-D088',
    rfidTag: 'E280-1160-2000-7888',
    lineName: 'Line02',
    stationName: 'Dispensing-02',
    productName: 'B200 HGX',
    carrierType: 'Assembly Pallet B',
    carrierTypeCategory: 'PALLET',
    currentCycles: 2010,
    maxCycles: 2000,
    usagePercentage: 100.5,
    hoursSinceLastInspection: 750,
    lastInspectionDate: '2026-09-12 10:45',
    lastInspector: 'V109281 - Nguyễn Văn An (QC)',
    status: 'LOCKED',
    severity: 'critical',
    lockReason: 'Quá hạn kiểm tra định kỳ 30 ngày.',
    dimensions: '420 x 300 x 55 mm',
    material: 'PEEK Composite ESD Safe',
    coplanarityDeviation: 0.14,
    lastMaintenanceStation: 'MAINT-B01',
  }
];

/**
 * Nhật ký mở khóa khay gần đây (Recent Unlock History Log)
 */
export const INITIAL_UNLOCK_HISTORY = [
  {
    id: 'UNL-20261109-001',
    timestamp: '2026-11-09 08:32:15',
    employeeId: 'V1029384 - Nguyễn Văn A',
    carrierCode: 'CRR-B012',
    lineName: 'Line02',
    inspectionType: 'shift_start', // shift_start | periodic | manual
    resetCycleCount: true,
    previousCycles: 2000,
    result: 'PASS', // PASS | FAIL
    note: 'Đã hoàn tất bảo dưỡng thay đệm cơ khí, đo dung sai đạt 0.04mm chuẩn.',
    statusAfter: 'ACTIVE'
  },
  {
    id: 'UNL-20261109-002',
    timestamp: '2026-11-09 08:15:40',
    employeeId: 'V109281 - Nguyễn Văn An',
    carrierCode: 'CRR-C099',
    lineName: 'Line01',
    inspectionType: 'manual',
    resetCycleCount: false,
    previousCycles: 1450,
    result: 'PASS',
    note: 'Kiểm tra đột xuất lỗi cảm biến trạm SMT, vệ sinh mắt đọc RFID và mở khóa.',
    statusAfter: 'ACTIVE'
  },
  {
    id: 'UNL-20261109-003',
    timestamp: '2026-11-09 07:48:22',
    employeeId: 'V108455 - Trần Quốc Huy',
    carrierCode: 'CRR-E044',
    lineName: 'Line03',
    inspectionType: 'periodic',
    resetCycleCount: true,
    previousCycles: 2012,
    result: 'PASS',
    note: 'Kiểm định định kỳ tuần, tra dầu ổ bi trượt và reset chu kỳ về 0.',
    statusAfter: 'ACTIVE'
  },
  {
    id: 'UNL-20261109-004',
    timestamp: '2026-11-09 07:15:05',
    employeeId: 'V105672 - Phạm Tuấn Nam',
    carrierCode: 'CRR-A021',
    lineName: 'Line01',
    inspectionType: 'shift_start',
    resetCycleCount: false,
    previousCycles: 1890,
    result: 'FAIL',
    note: 'Phát hiện nứt mép gá kẹp linh kiện, giữ nguyên khóa chuyển phòng sửa chữa.',
    statusAfter: 'LOCKED'
  }
];

/**
 * Gợi ý lý do mở khóa nhanh (Quick Tag Chips)
 */
export const QUICK_NOTE_TAGS = [
  'Bảo dưỡng định kỳ',
  'Vệ sinh khay sạch sẽ',
  'Cân chỉnh dung sai bề mặt',
  'Thay đệm cao su ESD',
  'Kiểm định đầu ca đạt chuẩn',
  'Đã hiệu chuẩn cảm biến quang'
];








