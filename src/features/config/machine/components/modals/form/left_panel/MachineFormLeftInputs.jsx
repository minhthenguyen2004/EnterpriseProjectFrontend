import { useTranslation } from 'react-i18next';
import {
  SUGGESTED_CUSTOMERS,
  SUGGESTED_FACTORIES,
  SUGGESTED_FLOORS,
  SUGGESTED_PRODUCT_NAMES,
  SUGGESTED_PRODUCT_TYPES,
  SUGGESTED_GROUPS,
  SUGGESTED_STEPS
} from '../constants/formModalConstants';

export default function MachineFormLeftInputs({
  formData,
  errors,
  onChange,
  mode = 'create',
  submitButtonText,
  onClose,
  onSubmit,
  isFoxconn
}) {
  const { t } = useTranslation('machine');
  const isEdit = mode === 'edit';
  const displaySubmitText = submitButtonText || (isEdit ? t('modals.form.btnUpdate') : t('modals.form.btnCreate'));

  // Helper render text input field with optional datalist
  const renderTextInput = ({
    name,
    label,
    placeholder,
    value,
    isRequired = false,
    listId,
    suggestions = [],
    isMono = false,
    type = 'text'
  }) => {
    const errorMsg = errors[name];

    return (
      <div className="space-y-1">
        <label
          htmlFor={`left-input-${name}`}
          className={`flex items-center justify-between text-[11px] font-bold ${
            isFoxconn ? 'text-slate-700' : 'text-zinc-300'
          }`}
        >
          <span className="flex items-center gap-1">
            {label}
            {isRequired && <span className="text-rose-500 font-black">*</span>}
          </span>
          {errorMsg && (
            <span className="text-[10px] font-bold text-rose-500 animate-pulse">
              {errorMsg}
            </span>
          )}
        </label>

        <div className="relative">
          <input
            id={`left-input-${name}`}
            type={type}
            name={name}
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            list={listId}
            className={`w-full px-3 py-2 rounded-xl text-xs transition-all outline-none border ${
              isMono ? 'font-mono' : ''
            } ${
              errorMsg
                ? 'border-rose-400 bg-rose-50 text-rose-800'
                : isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-950/80 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
        </div>

        {listId && suggestions.length > 0 && (
          <datalist id={listId}>
            {suggestions.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Scrollable list of 12 fields */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 max-h-[calc(92vh-175px)]">
        <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200/60 dark:border-zinc-800/60">
          <span className={`text-xs font-black uppercase tracking-wider ${
            isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
          }`}>
            {t('modals.form.basicInfoTitle')}
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {t('modals.form.fieldCount')}
          </span>
        </div>

        {/* 1. Customer */}
        {renderTextInput({
          name: 'customer',
          label: t('modals.form.fields.customer'),
          placeholder: t('modals.form.fields.customerPlaceholder'),
          value: formData.customer,
          listId: 'customer-suggestions',
          suggestions: SUGGESTED_CUSTOMERS
        })}

        {/* 2. Factory */}
        {renderTextInput({
          name: 'factory',
          label: t('modals.form.fields.factory'),
          placeholder: t('modals.form.fields.factoryPlaceholder'),
          value: formData.factory,
          listId: 'factory-suggestions',
          suggestions: SUGGESTED_FACTORIES
        })}

        {/* 3. Floor */}
        {renderTextInput({
          name: 'floor',
          label: t('modals.form.fields.floor'),
          placeholder: t('modals.form.fields.floorPlaceholder'),
          value: formData.floor,
          listId: 'floor-suggestions',
          suggestions: SUGGESTED_FLOORS
        })}

        {/* 4. Line */}
        {renderTextInput({
          name: 'line',
          label: t('modals.form.fields.line'),
          placeholder: t('modals.form.fields.linePlaceholder'),
          value: formData.line || formData.lineName
        })}

        {/* 5. Product Name */}
        {renderTextInput({
          name: 'productName',
          label: t('modals.form.fields.productName'),
          placeholder: t('modals.form.fields.productNamePlaceholder'),
          value: formData.productName,
          listId: 'prodname-suggestions',
          suggestions: SUGGESTED_PRODUCT_NAMES
        })}

        {/* 6. Product Type */}
        {renderTextInput({
          name: 'productType',
          label: t('modals.form.fields.productType'),
          placeholder: t('modals.form.fields.productTypePlaceholder'),
          value: formData.productType,
          listId: 'prodtype-suggestions',
          suggestions: SUGGESTED_PRODUCT_TYPES
        })}

        {/* 7. Group Name */}
        {renderTextInput({
          name: 'groupName',
          label: t('modals.form.fields.groupName'),
          placeholder: t('modals.form.fields.groupNamePlaceholder'),
          value: formData.groupName,
          listId: 'group-suggestions',
          suggestions: SUGGESTED_GROUPS
        })}

        {/* 8. Machine Name (*) */}
        {renderTextInput({
          name: 'machineName',
          label: t('modals.form.fields.machineName'),
          placeholder: t('modals.form.fields.machineNamePlaceholder'),
          value: formData.machineName,
          isRequired: true
        })}

        {/* 9. IP Address (*) */}
        {renderTextInput({
          name: 'stationIp',
          label: t('modals.form.fields.stationIp'),
          placeholder: t('modals.form.fields.stationIpPlaceholder'),
          value: formData.stationIp,
          isRequired: true,
          isMono: true
        })}

        {/* 10. Host Name (*) */}
        {renderTextInput({
          name: 'hostName',
          label: t('modals.form.fields.hostName'),
          placeholder: t('modals.form.fields.hostNamePlaceholder'),
          value: formData.hostName,
          isRequired: true,
          isMono: true
        })}

        {/* 11. Step */}
        {renderTextInput({
          name: 'step',
          label: t('modals.form.fields.step'),
          placeholder: t('modals.form.fields.stepPlaceholder'),
          value: formData.step,
          listId: 'step-suggestions',
          suggestions: SUGGESTED_STEPS
        })}

        {/* 12. Description */}
        <div className="space-y-1">
          <label
            htmlFor="left-input-description"
            className={`block text-[11px] font-bold ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            {t('modals.form.fields.description')}
          </label>
          <textarea
            id="left-input-description"
            rows="2"
            name="description"
            value={formData.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder={t('modals.form.fields.descriptionPlaceholder')}
            className={`w-full px-3 py-2 rounded-xl text-xs transition-all outline-none border resize-none ${
              isFoxconn
                ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                : 'border-zinc-800 bg-zinc-950/80 text-zinc-100 hover:bg-zinc-900'
            }`}
          />
        </div>
      </div>

      {/* Cụm nút bấm ở cuối cột 1/3 (Sticky Footer of Left Column) */}
      <div className={`pt-3 mt-3 border-t flex items-center gap-2 ${
        isFoxconn ? 'border-slate-200' : 'border-zinc-800'
      }`}>
        <button
          type="button"
          onClick={onClose}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
            isFoxconn
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
          }`}
        >
          {t('modals.form.btnCancel')}
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md active:scale-[0.99] ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{displaySubmitText}</span>
        </button>
      </div>
    </div>
  );
}
