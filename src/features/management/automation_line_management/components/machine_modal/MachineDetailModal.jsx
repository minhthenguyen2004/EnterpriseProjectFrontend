import { useState, useEffect, useMemo } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import { getMachineModalData } from '../../data/machineModalMockData';
import MachineInfoCard from './left_column/MachineInfoCard';
import MachineRuntimeCard from './left_column/MachineRuntimeCard';
import SerialNumberTable from './left_column/SerialNumberTable';
import MachineHourlyYieldChart from './right_analytics/MachineHourlyYieldChart';
import MachineHourlyErrorCodeChart from './right_analytics/MachineHourlyErrorCodeChart';
import MachineDetailTabsContainer from './right_tabs/MachineDetailTabsContainer';
import MachineStatusBadge from '../machine_flow/MachineStatusBadge';

export default function MachineDetailModal({ machine, onClose }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState(null);

  // Lấy dữ liệu chi tiết cho máy
  const modalData = useMemo(() => {
    if (!machine) return null;
    return getMachineModalData(machine);
  }, [machine]);

  // Thiết lập Serial Number mặc định khi mở modal
  useEffect(() => {
    if (modalData?.serialNumbers?.length > 0 && !selectedSerial) {
      setSelectedSerial(modalData.serialNumbers[0]);
    }
  }, [modalData, selectedSerial]);

  // Lắng nghe phím ESC để đóng modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Ngăn chặn cuộn trang body khi modal đang mở
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!machine || !modalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Container: Kích thước lớn gần bằng toàn bộ web */}
      <div
        className={`relative z-10 w-[96vw] max-w-[1760px] rounded-3xl border shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
          isFullscreen ? 'h-[98vh] max-h-none' : 'h-[92vh] max-h-240'
        } ${
          isFoxconn
            ? 'bg-slate-100 border-slate-300 text-slate-800'
            : 'bg-zinc-950/95 border-zinc-800 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* 1. HEADER MODAL */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between shrink-0 select-none ${
            isFoxconn
              ? 'bg-white border-slate-200'
              : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black ${
                isFoxconn ? 'bg-blue-100 text-[#002766]' : 'bg-[#76B900]/20 text-[#76B900]'
              }`}
            >
              {machine.stationNo || 'OP-10'}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  className={`text-base font-black tracking-tight ${
                    isFoxconn ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {machine.name}
                </h2>
                <MachineStatusBadge status={machine.status} />
              </div>
              <p
                className={`text-[11px] font-medium leading-tight ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                {machine.model} • {modalData.info.lineName} • IP: {modalData.info.ipAddress}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                isFoxconn
                  ? 'hover:bg-slate-100 text-slate-600'
                  : 'hover:bg-zinc-800 text-zinc-300'
              }`}
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? '🗗' : '🗖'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
              title="Đóng cửa sổ (ESC)"
            >
              ✕ Đóng
            </button>
          </div>
        </div>

        {/* 2. BODY CHIA 2 CỘT: CỘT TRÁI (~1/3) VÀ CỘT PHẢI (~2/3) */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* CỘT TRÁI: CHIẾM ~1/3 CHIỀU NGANG (col-span-12 lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 min-w-0">
            {/* Khối 1: Thông tin thiết bị xếp theo hàng dọc */}
            <MachineInfoCard info={modalData.info} />

            {/* Khối 2: Machine runtime thời gian vận hành máy */}
            <MachineRuntimeCard runtime={modalData.runtime} />

            {/* Khối 3: Serial number data có ô tìm kiếm text và bảng 6 trường */}
            <SerialNumberTable
              serialNumbers={modalData.serialNumbers}
              selectedSerial={selectedSerial}
              onSelectSerial={(sn) => setSelectedSerial(sn)}
            />
          </div>

          {/* CỘT PHẢI: CHIẾM ~2/3 CHIỀU NGANG (col-span-12 lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-3 min-w-0">
            {/* Phía trên: 2 biểu đồ cột phân tích theo khung giờ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
              {/* Bảng 1: Machine Yield Rate & Output theo khung giờ (0 -> 100) */}
              <MachineHourlyYieldChart data={modalData.hourlyYieldData} />

              {/* Bảng 2: Machine Error Code theo khung giờ */}
              <MachineHourlyErrorCodeChart data={modalData.hourlyErrorCodeData} />
            </div>

            {/* Phía dưới: 3 tab dữ liệu vi mô (Key Parts, AOI Data, Screw Data) */}
            <div className="flex-1 flex flex-col min-h-0">
              <MachineDetailTabsContainer
                keyParts={modalData.keyParts}
                aoiData={modalData.aoiData}
                screwData={modalData.screwData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
