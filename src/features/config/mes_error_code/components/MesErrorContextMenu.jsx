import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../hooks/useTheme';

/**
 * MesErrorContextMenu
 * Thực đơn ngữ cảnh nổi ra khi nhấp chuột phải vào 1 dòng lỗi trong bảng.
 * Gồm 2 lựa chọn: Sửa (Edit) và Xóa (Delete).
 * Có kiểm soát phân quyền RBAC: Nếu không có quyền Admin hoặc Manager, disable cả 2 lựa chọn.
 */


export default function MesErrorContextMenu({
  visible,
  x,
  y,
  item,
  canModify,
  onClose,
  onEdit,
  onDelete,
}) {

  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { t } = useTranslation(['mesError', 'common']);
  const menuRef = useRef(null);

  const [position, setPosition] = useState({ top: y, left: x });

  // Tự động điều chỉnh vị trí để không bị tràn viền màn hình (Viewport Clamping)
  useLayoutEffect(() => {
    if (!visible) return;

    const menuWidth = 200;
    const menuHeight = 115;
    const padding = 12;

    let posX = x;
    let posY = y;

    if (x + menuWidth > window.innerWidth - padding) {
      posX = Math.max(padding, x - menuWidth);
    }

    if (y + menuHeight > window.innerHeight - padding) {
      posY = Math.max(padding, y - menuHeight);
    }

    setPosition({ top: posY, left: posX });
  }, [visible, x, y]);



  // Lắng nghe sự kiện click ngoài, phím Escape và scroll để đóng menu
  useEffect(() => {
    if (!visible) return;

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [visible, onClose]);

  if (!visible || !item) return null;

  
  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 99999,
      }}
      className={`w-52 rounded-xl border p-1 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 ${
        isFoxconn
          ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-400/20'
          : 'bg-zinc-900/95 border-zinc-700 text-zinc-100 shadow-black/60'
      }`}
    >
      {/* Header nhỏ hiển thị tên mã lỗi đang chọn */}
      <div
        className={`px-3 py-1.5 border-b mb-1 text-[10px] font-mono font-bold truncate ${
          isFoxconn
            ? 'border-slate-100 text-slate-500 bg-slate-50/70'
            : 'border-zinc-800 text-zinc-400 bg-zinc-950/60'
        }`}
      >
        <span>{t('contextMenu.codeLabel', 'Mã: ')}</span>
        <span className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>
          {item.errorCode}
        </span>
      </div>

      {/* Lựa chọn 1: Sửa (Edit) */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => {
            if (!canModify) return;
            onEdit(item);
          }}
          disabled={!canModify}
          aria-disabled={!canModify}
          title={
            !canModify
              ? t('contextMenu.editTooltipDisabled', 'Yêu cầu quyền Admin hoặc Manager để sửa mã lỗi')
              : t('contextMenu.edit', 'Sửa mã lỗi')
          }
          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-left ${
            canModify
              ? isFoxconn
                ? 'hover:bg-blue-50 text-slate-700 hover:text-blue-700 cursor-pointer'
                : 'hover:bg-zinc-800 text-zinc-200 hover:text-[#76B900] cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-slate-400 dark:text-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>✏️</span>
            <span>{t('contextMenu.edit', 'Sửa mã lỗi')}</span>
          </div>
          {!canModify && <span className="text-[10px]">🔒</span>}
        </button>
      </div>

      {/* Lựa chọn 2: Xóa (Delete) */}
      <div className="relative group mt-0.5">
        <button
          type="button"
          onClick={() => {
            if (!canModify) return;
            onDelete(item);
          }}
          disabled={!canModify}
          aria-disabled={!canModify}
          title={
            !canModify
              ? t('contextMenu.deleteTooltipDisabled', 'Yêu cầu quyền Admin hoặc Manager để xóa mã lỗi')
              : t('contextMenu.delete', 'Xóa mã lỗi')
          }
          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-left ${
            canModify
              ? isFoxconn
                ? 'hover:bg-rose-50 text-rose-600 hover:text-rose-700 cursor-pointer'
                : 'hover:bg-rose-950/30 text-rose-400 hover:text-rose-300 cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-slate-400 dark:text-zinc-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🗑️</span>
            <span>{t('contextMenu.delete', 'Xóa mã lỗi')}</span>
          </div>
          {!canModify && <span className="text-[10px]">🔒</span>}
        </button>
      </div>

      {/* Dòng cảnh báo quyền nếu bị disable */}
      {!canModify && (
        <div
          className={`mt-1 pt-1 border-t px-2 py-0.5 text-[9px] font-bold text-center ${
            isFoxconn ? 'border-slate-100 text-rose-500' : 'border-zinc-800 text-rose-400'
          }`}
        >
          {t('contextMenu.permissionWarning', '⚠️ Chỉ Admin / Manager mới thao tác được')}
        </div>
      )}
    </div>,
    document.body
  );
}

