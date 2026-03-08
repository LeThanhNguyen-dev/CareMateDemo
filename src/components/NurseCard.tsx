import React from 'react';
import { Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Nurse } from '../types';

interface NurseCardProps {
  nurse: Nurse;
  onClick: (nurse: Nurse) => void;
}

export const NurseCard: React.FC<NurseCardProps> = ({ nurse, onClick }) => {
  const [wishlisted, setWishlisted] = React.useState(false);

  return (
    <div
      className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col sm:flex-row gap-5 relative group hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onClick(nurse)}
    >
      {/* Wishlist */}
      <button
        className="absolute top-4 right-4 transition-colors z-10"
        onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
        aria-label="Yêu thích"
      >
        <Heart
          className={`w-4 h-4 transition-all ${wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-300 hover:text-red-400'}`}
        />
      </button>

      {/* Left: Photo + Stats */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="relative">
          <img
            src={nurse.image}
            alt={nurse.name}
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-xl object-cover border border-gray-100"
          />
          {nurse.verified && (
            <div className="absolute -top-1.5 -right-1.5 bg-white shadow-sm rounded-md px-1.5 py-0.5 flex items-center gap-0.5 border border-green-200">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              <span className="text-[8px] font-semibold text-green-700">XÁC MINH</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-gray-800 text-sm">{nurse.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-xs">({nurse.reviewsCount})</span>
        </div>
        <div className="text-sm font-semibold text-brand-600">${nurse.hourlyRate}/giờ</div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 pr-6 leading-snug">{nurse.name}</h3>
        <p className="text-sm text-brand-600 mb-1">{nurse.title}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {nurse.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md text-xs text-gray-600 border border-gray-100">
            <Clock className="w-3 h-3 text-gray-400" />
            {nurse.experience} năm KN
          </div>
          {nurse.certifications.slice(0, 2).map(cert => (
            <div key={cert} className="px-2 py-1 bg-gray-50 rounded-md text-xs text-gray-600 border border-gray-100">
              {cert}
            </div>
          ))}
          {nurse.certifications.length > 2 && (
            <div className="px-2 py-1 bg-brand-50 rounded-md text-xs text-brand-700 border border-brand-100">
              +{nurse.certifications.length - 2}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Lịch trống</span>
            <p className="text-sm font-medium text-gray-700">{nurse.nextAvailable}</p>
          </div>
          <button
            className="px-5 py-2 bg-brand-600 text-white font-semibold rounded-lg text-sm hover:bg-brand-700 transition-colors active:scale-[0.97]"
            onClick={e => { e.stopPropagation(); onClick(nurse); }}
          >
            Đặt Lịch
          </button>
        </div>
      </div>
    </div>
  );
};
