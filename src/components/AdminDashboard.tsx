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
  Bell,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const stats = [
    { label: 'Tổng Doanh Thu', value: '$124,500', change: '+14%', up: true, icon: TrendingUp, color: 'text-green-600 bg-green-100' },
    { label: 'Tài Khoản Mẹ', value: '1,240', change: '+8%', up: true, icon: Users, color: 'text-blue-600 bg-blue-100' },
    { label: 'Điều Dưỡng Đã Xác Thực', value: '482', change: '+24', up: true, icon: ShieldCheck, color: 'text-pink-400 bg-pink-100' },
    { label: 'Chờ Phê Duyệt', value: '18', change: '-3', up: false, icon: AlertCircle, color: 'text-amber-600 bg-amber-100' },
  ];

  // Placeholder components for other tabs
  const MomsManagement = () => (
    <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-slate-100 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Users className="w-10 h-10 text-blue-400" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Quản Lý Tài Khoản Mẹ</h2>
      <p className="text-slate-500">Tính năng quản lý chuyên sâu cho tài khoản mẹ đang được hoàn thiện.</p>
    </div>
  );

  const NursesManagement = () => (
    <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-slate-100 text-center">
      <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-10 h-10 text-pink-400" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Quản Lý Điều Dưỡng</h2>
      <p className="text-slate-500">Tính năng quản lý chuyên sâu cho điều dưỡng đang được hoàn thiện.</p>
    </div>
  );

  const ApprovalsManagement = () => (
    <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-slate-100 text-center">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-amber-400" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Quản Lý Phê Duyệt</h2>
      <p className="text-slate-500">Tính năng quản lý chuyên sâu cho phê duyệt đang được hoàn thiện.</p>
    </div>
  );

  const SettingsManagement = () => (
    <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-slate-100 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Settings className="w-10 h-10 text-slate-500" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Cài Đặt Hệ Thống</h2>
      <p className="text-slate-500">Tính năng cài đặt hệ thống đang được hoàn thiện.</p>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-full pt-8 px-4">
        <div className="space-y-1">
          {[
            { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
            { id: 'moms', label: 'Tài Khoản Mẹ', icon: Users },
            { id: 'nurses', label: 'Điều Dưỡng', icon: ShieldCheck },
            { id: 'approvals', label: 'Phê Duyệt', icon: AlertCircle },
            { id: 'settings', label: 'Cài Đặt', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === item.id
                  ? "bg-pink-50 text-pink-400"
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
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-slate-500 rounded-xl hover:bg-pink-50 hover:text-pink-400 transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 capitalize">Quản Lý {activeTab === 'overview' ? 'Hệ Thống' : activeTab === 'moms' ? 'Người Dùng' : activeTab === 'nurses' ? 'Điều Dưỡng' : activeTab === 'approvals' ? 'Phê Duyệt' : 'Cài Đặt'}</h1>
              <p className="text-slate-500 text-sm">Xin chào, Quản trị viên!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-pink-400 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-pink-300 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center space-x-3 bg-white p-1.5 pr-4 rounded-full border border-slate-100 shadow-sm">
                <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full" />
                <span className="text-xs font-bold text-slate-900">Quản Trị Viên</span>
              </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
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
                      <div className={cn("flex items-center text-[10px] font-bold", stat.up ? "text-green-600" : "text-pink-400")}>
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
                    <h2 className="text-lg font-bold text-slate-900">Hồ Sơ Chờ Phê Duyệt</h2>
                    <button className="text-xs font-bold text-pink-400 hover:underline">Xem Tất Cả</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Điều Dưỡng</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Chuyên Môn</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày Đăng Ký</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { name: 'Maria Garcia', spec: 'Khám Hậu Sản', date: '24 Th10, 2024', img: 'https://i.pravatar.cc/100?img=45' },
                          { name: 'David Lee', spec: 'Chuyên Gia Trẻ Sơ Sinh', date: '23 Th10, 2024', img: 'https://i.pravatar.cc/100?img=11' },
                          { name: 'Sophie Turner', spec: 'Tư Vấn Cho Con Bú', date: '22 Th10, 2024', img: 'https://i.pravatar.cc/100?img=34' },
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
                                <button className="p-1.5 bg-pink-50 text-pink-400 rounded-lg hover:bg-pink-300 hover:text-white transition-all">
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
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Hoạt Động Gần Đây</h2>
                  <div className="space-y-6">
                    {[
                      { type: 'booking', text: 'Jessica M. đã đặt lịch Khám Hậu Sản với Sarah J.', time: '2 phút trước' },
                      { type: 'review', text: 'Đánh giá 5 sao mới cho Marcus Johnson', time: '15 phút trước' },
                      { type: 'payment', text: 'Thanh toán $1,240 đã chuyển cho Emily Chen', time: '1 giờ trước' },
                      { type: 'user', text: 'Bà mẹ mới đăng ký: Amanda Smith', time: '3 giờ trước' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-300 rounded-full mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-700 leading-relaxed">{activity.text}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-pink-50 hover:text-pink-400 transition-all">
                    Xem Tất Cả Hoạt Động
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'moms' && <MomsManagement />}
          {activeTab === 'nurses' && <NursesManagement />}
          {activeTab === 'approvals' && <ApprovalsManagement />}
          {activeTab === 'settings' && <SettingsManagement />}
        </div>
      </main>
    </div>
  );
};
