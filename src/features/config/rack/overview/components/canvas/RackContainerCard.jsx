import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';
import SlotItemRow from './SlotItemRow';

export default function RackContainerCard({
  rack,
  faceId,
  groupId,
  onEditRack,
  onDeleteRack,
  onOpenAddSlot,
  onEditSlot,
  onDeleteSlot,
  onSwapSlots,
  onSwapRacks
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [isEditingName, setIsEditingName] = useState(false);
  const [rackNameInput, setRackNameInput] = useState(rack.rack_name);
  const [isRackDragging, setIsRackDragging] = useState(false);
  const [isRackDragOver, setIsRackDragOver] = useState(false);

  const handleSaveName = () => {
    if (rackNameInput.trim()) {
      onEditRack(faceId, groupId, rack.id, rackNameInput.trim());
    }
    setIsEditingName(false);
  };

  // Drag & drop handlers for Rack reordering
  const handleRackDragStart = (e) => {
    e.dataTransfer.setData('rack-drag', JSON.stringify({ faceId, groupId, rackId: rack.id }));
    setIsRackDragging(true);
  };

  const handleRackDragEnd = () => {
    setIsRackDragging(false);
    setIsRackDragOver(false);
  };

  const handleRackDragOver = (e) => {
    if (e.dataTransfer.types.includes('rack-drag')) {
      e.preventDefault();
      setIsRackDragOver(true);
    }
  };

  const handleRackDragLeave = () => {
    setIsRackDragOver(false);
  };

  const handleRackDrop = (e) => {
    setIsRackDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('rack-drag'));
      if (data && data.rackId && data.rackId !== rack.id) {
        onSwapRacks(faceId, groupId, data.rackId, rack.id);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div
      onDragOver={handleRackDragOver}
      onDragLeave={handleRackDragLeave}
      onDrop={handleRackDrop}
      className={`rounded-2xl border min-w-[240px] max-w-sm flex-1 flex flex-col transition-all duration-200 select-none ${
        isRackDragging ? 'opacity-40 scale-95' : 'opacity-100'
      } ${
        isRackDragOver
          ? isFoxconn
            ? 'ring-2 ring-blue-500 bg-blue-50/70'
            : 'ring-2 ring-[#76B900] bg-zinc-800'
          : isFoxconn
          ? 'bg-slate-100/80 border-slate-300/80 shadow-2xs'
          : 'bg-zinc-900 border-zinc-700/80 shadow-lg'
      }`}
    >
      {/* 1. Rack Header: Draggable Grip + Rack Name (Left) + Delete Button (Right) */}
      <div
        draggable
        onDragStart={handleRackDragStart}
        onDragEnd={handleRackDragEnd}
        className={`px-3.5 py-2.5 rounded-t-2xl border-b flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing transition-colors ${
          isFoxconn
            ? 'bg-white/80 border-slate-200 text-slate-800'
            : 'bg-zinc-950/70 border-zinc-800 text-zinc-100'
        }`}
        title="Kéo đầu Rack thả lên Rack khác để đổi thứ tự cột"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-slate-400 dark:text-zinc-500 text-xs cursor-grab">
            ⋮⋮
          </span>
          <span className="text-sm">🗄️</span>

          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={rackNameInput}
              onChange={(e) => setRackNameInput(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') {
                  setRackNameInput(rack.rack_name);
                  setIsEditingName(false);
                }
              }}
              className={`px-1.5 py-0.5 text-xs font-mono font-bold rounded border outline-hidden ${
                isFoxconn
                  ? 'bg-white border-blue-500 text-blue-900'
                  : 'bg-zinc-900 border-[#76B900] text-[#76B900]'
              }`}
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="font-mono font-bold text-xs truncate cursor-pointer hover:underline"
              title="Click để đổi tên Rack"
            >
              {rack.rack_name}
            </span>
          )}
        </div>

        {/* Delete Rack Button */}
        <button
          type="button"
          onClick={() => onDeleteRack(faceId, groupId, rack.id)}
          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer transition-colors"
          title="Xóa tủ Rack này"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* 2. Subheader Action: Add Slot Button */}
      <div className="p-2.5 pb-1">
        <button
          type="button"
          onClick={() => onOpenAddSlot(faceId, groupId, rack.id)}
          className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isFoxconn
              ? 'bg-blue-50/80 hover:bg-blue-100 text-blue-700 border-blue-200/90 shadow-2xs'
              : 'bg-[#76B900]/15 hover:bg-[#76B900]/25 text-[#76B900] border-[#76B900]/30 shadow-2xs'
          }`}
          title="Thêm slot mới vào tủ Rack này"
        >
          <span className="text-sm font-extrabold">+</span>
          <span>Thêm Slot</span>
        </button>
      </div>

      {/* 3. Rack Body: Slots List */}
      <div className="p-2.5 pt-1.5 space-y-2 flex-1 min-h-[120px]">
        {rack.slots && rack.slots.length > 0 ? (
          rack.slots.map((slot) => (
            <SlotItemRow
              key={slot.id}
              slot={slot}
              faceId={faceId}
              groupId={groupId}
              rackId={rack.id}
              onEditSlot={onEditSlot}
              onDeleteSlot={onDeleteSlot}
              onSwapSlots={onSwapSlots}
            />
          ))
        ) : (
          <div
            className={`p-4 rounded-xl border border-dashed text-center text-[11px] ${
              isFoxconn
                ? 'border-slate-300 text-slate-400 bg-white/40'
                : 'border-zinc-800 text-zinc-500 bg-zinc-950/40'
            }`}
          >
            Chưa có Slot nào.
            <div className="mt-1">Nhấn <strong>"+ Thêm Slot"</strong> ở trên để tạo khe cắm.</div>
          </div>
        )}
      </div>

      {/* Rack Footer Stats */}
      <div
        className={`px-3 py-1.5 rounded-b-2xl border-t text-[10px] font-mono flex items-center justify-between text-slate-500 dark:text-zinc-500 ${
          isFoxconn ? 'bg-slate-50/50 border-slate-200' : 'bg-zinc-950/40 border-zinc-800'
        }`}
      >
        <span>{rack.slots?.length || 0} Slots</span>
        <span>
          {rack.slots?.filter((s) => s.status === 'approved').length || 0} Approved
        </span>
      </div>
    </div>
  );
}

