import React from 'react';
import { AssignmentWithStatus, AssignmentFilter } from '@/types';
import StatusBadge from './StatusBadge';
import SkillBadge from './SkillBadge';
import { ExternalLink, UploadCloud, RotateCcw } from 'lucide-react';

interface AssignmentTableProps {
  assignments: AssignmentWithStatus[];
  onSelectAssignment?: (assignment: AssignmentWithStatus) => void;
  onResetFilter?: () => void;
  currentFilter?: AssignmentFilter;
}

/**
 * AssignmentTable Component - Bảng dữ liệu dành cho Desktop (>= 768px)
 * Phong cách shadcn/ui & TanStack Table: Căn lề chuẩn, tabular-nums, WCAG AAA
 */
export const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  onSelectAssignment,
  onResetFilter,
  currentFilter = 'ALL',
}) => {
  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-lg">
        <p className="text-base font-medium text-slate-800">
          {currentFilter !== 'ALL'
            ? 'Không tìm thấy bài tập phù hợp'
            : 'Chưa có bài tập nào'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {currentFilter !== 'ALL'
            ? 'Hãy thử chọn bộ lọc khác để xem danh sách bài tập.'
            : 'Các bài tập mới sẽ được cập nhật tại đây khi giảng viên giao bài.'}
        </p>
        {currentFilter !== 'ALL' && onResetFilter && (
          <button
            type="button"
            onClick={onResetFilter}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 text-left w-28">
                Mã bài
              </th>
              <th scope="col" className="py-3 px-4 text-left">
                Tên bài tập
              </th>
              <th scope="col" className="py-3 px-4 text-center w-24">
                Kỹ năng
              </th>
              <th scope="col" className="py-3 px-4 text-center w-36">
                Hạn nộp
              </th>
              <th scope="col" className="py-3 px-4 text-center w-36">
                Ngày nộp
              </th>
              <th scope="col" className="py-3 px-4 text-center w-40">
                Trạng thái
              </th>
              <th scope="col" className="py-3 px-4 text-right w-44">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {assignments.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {/* 1. Mã bài */}
                <td className="py-3.5 px-4 font-mono text-xs font-medium text-slate-500 whitespace-nowrap">
                  {item.code}
                </td>

                {/* 2. Tên bài tập */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900 group-hover:text-slate-950">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-slate-500 line-clamp-1 max-w-md">
                      {item.description}
                    </p>
                  )}
                </td>

                {/* 3. Kỹ năng */}
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <SkillBadge skill={item.skill} />
                </td>

                {/* 4. Hạn nộp */}
                <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-600 whitespace-nowrap tabular-nums">
                  {item.formattedDueDate}
                </td>

                {/* 5. Ngày nộp */}
                <td className="py-3.5 px-4 text-center font-mono text-xs whitespace-nowrap tabular-nums">
                  {item.formattedSubmittedAt ? (
                    <span className="text-slate-700">{item.formattedSubmittedAt}</span>
                  ) : (
                    <span className="text-slate-400 select-none">—</span>
                  )}
                </td>

                {/* 6. Trạng thái */}
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <StatusBadge
                    status={item.status}
                    isLate={item.isLate}
                    statusLabel={item.statusLabel}
                    lateLabel={item.lateLabel}
                  />
                </td>

                {/* 7. Thao tác */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    {item.status === 'NOT_SUBMITTED' ? (
                      <button
                        type="button"
                        onClick={() => onSelectAssignment?.(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-sm"
                      >
                        <UploadCloud className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Nộp bài</span>
                      </button>
                    ) : item.status === 'SUBMITTED' ? (
                      <button
                        type="button"
                        onClick={() => onSelectAssignment?.(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Xem chi tiết</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectAssignment?.(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Xem chi tiết</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentTable;
