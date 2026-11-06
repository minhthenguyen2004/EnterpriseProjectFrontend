import { useState, useCallback, useMemo } from 'react';
import {
  MOCK_API_REQUEST_LOGS,
} from '../constants/apiRequestHistoryConstants';

/**
 * useApiRequestHistoryData
 * Custom Hook điều phối logic cho màn hình API Request History:
 * - Quản lý 6 trường lọc hàng ngang (Date & Time, Area, Controller, Action, Client IP, Select Top)
 * - Quản lý cờ hasQueried: Bảng dữ liệu CHỈ xuất hiện khi người dùng thực hiện Query Data
 * - Giả lập truy vấn dữ liệu bất đồng bộ với loading indicator
 * - Thống kê KPI nhanh: Tổng bản ghi, Thành công, Lỗi, Độ trễ trung bình
 * - Quản lý Modal xem toàn văn JSON Request Body / Response Body
 */
export default function useApiRequestHistoryData() {
  // Lấy thời điểm mặc định đầu ngày / ca làm việc
  const defaultDateTime = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T08:00`;
  }, []);

  // State bộ lọc 6 trường
  const [filters, setFilters] = useState({
    dateTime: defaultDateTime,
    area: 'ALL',
    controller: 'ALL',
    action: 'ALL',
    clientIp: 'ALL',
    topLimit: 100,
  });

  // Cờ kiểm soát hiển thị bảng: CHỈ HIỆN KHI ĐÃ BẤM QUERY DATA
  const [hasQueried, setHasQueried] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);

  // Danh sách bản ghi đã truy vấn
  const [logs, setLogs] = useState([]);

  // Toast thông báo
  const [toast, setToast] = useState(null);

  // State cho Modal JSON Viewer
  const [jsonModal, setJsonModal] = useState({
    isOpen: false,
    log: null,
    type: 'request', // 'request' | 'response'
  });

  // Cập nhật giá trị trường lọc
  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Đặt lại bộ lọc về mặc định
  const handleResetFilters = useCallback(() => {
    setFilters({
      dateTime: defaultDateTime,
      area: 'ALL',
      controller: 'ALL',
      action: 'ALL',
      clientIp: 'ALL',
      topLimit: 100,
    });
    setToast({
      type: 'info',
      message: 'Đã làm sạch bộ lọc về mặc định ban đầu.',
    });
    setTimeout(() => setToast(null), 2500);
  }, [defaultDateTime]);

  // Thực thi truy vấn dữ liệu (Query Data)
  const handleExecuteQuery = useCallback(() => {
    setIsQuerying(true);

    // Mô phỏng độ trễ mạng thực tế 350ms
    setTimeout(() => {
      let filtered = [...MOCK_API_REQUEST_LOGS];

      // Lọc theo Khu vực (Area)
      if (filters.area && filters.area !== 'ALL') {
        filtered = filtered.filter((item) => item.area === filters.area);
      }

      // Lọc theo Controller
      if (filters.controller && filters.controller !== 'ALL') {
        filtered = filtered.filter((item) => item.controller === filters.controller);
      }

      // Lọc theo Action
      if (filters.action && filters.action !== 'ALL') {
        filtered = filtered.filter((item) => item.action === filters.action);
      }

      // Lọc theo Client IP
      if (filters.clientIp && filters.clientIp !== 'ALL') {
        filtered = filtered.filter((item) => item.clientIp === filters.clientIp);
      }

      // Giới hạn số bản ghi Top Limit
      const limitedLogs = filtered.slice(0, Number(filters.topLimit) || 100);

      setLogs(limitedLogs);
      setHasQueried(true); // Kích hoạt hiển thị bảng
      setIsQuerying(false);

      setToast({
        type: 'success',
        message: `Truy vấn thành công! Tìm thấy ${limitedLogs.length} bản ghi nhật ký yêu cầu API.`,
      });
      setTimeout(() => setToast(null), 3000);
    }, 350);
  }, [filters]);

  // Thống kê nhanh dữ liệu đã query
  const statsSummary = useMemo(() => {
    if (!logs.length) {
      return { total: 0, successCount: 0, errorCount: 0, avgLatency: 0 };
    }
    const total = logs.length;
    const successCount = logs.filter((item) => item.statusCode >= 200 && item.statusCode < 300).length;
    const errorCount = total - successCount;
    const totalLatency = logs.reduce((acc, curr) => acc + (curr.processingTimeMs || 0), 0);
    const avgLatency = Math.round(totalLatency / total);

    return { total, successCount, errorCount, avgLatency };
  }, [logs]);

  // Mở Modal xem chi tiết JSON
  const handleOpenJsonModal = useCallback((log, type = 'request') => {
    setJsonModal({
      isOpen: true,
      log,
      type,
    });
  }, []);

  // Đóng Modal JSON
  const handleCloseJsonModal = useCallback(() => {
    setJsonModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  // Xuất file CSV
  const handleExportCsv = useCallback(() => {
    if (!logs.length) {
      setToast({
        type: 'error',
        message: 'Không có dữ liệu nhật ký nào để xuất báo cáo.',
      });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    const headers = [
      'Client IP',
      'Method',
      'Url',
      'Status Code',
      'Request Time',
      'Processing Time (ms)',
      'Area',
      'Controller',
      'Action',
    ];

    const rows = logs.map((item) => [
      item.clientIp,
      item.method,
      `"${item.url}"`,
      item.statusCode,
      item.requestTime,
      item.processingTimeMs,
      item.area,
      item.controller,
      item.action,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `api_request_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({
      type: 'success',
      message: 'Đã xuất file báo cáo nhật ký API thành công.',
    });
    setTimeout(() => setToast(null), 2500);
  }, [logs]);

  return {
    filters,
    handleFilterChange,
    handleResetFilters,
    hasQueried,
    isQuerying,
    handleExecuteQuery,
    logs,
    statsSummary,
    toast,
    jsonModal,
    handleOpenJsonModal,
    handleCloseJsonModal,
    handleExportCsv,
  };
}
