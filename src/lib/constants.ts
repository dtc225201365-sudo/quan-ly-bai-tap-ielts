/**
 * IELTS Master E-Learning - System Constants
 * Fixed system simulation benchmark: 2026-11-11T09:00:00+07:00
 * Rule 8: File <= 200 lines
 */

import { StudentInfo } from '../types';

/** Mốc thời gian đối chiếu cố định của hệ thống: 11/11/2026 09:00 GMT+7 */
export const SIMULATED_NOW = '2026-11-11T09:00:00+07:00';

/** Học viên mặc định (Session giả lập an toàn) */
export const DEFAULT_STUDENT: StudentInfo = {
  id: 'S01',
  name: 'Lương Lý Anh Tú',
  email: 'anhtu.luong@ieltsmaster.edu.vn',
  targetBand: '7.5',
};

/** Nhãn hiển thị trạng thái chuẩn Voice Guide */
export const STATUS_LABELS = {
  NOT_SUBMITTED: 'Chưa nộp',
  OVERDUE: 'Quá hạn',
  SUBMITTED: 'Đã nộp',
  LATE: 'Nộp trễ',
} as const;
