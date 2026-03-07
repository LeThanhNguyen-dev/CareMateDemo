import React from 'react';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+14%', up: true, icon: TrendingUp, color: 'text-green-600 bg-green-100' },
    { label: 'Active Moms', value: '1,240', change: '+8%', up: true, icon: Users, color: 'text-blue-600 bg-blue-100' },
    { label: 'Verified Nurses', value: '482', change: '+24', up: true, icon: ShieldCheck, color: 'text-rose-600 bg-rose-100' },
    { label: 'Pending Approvals', value: '18', change: '-3', up: false, icon: AlertCircle, color: 'text-amber-600 bg-amber-100' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-full pt-8 px-4">
        <div className="space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'moms', label: 'Mothers', icon: Users },
            { id: 'nurses', label: 'Nurses', icon: ShieldCheck },
            { id: 'approvals', label: 'Approvals', icon: AlertCircle },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === item.id
                  ? "bg-rose-50 text-rose-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pb-10">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-slate-500 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Console</h1>
              <p className="text-slate-500 text-sm">Platform overview and management.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-500 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center space-x-3 bg-white p-1.5 pr-4 rounded-full border border-slate-100 shadow-sm">
                <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full" />
                <span className="text-xs font-bold text-slate-900">Admin User</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <div className={cn("flex items-center text-[10px] font-bold", stat.up ? "text-green-600" : "text-rose-600")}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pending Nurse Approvals */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">Pending Nurse Approvals</h2>
                <button className="text-xs font-bold text-rose-600 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nurse</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialization</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Maria Garcia', spec: 'Postpartum Care', date: 'Oct 24, 2024', img: 'https://i.pravatar.cc/100?img=45' },
                      { name: 'David Lee', spec: 'Newborn Specialist', date: 'Oct 23, 2024', img: 'https://i.pravatar.cc/100?img=11' },
                      { name: 'Sophie Turner', spec: 'Lactation Consultant', date: 'Oct 22, 2024', img: 'https://i.pravatar.cc/100?img=34' },
                    ].map((nurse, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img src={nurse.img} className="w-8 h-8 rounded-full mr-3" />
                            <span className="text-sm font-medium text-slate-900">{nurse.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{nurse.spec}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{nurse.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-200 transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Platform Activity */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[
                  { type: 'booking', text: 'Jessica M. booked Sarah J. for Postpartum Care', time: '2 mins ago' },
                  { type: 'review', text: 'New 5-star review for Marcus Johnson', time: '15 mins ago' },
                  { type: 'payment', text: 'Payout of $1,240 processed for Emily Chen', time: '1 hour ago' },
                  { type: 'user', text: 'New mother registered: Amanda Smith', time: '3 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-700 leading-relaxed">{activity.text}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
