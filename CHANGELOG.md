# Nhật Ký Thay Đổi & Cập Nhật (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tiết Khí & Kỳ Môn Độn Giáp (Astronomical Precision Engine)** sẽ được ghi lại chi tiết và có hệ thống trong tệp tin này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/), và dự án tuân thủ [Semantic Versioning (Phiên Bản Ngữ Nghĩa)](https://semver.org/spec/v2.0.0.html).

---

## [[2.28.0]] - 2026-09-02
### Codename: *Dự Trắc Song Thức: Kỳ Môn (Thời Điểm & 8 Hướng) & Lục Nhâm (3 Giai Đoạn) (Combined Ky Mon & Luc Nham Prognostication Engine)*

#### 🌟 Tái Thiết Phân Hệ Dự Trắc Chuyên Sâu Thành Hệ Thống Song Thức Đỉnh Cao
- **Mô-Đun Tổng Hợp Song Thức (`/src/astronomy/prognosticationCombined.ts`)**:
  - Tích hợp động cơ phân tích kết hợp giữa **Kỳ Môn Độn Giáp** (đoán định thời điểm & cát hung 8 hướng không gian) và **Đại Lục Nhâm** (đoán định tiến trình thời gian qua 3 giai đoạn Tam Truyền).
  - Tự động đánh giá định lượng điểm số cát hung kết hợp (0 - 100) và phán từ toàn cục.
  - Xây dựng ma trận phân tích cát hung 8 hướng (9 Cung Lạc Thư), xác định rõ ràng hướng cát phương thuận lợi và hung phương bất lợi kèm điểm số, Cửa, Sao, Thần và lời khuyên.
  - Phân tích chi tiết 3 giai đoạn của Lục Nhâm: Sơ Truyền (Phát Đoan / Khởi đầu), Trung Truyền (Di Dời / Diễn biến), Mạt Truyền (Quy Túc / Kết quả).
  - Trích xuất danh mục hành động hành xử rõ ràng: **THỜI KHẮC NÀY NÊN LÀM GÌ?**, **THỜI KHẮC NÀY KHÔNG NÊN LÀM GÌ?**, và **TƯ VẤN PHƯƠNG ÁN TỐT NHẤT (Master Action Plan)**.
- **Giao Diện Dự Trắc Chuyên Sâu Tái Cấu Trúc (`/src/components/KyMonPrognosticationView.tsx`)**:
  - Thiết kế 4 tab trực quan chuyên nghiệp:
    1. **🌟 1. Tổng Hợp Song Thức (Nên & Không Nên Làm)**: Cung cấp điểm số năng lượng thời khắc, phán từ khái quát, danh mục NÊN LÀM, danh mục KHÔNG NÊN LÀM, bản đồ cát hung 8 hướng và tư vấn phương án tối ưu.
    2. **🧭 2. Dự Trắc Kỳ Môn (Cát Hung Thời Điểm & 8 Hướng)**: Phán đoán thời điểm hiển thị cát hung thế nào, thời điểm này phù hợp làm gì, cách cục đặc biệt và bảng đánh giá chi tiết 8 hướng.
    3. **🔮 3. Dự Trắc Lục Nhâm (3 Giai Đoạn Tam Truyền)**: Hiển thị 3 card tương tác đại diện cho 3 giai đoạn diễn tiến sự việc kèm theo Tông Môn Khóa Thể và luận giải 6 sự vụ.
    4. **📖 4. Tra Cứu Việc Đời Cổ Bản (6 Chủ Đề)**: Bảo toàn toàn bộ tri thức cổ truyền của Kỳ Môn (Hôn nhân, Y học, Cầu tài, Công danh, Mất của, Kiện tụng, Thân Mệnh, Tam Bàn).
  - Bổ sung nút sao chép toàn văn bản dự trắc một chạm để dễ dàng lưu trữ hoặc gửi tư vấn.
- **Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Thêm Mục 24 thuyết minh chi tiết cấu trúc hệ thống Dự Trắc Song Thức.

---

## [[2.27.0]] - 2026-09-01
### Codename: *Biểu Đồ Thống Kê Năng Lượng 9 Cung & Xu Hướng Cục Kỳ Môn Recharts (Ky Mon Energy Trends Analytics)*

#### 📊 Tích Hợp Biểu Đồ Thống Kê Động Học Recharts Vào Kỳ Môn Độn Giáp
- **Mô-Đun Phân Tích Timeline & Biến Thiên Năng Lượng (`/src/astronomy/kymonEnergyTimeline.ts`)**:
  - Xây dựng mô-đun phân tích dữ liệu 12 Canh Giờ và 30 Ngày liên tiếp, tính toán điểm số năng lượng định lượng (0 - 100) cho từng Cung và toàn Cục.
  - Tổng hợp dữ liệu Radar 9 Cung theo cấu trúc Lạc Thư chuẩn và phân bổ tỷ trọng Ngũ Hành.
- **Thành Phần Trực Quan Hóa Đa Chiều (`/src/components/KyMonEnergyTrendsChart.tsx`)**:
  - **Biểu đồ Xu Hướng 12 Giờ (AreaChart & LineChart)**: Cho phép xem đường trung bình toàn Cục hoặc lọc riêng từng Cung để tìm khung giờ vàng (Golden Window).
  - **Biểu đồ Radar Đa Chiều 9 Cung (RadarChart)**: Quan sát phân bố vượng suy của 9 phương vị bát quái.
  - **Biểu đồ Tiến Trình 30 Ngày**: Hoạch định chiến lược dài hạn theo chu kỳ Tiết Khí và Âm/Dương Độn.
  - **Biểu đồ Ngũ Hành Cục (BarChart)**: Đánh giá độ cân bằng sinh khắc giữa Kim, Mộc, Thủy, Hỏa, Thổ.
- **Tương Tác Đồng Bộ Hai Chiều & Chế Độ Xem Linh Hoạt (`/src/components/KyMonCompleteBoard.tsx`)**:
  - Thêm bộ chọn chế độ xem: **Toàn Diện** (Song song Bàn 9 Cung & Biểu Đồ), **Bàn 9 Cung**, hoặc **Biểu Đồ Xu Hướng**.
  - Nhấp vào bất kỳ mốc giờ hoặc ngày nào trên biểu đồ để tức thì đồng bộ thời gian và cập nhật Bàn Kỳ Môn.
- **Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Thêm Mục 23 thuyết minh chi tiết nguyên lý biểu đồ thống kê năng lượng Kỳ Môn.

---

## [[2.26.1]] - 2026-09-01
### Codename: *Tối Ưu Hóa Hiệu Năng Cao & Xử Lý Triệt Để Hiện Tượng Đơ Lag Chuyên Mục Trạch Cát (High Performance Almanac & Trạch Cát Turbo)*

#### ⚡ Tối Ưu Hóa Hiệu Năng & Khắc Phục Hiện Tượng Đứng/Đơ UI
- **Loại Bỏ Tính Toán Lặp Dư Thừa (`/src/astronomy/dailyAlmanac.ts`)**:
  - Khắc phục triệt để hiện tượng đứng máy khi vào chuyên mục Trạch Cát: Thay vì gọi hàm `calculateComprehensiveResult` (vốn tính toàn bộ 1080 Cục Kỳ Môn, Lục Nhâm, và tìm nghiệm nhị phân tiết khí) 30 lần trong vòng lặp cả tháng, chuyển sang dùng hàm tính kinh độ mặt trời trực tiếp và tính Bát Tự siêu tốc (<0.1ms).
  - Tích hợp bộ nhớ đệm `almanacCache` (in-memory cache) cho kết quả tính Lịch Ngày Vạn Niên, giảm thời gian tính toán cho các lần xem tiếp theo về 0ms.
- **Tối Ưu Hóa Render React Trong Chuyên Mục Trạch Cát (`/src/components/TrachCatView.tsx`)**:
  - Tách bạch quá trình tạo danh sách ngày thô trong tháng (`targetMonthData`) với quá trình đánh giá mức độ tương thích công việc (`evaluatedDaysInMonth`).
  - Khi người dùng đổi danh mục công việc hoặc bấm chọn ngày, hệ thống chỉ chạy bộ so sánh O(1) trong bộ nhớ mà không cần tính toán lại lịch vạn niên của cả tháng.
- **Rà Soát & Tinh Gọn Mã Nguồn**:
  - Dọn dẹp các import không sử dụng và tối ưu hóa tính năng chuyển tab.

---

## [[2.26.0]] - 2026-09-01
### Codename: *Chuyên Mục Trạch Cát Toàn Thư "Hiệp Kỷ Biện Phương Thư" & Chuẩn Hóa Ngày Giờ Hoàng Đạo, 12 Trực (Hiệp Kỷ Date Selection & Almanac Precision)*

#### 🏛️ Xây Dựng Chuyên Mục Trạch Cát Toàn Thư Theo Khâm Định Hiệp Kỷ Biện Phương Thư
- **Chuyên Mục Trạch Cát Chuyên Sâu (`/src/components/TrachCatView.tsx` & `/src/astronomy/trachCatEngine.ts`)**:
  - Xây dựng chuyên mục Trạch Cát toàn thư dựa trên bộ sách hoàng triều *Khâm Định Hiệp Kỷ Biện Phương Thư* (gồm 36 quyển trong Tứ Khố Toàn Thư do đại học sĩ Mai Cốc Thành chủ biên thời vua Càn Long).
  - Tích hợp 4 tab chuyên sâu:
    1. **Tìm Ngày Đẹp Theo Việc**: Lựa chọn 9+ nhóm việc trọng đại (Cưới hỏi, Động thổ, Khai trương, Giao dịch/Ký hợp đồng, Xuất hành, Nhậm chức, Cúng tế, Chữa bệnh, An táng) để tự động quét cả tháng và xếp hạng các ngày cát lợi nhất dựa trên 6 bậc biện chứng cát hung.
    2. **Biện Chứng Cát Hung Ngày**: Phân tích chi tiết Thần Sát (Cát Tinh, Hung Thần), 12 Trực, 28 Tú, Việc nên làm (Nghi) và Việc kỵ của ngày đang chọn.
    3. **Giờ Hoàng Đạo & Quý Đăng Thiên Môn**: Tra cứu 6 giờ Hoàng Đạo (kèm tinh danh), Giờ Quý Đăng Thiên Môn (720 khóa tối thiện), đồng thời cảnh báo giờ Ngũ Bất Ngộ và Triệt Lộ Không Vong.
    4. **Cẩm Nang 13 Mục Hiệp Kỷ**: Tóm lược nguyên lý 13 mục kinh điển (Bản Nguyên, Nghĩa Lệ, Lập Thành, Biện Oa...).
