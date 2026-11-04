import { useState, useCallback } from 'react';
import {
  DEFAULT_FILTER,
  INITIAL_KEYPARTS,
  INITIAL_TRANSACTION,
} from '../constants/sfcControlConstants';

/**
 * Custom Hook quản lý dữ liệu, bộ lọc và các tác vụ phát lệnh dùng chung cho cả SFC Switch và SFC Adapter
 */
export default function useAutolineControlData() {
  const [activeTab, setActiveTab] = useState('sfc_switch');
  const [filters, setFilters] = useState(DEFAULT_FILTER);
  const [keyparts, setKeyparts] = useState(INITIAL_KEYPARTS);
  const [testResultStatus, setTestResultStatus] = useState('PASS'); // 'PASS' | 'FAIL'
  const [latestTransaction, setLatestTransaction] = useState(INITIAL_TRANSACTION);
  const [isExecutingAction, setIsExecutingAction] = useState(null); // string | null
  const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // Bearer token cho Adapter mode

  // Cập nhật từng trường bộ lọc
  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Đặt lại bộ lọc về mặc định
  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER);
  }, []);

  // Chọn / Bỏ chọn từng dòng Keypart
  const handleToggleKeypartSelect = useCallback((id) => {
    setKeyparts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  // Chọn tất cả / Bỏ chọn tất cả Keyparts
  const handleSelectAllKeyparts = useCallback((selectAll) => {
    setKeyparts((prev) =>
      prev.map((item) => ({ ...item, selected: selectAll }))
    );
  }, []);

  // Thao tác đặc thù Adapter: ADAPTER_GetAccessTokenSFC
  const executeGetAccessToken = useCallback(async () => {
    const actionName = 'ADAPTER_GetAccessTokenSFC';
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-AUTH-${Date.now().toString().slice(-8)}`;
    const mockToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Date.now()}`;
    setAccessToken(mockToken);

    const newTx = {
      transactionId: txId,
      actionName,
      status: 'SUCCESS',
      httpCode: 200,
      sfcReturnCode: '0',
      latencyMs: Math.floor(Math.random() * 20) + 18,
      timestamp,
      message: `[AUTH_OK] Đã nhận Access Token từ SFC Adapter Gateway (${filters.host}). Token có hiệu lực trong 3600 giây.`,
      requestPayload: {
        host: filters.host,
        stationIp: filters.stationIp,
        group: filters.stationGroup,
        grant_type: 'client_credentials'
      },
      responseData: {
        access_token: mockToken,
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'sfc_adapter_write'
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
  }, [filters]);

  // Thao tác 1: Insert Serial Number (SWITCH hoặc ADAPTER)
  const executeInsertSerialNumber = useCallback(async (mode = 'switch') => {
    const actionName = mode === 'adapter' ? 'ADAPTER_InsertSerialNumberSFC' : 'SWITCH_InsertSerialNumberSFC';
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-${Date.now().toString().slice(-8)}`;

    const newTx = {
      transactionId: txId,
      actionName,
      status: 'SUCCESS',
      httpCode: 200,
      sfcReturnCode: '0',
      latencyMs: Math.floor(Math.random() * 25) + 30,
      timestamp,
      message: `[OK] Đã đăng ký Serial Number ${filters.searchTerm} vào trạm ${filters.stationGroup} thành công trên ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}.`,
      requestPayload: {
        sn: filters.searchTerm,
        model: filters.productFamily,
        group: filters.stationGroup,
        host: filters.host,
        stationIp: filters.stationIp,
        token: mode === 'adapter' ? accessToken : undefined,
        action: 'INSERT_SERIAL_NUMBER'
      },
      responseData: {
        return_code: 0,
        result: 'INSERT_OK',
        current_step: '010',
        route_status: 'IN_PROCESS',
        gateway_mode: mode.toUpperCase()
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
  }, [filters, accessToken]);

  // Thao tác 2: Check Serial Number (SWITCH hoặc ADAPTER)
  const executeCheckSerialNumber = useCallback(async (mode = 'switch') => {
    const actionName = mode === 'adapter' ? 'ADAPTER_CheckSerialNumberSFC' : 'SWITCH_CheckSerialNumberSFC';
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 550));

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-${Date.now().toString().slice(-8)}`;

    const newTx = {
      transactionId: txId,
      actionName,
      status: 'SUCCESS',
      httpCode: 200,
      sfcReturnCode: '0',
      latencyMs: Math.floor(Math.random() * 20) + 25,
      timestamp,
      message: `[CHECK_OK] Serial Number ${filters.searchTerm} hợp lệ qua ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}. Không bị Hold/Lock, Router sẵn sàng tại trạm ${filters.stationGroup}.`,
      requestPayload: {
        sn: filters.searchTerm,
        group: filters.stationGroup,
        host: filters.host,
        stationIp: filters.stationIp,
        action: 'CHECK_SERIAL_NUMBER'
      },
      responseData: {
        return_code: 0,
        result: 'PASS',
        is_hold: false,
        previous_station: 'SMT_INSPECTION_PASS',
        next_step: '020'
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
  }, [filters]);

  // Thao tác 3: Check Keyparts (SWITCH hoặc ADAPTER)
  const executeCheckKeyParts = useCallback(async (mode = 'switch') => {
    const actionName = mode === 'adapter' ? 'ADAPTER_CheckKeyPartsSFC(0)' : 'SWITCH_CheckKeyPartsSFC(0)';
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 750));

    const selectedList = keyparts.filter((k) => k.selected);
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-${Date.now().toString().slice(-8)}`;

    // Cập nhật trạng thái precheck cho các keypart được chọn
    setKeyparts((prev) =>
      prev.map((k) => {
        if (k.selected) {
          return { ...k, sfcPrecheck: 'PASSED', sfcFlag: 'Y' };
        }
        return k;
      })
    );

    const newTx = {
      transactionId: txId,
      actionName,
      status: 'SUCCESS',
      httpCode: 200,
      sfcReturnCode: '0',
      latencyMs: Math.floor(Math.random() * 30) + 40,
      timestamp,
      message: `[CHECK_KEYPARTS_OK] Đã kiểm tra ${selectedList.length} linh kiện (Mode 0: Tiêu chuẩn) qua ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}. Tất cả khớp với quy chuẩn BOM của dòng ${filters.productFamily}.`,
      requestPayload: {
        sn: filters.searchTerm,
        mode: 0,
        group: filters.stationGroup,
        checkedKeyCount: selectedList.length,
        keyparts: selectedList.map((k) => ({
          name: k.keyName,
          value: k.keyValue,
          step: k.step
        }))
      },
      responseData: {
        return_code: 0,
        result: 'VALID',
        matched_items: selectedList.length,
        unmatched_items: 0,
        sfc_flags_updated: true
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
  }, [keyparts, filters]);

  // Thao tác 4: Insert Test Result (SWITCH hoặc ADAPTER)
  const executeInsertTestResult = useCallback(async (mode = 'switch') => {
    const actionPrefix = mode === 'adapter' ? 'Adapter_InsertTestResultSFC' : 'Switch_InsertTestResultSFC';
    const actionName = `${actionPrefix}(${testResultStatus})`;
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 650));

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-${Date.now().toString().slice(-8)}`;
    const isPass = testResultStatus === 'PASS';

    const newTx = {
      transactionId: txId,
      actionName,
      status: isPass ? 'SUCCESS' : 'FAILED',
      httpCode: isPass ? 200 : 422,
      sfcReturnCode: isPass ? '0' : 'E-TEST-FAIL-09',
      latencyMs: Math.floor(Math.random() * 25) + 35,
      timestamp,
      message: isPass
        ? `[TEST_RESULT_PASS] Đã ghi nhận kết quả PASS cho SN ${filters.searchTerm} tại trạm ${filters.stationGroup} qua ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}. Sản phẩm được phép luân chuyển.`
        : `[TEST_RESULT_FAIL] Đã ghi nhận kết quả FAIL cho SN ${filters.searchTerm} qua ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}. Trạm tự động gán mã lỗi và chuyển làn Rework.`,
      requestPayload: {
        sn: filters.searchTerm,
        result: testResultStatus,
        stationGroup: filters.stationGroup,
        stationIp: filters.stationIp,
        host: filters.host,
        errorCode: isPass ? null : 'ERR_KEYPART_TOLERANCE_EXCEEDED'
      },
      responseData: {
        return_code: isPass ? 0 : 99,
        committed_to_sfc: true,
        next_station: isPass ? 'PRESSFIT_AUTO' : 'REWORK_BUFFER_LINE',
        operator_event: `TEST_${testResultStatus}_RECORDED`
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
  }, [testResultStatus, filters]);

  // Thao tác 5: Undo Link (SWITCH hoặc ADAPTER)
  const executeUndoLink = useCallback(async (mode = 'switch') => {
    const actionName = mode === 'adapter' ? 'ADAPTER_UndoLinkSFC' : 'SWITCH_UndoLinkSFC';
    setIsExecutingAction(actionName);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const txId = `TX-${Date.now().toString().slice(-8)}`;

    // Reset trạng thái cờ và precheck của các keyparts
    setKeyparts((prev) =>
      prev.map((k) => ({
        ...k,
        sfcFlag: 'N',
        sfcPrecheck: 'PENDING'
      }))
    );

    const newTx = {
      transactionId: txId,
      actionName,
      status: 'SUCCESS',
      httpCode: 200,
      sfcReturnCode: '0',
      latencyMs: Math.floor(Math.random() * 35) + 45,
      timestamp,
      message: `[UNDO_LINK_OK] Đã hoàn tác (Unlink) toàn bộ liên kết linh kiện của SN ${filters.searchTerm} qua ${mode === 'adapter' ? 'SFC Adapter' : 'SFC Switch'}. Sẵn sàng quét lại từ đầu.`,
      requestPayload: {
        sn: filters.searchTerm,
        group: filters.stationGroup,
        host: filters.host,
        stationIp: filters.stationIp,
        reason: 'OPERATOR_MANUAL_UNDO_ROLLBACK'
      },
      responseData: {
        return_code: 0,
        result: 'UNLINK_SUCCESSFUL',
        unlinked_count: keyparts.length,
        status: 'UNBOUND'
      }
    };

    setLatestTransaction(newTx);
    setIsExecutingAction(null);
    setIsUndoModalOpen(false);
  }, [filters, keyparts.length]);

  // Xóa màn hình Terminal
  const handleClearConsole = useCallback(() => {
    setLatestTransaction(null);
  }, []);

  return {
    activeTab,
    setActiveTab,
    filters,
    handleFilterChange,
    handleResetFilters,
    keyparts,
    handleToggleKeypartSelect,
    handleSelectAllKeyparts,
    testResultStatus,
    setTestResultStatus,
    latestTransaction,
    handleClearConsole,
    isExecutingAction,
    accessToken,
    executeGetAccessToken,
    executeInsertSerialNumber,
    executeCheckSerialNumber,
    executeCheckKeyParts,
    executeInsertTestResult,
    executeUndoLink,
    isUndoModalOpen,
    setIsUndoModalOpen,
  };
}
