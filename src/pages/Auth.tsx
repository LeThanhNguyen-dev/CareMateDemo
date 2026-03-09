import React from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Lock,
  User,
  Check,
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
      if (email === 'admin@CareMate.com' && password === 'admin123') {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
      <div className="max-w-[980px] w-full grid lg:grid-cols-5 gap-12 items-start">

        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 hidden lg:flex flex-col"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {mode === 'login' ? 'Chào mừng\ntrở lại!' : 'Tạo tài khoản'}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              {mode === 'login'
                ? 'Đăng nhập để tiếp tục sử dụng dịch vụ chăm sóc.'
                : 'Đăng ký để trải nghiệm dịch vụ chăm sóc chuyên nghiệp.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              'Kết nối với điều dưỡng chuyên nghiệp',
              'Đặt lịch chăm sóc linh hoạt',
              'Hỗ trợ 24/7',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-brand-50 flex items-center justify-center">
                  <Check className="w-3 h-3 text-brand-600" strokeWidth={3} />
                </div>
                <span className="text-gray-600 text-sm">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 italic leading-relaxed">
              "CareMate giúp tôi tìm được điều dưỡng tuyệt vời trong vòng 24h. Dịch vụ chuyên nghiệp từ A đến Z."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <img src="https://i.pravatar.cc/80?img=32" className="w-6 h-6 rounded-full" />
              <span className="text-xs font-medium text-gray-700">Jessica M., Mẹ bỉm</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          <div className="w-full max-w-[440px] mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </h2>
              <p className="text-gray-400 text-sm">
                {mode === 'login' ? 'Truy cập vào tài khoản của bạn' : 'Chọn loại tài khoản phù hợp'}
              </p>
            </div>

            {mode === 'register' && (
              <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                <button
                  type="button"
                  onClick={() => setRole('mom')}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-semibold rounded-md transition-all",
                    role === 'mom' ? "bg-white text-brand-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Mẹ Bỉm
                </button>
                <button
                  type="button"
                  onClick={() => setRole('nurse')}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-semibold rounded-md transition-all",
                    role === 'nurse' ? "bg-white text-brand-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Điều Dưỡng
                </button>
              </div>
            )}

            {error && (
              <div className="mb-5 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Họ và Tên</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nhập họ và tên..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-semibold text-sm hover:bg-brand-700 transition-colors mt-2"
              >
                {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex items-center justify-center mb-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <span className="relative px-3 bg-white text-xs text-gray-400">Hoặc</span>
              </div>

              <div className="space-y-2">
                <button type="button" className="flex items-center justify-center w-full py-2.5 px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button
                onClick={() => onSwitch(mode === 'login' ? 'register' : 'login')}
                className="ml-1 font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
