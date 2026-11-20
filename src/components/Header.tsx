import React from 'react';
import { RotateCw, GraduationCap } from 'lucide-react';
import { StudentInfo } from '@/types';

interface HeaderProps {
  student?: StudentInfo;
  onRefresh?: () => void;
  isLoading?: boolean;
}

/**
 * Header Component - Thanh tiêu đề màn hình "Bài tập của tôi"
 * Tuân thủ 100% Bảng Chữ VOICE_GUIDE:
 * - H1: "Bài tập của tôi"
 * - Subtitle: "Học viên: Lương Lý Anh Tú (Mã: S01)"
 * - Nút: "Làm mới" (2 từ, không từ bot)
 */
export const Header: React.FC<HeaderProps> = ({
  student = { id: 'S01', name: 'Lương Lý Anh Tú' },
  onRefresh,
  isLoading = false,
}) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-slate-900 text-white">
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bài tập của tôi
          </h1>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Học viên: <span className="font-medium text-slate-900">{student.name}</span>{' '}
          <span className="text-slate-500 font-mono">(Mã: {student.id})</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          title="Tải lại danh sách bài tập"
        >
          <RotateCw
            className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          <span>Làm mới</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
