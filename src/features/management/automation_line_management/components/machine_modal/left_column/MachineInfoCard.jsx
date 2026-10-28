import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function MachineInfoCard({ info }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [copiedKey, setCopiedKey] = useState(null);

  if (!info) return null;

  const handleCopy = (key, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const fields = [
    { key: 'serialNumber', label: 'Serial Number', value: info.serialNumber, mono: true, canCopy: true },
    { key: 'productName', label: 'Product Name', value: info.productName, mono: false, highlight: true },
    { key: 'productType', label: 'Product Type', value: info.productType, mono: false },
    { key: 'lineName', label: 'Line Name', value: info.lineName, mono: false },
    { key: 'groupName', label: 'Group Name', value: info.groupName, mono: false },
    { key: 'machineName', label: 'Machine Name', value: info.machineName, mono: false, strong: true },
    { key: 'ipAddress', label: 'IP Address', value: info.ipAddress, mono: true, canCopy: true },
  ];

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 shadow-2xs'
          : 'bg-zinc-900/90 border-zinc-800 text-white shadow-md'
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isFoxconn ? 'bg-blue-600' : 'bg-[#76B900] shadow-[0_0_8px_#76B900]'
            }`}
          />
          <h4
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-slate-700' : 'text-white'
            }`}
          >
            Thông Tin Thiết Bị
          </h4>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFoxconn ? 'bg-blue-50 text-blue-700' : 'bg-[#76B900]/15 text-[#76B900]'
          }`}
        >
          Station Info
        </span>
      </div>

      {/* 7 Trường thông tin xếp theo hàng dọc */}
      <div className="space-y-2">
        {fields.map((f) => (
          <div
            key={f.key}
            className={`flex items-start justify-between gap-2 p-1.5 rounded-lg transition-colors ${
              isFoxconn
                ? 'hover:bg-white/80'
                : 'hover:bg-zinc-800/50'
            }`}
          >
            <span
              className={`text-[11px] font-semibold shrink-0 ${
                isFoxconn ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              {f.label}:
            </span>

            <div className="flex items-center gap-1.5 justify-end text-right min-w-0">
              <span
                className={`text-[11px] break-all select-all ${
                  f.mono ? 'font-bold' : ''
                } ${
                  f.strong || f.highlight
                    ? isFoxconn
                      ? 'font-black text-[#002766]'
                      : 'font-black text-white'
                    : isFoxconn
                      ? 'font-bold text-slate-800'
                      : 'font-bold text-zinc-100'
                }`}
                title={f.value}
              >
                {f.value}
              </span>

              {f.canCopy && (
                <button
                  type="button"
                  onClick={() => handleCopy(f.key, f.value)}
                  className={`p-0.5 rounded text-[10px] shrink-0 transition-opacity cursor-pointer ${
                    copiedKey === f.key
                      ? 'text-emerald-500 font-bold'
                      : 'opacity-40 hover:opacity-100'
                  }`}
                  title="Sao chép"
                >
                  {copiedKey === f.key ? '✓' : '📋'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