- **Chuẩn Hóa Chính Xác Ngày & Giờ Hoàng Đạo, 12 Trực**:
  - Thay thế thuật toán gần đúng bằng bảng lập thành chính xác từ Quyển 7 & 9 của Hiệp Kỷ Biện Phương Thư.
  - Ngày Hoàng Đạo đối chiếu vị trí bắt đầu theo từng tháng âm lịch; Giờ Hoàng Đạo tính chính xác theo can/chi ngày.
  - 12 Trực (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thâu, Khai, Bế) khởi chính xác từ Chi của tháng (Nguyệt Kiến).
- **Tích Hợp Vào Lịch Ngày Chi Tiết (`/src/components/DailyCalendarView.tsx`)**:
  - Bổ sung khối Thần Sát, Việc Nên Làm và Việc Nên Tránh, nút chuyển tiếp 1 chạm tới chuyên mục Trạch Cát Toàn Thư.
- **Cập Nhật Mục 22 Trong Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Thuyết minh chi tiết 6 bậc biện chứng cát hung, bách thần sát và phương pháp tuyển trạch ngày giờ.

---

## [[2.25.0]] - 2026-09-01
### Codename: *Bổ Sung Trang Lịch Ngày Vạn Niên Block Chi Tiết & Tra Cứu Điểm Sóc Nhanh (Dedicated Daily Block Almanac & New Moon Navigator)*

#### 📅 Bổ Sung Giao Diện Trang Riêng Chuyên Về Lịch Ngày Chi Tiết
- **Thiết Kế Khối Lịch Block Truyền Thống Việt Nam (`/src/components/DailyCalendarView.tsx` & `/src/astronomy/dailyAlmanac.ts`)**:
  - Tích hợp chuẩn phong cách Lịch Block thượng lưu với khối trên đỏ son sang trọng hiển thị Tháng Dương Lịch, Năm Dương Lịch, Số Ngày Dương khổng lồ, Thứ trong tuần cùng Sự kiện lịch sử kỷ niệm và Danh ngôn triết lý nhân sinh.
  - Khối dưới nền giấy hoàng đạo cổ kính hiển thị Con Giáp, Ngày Âm Lịch, Tháng Âm Lịch (kèm hiển thị Nhuận), Ngày Hoàng Đạo / Hắc Đạo với Tinh Danh chuẩn xác (Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh...).
  - Can Chi 4 Trụ đầy đủ: Năm Can Chi, Tháng Can Chi, Ngày Can Chi, Giờ Cục Bộ & Giờ Can Chi, Tiết khí thiên văn tại thời điểm tra cứu.
- **Bảng 6 Giờ Hoàng Đạo Cát Lợi Trong Ngày**:
  - Tra cứu và liệt kê chính xác 6 giờ Hoàng Đạo theo Chi Ngày kèm Can Chi từng giờ và khoảng thời gian (ví dụ: `Nhâm Tý (23h-1h)`, `Quý Sửu (1h-3h)`...).
- **Phong Thủy Cổ Học Toàn Diện: 12 Trực, 28 Nhị Thập Bát Tú & Hướng Xuất Hành**:
  - Xác định chuẩn Trực ngày (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thâu, Khai, Bế) và ý nghĩa cát hung.
  - Tra cứu 28 sao Nhị Thập Bát Tú (Giác, Cang, Đê, Phòng, Tâm...) cùng Hướng xuất hành Hỷ Thần, Tài Thần, Hạc Thần.
- **Tương Tác & Điều Hướng Thông Minh**:
  - Thanh chọn nhanh Ngày (1..31), Tháng (1..12), Năm (1900..2100) + nút "Xem".
  - Nút lật trang trái/phải `<` `>` chuyển ngày tức thì; nút bước nhảy tháng `<` `>` ở phần tiêu đề; nút chuyển nhanh Hôm qua / Hôm nay / Ngày mai.
  - Phím tắt chuyển nhanh sang Lập Bàn Kỳ Môn Giờ Này hoặc Xem Điểm Sóc Âm Lịch.
- **Liên Kết Tự Động Từ Bảng Lịch Tra Cứu Nhanh (`/src/components/MiniCalendar.tsx` & `/src/components/LunarNewMoonSection.tsx`)**:
  - Khi người dùng nhấp vào bất kỳ ô ngày nào trong MiniCalendar của nhóm Điểm Sóc Âm Lịch, hệ thống tự động mở giao diện trang Lịch Ngày Chi Tiết tương ứng.
- **Cập Nhật Mục 20 Thuyết Minh Thuật Toán**:
  - Cập nhật đồng bộ trong `AlgorithmGuideModal.tsx` giải trình thuật toán Lịch Vạn Niên Block và 6 Giờ Hoàng Đạo.

---

## [[2.24.4]] - 2026-08-31
### Codename: *Hoàn Thiện Tự Động Luân Chuyển Mô Hình AI Ngầm & Tối Giản Giao Diện Chat (Seamless Background AI Routing & Streamlined Chat UI)*

#### ✨ Tự Động Luân Chuyển Mô Hình AI Ngầm 100% & Tối Giản Giao Diện Chat
- **Khắc Phục Lỗi Giới Hạn Mảng OpenRouter (`/server.ts` & `/src/services/aiChatService.ts`)**:
  - Sửa lỗi OpenRouter API báo lỗi `'models' array must have 3 items or fewer` bằng cách xử lý vòng lặp luân chuyển tuần tự chuẩn xác trên từng mô hình (`Gemini 2.5 Flash ➔ Gemini 2.5 Flash Lite ➔ DeepSeek V3 ➔ GPT-4o Mini ➔ DeepSeek R1 ➔ Claude 3.7 Sonnet`).
- **Tự Động Hóa 100% Không Cần Thao Tác Thủ Công (`/src/components/AIChatbotModal.tsx`)**:
  - Loại bỏ hoàn toàn dropdown chọn mô hình thủ công rườm rà ở Header trên cả máy tính lẫn điện thoại di động.
  - Header trở nên tinh tế, thoáng đãng, chỉ tập trung vào thông tin đại sư, trạng thái kết nối API Key và nút đóng cửa sổ to rõ.
- **Hiển Thị Minh Bạch Mô Hình AI Đang Phục Vụ**:
  - Gắn nhãn badge mô hình thực tế đã xử lý câu trả lời ngay phía trên từng tin nhắn phản hồi của AI (ví dụ: `AI Master` + `✨ Gemini 2.5 Flash` hoặc `⚡ DeepSeek V3 (Đã chuyển tiếp tự động)`).
- **Đồng Bộ Tài Liệu & Thuyết Minh Thuật Toán**:
  - Cập nhật Mục 19 trong `AlgorithmGuideModal.tsx`.

---

## [[2.24.3]] - 2026-08-31
### Codename: *Tự Động Luân Chuyển & Dự Phòng Mô Hình AI Thông Minh (Smart Auto-Fallback Multi-Model Routing)*

#### ✨ Tự Động Chọn & Luân Chuyển Mô Hình AI Khi Hết Dung Lượng (Auto Fallback)
- **Tích Hợp Chế Độ Mặc Định "✨ Tự Động (Auto Fallback)" (`/src/components/AIChatbotModal.tsx` & `/src/services/aiChatService.ts`)**:
  - Người dùng không cần phải tự thao tác chuyển đổi mô hình thủ công.
  - Khi một mô hình bất kỳ gặp sự cố hết dung lượng, vượt quá giới hạn tốc độ (rate limit/quota 429), hết credit (402) hoặc máy chủ quá tải (503), hệ thống tự động và mượt mà thử nghiệm các mô hình kế tiếp trong chuỗi dự phòng thông minh: `Gemini 2.5 Flash ➔ Gemini 2.5 Flash Lite ➔ DeepSeek V3 ➔ GPT-4o Mini ➔ DeepSeek R1 ➔ Claude 3.7 Sonnet`.
- **Kiến Trúc Dự Phòng Đa Tầng (Dual-Layer Fallback Architecture) (`/server.ts` & `/src/services/aiChatService.ts`)**:
  - Tích hợp vòng lặp luân chuyển dự phòng trên cả Express Proxy server `/api/chat` lẫn kênh gọi trực tiếp OpenRouter fallback từ client.
  - Phản hồi metadata `model_used`, `fallback_occurred` và `auto_routed` giúp hiển thị rõ ràng mô hình AI đã hoàn thành phản hồi.
- **Đồng Bộ Tài Liệu & Thuyết Minh Thuật Toán**:
  - Cập nhật Mục 19 trong `AlgorithmGuideModal.tsx` giải trình cơ chế tự động luân chuyển mô hình AI.

---

## [[2.24.2]] - 2026-08-30
### Codename: *Tối Ưu Mobile AI Chatbot & Hoàn Thiện Tra Cứu Lịch Điểm Sóc (Mobile AI Chat Responsive & Enhanced Solar-Lunar Year Selector)*

#### 📱 Tối Ưu Giao Diện AI Chatbot Trên Điện Thoại Di Động (Mobile Responsive)
- **Tái Cấu Trúc Header 2 Tầng Chống Vỡ Chữ (`/src/components/AIChatbotModal.tsx`)**:
  - Khắc phục triệt để lỗi tiêu đề bị bóp méo thành một cột dọc từng chữ trên màn hình nhỏ.
  - Tách biệt thanh chọn mô hình AI (Model Selector) xuống hàng thứ 2 trên mobile, đảm bảo tiêu đề và các nút chức năng luôn hiển thị gọn gàng, thanh thoát.
- **Cố Định Nút Đóng (X) To Rõ Ở Góc Trên Bên Phải**:
  - Đảm bảo nút đóng `(X)` luôn luôn hiển thị đầy đủ, không bao giờ bị tràn lề hoặc bị che khuất trên mọi kích thước màn hình điện thoại (touch target 34px - 44px).

#### 📅 Khắc Phục Hoàn Toàn Ô Chọn Năm Trong Lịch Điểm Sóc & Bảng Tiết Khí (Fixed & Improved)
- **Thay Thế Ô Input Năm Bằng Select Dropdown Đầy Đủ 1900-2100 (`/src/components/MiniCalendar.tsx`)**:
  - Khắc phục lỗi không thể xóa hoặc gõ năm khác trong Lịch Tra Cứu Nhanh của mục Điểm Sóc Âm Lịch.
  - Tích hợp thẻ chọn năm linh hoạt từ năm 1900 đến 2100 hỗ trợ native wheel picker trên iOS/Android và dropdown mượt mà trên desktop.
- **Đồng Bộ Bộ Chọn Năm Trong Bảng 24 Tiết Khí (`/src/components/YearTermsTable.tsx`)**:
  - Nâng cấp bộ chọn năm sang dropdown select từ 1900 đến 2100 kèm các nút Lùi/Tiến năm tiện lợi.
- **Đồng Bộ Tài Liệu & Thuyết Minh Thuật Toán**:
  - Cập nhật Mục 19 trong `AlgorithmGuideModal.tsx` giải trình tối ưu hóa trải nghiệm di động.

