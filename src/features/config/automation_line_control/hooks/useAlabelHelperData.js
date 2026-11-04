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
    targetId: 'CARRIER-RFID-8819',
    reason: 'Kỹ sư trưởng kiểm tra ngoại quan đạt chuẩn, giải phóng cờ khóa Undo',
    forceUnlock: true,
  });

  const [compensateRows, setCompensateRows] = useState([
    { id: 1, key: 'mac_eth0', value: '00:1B:44:11:3A:F0', type: 'VARCHAR' },
    { id: 2, key: 'vendor_pn', value: 'NV-HGX-B200-NVL-998', type: 'VARCHAR' },
  ]);

  const [changeKeypartForm, setChangeKeypartForm] = useState({
    sn: 'SN8839210492-NV',
    keyCategory: 'GPU_MODULE_01',
    oldBarcode: 'NV-B200-GPU-88910',
    newBarcode: 'NV-B200-GPU-88921-REV2',
    reason: 'Thay thế linh kiện trạm Rework do lỗi hàn chân tiếp xúc',
  });

  const [snDetailsList, setSnDetailsList] = useState(MOCK_SN_DETAILS);
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
    setChangeKeypartForm((prev) => ({ ...prev, sn: searchQuery.trim() }));

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
        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'CLEAR_UNDO',
          target: clearUndoForm.targetId,
          latencyMs: 22,
          message: `[CLEAR_UNDO_OK] Đã giải phóng hoàn toàn cờ khóa Undo trên đối tượng ${clearUndoForm.targetId}.`,
          payload: { ...clearUndoForm },
          response: { status: 'SUCCESS', unlocked: true, clearCount: 1 },
        };
        break;
      }
      case 'compensate_detail': {
        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'SUCCESS',
          action: 'COMPENSATE_DETAIL',
          target: processResult.identifier,
          latencyMs: 42,
          message: `[COMPENSATE_OK] Đã cập nhật bù ${compensateRows.length} trường thuộc tính vào bảng sn_detail thành công.`,
          payload: { sn: processResult.identifier, rows: compensateRows },
          response: { status: 'SUCCESS', rowsUpdated: compensateRows.length },
        };
        // Cập nhật vào danh sách sndetails
        setSnDetailsList((prev) => [
          ...compensateRows.map((r, i) => ({
            id: Date.now() + i,
            key: r.key,
            value: r.value,
            station: processResult.currentStation,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            status: 'COMPENSATED',
          })),
          ...prev,
        ]);
        break;
      }
      case 'change_keypart': {
        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'WARNING',
          action: 'CHANGE_KEYPART',
          target: changeKeypartForm.sn,
          latencyMs: 39,
          message: `[KEYPART_SWAP] Đã đổi linh kiện [${changeKeypartForm.keyCategory}]: ${changeKeypartForm.oldBarcode} -> ${changeKeypartForm.newBarcode}. Đang chờ SFC đối chiếu.`,
          payload: { ...changeKeypartForm },
          response: { status: 'SWAP_PENDING', auditId: `AUD-${Date.now().toString().slice(-6)}` },
        };
        break;
      }
      case 'sndetails': {
        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'INFO',
          action: 'SNDETAILS_FETCH',
          target: processResult.identifier,
          latencyMs: 16,
          message: `[SNDETAILS_REFRESH] Đã tải lại toàn bộ ${snDetailsList.length} bản ghi cấu hình của SN: ${processResult.identifier}.`,
          payload: { sn: processResult.identifier },
          response: { totalRows: snDetailsList.length, status: 'OK' },
        };
        break;
      }
      case 'error_logs': {
        newLog = {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          level: 'INFO',
          action: 'ERROR_LOGS_QUERY',
          target: processResult.currentStation,
          latencyMs: 19,
          message: `[ERROR_LOGS_REFRESH] Truy vấn danh sách cảnh báo trạm ${processResult.currentStation}: ${errorLogsList.length} bản ghi được ghi nhận.`,
          payload: { station: processResult.currentStation },
          response: { count: errorLogsList.length },
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
    compensateRows,
    setCompensateRows,
    changeKeypartForm,
    setChangeKeypartForm,
    snDetailsList,
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
