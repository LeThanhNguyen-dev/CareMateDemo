import React from 'react';
import {
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  Award,
  Heart,
  CheckCircle2,
  Star,
  Zap
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES, NURSES } from '../types';
import { NurseCard } from '../components/NurseCard';
import { cn } from '../lib/utils';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      <Hero onStart={() => onNavigate('services')} />

      {/* Stats Section */}
      <section className="py-10 bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Điều dưỡng đã xác minh', value: '500+' },
              { label: 'Mẹ bỉm hạnh phúc', value: '5.000+' },
              { label: 'Ca chăm sóc', value: '12.000+' },
              { label: 'Đánh giá trung bình', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-2xl md:text-3xl font-bold mb-0.5">{stat.value}</p>
                <p className="text-brand-200 text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Dịch Vụ Chuyên Biệt</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Đa dạng dịch vụ chăm sóc, thiết kế riêng cho nhu cầu của mẹ và bé sơ sinh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => onNavigate('services')}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors"
            >
              Xem tất cả dịch vụ
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Quy trình đơn giản</h2>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Tìm & Lọc',
                    desc: 'Tìm kiếm điều dưỡng phù hợp dựa trên chuyên môn, kinh nghiệm và lịch trống.',
                    icon: Users,
                  },
                  {
                    step: '02',
                    title: 'Đặt lịch hẹn',
                    desc: 'Chọn ngày giờ thuận tiện. Mọi đặt lịch luôn linh hoạt và bảo mật.',
                    icon: Clock,
                  },
                  {
                    step: '03',
                    title: 'Nhận dịch vụ',
                    desc: 'Điều dưỡng có chứng chỉ sẽ đến tận nhà cung cấp dịch vụ chuyên nghiệp.',
                    icon: ShieldCheck,
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-brand-600">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
                  alt="Dịch vụ điều dưỡng"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-lg hidden lg:block max-w-[260px] border border-gray-100">
                <div className="flex items-center gap-2 text-brand-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">Đảm bảo chất lượng</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  "Dịch vụ từ chị Sarah giúp tôi vượt qua những tuần đầu khó khăn nhất."
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <img src="https://i.pravatar.cc/80?img=32" className="w-6 h-6 rounded-full" />
                  <span className="text-[11px] font-medium text-gray-700">Jessica M.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareMate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Tiêu chuẩn CareMate</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Tiêu chuẩn chăm sóc cao nhất, mang đến tận nhà bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: Heart, label: 'Chăm Sóc Tận Tâm', desc: 'Mỗi điều dưỡng được chọn lọc kỹ càng về sự đồng cảm và chuyên môn.', color: 'text-red-500 bg-red-50' },
              { icon: CheckCircle2, label: 'Được Xác Thực', desc: 'Kiểm tra lý lịch pháp lý và chứng chỉ chuyên môn nghiêm ngặt.', color: 'text-green-600 bg-green-50' },
              { icon: Star, label: 'Đánh Giá Cao', desc: 'Đạt 5 sao từ những khách hàng khắt khe nhất.', color: 'text-amber-500 bg-amber-50' },
              { icon: Zap, label: 'Phản Hồi Nhanh', desc: 'Đặt lịch dễ dàng cho các trường hợp cấp bách.', color: 'text-blue-600 bg-blue-50' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Nurses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Điều dưỡng hàng đầu</h2>
              <p className="text-gray-500 text-sm">Những chuyên gia giàu kinh nghiệm nhất.</p>
            </div>
            <button
              onClick={() => onNavigate('nurses')}
              className="hidden md:flex items-center text-brand-600 font-semibold text-sm hover:text-brand-700 transition-colors"
            >
              Xem tất cả
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {NURSES.slice(0, 3).map((nurse) => (
              <NurseCard
                key={nurse.id}
                nurse={nurse}
                onClick={() => onNavigate('services')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Sẵn sàng trải nghiệm?</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Gia nhập cùng hàng ngàn mẹ bỉm tin tưởng CareMate.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onNavigate('services')}
                className="px-8 py-3 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-colors"
              >
                Bắt đầu ngay
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Tạo tài khoản
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
