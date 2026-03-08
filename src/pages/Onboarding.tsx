import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileText,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Camera,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import * as storage from '../lib/storage';

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = React.useState(1);

  const steps = [
    { id: 1, label: 'Thông Tin', icon: User },
    { id: 2, label: 'Kinh Nghiệm', icon: Award },
    { id: 3, label: 'Xác Thực', icon: ShieldCheck },
    { id: 4, label: 'Hoàn Tất', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                  step >= s.id ? "bg-brand-600 text-white" : "bg-white text-gray-300 border border-gray-200"
                )}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className={cn(
                  "text-[10px] font-medium mt-1.5",
                  step >= s.id ? "text-brand-600" : "text-gray-400"
                )}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-brand-600" initial={{ width: '0%' }} animate={{ width: `${(step / steps.length) * 100}%` }} />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
        >
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Giới thiệu về bạn</h2>
              <p className="text-gray-500 text-sm mb-6">Thông tin sẽ hiển thị trên hồ sơ công khai.</p>

              <div className="space-y-5">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-dashed border-gray-300">
                      <Camera className="w-7 h-7 text-gray-300" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Chức Danh</label>
                    <input type="text" placeholder="VD: Điều Dưỡng Cấp Cao" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Chuyên Môn</label>
                    <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none">
                      <option>Khám Hậu Sản</option>
                      <option>Chăm Sóc Sơ Sinh</option>
                      <option>Tư Vấn Sữa Mẹ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tiểu Sử</label>
                  <textarea rows={3} placeholder="Mô tả ngắn gọn kinh nghiệm..." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Kinh Nghiệm & Kỹ Năng</h2>
              <p className="text-gray-500 text-sm mb-6">Chứng chỉ và nền tảng chuyên môn.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Số Năm Kinh Nghiệm</label>
                  <input type="number" className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Chứng Chỉ</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['RN', 'LPN', 'IBCLC', 'CPR', 'First Aid', 'NICU'].map((cert) => (
                      <label key={cert} className="flex items-center p-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-brand-50 transition-colors border border-gray-200 hover:border-brand-200">
                        <input type="checkbox" className="rounded text-brand-600 border-gray-300 focus:ring-brand-200" />
                        <span className="ml-2.5 text-sm font-medium text-gray-700">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Tài Liệu Xác Thực</h2>
              <p className="text-gray-500 text-sm mb-6">Tải lên giấy phép hành nghề và CMND/CCCD.</p>

              <div className="space-y-3">
                {[
                  { label: 'Giấy Phép Hành Nghề', desc: 'Ảnh chụp hoặc PDF.' },
                  { label: 'CMND / CCCD', desc: 'Mặt trước và sau.' },
                  { label: 'Lý Lịch Tư Pháp', desc: 'Tùy chọn.' },
                ].map((doc, i) => (
                  <div key={i} className="p-4 border border-dashed border-gray-200 rounded-xl hover:border-brand-300 transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doc.label}</p>
                          <p className="text-xs text-gray-400">{doc.desc}</p>
                        </div>
                      </div>
                      <Upload className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Đã Nộp Hồ Sơ!</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Đội ngũ sẽ xác minh hồ sơ trong 24-48 giờ.
              </p>
              <div className="bg-brand-50 p-4 rounded-xl mb-6 flex items-start text-left border border-brand-100">
                <ShieldCheck className="w-5 h-5 text-brand-600 mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-brand-700">Bước tiếp theo</p>
                  <p className="text-xs text-brand-600 leading-relaxed mt-0.5">
                    Khi được xác nhận, bạn sẽ nhận email kích hoạt để bắt đầu nhận bệnh nhân.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && step < 4 && (
              <button onClick={() => setStep(step - 1)} className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Quay Lại
              </button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all flex items-center"
                >
                  {step === 3 ? 'Nộp Hồ Sơ' : 'Tiếp Tục'}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const currentUser = storage.getCurrentUser();
                    if (currentUser) {
                      storage.saveUser({ ...currentUser, title: 'Nurse Practitioner', specialization: ['Newborn Care'], isVerified: true });
                    }
                    onComplete();
                  }}
                  className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all"
                >
                  Tới Bảng Điều Khiển
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
