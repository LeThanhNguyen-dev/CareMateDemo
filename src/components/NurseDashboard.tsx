import React from 'react';
import * as storage from '../lib/storage';
import WorkScheduleSetup from './WorkScheduleSetup';
import {
  Search,
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Video,
  MapPin,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Settings,
} from 'lucide-react';

/* ─── Types ─────────────────────────────── */

interface ScheduleItem {
  id: string;
  time: string;
  type: string;
  patient: string;
  location: string;
  isOnline?: boolean;
  status: 'pending' | 'active' | 'completed';
}

type ActivePage = 'dashboard' | 'schedule' | 'profile' | 'earnings';

/* ─── Sidebar Link ───────────────────────── */

const SidebarLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all
      ${active
        ? 'bg-pink-50 text-pink-400'
        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
      }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    {label}
  </button>
);

/* ─── StatCard ───────────────────────────── */

interface StatCardProps {
  label: string;
  value: string | number;
  subValue: string;
  icon: React.ReactNode;
  bgColor: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, bgColor, alert }) => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 flex justify-between items-start hover:shadow-lg transition-all duration-300">
    <div>
      <h3 className="text-gray-400 font-bold text-sm mb-6">{label}</h3>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl font-black text-gray-900">{value}</span>
        <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tight ${alert ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'
          }`}>
          {subValue}
        </span>
      </div>
    </div>
    <div className={`w-14 h-14 ${bgColor} rounded-[1.2rem] flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
  </div>
);

/* ─── Main Dashboard ─────────────────────── */

interface NurseDashboardProps {
  onLogout: () => void;
}

