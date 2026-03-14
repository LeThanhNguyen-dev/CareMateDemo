import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronLeft,
    ChevronRight,
    Sun,
    CloudSun,
    Moon,
    MapPin,
    CalendarDays,
    CreditCard,
    Wallet,
    Star,
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Facebook,
    Info,
    ThumbsUp,
    Award,
    Briefcase,
} from 'lucide-react';
import { Nurse, SERVICES } from '../types';

interface BookingPageProps {
    onBack: () => void;
    onConfirm: (bookingData: any) => void;
    nurse: Nurse;
}

const DAYS_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const MONTH_NAMES = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const TIME_SLOTS = {
    morning: ['07:00', '08:00', '09:00', '10:00', '11:00'],
    afternoon: ['12:00', '13:00', '14:00', '15:00', '16:00'],
    evening: ['17:00', '18:00', '19:00', '20:00', '21:00'],
};

const UNAVAILABLE = new Set(['09:00', '13:00', '19:00']);
const SERVICE_CHARGE = 15;

export const BookingPage: React.FC<BookingPageProps> = ({ nurse, onBack, onConfirm }) => {
    const today = new Date();
    const [viewYear, setViewYear] = React.useState(today.getFullYear());
    const [viewMonth, setViewMonth] = React.useState(today.getMonth());
    const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
    const [timePeriod, setTimePeriod] = React.useState<'morning' | 'afternoon' | 'evening'>('morning');
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'wallet'>('card');
    const [confirmed, setConfirmed] = React.useState(false);

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const isPastDay = (day: number) => {
        const d = new Date(viewYear, viewMonth, day); d.setHours(0, 0, 0, 0);
        const t = new Date(); t.setHours(0, 0, 0, 0);
        return d < t;
    };

    const selectedDate = selectedDay !== null
        ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    const selectedService = SERVICES.find(s => nurse.services.includes(s.id));
    const sessionFee = selectedService?.price ?? nurse.hourlyRate * 4;
    const total = sessionFee + SERVICE_CHARGE;
    const canConfirm = selectedDay !== null && selectedTime !== null;

    const handleConfirm = () => {
        if (!canConfirm) return;
        onConfirm({
            nurseId: nurse.id, nurseName: nurse.name, nurseImage: nurse.image,
            serviceTitle: selectedService?.title ?? 'Phiên Chăm Sóc',
            date: selectedDate, time: selectedTime, status: 'confirmed',
        });
        setConfirmed(true);
    };

    if (confirmed) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="bg-white rounded-2xl p-10 shadow-md max-w-md w-full text-center mx-4 border border-gray-100"
                >
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                        className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-5"
                    >
                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </motion.div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Đặt Lịch Thành Công!</h2>
                    <p className="text-gray-400 text-sm mb-1">
                        Phiên chăm sóc với <span className="font-medium text-gray-700">{nurse.name}</span> đã được lên lịch.
                    </p>
                    <p className="text-gray-400 text-sm mb-6">{selectedDate} · {selectedTime}</p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
                        <div className="flex justify-between mb-1.5">
                            <span className="text-gray-400">Phí Dịch Vụ</span>
                            <span className="font-medium text-gray-700">${sessionFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Phí Hệ Thống</span>
                            <span className="font-medium text-gray-700">${SERVICE_CHARGE.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
                            <span className="text-gray-800">Tổng</span>
                            <span className="text-brand-500 text-lg">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button onClick={onBack} className="w-full py-2.5 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 active:scale-[0.97] transition-all text-sm">
                        Quản Lý Lịch Đặt
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 mb-3 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Quay lại
                    </button>
                    
                    {/* Description Toolbar */}
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center shrink-0">
                            <Info className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-brand-900 mb-0.5">Lưu ý đặt lịch</h4>
                            <p className="text-xs text-brand-700 leading-relaxed">
                                Bạn vui lòng chọn ngày và giờ phù hợp. Chuyên viên của chúng tôi sẽ xác nhận lại yêu cầu trong vòng 15 phút. 
                                Đảm bảo thông tin liên hệ của bạn là chính xác để chúng tôi có thể hỗ trợ tốt nhất.
                            </p>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Đặt Lịch Chăm Sóc</h1>
                    <p className="text-gray-400 text-sm">Chọn ngày giờ và hoàn tất thanh toán.</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex-1 space-y-5">
                        {/* Calendar */}
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-base font-semibold text-gray-800">Chọn Ngày</h2>
                                <div className="flex items-center gap-3">
                                    <button onClick={prevMonth} className="text-gray-300 hover:text-brand-600 transition-colors p-1"><ChevronLeft className="w-4 h-4" /></button>
                                    <span className="font-medium text-gray-700 text-sm min-w-[120px] text-center">{MONTH_NAMES[viewMonth]} {viewYear}</span>
                                    <button onClick={nextMonth} className="text-gray-300 hover:text-brand-600 transition-colors p-1"><ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 mb-2">
                                {DAYS_OF_WEEK.map(d => (
                                    <div key={d} className="text-center text-xs font-medium text-gray-400 py-1.5">{d}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-y-1">
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const past = isPastDay(day);
                                    const isSelected = selectedDay === day && !past;
                                    return (
                                        <button
                                            key={day} disabled={past}
                                            onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                                            className={`mx-auto flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all
                                                ${past ? 'text-gray-200 cursor-not-allowed' : 'cursor-pointer'}
                                                ${isSelected ? 'bg-brand-500 text-white' : !past ? 'text-gray-600 hover:bg-brand-50 hover:text-brand-600' : ''}`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time */}
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-base font-semibold text-gray-800 mb-4">Chọn Giờ</h2>
                            <div className="flex gap-2 mb-5">
                                {([
                                    { key: 'morning', label: 'Sáng', Icon: Sun },
                                    { key: 'afternoon', label: 'Chiều', Icon: CloudSun },
                                    { key: 'evening', label: 'Tối', Icon: Moon },
                                ] as const).map(({ key, label, Icon }) => (
                                    <button key={key} onClick={() => { setTimePeriod(key); setSelectedTime(null); }}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${timePeriod === key ? 'bg-brand-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-brand-50 hover:text-brand-500 border border-gray-200'
                                            }`}>
                                        <Icon className="w-3.5 h-3.5" /> {label}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div key={timePeriod} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                                    className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {TIME_SLOTS[timePeriod].map(time => {
                                        const unavailable = UNAVAILABLE.has(time);
                                        const isSelected = selectedTime === time;
                                        return (
                                            <button key={time} disabled={unavailable} onClick={() => setSelectedTime(time)}
                                                className={`py-2.5 px-2 rounded-lg border text-sm font-medium transition-all ${unavailable ? 'border-gray-100 text-gray-300 cursor-not-allowed line-through' :
                                                        isSelected ? 'border-brand-300 text-brand-700 bg-brand-50' :
                                                            'border-gray-200 text-gray-700 hover:border-brand-200 hover:text-brand-600'
                                                    }`}>
                                                {time}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                            {!selectedDay && <p className="text-[11px] text-gray-400 mt-3 italic">Chọn ngày trước khi chọn giờ.</p>}
                        </div>

                        {/* Shopee-style Feedback & Description */}
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <div className="flex border-b border-gray-50">
                                <button className="px-6 py-4 text-sm font-bold text-brand-600 border-b-2 border-brand-500 bg-brand-50/50">Mô Tả Chuyên Môn</button>
                                <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">Đánh Giá ({nurse.reviewsCount})</button>
                            </div>
                            <div className="p-6">
                                <div className="prose prose-sm max-w-none text-gray-600 mb-8">
                                    <h3 className="text-gray-900 font-bold mb-3">Về điều dưỡng {nurse.name}</h3>
                                    <p className="leading-relaxed mb-4">{nurse.bio}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                <Award className="w-4 h-4 text-brand-500" /> Bằng cấp & Chứng chỉ
                                            </h4>
                                            <ul className="space-y-1.5 list-disc list-inside text-xs">
                                                {nurse.certifications.map(c => <li key={c}>{c}</li>)}
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-brand-500" /> Kinh nghiệm thực tế
                                            </h4>
                                            <p className="text-xs">{nurse.experience} năm làm việc tại các bệnh viện phụ sản tuyến đầu.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 pt-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Phản hồi từ khách hàng</h3>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            <span className="text-sm font-bold text-amber-700">{nurse.rating.toFixed(1)}/5.0</span>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { name: 'Nguyễn Thảo', rating: 5, date: '2 ngày trước', comment: 'Điều dưỡng rất nhiệt tình và chu đáo. Con mình hợ khí nhiều nhưng chị vỗ ợ rất kỹ. Sẽ tiếp tục đặt chị.' },
                                            { name: 'Trần Minh Anh', rating: 5, date: '1 tuần trước', comment: 'Chị Sarah rất chuyên nghiệp, tư vấn sữa mẹ cực kỳ chi tiết. Cảm ơn chị và CareMate.' },
                                        ].map((fb, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 shrink-0">{fb.name[0]}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-bold text-sm text-gray-800">{fb.name}</span>
                                                        <span className="text-[10px] text-gray-400">{fb.date}</span>
                                                    </div>
                                                    <div className="flex gap-0.5 mb-2">
                                                        {Array.from({ length: fb.rating }).map((_, j) => <Star key={j} className="w-3 h-3 text-amber-500 fill-amber-500" />)}
                                                    </div>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{fb.comment}</p>
                                                    <div className="mt-3 flex items-center gap-4">
                                                        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-600 transition-colors">
                                                            <ThumbsUp className="w-3 h-3" /> Hữu ích (12)
                                                        </button>
                                                        <button className="text-xs text-gray-400 hover:text-gray-600">Phản hồi</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm mb-4">Xem tất cả 124 đánh giá</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Summary */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full lg:w-[360px] shrink-0">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
                            <h2 className="text-base font-semibold text-gray-800 mb-5">Tóm Tắt</h2>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="relative shrink-0">
                                    <img src={nurse.image} alt={nurse.name} referrerPolicy="no-referrer" className="w-14 h-14 rounded-xl object-cover border border-brand-100" />
                                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-md shadow-sm">
                                        <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                                            <ShieldCheck className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 text-sm truncate">{nurse.name}</h3>
                                    <p className="text-gray-400 text-[11px] truncate">{nurse.title}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span className="text-xs font-bold text-gray-700">{nurse.rating.toFixed(1)}</span>
                                        <span className="text-xs text-gray-400">({nurse.reviewsCount})</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2 group cursor-pointer">
                                        <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <Facebook className="w-3 h-3" />
                                        </div>
                                        <span className="text-[10px] font-medium text-blue-500 hover:underline">Facebook Profile</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                                        <CalendarDays className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">NGÀY & GIỜ</span>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {selectedDate && selectedTime ? `${selectedDate} · ${selectedTime}` : <span className="text-gray-300 font-normal italic">Chưa chọn</span>}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">VỊ TRÍ</span>
                                        <p className="text-sm font-semibold text-gray-800">Tại nhà</p>
                                        <p className="text-[11px] text-gray-400">123 Phố Gia Đình, Căn hộ 4B</p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="font-medium text-gray-800 mb-2 text-sm">Thanh Toán</h4>
                            <div className="space-y-2 mb-5">
                                {([
                                    { key: 'card', label: 'Thẻ Tín Dụng', Icon: CreditCard },
                                    { key: 'wallet', label: 'Ví Điện Tử', Icon: Wallet },
                                ] as const).map(({ key, label, Icon }) => (
                                    <button key={key} onClick={() => setPaymentMethod(key)}
                                        className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${paymentMethod === key ? 'border-brand-200 bg-brand-50/30' : 'border-gray-200 hover:border-brand-100'
                                            }`}>
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700">{label}</span>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === key ? 'border-brand-500' : 'border-gray-200'}`}>
                                            {paymentMethod === key && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-50 mb-6 text-sm">
                                <div className="flex justify-between items-center text-gray-500">
                                    <span>Phí Dịch Vụ</span>
                                    <span className="font-bold text-gray-900">${sessionFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500">
                                    <span>Phí Nền Tảng</span>
                                    <span className="font-bold text-gray-900">${SERVICE_CHARGE.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-1">
                                    <span className="font-bold text-gray-900 text-lg">Tổng</span>
                                    <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 bg-green-50 rounded-lg p-2.5 mb-4">
                                <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-green-700 leading-relaxed">
                                    Bảo vệ thanh toán. Tiền chỉ được chuyển sau khi phiên kết thúc.
                                </p>
                            </div>

                            <button disabled={!canConfirm} onClick={handleConfirm}
                                className={`w-full py-2.5 font-semibold rounded-lg transition-all text-sm active:scale-[0.97] ${canConfirm ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}>
                                {canConfirm ? 'Xác Nhận Đặt Lịch' : 'Chọn Ngày & Giờ'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
