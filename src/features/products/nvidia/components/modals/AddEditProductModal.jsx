import React, { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function AddEditProductModal({
  isOpen,
  mode = 'create',
  item = null,
  onClose,
  onSave,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [formData, setFormData] = useState({
    customer: 'NVIDIA',
    modelSerial: '',
    productName: '',
    modelName: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && item) {
        setFormData({
          customer: item.customer || 'NVIDIA',
          modelSerial: item.modelSerial || item.model || '',
          productName: item.productName || item.product || '',
          modelName: item.modelName || '',
        });
      } else {
        setFormData({
          customer: 'NVIDIA',
          modelSerial: '',
          productName: '',
          modelName: '',
        });
      }
      setError('');
    }
  }, [isOpen, mode, item]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer.trim()) {
      setError('Vui lòng nhập thông tin Customer (Khách hàng)!');
      return;
    }
    if (!formData.modelSerial.trim()) {
      setError('Vui lòng nhập Model Serial!');
      return;
    }
    if (!formData.productName.trim()) {
      setError('Vui lòng nhập Product Name (Tên dòng sản phẩm)!');
      return;
    }
    if (!formData.modelName.trim()) {
      setError('Vui lòng nhập Model Name (Tên đầy đủ của Model)!');
      return;
    }

    onSave({
      customer: formData.customer.trim(),
      modelSerial: formData.modelSerial.trim().toUpperCase(),
      model: formData.modelSerial.trim().toUpperCase(), // Tương thích với bảng và bộ lọc
      productName: formData.productName.trim(),
      product: formData.productName.trim(),             // Tương thích với bảng và bộ lọc
      modelName: formData.modelName.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transform transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/80 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-[#76B900]/20 text-[#76B900]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">
                {mode === 'create' ? 'Thêm mới Product Model' : 'Chỉnh sửa Product Model'}
              </h3>
              <p className="text-xs text-slate-400">
                Nhập đầy đủ thông tin định danh cho Model sản phẩm
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 rounded-md cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Form: 4 trường text */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Trường 1: Customer (text input) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
              Customer (Khách hàng) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: NVIDIA, FOXCONN, MICROSOFT..."
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-colors outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Trường 2: Model Serial (text input) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
              Model Serial (Mã Model) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: GB200-NVL72 hoặc B200-HGX-192GB..."
              value={formData.modelSerial}
              onChange={(e) => setFormData({ ...formData, modelSerial: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border font-mono font-bold uppercase transition-colors outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Trường 3: Product Name (text input) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
              Product Name (Tên dòng sản phẩm) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Blackwell GB200, B200 GPU Server..."
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-colors outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Trường 4: Model Name (text input) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
              Model Name (Tên đầy đủ của Model) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: NVIDIA GB200 NVL72 Liquid-Cooled AI Server Rack System..."
              value={formData.modelName}
              onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
              className={`w-full px-3.5 py-2 text-sm rounded-lg border transition-colors outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-inherit flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-sm cursor-pointer ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
              }`}
            >
              {mode === 'create' ? 'Tạo mới Model' : 'Lưu cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
