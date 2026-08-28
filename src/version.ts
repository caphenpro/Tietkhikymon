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

export const APP_VERSION = '2.9.0';
export const APP_RELEASE_DATE = '2026-08-28';
export const APP_CODENAME = 'Cẩm Nang Tri Thức Toàn Cảnh & Hợp Nhất Thời Không';
export const APP_GITHUB_REPO = 'https://github.com/caphenpro/Tietkhikymon';

export const CHANGELOG_DATA: ChangelogItem[] = [
  {
    version: '2.9.0',
    releaseDate: '2026-08-28',
    codename: 'Cẩm Nang Tri Thức Toàn Cảnh & Hợp Nhất Thời Không',
    tagline: 'Ra mắt Tab riêng biệt "Cẩm Nang Tri Thức" đứng trước Tổng Quan Luận Cục, tích hợp đầy đủ hệ thống tri thức 4 chiều: Bát Trạch, Cửu Tinh Lạc Thư, 24 Tiết Khí, Điểm Sóc Âm Lịch và Kỳ Môn Độn Giáp cùng ứng dụng đời sống.',
    isLatest: true,
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
