/**
 * IELTS Master E-Learning - Unit Tests for Assignment Status Calculation
 * Validates deterministic status calculation logic against benchmark: 2026-11-11T09:00:00+07:00
 * Rule 8: File <= 200 lines
 */

import assert from 'node:assert/strict';
import { calculateAssignmentStatus } from '../src/lib/assignment-status';
import { SIMULATED_NOW } from '../src/lib/constants';

export interface TestResult {
  suiteName: string;
  total: number;
  passed: number;
  failed: number;
  details: string[];
}

export function runAssignmentStatusTests(): TestResult {
  const result: TestResult = {
    suiteName: 'Assignment Status Unit Tests (4 Core Cases & Edge Cases)',
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
  };

  const test = (name: string, fn: () => void) => {
    result.total++;
    try {
      fn();
      result.passed++;
      result.details.push(`  ✓ ${name}`);
    } catch (err: unknown) {
      result.failed++;
      const message = err instanceof Error ? err.message : String(err);
      result.details.push(`  ✗ ${name} -> FAILED: ${message}`);
    }
  };

  // Case A01: Listening - Due 12/11/2026 > Now 11/11/2026 -> Chưa nộp (NOT_SUBMITTED)
  test('Case A01: Listening (Hạn 12/11 > Hiện tại 11/11) -> NOT_SUBMITTED, isLate=false, label="Chưa nộp"', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-12T23:59:00+07:00',
      submittedAt: null,
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'NOT_SUBMITTED');
    assert.strictEqual(res.isLate, false);
    assert.strictEqual(res.statusLabel, 'Chưa nộp');
    assert.strictEqual(res.lateLabel, null);
  });

  // Case A02: Reading - Due 10/11/2026 < Now 11/11/2026 -> Quá hạn (OVERDUE)
  test('Case A02: Reading (Hạn 10/11 < Hiện tại 11/11) -> OVERDUE, isLate=true, label="Quá hạn"', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-10T12:00:00+07:00',
      submittedAt: null,
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'OVERDUE');
    assert.strictEqual(res.isLate, true);
    assert.strictEqual(res.statusLabel, 'Quá hạn');
    assert.strictEqual(res.lateLabel, null);
  });

  // Case A03: Writing 1 - Submitted 09/11 21:15 <= Due 09/11 23:59 -> Đã nộp đúng hạn (SUBMITTED, isLate=false)
  test('Case A03: Writing 1 (Nộp 09/11 21:15 <= Hạn 09/11 23:59) -> SUBMITTED, isLate=false, label="Đã nộp"', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-09T23:59:00+07:00',
      submittedAt: '2026-11-09T21:15:00+07:00',
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'SUBMITTED');
    assert.strictEqual(res.isLate, false);
    assert.strictEqual(res.statusLabel, 'Đã nộp');
    assert.strictEqual(res.lateLabel, null);
  });

  // Case A04: Writing 2 - Submitted 11/11 08:15 > Due 10/11 23:59 -> Đã nộp trễ hạn (SUBMITTED, isLate=true, lateLabel="Nộp trễ")
  test('Case A04: Writing 2 (Nộp 11/11 08:15 > Hạn 10/11 23:59) -> SUBMITTED, isLate=true, lateLabel="Nộp trễ"', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-10T23:59:00+07:00',
      submittedAt: '2026-11-11T08:15:00+07:00',
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'SUBMITTED');
    assert.strictEqual(res.isLate, true);
    assert.strictEqual(res.statusLabel, 'Đã nộp');
    assert.strictEqual(res.lateLabel, 'Nộp trễ');
  });

  // Edge Case 1: Nộp đúng tích tắc deadline (exact millisecond)
  test('Edge Case 1: Nộp bài đúng mili-giây deadline -> SUBMITTED, isLate=false (Đúng hạn)', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-10T23:59:00.000+07:00',
      submittedAt: '2026-11-10T23:59:00.000+07:00',
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'SUBMITTED');
    assert.strictEqual(res.isLate, false);
    assert.strictEqual(res.lateLabel, null);
  });

  // Edge Case 2: Nộp trễ 1 mili-giây sau deadline
  test('Edge Case 2: Nộp bài trễ đúng 1 mili-giây sau deadline -> SUBMITTED, isLate=true, lateLabel="Nộp trễ"', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-10T23:59:00.000+07:00',
      submittedAt: '2026-11-10T23:59:00.001+07:00',
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'SUBMITTED');
    assert.strictEqual(res.isLate, true);
    assert.strictEqual(res.lateLabel, 'Nộp trễ');
  });

  // Edge Case 3: Hiện tại trùng đúng tích tắc deadline (chưa nộp)
  test('Edge Case 3: Hiện tại trùng đúng mili-giây deadline (chưa nộp) -> NOT_SUBMITTED (Chưa quá hạn)', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-11T09:00:00.000+07:00',
      submittedAt: null,
      simulatedNow: '2026-11-11T09:00:00.000+07:00',
    });
    assert.strictEqual(res.status, 'NOT_SUBMITTED');
    assert.strictEqual(res.isLate, false);
    assert.strictEqual(res.statusLabel, 'Chưa nộp');
  });

  // Edge Case 4: Hiện tại sau deadline 1 mili-giây (chưa nộp)
  test('Edge Case 4: Hiện tại sau deadline 1 mili-giây (chưa nộp) -> OVERDUE (Quá hạn)', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-11T09:00:00.000+07:00',
      submittedAt: null,
      simulatedNow: '2026-11-11T09:00:00.001+07:00',
    });
    assert.strictEqual(res.status, 'OVERDUE');
    assert.strictEqual(res.isLate, true);
    assert.strictEqual(res.statusLabel, 'Quá hạn');
  });

  // Edge Case 5: Chuỗi submittedAt là khoảng trắng (whitespace) -> Coi như chưa nộp
  test('Edge Case 5: submittedAt là chuỗi rỗng/khoảng trắng -> Xử lý an toàn như chưa nộp', () => {
    const res = calculateAssignmentStatus({
      dueDate: '2026-11-12T23:59:00+07:00',
      submittedAt: '   ',
      simulatedNow: SIMULATED_NOW,
    });
    assert.strictEqual(res.status, 'NOT_SUBMITTED');
    assert.strictEqual(res.statusLabel, 'Chưa nộp');
  });

  return result;
}

// Cho phép chạy trực tiếp qua `tsx tests/assignment-status.test.ts`
if (require.main === module || process.argv[1]?.includes('assignment-status.test')) {
  const result = runAssignmentStatusTests();
  console.log(`\n=== ${result.suiteName} ===`);
  result.details.forEach((d) => console.log(d));
  console.log(`\nKết quả: ${result.passed}/${result.total} passed (${result.failed} failed)`);
  if (result.failed > 0) process.exit(1);
}
