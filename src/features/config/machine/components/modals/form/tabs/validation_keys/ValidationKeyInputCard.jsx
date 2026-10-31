import { useId } from 'react';;
import TextInput from './TextInput';
import TickInput from './TickInput';

export default function ValidationKeyInputCard({
  keyForm,
  formErrors,
  editingId,
  defaultStepCode,
  isFoxconn,
  onFieldChange,
  onCancel,
  onSave
}) {
  const formUid = useId();

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200 shadow-xs'
          : 'bg-zinc-950/80 border-zinc-800 shadow-inner'
      }`}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{editingId ? '✏️' : '➕'}</span>
          <span
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            {editingId ? 'Chỉnh Sửa Key Config' : 'Thêm Key Config Mới (Validation Key)'}
          </span>
          {editingId && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold">
              Đang Sửa
            </span>
          )}
        </div>
        <span
          className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
            isFoxconn
              ? 'bg-slate-50 text-slate-600 border-slate-200'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
          }`}
        >
          Step: {defaultStepCode}
        </span>
      </div>

      {/* Hàng 1: Các trường text xếp theo hàng ngang (Key Name, Display Name, Value Type) */}
      <TextInput
        formUid={formUid}
        formErrors={formErrors}
        keyForm={keyForm}
        onFieldChange={onFieldChange}
        isFoxconn={isFoxconn}
      />

      {/* Hàng 2: Góc bên trái là các nút tick tùy chọn; Góc bên phải là Cancel & Save */}
      <TickInput
        keyForm={keyForm}
        formErrors={formErrors}
        editingId={editingId}
        defaultStepCode={defaultStepCode}
        isFoxconn={isFoxconn}
        onFieldChange={onFieldChange}
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
}
