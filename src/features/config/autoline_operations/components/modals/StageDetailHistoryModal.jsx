import { useTranslation } from 'react-i18next';
import useTheme from '../../../../../hooks/useTheme';

export default function StageDetailHistoryModal({
  isOpen,
  onClose,
  stepData,
  productData
}) {
  const { t } = useTranslation('autoline');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  if (!isOpen || !stepData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-700'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn
                  ? 'bg-blue-50 text-[#002766]'
                  : 'bg-[#76B900]/15 text-[#76B900]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-sm font-black uppercase ${isFoxconn ? 'text-black' : 'text-white'}`}>
                {t('operations.stageDetailModal.title', {
                  step: String(stepData.stepNumber).padStart(2, '0')
                })}
              </h3>
              <p className={`text-xs text-slate-500 dark:text-zinc-400 ${isFoxconn ? 'text-black' : 'text-white'}`}>
                {stepData.stationName} • {stepData.groupName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Status Banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              stepData.status === 'PASS'
                ? isFoxconn
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-emerald-950/60 border-emerald-700/80 text-emerald-300'
                : stepData.status === 'FAIL'
                ? isFoxconn
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-red-950/60 border-red-700/80 text-red-300'
                : isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
                {t('operations.stageDetailModal.statusInspection')}
              </span>
              <span className="text-sm font-black">
                {stepData.status === 'PASS'
                  ? t('operations.stageDetailModal.statusPass')
                  : stepData.status === 'FAIL'
                  ? t('operations.stageDetailModal.statusFail')
                  : t('operations.stageDetailModal.statusPending')}
              </span>
            </div>
            <div className="text-right text-xs font-mono">
              <span className="block opacity-70 text-[10px] uppercase font-bold">
                {t('operations.stageDetailModal.passTimestamp')}
              </span>
              <span>{stepData.passTimestamp || '- - -'}</span>
            </div>
          </div>

          {/* Operation Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
              <span className="text-[10px] font-bold text-black uppercase block">
                {t('operations.stageDetailModal.operator')}
              </span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200 mt-1 block">
                {stepData.inspectorId || t('operations.stageDetailModal.defaultOperator')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
              <span className="text-[10px] font-bold text-black uppercase block">
                {t('operations.stageDetailModal.cycleTime')}
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-zinc-200 mt-1 block">
                {stepData.cycleTimeSeconds
                  ? t('operations.stageDetailModal.seconds', { count: stepData.cycleTimeSeconds })
                  : 'N/A'}
              </span>
            </div>
          </div>

          {/* Error / Defect Information (Nếu có lỗi) */}
          {stepData.status === 'FAIL' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 space-y-2">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs">
                <span>⚠️</span>
                <span className="uppercase tracking-wider">
                  {t('operations.stageDetailModal.defectInfo')}
                </span>
              </div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">
                    {t('operations.stageDetailModal.errorCode')}{' '}
                  </span>
                  <span className="font-mono font-black text-red-600 dark:text-red-400">
                    {stepData.errorCode || 'ERR-UNKNOWN'}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">
                    {t('operations.stageDetailModal.defectLocation')}{' '}
                  </span>
                  <span className="text-slate-800 dark:text-zinc-200">
                    {stepData.defectLocation || t('operations.stageDetailModal.defaultLocation')}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">
                    {t('operations.stageDetailModal.errorDesc')}{' '}
                  </span>
                  <p className="text-slate-600 dark:text-zinc-400 mt-0.5">
                    {stepData.errorDescription || t('operations.stageDetailModal.defaultErrorDesc')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Product & Station Info */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase block mb-1">
              {t('operations.stageDetailModal.productLinkTitle')}
            </span>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">
                {t('operations.stageDetailModal.serialNumber')}
              </span>
              <span className={`font-bold ${isFoxconn ? 'text-black' : 'text-white'}`}>
                {productData.serialNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">
                {t('operations.stageDetailModal.carrierJig')}
              </span>
              <span className={`font-bold ${isFoxconn ? 'text-black' : 'text-white'}`}>
                {productData.carrierCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-zinc-400">
                {t('operations.stageDetailModal.line')}
              </span>
              <span className={`font-bold ${isFoxconn ? 'text-black' : 'text-white'}`}>
                {productData.lineName}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
          >
            {t('operations.stageDetailModal.btnClose')}
          </button>
        </div>
      </div>
    </div>
  );
}
