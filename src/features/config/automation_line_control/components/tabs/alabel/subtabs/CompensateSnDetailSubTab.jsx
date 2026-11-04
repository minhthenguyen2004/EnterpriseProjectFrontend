import useTheme from '../../../../../../../hooks/useTheme';

export default function CompensateSnDetailSubTab({
  rows,
  setRows,
  isExecuting,
  onExecute,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleAddRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), key: '', value: '', type: 'VARCHAR' },
    ]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleChangeRow = (id, field, val) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)));
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl border bg-violet-500/5 border-violet-500/20 text-xs text-violet-600 dark:text-violet-400 flex items-start gap-2.5">
        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>
          <strong>Bù Dữ Liệu SN_Detail:</strong> Nhập bổ sung hoặc đồng bộ lại các trường thông tin bản ghi (như MAC Address, BIOS UUID, Vendor P/N, Lot No...) bị thiếu trong cơ sở dữ liệu của Serial Number hiện tại.
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
          <span>Danh Sách Trường Dữ Liệu Bù Đắp ({rows.length})</span>
          <button
            type="button"
            onClick={handleAddRow}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              isFoxconn
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'bg-[#76B900]/10 text-[#76B900] hover:bg-[#76B900]/20'
            }`}
          >
            <span>+ Thêm Dòng Mới</span>
          </button>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {rows.map((row, idx) => (
            <div key={row.id || idx} className="flex items-center gap-2 text-xs">
              <span className="w-6 text-center font-mono text-[11px] text-slate-400 dark:text-zinc-500">
                #{idx + 1}
              </span>
              <input
                type="text"
                value={row.key}
                onChange={(e) => handleChangeRow(row.id, 'key', e.target.value)}
                placeholder="Tên trường (VD: mac_eth0)"
                className={`w-1/3 px-2.5 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 focus:bg-white text-slate-800'
                    : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
                }`}
              />
              <input
                type="text"
                value={row.value}
                onChange={(e) => handleChangeRow(row.id, 'value', e.target.value)}
                placeholder="Giá trị (VD: 00:1B:44:11:3A:F0)"
                className={`flex-1 px-2.5 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 focus:bg-white text-slate-800'
                    : 'bg-zinc-950/60 border-zinc-700 focus:border-[#76B900] text-zinc-100'
                }`}
              />
              <button
                type="button"
                onClick={() => handleRemoveRow(row.id)}
                disabled={rows.length <= 1}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Xóa dòng"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <button
          type="button"
          disabled={isExecuting || rows.some((r) => !r.key.trim() || !r.value.trim())}
          onClick={() => onExecute('compensate_detail')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${
            isFoxconn
              ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/20'
              : 'bg-violet-500 hover:bg-violet-400 text-black shadow-violet-500/20'
          }`}
        >
          {isExecuting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Đang Gửi Bù Dữ Liệu...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Gửi Bù Dữ Liệu SN_Detail</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
