export default function ProductInfo({ isFoxconn, productData }) {
    return(
        <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200/70 dark:border-zinc-800/80">
          <span className="text-base">📦</span>
          <h3 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-zinc-100'}`}>
            Thông tin sản phẩm
          </h3>
        </div>

        {/* Trình bày theo hàng dọc: Loại mã, serial number, carrier, sản phẩm, loại, line */}
        <div className="space-y-2.5 text-xs">
          {/* Loại mã */}
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isFoxconn ? 'text-slate-400' : 'text-zinc-500'}`}>
              Loại mã:
            </span>
            <span className={`font-semibold ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'} mt-0.5`}>
              {productData.codeType || 'Serial Number (SN)'}
            </span>
          </div>

          {/* Serial number */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Serial number:
            </span>
            <span className={`font-black text-xs ${ isFoxconn ? 'text-slate-900' : 'text-zinc-100'} mt-0.5`}>
              {productData.serialNumber}
            </span>
          </div>

          {/* Carrier */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Carrier (Jig):
            </span>
            <span className={`font-bold ${ isFoxconn ? "text-black" : "text-white"}`}>
              {productData.carrierCode}
            </span>
          </div>

          {/* Sản phẩm */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Sản phẩm:
            </span>
            <span className={`font-bold ${ isFoxconn ? "text-black" : "text-white"}`}>
              {productData.productName}
            </span>
          </div>

          {/* Loại */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Loại:
            </span>
            <span className={`font-medium ${ isFoxconn ? "text-black" : "text-white"} mt-0.5`}>
              {productData.productCategory}
            </span>
          </div>

          {/* Line */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Line:
            </span>
            <span className={`font-semibold ${ isFoxconn ? "text-black" : "text-white"}`}>
              {productData.lineName}
            </span>
          </div>
        </div>
      </div>
    )
}