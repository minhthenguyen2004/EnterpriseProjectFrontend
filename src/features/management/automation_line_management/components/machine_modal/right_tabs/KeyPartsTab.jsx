import useTheme from '../../../../../../hooks/useTheme';

export default function KeyPartsTab({ keyParts = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto max-h-65 xl:max-h-75 rounded-xl border border-slate-200/70 dark:border-zinc-800"
        style={{ scrollbarWidth: 'thin' }}
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead
            className={`sticky top-0 z-10 text-[10px] font-black uppercase tracking-wider ${
              isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            <tr>
              <th className="py-2.5 px-3 text-center w-12">#</th>
              <th className="py-2.5 px-3 w-56">Step</th>
              <th className="py-2.5 px-3">Key Name</th>
              <th className="py-2.5 px-3 font-bold">Value / Lot Barcode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-white text-[11px]">
            {keyParts.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400 dark:text-zinc-500 font-sans">
                  Không có dữ liệu linh kiện chính (Key Parts)
                </td>
              </tr>
            ) : (
              keyParts.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isFoxconn
                      ? 'hover:bg-slate-50 text-slate-700'
                      : 'hover:bg-zinc-800/50 text-zinc-200'
                  }`}
                >
                  <td className={`py-2 px-3 text-center font-bold ${
                    isFoxconn ? 'text-slate-400 dark:text-zinc-500' : 'text-white'
                  }`}>
                    {idx + 1}
                  </td>
                  <td className={`py-2 px-3 font-semibold ${
                    isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white'
                  }`}>
                    {item.step}
                  </td>
                  <td className={`py-2 px-3 font-bold ${
                    isFoxconn ? 'text-slate-900' : 'text-white'
                  }`}>
                    {item.keyName}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isFoxconn
                          ? 'bg-slate-100 text-[#002766] border border-slate-200 font-bold'
                          : 'bg-zinc-800 text-white border border-zinc-700 font-bold'
                      }`}
                    >
                      {item.value}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
