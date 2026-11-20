/**
 * IELTS Master E-Learning - Mock Database & Real-World Business Data
 * Zero-Lorem-Ipsum: 100% chuẩn nghiệp vụ luyện thi IELTS
 * Chuẩn đề bài: A01, A02, A03, A04 (S01), B01 (S02) và các bài mở rộng
 * Rule 8: File <= 200 lines
 */

import { Assignment } from '../types';

/**
 * Danh sách toàn bộ bài tập trong cơ sở dữ liệu mẫu
 * Mốc thời gian đối chiếu hệ thống: 2026-11-11T09:00:00+07:00
 */
export const MOCK_ASSIGNMENTS: Assignment[] = [
  // 1. Case A01: Chưa nộp (Hạn sau mốc 11/11/2026 09:00, chưa nộp)
  {
    id: 'A01',
    code: 'A01',
    studentId: 'S01',
    title: 'IELTS Listening: Section 4 - Dự án bảo tồn đa dạng sinh học đô thị',
    skill: 'Listening',
    description: 'Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
    dueDate: '2026-11-12T23:59:00+07:00',
    submittedAt: null,
  },

  // 2. Case A02: Quá hạn (Hạn trước mốc 11/11/2026 09:00, chưa nộp)
  {
    id: 'A02',
    code: 'A02',
    studentId: 'S01',
    title: 'IELTS Reading: Luyện đọc chuyên sâu chủ đề Lịch sử tiến hóa của cá voi',
    skill: 'Reading',
    description: 'Academic Reading Passage 3 - The Evolutionary History of Cetaceans and Modern Marine Mammals.',
    dueDate: '2026-11-10T12:00:00+07:00',
    submittedAt: null,
  },

  // 3. Case A03: Đã nộp đúng hạn (Hạn 09/11 23:59, nộp 09/11 21:15)
  {
    id: 'A03',
    code: 'A03',
    studentId: 'S01',
    title: 'IELTS Writing Task 1: Phân tích biểu đồ năng lượng tái tạo',
    skill: 'Writing',
    description: 'The chart below shows the proportion of electricity generated from renewable sources in four countries.',
    dueDate: '2026-11-09T23:59:00+07:00',
    submittedAt: '2026-11-09T21:15:00+07:00',
  },

  // 4. Case A04: Đã nộp kèm Nộp trễ (Hạn 10/11 23:59, nộp 11/11 08:15)
  {
    id: 'A04',
    code: 'A04',
    studentId: 'S01',
    title: 'IELTS Writing Task 2: Nghị luận về trí tuệ nhân tạo và thị trường lao động',
    skill: 'Writing',
    description: 'Some people believe that artificial intelligence will create more jobs than it eliminates. Discuss both views.',
    dueDate: '2026-11-10T23:59:00+07:00',
    submittedAt: '2026-11-11T08:15:00+07:00',
  },

  // 5. Case A05 (Bài IELTS mở rộng): Chưa nộp (Hạn 15/11/2026 18:00)
  {
    id: 'A05',
    code: 'A05',
    studentId: 'S01',
    title: 'IELTS Speaking Part 2: Thu âm bài nói chủ đề Chuyến đi đáng nhớ',
    skill: 'Speaking',
    description: 'Describe a memorable journey you have made by public transport. Say where, what happened, and why memorable.',
    dueDate: '2026-11-15T18:00:00+07:00',
    submittedAt: null,
  },

  // 6. Case B01: Bài tập bảo mật của Học viên S02 (Trần Thị Bích) - BẮT BUỘC BỊ CHẶN VỚI S01
  {
    id: 'B01',
    code: 'B01',
    studentId: 'S02',
    title: 'IELTS Writing Task 1: Bài tập bảo mật riêng của học viên S02 (Trần Thị Bích)',
    skill: 'Writing',
    description: 'Bản nộp bảo mật của học viên S02, cấm tuyệt đối rò rỉ sang học viên S01 theo chuẩn IDOR / BOLA.',
    dueDate: '2026-11-14T23:59:00+07:00',
    submittedAt: null,
  },
];

/** Bản đồ ánh xạ mã cũ sang mã chuẩn bài tập đề phòng kiểm thử ngược */
export const LEGACY_ASM_MAP: Record<string, string> = {
  asm_01: 'A03',
  asm_02: 'A04',
  asm_03: 'A02',
  asm_04: 'A01',
  asm_05: 'A05',
  asm_b01: 'B01',
};
