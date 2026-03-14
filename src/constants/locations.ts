// Danh sách 63 tỉnh/thành phố Việt Nam (trước sát nhập)

export const VIETNAM_PROVINCES = [
    // 5 Thành phố trực thuộc Trung ương
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    // 58 Tỉnh
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
] as const;

export type Province = typeof VIETNAM_PROVINCES[number];

// Dữ liệu quận/huyện chi tiết cho 10 thành phố lớn
export const PROVINCE_TO_WARDS: Record<string, string[]> = {

    // ===== 1. TP. HỒ CHÍ MINH =====
    'TP. Hồ Chí Minh': [
        // Quận 1
        'Bến Nghé (Quận 1)', 'Bến Thành (Quận 1)', 'Đa Kao (Quận 1)', 'Tân Định (Quận 1)', 'Nguyễn Thái Bình (Quận 1)',
        // Quận 3
        'Võ Thị Sáu (Quận 3)', 'Phường 1 (Quận 3)', 'Phường 9 (Quận 3)', 'Phường 14 (Quận 3)',
        // Quận 5
        'Phường 1 (Quận 5)', 'Phường 2 (Quận 5)', 'Phường 4 (Quận 5)',
        // Quận 7
        'Tân Phú (Quận 7)', 'Tân Thuận (Quận 7)', 'Phú Mỹ (Quận 7)',
        // Quận 10
        'Phường 1 (Quận 10)', 'Phường 2 (Quận 10)', 'Phường 12 (Quận 10)',
        // Quận Bình Thạnh
        'Phường 1 (Quận Bình Thạnh)', 'Phường 22 (Quận Bình Thạnh)', 'Phường 25 (Quận Bình Thạnh)',
        // Quận Gò Vấp
        'Phường 1 (Quận Gò Vấp)', 'Phường 5 (Quận Gò Vấp)', 'Phường 10 (Quận Gò Vấp)',
        // Quận Tân Bình
        'Phường 1 (Quận Tân Bình)', 'Phường 2 (Quận Tân Bình)', 'Phường 15 (Quận Tân Bình)',
        // Quận Tân Phú
        'Hiệp Tân (Quận Tân Phú)', 'Phú Thạnh (Quận Tân Phú)', 'Sơn Kỳ (Quận Tân Phú)',
        // Quận Phú Nhuận
        'Phường 1 (Quận Phú Nhuận)', 'Phường 7 (Quận Phú Nhuận)', 'Phường 10 (Quận Phú Nhuận)',
        // TP. Thủ Đức
        'Thảo Điền (TP. Thủ Đức)', 'An Khánh (TP. Thủ Đức)', 'Bình Thọ (TP. Thủ Đức)',
        'Hiệp Bình Chánh (TP. Thủ Đức)', 'Linh Trung (TP. Thủ Đức)', 'Linh Chiểu (TP. Thủ Đức)',
    ],

    // ===== 2. HÀ NỘI =====
    'Hà Nội': [
        // Quận Hoàn Kiếm
        'Tràng Tiền (Quận Hoàn Kiếm)', 'Lý Thái Tổ (Quận Hoàn Kiếm)', 'Hàng Đào (Quận Hoàn Kiếm)', 'Hàng Bạc (Quận Hoàn Kiếm)',
        // Quận Ba Đình
        'Trúc Bạch (Quận Ba Đình)', 'Cống Vị (Quận Ba Đình)', 'Ngọc Hà (Quận Ba Đình)', 'Kim Mã (Quận Ba Đình)',
        // Quận Đống Đa
        'Kim Liên (Quận Đống Đa)', 'Láng Thượng (Quận Đống Đa)', 'Văn Miếu (Quận Đống Đa)', 'Ô Chợ Dừa (Quận Đống Đa)',
        // Quận Cầu Giấy
        'Dịch Vọng (Quận Cầu Giấy)', 'Mai Dịch (Quận Cầu Giấy)', 'Trung Hòa (Quận Cầu Giấy)',
        // Quận Thanh Xuân
        'Nhân Chính (Quận Thanh Xuân)', 'Thanh Xuân Trung (Quận Thanh Xuân)', 'Khương Mai (Quận Thanh Xuân)',
        // Quận Hai Bà Trưng
        'Bạch Mai (Quận Hai Bà Trưng)', 'Thanh Nhàn (Quận Hai Bà Trưng)', 'Minh Khai (Quận Hai Bà Trưng)',
        // Quận Nam Từ Liêm
        'Mỹ Đình 1 (Quận Nam Từ Liêm)', 'Mỹ Đình 2 (Quận Nam Từ Liêm)', 'Phú Đô (Quận Nam Từ Liêm)',
        // Quận Long Biên
        'Long Biên (Quận Long Biên)', 'Sài Đồng (Quận Long Biên)', 'Phúc Đồng (Quận Long Biên)',
        // Quận Hoàng Mai
        'Định Công (Quận Hoàng Mai)', 'Giáp Bát (Quận Hoàng Mai)', 'Linh Đàm (Quận Hoàng Mai)',
        // Quận Hà Đông
        'Quang Trung (Quận Hà Đông)', 'Nguyễn Trãi (Quận Hà Đông)', 'Văn Quán (Quận Hà Đông)',
    ],

    // ===== 3. ĐÀ NẴNG =====
    'Đà Nẵng': [
        // Quận Hải Châu
        'Hải Châu I (Quận Hải Châu)', 'Hải Châu II (Quận Hải Châu)', 'Thạch Thang (Quận Hải Châu)',
        'Phước Ninh (Quận Hải Châu)', 'Thanh Bình (Quận Hải Châu)', 'Nam Dương (Quận Hải Châu)',
        // Quận Thanh Khê
        'Thanh Khê Đông (Quận Thanh Khê)', 'Thanh Khê Tây (Quận Thanh Khê)', 'Tam Thuận (Quận Thanh Khê)',
        // Quận Liên Chiểu
        'Hòa Thạnh (Quận Liên Chiểu)', 'Hòa Minh (Quận Liên Chiểu)', 'Hòa Khánh Bắc (Quận Liên Chiểu)',
        // Quận Sơn Trà
        'An Hải Bắc (Quận Sơn Trà)', 'An Hải Tây (Quận Sơn Trà)', 'Phước Mỹ (Quận Sơn Trà)',
        // Quận Ngũ Hành Sơn
        'Mỹ An (Quận Ngũ Hành Sơn)', 'Khuê Mỹ (Quận Ngũ Hành Sơn)', 'Hòa Hải (Quận Ngũ Hành Sơn)',
        // Quận Cẩm Lệ
        'Khuê Trung (Quận Cẩm Lệ)', 'Hòa Xuân (Quận Cẩm Lệ)',
    ],

    // ===== 4. HẢI PHÒNG =====
    'Hải Phòng': [
        // Quận Ngô Quyền
        'Lạch Tray (Quận Ngô Quyền)', 'Máy Chai (Quận Ngô Quyền)', 'Đông Khê (Quận Ngô Quyền)',
        // Quận Lê Chân
        'Trần Nguyên Hãn (Quận Lê Chân)', 'Niệm Nghĩa (Quận Lê Chân)', 'An Biên (Quận Lê Chân)', 'Cát Dài (Quận Lê Chân)',
        // Quận Hồng Bàng
        'Quán Toan (Quận Hồng Bàng)', 'Phan Bội Châu (Quận Hồng Bàng)', 'Hoàng Văn Thụ (Quận Hồng Bàng)',
        // Quận Kiến An
        'Trần Thành Ngọ (Quận Kiến An)', 'Bắc Sơn (Quận Kiến An)',
        // Quận Hải An
        'Đằng Hải (Quận Hải An)', 'Đằng Lâm (Quận Hải An)', 'Tràng Cát (Quận Hải An)',
        // Quận Đồ Sơn
        'Đồ Sơn (Quận Đồ Sơn)', 'Ngọc Xuyên (Quận Đồ Sơn)',
    ],

    // ===== 5. CẦN THƠ =====
    'Cần Thơ': [
        // Quận Ninh Kiều
        'An Hòa (Quận Ninh Kiều)', 'Tân An (Quận Ninh Kiều)', 'An Nghiệp (Quận Ninh Kiều)',
        'Xuân Khánh (Quận Ninh Kiều)', 'An Cư (Quận Ninh Kiều)', 'An Phú (Quận Ninh Kiều)',
        // Quận Bình Thủy
        'Bình Thủy (Quận Bình Thủy)', 'Long Hòa (Quận Bình Thủy)', 'An Thới (Quận Bình Thủy)',
        // Quận Cái Răng
        'Lê Bình (Quận Cái Răng)', 'Hưng Phú (Quận Cái Răng)', 'Ba Láng (Quận Cái Răng)',
        // Quận Ô Môn
        'Châu Văn Liêm (Quận Ô Môn)', 'Thới An (Quận Ô Môn)',
        // Quận Thốt Nốt
        'Thốt Nốt (Quận Thốt Nốt)', 'Trung Nhứt (Quận Thốt Nốt)',
    ],

    // ===== 6. BÌNH DƯƠNG =====
    'Bình Dương': [
        // TP. Thủ Dầu Một
        'Phú Cường (TP. Thủ Dầu Một)', 'Hiệp Thành (TP. Thủ Dầu Một)', 'Chánh Nghĩa (TP. Thủ Dầu Một)',
        'Phú Hòa (TP. Thủ Dầu Một)', 'Định Hòa (TP. Thủ Dầu Một)',
        // TP. Thuận An
        'Lái Thiêu (TP. Thuận An)', 'An Thạnh (TP. Thuận An)', 'Vĩnh Phú (TP. Thuận An)',
        'Thuận Giao (TP. Thuận An)', 'Bình Chuẩn (TP. Thuận An)',
        // TP. Dĩ An
        'Dĩ An (TP. Dĩ An)', 'An Bình (TP. Dĩ An)', 'Tân Đông Hiệp (TP. Dĩ An)', 'Bình An (TP. Dĩ An)',
        // TP. Tân Uyên
        'Uyên Hưng (TP. Tân Uyên)', 'Tân Phước Khánh (TP. Tân Uyên)',
        // TX. Bến Cát
        'Mỹ Phước (TX. Bến Cát)', 'Thới Hòa (TX. Bến Cát)',
    ],

    // ===== 7. ĐỒNG NAI =====
    'Đồng Nai': [
        // TP. Biên Hòa
        'Quyết Thắng (TP. Biên Hòa)', 'Thống Nhất (TP. Biên Hòa)', 'Trung Dũng (TP. Biên Hòa)',
        'Trảng Dài (TP. Biên Hòa)', 'Hố Nai (TP. Biên Hòa)', 'Tân Hiệp (TP. Biên Hòa)',
        'Long Bình (TP. Biên Hòa)', 'Phước Tân (TP. Biên Hòa)', 'Tam Phước (TP. Biên Hòa)',
        'Tân Biên (TP. Biên Hòa)', 'Bửu Hòa (TP. Biên Hòa)',
        // TP. Long Khánh
        'Xuân An (TP. Long Khánh)', 'Xuân Bình (TP. Long Khánh)', 'Phú Bình (TP. Long Khánh)',
        // Huyện Nhơn Trạch
        'Phú Hội (H. Nhơn Trạch)', 'Long Thọ (H. Nhơn Trạch)',
    ],

    // ===== 8. KHÁNH HÒA =====
    'Khánh Hòa': [
        // TP. Nha Trang
        'Lộc Thọ (TP. Nha Trang)', 'Tân Lập (TP. Nha Trang)', 'Vạn Thắng (TP. Nha Trang)',
        'Phước Hải (TP. Nha Trang)', 'Vĩnh Hải (TP. Nha Trang)', 'Vĩnh Phước (TP. Nha Trang)',
        'Phương Sài (TP. Nha Trang)', 'Xương Huân (TP. Nha Trang)',
        // TP. Cam Ranh
        'Cam Phú (TP. Cam Ranh)', 'Cam Lộc (TP. Cam Ranh)', 'Ba Ngòi (TP. Cam Ranh)',
        // TX. Ninh Hòa
        'Ninh Hiệp (TX. Ninh Hòa)', 'Ninh Giang (TX. Ninh Hòa)',
    ],

    // ===== 9. THỪA THIÊN HUẾ =====
    'Thừa Thiên Huế': [
        // TP. Huế
        'Phú Hội (TP. Huế)', 'Phú Nhuận (TP. Huế)', 'Vĩnh Ninh (TP. Huế)',
        'Tây Lộc (TP. Huế)', 'Thuận Lộc (TP. Huế)', 'Thuận Thành (TP. Huế)',
        'Phú Hậu (TP. Huế)', 'Xuân Phú (TP. Huế)', 'An Cựu (TP. Huế)',
        'Hương Sơ (TP. Huế)', 'Kim Long (TP. Huế)', 'Phường Đúc (TP. Huế)',
        // TX. Hương Thủy
        'Thủy Vân (TX. Hương Thủy)', 'Phú Bài (TX. Hương Thủy)',
        // TX. Hương Trà
        'Tứ Hạ (TX. Hương Trà)', 'Hương Xuân (TX. Hương Trà)',
    ],

    // ===== 10. QUẢNG NINH =====
    'Quảng Ninh': [
        // TP. Hạ Long
        'Hồng Hà (TP. Hạ Long)', 'Bạch Đằng (TP. Hạ Long)', 'Trần Hưng Đạo (TP. Hạ Long)',
        'Hồng Gai (TP. Hạ Long)', 'Hà Khánh (TP. Hạ Long)', 'Bãi Cháy (TP. Hạ Long)',
        'Cao Xanh (TP. Hạ Long)', 'Hà Lầm (TP. Hạ Long)',
        // TP. Móng Cái
        'Ka Long (TP. Móng Cái)', 'Trần Phú (TP. Móng Cái)', 'Ninh Dương (TP. Móng Cái)',
        // TP. Cẩm Phả
        'Cẩm Phú (TP. Cẩm Phả)', 'Cẩm Thành (TP. Cẩm Phả)',
        // TX. Đông Triều
        'Mạo Khê (TX. Đông Triều)', 'Đông Triều (TX. Đông Triều)',
        // TX. Quảng Yên
        'Quảng Yên (TX. Quảng Yên)', 'Yên Giang (TX. Quảng Yên)',
    ],
};

export const ALL_WARDS = Object.values(PROVINCE_TO_WARDS).flat();