export const NurseDashboard: React.FC<NurseDashboardProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = React.useState<ActivePage>('dashboard');
  const nurseName = storage.getCurrentUser()?.name?.split(' ')[0] || 'Sarah';
  const nurseFullName = storage.getCurrentUser()?.name || 'Sarah Jenkins';

  const todaySchedule: ScheduleItem[] = [
    { id: '1', time: '09:00 AM', type: 'Postpartum Care Visit', patient: 'Emily Davis', location: '124 Maple St.', status: 'active' },
    { id: '2', time: '11:30 AM', type: 'Lactation Consultation', patient: 'Jessica Wong', location: 'Online Meeting', isOnline: true, status: 'pending' },
    { id: '3', time: '02:00 PM', type: 'Newborn Health Check', patient: 'Amanda Smith', location: '89 Oak Ave.', status: 'completed' },
    { id: '4', time: '04:30 PM', type: 'Sleep Training Prep', patient: 'Chloe Martin', location: 'Online Meeting', isOnline: true, status: 'pending' },
  ];

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'schedule', label: 'Work Schedule', icon: <Calendar size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] font-sans text-gray-800">

      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 sticky top-0 h-screen flex-shrink-0">
        {/* Logo */}
        <div className="px-7 py-7 flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#F8C8DC] rounded-xl flex items-center justify-center flex-shrink-0" />
          <span className="text-xl font-black tracking-tight text-gray-900">MamaCare</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className="px-5 py-6 border-t border-gray-50 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?u=nurse_sarah"
            className="w-10 h-10 rounded-full object-cover border-2 border-pink-100 flex-shrink-0"
            alt={nurseFullName}
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{nurseFullName}</p>
            <p className="text-[10px] text-gray-400 font-medium">Registered Nurse</p>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Top header (search + actions) */}
        <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 z-10 flex-shrink-0">
          <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full bg-[#F3F6F9] pl-11 pr-4 py-2.5 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Mobile nav — only on small screens */}
            <div className="flex lg:hidden gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`p-2 rounded-xl transition-all ${activePage === item.id ? 'bg-pink-50 text-pink-400' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
            <button
              onClick={onLogout}
              title="Sign out"
              className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* ─── PAGE CONTENT ─── */}

        {/* Schedule page */}
        {activePage === 'schedule' && <WorkScheduleSetup />}

        {/* Placeholder pages */}
        {(activePage === 'profile' || activePage === 'earnings') && (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-gray-50 text-center max-w-md w-full">
              <div className="w-16 h-16 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                {activePage === 'earnings' ? (
                  <DollarSign className="w-8 h-8 text-pink-300" />
                ) : (
                  <Settings className="w-8 h-8 text-pink-300" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{activePage}</h3>
              <p className="text-gray-400 text-sm">This section is coming soon to your dashboard.</p>
            </div>
          </div>
        )}

        {/* Dashboard page */}
        {activePage === 'dashboard' && (
          <div className="p-6 md:p-8 grid grid-cols-12 gap-8 flex-1">

            {/* LEFT & CENTER — 8 columns */}
            <div className="col-span-12 xl:col-span-8 space-y-8">

              {/* Welcome Card */}
              <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                    Good morning, {nurseName}!
                  </h1>
                  <p className="text-gray-400 text-lg mb-8">
                    Here is an overview of your schedule and earnings for today.
                  </p>
                  <button className="bg-[#F8C8DC] text-white px-10 py-4 rounded-3xl font-bold shadow-lg shadow-pink-100 hover:bg-[#f3b5cf] transition-all active:scale-95">
                    Start Shift
                  </button>
                </div>
                <div className="absolute top-[-80px] right-[-40px] w-72 h-72 bg-pink-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard label="Today's Bookings" value="4" subValue="+1 from yesterday" icon={<Calendar className="text-pink-400 w-6 h-6" />} bgColor="bg-pink-50" />
                <StatCard label="Pending Requests" value="7" subValue="Requires attention" icon={<Clock className="text-orange-400 w-6 h-6" />} bgColor="bg-orange-50" alert />
                <StatCard label="Weekly Earnings" value="$840" subValue="+12%" icon={<DollarSign className="text-green-400 w-6 h-6" />} bgColor="bg-green-50" />
              </div>

              {/* Earnings Chart */}
              <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-sm border border-gray-100">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-10">
                  <div>
                    <h2 className="text-2xl font-bold mb-1 text-gray-900">Earnings Overview</h2>
                    <p className="text-gray-400 text-sm">Total Monthly Earnings</p>
                    <div className="text-4xl font-black mt-2 text-gray-900">$4,850</div>
                  </div>
                  <button className="bg-gray-50 px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    Last 6 Months <ChevronDown size={16} />
                  </button>
                </div>
                <div className="h-56 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {[50, 100, 150].map((y) => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f1f5f9" strokeWidth="2" />
                    ))}
                    <defs>
                      <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F8C8DC" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#F8C8DC" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,150 C50,100 100,160 150,120 S250,180 300,140 S400,100 450,150 S550,180 600,100 S700,180 800,110 L800,200 L0,200 Z" fill="url(#pinkGrad)" />
                    <path d="M0,150 C50,100 100,160 150,120 S250,180 300,140 S400,100 450,150 S550,180 600,100 S700,180 800,110" fill="none" stroke="#F8C8DC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    {[[0, 150], [150, 120], [300, 140], [450, 150], [600, 100], [800, 110]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="5" fill="white" stroke="#F8C8DC" strokeWidth="3" />
                    ))}
                  </svg>
                  <div className="flex justify-between mt-4 text-xs font-bold text-gray-300 uppercase tracking-widest px-1">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Today's Schedule — 4 columns */}
            <div className="col-span-12 xl:col-span-4">
              <div className="bg-white rounded-[3rem] p-9 shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Today's Schedule</h2>
                  <button className="text-[#F8C8DC] text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-5 flex-1">
                  {todaySchedule.map((item) => (
                    <div key={item.id} className={`p-5 rounded-[2rem] border transition-all cursor-pointer hover:shadow-md ${item.status === 'active' ? 'border-pink-100 bg-pink-50/30 ring-1 ring-pink-100' :
                        item.status === 'completed' ? 'border-gray-50 opacity-60' : 'border-gray-50'
                      }`}>
                      <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-center min-w-[2.5rem]">
                          <span className={`text-sm font-black leading-tight ${item.status === 'active' ? 'text-pink-400' : 'text-gray-400'}`}>
                            {item.time.split(' ')[0]}
                          </span>
                          <span className="text-[10px] font-black uppercase text-gray-300">
                            {item.time.split(' ')[1]}
                          </span>
                        </div>
                        <div className="w-px bg-gray-100 h-10 mt-0.5 self-start" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">{item.type}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                            <User size={11} /><span className="truncate">{item.patient}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            {item.isOnline ? <Video size={11} /> : <MapPin size={11} />}
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                        {item.status === 'active' && <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mt-1 flex-shrink-0" />}
                        {item.status === 'completed' && <div className="w-2 h-2 bg-green-300 rounded-full mt-1 flex-shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-8 flex items-center justify-center gap-2 text-gray-400 font-bold text-sm hover:text-pink-400 transition-colors py-4 border-2 border-dashed border-gray-100 rounded-2xl">
                  <Plus size={16} /> Add Personal Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
