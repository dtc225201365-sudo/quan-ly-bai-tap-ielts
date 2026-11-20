import React from 'react';
import { AssignmentFilter, AssignmentFilterCounts } from '@/types';

interface FilterTabsProps {
  currentFilter: AssignmentFilter;
  onFilterChange: (filter: AssignmentFilter) => void;
  counts: AssignmentFilterCounts;
}

interface TabItem {
  id: AssignmentFilter;
  label: string;
  countKey: keyof AssignmentFilterCounts;
}

const TABS: TabItem[] = [
  { id: 'ALL', label: 'Tất cả', countKey: 'all' },
  { id: 'NOT_SUBMITTED', label: 'Chưa nộp', countKey: 'notSubmitted' },
  { id: 'SUBMITTED', label: 'Đã nộp', countKey: 'submitted' },
  { id: 'OVERDUE', label: 'Quá hạn', countKey: 'overdue' },
];

/**
 * FilterTabs Component - Thanh điều hướng bộ lọc trạng thái bài tập
 * Chuẩn VOICE_GUIDE: "Tất cả", "Chưa nộp", "Đã nộp", "Quá hạn" kèm số lượng
 * Chuẩn WAI-ARIA và không hiệu ứng glow neon
 */
export const FilterTabs: React.FC<FilterTabsProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <nav
      className="flex items-center gap-1.5 p-1 bg-slate-100/80 border border-slate-200/80 rounded-lg overflow-x-auto"
      role="tablist"
      aria-label="Bộ lọc bài tập theo trạng thái"
    >
      {TABS.map((tab) => {
        const isActive = currentFilter === tab.id;
        const count = counts[tab.countKey] || 0;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(tab.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1 min-h-[36px] ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-mono font-semibold rounded-full min-w-[20px] ${
                isActive
                  ? 'bg-slate-800 text-slate-100'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default FilterTabs;