---

## [[2.24.1]] - 2026-08-30
### Codename: *Tối Ưu AI Chatbot: Trả Lời Trực Diện & Gợi Ý 1 Chạm Tự Nhiên (Direct Answer & 1-Touch Action Chips)*

#### ⚡ Tinh Gọn Văn Bản & Trực Quan Hóa Gợi Ý 1 Chạm (Added & Improved)
- **Loại Bỏ Tiêu Đề Dẫn Chuyện Rườm Rà Trong Văn Bản Phản Hồi (`/src/services/aiChatService.ts`)**:
  - Không chèn các tiêu đề như "Dẫn chuyện tiếp theo" hay danh sách text dài dòng vào thân bài luận giải.
  - Phản hồi của AI tập trung 100% vào việc trả lời dứt khoát câu hỏi của người dùng và đưa ra lời khuyên thiết thực.
- **Tự Động Bóc Tách & Hiển Thị Nút Bấm Gợi Ý 1 Chạm (`/src/components/AIChatbotModal.tsx`)**:
  - Áp dụng hàm bóc tách `parseMessageContent` giúp thân bài markdown giữ sạch sẽ tuyệt đối.
  - Cụm nút bấm tương tác 1 chạm hiển thị dưới chân tin nhắn với câu hỏi dẫn dắt thân thiện: *"Bạn muốn biết gì thêm hoặc muốn làm gì tiếp theo?"*.
  - Người dùng có thể nhấp trực tiếp vào bất kỳ nút gợi ý nào để gửi câu hỏi đào sâu ngay lập tức.
- **Đồng Bộ Tài Liệu & Thuyết Minh Thuật Toán**:
  - Cập nhật Mục 19 trong `AlgorithmGuideModal.tsx` giải trình quy chuẩn phản hồi trực diện và gợi ý 1 chạm.

---

## [[2.24.0]] - 2026-08-30
### Codename: *Tối Ưu AI Chatbot: Phản Hồi Trực Diện & Dẫn Chuyện Chuyên Môn Sâu (Concise & Deep Narrative AI)*

#### ⚡ Tối Ưu Phản Hồi Ngắn Gọn & Dẫn Chuyện Chuyên Môn (Added & Improved)
- **Tái Cấu Trúc System Prompt Cho Phản Hồi Trực Diện (`/src/services/aiChatService.ts`)**:
  - Loại bỏ hoàn toàn các đoạn mở đầu rườm rà hay lý thuyết dài dòng; câu trả lời tập trung ngay vào trọng tâm trong khoảng 150 - 300 từ.
  - Áp dụng cấu trúc 3 phần chuẩn mực:
    1. 🎯 **Kết Luận Trực Diện:** Trả lời dứt khoát Cát/Hung, Đạt/Không Đạt, Thuận/Nghịch cho vấn đề hỏi trong 1-2 câu.
    2. 🔍 **Căn Cứ Quẻ Then Chốt:** Chỉ trích xuất 2-3 dữ liệu cốt lõi nhất từ bàn quẻ (Cung Dụng Thần, Bát Môn, Cửu Tinh, Bát Thần, Can khắc ứng, hoặc Tam Truyền Lục Nhâm).
    3. 💡 **Lời Khuyên Hành Động:** Nêu rõ phương hướng, thời điểm thuận lợi và sách lược làm Chủ hay Khách.
- **Tính Năng Dẫn Chuyện & Gợi Ý Mở Rộng Chuyên Môn Tiếp Theo**:
  - Mỗi câu trả lời của AI luôn tự động đề xuất 2-3 câu hỏi mở rộng dẫn dắt sang các khía cạnh chuyên môn liên đới (pháp lý Cảnh Môn, tiến độ Lục Nhâm Tam Truyền, thế trận đàm phán Chủ/Khách, phong thủy thực địa).
  - Tích hợp trình trích xuất thông minh `extractFollowUpSuggestions` và giao diện **Interactive Follow-Up Chips** (`/src/components/AIChatbotModal.tsx`) cho phép người dùng click 1 chạm để hỏi ngay.
- **Cập Nhật Bộ Câu Hỏi Mẫu Nhanh (Quick Prompts)**:
  - Tối ưu hóa các câu hỏi nhanh thành các câu lệnh chiêm đoán súc tích, gắn liền với các tình huống thực tiễn đời sống.
- **Đồng Bộ Tài Liệu & Thuyết Minh Thuật Toán**:
  - Cập nhật **Mục 19** trong `AlgorithmGuideModal.tsx` giải trình đầy đủ nguyên lý phản hồi trực diện và khám phá chuyên môn sâu.

---

## [[2.23.0]] - 2026-08-30
### Codename: *Trải Nghiệm Khởi Động & Tour Hướng Dẫn Đọc Bàn Kỳ Môn Toàn Diện (Interactive Onboarding Tour)*

#### ✨ Tính Năng Mới & Trải Nghiệm Khởi Động (Added & Improved)
- **Tour Hướng Dẫn Trải Nghiệm Nhanh 7 Bước Tương Tác (`/src/components/OnboardingTourModal.tsx`)**:
  - Tự động kích hoạt khi người dùng lần đầu truy cập ứng dụng (lưu trạng thái vào `localStorage` qua khóa `kymon_has_completed_onboarding_tour_v2`).
  - **Bước 1: Chào Mừng & Hợp Nhất Vũ Trụ 4 Chiều**: Tổng quan sự kết hợp giữa Thiên văn hiện đại (VSOP87, ELP2000) và Cổ Tam Thức (Kỳ Môn, Lục Nhâm, Thái Ất).
  - **Bước 2: Thanh Thông Tin Thời Gian Thực**: Giải thích Tứ Trụ, Tiết Khí, Cục Số, chế độ Live và bộ chọn thời điểm chiêm quẻ tùy chỉnh (Time Picker).
  - **Bước 3: Sơ Đồ Giải Phẫu Cung Kỳ Môn 9 Cung**: Hướng dẫn chi tiết cách đọc 4 tầng năng lượng (Bát Thần, Cửu Tinh, Bát Môn, Thiên/Địa Can), Tuần Không và Mã Tinh.
  - **Bước 4: Nguyên Lý Chủ - Khách & Cung Trực Phù - Trực Sử**: Hướng dẫn định hình chiến lược đàm phán, hành động (làm Khách chủ động đi trước vs làm Chủ tĩnh phòng thủ).
  - **Bước 5: Dự Trắc Chuyên Sâu 6 Chủ Đề**: Giới thiệu phân tích Thân Mệnh, Tài Vận, Tình Duyên, Công Danh, Sức Khỏe, Đàm Phán.
  - **Bước 6: Đại Lục Nhâm Tam Thức & Bảng 24 Tiết Khí**: Giải thích Nguyệt Tướng, Tam Truyền - Tứ Khóa và bảng tra cứu thiên văn toàn niên.
  - **Bước 7: Trợ Lý AI Luận Giải Cổ Thuật Toàn Năng**: Chỉ dẫn sử dụng chatbot AI kết nối OpenRouter giải đoán theo ngữ cảnh thực.
- **Tương Tác Linh Hoạt & Đa Nền Tảng**:
  - Hỗ trợ phím mũi tên Trái / Phải để chuyển bước, phím ESC để thoát, thanh tiến trình hiển thị tỷ lệ hoàn thành.
  - Bổ sung nút **"Tour Hướng Dẫn"** trên thanh Header (desktop & mobile) và chân trang (Footer) giúp người dùng mở lại tour bất cứ lúc nào.
- **Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Bổ sung **Mục 20: Quy Trình Trải Nghiệm Nhanh & Đọc Bàn Kỳ Môn (Onboarding Tour)** đồng bộ thuyết minh toàn cảnh.

---

## [[2.22.1]] - 2026-08-30
### Codename: *Tối Ưu Giao Diện & Vị Trí Cung Cấp OpenRouter API Key Trực Quan Cho AI Chatbot*

