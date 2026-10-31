import { useState } from 'react';
import UphTaktTimeCard from './UphTaktTimeCard';
import UphExplanation from './UphExplanation';
import { DEFAULT_UPH_CONFIG } from '../../constants/formModalConstants';

/**
 * Tab 4: UPH Config (Cấu hình định mức sản lượng & nhịp chuyền Takt Time)
 * Quản lý các thông số:
 * - Target UPH (p/h)
 * - Target Cycle Time (sec, 3600 / UPH)
 * - Warning Tolerance (%)
 * - Enable UPH Monitoring (Pill Button Toggle)
 */
export default function MachineUphConfigTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Tổng hợp dữ liệu UPH từ formData hoặc fallback mặc định
  const currentUphConfig = {
    targetUph: formData.uphConfig?.targetUph ?? formData.targetUph ?? DEFAULT_UPH_CONFIG.targetUph,
    targetCycleTime: formData.uphConfig?.targetCycleTime ?? formData.targetCycleTime ?? DEFAULT_UPH_CONFIG.targetCycleTime,
    warningTolerance: formData.uphConfig?.warningTolerance ?? formData.warningTolerance ?? DEFAULT_UPH_CONFIG.warningTolerance,
    enableUphMonitoring: formData.uphConfig?.enableUphMonitoring ?? formData.enableUphMonitoring ?? DEFAULT_UPH_CONFIG.enableUphMonitoring
  };

  // Hiển thị toast thông báo phản hồi
  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  // Xử lý lưu cấu hình UPH
  const handleSaveUph = (newUphConfig) => {
    if (onChange) {
      // Lưu toàn bộ object uphConfig vào form state
      onChange('uphConfig', newUphConfig);

      // Đồng bộ trực tiếp vào các trường top-level tương ứng của máy
      onChange('targetUph', newUphConfig.targetUph);
      onChange('targetCycleTime', newUphConfig.targetCycleTime);
      onChange('warningTolerance', newUphConfig.warningTolerance);
      onChange('enableUphMonitoring', newUphConfig.enableUphMonitoring);
    }

    const monitoringStatus = newUphConfig.enableUphMonitoring ? 'BẬT' : 'TẮT';
    showToast(
      `Đã lưu cấu hình UPH & Takt Time: ${newUphConfig.targetUph} p/h (${newUphConfig.targetCycleTime}s/cái) - Giám sát: ${monitoringStatus}!`,
      'success'
    );
  };

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
      {/* Toast thông báo phản hồi thao tác */}
      {feedbackToast && (
        <div
          role="status"
          aria-live="polite"
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 shadow-lg transition-all animate-bounce ${
            feedbackToast.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-200'
              : isFoxconn
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-zinc-900 border-[#76B900] text-[#76B900]'
          }`}
        >
          <span className="flex items-center gap-2">
            <span>{feedbackToast.type === 'error' ? '⚠️' : '✓'}</span>
            <span>{feedbackToast.message}</span>
          </span>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Khung 1: UPH & TAKT TIME CONFIGURATION Card */}
      <UphTaktTimeCard
        uphConfig={currentUphConfig}
        onSave={handleSaveUph}
        isFoxconn={isFoxconn}
      />

      {/* Khung 2: Khung Giải Nghĩa & Cơ Chế Giám Sát UPH & Takt Time */}
      <UphExplanation
        isFoxconn={isFoxconn}
        targetUph={currentUphConfig.targetUph}
        targetCycleTime={currentUphConfig.targetCycleTime}
        warningTolerance={currentUphConfig.warningTolerance}
      />
    </div>
  );
}
