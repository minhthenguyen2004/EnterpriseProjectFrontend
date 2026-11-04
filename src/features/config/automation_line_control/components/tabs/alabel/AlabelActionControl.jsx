import useTheme from '../../../../../../hooks/useTheme';
import { ALABEL_SUB_TABS } from '../../../constants/alabelConstants';
import UndoResetSubTab from './subtabs/undo_reset/UndoResetFunction';
import TransferSubTab from './subtabs/transfer/TransferSubTab';
import ClearUndoSubTab from './subtabs/clear_undo/ClearUndoSubTab';
import CompensateSnDetailSubTab from './subtabs/sn_compensation/CompensateSnDetailSubTab';
import ChangeKeypartSubTab from './subtabs/ChangeKeypartSubTab';
import SnDetailsSubTab from './subtabs/SnDetailsSubTab';
import ErrorLogsSubTab from './subtabs/ErrorLogsSubTab';

export default function AlabelActionControl({
  activeSubTab,
  setActiveSubTab,
  isExecutingAction,
  executeSubTabAction,
  undoResetForm,
  setUndoResetForm,
  transferForm,
  setTransferForm,
  clearUndoForm,
  setClearUndoForm,
  compensateForm,
  setCompensateForm,
  compensateRows,
  setCompensateRows,
  changeKeypartForm,
  setChangeKeypartForm,
  snDetailsList,
  errorLogsList,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800 text-white'
      }`}
    >
      <div className="space-y-4">
        {/* Header Mục Thao Tác Điều Khiển */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isFoxconn ? 'bg-blue-50 text-blue-600' : 'bg-[#76B900]/10 text-[#76B900]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Thao Tác Điều Khiển ALABEL</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Thực thi các nghiệp vụ can thiệp Router, hoàn tác, điều chuyển và bù dữ liệu SFC
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            DISPATCHER
          </span>
        </div>

        {/* Hệ thống 7 Sub-Tabs Ngang */}
        <div
          className={`flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto scrollbar-none ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}
        >
          {ALABEL_SUB_TABS.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none active:scale-98 ${
                  isActive
                    ? isFoxconn
                      ? 'bg-[#002766] text-white shadow-sm shadow-blue-900/20'
                      : 'bg-[#76B900] text-black font-extrabold shadow-sm shadow-[#76B900]/20'
                    : isFoxconn
                    ? 'hover:bg-slate-200/60 text-slate-600'
                    : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Nội dung form thao tác của Sub-Tab đang chọn */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-950/40 border-zinc-800'
          }`}
        >
          {activeSubTab === 'undo_reset' && (
            <UndoResetSubTab
              form={undoResetForm}
              setForm={setUndoResetForm}
              isExecuting={isExecutingAction === 'undo_reset'}
              onExecute={executeSubTabAction}
            />
          )}

          {activeSubTab === 'transfer' && (
            <TransferSubTab
              form={transferForm}
              setForm={setTransferForm}
              isExecuting={isExecutingAction === 'transfer'}
              onExecute={executeSubTabAction}
            />
          )}

          {activeSubTab === 'clear_undo' && (
            <ClearUndoSubTab
              form={clearUndoForm}
              setForm={setClearUndoForm}
              isExecuting={isExecutingAction === 'clear_undo'}
              onExecute={executeSubTabAction}
            />
          )}

          {activeSubTab === 'compensate_detail' && (
            <CompensateSnDetailSubTab
              form={compensateForm}
              setForm={setCompensateForm}
              isExecuting={isExecutingAction === 'compensate_detail'}
              onExecute={executeSubTabAction}
            />
          )}

          {activeSubTab === 'change_keypart' && (
            <ChangeKeypartSubTab
              form={changeKeypartForm}
              setForm={setChangeKeypartForm}
              isExecuting={isExecutingAction === 'change_keypart'}
              onExecute={executeSubTabAction}
            />
          )}

          {activeSubTab === 'sndetails' && (
            <SnDetailsSubTab
              detailsList={snDetailsList}
              isExecuting={isExecutingAction === 'sndetails'}
              onRefresh={() => executeSubTabAction('sndetails')}
            />
          )}

          {activeSubTab === 'error_logs' && (
            <ErrorLogsSubTab
              errorLogsList={errorLogsList}
              isExecuting={isExecutingAction === 'error_logs'}
              onRefresh={() => executeSubTabAction('error_logs')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
