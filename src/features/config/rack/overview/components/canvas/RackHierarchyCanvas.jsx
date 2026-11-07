import useTheme from '../../../../../../hooks/useTheme';
import FaceContainerCard from './FaceContainerCard';

export default function RackHierarchyCanvas({
  selectedGroupName,
  onOpenRenameGroup,
  faces,
  onAddFace,
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

  return (
    <div className="space-y-4">
      {/* 1. Canvas Top Header: Layout Title + Rename Group Name Button */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xl">🗺️</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-sm sm:text-base font-black tracking-tight ${ isFoxconn ? "text-slate-800" : "text-white"} uppercase`}>
                Bố Cục Mặt Bằng Rack
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-extrabold border ${
                  isFoxconn
                    ? 'bg-blue-50 border-blue-200 text-[#002766]'
                    : 'bg-[#76B900]/10 border-[#76B900]/30 text-[#76B900]'
                }`}
              >
                [{selectedGroupName}]
              </span>

              {/* Nút giúp thay đổi tên groupname đc chọn trong phần lọc ở trên */}
              <button
                type="button"
                onClick={onOpenRenameGroup}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                  isFoxconn
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                }`}
                title="Thay đổi tên Group Name được chọn ở bộ lọc trên"
              >
                <span>✏️</span>
                <span>Đổi tên Group</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Cấu trúc phân cấp lồng nhau: Face (Mặt tủ) ➔ Group (Nhóm chuyền) ➔ Rack (Tủ thiết bị) ➔ Slot (Khe cắm)
            </p>
          </div>
        </div>

        {/* Quick Add Face CTA */}
        <button
          type="button"
          onClick={() => onAddFace()}
          className={`self-end sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
            isFoxconn
              ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
              : 'bg-[#76B900]/10 hover:bg-[#76B900]/20 text-[#76B900] border-[#76B900]/30'
          }`}
        >
          <span className="font-bold text-sm">+</span>
          <span>Thêm Face Mới</span>
        </button>
      </div>

      {/* 2. Hierarchical Nested Containers List */}
      <div className="space-y-5">
        {faces && faces.length > 0 ? (
          faces.map((face) => (
            <FaceContainerCard
              key={face.id}
              face={face}
              onEditFace={onEditFace}
              onDeleteFace={onDeleteFace}
              onAddGroup={onAddGroup}
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
            className={`p-12 rounded-3xl border border-dashed text-center transition-all ${
              isFoxconn
                ? 'bg-white border-slate-300 shadow-xs'
                : 'bg-zinc-900/40 border-zinc-800 shadow-xl'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center text-2xl">
              🔲
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
              Chưa có Face (Mặt tủ) nào trong bố cục hiện tại
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
              Bắt đầu xây dựng sơ đồ mặt bằng bằng cách tạo Face đầu tiên (ví dụ: Face Mặt Trước A).
            </p>
            <button
              type="button"
              onClick={() => onAddFace()}
              className={`mt-4 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
              }`}
            >
              ➕ Thêm Face Đầu Tiên
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

