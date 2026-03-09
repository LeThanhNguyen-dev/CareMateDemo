import React from 'react';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
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
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'services', label: 'Dịch vụ' },
    { id: 'about', label: 'Về chúng tôi' },
  ];

  const authItems = userRole ? [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'logout', label: 'Đăng xuất', icon: LogOut, action: onLogout },
  ] : [
    { id: 'login', label: 'Đăng nhập' },
    { id: 'register', label: 'Đăng ký' },
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
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100"
        : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl text-brand-600 group-hover:text-brand-700 transition-colors" style={{ fontFamily: "'Patrick Hand', cursive" }}>CareMate</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "px-3 py-2 text-[13px] font-medium rounded-lg transition-colors",
                  currentPage === item.id
                    ? "text-brand-700 bg-brand-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {authItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "text-[13px] font-semibold px-4 py-2 rounded-lg transition-all",
                  item.id === 'register'
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : item.id === 'logout'
                      ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      : item.id === 'dashboard'
                        ? "text-brand-700 bg-brand-50 hover:bg-brand-100"
                        : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-1 pb-4 space-y-1">
              {[...navItems, ...authItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    currentPage === item.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
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
