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
      <section className="py-12 bg-pink-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Điều dưỡng đã xác minh', value: '500+' },
              { label: 'Mẹ bỉm hạnh phúc', value: '5,000+' },
              { label: 'Ca chăm sóc', value: '12,000+' },
              { label: 'Đánh giá trung bình', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-pink-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dịch Vụ Chuyên Biệt</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng dịch vụ chăm sóc phù hợp với nhu cầu riêng biệt của mẹ và bé sơ sinh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => onNavigate('services')}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center text-pink-400 font-bold hover:text-pink-400 transition-colors"
            >
              Xem Tất Cả Dịch Vụ
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">CareMom Hoạt Động Như Thế Nào</h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Tìm & Bộ Lọc',
                    desc: 'Tìm kiếm điều dưỡng phù hợp dựa trên chuyên môn, kinh nghiệm và lịch trống.',
                    icon: Users,
                    color: 'bg-blue-100 text-blue-600'
                  },
                  {
                    title: 'Đặt Lịch Hẹn',
                    desc: 'Chọn ngày giờ thuận tiện với bạn. Mọi đặt lịch luôn linh hoạt và bảo mật.',
                    icon: Clock,
                    color: 'bg-pink-100 text-pink-400'
                  },
                  {
                    title: 'Nhận Dịch Vụ Chuyên Gia',
                    desc: 'Điều dưỡng chứng chỉ sẽ đến tận nhà bạn để cung cấp dịch vụ chăm sóc chuyên nghiệp.',
                    icon: ShieldCheck,
                    color: 'bg-green-100 text-green-600'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", step.color)}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
                  alt="Nursing Care"
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl hidden lg:block max-w-xs">
                <div className="flex items-center space-x-2 text-pink-400 mb-4">
                  <Award className="w-6 h-6" />
                  <span className="font-bold">Đảm Bảo Chất Lượng</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  "Sự chăm sóc mà tôi nhận được từ chị Sarah đã giúp tôi thay đổi rất nhiều. Chị ấy giúp tôi vượt qua những tuần đầu khó khăn nhất."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <img src="https://i.pravatar.cc/100?img=32" className="w-8 h-8 rounded-full" />
                  <span className="text-xs font-bold text-slate-900">Jessica M., Mẹ bỉm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareMom Section */}
      <section className="py-24 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tiêu Chuẩn CareMom</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Chúng tôi hiểu thời kỳ hậu sản rất nhạy cảm. Vì vậy chúng tôi mang tiêu chuẩn chăm sóc cao nhất tới tận nhà bạn.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-pink-400 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Chăm Sóc Tận Tâm</h3>
              <p className="text-sm text-slate-500">Moị điều dưỡng đều được chọn lọc bằng sự đồng cảm và vì sức khỏe mẹ bé.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Được Xác Thực</h3>
              <p className="text-sm text-slate-500">Kiểm tra lý lịch pháp lý và chứng chỉ chuyên môn khắt khe.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-amber-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Đánh Giá Nổi Bật</h3>
              <p className="text-sm text-slate-500">Đạt 5 sao tuyệt đối từ những khách hàng khắt khe nhất.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Phản Hồi Nhanh</h3>
              <p className="text-sm text-slate-500">Đặt lịch dễ dàng và linh hoạt cho các trường hợp cấp bách.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Nurses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Điều Dưỡng Hàng Đầu</h2>
              <p className="text-slate-500">Những chuyên gia giàu tinh hoa và dày dặn kinh nghiệm nhất.</p>
            </div>
            <button
              onClick={() => onNavigate('nurses')}
              className="hidden md:flex items-center text-pink-400 font-bold hover:text-pink-400 transition-colors"
            >
              Xem Tất Cả Điều Dưỡng
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {NURSES.map((nurse) => (
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
      <section className="py-24 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Sẵn sàng trải nghiệm dịch vụ chăm sóc hoàn hảo?</h2>
            <p className="text-lg text-slate-600 mb-10">
              Hãy gia nhập cùng ngàn mẹ bỉm sữa tin cậy CareMom vì sự chuyên nghiệp và tận tụy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-10 py-4 bg-pink-300 text-white rounded-full font-bold hover:bg-pink-300 transition-all shadow-lg shadow-pink-200"
              >
                Bắt Đầu Ngay
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Đăng Ký Khám
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
