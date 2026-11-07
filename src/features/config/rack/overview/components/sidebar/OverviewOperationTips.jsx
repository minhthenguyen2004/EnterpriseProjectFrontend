import useTheme from '../../../../../../hooks/useTheme';

export default function OverviewOperationTips() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-amber-50/50 border-amber-200/80 text-amber-950 shadow-2xs'
          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-200/50 dark:border-zinc-800">
        <span className="text-base">💡</span>
        <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-400">
          Mẹo Thao Tác
        </h4>
      </div>

      <div className="space-y-2.5 text-[11px] leading-relaxed">
        {/* Tip 1 */}
        <div className="flex items-start gap-2">
          <span className="text-xs mt-0.5 shrink-0">🖱️</span>
          <div>
            <strong className={`${isFoxconn ? 'text-black' : 'text-zinc-100'} font-bold`}>Click vào Rack hoặc Slot</strong>{' '}
            để mở bảng sửa thuộc tính.
          </div>
        </div>

        {/* Tip 2 */}
        <div className="flex items-start gap-2">
          <span className="text-xs mt-0.5 shrink-0">🔄</span>
          <div>
            <strong className={`${isFoxconn ? 'text-black' : 'text-zinc-100'} font-bold`}>Kéo thả đổi chỗ:</strong> Kéo Slot thả lên Slot khác để đổi vị trí tức thì.
          </div>
        </div>

        {/* Tip 3 */}
        <div className="flex items-start gap-2">
          <span className="text-xs mt-0.5 shrink-0">↔️</span>
          <div>
            <strong className={`${isFoxconn ? 'text-black' : 'text-zinc-100'} font-bold`}>Đổi thứ tự Rack:</strong> Kéo đầu Rack thả lên Rack khác để đổi chỗ cột.
          </div>
        </div>

        {/* Tip 4: Shortcuts */}
        <div
          className={`p-2.5 rounded-xl border mt-2 ${
            isFoxconn
              ? 'bg-white/80 border-amber-200/60'
              : 'bg-zinc-950/80 border-zinc-800'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1">
            <span>⌨️</span> Phím tắt hệ thống:
          </div>
          <div className="grid grid-cols-1 gap-1 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-zinc-800 font-bold text-slate-800 dark:text-zinc-200 text-[10px]">
                Ctrl + S
              </span>
              <span className="text-slate-600 dark:text-zinc-400">Lưu layout</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-zinc-800 font-bold text-slate-800 dark:text-zinc-200 text-[10px]">
                Esc
              </span>
              <span className="text-slate-600 dark:text-zinc-400">Bỏ chọn / Đóng</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-zinc-800 font-bold text-slate-800 dark:text-zinc-200 text-[10px]">
                Delete
              </span>
              <span className="text-slate-600 dark:text-zinc-400">Xóa đối tượng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

