import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/40 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold mb-5">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              Đã được 5.000+ mẹ bỉm tin tưởng
            </div>
            <h1 className="text-4xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.15] mb-5 tracking-tight">
              Dịch vụ chăm sóc
              <br />
              <span className="text-brand-500">Mẹ & Bé</span> tại nhà
            </h1>
            <p className="text-base text-gray-500 mb-8 max-w-md leading-relaxed">
              Kết nối với điều dưỡng có chứng chỉ cho dịch vụ hậu sản, chăm sóc sơ sinh và tư vấn sữa mẹ — trực tiếp tại nhà bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-500 text-white rounded-lg font-semibold text-sm hover:bg-brand-600 transition-colors shadow-sm"
              >
                <Search className="mr-2 w-4 h-4" />
                Tìm điều dưỡng
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors">
                Tìm hiểu thêm
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/80?img=${i + 10}`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="border-l border-gray-200 pl-4">
                <div className="flex items-center text-amber-500 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">4.9/5 · 1.200+ đánh giá</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1200&auto=format&fit=crop"
                alt="Chăm sóc Mẹ và Bé"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating verification badge */}
            <div className="absolute -top-3 -right-3 bg-white p-3 rounded-xl shadow-lg z-20 hidden sm:flex items-center gap-2.5 border border-gray-100">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-green-600 w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Đã xác minh</p>
                <p className="text-xs font-semibold text-gray-800">Sarah Jenkins, RN</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
