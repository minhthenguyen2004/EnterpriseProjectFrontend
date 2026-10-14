import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import NormalLogin from './NormalLogin';
import SmartOfficeLogin from './SmartOfficeLogin';
import loginBg from '../../../assets/images/login_image.webp';
import company_logo from '../../../assets/images/company_logo.webp';
import { useDispatch } from 'react-redux';



export default function Login() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Login method tab state: 'account' | 'smart_office'
  const [loginMethod, setLoginMethod] = useState('account');

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />

      
      <div className="relative z-10 w-full max-w-115 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 sm:p-8 transition-all duration-300">

        
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={company_logo}
              alt="Foxconn Industrial Internet Logo"
              className="h-11 sm:h-12 w-auto max-w-55 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            MANAGEMENT SYSTEM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Vui lòng chọn hình thức và nhập thông tin để tiếp tục
          </p>
        </div>

        
        <div className="grid grid-cols-2 p-1.5 mb-6 bg-slate-100/90 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setLoginMethod('account')}
            className={`py-2.5 px-3 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer text-center text-blue-600 ${
              loginMethod === 'account'
                ? 'bg-white shadow-md shadow-slate-200/60 font-bold'
                : 'hover:bg-slate-200/50 opacity-80 hover:opacity-100 font-semibold'
            }`}
          >
            Login your account
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('smart_office')}
            className={`py-2.5 px-3 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer text-center text-blue-600 ${
              loginMethod === 'smart_office'
                ? 'bg-white shadow-md shadow-slate-200/60 font-bold'
                : 'hover:bg-slate-200/50 opacity-80 hover:opacity-100 font-semibold'
            }`}
          >
            Login Smart Office
          </button>
        </div>

        
        {loginMethod === 'account' ? (
          <NormalLogin dispatch={dispatch} setLoader={setLoader} navigate={navigate} />
        ) : (
          <SmartOfficeLogin dispatch={dispatch} setLoader={setLoader} navigate={navigate} />
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Enterprise Management System © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
