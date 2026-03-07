import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center mr-2">
                <Heart className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CareMom</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering mothers with professional, compassionate nursing care. We bridge the gap between hospital and home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-rose-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-rose-500 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Postpartum Care</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Newborn Massage</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Lactation Consulting</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Night Nanny</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-rose-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Our Nurses</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-rose-500" />
                +1 (555) 000-0000
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-rose-500" />
                support@caremom.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-rose-500" />
                123 Care St, Wellness City
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center text-xs">
          <p>© 2024 CareMom. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
