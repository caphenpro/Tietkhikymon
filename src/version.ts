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

export const APP_VERSION = '2.6.0';
export const APP_RELEASE_DATE = '2026-08-27';
export const APP_CODENAME = 'Lịch Tháng Tương Tác & Tinh Gọn Điều Khiển';
export const APP_GITHUB_REPO = 'https://github.com/caphenpro/Tietkhikymon';

export const CHANGELOG_DATA: ChangelogItem[] = [
  {
    version: '2.6.0',
    releaseDate: '2026-08-27',
    codename: 'Lịch Tháng Tương Tác & Tinh Gọn Điều Khiển',
    tagline: 'Tích hợp Lịch Tháng tương tác (Mini Calendar) trực quan trên Tab Tổng Quát, nổi bật ngày khảo sát và tinh gọn thanh điều khiển thời gian.',
    isLatest: true,
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
