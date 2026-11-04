import { useState, useMemo } from "react";
import useTheme from "../../../../../../hooks/useTheme";
import FilterToolbar from "./FilterToolbar";
import TableConfig from "./TableConfig";
import AddEditForm from "./AddEditForm";
import DeleteConfirmation from "./DeleteConfirmation";

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
  note: "",
  isActive: true,
};

export default function CarrierLifecycleConfig({ configs, onAdd, onUpdate, onDelete, onRefresh, onNotify }) {
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
          <div className="flex items-center gap-2 shrink-0">
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
        <FilterToolbar
          isFoxconn={isFoxconn}
          filterLine={filterLine}
          filterProduct={filterProduct}
          setFilterProduct={setFilterProduct}
          setFilterLine={setFilterLine}
          setFilterCode={setFilterCode}
          filterCode={filterCode}
          clearBtn={clearBtn}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          inputCls={inputCls}
          selectCls={selectCls}
        />

        {/* Table */}
        <TableConfig
           thCls={thCls}
           dividerCls={dividerCls}
           isFoxconn={isFoxconn}
           trHoverCls={trHoverCls}
           tdCls={tdCls}
           handleOpenEdit={handleOpenEdit}
           setDeleteTargetId={setDeleteTargetId}
           filtered={filtered}
        />

        <div className={`px-5 py-2.5 border-t text-xs ${isFoxconn ? "border-slate-100 text-slate-400" : "border-zinc-800 text-zinc-500"}`}>
          Hiển thị {filtered.length} / {(configs || []).length} cấu hình vòng đời
        </div>
      </div>

      {/* Modal Add/Edit */}
      {modalMode && (
        <AddEditForm 
          handleCancelModal={handleCancelModal}
          isFoxconn={isFoxconn}
          formData={formData}
          modalMode={modalMode}
          editingId={editingId}
          inputCls={inputCls}
          handleFormChange={handleFormChange}
          secondaryBtn={secondaryBtn}
          primaryBtn={primaryBtn}
          handleSave={handleSave}
          selectCls={selectCls}
        />
      )}

      {/* Delete Confirm */}
      {deleteTargetId && (
        <DeleteConfirmation
            isFoxconn={isFoxconn}
            deleteTargetId={deleteTargetId}
            setDeleteTargetId={setDeleteTargetId}
            secondaryBtn={secondaryBtn}
        />
      )}
    </>
  );
}
