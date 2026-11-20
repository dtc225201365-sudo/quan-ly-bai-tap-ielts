/**
 * IELTS Master E-Learning - Assignment Data Service
 * Implements strict tenant/student data isolation to prevent IDOR / BOLA leaks
 * Rule 8: File <= 200 lines
 */

import {
  AssignmentFilterCounts,
  AssignmentWithStatus,
} from '../types';
import { calculateAssignmentStatus } from './assignment-status';
import { SIMULATED_NOW } from './constants';
import { formatDateVietnam } from './date-utils';
import { LEGACY_ASM_MAP, MOCK_ASSIGNMENTS } from './mock-data';

export class AssignmentService {
  /**
   * Lấy danh sách bài tập cho học viên đã xác thực
   * BẢO MẬT: Bắt buộc lọc theo studentId từ Session, tuyệt đối cách ly học viên khác
   *
   * @param currentStudentId Mã học viên từ Server-side Auth Context (ví dụ: 'S01')
   * @param simulatedNow Mốc thời gian đối chiếu (mặc định: 2026-11-11T09:00:00+07:00)
   * @returns Danh sách AssignmentWithStatus đã được làm giàu thông tin trạng thái
   */
  public static getAssignmentsForStudent(
    currentStudentId: string,
    simulatedNow: string = SIMULATED_NOW
  ): AssignmentWithStatus[] {
    if (!currentStudentId) {
      return [];
    }

    // 1. Lọc cách ly dữ liệu nghiêm ngặt theo học viên
    const filteredAssignments = MOCK_ASSIGNMENTS.filter(
      (item) => item.studentId === currentStudentId
    );

    // 2. Làm giàu trạng thái và định dạng ngày giờ cho từng bài tập
    return filteredAssignments.map((assignment) => {
      const statusResult = calculateAssignmentStatus({
        dueDate: assignment.dueDate,
        submittedAt: assignment.submittedAt,
        simulatedNow,
      });

      return {
        ...assignment,
        ...statusResult,
        formattedDueDate: formatDateVietnam(assignment.dueDate) || '',
        formattedSubmittedAt: formatDateVietnam(assignment.submittedAt),
      };
    });
  }

  /**
   * Lấy chi tiết một bài tập theo ID, kiểm tra quyền sở hữu của học viên
   */
  public static getAssignmentById(
    assignmentId: string,
    currentStudentId: string,
    simulatedNow: string = SIMULATED_NOW
  ): AssignmentWithStatus | null {
    const targetId = LEGACY_ASM_MAP[assignmentId] || assignmentId;

    const assignment = MOCK_ASSIGNMENTS.find(
      (item) =>
        (item.id === targetId || item.code === assignmentId || item.id === assignmentId) &&
        item.studentId === currentStudentId
    );

    if (!assignment) {
      return null;
    }

    const statusResult = calculateAssignmentStatus({
      dueDate: assignment.dueDate,
      submittedAt: assignment.submittedAt,
      simulatedNow,
    });

    return {
      ...assignment,
      ...statusResult,
      formattedDueDate: formatDateVietnam(assignment.dueDate) || '',
      formattedSubmittedAt: formatDateVietnam(assignment.submittedAt),
    };
  }

  /**
   * Tính toán số lượng bài tập theo từng bộ lọc để hiển thị trên UI Tabs
   */
  public static calculateFilterCounts(
    assignments: AssignmentWithStatus[]
  ): AssignmentFilterCounts {
    return {
      all: assignments.length,
      notSubmitted: assignments.filter((a) => a.status === 'NOT_SUBMITTED').length,
      submitted: assignments.filter((a) => a.status === 'SUBMITTED').length,
      overdue: assignments.filter((a) => a.status === 'OVERDUE').length,
    };
  }
}
