# 🎨 DESIGN SPEC & VOICE GUIDE — BÀI TẬP CỦA TÔI (IELTS MASTER E-LEARNING)

> **Dự án:** IELTS Master E-Learning Platform  
> **Chức năng:** "Bài tập của tôi" dành cho học viên S01 (`Lương Lý Anh Tú`)  
> **Thời điểm đối chiếu hệ thống:** `11/11/2026, 09:00 (GMT+7)` (`2026-11-11T09:00:00+07:00`)  
> **Tiêu chuẩn thiết kế:** Số 1 `pbakaus/impeccable` (Chống AI Slop, WCAG AA $\ge 4.5:1$, lưới toán học 4px/8px)  
> **Quy chuẩn câu từ:** [VOICE_GUIDE.md](VOICE_GUIDE.md) (Nút 1–3 từ, cấm từ bot 'Vui lòng', dứt khoát thực chiến)  
> **Đối tượng bàn giao:** Subagent `architect` (Khóa API Contract) & Subagent `frontend` (Lập trình UI)

---

## 🏛️ 1. NGUYÊN TẮC THIẾT KẾ & CHỐNG AI SLOP (`pbakaus/impeccable`)

1. **Triệt tiêu AI Slop:**
   - **CẤM** dùng viền phát sáng (neon glow), cấm hiệu ứng đổ bóng tím/cyan cường điệu.
   - **CẤM** gradient lòe loẹt hoặc nền chuyển màu tương phản yếu gây mỏi mắt.
   - **CẤM** cấu trúc thẻ lồng trong thẻ (card-in-card) làm phân mảnh không gian hiển thị.
   - **CẤM** dùng Lorem Ipsum hoặc dữ liệu rác (áp dụng luật **Real-World Mock Data** chuẩn nghiệp vụ IELTS).
2. **Lưới khoảng cách toán học (Mathematical Spacing Grid):**
   - Áp dụng nghiêm ngặt thang đo 4px / 8px: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px).
   - Padding Table: Cột dữ liệu `py-3.5 px-4` (14px trên dưới, 16px trái phải), header `py-3 px-4`.
   - Padding Card Mobile: `p-4` (16px) với khoảng cách giữa các thẻ `space-y-3` (12px).
3. **Độ tương phản màu sắc (WCAG AA $\ge 4.5:1$ & AAA $\ge 7.0:1$):**
   - Màu chữ chính trên nền trắng: `#0F172A` (Slate 900) $\rightarrow$ Tỷ lệ tương phản **16.1:1** (Đạt AAA).
   - Màu chữ phụ / nhãn: `#475569` (Slate 600) $\rightarrow$ Tỷ lệ tương phản **7.0:1** (Đạt AAA).
   - Đường viền phân cách: `#E2E8F0` (Slate 200) chuẩn 1px nét mảnh.

---

## 🏷️ 2. QUY CHUẨN 4 HUY HIỆU TRẠNG THÁI (STATUS BADGES)

Mỗi trạng thái được tính toán dựa trên `submitted_at`, `due_at` và mốc đối chiếu `2026-11-11T09:00:00+07:00`.

