import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Compass,
  Sun,
  Sparkles,
  HelpCircle,
  Tag,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark
} from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  hanTu?: string;
  category: 'kymon' | 'lucnham' | 'thienvan';
  categoryLabel: string;
  definition: string;
  application: string;
  exampleOrNote?: string;
  tags: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // --- KỲ MÔN ĐỘN GIÁP ---
  {
    id: 'km-truc-phu',
    term: 'Trực Phù',
    hanTu: '值符',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Vị Thần đứng đầu Bát Thần (hoặc Sao đứng đầu Cửu Tinh theo Tuần Thủ của giờ chiêm quẻ), đại diện cho Thiên Ất Quý Nhân tối thượng, nguyên soái chỉ huy.',
    application: 'Chủ về sự phù trợ của cấp trên, quý nhân che chở, việc lớn thành tựu, chuyển họa thành phúc.',
    exampleOrNote: 'Trực Phù lâm cung nào thì cung đó có nguồn sinh khí mạnh mẽ nhất, bách ác quy phục.',
    tags: ['Bát Thần', 'Cửu Tinh', 'Tuần Thủ', 'Quý Nhân']
  },
  {
    id: 'km-truc-su',
    term: 'Trực Sử',
    hanTu: '值使',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Cửa (Bát Môn) chấp lệnh của giờ chiêm quẻ, do Tuần Thủ khởi phát, đóng vai trò sứ giả thực thi mệnh lệnh và điều phối nhân sự.',
    application: 'Chủ về sự thực thi công việc cụ thể, tiến độ nhanh hay chậm, người thừa hành nhiệm vụ.',
    exampleOrNote: 'Trực Sử gặp cát môn (Khai, Hưu, Sinh) thì việc thông suốt; gặp hung môn (Tử, Kinh, Thương) thì trở ngại.',
    tags: ['Bát Môn', 'Tuần Thủ', 'Nhân Khí']
  },
  {
    id: 'km-tam-ky',
    term: 'Tam Kỳ (Ất - Bính - Đinh)',
    hanTu: '三奇',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Ba Thiên can quý báu nhất trong Kỳ Môn: Ất Kỳ (Nhật Kỳ - Mặt Trời), Bính Kỳ (Nguyệt Kỳ - Mặt Trăng), Đinh Kỳ (Tinh Kỳ - Ngôi Sao).',
    application: 'Chủ về cơ hội đặc biệt, phép màu hóa giải nguy nan, thần trợ thăng tiến và cứu trợ.',
    exampleOrNote: 'Đinh Kỳ là kỳ tích tối linh nghiệm cho văn thư, chứng từ; Bính Kỳ quyền uy; Ất Kỳ hòa giải ôn nhu.',
    tags: ['Thập Can', 'Tam Kỳ', 'Cát Khí']
  },
  {
    id: 'km-luc-nghi',
    term: 'Lục Nghi (Mậu - Kỷ - Canh - Tân - Nhâm - Quý)',
    hanTu: '六仪',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Sáu Thiên can ẩn chứa 6 Giáp (Giáp Tý ẩn Mậu, Giáp Tuất ẩn Kỷ, Giáp Thân ẩn Canh, Giáp Ngọ ẩn Tân, Giáp Thìn ẩn Nhâm, Giáp Dần ẩn Quý).',
    application: 'Cấu thành 6 đạo quân bày binh bố trận trên Địa bàn và Thiên bàn.',
    exampleOrNote: 'Giáp là vua (chủ soái) luôn "Độn" (ẩn nấp) dưới Lục Nghi để bảo vệ tôn nghiêm.',
    tags: ['Thập Can', 'Lục Nghi', 'Độn Giáp']
  },
  {
    id: 'km-bat-mon',
    term: 'Bát Môn (8 Cửa)',
    hanTu: '八门',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: '8 Cửa nhân sự xoay chuyển: Khai, Hưu, Sinh (Tam Cát Môn); Đỗ, Cảnh (Bình Môn); Thương, Kinh, Tử (Tam Hung Môn).',
    application: 'Đại diện cho "Nhân Hòa" - trạng thái, thái độ và hành động của con người trong sự việc.',
    exampleOrNote: 'Cầu tài chọn Sinh Môn; xuất hành, nhậm chức chọn Khai Môn; nghỉ ngơi, hòa giải chọn Hưu Môn.',
    tags: ['Bát Môn', 'Nhân Sự', 'Cát Hung']
  },
  {
    id: 'km-cuu-tinh',
    term: 'Cửu Tinh (9 Ngôi Sao)',
    hanTu: '九星',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: '9 Ngôi sao thiên văn: Thiên Bồng, Thiên Nhuế, Thiên Xung, Thiên Phụ, Thiên Cầm, Thiên Tâm, Thiên Trụ, Thiên Nhậm, Thiên Anh.',
    application: 'Đại diện cho "Thiên Thời" - xu thế vĩ mô, khí hậu thời tiết, cơ duyên trời ban.',
    exampleOrNote: 'Thiên Phụ chủ học hành, bằng cấp; Thiên Tâm chủ y đạo, mưu lược; Thiên Nhậm chủ đất đai, bền bỉ.',
    tags: ['Cửu Tinh', 'Thiên Thời', 'Sao']
  },
  {
    id: 'km-bat-than',
    term: 'Bát Thần (8 Thần Bảo Hộ)',
    hanTu: '八神',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: '8 Cảnh giới năng lượng vô hình: Trực Phù, Đằng Xà, Thái Âm, Lục Hợp, Bạch Hổ (Hạ Độn là Câu Trận), Huyền Vũ (Chu Tước), Cửu Địa, Cửu Thiên.',
    application: 'Đại diện cho "Thần Trợ" - sức mạnh tâm linh, linh cảm vô hình và cơ may huyền bí.',
    exampleOrNote: 'Cửu Thiên thích hợp phát động, bay cao, mở rộng; Cửu Địa thích hợp ẩn nấp, phòng thủ, tích trữ.',
    tags: ['Bát Thần', 'Thần Trợ', 'Tâm Linh']
  },
  {
    id: 'km-sieu-than-tiep-khi',
    term: 'Siêu Thần Tiếp Khí',
    hanTu: '超神接气',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Thuật toán thiên văn xử lý độ lệch giữa chu kỳ 60 Giáp Tý (Can Chi ngày) và chu kỳ 24 Tiết khí Mặt Trời (Solar Longitude).',
    application: 'Đảm bảo nạp đúng Thượng Nguyên, Trung Nguyên, Hạ Nguyên và Cục số chính xác nhất.',
    exampleOrNote: 'Khi ngày Giáp/Kỷ đến trước Tiết khí là "Siêu Thần"; đến sau là "Tiếp Khí"; vượt quá 9 ngày thì "Nhuận Cục".',
    tags: ['Tiết Khí', 'Định Cục', 'Thiên Văn']
  },
  {
    id: 'km-phuc-ngam',
    term: 'Phục Ngâm Cục',
    hanTu: '伏吟局',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Hiện tượng Tinh bàn, Môn bàn hoặc Can bàn nằm trùng khít vào cung vị bản xứ gốc trên Địa bàn.',
    application: 'Chủ về sự ngưng trệ, bế tắc, tiến thoái lưỡng nan, nên giữ nguyên hiện trạng "Tĩnh dĩ đãi thời".',
    exampleOrNote: 'Phục Ngâm không nên mở rộng đầu tư hay xuất hành xa, thích hợp thu hồi nợ cũ, chỉnh đốn nội bộ.',
    tags: ['Cách Cục', 'Ngưng Trệ', 'Phục Ngâm']
  },
  {
    id: 'km-phan-ngam',
    term: 'Phản Ngâm Cục',
    hanTu: '反吟局',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Hiện tượng Tinh bàn, Môn bàn hoặc Can bàn bay sang cung đối xung 180° so với bản cung (như Khảm sang Ly, Chấn sang Đoài).',
    application: 'Chủ về biến động mau lẹ, lật ngược tình thế nhanh chóng, việc đổi thay bất ngờ.',
    exampleOrNote: 'Phản Ngâm chủ về sự việc qua đi nhanh, được mất chớp nhoáng, đau thương đến nhanh mà lành cũng mau.',
    tags: ['Cách Cục', 'Biến Động', 'Phản Ngâm']
  },
  {
    id: 'km-kich-hinh',
    term: 'Lục Nghi Kích Hình',
    hanTu: '六仪击刑',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Hiện tượng Thiên Can trên Thiên bàn rơi vào cung Địa bàn có Địa Chi phạm tương hình (như Mậu tại Chấn Mão, Canh tại Cấn Dần).',
    application: 'Chủ về tai nạn, thương tật, hình phạt pháp luật, nội bộ xung đột dữ dội, hao tổn nặng nề.',
    exampleOrNote: 'Dù gặp Tam Kỳ Cát Môn nhưng phạm Kích Hình thì vẫn chuốc lấy tổn thất và trắc trở.',
    tags: ['Hung Cách', 'Hình Phạt', 'Lục Nghi']
  },
  {
    id: 'km-nhap-mo',
    term: 'Tam Kỳ Nhập Mộ',
    hanTu: '三奇入墓',
    category: 'kymon',
    categoryLabel: 'Kỳ Môn Độn Giáp',
    definition: 'Hiện tượng Ất, Bính, Đinh rơi vào các cung Địa bàn là vị trí Mộ của hành đó (Ất Mộ tại Khôn, Bính Mộ tại Càn, Đinh Mộ tại Cấn).',
    application: 'Năng lượng cát lành của Tam Kỳ bị phong tỏa, chìm lấp, tài năng không được trọng dụng.',
    exampleOrNote: 'Gặp Nhập Mộ như ngọc quý vùi trong bùn, cần chờ thời vận xuất mộ mới phát quang.',
    tags: ['Tam Kỳ', 'Nhập Mộ', 'Phong Tỏa']
  },

  // --- ĐẠI LỤC NHÂM ---
  {
    id: 'ln-nguyet-tuong',
    term: 'Nguyệt Tướng (Thái Dương)',
    hanTu: '月将',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: 'Vị trí thực của Mặt Trời (Thái Dương) đi qua 12 cung Hoàng Đạo ứng với 12 Tiết lệnh trung khí trong năm.',
    application: 'Là chìa khóa số 1 để lập Thiên Bàn Lục Nhâm (đem Nguyệt Tướng đặt lên Chi của giờ chiêm quẻ).',
    exampleOrNote: 'Gồm 12 Tướng: Đăng Minh (Hợi), Hà Khôi (Tuất), Tùng Khôi (Dậu), Truyền Tống (Thân), Tiểu Cát (Mùi), Thắng Quang (Ngọ), Thái Ất (Tị), Thiên Cương (Thìn), Thái Xung (Mão), Công Tào (Dần), Đại Cát (Sửu), Thần Hậu (Tý).',
    tags: ['Nguyệt Tướng', 'Thái Dương', 'Thiên Bàn']
  },
  {
    id: 'ln-tu-khoa',
    term: 'Tứ Khoa (Bốn Cột Trụ)',
    hanTu: '四课',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: 'Bốn cặp thần nạp giữa Can Ngày và Chi Ngày: Khoa 1 (Can Thượng Thần), Khoa 2 (Can Âm), Khoa 3 (Chi Thượng Thần), Khoa 4 (Chi Âm).',
    application: 'Phân định rõ ranh giới giữa Thân Chủ (Khoa 1 & 2) và Khách Thể / Đối Tác / Gia Trạch (Khoa 3 & 4).',
    exampleOrNote: 'Tứ Khoa phản ánh mầm mống họa phúc ban đầu trước khi sự việc diễn tiến thành Tam Truyền.',
    tags: ['Tứ Khoa', 'Can Chi', 'Chủ Khách']
  },
  {
    id: 'ln-tam-truyen',
    term: 'Tam Truyền (Sơ - Trung - Mạt)',
    hanTu: '三传',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: 'Chuỗi nhân quả 3 bước của sự việc: Sơ Truyền (Phát Đoan - Khởi phát), Trung Truyền (Di Chuyển - Diễn tiến), Mạt Truyền (Quy Túc - Hậu vận).',
    application: 'Quán chiếu toàn cảnh quá khứ, hiện tại và tương lai của một quyết định hay sự kiện đời người.',
    exampleOrNote: 'Sơ truyền xấu nhưng Mạt truyền cát thì trước khổ sau sướng; Sơ truyền tốt mà Mạt truyền hung thì đầu voi đuôi chuột.',
    tags: ['Tam Truyền', 'Thời Gian', 'Nhân Quả']
  },
  {
    id: 'ln-cuu-tong-mon',
    term: 'Cửu Tông Môn',
    hanTu: '九宗门',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: '9 Phép tắc tìm Sơ Truyền cổ điển: Tặc Khắc, Tỷ Dụng, Thiệp Hại, Dao Khắc, Mão Tinh, Biệt Trạch, Bát Chuyên, Phục Ngâm, Phản Ngâm.',
    application: 'Nguyên lý toán học thuật số chuẩn mực đảm bảo luôn xác định được một Sơ Truyền duy nhất cho mọi thời khắc.',
    exampleOrNote: 'Ưu tiên hàng đầu là quy tắc Khắc (Thượng khắc Hạ hoặc Hạ khắc Thượng).',
    tags: ['Cửu Tông Môn', 'Thuật Toán', 'Sơ Truyền']
  },
  {
    id: 'ln-dan-da-quy',
    term: 'Đán Quý / Dạ Quý',
    hanTu: '昼夜贵人',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: 'Quy tắc phân biệt Quý Nhân ban ngày (Đán Quý - từ giờ Mão đến Dậu) và Quý Nhân ban đêm (Dạ Quý - từ giờ Dậu đến Mão).',
    application: 'Định vị chính xác cung ngự của Thiên Ất Quý Nhân trên Thiên Bàn Lục Nhâm.',
    exampleOrNote: 'Ban ngày vạn vật sáng tỏ lấy Dương Quý; ban đêm vạn vật tịch tĩnh lấy Âm Quý.',
    tags: ['Quý Nhân', 'Đán Dạ', 'Thần Tướng']
  },
  {
    id: 'ln-thuan-nghich-hanh',
    term: 'Thuận Hành / Nghịch Hành',
    hanTu: '顺行逆行',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: 'Quy luật xoay chuyển của 12 Thần Tướng Lục Nhâm: Nếu vị trí Quý Nhân đóng tại Hợi, Tý, Sửu, Dần, Mão, Thìn thì đi Thuận; đóng tại Tị, Ngọ, Mùi, Thân, Dậu, Tuất thì đi Nghịch.',
    application: 'Phản ánh chiều hướng nâng đỡ hay thử thách của hoàn cảnh môi trường đối với đương số.',
    exampleOrNote: 'Thần Tướng đi Thuận mang tính phát triển tự nhiên; đi Nghịch mang tính thử thách, lội ngược dòng.',
    tags: ['Thần Tướng', 'Thuận Nghịch', 'Vận Hành']
  },
  {
    id: 'ln-thap-nhi-than-tuong',
    term: 'Thập Nhị Thần Tướng',
    hanTu: '十二神将',
    category: 'lucnham',
    categoryLabel: 'Đại Lục Nhâm',
    definition: '12 Vị Thần Tướng Lục Nhâm: Quý Nhân, Đằng Xà, Chu Tước, Lục Hợp, Câu Trận, Thanh Long, Thiên Không, Bạch Hổ, Thái Thường, Huyền Vũ, Thái Âm, Thiên Hậu.',
    application: 'Biểu trưng cho mọi tâm lý, nhân vật, cảm xúc và họa phúc tương ứng trong đời sống thực tế.',
    exampleOrNote: 'Thanh Long chủ đại tài lộc; Lục Hợp chủ hòa hợp hôn nhân; Bạch Hổ chủ tai nạn cấp bách; Câu Trận chủ tranh kiện.',
    tags: ['Thần Tướng', 'Nhân Sự', 'Tâm Lý']
  },

  // --- THIÊN VĂN & LẠC THƯ ---
  {
    id: 'tv-diem-soc',
    term: 'Điểm Sóc (New Moon Conjunction)',
    hanTu: '朔点',
    category: 'thienvan',
    categoryLabel: 'Thiên Văn & Âm Lịch',
    definition: 'Thời điểm thiên văn chính xác tuyệt đối khi Mặt Trăng và Mặt Trời có cùng Kinh độ Hoàng đạo (Ecliptic Longitude = 0°), khởi đầu tháng Âm lịch mới.',
    application: 'Cơ sở khoa học duy nhất để xác định ngày Mùng 1 Âm lịch và tháng Nhuận thiên văn.',
    exampleOrNote: 'Điểm Sóc rơi vào ngày nào theo múi giờ địa phương (UTC+7) thì ngày đó là Mùng 1 Âm lịch.',
    tags: ['Điểm Sóc', 'Mặt Trăng', 'Âm Lịch']
  },
  {
    id: 'tv-24-tiet-khi',
    term: '24 Tiết Khí (Solar Terms)',
    hanTu: '二十四节气',
    category: 'thienvan',
    categoryLabel: 'Thiên Văn & Âm Lịch',
    definition: 'Hệ thống 24 điểm mốc trên quỹ đạo Trái Đất quay quanh Mặt Trời, mỗi mốc cách nhau đúng 15° Kinh độ Hoàng Đạo (từ Xuân Phân 0° đến Kinh Trập 345°).',
    application: 'Định vị mùa màng thời tiết, quy định Âm Độn / Dương Độn và Nguyệt Tướng Lục Nhâm.',
    exampleOrNote: 'Từ Đông Chí đến Hạ Chí dùng Dương Độn; từ Hạ Chí đến Đông Chí dùng Âm Độn.',
    tags: ['Tiết Khí', 'Kinh Độ Mặt Trời', 'Dương Độn', 'Âm Độn']
  },
  {
    id: 'tv-lac-thu',
    term: 'Ma Trận Lạc Thư (Cửu Cung 3x3)',
    hanTu: '洛书九宫',
    category: 'thienvan',
    categoryLabel: 'Thiên Văn & Lạc Thư',
    definition: 'Ma phương toán học huyền bí cổ đại với tổng mỗi hàng, cột, đường chéo luôn bằng 15: Đới cửu lý nhất, tả tam hữu thất, nhị tứ vi kiên, lục bát vi túc.',
    application: 'Khung lưới cơ bản phân chia không gian vũ trụ và năng lượng 8 hướng trong Phong Thủy và Kỳ Môn.',
    exampleOrNote: 'Tốn 4 (Đông Nam), Ly 9 (Nam), Khôn 2 (Tây Nam), Chấn 3 (Đông), Đoài 7 (Tây), Cấn 8 (Đông Bắc), Khảm 1 (Bắc), Càn 6 (Tây Bắc).',
    tags: ['Lạc Thư', 'Cửu Cung', 'Ma Trận']
  },
  {
    id: 'tv-khong-vong',
    term: 'Tuần Trung Không Vong',
    hanTu: '旬空中亡',
    category: 'thienvan',
    categoryLabel: 'Thiên Văn & Âm Lịch',
    definition: 'Hai Địa Chi bị khuyết (thiếu) trong mỗi Tuần 10 ngày (Tuần Giáp) vì 10 Thiên Can phối với 12 Địa Chi sẽ dư ra 2 Chi.',
    application: 'Chủ về sự trống rỗng, hư ảo, việc dự tính không thành, hoặc được miễn trừ hung sát.',
    exampleOrNote: 'Tuần Giáp Tý Không Vong tại Tuất Hợi; Tuần Giáp Thân Không Vong tại Ngọ Mùi.',
    tags: ['Không Vong', 'Tuần Giáp', 'Hư Không']
  },
  {
    id: 'tv-dich-ma',
    term: 'Dịch Mã (Thiên Mã)',
    hanTu: '驿马',
    category: 'thienvan',
    categoryLabel: 'Thiên Văn & Âm Lịch',
    definition: 'Thần Sát chủ về sự di chuyển, biến động, đi xa, xuất ngoại, thay đổi công tác hoặc chuyển nhà.',
    application: 'Xác định thời điểm hành động nhanh, xuất hành thắng lợi, tin tức phương xa truyền tới.',
    exampleOrNote: 'Tam hợp Thân Tý Thìn Mã tại Dần; Dần Ngọ Tuất Mã tại Thân; Tị Dậu Sửu Mã tại Hợi; Hợi Mão Mùi Mã tại Tị.',
    tags: ['Dịch Mã', 'Di Chuyển', 'Thần Sát']
  }
];

