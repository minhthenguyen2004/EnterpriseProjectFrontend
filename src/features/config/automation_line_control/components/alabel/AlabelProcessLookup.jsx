import useTheme from '../../../../../hooks/useTheme';
import { DB_ACTIVE_MODELS } from '../../constants/alabelConstants';
import CriteriaBasedSearchInput from './CriteriaBasedSearchInput';
import ProcedureResult from './ProcedureResult';
import ProductTypeDropdownMenu from './ProductTypeDropdownMenu';
import SearchCriteria from './SearchCriteria';

function AlabelProcessLookup({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  detectedModel,
  manualModel,
  setManualModel,
  isModelDropdownExpanded,
  setIsModelDropdownExpanded,
  isSearching,
  processResult,
  onExecuteSearch,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onExecuteSearch();
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
        isFoxconn ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/90 border-zinc-800 text-white'
      }`}
    >
      <div className="space-y-4">
        {/* Header Mục Tra Cứu */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isFoxconn ? 'bg-blue-50 text-blue-600' : 'bg-[#76B900]/10 text-[#76B900]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider">Tra Cứu Tiến Trình Sản Xuất</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Nhận diện vị trí, Router step và trạng thái đối tượng trên chuyền tự động
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            LOOKUP ENGINE
          </span>
        </div>

        {/* 1. Tiêu chí tìm kiếm: SN | Carrier | Keypart */}
        <SearchCriteria
          isFoxconn = {isFoxconn}
          setSearchType = {setSearchType}
          searchType = {searchType}
        />


        {/* Ô nhập liệu tìm kiếm */}
        <CriteriaBasedSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
          searchType={searchType}
          isFoxconn={isFoxconn}
          isSearching={isSearching}
          onExecuteSearch={onExecuteSearch}
        />

        {/* 2. Dòng sản phẩm (Model): Tự động nhận diện nếu để trống + Dropdown ẩn CSDL */}
        <ProductTypeDropdownMenu
          isFoxconn={isFoxconn}
          setIsModelDropdownExpanded={setIsModelDropdownExpanded}
          isModelDropdownExpanded={isModelDropdownExpanded}
          manualModel={manualModel}
          detectedModel={detectedModel}
          setManualModel={setManualModel}
          DB_ACTIVE_MODELS={DB_ACTIVE_MODELS}
        />

        {/* 3. Thẻ Kết Quả Tiến Trình Của Đối Tượng */}
        {processResult && (
          <ProcedureResult
            isFoxconn={isFoxconn}
            processResult={processResult}
          />
        )}
      </div>
    </div>
  );
}


export default AlabelProcessLookup