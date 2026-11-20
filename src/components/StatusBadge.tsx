import React from 'react';
import { AssignmentStatus, StatusLabel, LateLabel } from '@/types';

interface StatusBadgeProps {
  status: AssignmentStatus;
  isLate?: boolean;
  statusLabel?: StatusLabel;
  lateLabel?: LateLabel;
  className?: string;
}

/**
 * StatusBadge - Hiển thị 4 loại huy hiệu trạng thái chuẩn Impeccable (WCAG AAA)
 * 1. Chưa nộp: Slate-100, viền Slate-300, chữ Slate-800
 * 2. Quá hạn: Rose-50, viền Rose-200, chữ Rose-800
 * 3. Đã nộp (Đúng hạn): Emerald-50, viền Emerald-200, chữ Emerald-800
 * 4. Nộp trễ: Badge Đã nộp (Emerald) + Tag phụ Nộp trễ (Amber-50/200/800)
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  isLate = false,
  statusLabel,
  lateLabel,
  className = '',
}) => {
  // Trạng thái: ĐÃ NỘP
  if (status === 'SUBMITTED') {
    const isSubmittedLate = isLate || lateLabel === 'Nộp trễ';

    return (
      <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
          title="Bài tập đã được nộp thành công"
        >
          {statusLabel || 'Đã nộp'}
        </span>
        {isSubmittedLate && (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200"
            title="Nộp sau thời hạn quy định"
          >
            {lateLabel || 'Nộp trễ'}
          </span>
        )}
      </div>
    );
  }

  // Trạng thái: QUÁ HẠN
  if (status === 'OVERDUE') {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-800 border border-red-200 ${className}`}
        title="Đã quá thời hạn nộp bài"
      >
        {statusLabel || 'Quá hạn'}
      </span>
    );
  }

  // Trạng thái: CHƯA NỘP (NOT_SUBMITTED)
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-300 ${className}`}
      title="Bài tập còn trong hạn nộp"
    >
      {statusLabel || 'Chưa nộp'}
    </span>
  );
};

export default StatusBadge;
