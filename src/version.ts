export interface ChangelogItem {
  version: string;
  releaseDate: string;
  codename: string;
  tagline: string;
  isLatest?: boolean;
  highlights: string[];
  added: string[];
  improved: string[];
  fixed?: string[];
  astronomyNotes?: string[];
}

export const APP_VERSION = '2.29.0';
export const APP_RELEASE_DATE = '2026-09-03';
export const APP_CODENAME = 'Tinh Gọn Song Trụ: Lịch Vạn Niên Chuẩn Hóa & Lập Quẻ Song Thức Kỳ Môn - Lục Nhâm (Streamlined Dual-Pillars Calendar & Divination System)';
export const APP_GITHUB_REPO = 'https://github.com/caphenpro/Tietkhikymon';

export const CHANGELOG_DATA: ChangelogItem[] = [
  {
    version: '2.29.0',
    releaseDate: '2026-09-03',
    codename: 'Tinh Gọn Song Trụ: Lịch Vạn Niên Chuẩn Hóa & Lập Quẻ Song Thức Kỳ Môn - Lục Nhâm (Streamlined Dual-Pillars Calendar & Divination System)',
    tagline: 'Sắp xếp lại toàn bộ ứng dụng, tinh giản lý thuyết dư thừa và chatbox AI, quy tụ tuyệt đối vào 2 trụ cột cốt lõi: 1) Lịch Vạn Niên đầy đủ các yếu tố cấu thành và cát hung; 2) Lập Quẻ Kỳ Môn (luận Không - Thời Gian) và Lục Nhâm (luận Quá Trình Thành Bại).',
    isLatest: true,
    highlights: [
      'Trụ cột 1 - Lịch Vạn Niên Chuẩn Hóa Toàn Diện: Trực quan hóa đầy đủ các yếu tố cấu thành lịch vạn niên gồm Dương lịch, Âm lịch, Tứ Trụ Can Chi, Tiết khí thiên văn, Thập Nhị Trực, Nhị Thập Bát Tú, Thần Sát Cát Tinh & Hung Tinh, Bảng 12 Canh Giờ Hoàng Đạo/Hắc Đạo, cùng Luận đoán Cát Hung (Nghi, Kỵ, Hướng xuất hành Hỷ Thần, Tài Thần, tránh Hạc Thần).',
      'Trụ cột 2 - Lập Quẻ Kỳ Môn Độn Giáp (Luận Bàn Không - Thời Gian): Khắc họa rõ nét 2 trục Không Gian (8 hướng phương vị, cung cát hung, thế Tọa - Hướng) và Thời Gian (thiên thời thời điểm hiện tại, vượng suy, Trực Phù, Trực Sử, quy luật Chủ - Khách động tĩnh).',
      'Trụ cột 2 - Lập Quẻ Đại Lục Nhâm (Luận Bàn Quá Trình Thành Bại): Đi sâu vào tiến trình 3 giai đoạn của Tam Truyền (Sơ Truyền khởi đầu, Trung Truyền diễn biến, Mạt Truyền quy túc định đoạt kết quả), đưa ra nhận định Thành hay Bại chung cuộc rõ ràng và phương án tối ưu.',
      'Dự Trắc Song Thức Hội Tụ: Tổng hợp hoàn hảo giữa Kỳ Môn (Thời khắc này nên làm gì, không nên làm gì, hướng nào thuận lợi, hướng nào không) và Lục Nhâm (lộ trình hành động tối ưu theo từng giai đoạn phát triển).',
      'Lược bỏ triệt để các phần lý thuyết dư thừa và hộp thoại AI chatbot để tối ưu hóa hiệu năng và mang lại trải nghiệm chuyên môn trực quan, tốc độ, tinh gọn.',
      'Cập nhật Mục 25 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Bảng chuyển đổi xem Toàn Bộ 12 Canh Giờ (Hoàng Đạo/Hắc Đạo) trong DailyCalendarView.',
      'Bộ hiển thị Thần Sát Cát Tinh & Hung Tinh chi tiết trong DailyCalendarView.',
      'Khối đánh giá Quá Trình Thành Bại 3 giai đoạn Tam Truyền trong LucNhamPanel.',
      'Các nút cầu nối trực tiếp giữa Lịch Vạn Niên và 2 phân hệ Lập Quẻ Kỳ Môn & Lục Nhâm.',
    ],
    improved: [
      'Cấu trúc điều hướng Header và App.tsx hoàn toàn quy tụ vào 2 trụ cột chính, loại bỏ các tab lý thuyết phụ.',
      'Giao diện và trải nghiệm tải nhanh, tập trung cao độ vào thực hành tra cứu lịch và lập quẻ dự trắc.',
    ],
    fixed: [
      'Đồng bộ hoàn hảo hướng xuất hành Cát/Kỵ giữa Lịch Vạn Niên và Bàn Kỳ Môn Độn Giáp.',
    ],
  },
  {
    version: '2.28.0',
    releaseDate: '2026-09-02',
    codename: 'Dự Trắc Song Thức: Kỳ Môn (Thời Điểm & 8 Hướng) & Lục Nhâm (3 Giai Đoạn) (Combined Ky Mon & Luc Nham Prognostication Engine)',
    tagline: 'Tái thiết phân hệ Dự Trắc Chuyên Sâu thành hệ thống dự trắc song thức đỉnh cao: Kỳ Môn Độn Giáp (đoán định thời điểm & cát hung 8 hướng) kết hợp Đại Lục Nhâm (tiến trình 3 giai đoạn Tam Truyền) và tổng hợp tư vấn NÊN/KHÔNG NÊN LÀM cùng phương án tối ưu.',
    isLatest: false,
    highlights: [
      'Dự trắc theo Kỳ Môn Độn Giáp: Đưa ra lời dự đoán chuẩn xác thời điểm đang hiển thị Cát Hung thế nào (điểm số 0-100, phán từ, Bát Môn Trực Sử, Cửu Tinh Trực Phù, Cách Cục đặc biệt), Cát Hung của tất cả 8 hướng phương vị và thời điểm này phù hợp làm gì.',
      'Dự trắc theo Đại Lục Nhâm (3 Giai Đoạn Tam Truyền): Phân tích tiến trình sự việc qua 3 mắt xích thời gian: Sơ Truyền (Khởi đầu/Phát đoan), Trung Truyền (Diễn biến/Di dời), Mạt Truyền (Kết quả/Quy túc), cùng luận giải 6 lĩnh vực nhân sinh.',
      'Tổng hợp Song Thức Đỉnh Cao: Hội tụ tri thức Không Gian (Kỳ Môn) và Thời Gian (Lục Nhâm) để trả lời dứt khoát 3 câu hỏi lớn: "Thời khắc này NÊN LÀM GÌ?", "Thời khắc này KHÔNG NÊN LÀM GÌ?", và "HƯỚNG NÀO THUẬN LỢI, HƯỚNG NÀO BẤT LỢI?".',
      'Tư Vấn Phương Án Tốt Nhất (Master Strategy): Thiết lập chiến lược phối hợp hành động giữa phương vị xuất hành đón cát khí Kỳ Môn và lộ trình 3 bước chuẩn bị - ứng biến - thu hoạch của Lục Nhâm.',
      'Bảo tồn trọn vẹn 6 Chủ đề Cổ bản (Bí Kíp Toàn Thư): Hôn nhân, Y học trị bệnh, Cầu tài giao dịch, Thi cử công danh, Mất của tìm vật, Kiện tụng cùng Thân Mệnh và Tam Bàn Chủ Khách.',
      'Cập nhật Mục 24 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Mô-đun tổng hợp song thức `/src/astronomy/prognosticationCombined.ts`.',
      'Giao diện tái cấu trúc hoàn toàn `/src/components/KyMonPrognosticationView.tsx` với 4 tab chuyên sâu.',
      'Tính năng sao chép toàn văn bản dự trắc chuyên sâu song thức một chạm.',
    ],
    improved: [
      'Trải nghiệm người dùng trong phân hệ Dự Trắc Chuyên Sâu trở nên thực chiến, rõ ràng, cung cấp hành động cụ thể thay vì lý thuyết trừu tượng.',
    ],
    fixed: [
      'Đồng bộ hoàn hảo giữa dữ liệu Thiên văn Bát Tự, Nguyệt Tướng Lục Nhâm và Bàn Kỳ Môn 9 Cung.',
    ],
  },
  {
    version: '2.27.0',
    releaseDate: '2026-09-01',
    codename: 'Biểu Đồ Thống Kê Năng Lượng 9 Cung & Xu Hướng Cục Kỳ Môn Recharts (Ky Mon Energy Trends Analytics)',
    tagline: 'Tích hợp bộ biểu đồ thống kê trực quan hóa Recharts động học giúp theo dõi xu hướng năng lượng các Cung và sự biến đổi Cục Kỳ Môn theo 12 Canh Giờ và 30 Ngày.',
    isLatest: false,
    highlights: [
      'Tích hợp thư viện Recharts vào Kỳ Môn Độn Giáp: Cung cấp góc nhìn phân tích động học trực quan thay vì chỉ xem một thời điểm tĩnh.',
      'Biểu đồ Xu Hướng Năng Lượng 12 Canh Giờ (AreaChart & LineChart): Đánh giá điểm số cát hung (0-100) xuyên suốt 12 giờ Canh Chi (Tý đến Hợi) với bộ lọc xem từng Cung hoặc đường trung bình toàn Cục.',
      'Biểu đồ Radar Đa Chiều 9 Cung Lạc Thư (RadarChart): Trình diễn trực quan mức độ vượng suy của 9 phương vị bát quái (Khảm 1, Cấn 8, Chấn 3, Tốn 4, Ly 9, Khôn 2, Đoài 7, Càn 6, Trung 5).',
      'Biểu đồ Xu Hướng Biến Thiên Cục 30 Ngày: Theo dõi đồ thị năng lượng toàn tháng để hoạch định chiến lược dài hạn theo chu kỳ Tiết Khí và Âm/Dương Độn.',
      'Biểu đồ Phân Bổ Ngũ Hành Năng Lượng Cục (BarChart): Thống kê tỷ trọng ngũ hành Kim, Mộc, Thủy, Hỏa, Thổ tổng hòa từ Cung, Sao, Cửa và Can.',
      'Tương tác đồng bộ hai chiều (Interactive Time Sync): Nhấp vào bất kỳ điểm mốc giờ/ngày nào trên biểu đồ để tự động chuyển Bàn 9 Cung sang thời điểm đó.',
      'Chế độ xem linh hoạt trong Bàn Kỳ Môn: Chuyển đổi giữa 3 chế độ "Toàn Diện" (Song song Bàn 9 Cung & Biểu Đồ), "Bàn 9 Cung", và "Biểu Đồ Xu Hướng".',
      'Cập nhật Mục 23 trong Thuyết minh thuật toán (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Mô-đun phân tích timeline `/src/astronomy/kymonEnergyTimeline.ts`.',
      'Thành phần biểu đồ `/src/components/KyMonEnergyTrendsChart.tsx` sử dụng Recharts.',
      'Bộ chọn chế độ hiển thị Toàn Diện / Bàn 9 Cung / Biểu Đồ Xu Hướng trong `KyMonCompleteBoard.tsx`.',
    ],
    improved: [
      'Trải nghiệm quan sát và phân tích Cát Hung Kỳ Môn Độn Giáp nâng lên tầm cao mới với khả năng so sánh định lượng trực quan.',
    ],
    fixed: [
      'Đồng bộ trơn tru giữa việc chọn giờ trên biểu đồ và cập nhật thời gian thực của ứng dụng.',
    ],
  },
  {
    version: '2.26.1',
    releaseDate: '2026-09-01',
    codename: 'Tối Ưu Hóa Hiệu Năng Cao & Xử Lý Triệt Để Hiện Tượng Đơ Lag Chuyên Mục Trạch Cát (High Performance Almanac & Trạch Cát Turbo)',
    tagline: 'Tái cấu trúc và tối ưu hóa toàn diện thuật toán Lịch Vạn Niên & Trạch Cát, loại bỏ tính toán lặp dư thừa, tăng tốc độ xử lý hơn 100x và giải quyết triệt để hiện tượng đứng/đơ hình khi tra cứu Trạch Cát.',
    isLatest: false,
    highlights: [
      'Khắc phục triệt để hiện tượng đứng/đơ khi mở tab Trạch Cát: Thay thế việc gọi toàn bộ mô phỏng 1080 Cục Kỳ Môn/Lục Nhâm trong vòng lặp 30 ngày bằng hàm tính thiên văn độc lập siêu tốc (<0.1ms).',
      'Cơ chế Cache Thông Minh (In-memory Almanac Cache): Tự động lưu trữ kết quả tính toán ngày/giờ đã tra cứu, giúp chuyển đổi qua lại giữa các ngày, tháng và danh mục công việc đạt độ trễ 0ms (tức thời).',
      'Tối ưu hóa vòng đời React State trong TrachCatView: Tách biệt tính toán dữ liệu thô của 30 ngày trong tháng (chỉ chạy khi đổi tháng) và bước đánh giá dụng sự (chạy O(1) in-memory khi chọn việc), loại bỏ 100% re-render thừa.',
      'Rà soát và tinh gọn mã nguồn: Loại bỏ các import không sử dụng và các thao tác tính toán thiên văn trùng lặp giữa các mô-đun.',
    ],
    added: [
      'Hệ thống Cache `almanacCache` tăng tốc độ hiển thị Lịch Block Ngày và Danh sách Trạch Cát lên tức thì.',
    ],
    improved: [
      'Tốc độ tải danh sách 30 ngày Trạch Cát nhanh gấp 100x - 200x, mượt mà hoàn toàn trên cả thiết bị di động và máy tính.',
      'Tối ưu hóa khả năng phản hồi khi chuyển đổi giữa các tab và bộ lọc công việc.',
    ],
    fixed: [
      'Sửa lỗi UI bị đơ/treo CPU khi mở tab Trạch Cát hoặc chuyển đổi các loại công việc dụng sự.',
    ],
  },
  {
    version: '2.26.0',
    releaseDate: '2026-09-01',
    codename: 'Chuyên Mục Trạch Cát Toàn Thư "Hiệp Kỷ Biện Phương Thư" & Chuẩn Hóa Ngày Giờ Hoàng Đạo, 12 Trực (Hiệp Kỷ Date Selection & Almanac Precision)',
    tagline: 'Xây dựng chuyên mục Trạch Cát tuyển trạch ngày lành theo Khâm Định Hiệp Kỷ Biện Phương Thư (Tứ Khố Toàn Thư) và chuẩn hóa chính xác 100% Ngày Hoàng Đạo, Giờ Hoàng Đạo, 12 Trực và Bách Thần Sát trong Lịch Ngày Chi Tiết.',
    isLatest: false,
    highlights: [
      'Chuyên mục Trạch Cát Toàn Thư (TrachCatView.tsx): Khám phá hệ thống tuyển trạch ngày giờ hoàng triều do đại học sĩ Mai Cốc Thành chủ biên thời Càn Long.',
      'Công cụ Tuyển Trạch Dụng Sự Thông Minh: Tìm ngày đẹp nhất trong tháng cho 9+ nhóm việc trọng đại (Cưới hỏi, Động thổ, Khai trương, Giao dịch/Ký hợp đồng, Xuất hành, Nhậm chức, Cúng tế, Chữa bệnh, An táng) dựa trên 6 bậc biện chứng cát hung.',
      'Chuẩn hóa chính xác Ngày & Giờ Hoàng Đạo theo Hiệp Kỷ: Đối chiếu bảng lập thành Quyển 7 & 9, xác định chính xác tinh danh (Thanh Long, Minh Đường, Kim Quỹ, Bảo Quang, Ngọc Đường, Tư Mệnh...) cho từng giờ và ngày.',
      'Chuẩn hóa thuật toán 12 Trực Kiến - Trừ: Xác định chính xác vị trí Trực dựa theo Nguyệt Kiến của từng tháng âm lịch và Chi ngày.',
      'Hệ thống Bách Thần Sát: Phân tích đầy đủ Cát thần (Thiên Đức, Nguyệt Đức, Thiên Đức Hợp, Nguyệt Đức Hợp, Thiên Xá, Thiên Ân, Thiên Nguyện, Âm Dương Bất Tương, Tam Hợp, Lục Hợp...) và Hung thần (Tuế Phá, Nguyệt Phá, Kiếp Sát, Tai Sát, Nguyệt Sát, Tứ Phế, Ngũ Hư, Vãng Vong...).',
      'Giờ Quý Đăng Thiên Môn & Tứ Đại Cát Thời: Tra cứu giờ tối thiện trong ngày theo 12 trung khí và nhật can, kèm cảnh báo giờ Ngũ Bất Ngộ và Triệt Lộ Không Vong.',
      'Đồng bộ cập nhật Mục 22 trong Thuyết minh thuật toán (AlgorithmGuideModal.tsx) và thêm tab "Trạch Cát Hiệp Kỷ" trên thanh Header.',
    ],
    added: [
      'Mô-đun `trachCatEngine.ts` với đầy đủ công thức, bảng tra cứu và 6 bậc biện chứng cát hung của Khâm Định Hiệp Kỷ Biện Phương Thư.',
      'Thành phần `TrachCatView.tsx` với 4 tab: Tìm Ngày Đẹp Theo Việc, Biện Chứng Cát Hung Ngày, Giờ Hoàng Đạo & Quý Đăng Thiên Môn, Cẩm Nang 13 Quyển.',
    ],
    improved: [
      'Tích hợp bảng Thần sát, Việc Nên Làm (Nghi) & Việc Kỵ vào `DailyCalendarView.tsx` (Lịch Ngày Chi Tiết).',
      'Đồng bộ chuyển đổi 1 chạm giữa Lịch Block Ngày và Chuyên mục Trạch Cát.',
    ],
  },
  {
    version: '2.25.0',
    releaseDate: '2026-09-01',
    codename: 'Bổ Sung Trang Lịch Ngày Vạn Niên Block Chi Tiết & Tra Cứu Điểm Sóc Nhanh (Dedicated Daily Block Almanac & New Moon Navigator)',
    tagline: 'Mở trang giao diện lịch block ngày truyền thống chuyên sâu khi chọn bất kỳ ngày nào trong bảng lịch tra cứu nhanh điểm sóc âm lịch.',
    isLatest: false,
    highlights: [
      'Giao diện Lịch Ngày Chi Tiết (Lịch Block Truyền Thống Việt Nam): Thiết kế chuẩn khối lịch đỏ son thượng lưu kết hợp nền hoàng đạo cổ kính.',
      'Đầy đủ thông tin thiên văn & cổ học: Ngày Dương, Thứ trong tuần, Ngày & Tháng Âm lịch, Can Chi Năm - Tháng - Ngày - Giờ, Tiết khí thiên văn chính xác, Ngày Hoàng Đạo / Hắc Đạo kèm tinh danh (Thanh Long, Minh Đường, Kim Quỹ...).',
      'Bảng 6 Giờ Hoàng Đạo trong ngày: Liệt kê chi tiết 6 khung giờ cát lợi kèm Can Chi và khoảng giờ cụ thể.',
      'Phong thủy Trực & Tú & Xuất Hành: Hiển thị 12 Trực ngày, 28 Nhị thập bát tú, Hướng xuất hành đón Hỷ Thần, Tài Thần, Hạc Thần.',
      'Sự kiện lịch sử & Danh ngôn triết lý: Tích hợp sự kiện lịch sử kỷ niệm theo ngày và danh ngôn truyền cảm hứng.',
      'Tương tác điều hướng thông minh: Thanh chọn nhanh Ngày - Tháng - Năm (1900..2100) + nút "Xem", bước nhảy tháng `<` `>` và lật ngày Hôm qua / Hôm nay / Ngày mai tiện lợi.',
      'Liên kết trực tiếp: Dễ dàng chuyển tiếp 1 chạm sang Lập Bàn Kỳ Môn Giờ Này hoặc Xem Điểm Sóc Âm Lịch.',
    ],
    added: [
      'Thành phần `DailyCalendarView.tsx` và mô-đun tính toán `dailyAlmanac.ts` cung cấp toàn diện tri thức Lịch Vạn Niên Block.',
      'Tab điều hướng `Lịch Ngày Chi Tiết` trên thanh Header và liên kết mở tự động từ bảng MiniCalendar trong nhóm Điểm Sóc Âm Lịch.',
    ],
    improved: [
      'Tối ưu hóa bảng lịch tra cứu nhanh (MiniCalendar): Hỗ trợ nhấp vào ô ngày để mở ngay trang lịch block chuyên sâu.',
      'Giao diện tương thích hoàn hảo trên cả điện thoại di động và máy tính bảng/máy tính bàn.',
    ],
  },
  {
    version: '2.24.4',
    releaseDate: '2026-08-31',
    codename: 'Hoàn Thiện Tự Động Luân Chuyển Mô Hình AI Ngầm & Tối Giản Giao Diện Chat (Seamless Background AI Routing & Streamlined Chat UI)',
    tagline: 'Tự động luân chuyển mô hình AI ngầm 100%, khắc phục triệt để lỗi giới hạn mảng OpenRouter, loại bỏ dropdown thủ công và hiển thị rõ ràng mô hình phục vụ trong từng câu trả lời.',
    isLatest: false,
    highlights: [
      'Khắc phục triệt để lỗi OpenRouter "models array must have 3 items or fewer": Xử lý chuỗi luân chuyển dự phòng tuần tự thông minh giữa các mô hình (Gemini 2.5 Flash, Gemini 2.5 Flash Lite, DeepSeek V3, GPT-4o Mini, DeepSeek R1, Claude 3.7).',
      'Tự động hóa hoàn toàn (100% Seamless Background Routing): Người dùng không cần phải chọn mô hình thủ công, hệ thống tự động xử lý và điều phối ngầm.',
      'Giao diện Chat tối giản & tinh tế: Loại bỏ hoàn toàn thanh dropdown chọn mô hình thủ công rườm rà ở Header, giúp Header thoáng đãng và tối ưu trải nghiệm trên mọi thiết bị.',
      'Hiển thị minh bạch mô hình phục vụ: Mỗi câu trả lời của AI đều gắn nhãn rõ ràng mô hình AI đã hoàn thành luận giải (kèm biểu tượng ✨/⚡ khi có luân chuyển ngầm).',
      'Đồng bộ cập nhật Mục 19 trong Thuyết minh thuật toán & nguyên lý (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Huy hiệu hiển thị mô hình AI phục vụ rõ ràng trên đầu mỗi bong bóng tin nhắn của AI Master.',
    ],
    improved: [
      'Header khung chat gọn nhẹ, thoáng đãng, không còn thanh dropdown rườm rà.',
      'Thuật toán fallback ngầm luân chuyển tức thì qua các mô hình chất lượng cao khi gặp sự cố 429, 402 hoặc 503.',
    ],
    fixed: [
      'Sửa lỗi OpenRouter API trả về thông báo lỗi "models array must have 3 items or fewer" khi ở chế độ Tự Động.',
    ],
  },
  {
    version: '2.24.3',
    releaseDate: '2026-08-31',
    codename: 'Tự Động Luân Chuyển & Dự Phòng Mô Hình AI Thông Minh (Smart Auto-Fallback Multi-Model Routing)',
    tagline: 'Tự động chọn và luân chuyển mô hình AI tối ưu (Gemini 2.5 Flash, Flash Lite, DeepSeek V3, GPT-4o Mini, DeepSeek R1, Claude 3.7) khi một mô hình hết dung lượng, quota hoặc quá tải.',
    isLatest: false,
    highlights: [
      'Chế độ "✨ Tự Động (Auto Fallback)" thông minh làm mặc định: Hệ thống tự động ưu tiên mô hình tối ưu nhất và tự động chuyển sang các mô hình dự phòng kế tiếp nếu gặp lỗi 429 (hết quota/rate limit), 402 (hết credits) hay 503 (quá tải).',
      'Định tuyến kép (Dual-Layer Fallback Architecture): Hỗ trợ cơ chế dự phòng đa tầng trên cả Endpoint Express Server Proxy (/api/chat) lẫn Direct Client Call qua OpenRouter models API.',
      'Hiển thị minh bạch mô hình đang xử lý: Khung chat phản hồi rõ ràng mô hình AI đã hoàn thành luận giải (kèm biểu tượng ⚡/✨ khi đã tự động chuyển tiếp dự phòng mượt mà).',
      'Đồng bộ cập nhật Mục 19 trong Thuyết minh thuật toán & nguyên lý (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Tùy chọn "✨ Tự Động (Auto Fallback)" làm chế độ mặc định trong danh sách chọn mô hình AI.',
      'Chuỗi dự phòng đa mô hình: Gemini 2.5 Flash ➔ Gemini 2.5 Flash Lite ➔ DeepSeek V3 ➔ GPT-4o Mini ➔ DeepSeek R1 ➔ Claude 3.7 Sonnet.',
    ],
    improved: [
      'Trải nghiệm người dùng liền mạch 100%: Người dùng không cần phải tự thao tác chuyển đổi mô hình thủ công khi một mô hình AI bất kỳ bị nghẽn mạng hoặc hết dung lượng.',
    ],
    fixed: [
      'Khắc phục tình trạng gián đoạn câu trả lời hoặc báo lỗi khi mô hình AI được chọn đạt ngưỡng giới hạn tốc độ (rate limit / capacity).',
    ],
  },
  {
    version: '2.24.2',
    releaseDate: '2026-08-30',
    codename: 'Tối Ưu Mobile AI Chatbot & Hoàn Thiện Tra Cứu Lịch Điểm Sóc (Mobile AI Chat Responsive & Enhanced Solar-Lunar Year Selector)',
    tagline: 'Sửa triệt để lỗi vỡ giao diện và mất nút đóng (X) khung chat AI trên điện thoại di động; khắc phục hoàn toàn ô chọn năm trong Lịch Tra Cứu Nhanh và Bảng 24 Tiết Khí với dropdown 1900-2100.',
    isLatest: false,
    highlights: [
      'Tối ưu hoàn hảo giao diện AI Chatbot Modal trên thiết bị di động (Mobile Responsive): Tái cấu trúc Header 2 tầng thông minh, không bị vỡ cột dọc tiêu đề, nút Đóng (X) luôn cố định to rõ ở góc trên bên phải.',
      'Khắc phục triệt để lỗi kẹt ô chọn năm trong Lịch Tra Cứu Nhanh (MiniCalendar) của mục Điểm Sóc Âm Lịch: Thay thế bằng thẻ dropdown select đầy đủ các năm từ 1900 đến 2100 kèm các nút lùi/tiến ngày và tháng siêu mượt.',
      'Đồng bộ cải tiến bộ chọn năm trong Bảng 24 Tiết Khí (YearTermsTable) với danh sách chọn năm linh hoạt từ 1900 đến 2100.',
      'Đồng bộ Mục 19 trong Thuyết minh thuật toán & nguyên lý (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Giao diện Header Mobile chuyên dụng cho AI Chatbot Modal với thanh Model Selector độc lập bên dưới.',
      'Thẻ select chọn năm thông minh từ năm 1900 đến 2100 cho Lịch Tra Cứu Nhanh (MiniCalendar) và Bảng 24 Tiết Khí.',
    ],
    improved: [
      'Trải nghiệm người dùng trên điện thoại di động: Khung chat AI hiển thị cân đối, thao tác đóng/mở mượt mà, chọn năm âm lịch và tiết khí tức thì.',
    ],
    fixed: [
      'Khắc phục lỗi tiêu đề AI Chatbot bị ngắt từng chữ và nút đóng (X) bị tràn ra ngoài màn hình trên thiết bị di động.',
      'Khắc phục lỗi ô input năm trong Lịch Tra Cứu Nhanh không thể xóa hoặc gõ năm khác do điều kiện chặn số.',
    ],
  },
  {
    version: '2.24.1',
    releaseDate: '2026-08-30',
    codename: 'Tối Ưu AI Chatbot: Trả Lời Trực Diện & Gợi Ý 1 Chạm Tự Nhiên (Direct Answer & 1-Touch Action Chips)',
    tagline: 'Loại bỏ tiêu đề dẫn chuyện rườm rà trong văn bản phản hồi, giữ lại câu trả lời sắc bén, ngắn gọn và tích hợp hệ thống nút bấm Gợi Ý 1 Chạm trực quan hỏi tiếp theo.',
    isLatest: false,
    highlights: [
      'Loại bỏ các tiêu đề dẫn chuyện dài dòng trong nội dung văn bản markdown của AI, giúp câu trả lời cực kỳ tinh gọn và chuyên nghiệp.',
      'Tự động phân tách nội dung và bóc tách các câu hỏi gợi ý thành cụm nút bấm "Gợi Ý 1 Chạm" ngay dưới câu trả lời.',
      'Bộ câu hỏi gợi ý hành động tự nhiên ("Bạn muốn biết gì thêm hoặc muốn làm gì tiếp theo?") mở rộng sâu vào các khía cạnh cổ thuật.',
      'Đồng bộ Mục 19 trong Thuyết minh thuật toán (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Bộ phân tách `parseMessageContent` tách biệt hoàn toàn nội dung luận giải và danh sách gợi ý 1 chạm.',
      'Giao diện Interactive 1-Touch Action Chips với tiêu đề thân thiện "Bạn muốn biết gì thêm hoặc muốn làm gì tiếp theo?".',
    ],
    improved: [
      'Tối ưu hóa trải nghiệm đọc quẻ: Không bị lặp văn bản hay tiêu đề cồng kềnh, tương tác 1 chạm siêu nhanh.',
    ],
  },
  {
    version: '2.24.0',
    releaseDate: '2026-08-30',
    codename: 'Tối Ưu AI Chatbot: Phản Hồi Trực Diện & Dẫn Chuyện Chuyên Môn Sâu (Concise & Deep Narrative AI)',
    tagline: 'Tái cấu trúc phản hồi của AI Chatbot theo tiêu chí ngắn gọn, sắc bén, đi thẳng vào trọng tâm câu hỏi, đồng thời tự động đề xuất các câu hỏi dẫn chuyện chuyên môn tương tác 1-nhấp chuột.',
    isLatest: false,
    highlights: [
      'Cấu hình System Prompt chuẩn mực 3 phần: 1. Kết Luận Trực Diện (Cát/Hung trong 1-2 câu), 2. Căn Cứ Quẻ Then Chốt (trích xuất 2-3 dữ liệu Dụng Thần cốt lõi), 3. Lời Khuyên Hành Động cụ thể.',
      'Loại bỏ triệt để các câu chào xã giao và giải thích lý thuyết rườm rà, tập trung giải quyết chính xác bài toán của người dùng.',
      'Tự động bổ sung mục "Gợi ý mở rộng chuyên môn & Dẫn chuyện tiếp theo" ở cuối mỗi câu trả lời, liên kết sang các khía cạnh chuyên sâu (Pháp lý Cảnh Môn, Tiến độ Tam Truyền, Thế trận Chủ/Khách, Phong thủy thực địa).',
      'Tính năng Interactive Follow-Up Chips: Bóc tách gợi ý dẫn chuyện thành các nút bấm hành động ngay trong tin nhắn của AI, cho phép người dùng đào sâu vấn đề chỉ với một cú nhấp.',
      'Cập nhật bộ câu hỏi mẫu nhanh (Quick Prompts) định hướng thẳng vào kết quả chiêm đoán và giải pháp thực thi.',
      'Đồng bộ Mục 19 trong Thuyết minh thuật toán (AlgorithmGuideModal.tsx).',
    ],
    added: [
      'Trình trích xuất gợi ý dẫn chuyện `extractFollowUpSuggestions` tự động nhận diện danh sách câu hỏi mở rộng.',
      'Giao diện Interactive Follow-up Action Chips trong khung tin nhắn trợ lý AI.',
    ],
    improved: [
      'Tối ưu hóa độ dài phản hồi AI (~150-300 từ) giúp người dùng nắm bắt thông tin quẻ ngay lập tức.',
      'Tăng tính liền mạch và dẫn dắt tư duy người dùng đi sâu vào các khía cạnh chuyên môn của Cổ Tam Thức.',
    ],
  },
  {
    version: '2.23.0',
    releaseDate: '2026-08-30',
    codename: 'Trải Nghiệm Khởi Động & Tour Hướng Dẫn Đọc Bàn Kỳ Môn Toàn Diện (Interactive Onboarding Tour)',
    tagline: 'Ra mắt tính năng Onboarding Tour 7 bước tương tác trực quan cho người dùng mới, giải thích tường tận cách đọc bàn Kỳ Môn 9 Cung (Tam Bàn, Bát Thần, Cửu Tinh, Bát Môn, Thập Can) và cách khai thác các công cụ chính.',
    isLatest: false,
    highlights: [
      'Tự động kích hoạt Tour Hướng Dẫn Trải Nghiệm Nhanh (Onboarding Tour) 7 bước khi người dùng truy cập lần đầu.',
      'Sơ đồ giải phẫu Cung Kỳ Môn trực quan: Thần Bàn (Bát Thần), Thiên Bàn (Cửu Tinh), Nhân Bàn (Bát Môn), Địa Bàn Can Khắc Ứng, Tuần Không và Mã Tinh.',
      'Hướng dẫn nguyên lý quyết đoán Chủ - Khách & Cung Trực Phù - Trực Sử giúp định hình chiến lược đàm phán, hành động.',
      'Giải thích thanh công cụ trạng thái thiên văn thời gian thực (Live vs Time Picker), chế độ tự chọn Cục chiêm quẻ.',
      'Giới thiệu hệ thống Dự trắc 6 chủ đề đời sống, Đại Lục Nhâm Tam Thức và Trợ lý AI Luận Giải Cổ Thuật.',
      'Hỗ trợ điều hướng bàn phím (Phím mũi tên Trái / Phải, phím ESC), thanh tiến trình sinh động và lưu trạng thái đã xem vào localStorage.',
      'Nút "Tour Hướng Dẫn" chuyên dụng trên thanh Header và chân trang giúp xem lại toàn bộ cẩm nang bất cứ lúc nào.',
    ],
    added: [
      'Thành phần `OnboardingTourModal` (`src/components/OnboardingTourModal.tsx`) với 7 bước hướng dẫn sinh động, minh họa đồ họa sắc nét.',
      'Nút kích hoạt Tour trên thanh điều hướng Header (`#btn-open-onboarding-tour`, `#btn-header-mobile-tour`) và chân trang Footer.',
      'Mục thuyết minh Mục 20 trong `AlgorithmGuideModal.tsx` giải trình chi tiết quy trình Onboarding và kiến trúc đọc quẻ.',
      'Bộ nhớ cục bộ `kymon_has_completed_onboarding_tour_v2` lưu trạng thái người dùng.',
    ],
    improved: [
      'Nâng cao tối đa tính thân thiện cho người dùng mới khi tiếp cận Cổ Tam Thức và Kỳ Môn Độn Giáp.',
      'Tối ưu khả năng tương tác phím và chuyển đổi chế độ xem nhanh chóng.',
    ],
  },
  {
    version: '2.22.1',
    releaseDate: '2026-08-30',
    codename: 'Tối Ưu Giao Diện & Vị Trí Cung Cấp OpenRouter API Key Trực Quan Cho AI Chatbot',
    tagline: 'Hiển thị vị trí nhập OpenRouter API Key rõ ràng, dễ nhận thấy nhất ngay trước khi sử dụng Chatbot AI với thẻ hướng dẫn 3 bước trực quan và liên kết lấy Key miễn phí.',
    isLatest: false,
    highlights: [
      'Bổ sung thẻ thiết lập OpenRouter API Key nổi bật và trực quan ngay trên cùng cửa sổ AI Chatbot trước khi bắt đầu trò chuyện.',
      'Cung cấp huy hiệu trạng thái API Key trên thanh tiêu đề (Top Bar) với hiệu ứng nhấp nháy thu hút sự chú ý khi chưa nhập Key.',
      'Tích hợp hướng dẫn 3 bước lấy Key nhanh chóng cùng nút liên kết trực tiếp đến trang tạo API Key miễn phí của OpenRouter.ai.',
      'Bổ sung nút ẩn/hiện mã khóa (Eye/EyeOff), nút lưu & kích hoạt nhanh, nút xóa key và thông báo lưu thành công.',
      'Tự động mở và làm nổi bật ô nhập API Key khi người dùng nhấn vào các câu hỏi gợi ý hoặc bấm gửi tin nhắn mà chưa cấu hình Key.',
      'Cam kết bảo mật 100% với việc lưu trữ khóa API cục bộ trên trình duyệt (localStorage), không lưu trữ vào kho mã nguồn git.',
    ],
    added: [
      'Thẻ thiết lập OpenRouter API Key chuyên dụng (`openrouter-api-key-setup-card`) trong `src/components/AIChatbotModal.tsx`.',
      'Huy hiệu và nút trạng thái API Key động trên thanh tiêu đề của Chatbot.',
      'Nút chuyển đổi ẩn/hiện mật khẩu và cơ chế tự động focus vào ô nhập key khi cần.',
      'Thông báo nhắc nhở nhập key trực tiếp tại màn hình chào đón (Welcome Screen).',
    ],
    improved: [
      'Nâng cao trải nghiệm người dùng, giúp người sử dụng dễ dàng nhận biết và cung cấp API Key để trò chuyện với AI mà không gặp khó khăn.',
      'Thông báo lỗi và phản hồi tức thì khi thao tác với các mô hình suy luận cổ thuật.',
    ],
  },
  {
    version: '2.22.0',
    releaseDate: '2026-08-30',
    codename: 'Tích Hợp Trợ Lý AI Luận Giải Cổ Thuật Toàn Năng (OpenRouter Multi-Model Metaphysics Advisor)',
    tagline: 'Tích hợp Trợ Lý AI Luận Giải Cổ Thuật với ngữ cảnh trận bàn tự động (Bát Tự, Kỳ Môn 9 Cung, Đại Lục Nhâm, Điểm Sóc, 24 Tiết Khí) qua OpenRouter API.',
    isLatest: false,
    highlights: [
      'Tích hợp Trợ Lý AI Luận Giải Cổ Thuật thông minh (AIChatbotModal) hỗ trợ giải đáp mọi phương diện đời sống, thuật toán thiên văn và luận đoán quẻ dịch.',
      'Tự động trích xuất và nạp ngữ cảnh thời gian thực (Bát Tự 4 Trụ, 24 Tiết Khí, Điểm Sóc Âm Lịch, Bàn Kỳ Môn 9 Cung và Bàn Đại Lục Nhâm) vào System Prompt của AI.',
      'Hỗ trợ đa dạng các mô hình ngôn ngữ lớn (LLMs) tiên tiến: Gemini 2.5 Flash, DeepSeek V3 / R1 (Suy luận chuyên sâu), Claude 3.5 Sonnet, GPT-4o Mini qua OpenRouter API.',
      'Cung cấp Widget nút bấm nổi (Floating Action Button) và nút bấm trên thanh Header để mở AI Luận Giải tức thì từ bất kỳ màn hình nào.',
      'Bổ sung bảng gợi ý câu hỏi nhanh (Quick Prompts) cho 6 chủ đề: Thân Mệnh, Tài Vận, Hôn Nhân, Sức Khỏe, Công Danh, Kỳ Môn & Lục Nhâm.',
      'Lưu trữ lịch sử hội thoại an toàn trong sessionStorage và hỗ trợ tùy biến API Key cá nhân trong localStorage.',
    ],
    added: [
      'Backend proxy endpoint `/api/chat` trong server.ts hỗ trợ giao tiếp OpenRouter an toàn.',
      'Tầng dịch vụ AI Metaphysics Service (`src/services/aiChatService.ts`) với công cụ tạo System Prompt chuyên sâu.',
      'Giao diện Chatbot đối thoại đa mô hình (`src/components/AIChatbotModal.tsx`).',
      'Nút bấm nổi thông minh (`src/components/AIChatbotFloatingButton.tsx`).',
      'Mục 19 trong Thuyết Minh Thuật Toán (`src/components/AlgorithmGuideModal.tsx`).',
    ],
    improved: [
      'Tối ưu hóa khả năng hiểu và phân tích tương tác ngũ hành, sinh khắc, cát hung giữa các cung Kỳ Môn và tam truyền Lục Nhâm nhờ năng lực suy luận của AI.',
      'Đảm bảo bảo mật toàn diện cho người dùng khi thực thi qua proxy hoặc khóa API cá nhân.',
    ],
  },
  {
    version: '2.21.0',
    releaseDate: '2026-08-29',
    codename: 'Phục Hồi Điều Hướng Bàn Kỳ Môn & Đại Lục Nhâm Từ Cẩm Nang Tri Thức',
    tagline: 'Duy trì thanh Menu tinh gọn 4 Tab (Cẩm Nang, Điểm Sóc, Dự Trắc, Tiết Khí) đồng thời giữ trọn vẹn nội dung Bàn Kỳ Môn 9 Cung & Bàn Đại Lục Nhâm với hệ thống liên kết điều hướng 2 chiều từ Cẩm Nang Tri Thức.',
    isLatest: false,
    highlights: [
      'Giữ lại trọn vẹn toàn bộ giao diện và công cụ quẻ Bàn Kỳ Môn 9 Cung (3x3) và Bàn Đại Lục Nhâm (Tam Truyền & Tứ Khoa).',
      'Tích hợp các nút hành động nhanh (Quick Action Buttons) tại đầu trang và chân trang Cẩm Nang Tri Thức để chuyển tức thì sang Bàn Kỳ Môn và Đại Lục Nhâm.',
      'Bổ sung các thẻ liên kết trực tiếp bên trong Mục 6 (Kỳ Môn Độn Giáp) và Mục 7 (Đại Lục Nhâm) của Cẩm Nang.',
      'Thiết lập hệ thống điều hướng hai chiều liền mạch (nút Quay Lại Cẩm Nang, Chuyển Sang Lục Nhâm, Chuyển Sang Kỳ Môn, và Mở Dự Trắc Chuyên Sâu) trên mọi màn hình.',
    ],
    added: [
      'Nút chuyển hướng trực tiếp đến Bàn Kỳ Môn 9 Cung và Bàn Đại Lục Nhâm trong Cẩm Nang Tri Thức.',
      'Thanh điều hướng chân trang đa chiều giữa các công cụ Cổ Tam Thức.',
    ],
    improved: [
      'Đảm bảo thanh Menu chính luôn tinh gọn tối ưu 4 Tab mà người dùng vẫn có thể khám phá chi tiết toàn bộ bàn cờ Lạc Thư và Lục Nhâm bất kỳ lúc nào.',
    ],
  },
  {
    version: '2.20.0',
    releaseDate: '2026-08-29',
    codename: 'Tinh Gọn Menu 4 Tab Trọng Tâm & Dời Điểm Sóc Lên Vị Trí Thứ 2',
    tagline: 'Tinh giản thanh menu thành 4 tab trọng tâm: Cẩm Nang Tri Thức (1), Điểm Sóc & Âm Lịch (2), Dự Trắc Chuyên Sâu (3), 24 Tiết Khí Năm (4); loại bỏ các tab trùng lặp.',
    isLatest: false,
    highlights: [
      'Tinh giản cấu trúc thanh Menu thành 4 Tab duy nhất: Cẩm Nang Tri Thức → Điểm Sóc & Âm Lịch → Dự Trắc Chuyên Sâu → 24 Tiết Khí Năm.',
      'Dời tab "Điểm Sóc & Âm Lịch" từ vị trí cuối cùng lên nằm ở vị trí thứ 2 ngay sau Cẩm Nang Tri Thức.',
      'Loại bỏ 4 tab trùng lặp/dư thừa khỏi menu chính: Kỳ Môn Độn Giáp, Đại Lục Nhâm, Tổng Quan & Luận Cục, Bát Quái & 9 Cung.',
      'Đồng bộ hóa toàn bộ liên kết điều hướng và nút chuyển trang trên giao diện.',
    ],
    added: [
      'Cấu trúc điều hướng 4 Tab trọng tâm, mạch lạc và tối ưu không gian trải nghiệm.',
    ],
    improved: [
      'Lược bỏ hoàn toàn sự phân mảnh và trùng lặp dữ liệu giữa các tab con.',
      'Nâng cao tính liền mạch khi khảo sát thiên văn âm lịch và luận quẻ.',
    ],
  },
  {
    version: '2.19.0',
    releaseDate: '2026-08-29',
    codename: 'Chuẩn Hóa Quy Chuẩn Thiên Văn Định Tháng & Tối Giản Nhóm Điểm Sóc',
    tagline: 'Cập nhật nội dung Quy Chuẩn Thiên Văn Định Tháng Âm Lịch theo thuật toán chuẩn Mốc Đông Chí (270°) = Tháng 11 & Vô Trung Khí Pháp; lược bỏ các khối thông tin trùng lặp với bảng danh sách tháng âm lịch.',
    isLatest: false,
    highlights: [
      'Chuẩn hóa thẻ "Quy Chuẩn Thiên Văn Định Tháng Âm Lịch & Xác Định Tháng Nhuận": Trình bày trực quan 4 nguyên tắc thiên văn cốt lõi (Mốc cứng Đông Chí = Tháng 11, Đếm số tháng 12/13, Vô Trung Khí Pháp, Lan tỏa số thứ tự tháng).',
      'Lược bỏ các thành phần trùng lặp: Loại bỏ khối Tiết Khí Trong Tháng Này và Hai Thẻ Điểm Sóc Trước/Sau do toàn bộ thông tin này đã được tích hợp đầy đủ, chi tiết trong Bảng Danh Sách 12/13 Tháng Âm Lịch.',
      'Giao diện gọn gàng, liền mạch: Nhóm Điểm Sóc & Âm Lịch đạt độ tinh giản tối đa, tập trung vào Bảng Tra Cứu Toàn Bộ Tháng và Cơ Chế Thiên Văn Học.',
    ],
    added: [
      'Giao diện 4 thẻ nguyên lý thiên văn định tháng âm lịch và xác định tháng nhuận trực quan, mạch lạc.',
    ],
    improved: [
      'Loại bỏ dữ liệu dư thừa, tránh lặp lại thông tin điểm Sóc và tiết khí đơn lẻ.',
      'Tối ưu hóa không gian hiển thị của nhóm Điểm Sóc Âm Lịch.',
    ],
  },
  {
    version: '2.18.0',
    releaseDate: '2026-08-29',
    codename: 'Dời Lịch Tra Cứu Nhanh Sang Nhóm Điểm Sóc & Âm Lịch',
    tagline: 'Tái cấu trúc bố cục: Di chuyển Lịch Tra Cứu Nhanh (MiniCalendar) từ thẻ Tổng Quan sang nhóm Điểm Sóc & Âm Lịch để tối ưu thao tác tra cứu tuần trăng, 4 pha Mặt Trăng và tháng âm lịch.',
    isLatest: false,
    highlights: [
      'Dời hoàn toàn component Lịch Tra Cứu Nhanh (MiniCalendar) từ Tổng Quan Luận Cục sang nhóm Điểm Sóc & Âm Lịch Thiên Văn.',
      'Tối ưu giao diện Tổng Quan: Thẻ Tiết Khí Đương Lệnh mở rộng toàn chiều rộng, hiển thị thông thoáng và tập trung vào các kết quả cốt lõi.',
      'Tương tác trực quan trong nhóm Âm Lịch: Người dùng có thể chọn nhanh ngày bất kỳ trên Lịch Tra Cứu Nhanh để theo dõi tức thì sự thay đổi của tuần trăng, 4 pha trăng và danh sách 12/13 tháng âm lịch.',
      'Đồng bộ thuyết minh thuật toán tại Mục 5 trong AlgorithmGuideModal.',
    ],
    added: [
      'Tích hợp MiniCalendar trực tiếp vào giao diện Điểm Sóc & Âm Lịch (LunarNewMoonSection).',
    ],
    improved: [
      'Tối ưu trải nghiệm tra cứu âm lịch và tuần trăng theo ngày dương lịch được chọn trực tiếp.',
      'Bố cục giao diện Tổng Quan mạch lạc, gọn gàng và thẩm mỹ cao.',
    ],
  },
  {
    version: '2.17.0',
    releaseDate: '2026-08-29',
    codename: 'Chuẩn Hóa Thuật Toán Xác Định Tháng Nhuận & Chu Kỳ 13 Tháng Mốc Đông Chí',
    tagline: 'Áp dụng quy tắc thiên văn cổ điển: Gán cứng tháng chứa Đông Chí = Tháng 11, đếm số tháng giữa 2 lần Đông Chí liên tiếp để xác định năm 13 tháng, tìm tháng Vô Trung Khí làm Tháng Nhuận và lan tỏa số thứ tự tháng sang hai phía.',
    isLatest: false,
    highlights: [
      'Gán cứng tháng âm lịch (khoảng giữa 2 điểm Sóc) chứa thời khắc Đông Chí (270°) cố định là Tháng 11 Âm Lịch.',
      'Đếm số tháng giữa 2 điểm Đông Chí liên tiếp của năm trước và năm đang xét (12 tháng = năm thường, 13 tháng = năm nhuận).',
      'Xác định tháng Vô Trung Khí đầu tiên giữa 2 lần Đông Chí làm Tháng Nhuận lặp lại số hiệu của tháng liền trước.',
      'Lan tỏa số thứ tự các tháng từ mốc Tháng 11 sang hai phía: tiến đến Tháng 12, Tháng Giêng, Tháng 2... và lùi về Tháng 10, Tháng 9...',
      'Xác lập chu kỳ trọn vẹn của Năm Âm Lịch (Can Chi) từ Tháng 1 (Giêng) đến Tháng 12 (Chạp) gồm đủ 12 hoặc 13 tháng.',
      'Đồng bộ hóa toàn diện Mục 5 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Thuật toán gán cứng mốc Đông Chí = Tháng 11 và lan tỏa hai phía trong lunarCalendar.ts.',
      'Cơ chế phân định 13 tháng và quét tháng Vô Trung Khí chính xác theo chu kỳ Đông Chí liên tiếp.',
    ],
    improved: [
      'Độ chính xác thiên văn tuyệt đối cho việc phân định tháng nhuận và chu kỳ các năm âm lịch qua hàng ngàn năm.',
      'Thuyết minh thuật toán trực quan, dễ hiểu trong Modal Thuyết Minh.',
    ],
  },
  {
    version: '2.16.1',
    releaseDate: '2026-08-29',
    codename: 'Tọa Độ Ngày Giờ Dương Lịch Toàn Bộ 12 & 13 Tháng Âm Lịch',
    tagline: 'Hiển thị chi tiết thời gian Dương Lịch (Giờ:Phút:Giây, Ngày/Tháng/Năm UTC+7) bắt đầu từ Mùng 1 (Điểm Sóc) đến khi kết thúc tháng cho toàn bộ 12 hoặc 13 tháng âm lịch trong năm.',
    isLatest: false,
    highlights: [
      'Bổ sung chính xác thời gian Dương Lịch (Giờ:Phút:Giây, Ngày/Tháng/Năm) bắt đầu Mùng 1 (Điểm Sóc) và kết thúc tháng (Điểm Sóc kế) cho từng tháng trong 12 hoặc 13 tháng âm lịch.',
      'Tích hợp 2 chế độ hiển thị linh hoạt: Dạng Thẻ (Card Grid trực quan) và Dạng Bảng (Detailed Table View so sánh đa cột).',
      'Hiển thị danh sách Tiết Khí kèm mốc thời gian diễn ra trong từng tháng âm lịch.',
      'Nâng cấp thẻ tóm tắt Tháng Nhuận với đầy đủ giờ phút giây bắt đầu và kết thúc Dương lịch.',
      'Đồng bộ Section 5 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Bộ chuyển đổi giao diện Thẻ / Bảng (Card / Table View Mode) trong danh sách các tháng âm lịch.',
      'Hàm tiện ích formatVNTimeDetails xuất đầy đủ giờ phút giây và ngày tháng năm UTC+7.',
    ],
    improved: [
      'Bố cục trực quan, màu sắc tương phản cao giữa thời điểm khởi đầu Mùng 1 và kết thúc tháng.',
      'Trải nghiệm tra cứu lịch âm dương thiên văn chuẩn xác đến từng giây.',
    ],
  },
  {
    version: '2.16.0',
    releaseDate: '2026-08-29',
    codename: 'Chuyên Mục Tháng Nhuận & Chu Kỳ Năm Âm Lịch Thiên Văn',
    tagline: 'Bổ sung chuyên mục phân tích Tháng Nhuận Âm Lịch trong năm (nếu có), xác định năm nhuận/năm thường, thống kê 12 hoặc 13 tháng âm lịch, ngày bắt đầu/kết thúc và nguyên lý thiên văn Vô Trung Khí.',
    isLatest: false,
    highlights: [
      'Thuật toán thiên văn Vô Trung Khí Pháp tự động phân tích toàn bộ chu kỳ năm Âm lịch tương ứng với ngày tra cứu (cửa sổ 600 ngày).',
      'Xác định chính xác năm có tháng nhuận hay năm thường, tên tháng nhuận (ví dụ: Tháng 6 Nhuận), độ dài ngày (29 hay 30 ngày), ngày bắt đầu (Mùng 1) và ngày kết thúc.',
      'Hiển thị trạng thái tương tác trực quan: Hiện đang là tháng nhuận, Tháng nhuận sắp tới trong năm, hoặc Tháng nhuận đã qua.',
      'Bảng danh sách toàn bộ 12 hoặc 13 tháng trong năm âm lịch với chỉ dấu tháng hiện tại (glowing active badge) và tháng nhuận (amber badge).',
      'Thuyết minh nguyên lý chu kỳ Meton 19 năm và đồng bộ Section 5 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Cấu trúc dữ liệu LunarYearLeapInfo & LunarYearMonthSummary trong types.ts.',
      'Thẻ chuyên mục "Tháng Nhuận & Chu Kỳ Năm Âm Lịch" và Bảng 12/13 tháng trong LunarNewMoonSection.',
      'Thuật toán trích xuất chu kỳ năm âm lịch trong astronomy/lunarCalendar.ts.',
    ],
    improved: [
      'Giao diện chuyên mục Điểm Sóc & Âm Lịch với biểu đồ tiến trình và thông tin tổng quan năm âm lịch.',
      'Đồng bộ tài liệu thuyết minh thuật toán và các tệp nhật ký phiên bản.',
    ],
  },
  {
    version: '2.15.0',
    releaseDate: '2026-08-29',
    codename: 'Chế Độ Sáng/Tối Tương Thích Trình Duyệt & Tùy Chọn',
    tagline: 'Hỗ trợ chuyển đổi chế độ Sáng / Tối linh hoạt: Tự động theo cài đặt trình duyệt/hệ thống hoặc tùy chọn thủ công, lưu trữ bền vững trên thiết bị.',
    isLatest: false,
    highlights: [
      'Tích hợp ThemeContext & ThemeSwitcher hỗ trợ 3 chế độ: Tự động (Hệ thống/Trình duyệt), Chế độ Sáng (Light Mode thanh lịch, tương phản cao), và Chế độ Tối (Dark Mode huyền bí thiên văn).',
      'Tự động lắng nghe thay đổi prefers-color-scheme theo thời gian thực từ trình duyệt và hệ điều hành.',
      'Giao diện chuyển đổi theme trực quan trên Header cho cả máy tính và thiết bị di động.',
      'Lưu trữ tùy chọn bền vững vào localStorage để duy trì trạng thái xem yêu thích.',
      'Đồng bộ Mục 17 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Bộ điều khiển giao diện ThemeSwitcher & ThemeContext quản lý theme toàn diện.',
      'Mục 17 trong Thuyết Minh Thuật Toán & Nguyên Lý Hệ Thống.',
    ],
    improved: [
      'Tối ưu hóa bảng màu tương phản WCAG AA cho chế độ Sáng và Tối.',
      'Bổ sung nút chuyển đổi theme tức thời trên thanh điều hướng Header.',
    ],
  },
  {
    version: '2.14.0',
    releaseDate: '2026-08-29',
    codename: 'Từ Điển Thuật Ngữ Thuật Số & Tra Cứu Kỳ Môn - Lục Nhâm',
    tagline: 'Bổ sung thành phần GlossarySection tra cứu thuật ngữ chuyên sâu Kỳ Môn Độn Giáp, Đại Lục Nhâm và Thiên Văn Hoàng Đạo ngay trên Trang Chủ, giải thích trực quan, dễ hiểu cho người mới.',
    isLatest: false,
    highlights: [
      'Tạo mới thành phần GlossarySection trên Trang Chủ CosmicKnowledgeGuide với hệ thống phân loại theo 3 chuyên mục lớn (Kỳ Môn, Lục Nhâm, Thiên Văn/Lạc Thư).',
      'Định nghĩa đầy đủ, ngắn gọn kèm ứng dụng thực tế và lưu ý cho các thuật ngữ trọng yếu: Trực Phù, Trực Sử, Tam Kỳ, Lục Nghi, Bát Môn, Cửu Tinh, Bát Thần, Siêu Thần Tiếp Khí, Phục/Phản Ngâm, Kích Hình, Nguyệt Tướng, Tứ Khoa, Tam Truyền, Cửu Tông Môn, Đán/Dạ Quý, Thuận/Nghịch hành, Điểm Sóc, 24 Tiết Khí, Ma Trận Lạc Thư.',
      'Bộ lọc thời gian thực, tìm kiếm tức thì theo từ khóa, thẻ tag phân loại (#Bát Thần, #Tam Truyền, #Điểm Sóc...).',
      'Đồng bộ Mục 16 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Thành phần GlossarySection (Từ Điển Thuật Ngữ) tích hợp tra cứu và lọc theo danh mục / từ khóa.',
      'Mục 16 trong Thuyết Minh Thuật Toán & Nguyên Lý Hệ Thống.',
    ],
    improved: [
      'Tích hợp tab "📖 Tra Cứu Thuật Ngữ" và nút truy cập nhanh trên Hero banner của Trang Chủ.',
    ],
  },
  {
    version: '2.13.0',
    releaseDate: '2026-08-29',
    codename: 'Trang Chủ Cẩm Nang Tri Thức & Toàn Thư Đại Lục Nhâm',
    tagline: 'Chuyển Cẩm Nang Tri Thức lên vị trí Trang Chủ mặc định khi mở ứng dụng, bổ sung kho tàng kiến thức Đại Lục Nhâm chuyên sâu, cập nhật bộ nhận diện Logo & Favicon thiên văn.',
    isLatest: false,
    highlights: [
      'Thiết lập Cẩm Nang Tri Thức làm Trang Chủ mặc định khi mở ứng dụng, giúp người dùng nắm bắt nền tảng tri thức thiên văn và tam thức trước khi chiêm quẻ.',
      'Bổ sung toàn diện kiến thức Đại Lục Nhâm vào Cẩm Nang Tri Thức: Thập Nhị Nguyệt Tướng, An Tứ Khoa, Cửu Tông Môn Khởi Tam Truyền, Thập Nhị Thần Tướng Đán/Dạ Quý Thuận Nghịch, và Ứng Dụng 6 Chuyên Đề Đời Sống.',
      'Cập nhật Logo Thiên Văn mới trên Header, Favicon trình duyệt và Thẻ xem trước Open Graph (OG Image) khi chia sẻ liên kết.',
      'Cập nhật Mục 15 trong Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Chuyên mục Đại Lục Nhâm trong Cẩm Nang Tri Thức với 6 chủ đề học thuật chi tiết và trực quan.',
      'Section 15 trong Thuyết Minh Thuật Toán & Nguyên Lý Hệ Thống.',
    ],
    improved: [
      'Tái cấu trúc menu điều hướng: đưa Trang Chủ (Cẩm Nang Tri Thức) lên vị trí đầu tiên.',
      'Thêm nút thao tác nhanh trên Hero Banner dẫn trực tiếp vào Bàn Kỳ Môn 9 Cung và Bàn Đại Lục Nhâm.',
    ],
  },
  {
    version: '2.12.0',
    releaseDate: '2026-08-28',
    codename: 'Tái Cấu Trúc UX/UI Ma Trận Lạc Thư & Click-to-Modal',
    tagline: 'Tái cấu trúc toàn diện giao diện UX/UI: Gom gọn Header Thiên Văn thời gian thực, Bàn cờ 9 Cung Ma trận Lạc Thư chuẩn 3x3 với cơ chế Click-to-Modal chi tiết và Gom nhóm tiện ích trực quan.',
    isLatest: false,
    highlights: [
      'Giao diện Trang Chính (Main Workspace) tập trung, thoáng đãng, không bị phân tán hay rối mắt.',
      'Gom gọn thời gian thực (Live clock), Âm/Dương lịch, Can Chi Tứ Trụ và Tiết khí vào dải thông tin trên cùng (Top Header strip).',
      'Thanh Tab Switcher trực tiếp trên bàn cờ cho phép chuyển đổi tức thì giữa [ Kỳ Môn Độn Giáp ] và [ Đại Lục Nhâm ].',
      'Bàn cờ 9 Cung Kỳ Môn dạng Lưới Grid 3x3 chuẩn Ma trận Lạc Thư (Tốn-Ly-Khôn, Chấn-Trung-Đoài, Cấn-Khảm-Càn) với thẻ tóm tắt thông số sạch sẽ.',
      'Cơ chế Click-to-Modal / Drawer tương tác: Nhấp bất kỳ ô cung nào mở Modal chi tiết toàn diện (Thập Can Khắc Ứng, Bát Môn, Cửu Tinh, Bát Thần, Cách Cục) mà không làm nhảy giao diện.',
      'Gom nhóm hệ thống menu điều hướng theo các cụm chức năng (Bàn Quẻ Tam Thức, Dự Trắc & Phân Tích, Lịch & Tiết Khí, Tri Thức).',
    ],
    added: [
      'Component `PalaceDetailModal.tsx` phục vụ cơ chế Click-to-Modal / Drawer chi tiết cung trên cả PC và thiết bị di động.',
      'Dải thông tin thiên văn trực quan đa năng (Cosmic Header Strip) tích hợp Live clock, Âm Dương Lịch và Bát Tự Tứ Trụ.',
    ],
    improved: [
      'Tái cấu trúc `KyMonCompleteBoard.tsx` sang lưới 3x3 cân đối, tối ưu hóa không gian hiển thị và giảm tải độ phức tạp thị giác.',
      'Đồng bộ Tab Switcher hai chiều giữa Kỳ Môn Độn Giáp và Đại Lục Nhâm.',
    ],
  },
  {
    version: '2.11.0',
    releaseDate: '2026-08-28',
    codename: 'Bí Tàng Đại Lục Nhâm Độn Giáp Toàn Thư',
    tagline: 'Bổ sung chuyên mục độc lập Đại Lục Nhâm (Tam Thức chi nhất) hoàn chỉnh với Thiên Bàn, Địa Bàn, Tứ Khoa, Tam Truyền (Cửu Tông Môn), Thập Nhị Thần Tướng và Dự Trắc 6 Chuyên Đề Đời Sống.',
    isLatest: false,
    highlights: [
      'Bổ sung Tab riêng biệt "Đại Lục Nhâm" trên thanh điều hướng chính, kế thừa đầy đủ chuẩn mực thuật số cổ truyền.',
      'Khởi Nguyệt Tướng chuẩn xác theo 24 Tiết khí dựa trên Kinh độ Mặt Trời (Solar Longitude) thiên văn.',
      'Lập Thiên Bàn đè lên Địa Bàn, tự động xoay 12 Cung và an 12 Thần Tướng theo Đán Quý / Dạ Quý (Thuận / Nghịch hành).',
      'An Tứ Khoa (Can Thượng, Can Âm, Chi Thượng, Chi Âm) và phát khởi Tam Truyền theo chuẩn Cửu Tông Môn (Nguyên Thủ, Trùng Thẩm, Tỷ Dụng, Thiệp Hại, Dao Khắc, Mão Tinh, Phục Ngâm, Phản Ngâm).',
      'Hệ thống dự trắc chuyên đề 6 phương diện đời sống: Cầu Tài, Hôn Nhân, Quan Vận, Bệnh Tật, Kiện Tụng, Xuất Hành.',
      'Cập nhật Mục 13 trong Cẩm Nang Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Module tính toán thuật toán Lục Nhâm `lucNham.ts` xác định Nguyệt Tướng, Tứ Khoa, Tam Truyền, Thần Tướng, Thần Sát và Tuần Không.',
      'Giao diện tương tác `LucNhamPanel.tsx` gồm Bàn 12 Cung, Thẻ Tam Truyền, Thẻ Tứ Khoa, Khám Phá Cung và Dự Trắc 6 Chuyên Đề.',
    ],
    improved: [
      'Tích hợp liền mạch chuyển đổi giữa Kỳ Môn Độn Giáp và Đại Lục Nhâm theo cùng một mốc thời gian thời khắc thiên văn.',
    ],
    astronomyNotes: [
      'Kinh độ Mặt Trời xác định chính xác thời điểm đổi Nguyệt Tướng theo Tiết khí Trung Khí (Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết, Đông Chí, Đại Hàn).',
    ],
  },
  {
    version: '2.10.0',
    releaseDate: '2026-08-28',
    codename: 'Đánh Giá Thời Không 5 Sao & Ma Trận Cát Hung',
    tagline: 'Tích hợp công cụ đánh giá độ tốt/xấu của một mốc thời gian cụ thể (cát/hung) theo thang điểm 5 sao, kết hợp ma trận 4 chiều giữa Thiên bàn, Địa bàn, Nhân bàn (Bát Môn/Cung), Thần bàn, Trực Phù & Trực Sử.',
    isLatest: false,
    highlights: [
      'Bộ công cụ Đánh Giá Cát / Hung Thời Khắc Thang Điểm 5 Sao (TimeEvaluationCard) trực quan, chi tiết.',
      'Phối hợp 4 Cột Trụ: Thập Can Khắc Ứng (Thiên/Địa), Môn Cung Sinh Khắc (Nhân/Địa), Cung Trực Phù & Trực Sử (Tướng Soái/Chấp Pháp), Cửu Tinh & Bát Thần (Thiên Thời & Thần Trợ).',
      'Đánh giá xếp hạng số sao chi tiết cho toàn bộ 8 phương vị không gian (9 Cung Lạc Thư) giúp định hướng xuất hành, hội họp và giao dịch.',
      'Khuyến nghị hành động thực tiễn (Việc nên làm, việc kiêng kỵ, chiến lược Chủ - Khách) theo từng thời điểm.',
      'Đồng bộ cập nhật Mục 12 trong Cẩm Nang Thuyết Minh Thuật Toán (AlgorithmGuideModal).',
    ],
    added: [
      'Module tính toán năng lượng thời gian `kymonEvaluation.ts` chuẩn hóa điểm số từ 0 - 100 quy đổi ra 1.0 - 5.0 sao.',
      'Thẻ giao diện tương tác `TimeEvaluationCard.tsx` hiển thị điểm số, ngôi sao, thanh đo tiến trình, phân tích 4 cột trụ và bảng xếp hạng 8 hướng.',
    ],
    improved: [
      'Tích hợp đánh giá 5 sao đồng bộ trên cả Trang Tổng Quan & Luận Cục và Bàn Kỳ Môn 9 Cung Hoàn Chỉnh.',
      'Tối ưu hóa khả năng phản hồi tức thì khi người dùng thay đổi ngày giờ hoặc chuyển đổi Cục số.',
    ],
    fixed: [
      'Chuẩn hóa thuật toán tính điểm Môn Bách và Lục Nghi Kích Hình đảm bảo độ chính xác tuyệt đối theo cổ thư.',
    ],
    astronomyNotes: [
      'Kết hợp chính xác năng lượng thời gian thiên văn học (24 Tiết khí + Điểm Sóc) vào ma trận phân bố 9 cung Kỳ Môn.',
    ],
  },
  {
    version: '2.9.0',
    releaseDate: '2026-08-28',
    codename: 'Cẩm Nang Tri Thức Toàn Cảnh & Hợp Nhất Thời Không',
    tagline: 'Ra mắt Tab riêng biệt "Cẩm Nang Tri Thức" đứng trước Tổng Quan Luận Cục, tích hợp đầy đủ hệ thống tri thức 4 chiều: Bát Trạch, Cửu Tinh Lạc Thư, 24 Tiết Khí, Điểm Sóc Âm Lịch và Kỳ Môn Độn Giáp cùng ứng dụng đời sống.',
    isLatest: false,
    highlights: [
      'Bổ sung Tab chuyên biệt "Cẩm Nang Tri Thức" nằm ở vị trí đầu tiên của thanh điều hướng (ngay trước Tổng Quan & Luận Cục).',
      'Hệ thống hóa toàn diện mô hình Tọa độ Vũ trụ 4 Chiều (Thiên Vận - Địa Thế - Nhân Sự - Thời Không).',
      'Chi tiết hóa 8 hướng Bát Trạch, Cửu Tinh Lạc Thư (tổng 15), 24 Tiết Khí (12 Tiết lệnh & 12 Trung khí), Điểm Sóc (0° New Moon) và 4 tầng Kỳ Môn (Thiên - Địa - Nhân - Thần).',
      'Tích hợp công cụ tìm kiếm và lọc chuyên đề nhanh, hướng dẫn ứng dụng thực tiễn trong dưỡng sinh, xuất hành, đàm phán, phong thủy và dự trắc.',
    ],
    added: [
      'Giao diện Cẩm Nang Tri Thức trực quan, sinh động với thanh lọc chuyên đề và ô tìm kiếm nội dung.',
      'Bộ giải thích chi tiết mối liên hệ tương tác giữa 24 Tiết khí, Điểm Sóc và 18 Cục Kỳ Môn Độn Giáp.',
    ],
    improved: [
      'Nâng cấp trải nghiệm chuyển hướng nhanh giữa Cẩm Nang và các bảng tính toán thực tế.',
      'Đồng bộ tài liệu thuyết minh và ghi chú phiên bản hệ thống.',
    ],
    fixed: [
      'Tối ưu hóa bố cục thanh điều hướng giúp các tab hiển thị hài hòa, mượt mà trên mọi kích thước màn hình.',
    ],
    astronomyNotes: [
      'Chuẩn hóa công thức định vị Tiết Lệnh và Trung Khí theo kinh độ Hoàng đạo Mặt Trời VSOP87 và Điểm Sóc ELP2000.',
    ],
  },
  {
    version: '2.8.0',
    releaseDate: '2026-08-27',
    codename: 'Tối Giản Độc Lập & Thuần Bản Kỳ Môn Cổ Thư',
    tagline: 'Loại bỏ hoàn toàn tính năng cấu hình API Key và luận giải AI, tối ưu hóa ứng dụng hoạt động 100% độc lập, thuần thuật toán Thiên văn học chính xác và Bí Kíp Cổ Thư Kỳ Môn.',
    isLatest: false,
    highlights: [
      'Gỡ bỏ toàn bộ giao diện cấu hình API Key và tab luận giải AI, giúp ứng dụng nhẹ nhàng, gọn gàng và hoàn toàn tự chủ.',
      'Tập trung chuyên sâu vào công cụ tính toán Thiên văn học Meeus (VSOP87/ELP2000), 24 Tiết khí, Điểm Sóc Âm Dương và Bàn Kỳ Môn 9 Cung chuẩn xác.',
      'Đầy đủ hệ thống dự trắc cổ thư tích hợp sẵn (Thân Mệnh, Tam Bàn, Chủ Khách, 6 Phương diện đời sống) không cần kết nối mạng hay khóa API ngoài.',
    ],
    added: [
      'Tối ưu hóa dung lượng gói nạp và quy trình xử lý không phụ thuộc dịch vụ ngoài.',
    ],
    improved: [
      'Thanh điều hướng và các thẻ tác vụ gọn gàng, liền mạch.',
      'Đồng bộ tài liệu thuyết minh thuật toán chuẩn xác 7 mục chuyên môn.',
    ],
    fixed: [
      'Loại bỏ các yêu cầu phụ thuộc API Key bên ngoài và mã gọi mạng trung gian.',
    ],
    astronomyNotes: [
      'Hệ thống thuật toán thiên văn và bảng tính Lạc Thư hoạt động độc lập với hiệu năng tối ưu.',
    ],
  },
  {
    version: '2.7.2',
    releaseDate: '2026-08-27',
    codename: 'Chuẩn Hóa Danh Sách Mô Hình Gemini & Làm Sạch Thông Báo Lỗi',
    tagline: 'Loại bỏ hoàn toàn các mã mô hình cũ không còn được hỗ trợ, chuẩn hóa sang các mô hình thế hệ mới (Gemini 3.7 Flash, Gemini 2.5 Flash, Gemini Flash Latest, Gemini 3.1 Flash Lite) và làm sạch thông báo lỗi trực quan.',
    isLatest: false,
    highlights: [
      'Loại bỏ triệt để mã mô hình cũ (gemini-1.5-flash) khỏi danh sách gọi API và dự phòng, khắc phục dứt điểm lỗi 404 NOT_FOUND.',
      'Cập nhật danh sách mô hình chuẩn hỗ trợ đầy đủ generateContent: gemini-3.7-flash, gemini-2.5-flash, gemini-flash-latest, gemini-3.1-flash-lite.',
      'Tích hợp bộ giải mã làm sạch lỗi (extractCleanErrorMessage / formatClientErrorMessage), bóc tách các chuỗi JSON lồng nhau thành thông báo tiếng Việt ngắn gọn, dễ hiểu.',
    ],
    added: [
      'Bộ phân giải chuỗi lỗi tự động unwrapping JSON nhiều lớp, hiển thị trực quan lỗi Hạn ngạch (RESOURCE_EXHAUSTED) hoặc API Key không hợp lệ.',
    ],
    improved: [
      'Tối ưu thứ tự ưu tiên thử nghiệm mô hình theo tiêu chuẩn mới nhất của Google Gen AI SDK.',
      'Nâng cấp cơ chế kiểm tra kết nối trong Modal Cấu hình API Key kiểm tra tuần tự các mô hình thế hệ mới.',
    ],
    fixed: [
      'Sửa lỗi 404 "models/gemini-1.5-flash is not found for API version v1beta" khi gọi API qua cả Backend và Trình duyệt.',
    ],
    astronomyNotes: [
      'Đảm bảo dữ liệu chiêm đoán truyền tới mô hình Gemini thế hệ mới luôn nhất quán và chính xác.',
    ],
  },
  {
    version: '2.7.1',
    releaseDate: '2026-08-27',
    codename: 'Luận Giải AI Kỳ Môn & Quản Lý API Key Cá Nhân',
    tagline: 'Bổ sung nút "Cấu hình API Key", hỗ trợ lưu API Key vào localStorage trình duyệt và cơ chế kép (Server + Client Fallback) đảm bảo luận giải AI thông suốt 100%.',
    isLatest: false,
    highlights: [
      'Tích hợp nút "Cấu hình API Key" trực tiếp trên giao diện AI Advisor và hộp thoại báo lỗi kết nối.',
      'Hỗ trợ người dùng nạp Google AI Studio API Key cá nhân miễn phí, tự động lưu trữ an toàn trong localStorage trình duyệt.',
      'Cơ chế kết nối kép Dual-Engine: Ưu tiên Server SSE Streaming và tự động chuyển sang Client-side Fallback trực tiếp qua SDK @google/genai khi backend gặp sự cố (mã 404 hoặc mạng).',
      'Đồng bộ kiểm tra kết nối API Key trước khi lưu để đảm bảo chìa khóa hoạt động chính xác.',
    ],
    added: [
      'Modal Cấu hình API Key (GeminiApiKeyModal.tsx) với ô nhập, tính năng kiểm tra kết nối thử nghiệm, ẩn/hiện key và lưu vào localStorage.',
      'Engine kết nối kép streamKyMonAiInterpretation (geminiAdvisorEngine.ts) tự động xử lý chuyển tầng linh hoạt giữa Backend và Trình duyệt.',
      'Nút "Cấu hình API Key Cá Nhân" hiển thị nhanh ngay khi xảy ra lỗi gọi mô hình, giúp người dùng khắc phục tức thì mà không bị gián đoạn.',
    ],
    improved: [
      'Tối ưu xử lý danh sách mô hình dự phòng (Gemini 2.5 Flash, Gemini 3.7 Flash, Gemini 1.5 Flash) trên cả tầng máy chủ và tầng trình duyệt.',
      'Cải thiện trải nghiệm phản hồi liên tục với chỉ báo nạp Key thành công (huy hiệu xanh ngọc "Đã nạp Key cá nhân").',
    ],
    fixed: [
      'Khắc phục triệt để lỗi mã trạng thái 404 khi môi trường backend chưa nạp sẵn biến GEMINI_API_KEY bằng cơ chế Client Fallback tức thì.',
    ],
    astronomyNotes: [
      'Bảo toàn toàn vẹn ma trận dữ liệu 9 cung Kỳ Môn và Bát Tự khi gửi tới các phiên bản mô hình Gemini.',
    ],
  },
  {
    version: '2.7.0',
    releaseDate: '2026-08-27',
    codename: 'Luận Giải AI Kỳ Môn Độn Giáp với Gemini API',
    tagline: 'Tích hợp mô hình Gemini 3.7 Flash trích xuất toàn diện Bàn Kỳ Môn 9 Cung, nhận diện Dụng Thần và truyền phát bài luận giải chi tiết theo thời gian thực.',
    isLatest: false,
    highlights: [
      'Tích hợp tính năng "Luận Giải AI Gemini" miễn phí của hệ thống, sử dụng mô hình Gemini 3.7 Flash phân tích quẻ Kỳ Môn Độn Giáp chuyên sâu.',
      'Hỗ trợ 8 chuyên đề luận giải sẵn: Tổng Luận Quẻ Đại Cục, Sự Nghiệp & Công Danh, Tài Vận & Đầu Tư Kinh Doanh, Hôn Nhân & Tình Duyên, Sức Khỏe & Trị Bệnh, Chiến Lược Chủ - Khách, Xuất Hành & Phương Vị Cát Lợi, Thân Mệnh Lục Thân.',
      'Khung đặt câu hỏi chiêm đoán tùy biến với gợi ý nhanh và trích xuất Dụng Thần theo đúng ngữ cảnh thực tế của người hỏi.',
      'Truyền phát câu trả lời theo thời gian thực (Server-Sent Events streaming) với định dạng Markdown rõ ràng, nút sao chép và liên kết trực tiếp tới Bàn 9 Cung.',
      'Bảo mật API Key an toàn ở tầng máy chủ Backend (/server/geminiService.ts và endpoint /api/gemini/kymon-interpret).',
    ],
    added: [
      'Component GeminiKyMonAiAdvisor.tsx với giao diện chọn chuyên đề trực quan, danh sách gợi ý nhanh, ô nhập tùy biến và hiển thị Markdown sắc nét.',
      'Backend service server/geminiService.ts sử dụng @google/genai SDK xử lý trích xuất toàn bộ cấu trúc bàn Kỳ Môn (Thiên Can, Địa Can, Cửu Tinh, Bát Môn, Bát Thần, Trực Phù, Trực Sử, Cách Cục) và sinh phản hồi.',
      'Endpoint /api/gemini/kymon-interpret hỗ trợ cả SSE stream=true và JSON response tiêu chuẩn.',
      'Thêm Tab điều hướng chuyên biệt "Luận Giải AI Gemini" trên thanh Header và các nút chuyển nhanh trên Bàn 9 Cung, Dự Trắc và Tổng Quan.',
      'Cập nhật Thuyết minh thuật toán (AlgorithmGuideModal) bổ sung Mục 8: Thuật toán Luận Giải AI Gemini & Trích Xuất Dụng Thần.',
    ],
    improved: [
      'Nâng cấp trải nghiệm người dùng với phản hồi luồng (streaming) mượt mà, hạn chế tối đa thời gian chờ đợi.',
      'Phối hợp nguyên lý chiêm đoán cổ thư (Kỳ Môn Toàn Thư, Ngự Định Kỳ Môn Bảo Giám) vào cấu trúc System Instruction của AI.',
    ],
    fixed: [
      'Đảm bảo khởi tạo an toàn lazy initialization cho Gemini API Client không làm gián đoạn ứng dụng khi chưa cấu hình key.',
    ],
    astronomyNotes: [
      'Dữ liệu đưa vào AI bao gồm tọa độ thiên văn, 24 tiết khí, Bát tự trụ giờ và toàn bộ ma trận 9 cung đã được tính toán chính xác.',
    ],
  },
  {
    version: '2.6.0',
    releaseDate: '2026-08-27',
    codename: 'Lịch Tháng Tương Tác & Tinh Gọn Điều Khiển',
    tagline: 'Tích hợp Lịch Tháng tương tác (Mini Calendar) trực quan trên Tab Tổng Quát, nổi bật ngày khảo sát và tinh gọn thanh điều khiển thời gian.',
    isLatest: false,
    highlights: [
      'Bổ sung Lịch Tháng Tương Tác (Mini Calendar) thường trực ngay trên Tab Tổng Quát (Overview) giúp chuyển ngày nhanh bằng 1 cú nhấp chuột.',
      'Hiển thị trực quan và nổi bật ngày đang khảo sát (Active Date Highlight) với viền sáng, nhãn ngày và trạng thái Thời gian thực (Live).',
      'Đánh dấu ngày hiện tại (Hôm nay) và hỗ trợ điều hướng nhanh lùi/tiến ngày (-1N, +1N), chuyển tháng, chọn năm tùy ý.',
      'Tinh gọn thanh điều khiển: lược bỏ ô nhập nhanh chuỗi text và các nút preset cố định để giao diện thanh thoát, trực quan.',
    ],
    added: [
      'Component MiniCalendar.tsx với giao diện lưới lịch 7 ngày (T2..CN), hỗ trợ chọn trực tiếp tháng/năm và đồng bộ múi giờ Việt Nam (UTC+7).',
      'Tích hợp MiniCalendar song hành cùng Thẻ Tiết Khí Đương Lệnh trong bố cục lưới đáp ứng (responsive grid).',
      'Thêm các nút điều hướng nhanh -1 ngày, +1 ngày và về "Hôm nay" ngay trên thanh tiêu đề của Lịch Tháng.',
    ],
    improved: [
      'Thanh TimeInputControl được tinh giản tối đa, tập trung vào bộ chọn DateTime picker chuẩn xác và công tắc Live thời gian thực.',
      'Tối ưu hóa hiệu năng render khi chuyển đổi qua lại giữa các ngày trên lịch mà không làm gián đoạn trạng thái quẻ Kỳ Môn.',
    ],
    fixed: [
      'Đồng bộ mốc giờ/phút/giây hiện tại khi người dùng nhấp chọn ngày mới trên Lịch Tháng.',
    ],
    astronomyNotes: [
      'Lịch tháng tính toán chính xác chu kỳ ngày dương lịch và tự động chuyển đổi sang mốc giờ UTC+7 của Việt Nam.',
    ],
  },
  {
    version: '2.5.0',
    releaseDate: '2026-08-26',
    codename: 'Toàn Thư Dự Trắc Bàn Kỳ Môn & Chiêm Đoán Việc Đời',
    tagline: 'Phát hành trang Dự Trắc Bàn Kỳ Môn toàn diện với quy luật Tam Bàn, Chủ - Khách, Thân Mệnh và 6 phương diện đời sống.',
    isLatest: false,
    highlights: [
      'Bổ sung khu vực chuyên biệt dẫn trực tiếp từ phía dưới Bàn Kỳ Môn Hoàn Chỉnh tới Trang Dự Trắc Chi Tiết.',
      'Tích hợp trang riêng "Dự Trắc Kỳ Môn" phân tích chuyên sâu toàn bộ quẻ theo nguyên bản Kỳ Môn Độn Giáp Bí Kíp Toàn Thư.',
      'Luận giải Quy luật Tam Bàn (Thiên Sao, Nhân Môn, Địa Cung) và Quy tắc Chủ - Khách trong chiêm nghiệm thực tế.',
      'Dự trắc Thân Mệnh (Nhân Sinh Quý Tiện): Hệ thống Lục Thân (Niên, Nguyệt, Nhật, Thời can), Thê thiếp (Ất, Đinh), Chồng (Canh), Tổ nghiệp (Sinh Môn) và Cô - Hư.',
      'Dự trắc 6 phương diện đời sống: Hôn Nhân, Y Học Trị Bệnh (Thiên Nhuế 8 cung tạng phủ), Cầu Tài (Giáp Tý Mậu & Sinh Môn), Thi Cử Công Danh, Mất Vật Kẻ Trộm, Kiện Tụng Tranh Chấp.',
    ],
    added: [
      'Module kymonPrognostication.ts tự động liên kết các cung vị thần sát, sao, môn, can trong quẻ với từng phương diện đời sống.',
      'Component KyMonPrognosticationView với 8 tab chuyên đề chiêm nghiệm, hỗ trợ sao chép nhanh báo cáo.',
      'Khu vực dẫn đường (Prognostication Section) đặt ngay phía dưới bản đồ Cửu Cung trên Bàn Kỳ Môn Hoàn Chỉnh.',
      'Thêm tab điều hướng "Dự Trắc Kỳ Môn" trên thanh Header để truy cập tức thì.',
    ],
    improved: [
      'Định dạng bảng phân tích tương quan sinh khắc giữa các đối tượng (Ất - Canh, Sinh Môn - Mậu, Thiên Tâm - Thiên Nhuế).',
      'Tra cứu chẩn đoán tạng phủ bên trong và tổn thương bên ngoài theo vị trí sao Thiên Nhuế rơi vào 8 cung.',
      'Tra cứu phân loại đồ vật mất theo 8 cung của Can Giờ và nhận diện kẻ trộm qua sao Thiên Bồng.',
    ],
    fixed: [
      'Hoàn thiện luồng chuyển hướng giữa Bàn Kỳ Môn 9 Cung và Trang Dự Trắc không làm gián đoạn trạng thái quẻ.',
    ],
    astronomyNotes: [
      'Dữ liệu dự trắc được tự động đồng bộ hóa thời gian thực (Live) hoặc theo quẻ do người dùng tự chọn.',
    ],
  },
  {
    version: '2.4.0',
    releaseDate: '2026-08-26',
    codename: 'Bí Kíp Toàn Thư & Luận Giải Khắc Ứng Tinh Thần',
    tagline: 'Số hóa phiên bản, hoàn thiện luận giải 100 cặp Thập Can Khắc Ứng, Bát Môn Cung, Cửu Tinh, Bát Thần và Cách Cục Binh Thư.',
    isLatest: false,
    highlights: [
      'Số hoá hệ thống số hiệu phiên bản trên thanh tiêu đề và tích hợp trình xem ghi chú cập nhật (Changelog Modal).',
      'Hoàn thiện cơ sở dữ liệu luận giải 100 cặp Thập Can Khắc Ứng (Thiên can gia Địa can) kèm thơ phú cổ và 4 phương diện ứng dụng.',
      'Bổ sung phân tích Bát Môn & Cung Khắc Ứng với Tượng Tĩnh và Tượng Động theo nguyên bản Kỳ Môn Độn Giáp Bí Kíp Toàn Thư.',
      'Cung cấp thông tin chi tiết Cửu Tinh và Bát Thần về ý nghĩa hộ trì, việc quân binh pháp và dự trắc sự vụ đời thường.',
      'Nhận diện các cách cục đặc biệt: Lục Nghi Kích Hình, Tam Kỳ Nhập Mộ, Tam Kỳ Thăng Điện, Cung Ba Thắng, Năm Cung Bất Khả Kích.',
      'Tạo file chuẩn CHANGELOG.md và thông báo cập nhật tự động phục vụ quản lý mã nguồn trên GitHub.',
    ],
    added: [
      'Module kymonFormations.ts chứa hơn 100 cặp Thập Can Khắc Ứng, 64 biến hóa Bát Môn Cung, 9 Cửu Tinh và 8 Bát Thần.',
      'Bộ điều hướng 4 tab chi tiết trong hộp Thanh tra Cung (Palace Inspector): Can Khắc Ứng, Bát Môn & Cung, Tinh & Thần, Cách Cục.',
      'Component ChangelogModal và Version Chip trực tiếp trên Header cho phép tra cứu ngay những thay đổi mới nhất.',
      'Tệp CHANGELOG.md chuẩn Keep a Changelog ở thư mục gốc của kho mã nguồn GitHub.',
    ],
    improved: [
      'Giao diện Thanh tra Cung (Inspector) hiển thị màu sắc tương phản cao theo ngũ hành và bản chất Cát/Hung.',
      'Định dạng xuất báo cáo và thuyết minh thuật toán được bổ sung số hiệu phiên bản đồng bộ.',
      'Tối ưu hóa hiệu năng render ma trận 9 cung khi chuyển đổi giữa chế độ Live và Tự chọn Cục số.',
    ],
    fixed: [
      'Sửa lỗi hiển thị thuộc tính mô tả Bát Môn và Bát Thần trong tab thanh tra cung.',
      'Đồng bộ hóa nhãn phiên bản giữa package.json, Header, Footer và metadata.',
    ],
    astronomyNotes: [
      'Thuật toán tính Tiết Khí VSOP87 kinh độ Mặt Trời đạt độ chính xác mili-giây cung.',
      'Định Cục Siêu Thần Tiếp Khí Nhuận Cục giữ nguyên tính chặt chẽ theo mốc Phù Đầu và Tiết Lệnh.',
    ],
  },
  {
    version: '2.3.0',
    releaseDate: '2026-08-25',
    codename: 'Bàn Kỳ Môn Hoàn Chỉnh 4 Tầng',
    tagline: 'Ra mắt Bàn Kỳ Môn Độn Giáp 9 Cung đầy đủ Thần Bàn, Thiên Tinh Bàn, Bát Môn Nhân Bàn và Địa Bàn.',
    highlights: [
      'Xây dựng trọn vẹn quy trình 6 bước an 4 tầng đĩa Kỳ Môn (Thần, Tinh, Môn, Can).',
      'Hỗ trợ chế độ Tự chọn Cục số (Âm/Dương 1-9), Can Chi Giờ, Tuần Thủ linh hoạt.',
      'Tự động định vị Tuần Không, Dịch Mã, Lộc Vị, Dương Quý, Âm Quý trên ma trận 9 Cung.',
    ],
    added: [
      'Tab "Bàn Kỳ Môn Hoàn Chỉnh" với giao diện ma trận 9 Cung hiện đại, màu sắc trực quan.',
      'Công cụ xoay đĩa theo nguyên lý Dương Độn thuận hành / Âm Độn nghịch hành.',
      'Bảng điều khiển tuỳ biến thông số: Can Chi ngày giờ, Tuần thủ, Cục số theo ý muốn.',
    ],
    improved: [
      'Tích hợp nút chuyển nhanh từ Thẻ Tổng Quan sang Bàn Kỳ Môn chi tiết.',
      'Tối ưu bố cục responsive trên các thiết bị màn hình nhỏ.',
    ],
    fixed: [
      'Chuẩn hóa hướng an sao Thiên Cầm gửi Khôn 2 trong các Cục Dương và Cục Âm.',
    ],
  },
  {
    version: '2.2.0',
    releaseDate: '2026-08-24',
    codename: 'Lịch Sóc Thiên Văn & Tháng Nhuận',
    tagline: 'Xác định tháng Âm lịch và Tháng Nhuận chuẩn xác dựa trên khoảng cách giữa hai điểm Sóc liên tiếp.',
    highlights: [
      'Thuật toán điểm Sóc thiên văn chính xác cao theo công thức Jean Meeus / ELP2000.',
      'Quy tắc xác định Tháng 1 (Tháng Giêng) chứa Tiết Lập Xuân và Trung Khí Vũ Thủy.',
      'Tự động phân định Tháng Đủ (30 ngày), Tháng Thiếu (29 ngày) và Tháng Nhuận (tháng không chứa Trung khí).',
    ],
    added: [
      'Tab "Điểm Sóc & Âm Lịch" hiển thị chi tiết mốc Sóc hiện tại, Sóc kế tiếp, độ dài chu kỳ trăng.',
      'Đồng hồ đo tiến trình chu kỳ Mặt Trăng (Moon Phase) và lịch tháng âm lịch thiên văn.',
    ],
    improved: [
      'Bổ sung chi tiết góc lệch Hoàng kinh giữa Mặt Trời và Mặt Trăng.',
    ],
  },
  {
    version: '2.1.0',
    releaseDate: '2026-08-23',
    codename: 'Định Cục Siêu Thần Tiếp Khí Nhuận Cục',
    tagline: 'Hoàn thiện thuật toán định Cục Kỳ Môn Độn Giáp chính tông với đầy đủ Thượng/Trung/Hạ Nguyên.',
    highlights: [
      'Tự động tìm ngày Phù Đầu Giáp/Kỷ gần nhất.',
      'So sánh ngày Phù Đầu với ngày Tiết Khí để kết luận: Chính Khí, Siêu Thần, Tiếp Khí, Nhuận Cục.',
      'Tra bảng Cục số Âm/Dương Độn 1-9 chính xác cho 24 Tiết Khí.',
    ],
    added: [
      'Bảng giải trình chi tiết từng bước xác định Cục số Kỳ Môn trong tab Tổng quan.',
      'Chỉ báo ngày Phù Đầu, số ngày lệch và trạng thái Siêu Thần / Tiếp Khí.',
    ],
    improved: [
      'Tự động đồng bộ với Bát Tự Tứ Trụ Can Chi của thời điểm tra cứu.',
    ],
  },
  {
    version: '2.0.0',
    releaseDate: '2026-08-20',
    codename: 'Thiên Văn 24 Tiết Khí & Bát Tự Tứ Trụ',
    tagline: 'Khởi tạo động cơ tính toán 24 Tiết Khí theo kinh độ Hoàng Đạo Mặt Trời và Bát Tự Can Chi 4 Trụ.',
    highlights: [
      'Tính toán kinh độ Mặt Trời đạt độ chính xác cấp giây cung.',
      'Phân định rõ 12 Tiết Lệnh (mốc chuyển tháng Bát Tự) và 12 Trung Khí.',
      'Bát Tự Tứ Trụ: Năm đổi tại Lập Xuân, Tháng theo Tiết lệnh & Ngũ Hổ Độn, Ngày 60 Hoa Giáp, Giờ theo Ngũ Thử Độn.',
    ],
    added: [
      'Bảng tra cứu 24 Tiết Khí toàn năm với tính năng tìm kiếm, lọc và xuất Markdown.',
      'La bàn Lạc Thư 9 Cung Hậu Thiên Bát Quái trực quan.',
      'Chế độ thời gian thực (Live Clock) và chọn thời gian tự do.',
    ],
    improved: [
      'Giao diện tối (Dark Mode) sang trọng, tương phản cao, tối ưu hóa cho màn hình máy tính và điện thoại.',
    ],
  },
];
