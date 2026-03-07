import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => onClick(service)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-rose-600">${service.price}</span>
            <span className="text-xs text-slate-400">/{service.unit}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
