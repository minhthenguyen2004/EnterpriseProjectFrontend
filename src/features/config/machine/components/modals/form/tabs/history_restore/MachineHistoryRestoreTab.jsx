import { useState } from 'react';
import AuditLogsTable from './AuditLogsTable';
import AuditLogDiffModal from './AuditLogDiffModal';
import AuditLogsExplanation from './AuditLogsExplanation';
import { DEFAULT_MACHINE_AUDIT_LOGS } from '../../constants/formModalConstants';

/**
 * Tab 7: History & Restore (Nhật Ký Kiểm Toán Thay Đổi & Hoàn Tác Cấu Hình)
 * Quản lý danh sách logs, bộ lọc tìm kiếm, làm mới dữ liệu (Refresh),
 * xem so sánh phiên bản (Diff Viewer) và hoàn tác cấu hình (Rollback).
 */
export default function MachineHistoryRestoreTab({
  formData = {},
  onChange,
  isFoxconn = false
}) {
  // Lấy danh sách audit logs từ formData hoặc fallback mặc định
  const auditLogs = Array.isArray(formData.auditLogs) && formData.auditLogs.length > 0
    ? formData.auditLogs
    : DEFAULT_MACHINE_AUDIT_LOGS;

  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDiffLog, setSelectedDiffLog] = useState(null);
  const [confirmRollbackLog, setConfirmRollbackLog] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Hiển thị toast thông báo phản hồi nhanh
  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3500);
  };

  // Nút Refresh trên cùng của bảng
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Đã làm mới dữ liệu nhật ký kiểm toán từ server thành công!');
    }, 400);
  };

  // Mở modal xem Diff Before vs After
  const handleViewDiff = (logItem) => {
    setSelectedDiffLog(logItem);
  };

  // Yêu cầu xác nhận Rollback
  const handlePromptRollback = (logItem) => {
    setConfirmRollbackLog(logItem);
  };

  // Thực thi Rollback an toàn
  const handleExecuteRollback = () => {
    if (!confirmRollbackLog) return;

    const targetLog = confirmRollbackLog;
    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // Tạo bản ghi log mới ghi nhận hành động Rollback
    const newAuditRecord = {
      id: Date.now(),
      timestamp: formattedTimestamp,
      operatorId: 'V99999',
      operatorName: 'System Admin',
      action: 'ROLLBACK',
      targetTable: targetLog.targetTable,
      description: `Hoàn tác cấu hình về phiên bản #${targetLog.id} (bởi ${targetLog.operatorId} - ${targetLog.operatorName})`,
      diff: {
        before: targetLog.diff?.after || null,
        after: targetLog.diff?.before || null
      }
    };

    const updatedLogs = [newAuditRecord, ...auditLogs];

    if (onChange) {
      onChange('auditLogs', updatedLogs);

      // Nếu có dữ liệu diff.before, tiến hành khôi phục các trường tương ứng trong formData
      if (targetLog.diff?.before) {
        const beforeData = targetLog.diff.before;
        if (targetLog.targetTable === 'machine_config') {
          Object.keys(beforeData).forEach((key) => {
            onChange(key, beforeData[key]);
          });
        } else if (targetLog.targetTable === 'uph_config') {
          onChange('uphConfig', {
            ...(formData.uphConfig || {}),
            ...beforeData
          });
        }
      }
    }

    setConfirmRollbackLog(null);
    showToast(`Đã hoàn tác cấu hình về phiên bản #${targetLog.id} thành công!`);
  };

  // Lọc danh sách log theo searchQuery
  const filteredLogs = auditLogs.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const matchId = String(item.id).toLowerCase().includes(query);
    const matchTime = (item.timestamp || '').toLowerCase().includes(query);
    const matchOpId = (item.operatorId || '').toLowerCase().includes(query);
    const matchOpName = (item.operatorName || '').toLowerCase().includes(query);
    const matchAction = (item.action || '').toLowerCase().includes(query);
    const matchTable = (item.targetTable || '').toLowerCase().includes(query);
    const matchDesc = (item.description || '').toLowerCase().includes(query);

    return (
      matchId ||
      matchTime ||
      matchOpId ||
      matchOpName ||
      matchAction ||
      matchTable ||
      matchDesc
    );
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar my-2 space-y-3 pr-1 pb-10">
      {/* Toast thông báo phản hồi thao tác */}
      {feedbackToast && (
        <div
          role="status"
          aria-live="polite"
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-3 shadow-lg transition-all ${
            feedbackToast.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-200'
              : feedbackToast.type === 'info'
              ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-200'
              : isFoxconn
              ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
              : 'bg-zinc-900 border-[#76B900] text-[#76B900]'
          }`}
        >
          <span className="flex items-center gap-2">
            <span>{feedbackToast.type === 'error' ? '⚠️' : '✓'}</span>
            <span>{feedbackToast.message}</span>
          </span>
          <button
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bảng Nhật Ký Kiểm Toán (kèm nút Refresh trên cùng của bảng) */}
      <AuditLogsTable
        logs={filteredLogs}
        searchQuery={searchQuery}
        isRefreshing={isRefreshing}
        isFoxconn={isFoxconn}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        onViewDiff={handleViewDiff}
        onRollback={handlePromptRollback}
      />

      {/* Khung giải nghĩa quy chuẩn kiểm toán & hoàn tác */}
      <AuditLogsExplanation isFoxconn={isFoxconn} />

      {/* Modal xem đối chiếu Diff Before vs After */}
      <AuditLogDiffModal
        logItem={selectedDiffLog}
        isOpen={Boolean(selectedDiffLog)}
        isFoxconn={isFoxconn}
        onClose={() => setSelectedDiffLog(null)}
        onRollback={handlePromptRollback}
      />

      {/* Dialog xác nhận hoàn tác Rollback an toàn */}
      {confirmRollbackLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl transition-all ${
              isFoxconn
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[0_0_40px_rgba(0,0,0,0.8)]'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-sm font-black uppercase text-indigo-600 dark:text-indigo-400">
                  Xác Nhận Hoàn Tác Cấu Hình (Rollback)
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Phiên bản log: #{confirmRollbackLog.id}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-3 text-slate-600 dark:text-zinc-300">
              Bạn có chắc chắn muốn hoàn tác cấu hình phân hệ{' '}
              <strong className="text-slate-900 dark:text-zinc-100 font-mono">
                {confirmRollbackLog.targetTable}
              </strong>{' '}
              về phiên bản tại thời điểm{' '}
              <strong className="text-slate-900 dark:text-zinc-100 font-mono">
                {confirmRollbackLog.timestamp}
              </strong>{' '}
              do{' '}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {confirmRollbackLog.operatorId} - {confirmRollbackLog.operatorName}
              </strong>{' '}
              thực hiện không?
            </p>

            <div className="p-2.5 rounded-xl border mb-4 text-xs italic bg-slate-50 dark:bg-zinc-900 border-inherit">
              &ldquo;{confirmRollbackLog.description}&rdquo;
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmRollbackLog(null)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isFoxconn
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                }`}
              >
                Hủy Bỏ
              </button>

              <button
                type="button"
                onClick={handleExecuteRollback}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                  isFoxconn
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                }`}
              >
                <span>⏪</span>
                <span>Xác Nhận Hoàn Tác</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
