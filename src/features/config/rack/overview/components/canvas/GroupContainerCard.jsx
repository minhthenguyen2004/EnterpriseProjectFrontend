import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';
import RackContainerCard from './RackContainerCard';

export default function GroupContainerCard({
  group,
  faceId,
  onEditGroup,
  onDeleteGroup,
  onAddRack,
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
  const [groupNameInput, setGroupNameInput] = useState(group.group_name);

  const handleSaveName = () => {
    if (groupNameInput.trim()) {
      onEditGroup(faceId, group.id, groupNameInput.trim());
    }
    setIsEditingName(false);
  };

  const rackCount = group.racks?.length || 0;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isFoxconn
          ? 'bg-white border-blue-200/90 shadow-2xs'
          : 'bg-zinc-950/80 border-zinc-700/80 shadow-md'
      }`}
    >
      {/* Group Header Bar */}
      <div
        className={`px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          isFoxconn ? 'bg-blue-50/50 border-blue-100' : 'bg-zinc-900/70 border-zinc-800'
        }`}
      >
        {/* Left: Group Name + Edit Button + (bao gồm X rack) */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">👥</span>

          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={groupNameInput}
              onChange={(e) => setGroupNameInput(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') {
                  setGroupNameInput(group.group_name);
                  setIsEditingName(false);
                }
              }}
              className={`px-2 py-0.5 text-xs font-bold rounded border outline-hidden ${
                isFoxconn
                  ? 'bg-white border-[#002766] text-[#002766]'
                  : 'bg-zinc-950 border-[#76B900] text-[#76B900]'
              }`}
            />
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-xs font-bold tracking-tight ${ isFoxconn ? "text-black" : "text-white"}`}>
                {group.group_name}
              </span>

              {/* Nút sửa khung Group */}
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className={`p-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  isFoxconn
                    ? 'hover:bg-blue-100 text-blue-700'
                    : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Sửa tên khung Group"
              >
                ✏️
              </button>

              {/* Text thống kê: bao gồm bao nhiêu rack */}
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                (bao gồm <strong className={`font-bold ${ isFoxconn ? "text-black" : "text-white"}`}>{rackCount}</strong> rack)
              </span>
            </div>
          )}
        </div>

        {/* Right: Thêm Rack Button + Xóa Group Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {/* Nút Thêm Rack */}
          <button
            type="button"
            onClick={() => onAddRack(faceId, group.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
              isFoxconn
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200/90 shadow-2xs'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-2xs'
            }`}
            title="Thêm tủ Rack mới vào Group này"
          >
            <span className="font-bold">+</span>
            <span>Thêm Rack</span>
          </button>

          {/* Nút Xóa Group */}
          <button
            type="button"
            onClick={() => onDeleteGroup(faceId, group.id)}
            className="p-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/40 cursor-pointer transition-colors"
            title="Xóa Group này"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Group Body: Racks Container */}
      <div className="p-4 overflow-x-auto">
        {group.racks && group.racks.length > 0 ? (
          <div className="flex flex-wrap items-start gap-4">
            {group.racks.map((rack) => (
              <RackContainerCard
                key={rack.id}
                rack={rack}
                faceId={faceId}
                groupId={group.id}
                onEditRack={onEditRack}
                onDeleteRack={onDeleteRack}
                onOpenAddSlot={onOpenAddSlot}
                onEditSlot={onEditSlot}
                onDeleteSlot={onDeleteSlot}
                onSwapSlots={onSwapSlots}
                onSwapRacks={onSwapRacks}
              />
            ))}
          </div>
        ) : (
          <div
            className={`p-6 rounded-xl border border-dashed text-center text-xs ${
              isFoxconn
                ? 'border-slate-300 text-slate-500 bg-slate-50/50'
                : 'border-zinc-800 text-zinc-400 bg-zinc-950/40'
            }`}
          >
            Chưa có tủ Rack nào trong Group này.
            <div className="mt-1">
              Nhấn <strong>"+ Thêm Rack"</strong> ở góc trên bên phải để bổ sung tủ.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

