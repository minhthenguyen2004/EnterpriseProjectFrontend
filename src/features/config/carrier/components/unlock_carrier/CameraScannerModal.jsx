import { useEffect, useRef, useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import { INITIAL_LOCKED_CARRIERS } from '../../mock/unlockCarrierMockData';

export default function CameraScannerModal({ isOpen, onClose, onScanSuccess }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Khởi động Camera thật nếu trình duyệt và thiết bị cho phép
  useEffect(() => {
    let streamInstance = null;

    if (isOpen) {
      if (navigator?.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: { ideal: 'environment' },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          })
          .then((stream) => {
            streamInstance = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setStreamActive(true);
              setCameraError(null);
            }
          })
          .catch((err) => {
            console.warn('Camera access not permitted or unavailable:', err);
            setStreamActive(false);
            setCameraError('Không thể mở Camera thiết bị (Chế độ mô phỏng quét barcode tự động kích hoạt).');
          });
      } else {
        setCameraError('Trình duyệt không hỗ trợ truy cập Webcam trực tiếp.');
      }
    }

    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectSimulatedCode = (code) => {
    onScanSuccess(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-700'
        }`}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn
                  ? 'bg-blue-50 text-[#002766]'
                  : 'bg-[#76B900]/15 text-[#76B900]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-zinc-100">
                QUÉT MÃ KHAY BẰNG CAMERA / SÚNG QUÉT
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Căn chỉnh mã vạch / QR Code của khay vào giữa khung quét
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Viewfinder Video / Scanner Area */}
        <div className="p-5">
          <div className="relative w-full h-64 bg-zinc-950 rounded-xl overflow-hidden border-2 border-dashed border-zinc-700 flex items-center justify-center">
            {/* Live Camera Video stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${
                streamActive ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Simulated Industrial Viewfinder background */}
            {!streamActive && (
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-2 text-zinc-600 animate-pulse">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-400">
                  CAMERA SCANNER READY
                </span>
                {cameraError && (
                  <p className="text-[11px] text-amber-400/90 mt-1 max-w-xs mx-auto">
                    {cameraError}
                  </p>
                )}
              </div>
            )}

            {/* Corner Crosshairs */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#76B900]" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#76B900]" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#76B900]" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#76B900]" />

            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-x-8 h-0.5 bg-red-500 shadow-[0_0_15px_#EF4444] animate-bounce-laser" />

            {/* Center Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-28 border border-white/30 rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-white/70 font-mono tracking-widest uppercase">
                  AIM CARRIER CODE
                </span>
              </div>
            </div>
          </div>

          {/* Quick Simulated Carrier Codes for Testing */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800">
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-2">
              🧪 Mô phỏng quét nhanh mã khay (Click để gửi ngay):
            </span>
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_LOCKED_CARRIERS.slice(0, 4).map((c) => (
                <button
                  key={c.carrierCode}
                  type="button"
                  onClick={() => handleSelectSimulatedCode(c.carrierCode)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200 hover:border-blue-300'
                      : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-100 border-zinc-700 hover:border-[#76B900]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs">{c.carrierCode}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-red-500/20 text-red-400">
                      LOCKED
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 block mt-0.5 truncate">
                    {c.lineName} • {c.carrierType}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
              isFoxconn
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

