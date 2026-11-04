import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useTheme from '../../../../../../../hooks/useTheme';
import {
  DB_ACTIVE_MODELS,
  ROUTER_STEPS_LIST,
} from '../../../../constants/alabelConstants';

/**
 * Sub-Tab 2: Transfer (Điều Chuyển Khay Carrier & Router Step)
 * - Các trường text: Mã Serial Number, Mã khay cũ, Mã khay mới
 * - Dòng sản phẩm (Model): Dropdown menu có khả năng tự động giải mã từ mã đối tượng
 * - Mã nhân viên: Tự động truy xuất sau khi đăng nhập (Read-only / Disabled 🔒)
 * - Step chuyển sang: Dropdown menu router step
 * - Nút hành động: [Thực thi chuyển khay]
 */
export default function TransferSubTab({
  form,
  setForm,
  isExecuting,
  onExecute,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Tự động truy xuất mã nhân viên từ tài khoản đăng nhập hiện tại
  const auth = useSelector((state) => state.auth);
  const operatorId = auth?.cardId || auth?.username || 'NV-2026-08819';

  // State theo dõi xem người dùng có can thiệp chọn Model thủ công hay không
  const [isManualModel, setIsManualModel] = useState(false);

  // Đảm bảo operatorId được đồng bộ vào form state
  useEffect(() => {
    if (form.operatorId !== operatorId) {
      setForm((prev) => ({ ...prev, operatorId }));
    }
  }, [operatorId, form.operatorId, setForm]);

  // Hàm tự động giải mã model từ mã SN hoặc mã khay
  const autoDecodeModel = (identifier) => {
    const q = (identifier || '').toUpperCase();
    if (q.includes('GB200') || q.includes('72')) return 'GB200_NVL72';
    if (q.includes('H100')) return 'HGX_H100_SXM5';
    if (q.includes('H200')) return 'HGX_H200_HBM3E';
    if (q.includes('NVLINK') || q.includes('SWITCH')) return 'NVLINK_SWITCH_TRAY';
    if (q.includes('DGX')) return 'DGX_SUPERPOD_B200';
    if (q.includes('SPECTRUM') || q.includes('SN5600')) return 'SPECTRUM4_SN5600';
    if (q.includes('CONNECTX')) return 'CONNECTX7_IB';
    return 'HGX_B200_NVL';
  };

  const handleSnChange = (value) => {
    const updatedForm = { ...form, sn: value };
    if (!isManualModel && value) {
      updatedForm.model = autoDecodeModel(value);
    }
    setForm(updatedForm);
  };

  const handleModelSelect = (value) => {
    setIsManualModel(true);
    setForm((prev) => ({ ...prev, model: value }));
  };

  const handleResetForm = () => {
    setIsManualModel(false);
    setForm({
      sn: '',
      oldCarrier: '',
      newCarrier: '',
      model: DB_ACTIVE_MODELS[0].id,
      operatorId,
      targetStep: '040',
    });
  };

  const currentSn = form.sn || '';
  const currentOldCarrier = form.oldCarrier || '';
  const currentNewCarrier = form.newCarrier || '';
  const currentModel = form.model || DB_ACTIVE_MODELS[0].id;
  const currentTargetStep = form.targetStep || '040';

  const isFormValid =
    currentSn.trim() !== '' &&
    currentOldCarrier.trim() !== '' &&
    currentNewCarrier.trim() !== '' &&
    currentOldCarrier.trim().toUpperCase() !== currentNewCarrier.trim().toUpperCase();

  return (
    <div className="space-y-4">
      {/* 1. CÁC TRƯỜNG TEXT ĐỊNH DANH (SN, Khay cũ, Khay mới) */}
      <div className="space-y-3">
        {/* Trường Text: Mã Serial Number */}
        <div>
          <label className={`block text-xs font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
            Mã Serial Number (SN)
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentSn}
              onChange={(e) => handleSnChange(e.target.value)}
              className={`w-full pl-3 pr-20 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 focus:ring-1 focus:ring-blue-500 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 focus:ring-1 focus:ring-[#76B900] text-zinc-100'
              }`}
              placeholder="Nhập mã Serial Number... (VD: SN8839210492-NV)"
            />
            <span className="absolute right-3 top-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
              SERIAL
            </span>
          </div>
        </div>

        {/* Lưới 2 cột: Mã khay cũ và Mã khay mới */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Trường Text: Mã khay cũ */}
          <div>
            <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              Mã Khay Cũ (Old Carrier RFID)
            </label>
            <input
              type="text"
              value={currentOldCarrier}
              onChange={(e) => setForm((prev) => ({ ...prev, oldCarrier: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 text-zinc-100'
              }`}
              placeholder="Mã khay cũ... (VD: CARRIER-RFID-8819)"
            />
          </div>

          {/* Trường Text: Mã khay mới */}
          <div>
            <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              Mã Khay Mới (New Carrier RFID)
            </label>
            <input
              type="text"
              value={currentNewCarrier}
              onChange={(e) => setForm((prev) => ({ ...prev, newCarrier: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold transition-all ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950/60 border-zinc-700 text-zinc-100'
              }`}
              placeholder="Mã khay mới... (VD: CARRIER-RFID-9920)"
            />
          </div>
        </div>
      </div>

      {/* 2. DÒNG SẢN PHẨM & MÃ NHÂN VIÊN (Lưới 2 cột) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Dòng sản phẩm (Dropdown menu tự động giải mã) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`block font-bold ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              Dòng Sản Phẩm (Model)
            </label>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                isManualModel
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              }`}
            >
              {isManualModel ? 'Chọn thủ công' : '⚡ Tự động giải mã'}
            </span>
          </div>
          <select
            value={currentModel}
            onChange={(e) => handleModelSelect(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border font-semibold text-xs transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {DB_ACTIVE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mã nhân viên (Tự truy xuất khi đăng nhập, Read-only / Disabled) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`block font-bold  ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
              Mã Nhân Viên (Operator ID)
            </label>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 flex items-center gap-1 font-mono">
              🔒 Tự truy xuất
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={operatorId}
              readOnly
              disabled
              className={`w-full pl-8 pr-3 py-2 rounded-xl border text-xs font-mono font-bold cursor-not-allowed select-none ${
                isFoxconn
                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
              title="Mã nhân viên tự động trích xuất từ tài khoản đăng nhập hiện tại và không thể sửa"
            />
            <span className="absolute left-2.5 top-2 text-xs opacity-60">🔒</span>
          </div>
        </div>
      </div>

      {/* 3. STEP CHUYỂN SANG (Dropdown Menu) */}
      <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 text-xs">
        <label className={`block font-bold mb-1.5 ${ isFoxconn ? "text-slate-700" : "text-white"}`}>
          Step Chuyển Sang (Destination Router Step)
        </label>
        <select
          value={currentTargetStep}
          onChange={(e) => setForm((prev) => ({ ...prev, targetStep: e.target.value }))}
          className={`w-full px-3 py-2 rounded-xl border font-mono font-semibold text-xs transition-all cursor-pointer ${
            isFoxconn
              ? 'bg-slate-50 border-slate-300 text-slate-800'
              : 'bg-zinc-950 border-zinc-700 text-zinc-100'
          }`}
        >
          {ROUTER_STEPS_LIST.map((stepItem) => (
            <option key={stepItem.step} value={stepItem.step}>
              {stepItem.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-zinc-400">
          Xác định bước Router trạm tiếp theo mà khay mới sẽ được hệ thống băng tải tự động điều phối tới.
        </p>
      </div>

      {/* 4. CỤM NÚT HÀNH ĐỘNG THỰC THI CHUYỂN KHAY */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={handleResetForm}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isFoxconn ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-zinc-800 text-zinc-400'
          }`}
        >
          Làm Sạch Form
        </button>

        <button
          type="button"
          disabled={isExecuting || !isFormValid}
          onClick={() => onExecute('transfer')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              : 'bg-[#76B900] hover:bg-[#86d300] text-black font-extrabold shadow-[#76B900]/20'
          }`}
        >
          {isExecuting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang Chuyển Khay...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Thực Thi Chuyển Khay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
