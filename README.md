# Tiết Khí & Kỳ Môn Độn Giáp (Astronomical Precision Engine)

[![Version](https://img.shields.io/badge/version-v2.22.1-amber.svg?style=flat-square)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Engine](https://img.shields.io/badge/astronomy-VSOP87%20%2F%20ELP2000-emerald.svg?style=flat-square)](src/astronomy/)

Ứng dụng web toàn diện hỗ trợ tính toán và tra cứu **24 Tiết Khí Thiên Văn Chính Xác Cao**, **Lịch Sóc Âm Dương & Tháng Âm Lịch Thiên Văn**, **Bát Tự Tứ Trụ Can Chi**, **Luận Cục Kỳ Môn Độn Giáp (Siêu Thần Tiếp Khí Nhuận Cục)**, **Bàn Kỳ Môn 9 Cung 4 Tầng Hoàn Chỉnh**, **Đại Lục Nhâm Độn Giáp Toàn Thư (Thiên/Địa Bàn, Tứ Khoa, Tam Truyền Cửu Tông Môn, 12 Thần Tướng)**, **Trợ Lý AI Luận Giải Cổ Thuật Toàn Năng (OpenRouter Multi-Model)**, **Đánh Giá Cát/Hung Thời Không Thang 5 Sao**, và **Toàn Thư Dự Trắc Bàn Kỳ Môn Cổ Bản**.

---

## 📢 Thông Báo Cập Nhật Phiên Bản Mới Nhất

### 🚀 **Phiên bản hiện tại: `v2.22.1`** *(Phát hành: 30/08/2026)*
**Tên mã:** *Tối Ưu Giao Diện & Vị Trí Cung Cấp OpenRouter API Key Trực Quan Cho AI Chatbot*

- 🔑 **Thẻ Thiết Lập OpenRouter API Key Trực Quan & Rõ Ràng**:
  - Bố trí thẻ cấu hình API Key nổi bật ngay đầu giao diện Chatbot, hiển thị rõ ràng trước khi người dùng gửi câu hỏi.
  - Hướng dẫn 3 bước ngắn gọn cùng nút bấm mở trực tiếp [OpenRouter.ai/keys](https://openrouter.ai/keys) để lấy key miễn phí trong 30 giây.
  - Nút ẩn/hiện mã khóa bảo mật, lưu & kích hoạt nhanh, nút xóa key và thông báo lưu thành công.
- ⚡ **Huy Hiệu Trạng Thái Trên Top Bar & Cảnh Báo Thông Minh**:
  - Huy hiệu trạng thái trên thanh tiêu đề (`[🔑 Nhập API Key]` nhấp nháy thu hút sự chú ý khi chưa có key).
  - Tự động mở và focus ô nhập key khi người dùng chọn câu hỏi nhanh hoặc bấm gửi mà chưa cấu hình key.
- 🔒 **Bảo Mật Cục Bộ 100%**:
  - Khóa API lưu hoàn toàn trong `localStorage` trên trình duyệt người dùng, an toàn tuyệt đối.

👉 **Xem toàn bộ lịch sử các lần cập nhật:** [Xem chi tiết tại CHANGELOG.md](CHANGELOG.md)

---

### 📦 **Phiên bản trước: `v2.22.0`** *(Phát hành: 30/08/2026)*

## 🌟 Tính Năng Nổi Bật

### 1. ☀️ Thiên Văn 24 Tiết Khí (Solar Terms)
- Tính toán chính xác kinh độ Hoàng đạo của Mặt Trời ($\lambda_\odot$) theo chuẩn độ - phút - giây ($X^\circ Y' Z''$) sử dụng thuật toán Jean Meeus & VSOP87.
- Phân định rõ ràng:
  - **12 Tiết (Tiết Lệnh)**: Lập Xuân, Kinh Trập, Thanh Minh, Lập Hạ, Mang Chủng, Tiểu Thử, Lập Thu, Bạch Lộ, Hàn Lộ, Lập Đông, Đại Tuyết, Tiểu Hàn (*mốc chuyển tháng Bát Tự*).
  - **12 Khí (Trung Khí)**: Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn.
- Phân bổ 24 Tiết khí vào **8 Cung Hậu Thiên Bát Quái** (Khảm 1, Cấn 8, Chấn 3, Tốn 4, Ly 9, Khôn 2, Đoài 7, Càn 6).
- Đồng hồ đếm ngược đến Tiết Khí kế tiếp và tính thời gian đã trôi qua trong Tiết Khí đương lệnh.

### 2. 🌑 Lịch Sóc Âm Dương & Định Tháng Âm Lịch Thiên Văn
- **Định nghĩa tháng Âm lịch**: Tháng âm lịch được xác định chính xác bằng **khoảng cách giữa 2 điểm Sóc liên tiếp** ($(\lambda_{Moon} - \lambda_{Sun}) = 0^\circ$).
- **Quy tắc đủ Tiết & Khí**: Một tháng âm lịch chính quy phải chứa **đủ cả 1 Tiết khí (Tiết lệnh) và 1 Trung khí**.
- **Mốc xác định Tháng 1 (Tháng Giêng)**: Tháng 1 là tháng chứa Tiết **Lập Xuân** ($315^\circ$) và Trung khí **Vũ Thủy** ($330^\circ$).
- **Quy tắc Tháng Nhuận**: Nếu trong khoảng thời gian giữa 2 điểm Sóc của một tháng chỉ có Trung khí mà **không có Tiết khí** (hoặc thiếu Tiết khí tương ứng), tháng đó được xác định là **Tháng Nhuận** của tháng đó.
- Phân định **Tháng đủ (30 ngày)** và **Tháng thiếu (29 ngày)** cùng tiến độ tuần trăng thực tế.
- **Thống kê toàn bộ chu kỳ năm Âm Lịch**: Bảng 12 hoặc 13 tháng âm lịch trong năm với thông tin tháng nhuận (nếu có), số ngày và trạng thái diễn ra.

### 3. 🔮 Bát Tự Tứ Trụ (Can Chi 4 Trụ)
- **Trụ Năm**: Khởi đổi năm mới chính xác tại mốc kinh độ $315^\circ$ (**Tiết Lập Xuân**), chuẩn xác theo nguyên lý Mệnh lý & Kỳ Môn cổ điển.
- **Trụ Tháng**: Chuyển tháng theo 12 Tiết Lệnh thiên văn kết hợp thuật toán **Ngũ Hổ Độn**.
- **Trụ Ngày**: Vận hành theo chu kỳ 60 Hoa Giáp liên tục.
- **Trụ Giờ**: 12 canh giờ theo giờ địa phương kết hợp thuật toán **Ngũ Thử Độn**.

### 4. 🧭 Luận Cục Kỳ Môn Độn Giáp (Siêu Thần - Tiếp Khí - Nhuận Cục)
- Tự động xác định **Phù Đầu** (chu kỳ 5 ngày Giáp / Kỷ).
- Phân định **Tam Nguyên**:
  - Chi *Tý, Ngọ, Mão, Dậu* $\rightarrow$ **Thượng Nguyên**
  - Chi *Dần, Thân, Tị, Hợi* $\rightarrow$ **Trung Nguyên**
  - Chi *Thìn, Tuất, Sửu, Mùi* $\rightarrow$ **Hạ Nguyên**
- Tự động đối chiếu Phù Đầu Thượng Nguyên với Tiết Khí để kết luận:
  - **Chính Khí**: Trùng ngày (độ lệch 0 ngày).
  - **Siêu Thần**: Phù Đầu đến trước Tiết Khí từ 1 đến 9 ngày $\rightarrow$ dùng Cục Tiết Khí kế tiếp.
  - **Tiếp Khí**: Phù Đầu đến sau Tiết Khí $\rightarrow$ dùng Cục Tiết Khí hiện tại.
  - **Nhuận Cục**: Khi độ lệch vượt quá 9 ngày (tại Mang Chủng / Đại Tuyết) $\rightarrow$ tiến hành Nhuận Cục.
- Tra cứu bảng Cục Âm/Dương 1–9 và kết luận Cục số tức thì kèm giải trình từng bước.

### 5. 🛡️ Bàn Kỳ Môn Hoàn Chỉnh (Ma Trận 9 Cung Đầy Đủ 4 Tầng)
- **Quy trình 6 bước lập bàn độc lập**:
  - **Bước 1**: An Địa Bàn Kỳ Nghi (Lục Nghi Tam Kỳ bay thuận/nghịch theo Dương/Âm Độn).
  - **Bước 2**: Xác định Tuần thủ của Giờ, tìm Trực Phù (sao gốc) và Trực Sử (cửa gốc).
  - **Bước 3**: An Thiên Bàn Cửu Tinh (Trực Phù bay theo Can Giờ, 8 sao xoay vòng chu vi Lạc Thư).
  - **Bước 4**: An Can Thiên Bàn (Kỳ Nghi Địa bàn bay theo Sao, Thiên Cầm gửi Khôn 2).
  - **Bước 5**: An Bát Môn Nhân Bàn (Trực Sử đếm tiến/lùi theo Địa chi giờ, 8 cửa xoay thuận).
  - **Bước 6**: An Bát Thần Bàn (Thần Trực Phù theo Sao Trực Phù, Dương xoay thuận / Âm xoay nghịch).
- **Phân tích Thần Sát & Cách Cục Cổ Điển**:
  - Nhận diện Tuần Không (Không Vong), Dịch Mã, Lộc Vị, Dương Quý / Âm Quý.
  - Tự động tra cứu 10 Can tương khắc ứng (*Long Hồi Thủ, Phi Điểu Điệt Huyệt, Bạch Hổ Xướng Cuồng, Thanh Long Đào Tẩu, Chu Tước Đầu Giang, Đằng Xà Yêu Kiều, Đại/Tiểu/Hình Cách, Bạch/Huỳnh tương nhập...*).
  - Phân tích 9 Độn (*Thiên Độn, Địa Độn, Nhân Độn, Thần Độn, Quỷ Độn, Phong Độn, Vân Độn, Long Độn, Hổ Độn*), Tam Trá, Ngũ Giả, Cung Ba Thắng.

### 6. 📖 Toàn Thư Dự Trắc Bàn Kỳ Môn & Chiêm Đoán Việc Đời
- **Tam Bàn & Chủ Khách**: Luận giải tương quan sinh khắc giữa Thiên bàn (Sao), Nhân bàn (Cửa), Địa bàn (Cung) và quy luật Chủ - Khách trong xuất hành, đàm phán, giao tranh.
- **Dự Trắc Thân Mệnh**: Hệ thống Lục Thân (Niên can Cha Mẹ, Nguyệt can Anh Em, Nhật can Bản Thân, Thời can Con Nhỏ, Ất/Đinh Thê thiếp, Canh Chồng), Sinh Môn tổ nghiệp và Cô - Hư.
- **6 Việc Đời Cụ Thể**: Hôn nhân, Y học trị bệnh (Thiên Nhuế tra 8 cung tạng phủ), Cầu tài buôn bán (Mậu & Sinh Môn), Thi cử công danh, Mất vật kẻ trộm, Kiện tụng tranh chấp.

---

## 🛠️ Ngăn Xếp Công Nghệ (Tech Stack)

- **Frontend**: [React 18+](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Backend / Server**: [Express](https://expressjs.com/), [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)
- **Thiên Văn Học**: Thuật toán tính toán vị trí Mặt Trời & Mặt Trăng (VSOP87 & ELP2000 precision algorithms)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Hệ Thống
- [Node.js](https://nodejs.org/) (phiên bản 18 trở lên)
- Trình quản lý gói `npm`, `yarn` hoặc `pnpm`

### Các Bước Cài Đặt

1. **Clone repository:**
   ```bash
   git clone https://github.com/caphenpro/Tietkhikymon.git
   cd Tietkhikymon
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt và truy cập: `http://localhost:3000`

4. **Đóng gói sản phẩm (Production Build):**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Cấu Trúc Dự Án

```
Tietkhikymon/
├── AGENTS.md               # Quy chuẩn bắt buộc duy trì & đồng bộ tài liệu hệ thống
├── CHANGELOG.md            # Nhật ký thay đổi chuẩn Keep a Changelog
├── metadata.json           # Metadata ứng dụng Google AI Studio
├── package.json            # Scripts, dependencies & số hiệu phiên bản v2.5.0
├── server.ts               # Express backend & static hosting
├── src/
│   ├── astronomy/          # Động cơ thiên văn & thuật toán Kỳ Môn
│   │   ├── calculator.ts   # Tính toán tổng hợp 24 Tiết Khí & xuất Markdown
│   │   ├── canChi.ts       # Bát Tự Tứ Trụ Can Chi & Ngũ Hổ/Ngũ Thử Độn
│   │   ├── kyMon.ts        # Thuật toán Định Cục Kỳ Môn (Siêu Thần Tiếp Khí)
│   │   ├── kymonChart.ts   # Ma trận 9 Cung Kỳ Môn 4 Tầng & 6 bước lập bàn
│   │   ├── kymonFormations.ts # 100 Can Khắc Ứng, Bát Môn Cung & Thần Sát
│   │   ├── kymonPrognostication.ts # Động cơ dự trắc 6 phương diện đời sống & Thân Mệnh
│   │   ├── lunarCalendar.ts# Thuật toán điểm Sóc & quy tắc tháng Âm lịch
│   │   ├── solarTerms.ts   # Tọa độ kinh độ Mặt Trời & 24 Tiết Khí
│   │   └── sunMoon.ts      # Vị trí Mặt Trời, Mặt Trăng & Điểm Sóc
│   ├── components/         # Giao diện người dùng React
│   │   ├── AlgorithmGuideModal.tsx    # Modal thuyết minh thuật toán toàn diện
│   │   ├── ChangelogModal.tsx         # Modal xem nhật ký phiên bản
│   │   ├── ExportModal.tsx            # Modal xuất báo cáo Markdown
│   │   ├── Header.tsx                 # Thanh tiêu đề, phiên bản & điều hướng
│   │   ├── KyMonCompleteBoard.tsx     # Bàn Kỳ Môn 9 Cung 4 tầng hoàn chỉnh
│   │   ├── KyMonDunJiaPanel.tsx       # Bảng phân tích Cục Kỳ Môn chi tiết
│   │   ├── KyMonPrognosticationView.tsx # Trang Toàn Thư Dự Trắc 8 chuyên đề
│   │   ├── LunarNewMoonSection.tsx    # Bảng Điểm Sóc & Âm lịch chi tiết
│   │   ├── MiniCalendar.tsx           # Lịch tháng tương tác & chọn ngày trực quan
│   │   ├── NinePalacesCompass.tsx     # La bàn Lạc Thư 9 Cung
│   │   ├── OverviewCard.tsx           # Thẻ tổng quan đa tầng từ cơ bản đến nâng cao
│   │   ├── TimeInputControl.tsx       # Bộ điều khiển thời gian thực & chọn lịch
│   │   └── YearTermsTable.tsx         # Bảng 24 Tiết Khí toàn năm
│   ├── version.ts          # Nguồn chân lý phiên bản & dữ liệu Changelog
│   ├── types.ts            # Hệ thống kiểu dữ liệu TypeScript
│   ├── App.tsx             # Entry component & điều hướng trung tâm
│   └── main.tsx            # React root entry
└── README.md               # Tài liệu tổng quan dự án
```

---

## 📜 Giấy Phép (License)

Dự án được phân phối theo giấy phép [MIT License](LICENSE).


---

## 📜 Giấy Phép (License)

Dự án được phân phối theo giấy phép [MIT License](LICENSE).
