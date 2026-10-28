import useTheme from '../../../../../../hooks/useTheme';

export default function ScrewDataTab({ screwData = [] }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto max-h-65 xl:max-h-75 rounded-xl border border-slate-200/70 dark:border-zinc-800"
        style={{ scrollbarWidth: 'thin' }}
      >
        <table className="w-full text-xs text-left border-collapse whitespace-nowrap">
          <thead
            className={`sticky top-0 z-10 text-[10px] font-black uppercase tracking-wider ${
              isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-950 text-zinc-400'
            }`}
          >
            <tr>
              <th className="py-2.5 px-2.5 text-center w-10">#</th>
              <th className="py-2.5 px-3">Step</th>
              <th className="py-2.5 px-3 font-bold">Position</th>
              <th className="py-2.5 px-2.5">Action</th>
              <th className="py-2.5 px-2.5 text-right font-bold">Torque</th>
              <th className="py-2.5 px-2.5 text-right font-bold">Angle</th>
              <th className="py-2.5 px-2.5 text-right font-bold">Time(s)</th>
              <th className="py-2.5 px-2.5 text-center">Result</th>
              <th className="py-2.5 px-2.5 text-center font-bold">Error Code</th>
              <th className="py-2.5 px-3 text-right font-bold">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-bold text-[11px]">
            {screwData.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-slate-400 dark:text-zinc-500 font-sans">
                  Không có dữ liệu siết ốc vít (Screw Data)
                </td>
              </tr>
            ) : (
              screwData.map((item, idx) => {
                const isFail = item.result !== 'PASS';

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isFoxconn
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'hover:bg-zinc-800/50 text-zinc-200'
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center text-slate-400 dark:text-zinc-500 font-bold">
                      {idx + 1}
                    </td>
                    <td className={`py-2 px-3 font-semibold ${ isFoxconn ? 'text-slate-800 dark:text-zinc-200' : 'text-white' }`}>
                      {item.step}
                    </td>
                    <td className={`py-2 px-3 font-bold ${ isFoxconn ? 'text-slate-900 dark:text-white' : 'text-white' }`}>
                      {item.position}
                    </td>
                    <td className={`py-2 px-2.5 ${ isFoxconn ? 'text-slate-600 dark:text-zinc-300' : 'text-white' }`}>
                      {item.action}
                    </td>
                    <td className="py-2 px-2.5 text-right font-black text-emerald-600 dark:text-emerald-400">
                      {item.torque}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-blue-600 dark:text-cyan-400">
                      {item.angle}
                    </td>
                    <td className={`py-2 px-2.5 ${ isFoxconn ? 'text-slate-600 dark:text-zinc-300' : 'text-white' }`}>
                      {item.timeS}s
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                          isFail
                            ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                        }`}
                      >
                        {item.result}
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-center">
                      {isFail ? (
                        <span className="text-rose-500 font-bold text-[10px]">
                          {item.errorCode}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-zinc-600">-</span>
                      )}
                    </td>
                    <td className={`py-2 px-3 ${ isFoxconn ? 'text-slate-600 dark:text-zinc-300' : 'text-white' }`}>
                      {item.time}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
