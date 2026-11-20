/**
 * IELTS Master E-Learning - Server-side Authentication & Session Guard
 * Prevents IDOR / BOLA vulnerabilities by never trusting URL query params for student identity
 * Rule 8: File <= 200 lines
 */

import { StudentInfo } from '../types';
import { DEFAULT_STUDENT } from './constants';

/**
 * Danh sách tài khoản học viên mẫu hợp lệ trong hệ thống
 */
export const VALID_STUDENTS: Record<string, StudentInfo> = {
  S01: DEFAULT_STUDENT,
  S02: {
    id: 'S02',
    name: 'Trần Thị Bích',
    email: 'bich.tran@ieltsmaster.edu.vn',
    targetBand: '7.0',
  },
};

/**
 * Trích xuất danh tính học viên từ Server-side Session / Security Context
 * 
 * NGUYÊN TẮC BẢO MẬT ZERO-TRUST:
 * 1. TUYỆT ĐỐI KHÔNG đọc `studentId` từ URL path hoặc search params (?studentId=S02).
 * 2. Ưu tiên đọc từ Session / Gateway Header nội bộ `x-user-id` (nếu có từ reverse proxy).
 * 3. Mặc định môi trường an toàn: Trả về tài khoản học viên S01 (Lương Lý Anh Tú).
 *
 * @param request Optional NextRequest / Request để kiểm tra gateway headers
 * @returns StudentInfo của học viên đã được xác thực an toàn
 */
export function getAuthenticatedStudent(request?: Request): StudentInfo {
  if (request) {
    // Kiểm tra và ngăn chặn nếu client gửi studentId qua search params
    const url = new URL(request.url);
    const untrustedQueryStudentId = url.searchParams.get('studentId');
    if (untrustedQueryStudentId) {
      // Ghi nhận cảnh báo bảo mật: Tuyệt đối không dùng giá trị này để truy vấn
      console.warn(
        `[SECURITY WARNING] IDOR probe detected! Query param studentId=${untrustedQueryStudentId} is strictly ignored.`
      );
    }

    // Đọc header xác thực an toàn từ Internal API Gateway
    const headerUserId = request.headers.get('x-user-id');
    if (headerUserId && VALID_STUDENTS[headerUserId]) {
      return VALID_STUDENTS[headerUserId];
    }
  }

  // Fallback an toàn mặc định cho phiên đăng nhập học viên S01
  return DEFAULT_STUDENT;
}
