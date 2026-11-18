import { useTranslation } from 'react-i18next';

export default function SpecialManipulation({
  isFoxconn,
  onUndo,
  onOpenChangeCarrier,
  onClearUndo,
  onResetCarrier
}) {
  const { t } = useTranslation('autoline');

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🛠️</span>
        <h4 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-black' : 'text-white'}`}>
          {t('operations.specialManipulation.title')}
        </h4>
      </div>

      {/* Loạt nút xếp theo hàng dọc: Undo, Đổi Carrier (Jig), Xóa UNDO, Reset Carrier (Jig) */}
      <div className="flex flex-col space-y-2">
        {/* Nút 1: Undo */}
        <button
          type="button"
          onClick={onUndo}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer active:scale-98 ${
            isFoxconn
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-800/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">↩️</span>
            <span>{t('operations.specialManipulation.undo.label')}</span>
          </div>
          <span className="text-[10px] opacity-60">{t('operations.specialManipulation.undo.sub')}</span>
        </button>

        {/* Nút 2: Đổi Carrier (Jig) */}
        <button
          type="button"
          onClick={onOpenChangeCarrier}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer active:scale-98 ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-300'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🔄</span>
            <span>{t('operations.specialManipulation.changeCarrier.label')}</span>
          </div>
          <span className="text-[10px] opacity-60">{t('operations.specialManipulation.changeCarrier.sub')}</span>
        </button>

        {/* Nút 3: Xóa UNDO */}
        <button
          type="button"
          onClick={onClearUndo}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer active:scale-98 ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
              : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🗑️</span>
            <span>{t('operations.specialManipulation.clearUndo.label')}</span>
          </div>
          <span className="text-[10px] opacity-60">{t('operations.specialManipulation.clearUndo.sub')}</span>
        </button>

        {/* Nút 4: Reset Carrier (Jig) */}
        <button
          type="button"
          onClick={onResetCarrier}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-between cursor-pointer active:scale-98 ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
              : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🔁</span>
            <span>{t('operations.specialManipulation.resetCarrier.label')}</span>
          </div>
          <span className="text-[10px] opacity-60">{t('operations.specialManipulation.resetCarrier.sub')}</span>
        </button>
      </div>
    </div>
  );
}
