/**
 * IELTS Master E-Learning - Security & IDOR/BOLA Prevention Tests
 * Validates tenant data isolation, query spoofing protection & zero-trust session guards
 * Rule 8: File <= 200 lines
 */

import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { GET } from '../src/app/api/assignments/route';
import { AssignmentService } from '../src/lib/assignment-service';
import { MOCK_ASSIGNMENTS } from '../src/lib/mock-data';

export interface TestResult {
  suiteName: string;
  total: number;
  passed: number;
  failed: number;
  details: string[];
}

export async function runAssignmentSecurityTests(): Promise<TestResult> {
  const result: TestResult = {
    suiteName: 'Assignment Security & IDOR/BOLA Protection Tests',
    total: 0,
    passed: 0,
    failed: 0,
    details: [],
  };

  const test = async (name: string, fn: () => void | Promise<void>) => {
    result.total++;
    try {
      await fn();
      result.passed++;
      result.details.push(`  ✓ ${name}`);
    } catch (err: unknown) {
      result.failed++;
      const message = err instanceof Error ? err.message : String(err);
      result.details.push(`  ✗ ${name} -> FAILED: ${message}`);
    }
  };

  // Test 1: Đảm bảo cơ sở dữ liệu mẫu có tồn tại bài B01 của học viên S02 để làm mục tiêu kiểm thử
  await test('Sec 01: Mock DB chứa bài B01 của học viên S02 (Trần Thị Bích)', () => {
    const b01 = MOCK_ASSIGNMENTS.find((a) => a.id === 'B01');
    assert.ok(b01, 'Bài B01 phải tồn tại trong Mock DB');
    assert.strictEqual(b01.studentId, 'S02');
  });

  // Test 2: Truy vấn danh sách bài tập cho học viên S01 qua Service -> 100% không rò rỉ B01
  await test('Sec 02: AssignmentService.getAssignmentsForStudent("S01") cô lập 100% dữ liệu, không có B01', () => {
    const assignments = AssignmentService.getAssignmentsForStudent('S01');
    assert.ok(assignments.length > 0, 'Phải có bài tập của S01');
    assert.ok(assignments.every((a) => a.studentId === 'S01'), 'Tất cả bài tập phải thuộc về S01');
    assert.ok(!assignments.some((a) => a.id === 'B01'), 'TUYỆT ĐỐI không chứa bài B01 của S02');
    assert.ok(!assignments.some((a) => a.studentId === 'S02'), 'TUYỆT ĐỐI không chứa bất kỳ bài nào của S02');
  });

  // Test 3: Học viên S01 cố tình đọc chi tiết bài B01 của S02 qua ID -> Bị chặn trả về null
  await test('Sec 03: AssignmentService.getAssignmentById("B01", "S01") chặn đứng truy cập trái phép', () => {
    const detail = AssignmentService.getAssignmentById('B01', 'S01');
    assert.strictEqual(detail, null, 'S01 không được phép truy cập bài B01 của S02');
  });

  // Test 4: Gọi Route Handler GET /api/assignments mặc định -> Trả về dữ liệu an toàn của S01
  await test('Sec 04: API GET /api/assignments trả về session mặc định S01, không rò rỉ B01', async () => {
    const req = new NextRequest('http://localhost:3000/api/assignments');
    const res = await GET(req);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.studentInfo.id, 'S01');
    assert.ok(body.data.every((a: { studentId: string }) => a.studentId === 'S01'));
    assert.ok(!body.data.some((a: { id: string }) => a.id === 'B01'));
  });

  // Test 5: IDOR / BOLA Attack Test: Giả mạo ?studentId=S02 trong query params
  await test('Sec 05: Tấn công IDOR ?studentId=S02 -> Hệ thống bỏ qua query param, chặn đứng rò rỉ B01', async () => {
    const maliciousReq = new NextRequest('http://localhost:3000/api/assignments?studentId=S02');
    const res = await GET(maliciousReq);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    // Danh tính session vẫn là S01, không bị chuyển đổi sang S02
    assert.strictEqual(body.studentInfo.id, 'S01');
    // Dữ liệu chỉ chứa bài của S01, B01 không bị rò rỉ
    assert.ok(!body.data.some((a: { id: string }) => a.id === 'B01'), 'B01 của S02 không được phép xuất hiện');
    assert.ok(body.data.every((a: { studentId: string }) => a.studentId === 'S01'));
  });

  // Test 6: IDOR Injection: Giả mạo SQLi / path traversal qua query param ?studentId=' OR '1'='1
  await test('Sec 06: Tấn công Injection qua query params ?studentId=\' OR 1=1 -> An toàn tuyệt đối', async () => {
    const injectionReq = new NextRequest(
      "http://localhost:3000/api/assignments?studentId=' OR '1'='1"
    );
    const res = await GET(injectionReq);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.studentInfo.id, 'S01');
    assert.ok(!body.data.some((a: { id: string }) => a.id === 'B01'));
  });

  // Test 7: Phân tách 2 chiều: Khi học viên S02 đăng nhập hợp lệ (qua gateway header) -> Chỉ thấy bài B01, không thấy bài S01
  await test('Sec 07: Cô lập 2 chiều: Học viên S02 chỉ xem bài của S02, không thấy bài của S01', async () => {
    const s02Req = new NextRequest('http://localhost:3000/api/assignments', {
      headers: { 'x-user-id': 'S02' },
    });
    const res = await GET(s02Req);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.studentInfo.id, 'S02');
    assert.ok(body.data.every((a: { studentId: string }) => a.studentId === 'S02'));
    assert.ok(!body.data.some((a: { studentId: string }) => a.studentId === 'S01'));
    assert.ok(body.data.some((a: { id: string }) => a.id === 'B01'));
  });

  // Test 8: Bộ lọc trạng thái API (?filter=OVERDUE) vẫn phải tuân thủ cách ly học viên
  await test('Sec 08: API Filter (?filter=OVERDUE) bảo toàn cách ly học viên', async () => {
    const filterReq = new NextRequest('http://localhost:3000/api/assignments?filter=OVERDUE');
    const res = await GET(filterReq);
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.studentInfo.id, 'S01');
    assert.ok(body.data.every((a: { status: string; studentId: string }) => a.status === 'OVERDUE' && a.studentId === 'S01'));
  });

  return result;
}

// Cho phép chạy trực tiếp qua `tsx tests/assignment-security.test.ts`
if (require.main === module || process.argv[1]?.includes('assignment-security.test')) {
  runAssignmentSecurityTests().then((result) => {
    console.log(`\n=== ${result.suiteName} ===`);
    result.details.forEach((d) => console.log(d));
    console.log(`\nKết quả: ${result.passed}/${result.total} passed (${result.failed} failed)`);
    if (result.failed > 0) process.exit(1);
  });
}
