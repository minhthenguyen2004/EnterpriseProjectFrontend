import { useState } from 'react';
import { useController } from 'react-hook-form';

/**
 * Reusable TextInput component tích hợp với useController từ React Hook Form
 *
 * @param {Object} props
 * @param {string} props.name - Tên trường form (bắt buộc)
 * @param {Object} props.control - Đối tượng control từ useForm() (bắt buộc)
 * @param {string} [props.label] - Nhãn hiển thị phía trên input
 * @param {Object} [props.rules] - Validation rules (required, minLength, pattern...)
 * @param {*} [props.defaultValue=''] - Giá trị khởi tạo
 * @param {string} [props.helperText] - Dòng hướng dẫn bên dưới khi không có lỗi
 * @param {string} [props.type='text'] - Loại input ('text', 'password', 'email',...)
 * @param {string} [props.placeholder=''] - Văn bản gợi ý placeholder
 * @param {boolean} [props.disabled=false] - Vô hiệu hóa input
 * @param {React.ReactNode} [props.leftIcon] - Icon bên trái input
 * @param {React.ReactNode} [props.rightIcon] - Icon bên phải input
 * @param {boolean} [props.showPasswordToggle=true] - Tự động hiển thị nút ẩn/hiện mật khẩu
 * @param {string} [props.className=''] - Class tùy biến cho thẻ input
 * @param {string} [props.containerClassName=''] - Class tùy biến cho container bọc ngoài
 */


const TextInput = ({
  name,
  control,
  label,
  rules,
  defaultValue = '',
  helperText,
  type = 'text',
  placeholder = '',
  disabled = false,
  leftIcon,
  rightIcon,
  showPasswordToggle = true,
  className = '',
  containerClassName = '',
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`flex flex-col w-full text-left mb-4 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 text-xs font-semibold tracking-wide text-slate-700"
        >
          {label} {rules?.required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center w-full">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          {...restProps}
          className={`
            w-full rounded-xl border bg-white/80 py-3 text-sm text-slate-900
            outline-none transition-all duration-200 [&::-ms-clear]:hidden
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${isPassword && showPasswordToggle ? 'pr-11' : rightIcon ? 'pr-10' : 'pr-4'}
            ${
              error
                ? 'border-red-400 focus:ring-4 focus:ring-red-100 bg-red-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:ring-4 focus:ring-blue-100'
            }
            ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : ''}
            ${className}
          `}
        />

        {/* Nút ẩn / hiện mật khẩu */}
        {isPassword && showPasswordToggle && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-1 cursor-pointer"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}

        {/* Right Icon tuỳ chỉnh */}
        {rightIcon && !isPassword && (
          <div className="absolute right-3.5 flex items-center text-slate-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Thông báo lỗi */}
      {error && (
        <span className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fadeIn">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </span>
      )}

      {/* Helper text khi không có lỗi */}
      {!error && helperText && (
        <span className="text-slate-500 text-xs mt-1.5">{helperText}</span>
      )}
    </div>
  );
};

export default TextInput;