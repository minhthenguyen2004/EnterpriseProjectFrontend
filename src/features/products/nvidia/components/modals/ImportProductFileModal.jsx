import React, { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function ImportProductFileModal({
  isOpen,
  onClose,
  onImportBatch,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewRows, setPreviewRows] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);

    // Mock parsed preview data from file
    const sampleParsed = [
      {
        customer: 'NVIDIA',
        modelSerial: 'GB200-NVL36',
        model: 'GB200-NVL36',
        productName: 'Blackwell GB200',
        product: 'Blackwell GB200',
        modelName: 'NVIDIA GB200 NVL36 Single-Rack Liquid-Cooled AI Solution',
        serialPrefix: 'SN-GB200-NVL36',
      },
      {
        customer: 'NVIDIA',
        modelSerial: 'B200-SXM6-288GB',
        model: 'B200-SXM6-288GB',
        productName: 'B200 GPU Server',
        product: 'B200 GPU Server',
        modelName: 'NVIDIA HGX B200 8-GPU Board Next-Gen (288GB HBM3e Memory)',
        serialPrefix: 'SN-B200-SXM6',
      },
      {
        customer: 'NVIDIA',
        modelSerial: 'CONNECTX-8-SUPER',
        model: 'CONNECTX-8-SUPER',
        productName: 'Quantum-2 InfiniBand',
        product: 'Quantum-2 InfiniBand',
        modelName: 'NVIDIA ConnectX-8 SuperNIC 800Gb/s PCIe Gen6 Adapter Card',
        serialPrefix: 'SN-CX8-SUPER',
      },
    ];
    setPreviewRows(sampleParsed);
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,customer,model_serial,product_name,model_name,serial_prefix\n' +
      'NVIDIA,GB200-NVL36,Blackwell GB200,NVIDIA GB200 NVL36 Single-Rack Solution,SN-GB200-NVL36\n' +
      'NVIDIA,B200-SXM6-288GB,B200 GPU Server,NVIDIA HGX B200 8-GPU Board Next-Gen,SN-B200-SXM6\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nvidia_product_models_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirm = () => {
    if (previewRows.length === 0) {
      alert('Vui lòng chọn file mẫu hoặc file dữ liệu hợp lệ trước khi Import!');
      return;
    }
    onImportBatch(previewRows);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transform transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/80 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">
                Thêm / Cập Nhật Product Model Bằng File
              </h3>
              <p className="text-xs text-slate-400">
                Hỗ trợ tệp định dạng Excel (.xlsx, .xls) hoặc CSV
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* File Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              isDragging
                ? isFoxconn
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-[#76B900] bg-[#76B900]/10'
                : isFoxconn
                ? 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
                : 'border-zinc-700 hover:border-zinc-500 bg-zinc-800/40'
            }`}
          >
            <svg
              className="w-10 h-10 mx-auto text-slate-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-semibold mb-1">
              Kéo & thả file Excel / CSV vào đây hoặc
            </p>
            <label className="inline-block">
              <span
                className={`text-xs px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all border ${
                  isFoxconn
                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    : 'bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700'
                }`}
              >
                Chọn tệp từ máy tính
              </span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </label>
            {selectedFile && (
              <p className="text-xs font-mono font-bold mt-2 text-emerald-600 dark:text-[#76B900]">
                ✓ Đã nạp file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Download Template Link */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Chưa có file mẫu chuẩn?</span>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className={`inline-flex items-center gap-1 font-semibold hover:underline cursor-pointer ${
                isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Tải file mẫu template (.csv)
            </button>
          </div>

          {/* Preview Table */}
          {previewRows.length > 0 && (
            <div className="border rounded-xl p-3 border-inherit text-xs">
              <div className="font-bold text-[11px] uppercase tracking-wider mb-2 opacity-80">
                Xem trước dữ liệu bóc tách ({previewRows.length} dòng):
              </div>
              <div className="overflow-x-auto max-h-36">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-inherit opacity-75 text-[10px] uppercase font-bold">
                      <th className="pb-1 px-2">Model</th>
                      <th className="pb-1 px-2">Product</th>
                      <th className="pb-1 px-2">Model Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {previewRows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-500/10">
                        <td className="py-1 px-2 font-mono font-bold">{r.model}</td>
                        <td className="py-1 px-2">{r.product}</td>
                        <td className="py-1 px-2 truncate max-w-[200px]">{r.modelName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-inherit flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-sm cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
            }`}
          >
            Xác nhận Import ({previewRows.length || 0} model)
          </button>
        </div>
      </div>
    </div>
  );
}

