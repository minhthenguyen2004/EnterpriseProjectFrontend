import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';

export default function MachineConfigDetailModal({
  isOpen,
  machine,
  onClose,
  onSwitchToEdit
}) {
  const { t, i18n } = useTranslation('machine');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!isOpen || !machine) return null;

  const locale = i18n.language === 'zh' ? 'zh-CN' : i18n.language === 'en' ? 'en-US' : 'vi-VN';
  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    try {
      const d = new Date(isoStr);
      return d.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          isFoxconn
            ? 'bg-slate-50 border-slate-200'
            : 'bg-zinc-950/70 border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-0.5">
              <span>{t('modals.detail.tagCategory')}</span>
              <span>•</span>
              <span className={isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}>
                {t('modals.detail.tagId', { id: machine.id })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black tracking-tight">{machine.machineName}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase border ${
                machine.isActive
                  ? isFoxconn
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}>
                {machine.isActive ? t('modals.detail.statusOnline') : t('modals.detail.statusStandby')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body: Cards */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Card 1: Network & Identifiers */}
          <div className={`p-4 rounded-2xl border ${
            isFoxconn ? 'bg-slate-50/70 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                {t('modals.detail.secNetwork')}
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblStationCode')}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">{machine.stationCode || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblIp')}</span>
                <span className={`font-mono font-black ${isFoxconn ? 'text-blue-700' : 'text-[#76B900]'}`}>{machine.stationIp}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblHost')}</span>
                <span className="font-mono text-slate-700 dark:text-zinc-300 truncate block" title={machine.hostName}>{machine.hostName}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Physical Location & Line Assignment */}
          <div className={`p-4 rounded-2xl border ${
            isFoxconn ? 'bg-slate-50/70 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                {t('modals.detail.secLocation')}
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblCustomer')}</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{machine.customer}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblFloor')}</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{machine.floor}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblFactory')}</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{machine.factory}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblLine')}</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{machine.lineName}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblSequence')}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">{t('modals.detail.valSequence', { order: machine.sequenceOrder })}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblGroup')}</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{machine.groupName}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Production, Step & Target Metrics */}
          <div className={`p-4 rounded-2xl border ${
            isFoxconn ? 'bg-slate-50/70 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                {t('modals.detail.secOperation')}
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblProduct')}</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{machine.productName}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblProductType')}</span>
                <span className="text-slate-700 dark:text-zinc-300">{machine.productType}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblKeys')}</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{machine.keys}</span>
              </div>
              <div className="sm:col-span-3">
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblStep')}</span>
                <span className="font-bold text-slate-800 dark:text-zinc-100">{machine.step}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblTargetUph')}</span>
                <span className="font-mono font-black text-sm text-slate-800 dark:text-zinc-100">{machine.targetUph} pcs/h</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblTargetCycle')}</span>
                <span className="font-mono font-black text-sm text-slate-800 dark:text-zinc-100">{machine.targetCycleTime}s</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-zinc-500 block text-[11px]">{t('modals.detail.lblTargetUpd')}</span>
                <span className="font-mono font-black text-sm text-slate-800 dark:text-zinc-100">{machine.targetUpd || machine.targetUph * 20} pcs/day</span>
              </div>
            </div>
          </div>

          {/* Card 4: Description & System Timestamps */}
          <div className={`p-4 rounded-2xl border ${
            isFoxconn ? 'bg-slate-50/70 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`} />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                {t('modals.detail.secNotes')}
              </h4>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-300 italic mb-3">
              {machine.description || t('modals.detail.noDescription')}
            </p>

            <div className="grid grid-cols-2 gap-3 text-[11px] pt-2 border-t border-slate-200/60 dark:border-zinc-800 text-slate-400 dark:text-zinc-500">
              <div>
                <span>{t('modals.detail.lblCreatedAt')}</span>
                <span className="font-mono font-medium text-slate-600 dark:text-zinc-400">{formatDate(machine.createdAt)}</span>
              </div>
              <div>
                <span>{t('modals.detail.lblUpdatedAt')}</span>
                <span className="font-mono font-medium text-slate-600 dark:text-zinc-400">{formatDate(machine.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            {t('modals.detail.btnClose')}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToEdit(machine);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md flex items-center gap-2 ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[#76B900]/25'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>{t('modals.detail.btnSwitchEdit')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
