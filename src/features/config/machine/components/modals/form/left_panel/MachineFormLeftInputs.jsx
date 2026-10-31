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
  const isEdit = mode === 'edit';
  const displaySubmitText = submitButtonText || (isEdit ? 'Update Machine' : 'Create Machine');

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
            Thông Tin Cơ Bản Trạm Máy
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-800 text-zinc-400'
          }`}>
            12 Fields
          </span>
        </div>

        {/* 1. Customer */}
        {renderTextInput({
          name: 'customer',
          label: 'Customer (Khách hàng)',
          placeholder: 'VD: NVIDIA, Foxconn, Apple...',
          value: formData.customer,
          listId: 'customer-suggestions',
          suggestions: SUGGESTED_CUSTOMERS
        })}

        {/* 2. Factory */}
        {renderTextInput({
          name: 'factory',
          label: 'Factory (Nhà máy)',
          placeholder: 'VD: Nhà máy F01 - Bắc Ninh...',
          value: formData.factory,
          listId: 'factory-suggestions',
          suggestions: SUGGESTED_FACTORIES
        })}

        {/* 3. Floor */}
        {renderTextInput({
          name: 'floor',
          label: 'Floor (Tầng xưởng)',
          placeholder: 'VD: 1F, 2F, 3F...',
          value: formData.floor,
          listId: 'floor-suggestions',
          suggestions: SUGGESTED_FLOORS
        })}

        {/* 4. Line */}
        {renderTextInput({
          name: 'line',
          label: 'Line (Chuyền sản xuất)',
          placeholder: 'VD: Line 01 - High-Speed SMT...',
          value: formData.line || formData.lineName
        })}

        {/* 5. Product Name */}
        {renderTextInput({
          name: 'productName',
          label: 'Product Name (Tên sản phẩm)',
          placeholder: 'VD: NVIDIA HGX B200...',
          value: formData.productName,
          listId: 'prodname-suggestions',
          suggestions: SUGGESTED_PRODUCT_NAMES
        })}

        {/* 6. Product Type */}
        {renderTextInput({
          name: 'productType',
          label: 'Product Type (Loại sản phẩm)',
          placeholder: 'VD: AI GPU Accelerator Board...',
          value: formData.productType,
          listId: 'prodtype-suggestions',
          suggestions: SUGGESTED_PRODUCT_TYPES
        })}

        {/* 7. Group Name */}
        {renderTextInput({
          name: 'groupName',
          label: 'Group Name (Nhóm máy)',
          placeholder: 'VD: SMT Surface Mount Group A...',
          value: formData.groupName,
          listId: 'group-suggestions',
          suggestions: SUGGESTED_GROUPS
        })}

        {/* 8. Machine Name (*) */}
        {renderTextInput({
          name: 'machineName',
          label: 'Machine Name (Tên máy)',
          placeholder: 'Nhập tên định danh máy (* Bắt buộc)...',
          value: formData.machineName,
          isRequired: true
        })}

        {/* 9. IP Address (*) */}
        {renderTextInput({
          name: 'stationIp',
          label: 'IP Address (Địa chỉ IP trạm)',
          placeholder: '192.168.10.xxx (* Bắt buộc IPv4)...',
          value: formData.stationIp,
          isRequired: true,
          isMono: true
        })}

        {/* 10. Host Name (*) */}
        {renderTextInput({
          name: 'hostName',
          label: 'Host Name (Tên Host mạng)',
          placeholder: 'smt-mnt-01.fii.foxconn.com (* Bắt buộc)...',
          value: formData.hostName,
          isRequired: true,
          isMono: true
        })}

        {/* 11. Step */}
        {renderTextInput({
          name: 'step',
          label: 'Step (Công đoạn sản xuất)',
          placeholder: 'Nhập mã/tên bước (vd: ST01 - Pick & Place...)',
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
            Description (Mô tả trạm máy)
          </label>
          <textarea
            id="left-input-description"
            rows="2"
            name="description"
            value={formData.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Ghi chú chi tiết về trạm máy, chức năng hoạt động hoặc lưu ý bảo trì..."
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
          Hủy Bỏ
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
