import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import {
  CUSTOMER_OPTIONS,
  FACTORY_OPTIONS,
  FLOOR_OPTIONS,
  PRODUCT_NAME_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  LINE_OPTIONS,
  STEP_OPTIONS,
  GROUP_NAME_OPTIONS
} from '../../constants/machineConfigConstants';

export default function MachineConfigFormModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  initialData,
  onClose,
  onSubmit
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const isEdit = mode === 'edit';

  const defaultState = {
    customer: 'NVIDIA',
    factory: 'Nhà máy F01 - Bắc Ninh',
    floor: '1F',
    productName: 'NVIDIA HGX B200',
    productType: 'AI GPU Accelerator Board',
    lineId: 1,
    lineName: 'Line 01 - High-Speed SMT',
    step: 'ST01 - Solder Paste Printing (SPP)',
    keys: 'KEY-SMT-01',
    groupName: 'SMT Surface Mount Group A',
    machineName: '',
    stationIp: '',
    hostName: '',
    stationCode: '',
    sequenceOrder: 1,
    targetUph: 120,
    targetCycleTime: 30.00,
    description: '',
    isActive: true
  };

  const [formData, setFormData] = useState(defaultState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        ...defaultState,
        ...initialData
      });
    } else {
      setFormData(defaultState);
    }
    setErrors({});
  }, [initialData, isEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.machineName.trim()) {
      errs.machineName = 'Tên máy không được để trống';
    }

    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!formData.stationIp.trim()) {
      errs.stationIp = 'Địa chỉ IP không được để trống';
    } else if (!ipRegex.test(formData.stationIp.trim())) {
      errs.stationIp = 'Địa chỉ IP không đúng định dạng IPv4 (vd: 192.168.10.101)';
    }

    if (!formData.hostName.trim()) {
      errs.hostName = 'Host Name không được để trống';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Auto generate stationCode if empty
    const finalData = {
      ...formData,
      stationCode: formData.stationCode.trim() || `MC-${formData.machineName.replace(/\s+/g, '-').slice(0, 8).toUpperCase()}`
    };

    onSubmit(finalData);
  };

  const handleLineChange = (lineName) => {
    const foundLine = LINE_OPTIONS.find(l => l.name === lineName);
    setFormData(prev => ({
      ...prev,
      lineName,
      lineId: foundLine ? foundLine.id : prev.lineId,
      factory: foundLine ? foundLine.factory : prev.factory,
      floor: foundLine ? foundLine.floor : prev.floor
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isFoxconn
            ? 'bg-slate-50 border-slate-200'
            : 'bg-zinc-950/70 border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">
              <span>MASTER CONFIG</span>
              <span>•</span>
              <span className={isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}>
                {isEdit ? 'UPDATE STATION' : 'NEW MACHINE SETUP'}
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight">
              {isEdit ? `CHỈNH SỬA THÔNG TIN MÁY: ${formData.machineName}` : 'THÊM MỚI CẤU HÌNH MÁY MÓC'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body: Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Nhóm 1: Vị Trí Xưởng & Khách Hàng */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-100 dark:border-zinc-800">
              <span className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-zinc-300">
                1. Vị Trí Xưởng & Khách Hàng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Khách hàng (Customer) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {CUSTOMER_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Nhà máy (Factory) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.factory}
                  onChange={(e) => setFormData({ ...formData, factory: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {FACTORY_OPTIONS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Tầng xưởng (Floor) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {FLOOR_OPTIONS.map(fl => (
                    <option key={fl} value={fl}>{fl}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Nhóm 2: Dây Chuyền & Quy Trình Sản Xuất */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-100 dark:border-zinc-800">
              <span className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-zinc-300">
                2. Dây Chuyền & Quy Trình
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Tên Chuyền (Line Name) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.lineName}
                  onChange={(e) => handleLineChange(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {LINE_OPTIONS.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Sản phẩm (Product Name)
                </label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {PRODUCT_NAME_OPTIONS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Phân loại (Product Type)
                </label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {PRODUCT_TYPE_OPTIONS.map(pt => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Công đoạn / Bước (Step) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.step}
                  onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {STEP_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Khóa trạm / Keyparts (Keys)
                </label>
                <input
                  type="text"
                  value={formData.keys}
                  onChange={(e) => setFormData({ ...formData, keys: e.target.value })}
                  placeholder="VD: KEY-SMT-0101"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Nhóm máy (Group Name) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                >
                  {GROUP_NAME_OPTIONS.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Nhóm 3: Thiết Bị & Kết Nối Mạng */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-100 dark:border-zinc-800">
              <span className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-zinc-300">
                3. Thiết Bị & Kết Nối Mạng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Tên máy (Machine Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.machineName}
                  onChange={(e) => setFormData({ ...formData, machineName: e.target.value })}
                  placeholder="VD: High-Speed SMT Mounter #01"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                    errors.machineName
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : isFoxconn
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
                {errors.machineName && (
                  <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.machineName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Mã trạm (Station Code)
                </label>
                <input
                  type="text"
                  value={formData.stationCode}
                  onChange={(e) => setFormData({ ...formData, stationCode: e.target.value })}
                  placeholder="Tự sinh nếu để trống (vd: MC-SMT-01)"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Địa chỉ IP (IP Address) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.stationIp}
                  onChange={(e) => setFormData({ ...formData, stationIp: e.target.value })}
                  placeholder="192.168.10.101"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border outline-none ${
                    errors.stationIp
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : isFoxconn
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
                {errors.stationIp && (
                  <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.stationIp}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Host Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.hostName}
                  onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                  placeholder="smt-mnt-01.fii.foxconn.com"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    errors.hostName
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : isFoxconn
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
                {errors.hostName && (
                  <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.hostName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Thứ tự trạm (Sequence Order)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.sequenceOrder}
                  onChange={(e) => setFormData({ ...formData, sequenceOrder: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Target UPH (Sản lượng/Giờ)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.targetUph}
                  onChange={(e) => setFormData({ ...formData, targetUph: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Target Cycle Time (Giây)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={formData.targetCycleTime}
                  onChange={(e) => setFormData({ ...formData, targetCycleTime: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-bold">
                    Kích hoạt trạm máy (Trạng thái Active)
                  </span>
                </label>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold mb-1.5 text-slate-600 dark:text-zinc-400">
                  Mô tả / Ghi chú kỹ thuật
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ghi chú chi tiết về trạm máy, giao thức truyền thông hoặc thiết bị phụ trợ..."
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    isFoxconn
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-zinc-950 border-zinc-800 text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              Hủy Bỏ
            </button>

            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[#76B900]/25'
              }`}
            >
              {isEdit ? 'Lưu Thay Đổi' : 'Thêm Máy Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
