/**
 * mesErrorCodeMockData.js
 * Dữ liệu 20 mã lỗi MES thực tế mô phỏng môi trường sản xuất máy chủ AI tại Foxconn / NVIDIA
 */

export const INITIAL_MES_ERROR_CODES = [
  {
    id: 'ERR-001',
    errorCode: 'ERR_SFC_CARRIER_LOCKED',
    owner: 'PE',
    severity: 'Critical',
    applicableStations: ['ALL_STATIONS', 'SMT_INLET', 'TEST_ROUTER'],
    messageEn: 'Carrier is currently locked in SFC. Routine inspection required before line feeding.',
    messageVi: 'Khay chứa (Carrier) đang bị khóa trên SFC. Yêu cầu kiểm định định kỳ trước khi vào chuyền.',
    troubleshootingGuide: `1. Kiểm tra mã vạch RFID trên thân khay chứa.
2. Mở màn hình Unlock Carrier (/config/unlock-carrier).
3. Thực hiện kiểm định chu kỳ và bấm xác nhận mở khóa khay.
4. Quét lại khay qua cổng đọc trạm nạp liệu.`,
    updatedAt: '2026-11-12 14:30:00',
    updatedBy: 'admin_pe',
  },
  {
    id: 'ERR-002',
    errorCode: 'ERR_AOI_SOLDER_BRIDGE',
    owner: 'TE',
    severity: 'Critical',
    applicableStations: ['AOI_STATION_01', 'AOI_STATION_02'],
    messageEn: 'Solder bridging detected between adjacent pins on GPU high-density connector.',
    messageVi: 'Phát hiện cầu hàn thiếc dính chập giữa các chân pin của cổng kết nối GPU mật độ cao.',
    troubleshootingGuide: `1. Chuyển bo mạch sang trạm sửa chữa thủ công (Rework Station).
2. Dùng kính hiển vi 20x soi xác định vị trí chân pin chập thiếc.
3. Sử dụng mỏ hàn chuyên dụng và dây hút thiếc để loại bỏ bavia hàn thừa.
4. Vệ sinh lại bằng dung dịch cồn IPA 99% và quét chạy lại AOI.`,
    updatedAt: '2026-11-12 15:10:00',
    updatedBy: 'tech_te',
  },
  {
    id: 'ERR-003',
    errorCode: 'ERR_TORQUE_OVER_LIMIT',
    owner: 'ME',
    severity: 'Major',
    applicableStations: ['SCREW_AUTO_01', 'SCREW_AUTO_02'],
    messageEn: 'Electric screwdriver torque exceeded upper safety tolerance limit (Target: 4.5Nm, Measured: 5.8Nm).',
    messageVi: 'Lực siết của tuốc-nơ-vít tự động vượt quá giới hạn an toàn (Mục tiêu: 4.5Nm, Thực tế: 5.8Nm).',
    troubleshootingGuide: `1. Dừng trạm siết vít tự động.
2. Kiểm tra cảm biến tải lực (Load Cell / Torque Transducer).
3. Dùng thiết bị cân lực cầm tay chuẩn hóa lại thông số trục vặn vít.
4. Kiểm tra ren ốc có bị nghiêng hoặc kẹt dị vật hay không.`,
    updatedAt: '2026-11-11 09:25:00',
    updatedBy: 'engineer_me',
  },
  {
    id: 'ERR-004',
    errorCode: 'ERR_BARCODE_2D_MISMATCH',
    owner: 'MES/IT',
    severity: 'Major',
    applicableStations: ['LASER_MARKING', 'LABEL_FEEDER', 'STATION_01'],
    messageEn: '2D Datamatrix barcode scan content does not match SFC production order routing rule.',
    messageVi: 'Nội dung quét mã ma trận 2D không khớp với quy tắc định tuyến của lệnh sản xuất trên SFC.',
    troubleshootingGuide: `1. Kiểm tra máy quét mã vạch 2D Keyence (ống kính có bị mờ hoặc bám bụi không).
2. Đối soát Serial Number trên hệ thống SAP/MES xem phôi có đi sai công đoạn không.
3. Nếu tem mờ, tiến hành dán lại tem phụ theo quy trình bù tem (Alabel).`,
    updatedAt: '2026-11-10 16:40:00',
    updatedBy: 'mes_admin',
  },
  {
    id: 'ERR-005',
    errorCode: 'ERR_PRESSFIT_FORCE_LOW',
    owner: 'ME',
    severity: 'Critical',
    applicableStations: ['PRESSFIT_MACHINE_01'],
    messageEn: 'Press-fit insertion force below minimum threshold. Pin might be bent or hole enlarged.',
    messageVi: 'Lực ép linh kiện Press-fit thấp hơn ngưỡng tối thiểu. Chân cắm có thể bị cong hoặc lỗ PCB bị loãng.',
    troubleshootingGuide: `1. Lấy sản phẩm ra kiểm tra chân connector dưới kính lúp.
2. Đo đường kính lỗ mạ xuyên bo (PTH) bằng dưỡng kiểm tra tiêu chuẩn.
3. Hiệu chuẩn lại đầu ép xi-lanh servo của máy Pressfit.`,
    updatedAt: '2026-11-12 11:15:00',
    updatedBy: 'engineer_me',
  },
  {
    id: 'ERR-006',
    errorCode: 'ERR_QA_VISUAL_SCRATCH',
    owner: 'QA',
    severity: 'Minor',
    applicableStations: ['OQC_INSPECTION', 'PACKING_LINE'],
    messageEn: 'Surface scratch detected on server chassis outer cosmetic cover exceeding A-grade criteria.',
    messageVi: 'Phát hiện vết xước trên bề mặt vỏ máy chủ vượt quá tiêu chuẩn thẩm mỹ cấp độ A.',
    troubleshootingGuide: `1. Đánh giá độ sâu và chiều dài vết xước theo thước đo chuẩn OQC.
2. Phân loại sản phẩm vào khu vực cách ly chờ xử lý sơn tĩnh điện lại hoặc thay vỏ.
3. Ký biên bản phế phẩm chất lượng (NCR).`,
    updatedAt: '2026-11-09 10:00:00',
    updatedBy: 'qa_lead',
  },
  {
    id: 'ERR-007',
    errorCode: 'ERR_TEST_VOLTAGE_DROP',
    owner: 'TE',
    severity: 'Critical',
    applicableStations: ['ICT_TESTER', 'FUNCTIONAL_TEST_01'],
    messageEn: 'Voltage drop across 12V auxiliary power rail exceeds 5% nominal threshold during stress testing.',
    messageVi: 'Sụt áp trên đường nguồn phụ 12V vượt quá 5% ngưỡng danh định trong bài kiểm tra tải nặng.',
    troubleshootingGuide: `1. Kiểm tra cáp nguồn cấp từ bộ nguồn phụ trạm thử nghiệm.
2. Đo điện trở tiếp xúc của fixture chân kim tiếp xúc ICT.
3. Thay thế đầu cắm tiếp xúc nếu xuất hiện muội than hoặc lỏng lẻo.`,
    updatedAt: '2026-11-11 17:30:00',
    updatedBy: 'tech_te',
  },
  {
    id: 'ERR-008',
    errorCode: 'ERR_SFC_KEYPART_DUPLICATE',
    owner: 'MES/IT',
    severity: 'Major',
    applicableStations: ['ASSEMBLY_KEYPART_SCAN'],
    messageEn: 'Scanned keypart serial number has already been bound to another parent assembly unit.',
    messageVi: 'Mã linh kiện trọng yếu (Keypart) vừa quét đã được liên kết với một máy thành phẩm khác.',
    troubleshootingGuide: `1. Kiểm tra lịch sử lắp ráp linh kiện trên màn hình Automation Line Control (Tab SFC).
                          2. Thực hiện thao tác Undo Link nếu linh kiện bị gán nhầm.
                          3. Liên hệ giám sát chuyền để xác nhận tính hợp lệ của linh kiện thực tế.`,
    updatedAt: '2026-11-12 08:45:00',
    updatedBy: 'mes_admin',
  },
  {
    id: 'ERR-009',
    errorCode: 'ERR_SMT_COMPONENT_MISSING',
    owner: 'PE',
    severity: 'Critical',
    applicableStations: ['SMT_LINE_01', 'SMT_LINE_02'],
    messageEn: 'Missing SMD decoupling capacitor C142 detected after high-speed pick and place process.',
    messageVi: 'Thiếu tụ dán dập nhiễu C142 sau công đoạn máy gắp đặt linh kiện tốc độ cao SMT.',
    troubleshootingGuide: `1. Kiểm tra cuộn nạp linh kiện (Feeder) trên máy mounter Panasonic.
                            2. Kiểm tra vòi hút nozzle có bị tắc hoặc mòn cao su chân không.
                            3. Bổ sung linh kiện thủ công và xác thực hình ảnh qua AOI trước lò hàn Reflow.`,
    updatedAt: '2026-11-08 13:20:00',
    updatedBy: 'admin_pe',
  },
  {
    id: 'ERR-010',
    errorCode: 'ERR_XRAY_BGA_VOID_HIGH',
    owner: 'TE',
    severity: 'Major',
    applicableStations: ['XRAY_INSPECTION_01'],
    messageEn: 'X-Ray void area ratio on central BGA sphere exceeds maximum permissible IPC 25% threshold.',
    messageVi: 'Tỷ lệ bọt khí (voiding) dưới bi hàn chip BGA trung tâm vượt quá tiêu chuẩn cho phép IPC 25%.',
    troubleshootingGuide: `1. Điều chỉnh đường cong nhiệt độ (Reflow Temperature Profile) của lò hàn.
2. Kiểm tra độ nhớt và hạn sử dụng của kem hàn thiếc chì không chì (Solder Paste).
3. Đưa bo mạch vào buồng sấy chân không trước khi hàn lại.`,
    updatedAt: '2026-11-10 11:05:00',
    updatedBy: 'tech_te',
  },
  {
    id: 'ERR-011',
    errorCode: 'ERR_ME_CONVEYOR_JAM',
    owner: 'ME',
    severity: 'Warning',
    applicableStations: ['CONVEYOR_ZONE_B', 'TURNTABLE_01'],
    messageEn: 'Conveyor roller jam detected near turntable buffer. Carrier transit timeout triggered.',
    messageVi: 'Kẹt băng tải gần khu vực đĩa xoay chuyển hướng. Quá thời gian di chuyển của khay chứa.',
    troubleshootingGuide: `1. Nhấn nút tạm dừng băng chuyền trạm liên quan.
2. Kiểm tra vật cản cơ khí hoặc khay chứa bị lệch ray dẫn hướng.
3. Vệ sinh cảm biến quang học phát hiện phôi và reset băng chuyền.`,
    updatedAt: '2026-11-12 16:00:00',
    updatedBy: 'engineer_me',
  },
  {
    id: 'ERR-012',
    errorCode: 'ERR_THERMAL_PASTE_DEFECT',
    owner: 'PE',
    severity: 'Major',
    applicableStations: ['DISPENSER_AUTO_01'],
    messageEn: 'Thermal grease dispensing pattern area discontinuous or volume below 0.35ml requirement.',
    messageVi: 'Biên dạng tra keo tản nhiệt không liên tục hoặc thể tích keo dưới ngưỡng yêu cầu 0.35ml.',
    troubleshootingGuide: `1. Kiểm tra áp suất khí nén bình cấp keo tản nhiệt (Thermal Paste).
2. Xả bọt khí đầu kim phun (Purge Nozzle).
3. Cân đo lại trọng lượng hạt keo bằng cân tiểu ly điện tử.`,
    updatedAt: '2026-11-11 14:15:00',
    updatedBy: 'admin_pe',
  },
  {
    id: 'ERR-013',
    errorCode: 'ERR_LEAK_TEST_PRESSURE_DROP',
    owner: 'TE',
    severity: 'Critical',
    applicableStations: ['LIQUID_COOLING_LEAK_TEST'],
    messageEn: 'Liquid cooling cold plate pneumatic leak detected. Pressure drop exceeds 0.05 bar/min.',
    messageVi: 'Rò rỉ khí tấm tản nhiệt chất lỏng (Cold Plate). Độ sụt áp vượt quá 0.05 bar/phút.',
    troubleshootingGuide: `1. Siết chặt đầu nối nhanh (Quick Disconnect fitting).
2. Thử nghiệm ngâm bồn khí xác định vị trí bọt rò rỉ.
3. Thay thế gioăng cao su chữ O (O-ring) nếu bị nứt hoặc biến dạng.`,
    updatedAt: '2026-11-13 08:00:00',
    updatedBy: 'tech_te',
  },
  {
    id: 'ERR-014',
    errorCode: 'ERR_FIRMWARE_FLASH_TIMEOUT',
    owner: 'MES/IT',
    severity: 'Major',
    applicableStations: ['FLASH_PROGRAMMING_STATION'],
    messageEn: 'BMC SPI flash chip programming communication timeout after 3 retry attempts.',
    messageVi: 'Hết thời gian nạp vi điều khiển quản lý máy chủ BMC qua giao thức SPI sau 3 lần thử lại.',
    troubleshootingGuide: `1. Kiểm tra tiếp xúc socket chân kẹp chip nạp rom.
2. Kiểm tra nguồn cấp VDD 3.3V từ kit nạp JTAG/SPI.
3. Xác minh tính toàn vẹn của tệp nhị phân firmware checksum SHA-256.`,
    updatedAt: '2026-11-09 15:45:00',
    updatedBy: 'mes_admin',
  },
  {
    id: 'ERR-015',
    errorCode: 'ERR_SCREW_STRIPPED_THREAD',
    owner: 'ME',
    severity: 'Major',
    applicableStations: ['SCREW_AUTO_03'],
    messageEn: 'Screw stripped thread detected. Screwdriver angle rotated beyond 720 degrees without reaching target torque.',
    messageVi: 'Phát hiện trờn ren ốc. Góc quay trục siết vượt quá 720 độ nhưng không đạt lực siết mục tiêu.',
    troubleshootingGuide: `1. Tháo ốc lỗi ra bằng kẹp chuyên dụng.
2. Kiểm tra lỗ ren tán chassis có bị cháy ren hay không.
3. Thay thế vít mới và cài đặt lại tốc độ trễ vòng quay.`,
    updatedAt: '2026-11-11 10:50:00',
    updatedBy: 'engineer_me',
  },
  {
    id: 'ERR-016',
    errorCode: 'ERR_QA_HI_POT_TRIP',
    owner: 'QA',
    severity: 'Critical',
    applicableStations: ['SAFETY_HI_POT_TEST'],
    messageEn: 'High-voltage insulation breakdown detected. Leakage current exceeded 5mA safety threshold.',
    messageVi: 'Đánh thủng cách điện cao áp. Dòng rò vượt quá ngưỡng an toàn 5mA trong bài kiểm tra Hi-Pot.',
    troubleshootingGuide: `1. Ngắt kết nối thiết bị kiểm tra an toàn điện ngay lập tức.
2. Kiểm tra khoảng cách khe hở cách điện (Creepage and Clearance distance).
3. Kiểm tra các tấm cách điện Mylar có bị rách hoặc lắp lệch không.`,
    updatedAt: '2026-11-12 16:45:00',
    updatedBy: 'qa_lead',
  },
  {
    id: 'ERR-017',
    errorCode: 'ERR_SFC_STEP_SEQUENCE_INVALID',
    owner: 'MES/IT',
    severity: 'Critical',
    applicableStations: ['ALL_STATIONS'],
    messageEn: 'Unit sequence violation: Previous mandatory station (AOI_02) not marked as PASSED in SFC route.',
    messageVi: 'Vi phạm thứ tự công đoạn: Trạm bắt buộc trước đó (AOI_02) chưa được ghi nhận PASS trên lộ trình SFC.',
    troubleshootingGuide: `1. Tra cứu lịch sử di chuyển phôi trên Autoline Operations (/config/autoline-operations).
2. Kiểm tra kết quả trạm AOI_02 trong CSDL.
3. Nếu bo mạch bị nhảy trạm, điều chuyển sản phẩm quay lại trạm thiếu để quét kiểm tra.`,
    updatedAt: '2026-11-10 13:10:00',
    updatedBy: 'mes_admin',
  },
  {
    id: 'ERR-018',
    errorCode: 'ERR_SMT_POLARITY_REVERSED',
    owner: 'PE',
    severity: 'Critical',
    applicableStations: ['SMT_LINE_01', 'AOI_STATION_01'],
    messageEn: 'Polarity reversed on tantalum capacitor C88. Visual cathode band misaligned with PCB silkscreen.',
    messageVi: 'Ngược cực tính tụ điện Tantalum C88. Vạch cực âm không khớp với chỉ dẫn in lụa trên PCB.',
    troubleshootingGuide: `1. Dừng máy gắp linh kiện trạm SMT tương ứng.
2. Kiểm tra hướng nạp cuộn linh kiện trên Feeder.
3. Điều chỉnh góc quay theta 180 độ trong chương trình máy Pick & Place.`,
    updatedAt: '2026-11-08 17:00:00',
    updatedBy: 'admin_pe',
  },
  {
    id: 'ERR-019',
    errorCode: 'ERR_LABEL_PRINT_UNREADABLE',
    owner: 'MES/IT',
    severity: 'Warning',
    applicableStations: ['LABEL_PRINT_PACKING'],
    messageEn: 'Zebra thermal transfer printer ribbon wrinkle causing faint or broken barcode lines.',
    messageVi: 'Nhăn mực ruy-băng máy in nhiệt Zebra khiến các vạch mã vạch bị mờ hoặc đứt nét.',
    troubleshootingGuide: `1. Mở nắp máy in, căn chỉnh lại độ căng của trục cuộn ruy-băng (Ribbon).
2. Dùng bút lau cồn vệ sinh đầu in nhiệt (Printhead).
3. In nhãn thử nghiệm (Test Print) và quét kiểm tra cấp độ ISO grade >= B.`,
    updatedAt: '2026-11-12 09:30:00',
    updatedBy: 'mes_admin',
  },
  {
    id: 'ERR-020',
    errorCode: 'ERR_WEIGHT_OUT_OF_SPEC',
    owner: 'QA',
    severity: 'Minor',
    applicableStations: ['FINAL_PACKING_SCALE'],
    messageEn: 'Final boxed package total weight is outside target envelope (Expected: 28.5kg +/- 0.5kg, Actual: 27.2kg).',
    messageVi: 'Khối lượng tổng thùng thành phẩm nằm ngoài dung sai chuẩn (Dự kiến: 28.5kg +/- 0.5kg, Thực tế: 27.2kg).',
    troubleshootingGuide: `1. Mở thùng carton đối soát danh sách phụ kiện (Checklist: Cáp nguồn, sách hướng dẫn, tai gắn rack).
2. Kiểm tra cân điện tử bằng quả cân chuẩn 20kg.
3. Bổ sung phụ kiện còn thiếu trước khi dán băng keo niêm phong.`,
    updatedAt: '2026-11-11 16:20:00',
    updatedBy: 'qa_lead',
  },
];

