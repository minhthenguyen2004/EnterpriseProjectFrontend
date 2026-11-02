import { useState, useMemo, useCallback } from 'react';
import {
  MOCK_CARRIERS,
  DEFAULT_CARRIER_TYPE_LIMITS,
  DEFAULT_AUTOLOCK_POLICY,
  DEFAULT_LIFECYCLE_CONFIGS,
} from '../mock/carrierMockData';

export default function useCarrierData() {
  // Dữ liệu danh sách Carrier
  const [carriers, setCarriers] = useState(MOCK_CARRIERS);
  const [carrierTypeLimits, setCarrierTypeLimits] = useState(DEFAULT_CARRIER_TYPE_LIMITS);
  const [autoLockPolicy, setAutoLockPolicy] = useState(DEFAULT_AUTOLOCK_POLICY);
  const [lifecycleConfigs, setLifecycleConfigs] = useState(DEFAULT_LIFECYCLE_CONFIGS);

  // Bộ lọc
  const [searchCarrierCode, setSearchCarrierCode] = useState('');
  const [searchLineName, setSearchLineName] = useState('');
  const [searchProductName, setSearchProductName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'WARNING' | 'INSPECTION_REQUIRED' | 'LOCKED'

  // Phân trang
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Trạng thái refresh & thời gian
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Thống kê KPI tổng quan (toàn bộ hệ thống)
  const kpiStats = useMemo(() => {
    const total = carriers.length;
    let normal = 0;
    let warning = 0;
    let inspection = 0;
    let locked = 0;

    carriers.forEach((c) => {
      if (c.status === 'ACTIVE') normal += 1;
      else if (c.status === 'WARNING') warning += 1;
      else if (c.status === 'INSPECTION_REQUIRED') inspection += 1;
      else if (c.status === 'LOCKED') locked += 1;
    });

    return {
      total,
      normal,
      warning,
      inspection,
      locked,
    };
  }, [carriers]);

  // Lọc dữ liệu kết hợp
  const filteredCarriers = useMemo(() => {
    return carriers.filter((carrier) => {
      // 1. Lọc theo mã khay (hoặc RFID)
      if (searchCarrierCode.trim()) {
        const query = searchCarrierCode.trim().toLowerCase();
        const codeMatch = carrier.carrierCode?.toLowerCase().includes(query);
        const rfidMatch = carrier.rfidTag?.toLowerCase().includes(query);
        if (!codeMatch && !rfidMatch) return false;
      }

      // 2. Lọc theo tên chuyền (hoặc trạm máy)
      if (searchLineName.trim()) {
        const query = searchLineName.trim().toLowerCase();
        const lineMatch = carrier.lineName?.toLowerCase().includes(query);
        const stationMatch = carrier.stationName?.toLowerCase().includes(query);
        if (!lineMatch && !stationMatch) return false;
      }

      // 3. Lọc theo tên sản phẩm
      if (searchProductName.trim()) {
        const query = searchProductName.trim().toLowerCase();
        const productMatch = carrier.productName?.toLowerCase().includes(query);
        if (!productMatch) return false;
      }

      // 4. Lọc theo trạng thái
      if (selectedStatus !== 'ALL' && carrier.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [carriers, searchCarrierCode, searchLineName, searchProductName, selectedStatus]);

  // Phân trang danh sách đã lọc
  const totalFiltered = filteredCarriers.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  // Tự động căn chỉnh trang khi kết quả lọc thay đổi
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedCarriers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredCarriers.slice(startIndex, startIndex + pageSize);
  }, [filteredCarriers, safeCurrentPage, pageSize]);

  // Hàm làm mới dữ liệu thời gian thực
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Cập nhật lại thời gian trôi qua nhẹ để mô phỏng dữ liệu telemetry sống động
      setCarriers((prev) =>
        prev.map((item) => {
          if (item.status === 'ACTIVE' && item.currentCycles < item.maxCycles) {
            const addedCycles = Math.floor(Math.random() * 3);
            const newCycles = Math.min(item.maxCycles, item.currentCycles + addedCycles);
            const usage = Number(((newCycles / item.maxCycles) * 100).toFixed(1));
            return {
              ...item,
              currentCycles: newCycles,
              usagePercentage: usage,
              status: usage >= 100 ? 'LOCKED' : usage >= 95 ? 'INSPECTION_REQUIRED' : usage >= 80 ? 'WARNING' : 'ACTIVE',
              severity: usage >= 100 ? 'critical' : usage >= 95 ? 'urgent' : usage >= 80 ? 'warning' : 'normal',
            };
          }
          return item;
        })
      );
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 400);
  }, []);

  // Đặt lại toàn bộ bộ lọc về mặc định
  const resetFilters = useCallback(() => {
    setSearchCarrierCode('');
    setSearchLineName('');
    setSearchProductName('');
    setSelectedStatus('ALL');
    setCurrentPage(1);
  }, []);

  // Thao tác Khóa khay
  const lockCarrier = useCallback((carrierId, reason = 'Khóa thủ công bởi Kỹ sư vận hành AutoLine.') => {
    setCarriers((prev) =>
      prev.map((c) =>
        c.id === carrierId
          ? {
              ...c,
              status: 'LOCKED',
              severity: 'critical',
              lockReason: reason,
            }
          : c
      )
    );
  }, []);

  // Thao tác Mở khóa khay
  const unlockCarrier = useCallback((carrierId) => {
    setCarriers((prev) =>
      prev.map((c) => {
        if (c.id === carrierId) {
          const usage = Number(((c.currentCycles / c.maxCycles) * 100).toFixed(1));
          const newStatus = usage >= 95 ? 'INSPECTION_REQUIRED' : usage >= 80 ? 'WARNING' : 'ACTIVE';
          const newSeverity = usage >= 95 ? 'urgent' : usage >= 80 ? 'warning' : 'normal';
          return {
            ...c,
            status: newStatus,
            severity: newSeverity,
            lockReason: null,
          };
        }
        return c;
      })
    );
  }, []);

  // Thao tác Kiểm định khay & Reset chu kỳ
  const inspectCarrier = useCallback((carrierId, inspectionData) => {
    setCarriers((prev) =>
      prev.map((c) => {
        if (c.id === carrierId) {
          const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
          const shouldReset = Boolean(inspectionData.resetCycles);
          const newCycles = shouldReset ? 0 : c.currentCycles;
          const usage = Number(((newCycles / c.maxCycles) * 100).toFixed(1));
          return {
            ...c,
            hoursSinceLastInspection: 0,
            lastInspectionDate: nowStr,
            lastInspector: inspectionData.inspector || 'QC-Inspector',
            coplanarityDeviation: inspectionData.coplanarity || 0.02,
            currentCycles: newCycles,
            usagePercentage: usage,
            status: usage >= 100 ? 'LOCKED' : usage >= 95 ? 'INSPECTION_REQUIRED' : usage >= 80 ? 'WARNING' : 'ACTIVE',
            severity: usage >= 100 ? 'critical' : usage >= 95 ? 'urgent' : usage >= 80 ? 'warning' : 'normal',
            lockReason: null,
          };
        }
        return c;
      })
    );
  }, []);

  // Cập nhật cấu hình loại khay
  const updateCarrierTypeLimits = useCallback((newLimits) => {
    setCarrierTypeLimits(newLimits);
  }, []);

  // Cập nhật chính sách tự động khóa
  const updateAutoLockPolicy = useCallback((newPolicy) => {
    setAutoLockPolicy(newPolicy);
  }, []);

  // ---- Lifecycle Configs CRUD ----
  const addLifecycleConfig = useCallback((newConfig) => {
    const id = `LC-${String(Date.now()).slice(-5)}`;
    setLifecycleConfigs((prev) => [...prev, { ...newConfig, id }]);
  }, []);

  const updateLifecycleConfig = useCallback((id, updated) => {
    setLifecycleConfigs((prev) =>
      prev.map((cfg) => (cfg.id === id ? { ...cfg, ...updated } : cfg))
    );
  }, []);

  const deleteLifecycleConfig = useCallback((id) => {
    setLifecycleConfigs((prev) => prev.filter((cfg) => cfg.id !== id));
  }, []);

  const toggleLifecycleConfigActive = useCallback((id) => {
    setLifecycleConfigs((prev) =>
      prev.map((cfg) => (cfg.id === id ? { ...cfg, isActive: !cfg.isActive } : cfg))
    );
  }, []);

  const refreshLifecycleConfigs = useCallback(() => {
    setLifecycleConfigs([...DEFAULT_LIFECYCLE_CONFIGS]);
  }, []);

  return {
    // Dữ liệu
    carriers,
    filteredCarriers,
    paginatedCarriers,
    carrierTypeLimits,
    autoLockPolicy,
    kpiStats,

    // Bộ lọc
    searchCarrierCode,
    setSearchCarrierCode,
    searchLineName,
    setSearchLineName,
    searchProductName,
    setSearchProductName,
    selectedStatus,
    setSelectedStatus,
    resetFilters,

    // Phân trang
    pageSize,
    setPageSize: (size) => {
      setPageSize(size);
      setCurrentPage(1);
    },
    currentPage: safeCurrentPage,
    setCurrentPage,
    totalPages,
    totalFiltered,

    // Làm mới
    isRefreshing,
    lastUpdated,
    refreshData,

    // Thao tác
    lockCarrier,
    unlockCarrier,
    inspectCarrier,
    updateCarrierTypeLimits,
    updateAutoLockPolicy,

    // Lifecycle Configs CRUD
    lifecycleConfigs,
    addLifecycleConfig,
    updateLifecycleConfig,
    deleteLifecycleConfig,
    toggleLifecycleConfigActive,
    refreshLifecycleConfigs,
  };
}
