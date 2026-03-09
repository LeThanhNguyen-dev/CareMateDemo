import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Star,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Baby,
  X,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { NurseCard } from '../components/NurseCard';
import { NURSES, SERVICES, Nurse } from '../types';
import { VIETNAM_PROVINCES } from '../constants/locations';

interface NurseSearchProps {
  onSelectNurse: (nurse: Nurse) => void;
  initialService?: string | null;
  onBackToServices?: () => void;
}

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Đề xuất' },
  { value: 'price-low', label: 'Giá: Thấp → Cao' },
  { value: 'price-high', label: 'Giá: Cao → Thấp' },
  { value: 'rating', label: 'Đánh Giá Cao' },
] as const;

const EXPERIENCE_OPTIONS = [
  { label: '1–3 Năm', min: 1, max: 3 },
  { label: '3–5 Năm', min: 3, max: 5 },
  { label: '5–10 Năm', min: 5, max: 10 },
  { label: 'Hơn 10 Năm', min: 10, max: 99 },
];

export const NurseSearch: React.FC<NurseSearchProps> = ({
  onSelectNurse,
  initialService,
  onBackToServices,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [sortOpen, setSortOpen] = React.useState(false);
  const [minRating, setMinRating] = React.useState<number | null>(null);
  const [expFilter, setExpFilter] = React.useState<string | null>(null);
  const [locationFilter, setLocationFilter] = React.useState<string | null>(null);
  const [locationSearch, setLocationSearch] = React.useState('');
  const [serviceFilter, setServiceFilter] = React.useState<string | null>(initialService || null);
  const [maxRate, setMaxRate] = React.useState(100);

  const selectedService = initialService ? SERVICES.find(s => s.id === initialService) : null;

  const filteredNurses = React.useMemo(() => {
    let list = NURSES.filter(nurse => {
      const matchesSearch =
        nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesService = !serviceFilter || nurse.services.includes(serviceFilter);
      const matchesRating = minRating === null || nurse.rating >= minRating;
      const matchesRate = nurse.hourlyRate <= maxRate;
      const matchesLocation = !locationFilter || nurse.location === locationFilter;
      let matchesExp = true;
      if (expFilter) {
        const opt = EXPERIENCE_OPTIONS.find(o => o.label === expFilter);
        if (opt) matchesExp = nurse.experience >= opt.min && nurse.experience < opt.max;
      }
      return matchesSearch && matchesService && matchesRating && matchesExp && matchesRate && matchesLocation;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
    return list;
  }, [searchQuery, sortBy, minRating, expFilter, maxRate, serviceFilter, locationFilter]);

  const hasActiveFilters = minRating !== null || expFilter !== null || maxRate < 100 || locationFilter !== null || (serviceFilter !== null && serviceFilter !== initialService);
  const clearFilters = () => { setMinRating(null); setExpFilter(null); setMaxRate(100); setLocationFilter(null); setServiceFilter(initialService || null); };
  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Đề xuất';

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-600" />
                  <h2 className="text-sm font-semibold text-gray-800">Bộ Lọc</h2>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-0.5">
                    <X className="w-3 h-3" /> Xóa
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 text-xs flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Đánh Giá
                </h4>
                <div className="space-y-2">
                  {[null, 4.5, 4.0, 3.5].map((rate) => (
                    <label key={String(rate)} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setMinRating(rate)}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${minRating === rate ? 'border-brand-500' : 'border-gray-200 group-hover:border-brand-200'}`}>
                        {minRating === rate && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                      </div>
                      <span className="text-sm text-gray-600">{rate === null ? 'Tất cả' : `${rate}+ ★`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" /> Địa Điểm
                </h4>
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm tỉnh thành..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 transition-all"
                  />
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setLocationFilter(null)}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${locationFilter === null ? 'border-brand-500' : 'border-gray-200 group-hover:border-brand-200'}`}>
                      {locationFilter === null && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Tất cả</span>
                  </label>
                  {VIETNAM_PROVINCES.filter(loc => loc.toLowerCase().includes(locationSearch.toLowerCase())).map((loc) => (
                    <label key={loc} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setLocationFilter(loc)}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${locationFilter === loc ? 'border-brand-500' : 'border-gray-200 group-hover:border-brand-200'}`}>
                        {locationFilter === loc && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                      </div>
                      <span className="text-sm text-gray-600">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 text-xs">Kinh Nghiệm</h4>
                <div className="space-y-2">
                  {[null, ...EXPERIENCE_OPTIONS.map(o => o.label)].map(opt => (
                    <label key={String(opt)} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setExpFilter(opt ?? null)}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${expFilter === (opt ?? null) ? 'border-brand-500' : 'border-gray-200 group-hover:border-brand-200'}`}>
                        {expFilter === (opt ?? null) && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                      </div>
                      <span className="text-sm text-gray-600">{opt === null ? 'Tất cả' : opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Service */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 text-xs flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-brand-600" /> Dịch Vụ
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {[null, ...SERVICES.map(s => ({ id: s.id, title: s.title }))].map((svc) => (
                    <label key={svc === null ? 'all' : svc.id} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setServiceFilter(svc === null ? null : svc.id)}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${serviceFilter === (svc === null ? null : svc.id) ? 'border-brand-500' : 'border-gray-200 group-hover:border-brand-200'}`}>
                        {serviceFilter === (svc === null ? null : svc.id) && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                      </div>
                      <span className="text-sm text-gray-600 line-clamp-1">{svc === null ? 'Tất cả dịch vụ' : svc.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rate Range */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 text-xs">Giá Tối Đa</h4>
                <input type="range" min={30} max={100} value={maxRate} onChange={e => setMaxRate(Number(e.target.value))} className="w-full accent-brand-600 h-1 rounded-full cursor-pointer" />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>$30</span>
                  <span className="text-brand-600 font-medium">${maxRate}/hr</span>
                  <span>$100</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-brand-600 rounded-xl p-5 text-white">
              <h4 className="font-semibold text-sm mb-1">Cần hỗ trợ?</h4>
              <p className="text-brand-200 text-xs leading-relaxed mb-3">Chuyên viên sẽ giúp bạn chọn điều dưỡng phù hợp — miễn phí.</p>
              <button className="w-full py-2 bg-white text-brand-700 rounded-lg text-sm font-semibold hover:bg-brand-50 transition-colors active:scale-[0.97]">Liên Hệ</button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mb-6">
            {selectedService && onBackToServices && (
              <button onClick={onBackToServices} className="flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 mb-2 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Về Dịch Vụ
              </button>
            )}

            <div className="flex items-center text-xs text-gray-400 mb-3 gap-1">
              <span className="hover:text-brand-600 cursor-pointer" onClick={onBackToServices}>Dịch Vụ</span>
              {selectedService && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="hover:text-brand-600 cursor-pointer" onClick={onBackToServices}>{selectedService.title}</span>
                </>
              )}
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-gray-600">Điều Dưỡng</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {selectedService ? <>Điều Dưỡng <span className="text-brand-600">{selectedService.title}</span></> : 'Điều Dưỡng Chuyên Gia'}
                </h1>
                <p className="text-gray-400 text-sm">
                  <span className="font-medium text-gray-600">{filteredNurses.length}</span> chuyên gia sẵn sàng
                  {selectedService && <> · Từ <span className="text-brand-600 font-medium">${selectedService.price}</span>/{selectedService.unit}</>}
                </p>
              </div>

              {/* Sort */}
              <div className="relative">
                <button onClick={() => setSortOpen(o => !o)} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm cursor-pointer hover:border-brand-200 transition-colors">
                  <span className="text-gray-400">Sắp xếp:</span>
                  <span className="font-medium text-gray-700">{currentSortLabel}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.1 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[180px]">
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input type="text" placeholder="Tìm kiếm tên, chuyên môn…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 transition-all" />
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {filteredNurses.length > 0 ? (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {filteredNurses.map((nurse, index) => (
                  <motion.div key={nurse.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}>
                    <NurseCard nurse={nurse} onClick={onSelectNurse} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-200">
                <Baby className="w-10 h-10 mx-auto mb-3 text-brand-400" />
                <h3 className="text-base font-semibold text-gray-700 mb-1">Không tìm thấy</h3>
                <p className="text-gray-400 text-sm mb-5">Thử thay đổi bộ lọc hoặc từ khóa.</p>
                <button onClick={() => { setSearchQuery(''); clearFilters(); }}
                  className="px-5 py-2 bg-brand-50 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors">
                  Xóa bộ lọc
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredNurses.length > 0 && (
            <div className="flex justify-center mt-10 gap-1.5">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-brand-200 transition-colors text-sm">‹</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-50 text-brand-700 font-medium border border-brand-100 text-sm">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm">2</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-brand-200 transition-colors text-sm">›</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
