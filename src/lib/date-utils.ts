/**
 * IELTS Master E-Learning - Date Utilities
 * Ensures deterministic GMT+7 date formatting across any OS environment
 * Rule 8: File <= 200 lines
 */

/**
 * Định dạng chuỗi ISO 8601 sang chuẩn Việt Nam: DD/MM/YYYY HH:mm
 * Luôn khóa cứng múi giờ Asia/Ho_Chi_Minh (GMT+7)
 */
export function formatDateVietnam(isoString: string | null | undefined): string | null {
  if (!isoString) {
    return null;
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Chuyển đổi an toàn chuỗi ISO sang epoch milliseconds
 */
export function parseDateToMs(isoString: string): number {
  const ms = Date.parse(isoString);
  if (isNaN(ms)) {
    throw new Error(`Invalid date string format: ${isoString}`);
  }
  return ms;
}
