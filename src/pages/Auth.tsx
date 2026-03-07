import React from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Lock,
  User,
  Check,
  Facebook
} from 'lucide-react';
import { cn } from '../lib/utils';
import * as storage from '../lib/storage';
import { User as UserType } from '../types';

interface AuthProps {
  mode: 'login' | 'register';
  onSuccess: (role: 'mom' | 'nurse' | 'admin') => void;
  onSwitch: (mode: 'login' | 'register') => void;
}

export const Auth: React.FC<AuthProps> = ({ mode, onSuccess, onSwitch }) => {
  const [role, setRole] = React.useState<'mom' | 'nurse'>('mom');
  const [email, setEmail] = React.useState('thnguyen0407@gmail.com');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name || !email || !password || !confirmPassword) {
        setError('Vui lòng điền đủ thông tin');
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }

      const users = storage.getUsers();
      if (users.find(u => u.email === email)) {
        setError('Email này đã tồn tại');
        return;
      }

      const newUser: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };

      storage.saveUser(newUser);
      storage.setCurrentUser(newUser);
      onSuccess(role);
    } else {
      // Login Logic
      if (email === 'admin@caremom.com' && password === 'admin123') {
        const admin: UserType = { id: 'admin-1', name: 'Admin', email: email, role: 'admin' };
        storage.setCurrentUser(admin);
        onSuccess('admin' as any);
        return;
      }

      const users = storage.getUsers();
      const user = users.find(u => u.email === email);

      if (user) {
        storage.setCurrentUser(user);
        onSuccess(user.role);
      } else {
        setError('Email hoặc mật khẩu không hợp lệ');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFD] flex items-center justify-center p-6 lg:p-12 pt-28">
      <div className="max-w-[1100px] w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left Side: Info & Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full space-y-12"
        >
          <div className="text-left">
            <h1 className="text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
              {mode === 'login' ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới!'}
            </h1>
            <p className="text-gray-500 text-base max-w-md leading-relaxed">
              {mode === 'login'
                ? 'Đăng nhập để tiếp tục sử dụng dịch vụ chăm sóc sức khỏe chuyên nghiệp của CareMate.'
                : 'Đăng ký để bắt đầu trải nghiệm dịch vụ chăm sóc sức khỏe chuyên nghiệp của CareMate.'}
            </p>
          </div>

          {/* Illustration Section */}
          <div className="flex justify-center relative py-12">
            <div className="absolute inset-0 bg-pink-100 rounded-full blur-[100px] opacity-40 translate-y-10" />
            <img
              src="https://img.freepik.com/premium-vector/vector-illustration-concept-professional-nurse-holding-infant-baby-healthcare-maternity_1253456-114.jpg"
              alt="Nurse holding baby"
              className="relative z-10 w-[320px] sm:w-[380px] object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Benefits List */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-pink-400" strokeWidth={4} />
              <span className="text-gray-700 font-semibold text-sm">Kết nối với điều dưỡng chuyên nghiệp</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-pink-400" strokeWidth={4} />
              <span className="text-gray-700 font-semibold text-sm">Đặt lịch chăm sóc linh hoạt</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-pink-400" strokeWidth={4} />
              <span className="text-gray-700 font-semibold text-sm">Hỗ trợ 24/7</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-[450px] bg-[#F5F6F7] rounded-[2.5rem] p-10 shadow-sm border border-gray-100">

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </h2>
              <p className="text-gray-500 font-bold text-sm">
                {mode === 'login' ? 'Truy cập vào tài khoản của bạn' : 'Phân loại tài khoản của bạn'}
              </p>
            </div>

            {mode === 'register' && (
              <div className="flex p-1.5 bg-gray-200 rounded-2xl mb-8">
                <button
                  type="button"
                  onClick={() => setRole('mom')}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                    role === 'mom' ? "bg-white text-pink-400 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Cho Mẹ Bỉm
                </button>
                <button
                  type="button"
                  onClick={() => setRole('nurse')}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                    role === 'nurse' ? "bg-white text-pink-400 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Điều Dưỡng
                </button>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-800 ml-1 uppercase tracking-wider">Họ và Tên</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nhập họ và tên..."
                      className="w-full pl-12 pr-4 py-4 bg-[#E2E4E7] border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold text-[#111827] placeholder-gray-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-800 ml-1 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="thnguyen0407@gmail.com"
                    className="w-full pl-12 pr-4 py-4 bg-[#E2E4E7] border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold text-[#111827] placeholder-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-800 ml-1 uppercase tracking-wider">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-[#E2E4E7] border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold text-[#111827] placeholder-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-800 ml-1 uppercase tracking-wider">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-[#E2E4E7] border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none transition-all font-bold text-[#111827] placeholder-gray-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4.5 bg-pink-400 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-pink-100 hover:bg-pink-500 transition-all active:scale-[0.98]"
              >
                {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center pt-1"><div className="w-full border-t border-gray-400/20"></div></div>
                <span className="relative px-4 bg-[#F5F6F7] text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hoặc tiếp tục với</span>
              </div>

              <div className="flex flex-col gap-3">
                <button type="button" className="flex items-center justify-center py-3.5 px-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-700">Đăng nhập bằng Google</span>
                </button>
                <button type="button" className="flex items-center justify-center py-3.5 px-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                  <Facebook className="w-5 h-5 text-[#1877F2] mr-3 fill-current" />
                  <span className="text-sm font-bold text-gray-700">Facebook</span>
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm font-medium text-gray-500">
              {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button
                onClick={() => onSwitch(mode === 'login' ? 'register' : 'login')}
                className="ml-2 font-black text-pink-500 hover:text-pink-600 hover:underline transition-colors"
              >
                {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