| Trạng thái | Điều kiện logic hệ thống | Quy chuẩn màu sắc & Token | Tỷ lệ tương phản | Mô tả & Cảm xúc thị giác |
| :--- | :--- | :--- | :--- | :--- |
| **Chưa nộp** | `submitted_at == null` VÀ `due_at >= 11/11/2026 09:00` | Nền `#F1F5F9` (Slate-100)<br>Viền `#CBD5E1` (Slate-300)<br>Chữ `#334155` (Slate-700) | **9.1:1** (AAA) | **Neutral / Warm Slate:** Điềm tĩnh, thể hiện bài tập còn trong thời hạn nộp, không gây hoảng loạn. |
| **Quá hạn** | `submitted_at == null` VÀ `due_at < 11/11/2026 09:00` | Nền `#FEF2F2` (Rose-50)<br>Viền `#FECACA` (Rose-200)<br>Chữ `#991B1B` (Rose-800) | **7.3:1** (AAA) | **Muted Rose / Red:** Cảnh báo rõ ràng nhưng không gắt chói, giúp học viên nhận biết ngay nhiệm vụ bị trễ chưa làm. |
| **Đã nộp** | `submitted_at != null` VÀ `submitted_at <= due_at` | Nền `#ECFDF5` (Emerald-50)<br>Viền `#A7F3D0` (Emerald-200)<br>Chữ `#065F46` (Emerald-800) | **7.8:1** (AAA) | **Emerald / Green:** Dịu mắt, tạo cảm giác hoàn thành an tâm, chuẩn mực nộp đúng hạn. |
| **Nộp trễ** | `submitted_at != null` VÀ `submitted_at > due_at` | **Badge chính:** Đã nộp (Emerald)<br>**Tag phụ:** Nền `#FFFBEB` (Amber-50)<br>Viền `#FDE68A` (Amber-200)<br>Chữ `#92400E` (Amber-800) | **7.5:1** (AAA) | **Emerald + Amber Sub-badge:** Ghi nhận bài đã được nộp nhưng minh bạch việc nộp sau deadline. |

### Tailwind Classes Mẫu Cho Subagent Frontend:
- **Chưa nộp:** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300`
- **Quá hạn:** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-800 border border-red-200`
- **Đã nộp (Đúng hạn):** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200`
- **Nộp trễ (Cặp đôi):**
  - Cụm hiển thị:
    ```html
    <div class="inline-flex items-center gap-1.5">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">Đã nộp</span>
      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">Nộp trễ</span>
    </div>
    ```

---

## 🗣️ 3. BẢNG CHỮ (VOICE GUIDE) — TUÂN THỦ TRIỆT ĐỂ VOICE_GUIDE.MD

### A. Định danh màn hình & Tiêu đề
- **Tiêu đề chính:** `Bài tập của tôi` (H1, 24px, Font Semibold/Bold, `#0F172A`)
- **Thông tin học viên:** `Học viên: Lương Lý Anh Tú (Mã: S01)` (Text 14px, `#475569`)
- **Banner đối chiếu hệ thống:**
  - Nhãn hiển thị: `Thời điểm đối chiếu hệ thống: 11/11/2026, 09:00 (GMT+7)`
  - Kiểu dáng: Banner ngang nền `#F8FAFC`, viền `border border-slate-200`, icon đồng hồ nhỏ `#64748B`, số giờ hiển thị định dạng chuẩn.

### B. Nhãn bộ lọc & Thống kê nhanh (Filter Tabs)
- `Tất cả` (Tổng số bài)
- `Chưa nộp` (Số bài còn hạn)
- `Đã nộp` (Số bài đã hoàn thành, gồm cả nộp đúng hạn và nộp trễ)
- `Quá hạn` (Số bài trễ hạn chưa nộp)

### C. Tiêu đề các cột dữ liệu (Table Headers trên Desktop)
1. `Mã bài` (Căn trái)
2. `Tên bài tập` (Căn trái)
3. `Kỹ năng` (Căn giữa)
4. `Hạn nộp` (Căn giữa, tabular-nums)
5. `Ngày nộp` (Căn giữa, tabular-nums)
6. `Trạng thái` (Căn giữa)
7. `Thao tác` (Căn phải)

### D. Danh sách nút bấm hành động (Độ dài chuẩn 1–3 từ, cấm từ bot)
| Nút bấm | Số từ | Ngữ cảnh sử dụng | Kiểu nút (Variant) |
| :--- | :---: | :--- | :--- |
| `Làm mới` | 2 từ | Tải lại danh sách bài tập từ máy chủ | Outline / Ghost (Icon xoay + chữ) |
| `Xem chi tiết` | 3 từ | Mở xem chi tiết đề bài, hướng dẫn hoặc file bài nộp | Secondary / Outline |
| `Nộp bài` | 2 từ | Bài tập trạng thái "Chưa nộp" hoặc "Quá hạn" (nếu cho phép nộp bù) | Primary (`bg-slate-900 text-white`) |
| `Nộp lại` | 2 từ | Bài tập trạng thái "Đã nộp" nhưng còn trong hạn cho phép sửa | Outline / Ghost |
| `Đóng` | 1 từ | Tắt modal/ngăn kéo chi tiết | Neutral / Secondary |
| `Xóa bộ lọc` | 3 từ | Khi lọc không ra kết quả và muốn quay lại tất cả | Ghost / Link |

