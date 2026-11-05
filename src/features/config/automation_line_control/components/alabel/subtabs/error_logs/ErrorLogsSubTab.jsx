import { useState } from 'react';
import useTheme from '../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  PRODUCT_TYPES,
  PRODUCTION_LINES,
  ERROR_SOURCES,
  PROCESS_STAGES,
  STATIONS_LIST,
} from '../../../../constants/alabelConstants';
import SnCarrierTextInput from './SnCarrierTextInput';
import ErrorFilterDropdowns from './ErrorFilterDropdowns';
import ImplementingButton from './ImplementingButton';
import ErrorLogsTable from './ErrorLogsTable';

/**
 * Sub-Tab 7: Error Logs (Tra Cứu Bảng Lịch Sử Lỗi ErrorLogs)
 *
 * @param {Object} props
 * @param {Object} [props.form] - Form state chứa targetType, targetCode, model, productType, line, errorSource, stage, station, topLimit
 * @param {Function} [props.setForm] - Setter cập nhật form state
 * @param {Array<Object>} props.errorLogsList - Danh sách bản ghi lỗi
 * @param {boolean} props.isExecuting - Trạng thái loading truy vấn
 * @param {Function} [props.onExecute] - Handler thực thi tra cứu ('error_logs')
 * @param {Function} [props.onRefresh] - Handler làm mới dữ liệu
 */
export default function ErrorLogsSubTab({
  form,
  setForm,
  errorLogsList = [],
  isExecuting,
  onExecute,
  onRefresh,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // State dự phòng nếu form chưa được truyền từ cấp trên
  const [localForm, setLocalForm] = useState({
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

  const activeForm = form || localForm;
  const updateForm = setForm || setLocalForm;

  const currentTargetType = activeForm.targetType || 'sn';
  const currentTargetCode = activeForm.targetCode || activeForm.sn || '';
  const currentModel = activeForm.model || '';
  const currentProductType = activeForm.productType || '';
  const currentLine = activeForm.line || '';
  const currentErrorSource = activeForm.errorSource || '';
  const currentStage = activeForm.stage || '';
  const currentStation = activeForm.station || '';
  const currentTopLimit = activeForm.topLimit || 100;

  // Handlers
  const handleTargetTypeChange = (type) => {
    updateForm((prev) => ({ ...prev, targetType: type }));
  };

  const handleTargetCodeChange = (value) => {
    updateForm((prev) => ({ ...prev, targetCode: value, sn: value }));
  };

  const handleModelChange = (model) => {
    updateForm((prev) => ({ ...prev, model }));
  };

  const handleProductTypeChange = (productType) => {
    updateForm((prev) => ({ ...prev, productType }));
  };

  const handleLineChange = (line) => {
    updateForm((prev) => ({ ...prev, line }));
  };

  const handleErrorSourceChange = (errorSource) => {
    updateForm((prev) => ({ ...prev, errorSource }));
  };

  const handleStageChange = (stage) => {
    updateForm((prev) => ({ ...prev, stage }));
  };

  const handleStationChange = (station) => {
    updateForm((prev) => ({ ...prev, station }));
  };

  const handleTopLimitChange = (topLimit) => {
    updateForm((prev) => ({ ...prev, topLimit }));
  };

  // Reset toàn bộ bộ lọc
  const handleReset = () => {
    updateForm({
      targetType: 'sn',
      targetCode: '',
      sn: '',
      model: '',
      productType: '',
      line: '',
      errorSource: '',
      stage: '',
      station: '',
      topLimit: 100,
    });
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute('error_logs');
    } else if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="space-y-4">

      {/* Dòng 1: Ô text nhập mã đối tượng có thể chuyển đổi qua lại giữa SN và Carrier */}
      <SnCarrierTextInput
        isFoxconn={isFoxconn}
        currentTargetType={currentTargetType}
        handleTargetTypeChange={handleTargetTypeChange}
        currentTargetCode={currentTargetCode}
        handleTargetCodeChange={handleTargetCodeChange}
      />

      {/* Dòng 2: Hệ thống Dropdown menu cho dòng SP, loại SP, tên chuyền, nguồn lỗi, giai đoạn, trạm, giới hạn bản ghi */}
      <ErrorFilterDropdowns
        isFoxconn={isFoxconn}
        model={currentModel}
        onModelChange={handleModelChange}
        DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        productType={currentProductType}
        onProductTypeChange={handleProductTypeChange}
        PRODUCT_TYPES={PRODUCT_TYPES}
        line={currentLine}
        onLineChange={handleLineChange}
        PRODUCTION_LINES={PRODUCTION_LINES}
        errorSource={currentErrorSource}
        onErrorSourceChange={handleErrorSourceChange}
        ERROR_SOURCES={ERROR_SOURCES}
        stage={currentStage}
        onStageChange={handleStageChange}
        PROCESS_STAGES={PROCESS_STAGES}
        station={currentStation}
        onStationChange={handleStationChange}
        STATIONS_LIST={STATIONS_LIST}
        topLimit={currentTopLimit}
        onTopLimitChange={handleTopLimitChange}
      />

      {/* Dòng 3: Nút Thực thi tra cứu bảng ErrorLogs */}
      <ImplementingButton
        isFoxconn={isFoxconn}
        isExecuting={isExecuting}
        onExecute={handleExecute}
        onReset={handleReset}
      />

      {/* Dòng 4: Bảng danh sách hiển thị lỗi */}
      <ErrorLogsTable
        isFoxconn={isFoxconn}
        errorLogsList={errorLogsList}
        isExecuting={isExecuting}
      />
    </div>
  );
}
