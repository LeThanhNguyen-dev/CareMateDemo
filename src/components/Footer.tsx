import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center mr-2">
                <Heart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CareMom</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Đồng hành cùng các bà mẹ với dịch vụ chăm sóc tận tình và chuyên nghiệp. Chúng tôi đưa dịch vụ chuẩn bệnh viện về ngôi nhà của bạn.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Dịch Vụ</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Chăm Sóc Hậu Sản</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Massage Sơ Sinh</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Tư Vấn Sữa Mẹ</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Bảo Mẫu Ca Đêm</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Công Ty</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Về Chúng Tôi</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Đội Ngũ Điều Dưỡng</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Tuyển Dụng</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Liên Hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-pink-400" />
                +84 (123) 456-789
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-pink-400" />
                hotro@caremom.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                12 Đường Chăm Sóc, TP. Hồ Chí Minh
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center text-xs">
          <p>© 2024 CareMom. Mọi quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều Khoản Dịch Vụ</a>
            <a href="#" className="hover:text-white transition-colors">Chính Sách Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
