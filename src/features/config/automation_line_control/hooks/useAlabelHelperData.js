import { useState, useCallback, useEffect } from 'react';
import {
  DB_ACTIVE_MODELS,
  INITIAL_PROCESS_RESULT,
  INITIAL_ALABEL_LOGS,
  MOCK_SN_DETAILS,
  MOCK_ERROR_LOGS,
  UNDO_REASONS,
} from '../constants/alabelConstants';

/**
 * Custom Hook quản lý toàn bộ dữ liệu, state tra cứu tiến trình,
 * trạng thái 7 sub-tabs và nhật ký thực thi của phân hệ ALABEL Helper
 */
export default function useAlabelHelperData() {
  // 1. State tra cứu tiến trình (Process Tracking)
  const [searchType, setSearchType] = useState('sn'); // 'sn' | 'carrier' | 'keypart'
  const [searchQuery, setSearchQuery] = useState('SN8839210492-NV');
  const [detectedModel, setDetectedModel] = useState('NVIDIA HGX B200 NVL (Blackwell)');
  const [manualModel, setManualModel] = useState(''); // Để trống = tự động nhận diện
  const [isModelDropdownExpanded, setIsModelDropdownExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [processResult, setProcessResult] = useState(INITIAL_PROCESS_RESULT);

  // 2. State điều phối 7 Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState('undo_reset');
  const [isExecutingAction, setIsExecutingAction] = useState(null);

  // Form states cho từng sub-tab
  const [undoResetForm, setUndoResetForm] = useState({
    targetType: 'sn', // 'sn' | 'carrier'
    targetCode: 'SN8839210492-NV',
    model: 'HGX_B200_NVL',
    subMode: 'undo', // 'undo' | 'cycle_reset'
    targetStep: '020',
    sn: 'SN8839210492-NV',
    station: 'ST03-SMT-A',
  });

  const [transferForm, setTransferForm] = useState({
    sn: 'SN8839210492-NV',
    oldCarrier: 'CARRIER-RFID-8819',
    newCarrier: 'CARRIER-RFID-9920',
    model: 'HGX_B200_NVL',
    targetStep: '040',
  });

  const [clearUndoForm, setClearUndoForm] = useState({
    targetType: 'sn', // 'sn' | 'carrier'
    targetCode: 'SN8839210492-NV',
    model: 'HGX_B200_NVL',
    operatorId: 'NV-2026-08819',
    clearStep: '', // '' = Mặc định / Giữ nguyên step hiện tại
  });

  const [compensateForm, setCompensateForm] = useState({
    sn: 'SN8839210492-NV',
    carrierCode: 'CARRIER-RFID-8819',
    model: 'HGX_B200_NVL',
    line: 'LINE-01-SMT',
    targetStep: '030',
    operatorId: 'NV-2026-08819',
  });

  const [compensateRows, setCompensateRows] = useState([
    { id: 1, key: 'mac_eth0', value: '00:1B:44:11:3A:F0', type: 'VARCHAR' },
    { id: 2, key: 'vendor_pn', value: 'NV-HGX-B200-NVL-998', type: 'VARCHAR' },
  ]);

  const [changeKeypartForm, setChangeKeypartForm] = useState({
    targetType: 'sn', // 'sn' | 'carrier'
    targetCode: 'SN8839210492-NV',
    model: 'HGX_B200_NVL',
    operatorId: 'NV-2026-08819',
    selectedKeypart: 'GPU_MODULE_01',
    newKeypartValue: 'NV-B200-GPU-88921-REV2',
    // Giữ tương thích ngược:
    sn: 'SN8839210492-NV',
    keyCategory: 'GPU_MODULE_01',
    oldBarcode: 'NV-B200-GPU-88910',
    newBarcode: 'NV-B200-GPU-88921-REV2',
    reason: 'Thay thế linh kiện trạm Rework do lỗi hàn chân tiếp xúc',
  });

  const [snDetailsForm, setSnDetailsForm] = useState({
    targetType: 'sn', // 'sn' | 'carrier'
    targetCode: 'SN8839210492-NV',
    model: '', // '' = Tất cả dòng sản phẩm (Mặc định)
    topLimit: 100, // 50, 100, 200, 500, 1000
  });

  const [snDetailsList, setSnDetailsList] = useState(MOCK_SN_DETAILS);
  const [errorLogsForm, setErrorLogsForm] = useState({
    targetType: 'sn',
    targetCode: '',
    model: '',
    productType: '',
    line: '',
    errorSource: '',
    stage: '',
    station: '',
    topLimit: 100,
  });
  const [errorLogsList] = useState(MOCK_ERROR_LOGS);

  // 3. State quản lý Execution Logs Console
  const [executionLogs, setExecutionLogs] = useState(INITIAL_ALABEL_LOGS);
  const [logFilterLevel, setLogFilterLevel] = useState('ALL');
  const [logKeyword, setLogKeyword] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);

  // Hàm tự động phát hiện model dựa trên giá trị query
  const autoDetectModel = useCallback((query) => {
    const q = (query || '').toUpperCase();
    if (q.includes('GB200') || q.includes('72')) {
      return 'NVIDIA GB200 NVL72 Liquid Cooled';
    }
    if (q.includes('H100')) {
      return 'NVIDIA HGX H100 SXM5 8-GPU';
    }
    if (q.includes('H200')) {
      return 'NVIDIA HGX H200 141GB HBM3e';
    }
    if (q.includes('NVLINK') || q.includes('SWITCH')) {
      return 'NVLink Switch System Tray';
    }
    return 'NVIDIA HGX B200 NVL (Blackwell)';
  }, []);

  // Đồng bộ model khi query thay đổi
  useEffect(() => {
    if (!manualModel) {
      setDetectedModel(autoDetectModel(searchQuery));
    }
  }, [searchQuery, manualModel, autoDetectModel]);

  // Handler: Tra cứu tiến trình (Process Lookup)
  const handleProcessLookup = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    await new Promise((resolve) => setTimeout(resolve, 450));

    const modelName = manualModel || autoDetectModel(searchQuery);
    const newProcessResult = {
      identifier: searchQuery.trim(),
      type: searchType,
      detectedModel: modelName,
      modelCode: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
      carrierId: searchType === 'carrier' ? searchQuery.trim() : 'CARRIER-RFID-8819',
      carrierStatus: 'ATTACHED_ON_CONVEYOR',
      currentStation: 'ST03-SMT-A',
      currentStationName: 'Trạm Lắp Ráp Bo Mạch SMT',
      routerStep: '030',
      stepName: 'KEYPART_PRECHECK_&_ASSEMBLY',
      wipStatus: 'IN_PROCESS',
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

    setProcessResult(newProcessResult);

    // Đồng bộ vào form các sub-tab
    setUndoResetForm((prev) => ({ ...prev, sn: searchQuery.trim() }));
    setTransferForm((prev) => ({ ...prev, sn: searchQuery.trim() }));
    setClearUndoForm((prev) => ({
      ...prev,
      targetType: searchType === 'carrier' ? 'carrier' : 'sn',
      targetCode: searchQuery.trim(),
      model: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
    }));
    setCompensateForm((prev) => ({
      ...prev,
      sn: searchQuery.trim(),
      carrierCode: searchType === 'carrier' ? searchQuery.trim() : prev.carrierCode || 'CARRIER-RFID-8819',
      model: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
      targetStep: newProcessResult.routerStep || '030',
    }));
    setChangeKeypartForm((prev) => ({
      ...prev,
      targetType: searchType === 'carrier' ? 'carrier' : 'sn',
      targetCode: searchQuery.trim(),
      sn: searchQuery.trim(),
      model: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
    }));
    setSnDetailsForm((prev) => ({
      ...prev,
      targetType: searchType === 'carrier' ? 'carrier' : 'sn',
      targetCode: searchQuery.trim(),
      model: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
    }));
    setErrorLogsForm((prev) => ({
      ...prev,
      targetType: searchType === 'carrier' ? 'carrier' : 'sn',
      targetCode: searchQuery.trim(),
      model: modelName.includes('GB200') ? 'GB200_NVL72' : 'HGX_B200_NVL',
      station: newProcessResult.currentStation || 'ST03-SMT-A',
    }));

    // Ghi nhận log tra cứu
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const lookupLog = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      level: 'INFO',
      action: 'PROCESS_LOOKUP',
      target: searchQuery.trim(),
      latencyMs: 18,
      message: `[LOOKUP_OK] Tìm thấy tiến trình cho [${searchType.toUpperCase()}]: ${searchQuery.trim()} tại trạm ST03-SMT-A (Step 030). Model: ${modelName}.`,
      payload: { searchType, query: searchQuery.trim(), model: modelName },
      response: { status: 'FOUND', station: 'ST03-SMT-A', routerStep: '030' },
    };

    setExecutionLogs((prev) => [lookupLog, ...prev]);
    setIsSearching(false);
  }, [searchQuery, searchType, manualModel, autoDetectModel]);

  // Handler: Thực thi tác vụ 7 Sub-tabs
  const executeSubTabAction = useCallback(async (tabId) => {
    setIsExecutingAction(tabId);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0');
    let newLog = null;

    switch (tabId) {
      case 'undo_reset': {
        const isUndo = (undoResetForm.subMode || 'undo') === 'undo';
        const targetDesc = undoResetForm.targetType === 'carrier' ? 'Carrier RFID' : 'SN';
        const targetVal = undoResetForm.targetCode || undoResetForm.sn || 'SN8839210492-NV';
        const operator = undoResetForm.operatorId || 'NV-2026-08819';
        const targetStep = undoResetForm.targetStep || '020';

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: isUndo ? 'UNDO_TO_TARGET_STEP' : 'RESET_CYCLE_STEP_0',
          target: targetVal,
          latencyMs: isUndo ? 28 : 35,
          message: isUndo
            ? `[UNDO_OK] Hoàn tác đối tượng [${targetDesc}] ${targetVal} về Step ${targetStep} thành công. Nhân viên: ${operator}. Model: ${undoResetForm.model || 'HGX_B200_NVL'}.`
            : `[RESET_CYCLE_OK] Đã thực thi reset chu kỳ về Step 0 (Step 000 - Initial State) cho [${targetDesc}] ${targetVal}. Nhân viên: ${operator}. Model: ${undoResetForm.model || 'HGX_B200_NVL'}.`,
          payload: {
            targetType: undoResetForm.targetType || 'sn',
            targetCode: targetVal,
            model: undoResetForm.model || 'HGX_B200_NVL',
            operatorId: operator,
            subMode: undoResetForm.subMode || 'undo',
            targetStep: isUndo ? targetStep : '000',
          },
          response: {
            status: 'SUCCESS',
            targetStep: isUndo ? targetStep : '000',
            rollbackStation: isUndo ? 'ST02-SMT-SURFACE' : 'ST01-FEEDER',
            cycleReset: !isUndo,
          },
        };
        break;
      }
      case 'transfer': {
        const snVal = transferForm.sn || 'SN8839210492-NV';
        const oldCarrier = transferForm.oldCarrier || 'CARRIER-RFID-8819';
        const newCarrier = transferForm.newCarrier || 'CARRIER-RFID-9920';
        const modelVal = transferForm.model || 'HGX_B200_NVL';
        const operator = transferForm.operatorId || 'NV-2026-08819';
        const targetStep = transferForm.targetStep || '040';

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'TRANSFER_CARRIER',
          target: `${snVal} ➔ ${newCarrier}`,
          latencyMs: 34,
          message: `[TRANSFER_OK] Đã điều chuyển thành công SN ${snVal} từ khay cũ [${oldCarrier}] sang khay mới [${newCarrier}] tại Step ${targetStep}. Model: ${modelVal}. Nhân viên: ${operator}.`,
          payload: {
            sn: snVal,
            oldCarrier,
            newCarrier,
            model: modelVal,
            operatorId: operator,
            targetStep,
          },
          response: {
            status: 'SUCCESS',
            sn: snVal,
            transferredToCarrier: newCarrier,
            targetStep,
            carrierStatus: 'ATTACHED_ON_CONVEYOR',
          },
        };
        break;
      }
      case 'clear_undo': {
        const targetType = clearUndoForm.targetType || 'sn';
        const targetDesc = targetType === 'carrier' ? 'Carrier RFID' : 'SN';
        const targetVal = clearUndoForm.targetCode || 'SN8839210492-NV';
        const modelVal = clearUndoForm.model || 'HGX_B200_NVL';
        const operator = clearUndoForm.operatorId || 'NV-2026-08819';
        const clearStep = clearUndoForm.clearStep || '';
        const stepDesc = clearStep ? `Step ${clearStep}` : 'Giữ nguyên step hiện tại (Toàn bộ chu kỳ)';

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'CLEAR_UNDO_REWORK',
          target: `[${targetType.toUpperCase()}] ${targetVal}`,
          latencyMs: 26,
          message: `[CLEAR_UNDO_OK] Đã thực thi giải undo/rework (shared_clearundorework) cho [${targetDesc}] ${targetVal} (Model: ${modelVal}) tại ${stepDesc}. Nhân viên: ${operator}.`,
          payload: {
            targetType,
            targetCode: targetVal,
            model: modelVal,
            operatorId: operator,
            clearStep: clearStep || 'CURRENT',
            action: 'shared_clearundorework',
          },
          response: {
            status: 'SUCCESS',
            action: 'shared_clearundorework',
            unlocked: true,
            targetCode: targetVal,
            step: clearStep || 'CURRENT',
            latencyMs: 26,
          },
        };
        break;
      }
      case 'compensate_detail': {
        const snVal = compensateForm.sn || 'SN8839210492-NV';
        const carrierVal = compensateForm.carrierCode || 'CARRIER-RFID-8819';
        const modelVal = compensateForm.model || 'HGX_B200_NVL';
        const lineVal = compensateForm.line || 'LINE-01-SMT';
        const targetStepVal = compensateForm.targetStep || '030';
        const operator = compensateForm.operatorId || 'NV-2026-08819';

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'MANUAL_INSERT_SN',
          target: `${snVal} | Khay: ${carrierVal}`,
          latencyMs: 38,
          message: `[MANUAL_INSERT_OK] Đã nạp bù dữ liệu SNDetails thành công từ Step 1 đến Step ${targetStepVal} qua SP [AutoLine].[Shared_ManualInsertSn] cho SN ${snVal} (Khay: ${carrierVal}, Chuyền: ${lineVal}, Model: ${modelVal}). Nhân viên: ${operator}.`,
          payload: {
            sn: snVal,
            carrierCode: carrierVal,
            model: modelVal,
            line: lineVal,
            targetStep: targetStepVal,
            operatorId: operator,
            spName: '[AutoLine].[Shared_ManualInsertSn]',
            action: 'Shared_ManualInsertSN',
          },
          response: {
            status: 'SUCCESS',
            sp: 'Shared_ManualInsertSN',
            sn: snVal,
            targetStep: targetStepVal,
            rowsInserted: 8,
            latencyMs: 38,
          },
        };
        // Cập nhật vào danh sách sndetails mẫu
        setSnDetailsList((prev) => [
          {
            id: Date.now(),
            key: 'manual_compensate_status',
            value: `SP_INSERTED_STEP_1_TO_${targetStepVal}`,
            station: targetStepVal,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            status: 'COMPENSATED',
          },
          ...prev,
        ]);
        break;
      }
      case 'change_keypart': {
        const targetType = changeKeypartForm.targetType || 'sn';
        const targetVal = changeKeypartForm.targetCode || changeKeypartForm.sn || 'SN8839210492-NV';
        const modelVal = changeKeypartForm.model || 'HGX_B200_NVL';
        const operator = changeKeypartForm.operatorId || 'NV-2026-08819';
        const keypart = changeKeypartForm.selectedKeypart || changeKeypartForm.keyCategory || 'GPU_MODULE_01';
        const newVal = changeKeypartForm.newKeypartValue || changeKeypartForm.newBarcode || 'NV-B200-GPU-88921-REV2';

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'CHANGE_KEYPART_VALUE',
          target: `${targetType.toUpperCase()}: ${targetVal} | Key: ${keypart}`,
          latencyMs: 32,
          message: `[CHANGE_KEYPART_OK] Đã xác nhận thay đổi giá trị keypart '${keypart}' thành '${newVal}' trong bảng sndetaildatas cho ${targetType.toUpperCase()} '${targetVal}' (Model: ${modelVal}). Nhân viên: ${operator}.`,
          payload: {
            targetType,
            targetCode: targetVal,
            model: modelVal,
            operatorId: operator,
            selectedKeypart: keypart,
            newKeypartValue: newVal,
            tableName: 'sndetaildatas',
            action: 'update_keypart_sndetaildatas',
          },
          response: {
            status: 'SUCCESS',
            table: 'sndetaildatas',
            keypart,
            newValue: newVal,
            updatedRows: 1,
            auditId: `AUD-${Date.now().toString().slice(-6)}`,
            latencyMs: 32,
          },
        };

        // Cập nhật vào danh sách sndetails mẫu
        setSnDetailsList((prev) => [
          {
            id: Date.now(),
            key: `keypart_${keypart.toLowerCase()}`,
            value: newVal,
            station: 'ST03-SMT-A',
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            status: 'UPDATED',
          },
          ...prev,
        ]);
        break;
      }
      case 'sndetails': {
        const targetType = snDetailsForm.targetType || 'sn';
        const targetVal = snDetailsForm.targetCode || processResult.identifier || 'SN8839210492-NV';
        const modelVal = snDetailsForm.model || 'TẤT CẢ DÒNG SẢN PHẨM';
        const limitVal = snDetailsForm.topLimit || 100;

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'INFO',
          action: 'SNDETAILS_FETCH',
          target: `${targetType.toUpperCase()}: ${targetVal}`,
          latencyMs: 22,
          message: `[SNDETAILS_OK] Truy vấn thành công bảng sndetails cho ${targetType.toUpperCase()} '${targetVal}' (Model: ${modelVal}). Đã tải ${snDetailsList.length} bản ghi (Top Limit: ${limitVal}).`,
          payload: {
            targetType,
            targetCode: targetVal,
            model: modelVal,
            topLimit: limitVal,
            action: 'query_sndetails',
          },
          response: { totalRows: snDetailsList.length, status: 'OK', topLimit: limitVal },
        };
        break;
      }
      case 'error_logs': {
        const targetType = errorLogsForm.targetType || 'sn';
        const targetVal = errorLogsForm.targetCode || processResult.identifier || 'TẤT CẢ';
        const modelVal = errorLogsForm.model || 'TẤT CẢ MODEL';
        const lineVal = errorLogsForm.line || 'TẤT CẢ CHUYỀN';
        const sourceVal = errorLogsForm.errorSource || 'TẤT CẢ NGUỒN';
        const stationVal = errorLogsForm.station || processResult.currentStation || 'TẤT CẢ TRẠM';
        const limitVal = errorLogsForm.topLimit || 100;

        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'WARNING',
          action: 'ERROR_LOGS_QUERY',
          target: `${targetType.toUpperCase()}: ${targetVal} | Trạm: ${stationVal}`,
          latencyMs: 26,
          message: `[ERROR_LOGS_OK] Truy vấn thành công bảng ErrorLogs cho ${targetType.toUpperCase()} '${targetVal}' (Trạm: ${stationVal}, Chuyền: ${lineVal}, Nguồn: ${sourceVal}, Model: ${modelVal}). Đã tải ${errorLogsList.length} bản ghi lỗi (Top Limit: ${limitVal}).`,
          payload: {
            targetType,
            targetCode: targetVal,
            model: modelVal,
            productType: errorLogsForm.productType || 'TẤT CẢ',
            line: lineVal,
            errorSource: sourceVal,
            stage: errorLogsForm.stage || 'TẤT CẢ',
            station: stationVal,
            topLimit: limitVal,
            action: 'query_error_logs',
          },
          response: { count: errorLogsList.length, status: 'OK', topLimit: limitVal },
        };
        break;
      }
      default:
        break;
    }

    if (newLog) {
      setExecutionLogs((prev) => [newLog, ...prev]);
    }
    setIsExecutingAction(null);
  }, [
    undoResetForm,
    transferForm,
    clearUndoForm,
    compensateRows,
    changeKeypartForm,
    processResult,
    snDetailsList.length,
    errorLogsList.length,
  ]);

  // Console Toolbar actions
  const handleClearLogs = useCallback(() => {
    setExecutionLogs([]);
  }, []);

  const handleExportLogs = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(executionLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ALABEL_EXECUTION_LOGS_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [executionLogs]);

  // Bộ lọc logs hiển thị
  const filteredLogs = executionLogs.filter((log) => {
    const matchesLevel = logFilterLevel === 'ALL' || log.level === logFilterLevel;
    const matchesKeyword =
      !logKeyword.trim() ||
      log.action.toLowerCase().includes(logKeyword.toLowerCase()) ||
      log.target.toLowerCase().includes(logKeyword.toLowerCase()) ||
      log.message.toLowerCase().includes(logKeyword.toLowerCase());
    return matchesLevel && matchesKeyword;
  });

  return {
    // Process Lookup
    searchType,
    setSearchType,
    searchQuery,
    setSearchQuery,
    detectedModel,
    manualModel,
    setManualModel,
    isModelDropdownExpanded,
    setIsModelDropdownExpanded,
    isSearching,
    processResult,
    handleProcessLookup,

    // Sub-Tabs Management
    activeSubTab,
    setActiveSubTab,
    isExecutingAction,
    executeSubTabAction,

    // Sub-tab Form States & Handlers
    undoResetForm,
    setUndoResetForm,
    transferForm,
    setTransferForm,
    clearUndoForm,
    setClearUndoForm,
    compensateForm,
    setCompensateForm,
    compensateRows,
    setCompensateRows,
    changeKeypartForm,
    setChangeKeypartForm,
    snDetailsForm,
    setSnDetailsForm,
    snDetailsList,
    errorLogsForm,
    setErrorLogsForm,
    errorLogsList,

    // Execution Logs
    executionLogs: filteredLogs,
    rawLogsCount: executionLogs.length,
    logFilterLevel,
    setLogFilterLevel,
    logKeyword,
    setLogKeyword,
    autoScroll,
    setAutoScroll,
    handleClearLogs,
    handleExportLogs,
  };
}
