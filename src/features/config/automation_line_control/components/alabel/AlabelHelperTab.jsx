import useTheme from '../../../../../hooks/useTheme';
import useAlabelHelperData from '../../hooks/useAlabelHelperData';
import AlabelProcessLookup from './AlabelProcessLookup';
import AlabelActionControl from './AlabelActionControl';
import AlabelExecutionLogs from './AlabelExecutionLogs';

/**
 * Tab 3: ALABEL Helper (Thay thế AIOT Helpers)
 * - Tầng 1: Bố cục chia đôi 1 : 1 (Trái: Tra cứu tiến trình, Phải: Thao tác điều khiển ALABEL 7 sub-tabs)
 * - Tầng 2: Mục Log thực thi thao tác ALABEL (Full width 100%)
 */
export default function AlabelHelperTab({ filters }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const {
    // Process Lookup
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
    handleProcessLookup,

    // Sub-Tabs Management
    activeSubTab,
    setActiveSubTab,
    isExecutingAction,
    executeSubTabAction,

    // Sub-tab Forms
    undoResetForm,
    setUndoResetForm,
    transferForm,
    setTransferForm,
    clearUndoForm,
    setClearUndoForm,
    compensateForm,
    setCompensateForm,
    compensateRows,
    setCompensateRows,
    changeKeypartForm,
    setChangeKeypartForm,
    snDetailsForm,
    setSnDetailsForm,
    snDetailsList,
    errorLogsForm,
    setErrorLogsForm,
    errorLogsList,

    // Execution Logs
    executionLogs,
    rawLogsCount,
    logFilterLevel,
    setLogFilterLevel,
    logKeyword,
    setLogKeyword,
    autoScroll,
    setAutoScroll,
    handleClearLogs,
    handleExportLogs,
  } = useAlabelHelperData();

  return (
    <div className="space-y-6">
      {/* TẦNG 1: BỐ CỤC CHIA ĐÔI HAI PHÍA (TỈ LỆ 1 : 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Phía Bên Trái (50%): Tra Cứu Tiến Trình */}
        <AlabelProcessLookup
          searchType={searchType}
          setSearchType={setSearchType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          detectedModel={detectedModel}
          manualModel={manualModel}
          setManualModel={setManualModel}
          isModelDropdownExpanded={isModelDropdownExpanded}
          setIsModelDropdownExpanded={setIsModelDropdownExpanded}
          isSearching={isSearching}
          processResult={processResult}
          onExecuteSearch={handleProcessLookup}
        />

        {/* Phía Bên Phải (50%): Thao Tác Điều Khiển ALABEL */}
        <AlabelActionControl
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          isExecutingAction={isExecutingAction}
          executeSubTabAction={executeSubTabAction}
          undoResetForm={undoResetForm}
          setUndoResetForm={setUndoResetForm}
          transferForm={transferForm}
          setTransferForm={setTransferForm}
          clearUndoForm={clearUndoForm}
          setClearUndoForm={setClearUndoForm}
          compensateForm={compensateForm}
          setCompensateForm={setCompensateForm}
          compensateRows={compensateRows}
          setCompensateRows={setCompensateRows}
          changeKeypartForm={changeKeypartForm}
          setChangeKeypartForm={setChangeKeypartForm}
          snDetailsForm={snDetailsForm}
          setSnDetailsForm={setSnDetailsForm}
          snDetailsList={snDetailsList}
          errorLogsForm={errorLogsForm}
          setErrorLogsForm={setErrorLogsForm}
          errorLogsList={errorLogsList}
        />
      </div>

      {/* TẦNG 2: MỤC LOG THỰC THI THAO TÁC ALABEL (FULL WIDTH 100%) */}
      <AlabelExecutionLogs
        logs={executionLogs}
        rawLogsCount={rawLogsCount}
        filterLevel={logFilterLevel}
        setFilterLevel={setLogFilterLevel}
        keyword={logKeyword}
        setKeyword={setLogKeyword}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        onClearLogs={handleClearLogs}
        onExportLogs={handleExportLogs}
      />
    </div>
  );
}
