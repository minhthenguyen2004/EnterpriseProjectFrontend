function DeleteConfirmation({isFoxconn, deleteTargetId, setDeleteTargetId, secondaryBtn }) {
    
    const handleDeleteConfirm = () => {
        onDelete?.(deleteTargetId);
        onNotify?.(`Da xoa cau hinh vong doi [${deleteTargetId}].`);
        setDeleteTargetId(null);
    };
    
    return(
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl border shadow-2xl p-6 ${isFoxconn ? "bg-white border-slate-200" : "bg-zinc-900 border-zinc-700"}`}>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h3 className={`font-bold text-sm ${isFoxconn ? "text-slate-900" : "text-white"}`}>Xác nhận xóa cấu hình</h3>
              <p className={`text-xs leading-relaxed ${isFoxconn ? "text-slate-500" : "text-zinc-400"}`}>
                Bạn có chắc muốn xóa cấu hình <span className={`font-bold ${isFoxconn ? "text-black" : "text-white"} `}>[{deleteTargetId}]</span>? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 mt-1 w-full">
                <button type="button" onClick={() => setDeleteTargetId(null)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${secondaryBtn}`}>
                  Hủy
                </button>
                <button type="button" onClick={handleDeleteConfirm}
                  className="flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all bg-rose-600 hover:bg-rose-700 text-white">
                  Xóa cấu hình
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default DeleteConfirmation