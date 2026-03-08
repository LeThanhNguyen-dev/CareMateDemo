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
      whileHover={{ y: -3 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onClick(service)}
    >
      <div className="h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-1.5">{service.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${service.price}</span>
            <span className="text-xs text-gray-400 ml-1">/{service.unit}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
