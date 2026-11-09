import { useState, useCallback, useMemo } from 'react';
import {
  INITIAL_LOCKED_CARRIERS,
  INITIAL_UNLOCK_HISTORY
} from '../mock/unlockCarrierMockData';

export default function useUnlockCarrier() {
  // 1. Thông tin chung (Cột 1)
  const [generalInfo, setGeneralInfo] = useState({
    employeeId: 'V1029384',
    inspectionType: 'shift_start', // 'shift_start' | 'periodic' | 'manual'
    resetCycleCount: true,
    result: 'PASS', // 'PASS' | 'FAIL'
    note: ''
  });

  // Handler cập nhật từng trường thông tin chung
  const updateGeneralInfo = useCallback((field, value) => {
    setGeneralInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handler toggle nút switch reset chu kỳ
  const toggleResetCycleCount = useCallback(() => {
    setGeneralInfo((prev) => ({
      ...prev,
      resetCycleCount: !prev.resetCycleCount
    }));
  }, []);

  // Handler chọn nhanh tag ghi chú
  const handleQuickTagSelect = useCallback((tag) => {
    setGeneralInfo((prev) => ({
      ...prev,
      note: prev.note ? `${prev.note}. ${tag}` : tag
    }));
  }, []);

  // 2. Danh sách khay mẫu & Lịch sử mở khóa
  const [carriersList, setCarriersList] = useState(INITIAL_LOCKED_CARRIERS);
  const [historyList, setHistoryList] = useState(INITIAL_UNLOCK_HISTORY);

  // 3. Quản lý Tabs (Cột 3: 'single' | 'line' | 'batch')
  const [activeTab, setActiveTab] = useState('single');

  // 4. Tab 1: Quét một khay
  const [singleCarrierCode, setSingleCarrierCode] = useState('');
  const [scannedCarrier, setScannedCarrier] = useState(null);
  const [scanError, setScanError] = useState(null);

  // Tìm kiếm thông tin khay theo mã
  const handleScanCarrier = useCallback(
    (codeToScan) => {
      const code = (codeToScan || singleCarrierCode).trim().toUpperCase();
      if (!code) {
        setScanError('Vui lòng nhập hoặc quét mã khay!');
        setScannedCarrier(null);
        return null;
      }

      setScanError(null);
      const found = carriersList.find(
        (c) =>
          c.carrierCode.toUpperCase() === code ||
          c.rfidTag.toUpperCase().includes(code)
      );

      if (found) {
        setScannedCarrier(found);
        setSingleCarrierCode(found.carrierCode);
        return found;
      } else {
        // Tạo khay giả lập nếu không tìm thấy trong danh sách mẫu
        const simulated = {
          id: `CRR-CUSTOM-${Date.now().toString().slice(-4)}`,
          carrierCode: code,
          rfidTag: `E280-1160-CUSTOM-${Date.now().toString().slice(-4)}`,
          lineName: 'Line01',
          stationName: 'QC-ST01',
          productName: 'GB200 NVL72',
          carrierType: 'Standard Tray',
          carrierTypeCategory: 'GPU_TRAY',
          currentCycles: 1980,
          maxCycles: 2000,
          usagePercentage: 99.0,
          status: 'LOCKED',
          severity: 'urgent',
          lockReason: 'Khay bị khóa bởi trạm kiểm tra chất lượng.',
          coplanarityDeviation: 0.09
        };
        setScannedCarrier(simulated);
        setSingleCarrierCode(code);
        return simulated;
      }
    },
    [carriersList, singleCarrierCode]
  );

  // Xóa mã khay đang chọn
  const handleClearSingleCarrier = useCallback(() => {
    setSingleCarrierCode('');
    setScannedCarrier(null);
    setScanError(null);
  }, []);

  // 5. Tab 2: Toàn line (Cảnh báo + 3 Dropdown: Tên SP, Loại SP, Tên Line)
  const [selectedProductName, setSelectedProductName] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [selectedLine, setSelectedLine] = useState('all');

  const productNameOptions = useMemo(() => {
    const set = new Set(carriersList.map((c) => c.productName).filter(Boolean));
    return Array.from(set);
  }, [carriersList]);

  const productTypeOptions = useMemo(() => {
    const set = new Set(carriersList.map((c) => c.carrierType).filter(Boolean));
    return Array.from(set);
  }, [carriersList]);

  const lineNameOptions = useMemo(() => {
    const set = new Set(carriersList.map((c) => c.lineName).filter(Boolean));
    return Array.from(set);
  }, [carriersList]);

  const lineCarriers = useMemo(() => {
    return carriersList.filter((c) => {
      if (c.status !== 'LOCKED') return false;
      if (selectedProductName !== 'all' && c.productName !== selectedProductName) return false;
      if (selectedProductType !== 'all' && c.carrierType !== selectedProductType) return false;
      if (selectedLine !== 'all' && c.lineName !== selectedLine) return false;
      return true;
    });
  }, [carriersList, selectedProductName, selectedProductType, selectedLine]);

  const [selectedLineCarrierCodes, setSelectedLineCarrierCodes] = useState([]);

  // Tự động đồng bộ các mã khay được chọn khi bộ lọc thay đổi
  const handleToggleLineCarrier = useCallback((code) => {
    setSelectedLineCarrierCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }, []);

  // Chọn tất cả khay khớp điều kiện trên line
  const handleToggleSelectAllLineCarriers = useCallback(() => {
    if (selectedLineCarrierCodes.length === lineCarriers.length) {
      setSelectedLineCarrierCodes([]);
    } else {
      setSelectedLineCarrierCodes(lineCarriers.map((c) => c.carrierCode));
    }
  }, [lineCarriers, selectedLineCarrierCodes]);

  // 6. Tab 3: Nhiều khay (Batch)
  const [batchInput, setBatchInput] = useState('');
  const [batchQueue, setBatchQueue] = useState([]);

  const handleAddBatchCarriers = useCallback(() => {
    const raw = batchInput.trim();
    if (!raw) return;

    let codes = [];

    // Thử bóc tách theo định dạng JSON nếu đầu vào bắt đầu bằng [ hoặc {
    if (raw.startsWith('[') || raw.startsWith('{')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (typeof item === 'string') {
              codes.push(item);
            } else if (item && typeof item === 'object') {
              const val = item.carrierCode || item.carrier_code || item.code || item.id;
              if (val) codes.push(String(val));
            }
          });
        } else if (parsed && typeof parsed === 'object') {
          const list = parsed.carriers || parsed.carrierCodes || parsed.codes || Object.keys(parsed);
          if (Array.isArray(list)) {
            list.forEach((item) => {
              if (typeof item === 'string') codes.push(item);
              else if (item && typeof item === 'object') {
                const val = item.carrierCode || item.code || item.id;
                if (val) codes.push(String(val));
              }
            });
          }
        }
      } catch (err) {
        console.warn('JSON parse error, falling back to comma/newline split:', err);
      }
    }

    // Nếu không phải JSON hoặc JSON không ra mã, phân tách bằng dấu phẩy và xuống dòng
    if (codes.length === 0) {
      codes = raw
        .split(/[\n\r,;]+/)
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
    }

    // Chuẩn hóa chữ in hoa
    codes = codes.map((c) => c.trim().toUpperCase()).filter((c) => c.length > 0);

    const newItems = codes.map((code) => {
      const match = carriersList.find((c) => c.carrierCode.toUpperCase() === code);
      return {
        carrierCode: code,
        lineName: match ? match.lineName : 'Line01',
        currentCycles: match ? match.currentCycles : 2000,
        status: match ? match.status : 'LOCKED'
      };
    });

    setBatchQueue((prev) => {
      const existing = new Set(prev.map((i) => i.carrierCode));
      const filtered = newItems.filter((i) => !existing.has(i.carrierCode));
      return [...prev, ...filtered];
    });

    setBatchInput('');
  }, [batchInput, carriersList]);

  const handleRemoveBatchItem = useCallback((carrierCode) => {
    setBatchQueue((prev) => prev.filter((item) => item.carrierCode !== carrierCode));
  }, []);

  // 7. Modal Camera Barcode Scanner
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // 8. Toast Feedback
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // 9. Nút Xác Nhận Dài Dưới Cùng (Submit lưu thông tin cả hai bên)
  const handleConfirmUnlock = useCallback(() => {
    // Validation
    if (!generalInfo.employeeId.trim()) {
      showToast('Vui lòng nhập Mã nhân viên kiểm định trước khi xác nhận!', 'error');
      return false;
    }

    let targetCodes = [];

    if (activeTab === 'single') {
      const target = scannedCarrier || handleScanCarrier(singleCarrierCode);
      if (!target || !target.carrierCode) {
        showToast('Vui lòng quét hoặc nhập mã khay hợp lệ!', 'error');
        return false;
      }
      targetCodes = [target.carrierCode];
    } else if (activeTab === 'line') {
      if (selectedLineCarrierCodes.length === 0) {
        showToast(`Chưa có khay nào được chọn trên ${selectedLine}!`, 'error');
        return false;
      }
      targetCodes = selectedLineCarrierCodes;
    } else if (activeTab === 'batch') {
      if (batchQueue.length === 0) {
        showToast('Hàng đợi mở khóa nhiều khay đang trống!', 'error');
        return false;
      }
      targetCodes = batchQueue.map((item) => item.carrierCode);
    }

    // Tạo bản ghi nhật ký
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const newRecords = targetCodes.map((code, idx) => {
      const matched = carriersList.find((c) => c.carrierCode === code);
      return {
        id: `UNL-${Date.now().toString().slice(-6)}-${idx + 1}`,
        timestamp: nowStr,
        employeeId: generalInfo.employeeId,
        carrierCode: code,
        lineName: matched ? matched.lineName : selectedLine || 'Line01',
        inspectionType: generalInfo.inspectionType,
        resetCycleCount: generalInfo.resetCycleCount,
        previousCycles: matched ? matched.currentCycles : 2000,
        result: generalInfo.result,
        note: generalInfo.note || 'Nghiệm thu kiểm định và cập nhật trạng thái.',
        statusAfter: generalInfo.result === 'PASS' ? 'ACTIVE' : 'LOCKED'
      };
    });

    // Cập nhật danh sách khay
    setCarriersList((prev) =>
      prev.map((c) => {
        if (targetCodes.includes(c.carrierCode)) {
          return {
            ...c,
            status: generalInfo.result === 'PASS' ? 'ACTIVE' : 'LOCKED',
            currentCycles:
              generalInfo.resetCycleCount && generalInfo.result === 'PASS'
                ? 0
                : c.currentCycles,
            usagePercentage:
              generalInfo.resetCycleCount && generalInfo.result === 'PASS'
                ? 0
                : c.usagePercentage,
            lastInspector: generalInfo.employeeId,
            lastInspectionDate: nowStr
          };
        }
        return c;
      })
    );

    // Cập nhật nhật ký
    setHistoryList((prev) => [...newRecords, ...prev]);

    // Toast thành công
    const countStr =
      targetCodes.length === 1
        ? `khay ${targetCodes[0]}`
        : `${targetCodes.length} khay`;
    showToast(
      generalInfo.result === 'PASS'
        ? `Đã mở khóa và nghiệm thu thành công cho ${countStr}!`
        : `Đã ghi nhận kết quả LỖI và duy trì khóa cho ${countStr}!`,
      generalInfo.result === 'PASS' ? 'success' : 'warning'
    );

    // Dọn dẹp form sau khi lưu
    if (activeTab === 'single') {
      setSingleCarrierCode('');
      setScannedCarrier(null);
    } else if (activeTab === 'line') {
      setSelectedLineCarrierCodes([]);
    } else if (activeTab === 'batch') {
      setBatchQueue([]);
    }

    return true;
  }, [
    activeTab,
    batchQueue,
    carriersList,
    generalInfo,
    handleScanCarrier,
    scannedCarrier,
    selectedLine,
    selectedLineCarrierCodes,
    showToast,
    singleCarrierCode
  ]);

  return {
    // Form thông tin chung
    generalInfo,
    updateGeneralInfo,
    toggleResetCycleCount,
    handleQuickTagSelect,

    // Dữ liệu & Lịch sử
    carriersList,
    historyList,

    // Tabs
    activeTab,
    setActiveTab,

    // Tab 1: Single
    singleCarrierCode,
    setSingleCarrierCode,
    scannedCarrier,
    scanError,
    handleScanCarrier,
    handleClearSingleCarrier,

    // Tab 2: Line
    selectedProductName,
    setSelectedProductName,
    selectedProductType,
    setSelectedProductType,
    selectedLine,
    setSelectedLine,
    productNameOptions,
    productTypeOptions,
    lineNameOptions,
    lineCarriers,
    selectedLineCarrierCodes,
    handleToggleLineCarrier,
    handleToggleSelectAllLineCarriers,

    // Tab 3: Batch
    batchInput,
    setBatchInput,
    batchQueue,
    handleAddBatchCarriers,
    handleRemoveBatchItem,

    // Camera modal
    isCameraModalOpen,
    setIsCameraModalOpen,

    // Action chính
    handleConfirmUnlock,

    // Toast
    toast
  };
}

