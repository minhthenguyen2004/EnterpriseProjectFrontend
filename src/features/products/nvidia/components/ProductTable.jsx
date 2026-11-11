import React from 'react';
import useTheme from '../../../../hooks/useTheme';
import ProductColumnFilterPopover from './ProductColumnFilterPopover';

export default function ProductTable({
  products,
  filterOptions,
  columnFilters,
  onToggleColumnFilter,
  onSelectAllColumnFilter,
  onClearColumnFilter,
  sortConfig,
  onSort,
  onEditItem,
  onDeleteItem,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`rounded-xl border transition-all shadow-xs ${
        isFoxconn
          ? 'bg-white border-slate-200/90'
          : 'bg-zinc-900/60 border-zinc-800/80 backdrop-blur-md'
      }`}
    >
      <div className="overflow-x-auto min-h-[380px]">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead className="relative z-10">
            <tr
              className={`border-b text-xs font-bold tracking-wider uppercase select-none ${
                isFoxconn
                  ? 'bg-slate-100/80 border-slate-200 text-slate-700'
                  : 'bg-zinc-800/70 border-zinc-700/80 text-zinc-300'
              }`}
            >
              {/* Cột 1: ID */}
              <th className="py-3 px-4 text-center w-20">ID</th>

              {/* Cột 2: MODEL (Có lọc & sort) */}
              <th className="py-2.5 px-4 w-60">
                <ProductColumnFilterPopover
                  title="MODEL"
                  field="model"
                  options={filterOptions.model}
                  selectedValues={columnFilters.model}
                  onToggleValue={onToggleColumnFilter}
                  onSelectAll={onSelectAllColumnFilter}
                  onClearFilter={onClearColumnFilter}
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              </th>

              {/* Cột 3: PRODUCT (Có lọc & sort) */}
              <th className="py-2.5 px-4 w-60">
                <ProductColumnFilterPopover
                  title="PRODUCT"
                  field="product"
                  options={filterOptions.product}
                  selectedValues={columnFilters.product}
                  onToggleValue={onToggleColumnFilter}
                  onSelectAll={onSelectAllColumnFilter}
                  onClearFilter={onClearColumnFilter}
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              </th>

              {/* Cột 4: MODEL NAME */}
              <th className="py-3 px-4 min-w-[320px]">MODEL NAME</th>

              {/* Cột 5: THAO TÁC */}
              <th className="py-3 px-4 text-center w-36">THAO TÁC</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            className={`divide-y text-xs ${
              isFoxconn
                ? 'divide-slate-200/70 bg-white text-slate-800'
                : 'divide-zinc-800/70 bg-zinc-900/30 text-zinc-200'
            }`}
          >
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      className="w-10 h-10 text-slate-400 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm font-semibold opacity-80">
                      Không tìm thấy model sản phẩm nào phù hợp
                    </p>
                    <p className="text-xs text-slate-400">
                      Vui lòng thử điều chỉnh hoặc xóa bớt các tiêu chí lọc bên trên.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isFoxconn
                      ? 'hover:bg-blue-50/40'
                      : 'hover:bg-zinc-800/50'
                  }`}
                >
                  {/* Cột 1: ID */}
                  <td className="py-3 px-4 text-center font-medium">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        isFoxconn
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      #{String(item.id).padStart(3, '0')}
                    </span>
                  </td>

                  {/* Cột 2: MODEL */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold text-xs px-2 py-1 rounded border tracking-tight ${
                          isFoxconn
                            ? 'bg-blue-50/70 text-blue-900 border-blue-200'
                            : 'bg-[#76B900]/10 text-[#76B900] border-[#76B900]/30'
                        }`}
                      >
                        {item.model}
                      </span>
                    </div>
                  </td>

                  {/* Cột 3: PRODUCT */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        isFoxconn
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-purple-950/50 text-purple-300 border-purple-800'
                      }`}
                    >
                      {item.product}
                    </span>
                  </td>

                  {/* Cột 4: MODEL NAME */}
                  <td className="py-3 px-4">
                    <div className={`${isFoxconn ? '' : 'text-gray-400'} font-medium`}>
                      {item.modelName}
                    </div>
                    {item.serialPrefix && (
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Prefix: {item.serialPrefix}
                      </div>
                    )}
                  </td>

                  {/* Cột 5: THAO TÁC */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Nút Sửa */}
                      <button
                        type="button"
                        onClick={() => onEditItem(item)}
                        title="Chỉnh sửa model"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer border ${
                          isFoxconn
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-blue-950/40 hover:bg-blue-900/60 text-blue-400 border-blue-800'
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>Sửa</span>
                      </button>

                      {/* Nút Xóa */}
                      <button
                        type="button"
                        onClick={() => onDeleteItem(item)}
                        title="Xóa model này"
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer border ${
                          isFoxconn
                            ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                            : 'bg-red-950/40 hover:bg-red-900/60 text-red-400 border-red-800'
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>Xóa</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

