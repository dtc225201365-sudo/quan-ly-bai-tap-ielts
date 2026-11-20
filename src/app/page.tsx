'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  AssignmentWithStatus,
  AssignmentFilter,
  AssignmentFilterCounts,
  StudentInfo,
  ApiResponse,
} from '@/types';
import Header from '@/components/Header';
import TimeBanner from '@/components/TimeBanner';
import SummaryCards from '@/components/SummaryCards';
import FilterTabs from '@/components/FilterTabs';
import AssignmentTable from '@/components/AssignmentTable';
import AssignmentCard from '@/components/AssignmentCard';
import AssignmentModal from '@/components/AssignmentModal';
import { RotateCcw } from 'lucide-react';

export default function MyAssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentWithStatus[]>([]);
  const [student, setStudent] = useState<StudentInfo>({
    id: 'S01',
    name: 'Lương Lý Anh Tú',
  });
  const [currentFilter, setCurrentFilter] = useState<AssignmentFilter>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] =
    useState<AssignmentWithStatus | null>(null);

  // Tải dữ liệu từ API an toàn (IDOR-protected S01)
  const fetchAssignments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/assignments');
      if (!response.ok) {
        throw new Error(`Mã lỗi máy chủ: ${response.status}`);
      }
      const json: ApiResponse<AssignmentWithStatus[]> = await response.json();
      if (json.success && Array.isArray(json.data)) {
        setAssignments(json.data);
        if (json.studentInfo) {
          setStudent(json.studentInfo);
        }
      } else {
        throw new Error(json.error || 'Dữ liệu không đúng định dạng');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối máy chủ';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Tính số lượng thống kê theo trạng thái
  const counts: AssignmentFilterCounts = useMemo(() => {
    return {
      all: assignments.length,
      notSubmitted: assignments.filter((a) => a.status === 'NOT_SUBMITTED').length,
      submitted: assignments.filter((a) => a.status === 'SUBMITTED').length,
      overdue: assignments.filter((a) => a.status === 'OVERDUE').length,
    };
  }, [assignments]);

  // Lọc dữ liệu hiển thị theo tab đang chọn
  const filteredAssignments = useMemo(() => {
    if (currentFilter === 'ALL') return assignments;
    return assignments.filter((a) => a.status === currentFilter);
  }, [assignments, currentFilter]);

  return (
    <main className="min-h-screen bg-slate-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 1. Header Bar chuẩn Voice Guide */}
        <Header
          student={student}
          onRefresh={fetchAssignments}
          isLoading={isLoading}
        />

        {/* 2. Banner mốc thời gian đối chiếu hệ thống */}
        <TimeBanner benchmarkTime="11/11/2026, 09:00 (GMT+7)" />

        {/* 3. Thẻ tóm tắt số liệu nhanh */}
        <SummaryCards
          counts={counts}
          currentFilter={currentFilter}
          onSelectFilter={setCurrentFilter}
        />

        {/* 4. Thanh lọc theo trạng thái */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <FilterTabs
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            counts={counts}
          />
        </div>

        {/* 5. Vùng hiển thị dữ liệu bài tập */}
        {isLoading ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-lg text-slate-500 font-medium">
            Đang tải danh sách bài tập...
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Không thể tải danh sách bài tập</p>
            <p className="mt-1 text-xs text-red-500">{error}</p>
            <button
              type="button"
              onClick={fetchAssignments}
              className="mt-4 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <section aria-label="Danh sách bài tập">
            {/* Chế độ Desktop: Data Table (>= 768px) */}
            <div className="hidden md:block">
              <AssignmentTable
                assignments={filteredAssignments}
                onSelectAssignment={setSelectedAssignment}
                onResetFilter={() => setCurrentFilter('ALL')}
                currentFilter={currentFilter}
              />
            </div>

            {/* Chế độ Mobile: Card List (< 768px) */}
            <div className="block md:hidden">
              {filteredAssignments.length === 0 ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-lg">
                  <p className="text-sm font-medium text-slate-800">
                    {currentFilter !== 'ALL'
                      ? 'Không tìm thấy bài tập phù hợp'
                      : 'Chưa có bài tập nào'}
                  </p>
                  {currentFilter !== 'ALL' && (
                    <button
                      type="button"
                      onClick={() => setCurrentFilter('ALL')}
                      className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xóa bộ lọc</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onSelect={setSelectedAssignment}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Modal chi tiết bài tập */}
      <AssignmentModal
        assignment={selectedAssignment}
        isOpen={Boolean(selectedAssignment)}
        onClose={() => setSelectedAssignment(null)}
      />
    </main>
  );
}
