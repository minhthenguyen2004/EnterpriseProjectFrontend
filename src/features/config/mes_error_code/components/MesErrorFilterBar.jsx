import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../hooks/useTheme';

/**
 * MesErrorFilterBar
 * Thanh công cụ tìm kiếm và nút thao tác trên cùng:
 * - Ô nhập tìm kiếm song song theo mã lỗi hoặc nội dung
 * - Nút Tìm kiếm
 * - Nút Thêm mã lỗi mới (Kiểm tra quyền Admin / Manager, disable nếu không đủ quyền)
 * - Thanh chuyển đổi vai trò (Role Switcher) hỗ trợ kiểm thử quyền trực tiếp
 */

export default function MesErrorFilterBar({
  searchTerm,
  onSearchChange,
  onResetSearch,
  onOpenAdd,
  canModify,
  mockRoleOverride,
  onRoleOverrideChange
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common']);

  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Đồng bộ search term từ cha
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const handleClear = () => {
    setLocalSearch('');
    onResetSearch();
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all space-y-3 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/80 border-zinc-800 shadow-xl backdrop-blur-md'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Khối tìm kiếm: Ô text input + Nút tìm kiếm */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 max-w-3xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                onSearchChange(e.target.value);
              }}
              placeholder={t('search.placeholder', 'Tìm kiếm theo mã lỗi (ERR_...), nội dung tiếng Anh hoặc tiếng Việt...')}
              className={`w-full pl-4 pr-9 py-2 rounded-xl text-xs font-medium border transition-all focus:outline-hidden ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-100'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/20'
              }`}
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleClear}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isFoxconn
                    ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
                title={t('common:actions.clearFilter', 'Xóa tìm kiếm')}
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5 ${
              isFoxconn
                ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 active:scale-98'
            }`}
          >
            <span>{t('search.btnSearch', 'Tìm kiếm')}</span>
          </button>
        </form>

        {/* Khối bên phải: Nút Thêm mới mã lỗi (Có kiểm soát RBAC) */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button
              type="button"
              onClick={onOpenAdd}
              disabled={!canModify}
              aria-disabled={!canModify}
              title={
                !canModify
                  ? t('search.addTooltipDisabled', 'Chức năng chỉ dành cho quản trị viên (Admin) hoặc Trưởng bộ phận (Manager)')
                  : t('search.btnAdd', 'Thêm mã lỗi')
              }
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs whitespace-nowrap ${
                canModify
                  ? isFoxconn
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-98 shadow-blue-500/20'
                    : 'bg-[#76B900] hover:bg-[#85c90d] text-black font-extrabold cursor-pointer active:scale-98 shadow-[#76B900]/20'
                  : isFoxconn
                  ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
                  : 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/60 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{canModify ? '➕' : '🔒'}</span>
              <span>{t('search.btnAdd', 'Thêm mã lỗi')}</span>
            </button>

            {/* Tooltip khi bị disable quyền */}
            {!canModify && (
              <div
                className={`absolute right-0 top-full mt-1.5 hidden group-hover:block z-30 px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shadow-xl border pointer-events-none transition-all ${
                  isFoxconn
                    ? 'bg-slate-900 text-white border-slate-700'
                    : 'bg-zinc-950 text-amber-300 border-amber-500/40'
                }`}
              >
                {t('search.addTooltipDisabled', '⚠️ Yêu cầu quyền Admin hoặc Manager để thêm')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dòng 2: Thanh giả lập chuyển quyền kiểm thử (Dev Role Switcher Bar) */}
      <div
        className={`pt-2.5 border-t flex flex-wrap items-center justify-end
           gap-2 text-xs ${
          isFoxconn ? 'border-slate-100 text-slate-500' : 'border-zinc-800 text-zinc-400'
        }`}
      >
        {/* Nút bấm chuyển đổi nhanh quyền cho Tester / Dev */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
            {t('common:roles.testRole', 'Giả lập quyền thử nghiệm:')}
          </span>
          <div className="inline-flex rounded-lg p-0.5 border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-950">
            <button
              type="button"
              onClick={() => onRoleOverrideChange('admin')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                mockRoleOverride === 'admin'
                  ? isFoxconn
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-[#76B900] text-black font-extrabold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('common:roles.admin', 'Admin')}
            </button>
            <button
              type="button"
              onClick={() => onRoleOverrideChange('manager')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                mockRoleOverride === 'manager'
                  ? isFoxconn
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-[#76B900] text-black font-extrabold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('common:roles.manager', 'Manager')}
            </button>
            <button
              type="button"
              onClick={() => onRoleOverrideChange('operator')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                mockRoleOverride === 'operator'
                  ? isFoxconn
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-500 text-white font-extrabold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {t('common:roles.operator', 'Operator')}
            </button>
            {mockRoleOverride && (
              <button
                type="button"
                onClick={() => onRoleOverrideChange(null)}
                className="px-1.5 py-0.5 text-[10px] text-slate-400 hover:text-rose-500 cursor-pointer"
                title={t('common:roles.resetRole', 'Khôi phục quyền tài khoản gốc')}
              >
                ✕ {t('common:actions.reset', 'Đặt lại')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

