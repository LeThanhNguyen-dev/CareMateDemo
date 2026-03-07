import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileText,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Camera,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import * as storage from '../lib/storage';

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = React.useState(1);

  const steps = [
    { id: 1, label: 'Basic Info', icon: User },
    { id: 2, label: 'Experience', icon: Award },
    { id: 3, label: 'Verification', icon: ShieldCheck },
    { id: 4, label: 'Finish', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  step >= s.id ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-white text-slate-300 border border-slate-200"
                )}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mt-2",
                  step >= s.id ? "text-rose-600" : "text-slate-400"
                )}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-rose-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-[40px] shadow-2xl shadow-rose-100 border border-rose-50"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
              <p className="text-slate-500 text-sm mb-8">This information will be displayed on your public profile.</p>

              <div className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-300">
                      <Camera className="w-8 h-8 text-slate-300" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Professional Title</label>
                    <input type="text" placeholder="e.g. Registered Nurse" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Specialization</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-500">
                      <option>Postpartum Care</option>
                      <option>Newborn Care</option>
                      <option>Lactation Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Bio</label>
                  <textarea rows={4} placeholder="Briefly describe your experience and approach to care..." className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-500" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Experience & Skills</h2>
              <p className="text-slate-500 text-sm mb-8">Highlight your professional background and certifications.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Years of Experience</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-rose-500" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Certifications</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['RN', 'LPN', 'IBCLC', 'CPR', 'First Aid', 'NICU'].map((cert) => (
                      <label key={cert} className="flex items-center p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors">
                        <input type="checkbox" className="rounded text-rose-500 border-slate-300 focus:ring-rose-500" />
                        <span className="ml-3 text-sm font-bold text-slate-700">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Documents</h2>
              <p className="text-slate-500 text-sm mb-8">Upload your nursing license and ID for verification.</p>

              <div className="space-y-4">
                {[
                  { label: 'Nursing License', desc: 'A clear photo or PDF of your current license.' },
                  { label: 'Government ID', desc: 'Passport or Driver\'s License.' },
                  { label: 'Background Check', desc: 'Optional: Upload a recent background check report.' }
                ].map((doc, i) => (
                  <div key={i} className="p-6 border-2 border-dashed border-slate-200 rounded-3xl hover:border-rose-300 transition-colors group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all mr-4">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{doc.label}</p>
                          <p className="text-xs text-slate-500">{doc.desc}</p>
                        </div>
                      </div>
                      <Upload className="w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Thank you for applying to join CareMom. Our team will review your documents and verify your credentials within 24-48 hours.
              </p>
              <div className="bg-rose-50 p-6 rounded-3xl mb-8 flex items-start text-left">
                <ShieldCheck className="w-6 h-6 text-rose-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-rose-900">What's next?</p>
                  <p className="text-xs text-rose-700 leading-relaxed mt-1">
                    Once verified, you'll receive an email to set up your availability and start receiving booking requests.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center px-6 py-3 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-10 py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center"
                >
                  {step === 3 ? 'Submit Application' : 'Continue'}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const currentUser = storage.getCurrentUser();
                    if (currentUser) {
                      storage.saveUser({
                        ...currentUser,
                        title: 'Nurse Practitioner', // Mocking saved data
                        specialization: ['Newborn Care'],
                        isVerified: true
                      });
                    }
                    onComplete();
                  }}
                  className="px-10 py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
