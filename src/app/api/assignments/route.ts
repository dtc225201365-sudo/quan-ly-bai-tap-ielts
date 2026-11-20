/**
 * IELTS Master E-Learning - Next.js Route Handler
 * Endpoint: GET /api/assignments
 * Contract: ApiResponse<AssignmentWithStatus[]>
 * Security: IDOR-protected via Server-side Auth Context
 * Rule 8: File <= 200 lines
 */

import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, AssignmentWithStatus } from '@/types';
import { AssignmentService } from '@/lib/assignment-service';
import { getAuthenticatedStudent } from '@/lib/auth-context';
import { SIMULATED_NOW } from '@/lib/constants';

/**
 * Xử lý yêu cầu GET /api/assignments
 * Trả về danh sách bài tập của học viên hiện tại với đầy đủ trạng thái được tính toán
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<AssignmentWithStatus[]>>> {
  try {
    // 1. Trích xuất danh tính học viên từ Server-side Auth Context (Zero-Trust IDOR Protection)
    const student = getAuthenticatedStudent(request);

    // 2. Truy xuất danh sách bài tập đã được lọc an toàn cho học viên này
    const assignments = AssignmentService.getAssignmentsForStudent(
      student.id,
      SIMULATED_NOW
    );

    // 3. Hỗ trợ lọc trạng thái tùy chọn nếu client yêu cầu (tùy chọn)
    const searchParams = request.nextUrl.searchParams;
    const filterParam = searchParams.get('filter')?.toUpperCase();

    let resultData = assignments;
    if (filterParam && filterParam !== 'ALL') {
      resultData = assignments.filter((item) => item.status === filterParam);
    }

    // 4. Trả về phản hồi JSON theo chuẩn ApiResponse contract
    const responsePayload: ApiResponse<AssignmentWithStatus[]> = {
      success: true,
      data: resultData,
      error: null,
      simulatedNow: SIMULATED_NOW,
      studentInfo: student,
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Lỗi hệ thống khi tải danh sách bài tập';

    const errorPayload: ApiResponse<AssignmentWithStatus[]> = {
      success: false,
      data: [],
      error: errorMessage,
      simulatedNow: SIMULATED_NOW,
      studentInfo: {
        id: 'UNKNOWN',
        name: 'Chưa xác thực',
      },
    };

    return NextResponse.json(errorPayload, { status: 500 });
  }
}
