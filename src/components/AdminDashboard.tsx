import React from 'react';
import {
  Users, ShieldCheck, TrendingUp, AlertCircle, CheckCircle2, XCircle,
  ArrowUpRight, ArrowDownRight, LayoutDashboard, Settings, LogOut, Bell,
  Search, Eye, FileText, Clock, Mail, ChevronDown, X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import * as storage from '../lib/storage';
import { CertificationRequest } from '../types';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const REVENUE_DATA = [
  { month: 'Tháng 10', revenue: 85000, bookings: 420 },
  { month: 'Tháng 11', revenue: 92000, bookings: 480 },
  { month: 'Tháng 12', revenue: 105000, bookings: 550 },
  { month: 'Tháng 1', revenue: 112000, bookings: 590 },
  { month: 'Tháng 2', revenue: 118000, bookings: 630 },
  { month: 'Tháng 3', revenue: 124500, bookings: 680 },
];

const USER_DIST_DATA = [
  { name: 'Mẹ Bỉm', value: 1240, color: '#ec4899' },
  { name: 'Điều Dưỡng', value: 482, color: '#10b981' },
];

const SERVICE_DATA = [
  { name: 'Hậu Sản', value: 450 },
  { name: 'Sơ Sinh', value: 380 },
  { name: 'Tắm Bé', value: 520 },
  { name: 'NICU', value: 120 },
  { name: 'Tư Vấn', value: 210 },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [certRequests, setCertRequests] = React.useState<CertificationRequest[]>([]);
  const [selectedReq, setSelectedReq] = React.useState<CertificationRequest | null>(null);
  const [rejectNote, setRejectNote] = React.useState('');
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    setCertRequests(storage.getCertRequests());
  }, [activeTab]);

  const handleApprove = (req: CertificationRequest) => {
    storage.updateCertRequestStatus(req.id, 'approved');
    setCertRequests(storage.getCertRequests());
  };

  const handleReject = () => {
    if (selectedReq) {
      storage.updateCertRequestStatus(selectedReq.id, 'rejected', rejectNote);
      setCertRequests(storage.getCertRequests());
      setShowRejectModal(false);
      setSelectedReq(null);
      setRejectNote('');
    }
  };

  const stats = [
    { label: 'Tổng Doanh Thu', value: '$124,500', change: '+14%', up: true, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Tài Khoản Mẹ', value: '1,240', change: '+8%', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Điều Dưỡng', value: '482', change: '+24', up: true, icon: ShieldCheck, color: 'text-brand-600 bg-brand-50' },
    { label: 'Chờ Phê Duyệt', value: String(certRequests.filter(r => r.status === 'pending').length), change: '', up: false, icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
  ];

  const pendingReqs = certRequests.filter(r => r.status === 'pending');
  const approvedReqs = certRequests.filter(r => r.status === 'approved');
  const rejectedReqs = certRequests.filter(r => r.status === 'rejected');

  const sidebarItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'moms', label: 'Tài Khoản Mẹ', icon: Users },
    { id: 'nurses', label: 'Điều Dưỡng', icon: ShieldCheck },
    { id: 'approvals', label: 'Phê Duyệt', icon: AlertCircle, badge: pendingReqs.length || undefined },
    { id: 'settings', label: 'Cài Đặt', icon: Settings },
  ];

  const demoMoms = [
    { id: 'm1', name: 'Jessica M.', email: 'jessica@example.com', joined: '01/10/2024', bookings: 5, status: 'active', img: 'https://i.pravatar.cc/100?img=32' },
    { id: 'm2', name: 'Amanda Smith', email: 'amanda@example.com', joined: '15/09/2024', bookings: 3, status: 'active', img: 'https://i.pravatar.cc/100?img=25' },
    { id: 'm3', name: 'Sarah Johnson', email: 'sarah.j@example.com', joined: '20/08/2024', bookings: 12, status: 'active', img: 'https://i.pravatar.cc/100?img=44' },
    { id: 'm4', name: 'Emily Tran', email: 'emily.t@example.com', joined: '05/07/2024', bookings: 8, status: 'inactive', img: 'https://i.pravatar.cc/100?img=47' },
    { id: 'm5', name: 'Chloe Martin', email: 'chloe@example.com', joined: '12/10/2024', bookings: 1, status: 'active', img: 'https://i.pravatar.cc/100?img=36' },
  ];

  const demoNurses = [
    { id: 'n1', name: 'Sarah Jenkins, RN', email: 'sarah@example.com', spec: 'Hậu Sản', rating: 4.9, verified: true, bookings: 124, img: 'https://i.pravatar.cc/100?img=48' },
    { id: 'n2', name: 'Emily Chen, LPN', email: 'emily@example.com', spec: 'Sơ Sinh', rating: 4.8, verified: true, bookings: 89, img: 'https://i.pravatar.cc/100?img=26' },
    { id: 'n3', name: 'Marcus Johnson, RN', email: 'marcus@example.com', spec: 'NICU', rating: 4.9, verified: true, bookings: 210, img: 'https://i.pravatar.cc/100?img=11' },
    { id: 'n4', name: 'Maria Garcia', email: 'maria@example.com', spec: 'Hậu Sản', rating: 0, verified: false, bookings: 0, img: 'https://i.pravatar.cc/100?img=45' },
    { id: 'n5', name: 'David Lee', email: 'david@example.com', spec: 'Sơ Sinh', rating: 0, verified: false, bookings: 0, img: 'https://i.pravatar.cc/100?img=12' },
  ];

  const filteredMoms = demoMoms.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredNurses = demoNurses.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const pageTitle: Record<string, string> = { overview: 'Tổng Quan Hệ Thống', moms: 'Quản Lý Tài Khoản Mẹ', nurses: 'Quản Lý Điều Dưỡng', approvals: 'Phê Duyệt Chứng Chỉ', settings: 'Cài Đặt Hệ Thống' };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 fixed h-full pt-6 px-3">
        <div className="px-3 mb-6">
          <span className="text-xl text-brand-600" style={{ fontFamily: "'Patrick Hand', cursive" }}>CareMate</span>
          <p className="text-[10px] text-gray-400 mt-0.5">Quản Trị Viên</p>
        </div>
        <div className="space-y-0.5 flex-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSearchQuery(''); }}
              className={cn("flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                activeTab === item.id ? "bg-brand-50 text-brand-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900")}>
              <item.icon className="w-4 h-4 mr-2.5" />
              {item.label}
              {item.badge && <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>}
            </button>
          ))}
        </div>
        <div className="pb-6">
          <button onClick={onLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all">
            <LogOut className="w-4 h-4 mr-2.5" /> Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-56 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{pageTitle[activeTab]}</h1>
              <p className="text-gray-400 text-sm">Xin chào, Quản trị viên</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-brand-600 relative">
                <Bell className="w-4 h-4" />
                {pendingReqs.length > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />}
              </button>
              <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100">
                <img src="https://i.pravatar.cc/100?img=12" className="w-7 h-7 rounded-md" />
                <span className="text-xs font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-gray-100">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", stat.color)}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      {stat.change && (
                        <div className={cn("flex items-center text-xs font-medium", stat.up ? "text-green-600" : "text-red-500")}>
                          {stat.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                          {stat.change}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-3 gap-5 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 h-[380px] flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-900">Xu Hướng Doanh Thu & Đặt Lịch</h2>
                      <p className="text-[10px] text-gray-400">6 tháng gần nhất</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-brand-500" />
                        <span className="text-[10px] text-gray-500">Doanh thu</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-pink-400" />
                        <span className="text-[10px] text-gray-500">Đặt lịch</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4338ca" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#4338ca" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                        <Area type="monotone" dataKey="bookings" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorBook)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 h-[380px] flex flex-col">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">Phân Bổ Người Dùng</h2>
                  <p className="text-[10px] text-gray-400 mb-6">Tổng cộng: 1,722 thành viên</p>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={USER_DIST_DATA}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {USER_DIST_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-[350px] flex flex-col">
                  <h2 className="text-sm font-semibold text-gray-900 mb-6">Dịch Vụ Phổ Biến</h2>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={SERVICE_DATA} layout="vertical" margin={{ left: -20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4b5563', fontWeight: 500 }} />
                        <Tooltip
                          cursor={{ fill: '#f9fafb' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-sm font-semibold text-gray-900">Chứng Chỉ Chờ Phê Duyệt</h2>
                    <button onClick={() => setActiveTab('approvals')} className="text-xs font-medium text-brand-600 hover:text-brand-700">Xem Tất Cả</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-5 py-3 text-xs font-medium text-gray-500">Điều Dưỡng</th>
                          <th className="px-5 py-3 text-xs font-medium text-gray-500">Chuyên Môn</th>
                          <th className="px-5 py-3 text-xs font-medium text-gray-500">Ngày Nộp</th>
                          <th className="px-5 py-3 text-xs font-medium text-gray-500">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {pendingReqs.slice(0, 3).map((req) => (
                          <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2.5">
                                <img src={req.nurseImage || 'https://i.pravatar.cc/100'} className="w-7 h-7 rounded-md" />
                                <span className="text-sm font-medium text-gray-800">{req.nurseName}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-sm text-gray-500">{req.specialization}</td>
                            <td className="px-5 py-3 text-sm text-gray-500">{req.submittedAt}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => handleApprove(req)} className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-all"><CheckCircle2 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => { setSelectedReq(req); setShowRejectModal(true); }} className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"><XCircle className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {pendingReqs.length === 0 && (
                          <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-400">Không có hồ sơ chờ duyệt.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-900 mb-5">Hoạt Động</h2>
                  <div className="space-y-4">
                    {[
                      { text: 'Jessica M. đặt lịch Hậu Sản với Sarah J.', time: '2 phút trước' },
                      { text: 'Đánh giá 5★ cho Marcus Johnson', time: '15 phút trước' },
                      { text: 'Thanh toán $1,240 cho Emily Chen', time: '1 giờ trước' },
                      { text: 'Mẹ mới đăng ký: Amanda Smith', time: '3 giờ trước' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-600 leading-relaxed">{activity.text}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Moms Tab */}
          {activeTab === 'moms' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Tìm kiếm mẹ bỉm..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none" />
                </div>
                <span className="text-sm text-gray-400">{filteredMoms.length} tài khoản</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Tên</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Email</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Ngày Tham Gia</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Đặt Lịch</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMoms.map(mom => (
                      <tr key={mom.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={mom.img} className="w-7 h-7 rounded-md" />
                            <span className="text-sm font-medium text-gray-800">{mom.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{mom.email}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{mom.joined}</td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{mom.bookings}</td>
                        <td className="px-5 py-3.5">
                          <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold",
                            mom.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500')}>
                            {mom.status === 'active' ? 'HOẠT ĐỘNG' : 'KHÔNG HĐ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Nurses Tab */}
          {activeTab === 'nurses' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Tìm kiếm điều dưỡng..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none" />
                </div>
                <span className="text-sm text-gray-400">{filteredNurses.length} điều dưỡng</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Tên</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Email</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Chuyên Môn</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Đánh Giá</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Xác Minh</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Ca</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredNurses.map(n => (
                      <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={n.img} className="w-7 h-7 rounded-md" />
                            <span className="text-sm font-medium text-gray-800">{n.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{n.email}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{n.spec}</td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{n.rating > 0 ? `${n.rating} ★` : '—'}</td>
                        <td className="px-5 py-3.5">
                          <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold",
                            n.verified ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600')}>
                            {n.verified ? 'ĐÃ XÁC MINH' : 'CHỜ DUYỆT'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{n.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Approvals Tab */}
          {activeTab === 'approvals' && (
            <div>
              <div className="flex gap-2 mb-6">
                {[
                  { label: 'Chờ Duyệt', count: pendingReqs.length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { label: 'Đã Duyệt', count: approvedReqs.length, color: 'bg-green-50 text-green-700 border-green-200' },
                  { label: 'Từ Chối', count: rejectedReqs.length, color: 'bg-red-50 text-red-600 border-red-200' },
                ].map(tab => (
                  <span key={tab.label} className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border", tab.color)}>
                    {tab.label} ({tab.count})
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                {certRequests.map((req) => (
                  <div key={req.id} className={cn("bg-white rounded-xl border p-6 transition-all",
                    req.status === 'pending' ? 'border-amber-200' : req.status === 'approved' ? 'border-green-200' : 'border-red-200')}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={req.nurseImage || 'https://i.pravatar.cc/100'} className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{req.nurseName}</h3>
                          <p className="text-xs text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {req.nurseEmail}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-gray-500">{req.specialization}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{req.experience} năm KN</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-bold uppercase",
                          req.status === 'pending' ? 'bg-amber-50 text-amber-600' : req.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500')}>
                          {req.status === 'pending' ? 'CHỜ DUYỆT' : req.status === 'approved' ? 'ĐÃ DUYỆT' : 'TỪ CHỐI'}
                        </span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {req.certifications.map(cert => (
                        <span key={cert} className="px-2 py-1 bg-brand-50 text-brand-700 rounded-md text-xs font-medium border border-brand-100">{cert}</span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {req.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">
                          <FileText className="w-3 h-3 text-gray-400" />
                          {doc.name}
                          <span className="text-gray-300 ml-1">|</span>
                          <span className="text-gray-400">{doc.uploadedAt}</span>
                        </div>
                      ))}
                    </div>

                    {req.adminNote && (
                      <div className="mt-3 p-2.5 bg-red-50 rounded-lg text-xs text-red-600 border border-red-100">
                        <strong>Ghi chú:</strong> {req.adminNote}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Nộp: {req.submittedAt}{req.reviewedAt && ` · Duyệt: ${req.reviewedAt}`}</span>
                      {req.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(req)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Phê Duyệt
                          </button>
                          <button onClick={() => { setSelectedReq(req); setShowRejectModal(true); }} className="px-4 py-2 bg-white text-red-500 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Từ Chối
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {certRequests.length === 0 && (
                  <div className="bg-white rounded-xl p-12 border border-gray-100 text-center">
                    <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Chưa có yêu cầu phê duyệt nào.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-lg">
              <div className="bg-white rounded-xl border border-gray-100 p-8 mb-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Cài Đặt Chung</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Tên Nền Tảng</label>
                    <input type="text" defaultValue="CareMate" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email Hỗ Trợ</label>
                    <input type="email" defaultValue="hotro@CareMate.vn" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Phí Nền Tảng (%)</label>
                    <input type="number" defaultValue="10" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <button className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all mt-2">Lưu Thay Đổi</button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-8">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Thông Báo</h2>
                <div className="space-y-3">
                  {['Email cho đăng ký mới', 'Thông báo phê duyệt chứng chỉ', 'Báo cáo doanh thu hàng tuần'].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer">
                      <span className="text-sm text-gray-700">{item}</span>
                      <div className="w-9 h-5 bg-brand-600 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Reject Modal */}
      {showRejectModal && selectedReq && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-900">Từ Chối Hồ Sơ</h3>
              <button onClick={() => setShowRejectModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Từ chối hồ sơ của <strong>{selectedReq.nurseName}</strong>? Hãy ghi lý do.</p>
            <textarea rows={3} value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Lý do từ chối..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm mb-4 outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
            <div className="flex gap-2">
              <button onClick={() => setShowRejectModal(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">Hủy</button>
              <button onClick={handleReject} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">Từ Chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
