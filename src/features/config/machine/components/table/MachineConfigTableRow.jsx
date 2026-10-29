import useTheme from '../../../../../hooks/useTheme';

export default function MachineConfigTableRow({
  machine,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Helper for customer badge styling
  const getCustomerBadge = (cust) => {
    switch (cust) {
      case 'NVIDIA':
        return isFoxconn
          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
          : 'bg-[#76B900]/20 text-[#76B900] border-[#76B900]/40 font-bold';
      case 'Foxconn':
        return isFoxconn
          ? 'bg-blue-50 text-blue-800 border-blue-300'
          : 'bg-blue-950/60 text-blue-300 border-blue-800 font-bold';
      case 'Apple':
        return isFoxconn
          ? 'bg-slate-100 text-slate-800 border-slate-300'
          : 'bg-zinc-800 text-zinc-200 border-zinc-700 font-bold';
      case 'Cisco':
        return isFoxconn
          ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
          : 'bg-cyan-950/60 text-cyan-300 border-cyan-800 font-bold';
      default:
        return isFoxconn
          ? 'bg-slate-100 text-slate-700 border-slate-200'
          : 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <tr
      className={`border-b transition-colors group ${
        isFoxconn
          ? 'border-slate-200/80 hover:bg-blue-50/40 text-slate-800'
          : 'border-zinc-800/80 hover:bg-zinc-800/50 text-zinc-200'
      }`}
    >
      {/* 1. Customer */}
      <td className="px-3.5 py-3 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border tracking-wide ${getCustomerBadge(machine.customer)}`}>
          {machine.customer}
        </span>
      </td>

      {/* 2. Factory */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs font-medium">
        <span className="truncate max-w-40 inline-block" title={machine.factory}>
          {machine.factory}
        </span>
      </td>

      {/* 3. Floor */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs text-center">
        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${
          isFoxconn
            ? 'bg-slate-100 border-slate-200 text-slate-700'
            : 'bg-zinc-950 border-zinc-800 text-zinc-300'
        }`}>
          {machine.floor}
        </span>
      </td>

      {/* 4. Product Name */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs font-semibold">
        <span className="truncate max-w-40 inline-block" title={machine.productName}>
          {machine.productName}
        </span>
      </td>

      {/* 5. Product Type */}
      <td className={`px-3.5 py-3 whitespace-nowrap text-xs ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
        <span className="truncate max-w-40 inline-block" title={machine.productType}>
          {machine.productType}
        </span>
      </td>

      {/* 6. Line Name */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${machine.isActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="truncate max-w-42.5" title={machine.lineName}>
            {machine.lineName}
          </span>
        </div>
      </td>

      {/* 7. Step */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs">
        <span className={`truncate max-w-42.5 inline-block ${isFoxconn ? 'text-slate-600' : 'text-white'} font-medium`} title={machine.step}>
          {machine.step}
        </span>
      </td>

      {/* 8. Keys */}
      <td className="px-3.5 py-3 whitespace-nowrap font-mono text-[11px] font-bold">
        <span className={`px-2 py-0.5 rounded border ${
          isFoxconn
            ? 'bg-amber-50/60 text-amber-800 border-amber-200'
            : 'bg-amber-950/40 text-amber-300 border-amber-800/60'
        }`}>
          {machine.keys}
        </span>
      </td>

      {/* 9. Group Name */}
      <td className={`px-3.5 py-3 whitespace-nowrap text-xs ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
        <span className="truncate max-w-42.5 inline-block" title={machine.groupName}>
          {machine.groupName}
        </span>
      </td>

      {/* 10. Machine Name */}
      <td className="px-3.5 py-3 whitespace-nowrap text-xs font-black">
        <div className="flex items-center gap-2">
          <span className="truncate max-w-47.5" title={machine.machineName}>
            {machine.machineName}
          </span>
          {!machine.isActive && (
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 font-bold uppercase">
              Standby
            </span>
          )}
        </div>
      </td>

      {/* 11. IP Address */}
      <td className="px-3.5 py-3 whitespace-nowrap font-mono font-bold text-xs">
        <span className={`px-2 py-0.5 rounded ${
          isFoxconn
            ? 'bg-blue-50 text-blue-700'
            : 'bg-zinc-950 text-[#76B900]'
        }`}>
          {machine.stationIp}
        </span>
      </td>

      {/* 12. Host Name */}
      <td className={`px-3.5 py-3 whitespace-nowrap font-bold text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-white'}`}>
        <span className="truncate max-w-42.5 inline-block" title={machine.hostName}>
          {machine.hostName}
        </span>
      </td>

      {/* 13. Actions Column: 3 Functional Buttons */}
      <td className="px-3.5 py-3 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-1">
          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onOpenDetail(machine)}
            title="Xem chi tiết máy"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isFoxconn
                ? 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                : 'text-[#76B900] hover:bg-zinc-800 hover:text-[#86d400]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onOpenEdit(machine)}
            title="Chỉnh sửa cấu hình"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isFoxconn
                ? 'text-amber-600 hover:bg-amber-100 hover:text-amber-800'
                : 'text-amber-400 hover:bg-zinc-800 hover:text-amber-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onOpenDelete(machine)}
            title="Xóa máy khỏi cấu hình"
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isFoxconn
                ? 'text-rose-600 hover:bg-rose-100 hover:text-rose-800'
                : 'text-rose-400 hover:bg-zinc-800 hover:text-rose-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
