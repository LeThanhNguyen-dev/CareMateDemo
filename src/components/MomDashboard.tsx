import React from 'react';
import * as storage from '../lib/storage';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Calendar,
  History,
  Wallet,
  Settings,
  MoreVertical,
  Plus,
  Bell,
  LogOut,
  Star,
  Clock,
  CheckCircle2,
  Zap,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import { Booking, NURSES } from '../types';

interface MomDashboardProps {
  bookings: Booking[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

// ── Sub-component: Sidebar Nav Item ───────────────────────────────────────────
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${active
      ? 'bg-pink-50 text-pink-400'
      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
      }`}
  >
    {icon}
    {label}
  </button>
);

// ── Sub-component: Stat Card ───────────────────────────────────────────────────
const StatCard: React.FC<{
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string | number;
}> = ({ icon, bg, label, value }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex items-center gap-5">
    <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export const MomDashboard: React.FC<MomDashboardProps> = ({ bookings, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [menuOpenId, setMenuOpenId] = React.useState<string | null>(null);

  const currentUser = storage.getCurrentUser();
  const userName = currentUser?.name || 'Jane';
  const initial = userName.charAt(0).toUpperCase();

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');

  // Demo data to fill the dashboard if bookings are empty
  const demoBokings: Booking[] = upcomingBookings.length > 0 ? upcomingBookings : [
    {
      id: 'demo-1',
      nurseId: '1',
      nurseName: 'Sarah Jenkins, RN',
      nurseImage: NURSES.find(n => n.name.includes('Sarah'))?.image ?? 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Postpartum Care',
      date: 'Tomorrow',
      time: '9:00 AM – 1:00 PM',
      status: 'confirmed',
    },
    {
      id: 'demo-2',
      nurseId: '4',
      nurseName: 'Emily Chen, LPN',
      nurseImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      serviceTitle: 'Lactation Consulting',
      date: 'Fri, Mar 13',
      time: '10:00 AM',
      status: 'pending',
    },
  ];

  const displayBookings = demoBokings;

  const quickRebook = NURSES.slice(0, 4);

  const navItems = [
    { id: 'overview', label: 'Tổng Quan', icon: <Zap size={18} /> },
    { id: 'bookings', label: 'Lịch Đã Đặt', icon: <Calendar size={18} /> },
    { id: 'history', label: 'Lịch Sử', icon: <History size={18} /> },
    { id: 'wallet', label: 'Ví Tiền', icon: <Wallet size={18} /> },
    { id: 'profile', label: 'Hồ Sơ', icon: <User size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFD] font-sans pt-16">

      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white border-r border-gray-50 fixed h-full pt-8 px-6 pb-8">
        {/* User avatar */}
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 font-bold text-lg border-2 border-pink-50">
            {initial}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Xin chào, {userName.split(' ')[0]}</h4>
            <p className="text-xs text-gray-400">Tài Khoản Mẹ</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1 flex-1">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors px-4 py-3 rounded-2xl hover:bg-red-50 text-sm font-bold"
        >
          <LogOut size={18} />
          Đăng Xuất
        </button>
      </aside>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <main className="flex-1 lg:ml-72 px-6 sm:px-10 lg:px-12 py-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* ─── TAB CONTENT: OVERVIEW ─── */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Bảng Điều Khiển Của Tôi</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Bạn có{' '}
                    <span className="font-semibold text-gray-700">{displayBookings.length}</span>{' '}
                    phiên chăm sóc sắp tới.
                  </p>
                </div>
                <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors relative">
                  <Bell size={18} className="text-gray-400" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-400 rounded-full border-2 border-white" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                <StatCard
                  icon={<CalendarDays className="w-5 h-5 text-pink-400" />}
                  bg="bg-pink-50"
                  label="Tổng Số Lịch"
                  value={bookings.length || displayBookings.length}
                />
                <StatCard
                  icon={<Clock className="w-5 h-5 text-blue-400" />}
                  bg="bg-blue-50"
                  label="Giờ Chăm Sóc"
                  value={48}
                />
                <StatCard
                  icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                  bg="bg-green-50"
                  label="Số Điều Dưỡng"
                  value={3}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                {displayBookings.slice(0, 2).map((booking, index) => (
                  <div key={booking.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={booking.nurseImage} className="w-12 h-12 rounded-full border-2 border-pink-50" />
                      <div>
                        <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">SẮP TỚI</p>
                        <h4 className="font-bold text-gray-800">{booking.nurseName}</h4>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl mb-4">
                      {booking.date} · {booking.time}
                    </div>
                    <button className="w-full py-3 bg-pink-50 text-pink-400 rounded-xl font-bold text-xs hover:bg-pink-400 hover:text-white transition-all">
                      Xem Chi Tiết
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Re-book */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Đặt Nhanh</h2>
                <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
                  {quickRebook.map((nurse) => (
                    <div key={nurse.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 min-w-[170px] flex flex-col items-center">
                      <img src={nurse.image} className="w-16 h-16 rounded-full border-4 border-pink-50 mb-3" />
                      <h5 className="font-bold text-gray-800 text-sm mb-1">{nurse.name.split(',')[0]}</h5>
                      <p className="text-[10px] text-gray-400 mb-4">{nurse.rating} ★ Đánh giá</p>
                      <button onClick={() => onNavigate('services')} className="w-8 h-8 bg-pink-50 text-pink-400 rounded-full flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                  <h3 className="text-lg font-bold mb-2">CareMom Plus</h3>
                  <p className="text-slate-400 text-xs mb-6">Ưu tiên phục vụ & Giảm giá 10% các dịch vụ.</p>
                  <button className="px-6 py-2.5 bg-pink-400 text-white rounded-xl text-xs font-bold hover:bg-pink-300 transition-all">Nâng Cấp</button>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4">Mẹo Cho Mẹ</h3>
                  <p className="text-xs text-gray-500 italic">"Massage cho bé hằng ngày giúp bé ngủ ngon hơn và tăng cường tình cảm."</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT: BOOKINGS ─── */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-10">Lịch Chăm Sóc Của Tôi</h1>
              <div className="space-y-6">
                {displayBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <img src={booking.nurseImage} className="w-16 h-16 rounded-full border-4 border-pink-50" />
                      <div>
                        <h4 className="font-black text-gray-800">{booking.serviceTitle}</h4>
                        <p className="text-sm text-gray-400">{booking.nurseName} · {booking.date} · {booking.time}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full">ĐÃ XÁC NHẬN</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-6 py-3 bg-gray-50 text-gray-400 font-bold rounded-xl text-sm hover:bg-gray-100">Chi Tiết</button>
                      <button className="px-6 py-3 bg-pink-50 text-pink-400 font-bold rounded-xl text-sm hover:bg-pink-400 hover:text-white transition-all">Đổi Lịch</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT: HISTORY ─── */}
          {activeTab === 'history' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-10">Lịch Sử Thanh Toán</h1>
              <div className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 font-bold text-gray-400 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-5">Dịch Vụ</th>
                      <th className="px-8 py-5">Ngày</th>
                      <th className="px-8 py-5">Số Tiền</th>
                      <th className="px-8 py-5">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { service: 'Chăm Sóc Hậu Sản', date: '01/03/2024', amount: '$450.00', status: 'Hoàn Tất' },
                      { service: 'Tư Vấn Sữa Mẹ', date: '25/02/2024', amount: '$85.00', status: 'Hoàn Tất' },
                    ].map((item, i) => (
                      <tr key={i} className="text-sm text-gray-700">
                        <td className="px-8 py-6 font-bold">{item.service}</td>
                        <td className="px-8 py-6">{item.date}</td>
                        <td className="px-8 py-6 font-bold">{item.amount}</td>
                        <td className="px-8 py-6 text-green-500 font-medium">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT: WALLET ─── */}
          {activeTab === 'wallet' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-10">Ví CareMate</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-pink-400 to-pink-300 rounded-[2.5rem] p-10 text-white shadow-xl shadow-pink-100">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Số dư hiện tại</p>
                      <p className="text-5xl font-black">$1,240.50</p>
                    </div>
                    <Wallet size={32} className="opacity-40" />
                  </div>
                  <button className="w-full py-4 bg-white text-pink-400 font-black rounded-2xl hover:bg-pink-50 transition-all">NẠP TIỀN VÀO VÍ</button>
                </div>
                <div className="bg-white rounded-[2.5rem] border border-gray-50 p-10">
                  <h3 className="font-bold text-gray-800 mb-6">Thẻ Đã Lưu</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                        <span className="text-sm font-bold text-gray-700">•••• 4242</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 uppercase">Hết hạn 12/26</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT: PROFILE ─── */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-10">Thông Tin Cá Nhân</h1>
              <div className="bg-white rounded-[2.5rem] border border-gray-50 p-10 max-w-2xl">
                <div className="flex items-center gap-8 mb-12">
                  <div className="w-24 h-24 bg-pink-50 rounded-[2rem] flex items-center justify-center text-pink-400 text-3xl font-black border-4 border-white shadow-lg shadow-pink-50">
                    {initial}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1">{userName}</h2>
                    <p className="text-gray-400 text-sm font-bold">{currentUser?.email}</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Họ Tên</label>
                      <input type="text" defaultValue={userName} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-pink-100" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Số Điện Thoại</label>
                      <input type="text" placeholder="Thêm số điện thoại" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-pink-100" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Địa Chỉ Nhận Chăm Sóc</label>
                    <input type="text" placeholder="Nhập địa chỉ của bạn" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-pink-100" />
                  </div>
                  <button type="button" className="w-full py-4 bg-pink-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-500 transition-all mt-6 shadow-lg shadow-pink-100">Cập Nhật Thông Tin</button>
                </form>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
};
