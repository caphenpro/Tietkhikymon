# Nhật Ký Thay Đổi & Cập Nhật (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tiết Khí & Kỳ Môn Độn Giáp (Astronomical Precision Engine)** sẽ được ghi lại chi tiết và có hệ thống trong tệp tin này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/), và dự án tuân thủ [Semantic Versioning (Phiên Bản Ngữ Nghĩa)](https://semver.org/spec/v2.0.0.html).

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
