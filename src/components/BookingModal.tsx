import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Nurse, SERVICES } from '../types';
import { cn } from '../lib/utils';

interface BookingModalProps {
  nurse: Nurse | null;
  onClose: () => void;
  onConfirm: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ nurse, onClose, onConfirm }) => {
  const [step, setStep] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<number | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedService, setSelectedService] = React.useState(SERVICES[0].id);

  if (!nurse) return null;

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleConfirm = () => {
    onConfirm({
      nurseId: nurse.id,
      nurseName: nurse.name,
      nurseImage: nurse.image,
      serviceTitle: SERVICES.find(s => s.id === selectedService)?.title || '',
      date: days[selectedDate || 0].toLocaleDateString(),
      time: selectedTime,
      status: 'confirmed'
    });
    setStep(3);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={nurse.image} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-slate-900">{nurse.name}</h3>
                <p className="text-xs text-pink-400 font-medium">{nurse.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-900 mb-6">Chọn Dịch Vụ & Tuỳ Chỉnh</h4>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Loại Hình Dịch Vụ</label>
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            "p-3 rounded-xl border text-left transition-all",
                            selectedService === service.id
                              ? "border-pink-300 bg-pink-50 text-pink-400"
                              : "border-slate-200 hover:border-pink-200"
                          )}
                        >
                          <p className="text-sm font-bold">{service.title}</p>
                          <p className="text-xs opacity-70">${service.price}/{service.unit}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Chọn Ngày</label>
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                      {days.map((day, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(i)}
                          className={cn(
                            "flex-shrink-0 w-16 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all",
                            selectedDate === i
                              ? "border-pink-300 bg-pink-300 text-white shadow-lg shadow-pink-200"
                              : "border-slate-200 hover:border-pink-200"
                          )}
                        >
                          <span className="text-[10px] uppercase font-bold opacity-70">
                            {day.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-xl font-bold">{day.getDate()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Giờ Có Sẵn</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 rounded-lg border text-xs font-bold transition-all",
                            selectedTime === time
                              ? "border-pink-300 bg-pink-50 text-pink-400"
                              : "border-slate-200 hover:border-pink-200"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    disabled={selectedDate === null || selectedTime === null}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-pink-300 text-white rounded-2xl font-bold hover:bg-pink-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-200"
                  >
                    Tiếp Tục Thanh Toán
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={() => setStep(1)} className="flex items-center text-sm font-bold text-slate-500 mb-6 hover:text-pink-400">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Quay Lại
                </button>
                <h4 className="text-xl font-bold text-slate-900 mb-6">Xác Nhận & Thanh Toán</h4>

                <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Dịch Vụ</span>
                    <span className="font-bold text-slate-900">{SERVICES.find(s => s.id === selectedService)?.title}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Ngày & Giờ</span>
                    <span className="font-bold text-slate-900">
                      {days[selectedDate || 0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Điều Dưỡng</span>
                    <span className="font-bold text-slate-900">{nurse.name}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-4" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-900">Tổng Cộng</span>
                    <span className="font-bold text-pink-400">${SERVICES.find(s => s.id === selectedService)?.price}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-pink-300 bg-pink-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 text-pink-400 mr-4" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">Visa đuôi 4242</p>
                        <p className="text-xs text-slate-500">Hết hạn 12/26</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-pink-400">Thay Đổi</button>
                  </div>

                  <div className="flex items-start p-4 bg-blue-50 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Khoản thanh toán của bạn được Dịch vụ Bảo vệ CareMate đảm bảo. Tiền chỉ được chuyển cho điều dưỡng sau khi phiên chăm sóc hoàn tất.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-pink-300 text-white rounded-2xl font-bold hover:bg-pink-300 transition-all shadow-lg shadow-pink-200"
                  >
                    Xác Nhận Đặt Lịch
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Đặt Lịch Thành Công!</h4>
                <p className="text-slate-500 mb-8">
                  Phiên của bạn với {nurse.name} đã được lên lịch. Bạn sẽ sớm nhận được email xác nhận.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-pink-300 text-white rounded-full font-bold hover:bg-pink-300 transition-all"
                >
                  Đến Bảng Điều Khiển
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
