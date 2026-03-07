/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { NurseSearch } from './pages/NurseSearch';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { BookingPage } from './pages/BookingPage';
import { MomDashboard } from './components/MomDashboard';
import { NurseDashboard } from './components/NurseDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Nurse, Booking } from './types';
import { motion, AnimatePresence } from 'motion/react';
import * as storage from './lib/storage';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [userRole, setUserRole] = React.useState<'mom' | 'nurse' | 'admin' | null>(null);
  const [selectedNurse, setSelectedNurse] = React.useState<Nurse | null>(null);
  const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(null);
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  // Initialize session and demo data
  React.useEffect(() => {
    storage.initDemoData();
    const current = storage.getCurrentUser();
    if (current) {
      setUserRole(current.role as any);
      // If nurse is not verified, they should go through onboarding
      if (current.role === 'nurse' && !current.isVerified) {
        setCurrentPage('onboarding');
      }
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleAuthSuccess = (role: 'mom' | 'nurse' | 'admin') => {
    setUserRole(role);
    const current = storage.getCurrentUser();

    if (role === 'nurse' && current && !current.isVerified) {
      setCurrentPage('onboarding');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setUserRole(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'services':
        return <Services onSelectService={(id) => {
          setSelectedServiceId(id);
          setCurrentPage('nurses');
        }} />;
      case 'nurses':
        return (
          <NurseSearch
            initialService={selectedServiceId}
            onSelectNurse={(nurse) => {
              setSelectedNurse(nurse);
              setCurrentPage('booking');
            }}
            onBackToServices={() => {
              setSelectedServiceId(null);
              setCurrentPage('services');
            }}
          />
        );
      case 'booking':
        if (!selectedNurse) return <Home onNavigate={handleNavigate} />;
        return (
          <BookingPage
            nurse={selectedNurse}
            onBack={() => setCurrentPage('nurses')}
            onConfirm={(bookingData) => {
              const newBooking: Booking = {
                id: Math.random().toString(36).substr(2, 9),
                ...bookingData,
              };
              setBookings(prev => [newBooking, ...prev]);
            }}
          />
        );
      case 'about':
        return <About />;
      case 'login':
        return <Auth mode="login" onSuccess={handleAuthSuccess} onSwitch={(mode) => setCurrentPage(mode)} />;
      case 'register':
        return <Auth mode="register" onSuccess={handleAuthSuccess} onSwitch={(mode) => setCurrentPage(mode)} />;
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        if (userRole === 'mom') return <MomDashboard bookings={bookings} onNavigate={handleNavigate} onLogout={handleLogout} />;
        if (userRole === 'nurse') return <NurseDashboard onLogout={handleLogout} />;
        if (userRole === 'admin') return <AdminDashboard onLogout={handleLogout} />;
        return <Home onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-pink-100 selection:text-pink-400">
      {!(currentPage === 'dashboard' && userRole === 'nurse') && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentPage !== 'dashboard' && currentPage !== 'onboarding' && currentPage !== 'booking' && <Footer />}

      {/* Admin Quick Access (For Demo) */}
      <div className="fixed bottom-4 left-4 z-[60] flex space-x-2">
        <button
          onClick={() => { setUserRole('admin'); setCurrentPage('dashboard'); }}
          className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full opacity-50 hover:opacity-100 transition-opacity"
        >
          DEMO: ADMIN
        </button>
        <button
          onClick={() => { setUserRole('nurse'); setCurrentPage('dashboard'); }}
          className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full opacity-50 hover:opacity-100 transition-opacity"
        >
          DEMO: ĐIỀU DƯỠNG
        </button>
      </div>
    </div>
  );
}
