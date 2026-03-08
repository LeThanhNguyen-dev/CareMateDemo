import React from 'react';
import * as storage from '../lib/storage';
import WorkScheduleSetup from './WorkScheduleSetup';
import {
  Search, Calendar, Clock, DollarSign, Plus, Video, MapPin, User,
  ChevronDown, LogOut, LayoutDashboard, Upload, FileText, ShieldCheck,
  CheckCircle2, AlertCircle, Award, Mail, Phone, Camera, TrendingUp,
  ArrowUpRight, Download, Eye,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CertificationRequest } from '../types';

interface ScheduleItem {
  id: string;
  time: string;
  type: string;
  patient: string;
  location: string;
  isOnline?: boolean;
  status: 'pending' | 'active' | 'completed';
}

type ActivePage = 'dashboard' | 'schedule' | 'profile' | 'earnings' | 'certification';

const SidebarLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
      ${active ? 'bg-brand-50 text-brand-700' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'}`}
  >
    <span className="shrink-0">{icon}</span>
    {label}
    {badge && <span className={cn("ml-auto px-1.5 py-0.5 rounded-md text-[9px] font-bold",
      badge === 'NEW' ? 'bg-amber-100 text-amber-700' : badge === '✓' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
    )}>{badge}</span>}
  </button>
);

