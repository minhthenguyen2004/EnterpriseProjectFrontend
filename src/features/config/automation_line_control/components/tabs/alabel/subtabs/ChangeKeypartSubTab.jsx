import useTheme from '../../../../../../../hooks/useTheme';
import { KEYPART_CATEGORIES } from '../../../../constants/alabelConstants';

export default function ChangeKeypartSubTab({
  form,
  setForm,
  isExecuting,
  onExecute,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl border bg-cyan-500/5 border-cyan-500/20 text-xs text-cyan-600 dark:text-cyan-400 flex items-start gap-2.5">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>
          <strong>Hoán Đổi Linh Kiện (Change Keypart):</strong> Thay thế mã barcode linh kiện con (Keypart) bị lỗi bằng linh kiện mới hợp chuẩn. Hệ thống sẽ hủy liên kết linh kiện cũ và gán linh kiện mới vào cấu trúc BOM của SN.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Mã SN Cha Cần Thay Thế Linh Kiện
          </label>
          <input
            type="text"
            value={form.sn}
            onChange={(e) => setForm({ ...form, sn: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border font-mono font-semibold transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
            placeholder="Nhập mã SN cha..."
          />
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Loại Linh Kiện (Key Category)
          </label>
          <select
            value={form.keyCategory}
            onChange={(e) => setForm({ ...form, keyCategory: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border font-medium transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
          >
            {KEYPART_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Mã Barcode Cũ (Old Barcode)
          </label>
          <input
            type="text"
            value={form.oldBarcode}
            onChange={(e) => setForm({ ...form, oldBarcode: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border font-mono text-xs transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
            placeholder="Mã vạch linh kiện cũ cần gỡ..."
          />
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
            Mã Barcode Mới (New Barcode Thay Thế)
          </label>
          <input
            type="text"
            value={form.newBarcode}
            onChange={(e) => setForm({ ...form, newBarcode: e.target.value })}
            className={`w-full px-3 py-2 rounded-xl border font-mono text-xs transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 focus:bg-white focus:border-blue-500 text-slate-800'
                : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
            }`}
            placeholder="Quét mã vạch linh kiện mới..."
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          disabled={isExecuting || !form.oldBarcode || !form.newBarcode}
          onClick={() => onExecute('change_keypart')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20'
              : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/20'
          }`}
        >
          {isExecuting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang Đổi Linh Kiện...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Thực Thi Đổi Keypart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
