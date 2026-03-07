import React from 'react';
import {
  Home,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  Bell,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole?: 'mom' | 'nurse' | 'admin' | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'services', label: 'Dịch vụ', icon: Heart },
    { id: 'about', label: 'Về chúng tôi', icon: User },
  ];

  const authItems = userRole ? [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'logout', label: 'Đăng xuất', icon: LogOut, action: onLogout },
  ] : [
    { id: 'login', label: 'Đăng nhập', icon: User },
    { id: 'register', label: 'Đăng ký', icon: ShieldCheck },
  ];

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onNavigate(item.id);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center mr-2">
              <Heart className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-pink-400 tracking-tight">CareMate</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-pink-400",
                  currentPage === item.id ? "text-pink-400" : "text-slate-600"
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="h-6 w-px bg-slate-200 mx-2" />

            {userRole && (
              <div className="flex items-center space-x-4 text-slate-500 mr-2">
                <button className="hover:text-pink-400 transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="flex items-center space-x-3 ml-4">
              {authItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "text-sm font-semibold px-5 py-2.5 rounded-full transition-all flex items-center gap-2",
                    item.id === 'register'
                      ? "bg-pink-400 text-white hover:bg-pink-400 shadow-md shadow-pink-200"
                      : item.id === 'logout'
                        ? "text-slate-500 hover:text-pink-400 bg-slate-50 hover:bg-pink-50"
                        : item.id === 'dashboard'
                          ? "bg-pink-50 text-pink-400 hover:bg-pink-100"
                          : "text-slate-600 hover:text-pink-400 hover:bg-slate-50 border border-slate-200"
                  )}
                >
                  <item.icon className="w-4 h-4 hidden lg:block" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-pink-400"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-pink-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[...navItems, ...authItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex items-center w-full px-3 py-3 text-base font-medium rounded-lg",
                    currentPage === item.id
                      ? "bg-pink-50 text-pink-400"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
