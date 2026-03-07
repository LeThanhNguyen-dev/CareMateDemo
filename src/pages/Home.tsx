import React from 'react';
import {
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  Award,
  Heart,
  CheckCircle2,
  Star,
  Zap
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES, NURSES } from '../types';
import { NurseCard } from '../components/NurseCard';
import { cn } from '../lib/utils';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      <Hero onStart={() => onNavigate('services')} />

      {/* Stats Section */}
      <section className="py-12 bg-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Verified Nurses', value: '500+' },
              { label: 'Happy Mothers', value: '5,000+' },
              { label: 'Care Sessions', value: '12,000+' },
              { label: 'Avg Rating', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-rose-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Specialized Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We provide a wide range of nursing care services tailored to the unique needs of mothers and their newborns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => onNavigate('services')}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center text-rose-600 font-bold hover:text-rose-700 transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">How CareMom Works</h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Search & Filter',
                    desc: 'Find the perfect nurse based on specialization, experience, and availability.',
                    icon: Users,
                    color: 'bg-blue-100 text-blue-600'
                  },
                  {
                    title: 'Book a Session',
                    desc: 'Select a date and time that works for you. All bookings are secure and flexible.',
                    icon: Clock,
                    color: 'bg-rose-100 text-rose-600'
                  },
                  {
                    title: 'Receive Expert Care',
                    desc: 'Your certified nurse arrives at your home to provide professional care and support.',
                    icon: ShieldCheck,
                    color: 'bg-green-100 text-green-600'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", step.color)}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
                  alt="Nursing Care"
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl hidden lg:block max-w-xs">
                <div className="flex items-center space-x-2 text-rose-500 mb-4">
                  <Award className="w-6 h-6" />
                  <span className="font-bold">Quality Guaranteed</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  "The care I received from Sarah was life-changing. She helped me through those first tough weeks with my newborn."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <img src="https://i.pravatar.cc/100?img=32" className="w-8 h-8 rounded-full" />
                  <span className="text-xs font-bold text-slate-900">Jessica M., New Mom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CareMom Section */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The CareMom Standard</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We understand that the postpartum period is delicate. That's why we bring the highest standard of care directly to your door.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-rose-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compassionate Care</h3>
              <p className="text-sm text-slate-500">Every nurse is selected for their empathy and dedication to maternal health.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fully Vetted</h3>
              <p className="text-sm text-slate-500">Rigorous background checks and certification verification.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-amber-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Top Rated Network</h3>
              <p className="text-sm text-slate-500">Consistently achieving 5-star ratings from satisfied families.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Response</h3>
              <p className="text-sm text-slate-500">Quick booking and flexible scheduling for urgent care needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Nurses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Rated Nurses</h2>
              <p className="text-slate-500">Our most experienced and highly recommended professionals.</p>
            </div>
            <button
              onClick={() => onNavigate('nurses')}
              className="hidden md:flex items-center text-rose-600 font-bold hover:text-rose-700 transition-colors"
            >
              See All Nurses
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {NURSES.map((nurse) => (
              <NurseCard
                key={nurse.id}
                nurse={nurse}
                onClick={() => onNavigate('services')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to find your perfect care partner?</h2>
            <p className="text-lg text-slate-600 mb-10">
              Join thousands of mothers who trust CareMom for professional, compassionate home nursing care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
              >
                Get Started Today
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Join as a Nurse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
