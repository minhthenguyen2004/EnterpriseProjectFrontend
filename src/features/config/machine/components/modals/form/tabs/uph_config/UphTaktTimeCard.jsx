import { useState, useEffect } from 'react';

/**
 * Khung cấu hình UPH & TAKT TIME CONFIGURATION (Card 1 của Tab 4)
 * Bao gồm:
 * - 3 trường nhập số xếp theo hàng ngang: Target UPH (p/h), Target Cycle Time (sec), Warning Tolerance (%)
 * - Cơ chế tự động tính liên động giữa Target UPH và Target Cycle Time (3600 / UPH)
 * - Nút viên thuốc (Pill Button) "Enable UPH Monitoring" ở góc trái
 * - Nút "Save UPH Config" ở góc phải
 */
export default function UphTaktTimeCard({
  uphConfig = {},
  onSave,
  isFoxconn = false
}) {
  const [formState, setFormState] = useState({
    targetUph: uphConfig.targetUph ?? 120,
    targetCycleTime: uphConfig.targetCycleTime ?? 30.0,
    warningTolerance: uphConfig.warningTolerance ?? 5.0,
    enableUphMonitoring: uphConfig.enableUphMonitoring ?? true
  });

  const [errors, setErrors] = useState({});

  // Cập nhật khi prop từ bên ngoài thay đổi
  useEffect(() => {
    setFormState({
      targetUph: uphConfig.targetUph ?? 120,
      targetCycleTime: uphConfig.targetCycleTime ?? 30.0,
      warningTolerance: uphConfig.warningTolerance ?? 5.0,
      enableUphMonitoring: uphConfig.enableUphMonitoring ?? true
    });
  }, [uphConfig]);

  // Xử lý khi thay đổi Target UPH: tự động tính lại Target Cycle Time (3600 / UPH)
  const handleUphChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setFormState(prev => ({ ...prev, targetUph: '', targetCycleTime: '' }));
      return;
    }

    const uphNum = parseFloat(rawVal);
    if (!isNaN(uphNum) && uphNum > 0) {
      const calculatedCycleTime = parseFloat((3600 / uphNum).toFixed(2));
      setFormState(prev => ({
        ...prev,
        targetUph: uphNum,
        targetCycleTime: calculatedCycleTime
      }));
      if (errors.targetUph) {
        setErrors(prev => ({ ...prev, targetUph: undefined }));
      }
    } else {
      setFormState(prev => ({ ...prev, targetUph: rawVal }));
    }
  };

  // Xử lý khi thay đổi Target Cycle Time: tự động tính ngược lại Target UPH (3600 / Cycle Time)
  const handleCycleTimeChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setFormState(prev => ({ ...prev, targetCycleTime: '', targetUph: '' }));
      return;
    }

    const ctNum = parseFloat(rawVal);
    if (!isNaN(ctNum) && ctNum > 0) {
      const calculatedUph = Math.round(3600 / ctNum);
      setFormState(prev => ({
        ...prev,
        targetCycleTime: ctNum,
        targetUph: calculatedUph
      }));
      if (errors.targetCycleTime) {
        setErrors(prev => ({ ...prev, targetCycleTime: undefined }));
      }
    } else {
      setFormState(prev => ({ ...prev, targetCycleTime: rawVal }));
    }
  };

  // Xử lý thay đổi Warning Tolerance (%)
  const handleToleranceChange = (e) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setFormState(prev => ({ ...prev, warningTolerance: '' }));
      return;
    }

    const tolNum = parseFloat(rawVal);
    setFormState(prev => ({
      ...prev,
      warningTolerance: isNaN(tolNum) ? rawVal : tolNum
    }));
    if (errors.warningTolerance) {
      setErrors(prev => ({ ...prev, warningTolerance: undefined }));
    }
  };

  // Bật / Tắt nút hình viên thuốc Enable UPH Monitoring
  const handleToggleMonitoring = () => {
    setFormState(prev => ({
      ...prev,
      enableUphMonitoring: !prev.enableUphMonitoring
    }));
  };

  // Kiểm tra tính hợp lệ và gọi onSave
  const handleSave = () => {
    const errs = {};
    const uphNum = parseFloat(formState.targetUph);
    const ctNum = parseFloat(formState.targetCycleTime);
    const tolNum = parseFloat(formState.warningTolerance);

    if (isNaN(uphNum) || uphNum <= 0) {
      errs.targetUph = 'Target UPH phải là số nguyên dương > 0';
    }
    if (isNaN(ctNum) || ctNum <= 0) {
      errs.targetCycleTime = 'Target Cycle Time phải là số dương > 0';
    }
    if (isNaN(tolNum) || tolNum < 0 || tolNum > 100) {
      errs.warningTolerance = 'Dung sai cảnh báo từ 0% đến 100%';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (onSave) {
      onSave({
        targetUph: uphNum,
        targetCycleTime: ctNum,
        warningTolerance: tolNum,
        enableUphMonitoring: Boolean(formState.enableUphMonitoring)
      });
    }
  };

  const isEnabled = Boolean(formState.enableUphMonitoring);

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200'
          : 'bg-zinc-950/80 border-zinc-800'
      }`}
    >
      {/* Tiêu đề Khung cấu hình */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">⏱️</span>
          <h3
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-900' : 'text-zinc-100'
            }`}
          >
            UPH & TAKT TIME CONFIGURATION
          </h3>
        </div>
        <div
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${
            isFoxconn
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-zinc-900 text-[#76B900] border-[#76B900]/40'
          }`}
        >
          Auto Formula: <span className="font-bold">Takt Time = 3600 / Target UPH</span>
        </div>
      </div>

      {/* Hàng 1: 3 trường nhập số xếp theo hàng ngang */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-5">
        {/* Trường 1: Target UPH (p/h) */}
        <div>
          <label
            htmlFor="targetUphInput"
            className={`block text-xs font-bold mb-1.5 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Target UPH (p/h) <span className="text-rose-500 font-black">*</span>
          </label>
          <div className="relative">
            <input
              id="targetUphInput"
              type="number"
              min="1"
              step="1"
              placeholder="VD: 120"
              value={formState.targetUph}
              onChange={handleUphChange}
              className={`w-full px-3.5 py-2.5 text-sm font-mono font-black rounded-xl border transition-all outline-none ${
                errors.targetUph
                  ? 'border-rose-500 bg-rose-50/40 text-rose-700'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50 text-blue-700 hover:bg-slate-100/80'
                  : 'border-zinc-800 bg-zinc-900 placeholder:text-zinc-500 hover:bg-zinc-850'
              }`}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold pointer-events-none select-none ${
                isFoxconn ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              p/h
            </span>
          </div>
          <p
            className={`text-[11px] mt-1 ${
              errors.targetUph
                ? 'text-rose-500 font-medium'
                : isFoxconn
                ? 'text-slate-500'
                : 'text-zinc-400'
            }`}
          >
            {errors.targetUph || 'Sản lượng mục tiêu trên 1 giờ (cái/giờ)'}
          </p>
        </div>

        {/* Trường 2: Target Cycle Time (sec) */}
        <div>
          <label
            htmlFor="targetCycleTimeInput"
            className={`block text-xs font-bold mb-1.5 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Target Cycle Time (sec)
          </label>
          <div className="relative">
            <input
              id="targetCycleTimeInput"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="VD: 30.00"
              value={formState.targetCycleTime}
              onChange={handleCycleTimeChange}
              className={`w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border transition-all outline-none ${
                errors.targetCycleTime
                  ? 'border-rose-500 bg-rose-50/40 text-rose-700'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100/80'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-850'
              }`}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold pointer-events-none select-none ${
                isFoxconn ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              sec
            </span>
          </div>
          <p
            className={`text-[11px] mt-1 ${
              errors.targetCycleTime
                ? 'text-rose-500 font-medium'
                : isFoxconn
                ? 'text-slate-500'
                : 'text-zinc-400'
            }`}
          >
            {errors.targetCycleTime || 'Tự động tính: 3600 / Target UPH'}
          </p>
        </div>

        {/* Trường 3: Warning Tolerance (%) */}
        <div>
          <label
            htmlFor="warningToleranceInput"
            className={`block text-xs font-bold mb-1.5 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-300'
            }`}
          >
            Warning Tolerance (%)
          </label>
          <div className="relative">
            <input
              id="warningToleranceInput"
              type="number"
              min="0"
              max="100"
              step="0.5"
              placeholder="VD: 5.0"
              value={formState.warningTolerance}
              onChange={handleToleranceChange}
              className={`w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border transition-all outline-none ${
                errors.warningTolerance
                  ? 'border-rose-500 bg-rose-50/40 text-rose-700'
                  : isFoxconn
                  ? 'border-slate-200 bg-slate-50 text-amber-700 hover:bg-slate-100/80'
                  : 'border-zinc-800 bg-zinc-900 text-amber-400 hover:bg-zinc-850'
              }`}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold pointer-events-none select-none ${
                isFoxconn ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              %
            </span>
          </div>
          <p
            className={`text-[11px] mt-1 ${
              errors.warningTolerance
                ? 'text-rose-500 font-medium'
                : isFoxconn
                ? 'text-slate-500'
                : 'text-zinc-400'
            }`}
          >
            {errors.warningTolerance || 'Dung sai cảnh báo dao động OEE'}
          </p>
        </div>
      </div>

      {/* Hàng 2: Hàng điều khiển bên dưới 3 ô nhập */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-zinc-800">
        {/* Nút hình viên thuốc Enable UPH Monitoring nằm bên trái */}
        <button
          type="button"
          onClick={handleToggleMonitoring}
          aria-pressed={isEnabled}
          className={`rounded-full px-4 py-2 border select-none transition-all cursor-pointer flex items-center gap-2.5 text-xs font-bold ${
            isEnabled
              ? isFoxconn
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs hover:bg-emerald-100/80'
                : 'bg-zinc-900 text-[#76B900] border-[#76B900]/60 shadow-[0_0_12px_rgba(118,185,0,0.25)] hover:bg-zinc-850'
              : isFoxconn
              ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/70'
              : 'bg-zinc-900/60 text-zinc-500 border-zinc-800 hover:bg-zinc-850'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              isEnabled
                ? 'bg-emerald-500 animate-pulse ring-2 ring-emerald-400/40'
                : 'bg-slate-400 dark:bg-zinc-600'
            }`}
          />
          <span className="font-mono text-[11px] opacity-80">
            {isEnabled ? '[ (●) Enabled ]' : '[ (○) Disabled ]'}
          </span>
          <span>Enable UPH Monitoring</span>
        </button>

        {/* Nút Save UPH Config ở bên phải */}
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-xl px-5 py-2.5 text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-all active:scale-[0.98] ${
            isFoxconn
              ? 'bg-[#002766] text-white hover:bg-blue-900 shadow-blue-900/20'
              : 'bg-[#76B900] text-black hover:bg-[#86D400] font-black shadow-[#76B900]/20'
          }`}
        >
          <span>💾</span>
          <span>Save UPH Config</span>
        </button>
      </div>
    </div>
  );
}
