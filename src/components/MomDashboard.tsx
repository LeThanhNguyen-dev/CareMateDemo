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
      ? 'bg-pink-50 text-rose-400'
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
  const [activeTab, setActiveTab] = React.useState('bookings');
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
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} /> },
    { id: 'history', label: 'Payment History', icon: <History size={18} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFD] font-sans pt-16">

      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-white border-r border-gray-50 fixed h-full pt-8 px-6 pb-8">
        {/* User avatar */}
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-lg border-2 border-rose-50">
            {initial}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Welcome, {userName.split(' ')[0]}</h4>
            <p className="text-xs text-gray-400">Mom Account</p>
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
          className="flex items-center gap-3 text-gray-400 hover:text-rose-400 transition-colors px-4 py-3 rounded-2xl hover:bg-red-50 text-sm font-bold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <main className="flex-1 lg:ml-72 px-6 sm:px-10 lg:px-12 py-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-between items-center mb-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">
                You have{' '}
                <span className="font-semibold text-gray-700">{displayBookings.length}</span>{' '}
                upcoming session{displayBookings.length !== 1 ? 's' : ''}.
              </p>
            </div>
            <button className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors relative">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full border-2 border-white" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
          >
            <StatCard
              icon={<CalendarDays className="w-5 h-5 text-rose-400" />}
              bg="bg-rose-50"
              label="Total Bookings"
              value={bookings.length || displayBookings.length}
            />
            <StatCard
              icon={<Clock className="w-5 h-5 text-blue-400" />}
              bg="bg-blue-50"
              label="Hours of Care"
              value={48}
            />
            <StatCard
              icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
              bg="bg-green-50"
              label="Nurses Met"
              value={3}
            />
          </motion.div>

          {/* ─── Upcoming Bookings ─── */}
          <AnimatePresence>
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Bookings</h2>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {displayBookings.map((booking, index) => {
                  const isConfirmed = booking.status === 'confirmed';
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={booking.nurseImage}
                            alt={booking.nurseName}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full object-cover border-4 border-pink-50"
                          />
                          <div>
                            <p className={`text-[9px] font-black tracking-widest uppercase mb-1 ${isConfirmed ? 'text-pink-300' : 'text-gray-300'}`}>
                              {isConfirmed ? '● Confirmed' : '○ Pending Confirmation'}
                            </p>
                            <h3 className="text-base font-bold text-gray-800 leading-snug">
                              Nurse {booking.nurseName.split(',')[0]}
                            </h3>
                          </div>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpenId(menuOpenId === booking.id ? null : booking.id)}
                            className="text-gray-300 hover:text-gray-500 transition-colors p-1"
                          >
                            <MoreVertical size={18} />
                          </button>
                          <AnimatePresence>
                            {menuOpenId === booking.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 min-w-[140px] overflow-hidden"
                              >
                                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-pink-50 hover:text-rose-500 transition-colors">
                                  Reschedule
                                </button>
                                <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-50 transition-colors">
                                  Cancel
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Service + time chip */}
                      <div className="bg-gray-50 rounded-2xl px-4 py-3 flex items-center gap-3 mb-7">
                        <Calendar size={16} className="text-gray-400 shrink-0" />
                        <p className="text-sm text-gray-500">
                          <span className="font-bold text-gray-700">{booking.serviceTitle}</span>
                          {' · '}
                          {booking.date}
                          {' '}
                          {booking.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        {isConfirmed && (
                          <button className="flex-1 py-3.5 bg-pink-100 text-rose-400 font-bold rounded-2xl hover:bg-rose-400 hover:text-white transition-all text-sm active:scale-95">
                            Reschedule
                          </button>
                        )}
                        <button className={`flex-1 py-3.5 font-bold rounded-2xl transition-all text-sm border border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100 active:scale-95 ${!isConfirmed ? 'flex-1' : ''}`}>
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Empty state */}
              {displayBookings.length === 0 && (
                <div className="bg-white rounded-[2rem] p-14 text-center border border-dashed border-pink-100">
                  <Calendar className="w-10 h-10 text-pink-200 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm mb-5">No upcoming sessions scheduled yet.</p>
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-6 py-3 bg-rose-400 text-white rounded-full text-sm font-bold hover:bg-rose-500 transition-all"
                  >
                    Browse Services
                  </button>
                </div>
              )}
            </motion.section>
          </AnimatePresence>

          {/* ─── Quick Re-book ─── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quick Re-book</h2>
              <button
                onClick={() => onNavigate('nurses')}
                className="text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1"
              >
                See All Nurses <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
              {quickRebook.map((nurse, index) => (
                <motion.div
                  key={nurse.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + index * 0.06 }}
                  className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-50 min-w-[190px] flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div className="relative mb-4">
                    <img
                      src={nurse.image}
                      alt={nurse.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer border-4 border-pink-50"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5 leading-snug">
                    {nurse.name.split(',')[0]}
                  </h4>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-600">{nurse.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-5">{nurse.title.split('&')[0].trim()}</p>
                  <button
                    onClick={() => onNavigate('nurses')}
                    className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-rose-400 hover:bg-rose-400 hover:text-white transition-all active:scale-90"
                  >
                    <Plus size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ─── Upgrade CTA + Care Tips ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          >
            {/* Upgrade card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white overflow-hidden relative">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Join CareMom Plus</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Get 10% off all sessions and priority access to top-rated nurses.
                </p>
                <button className="w-full py-3 bg-rose-400 text-white rounded-2xl text-sm font-bold hover:bg-rose-500 transition-all active:scale-95">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Care Tips */}
            <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-5">Care Tips</h3>
              <div className="space-y-4">
                {[
                  'Establishing a sleep routine',
                  'Postpartum nutrition guide',
                  'Newborn massage techniques',
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-pink-50 group-hover:text-rose-400 transition-all shrink-0">
                      <Zap size={14} />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};
