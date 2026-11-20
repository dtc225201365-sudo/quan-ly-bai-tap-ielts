/**
 * IELTS Master E-Learning - Pure Function for Assignment Status Calculation
 * Deterministic business logic based on timestamp ms comparison in GMT+7
 * Rule 8: File <= 200 lines
 */

import { AssignmentStatusResult, CalculateStatusParams } from '../types';
import { SIMULATED_NOW } from './constants';
import { parseDateToMs } from './date-utils';

/**
 * Tính toán 4 trạng thái bài tập chuẩn xác tuyệt đối:
 * 1. Chưa nộp (NOT_SUBMITTED): Chưa nộp bài và thời điểm hiện tại <= hạn nộp
 * 2. Quá hạn (OVERDUE): Chưa nộp bài và thời điểm hiện tại > hạn nộp
 * 3. Đã nộp đúng hạn (SUBMITTED, isLate = false): Đã nộp bài và thời gian nộp <= hạn nộp
 * 4. Đã nộp trễ hạn (SUBMITTED, isLate = true, lateLabel = 'Nộp trễ'): Đã nộp bài và thời gian nộp > hạn nộp
 *
 * @param params Tham số đầu vào gồm dueDate, submittedAt và simulatedNow
 * @returns AssignmentStatusResult chứa status, isLate, statusLabel, lateLabel
 */
export function calculateAssignmentStatus(params: CalculateStatusParams): AssignmentStatusResult {
  const { dueDate, submittedAt, simulatedNow = SIMULATED_NOW } = params;

  const dueMs = parseDateToMs(dueDate);
  const nowMs = parseDateToMs(simulatedNow);

  // Nhánh 1: Học viên ĐÃ NỘP BÀI (submittedAt có giá trị hợp lệ)
  if (submittedAt !== null && submittedAt !== undefined && submittedAt.trim() !== '') {
    const submitMs = parseDateToMs(submittedAt);
    const isLate = submitMs > dueMs;

    return {
      status: 'SUBMITTED',
      isLate,
      statusLabel: 'Đã nộp',
      lateLabel: isLate ? 'Nộp trễ' : null,
    };
  }

  // Nhánh 2: Học viên CHƯA NỘP BÀI (submittedAt là null/trống)
  const isOverdue = nowMs > dueMs;

  if (isOverdue) {
    return {
      status: 'OVERDUE',
      isLate: true,
      statusLabel: 'Quá hạn',
      lateLabel: null,
    };
  }

  return {
    status: 'NOT_SUBMITTED',
    isLate: false,
    statusLabel: 'Chưa nộp',
    lateLabel: null,
  };
}
