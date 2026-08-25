import { ComprehensiveResult } from '../types';
import { formatVietnamDateTime } from '../astronomy/solarTerms';

export interface ContextInfo {
  formattedDateTime?: string;
  termName?: string;
  sunLongitude?: string;
  termType?: string;
  cungName?: string;
  canChiYear?: string;
  canChiMonth?: string;
  canChiDay?: string;
  canChiHour?: string;
  phuDau?: string;
  nguyenName?: string;
  trangThaiCuc?: string;
  doLechDays?: number;
  cucKetLuan?: string;
  amDuongDon?: string;
  lunarInfo?: string;
}

export function generateSmartLocalResponse(
  prompt: string,
  context?: ContextInfo
): string {
  const p = prompt.toLowerCase().trim();

  // 1. Context specific analysis request
  if (
    p.includes('thời điểm hiện tại') ||
    p.includes('phân tích cục') ||
    p.includes('luận cục') ||
    p.includes('cục hiện tại') ||
    p.includes('tại sao') && (p.includes('cục') || p.includes('âm độn') || p.includes('dương độn'))
  ) {
    if (context) {
      return `### 🔍 Phân Tích Luận Cục Kỳ Môn Thời Điểm Hiện Tại

Dựa trên dữ liệu thiên văn và thuật toán Siêu Thần Tiếp Khí:

1. **Thời gian tra cứu:** \`${context.formattedDateTime || 'Hiện tại'}\`
2. **Tiết Khí Đương Lệnh:** **${context.termName || 'N/A'}** (${context.termType || 'N/A'})
   - Kinh độ Mặt Trời hoàng đạo: \`${context.sunLongitude || 'N/A'}\`
   - Thuộc nhóm Cung: **${context.cungName || 'N/A'}**
3. **Bát Tự Tứ Trụ Can Chi:**
   - Năm: **${context.canChiYear || 'N/A'}**
   - Tháng: **${context.canChiMonth || 'N/A'}**
   - Ngày: **${context.canChiDay || 'N/A'}**
   - Giờ: **${context.canChiHour || 'N/A'}**
4. **Xác Định Phù Đầu & Tam Nguyên:**
   - **Phù Đầu hiện tại:** **${context.phuDau || 'N/A'}**
   - **Phân định Nguyên:** **${context.nguyenName || 'N/A'}**
5. **Quy Luật Vận Hành Siêu Thần - Tiếp Khí:**
   - Tình trạng: **${context.trangThaiCuc || 'Siêu Thần'}**
   - Giải thích: Phù đầu Thượng Nguyên đến trước/sau ngày chuyển Tiết khí ${context.doLechDays ?? 0} ngày.
6. **🎯 KẾT LUẬN CỤC SỐ:**
   - **${context.cucKetLuan || 'Cục Kỳ Môn'}** (${context.amDuongDon || 'Độn'})
   - ${context.lunarInfo ? `*Âm lịch:* ${context.lunarInfo}` : ''}

> **Nguyên lý cốt lõi:** Luận Cục Kỳ Môn lấy Phù Đầu (Giáp/Kỷ) làm then chốt để chia Tam Nguyên (5 ngày/nguyên), so sánh ngày đến của Phù đầu Thượng Nguyên với ngày khởi Tiết Khí để định Chính Khí, Siêu Thần hoặc Tiếp Khí.`;
    }
  }

  // 2. Explanation of "Siêu Thần - Tiếp Khí - Nhuận Cục"
  if (
    p.includes('siêu thần') ||
    p.includes('tiếp khí') ||
    p.includes('nhuận cục') ||
    p.includes('nguyên lý siêu thần')
  ) {
    return `### 🧭 Nguyên Lý "Siêu Thần - Tiếp Khí - Nhuận Cục" Trong Kỳ Môn Độn Giáp

Trong Kỳ Môn Độn Giáp, chu kỳ Can Chi là **60 Hoa Giáp** (chia thành các tuần Giáp/Kỷ dài 5 ngày gọi là **Phù Đầu**). Mỗi Tiết Khí quản lý khoảng 15 ngày (gồm 3 Nguyên: Thượng - Trung - Hạ).

#### 1. Phân Nguyên theo Địa Chi Phù Đầu:
- **Tý, Ngọ, Mão, Dậu:** Khởi **Thượng Nguyên** (5 ngày đầu).
- **Dần, Thân, Tị, Hợi:** Khởi **Trung Nguyên** (5 ngày giữa).
- **Thìn, Tuất, Sửu, Mùi:** Khởi **Hạ Nguyên** (5 ngày cuối).

#### 2. Đối chiếu Phù Đầu Thượng Nguyên với Tiết Khí:
- **Chính Khí:** Ngày Phù Đầu Thượng Nguyên trùng đúng ngày chuyển Tiết Khí (độ lệch 0 ngày).
- **Siêu Thần:** Phù Đầu Thượng Nguyên đến **trước** ngày chuyển Tiết Khí từ **1 đến 9 ngày** $\\rightarrow$ *Khí chưa tới mà Phù Đầu đã tới trước*, dùng Cục của Tiết Khí kế tiếp.
- **Tiếp Khí:** Phù Đầu Thượng Nguyên đến **sau** ngày chuyển Tiết Khí $\\rightarrow$ *Tiết Khí đã tới mà Phù Đầu tới sau*, dùng Cục của Tiết Khí hiện tại.
- **Nhuận Cục:** Khi độ lệch Siêu Thần vượt quá **9 ngày** (thường rơi vào gần Tiết Mang Chủng hoặc Đại Tuyết), do chu kỳ 60 ngày lệch với 365.2422 ngày của Mặt Trời, phải tiến hành **Nhuận Cục** (lặp lại 1 chu kỳ 15 ngày của Mang Chủng/Đại Tuyết) để kéo Phù Đầu và Tiết Khí trở lại đồng bộ.`;
  }

  // 3. 24 Solar terms explanation
  if (
    p.includes('24 tiết khí') ||
    p.includes('tiết khí') ||
    p.includes('bát quái') ||
    p.includes('phân định') ||
    p.includes('kinh độ mặt trời')
  ) {
    return `### ☀️ Thiên Văn 24 Tiết Khí & Phân Bổ 8 Cung Bát Quái

#### 1. Cơ sở Thiên Văn Học:
- Kinh độ Hoàng đạo của Mặt Trời ($\\lambda_\\odot$) trải dài từ $0^\\circ$ đến $360^\\circ$.
- Cứ mỗi $15^\\circ$ Mặt Trời di chuyển tạo thành **1 Tiết Khí**. Một năm có đúng 24 Tiết Khí.

#### 2. Phân biệt Tiết (Tiết Lệnh) và Khí (Trung Khí):
- **12 Tiết (Tiết Lệnh):** Lập Xuân ($315^\\circ$), Kinh Trập ($345^\\circ$), Thanh Minh ($15^\\circ$), Lập Hạ ($45^\\circ$), Mang Chủng ($75^\\circ$), Tiểu Thử ($105^\\circ$), Lập Thu ($135^\\circ$), Bạch Lộ ($165^\\circ$), Hàn Lộ ($195^\\circ$), Lập Đông ($225^\\circ$), Đại Tuyết ($255^\\circ$), Tiểu Hàn ($285^\\circ$).
  $\\rightarrow$ *Tiết Lệnh là thời điểm bắt đầu tháng mới trong Bát Tự Tứ Trụ.*
- **12 Khí (Trung Khí):** Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn.

#### 3. Phân Bổ 8 Cung Hậu Thiên Bát Quái:
- **Cung Khảm (1 - Bắc):** Đông Chí, Tiểu Hàn, Đại Hàn (Dương Độn 1, 7, 4)
- **Cung Cấn (8 - Đông Bắc):** Lập Xuân, Vũ Thủy, Kinh Trập (Dương Độn 8, 5, 2)
- **Cung Chấn (3 - Đông):** Xuân Phân, Thanh Minh, Cốc Vũ (Dương Độn 3, 9, 6)
- **Cung Tốn (4 - Đông Nam):** Lập Hạ, Tiểu Mãn, Mang Chủng (Dương Độn 4, 1, 7)
- **Cung Ly (9 - Nam):** Hạ Chí, Tiểu Thử, Đại Thử (Âm Độn 9, 3, 6)
- **Cung Khôn (2 - Tây Nam):** Lập Thu, Xử Thử, Bạch Lộ (Âm Độn 2, 5, 8)
- **Cung Đoài (7 - Tây):** Thu Phân, Hàn Lộ, Sương Giáng (Âm Độn 7, 1, 4)
- **Cung Càn (6 - Tây Bắc):** Lập Đông, Tiểu Tuyết, Đại Tuyết (Âm Độn 6, 8, 2)`;
  }

  // 4. New Moon / Lunar calendar explanation
  if (
    p.includes('điểm sóc') ||
    p.includes('new moon') ||
    p.includes('âm lịch') ||
    p.includes('tháng đủ') ||
    p.includes('tháng thiếu') ||
    p.includes('mùng 1')
  ) {
    return `### 🌑 Điểm Sóc (New Moon) & Nguyên Lý Tính Tháng Âm Lịch

#### 1. Điểm Sóc là gì?
Điểm Sóc (New Moon) là thời khắc thiên văn chính xác khi hiệu số kinh độ Hoàng đạo giữa Mặt Trăng và Mặt Trời bằng $0^\\circ$ ($(\\lambda_{Moon} - \\lambda_{Sun}) = 0^\\circ$). Lúc này Mặt Trăng nằm chính giữa Trái Đất và Mặt Trời, mặt tối hướng về Trái Đất.

#### 2. Quy ước Ngày Mùng 1 Âm Lịch:
- Theo lịch pháp Á Đông (chuẩn múi giờ Việt Nam **UTC+7**), **ngày Dương lịch chứa thời điểm Sóc** được quy định chính là **ngày Mùng 1** của tháng Âm lịch.
- Dù điểm Sóc xảy ra lúc 00:01 hay 23:59 của ngày Dương lịch nào thì cả ngày Dương lịch đó đều tính là ngày Mùng 1 Âm lịch.

#### 3. Tháng Đủ (30 ngày) và Tháng Thiếu (29 ngày):
- Khoảng cách giữa 2 điểm Sóc liên tiếp (tuần trăng giao hội) trung bình là **29.530588 ngày**.
- Do chu kỳ có phần thập phân, khoảng cách giữa 2 ngày Mùng 1 liên tiếp sẽ xen kẽ giữa **29 ngày (Tháng thiếu)** và **30 ngày (Tháng đủ)** tùy thuộc vào thời điểm rơi chính xác của điểm Sóc kế tiếp.`;
  }

  // 5. Four pillars (Bat Tu) / Lap Xuan
  if (
    p.includes('bát tự') ||
    p.includes('tứ trụ') ||
    p.includes('lập xuân') ||
    p.includes('ngũ hổ độn') ||
    p.includes('ngũ thử độn') ||
    p.includes('trụ năm') ||
    p.includes('trụ tháng')
  ) {
    return `### 🔮 Nguyên Lý Khởi Bát Tự (Tứ Trụ Can Chi)

Trong Mệnh lý học và Kỳ Môn Độn Giáp, Tứ Trụ (Năm, Tháng, Ngày, Giờ) được tính hoàn toàn dựa trên **Vận hành Thiên văn**:

#### 1. Trụ Năm: Đổi năm theo Tiết Lập Xuân
- Năm mới Can Chi **KHÔNG** bắt đầu từ mùng 1 Tết Âm lịch hay Tết Dương lịch, mà bắt đầu chính xác tại khoảnh khắc Mặt Trời đạt **kinh độ $315^\\circ$ (Tiết Lập Xuân)**.
- Sinh trước giờ Lập Xuân vẫn tính là tuổi của năm cũ.

#### 2. Trụ Tháng: 12 Tiết Lệnh & Ngũ Hổ Độn
- Trụ tháng chuyển đổi tại thời điểm bắt đầu của **12 Tiết Lệnh**:
  - Tháng Dần (Dần Nguyệt): từ Lập Xuân ($315^\\circ$)
  - Tháng Mão: từ Kinh Trập ($345^\\circ$)
  - Tháng Thìn: từ Thanh Minh ($15^\\circ$)
  - Tháng Tị: từ Lập Hạ ($45^\\circ$)
  - Tháng Ngọ: từ Mang Chủng ($75^\\circ$)
  - Tháng Mùi: từ Tiểu Thử ($105^\\circ$)
  - Tháng Thân: từ Lập Thu ($135^\\circ$)
  - Tháng Dậu: từ Bạch Lộ ($165^\\circ$)
  - Tháng Tuất: từ Hàn Lộ ($195^\\circ$)
  - Tháng Hợi: từ Lập Đông ($225^\\circ$)
  - Tháng Tý: từ Đại Tuyết ($255^\\circ$)
  - Tháng Sửu: từ Tiểu Hàn ($285^\\circ$)
- Can của tháng được xác định theo quy tắc **Ngũ Hổ Độn** dựa vào Can của Năm (ví dụ: Năm Giáp/Kỷ khởi Bính Dần; Ất/Canh khởi Mậu Dần...).

#### 3. Trụ Giờ & Ngũ Thử Độn:
- Một ngày có 12 canh giờ (mỗi canh 2 tiếng, bắt đầu từ giờ Tý 23:00 - 01:00).
- Can của giờ được suy ra từ Can của Ngày thông qua bài quyết **Ngũ Thử Độn** (Giáp Kỷ hoàn gia Giáp, Ất Canh Bính tác sơ...).`;
  }

  // 6. Phù đầu & Tam nguyên
  if (p.includes('phù đầu') || p.includes('tam nguyên') || p.includes('thượng nguyên')) {
    return `### 🏷️ Phù Đầu & Tam Nguyên Trong Kỳ Môn Độn Giáp

- **Phù Đầu:** Là ngày có Thiên Can là **Giáp** hoặc **Kỷ**. Đây là ngày đầu tiên của mỗi chu kỳ 5 ngày (1 Nguyên).
- **Quy tắc phân Tam Nguyên:**
  - Nếu Địa Chi của Phù Đầu là **Tý, Ngọ, Mão, Dậu** $\\rightarrow$ Quản **Thượng Nguyên** (5 ngày).
  - Nếu Địa Chi của Phù Đầu là **Dần, Thân, Tị, Hợi** $\\rightarrow$ Quản **Trung Nguyên** (5 ngày).
  - Nếu Địa Chi của Phù Đầu là **Thìn, Tuất, Sửu, Mùi** $\\rightarrow$ Quản **Hạ Nguyên** (5 ngày).
- Một Tiết Khí 15 ngày tương ứng với 3 Phù Đầu lần lượt quản Thượng Nguyên, Trung Nguyên và Hạ Nguyên.`;
  }

  // Default general response
  return `### 🌌 Giải Đáp Thiên Văn Lịch Pháp & Kỳ Môn Độn Giáp

Về câu hỏi: *"**${prompt}**"*

Trong hệ thống **Skyfield Precision Astronomical Engine & Kỳ Môn Độn Giáp**:
- **Thiên Văn Học:** Mọi sự chuyển đổi về Tiết Khí, Điểm Sóc Âm Lịch và Can Chi đều dựa trên tọa độ vị trí thực tế của Mặt Trời và Mặt Trăng tính toán từ thuật toán thiên văn học chính xác cao.
- **Kỳ Môn Độn Giáp:** Ứng dụng triển khai trọn vẹn phương pháp **Siêu Thần - Tiếp Khí - Nhuận Cục**, tự động phân định Phù Đầu và Tam Nguyên để xác định Cục số Dương Độn (1 đến 9) hoặc Âm Độn (9 về 1).

${
  context
    ? `> **Hiện tại:** Ứng dụng đang ở Tiết khí **${context.termName || ''}**, ${context.cucKetLuan || ''}, Bát tự ngày **${context.canChiDay || ''}**.`
    : ''
}

*Bạn có thể bấm vào các câu hỏi gợi ý bên dưới hoặc hỏi chi tiết về bất kỳ khái niệm nào như: "Siêu Thần là gì?", "Cách tính Điểm Sóc", "Ý nghĩa 9 Cung Bát Quái"!*`;
}
