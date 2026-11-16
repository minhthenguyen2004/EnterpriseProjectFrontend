import { useTranslation } from 'react-i18next';
import useTheme from '../../../../hooks/useTheme';
import {
  OWNER_BADGE_CONFIG,
} from '../constants/mesErrorCodeConstants';

/**
 * MesErrorCodeTable
 * Bảng dữ liệu mã lỗi MES gồm 4 cột thông tin chuẩn hóa:
 * 1. # (STT theo trang)
 * 2. Error Code (Mã lỗi - Click mở modal chi tiết)
 * 3. Owner (Bộ phận phụ trách)
 * 4. Message (EN) (Thông báo tiếng Anh)
 * 
 * Bắt sự kiện chuột phải onContextMenu trên từng hàng để mở Menu ngữ cảnh Sửa / Xóa.
 */
export default function MesErrorCodeTable({
  errorCodes = [],
  currentPage = 1,
  pageSize = 10,
  onOpenDetail,
  onContextMenu,
  selectedRowId,
  onResetSearch,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common']);

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs text-slate-800'
          : 'bg-zinc-900/80 border-zinc-800 text-zinc-100 shadow-xl backdrop-blur-md'
      }`}
    >
      {/* Header chỉ dẫn tương tác */}
      <div
        className={`px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b text-xs ${
          isFoxconn
            ? 'bg-slate-50/80 border-slate-200 text-slate-600'
            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span className="font-bold uppercase tracking-wider text-[11px]">
            {t('table.headerTitle', 'Danh Mục Mã Lỗi Sản Xuất MES (MES Error Code Catalog)')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="hidden sm:inline-block">{t('table.hint', '💡 Mẹo: Click vào Mã lỗi để xem chi tiết • Chuột phải vào dòng để Sửa / Xóa')}</span>
        </div>
      </div>

      {/* Vùng Bảng Cuộn Ngang An Toàn */}
      <div className="overflow-x-auto min-h-80">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] uppercase tracking-wider font-bold select-none ${
                isFoxconn
                  ? 'bg-slate-100/90 text-slate-700 border-slate-200'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800'
              }`}
            >
              <th className="py-3 px-4 w-14 text-center whitespace-nowrap">{t('table.colNo', '#')}</th>
              <th className="py-3 px-4 min-w-55 whitespace-nowrap">{t('table.colErrorCode', 'MÃ LỖI (ERROR CODE)')}</th>
              <th className="py-3 px-4 w-40 whitespace-nowrap">{t('table.colOwner', 'BỘ PHẬN (OWNER)')}</th>
              <th className="py-3 px-4 min-w-80">{t('table.colMessageEn', 'THÔNG BÁO TIẾNG ANH (MESSAGE EN)')}</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y font-medium ${
              isFoxconn ? 'divide-slate-200/70' : 'divide-zinc-800/70'
            }`}
          >
            {errorCodes.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className={`py-14 text-center font-sans ${
                    isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <div className="text-sm font-bold mb-1">
                    {t('table.emptyTitle', 'Không tìm thấy mã lỗi nào phù hợp')}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 mb-4">
                    {t('table.emptyDesc', 'Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc tìm kiếm.')}
                  </p>
                  {onResetSearch && (
                    <button
                      type="button"
                      onClick={onResetSearch}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isFoxconn
                          ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                          : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                      }`}
                    >
                      {t('table.btnClearFilter', 'Xóa bộ lọc tìm kiếm')}
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              errorCodes.map((item, index) => {
                const rowIndex = (currentPage - 1) * pageSize + index + 1;
                const isSelected = selectedRowId === item.id;
                const ownerConfig = OWNER_BADGE_CONFIG[item.owner] || {
                  label: item.owner,
                  foxconnClass: 'bg-slate-100 text-slate-700 border-slate-200',
                  nvidiaClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
                };

                return (
                  <tr
                    key={item.id}
                    onContextMenu={(e) => onContextMenu(e, item)}
                    className={`transition-colors select-none ${
                      isSelected
                        ? isFoxconn
                          ? 'bg-blue-50/90'
                          : 'bg-zinc-800/80 ring-1 ring-[#76B900]/50'
                        : isFoxconn
                        ? 'hover:bg-slate-50/80'
                        : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* Cột 1: STT */}
                    <td className="py-3 px-4 text-center font-mono text-[11px] font-bold text-slate-400 dark:text-zinc-500 whitespace-nowrap">
                      {rowIndex}
                    </td>

                    {/* Cột 2: Error Code (Click mở modal chi tiết) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenDetail(item)}
                          className={`font-mono text-xs font-black tracking-wide text-left cursor-pointer transition-all hover:underline flex items-center gap-1.5 ${
                            isFoxconn
                              ? 'text-blue-600 hover:text-blue-800'
                              : 'text-[#76B900] hover:text-[#95d624] drop-shadow-xs'
                          }`}
                          title="Nhấp để xem chi tiết mã lỗi và hướng dẫn khắc phục"
                        >
                          <span>{item.errorCode}</span>
                        </button>

                      </div>
                    </td>

                    {/* Cột 3: Owner (Bộ phận phụ trách) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                          isFoxconn ? ownerConfig.foxconnClass : ownerConfig.nvidiaClass
                        }`}
                      >
                        {ownerConfig.label}
                      </span>
                    </td>

                    {/* Cột 4: Message EN (Thông báo tiếng Anh) */}
                    <td className="py-3 px-4 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`font-medium ${
                            isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                          }`}
                        >
                          {item.messageEn}
                        </span>
                        {/* Kèm chú thích tiếng Việt mờ ở dưới */}
                        {item.messageVi && (
                          <span
                            className={`text-[11px] italic line-clamp-1 ${
                              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                            }`}
                          >
                            ↳ {item.messageVi}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

