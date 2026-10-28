import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import MachineStatusLedBadge from './MachineStatusLedBadge';

export default function MachineStatusRectCard({ machine, onSelect, compact = false }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copied, setCopied] = useState(false);

  if (!machine) return null;

  const handleCopyIp = (e) => {
    e.stopPropagation();
    if (machine.ip) {
      navigator.clipboard.writeText(machine.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  /* =========================================================================
     CẤU HÌNH KHUNG VIỀN & NỀN THẺ THEO TRẠNG THÁI MÁY (VÀNG / ĐỎ / CHUẨN)
     - Thẻ báo vàng (IDLE / WAITING): Khung viền màu vàng hổ phách nổi bật
     - Thẻ báo đỏ (ERROR / ALARM): Khung viền màu đỏ ruby rực sáng
     - Thẻ bình thường (RUN): Viền chuẩn thương hiệu
     ========================================================================= */
  let cardBorderClass = '';
  if (machine.status === 'ERROR') {
    cardBorderClass = isFoxconn
      ? 'border-rose-400 bg-rose-50/35 hover:border-rose-500 shadow-rose-100/60'
      : 'border-rose-500/80 bg-rose-950/20 text-white shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:border-rose-400';
  } else if (machine.status === 'IDLE') {
    cardBorderClass = isFoxconn
      ? 'border-amber-400 bg-amber-50/35 hover:border-amber-500 shadow-amber-100/60'
      : 'border-amber-500/80 bg-amber-950/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-400';
  } else if (machine.status === 'STOP') {
    cardBorderClass = isFoxconn
      ? 'border-slate-300/80 bg-slate-50/50 hover:border-slate-400'
      : 'border-zinc-800/80 bg-zinc-950/40 text-zinc-300 hover:border-zinc-700';
  } else {
    // RUN / RUNNING
    cardBorderClass = isFoxconn
      ? 'border-slate-200/90 bg-white hover:border-blue-400 shadow-2xs hover:shadow-lg text-slate-900'
      : 'border-zinc-800 bg-zinc-900/90 text-white shadow-lg hover:shadow-2xl hover:border-[#76B900]/70';
  }

  /* =========================================================================
     1. CHẾ ĐỘ THU GỌN (COMPACT MODE) - Ô HÌNH CHỮ NHẬT DỌC MINI
     ========================================================================= */
  if (compact) {
    return (
      <div
        onClick={() => onSelect && onSelect(machine)}
        className={`relative p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group select-none h-full min-h-43.75 ${cardBorderClass}`}
        title={`${machine.name} (${machine.model}) - ${machine.ip}`}
      >
        {/* Top: Mã máy & Trạng thái góc trên bên phải */}
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                isFoxconn ? 'bg-slate-100 text-[#002766]' : 'bg-zinc-800 text-[#76B900]'
              }`}
            >
              #{machine.code || machine.id}
            </span>
            <MachineStatusLedBadge status={machine.status} />
          </div>

          {/* Tên máy */}
          <h4
            className={`text-xs font-black tracking-tight line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-[#76B900] transition-colors ${
              isFoxconn ? 'text-slate-900' : 'text-white'
            }`}
            title={machine.name}
          >
            {machine.name}
          </h4>
        </div>

        {/* Thông tin xếp dọc */}
        <div className="space-y-1.5 my-2 text-[10px]">
          <div className="flex items-start gap-1.5 font-bold">
            <span className="text-blue-500 shrink-0 mt-0.5">🌐</span>
            <span className={`break-all leading-snug ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>{machine.ip}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-amber-500 shrink-0 mt-0.5">📍</span>
            <span className={`wrap-break-word leading-snug ${isFoxconn ? 'text-slate-600' : 'text-zinc-400'}`}>{machine.areaName}</span>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. CHẾ ĐỘ TIÊU CHUẨN (STANDARD MODE) - BẢN TIÊU CHUẨN
     - Bố cục hài hòa, thanh lịch, liền mạch
     - KHÔNG dùng khung/hộp viền riêng cho IP & Chương trình để tránh cộm, lệch tone
     - Hỗ trợ chữ dài tự động xuống dòng (wrap-break-word / break-all), không bị cắt xén
     - Viền thẻ tự đổi sang Vàng khi IDLE và Đỏ khi ERROR
     - Màu chữ tương phản tuyệt đối: Foxconn sẫm màu, NVIDIA trắng sáng
     ========================================================================= */
  return (
    <div
      onClick={() => onSelect && onSelect(machine)}
      className={`relative p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group select-none h-full min-h-72.5 ${cardBorderClass}`}
    >
      {/* 1. Header: Mã máy (Trái) & Trạng Thái Máy Nằm Ở Góc Trên Bên Phải */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-zinc-800/80">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
              isFoxconn ? 'bg-slate-100 text-[#002766]' : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            #{machine.code || machine.id}
          </span>

          {/* Trạng thái máy ở góc trên bên phải */}
          <div className="shrink-0">
            <MachineStatusLedBadge status={machine.status} />
          </div>
        </div>

        {/* 2. Tên máy & Model: Tự động xuống dòng khi text dài */}
        <div className="mb-2.5">
          <h4
            className={`text-sm font-black tracking-tight wrap-break-word leading-snug mb-0.5 ${
              isFoxconn ? 'text-slate-900' : 'text-white'
            }`}
            title={machine.name}
          >
            {machine.name}
          </h4>
          <p
            className={`text-[10px] font-medium wrap-break-word leading-tight opacity-70 ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
            title={machine.model}
          >
            {machine.model}
          </p>
        </div>
      </div>

      {/* 3. Thân Thẻ: Các Thông Số Liền Mạch (Tự động xuống dòng khi dài, không dùng khung riêng) */}
      <div className="space-y-2 text-[11px] my-auto py-1">
        {/* ĐỊA CHỈ IP - Liền mạch, tự động bẻ dòng nếu IP hoặc Hostname dài, nút copy tiện lợi */}
        <div className="flex items-start justify-between gap-1.5 py-0.5">
          <div className="flex items-start gap-2 font-bold text-xs min-w-0">
            <span className="text-blue-500 shrink-0 text-xs mt-0.5" title="Địa chỉ IP">🌐</span>
            <span className={`font-bold break-all leading-tight ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
              {machine.ip}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyIp}
            title="Sao chép IP"
            className={`p-1 rounded-md transition-all cursor-pointer shrink-0 ${
              copied
                ? 'bg-emerald-500 text-white'
                : isFoxconn
                  ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                  : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {copied ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* CHƯƠNG TRÌNH - Tự động bẻ dòng xuống dưới khi tên recipe/HEX dài (break-all) */}
        <div
          className="flex items-start gap-2 font-bold text-[11px] py-0.5"
          title={`Chương trình: ${machine.program}`}
        >
          <span className="text-purple-500 dark:text-purple-400 text-xs shrink-0 font-bold mt-0.5">&lt;/&gt;</span>
          <span className={`font-semibold break-all leading-snug ${isFoxconn ? 'text-slate-800' : 'text-zinc-100'}`}>
            {machine.program}
          </span>
        </div>

        {/* KHU VỰC - Tự động xuống dòng khi tên khu vực dài (wrap-break-word) */}
        <div
          className="flex items-start gap-2 text-[11px] py-0.5"
          title={`Khu vực: ${machine.areaName}`}
        >
          <span className="text-amber-500 shrink-0 text-xs mt-0.5">🏢</span>
          <span className={`font-medium wrap-break-word leading-snug ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
            {machine.areaName}
          </span>
        </div>

        {/* VỊ TRÍ - Tự động xuống dòng khi tên vị trí/trạm dài (wrap-break-word) */}
        <div
          className="flex items-start gap-2 text-[11px] py-0.5"
          title={`Vị trí: ${machine.location}`}
        >
          <span className="text-emerald-500 shrink-0 text-xs mt-0.5">📍</span>
          <span className={`font-bold text-[10.5px] wrap-break-word leading-snug ${isFoxconn ? 'text-slate-600' : 'text-zinc-300'}`}>
            {machine.location}
          </span>
        </div>
      </div>
    </div>
  );
}
