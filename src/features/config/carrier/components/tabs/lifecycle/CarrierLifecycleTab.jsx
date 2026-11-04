import CarrierLifecycleConfigTable from './CarrierLifecycleConfig';
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
  lifecycleConfigs,
  onAddLifecycleConfig,
  onUpdateLifecycleConfig,
  onDeleteLifecycleConfig,
  onRefreshLifecycleConfigs,
  onNotify,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

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

    </div>
  );
}
