import { useState } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

/**
 * Bảng Cấu Hình Định Mức Vòng Đời Theo Loại Khay (Tab Cấu hình vòng đời)
 */
export default function CarrierTypeLimitTable({ limits, onUpdateLimits, onNotify }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    onUpdateLimits((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, ...editForm } : item))
    );
    setEditingId(null);
    if (onNotify) {
      onNotify(`Đã lưu định mức chu kỳ cho loại khay: ${editForm.typeName}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900 border-zinc-800'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>Định Mức Vòng Đời Theo Loại Khay (Carrier Type Limits)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Thiết lập chu kỳ vận hành tối đa, ngưỡng cảnh báo sớm và chu kỳ kiểm định định kỳ cho từng loại khay.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead
            className={`text-[11px] font-bold uppercase tracking-wider border-b select-none ${
              isFoxconn ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-zinc-950 text-zinc-300 border-zinc-800'
            }`}
          >
            <tr>
              <th scope="col" className="py-3 px-4 min-w-40">Loại khay</th>
              <th scope="col" className="py-3 px-4 min-w-40">Vật liệu tiêu chuẩn</th>
              <th scope="col" className="py-3 px-4 text-right min-w-30">Định mức tối đa</th>
              <th scope="col" className="py-3 px-4 text-right min-w-30">Cảnh báo (80%)</th>
              <th scope="col" className="py-3 px-4 text-right min-w-32.5">Kiểm định (95%)</th>
              <th scope="col" className="py-3 px-4 text-right min-w-30">Hạn KT (Giờ)</th>
              <th scope="col" className="py-3 px-4 text-right min-w-30">Dung sai phẳng</th>
              <th scope="col" className="py-3 px-4 text-center min-w-25">Thao tác</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isFoxconn ? 'divide-slate-200' : 'divide-zinc-800'}`}>
            {limits.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isEditing
                      ? isFoxconn
                        ? 'bg-blue-50/50'
                        : 'bg-[#76B900]/10'
                      : isFoxconn
                      ? 'hover:bg-slate-50'
                      : 'hover:bg-zinc-800/40'
                  }`}
                >
                  {/* Loại khay */}
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-zinc-200">
                    <div>{item.typeName}</div>
                    <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                      Tag: {item.codePrefix}
                    </div>
                  </td>

                  {/* Vật liệu */}
                  <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">
                    {item.standardMaterial}
                  </td>

                  {/* Định mức tối đa */}
                  <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.maxCycles}
                        onChange={(e) =>
                          setEditForm({ ...editForm, maxCycles: Number(e.target.value) })
                        }
                        className="w-20 px-2 py-1 text-right rounded border bg-white dark:bg-zinc-900 text-xs font-bold"
                      />
                    ) : (
                      `${item.maxCycles.toLocaleString('vi-VN')} lượt`
                    )}
                  </td>

                  {/* Cảnh báo */}
                  <td className="py-3 px-4 text-right font-semibold text-amber-600 dark:text-amber-400">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.warningCycles}
                        onChange={(e) =>
                          setEditForm({ ...editForm, warningCycles: Number(e.target.value) })
                        }
                        className="w-20 px-2 py-1 text-right rounded border bg-white dark:bg-zinc-900 text-xs"
                      />
                    ) : (
                      `${item.warningCycles.toLocaleString('vi-VN')} lượt`
                    )}
                  </td>

                  {/* Kiểm định */}
                  <td className="py-3 px-4 text-right font-semibold text-orange-600 dark:text-orange-400">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.inspectionCycles}
                        onChange={(e) =>
                          setEditForm({ ...editForm, inspectionCycles: Number(e.target.value) })
                        }
                        className="w-20 px-2 py-1 text-right rounded border bg-white dark:bg-zinc-900 text-xs font-bold"
                      />
                    ) : (
                      `${item.inspectionCycles.toLocaleString('vi-VN')} lượt`
                    )}
                  </td>

                  {/* Hạn kiểm định (Giờ) */}
                  <td className="py-3 px-4 text-right font-bold text-slate-700 dark:text-zinc-300">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.maxInspectionIntervalHours}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            maxInspectionIntervalHours: Number(e.target.value),
                          })
                        }
                        className="w-20 px-2 py-1 text-right rounded border bg-white dark:bg-zinc-900 text-xs font-bold"
                      />
                    ) : (
                      `${item.maxInspectionIntervalHours}h`
                    )}
                  </td>

                  {/* Dung sai phẳng */}
                  <td className="py-3 px-4 text-right font-bold text-slate-700 dark:text-zinc-300">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.maxCoplanarityDeviationMm}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            maxCoplanarityDeviationMm: Number(e.target.value),
                          })
                        }
                        className="w-16 px-2 py-1 text-right rounded border bg-white dark:bg-zinc-900 text-xs font-bold"
                      />
                    ) : (
                      `≤ ${item.maxCoplanarityDeviationMm} mm`
                    )}
                  </td>

                  {/* Thao tác */}
                  <td className="py-3 px-4 text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-2.5 py-1 rounded bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 text-slate-700 dark:text-zinc-300 text-xs cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isFoxconn
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                        }`}
                      >
                        Sửa
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
