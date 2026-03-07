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
} from 'lucide-react';
import { Nurse, SERVICES } from '../types';

interface BookingPageProps {
    nurse: Nurse;
    onBack: () => void;
    onConfirm: (bookingData: any) => void;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const TIME_SLOTS = {
    morning: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
    evening: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'],
};

// Simulate a few booked slots
const UNAVAILABLE = new Set(['09:00 AM', '01:00 PM', '07:00 PM']);

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

    // Calendar computation
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
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date(); t.setHours(0, 0, 0, 0);
        return d < t;
    };

    const selectedDate = selectedDay !== null
        ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null;

    const selectedService = SERVICES.find(s => nurse.services.includes(s.id));
    const sessionFee = selectedService?.price ?? nurse.hourlyRate * 4;
    const total = sessionFee + SERVICE_CHARGE;

    const canConfirm = selectedDay !== null && selectedTime !== null;

    const handleConfirm = () => {
        if (!canConfirm) return;
        onConfirm({
            nurseId: nurse.id,
            nurseName: nurse.name,
            nurseImage: nurse.image,
            serviceTitle: selectedService?.title ?? 'Nursing Session',
            date: selectedDate,
            time: selectedTime,
            status: 'confirmed',
        });
        setConfirmed(true);
    };

    // ── Confirmed screen ──────────────────────────────────────────────────────
    if (confirmed) {
        return (
            <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center pt-20 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="bg-white rounded-[2rem] p-12 shadow-lg max-w-md w-full text-center mx-4"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">
                        Your session with <span className="font-semibold text-gray-700">{nurse.name}</span> has been scheduled.
                    </p>
                    <p className="text-gray-400 text-sm mb-8">
                        {selectedDate} · {selectedTime}
                    </p>
                    <div className="bg-pink-50 rounded-2xl p-4 mb-8 text-left">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Session Fee</span>
                            <span className="font-bold text-gray-700">${sessionFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-400">Service Charge</span>
                            <span className="font-bold text-gray-700">${SERVICE_CHARGE.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span className="text-gray-800">Total Paid</span>
                            <span className="text-rose-500 text-lg">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-6">A confirmation has been sent to your email.</p>
                    <button
                        onClick={onBack}
                        className="w-full py-4 bg-rose-400 text-white font-bold rounded-2xl hover:bg-rose-500 active:scale-95 transition-all shadow-md shadow-rose-100"
                    >
                        Go to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    // ── Main booking layout ───────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#FDFCFD] pt-20 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">

                {/* ── Back + Title ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-sm font-semibold text-rose-400 hover:text-rose-600 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Nurses
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                        Schedule Your Nursing Session
                    </h1>
                    <p className="text-gray-400">Choose your preferred date and time, and complete your booking.</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ═══════════════════════════════════════
                        LEFT COLUMN — Date & Time Selection
                    ═══════════════════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="flex-1 space-y-6"
                    >
                        {/* ── Calendar Card ── */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-800">Select Date</h2>
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={prevMonth}
                                        className="text-gray-300 hover:text-pink-400 transition-colors p-1"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="font-bold text-gray-700 min-w-[130px] text-center">
                                        {MONTH_NAMES[viewMonth]} {viewYear}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="text-gray-300 hover:text-pink-400 transition-colors p-1"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Day-of-week headers */}
                            <div className="grid grid-cols-7 mb-2">
                                {DAYS_OF_WEEK.map(d => (
                                    <div key={d} className="text-center text-xs font-bold text-gray-300 py-2">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar grid */}
                            <div className="grid grid-cols-7 gap-y-1">
                                {/* Empty leading cells */}
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {/* Day cells */}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const past = isPastDay(day);
                                    const isSelected = selectedDay === day && !past;
                                    return (
                                        <button
                                            key={day}
                                            disabled={past}
                                            onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                                            className={`
                                                mx-auto flex items-center justify-center w-10 h-10 rounded-2xl text-sm font-semibold transition-all
                                                ${past ? 'text-gray-200 cursor-not-allowed' : 'cursor-pointer'}
                                                ${isSelected
                                                    ? 'bg-pink-300 text-white shadow-md shadow-pink-100'
                                                    : !past ? 'text-gray-600 hover:bg-pink-50 hover:text-rose-500' : ''}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Time Slot Card ── */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Select Time Slot</h2>

                            {/* Period tabs */}
                            <div className="flex gap-3 mb-7">
                                {([
                                    { key: 'morning', label: 'Morning', Icon: Sun },
                                    { key: 'afternoon', label: 'Afternoon', Icon: CloudSun },
                                    { key: 'evening', label: 'Evening', Icon: Moon },
                                ] as const).map(({ key, label, Icon }) => (
                                    <button
                                        key={key}
                                        onClick={() => { setTimePeriod(key); setSelectedTime(null); }}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${timePeriod === key
                                                ? 'bg-pink-300 text-white shadow-md shadow-pink-100'
                                                : 'bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-rose-400'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Time chips */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={timePeriod}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-3 sm:grid-cols-4 gap-3"
                                >
                                    {TIME_SLOTS[timePeriod].map(time => {
                                        const unavailable = UNAVAILABLE.has(time);
                                        const isSelected = selectedTime === time;
                                        return (
                                            <button
                                                key={time}
                                                disabled={unavailable}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3.5 px-3 rounded-2xl border text-sm font-semibold transition-all ${unavailable
                                                        ? 'border-pink-50 text-pink-200 cursor-not-allowed bg-pink-50/40 line-through'
                                                        : isSelected
                                                            ? 'border-pink-300 text-pink-400 bg-pink-50/50 shadow-sm'
                                                            : 'border-gray-100 text-gray-700 hover:border-pink-200 hover:text-rose-400'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>

                            {!selectedDay && (
                                <p className="text-xs text-gray-400 mt-4 italic">
                                    Please select a date first to confirm your time slot.
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* ═══════════════════════════════════════
                        RIGHT COLUMN — Booking Summary
                    ═══════════════════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="w-full lg:w-[400px] shrink-0"
                    >
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-800 mb-7">Booking Summary</h2>

                            {/* Nurse info */}
                            <div className="flex items-center gap-4 mb-7">
                                <img
                                    src={nurse.image}
                                    alt={nurse.name}
                                    referrerPolicy="no-referrer"
                                    className="w-16 h-16 rounded-full object-cover border-4 border-pink-50"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-800">{nurse.name}</h3>
                                    <p className="text-gray-400 text-xs">{nurse.title}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-bold text-gray-700">{nurse.rating.toFixed(1)}</span>
                                        <span className="text-xs text-gray-400">({nurse.reviewsCount} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking details */}
                            <div className="space-y-5 mb-7">
                                {/* Date & Time */}
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                        <CalendarDays className="w-4.5 h-4.5 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Date & Time</span>
                                            {selectedDate && (
                                                <button
                                                    onClick={() => { setSelectedDay(null); setSelectedTime(null); }}
                                                    className="text-pink-300 text-[10px] font-bold hover:text-rose-400 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">
                                            {selectedDate && selectedTime
                                                ? `${selectedDate} · ${selectedTime}`
                                                : <span className="text-gray-300 font-normal italic">Not selected yet</span>}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Location</span>
                                            <button className="text-pink-300 text-[10px] font-bold hover:text-rose-400 transition-colors">Edit</button>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">Home Visit</p>
                                        <p className="text-xs text-gray-400">123 Family Lane, Apt 4B</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <h4 className="font-bold text-gray-800 mb-3 text-sm">Payment Method</h4>
                            <div className="space-y-3 mb-7">
                                {([
                                    { key: 'card', label: 'Credit Card', Icon: CreditCard },
                                    { key: 'wallet', label: 'Digital Wallet', Icon: Wallet },
                                ] as const).map(({ key, label, Icon }) => (
                                    <button
                                        key={key}
                                        onClick={() => setPaymentMethod(key)}
                                        className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${paymentMethod === key
                                                ? 'border-pink-200 bg-pink-50/30'
                                                : 'border-gray-100 hover:border-pink-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm font-bold text-gray-700">{label}</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === key ? 'border-pink-300' : 'border-gray-200'
                                            }`}>
                                            {paymentMethod === key && (
                                                <div className="w-2.5 h-2.5 bg-pink-300 rounded-full" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Price breakdown */}
                            <div className="space-y-3 pt-6 border-t border-gray-50 mb-7">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        Session Fee
                                        {selectedService && <span className="ml-1 text-xs text-gray-300">({selectedService.unit})</span>}
                                    </span>
                                    <span className="font-bold text-gray-800">${sessionFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Service Charge</span>
                                    <span className="font-bold text-gray-800">${SERVICE_CHARGE.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Security note */}
                            <div className="flex items-start gap-2 bg-green-50 rounded-2xl p-3 mb-6">
                                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-green-600 leading-relaxed">
                                    Protected by the CareMom Guarantee. Payment is only released after your session is completed.
                                </p>
                            </div>

                            <button
                                disabled={!canConfirm}
                                onClick={handleConfirm}
                                className={`w-full py-4 font-bold rounded-2xl transition-all text-sm shadow-md active:scale-95 ${canConfirm
                                        ? 'bg-pink-300 text-white hover:bg-rose-400 shadow-pink-100'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {canConfirm ? 'Confirm Booking' : 'Select Date & Time to Continue'}
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-3">
                                By confirming, you agree to our{' '}
                                <a href="#" className="underline hover:text-rose-400 transition-colors">Terms of Service</a>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
