import React from 'react';
import * as storage from '../lib/storage';
import { motion } from 'motion/react';
import {
  User,
  Calendar,
  History,
  Wallet,
  Plus,
  Bell,
  LogOut,
  Star,
  Clock,
  CheckCircle2,
  Zap,
  CalendarDays,
} from 'lucide-react';
import { Booking, NURSES } from '../types';

interface MomDashboardProps {
  bookings: Booking[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
      ? 'bg-brand-50 text-brand-700'
      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
      }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string | number;
}> = ({ icon, bg, label, value }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export const MomDashboard: React.FC<MomDashboardProps> = ({ bookings, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const currentUser = storage.getCurrentUser();
  const userName = currentUser?.name || 'Jane';
  const initial = userName.charAt(0).toUpperCase();

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');

  const demoBookings: Booking[] = upcomingBookings.length > 0 ? upcomingBookings : [
    {
      id: 'demo-1', nurseId: '1', nurseName: 'Sarah Jenkins, RN',
      nurseImage: NURSES.find(n => n.name.includes('Sarah'))?.image ?? 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200',
      serviceTitle: 'Chăm Sóc Hậu Sản', date: 'Ngày mai', time: '9:00 - 13:00', status: 'confirmed',
    },
    {
      id: 'demo-2', nurseId: '4', nurseName: 'Emily Chen, LPN',
      nurseImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
      serviceTitle: 'Tư Vấn Sữa Mẹ', date: 'T6, 13/03', time: '10:00', status: 'pending',
    },
  ];

  const displayBookings = demoBookings;
  const quickRebook = NURSES.slice(0, 4);

  const navItems = [
    { id: 'overview', label: 'Tổng Quan', icon: <Zap size={16} /> },
    { id: 'bookings', label: 'Lịch Đặt', icon: <Calendar size={16} /> },
    { id: 'history', label: 'Lịch Sử', icon: <History size={16} /> },
    { id: 'wallet', label: 'Ví Tiền', icon: <Wallet size={16} /> },
    { id: 'profile', label: 'Hồ Sơ', icon: <User size={16} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans pt-16">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 fixed h-full pt-6 px-3 pb-6">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700 font-bold text-sm">
            {initial}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">{userName.split(' ')[0]}</h4>
            <p className="text-xs text-gray-400">Tài Khoản Mẹ</p>
          </div>
        </div>

        <nav className="space-y-0.5 flex-1">
          {navItems.map(item => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
          ))}
        </nav>

        <button onClick={onLogout} className="flex items-center gap-2.5 text-gray-400 hover:text-red-500 transition-colors px-3 py-2.5 rounded-lg hover:bg-red-50 text-sm font-medium">
          <LogOut size={16} />
          Đăng Xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-56 px-5 sm:px-8 lg:px-10 py-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Bảng Điều Khiển</h1>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Bạn có <span className="font-medium text-gray-700">{displayBookings.length}</span> phiên sắp tới.
                  </p>
                </div>
                <button className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors relative">
                  <Bell size={16} className="text-gray-400" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard icon={<CalendarDays className="w-4 h-4 text-brand-600" />} bg="bg-brand-50" label="Tổng Lịch" value={bookings.length || displayBookings.length} />
                <StatCard icon={<Clock className="w-4 h-4 text-blue-500" />} bg="bg-blue-50" label="Giờ Chăm Sóc" value={48} />
                <StatCard icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} bg="bg-green-50" label="Điều Dưỡng" value={3} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
                {displayBookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={booking.nurseImage} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                      <div>
                        <p className="text-[10px] font-semibold text-brand-600 uppercase tracking-wide">Sắp tới</p>
                        <h4 className="font-semibold text-gray-800 text-sm">{booking.nurseName}</h4>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 p-2.5 rounded-lg mb-3">
                      {booking.date} · {booking.time}
                    </div>
                    <button className="w-full py-2 bg-brand-50 text-brand-600 rounded-lg font-medium text-xs hover:bg-brand-600 hover:text-white transition-all">
                      Xem Chi Tiết
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Đặt Nhanh</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {quickRebook.map((nurse) => (
                    <div key={nurse.id} className="bg-white rounded-xl p-4 border border-gray-100 min-w-[140px] flex flex-col items-center">
                      <img src={nurse.image} className="w-12 h-12 rounded-lg object-cover border border-gray-100 mb-2.5" referrerPolicy="no-referrer" />
                      <h5 className="font-medium text-gray-800 text-xs text-center mb-1">{nurse.name.split(',')[0]}</h5>
                      <p className="text-[10px] text-gray-400 mb-3">{nurse.rating}★</p>
                      <button onClick={() => onNavigate('services')} className="w-7 h-7 bg-brand-50 text-brand-600 rounded-md flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-semibold mb-1">CareMom Plus</h3>
                  <p className="text-gray-400 text-xs mb-4">Ưu tiên phục vụ & Giảm giá 10%.</p>
                  <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 transition-all">Nâng Cấp</button>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm mb-3">Mẹo Cho Mẹ</h3>
                  <p className="text-xs text-gray-500 italic leading-relaxed">"Massage cho bé hằng ngày giúp bé ngủ ngon và tăng cường tình cảm mẹ-con."</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Lịch Chăm Sóc</h1>
              <div className="space-y-4">
                {displayBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={booking.nurseImage} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{booking.serviceTitle}</h4>
                        <p className="text-sm text-gray-400">{booking.nurseName} · {booking.date} · {booking.time}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-semibold rounded-md">ĐÃ XÁC NHẬN</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-50 text-gray-500 font-medium rounded-lg text-sm hover:bg-gray-100">Chi Tiết</button>
                      <button className="px-4 py-2 bg-brand-50 text-brand-600 font-medium rounded-lg text-sm hover:bg-brand-600 hover:text-white transition-all">Đổi Lịch</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Lịch Sử Thanh Toán</h1>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                    <tr>
                      <th className="px-5 py-3">Dịch Vụ</th>
                      <th className="px-5 py-3">Ngày</th>
                      <th className="px-5 py-3">Số Tiền</th>
                      <th className="px-5 py-3">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { service: 'Chăm Sóc Hậu Sản', date: '01/03/2024', amount: '$450.00', status: 'Hoàn Tất' },
                      { service: 'Tư Vấn Sữa Mẹ', date: '25/02/2024', amount: '$85.00', status: 'Hoàn Tất' },
                    ].map((item, i) => (
                      <tr key={i} className="text-sm text-gray-700">
                        <td className="px-5 py-4 font-medium">{item.service}</td>
                        <td className="px-5 py-4">{item.date}</td>
                        <td className="px-5 py-4 font-medium">{item.amount}</td>
                        <td className="px-5 py-4 text-green-600 font-medium">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'wallet' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Ví CareMom</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-8 text-white">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-xs font-medium text-brand-200 uppercase tracking-wide mb-1">Số dư</p>
                      <p className="text-3xl font-bold">$1,240.50</p>
                    </div>
                    <Wallet size={24} className="text-brand-300" />
                  </div>
                  <button className="w-full py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-all text-sm">NẠP TIỀN</button>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-8">
                  <h3 className="font-semibold text-gray-800 text-sm mb-5">Thẻ Đã Lưu</h3>
                  <div className="p-3.5 border border-gray-100 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center text-[7px] text-white font-bold">VISA</div>
                      <span className="text-sm font-medium text-gray-700">•••• 4242</span>
                    </div>
                    <span className="text-[10px] text-gray-400">12/26</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Thông Tin Cá Nhân</h1>
              <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-lg">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 text-2xl font-bold">
                    {initial}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{userName}</h2>
                    <p className="text-gray-400 text-sm">{currentUser?.email}</p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Họ Tên</label>
                      <input type="text" defaultValue={userName} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Số Điện Thoại</label>
                      <input type="text" placeholder="Nhập SĐT" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Địa Chỉ</label>
                    <input type="text" placeholder="Nhập địa chỉ" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <button type="button" className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all mt-4">Cập Nhật</button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};
