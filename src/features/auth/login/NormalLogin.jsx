import { useForm } from "react-hook-form";
import TextInput from "../../../components/common/TextInput";
import toast from "react-hot-toast";
import { authenticateSignInUser } from "../../../store/action";

function NormalLogin({ dispatch, setLoader, navigate }) {

    const {
        control: accountControl,
        handleSubmit: handleAccountSubmit,
        reset,
        formState: { isSubmitting: isAccountSubmitting },
        } = useForm({
           defaultValues: {
            cardId: '',
            password: '',
          },
        mode: 'onTouched',
        });

    const onAccountLogin = (data) => {
      dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };


    return (
        <form onSubmit={handleAccountSubmit(onAccountLogin)} noValidate>
            <TextInput
              name="cardId"
              control={accountControl}
              label="Card ID"
              placeholder="Nhập mã thẻ nhân viên / Card ID"
              rules={{
                required: 'Vui lòng nhập Card ID',
                minLength: {
                  value: 3,
                  message: 'Card ID tối thiểu 3 ký tự',
                },
              }}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              }
            />


            <TextInput
              name="password"
              control={accountControl}
              type="password"
              label="Password"
              placeholder="Nhập mật khẩu"
              rules={{
                required: 'Vui lòng nhập mật khẩu',
                minLength: {
                  value: 8,
                  message: 'Mật khẩu phải từ 8 ký tự trở lên',
                },
              }}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />


            <div className="flex items-center justify-between mt-1 mb-6 text-xs sm:text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <a
                href="#forgot-password"
                onClick={(e) => e.preventDefault()}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>


            <button
              type="submit"
              disabled={isAccountSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAccountSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <span>Sign In to Your Account</span>
              )}
            </button>
          </form>
  )
}

export default NormalLogin