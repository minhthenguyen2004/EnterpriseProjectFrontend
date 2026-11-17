import { useTranslation } from "react-i18next";

function FormField({ label, children, isFoxconn, colSpan }) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isFoxconn ? "text-slate-500" : "text-white"}`}>
        {label}
      </label>
      {children}
    </div>
  );
}

function AddEditForm({handleCancelModal, isFoxconn, modalMode, editingId, formData, inputCls, handleFormChange, secondaryBtn, primaryBtn, handleSave, selectCls }) {
    const { t } = useTranslation('carrier');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleCancelModal}>
            <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${isFoxconn ? "bg-white border-slate-200" : "bg-zinc-900 border-zinc-700"}`}
                onClick={(e) => e.stopPropagation()}>
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isFoxconn ? "border-slate-200 bg-slate-50" : "border-zinc-800 bg-zinc-950"}`}>
                <h3 className={`font-bold text-sm ${isFoxconn ? "text-slate-900" : "text-white"}`}>
                    {modalMode === "add" ? t('config.lifecycle.modalAddTitle') : t('config.lifecycle.modalEditTitle', { id: editingId })}
                </h3>
                <button type="button" onClick={handleCancelModal}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isFoxconn ? "hover:bg-slate-200 text-slate-500" : "hover:bg-zinc-800 text-zinc-400"}`}>
                    x
                </button>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[68vh] overflow-y-auto">
                <FormField label={t('config.lifecycle.fieldLine')} isFoxconn={isFoxconn}>
                    <input type="text" placeholder={t('config.lifecycle.fieldLinePlaceholder')} value={formData.lineName}
                    onChange={(e) => handleFormChange("lineName", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldProduct')} isFoxconn={isFoxconn}>
                    <input type="text" placeholder={t('config.lifecycle.fieldProductPlaceholder')} value={formData.productName}
                    onChange={(e) => handleFormChange("productName", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldProductType')} isFoxconn={isFoxconn}>
                    <input type="text" placeholder={t('config.lifecycle.fieldProductTypePlaceholder')} value={formData.productType}
                    onChange={(e) => handleFormChange("productType", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldCarrierType')} isFoxconn={isFoxconn}>
                    <input type="text" placeholder={t('config.lifecycle.fieldCarrierTypePlaceholder')} value={formData.carrierType}
                    onChange={(e) => handleFormChange("carrierType", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldAssignedCode')} isFoxconn={isFoxconn} colSpan>
                    <input type="text" placeholder={t('config.lifecycle.fieldAssignedCodePlaceholder')} value={formData.assignedCarrierCode}
                    onChange={(e) => handleFormChange("assignedCarrierCode", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all font-mono ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldEndStep')} isFoxconn={isFoxconn}>
                    <input type="text" placeholder={t('config.lifecycle.fieldEndStepPlaceholder')} value={formData.endStep}
                    onChange={(e) => handleFormChange("endStep", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldStatus')} isFoxconn={isFoxconn}>
                    <select value={formData.isActive ? "ACTIVE" : "DISABLED"}
                    onChange={(e) => handleFormChange("isActive", e.target.value === "ACTIVE")}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer transition-all ${selectCls}`}>
                    <option value="ACTIVE">{t('config.lifecycle.statusActive')}</option>
                    <option value="DISABLED">{t('config.lifecycle.statusDisabled')}</option>
                    </select>
                </FormField>
                <FormField label={t('config.lifecycle.fieldMaxCycles')} isFoxconn={isFoxconn}>
                    <input type="number" min="1" value={formData.maxCycles}
                    onChange={(e) => handleFormChange("maxCycles", Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
                    <span className={`text-[10px] ${ isFoxconn ? "text-gray" : "text-amber-50" }`}>{t('config.lifecycle.fieldMaxCyclesHint')}</span>
                </FormField>
                
                <FormField label={t('config.lifecycle.fieldWarningCycles')} isFoxconn={isFoxconn}>
                    <input type="number" min="1" value={formData.warningCycles}
                    onChange={(e) => handleFormChange("warningCycles", Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
                    <span className={`text-[10px] ${ isFoxconn ? "text-gray" : "text-amber-50" }`}>{t('config.lifecycle.fieldWarningCyclesHint')}</span>
                </FormField>
                <FormField label={t('config.lifecycle.fieldMaxInspectionHours')} isFoxconn={isFoxconn}>
                    <input type="number" min="1" value={formData.maxInspectionHours}
                    onChange={(e) => handleFormChange("maxInspectionHours", Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
                    <span className={`text-[10px] ${ isFoxconn ? "text-gray" : "text-amber-50" }`}>{t('config.lifecycle.fieldMaxInspectionHoursHint')}</span>
                </FormField>
                <FormField label={t('config.lifecycle.fieldFixedInspectionHours')} isFoxconn={isFoxconn}>
                    <input type="number" min="1" value={formData.fixedInspectionHours}
                    onChange={(e) => handleFormChange("fixedInspectionHours", Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
                </FormField>
                <FormField label={t('config.lifecycle.fieldNote')} isFoxconn={isFoxconn}>
                    <input type="text" value={formData.note}
                    onChange={(e) => handleFormChange("note", e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border outline-none focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
                </FormField>
                </div>
                <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isFoxconn ? "border-slate-200 bg-slate-50" : "border-zinc-800 bg-zinc-950"}`}>
                <button type="button" onClick={handleCancelModal}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${secondaryBtn}`}>
                    {t('config.lifecycle.btnCancel')}
                </button>
                <button type="button" onClick={handleSave}
                    className={`px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md ${primaryBtn}`}>
                    {modalMode === "add" ? t('config.lifecycle.btnSubmitAdd') : t('config.lifecycle.btnSubmitEdit')}
                </button>
                </div>
            </div>
        </div>
    )
}

export default AddEditForm