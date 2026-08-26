# Nhật Ký Thay Đổi & Cập Nhật (Changelog)

Tất cả các thay đổi đáng chú ý của dự án **Tiết Khí & Kỳ Môn Độn Giáp (Astronomical Precision Engine)** sẽ được ghi lại chi tiết và có hệ thống trong tệp tin này.

Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/), và dự án tuân thủ [Semantic Versioning (Phiên Bản Ngữ Nghĩa)](https://semver.org/spec/v2.0.0.html).

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
