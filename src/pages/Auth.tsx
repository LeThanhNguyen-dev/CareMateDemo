import React from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Heart
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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }

      const users = storage.getUsers();
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
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
        setError('Invalid email or password');
      }
    }
  };
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 px-4">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-500/5 -z-10 hidden lg:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-rose-100 border border-rose-50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-200">
              <Heart className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500 text-sm">
              {mode === 'login' ? 'Enter your details to access your account' : 'Join our community of mothers and nurses'}
            </p>
          </div>

          {mode === 'register' && (
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
              <button
                onClick={() => setRole('mom')}
                className={cn(
                  "flex-1 py-2.5 text-sm font-bold rounded-xl transition-all",
                  role === 'mom' ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                I'm a Mother
              </button>
              <button
                onClick={() => setRole('nurse')}
                className={cn(
                  "flex-1 py-2.5 text-sm font-bold rounded-xl transition-all",
                  role === 'nurse' ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                I'm a Nurse
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 text-slate-900 placeholder-slate-400 transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-rose-600 hover:underline">Forgot Password?</button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center justify-center"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 px-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <Chrome className="w-5 h-5 text-slate-700 mr-2" />
                <span className="text-sm font-bold text-slate-700">Google</span>
              </button>
              <button className="flex items-center justify-center py-3 px-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <Github className="w-5 h-5 text-slate-700 mr-2" />
                <span className="text-sm font-bold text-slate-700">GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => onSwitch(mode === 'login' ? 'register' : 'login')}
              className="ml-1 font-bold text-rose-600 hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
