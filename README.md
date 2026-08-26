# Tiết Khí & Kỳ Môn Độn Giáp (Astronomical Precision Engine)

Ứng dụng web toàn diện hỗ trợ tính toán và tra cứu **24 Tiết Khí Thiên Văn Chính Xác Cao**, **Lịch Sóc Âm Dương & Tháng Âm Lịch Thiên Văn**, **Bát Tự Tứ Trụ Can Chi**, **Luận Cục Kỳ Môn Độn Giáp (Siêu Thần Tiếp Khí Nhuận Cục)** và **La Bàn 9 Cung Hậu Thiên Bát Quái**.

---

## 🌟 Tính Năng Nổi Bật

### 1. ☀️ Thiên Văn 24 Tiết Khí (Solar Terms)
- Tính toán chính xác kinh độ Hoàng đạo của Mặt Trời ($\lambda_\odot$) theo chuẩn độ - phút - giây ($X^\circ Y' Z''$).
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
  - Hỗ trợ cả 2 chế độ: **Đồng bộ tự động theo thời gian thực** hoặc **Tự chọn Cục số & Can Chi** tùy ý.

### 6. 🗺️ Bản Đồ Bát Quái 9 Cung & La Bàn Lạc Thư
- Hiển thị ma trận 9 Cung Lạc Thư tương tác trực quan.
- Tự động làm nổi bật Cung và Tiết khí đang quản sự tại thời điểm tra cứu.
- Chi tiết Ngũ hành, Phương vị, Quẻ Hậu Thiên và chuỗi Cục số tương ứng của từng Cung.

### 7. 📊 Bảng 24 Tiết Khí Toàn Năm & Xuất Báo Cáo
- Tra cứu toàn bộ 24 Tiết Khí cho bất kỳ năm nào từ quá khứ đến tương lai.
- Tìm kiếm, lọc theo Tiết lệnh / Trung khí, hiển thị giờ chuyển tiết chuẩn UTC+7.
- **Xuất Báo Cáo Markdown (`Tiet_Khi_Nam_YYYY.md`)** và sao chép bảng tính nhanh chóng.

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
├── public/                 # Static assets & favicon
├── src/
│   ├── astronomy/          # Thuật toán thiên văn 24 Tiết Khí & Âm Lịch
│   │   ├── calculator.ts   # Bộ tính toán tổng hợp & xuất Markdown
│   │   ├── canChi.ts       # Bát Tự Tứ Trụ Can Chi & Ngũ Hổ/Ngũ Thử
│   │   ├── kyMon.ts        # Thuật toán Định Cục Kỳ Môn Độn Giáp
│   │   ├── lunarCalendar.ts# Thuật toán điểm Sóc & quy tắc tháng Âm lịch
│   │   ├── solarTerms.ts   # Tọa độ kinh độ Mặt Trời & 24 Tiết Khí
│   │   └── sunMoon.ts      # Vị trí Mặt Trời, Mặt Trăng & Điểm Sóc
│   ├── components/         # Các thành phần giao diện React
│   │   ├── AlgorithmGuideModal.tsx # Modal thuyết minh thuật toán
│   │   ├── ExportModal.tsx         # Modal xuất báo cáo Markdown
│   │   ├── Header.tsx              # Thanh tiêu đề & điều hướng tab
│   │   ├── KyMonDunJiaPanel.tsx    # Bảng luận Cục Kỳ Môn chi tiết
│   │   ├── LunarNewMoonSection.tsx # Bảng Điểm Sóc & Âm lịch chi tiết
│   │   ├── NinePalacesCompass.tsx  # La bàn Lạc Thư 9 Cung
│   │   ├── OverviewCard.tsx        # Thẻ tổng quan Tiết Khí & Âm Lịch
│   │   ├── TimeInputControl.tsx    # Bộ điều khiển chọn thời gian / Live
│   │   └── YearTermsTable.tsx      # Bảng 24 Tiết Khí toàn năm
│   ├── App.tsx             # Entry component chính
│   ├── main.tsx            # React root entry
│   └── types.ts            # Global TypeScript types
├── server.ts               # Express backend & static hosting
├── package.json            # Scripts & Dependencies
└── README.md               # Tài liệu dự án
```

---

## 📜 Giấy Phép (License)

Dự án được phân phối theo giấy phép [MIT License](LICENSE).
