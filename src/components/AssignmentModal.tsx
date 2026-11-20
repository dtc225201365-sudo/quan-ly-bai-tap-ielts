import React from 'react';
import { AssignmentWithStatus } from '@/types';
import StatusBadge from './StatusBadge';
import SkillBadge from './SkillBadge';
import { X, Calendar, Clock, FileText } from 'lucide-react';

interface AssignmentModalProps {
  assignment: AssignmentWithStatus | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AssignmentModal - Ngăn sổ chi tiết bài tập
 * Tuân thủ Voice Guide: Nút "Đóng" (1 từ), cấm từ bot
 * WAI-ARIA Accessible dialog
 */
export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  assignment,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !assignment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <SkillBadge skill={assignment.skill} />
            <span className="font-mono text-xs font-semibold text-slate-500">
              {assignment.code}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-md transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Đóng</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">
              {assignment.title}
            </h2>
            <div className="mt-2">
              <StatusBadge
                status={assignment.status}
                isLate={assignment.isLate}
                statusLabel={assignment.statusLabel}
                lateLabel={assignment.lateLabel}
              />
            </div>
          </div>

          {assignment.description && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Nội dung yêu cầu:</span>
              </div>
              <p>{assignment.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-md border border-slate-100">
            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <Calendar className="w-3.5 h-3.5" /> Hạn nộp:
              </span>
              <span className="font-mono font-medium text-slate-900">
                {assignment.formattedDueDate}
              </span>
            </div>
            <div>
              <span className="text-slate-500 flex items-center gap-1 mb-0.5">
                <Clock className="w-3.5 h-3.5" /> Ngày nộp:
              </span>
              <span className="font-mono font-medium text-slate-900">
                {assignment.formattedSubmittedAt || 'Chưa nộp'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
