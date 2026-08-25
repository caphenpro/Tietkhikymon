# Tiết Khí & Kỳ Môn Độn Giáp (Skyfield Precision Engine)

Ứng dụng web toàn diện hỗ trợ tính toán và tra cứu **24 Tiết Khí Thiên Văn Chính Xác Cao**, **Lịch Sóc Âm Dương (Điểm Sóc New Moon)**, **Bát Tự Tứ Trụ Can Chi**, **Luận Cục Kỳ Môn Độn Giáp (Siêu Thần Tiếp Khí Nhuận Cục)** và **Trợ Lý AI Hỏi Đáp Kỳ Môn (Gemini 3.7 Flash + Offline Engine)**.

---

## 🌟 Tính Năng Nổi Bật

### 1. ☀️ Thiên Văn 24 Tiết Khí (Solar Terms)
- Tính toán chính xác kinh độ Hoàng đạo của Mặt Trời ($\lambda_\odot$) theo chuẩn độ - phút - giây ($X^\circ Y' Z''$).
- Phân định rõ ràng:
  - **12 Tiết (Tiết Lệnh)**: Lập Xuân, Kinh Trập, Thanh Minh, Lập Hạ, Mang Chủng, Tiểu Thử, Lập Thu, Bạch Lộ, Hàn Lộ, Lập Đông, Đại Tuyết, Tiểu Hàn (*mốc chuyển tháng Bát Tự*).
  - **12 Khí (Trung Khí)**: Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn.
- Phân bổ 24 Tiết khí vào **8 Cung Hậu Thiên Bát Quái** (Khảm 1, Cấn 8, Chấn 3, Tốn 4, Ly 9, Khôn 2, Đoài 7, Càn 6).
- Đồng hồ đếm ngược đến Tiết Khí kế tiếp và tính thời gian đã trôi qua trong Tiết Khí đương lệnh.

### 2. 🌑 Điểm Sóc (New Moon) & Lịch Âm Dương
- Xác định chính xác khoảnh khắc giao hội Nhật - Nguyệt ($(\lambda_{Moon} - \lambda_{Sun}) = 0^\circ$).
- Xác định **ngày Mùng 1 Âm lịch** theo chuẩn múi giờ Việt Nam (UTC+7).
- Tính chu kỳ tuần trăng thực tế để kết luận **Tháng đủ (30 ngày)** hoặc **Tháng thiếu (29 ngày)**.
- Tra cứu ngày Âm lịch hiện tại và đếm ngược đến điểm Sóc tiếp theo.

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

### 5. 🗺️ Bản Đồ Bát Quái 9 Cung & La Bàn Lạc Thư
- Hiển thị ma trận 9 Cung Lạc Thư tương tác trực quan.
- Tự động làm nổi bật Cung và Tiết khí đang quản sự tại thời điểm tra cứu.
- Chi tiết Ngũ hành, Phương vị, Quẻ Hậu Thiên và chuỗi Cục số tương ứng của từng Cung.

### 6. 🤖 Trợ Lý AI Hỏi Đáp Kỳ Môn (Gemini 3.7 + Offline Knowledge Engine)
- **Mô hình AI Gemini 3.7 Flash**: Tích hợp phân tích câu hỏi chuyên sâu về thiên văn và Kỳ Môn Độn Giáp.
- **Đính kèm Ngữ Cảnh Thời Gian Thực**: Tự động đưa toàn bộ thông số đang hiển thị trên web app vào câu hỏi để AI giải thích lý do ra Cục số đó.
- **Cơ chế Dự Phòng Đa Tầng (Multi-Tier Resilience)**:
  - Server-side API (`/api/chat`)
  - Serverless Functions Netlify (`/.netlify/functions/chat`)
  - Client-side Gemini API fallback
  - **Bộ Tri Thức Offline Tự Động**: Đảm bảo trợ lý luôn phản hồi nhanh và chính xác 100% kể cả khi chạy offline hoặc deploy trên static host.
- Giao diện chat nổi (floating widget) tiện lợi hoặc tab toàn màn hình.

### 7. 📊 Bảng 24 Tiết Khí Toàn Năm & Xuất Báo Cáo
- Tra cứu toàn bộ 24 Tiết Khí cho bất kỳ năm nào từ quá khứ đến tương lai.
- Tìm kiếm, lọc theo Tiết lệnh / Trung khí, hiển thị giờ chuyển tiết chuẩn UTC+7.
- **Xuất Báo Cáo Markdown (`Tiet_Khi_Nam_YYYY.md`)** và sao chép bảng tính nhanh chóng.

---

## 🛠️ Ngăn Xếp Công Nghệ (Tech Stack)

- **Frontend**: [React 18+](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Backend / Server**: [Express](https://expressjs.com/), [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)
- **AI Integration**: `@google/genai` (Google Gemini 3.7 Flash)
- **Thiên Văn Học**: Thuật toán tính toán vị trí Mặt Trời & Mặt Trăng (Solar Longitude & Moon Phase Calculations)

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

3. **Cấu hình biến môi trường (Tùy chọn cho Gemini AI):**
   Tạo file `.env` tại thư mục gốc:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Lưu ý: Nếu không cấu hình API Key, Trợ lý AI vẫn hoạt động bình thường nhờ Bộ tri thức Offline tích hợp sẵn).*

4. **Chạy máy chủ phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt và truy cập: `http://localhost:3000`

5. **Đóng gói sản phẩm (Production Build):**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Cấu Trúc Dự Án

```
Tietkhikymon/
├── public/                 # Static assets & Netlify redirects
├── src/
│   ├── astronomy/          # Thuật toán thiên văn 24 Tiết Khí & Điểm Sóc
│   │   ├── calculator.ts   # Bộ tính toán tổng hợp & xuất Markdown
│   │   ├── lunarCalendar.ts# Thuật toán tính Điểm Sóc (New Moon)
│   │   ├── solarTerms.ts   # Tọa độ kinh độ Mặt Trời & 24 Tiết Khí
│   │   └── types.ts        # Định nghĩa kiểu dữ liệu thiên văn
│   ├── components/         # Các thành phần giao diện React
│   │   ├── AlgorithmGuideModal.tsx # Modal thuyết minh thuật toán
│   │   ├── ExportModal.tsx         # Modal xuất báo cáo Markdown
│   │   ├── GeminiChatbot.tsx       # Giao diện Chatbot AI đa năng
│   │   ├── Header.tsx              # Thanh tiêu đề & điều hướng tab
│   │   ├── KyMonDunJiaPanel.tsx    # Bảng luận Cục Kỳ Môn chi tiết
│   │   ├── LunarNewMoonSection.tsx # Bảng Điểm Sóc & Âm lịch
│   │   ├── NinePalacesCompass.tsx  # La bàn Lạc Thư 9 Cung
│   │   ├── OverviewCard.tsx        # Thẻ tổng quan Tiết Khí & Bát Tự
│   │   ├── TimeInputControl.tsx    # Bộ điều khiển chọn thời gian / Live
│   │   └── YearTermsTable.tsx      # Bảng 24 Tiết Khí toàn năm
│   ├── services/           # Xử lý Chatbot & Tri thức Offline
│   │   ├── chatService.ts      # Kết nối đa tầng API / Local
│   │   └── offlineKnowledge.ts # Bộ máy tri thức Kỳ Môn & Tiết Khí
│   ├── App.tsx             # Entry component chính
│   ├── main.tsx            # React root entry
│   └── types.ts            # Global TypeScript types
├── server.ts               # Express backend & API proxy
├── package.json            # Scripts & Dependencies
└── README.md               # Tài liệu dự án
```

---

## 📜 Giấy Phép (License)

Dự án được phân phối theo giấy phép [MIT License](LICENSE).
