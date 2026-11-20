/**
 * IELTS Master E-Learning - Type Definitions & API Contract
 * Standard: Rule 8 (File <= 200 lines) | API-Contract-First
 * Timezone Benchmark: 2026-11-11T09:00:00+07:00
 */

// 1. Skill & Domain Types
export type SkillType = 'Writing' | 'Reading' | 'Listening' | 'Speaking';

// 2. Core Status Types
export type AssignmentStatus = 'NOT_SUBMITTED' | 'OVERDUE' | 'SUBMITTED';
export type StatusLabel = 'Chưa nộp' | 'Quá hạn' | 'Đã nộp';
export type LateLabel = 'Nộp trễ' | null;

// 3. Filter Options for UI & API
export type AssignmentFilter = 'ALL' | 'NOT_SUBMITTED' | 'SUBMITTED' | 'OVERDUE';

// 4. Student Entity
export interface StudentInfo {
  id: string; // e.g., 'S01'
  name: string; // e.g., 'Lương Lý Anh Tú'
  email?: string;
  targetBand?: string;
}

// 5. Raw Assignment Entity (Database / Storage representation)
export interface Assignment {
  id: string; // e.g., 'asm_01'
  code: string; // e.g., 'IELTS-W1-01'
  studentId: string; // e.g., 'S01' | 'S02'
  title: string;
  skill: SkillType;
  description?: string;
  dueDate: string; // ISO 8601 with offset, e.g. '2026-11-09T23:59:00+07:00'
  submittedAt: string | null; // ISO 8601 with offset or null
}

// 6. Assignment Status Calculation Result (Pure Function Output)
export interface AssignmentStatusResult {
  status: AssignmentStatus;
  isLate: boolean;
  statusLabel: StatusLabel;
  lateLabel: LateLabel;
}

// 7. Assignment View Model (Enriched for UI consumption)
export interface AssignmentWithStatus extends Assignment {
  status: AssignmentStatus;
  isLate: boolean;
  statusLabel: StatusLabel;
  lateLabel: LateLabel;
  formattedDueDate: string; // e.g., '09/11/2026 23:59'
  formattedSubmittedAt: string | null; // e.g., '09/11/2026 21:15' | null
}

// 8. Standardized API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
  simulatedNow: string; // '2026-11-11T09:00:00+07:00'
  studentInfo: StudentInfo;
}

// 9. Status Calculation Parameters
export interface CalculateStatusParams {
  dueDate: string;
  submittedAt: string | null;
  simulatedNow?: string; // Optional override, defaults to 2026-11-11T09:00:00+07:00
}

// 10. Filter Counters for UI Badges
export interface AssignmentFilterCounts {
  all: number;
  notSubmitted: number;
  submitted: number;
  overdue: number;
}
