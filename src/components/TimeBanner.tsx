import React from 'react';
import { Clock, Info } from 'lucide-react';

interface TimeBannerProps {
  benchmarkTime?: string;
  className?: string;
}

/**
 * TimeBanner Component - Banner hiển thị mốc thời gian đối chiếu hệ thống
 * Tuân thủ Bảng Chữ VOICE_GUIDE:
 * "Thời điểm đối chiếu hệ thống: 11/11/2026, 09:00 (GMT+7)"
 * Chuẩn pbakaus/impeccable: Nền trung tính ấm, không viền glow, chữ rõ nét
 */
export const TimeBanner: React.FC<TimeBannerProps> = ({
  benchmarkTime = '11/11/2026, 09:00 (GMT+7)',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 ${className}`}
      role="status"
      aria-label="Thông tin mốc thời gian đối chiếu hệ thống"
    >
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
        <span>
          Thời điểm đối chiếu hệ thống:{' '}
          <strong className="font-semibold font-mono text-slate-900">
            {benchmarkTime}
          </strong>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1 text-xs text-slate-500">
        <Info className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Múi giờ Asia/Ho_Chi_Minh</span>
      </div>
    </div>
  );
};

export default TimeBanner;
