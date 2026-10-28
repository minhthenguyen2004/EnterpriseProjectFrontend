import useTheme from '../../../../../hooks/useTheme';
import { MACHINE_STATUS } from '../../constants/autolineConstants';
import MachineStatusBadge from './MachineStatusBadge';
import MachineMetricsBlock from './MachineMetricsBlock';

export default function MachineCard({ machine, index, onSelect }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!machine) return null;

  const isError = machine.status === MACHINE_STATUS.ERROR;
  const isIdle = machine.status === MACHINE_STATUS.IDLE;

  return (
    <div
      className={`w-56 shrink-0 p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer select-none ${
        isError
          ? isFoxconn
            ? 'bg-rose-50/70 border-rose-300 shadow-rose-900/10 hover:shadow-md'
            : 'bg-rose-950/25 border-rose-500/60 shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:border-rose-400 text-white'
          : isIdle
            ? isFoxconn
              ? 'bg-amber-50/60 border-amber-300 hover:shadow-md'
              : 'bg-amber-950/25 border-amber-500/50 hover:border-amber-400 text-white'
            : isFoxconn
              ? 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md text-slate-900'
              : 'bg-zinc-900/90 border-zinc-800 hover:border-[#76B900]/60 hover:shadow-[0_0_12px_rgba(118,185,0,0.2)] text-white'
      }`}
      onClick={() => onSelect && onSelect(machine)}
      title="Nhấp để xem chi tiết cảm biến trạm"
    >
      <div>
        {/* Header Thẻ Máy: Số trạm & Badge Trạng thái */}
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-5 h-5 rounded-md text-[9px] font-bold flex items-center justify-center shrink-0 ${
                isFoxconn ? 'bg-slate-100 text-[#002766]' : 'bg-zinc-800 text-[#76B900]'
              }`}
            >
              #{index + 1}
            </span>
            <span className={`text-[10px] font-bold tracking-tight truncate ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
              {machine.stationNo}
            </span>
          </div>

          <MachineStatusBadge status={machine.status} />
        </div>

        {/* Tên máy & Model: Tự động xuống dòng khi text dài (đồng bộ với MachineStatusRectCard) */}
        <div className="mb-2.5 space-y-0.5">
          <h4
            className={`text-sm font-black tracking-tight leading-snug wrap-break-word whitespace-normal line-clamp-2 ${
              isFoxconn ? 'text-slate-900' : 'text-white'
            }`}
            title={machine.name}
          >
            {machine.name}
          </h4>
          <p
            className={`text-[10px] font-medium leading-tight wrap-break-word whitespace-normal opacity-70 ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
            title={machine.model}
          >
            {machine.model}
          </p>
        </div>

        {/* Khối Input/Output & NG/Yield xếp theo hàng dọc */}
        <MachineMetricsBlock
          input={machine.input}
          output={machine.output}
          ngCount={machine.ngCount}
          yieldRate={machine.yieldRate}
        />
      </div>
    </div>
  );
}
