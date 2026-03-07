import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Calendar,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  Play
} from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-rose-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Trusted by 5,000+ New Mothers
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
              Expert Care for <span className="text-rose-500">You & Your Baby</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Connect with certified, experienced nurses for postpartum support, newborn care, and lactation consulting in the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center justify-center"
              >
                <Search className="mr-2 w-5 h-5" />
                Find a Nurse Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center">
                <Play className="mr-2 w-4 h-4 fill-current" />
                How it Works
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center text-amber-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-medium">4.9/5 from 1,200+ reviews</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop"
                alt="Mother and Baby Care"
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Verified Nurse</p>
                  <p className="text-sm font-bold text-slate-900">Sarah Jenkins, RN</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Next Available</p>
                  <p className="text-sm font-bold text-slate-900">Today, 2:00 PM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