export const GlossarySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kymon' | 'lucnham' | 'thienvan'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Thuật Ngữ', icon: BookOpen, count: GLOSSARY_TERMS.length },
    { id: 'kymon', label: '🔮 Kỳ Môn Độn Giáp', icon: Layers, count: GLOSSARY_TERMS.filter(t => t.category === 'kymon').length },
    { id: 'lucnham', label: '🧭 Đại Lục Nhâm', icon: Compass, count: GLOSSARY_TERMS.filter(t => t.category === 'lucnham').length },
    { id: 'thienvan', label: '☀️ Thiên Văn & Lạc Thư', icon: Sun, count: GLOSSARY_TERMS.filter(t => t.category === 'thienvan').length },
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      const matchCategory = selectedCategory === 'all' || term.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase().trim();
      return (
        term.term.toLowerCase().includes(q) ||
        (term.hanTu && term.hanTu.includes(q)) ||
        term.definition.toLowerCase().includes(q) ||
        term.application.toLowerCase().includes(q) ||
        (term.exampleOrNote && term.exampleOrNote.toLowerCase().includes(q)) ||
        term.tags.some(tag => tag.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchTerm]);

  const toggleExpand = (id: string) => {
    setExpandedTermId(prev => (prev === id ? null : id));
  };

  const getCategoryBadgeClass = (category: 'kymon' | 'lucnham' | 'thienvan') => {
    switch (category) {
      case 'kymon':
        return 'bg-purple-950/60 border-purple-500/40 text-purple-300';
      case 'lucnham':
        return 'bg-amber-950/60 border-amber-500/40 text-amber-300';
      case 'thienvan':
        return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
    }
  };

  return (
    <div id="glossary-section" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Từ Điển Thuật Ngữ Thuật Số & Thiên Văn</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Tra Cứu Thuật Ngữ Chuyên Môn</span>
            <span className="text-amber-400 font-mono text-sm">({filteredTerms.length})</span>
          </h3>
          <p className="text-xs text-slate-400">
            Giải nghĩa cô đọng, chuẩn xác các khái niệm then chốt trong Kỳ Môn Độn Giáp, Đại Lục Nhâm và Thiên Văn Hoàng Đạo.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm thuật ngữ (ví dụ: Trực Phù, Tam Truyền, Điểm Sóc...)"
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTerms.map((item) => {
          const isExpanded = expandedTermId === item.id;
          return (
            <div
              key={item.id}
              id={`term-${item.id}`}
              className="bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div>
                {/* Term Title & Badges */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/60">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors">
                        {item.term}
                      </h4>
                      {item.hanTu && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400/90 font-mono text-[11px]">
                          {item.hanTu}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${getCategoryBadgeClass(item.category)}`}>
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Definition */}
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {item.definition}
                </p>

                {/* Application */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Ứng Dụng Trong Chiêm Đoán:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {item.application}
                  </p>
                </div>

                {/* Optional Note / Expand */}
                {item.exampleOrNote && (
                  <div className="mt-2 text-[11px] text-slate-400 italic bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">
                    💡 <strong>Lưu ý:</strong> {item.exampleOrNote}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-800/40">
                <Tag className="w-3 h-3 text-slate-500" />
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSearchTerm(tag)}
                    className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 text-[10px] cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <HelpCircle className="w-7 h-7 text-slate-500 mx-auto" />
          <p className="text-xs text-slate-300 font-semibold">Không tìm thấy thuật ngữ với từ khóa "{searchTerm}"</p>
          <p className="text-[11px] text-slate-500">Hãy thử tìm từ khóa khác như Trực Phù, Bát Môn, Tứ Khoa, Tam Truyền, Điểm Sóc...</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 transition-colors mt-2"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