#### ✨ Trải Nghiệm Người Dùng & Quản Lý API Key (Added & Improved)
- **Thẻ Thiết Lập OpenRouter API Key Nổi Bật Trực Quan (`/src/components/AIChatbotModal.tsx`)**:
  - Đặt thẻ cấu hình OpenRouter API Key ở vị trí dễ nhận biết nhất ngay đầu giao diện Chatbot, hiển thị rõ ràng trước khi người dùng bắt đầu cuộc trò chuyện.
  - Tích hợp thẻ hướng dẫn 3 bước dễ hiểu cùng nút liên kết trực tiếp mở trang [OpenRouter.ai/keys](https://openrouter.ai/keys) để lấy API Key miễn phí sau 30 giây.
  - Cung cấp nút chuyển đổi ẩn/hiện mã khóa (Eye/EyeOff), nút "Lưu & Kích Hoạt", nút "Xóa Key" và thông báo lưu thành công trực quan.
- **Huy Hiệu Trạng Thái API Key Trên Thanh Tiêu Đề (Top Bar)**:
  - Hiển thị nút trạng thái API Key rõ ràng (`[🔑 Cần Nhập API Key]` kèm hiệu ứng viền sáng nhấp nháy khi chưa có key; `[🔑 API Key: Đã lưu]` khi đã cấu hình).
- **Cơ Chế Nhắc Nhở & Focus Tự Động (Auto-Focus & Prompt Guard)**:
  - Khi người dùng bấm vào các câu hỏi gợi ý nhanh hoặc gửi tin nhắn mà chưa cấu hình key, hệ thống tự động mở thẻ thiết lập API Key và focus con trỏ vào ô nhập key kèm nhắc nhở lịch sự.
- **Đảm Bảo An Toàn Tuyệt Đối**:
  - Khóa API được lưu trữ cục bộ 100% trong `localStorage` trên trình duyệt người dùng, hoàn toàn không bị đẩy lên kho mã nguồn Git hay lưu lại ở máy chủ.

---

## [[2.22.0]] - 2026-08-30
### Codename: *Tích Hợp Trợ Lý AI Luận Giải Cổ Thuật Toàn Năng (OpenRouter Multi-Model Metaphysics Advisor)*

#### ✨ Tính Năng Mới & Tích Hợp AI (Added & Improved)
- **Trợ Lý AI Luận Giải Cổ Thuật Toàn Diện (`/src/components/AIChatbotModal.tsx` & `/src/components/AIChatbotFloatingButton.tsx`)**:
  - Tích hợp cửa sổ chat chuyên sâu với khả năng tương tác trực tiếp với các mô hình AI tiên tiến (Gemini 2.5 Flash, DeepSeek V3 / R1, Claude 3.5 Sonnet, GPT-4o Mini) qua OpenRouter API.
  - Tự động nạp ngữ cảnh thời gian thực của quẻ: Bát Tự 4 Trụ, 24 Tiết Khí Mặt Trời, Điểm Sóc Âm Lịch, Bàn Kỳ Môn Độn Giáp 9 Cung và Bàn Đại Lục Nhâm Tam Truyền vào System Prompt.
  - Cung cấp nút bấm nổi (Floating Action Button) và nút hành động trên Header để mở AI Chat từ bất kỳ màn hình nào.
  - Tích hợp bảng câu hỏi gợi ý nhanh (Quick Prompts) cho 6 chủ đề: Thân Mệnh, Tài Vận, Hôn Nhân, Sức Khỏe, Công Danh, Kỳ Môn & Lục Nhâm.
- **Backend Proxy An Toàn (`/server.ts` - `/api/chat`)**:
  - Thiết lập endpoint proxy bảo mật kết nối tới OpenRouter, hỗ trợ cả khóa API mặc định và khóa API cá nhân của người dùng.
- **Tài Liệu & Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Bổ sung **Mục 19: Trợ Lý AI Luận Giải Cổ Thuật & Khung Tích Hợp OpenRouter** giải thích chi tiết quy trình 5 bước luận giải cổ thức kết hợp AI.

---

## [[2.21.0]] - 2026-08-29
### Codename: *Phục Hồi Điều Hướng Bàn Kỳ Môn & Đại Lục Nhâm Từ Cẩm Nang Tri Thức*

#### ✨ Phục Hồi & Tối Ưu Hóa Liên Kết Điều Hướng (Added & Improved)
- **Giữ Lại Trọn Vẹn Quẻ Kỳ Môn & Lục Nhâm**:
  - Bảo tồn 100% component và tính năng tính toán chi tiết của **Bàn Kỳ Môn Độn Giáp 9 Cung (3x3)** (`KyMonCompleteBoard.tsx`) và **Bàn Đại Lục Nhâm Tam Truyền** (`LucNhamPanel.tsx`).
- **Liên Kết Điều Hướng Trực Tiếp Từ Cẩm Nang Tri Thức (`CosmicKnowledgeGuide.tsx`)**:
  - Bổ sung các nút truy cập nhanh (Quick Action Buttons) ở đầu trang Cẩm Nang: Bàn Kỳ Môn 9 Cung, Bàn Đại Lục Nhâm, Điểm Sóc & Âm Lịch, Dự Trắc Chuyên Sâu, 24 Tiết Khí.
  - Bổ sung thẻ điều hướng chuyên biệt trong Mục 6 (Cấu Trúc Tam Bàn Kỳ Môn) và Mục 7 (Cổ Tam Thức Đại Lục Nhâm).
  - Cung cấp thanh điều hướng chân trang hai chiều, cho phép chuyển đổi tức thì giữa Cẩm Nang, Bàn Kỳ Môn, Bàn Lục Nhâm và Dự Trắc Chuyên Sâu.
- **Thanh Menu Chính Giữ Nguyên 4 Tab Trọng Tâm**:
  - Menu ứng dụng giữ vững cấu trúc tinh gọn 4 tab: *Cẩm Nang Tri Thức → Điểm Sóc & Âm Lịch → Dự Trắc Chuyên Sâu → 24 Tiết Khí Năm*.

---

## [[2.20.0]] - 2026-08-29
### Codename: *Tinh Gọn Menu 4 Tab Trọng Tâm & Dời Điểm Sóc Lên Vị Trí Thứ 2*

#### ✨ Tinh Giản Thanh Điều Hướng & Loại Bỏ Trùng Lặp (Added & Improved)
- **Cấu Trúc Menu 4 Tab Trọng Tâm**:
  - Thanh menu chính được tinh giản thành đúng 4 tab theo thứ tự:
    1. **📚 Cẩm Nang Tri Thức** (Trang Chủ)
    2. **🌙 Điểm Sóc & Âm Lịch** (Dời từ vị trí cuối cùng lên vị trí thứ 2)
    3. **🎯 Dự Trắc Chuyên Sâu** (Kỳ Môn 6 chủ đề đời sống)
    4. **📅 24 Tiết Khí Năm** (Toàn Niên)
- **Loại Bỏ Các Tab Dư Thừa & Trùng Lặp**:
  - Bỏ 2 tab *Kỳ Môn Độn Giáp* và *Đại Lục Nhâm* khỏi menu.
  - Bỏ 2 tab *Tổng Quan & Luận Cục* và *Bát Quái & 9 Cung* do toàn bộ nội dung học thuật và giải đoán đã có trong Cẩm Nang Tri Thức.
- **Đồng Bộ Hóa Toàn Diện Hệ Thống**:
  - Cập nhật toàn bộ các nút điều hướng chuyển tab trong `CosmicKnowledgeGuide.tsx`, `LunarNewMoonSection.tsx`, `YearTermsTable.tsx`, và `AlgorithmGuideModal.tsx` (Mục 18).

---

## [[2.19.0]] - 2026-08-29
### Codename: *Chuẩn Hóa Quy Chuẩn Thiên Văn Định Tháng & Tối Giản Nhóm Điểm Sóc*

#### ✨ Tính Năng Mới & Tinh Gọn Giao Diện (Added & Improved)
- **Chuẩn Hóa Thẻ Quy Chuẩn Thiên Văn Định Tháng & Xác Định Tháng Nhuận (`/src/components/LunarNewMoonSection.tsx`)**:
  - Cập nhật toàn bộ nội dung thuyết minh thiên văn theo 4 nguyên tắc chuẩn hóa: Mốc cứng Đông Chí (270°) = Tháng 11, Đếm số tháng 12/13 giữa 2 lần Đông Chí, Quy tắc Vô Trung Khí xác định tháng nhuận đầu tiên, và Lan tỏa số thứ tự tháng sang hai phía.
- **Lược Bỏ Các Thành Phần Dư Thừa & Trùng Lặp**:
  - Bỏ khối *Tiết Khí Trong Tháng Này* và *Hai Thẻ Điểm Sóc Trước/Sau* đơn lẻ ở cuối trang, vì toàn bộ ngày giờ điểm Sóc khởi đầu (Mùng 1), điểm Sóc kết thúc (Hết tháng) và danh sách Tiết Khí đã được hiển thị đầy đủ, chi tiết và trực quan trong **Bảng/Thẻ Danh Sách 12/13 Tháng Âm Lịch** ở phần trên.
- **Tối Ưu Trải Nghiệm Giao Diện**:
  - Bố cục nhóm Điểm Sóc & Âm Lịch trở nên gọn gàng, liền mạch, loại bỏ trùng lặp và tập trung vào các công cụ khảo sát chu kỳ lịch thiên văn.

---

## [[2.18.0]] - 2026-08-29
### Codename: *Dời Lịch Tra Cứu Nhanh Sang Nhóm Điểm Sóc & Âm Lịch*

#### ✨ Tính Năng Mới & Tái Cấu Trúc Giao Diện (Added & Improved)
- **Dời Lịch Tra Cứu Nhanh (MiniCalendar) Sang Nhóm Điểm Sóc & Âm Lịch (`/src/components/LunarNewMoonSection.tsx`)**:
  - Chuyển toàn bộ component Lịch Tra Cứu Nhanh sang đặt cạnh thẻ Điểm Sóc & Âm Lịch Thiên Văn trong bố cục lưới cân đối (7 cột banner Âm Lịch + 5 cột MiniCalendar).
  - Tương tác tức thì: Cho phép người dùng chuyển ngày/tháng/năm nhanh chóng, quan sát trực quan sự biến thiên của tuần trăng, 4 pha Mặt Trăng và toàn bộ chu kỳ 12/13 tháng âm lịch theo ngày được chọn.
- **Tối Ưu Giao Diện Tổng Quan Luận Cục (`/src/components/OverviewCard.tsx`)**:
  - Mở rộng thẻ Tiết Khí Đương Lệnh thành toàn chiều rộng (full width), trình bày thông thoáng, cân đối và tập trung mạch lạc vào các kết quả luận đoán cốt lõi.
- **Đồng Bộ Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Cập nhật Mục 5 thuyết minh về việc tích hợp Lịch Tra Cứu Nhanh trong nhóm Điểm Sóc.

---

## [[2.17.0]] - 2026-08-29
### Codename: *Chuẩn Hóa Thuật Toán Xác Định Tháng Nhuận & Chu Kỳ 13 Tháng Mốc Đông Chí*

#### ✨ Tính Năng Mới & Cải Tiến Thiên Văn (Added & Improved)
- **Chuẩn Hóa Thuật Toán Xác Định Tháng Nhuận & Chu Kỳ 13 Tháng (`/src/astronomy/lunarCalendar.ts`)**:
  - **Mốc Cứng Đông Chí = Tháng 11**: Tính chính xác thời điểm Đông Chí (Mặt Trời đạt kinh độ 270°) của năm trước và năm đang xét; tháng âm lịch (khoảng giữa 2 điểm Sóc liên tiếp) chứa thời khắc Đông Chí được **gán cứng cố định là Tháng 11 Âm Lịch**.
  - **Đếm Số Tháng Giữa 2 Đông Chí Liên Tiếp**: Xác định khoảng cách tháng giữa 2 lần Đông Chí (12 tháng = năm thường, 13 tháng = năm nhuận).
  - **Quy Tắc Vô Trung Khí**: Nếu có 13 tháng giữa 2 Đông Chí, thuật toán tự động tìm tháng đầu tiên **không chứa bất kỳ Trung Khí nào** để đánh dấu là **Tháng Nhuận** lặp lại số thứ tự của tháng liền trước.
  - **Lan Tỏa Số Thứ Tự Tháng**: Từ mốc Tháng 11, lan tỏa số thứ tự sang hai phía: tiến đến Tháng 12, Tháng Giêng, Tháng 2... và lùi về Tháng 10, Tháng 9...
  - **Xác Lập Trọn Vẹn Năm Âm Lịch**: Toàn bộ chu kỳ năm âm lịch Can Chi được tạo bởi các tháng từ Tháng 1 (Giêng) đến Tháng 12 (Chạp) (cộng thêm Tháng Nhuận nếu có), đảm bảo luôn có chính xác 12 hoặc 13 tháng.
- **Đồng Bộ Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Cập nhật chi tiết 5 bước của quy tắc Đông Chí Mốc 11 & Vô Trung Khí Pháp trong Mục 5.

---

## [[2.16.1]] - 2026-08-29
### Codename: *Tọa Độ Ngày Giờ Dương Lịch Toàn Bộ 12 & 13 Tháng Âm Lịch*

#### ✨ Tính Năng Mới (Added)
- **Tọa Độ Ngày Giờ Dương Lịch Chi Tiết Cho Từng Tháng Âm Lịch (`/src/components/LunarNewMoonSection.tsx`)**:
  - Hiển thị đầy đủ mốc thời gian Dương Lịch chính xác đến từng giờ, phút, giây (`HH:mm:ss`) và ngày/tháng/năm (`DD/MM/YYYY`) theo giờ Việt Nam (UTC+7).
  - Định vị rõ ràng mốc **Bắt đầu (Mùng 1 - Điểm Sóc khởi đầu)** và mốc **Kết thúc (Hết tháng - Điểm Sóc tiếp theo)** cho từng tháng trong danh sách 12 hoặc 13 tháng âm lịch.
- **Bộ Chuyển Đổi Giao Diện 2 Chế Độ (Card Grid vs Table View)**:
  - **Dạng Thẻ (Card Grid)**: Bố cục trực quan, hiển thị mốc thời gian dạng timeline, độ dài tháng (29 ngày thiếu/30 ngày đủ), huy hiệu phân loại Chính/Nhuận và danh sách Tiết Khí diễn ra trong tháng.
  - **Dạng Bảng (Detailed Table View)**: So sánh đối chiếu trực tiếp giữa các tháng với các cột Ngày giờ Dương lịch, Độ dài ngày, Tiết Khí và Chỉ dấu trạng thái "Đang diễn ra".
- **Nâng Cấp Thẻ Tháng Nhuận**:
  - Cung cấp chính xác giờ phút giây bắt đầu và kết thúc của tháng nhuận trong năm khảo sát.

---

## [[2.16.0]] - 2026-08-29
### Codename: *Chuyên Mục Tháng Nhuận & Chu Kỳ Năm Âm Lịch Thiên Văn*

#### ✨ Tính Năng Mới (Added)
- **Chuyên Mục Phân Tích Tháng Nhuận & Chu Kỳ Năm Âm Lịch (`/src/components/LunarNewMoonSection.tsx`)**:
  - Tích hợp thẻ chuyên biệt phân tích chi tiết tình trạng tháng nhuận trong năm âm lịch tra cứu.
  - Phân loại rõ ràng **Năm Nhuận (13 Tháng - 384 Ngày)** hoặc **Năm Thường (12 Tháng - 354 Ngày)**.
  - Hiển thị đầy đủ thông tin tháng nhuận (nếu có): Tên tháng (ví dụ: *Tháng 6 Nhuận*), khoảng thời gian Dương lịch (từ Mùng 1 đến ngày kết thúc), số ngày thực tế (29 hay 30 ngày).
  - Nhận định trạng thái thời gian thực: 🟢 *Hiện đang là tháng nhuận*, ⏳ *Tháng nhuận sắp tới trong năm*, hoặc ✓ *Tháng nhuận đã kết thúc trong năm*.
- **Bảng Danh Sách Trực Quan 12 Hoặc 13 Tháng Trong Năm**:
  - Hiển thị ma trận toàn bộ các tháng của năm âm lịch kèm số ngày (đủ/thiếu), ngày bắt đầu - kết thúc.
  - Đánh dấu nổi bật tháng hiện tại đang diễn ra (*glowing badge*) và tháng nhuận (*amber border badge*).
- **Thuật Toán Thiên Văn Vô Trung Khí Pháp (`/src/astronomy/lunarCalendar.ts`)**:
  - Tự động quét và khớp 12 Trung Khí với các điểm Sóc trong khoảng thời gian rộng 600 ngày quanh năm khảo sát.
  - Thuyết minh nguyên lý chu kỳ Meton 19 năm (19 năm dương lịch = 235 tuần trăng = 19 năm âm lịch + 7 tháng nhuận).
- **Đồng Bộ Thuyết Minh Thuật Toán (`/src/components/AlgorithmGuideModal.tsx`)**:
  - Bổ sung và mở rộng **Mục 5** về Thuật Toán Xác Định Tháng Nhuận Âm Lịch (Vô Trung Khí Pháp).

---

## [[2.15.0]] - 2026-08-29
### Codename: *Chế Độ Sáng/Tối Tương Thích Trình Duyệt & Tùy Chọn*

#### ✨ Tính Năng Mới (Added)
- **Hệ Thống Quản Lý Giao Diện `ThemeContext` (`/src/context/ThemeContext.tsx`)**:
  - Hỗ trợ 3 chế độ hiển thị linh hoạt: **Tự động theo hệ thống/trình duyệt (System)**, **Chế độ Sáng (Light Mode)**, và **Chế độ Tối (Dark Mode)**.
  - Lắng nghe biến động của thuộc tính `prefers-color-scheme` từ hệ điều hành / trình duyệt theo thời gian thực để chuyển đổi mượt mà.
  - Lưu trữ trạng thái tùy chọn bền vững vào `localStorage` (`kymon_theme_mode_v2`), giữ nguyên giao diện yêu thích qua các phiên làm việc.
- **Thành Phần Điều Khiển `ThemeSwitcher` (`/src/components/ThemeSwitcher.tsx`)**:
  - Thiết kế menu dropdown hiện đại hiển thị trực tiếp trên thanh Header (cả phiên bản Desktop và Di Động).
  - Biểu tượng trực quan: 💻 Màn hình máy tính (Tự động), ☀️ Mặt trời (Chế độ Sáng), 🌙 Mặt trăng (Chế độ Tối).
- **Tối Ưu Hóa Trực Quan Toàn Bộ Ứng Dụng Trong Chế Độ Sáng (`/src/index.css`)**:
  - Tinh chỉnh độ tương phản chuẩn WCAG AA cho văn bản, đường viền, thẻ quẻ, bảng tiết khí và hộp thoại.
- **Đồng Bộ Thuyết Minh Thuật Toán (`AlgorithmGuideModal.tsx`)**:
  - Bổ sung **Mục 17** thuyết minh chi tiết về cơ chế Theme Mode & System Sync.

---

## [[2.14.0]] - 2026-08-29
### Codename: *Từ Điển Thuật Ngữ Thuật Số & Tra Cứu Kỳ Môn - Lục Nhâm*

#### ✨ Tính Năng Mới (Added)
- **Thành Phần Tra Cứu Thuật Ngữ `GlossarySection` (`/src/components/GlossarySection.tsx`)**:
  - Tích hợp từ điển thuật ngữ chuyên sâu bao quát cả 3 môn thuật số: **Kỳ Môn Độn Giáp**, **Đại Lục Nhâm**, và **Thiên Văn & Lạc Thư**.
  - Giải nghĩa cô đọng, dễ hiểu cho người mới; nêu rõ ứng dụng trong chiêm đoán quẻ và các lưu ý then chốt.
  - Hỗ trợ tìm kiếm tức thì theo tên thuật ngữ, chữ Hán, định nghĩa, thẻ hashtag hoặc nội dung ứng dụng.
  - Phân loại danh mục tab trực quan: Tất Cả, Kỳ Môn Độn Giáp, Đại Lục Nhâm, Thiên Văn & Lạc Thư kèm bộ đếm số lượng thuật ngữ thời gian thực.
- **Tích Hợp Vào Trang Chủ `CosmicKnowledgeGuide`**:
  - Thêm tab bộ lọc `[ 📖 Tra Cứu Thuật Ngữ ]` trên thanh phân loại.
  - Bổ sung nút truy cập nhanh trên Hero banner của Trang Chủ để người dùng tra cứu nhanh chóng.
- **Đồng Bộ Thuyết Minh Thuật Toán (`AlgorithmGuideModal.tsx`)**:
  - Bổ sung **Mục 16** thuyết minh chi tiết về kiến trúc Từ Điển Thuật Ngữ.

---

## [[2.13.0]] - 2026-08-29
### Codename: *Trang Chủ Cẩm Nang Tri Thức & Toàn Thư Đại Lục Nhâm*

#### ✨ Tính Năng Mới (Added)
- **Cẩm Nang Tri Thức Làm Trang Chủ Mặc Định**:
  - Khi mở ứng dụng, giao diện lập tức hiển thị Cẩm Nang Tri Thức Toàn Cảnh, trang bị hệ thống tri thức cơ bản và chuyên sâu cho người dùng trước khi thao tác chiêm quẻ.
- **Bổ Sung Toàn Thư Tri Thức Đại Lục Nhâm (`CosmicKnowledgeGuide.tsx`)**:
  - Thập Nhị Nguyệt Tướng (Thái Dương) theo 24 Tiết Khí và quy tắc khởi Thiên Bàn.
  - Bí kíp an Tứ Khoa (Can Thượng Thần, Can Âm, Chi Thượng Thần, Chi Âm) và quy luật Chủ - Khách.
  - Cửu Tông Môn Tuyệt Kỹ: 9 phép phát khởi Tam Truyền (Sơ - Trung - Mạt Truyền).
  - Thập Nhị Thần Tướng: Phép an Đán Quý Nhân / Dạ Quý Nhân và quy luật Thuận / Nghịch hành.
  - Hướng dẫn luận đoán 6 chuyên đề đời sống: Cầu Tài, Tình Duyên, Công Danh, Bệnh Tật, Tranh Chấp, Xuất Hành.
- **Cập Nhật Bộ Nhận Diện Logo & Favicon**:
  - Logo Thiên Văn hợp nhất mới hiển thị trên Header, Favicon trình duyệt và Thẻ Open Graph chia sẻ mạng xã hội.

#### ⚡ Cải Tiến (Improved)
- **Điều Hướng Linh Hoạt**:
  - Tích hợp các nút điều hướng nhanh trực tiếp trên Banner Trang Chủ dẫn vào Bàn Kỳ Môn 9 Cung và Bàn Đại Lục Nhâm.
  - Bổ sung Mục 15 trong Thuyết Minh Thuật Toán (`AlgorithmGuideModal.tsx`).

---

## [[2.12.0]] - 2026-08-28
### Codename: *Tái Cấu Trúc UX/UI Ma Trận Lạc Thư & Click-to-Modal*

#### ✨ Tính Năng Mới (Added)
- **Cơ Chế Click-to-Modal / Drawer Toàn Diện (`PalaceDetailModal.tsx`)**:
  - Nhấp vào bất kỳ ô Cung nào trong ma trận 9 cung để mở cửa sổ Modal / Drawer chi tiết mà không làm biến dạng hay co kéo layout trang chính.
  - Hiển thị đầy đủ 4 tầng bàn (Thần, Tinh, Môn, Nghi), Thập Can Khắc Ứng, Môn Cung Sinh Khắc, Cách Cục Cát Hung, Thần Sát và Khuyến Nghị Ứng Dụng.
  - Hỗ trợ chuyển đổi qua lại giữa 9 cung ngay bên trong Modal, đóng bằng phím ESC hoặc nhấp ra ngoài.
- **Dải Thông Tin Thiên Văn Hợp Nhất (Cosmic Header Strip)**:
  - Tích hợp đồng hồ thời gian thực (Live clock), Lịch Âm Dương, Can Chi Tứ Trụ (Năm, Tháng, Ngày, Giờ) và Tiết Khí ngay trên thanh Header trên cùng.
- **Thanh Tab Switcher Trực Tiếp Trên Bàn Cờ**:
  - Đặt 2 nút chuyển đổi `[ 🔮 Kỳ Môn Độn Giáp ]` và `[ 🧭 Đại Lục Nhâm ]` ngay tại khu vực làm việc chính để so sánh trực quan hai môn Tam Thức.

#### ⚡ Cải Tiến (Improved)
- **Tái Cấu Trúc Bàn Cờ 9 Cung Lưới Grid 3x3 (`KyMonCompleteBoard.tsx`)**:
  - Bố cục Ma trận Lạc Thư chuẩn xác: Hàng 1 (Tốn 4 - Ly 9 - Khôn 2), Hàng 2 (Chấn 3 - Trung 5 - Đoài 7), Hàng 3 (Cấn 8 - Khảm 1 - Càn 6).
  - Tối giản các ô thẻ hiển thị súc tích, giữ nguyên 100% dữ liệu nguồn và logic an quẻ thiên văn.
- **Gom Nhóm Hệ Thống Menu Điều Hướng**:
  - Phân loại rõ ràng 4 cụm: *Bàn Quẻ Tam Thức*, *Dự Trắc & Phân Tích*, *Lịch & Tiết Khí*, *Tri Thức*.
- **Đồng Bộ Tài Liệu**: Bổ sung Mục 14 vào `AlgorithmGuideModal.tsx`.

---

## [[2.11.0]] - 2026-08-28
### Codename: *Bí Tàng Đại Lục Nhâm Độn Giáp Toàn Thư*

#### ✨ Tính Năng Mới (Added)
- **Chuyên Mục Độc Lập Đại Lục Nhâm (`LucNhamPanel.tsx`)**:
  - Bổ sung Tab chuyên biệt **Đại Lục Nhâm** trên thanh điều hướng chính, song hành cùng Kỳ Môn Độn Giáp để hợp nhất Cổ Tam Thức.
  - **Khởi Nguyệt Tướng Chuẩn Xác**: Tính toán Nguyệt Tướng theo 24 Tiết khí dựa trên Kinh độ Mặt Trời (Solar Longitude) thiên văn.
  - **Lập Địa Bàn & Thiên Bàn**: Tự động xoay chuyển 12 Cung Thiên bàn đè lên Địa bàn theo Chi của giờ chiêm quẻ.
  - **An Tứ Khoa (Bốn Khoa)**: Can Thượng Thần (Khoa 1), Can Âm (Khoa 2), Chi Thượng Thần (Khoa 3), Chi Âm (Khoa 4) phân rõ chủ thể (ta) và khách thể (người/hoàn cảnh/nhà cửa).
  - **Khởi Tam Truyền Chuẩn Cửu Tông Môn**: Tự động nhận diện và phát khởi Sơ Truyền, Trung Truyền, Mạt Truyền theo các khóa: *Nguyên Thủ*, *Trùng Thẩm*, *Tỷ Dụng*, *Thiệp Hại*, *Dao Khắc*, *Mão Tinh*, *Biệt Trạch / Bát Chuyên*, *Phục Ngâm & Phản Ngâm*.
  - **Thập Nhị Thần Tướng**: An 12 Thần Tướng (*Quý Nhân, Đằng Xà, Chu Tước, Lục Hợp, Câu Trận, Thanh Long, Thiên Không, Bạch Hổ, Thái Thường, Huyền Vũ, Thái Âm, Thiên Hậu*) theo quy tắc *Đán Quý / Dạ Quý* và chiều *Thuận / Nghịch hành*.
  - **Dự Trắc 6 Chuyên Đề Đời Sống**: Cầu Tài & Giao Thương, Tình Duyên & Hôn Nhân, Công Danh & Sự Nghiệp, Sức Khỏe & Tật Bệnh, Tranh Chấp & Pháp Lý, Xuất Hành & Cầu Vận.
- **Engine Tính Toán Lục Nhâm (`lucNham.ts`)**:
  - Xây dựng thuật toán toàn diện xử lý sinh khắc, Lục Thân, Thần Sát (Lộc Thần, Dịch Mã, Dương Nhận, Thái Tuế), Tuần Không và chấm điểm cát hung 5 sao.
- **Thuyết Minh Cổ Bản Mục 13 (`AlgorithmGuideModal.tsx`)**:
  - Hệ thống hóa trọn vẹn 6 bước lập quẻ theo kỳ thư *Bí Tàng Đại Lục Nhâm Độn Đại Toàn*.

---

## [[2.10.0]] - 2026-08-28
### Codename: *Đánh Giá Thời Không 5 Sao & Ma Trận Cát Hung*

#### ✨ Tính Năng Mới (Added)
- **Công Cụ Đánh Giá Cát / Hung Thời Khắc Thang Điểm 5 Sao (`TimeEvaluationCard.tsx`)**:
  - Đánh giá tổng hòa độ tốt/xấu của một mốc thời gian cụ thể (cát/hung) quy đổi ra thang điểm $1.0 - 5.0$ sao kèm phân cấp: *Đại Cát*, *Tiểu Cát*, *Bình Hòa*, *Tiểu Hung*, *Đại Hung*.
  - Phối hợp 4 Cột Trụ cốt lõi: **Thập Can Khắc Ứng** (Thiên/Địa bàn 20%), **Môn Cung Sinh Khắc** (Nhân/Địa bàn 20%), **Cung Trực Phù & Trực Sử** (30%), **Cửu Tinh & Bát Thần** (Thiên Thời & Thần Trợ 30%).
  - Bảng xếp hạng số sao chi tiết cho toàn bộ 8 phương vị không gian (9 Cung Lạc Thư) giúp lựa chọn hướng xuất hành, khai trương, đàm phán và phòng ngừa sát khí.
  - Khuyến nghị hành động thực tiễn (Việc nên làm, việc kiêng kỵ, chiến lược Chủ - Khách) cho từng thời khắc.
- **Module Tính Toán Đánh Giá Năng Lượng (`kymonEvaluation.ts`)**:
  - Chuẩn hóa công thức chấm điểm 0 - 100 điểm, tính điểm thưởng cho Cát cách (9 Độn, Tam Trá, Ngũ Giả, Thăng Điện, Lộc Vị, Quý Nhân) và điểm phạt cho Hung cách (Kích Hình, Nhập Mộ, Môn Bách, Tuần Không).

#### ⚡ Cải Tiến (Improved)
- **Tích Hợp Đồng Bộ Đa Màn Hình**: Hiển thị thẻ đánh giá 5 sao tức thì trên cả trang *Tổng Quan & Luận Cục* và *Bàn Kỳ Môn 9 Cung Hoàn Chỉnh*.
- **Đồng Bộ Thuyết Minh Thuật Toán**: Bổ sung Mục 12 vào `AlgorithmGuideModal.tsx` thuyết minh chi tiết nguyên lý tính điểm 5 sao.

---

## [[2.9.0]] - 2026-08-28
### Codename: *Cẩm Nang Tri Thức Toàn Cảnh & Hợp Nhất Thời Không*

#### ✨ Tính Năng Mới (Added)
- **Tab Chuyên Biệt "Cẩm Nang Tri Thức" (`CosmicKnowledgeGuide.tsx`)**:
  - Đặt ở vị trí ưu tiên đầu tiên trên thanh điều hướng (ngang hàng và đứng ngay trước "Tổng Quan & Luận Cục").
  - Hệ thống hóa toàn cảnh Mô Hình Hệ Tọa Độ Vũ Trụ 4 Chiều (Thiên Vận - Địa Thế - Nhân Sự - Thời Không).
  - Trình bày chi tiết 8 hướng Bát Trạch, Cửu Tinh Lạc Thư (tổng ma phương 15), Thiên văn 24 Tiết Khí (12 Tiết Lệnh & 12 Trung Khí), Điểm Sóc Âm Lịch (0° New Moon) và Kỳ Môn Độn Giáp 4 tầng.
  - Tích hợp công cụ tìm kiếm chủ đề trực quan, bộ lọc chuyên đề nhanh và danh mục hướng dẫn ứng dụng thực tiễn trong đời sống (dưỡng sinh, xuất hành, phong thủy, đàm phán, dự trắc).

#### ⚡ Cải Tiến (Improved)
- **Điều Hướng Liền Mạch**: Tích hợp các nút thao tác nhanh (Quick Action Buttons) giúp người dùng chuyển đổi tức thì giữa các mục cẩm nang và các bảng tính toán chuyên sâu (Bàn Kỳ Môn 9 Cung, Dự Trắc 8 Phương Diện, La Bàn Bát Quái, Bảng Tiết Khí, Lịch Điểm Sóc).
- **Đồng Bộ Thuyết Minh**: Cập nhật đồng bộ tài liệu `AlgorithmGuideModal.tsx` và ghi chú phiên bản hệ thống.

---

## [[2.8.0]] - 2026-08-27
### Codename: *Tối Giản Độc Lập & Thuần Bản Kỳ Môn Cổ Thư*

#### 🗑️ Gỡ Bỏ (Removed)
- **Loại bỏ cấu hình API Key và tính năng Luận giải AI**: Gỡ bỏ hoàn toàn Modal cấu hình API Key cá nhân, các nút điều hướng và tab luận giải AI Gemini nhằm tối giản ứng dụng, loại bỏ phụ thuộc mạng bên ngoài.
- **Dọn dẹp mã nguồn backend & client**: Xóa bỏ các endpoint trung gian `/api/gemini/kymon-interpret` và các module hỗ trợ AI không còn sử dụng.

#### ⚡ Cải Tiến (Improved)
- **Tối ưu hóa độc lập 100%**: Ứng dụng chạy hoàn toàn độc lập, nhanh chóng và mượt mà dựa trên 100% thuật toán Thiên văn học chính xác và hệ thống Dự trắc Cổ thư nguyên bản.
- **Thuyết minh thuật toán chuẩn hóa 7 mục**: Cập nhật đồng bộ `AlgorithmGuideModal.tsx` tập trung sâu vào 7 trụ cột thuật toán cốt lõi.

---

## [[2.7.2]] - 2026-08-27
### Codename: *Chuẩn Hóa Danh Sách Mô Hình Gemini & Làm Sạch Thông Báo Lỗi*

#### 🐛 Sửa Lỗi (Fixed)
- **Khắc phục lỗi 404 NOT_FOUND (`models/gemini-1.5-flash is not found`)**: Loại bỏ hoàn toàn mã mô hình cũ không còn được hỗ trợ bởi Google Gen AI API v1beta khỏi danh sách gọi chính thức và dự phòng.
- **Chuẩn hóa danh sách mô hình thế hệ mới**: Cập nhật sang các mô hình được hỗ trợ tối ưu: `gemini-3.7-flash`, `gemini-2.5-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite`.

#### ⚡ Cải Tiến (Improved)
- **Làm sạch thông báo lỗi (Error Unwrapping & Localization)**: Tích hợp hàm giải mã `formatClientErrorMessage` / `extractCleanErrorMessage` tự động bóc tách các chuỗi JSON lồng nhau từ API trả về, chuyển đổi sang thông điệp tiếng Việt rõ ràng, thân thiện cho người dùng.

---

## [[2.7.1]] - 2026-08-27
### Codename: *Luận Giải AI Kỳ Môn & Quản Lý API Key Cá Nhân*

#### ✨ Tính Năng Mới (Added)
- **Cấu Hình API Key Cá Nhân Linh Hoạt (`GeminiApiKeyModal.tsx`)**:
  - Tích hợp nút **"Cấu hình API Key"** ngay trên thanh tác vụ AI Advisor và trong hộp cảnh báo khi gặp sự cố kết nối.
  - Cho phép người dùng nhập khóa cá nhân từ Google AI Studio (miễn phí), hỗ trợ ẩn/hiện mật mã và tự động lưu bền vững vào `localStorage` (`kymon_gemini_api_key`).
  - Tích hợp nút **"Kiểm Tra Kết Nối"** kiểm thử trực tiếp kết nối với API Gemini trước khi lưu khóa.
- **Cơ Chế Kép Dual-Engine Fallback (`geminiAdvisorEngine.ts`)**:
  - Khi hệ thống backend chưa cấu hình sẵn API key hoặc gặp mã trạng thái 404, ứng dụng sẽ tự động chuyển sang luồng gọi trực tiếp client-side SDK `@google/genai` bằng API Key đã lưu trong trình duyệt.
  - Đảm bảo tính sẵn sàng 100% cho chức năng luận giải quẻ mà không làm gián đoạn trải nghiệm người dùng.

#### ⚡ Cải Tiến & Tinh Chỉnh (Improved)
- Tối ưu chuỗi fallback đa mô hình (`gemini-2.5-flash`, `gemini-3.7-flash`, `gemini-1.5-flash`) trên cả hai tầng máy chủ và trình duyệt.
- Thêm huy hiệu nhận diện trạng thái **"Đã nạp Key cá nhân"** để người dùng an tâm về nguồn tài nguyên AI đang sử dụng.

---

## [[2.7.0]] - 2026-08-27
### Codename: *Luận Giải AI Kỳ Môn Độn Giáp với Gemini API*

#### ✨ Tính Năng Mới (Added)
- **Tích Hợp Luận Giải AI Gemini Miễn Phí Của Hệ Thống (`GeminiKyMonAiAdvisor.tsx`)**:
  - Tích hợp mô hình AI **Gemini 3.7 Flash** thế hệ mới nhất, trích xuất toàn bộ cấu trúc bàn Kỳ Môn 9 Cung để tự động chiêm đoán và luận giải chuyên sâu.
  - Cung cấp **8 Chuyên Đề Luận Giải Sẵn**:
    1. **Tổng Luận Quẻ Đại Cục**: Cát hung thời vận, Thiên - Nhân - Địa - Thần đắc thất.
    2. **Sự Nghiệp & Công Danh**: Khai Môn, Trực Phù, Đinh/Bính Kỳ, thi cử, cơ hội thăng quan tiến chức.
    3. **Tài Vận & Đầu Tư Kinh Doanh**: Sinh Môn, Giáp Tý Mậu, vốn liếng, lợi tức thương mại.
    4. **Hôn Nhân & Tình Duyên**: Ất (Vợ), Canh (Chồng), Lục Hợp, gia đạo hòa hợp.
    5. **Sức Khỏe & Trị Bệnh**: Thiên Nhuế bệnh phù, Sinh/Tử Môn, Thiên Tâm thầy thuốc, Kỳ Ất linh dược.
    6. **Chiến Lược Chủ - Khách & Thế Trận**: Phân định nên xuất kích làm Khách hay án binh bất động làm Chủ.
    7. **Xuất Hành & Phương Vị Cát Lợi**: Tìm phương vị quý nhân, Tam Kỳ Đắc Sứ và cửa cát lành.
    8. **Thân Mệnh Lục Thân**: Chiêm đoán bản thân (Nhật Can), gia quyến (Lục Thân) và phúc đức.
  - **Khung Đặt Câu Hỏi Chiêm Đoán Tùy Biến (Custom Question Box)**: Cho phép người dùng nhập bất kỳ câu hỏi thực tế nào, đi kèm danh sách câu hỏi gợi ý nhanh tiện dụng.
  - **Phản Hồi Thời Gian Thực (Real-time SSE Streaming)**: Kết nối Server-Sent Events giúp hiển thị bài luận giải tức thì từng chữ, không bị gián đoạn.
  - **Tiện Ích Đi Kèm**: Hỗ trợ nút sao chép kết quả (Copy Markdown), tái sinh câu trả lời (Regenerate), và nút bấm đối chiếu quay lại Bàn 9 Cung.

#### ⚙️ Cấu Trúc Backend & Bảo Mật (Backend Architecture)
- **Dịch Vụ AI Chuyên Biệt (`server/geminiService.ts`)**:
  - Xây dựng module gọi `@google/genai` SDK an toàn ở tầng máy chủ, bảo vệ API Key khỏi trình duyệt (Client).
  - Tích hợp System Instruction chuyên sâu dựa trên nguyên bản *Kỳ Môn Độn Giáp Bí Kíp Toàn Thư* và *Ngự Định Kỳ Môn Bảo Giám*.
- **Endpoint `/api/gemini/kymon-interpret`**:
  - Hỗ trợ cả 2 chế độ: Luồng sự kiện SSE (`stream=true`) cho giao diện tương tác và chuẩn JSON cho các yêu cầu đồng bộ.

#### ⚡ Cải Tiến & Đồng Bộ Hệ Thống (System Synchronization)
- **Tab Điều Hướng Mới**: Thêm Tab **"Luận Giải AI Gemini"** trên thanh Header với huy hiệu ánh sáng đặc biệt.
- **Liên Kết Nhanh Xuyên Suốt**: Bổ sung nút bấm trực tiếp dẫn tới AI Advisor từ Bàn Kỳ Môn Hoàn Chỉnh, Bảng Dự Trắc Việc Đời và Bảng Tổng Quan.
- **Thuyết Minh Thuật Toán (`AlgorithmGuideModal.tsx`)**: Bổ sung Mục 8 trình bày nguyên lý trích xuất Dụng Thần và cơ chế xử lý của Gemini AI.

---

## [[2.6.0]] - 2026-08-27
### Codename: *Lịch Tháng Tương Tác & Tinh Gọn Điều Khiển*

#### ✨ Tính Năng Mới (Added)
- **Lịch Tháng Tương Tác Thường Trực (Interactive Mini Calendar)**:
  - Bổ sung thành phần lịch tháng (`MiniCalendar.tsx`) thường trực ngay trên **Tab Tổng Quát (Overview)**.
  - Cho phép người dùng chuyển nhanh ngày khảo sát chỉ với một cú nhấp chuột trực tiếp vào từng ô ngày trên lịch.
  - Tự động đánh dấu và làm nổi bật **Ngày Đang Khảo Sát (Active Selected Date)** bằng viền sáng hổ phách (amber highlight) và trạng thái hiển thị giờ.
  - Hiển thị chấm nhận diện **Ngày Hôm Nay (Current Today)** theo thời gian thực.
  - Hỗ trợ đầy đủ các phím điều hướng: **-1 Ngày**, **+1 Ngày**, nút quay về **"Hôm nay"**, bộ chọn tháng nhanh và ô nhập năm tùy biến (1000 - 3000).
- **Bố Cục Lưới Đồng Bộ (Responsive Grid Integration)**:
  - Đặt Lịch Tháng tương tác song hành cùng Thẻ Tiết Khí Đương Lệnh trong hệ thống lưới 12 cột (`lg:grid-cols-12`), tạo nên khu vực điều phối trung tâm tiện lợi.

#### ⚡ Cải Tiến & Tối Ưu (Improved)
- **Tinh Gọn Thanh Điều Khiển Thời Gian (Streamlined Control Bar)**:
  - Lược bỏ hoàn toàn chức năng nhập nhanh chuỗi ký tự CLI và thanh preset mốc cố định cũ theo yêu cầu người dùng, giúp giao diện thông thoáng, gọn gàng và hiện đại.
  - Giữ lại bộ chọn chuẩn `datetime-local` chi tiết đến từng giây và nút bật/tắt **Thời Gian Thực (Live)** có hiệu ứng xoay mượt mà.
- **Tối Ưu Đồng Bộ Dữ Liệu**:
  - Khi nhấp chuyển ngày trên lịch tháng, hệ thống tự động giữ nguyên mốc giờ/phút/giây đã chọn (theo múi giờ Việt Nam UTC+7) để tái lập bàn Kỳ Môn tức thì.

---

## [[2.5.0]] - 2026-08-26
### Codename: *Toàn Thư Dự Trắc Bàn Kỳ Môn & Chiêm Đoán Việc Đời*

#### ✨ Tính Năng Mới (Added)
- **Khu Vực Dự Trắc Dẫn Đường Trên Bàn Kỳ Môn**:
  - Bố trí khối giao diện chuyên biệt ngay phía dưới bản đồ Cửu Cung trên **Bàn Kỳ Môn Hoàn Chỉnh**.
  - Tóm lược nhanh các phương diện dự trắc của quẻ được lập kèm nút bấm **"Xem Trang Dự Trắc Chi Tiết →"**.
- **Trang Chuyên Biệt "Dự Trắc Kỳ Môn" Toàn Diện**:
  - Tích hợp 8 tab chuyên đề chiêm đoán bám sát nguyên bản **Kỳ Môn Độn Giáp Bí Kíp Toàn Thư**:
    1. **Quy Luật Tam Bàn & Phân Định Chủ - Khách**: Phân định Thiên bàn (Sao), Nhân bàn (Cửa), Địa bàn (Cung); đánh giá sự tổn - ích của Chủ và Khách khi khởi sự hoặc giao dịch.
    2. **Dự Trắc Thân Mệnh (Nhân Sinh Quý Tiện)**: Hệ thống Lục Thân (Niên can Cha Mẹ, Nguyệt can Anh Em, Nhật can Bản Thân, Thời can Con Nhỏ, Thê thiếp Ất - Đinh, Chồng Canh), luận vinh khô sang hèn, Sinh Môn tổ nghiệp ly hương, Cô - Hư và ý nghĩa Cửu Tinh - Bát Môn trên cung mệnh.
    3. **Hôn Nhân & Vợ Chồng**: Đánh giá tương quan sinh khắc giữa cung Ất (Vợ), Canh (Chồng), Đinh (Thiếp) và Lục Hợp (Người mối).
    4. **Y Học, Trị Bệnh & Tìm Thầy Thuốc**: Tra cứu chi tiết tạng phủ bên trong và triệu chứng bên ngoài theo vị trí sao **Thiên Nhuế** tại 8 cung; xem sự sống chết qua Sinh - Tử Môn; tìm thầy thuốc qua sao **Thiên Tâm** và **Kỳ Ất**.
    5. **Cầu Tài, Kinh Doanh & Giao Dịch**: Phân tích tiền vốn **Giáp Tý Mậu**, lợi tức **Sinh Môn**, và quan hệ mua bán Nhật can - Thời can.
    6. **Thi Cử, Học Vấn & Công Danh**: Tra cứu sĩ tử (Nhật can), quan chủ khảo (**Trực Phù**), giám khảo (**Trực Sử**), bài thi (**Kỳ Đinh**), thăng chức quan văn (**Khai Môn**) và quan võ (**Đỗ Môn**).
    7. **Tìm Người, Mất Vật & Kẻ Trộm**: Tra cứu giống loài đồ vật mất theo 8 cung của Can Giờ và nhận diện kẻ trộm qua sao **Thiên Bồng**.
    8. **Kiện Tụng & Tranh Chấp**: Phân định Nguyên cáo (Nhật can), Bị cáo (Thời can), Quan tòa (**Trực Phù**), và văn thư đơn trạng qua hai cửa **Kinh Môn**, **Cảnh Môn**.
- **Tiện Ích Sao Chép Nhanh**:
  - Hỗ trợ nút sao chép thông số tổng quan dự trắc của quẻ chỉ với 1 cú nhấp chuột.

#### ⚡ Cải Tiến & Tối Ưu (Improved)
- Thêm tab **"Dự Trắc Kỳ Môn"** trên thanh Header giúp chuyển đổi tức thì giữa bản đồ 9 Cung và trang luận giải.
- Tự động tính toán quan hệ sinh khắc Ngũ hành tương tác trực tiếp giữa các can và cung trong quẻ hiện tại.

---

## [[2.4.0]] - 2026-08-26
### Codename: *Bí Kíp Toàn Thư & Luận Giải Khắc Ứng Tinh Thần*

#### ✨ Tính Năng Mới (Added)
- **Số Hoá Hệ Thống Phiên Bản**:
  - Tích hợp số hiệu phiên bản (`v2.4.0`) nổi bật trực tiếp trên thanh tiêu đề ứng dụng (Header) và trong chân trang (Footer).
  - Tích hợp cửa sổ **Nhật Ký Cập Nhật (Changelog Viewer Modal)** với chế độ xem bản mới nhất, xem toàn bộ dòng thời gian (Timeline) và nút sao chép Markdown tiện lợi.
- **Cơ Sở Dữ Liệu Thập Can Khắc Ứng (100 Cặp Can)**:
  - Bổ sung cơ sở dữ liệu tra cứu đầy đủ 100 cặp phối hợp Thiên Can gia Địa Can (*Long Hồi Thủ, Phi Điểu Điệt Huyệt, Bạch Hổ Xướng Cuồng, Thanh Long Đào Tẩu, Chu Tước Đầu Giang, Đằng Xà Yêu Kiều, Kỳ Nghi Tương Tả...*).
  - Đính kèm khẩu quyết thơ cổ theo nguyên bản **Kỳ Môn Độn Giáp Bí Kíp Toàn Thư**.
  - Phân tích chi tiết 4 phương diện cuộc sống: **Công Danh**, **Tài Vận**, **Xuất Hành**, **Bệnh Tật**.
- **Bát Môn & Cung Khắc Ứng Chuyên Sâu**:
  - Tính toán mối quan hệ Ngũ hành giữa Bát Môn và Cung Lâm Bàn (*Môn Sinh Cung, Cung Sinh Môn, Tỉ Hòa, Môn Bách, Môn Chế*).
  - Phân tách tường minh **Tượng Tĩnh** (nội bộ, phòng thủ, mưu kín) và **Tượng Động** (xuất trận, công phá, khởi sự).
- **Cửu Tinh & Bát Thần Chi Tiết**:
  - Bổ sung hồ sơ tính chất Cát/Hung, Ngũ hành, khẩu quyết bản cung của 9 Cửu Tinh.
  - Phân tích chi tiết 8 Bát Thần về ý nghĩa hộ trì, việc quân binh pháp và dự trắc sự vụ đời thường.
- **Cách Cục & Trận Thế Đặc Biệt**:
  - Nhận diện tự động: **Lục Nghi Kích Hình**, **Tam Kỳ Nhập Mộ**, **Tam Kỳ Thăng Điện**, **Cung Ba Thắng**, **Năm Cung Bất Khả Kích**, **9 Độn Biến Hóa** (*Thiên, Địa, Nhân, Thần, Quỷ, Phong, Vân, Long, Hổ*), **Tam Trá & Ngũ Giả**.

#### ⚡ Cải Tiến & Tối Ưu (Improved)
- Giao diện **Thanh Tra Cung (Palace Inspector)** được trang bị hệ thống 4 tab trực quan: *Can Khắc Ứng*, *Bát Môn & Cung*, *Tinh & Thần*, *Cách Cục*.
- Hệ thống màu sắc tương phản cao theo Ngũ hành và đánh giá Cát/Hung rõ ràng.
- Bổ sung file `CHANGELOG.md` chuẩn GitHub phục vụ việc phát hành (Releases).

#### 🐞 Sửa Lỗi (Fixed)
- Sửa lỗi hiển thị trường mô tả chi tiết của Bát Môn và Bát Thần trong tab thanh tra cung.
- Đồng bộ hóa số hiệu phiên bản trên toàn bộ các tệp cấu hình dự án (`package.json`, `metadata.json`, `Header.tsx`).

---

## [[2.3.0]] - 2026-08-25
### Codename: *Bàn Kỳ Môn Hoàn Chỉnh 4 Tầng*

#### ✨ Tính Năng Mới (Added)
- **Bàn Kỳ Môn Độn Giáp 9 Cung Hoàn Chỉnh**:
  - An trọn vẹn 4 tầng đĩa: **Thần Bàn** (Bát Thần), **Thiên Tinh Bàn** (Cửu Tinh), **Nhân Bàn** (Bát Môn), **Địa Bàn** (Kỳ Nghi).
  - Quy trình 6 bước lập bàn chính tông: An Địa bàn -> Định Tuần thủ & Trực Phù, Trực Sử -> An Cửu Tinh -> An Thiên Can -> An Bát Môn -> An Bát Thần.
- **Chế Độ Tự Do Tuỳ Biến (Custom Mode)**:
  - Cho phép người dùng tuỳ chọn Cục số (Âm 1-9 / Dương 1-9), Can Chi ngày giờ, Tuần thủ độc lập với thời gian thực.
- **Định Vị Thần Sát & Phương Vị Quan Trọng**:
  - Tự động nhận diện Tuần Không (Không Vong), Dịch Mã, Lộc Vị, Dương Quý Nhân, Âm Quý Nhân.

---

## [[2.2.0]] - 2026-08-24
### Codename: *Lịch Sóc Thiên Văn & Tháng Nhuận*

#### ✨ Tính Năng Mới (Added)
- **Định Nghĩa Tháng Âm Lịch Thiên Văn**:
  - Tính toán chính xác thời điểm Sóc ($(\lambda_{Moon} - \lambda_{Sun}) = 0^\circ$) theo thuật toán Jean Meeus / ELP2000.
  - Phân định Tháng Đủ (30 ngày) và Tháng Thiếu (29 ngày).
- **Quy Tắc Tháng Nhuận Chuẩn Xác**:
  - Một tháng âm lịch chính quy phải chứa đủ 1 Tiết khí và 1 Trung khí.
  - Tháng 1 (Tháng Giêng) là tháng chứa Tiết Lập Xuân ($315^\circ$) và Trung khí Vũ Thủy ($330^\circ$).
  - Tháng chỉ có Trung khí mà không có Tiết khí được tự động xác định là **Tháng Nhuận**.
- **Tab Điểm Sóc & Âm Lịch**:
  - Bảng biểu đồ tiến trình tuần trăng trực quan, đo đếm góc lệch kinh độ Mặt Trời - Mặt Trăng theo thời gian thực.

---

## [[2.1.0]] - 2026-08-23
### Codename: *Định Cục Siêu Thần Tiếp Khí Nhuận Cục*

#### ✨ Tính Năng Mới (Added)
- **Động Cơ Định Cục Kỳ Môn Độn Giáp Chính Tông**:
  - Tự động tìm ngày Phù Đầu Giáp/Kỷ gần nhất.
  - Phân chia Tam Nguyên: Thượng Nguyên (Tý Ngọ Mão Dậu), Trung Nguyên (Dần Thân Tị Hợi), Hạ Nguyên (Thìn Tuất Sửu Mùi).
  - So sánh ngày Phù Đầu với ngày Tiết Khí để phân định: **Chính Khí**, **Siêu Thần**, **Tiếp Khí**, **Nhuận Cục** (khi lệch trên 9 ngày tại Mang Chủng / Đại Tuyết).
  - Tra cứu và kết luận Cục số Âm/Dương Độn 1-9 chuẩn xác.

---

## [[2.0.0]] - 2026-08-20
### Codename: *Thiên Văn 24 Tiết Khí & Bát Tự Tứ Trụ*

#### ✨ Tính Năng Mới (Added)
- **Động Cơ Thiên Văn 24 Tiết Khí**:
  - Tính toán kinh độ Hoàng đạo của Mặt Trời theo chuẩn độ - phút - giây.
  - Phân định rõ 12 Tiết Lệnh và 12 Trung Khí.
  - Đồng hồ đếm ngược đến Tiết Khí kế tiếp và tính thời gian đã trôi qua.
- **Bát Tự Tứ Trụ (Can Chi 4 Trụ)**:
  - Năm đổi tại Tiết Lập Xuân ($315^\circ$).
  - Tháng chuyển theo 12 Tiết Lệnh & thuật toán Ngũ Hổ Độn.
  - Ngày theo chu kỳ 60 Hoa Giáp.
  - Giờ theo 12 canh giờ & thuật toán Ngũ Thử Độn.
- **Bảng Tra Cứu 24 Tiết Khí Toàn Năm & Xuất Markdown**:
  - Tra cứu 24 Tiết Khí của bất kỳ năm nào kèm chức năng lọc, tìm kiếm và xuất file Markdown.
- **La Bàn 9 Cung Hậu Thiên Bát Quái**:
  - Ma trận 9 Cung Lạc Thư liên kết trực quan với Tiết Khí đương lệnh.

---

## [[1.0.0]] - 2026-08-15
### Codename: *Khởi Tạo Dự Án (Initial Release)*
- Phiên bản ban đầu xây dựng cấu trúc nền tảng và thuật toán thiên văn cơ bản.
