// src/features/config/autoline_operations/mock/autolineOperationsMockData.js

/**
 * Dữ liệu mẫu sản phẩm và lộ trình sản xuất (Production Routing)
 * Phục vụ module Autoline Operations (/config/autoline-operations)
 */
export const INITIAL_PRODUCT_OPERATION = {
  codeType: 'Serial Number (SN)',
  serialNumber: 'SN-GB200-20261110-0089',
  carrierCode: 'CRR-A089 (Jig Pallet B)',
  productName: 'GB200 NVL72 AI Server',
  productCategory: 'GPU Compute Tray',
  lineName: 'Line01 (SMT & Assembly)',
  totalSteps: 10,
  completedSteps: 6,
  selectedStepNumber: 6,
  routingSteps: [
    {
      stepNumber: 1,
      stepCode: 'STEP-01',
      stationName: 'SMT-Mount-01',
      groupName: 'SMT Placement Group',
      stationDescription: 'Gắp đặt chip bán dẫn GPU & bộ nhớ HBM3e siêu tốc',
      passTimestamp: '2026-11-10 08:05:12',
      status: 'PASS',
      inspectorId: 'V1029384 - Nguyễn Văn A',
      cycleTimeSeconds: 42,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 2,
      stepCode: 'STEP-02',
      stationName: 'Reflow-Oven-01',
      groupName: 'Thermal Reflow Group',
      stationDescription: 'Lò hàn đối lưu 10 vùng nhiệt chuẩn nitrogen',
      passTimestamp: '2026-11-10 08:14:30',
      status: 'PASS',
      inspectorId: 'V109281 - Lê Hữu Phước',
      cycleTimeSeconds: 180,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 3,
      stepCode: 'STEP-03',
      stationName: 'Cooling-Zone-01',
      groupName: 'Thermal Reflow Group',
      stationDescription: 'Hạ nhiệt độ bo mạch về 28°C chống sốc nhiệt',
      passTimestamp: '2026-11-10 08:20:05',
      status: 'PASS',
      inspectorId: 'V109281 - Lê Hữu Phước',
      cycleTimeSeconds: 65,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 4,
      stepCode: 'STEP-04',
      stationName: 'Screw-Auto-02',
      groupName: 'Mechanical Fastening',
      stationDescription: 'Bắt 16 vít lực siết 0.45Nm tự động cố định tản nhiệt đồng',
      passTimestamp: '2026-11-10 08:35:44',
      status: 'PASS',
      inspectorId: 'V108455 - Trần Quốc Huy',
      cycleTimeSeconds: 38,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 5,
      stepCode: 'STEP-05',
      stationName: 'Pressfit-01',
      groupName: 'Connector Pressfit',
      stationDescription: 'Ép đầu nối PCIe Gen 5 & NVLink connector lực ép 3.2 tấn',
      passTimestamp: '2026-11-10 08:48:19',
      status: 'PASS',
      inspectorId: 'V105672 - Phạm Tuấn Nam',
      cycleTimeSeconds: 52,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 6,
      stepCode: 'STEP-06',
      stationName: 'AOI-Inspect-03',
      groupName: 'Optical Inspection Group',
      stationDescription: 'Kiểm tra quang học 3D vết hàn và chân linh kiện GPU',
      passTimestamp: '2026-11-10 09:02:50',
      status: 'PASS',
      inspectorId: 'V1029384 - Nguyễn Văn A',
      cycleTimeSeconds: 30,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 7,
      stepCode: 'STEP-07',
      stationName: 'Functional-Test-01',
      groupName: 'Electrical Testing Group',
      stationDescription: 'Đo kiểm tín hiệu điện áp cao áp DC-DC & PCIe Bus',
      passTimestamp: '2026-11-10 09:18:22',
      status: 'FAIL',
      inspectorId: 'V107712 - Đỗ Minh Hoàng',
      cycleTimeSeconds: 95,
      errorCode: 'ERR-VLT-042',
      errorDescription: 'Điện áp nguồn VRM 12V sụt áp dưới ngưỡng cho phép (đo được 11.2V < chuẩn 11.8V - 12.2V).',
      defectLocation: 'VRM Controller IC U12 - Pin 4 (VDD Sense)'
    },
    {
      stepNumber: 8,
      stepCode: 'STEP-08',
      stationName: 'Burn-In-Chamber-02',
      groupName: 'Reliability Stress Group',
      stationDescription: 'Kiểm tra độ bền nhiệt độ cao 55°C tải tối đa 24 giờ',
      passTimestamp: null,
      status: 'PENDING',
      inspectorId: null,
      cycleTimeSeconds: 0,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 9,
      stepCode: 'STEP-09',
      stationName: 'Final-QC-01',
      groupName: 'Quality Control Group',
      stationDescription: 'Nghiệm thu ngoại quan và dán tem nhãn xuất xưởng',
      passTimestamp: null,
      status: 'PENDING',
      inspectorId: null,
      cycleTimeSeconds: 0,
      errorCode: null,
      errorDescription: null
    },
    {
      stepNumber: 10,
      stepCode: 'STEP-10',
      stationName: 'Auto-Pack-01',
      groupName: 'Packaging & Logistics',
      stationDescription: 'Đóng gói túi tĩnh điện ESD và xếp vào khay vận chuyển',
      passTimestamp: null,
      status: 'PENDING',
      inspectorId: null,
      cycleTimeSeconds: 0,
      errorCode: null,
      errorDescription: null
    }
  ]
};

/**
 * Danh sách sản phẩm dự phòng để test tìm kiếm
 */
export const MOCK_SEARCHABLE_ITEMS = [
  {
    serialNumber: 'SN-GB200-20261110-0089',
    carrierCode: 'CRR-A089',
    keypart: 'KP-GPU-NV72-8801',
    productName: 'GB200 NVL72 AI Server',
    productCategory: 'GPU Compute Tray',
    lineName: 'Line01'
  },
  {
    serialNumber: 'SN-B200-HGX-20261110-0012',
    carrierCode: 'CRR-B012',
    keypart: 'KP-GPU-B200-5544',
    productName: 'B200 HGX Server',
    productCategory: 'AI Accelerator Tray',
    lineName: 'Line02'
  },
  {
    serialNumber: 'SN-H100-SXM5-20261110-0045',
    carrierCode: 'CRR-C034',
    keypart: 'KP-SXM5-H100-9902',
    productName: 'H100 SXM5 Module',
    productCategory: 'AI Server Base Tray',
    lineName: 'Line03'
  }
];

