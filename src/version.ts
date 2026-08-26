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

export const APP_VERSION = '2.4.0';
export const APP_RELEASE_DATE = '2026-08-26';
export const APP_CODENAME = 'Bí Kíp Toàn Thư & Luận Giải Khắc Ứng Tinh Thần';
export const APP_GITHUB_REPO = 'https://github.com/caphenpro/Tietkhikymon';

export const CHANGELOG_DATA: ChangelogItem[] = [
  {
    version: '2.4.0',
    releaseDate: '2026-08-26',
    codename: 'Bí Kíp Toàn Thư & Luận Giải Khắc Ứng Tinh Thần',
    tagline: 'Số hóa phiên bản, hoàn thiện luận giải 100 cặp Thập Can Khắc Ứng, Bát Môn Cung, Cửu Tinh, Bát Thần và Cách Cục Binh Thư.',
    isLatest: true,
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
