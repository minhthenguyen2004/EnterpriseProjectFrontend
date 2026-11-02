import CarrierTypeLimitTable from './CarrierTypeLimitTable';
import CarrierAutoLockPolicy from './CarrierAutoLockPolicy';
import CarrierLifecycleConfigTable from './CarrierLifecycleConfigTable';
import useTheme from '../../../../../../hooks/useTheme';

/**
 * Container Nội Dung Tab 2: Cấu Hình Vòng Đời (Lifecycle Configuration)
 * Theo đặc tả MD:
 * - Section 1: Bảng Lifecycle Configs (CarrierLifecycleConfigTable) — mới thêm
 * - Section 2: Bảng Định Mức Vòng Đời Theo Loại Khay (CarrierTypeLimitTable)
 * - Section 3: Chính Sách Khóa Tự Động (CarrierAutoLockPolicy)
 * - Footer: Nút Lưu Toàn Bộ Cấu Hình
 */
export default function CarrierLifecycleTab({
  carrierTypeLimits,
  onUpdateCarrierTypeLimits,
  autoLockPolicy,
  onUpdateAutoLockPolicy,
  lifecycleConfigs,
  onAddLifecycleConfig,
  onUpdateLifecycleConfig,
  onDeleteLifecycleConfig,
  onRefreshLifecycleConfigs,
  onNotify,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleSaveAll = () => {
    if (onNotify) {
      onNotify('Đã lưu toàn bộ cấu hình vòng đời và chính sách an toàn AutoLine thành công!');
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Bảng Cấu Hình Vòng Đời (Lifecycle Configs) — theo đặc tả MD section 3.3 */}
      <CarrierLifecycleConfigTable
        configs={lifecycleConfigs}
        onAdd={onAddLifecycleConfig}
        onUpdate={onUpdateLifecycleConfig}
        onDelete={onDeleteLifecycleConfig}
        onRefresh={onRefreshLifecycleConfigs}
        onNotify={onNotify}
      />

      {/* 2. Bảng Định Mức Vòng Đời Theo Loại Khay */}
      <CarrierTypeLimitTable
        limits={carrierTypeLimits}
        onUpdateLimits={onUpdateCarrierTypeLimits}
        onNotify={onNotify}
      />

      {/* 3. Chính Sách Khóa Tự Động & Dung Sai */}
      <CarrierAutoLockPolicy
        policy={autoLockPolicy}
        onUpdatePolicy={onUpdateAutoLockPolicy}
        onNotify={onNotify}
      />

      {/* Thanh lưu cấu hình */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleSaveAll}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Lưu Toàn Bộ Cấu Hình Vòng Đời</span>
        </button>
      </div>
    </div>
  );
}