### E. Trạng thái tải & Thông báo hệ thống
- Đang xử lý: `Đang tải...`
- Lưu/Nộp thành công: `Đã nộp bài` / `Đã lưu`
- Chưa có dữ liệu: `Chưa có bài tập nào`
- Không tìm thấy khi lọc: `Không tìm thấy bài tập phù hợp`

---

## 📐 4. BỐ CỤC RESPONSIVE 2 CHẾ ĐỘ CHI TIẾT

### A. Chế độ Desktop ($\ge 768px$ - Màn hình Laptop/PC chuẩn 1440px)
- **Cấu trúc bao ngoài:** Container căn giữa, `max-w-6xl mx-auto px-6 py-8`.
- **Thanh tiêu đề (Header Bar):**
  - Trái: Tiêu đề H1 `Bài tập của tôi` + Subtitle `Học viên: Lương Lý Anh Tú (Mã: S01)`.
  - Phải: Nút `Làm mới` (nút ghost thanh lịch, icon xoay nhẹ).
- **Banner đối chiếu (System Benchmark Banner):**
  - Nằm ngay dưới tiêu đề, bo góc `rounded-lg`, nền xám ấm mỏng `bg-slate-50 border border-slate-200 px-4 py-2.5`.
  - Hiển thị icon đồng hồ + chữ rõ nét: `Thời điểm đối chiếu hệ thống: 11/11/2026, 09:00 (GMT+7)`.
- **Hàng thanh lọc (Tabs / Filter Pills):**
  - Thẻ đếm số lượng với các tab: `Tất cả (5)`, `Chưa nộp (2)`, `Đã nộp (2)`, `Quá hạn (1)`.
- **Bảng dữ liệu (Data Table - `TanStack/table` & `shadcn/ui` style):**
  - Khung bảng: Nền `#FFFFFF`, viền bao `border border-slate-200 rounded-lg overflow-hidden shadow-sm`.
  - Hàng tiêu đề (Thead): Nền `bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider`.
  - Hàng dữ liệu (Tbody):
    - Chiều cao hàng tối thiểu 56px, hover `hover:bg-slate-50/75 transition-colors`.
    - Phân tách bằng viền ngang `border-b border-slate-100 last:border-b-0`.
  - Quy chuẩn căn lề nghiêm ngặt:
    - **Cột Tên bài tập & Mã bài:** Căn trái (`text-left`), tên bài `font-medium text-slate-900`, mã bài `font-mono text-xs text-slate-500`.
    - **Cột Kỹ năng (Writing, Reading, Listening, Speaking):** Căn giữa (`text-center`), badge kỹ năng viền nhẹ.
    - **Cột Hạn nộp & Ngày nộp:** Căn giữa (`text-center font-mono tabular-nums text-slate-600 text-sm`). Nếu chưa nộp hiển thị dấu gạch ngang `—` mờ.
    - **Cột Trạng thái:** Căn giữa (`text-center`), hiển thị 1 trong 4 loại Huy hiệu trạng thái đã quy chuẩn.
    - **Cột Thao tác:** Căn phải (`text-right`), cụm nút thao tác gọn gàng (`Xem chi tiết`, `Nộp bài`).

