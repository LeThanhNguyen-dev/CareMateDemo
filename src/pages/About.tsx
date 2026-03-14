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
    <div className="pt-24 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thắp sáng <span className="text-brand-500">Hành trình Làm mẹ</span>
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            CareMate được thành lập với sứ mệnh đảm bảo mọi bà mẹ đều được tiếp cận dịch vụ điều dưỡng chuyên nghiệp, tận tâm tại nhà.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-brand-50 p-8 rounded-xl border border-brand-100">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white mb-5">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Sứ Mệnh</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Đồng hành cùng các bà mẹ trong giai đoạn hậu sản bằng dịch vụ chăm sóc chuyên gia, hỗ trợ tinh thần và kiến thức chuẩn y khoa.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Tầm Nhìn</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Trở thành chuẩn mực về chăm sóc mẹ và bé tại nhà, nơi không một người mẹ nào cảm thấy đơn độc.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tại sao chọn CareMate?</h2>
            <p className="text-gray-500 text-sm">Tiêu chuẩn cao nhất về chăm sóc Mẹ và Bé.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Chuyên Gia Bằng Cấp', desc: 'Mỗi điều dưỡng đều có chứng chỉ, kiểm tra lý lịch và giàu kinh nghiệm.', icon: ShieldCheck, color: 'text-brand-600 bg-brand-50' },
              { title: 'Chăm Sóc Cá Nhân', desc: 'Kết nối với điều dưỡng chuyên môn cao, hiểu rõ nhu cầu của bạn.', icon: Heart, color: 'text-blue-600 bg-blue-50' },
              { title: 'Lịch Trình Linh Hoạt', desc: 'Đặt dịch vụ khi cần — từ tư vấn 1 giờ đến hỗ trợ xuyên đêm.', icon: Award, color: 'text-amber-600 bg-amber-50' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Đội Ngũ Chuyên Gia</h2>
            <p className="text-gray-500 text-sm">Những người đứng sau chất lượng dịch vụ.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Elena Rossi', role: 'Giám Đốc Y Tế', img: 'https://i.pravatar.cc/100?img=47' },
              { name: 'Sarah Jenkins, RN', role: 'Trưởng Nhóm ĐD', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop' },
              { name: 'Michael Chen, RN', role: 'Cố Vấn NICU', img: 'https://i.pravatar.cc/100?img=11' },
              { name: 'Aisha Khan, IBCLC', role: 'Trưởng Nhóm Sữa Mẹ', img: 'https://i.pravatar.cc/100?img=32' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 border border-gray-100">
                  <img src={member.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
                <p className="text-xs text-brand-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 mb-5">
            <Users className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-xs font-medium text-gray-700">Gia nhập cộng đồng</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trải nghiệm sự khác biệt cùng CareMate</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex items-center text-gray-600 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1.5" />
              Chuyên Gia Xác Nhận
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div className="flex items-center text-gray-600 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1.5" />
              Hỗ Trợ 24/7
            </div>
          </div>
          <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-colors inline-flex items-center">
            Tìm Điều Dưỡng Ngay
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
