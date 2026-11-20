/**
 * IELTS Master E-Learning - Test Suite Runner
 * Runs all unit, integration, and security tests
 * Rule 8: File <= 200 lines
 */

import { runAssignmentStatusTests } from './assignment-status.test';
import { runAssignmentSecurityTests } from './assignment-security.test';

async function main() {
  const startTime = Date.now();

  console.log('================================================================');
  console.log('🎓 IELTS MASTER E-LEARNING - AUTOMATED TEST SUITE');
  console.log('   Benchmark Reference Time: 2026-11-11T09:00:00+07:00 (GMT+7)');
  console.log('   Environment: Node.js & TypeScript via TSX Runner');
  console.log('================================================================\n');

  // 1. Chạy Unit Tests cho logic tính toán trạng thái bài tập
  const statusResults = runAssignmentStatusTests();
  console.log(`📌 SUITE 1: ${statusResults.suiteName}`);
  statusResults.details.forEach((d) => console.log(d));
  console.log(`   -> Suite 1 Result: ${statusResults.passed}/${statusResults.total} passed (${statusResults.failed} failed)\n`);

  // 2. Chạy Security Tests cho tầng API & phòng chống IDOR/BOLA
  const securityResults = await runAssignmentSecurityTests();
  console.log(`📌 SUITE 2: ${securityResults.suiteName}`);
  securityResults.details.forEach((d) => console.log(d));
  console.log(`   -> Suite 2 Result: ${securityResults.passed}/${securityResults.total} passed (${securityResults.failed} failed)\n`);

  // 3. Tổng kết nghiệm thu
  const durationMs = Date.now() - startTime;
  const totalCases = statusResults.total + securityResults.total;
  const totalPassed = statusResults.passed + securityResults.passed;
  const totalFailed = statusResults.failed + securityResults.failed;

  console.log('================================================================');
  console.log('📊 TEST EXECUTION SUMMARY:');
  console.log(`   - Total Test Suites: 2`);
  console.log(`   - Total Test Cases : ${totalCases}`);
  console.log(`   - Passed           : ${totalPassed} (${Math.round((totalPassed / totalCases) * 100)}%)`);
  console.log(`   - Failed           : ${totalFailed}`);
  console.log(`   - Total Duration   : ${durationMs}ms`);
  console.log('================================================================');

  if (totalFailed > 0) {
    console.error(`❌ TEST FAILED: ${totalFailed} test case(s) did not pass!`);
    process.exit(1);
  } else {
    console.log('✅ ALL TESTS PASSED SUCCESSFULLY! Exit code 0.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
