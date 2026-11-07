import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function SlotItemRow({
  slot,
  faceId,
  groupId,
  rackId,
  onEditSlot,
  onDeleteSlot,
  onSwapSlots
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const isApproved = slot.status === 'approved';

  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Drag and Drop handlers
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ faceId, groupId, rackId, slotId: slot.id }));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data && data.slotId && data.slotId !== slot.id) {
        onSwapSlots(faceId, groupId, rackId, data.slotId, slot.id);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-2 sm:p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 cursor-grab select-none ${
        isDragging ? 'opacity-40 scale-95' : 'opacity-100'
      } ${
        isDragOver
          ? isFoxconn
            ? 'ring-2 ring-blue-500 bg-blue-50'
            : 'ring-2 ring-[#76B900] bg-zinc-800'
          : isApproved
          ? isFoxconn
            ? 'bg-emerald-50/60 border-emerald-200/90 hover:bg-emerald-100/60'
            : 'bg-emerald-950/20 border-emerald-800/50 hover:bg-emerald-950/40 text-emerald-300'
          : isFoxconn
          ? 'bg-rose-50/60 border-rose-200/90 hover:bg-rose-100/60'
          : 'bg-rose-950/20 border-rose-800/50 hover:bg-rose-950/40 text-rose-300'
      }`}
      title="Kéo thả để đổi chỗ với Slot khác hoặc click để chỉnh sửa"
    >
      {/* Left: Drag Grip + Slot Number & Identifier */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-slate-400 dark:text-zinc-600 text-[10px] cursor-grab">
          ⋮⋮
        </span>

        <span
          className={`font-mono font-extrabold text-[11px] px-1.5 py-0.5 rounded ${
            isApproved
              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
          }`}
        >
          #{String(slot.slot_number).padStart(2, '0')}
        </span>

        <span className={`font-bold truncate text-[11px] ${isFoxconn ? "text-black" : "text-white"}`}>
          {slot.slot_name}
        </span>
      </div>

      {/* Right: Status Badge & Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
            isApproved
              ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-700/60'
              : 'bg-rose-100/80 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-400 dark:border-rose-700/60'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          <span>{isApproved ? 'Approved' : 'Rejected'}</span>
        </span>

        {/* Edit Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditSlot(faceId, groupId, rackId, slot.id, {
              status: isApproved ? 'rejected' : 'approved'
            });
          }}
          className={`p-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
            isFoxconn
              ? 'hover:bg-slate-200 text-slate-600'
              : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
          title={`Click để chuyển trạng thái sang ${isApproved ? 'Rejected' : 'Approved'}`}
        >
          🔄
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteSlot(faceId, groupId, rackId, slot.id);
          }}
          className="p-1 rounded-md text-[10px] text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50 cursor-pointer transition-colors"
          title="Xóa Slot này"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

