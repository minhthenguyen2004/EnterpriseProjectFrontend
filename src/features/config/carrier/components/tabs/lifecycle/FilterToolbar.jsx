import { useTranslation } from "react-i18next";

function FilterToolbar({isFoxconn, filterLine, filterProduct, setFilterProduct, setFilterLine, setFilterCode, filterCode, clearBtn, filterStatus, setFilterStatus, inputCls, selectCls }) {
    const { t } = useTranslation('carrier');
    return (
        <div className={`px-5 py-3 border-b flex flex-wrap gap-2 ${isFoxconn ? "border-slate-100 bg-slate-50/60" : "border-zinc-800 bg-zinc-950/40"}`}>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-line" type="text" placeholder={t('config.lifecycle.filterLinePlaceholder')}
              value={filterLine} onChange={(e) => setFilterLine(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterLine && clearBtn(() => setFilterLine(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-product" type="text" placeholder={t('config.lifecycle.filterProductPlaceholder')}
              value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterProduct && clearBtn(() => setFilterProduct(""))}
          </div>
          <div className="relative flex-1 min-w-44">
            <input id="lifecycle-filter-code" type="text" placeholder={t('config.lifecycle.filterCodePlaceholder')}
              value={filterCode} onChange={(e) => setFilterCode(e.target.value)}
              className={`w-full pl-3 pr-8 py-2 text-xs rounded-xl border transition-all outline-none focus:ring-2 ${inputCls}`} />
            {filterCode && clearBtn(() => setFilterCode(""))}
          </div>
          <select id="lifecycle-filter-status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className={`shrink-0 px-3 py-2 text-xs rounded-xl border transition-all outline-none cursor-pointer ${selectCls}`}>
            <option value="ALL">{t('config.lifecycle.statusAll')}</option>
            <option value="ACTIVE">{t('config.lifecycle.statusActive')}</option>
            <option value="DISABLED">{t('config.lifecycle.statusDisabled')}</option>
          </select>
        </div>
    )
}

export default FilterToolbar
