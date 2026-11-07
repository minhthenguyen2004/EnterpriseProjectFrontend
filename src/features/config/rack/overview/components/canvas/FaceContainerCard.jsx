import { useState, useMemo } from 'react';
import useTheme from '../../../../../../hooks/useTheme';
import GroupContainerCard from './GroupContainerCard';

export default function FaceContainerCard({
  face,
  onEditFace,
  onDeleteFace,
  onAddGroup,
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
  const [faceNameInput, setFaceNameInput] = useState(face.face_name);

  const handleSaveName = () => {
    if (faceNameInput.trim()) {
      onEditFace(face.id, faceNameInput.trim());
    }
    setIsEditingName(false);
  };

  // Calculate total racks & slots in this Face
  const { rackCount, slotCount } = useMemo(() => {
    let racks = 0;
    let slots = 0;

    (face.groups || []).forEach((g) => {
      racks += g.racks?.length || 0;
      (g.racks || []).forEach((r) => {
        slots += r.slots?.length || 0;
      });
    });

    return { rackCount: racks, slotCount: slots };
  }, [face.groups]);

  return (
    <div
      className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
        isFoxconn
          ? 'bg-slate-50/70 border-slate-300/80 shadow-xs'
          : 'bg-zinc-900/40 border-zinc-800 shadow-xl'
      }`}
    >
      {/* Face Header Bar */}
      <div
        className={`px-5 py-3.5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
          isFoxconn
            ? 'bg-slate-100/90 border-slate-200/90'
            : 'bg-zinc-900/90 border-zinc-800'
        }`}
      >
        {/* Left: Tên Face + Nút Sửa + (bao gồm X rack và Y slot) */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg">🔲</span>

          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={faceNameInput}
              onChange={(e) => setFaceNameInput(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') {
                  setFaceNameInput(face.face_name);
                  setIsEditingName(false);
                }
              }}
              className={`px-2.5 py-1 text-sm font-extrabold rounded-lg border outline-hidden ${
                isFoxconn
                  ? 'bg-white border-[#002766] text-[#002766]'
                  : 'bg-zinc-950 border-[#76B900] text-[#76B900]'
              }`}
            />
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-sm font-black tracking-tight ${ isFoxconn ? "text-black" : "text-white"}`}>
                {face.face_name}
              </h3>

              {/* Nút sửa tên Face */}
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className={`p-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  isFoxconn
                    ? 'hover:bg-slate-200 text-slate-700'
                    : 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
                title="Sửa tên Face"
              >
                ✏️
              </button>

              {/* Text thống kê: bao gồm bao nhiêu rack và bao nhiêu slot */}
              <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                (bao gồm{' '}
                <strong className={`font-bold ${ isFoxconn ? "text-black" : "text-white"}`}>
                  {rackCount}
                </strong>{' '}
                rack và{' '}
                <strong className={`font-bold ${ isFoxconn ? "text-black" : "text-white"}`}>
                  {slotCount}
                </strong>{' '}
                slot)
              </span>
            </div>
          )}
        </div>

        {/* Right: Nút Thêm Group + Nút Xóa Face */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          {/* Nút Thêm Group bên trong khung này */}
          <button
            type="button"
            onClick={() => onAddGroup(face.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              isFoxconn
                ? 'bg-white hover:bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-300'
                : 'bg-purple-950/40 hover:bg-purple-950/70 text-purple-300 border-purple-700/60 hover:border-purple-600'
            }`}
            title="Thêm một Group lồng vào trong khung Face này"
          >
            <span className="font-extrabold text-sm">+</span>
            <span>Thêm Group</span>
          </button>

          {/* Nút Xóa Face */}
          <button
            type="button"
            onClick={() => onDeleteFace(face.id)}
            className="p-2 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/40 cursor-pointer transition-colors"
            title="Xóa Face này và toàn bộ các Group, Rack bên trong"
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

      {/* Face Body: Groups List */}
      <div className="p-4 sm:p-5 space-y-4">
        {face.groups && face.groups.length > 0 ? (
          face.groups.map((group) => (
            <GroupContainerCard
              key={group.id}
              group={group}
              faceId={face.id}
              onEditGroup={onEditGroup}
              onDeleteGroup={onDeleteGroup}
              onAddRack={onAddRack}
              onEditRack={onEditRack}
              onDeleteRack={onDeleteRack}
              onOpenAddSlot={onOpenAddSlot}
              onEditSlot={onEditSlot}
              onDeleteSlot={onDeleteSlot}
              onSwapSlots={onSwapSlots}
              onSwapRacks={onSwapRacks}
            />
          ))
        ) : (
          <div
            className={`p-8 rounded-2xl border border-dashed text-center text-xs ${
              isFoxconn
                ? 'border-slate-300 text-slate-500 bg-white/60'
                : 'border-zinc-800 text-zinc-400 bg-zinc-950/30'
            }`}
          >
            <div className="text-2xl mb-1.5">👥</div>
            Chưa có Group nào trong Face này.
            <div className="mt-1">
              Nhấn <strong>"+ Thêm Group"</strong> ở trên để tạo nhóm chuyền lồng vào trong.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

