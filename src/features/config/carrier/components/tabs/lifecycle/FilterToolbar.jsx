function FilterToolbar({isFoxconn, filterLine, filterProduct, setFilterProduct, setFilterLine, setFilterCode, filterCode, clearBtn, filterStatus, setFilterStatus, inputCls, selectCls }) {
    return (
        <div className={`px-5 py-3 border-b flex flex-wrap gap-2 ${isFoxconn ? "border-slate-100 bg-slate-50/60" : "border-zinc-800 bg-zinc-950/40"}`}>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-line" type="text" placeholder="Lọc theo chuyền (Line)..."
              value={filterLine} onChange={(e) => setFilterLine(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterLine && clearBtn(() => setFilterLine(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-product" type="text" placeholder="Lọc theo Model (Product)..."
              value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterProduct && clearBtn(() => setFilterProduct(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-code" type="text" placeholder="Mã khay chỉ định..."
              value={filterCode} onChange={(e) => setFilterCode(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterCode && clearBtn(() => setFilterCode(""))}
          </div>
          <select id="lifecycle-filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className={`shrink-0 px-3 py-2 text-xs rounded-xl border transition-all outline-none cursor-pointer ${selectCls}`}>
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang kích hoạt</option>
            <option value="DISABLED">Đã vô hiệu hóa</option>
          </select>
        </div>
    )
}

export default FilterToolbar