### B. Chế độ Mobile ($< 768px$ - Màn hình di động chuẩn 375px)
- **Chuyển đổi hoàn toàn sang danh sách thẻ (Card-based List):**
  - CẤM co kéo bảng table gây vỡ chữ hay phải cuộn ngang khó chịu.
  - Mỗi bài tập hiển thị dưới dạng 1 Card độc lập, khoảng cách giữa các card `gap-3`.
  - Nền Card: `#FFFFFF`, viền `border border-slate-200`, bo góc `rounded-lg`, padding `p-4`.
- **Cấu trúc bên trong mỗi Card:**
  1. **Hàng đầu (Header Card):**
     - Trái: Tag kỹ năng (VD: `Writing` / `Reading`) + Mã bài (`font-mono text-xs text-slate-500`).
     - Phải: Huy hiệu trạng thái (`Chưa nộp`, `Quá hạn`, `Đã nộp [Nộp trễ]`).
  2. **Thân thẻ (Body Card):**
     - Tiêu đề bài tập: `text-base font-semibold text-slate-900 leading-snug mt-2 mb-3`.
     - Lưới thông tin thời gian (2 dòng rõ ràng):
       - Hạn nộp: Icon lịch + `Hạn nộp: 10/11/2026 23:59` (nổi bật màu đỏ nếu quá hạn).
       - Ngày nộp: Icon đồng hồ + `Ngày nộp: 11/11/2026 08:15` (nếu có) hoặc `Chưa nộp`.
  3. **Chân thẻ (Footer Card):**
     - Đường kẻ mờ phân tách nhẹ `border-t border-slate-100 pt-3 mt-3`.
     - Nút hành động chính (`Nộp bài` / `Xem chi tiết`) thiết kế full-width hoặc nút bấm to với chiều cao tối thiểu **40px - 44px** đảm bảo chuẩn cảm ứng (Touch Target theo Apple HIG & WCAG 2.1).

---

## 📊 5. DỮ LIỆU MẪU NGHIỆP VỤ THỰC TẾ (REAL-WORLD MOCK DATA)

> Áp dụng luật **Zero-Lorem-Ipsum**: Sử dụng 100% dữ liệu đề thi & bài tập IELTS chuẩn mực.
> Mốc thời gian đối chiếu: `2026-11-11T09:00:00+07:00`

```json
[
  {
    "id": "asm_01",
    "code": "IELTS-W1-01",
    "title": "IELTS Writing Task 1: Phân tích biểu đồ năng lượng tái tạo",
    "skill": "Writing",
    "description": "The chart below shows the proportion of electricity generated from renewable sources in four countries between 2010 and 2025.",
    "due_at": "2026-11-09T23:59:00+07:00",
    "submitted_at": "2026-11-09T21:15:00+07:00",
    "status": "submitted_on_time",
    "status_label": "Đã nộp",
    "is_late": false
  },
  {
    "id": "asm_02",
    "code": "IELTS-W2-03",
    "title": "IELTS Writing Task 2: Nghị luận về trí tuệ nhân tạo và thị trường lao động",
    "skill": "Writing",
    "description": "Some people believe that artificial intelligence will create more jobs than it eliminates. To what extent do you agree or disagree?",
    "due_at": "2026-11-10T23:59:00+07:00",
    "submitted_at": "2026-11-11T08:15:00+07:00",
    "status": "submitted_late",
    "status_label": "Đã nộp",
    "is_late": true
  },
  {
    "id": "asm_03",
    "code": "IELTS-R3-02",
    "title": "IELTS Reading: Luyện đọc chuyên sâu chủ đề Lịch sử tiến hóa của cá voi",
    "skill": "Reading",
    "description": "Academic Reading Passage 3 - The Evolutionary History of Cetaceans and Modern Marine Mammals.",
    "due_at": "2026-11-10T12:00:00+07:00",
    "submitted_at": null,
    "status": "overdue",
    "status_label": "Quá hạn",
    "is_late": true
  },
  {
    "id": "asm_04",
    "code": "IELTS-L4-01",
    "title": "IELTS Listening: Section 4 - Dự án bảo tồn đa dạng sinh học đô thị",
    "skill": "Listening",
    "description": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    "due_at": "2026-11-12T23:59:00+07:00",
    "submitted_at": null,
    "status": "pending",
    "status_label": "Chưa nộp",
    "is_late": false
  },
  {
    "id": "asm_05",
    "code": "IELTS-S2-04",
    "title": "IELTS Speaking Part 2: Thu âm bài nói chủ đề Chuyến đi đáng nhớ",
    "skill": "Speaking",
    "description": "Describe a memorable journey you have made by public transport. You should say: where you went, what happened, and explain why it was memorable.",
    "due_at": "2026-11-15T18:00:00+07:00",
    "submitted_at": null,
    "status": "pending",
    "status_label": "Chưa nộp",
    "is_late": false
  }
]
```

