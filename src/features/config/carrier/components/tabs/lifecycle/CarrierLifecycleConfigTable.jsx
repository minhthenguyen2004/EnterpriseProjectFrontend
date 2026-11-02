import { useState, useMemo } from "react";
import useTheme from "../../../../../../hooks/useTheme";

const EMPTY_FORM = {
  lineName: "",
  productName: "",
  productType: "",
  carrierType: "",
  assignedCarrierCode: "",
  endStep: "",
  maxCycles: 2000,
  warningCycles: 1600,
  maxInspectionHours: 720,
  fixedInspectionHours: 168,
  isActive: true,
};

function FormField({ label, children, isFoxconn, colSpan }) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isFoxconn ? "text-slate-500" : "text-zinc-500"}`}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CarrierLifecycleConfigTable({ configs, onAdd, onUpdate, onDelete, onRefresh, onNotify }) {
  const { brand } = useTheme();
  const isFoxconn = brand === "foxconn";

  const [filterLine, setFilterLine] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [modalMode, setModalMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return (configs || []).filter((cfg) => {
      if (filterLine.trim() && !cfg.lineName?.toLowerCase().includes(filterLine.trim().toLowerCase())) return false;
      if (filterProduct.trim() && !cfg.productName?.toLowerCase().includes(filterProduct.trim().toLowerCase())) return false;
      if (filterCode.trim() && !cfg.assignedCarrierCode?.toLowerCase().includes(filterCode.trim().toLowerCase())) return false;
      if (filterStatus === "ACTIVE" && !cfg.isActive) return false;
      if (filterStatus === "DISABLED" && cfg.isActive) return false;
      return true;
    });
  }, [configs, filterLine, filterProduct, filterCode, filterStatus]);

  const handleOpenAdd = () => { setFormData(EMPTY_FORM); setEditingId(null); setModalMode("add"); };
  const handleOpenEdit = (cfg) => { setFormData({ ...cfg }); setEditingId(cfg.id); setModalMode("edit"); };
  const handleFormChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleCancelModal = () => { setModalMode(null); setEditingId(null); setFormData(EMPTY_FORM); };

  const handleSave = () => {
    if (!formData.lineName.trim() || !formData.productName.trim() || !formData.assignedCarrierCode.trim()) {
      onNotify?.("Vui long nhap day du: Chuyen, San pham va Ma khay chi dinh.");
      return;
    }
    if (modalMode === "add") {
      onAdd?.(formData);
      onNotify?.(`Da them cau hinh vong doi moi cho ${formData.lineName} - ${formData.productName}.`);
    } else {
      onUpdate?.(editingId, formData);
      onNotify?.(`Da cap nhat cau hinh [${editingId}] thanh cong.`);
    }
    setModalMode(null);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(deleteTargetId);
    onNotify?.(`Da xoa cau hinh vong doi [${deleteTargetId}].`);
    setDeleteTargetId(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => { onRefresh?.(); setIsRefreshing(false); onNotify?.("Da lam moi danh sach cau hinh vong doi."); }, 500);
  };

  const cardCls = isFoxconn ? "bg-white border-slate-200 shadow-sm" : "bg-zinc-900 border-zinc-800";
  const inputCls = isFoxconn
    ? "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
    : "bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-[#76B900] focus:ring-[#76B900]/20";
  const selectCls = isFoxconn
    ? "bg-white border-slate-300 text-slate-700 focus:border-blue-500"
    : "bg-zinc-800 border-zinc-700 text-zinc-200 focus:border-[#76B900]";
  const thCls = isFoxconn ? "bg-slate-50 text-slate-600 border-slate-200" : "bg-zinc-950 text-zinc-400 border-zinc-800";
  const trHoverCls = isFoxconn ? "hover:bg-slate-50" : "hover:bg-zinc-800/50";
  const dividerCls = isFoxconn ? "divide-slate-100" : "divide-zinc-800";
  const tdCls = isFoxconn ? "text-slate-700" : "text-zinc-300";
  const primaryBtn = isFoxconn
    ? "bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20"
    : "bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/25";
  const secondaryBtn = isFoxconn
    ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
    : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700";

  const clearBtn = (fn) => (
    <button type="button" onClick={fn}
      className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] cursor-pointer
        ${isFoxconn ? "bg-slate-200 text-slate-600 hover:bg-slate-300" : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}>
      x
    </button>
  );

  return (
    <>
      <div className={`rounded-2xl border transition-all ${cardCls}`}>
        {/* Header + Action Bar */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 pt-5 pb-4 border-b ${isFoxconn ? "border-slate-100" : "border-zinc-800"}`}>
          <div>
            <h3 className={`font-bold text-base flex items-center gap-2 ${isFoxconn ? "text-slate-900" : "text-white"}`}>
              <span className="text-lg">&#9881;&#65039;</span>
              <span>Cấu hình vòng đời (Lifecycle Configs)</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${isFoxconn ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                {filtered.length} bản ghi
              </span>
            </h3>
            <p className={`text-xs mt-0.5 ${isFoxconn ? "text-slate-500" : "text-zinc-500"}`}>
              Thiết lập quy tắc chu kỳ, cảnh báo và kiểm định cho từng tổ hợp Chuyên - Sản phẩm - Khay.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button id="lifecycle-config-add-btn" type="button" onClick={handleOpenAdd}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${primaryBtn}`}>
              + Thêm cấu hình
            </button>
            <button id="lifecycle-config-refresh-btn" type="button" onClick={handleRefresh} disabled={isRefreshing}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${secondaryBtn}`}>
              <svg className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Làm mới
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className={`px-5 py-3 border-b flex flex-wrap gap-2 ${isFoxconn ? "border-slate-100 bg-slate-50/60" : "border-zinc-800 bg-zinc-950/40"}`}>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-line" type="text" placeholder="Lọc theo chuyền (Line)..."
              value={filterLine} onChange={(e) => setFilterLine(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none ring-0 focus:ring-2 ${inputCls}`} />
            {filterLine && clearBtn(() => setFilterLine(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-product" type="text" placeholder="Lọc theo Model (Product)..."
              value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none ring-0 focus:ring-2 ${inputCls}`} />
            {filterProduct && clearBtn(() => setFilterProduct(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-code" type="text" placeholder="Mã khay chỉ định..."
              value={filterCode} onChange={(e) => setFilterCode(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none ring-0 focus:ring-2 ${inputCls}`} />
            {filterCode && clearBtn(() => setFilterCode(""))}
          </div>
          <select id="lifecycle-filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className={`shrink-0 px-3 py-2 text-xs rounded-xl border transition-all outline-none cursor-pointer ${selectCls}`}>
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang kích hoạt</option>
            <option value="DISABLED">Đã vô hiệu hóa</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className={`text-[10px] font-bold uppercase tracking-wider border-b select-none ${thCls}`}>
              <tr>
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 min-w-24">Chuyền</th>
                <th className="py-3 px-3 min-w-32">Sản phẩm</th>
                <th className="py-3 px-3 min-w-28">Product Type</th>
                <th className="py-3 px-3 min-w-36">Loại khay</th>
                <th className="py-3 px-3 min-w-44">Mã khay chỉ định</th>
                <th className="py-3 px-3 min-w-24">End Step</th>
                <th className="py-3 px-3 text-right min-w-28">Chu kỳ tối đa</th>
                <th className="py-3 px-3 text-right min-w-28">Chu kỳ cảnh báo</th>
                <th className="py-3 px-3 text-right min-w-28">Giờ KT tối đa</th>
                <th className="py-3 px-3 text-right min-w-28">Giờ KT cố định</th>
                <th className="py-3 px-3 text-center min-w-28">Trạng thái</th>
                <th className="py-3 px-3 text-center min-w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${dividerCls}`}>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={13} className={`py-14 text-center text-xs ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>
                    Không tìm thấy cấu hình vòng đời nào phù hợp.
                  </td>
                </tr>
              ) : filtered.map((cfg, idx) => (
                <tr key={cfg.id} className={`transition-colors ${trHoverCls}`}>
                  <td className={`py-3 px-3 text-center font-mono font-bold text-[11px] ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>{idx + 1}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${isFoxconn ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-blue-500/15 text-blue-400 border-blue-500/30"}`}>
                      {cfg.lineName}
                    </span>
                  </td>
                  <td className={`py-3 px-3 font-semibold ${isFoxconn ? "text-slate-800" : "text-zinc-100"}`}>{cfg.productName}</td>
                  <td className={`py-3 px-3 ${tdCls}`}>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] border ${isFoxconn ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-zinc-800 text-white border-zinc-700"}`}>
                      {cfg.productType}
                    </span>
                  </td>
                  <td className={`py-3 px-3 ${tdCls}`}>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] border ${isFoxconn ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-indigo-500/15 text-indigo-400 border-indigo-500/30"}`}>
                      {cfg.carrierType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border tracking-wide ${isFoxconn ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                      {cfg.assignedCarrierCode}
                    </span>
                  </td>
                  <td className={`py-3 px-3 ${tdCls}`}>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${isFoxconn ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-zinc-800 text-white border-zinc-700"}`}>
                      {cfg.endStep}
                    </span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-900" : "text-white"}`}>
                    {cfg.maxCycles.toLocaleString("vi-VN")} <span className={`text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>lượt</span>
                  </td>
                  <td className="py-3 px-3 text-right font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                    {cfg.warningCycles.toLocaleString("vi-VN")} <span className={`text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>lượt</span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-700" : "text-zinc-300"}`}>
                    {cfg.maxInspectionHours}<span className={`ml-0.5 text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>h</span>
                  </td>
                  <td className={`py-3 px-3 text-right font-bold tabular-nums ${isFoxconn ? "text-slate-700" : "text-zinc-300"}`}>
                    {cfg.fixedInspectionHours}<span className={`ml-0.5 text-[10px] font-normal ${isFoxconn ? "text-slate-400" : "text-zinc-500"}`}>h</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.isActive
                      ? isFoxconn ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : isFoxconn ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-zinc-800 text-zinc-500 border-zinc-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                      {cfg.isActive ? "ACTIVE" : "DISABLED"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button id={`lifecycle-edit-${cfg.id}`} type="button" onClick={() => handleOpenEdit(cfg)} title="Sua cau hinh"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${isFoxconn ? "bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 border-slate-200 hover:border-blue-300" : "bg-zinc-800 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 border-zinc-700 hover:border-blue-500/30"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button id={`lifecycle-delete-${cfg.id}`} type="button" onClick={() => setDeleteTargetId(cfg.id)} title="Xoa cau hinh"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${isFoxconn ? "bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 border-slate-200 hover:border-rose-300" : "bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border-zinc-700 hover:border-rose-500/30"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`px-5 py-2.5 border-t text-xs ${isFoxconn ? "border-slate-100 text-slate-400" : "border-zinc-800 text-zinc-500"}`}>
          Hiển thị {filtered.length} / {(configs || []).length} cấu hình vòng đời
        </div>
      </div>

      {/* Modal Add/Edit */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleCancelModal}>
          <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${isFoxconn ? "bg-white border-slate-200" : "bg-zinc-900 border-zinc-700"}`}
            onClick={(e) => e.stopPropagation()}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isFoxconn ? "border-slate-200 bg-slate-50" : "border-zinc-800 bg-zinc-950"}`}>
              <h3 className={`font-bold text-sm ${isFoxconn ? "text-slate-900" : "text-white"}`}>
                {modalMode === "add" ? "Them Cau Hinh Vong Doi Moi" : `Sua Cau Hinh [${editingId}]`}
              </h3>
              <button type="button" onClick={handleCancelModal}
                className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isFoxconn ? "hover:bg-slate-200 text-slate-500" : "hover:bg-zinc-800 text-zinc-400"}`}>
                x
              </button>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[68vh] overflow-y-auto">
              <FormField label="Chuyen (Line) *" isFoxconn={isFoxconn}>
                <input type="text" placeholder="VD: Line01" value={formData.lineName}
                  onChange={(e) => handleFormChange("lineName", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all ${inputCls}`} />
              </FormField>
              <FormField label="San pham (Product) *" isFoxconn={isFoxconn}>
                <input type="text" placeholder="VD: GB200 NVL72" value={formData.productName}
                  onChange={(e) => handleFormChange("productName", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all ${inputCls}`} />
              </FormField>
              <FormField label="Product Type" isFoxconn={isFoxconn}>
                <input type="text" placeholder="VD: GPU Board" value={formData.productType}
                  onChange={(e) => handleFormChange("productType", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all ${inputCls}`} />
              </FormField>
              <FormField label="Loai khay" isFoxconn={isFoxconn}>
                <input type="text" placeholder="VD: GPU Component Tray" value={formData.carrierType}
                  onChange={(e) => handleFormChange("carrierType", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all ${inputCls}`} />
              </FormField>
              <FormField label="Ma khay chi dinh *" isFoxconn={isFoxconn} colSpan>
                <input type="text" placeholder="VD: TRAY-GPU-L01-001" value={formData.assignedCarrierCode}
                  onChange={(e) => handleFormChange("assignedCarrierCode", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all font-mono ${inputCls}`} />
              </FormField>
              <FormField label="End Step" isFoxconn={isFoxconn}>
                <input type="text" placeholder="VD: PRESS-01" value={formData.endStep}
                  onChange={(e) => handleFormChange("endStep", e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all ${inputCls}`} />
              </FormField>
              <FormField label="Trang thai" isFoxconn={isFoxconn}>
                <select value={formData.isActive ? "ACTIVE" : "DISABLED"}
                  onChange={(e) => handleFormChange("isActive", e.target.value === "ACTIVE")}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer transition-all ${selectCls}`}>
                  <option value="ACTIVE">Dang kich hoat</option>
                  <option value="DISABLED">Da vo hieu hoa</option>
                </select>
              </FormField>
              <FormField label="Chu ky toi da (luot)" isFoxconn={isFoxconn}>
                <input type="number" min="1" value={formData.maxCycles}
                  onChange={(e) => handleFormChange("maxCycles", Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
              </FormField>
              <FormField label="Chu ky canh bao (luot)" isFoxconn={isFoxconn}>
                <input type="number" min="1" value={formData.warningCycles}
                  onChange={(e) => handleFormChange("warningCycles", Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
              </FormField>
              <FormField label="Gio KT toi da (h)" isFoxconn={isFoxconn}>
                <input type="number" min="1" value={formData.maxInspectionHours}
                  onChange={(e) => handleFormChange("maxInspectionHours", Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
              </FormField>
              <FormField label="Gio KT co dinh (h)" isFoxconn={isFoxconn}>
                <input type="number" min="1" value={formData.fixedInspectionHours}
                  onChange={(e) => handleFormChange("fixedInspectionHours", Number(e.target.value))}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ring-0 focus:ring-2 transition-all text-right font-bold ${inputCls}`} />
              </FormField>
            </div>
            <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isFoxconn ? "border-slate-200 bg-slate-50" : "border-zinc-800 bg-zinc-950"}`}>
              <button type="button" onClick={handleCancelModal}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${secondaryBtn}`}>
                Hủy
              </button>
              <button type="button" onClick={handleSave}
                className={`px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md ${primaryBtn}`}>
                {modalMode === "add" ? "Thêm cấu hình" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTargetId && (
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
                Bạn có chắc muốn xóa cấu hình <span className="font-bold font-mono">[{deleteTargetId}]</span>? Hành động này không thể hoàn tác.
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
      )}
    </>
  );
}
