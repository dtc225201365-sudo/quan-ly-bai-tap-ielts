import React from 'react';
import { AssignmentFilterCounts, AssignmentFilter } from '@/types';
import { BookOpen, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface SummaryCardsProps {
  counts: AssignmentFilterCounts;
  currentFilter: AssignmentFilter;
  onSelectFilter: (filter: AssignmentFilter) => void;
}

/**
 * SummaryCards Component - Thẻ KPI tóm tắt nhanh theo phong cách Tremor
 * Chuẩn pbakaus/impeccable: Căn lề 4px/8px, không card-lồng-card, không glow
 */
export const SummaryCards: React.FC<SummaryCardsProps> = ({
  counts,
  currentFilter,
  onSelectFilter,
}) => {
  const cards = [
    {
      id: 'ALL' as AssignmentFilter,
      label: 'Tổng bài tập',
      value: counts.all,
      icon: BookOpen,
      iconColor: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      id: 'NOT_SUBMITTED' as AssignmentFilter,
      label: 'Chưa nộp (Còn hạn)',
      value: counts.notSubmitted,
      icon: Clock,
      iconColor: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      id: 'SUBMITTED' as AssignmentFilter,
      label: 'Đã nộp bài',
      value: counts.submitted,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/50',
    },
    {
      id: 'OVERDUE' as AssignmentFilter,
      label: 'Quá hạn nộp',
      value: counts.overdue,
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => {
        const isSelected = currentFilter === card.id;
        const IconComponent = card.icon;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter(card.id)}
            className={`flex flex-col text-left p-3.5 sm:p-4 rounded-lg border transition-all ${
              isSelected
                ? 'border-slate-900 bg-white ring-1 ring-slate-900 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-medium text-slate-500">
                {card.label}
              </span>
              <div className={`p-1.5 rounded-md ${card.bgColor}`}>
                <IconComponent className={`w-4 h-4 ${card.iconColor}`} aria-hidden="true" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900">
              {card.value}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SummaryCards;
