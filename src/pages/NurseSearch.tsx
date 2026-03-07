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
} from 'lucide-react';
import { NurseCard } from '../components/NurseCard';
import { NURSES, SERVICES, Nurse } from '../types';

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
  const [maxRate, setMaxRate] = React.useState(100);

  const selectedService = initialService ? SERVICES.find(s => s.id === initialService) : null;

  const filteredNurses = React.useMemo(() => {
    let list = NURSES.filter(nurse => {
      const matchesSearch =
        nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesService = !initialService || nurse.services.includes(initialService);
      const matchesRating = minRating === null || nurse.rating >= minRating;
      const matchesRate = nurse.hourlyRate <= maxRate;

      let matchesExp = true;
      if (expFilter) {
        const opt = EXPERIENCE_OPTIONS.find(o => o.label === expFilter);
        if (opt) matchesExp = nurse.experience >= opt.min && nurse.experience < opt.max;
      }

      return matchesSearch && matchesService && matchesRating && matchesExp && matchesRate;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return list;
  }, [searchQuery, sortBy, minRating, expFilter, maxRate, initialService]);

  const hasActiveFilters = minRating !== null || expFilter !== null || maxRate < 100;
  const clearFilters = () => {
    setMinRating(null);
    setExpFilter(null);
    setMaxRate(100);
  };

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Đề xuất';

  return (
    <div className="min-h-screen bg-[#FDFCFD] pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 flex gap-8">

        {/* ─── Sidebar ─── */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 space-y-5">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-pink-400" />
                  <h2 className="text-lg font-bold text-gray-800">Bộ Lọc</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-pink-400 hover:text-pink-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Xóa
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Đánh Giá
                </h4>
                <div className="space-y-3">
                  {[null, 4.5, 4.0, 3.5].map((rate) => (
                    <label
                      key={String(rate)}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setMinRating(rate)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${minRating === rate ? 'border-pink-300' : 'border-gray-200 group-hover:border-pink-200'}`}>
                        {minRating === rate && (
                          <div className="w-2.5 h-2.5 bg-pink-300 rounded-full" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {rate === null ? 'Mọi đánh giá' : `${rate}+ ★`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-700 mb-4 text-sm">Kinh Nghiệm</h4>
                <div className="space-y-3">
                  {[null, ...EXPERIENCE_OPTIONS.map(o => o.label)].map(opt => (
                    <label
                      key={String(opt)}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setExpFilter(opt ?? null)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${expFilter === (opt ?? null) ? 'border-pink-300' : 'border-gray-200 group-hover:border-pink-200'}`}>
                        {expFilter === (opt ?? null) && (
                          <div className="w-2.5 h-2.5 bg-pink-300 rounded-full" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {opt === null ? 'Mọi kinh nghiệm' : opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <h4 className="font-bold text-gray-700 mb-4 text-sm">Giá Hàng Giờ Tối Đa</h4>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={maxRate}
                  onChange={e => setMaxRate(Number(e.target.value))}
                  className="w-full accent-pink-300 h-1.5 rounded-full cursor-pointer"
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-gray-400">
                  <span>$30</span>
                  <span className="text-pink-400 text-sm">${maxRate}/hr</span>
                  <span>$100</span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-pink-300 to-pink-400 rounded-3xl p-6 text-white shadow-lg shadow-pink-100">
              <h4 className="font-bold mb-1.5">Cần chuyên viên tư vấn?</h4>
              <p className="text-pink-100 text-xs leading-relaxed mb-4">
                Chuyên viên của chúng tôi sẽ giúp bạn chọn điều dưỡng phù hợp nhất — miễn phí 100%.
              </p>
              <button className="w-full py-2.5 bg-white text-pink-400 rounded-2xl text-sm font-bold hover:bg-pink-50 transition-colors active:scale-95">
                Liên Hệ Hỗ Trợ
              </button>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb + Header */}
          <div className="mb-8">
            {selectedService && onBackToServices && (
              <button
                onClick={onBackToServices}
                className="flex items-center text-sm font-semibold text-pink-400 hover:text-pink-400 mb-3 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Về Dịch Vụ Mẹ & Bé
              </button>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center text-xs text-gray-400 mb-4 gap-1.5">
              <span
                className="hover:text-pink-400 cursor-pointer transition-colors"
                onClick={onBackToServices}
              >
                Dịch Vụ
              </span>
              {selectedService && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span
                    className="hover:text-pink-400 cursor-pointer transition-colors"
                    onClick={onBackToServices}
                  >
                    {selectedService.title}
                  </span>
                </>
              )}
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-gray-700">Điều Dưỡng Chuyên Gia</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-1">
                  {selectedService
                    ? <>Điều Dưỡng Cho <span className="text-pink-400">{selectedService.title}</span></>
                    : 'Các Điều Dưỡng Chuyên Gia'}
                </h1>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-gray-600">{filteredNurses.length}</span> chuyên gia sẵn sàng
                  {selectedService && <> · Từ <span className="text-pink-400 font-bold">${selectedService.price}</span>/{selectedService.unit}</>}
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(o => !o)}
                  className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 text-sm cursor-pointer hover:border-pink-100 transition-colors"
                >
                  <span className="text-gray-400">Sắp xếp:</span>
                  <span className="font-bold text-gray-700">{currentSortLabel}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 min-w-[200px]"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-5 py-3 text-sm transition-colors ${sortBy === opt.value ? 'bg-pink-50 text-pink-400 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm bằng tên, chuyên môn…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
            />
          </div>

          {/* Nurse List */}
          <AnimatePresence mode="wait">
            {filteredNurses.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {filteredNurses.map((nurse, index) => (
                  <motion.div
                    key={nurse.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.35) }}
                  >
                    <NurseCard nurse={nurse} onClick={onSelectNurse} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-16 text-center border border-dashed border-pink-100"
              >
                <Baby className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy điều dưỡng</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Bạn vui lòng thử lại với từ khóa khác nhé.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); clearFilters(); }}
                  className="px-6 py-2.5 bg-pink-50 text-pink-400 rounded-full text-sm font-bold hover:bg-pink-100 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {filteredNurses.length > 0 && (
            <div className="flex justify-center mt-12 gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:border-pink-100 transition-colors">
                ‹
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-pink-50 text-pink-400 font-bold border border-pink-100">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-400 hover:border-pink-100 transition-colors">
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
