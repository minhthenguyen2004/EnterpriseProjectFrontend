import useTheme from '../../../../hooks/useTheme';
import { MACHINE_STATUS } from '../../constants/autolineConstants';
import MachineStatusBadge from './MachineStatusBadge';
import MachineMetricsBlock from './MachineMetricsBlock';
import AutoScrollText from './AutoScrollText';

export default function MachineCard({ machine, index, onSelect }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!machine) return null;

  const isError = machine.status === MACHINE_STATUS.ERROR;
  const isIdle = machine.status === MACHINE_STATUS.IDLE;

  return (
    <div
      className={`w-44 shrink-0 p-2.5 rounded-xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
        isError
          ? isFoxconn
            ? 'bg-rose-50/70 border-rose-300 shadow-rose-900/10'
            : 'bg-rose-950/25 border-rose-500/60 shadow-[0_0_12px_rgba(239,68,68,0.25)] text-white'
          : isIdle
            ? isFoxconn
              ? 'bg-amber-50/60 border-amber-300'
              : 'bg-amber-950/25 border-amber-500/50 text-white'
            : isFoxconn
              ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md'
              : 'bg-zinc-900/90 border-zinc-800 hover:border-[#76B900]/60 hover:shadow-[0_0_12px_rgba(118,185,0,0.2)] text-white'
      }`}
      onClick={() => onSelect && onSelect(machine)}
      title="Nhấp để xem chi tiết cảm biến trạm"
    >
      <div>
        {/* Header Thẻ Máy: Số trạm & Badge Trạng thái */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-1">
            <span
              className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center font-mono ${
                isFoxconn ? 'bg-slate-100 text-[#002766]' : 'bg-zinc-800 text-[#76B900]'
              }`}
            >
              #{index + 1}
            </span>
            <span className={`text-[10px] font-bold font-mono truncate max-w-[55px] ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
              {machine.stationNo}
            </span>
          </div>

          <MachineStatusBadge status={machine.status} />
        </div>

        {/* Tên máy & Model (Tự động cuộn chữ khi tên quá dài) */}
        <div className="mb-2 space-y-0.5">
          <AutoScrollText
            text={machine.name}
            className={`text-xs font-black ${isFoxconn ? 'text-slate-900' : 'text-white'}`}
          />
          <AutoScrollText
            text={machine.model}
            className={`text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-white/80'}`}
          />
        </div>

        {/* Khối Input/Output & NG/Yield xếp theo hàng dọc */}
        <MachineMetricsBlock
          input={machine.input}
          output={machine.output}
          ngCount={machine.ngCount}
          yieldRate={machine.yieldRate}
        />

        {/* Cảnh báo lỗi / Lý do chờ phôi (Tự động cuộn chữ nếu thông báo dài) */}
        {/* {isError && machine.alarmMessage && (
          <div className="mt-1.5 p-1 rounded-md text-[9px] font-bold bg-rose-500/10 border border-rose-500/30 text-rose-500 overflow-hidden">
            <AutoScrollText text={`⚠️ ${machine.alarmMessage}`} className="text-[9px] font-bold text-rose-500" />
          </div>
        )}
        {isIdle && machine.idleReason && (
          <div className="mt-1.5 p-1 rounded-md text-[9px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-500 overflow-hidden">
            <AutoScrollText text={`⏳ ${machine.idleReason}`} className="text-[9px] font-bold text-amber-500" />
          </div>
        )} */}
      </div>
    </div>
  );
}