interface StatCardProps {
  label: string;
  value: string | number;
  subValue: string;
  icon: React.ReactNode;
  bgColor: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, bgColor, alert }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 flex justify-between items-start hover:shadow-sm transition-all">
    <div>
      <h3 className="text-gray-400 font-medium text-sm mb-4">{label}</h3>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${alert ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
          {subValue}
        </span>
      </div>
    </div>
    <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center shrink-0`}>
      {icon}
    </div>
  </div>
);

interface NurseDashboardProps {
  onLogout: () => void;
}

export const NurseDashboard: React.FC<NurseDashboardProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = React.useState<ActivePage>('dashboard');
  const currentUser = storage.getCurrentUser();
  const nurseName = currentUser?.name?.split(' ')[0] || 'Sarah';
  const nurseFullName = currentUser?.name || 'Sarah Jenkins';
  const isVerified = currentUser?.isVerified ?? false;

  // Certification state
  const [certRequest, setCertRequest] = React.useState<CertificationRequest | null>(null);
  const [certDocs, setCertDocs] = React.useState<string[]>([]);
  const [certCerts, setCertCerts] = React.useState<string[]>([]);
  const [certExp, setCertExp] = React.useState(0);
  const [certSpec, setCertSpec] = React.useState('Hậu Sản');
  const [certSubmitted, setCertSubmitted] = React.useState(false);

  // Profile state
  const [profileName, setProfileName] = React.useState(nurseFullName);
  const [profileEmail, setProfileEmail] = React.useState(currentUser?.email || '');
  const [profilePhone, setProfilePhone] = React.useState('0912-345-678');
  const [profileBio, setProfileBio] = React.useState('');
  const [profileSaved, setProfileSaved] = React.useState(false);

  React.useEffect(() => {
    if (currentUser) {
      const req = storage.getCertRequestByNurseId(currentUser.id);
      setCertRequest(req);
      if (req) setCertSubmitted(true);
    }
  }, [activePage]);

  const handleSubmitCert = () => {
    if (!currentUser || certDocs.length === 0) return;
    const req: CertificationRequest = {
      id: `cert-${Date.now()}`,
      nurseId: currentUser.id,
      nurseName: currentUser.name,
      nurseEmail: currentUser.email,
      documents: certDocs.map(d => ({ name: d, type: 'document', uploadedAt: new Date().toISOString().split('T')[0] })),
      certifications: certCerts,
      experience: certExp,
      specialization: certSpec,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    storage.saveCertRequest(req);
    setCertRequest(req);
    setCertSubmitted(true);
  };

  const handleSaveProfile = () => {
    if (currentUser) {
      storage.saveUser({ ...currentUser, name: profileName, email: profileEmail });
      storage.setCurrentUser({ ...currentUser, name: profileName, email: profileEmail });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    }
  };

  const todaySchedule: ScheduleItem[] = [
    { id: '1', time: '09:00', type: 'Khám Hậu Sản', patient: 'Emily Davis', location: '124 Maple St.', status: 'active' },
    { id: '2', time: '11:30', type: 'Tư Vấn Sữa Mẹ', patient: 'Jessica Wong', location: 'Qua Video', isOnline: true, status: 'pending' },
    { id: '3', time: '14:00', type: 'Kiểm Tra Sơ Sinh', patient: 'Amanda Smith', location: '89 Oak Ave.', status: 'completed' },
    { id: '4', time: '16:30', type: 'Luyện Ngủ', patient: 'Chloe Martin', location: 'Qua Video', isOnline: true, status: 'pending' },
  ];

  const certBadge = !isVerified ? (certRequest ? (certRequest.status === 'pending' ? 'CHỜ' : certRequest.status === 'rejected' ? '!' : '') : 'NEW') : '✓';

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Bảng Điều Khiển', icon: <LayoutDashboard size={16} /> },
    { id: 'schedule', label: 'Lịch Làm Việc', icon: <Calendar size={16} /> },
    { id: 'certification', label: 'Chứng Chỉ', icon: <Award size={16} />, badge: certBadge || undefined },
    { id: 'profile', label: 'Hồ Sơ', icon: <User size={16} /> },
    { id: 'earnings', label: 'Thu Nhập', icon: <DollarSign size={16} /> },
  ];

  // Earnings data
  const monthlyEarnings = [
    { month: 'T8/24', value: 3200, sessions: 42 },
    { month: 'T9/24', value: 3800, sessions: 48 },
    { month: 'T10/24', value: 4200, sessions: 53 },
    { month: 'T11/24', value: 3900, sessions: 50 },
    { month: 'T12/24', value: 4500, sessions: 56 },
    { month: 'T1/25', value: 4850, sessions: 61 },
  ];

  const recentPayments = [
    { date: '08/03', patient: 'Emily Davis', service: 'Khám Hậu Sản', amount: 120, status: 'paid' },
    { date: '07/03', patient: 'Jessica Wong', service: 'Tư Vấn Sữa Mẹ', amount: 90, status: 'paid' },
    { date: '06/03', patient: 'Amanda Smith', service: 'Kiểm Tra Sơ Sinh', amount: 80, status: 'pending' },
    { date: '05/03', patient: 'Chloe Martin', service: 'Luyện Ngủ', amount: 130, status: 'paid' },
    { date: '04/03', patient: 'Sarah Nguyen', service: 'Massage Bé', amount: 70, status: 'paid' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 sticky top-0 h-screen shrink-0">
        <div className="px-5 py-5 flex items-center gap-2.5 mb-3">
          <span className="text-xl text-brand-600" style={{ fontFamily: "'Patrick Hand', cursive" }}>CareMom</span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => (
            <SidebarLink key={item.id} icon={item.icon} label={item.label} badge={item.badge} active={activePage === item.id} onClick={() => setActivePage(item.id)} />
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-gray-50 flex items-center gap-2.5">
          <img src="https://i.pravatar.cc/150?u=nurse_sarah" className="w-8 h-8 rounded-lg object-cover border border-gray-100 shrink-0" alt={nurseFullName} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{nurseFullName}</p>
            <div className="flex items-center gap-1">
              <p className="text-[10px] text-gray-400">Điều Dưỡng</p>
              {isVerified && <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="bg-white px-6 py-3.5 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10 shrink-0">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Tìm kiếm..." className="w-full bg-gray-50 pl-9 pr-4 py-2 rounded-lg text-sm border border-gray-200 focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all" />
          </div>
          <div className="flex items-center gap-3">
            {!isVerified && (
              <button onClick={() => setActivePage('certification')} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Chưa Xác Minh
              </button>
            )}
            <div className="flex lg:hidden gap-1.5">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setActivePage(item.id)}
                  className={`p-2 rounded-lg transition-all ${activePage === item.id ? 'bg-brand-50 text-brand-700' : 'text-gray-400 hover:bg-gray-50'}`}
                  title={item.label}>{item.icon}</button>
              ))}
            </div>
            <button onClick={onLogout} title="Đăng xuất" className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Schedule — only for verified nurses */}
        {activePage === 'schedule' && (
          isVerified ? <WorkScheduleSetup /> : (
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="bg-white rounded-xl p-12 border border-gray-100 text-center max-w-sm w-full">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Cần Xác Minh</h3>
                <p className="text-gray-400 text-sm mb-5">Bạn cần được xác minh chứng chỉ trước khi có thể thiết lập lịch làm việc.</p>
                <button onClick={() => setActivePage('certification')} className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all">
                  Gửi Chứng Chỉ
                </button>
              </div>
            </div>
          )
        )}

        {/* Certification Page */}
        {activePage === 'certification' && (
          <div className="flex-1 p-5 md:p-7">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Chứng Chỉ & Xác Minh</h1>
              <p className="text-gray-400 text-sm mb-6">Gửi chứng chỉ của bạn để admin xác minh. Sau khi được duyệt, bạn có thể thiết lập lịch làm việc.</p>

              {/* Status banner */}
              {isVerified && (
                <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-200 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Đã Được Xác Minh</p>
                    <p className="text-xs text-green-600">Bạn đã được xác minh và có thể nhận bệnh nhân, thiết lập lịch làm việc.</p>
                  </div>
                </div>
              )}

              {certRequest && certRequest.status === 'pending' && (
                <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Đang Chờ Duyệt</p>
                    <p className="text-xs text-amber-600">Hồ sơ của bạn đã được gửi ngày {certRequest.submittedAt}. Admin sẽ xem xét trong 24-48 giờ.</p>
                  </div>
                </div>
              )}

              {certRequest && certRequest.status === 'rejected' && (
                <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">Hồ Sơ Bị Từ Chối</p>
                    <p className="text-xs text-red-500 mb-1">Admin đã từ chối hồ sơ của bạn. Vui lòng cập nhật và gửi lại.</p>
                    {certRequest.adminNote && <p className="text-xs text-red-600 bg-red-100 p-2 rounded-lg mt-1"><strong>Lý do:</strong> {certRequest.adminNote}</p>}
                  </div>
                </div>
              )}

              {/* Submission form */}
              {(!certSubmitted || (certRequest && certRequest.status === 'rejected')) && !isVerified && (
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
                  <h2 className="text-base font-semibold text-gray-900">Gửi Hồ Sơ</h2>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">Chuyên Môn</label>
                    <select value={certSpec} onChange={e => setCertSpec(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300">
                      <option>Hậu Sản</option><option>Sơ Sinh</option><option>Sữa Mẹ</option><option>Ca Đêm</option><option>Tiền Sản</option><option>NICU</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">Số Năm Kinh Nghiệm</label>
                    <input type="number" min={0} value={certExp} onChange={e => setCertExp(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Chứng Chỉ</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['RN', 'LPN', 'IBCLC', 'CPR', 'BSN', 'CNM', 'NICU', 'NRP'].map(cert => (
                        <label key={cert} className={cn("flex items-center p-2.5 rounded-lg cursor-pointer border transition-all",
                          certCerts.includes(cert) ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-100')}>
                          <input type="checkbox" className="hidden" checked={certCerts.includes(cert)}
                            onChange={() => setCertCerts(prev => prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert])} />
                          <span className="text-sm font-medium">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-2 block">Tài Liệu</label>
                    <div className="space-y-2">
                      {['Giấy Phép Hành Nghề', 'CMND / CCCD', 'Lý Lịch Tư Pháp'].map((doc) => {
                        const isAdded = certDocs.includes(doc);
                        return (
                          <div key={doc} onClick={() => setCertDocs(prev => prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc])}
                            className={cn("p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between",
                              isAdded ? 'border-brand-200 bg-brand-50/30' : 'border-dashed border-gray-200 hover:border-brand-300')}>
                            <div className="flex items-center gap-3">
                              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center",
                                isAdded ? 'bg-brand-100 text-brand-600' : 'bg-gray-50 text-gray-400')}>
                                <FileText className="w-4 h-4" />
                              </div>
                              <span className={cn("text-sm font-medium", isAdded ? 'text-brand-700' : 'text-gray-600')}>{doc}</span>
                            </div>
                            {isAdded ? <CheckCircle2 className="w-4 h-4 text-brand-600" /> : <Upload className="w-4 h-4 text-gray-300" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button onClick={handleSubmitCert} disabled={certDocs.length === 0}
                    className={cn("w-full py-3 rounded-lg font-semibold text-sm transition-all",
                      certDocs.length > 0 ? 'bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.97]' : 'bg-gray-100 text-gray-300 cursor-not-allowed')}>
                    {certRequest?.status === 'rejected' ? 'Gửi Lại Hồ Sơ' : 'Gửi Hồ Sơ Xác Minh'}
                  </button>
                </div>
              )}

              {/* Submitted details */}
              {certSubmitted && certRequest && certRequest.status !== 'rejected' && (
                <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Hồ Sơ Đã Gửi</h2>
                  <div className="grid gap-3">
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Chuyên Môn</span><span className="font-medium text-gray-700">{certRequest.specialization}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Kinh Nghiệm</span><span className="font-medium text-gray-700">{certRequest.experience} năm</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-400">Ngày Nộp</span><span className="font-medium text-gray-700">{certRequest.submittedAt}</span></div>
                    <div className="pt-2 border-t border-gray-50">
                      <span className="text-xs font-medium text-gray-400 mb-2 block">Chứng Chỉ</span>
                      <div className="flex flex-wrap gap-1.5">
                        {certRequest.certifications.map(c => (
                          <span key={c} className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded-md text-xs font-medium border border-brand-100">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                      <span className="text-xs font-medium text-gray-400 mb-2 block">Tài Liệu</span>
                      <div className="flex flex-wrap gap-2">
                        {certRequest.documents.map((doc, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">
                            <FileText className="w-3 h-3 text-gray-400" /> {doc.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Page */}
        {activePage === 'profile' && (
          <div className="flex-1 p-5 md:p-7">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Hồ Sơ Cá Nhân</h1>
              <p className="text-gray-400 text-sm mb-6">Cập nhật thông tin cá nhân và chuyên môn.</p>

              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=nurse_sarah" className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{nurseFullName}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">Điều Dưỡng</span>
                      {isVerified ? (
                        <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-md font-semibold flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5" /> Đã Xác Minh</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md font-semibold">Chưa Xác Minh</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Họ và Tên</label>
                    <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                    <input type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Số Điện Thoại</label>
                    <input type="tel" value={profilePhone} onChange={e => setProfilePhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Chuyên Môn</label>
                    <input type="text" defaultValue={currentUser?.specialization?.join(', ') || 'Chăm sóc hậu sản'}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Giới Thiệu</label>
                  <textarea rows={3} value={profileBio} onChange={e => setProfileBio(e.target.value)} placeholder="Mô tả ngắn gọn về kinh nghiệm và phong cách chăm sóc..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300" />
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all">
                    {profileSaved ? '✓ Đã Lưu' : 'Lưu Thay Đổi'}
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <div onClick={() => setActivePage('certification')} className="bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-brand-600" /></div>
                    <div><p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600">Chứng Chỉ</p><p className="text-xs text-gray-400">Xem và cập nhật</p></div>
                  </div>
                </div>
                <div onClick={() => setActivePage('earnings')} className="bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-600" /></div>
                    <div><p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600">Thu Nhập</p><p className="text-xs text-gray-400">Xem lịch sử</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Page */}
        {activePage === 'earnings' && (
          <div className="flex-1 p-5 md:p-7">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Thu Nhập</h1>
              <p className="text-gray-400 text-sm mb-6">Tổng quan thu nhập và lịch sử thanh toán.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-2">Thu Nhập Tháng Này</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">$4,850</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-md font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-2.5 h-2.5" /> +12%</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-2">Tổng Ca Tháng Này</p>
                  <span className="text-2xl font-bold text-gray-900">61</span>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-2">Thu Nhập Chờ</p>
                  <span className="text-2xl font-bold text-amber-600">$80</span>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">Thu Nhập 6 Tháng</h2>
                <div className="h-48 flex items-end gap-3">
                  {monthlyEarnings.map((m, i) => {
                    const maxVal = Math.max(...monthlyEarnings.map(e => e.value));
                    const height = (m.value / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-[10px] font-semibold text-gray-600">${(m.value / 1000).toFixed(1)}k</span>
                        <div className={cn("w-full rounded-t-lg transition-all", i === monthlyEarnings.length - 1 ? 'bg-brand-500' : 'bg-brand-100')}
                          style={{ height: `${height}%`, minHeight: '12px' }} />
                        <span className="text-[10px] text-gray-400 font-medium">{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-gray-900">Thanh Toán Gần Đây</h2>
                  <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"><Download className="w-3 h-3" /> Xuất CSV</button>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Ngày</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Bệnh Nhân</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Dịch Vụ</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Số Tiền</th>
                      <th className="px-5 py-3 text-xs font-medium text-gray-500">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentPayments.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3.5 text-sm text-gray-500">{p.date}</td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{p.patient}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{p.service}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">${p.amount}</td>
                        <td className="px-5 py-3.5">
                          <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold",
                            p.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600')}>
                            {p.status === 'paid' ? 'ĐÃ TT' : 'CHỜ TT'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activePage === 'dashboard' && (
          <div className="p-5 md:p-7 grid grid-cols-12 gap-6 flex-1">
            <div className="col-span-12 xl:col-span-8 space-y-6">
              <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Chào, {nurseName}!</h1>
                  <p className="text-gray-400 text-sm mb-6">Tổng quan lịch biểu và thu nhập hôm nay.</p>
                  {isVerified ? (
                    <button className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-700 transition-all active:scale-[0.97]">Bắt Đầu Ca Làm</button>
                  ) : (
                    <button onClick={() => setActivePage('certification')} className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-amber-600 transition-all flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Gửi Chứng Chỉ Để Bắt Đầu
                    </button>
                  )}
                </div>
                <div className="absolute top-[-60px] right-[-30px] w-52 h-52 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Ca Hôm Nay" value={isVerified ? "4" : "—"} subValue={isVerified ? "+1" : "N/A"} icon={<Calendar className="text-brand-600 w-5 h-5" />} bgColor="bg-brand-50" />
                <StatCard label="Yêu Cầu Chờ" value={isVerified ? "7" : "—"} subValue={isVerified ? "Cần xem" : "N/A"} icon={<Clock className="text-orange-500 w-5 h-5" />} bgColor="bg-orange-50" alert />
                <StatCard label="Thu Nhập Tuần" value={isVerified ? "$840" : "—"} subValue={isVerified ? "+12%" : "N/A"} icon={<DollarSign className="text-green-600 w-5 h-5" />} bgColor="bg-green-50" />
              </div>

              {/* Earnings Chart */}
              <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-100">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div>
                    <h2 className="text-lg font-bold mb-1 text-gray-900">Thu Nhập</h2>
                    <p className="text-gray-400 text-xs">Tổng thu tháng</p>
                    <div className="text-3xl font-bold mt-1 text-gray-900">$4,850</div>
                  </div>
                  <button className="bg-gray-50 px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-gray-100 transition-colors border border-gray-200">
                    6 Tháng <ChevronDown size={14} />
                  </button>
                </div>
                <div className="h-44 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {[50, 100, 150].map((y) => (<line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f3f4f6" strokeWidth="1" />))}
                    <defs><linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" /><stop offset="100%" stopColor="#14b8a6" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0,150 C50,100 100,160 150,120 S250,180 300,140 S400,100 450,150 S550,180 600,100 S700,180 800,110 L800,200 L0,200 Z" fill="url(#tealGrad)" />
                    <path d="M0,150 C50,100 100,160 150,120 S250,180 300,140 S400,100 450,150 S550,180 600,100 S700,180 800,110" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {[[0, 150], [150, 120], [300, 140], [450, 150], [600, 100], [800, 110]].map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#14b8a6" strokeWidth="2" />))}
                  </svg>
                  <div className="flex justify-between mt-3 text-[10px] font-medium text-gray-400 uppercase tracking-wide px-1">
                    <span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Schedule */}
            <div className="col-span-12 xl:col-span-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Lịch Hôm Nay</h2>
                  <button className="text-brand-600 text-xs font-medium hover:text-brand-700">Xem Tất Cả</button>
                </div>
                <div className="space-y-3 flex-1">
                  {todaySchedule.map((item) => (
                    <div key={item.id} className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${item.status === 'active' ? 'border-brand-200 bg-brand-50/30' : item.status === 'completed' ? 'border-gray-50 opacity-50' : 'border-gray-100'}`}>
                      <div className="flex gap-3 items-start">
                        <div className="flex flex-col items-center min-w-[2rem]">
                          <span className={`text-sm font-bold leading-tight ${item.status === 'active' ? 'text-brand-600' : 'text-gray-500'}`}>{item.time}</span>
                        </div>
                        <div className="w-px bg-gray-100 h-8 self-start" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm mb-1 truncate">{item.type}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5"><User size={10} /><span className="truncate">{item.patient}</span></div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">{item.isOnline ? <Video size={10} /> : <MapPin size={10} />}<span className="truncate">{item.location}</span></div>
                        </div>
                        {item.status === 'active' && <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mt-1 shrink-0" />}
                        {item.status === 'completed' && <div className="w-2 h-2 bg-green-400 rounded-full mt-1 shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 flex items-center justify-center gap-2 text-gray-400 font-medium text-sm hover:text-brand-600 transition-colors py-3 border border-dashed border-gray-200 rounded-lg">
                  <Plus size={14} /> Thêm Nghỉ Phép
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
