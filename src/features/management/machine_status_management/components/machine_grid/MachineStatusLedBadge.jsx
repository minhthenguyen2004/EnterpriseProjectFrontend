import useTheme from '../../../../../hooks/useTheme';
import { MACHINE_STATUS_CONFIG } from '../../constants/machineStatusConstants';

export default function MachineStatusLedBadge({ status = 'RUN' }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const cfg = MACHINE_STATUS_CONFIG[status] || MACHINE_STATUS_CONFIG.STOP;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
        isFoxconn
          ? `${cfg.bgFoxconn} ${cfg.textFoxconn} ${cfg.borderFoxconn}`
          : `${cfg.bgNvidia} ${cfg.textNvidia} ${cfg.borderNvidia} ${cfg.glowNvidia}`
      }`}
    >
      {/* Đèn LED nhấp nháy phát quang */}
      <span className="relative flex h-2 w-2">
        {status === 'RUN' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        {status === 'ERROR' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dotColor}`} />
      </span>

      {/* Nhãn trạng thái */}
      <span>{cfg.label}</span>
    </div>
  );
}
