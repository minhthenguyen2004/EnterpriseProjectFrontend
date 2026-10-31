import MachineConfigTab from './tabs/machine_config/MachineConfigTab';
import MachineValidationKeysTab from './tabs/validation_keys/MachineValidationKeysTab';
import MachineRoutingConfigsTab from './tabs/routing_configs/MachineRoutingConfigsTab';
import MachineUphConfigTab from './tabs/uph_config/MachineUphConfigTab';
import TechnicalTabPlaceholder from './tabs/placeholders/TechnicalTabPlaceholder';

/**
 * Component điều phối hiển thị nội dung phân vùng 2/3 màn hình theo activeTab
 */
export default function MachineFormContentSwitcher({
  activeTab,
  machineName,
  formData = {},
  onChange,
  isFoxconn
}) {
  const isMachineConfigTab = activeTab === 'machine-config';
  const isValidationKeysTab = activeTab === 'validation-keys';
  const isRoutingConfigsTab = activeTab === 'routing-configs';
  const isUphConfigTab = activeTab === 'uph-config';

  return (
    <div className="flex-1 flex flex-col justify-between py-4 pr-1">
      {/* Vùng hiển thị nội dung Tab được chọn */}
      {isMachineConfigTab ? (
        <MachineConfigTab
          formData={formData}
          onChange={onChange}
          isFoxconn={isFoxconn}
        />
      ) : isValidationKeysTab ? (
        <MachineValidationKeysTab
          formData={formData}
          onChange={onChange}
          isFoxconn={isFoxconn}
        />
      ) : isRoutingConfigsTab ? (
        <MachineRoutingConfigsTab
          formData={formData}
          onChange={onChange}
          isFoxconn={isFoxconn}
        />
      ) : isUphConfigTab ? (
        <MachineUphConfigTab
          formData={formData}
          onChange={onChange}
          isFoxconn={isFoxconn}
        />
      ) : (
        <TechnicalTabPlaceholder
          activeTab={activeTab}
          isFoxconn={isFoxconn}
        />
      )}

      {/* Footer Info của Phân vùng 2/3 */}
      <div
        className={`flex items-center justify-between text-[11px] pt-2 border-t ${
          isFoxconn ? 'text-slate-500 border-slate-200' : 'text-zinc-400 border-zinc-800'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {isMachineConfigTab
            ? 'Machine Flags Configured'
            : isValidationKeysTab
            ? `Validation Keys: ${(formData.validationKeys || []).length} Keys Configured`
            : isRoutingConfigsTab
            ? `Routing Configs: ${(formData.routingConfigs || []).length} Twin Steps Configured`
            : isUphConfigTab
            ? `UPH Monitoring: ${formData.uphConfig?.enableUphMonitoring !== false ? 'Enabled' : 'Disabled'} | Target: ${formData.uphConfig?.targetUph ?? formData.targetUph ?? 120} p/h (${formData.uphConfig?.targetCycleTime ?? formData.targetCycleTime ?? 30}s)`
            : 'Layout 2/3 Workspace Ready'}
        </span>
        <span className="font-mono">Tab ID: {activeTab}</span>
      </div>
    </div>
  );
}
