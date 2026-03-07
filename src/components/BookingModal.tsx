import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Nurse, SERVICES } from '../types';
import { cn } from '../lib/utils';

interface BookingModalProps {
  nurse: Nurse | null;
  onClose: () => void;
  onConfirm: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ nurse, onClose, onConfirm }) => {
  const [step, setStep] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<number | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedService, setSelectedService] = React.useState(SERVICES[0].id);

  if (!nurse) return null;

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleConfirm = () => {
    onConfirm({
      nurseId: nurse.id,
      nurseName: nurse.name,
      nurseImage: nurse.image,
      serviceTitle: SERVICES.find(s => s.id === selectedService)?.title || '',
      date: days[selectedDate || 0].toLocaleDateString(),
      time: selectedTime,
      status: 'confirmed'
    });
    setStep(3);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={nurse.image} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-slate-900">{nurse.name}</h3>
                <p className="text-xs text-rose-600 font-medium">{nurse.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h4 className="text-xl font-bold text-slate-900 mb-6">Select Service & Schedule</h4>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Service Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            "p-3 rounded-xl border text-left transition-all",
                            selectedService === service.id
                              ? "border-rose-500 bg-rose-50 text-rose-600"
                              : "border-slate-200 hover:border-rose-200"
                          )}
                        >
                          <p className="text-sm font-bold">{service.title}</p>
                          <p className="text-xs opacity-70">${service.price}/{service.unit}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Select Date</label>
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                      {days.map((day, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(i)}
                          className={cn(
                            "flex-shrink-0 w-16 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all",
                            selectedDate === i
                              ? "border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-200"
                              : "border-slate-200 hover:border-rose-200"
                          )}
                        >
                          <span className="text-[10px] uppercase font-bold opacity-70">
                            {day.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-xl font-bold">{day.getDate()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Available Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 rounded-lg border text-xs font-bold transition-all",
                            selectedTime === time
                              ? "border-rose-500 bg-rose-50 text-rose-600"
                              : "border-slate-200 hover:border-rose-200"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    disabled={selectedDate === null || selectedTime === null}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-200"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button onClick={() => setStep(1)} className="flex items-center text-sm font-bold text-slate-500 mb-6 hover:text-rose-600">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <h4 className="text-xl font-bold text-slate-900 mb-6">Confirm & Pay</h4>

                <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Service</span>
                    <span className="font-bold text-slate-900">{SERVICES.find(s => s.id === selectedService)?.title}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Date & Time</span>
                    <span className="font-bold text-slate-900">
                      {days[selectedDate || 0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-500">Nurse</span>
                    <span className="font-bold text-slate-900">{nurse.name}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-4" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-rose-600">${SERVICES.find(s => s.id === selectedService)?.price}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-rose-500 bg-rose-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 text-rose-600 mr-4" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                        <p className="text-xs text-slate-500">Expires 12/26</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-rose-600">Change</button>
                  </div>

                  <div className="flex items-start p-4 bg-blue-50 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Your payment is protected by CareMom Guarantee. Funds are only released to the nurse after the session is completed.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
                <p className="text-slate-500 mb-8">
                  Your session with {nurse.name} has been scheduled. You'll receive a confirmation email shortly.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
