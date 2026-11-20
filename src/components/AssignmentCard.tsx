import React from 'react';
import { AssignmentWithStatus } from '@/types';
import StatusBadge from './StatusBadge';
import SkillBadge from './SkillBadge';
import { Calendar, Clock, UploadCloud, ExternalLink } from 'lucide-react';

interface AssignmentCardProps {
  assignment: AssignmentWithStatus;
  onSelect?: (assignment: AssignmentWithStatus) => void;
}

/**
 * AssignmentCard Component - Thẻ bài tập dành cho Mobile (< 768px)
 * Chuẩn Apple HIG & WCAG 2.1: Chiều cao nút >= 40px, touch target chuẩn cảm ứng
 */
export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onSelect,
}) => {
  const isOverdue = assignment.status === 'OVERDUE';

  return (
    <article className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
      {/* 1. Header Card: Kỹ năng + Mã bài bên trái, StatusBadge bên phải */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SkillBadge skill={assignment.skill} />
          <span className="font-mono text-xs font-medium text-slate-500">
            {assignment.code}
          </span>
        </div>
        <div>
          <StatusBadge
            status={assignment.status}
            isLate={assignment.isLate}
            statusLabel={assignment.statusLabel}
            lateLabel={assignment.lateLabel}
          />
        </div>
      </div>

      {/* 2. Body Card: Tiêu đề và Thời hạn */}
      <div className="mt-2.5">
        <h3 className="text-base font-semibold text-slate-900 leading-snug">
          {assignment.title}
        </h3>

        {assignment.description && (
          <p className="mt-1 text-xs text-slate-600 line-clamp-2">
            {assignment.description}
          </p>
        )}

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Hạn nộp */}
          <div
            className={`flex items-center gap-1.5 font-mono tabular-nums ${
              isOverdue ? 'text-red-700 font-medium' : 'text-slate-600'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
            <span>Hạn nộp: {assignment.formattedDueDate}</span>
          </div>

          {/* Ngày nộp */}
          <div className="flex items-center gap-1.5 font-mono tabular-nums text-slate-600">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
            <span>
              Ngày nộp:{' '}
              {assignment.formattedSubmittedAt ? (
                <span className="text-slate-900 font-medium">
                  {assignment.formattedSubmittedAt}
                </span>
              ) : (
                <span className="text-slate-400">Chưa nộp</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Footer Card: Nút hành động chuẩn cảm ứng >= 40px */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        {assignment.status === 'NOT_SUBMITTED' ? (
          <button
            type="button"
            onClick={() => onSelect?.(assignment)}
            className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-md transition-colors shadow-sm"
          >
            <UploadCloud className="w-4 h-4" aria-hidden="true" />
            <span>Nộp bài</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSelect?.(assignment)}
            className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 rounded-md transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <span>Xem chi tiết</span>
          </button>
        )}
      </div>
    </article>
  );
};

export default AssignmentCard;
