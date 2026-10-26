import { useRef, useState, useEffect } from 'react';
import useTheme from '../../../../hooks/useTheme';
import MachineCard from './MachineCard';

export default function MachineFlowRow({ machines = [], onSelectMachine }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const scrollRef = useRef(null);

  // Mặc định tự động căn giữa nếu số lượng máy ít (<= 4 máy)
  const [alignCenter, setAlignCenter] = useState(machines.length <= 4);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Cập nhật căn giữa khi số lượng máy thay đổi
  useEffect(() => {
    if (machines.length <= 4) {
      setAlignCenter(true);
    }
  }, [machines.length]);

  // Cuộn thủ công bằng nút bấm
  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Tự động cuộn mượt mà khi chuỗi máy dài
  useEffect(() => {
    if (!isAutoScroll || isHovered || !scrollRef.current) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          // Khi cuộn hết thì quay về đầu mượt mà
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 1.5, behavior: 'auto' });
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [isAutoScroll, isHovered]);

  const runningCount = machines.filter((m) => m.status === 'RUN').length;
  const errorCount = machines.filter((m) => m.status === 'ERROR').length;
  const idleCount = machines.filter((m) => m.status === 'IDLE').length;

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-slate-50/70 border-slate-200'
          : 'bg-zinc-950/70 border-zinc-800'
      }`}
    >
      {/* Header thanh chuỗi máy */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
              isFoxconn ? 'bg-blue-100 text-[#002766]' : 'bg-[#76B900]/20 text-[#76B900]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
              CHUỖI TRẠM MÁY NỐI TIẾP (CONVEYOR PIPELINE FLOW)
            </h2>
            <p className={`text-[10px] ${isFoxconn ? 'text-slate-400' : 'text-white'}`}>
              Quy trình gia công tuần tự từ trạm đầu vào đến đóng gói thành phẩm
            </p>
          </div>
        </div>

        {/* Tóm tắt nhanh số lượng máy theo trạng thái & Nút điều khiển */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Thống kê Run / Idle / Error */}
          <div className="flex items-center gap-2 text-[10px] font-bold mr-1">
            <span className="flex items-center gap-1 text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{runningCount} RUN</span>
            </span>
            {idleCount > 0 && (
              <span className="flex items-center gap-1 text-amber-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{idleCount} IDLE</span>
              </span>
            )}
            {errorCount > 0 && (
              <span className="flex items-center gap-1 text-rose-500 font-extrabold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>{errorCount} ERROR</span>
              </span>
            )}
          </div>

          {/* Nút chỉnh Căn giữa (Center align khi số lượng máy ít) */}
          <button
            type="button"
            onClick={() => setAlignCenter(!alignCenter)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
              alignCenter
                ? isFoxconn
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-[#76B900]/20 text-[#76B900] border-[#76B900]/50'
                : isFoxconn
                  ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
            }`}
            title="Chỉnh căn giữa hoặc căn trái chuỗi trạm máy"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M4 18h16" />
            </svg>
            <span>{alignCenter ? 'Đang Căn Giữa' : 'Căn Giữa'}</span>
          </button>

          {/* Nút bật/tắt Auto Cuộn khi chuỗi máy dài */}
          <button
            type="button"
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
              isAutoScroll
                ? isFoxconn
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-[0_0_10px_rgba(118,185,0,0.4)]'
                : isFoxconn
                  ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
            }`}
            title="Tự động cuộn chuỗi máy khi chuỗi dài (dừng khi rê chuột vào)"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAutoScroll ? 'bg-black animate-ping' : 'bg-emerald-500'}`} />
            <span>{isAutoScroll ? 'Auto Cuộn: BẬT' : 'Auto Cuộn'}</span>
          </button>

          {/* Nút cuộn trái / phải thủ công */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`p-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
            }`}
            title="Cuộn sang trái"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`p-1 px-1.5 rounded-lg border transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
            }`}
            title="Cuộn sang phải"
          >
            →
          </button>
        </div>
      </div>

      {/* Dãy các máy xếp gần nhau (căn giữa khi số lượng ít, tự động cuộn khi dài) */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-stretch gap-5 overflow-x-auto pb-2 pt-0.5 scroll-smooth focus:outline-none w-full ${
          alignCenter ? 'justify-center' : 'justify-start'
        }`}
        style={{ scrollbarWidth: 'thin' }}
      >
        {machines.map((machine, index) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            index={index}
            onSelect={onSelectMachine}
          />
        ))}
      </div>
    </div>
  );
}
