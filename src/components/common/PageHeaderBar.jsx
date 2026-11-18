import { useState, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../hooks/useTheme';

/**
 * PageHeaderBar - Chuẩn Header chung cho tất cả các trang
 * Thiết kế đồng nhất theo phong cách của Autoline Management & Machine Status Management
 * Hỗ trợ hoàn hảo 2 brand: Foxconn (Navy #002766) và NVIDIA (Neon #76B900 / Zinc)
 * Đa ngôn ngữ i18n đầy đủ cho controls và hỗ trợ linh hoạt cả chuỗi, React element lẫn object đa ngữ { vi, en, zh }
 *
 * @param {Array<{label: string | object, isCurrent?: boolean}> | Array<string>} breadcrumbs - Danh sách phân cấp
 * @param {string | object | React.ReactNode} title - Tiêu đề trang (H1)
 * @param {string | object | React.ReactNode} subtitle - Phụ đề (fallback nếu không truyền description)
 * @param {string | object | React.ReactNode} badge - Huy hiệu trạng thái (vd: 'LIVE LINE', 'LIVE MONITOR')
 * @param {'live' | 'brand' | 'warning' | 'info'} badgeType - Kiểu hiển thị của badge
 * @param {string | object | React.ReactNode} description - Đoạn mô tả chức năng của trang
 * @param {Date | string} lastUpdated - Thời điểm cập nhật dữ liệu gần nhất
 * @param {boolean} isRefreshing - Trạng thái đang xoay tải làm mới
 * @param {() => void} onRefresh - Hàm gọi làm mới dữ liệu
 * @param {boolean} isAutoRefresh - Trạng thái tự động làm mới
 * @param {() => void} onToggleAutoRefresh - Hàm bật/tắt tự động làm mới
 * @param {number} refreshInterval - Chu kỳ tự động làm mới (giây, vd: 10, 30, 60)
 * @param {(interval: number) => void} onRefreshIntervalChange - Hàm thay đổi chu kỳ làm mới
 * @param {boolean} showFullscreen - Hiển thị nút bật/tắt toàn màn hình (mặc định: true)
 * @param {React.ReactNode} actions - Các nút chức năng hoặc badge bổ sung (đặt phía trước controls)
 * @param {React.ReactNode} children - Nội dung tùy biến bổ sung
 */
export default function PageHeaderBar({
  breadcrumbs = [],
  title,
  subtitle,
  badge,
  badgeType = 'live',
  description,
  lastUpdated,
  isRefreshing = false,
  onRefresh,
  isAutoRefresh,
  onToggleAutoRefresh,
  refreshInterval = 30,
  onRefreshIntervalChange,
  showFullscreen = true,
  actions,
  children,
  className = ''
}) {
  const { t, i18n } = useTranslation('common');
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  /**
   * Helper giải quyết linh hoạt chuỗi văn bản, React element,
   * hoặc object đa ngôn ngữ { vi: '...', en: '...', zh: '...' }
   */
  const resolveText = (val) => {
    if (!val) return val;
    if (typeof val === 'object' && !isValidElement(val)) {
      const currentLang = i18n?.language || 'vi';
      return val[currentLang] || val.vi || val.en || val.zh || '';
    }
    return val;
  };

  // Định dạng thời gian tương ứng với ngôn ngữ hiện tại
  const localeCode =
    i18n?.language === 'zh'
      ? 'zh-CN'
      : i18n?.language === 'en'
      ? 'en-US'
      : 'vi-VN';

  const formattedTime = lastUpdated
    ? lastUpdated instanceof Date
      ? lastUpdated.toLocaleTimeString(localeCode, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : String(lastUpdated)
    : null;

  const resolvedTitle = resolveText(title);
  const resolvedBadge = resolveText(badge);
  const resolvedDesc = resolveText(description || subtitle);

  // Render badge theo kiểu
  const renderBadge = () => {
    if (!resolvedBadge) return null;

    if (badgeType === 'live') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{resolvedBadge}</span>
        </span>
      );
    }

    if (badgeType === 'brand') {
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
          isFoxconn
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-[#76B900]/15 text-[#76B900] border-[#76B900]/30'
        }`}>
          <span>{resolvedBadge}</span>
        </span>
      );
    }

    if (badgeType === 'warning') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{resolvedBadge}</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700">
        <span>{resolvedBadge}</span>
      </span>
    );
  };

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800 ${className}`}>
      {/* 1. Bên Trái: Breadcrumb, Tiêu Đề, Badge và Mô Tả */}
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={`flex items-center gap-2 text-xs font-semibold mb-1 flex-wrap ${
            isFoxconn ? 'text-slate-400' : 'text-zinc-400'
          }`}>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const rawLabel = typeof crumb === 'string' ? crumb : crumb?.label;
              const label = resolveText(rawLabel);
              const isCurrent = typeof crumb === 'object' && crumb.isCurrent !== undefined ? crumb.isCurrent : isLast;

              return (
                <span key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span>/</span>}
                  <span className={isCurrent ? (isFoxconn ? 'text-[#002766] font-bold' : 'text-[#76B900] font-bold') : ''}>
                    {label}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <h1 className={`text-2xl font-black tracking-tight ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
            {resolvedTitle}
          </h1>
          {renderBadge()}
        </div>

        {resolvedDesc && (
          <p className={`text-xs mt-1 leading-relaxed ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
            {resolvedDesc}
          </p>
        )}
      </div>

      {/* 2. Bên Phải: Nhóm Thao Tác & Điều Khiển Chuẩn */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs self-start lg:self-center">
        {/* Custom Actions (ví dụ: Nút mở drawer lọc, KPI chips, nút thêm mới) */}
        {actions}

        {/* Thời gian cập nhật */}
        {formattedTime && (
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isFoxconn ? 'bg-white border-slate-200 text-slate-600' : 'bg-zinc-900/90 border-zinc-800 text-white'
          }`}>
            <span className={isFoxconn ? 'text-slate-400' : 'text-zinc-400'}>
              {t('pageHeader.updated', 'Cập nhật:')}
            </span>
            <span className={`font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
              {formattedTime}
            </span>
          </div>
        )}

        {/* Nút bật/tắt Auto Refresh */}
        {onToggleAutoRefresh && (
          <div className={`flex items-center rounded-xl border overflow-hidden p-0.5 ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900/90 border-zinc-800'
          }`}>
            <button
              type="button"
              onClick={onToggleAutoRefresh}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isAutoRefresh
                  ? isFoxconn
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'bg-[#76B900]/20 text-[#76B900] font-bold'
                  : 'text-slate-400 hover:text-slate-600 dark:text-zinc-300'
              }`}
            >
              {isAutoRefresh
                ? t('pageHeader.autoRefreshOn', 'Auto ⟳')
                : t('pageHeader.autoRefreshOff', 'Auto Tắt')}
            </button>
            {isAutoRefresh && onRefreshIntervalChange && (
              <select
                value={refreshInterval}
                onChange={(e) => onRefreshIntervalChange(Number(e.target.value))}
                aria-label={t('pageHeader.selectRefreshInterval', 'Chọn chu kỳ làm mới')}
                className={`bg-transparent text-[11px] font-bold px-1.5 py-1 focus:outline-none cursor-pointer ${
                  isFoxconn ? 'text-slate-700' : 'text-white'
                }`}
              >
                <option value={10} className="text-black">10s</option>
                <option value={30} className="text-black">30s</option>
                <option value={60} className="text-black">60s</option>
              </select>
            )}
          </div>
        )}

        {/* Nút Manual Refresh */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
            }`}
            title={t('pageHeader.refreshTooltip', 'Làm mới dữ liệu ngay lập tức')}
          >
            <svg
              className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600 dark:text-[#76B900]' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{t('pageHeader.refresh', 'Làm Mới')}</span>
          </button>
        )}

        {/* Nút Fullscreen */}
        {showFullscreen && (
          <button
            type="button"
            onClick={toggleFullscreen}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
            }`}
            title={t('pageHeader.fullscreenTooltip', 'Bật/Tắt Toàn Màn Hình')}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        )}

        {/* Extra children */}
        {children}
      </div>
    </div>
  );
}
