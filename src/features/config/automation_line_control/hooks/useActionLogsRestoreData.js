import { useState, useMemo, useCallback } from 'react';
import {
  MOCK_ACTION_LOGS,
} from '../constants/actionLogsConstants';

/**
 * Custom Hook: useActionLogsRestoreData
 * Quản lý trạng thái lọc, phân trang, xem chi tiết, đối soát Diff và Safe Restore
 */
export default function useActionLogsRestoreData(initialFilters = {}) {
  // Khoảng thời gian mặc định: 7 ngày trước đến cuối ngày hiện tại
  const defaultFromDate = '2026-10-29T00:00';
  const defaultToDate = '2026-11-05T23:59';

  // 1. State bộ lọc 5 trường
  const [filters, setFilters] = useState({
    fromDate: defaultFromDate,
    toDate: defaultToDate,
    actionType: 'ALL',
    subsystem: 'ALL',
    keyword: initialFilters?.snCarrier || '',
  });

  // State lưu danh sách log hoạt động (có thể cập nhật động khi restore)
  const [logsList, setLogsList] = useState(MOCK_ACTION_LOGS);

  // 2. State phân trang & số dòng hiển thị
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // 3. State Modal Xem Chi Tiết
  const [selectedDetailLog, setSelectedDetailLog] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 4. State Modal Đối Soát Diff
  const [selectedDiffLog, setSelectedDiffLog] = useState(null);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [diffViewMode, setDiffViewMode] = useState('table'); // 'table' | 'json'

  // 5. State Modal Phục Hồi Safe Restore
  const [selectedRestoreLog, setSelectedRestoreLog] = useState(null);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [restoreReason, setRestoreReason] = useState('');
  const [confirmRisk, setConfirmRisk] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // 6. Thông báo Toast phản hồi người dùng
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Handler cập nhật trường lọc
  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Trở về trang 1 khi thay đổi tiêu chí
  }, []);

  // Làm sạch bộ lọc
  const handleResetFilters = useCallback(() => {
    setFilters({
      fromDate: defaultFromDate,
      toDate: defaultToDate,
      actionType: 'ALL',
      subsystem: 'ALL',
      keyword: '',
    });
    setCurrentPage(1);
    showToast('Đã đặt lại toàn bộ tiêu chí lọc về mặc định.', 'info');
  }, [defaultFromDate, defaultToDate, showToast]);

  // Áp dụng bộ lọc lên danh sách Logs
  const filteredLogs = useMemo(() => {
    return logsList.filter((log) => {
      // 1. Lọc theo thời gian
      if (filters.fromDate) {
        const fromTime = new Date(filters.fromDate).getTime();
        const logTime = new Date(log.timestamp.replace(' ', 'T')).getTime();
        if (!isNaN(fromTime) && !isNaN(logTime) && logTime < fromTime) {
          return false;
        }
      }
      if (filters.toDate) {
        const toTime = new Date(filters.toDate).getTime();
        const logTime = new Date(log.timestamp.replace(' ', 'T')).getTime();
        if (!isNaN(toTime) && !isNaN(logTime) && logTime > toTime) {
          return false;
        }
      }

      // 2. Lọc theo Hành Động
      if (filters.actionType !== 'ALL' && log.actionType !== filters.actionType) {
        return false;
      }

      // 3. Lọc theo Phân Hệ
      if (filters.subsystem !== 'ALL' && log.subsystem !== filters.subsystem) {
        return false;
      }

      // 4. Lọc theo từ khóa tìm kiếm (Mã thẻ, SN, Carrier, bảng đích, mô tả...)
      if (filters.keyword && filters.keyword.trim() !== '') {
        const kw = filters.keyword.trim().toLowerCase();
        const matchId = log.id.toLowerCase().includes(kw);
        const matchOperator = log.operatorId.toLowerCase().includes(kw);
        const matchTarget = log.targetCode.toLowerCase().includes(kw);
        const matchTable = log.targetTable.toLowerCase().includes(kw);
        const matchDesc = log.description.toLowerCase().includes(kw);
        if (!matchId && !matchOperator && !matchTarget && !matchTable && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [logsList, filters]);

  // Tính toán phân trang
  const totalRecords = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Đảm bảo currentPage không vượt quá totalPages
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedLogs = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    return filteredLogs.slice(startIndex, startIndex + pageSize);
  }, [filteredLogs, validCurrentPage, pageSize]);

  // Modal Handlers: Xem Chi Tiết
  const handleOpenDetail = useCallback((log) => {
    setSelectedDetailLog(log);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedDetailLog(null);
  }, []);

  // Modal Handlers: Đối Soát Diff
  const handleOpenDiff = useCallback((log) => {
    setSelectedDiffLog(log);
    setDiffViewMode('table');
    setIsDiffOpen(true);
  }, []);

  const handleCloseDiff = useCallback(() => {
    setIsDiffOpen(false);
    setSelectedDiffLog(null);
  }, []);

  // Modal Handlers: Safe Restore
  const handleOpenRestore = useCallback((log) => {
    if (!log.canRestore || log.status === 'RESTORED') {
      showToast('Bản ghi này đã được hoàn nguyên hoặc không hỗ trợ phục hồi.', 'error');
      return;
    }
    setSelectedRestoreLog(log);
    setRestoreReason('');
    setConfirmRisk(false);
    setIsRestoreOpen(true);
  }, [showToast]);

  const handleCloseRestore = useCallback(() => {
    setIsRestoreOpen(false);
    setSelectedRestoreLog(null);
    setRestoreReason('');
    setConfirmRisk(false);
  }, []);

  // Thực thi phục hồi trạng thái (Safe Restore)
  const handleConfirmRestore = useCallback(
    async (operatorId) => {
      if (!selectedRestoreLog) return;
      if (!restoreReason || restoreReason.trim().length < 10) {
        showToast('Vui lòng nhập lý do phục hồi rõ ràng (tối thiểu 10 ký tự).', 'error');
        return;
      }
      if (!confirmRisk) {
        showToast('Vui lòng đánh dấu xác nhận chịu trách nhiệm kiểm tra hiện trường.', 'error');
        return;
      }

      setIsRestoring(true);

      // Giả lập độ trễ API rollback 600ms
      await new Promise((resolve) => setTimeout(resolve, 600));

      const now = new Date();
      const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newRestoreActionId = `ACT-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Cập nhật bản ghi gốc thành RESTORED
      // 2. Tạo bản ghi mới ghi nhận sự kiện RESTORE
      setLogsList((prev) => {
        const updatedList = prev.map((item) => {
          if (item.id === selectedRestoreLog.id) {
            return {
              ...item,
              status: 'RESTORED',
              canRestore: false,
              description: `${item.description} [ĐÃ HOÀN NGUYÊN bới ${operatorId} lúc ${timestampStr}]`,
            };
          }
          return item;
        });

        const newRestoreLog = {
          id: newRestoreActionId,
          timestamp: timestampStr,
          operatorId: operatorId || 'NV-2026-08819',
          actionType: 'restore',
          subsystem: selectedRestoreLog.subsystem,
          targetTable: selectedRestoreLog.targetTable,
          targetType: selectedRestoreLog.targetType,
          targetCode: selectedRestoreLog.targetCode,
          description: `Phục hồi hoàn nguyên bản ghi ${selectedRestoreLog.id}. Lý do: ${restoreReason}`,
          status: 'SUCCESS',
          canRestore: false,
          metadata: {
            clientIp: selectedRestoreLog.metadata?.clientIp || '192.168.10.45',
            hostname: 'RESTORE-CONTROLLER',
            sessionId: `SESS-RESTORE-${Date.now()}`,
            spName: '[AutoLine].[ALABEL_RollbackActionSnapshot]',
            latencyMs: 34,
            requestPayload: {
              sourceActionId: selectedRestoreLog.id,
              restoreReason,
              operatorId,
            },
            responseBody: {
              statusCode: 200,
              status: 'SUCCESS',
              message: `Đã hoàn nguyên CSDL bảng ${selectedRestoreLog.targetTable} về snapshot trước đó.`,
            },
          },
          diff: {
            beforeState: selectedRestoreLog.diff?.afterState || {},
            afterState: selectedRestoreLog.diff?.beforeState || {},
            changedFields: selectedRestoreLog.diff?.changedFields || [],
          },
        };

        return [newRestoreLog, ...updatedList];
      });

      setIsRestoring(false);
      setIsRestoreOpen(false);
      showToast(
        `Phục hồi thành công đối tượng ${selectedRestoreLog.targetCode}! Mã tác vụ phục hồi: ${newRestoreActionId}`,
        'success'
      );
    },
    [selectedRestoreLog, restoreReason, confirmRisk, showToast]
  );

  // Xuất báo cáo kiểm toán CSV
  const handleExportReport = useCallback(() => {
    if (filteredLogs.length === 0) {
      showToast('Không có bản ghi nào để xuất báo cáo.', 'info');
      return;
    }

    const headers = [
      'ID',
      'Thời Gian',
      'Người Thực Hiện',
      'Hành Động',
      'Phân Hệ',
      'Bảng Đích',
      'Loại Mục Tiêu',
      'Mã Mục Tiêu',
      'Mô Tả Chi Tiết',
      'Trạng Thái',
    ];

    const rows = filteredLogs.map((log) => [
      `"${log.id}"`,
      `"${log.timestamp}"`,
      `"${log.operatorId}"`,
      `"${log.actionType}"`,
      `"${log.subsystem}"`,
      `"${log.targetTable}"`,
      `"${log.targetType}"`,
      `"${log.targetCode}"`,
      `"${log.description.replace(/"/g, '""')}"`,
      `"${log.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Audit_Action_Logs_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Đã xuất thành công ${filteredLogs.length} bản ghi kiểm toán ra file CSV.`, 'success');
  }, [filteredLogs, showToast]);

  return {
    filters,
    handleFilterChange,
    handleResetFilters,
    pageSize,
    setPageSize: (size) => {
      setPageSize(size);
      setCurrentPage(1);
    },
    currentPage: validCurrentPage,
    setCurrentPage,
    totalPages,
    totalRecords,
    paginatedLogs,
    // Modals
    selectedDetailLog,
    isDetailOpen,
    handleOpenDetail,
    handleCloseDetail,
    selectedDiffLog,
    isDiffOpen,
    diffViewMode,
    setDiffViewMode,
    handleOpenDiff,
    handleCloseDiff,
    selectedRestoreLog,
    isRestoreOpen,
    restoreReason,
    setRestoreReason,
    confirmRisk,
    setConfirmRisk,
    isRestoring,
    handleOpenRestore,
    handleCloseRestore,
    handleConfirmRestore,
    handleExportReport,
    toast,
  };
}
