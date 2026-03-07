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
      className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-6 relative group hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onClick(nurse)}
    >
      {/* Wishlist */}
      <button
        className="absolute top-5 right-5 transition-colors z-10"
        onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
        aria-label="Wishlist"
      >
        <Heart
          className={`w-5 h-5 transition-all ${wishlisted ? 'text-rose-400 fill-rose-400 scale-110' : 'text-gray-200 hover:text-pink-300'}`}
        />
      </button>

      {/* ── Left: Photo + Quick Stats ── */}
      <div className="flex flex-col items-center gap-2.5 shrink-0">
        <div className="relative">
          <img
            src={nurse.image}
            alt={nurse.name}
            referrerPolicy="no-referrer"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-50 ring-2 ring-pink-100/50"
          />
          {nurse.verified && (
            <div className="absolute -top-1 -left-1 bg-white shadow rounded-full px-2 py-0.5 flex items-center gap-1 border border-green-100">
              <ShieldCheck className="w-3 h-3 text-green-500" />
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-wide">Verified</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-bold text-gray-800 text-sm">{nurse.rating.toFixed(1)}</span>
          <span className="text-gray-400 text-xs">({nurse.reviewsCount})</span>
        </div>

        {/* Rate */}
        <div className="text-sm font-bold text-pink-400">${nurse.hourlyRate}/hr</div>
      </div>

      {/* ── Right: Details ── */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-800 pr-8 leading-snug">{nurse.name}</h3>
        <p className="text-sm font-semibold text-pink-300 mb-1">{nurse.title}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {nurse.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-xl text-xs font-medium text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {nurse.experience} yrs exp.
          </div>
          {nurse.certifications.slice(0, 2).map(cert => (
            <div key={cert} className="px-3 py-1 bg-gray-50 rounded-xl text-xs font-medium text-gray-500">
              {cert}
            </div>
          ))}
          {nurse.certifications.length > 2 && (
            <div className="px-3 py-1 bg-pink-50 rounded-xl text-xs font-medium text-rose-400">
              +{nurse.certifications.length - 2} more
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Next Available</span>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{nurse.nextAvailable}</p>
          </div>
          <button
            className="px-7 py-2.5 bg-pink-100 text-rose-500 font-bold rounded-2xl hover:bg-rose-400 hover:text-white transition-all duration-200 shadow-sm active:scale-95 text-sm group-hover:shadow-md group-hover:shadow-rose-100"
            onClick={e => { e.stopPropagation(); onClick(nurse); }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
