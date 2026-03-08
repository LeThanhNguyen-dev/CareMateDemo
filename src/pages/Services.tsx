import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, NURSES } from '../types';
import {
    Search,
    Users,
    ArrowRight,
    Heart,
    Baby,
    Moon,
    Stethoscope,
    Brain,
    Apple,
    Sparkles,
    ShieldCheck,
    SlidersHorizontal,
} from 'lucide-react';

interface ServicesProps {
    onSelectService: (serviceId: string) => void;
}

const CATEGORIES = [
    { id: 'all', label: 'Tất cả', icon: Sparkles },
    { id: 'postpartum', label: 'Hậu Sản', icon: Heart },
    { id: 'newborn', label: 'Sơ Sinh', icon: Baby },
    { id: 'lactation', label: 'Sữa Mẹ', icon: Stethoscope },
    { id: 'night', label: 'Ca Đêm', icon: Moon },
    { id: 'prenatal', label: 'Tiền Sản', icon: Brain },
    { id: 'nicu', label: 'NICU', icon: ShieldCheck },
    { id: 'sleep', label: 'Giấc Ngủ', icon: Moon },
    { id: 'wellness', label: 'Sức Khỏe', icon: Apple },
];

function getCategoryForService(serviceId: string): string {
    if (serviceId.startsWith('postpartum')) return 'postpartum';
    if (serviceId.startsWith('newborn') || serviceId === 'newborn-twins') return 'newborn';
    if (serviceId.startsWith('lactation')) return 'lactation';
    if (serviceId.startsWith('night')) return 'night';
    if (serviceId.startsWith('prenatal') || serviceId === 'birth-doula') return 'prenatal';
    if (serviceId.startsWith('nicu') || serviceId === 'preemie-care' || serviceId === 'special-needs') return 'nicu';
    if (serviceId.startsWith('sleep')) return 'sleep';
    return 'wellness';
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
    const [activeCategory, setActiveCategory] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredServices = React.useMemo(() => {
        let list = activeCategory === 'all'
            ? SERVICES
            : SERVICES.filter(s => getCategoryForService(s.id) === activeCategory);

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(s =>
                s.title.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q)
            );
        }
        return list;
    }, [activeCategory, searchQuery]);

    const getNurseCount = (serviceId: string) =>
        NURSES.filter(n => n.services.includes(serviceId)).length;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Dịch vụ <span className="text-brand-600">Mẹ & Bé</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-xl">
                    Tìm dịch vụ chăm sóc sau sinh và trẻ sơ sinh tốt nhất, thiết kế riêng cho bạn và bé.
                </p>
            </motion.header>

            {/* Search + Filters */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"
            >
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm dịch vụ…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mb-1 flex-1">
                        {CATEGORIES.map(cat => {
                            const isActive = activeCategory === cat.id;
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all shrink-0 ${isActive
                                        ? 'bg-brand-600 text-white'
                                        : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-200 hover:text-brand-600'
                                        }`}
                                >
                                    <Icon className="w-3 h-3" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Grid */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {filteredServices.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20 text-gray-400"
                        >
                            <Baby className="w-10 h-10 mx-auto mb-3 text-brand-400" />
                            <p className="text-base font-medium text-gray-500">Không tìm thấy dịch vụ nào</p>
                            <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {filteredServices.map((service, index) => {
                                const nurseCount = getNurseCount(service.id);
                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                                        whileHover={{ y: -3 }}
                                        onClick={() => onSelectService(service.id)}
                                        className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                                    >
                                        <div className="h-48 overflow-hidden bg-gray-100 shrink-0 relative">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-white/90 backdrop-blur-sm text-brand-700 text-[10px] font-semibold px-2 py-1 rounded-md border border-brand-100 capitalize">
                                                    {getCategoryForService(service.id)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow line-clamp-2">
                                                {service.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                <div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-lg font-bold text-gray-900">${service.price}</span>
                                                        <span className="text-gray-400 text-xs">/ {service.unit}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                                                        <Users className="w-3 h-3" />
                                                        <span>{nurseCount} điều dưỡng</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="flex items-center gap-1 px-4 py-2 bg-brand-50 text-brand-600 text-sm font-semibold rounded-lg hover:bg-brand-600 hover:text-white active:scale-[0.97] transition-all duration-200"
                                                    onClick={e => { e.stopPropagation(); onSelectService(service.id); }}
                                                >
                                                    Xem
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="max-w-3xl mx-auto px-4 sm:px-6 mt-16"
            >
                <div className="bg-brand-600 rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5">
                    <div>
                        <h2 className="text-xl font-bold mb-1.5">Không biết chọn dịch vụ nào?</h2>
                        <p className="text-brand-200 text-sm max-w-sm">
                            Chuyên viên sẽ tư vấn miễn phí dựa trên nhu cầu của mẹ và bé.
                        </p>
                    </div>
                    <button className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 rounded-lg font-semibold text-sm hover:bg-brand-50 active:scale-[0.97] transition-all">
                        Liên hệ tư vấn
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
