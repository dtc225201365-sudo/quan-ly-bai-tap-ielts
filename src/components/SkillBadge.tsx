import React from 'react';
import { SkillType } from '@/types';

interface SkillBadgeProps {
  skill: SkillType;
  className?: string;
}

/**
 * SkillBadge - Huy hiệu kỹ năng IELTS (Writing, Reading, Listening, Speaking)
 * Thiết kế chuẩn Impeccable: Màu sắc tao nhã, phân biệt nhẹ, tương phản cao, không neon
 */
export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, className = '' }) => {
  const getSkillConfig = (type: SkillType) => {
    switch (type) {
      case 'Writing':
        return {
          label: 'Writing',
          classes: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        };
      case 'Reading':
        return {
          label: 'Reading',
          classes: 'bg-sky-50 text-sky-700 border-sky-200',
        };
      case 'Listening':
        return {
          label: 'Listening',
          classes: 'bg-violet-50 text-violet-700 border-violet-200',
        };
      case 'Speaking':
        return {
          label: 'Speaking',
          classes: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      default:
        return {
          label: skill,
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const config = getSkillConfig(skill);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.classes} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default SkillBadge;
