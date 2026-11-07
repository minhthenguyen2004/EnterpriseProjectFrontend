import { useState, useEffect } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function RenameGroupModal({
  isOpen,
  currentName,
  onClose,
  onSubmit
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [newName, setNewName] = useState(currentName || '');

  useEffect(() => {
    setNewName(currentName || '');
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      onSubmit(newName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className={`w-full max-w-sm rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between ${
            isFoxconn ? 'bg-slate-50/80 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">✏️</span>
            <h3 className="text-xs font-bold tracking-tight uppercase">Đổi Tên Group Name</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:text-zinc-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-zinc-300">
              Tên Group mới
            </label>
            <input
              type="text"
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={`w-full px-3 py-2 text-xs font-bold rounded-xl border outline-hidden transition-colors ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100'
              }`}
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-[#003893] text-white'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25'
              }`}
            >
              Lưu Tên Mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

