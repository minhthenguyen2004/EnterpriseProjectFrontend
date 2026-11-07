import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import {
  FACTORY_OPTIONS,
  FLOOR_OPTIONS,
  PRODUCT_OPTIONS,
  GROUP_OPTIONS,
  DEFAULT_RACK_FORM_VALUES,
  IP_REGEX
} from '../../constants/rackConfigConstants';

export default function RackFormModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  initialData = null,
  onClose,
  onSubmit
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState(DEFAULT_RACK_FORM_VALUES);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEdit && initialData) {
        setFormData({
          id: initialData.id,
          factory: initialData.factory || FACTORY_OPTIONS[0],
          floor: initialData.floor || FLOOR_OPTIONS[0],
          room: initialData.room || '',
          product: initialData.product || PRODUCT_OPTIONS[0],
          group: initialData.group || GROUP_OPTIONS[0],
          rack: initialData.rack || '',
          slot_number: initialData.slot_number || 1,
          slot_name: initialData.slot_name || '',
          ip_address: initialData.ip_address || ''
        });
      } else {
        setFormData(DEFAULT_RACK_FORM_VALUES);
      }
      setErrors({});
    }
  }, [isOpen, isEdit, initialData]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.factory?.trim()) newErrors.factory = 'Vui lòng chọn hoặc nhập Factory';
    if (!formData.floor?.trim()) newErrors.floor = 'Vui lòng chọn Floor';
    if (!formData.room?.trim()) newErrors.room = 'Vui lòng nhập tên phòng (Room)';
    if (!formData.product?.trim()) newErrors.product = 'Vui lòng chọn hoặc nhập Product';
    if (!formData.group?.trim()) newErrors.group = 'Vui lòng chọn hoặc nhập Group';
    if (!formData.rack?.trim()) newErrors.rack = 'Vui lòng nhập mã tủ Rack (vd: RCK-A01)';
    if (!formData.slot_number || Number(formData.slot_number) < 1) {
      newErrors.slot_number = 'Số thứ tự slot phải lớn hơn 0';
    }
    if (!formData.slot_name?.trim()) newErrors.slot_name = 'Vui lòng nhập tên Slot (vd: SLOT-GPU-01)';
    if (!formData.ip_address?.trim()) {
      newErrors.ip_address = 'Vui lòng nhập địa chỉ IP';
    } else if (!IP_REGEX.test(formData.ip_address.trim())) {
      newErrors.ip_address = 'Địa chỉ IP không đúng định dạng IPv4 hợp lệ (vd: 192.168.1.100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isFoxconn ? 'border-slate-200 bg-slate-50/70' : 'border-zinc-800 bg-zinc-950/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border font-bold ${
                isFoxconn
                  ? 'bg-blue-50 border-blue-200 text-[#002766]'
                  : 'bg-[#76B900]/10 border-[#76B900]/30 text-[#76B900]'
              }`}
            >
              {isEdit ? '✏️' : '➕'}
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                {isEdit ? 'Cập Nhật Cấu Hình Tủ Rack' : 'Thêm Mới Cấu Hình Tủ Rack'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {isEdit
                  ? `Chỉnh sửa thông số cho slot ${formData.slot_name || ''} - Tủ ${formData.rack || ''}`
                  : 'Khai báo vị trí vật lý, sản phẩm, nhóm và cấu hình IP cho tủ Rack mới'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Factory */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Factory (Nhà máy) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.factory}
                onChange={(e) => handleChange('factory', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.factory ? 'border-rose-500' : ''}`}
              >
                {FACTORY_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              {errors.factory && <p className="text-[10px] text-rose-500 mt-1">{errors.factory}</p>}
            </div>

            {/* 2. Floor */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Floor (Tầng) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.floor}
                onChange={(e) => handleChange('floor', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.floor ? 'border-rose-500' : ''}`}
              >
                {FLOOR_OPTIONS.map((fl) => (
                  <option key={fl} value={fl}>
                    {fl}
                  </option>
                ))}
              </select>
              {errors.floor && <p className="text-[10px] text-rose-500 mt-1">{errors.floor}</p>}
            </div>

            {/* 3. Room */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Room (Phòng / Xưởng) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: Cleanroom 01"
                value={formData.room}
                onChange={(e) => handleChange('room', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-medium rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.room ? 'border-rose-500' : ''}`}
              />
              {errors.room && <p className="text-[10px] text-rose-500 mt-1">{errors.room}</p>}
            </div>

            {/* 4. Product */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Product (Sản phẩm) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.product}
                onChange={(e) => handleChange('product', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.product ? 'border-rose-500' : ''}`}
              >
                {PRODUCT_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.product && <p className="text-[10px] text-rose-500 mt-1">{errors.product}</p>}
            </div>

            {/* 5. Group */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Group (Nhóm) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.group}
                onChange={(e) => handleChange('group', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.group ? 'border-rose-500' : ''}`}
              >
                {GROUP_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.group && <p className="text-[10px] text-rose-500 mt-1">{errors.group}</p>}
            </div>

            {/* 6. Rack */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Rack (Mã tủ Rack) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: RCK-A01"
                value={formData.rack}
                onChange={(e) => handleChange('rack', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.rack ? 'border-rose-500' : ''}`}
              />
              {errors.rack && <p className="text-[10px] text-rose-500 mt-1">{errors.rack}</p>}
            </div>

            {/* 7. Slot Number */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Slot Number (Số khe) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="VD: 1"
                value={formData.slot_number}
                onChange={(e) => handleChange('slot_number', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.slot_number ? 'border-rose-500' : ''}`}
              />
              {errors.slot_number && (
                <p className="text-[10px] text-rose-500 mt-1">{errors.slot_number}</p>
              )}
            </div>

            {/* 8. Slot Name */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                Slot Name (Tên khe) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: SLOT-GPU-01"
                value={formData.slot_name}
                onChange={(e) => handleChange('slot_name', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.slot_name ? 'border-rose-500' : ''}`}
              />
              {errors.slot_name && <p className="text-[10px] text-rose-500 mt-1">{errors.slot_name}</p>}
            </div>

            {/* 9. IP Address */}
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
                IP Address (Địa chỉ IP) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="VD: 192.168.1.101"
                value={formData.ip_address}
                onChange={(e) => handleChange('ip_address', e.target.value)}
                className={`w-full px-3 py-2 text-xs font-mono font-semibold rounded-xl border outline-hidden transition-colors ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                    : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                } ${errors.ip_address ? 'border-rose-500' : ''}`}
              />
              {errors.ip_address && (
                <p className="text-[10px] text-rose-500 mt-1">{errors.ip_address}</p>
              )}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div
            className={`pt-4 mt-6 border-t flex items-center justify-end gap-3 ${
              isFoxconn ? 'border-slate-200' : 'border-zinc-800'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[0_0_12px_rgba(118,185,0,0.3)]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{isEdit ? 'Lưu Thay Đổi' : 'Xác Nhận Tạo Rack'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

