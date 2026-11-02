import useTheme from '../../../../../../hooks/useTheme';

/**
 * Cấu Hình Chính Sách Cưỡng Chế Khóa Tự Động & Dung Sai (Auto-Lock Policy)
 */
export default function CarrierAutoLockPolicy({ policy, onUpdatePolicy, onNotify }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleToggle = (key) => {
    const updated = {
      ...policy,
      [key]: !policy[key],
    };
    onUpdatePolicy(updated);
    if (onNotify) {
      onNotify('Đã cập nhật chính sách an toàn AutoLine khay chứa');
    }
  };

  const handleChangeNumber = (key, value) => {
    const updated = {
      ...policy,
      [key]: Number(value),
    };
    onUpdatePolicy(updated);
  };

  const policies = [
    {
      key: 'autoLockOnMaxCycles',
      label: 'Cưỡng chế Khóa tự động khi đạt 100% chu kỳ định mức',
      desc: 'Khi khay chứa đạt đủ số lượt vận hành tối đa, hệ thống ngay lập tức chuyển trạng thái LOCKED và kích hoạt PLC chặn nạp bo mạch GPU.',
      checked: policy.autoLockOnMaxCycles,
    },
    {
      key: 'autoLockOnInspectionOverdue',
      label: 'Tự động Khóa khi quá hạn kiểm định định kỳ (>720 giờ / 30 ngày)',
      desc: 'Ngăn chặn phát sinh lỗi dung sai do lão hóa vật liệu khay sau thời gian dài luân chuyển trên băng chuyền.',
      checked: policy.autoLockOnInspectionOverdue,
    },
    {
      key: 'autoLockOnCoplanarityFail',
      label: 'Khóa tức thì khi phát hiện độ phẳng (Coplanarity) vượt ngưỡng dung sai',
      desc: 'Cảm biến Laser 3D tại trạm kiểm định phát hiện cong vênh khay sẽ gửi tín hiệu khóa cưỡng bức.',
      checked: policy.autoLockOnCoplanarityFail,
    },
    {
      key: 'enablePlcRejectSignal',
      label: 'Tích hợp tín hiệu loại bỏ khay tự động sang làn bảo dưỡng (PLC Diverter)',
      desc: 'Đầu đọc RFID tại trạm chia làn nhận mã LOCKED sẽ kích hoạt xylanh đẩy khay ra Maintenance Buffer Track.',
      checked: policy.enablePlcRejectSignal,
    },
    {
      key: 'requireQcSignOffToUnlock',
      label: 'Bắt buộc Chữ ký số / Mã nhân sự QC để Mở khóa (Unlock Protocol)',
      desc: 'Không cho phép mở khóa thủ công tùy tiện nếu chưa có biên bản đo kiểm định đạt yêu cầu dung sai.',
      checked: policy.requireQcSignOffToUnlock,
    },
  ];

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'
      }`}
    >
      <div className="mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <span>Chính Sách Cưỡng Chế Khóa Tự Động & An Toàn Băng Chuyền (Auto-Lock Policies)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
          Quy chuẩn phản ứng thời gian thực giữa Hệ thống Quản trị Khay chứa và PLC trạm AutoLine.
        </p>
      </div>

      <div className="space-y-3">
        {policies.map((p) => (
          <div
            key={p.key}
            onClick={() => handleToggle(p.key)}
            className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer select-none ${
              p.checked
                ? isFoxconn
                  ? 'bg-blue-50/50 border-blue-200'
                  : 'bg-[#76B900]/10 border-[#76B900]/30'
                : isFoxconn
                ? 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                : 'bg-zinc-950/50 border-zinc-800 hover:bg-zinc-800/40'
            }`}
          >
            <input
              type="checkbox"
              checked={p.checked}
              onChange={() => {}} // Controlled via parent div onClick
              className={`mt-1 w-4 h-4 rounded cursor-pointer ${
                isFoxconn ? 'text-blue-600 focus:ring-blue-500' : 'text-[#76B900] focus:ring-[#76B900]'
              }`}
            />
            <div className="flex-1">
              <div
                className={`font-semibold text-xs ${
                  p.checked
                    ? isFoxconn
                      ? 'text-blue-950'
                      : 'text-[#76B900]'
                    : isFoxconn
                    ? 'text-slate-800'
                    : 'text-zinc-200'
                }`}
              >
                {p.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                {p.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cấu hình các thông số ngưỡng */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
            Ngưỡng Cảnh Báo Sớm (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={policy.warningThresholdPercent}
              onChange={(e) => handleChangeNumber('warningThresholdPercent', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-amber-600 dark:text-amber-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
            Ngưỡng Bắt Buộc Kiểm Định (%)
          </label>
          <div className="relative">
            <input
              type="number"
              value={policy.inspectionThresholdPercent}
              onChange={(e) => handleChangeNumber('inspectionThresholdPercent', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-orange-600 dark:text-orange-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
            Chu Kỳ Kiểm Định Mặc Định (Giờ)
          </label>
          <div className="relative">
            <input
              type="number"
              value={policy.defaultInspectionIntervalHours}
              onChange={(e) => handleChangeNumber('defaultInspectionIntervalHours', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl border bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">giờ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
