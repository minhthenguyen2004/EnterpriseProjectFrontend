import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import MachineFormLeftInputs from './form/left_panel/MachineFormLeftInputs';
import MachineFormTopTabs from './form/navigation/MachineFormTopTabs';
import MachineFormContentSwitcher from './form/MachineFormContentSwitcher';

export default function MachineConfigFormModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  title, // Cho phép tùy biến tiêu đề modal qua props
  submitButtonText, // Cho phép tùy biến nhãn nút submit qua props
  initialData,
  onClose,
  onSubmit
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const isEdit = mode === 'edit';

  // Default validation keys mẫu chuẩn công nghiệp
  const DEFAULT_MACHINE_VALIDATION_KEYS = [
    {
      id: 1,
      step: 'ST01',
      keyName: 'BARCODE_MAIN',
      displayName: 'Mã vạch Mainboard',
      valueType: 'string',
      isRequired: true,
      isBypass: false,
      isVerify: true,
      isSfcKeyPart: true,
      isActive: true
    },
    {
      id: 2,
      step: 'ST01',
      keyName: 'MAC_ADDRESS',
      displayName: 'Địa chỉ MAC Card Mạng',
      valueType: 'string',
      isRequired: true,
      isBypass: false,
      isVerify: false,
      isSfcKeyPart: true,
      isActive: true
    },
    {
      id: 3,
      step: 'ST01',
      keyName: 'TORQUE_SCREW_01',
      displayName: 'Lực siết ốc vị trí #1',
      valueType: 'double',
      isRequired: false,
      isBypass: true,
      isVerify: false,
      isSfcKeyPart: false,
      isActive: true
    }
  ];

  // 12 trường form chuẩn theo plan
  const defaultState = {
    customer: 'NVIDIA',
    factory: 'Nhà máy F01 - Bắc Ninh',
    floor: '1F',
    line: 'Line 01 - High-Speed SMT',
    lineName: 'Line 01 - High-Speed SMT',
    productName: 'NVIDIA HGX B200',
    productType: 'AI GPU Accelerator Board',
    groupName: 'SMT Surface Mount Group A',
    machineName: '',
    stationIp: '',
    hostName: '',
    step: 'ST01 - Solder Paste Printing (SPP)',
    description: '',
    // Technical fallback
    stationCode: '',
    sequenceOrder: 1,
    targetUph: 120,
    targetCycleTime: 30.0,
    warningTolerance: 5.0,
    enableUphMonitoring: true,
    isActive: true,
    // Machine Flags
    isAutoLine: true,
    isSfcPreCheck: true,
    isSfcStation: true,
    sendSfcOnPassOnly: false,
    allowFailPassThrough: true,
    // Validation Keys
    validationKeys: DEFAULT_MACHINE_VALIDATION_KEYS,
    // Routing Configs (Tab 3)
    stepRouting: {
      mainKey: 'BARCODE_MAIN',
      mode: 0
    },
    routingConfigs: [
      {
        id: 1,
        product: 'NVIDIA HGX B200',
        line: 'Line 01 - High-Speed SMT',
        step: 'ST01',
        twinStep: 11,
        mode: 0,
        allowCarrierSwap: true,
        isPicker: true,
        sfcTriggerStep: null,
        isActive: true
      },
      {
        id: 2,
        product: 'NVIDIA HGX B200',
        line: 'Line 01 - High-Speed SMT',
        step: 'ST01',
        twinStep: 12,
        mode: 0,
        allowCarrierSwap: false,
        isPicker: false,
        sfcTriggerStep: null,
        isActive: true
      }
    ],
    // UPH Config (Tab 4)
    uphConfig: {
      targetUph: 120,
      targetCycleTime: 30.0,
      warningTolerance: 5.0,
      enableUphMonitoring: true
    }
  };

  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('machine-config');

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        ...defaultState,
        ...initialData,
        line: initialData.line || initialData.lineName || defaultState.line,
        lineName: initialData.lineName || initialData.line || defaultState.lineName,
        validationKeys: Array.isArray(initialData.validationKeys) && initialData.validationKeys.length > 0
          ? initialData.validationKeys
          : DEFAULT_MACHINE_VALIDATION_KEYS,
        stepRouting: initialData.stepRouting || defaultState.stepRouting,
        routingConfigs: Array.isArray(initialData.routingConfigs) && initialData.routingConfigs.length > 0
          ? initialData.routingConfigs
          : defaultState.routingConfigs,
        uphConfig: initialData.uphConfig || {
          targetUph: initialData.targetUph ?? defaultState.targetUph,
          targetCycleTime: initialData.targetCycleTime ?? defaultState.targetCycleTime,
          warningTolerance: initialData.warningTolerance ?? 5.0,
          enableUphMonitoring: initialData.enableUphMonitoring ?? true
        }
      });
    } else {
      setFormData(defaultState);
    }
    setErrors({});
    setActiveTab('machine-config');
  }, [initialData, isEdit, isOpen]);

  if (!isOpen) return null;

  // Validation logic
  const validate = () => {
    const errs = {};
    if (!formData.machineName || !formData.machineName.trim()) {
      errs.machineName = 'Tên máy không được để trống';
    }

    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!formData.stationIp || !formData.stationIp.trim()) {
      errs.stationIp = 'Địa chỉ IP không được để trống';
    } else if (!ipRegex.test(formData.stationIp.trim())) {
      errs.stationIp = 'Định dạng IPv4 không hợp lệ (vd: 192.168.10.101)';
    }

    if (!formData.hostName || !formData.hostName.trim()) {
      errs.hostName = 'Host Name không được để trống';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Field change handler
  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Đồng bộ line và lineName nếu có
      if (field === 'line') updated.lineName = value;
      if (field === 'lineName') updated.line = value;
      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validate()) return;

    const finalData = {
      ...formData,
      lineName: formData.lineName || formData.line,
      stationCode: formData.stationCode?.trim() || `MC-${formData.machineName.replace(/\s+/g, '-').slice(0, 8).toUpperCase()}`,
      validationKeys: Array.isArray(formData.validationKeys) ? formData.validationKeys : [],
      stepRouting: formData.stepRouting || { mainKey: 'BARCODE_MAIN', mode: 0 },
      routingConfigs: Array.isArray(formData.routingConfigs) ? formData.routingConfigs : [],
      targetUph: formData.uphConfig?.targetUph ?? formData.targetUph ?? 120,
      targetCycleTime: formData.uphConfig?.targetCycleTime ?? formData.targetCycleTime ?? 30.0,
      warningTolerance: formData.uphConfig?.warningTolerance ?? formData.warningTolerance ?? 5.0,
      enableUphMonitoring: formData.uphConfig?.enableUphMonitoring ?? formData.enableUphMonitoring ?? true,
      uphConfig: formData.uphConfig || {
        targetUph: formData.targetUph ?? 120,
        targetCycleTime: formData.targetCycleTime ?? 30.0,
        warningTolerance: formData.warningTolerance ?? 5.0,
        enableUphMonitoring: formData.enableUphMonitoring ?? true
      }
    };

    onSubmit(finalData);
  };

  // Tiêu đề động: ưu tiên prop title từ ngoài truyền vào, nếu không thì dùng fallback theo mode
  const modalDisplayTitle = title || (
    isEdit
      ? `CHỈNH SỬA CẤU HÌNH MÁY: ${formData.machineName || 'TRẠM MÁY'}`
      : 'TẠO MỚI CẤU HÌNH TRẠM MÁY (CREATE MACHINE CONFIGURATION)'
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-[96vw] max-w-[1750px] h-[92vh] max-h-240 rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800 shadow-slate-400/30'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-[0_0_60px_rgba(0,0,0,0.85)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of the Modal */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between shrink-0 ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-zinc-800 text-[#76B900]'
              }`}
            >
              {isEdit ? '✏️' : '⚡'}
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                <span>CONFIG WORKSPACE</span>
                <span>•</span>
                <span className={isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}>
                  {isEdit ? 'UPDATE MODE' : 'CREATE MODE'}
                </span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                  {isEdit ? 'Active' : 'Draft'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight truncate max-w-2xl">
                {modalDisplayTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
              ESC để đóng
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Main Body: 1/3 Left Panel & 2/3 Right Panel */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden p-4 sm:p-5 gap-5">
          {/* 1/3 Bên Trái: 12 trường text input & nút Create Machine */}
          <div className="w-full lg:w-[35%] xl:w-[32%] flex flex-col shrink-0">
            <MachineFormLeftInputs
              formData={formData}
              errors={errors}
              onChange={handleFieldChange}
              mode={mode}
              submitButtonText={submitButtonText}
              onClose={onClose}
              onSubmit={handleSubmit}
              isFoxconn={isFoxconn}
            />
          </div>

          {/* 2/3 Còn Lại: 7 Tab ở phía Top & Vùng Placeholder bên dưới */}
          <div className="w-full lg:w-[65%] xl:w-[68%] flex flex-col flex-1 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-zinc-800 pt-4 lg:pt-0 lg:pl-5 min-w-0">
            {/* Top Navigation Bar: 7 Tabs */}
            <MachineFormTopTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isFoxconn={isFoxconn}
            />

            {/* Content Switcher for Selected Tab (Modularized tabs) */}
            <MachineFormContentSwitcher
              activeTab={activeTab}
              machineName={formData.machineName}
              formData={formData}
              onChange={handleFieldChange}
              isFoxconn={isFoxconn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