### Phân Bổ Trạng Thái Kiểm Thử Đạt Chuẩn:
- 1 bài **Đã nộp (Đúng hạn)**: `IELTS-W1-01` (Hạn 09/11 23:59, nộp 09/11 21:15).
- 1 bài **Đã nộp (Nộp trễ)**: `IELTS-W2-03` (Hạn 10/11 23:59, nộp 11/11 08:15).
- 1 bài **Quá hạn**: `IELTS-R3-02` (Hạn 10/11 12:00 < Hiện tại 11/11 09:00, chưa nộp).
- 2 bài **Chưa nộp (Còn hạn)**: `IELTS-L4-01` (Hạn 12/11) & `IELTS-S2-04` (Hạn 15/11).

---

## 🎨 6. BẢNG MÃ MÀU & THÔNG SỐ KỸ THUẬT GIAO DIỆN

| Yếu tố giao diện | Hex Code | Lớp Tailwind CSS tương ứng | Ghi chú thiết kế |
| :--- | :--- | :--- | :--- |
| **Nền ứng dụng** | `#F8FAFC` | `bg-slate-50` | Nền sáng trung tính, dịu mắt |
| **Bề mặt Container** | `#FFFFFF` | `bg-white border border-slate-200` | Khối nội dung chính, phẳng sạch |
| **Chữ chính (Headings)** | `#0F172A` | `text-slate-900` | Tương phản 16.1:1, phân cấp rõ |
| **Chữ phụ (Body/Meta)** | `#475569` | `text-slate-600` | Dễ đọc, thanh lịch |
| **Chữ làm mờ (Muted)** | `#94A3B8` | `text-slate-400` | Dùng cho dấu gạch ngang, placeholder |
| **Đường viền chung** | `#E2E8F0` | `border-slate-200` | Độ dày 1px hairline |
| **Huy hiệu Kỹ năng** | `#F1F5F9` | `bg-slate-100 text-slate-700` | Bo góc nhẹ `rounded px-2 py-0.5 text-xs` |
| **Nút bấm chính** | `#0F172A` | `bg-slate-900 text-white hover:bg-slate-800` | Phẳng dứt khoát, bo góc `rounded-md` |
| **Nút bấm phụ** | `#FFFFFF` | `bg-white border border-slate-300 text-slate-700` | Rõ ràng, dễ nhận biết |

---

## 🤝 7. ĐIỀU KIỆN NGHIỆM THU CHO SUBAGENT TIẾP THEO

1. **Subagent `architect`:** Sử dụng cấu trúc trường dữ liệu trong Phần 5 để thiết lập API Contract (`GET /api/students/S01/assignments`) và TypeScript types.
2. **Subagent `frontend`:**
   - Triệt tiêu 100% glow neon, card-in-card.
   - Chép chính xác 100% Bảng Chữ trong Phần 3, tuyệt đối không tự bịa thêm nhãn hoặc dùng từ bot.
   - Triển khai 2 chế độ hiển thị: Table cho Desktop và Card List cho Mobile.
   - Đảm bảo 0% lỗi F12 Console (`console_errors = 0`).
3. **Subagent `ui-tester`:** Chụp ảnh kiểm chứng Desktop (1440px) và Mobile (375px) để Subagent `design` thẩm định Chế độ 2.
