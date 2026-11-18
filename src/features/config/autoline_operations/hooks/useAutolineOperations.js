import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  INITIAL_PRODUCT_OPERATION,
  MOCK_SEARCHABLE_ITEMS
} from '../mock/autolineOperationsMockData';

export default function useAutolineOperations() {
  const { t } = useTranslation('autoline');

  // 1. Chế độ quét & Từ khóa tìm kiếm Top Bar
  const [scanMode, setScanMode] = useState('manual'); // 'manual' | 'camera' | 'image'
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Dữ liệu sản phẩm & Lộ trình
  const [productData, setProductData] = useState(INITIAL_PRODUCT_OPERATION);
  const [selectedStepNumber, setSelectedStepNumber] = useState(6);

  // 3. Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isChangeCarrierModalOpen, setIsChangeCarrierModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // 4. Lịch sử hoàn tác (Undo stack)
  const [undoStack, setUndoStack] = useState([]);

  // 5. Toast Feedback
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Bước đang được chọn
  const selectedStep = useMemo(() => {
    return (
      productData.routingSteps.find((s) => s.stepNumber === selectedStepNumber) ||
      productData.routingSteps[0]
    );
  }, [productData, selectedStepNumber]);

  // Handler tìm kiếm SN, Carrier, Keypart
  const handleSearch = useCallback(
    (termToSearch) => {
      const query = (termToSearch !== undefined ? termToSearch : searchTerm).trim().toUpperCase();
      if (!query) {
        showToast(t('operations.toast.searchEmpty'), 'warning');
        return;
      }

      // Tra cứu trong danh sách mẫu
      const match = MOCK_SEARCHABLE_ITEMS.find(
        (item) =>
          item.serialNumber.toUpperCase().includes(query) ||
          item.carrierCode.toUpperCase().includes(query) ||
          item.keypart.toUpperCase().includes(query)
      );

      if (match) {
        setProductData((prev) => ({
          ...prev,
          serialNumber: match.serialNumber,
          carrierCode: match.carrierCode,
          productName: match.productName,
          productCategory: match.productCategory,
          lineName: match.lineName
        }));
        showToast(t('operations.toast.searchFound', { sn: match.serialNumber }), 'success');
      } else {
        // Giả lập tìm thấy theo mã nhập
        setProductData((prev) => ({
          ...prev,
          serialNumber: query.startsWith('SN-') ? query : `SN-${query}`,
          carrierCode: query.startsWith('CRR-') ? query : prev.carrierCode
        }));
        showToast(t('operations.toast.searchSimulated', { query }), 'info');
      }
    },
    [searchTerm, showToast, t]
  );

  // Handler chọn bước trong bảng lộ trình
  const handleSelectStep = useCallback((stepNumber) => {
    setSelectedStepNumber(stepNumber);
  }, []);

  // 6. Thao Tác Đặc Biệt: Undo
  const handleUndo = useCallback(() => {
    const currentCompleted = productData.completedSteps;
    if (currentCompleted <= 0) {
      showToast(t('operations.toast.undoNoSteps'), 'warning');
      return;
    }

    // Lưu snapshot trước khi Undo
    setUndoStack((prev) => [
      {
        previousCompleted: currentCompleted,
        timestamp: new Date().toLocaleTimeString(),
        stepNumber: currentCompleted
      },
      ...prev
    ]);

    // Lùi 1 bước
    setProductData((prev) => {
      const nextSteps = prev.routingSteps.map((step) => {
        if (step.stepNumber === currentCompleted) {
          return {
            ...step,
            status: 'PENDING',
            passTimestamp: null
          };
        }
        return step;
      });

      return {
        ...prev,
        completedSteps: currentCompleted - 1,
        routingSteps: nextSteps
      };
    });

    setSelectedStepNumber(Math.max(1, currentCompleted - 1));
    showToast(
      t('operations.toast.undoSuccess', {
        step: String(currentCompleted).padStart(2, '0')
      }),
      'success'
    );
  }, [productData.completedSteps, showToast, t]);

  // 7. Thao Tác Đặc Biệt: Đổi Carrier (Jig)
  const handleChangeCarrier = useCallback(
    (newCarrierCode) => {
      if (!newCarrierCode || !newCarrierCode.trim()) {
        showToast(t('operations.toast.changeCarrierInvalid'), 'error');
        return;
      }
      const cleanCode = newCarrierCode.trim().toUpperCase();
      setProductData((prev) => ({
        ...prev,
        carrierCode: cleanCode
      }));
      setIsChangeCarrierModalOpen(false);
      showToast(t('operations.toast.changeCarrierSuccess', { jig: cleanCode }), 'success');
    },
    [showToast, t]
  );

  // 8. Thao Tác Đặc Biệt: Xóa UNDO (Hủy vết hoàn tác / Redo)
  const handleClearUndo = useCallback(() => {
    if (undoStack.length === 0) {
      showToast(t('operations.toast.clearUndoEmpty'), 'info');
      return;
    }
    const count = undoStack.length;
    setUndoStack([]);
    showToast(t('operations.toast.clearUndoSuccess', { count }), 'success');
  }, [undoStack, showToast, t]);

  // 9. Thao Tác Đặc Biệt: Reset Carrier (Jig)
  const handleResetCarrier = useCallback(() => {
    setProductData((prev) => ({
      ...prev,
      carrierCode: 'CRR-DEFAULT (Jig Pallet A - Sẵn sàng)'
    }));
    showToast(t('operations.toast.resetCarrierSuccess'), 'success');
  }, [showToast, t]);

  return {
    // Top Bar
    scanMode,
    setScanMode,
    searchTerm,
    setSearchTerm,
    handleSearch,

    // Product & Routing Data
    productData,
    selectedStepNumber,
    selectedStep,
    handleSelectStep,

    // Modals
    isDetailModalOpen,
    setIsDetailModalOpen,
    isChangeCarrierModalOpen,
    setIsChangeCarrierModalOpen,
    isCameraModalOpen,
    setIsCameraModalOpen,
    isImageModalOpen,
    setIsImageModalOpen,

    // Special Operations
    undoStack,
    handleUndo,
    handleChangeCarrier,
    handleClearUndo,
    handleResetCarrier,

    // Toast
    toast
  };
}
