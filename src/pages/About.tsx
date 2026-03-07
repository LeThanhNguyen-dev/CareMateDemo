import React from 'react';
import {
  Heart,
  ShieldCheck,
  Award,
  Target,
  Eye,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Thắp Sáng <span className="text-pink-400">Hành Trình Làm Mẹ</span></h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
              CareMom được thành lập với một sứ mệnh giản đơn: đảm bảo mọi bà mẹ đều được tiếp cận dịch vụ điều dưỡng chuyên nghiệp, tận tâm ngay tại ngôi nhà của mình.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-pink-50 p-10 rounded-[40px] border border-pink-100">
            <div className="w-12 h-12 bg-pink-300 rounded-2xl flex items-center justify-center text-white mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sứ Mệnh</h2>
            <p className="text-slate-600 leading-relaxed">
              Đồng hành cùng các bà mẹ trong giai đoạn hậu sản quan trọng bằng cách cung cấp dịch vụ chăm sóc chuyên gia, hỗ trợ tinh thần và cung cấp các kiến thức chuẩn y khoa, giúp mẹ tự tin tận hưởng hành trình làm mẹ khỏe mạnh.
            </p>
          </div>
          <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tầm Nhìn</h2>
            <p className="text-slate-600 leading-relaxed">
              Trở thành chuẩn mực toàn cầu về chăm sóc mẹ và bé tại nhà, tạo ra một thế giới nơi không một người mẹ nào cảm thấy đơn độc hoặc thiếu thốn sự hỗ trợ.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại Sao Chọn CareMom?</h2>
            <p className="text-slate-500">Chúng tôi thiết lập tiêu chuẩn cao nhất về chăm sóc Mẹ và Bé.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chuyên Gia Bằng Cấp',
                desc: 'Mỗi điều dưỡng trên nền tảng của chúng tôi đều được cấp chứng chỉ, kiểm tra lý lịch và giàu kinh nghiệm.',
                icon: ShieldCheck,
                color: 'text-pink-400 bg-pink-100'
              },
              {
                title: 'Chăm Sóc Cá Nhân Hóa',
                desc: 'Chúng tôi kết nối bạn với những điều dưỡng chuyên môn cao, biết chính xách những gì bạn và con bạn cần.',
                icon: Heart,
                color: 'text-blue-600 bg-blue-100'
              },
              {
                title: 'Lịch Trình Linh Hoạt',
                desc: 'Đặt dịch vụ khi bạn cần—từ tư vấn một giờ cho đến hỗ trợ xuyên đêm.',
                icon: Award,
                color: 'text-amber-600 bg-amber-100'
              }
            ].map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6", item.color)}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Đội Ngũ Điều Dưỡng Trưởng</h2>
            <p className="text-slate-500">Những chuyên gia đằng sau chất lượng dịch vụ của chúng tôi.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Elena Rossi', role: 'Giám Đốc Y Tế', img: 'https://i.pravatar.cc/100?img=47' },
              { name: 'Sarah Jenkins, RN', role: 'Trưởng Nhóm Điều Dưỡng', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop' },
              { name: 'Michael Chen, RN', role: 'Cố Vấn NICU', img: 'https://i.pravatar.cc/100?img=11' },
              { name: 'Aisha Khan, IBCLC', role: 'Trưởng Nhóm Sữa Mẹ', img: 'https://i.pravatar.cc/100?img=32' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-pink-50 shadow-lg">
                  <img src={member.img} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-pink-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* New CTA Section */}
        <div className="mt-20 bg-slate-50 rounded-[40px] p-12 text-center border border-slate-100">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 mb-6">
            <Users className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold text-slate-700">Gia nhập cộng đồng ngày càng lớn mạnh</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Sẵn sàng trải nghiệm sự khác biệt cùng CareMom?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex items-center text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>Chuyên Gia Được Xác Nhận</span>
            </div>
            <div className="hidden sm:block text-slate-300">•</div>
            <div className="flex items-center text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>Hỗ Trợ 24/7</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-pink-300 text-white rounded-full font-bold hover:bg-pink-300 transition-all shadow-lg shadow-pink-200 flex items-center mx-auto">
            Tìm Người Chăm Sóc Ngay
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
