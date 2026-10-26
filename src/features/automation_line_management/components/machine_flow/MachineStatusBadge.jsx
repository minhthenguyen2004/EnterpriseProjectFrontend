import useTheme from '../../../../hooks/useTheme';
import { STATUS_CONFIG, MACHINE_STATUS } from '../../constants/autolineConstants';

export default function MachineStatusBadge({ status = MACHINE_STATUS.STOP }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const config = STATUS_CONFIG[status] || STATUS_CONFIG[MACHINE_STATUS.STOP];
  const themeStyle = isFoxconn ? config.light : config.dark;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black border transition-all ${themeStyle.badgeBg}`}
    >
      {/* Đèn LED nhấp nháy */}
      <span className="relative flex h-1.5 w-1.5">
        {status === MACHINE_STATUS.RUN && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        {status === MACHINE_STATUS.ERROR && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${themeStyle.dotBg}`}></span>
      </span>

      <span>{config.label.vi}</span>
    </span>
  );
}
