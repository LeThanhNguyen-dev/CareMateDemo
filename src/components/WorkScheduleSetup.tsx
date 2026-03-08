import React, { useState } from 'react';
import {
    Sun,
    CloudSun,
    Moon,
    Bell,
    Plus,
    X,
    CheckCircle2,
} from 'lucide-react';

/* ─── Types ─────────────────────────────── */

type ShiftType = 'morning' | 'afternoon' | 'evening';

interface DaySchedule {
    day: string;
    date: number;
    shifts: Record<ShiftType, boolean>;
}

/* ─── Sub-components ─────────────────────── */

const ShiftToggle: React.FC<{
    active: boolean;
    type: string;
    time: string;
    icon: React.ReactNode;
    onClick: () => void;
}> = ({ active, type, time, icon, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-200
      ${active
                ? 'bg-brand-50 border-brand-200 ring-2 ring-brand-50 shadow-sm'
                : 'bg-white border-gray-100 hover:border-brand-100'
            }`}
    >
        <span className={active ? 'text-brand-500' : 'text-gray-300'}>{icon}</span>
        <div className="text-center">
            <p
                className={`text-[9px] font-black tracking-widest uppercase ${active ? 'text-brand-500' : 'text-gray-400'
                    }`}
            >
                {type}
            </p>
            <p className={`text-[8px] font-bold ${active ? 'text-brand-500' : 'text-gray-300'}`}>
                {time}
            </p>
        </div>
    </button>
);

const DateBadge: React.FC<{ label: string; onRemove: () => void }> = ({
    label,
    onRemove,
}) => (
    <div className="bg-[#F3F6F9] px-4 py-2 rounded-xl flex items-center gap-3">
        <span className="text-xs font-bold text-gray-700">{label}</span>
        <button
            onClick={onRemove}
            className="text-gray-300 hover:text-red-400 transition-colors"
        >
            <X size={13} />
        </button>
    </div>
);

const NotificationToggle: React.FC<{
    label: string;
    active: boolean;
    onToggle: () => void;
}> = ({ label, active, onToggle }) => (
    <div
        className="bg-[#F3F6F9] p-4 rounded-2xl flex items-center justify-between cursor-pointer"
        onClick={onToggle}
    >
        <span className="text-sm font-bold text-gray-700">{label}</span>
        <CheckCircle2
            size={22}
            className={`transition-colors ${active ? 'text-brand-500' : 'text-gray-200'}`}
        />
    </div>
);

/* ─── Main Component ─────────────────────── */

const INITIAL_SCHEDULE: DaySchedule[] = [
    { day: 'T2', date: 21, shifts: { morning: true, afternoon: false, evening: false } },
    { day: 'T3', date: 22, shifts: { morning: true, afternoon: true, evening: false } },
    { day: 'T4', date: 23, shifts: { morning: true, afternoon: true, evening: true } },
    { day: 'T5', date: 24, shifts: { morning: true, afternoon: false, evening: true } },
    { day: 'T6', date: 25, shifts: { morning: true, afternoon: true, evening: true } },
    { day: 'T7', date: 26, shifts: { morning: false, afternoon: false, evening: false } },
    { day: 'CN', date: 27, shifts: { morning: false, afternoon: false, evening: false } },
];

const BLACKOUT_INIT = [
    { id: '1', label: 'Nov 28, 2023' },
    { id: '2', label: 'Dec 25, 2023' },
];

const WorkScheduleSetup: React.FC = () => {
    const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
    const [blackouts, setBlackouts] = useState(BLACKOUT_INIT);
    const [notifPush, setNotifPush] = useState(true);
    const [notifEmail, setNotifEmail] = useState(true);
    const [view, setView] = useState<'weekly' | 'monthly'>('weekly');
    const [saved, setSaved] = useState(false);

    const toggleShift = (dayIdx: number, shift: ShiftType) => {
        setSchedule((prev) => {
            const next = prev.map((d) => ({ ...d, shifts: { ...d.shifts } }));
            next[dayIdx].shifts[shift] = !next[dayIdx].shifts[shift];
            return next;
        });
        setSaved(false);
    };

    const removeBlackout = (id: string) =>
        setBlackouts((prev) => prev.filter((b) => b.id !== id));

    const totalShifts = schedule.reduce(
        (acc, d) =>
            acc + (d.shifts.morning ? 5 : 0) + (d.shifts.afternoon ? 5 : 0) + (d.shifts.evening ? 5 : 0),
        0
    );

    const handleSave = () => setSaved(true);
    const handleReset = () => { setSchedule(INITIAL_SCHEDULE); setSaved(false); };

    return (
        <div className="p-8 md:p-12 space-y-10">
            {/* Page Title */}
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">Cài Đặt Lịch Làm Việc</h1>
                    <p className="text-gray-400 text-sm">
                        Xác định thời gian rảnh hàng tuần cho các ca sáng, chiều và tối.
                    </p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'weekly'
                            ? 'bg-brand-50 text-brand-500'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Hàng Tuần
                    </button>
                    <button
                        onClick={() => setView('monthly')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'monthly'
                            ? 'bg-brand-50 text-brand-500'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        Hàng Tháng
                    </button>
                </div>
            </div>

            {/* Schedule Grid Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-50">
                <div className="grid grid-cols-7 gap-3">
                    {schedule.map((day, idx) => (
                        <div key={day.day} className="space-y-4">
                            {/* Day Header */}
                            <div className="text-center pb-5 border-b border-gray-50">
                                <p className="text-[9px] font-bold text-gray-300 tracking-widest mb-1 uppercase">
                                    {day.day}
                                </p>
                                <p
                                    className={`text-2xl font-black ${idx > 4 ? 'text-gray-200' : 'text-gray-800'
                                        }`}
                                >
                                    {day.date}
                                </p>
                            </div>

                            {/* Shift toggles */}
                            <ShiftToggle
                                active={day.shifts.morning}
                                type="Sáng"
                                time="8AM–1PM"
                                icon={<Sun size={16} />}
                                onClick={() => toggleShift(idx, 'morning')}
                            />
                            <ShiftToggle
                                active={day.shifts.afternoon}
                                type="Chiều"
                                time="1PM–6PM"
                                icon={<CloudSun size={16} />}
                                onClick={() => toggleShift(idx, 'afternoon')}
                            />
                            <ShiftToggle
                                active={day.shifts.evening}
                                type="Tối"
                                time="6PM–11PM"
                                icon={<Moon size={16} />}
                                onClick={() => toggleShift(idx, 'evening')}
                            />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-10 pt-8 border-t border-gray-50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-brand-100 border border-brand-200" />
                            Có Sẵn
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border border-gray-200" />
                            Không Rảnh
                        </div>
                        <div className="border-l border-gray-100 pl-6">
                            Tổng số giờ tuần:{' '}
                            <span className="text-gray-800">{totalShifts} giờ</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="px-7 py-3 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all text-sm"
                        >
                            Khôi Phục
                        </button>
                        <button
                            onClick={handleSave}
                            className={`px-7 py-3 font-bold rounded-2xl text-sm transition-all shadow-lg ${saved
                                ? 'bg-green-500 text-white shadow-green-100'
                                : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'
                                }`}
                        >
                            {saved ? '✓ Đã Lưu!' : 'Lưu Lịch Làm Việc'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom: Blackout Dates + Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Blackout Dates */}
                <div className="bg-white rounded-[2.5rem] p-9 shadow-sm border border-gray-50">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-400 font-serif font-bold text-lg">
                            !
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Ngày Nghỉ Phép</h2>
                    </div>
                    <p className="text-gray-400 text-sm mb-7">
                        Những ngày đặc biệt bạn sẽ không làm việc bất kể lịch trình hàng tuần ra sao.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {blackouts.map((b) => (
                            <DateBadge
                                key={b.id}
                                label={b.label}
                                onRemove={() => removeBlackout(b.id)}
                            />
                        ))}
                        <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-100 text-gray-300 font-bold text-xs rounded-xl hover:border-brand-100 hover:text-brand-500 transition-all">
                            <Plus size={13} /> Thêm Ngày
                        </button>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white rounded-[2.5rem] p-9 shadow-sm border border-gray-50">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
                            <Bell size={16} className="text-brand-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Tuỳ Chọn Thông Báo</h2>
                    </div>
                    <p className="text-gray-400 text-sm mb-7">
                        Bạn muốn nhận thông báo về yêu cầu đặt lịch mới như thế nào?
                    </p>
                    <div className="space-y-3">
                        <NotificationToggle
                            label="Thông Báo Đẩy Trên Ứng Dụng"
                            active={notifPush}
                            onToggle={() => setNotifPush((v) => !v)}
                        />
                        <NotificationToggle
                            label="Thông Báo Qua Email"
                            active={notifEmail}
                            onToggle={() => setNotifEmail((v) => !v)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkScheduleSetup;
