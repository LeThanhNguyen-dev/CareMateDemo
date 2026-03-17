import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-5">
              <img src="/logo.png" alt="CareMate Logo" className="h-20 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-500">
              Đồng hành cùng các bà mẹ với dịch vụ chăm sóc tận tình. Chuẩn bệnh viện, tại nhà bạn.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Dịch Vụ</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Chăm Sóc Hậu Sản</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Massage Sơ Sinh</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Tư Vấn Sữa Mẹ</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Bảo Mẫu Ca Đêm</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Công Ty</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Về Chúng Tôi</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Đội Ngũ Điều Dưỡng</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Tuyển Dụng</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Liên Hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Liên Hệ</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-500" />
                +84 (123) 456-789
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                hotro@CareMate.vn
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                12 Nguyễn Huệ, Q.1, TP.HCM
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 CareMate. Mọi quyền được bảo lưu.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Điều Khoản</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
