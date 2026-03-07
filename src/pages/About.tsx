import React from 'react';
import {
  Heart,
  ShieldCheck,
  Award,
  Target,
  Eye,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Bridging the Gap in <span className="text-rose-500">Maternal Care</span></h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
              CareMom was founded with a simple mission: to ensure every mother has access to professional, compassionate nursing care in the comfort of her own home.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-rose-50 p-10 rounded-[40px] border border-rose-100">
            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To empower mothers during the critical postpartum period by providing expert nursing care, emotional support, and evidence-based guidance, fostering a healthy and confident start to motherhood.
            </p>
          </div>
          <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To become the global standard for home-based maternal and newborn care, creating a world where no mother feels alone or unsupported in her journey.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose CareMom?</h2>
            <p className="text-slate-500">We set the bar high for maternal and newborn care.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Certified Professionals',
                desc: 'Every nurse on our platform is fully certified, background-checked, and highly experienced.',
                icon: ShieldCheck,
                color: 'text-rose-600 bg-rose-100'
              },
              {
                title: 'Personalized Care',
                desc: 'We match you with nurses who specialize in exactly what you and your baby need.',
                icon: Heart,
                color: 'text-blue-600 bg-blue-100'
              },
              {
                title: 'Flexible Scheduling',
                desc: 'Book care when you need it—from one-hour consultations to overnight support.',
                icon: Award,
                color: 'text-amber-600 bg-amber-100'
              }
            ].map((item, i) => (
              <div key={i} className="text-center p-8">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6", item.color)}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Lead Nurses</h2>
            <p className="text-slate-500">The experts behind our care standards.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Elena Rossi', role: 'Chief Medical Officer', img: 'https://i.pravatar.cc/100?img=47' },
              { name: 'Sarah Jenkins, RN', role: 'Head of Nursing', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400&auto=format&fit=crop' },
              { name: 'Michael Chen, RN', role: 'NICU Advisor', img: 'https://i.pravatar.cc/100?img=11' },
              { name: 'Aisha Khan, IBCLC', role: 'Lactation Lead', img: 'https://i.pravatar.cc/100?img=32' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-rose-50 shadow-lg">
                  <img src={member.img} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-rose-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* New CTA Section */}
        <div className="mt-20 bg-slate-50 rounded-[40px] p-12 text-center border border-slate-100">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-slate-200 mb-6">
            <Users className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-bold text-slate-700">Join our growing community</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to experience the CareMom difference?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex items-center text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>Verified Professionals</span>
            </div>
            <div className="hidden sm:block text-slate-300">•</div>
            <div className="flex items-center text-slate-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center mx-auto">
            Find Your Care Partner
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
