import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function StructureTreeModal({
  isOpen,
  onClose,
  location,
  productLine,
  selectedGroupName,
  faces = []
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [expandedNodes, setExpandedNodes] = useState({ root: true, faces: true });

  if (!isOpen) return null;

  const toggleNode = (key) => {
    setExpandedNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[85vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-white shadow-2xl backdrop-blur-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isFoxconn ? 'bg-slate-50/80 border-slate-200' : 'bg-zinc-950/60 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌳</span>
            <div>
              <h3 className="text-sm font-black tracking-tight uppercase">
                Sơ Đồ Cây Cấu Trúc Phân Cấp (Structure Tree)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Mô hình trực quan: Location ➔ Product ➔ Face ➔ Group ➔ Rack ➔ Slot
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tree Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs space-y-3">
          {/* Root Level */}
          <div className="space-y-2">
            <div
              onClick={() => toggleNode('root')}
              className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer font-bold ${
                isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
              }`}
            >
              <span>{expandedNodes.root ? '📂' : '📁'}</span>
              <span>📍 {location}</span>
              <span className="text-slate-400 dark:text-zinc-500 text-[10px]">
                ({productLine} • {selectedGroupName})
              </span>
            </div>

            {expandedNodes.root && (
              <div className="pl-6 border-l-2 border-slate-200 dark:border-zinc-800 space-y-3 mt-2">
                {faces.map((face, fIdx) => (
                  <div key={face.id} className="space-y-2">
                    {/* Face Level */}
                    <div
                      onClick={() => toggleNode(`face-${fIdx}`)}
                      className="flex items-center gap-2 py-1 font-bold text-slate-800 dark:text-zinc-200 cursor-pointer hover:underline"
                    >
                      <span>🔲</span>
                      <span>{face.face_name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal">
                        ({face.groups?.length || 0} groups)
                      </span>
                    </div>

                    {/* Group Level */}
                    <div className="pl-6 border-l-2 border-blue-200 dark:border-blue-900/40 space-y-2">
                      {(face.groups || []).map((grp) => (
                        <div key={grp.id} className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300 font-semibold">
                            <span>👥</span>
                            <span>{grp.group_name}</span>
                            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal">
                              ({grp.racks?.length || 0} racks)
                            </span>
                          </div>

                          {/* Rack Level */}
                          <div className="pl-6 border-l-2 border-amber-200 dark:border-amber-900/40 space-y-1.5">
                            {(grp.racks || []).map((rack) => (
                              <div key={rack.id} className="space-y-1">
                                <div className="flex items-center gap-1.5 text-slate-600 dark:text-zinc-300">
                                  <span>🗄️</span>
                                  <span className="font-bold">{rack.rack_name}</span>
                                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-normal">
                                    ({rack.slots?.length || 0} slots)
                                  </span>
                                </div>

                                {/* Slot Level */}
                                <div className="pl-6 flex flex-wrap gap-1.5 pt-0.5">
                                  {(rack.slots || []).map((slot) => {
                                    const isApproved = slot.status === 'approved';
                                    return (
                                      <span
                                        key={slot.id}
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                                          isApproved
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                                            : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
                                        }`}
                                      >
                                        <span>#{slot.slot_number}</span>
                                        <span>{slot.slot_name}</span>
                                        <span className="text-[9px] uppercase opacity-75">
                                          [{isApproved ? 'Approved' : 'Rejected'}]
                                        </span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between shrink-0 ${
            isFoxconn ? 'bg-slate-50/50 border-slate-200' : 'bg-zinc-950/40 border-zinc-800'
          }`}
        >
          <div className="text-[11px] text-slate-400 dark:text-zinc-500">
            Tổng: {faces.length} Faces
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

