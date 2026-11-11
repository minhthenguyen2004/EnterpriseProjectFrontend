import useTheme from '../../../../hooks/useTheme';
import CurrentMOGroup from './CurrentMOGroup';
import ProductInfo from './ProductInfo';
import SpecialManipulation from './SpecialManipulation';

export default function StageDetailsSidebar({
  selectedStep,
  productData,
  onOpenStageDetails,
  onUndo,
  onOpenChangeCarrier,
  onClearUndo,
  onResetCarrier
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="space-y-4">
      {/* 1. KHỐI CÔNG ĐOẠN HIỆN TẠI (Bước, Tên công đoạn, Trạng thái) */}
      <CurrentMOGroup
        isFoxconn={isFoxconn}
        selectedStep={selectedStep}
      />

      {/* 2. KHỐI THÔNG TIN SẢN PHẨM TRÌNH BÀY THEO HÀNG DỌC */}
      <ProductInfo
        isFoxconn={isFoxconn}
        productData={productData}
      />

      {/* 3. ĐỀ MỤC: THAO TÁC CÔNG ĐOẠN */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200/90 shadow-xs'
            : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⚙️</span>
          <h4 className={`text-xs font-black uppercase tracking-wider ${ isFoxconn ? "text-black" : "text-white"}`}>
            Thao tác công đoạn
          </h4>
        </div>

        {/* Nút Chi tiết công đoạn */}
        <button
          type="button"
          onClick={onOpenStageDetails}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 ${
            isFoxconn
              ? 'bg-blue-50 hover:bg-blue-100 text-[#002766] border-blue-200 hover:border-blue-300'
              : 'bg-[#76B900]/15 hover:bg-[#76B900]/25 text-[#76B900] border-[#76B900]/30 hover:border-[#76B900]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Chi tiết công đoạn (Xem lịch sử & Lỗi)</span>
        </button>
      </div>

      {/* 4. ĐỀ MỤC: THAO TÁC ĐẶC BIỆT (Loạt nút xếp theo hàng dọc) */}
      <SpecialManipulation
        isFoxconn={isFoxconn}
        onUndo={onUndo}
        onOpenChangeCarrier={onOpenChangeCarrier}
        onClearUndo={onClearUndo}
        onResetCarrier={onResetCarrier}
      />
    </div>
  );
}

