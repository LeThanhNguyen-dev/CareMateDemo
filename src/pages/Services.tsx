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
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'postpartum', label: 'Postpartum', icon: Heart },
    { id: 'newborn', label: 'Newborn', icon: Baby },
    { id: 'lactation', label: 'Lactation', icon: Stethoscope },
    { id: 'night', label: 'Night Care', icon: Moon },
    { id: 'prenatal', label: 'Prenatal', icon: Brain },
    { id: 'nicu', label: 'NICU & Special', icon: ShieldCheck },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'wellness', label: 'Wellness', icon: Apple },
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
        <div className="min-h-screen bg-[#FFF6F9] pt-20 pb-24">

            {/* ─── Hero ─── */}
            <motion.header
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                    Maternal Care <span className="text-rose-400">Services</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                    Find the best postnatal and newborn care services tailored for you and your baby's comfort and health.
                </p>
            </motion.header>

            {/* ─── Search + Filter Bar ─── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8"
            >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search services…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-5 py-3 rounded-full bg-white border border-pink-100 shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                        />
                    </div>

                    {/* Category chips – horizontally scrollable */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1 flex-1">
                        <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                        {CATEGORIES.map(cat => {
                            const isActive = activeCategory === cat.id;
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                                        isActive
                                            ? 'bg-rose-400 text-white shadow-md shadow-rose-200'
                                            : 'bg-white border border-pink-100 text-gray-500 hover:border-rose-200 hover:text-rose-500'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* ─── Service Grid ─── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <AnimatePresence mode="wait">
                    {filteredServices.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-24 text-gray-400"
                        >
                            <Baby className="w-12 h-12 mx-auto mb-4 text-pink-200" />
                            <p className="text-lg font-semibold text-gray-500">No services found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredServices.map((service, index) => {
                                const nurseCount = getNurseCount(service.id);
                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
                                        whileHover={{ y: -6 }}
                                        onClick={() => onSelectService(service.id)}
                                        className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                                    >
                                        {/* Image */}
                                        <div className="h-56 overflow-hidden bg-pink-50 shrink-0 relative">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                referrerPolicy="no-referrer"
                                            />
                                            {/* Category badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/80 backdrop-blur-sm text-rose-500 text-[11px] font-bold px-3 py-1 rounded-full border border-pink-100 capitalize">
                                                    {getCategoryForService(service.id)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-7 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                                {service.description}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                                                <div className="flex flex-col">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-xl font-bold text-gray-900">${service.price}</span>
                                                        <span className="text-gray-400 text-xs italic">/ {service.unit}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                                                        <Users className="w-3 h-3" />
                                                        <span>{nurseCount} nurse{nurseCount !== 1 ? 's' : ''} available</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="flex items-center gap-1.5 px-5 py-2.5 bg-pink-100 text-rose-500 text-sm font-bold rounded-full hover:bg-rose-400 hover:text-white active:scale-95 transition-all duration-200 group-hover:shadow-md group-hover:shadow-rose-100"
                                                    onClick={e => { e.stopPropagation(); onSelectService(service.id); }}
                                                >
                                                    View Nurses
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

            {/* ─── Bottom CTA ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-4xl mx-auto px-4 sm:px-8 mt-20"
            >
                <div className="bg-gradient-to-br from-rose-400 to-pink-400 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Not sure which service fits?</h2>
                        <p className="text-rose-100 max-w-sm text-sm leading-relaxed">
                            Our care coordinators can assess your needs and recommend the right level of support — completely free.
                        </p>
                    </div>
                    <button className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-500 rounded-full font-bold hover:bg-rose-50 active:scale-95 transition-all shadow-lg whitespace-nowrap">
                        Talk to a Coordinator
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
