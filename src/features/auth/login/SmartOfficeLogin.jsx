import { useForm } from 'react-hook-form';
import TextInput from '../../../components/common/TextInput';

export default function SmartOfficeLogin({ dispatch, setLoader, navigate }) {
  const {
    control: smartControl,
    handleSubmit: handleSmartSubmit,
    formState: { isSubmitting: isSmartSubmitting },
  } = useForm({
    defaultValues: {
      smartCardId: '',
      officeCode: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  });

  const onSmartOfficeLogin = async (data) => {
    try {
      if (setLoader) setLoader(true);
      // Simulate Smart Office SSO authentication
      setTimeout(() => {
        if (setLoader) setLoader(false);
        if (navigate) navigate('/models');
      }, 800);
    } catch (err) {
      if (setLoader) setLoader(false);
      console.error('Smart Office Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSmartSubmit(onSmartOfficeLogin)} noValidate>
      <TextInput
        name="smartCardId"
        control={smartControl}
        label="Smart Office Card ID"
        placeholder="Nhập mã thẻ Smart Office (VD: SO-8899)"
        rules={{
          required: 'Vui lòng nhập mã thẻ Smart Office',
        }}
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        }
      />

      <TextInput
        name="officeCode"
        control={smartControl}
        label="Office Code / Mã phòng ban"
        placeholder="Nhập mã phòng ban (Tùy chọn)"
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
            />
          </svg>
        }
      />

      <div className="flex items-center justify-between mt-1 mb-6 text-xs sm:text-sm">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-slate-900">
          <input
            type="checkbox"
            id="rememberSmartOffice"
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
          />
          <span>Remember me</span>
        </label>

        <span className="text-xs text-slate-400">SSO Enterprise</span>
      </div>


      <button
        type="submit"
        disabled={isSmartSubmitting}
        className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSmartSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Đang kết nối Smart Office...</span>
          </>
        ) : (
          <span>Connect with Smart Office</span>
        )}
      </button>
    </form>
  );
}
