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
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Dịch vụ <span className="text-brand-600">Mẹ & Bé</span>
                    </h1>
                    <p className="text-gray-500 text-base max-w-2xl">
                        Tìm dịch vụ chăm sóc sau sinh và trẻ sơ sinh tốt nhất, thiết kế riêng cho bạn và bé. Hãy chọn chuyên mục phù hợp để bắt đầu.
                    </p>
                </motion.div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="lg:w-72 shrink-0"
                    >
                        <div className="sticky top-28 space-y-10">
                            {/* Search Section */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Search className="w-4 h-4 text-brand-600" />
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Tìm kiếm</h3>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tên dịch vụ..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-gray-50 border-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:bg-white focus:border-brand-200 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Categories Section */}
                            <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Chuyên mục</h3>
                                    </div>
                                    {activeCategory !== 'all' && (
                                        <button
                                            onClick={() => setActiveCategory('all')}
                                            className="text-[10px] font-bold text-brand-600 hover:text-brand-700 uppercase"
                                        >
                                            Đặt lại
                                        </button>
                                    )}
                                </div>
                                <div className="p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide">
                                    {CATEGORIES.map(cat => {
                                        const isActive = activeCategory === cat.id;
                                        const Icon = cat.icon;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setActiveCategory(cat.id)}
                                                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 lg:w-full ${isActive
                                                    ? 'bg-brand-50 text-brand-700'
                                                    : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-brand-600'
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-100 group-hover:text-brand-600'}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="flex-1 text-left">{cat.label}</span>
                                                {isActive && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quality Badge */}
                            <div className="relative group overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 text-white shadow-lg shadow-brand-100">
                                <Sparkles className="absolute -right-2 -top-2 w-20 h-20 text-white/10 rotate-12" />
                                <h4 className="font-bold text-sm mb-2 relative z-10">Dịch vụ chuẩn 5 sao</h4>
                                <p className="text-brand-100 text-xs leading-relaxed relative z-10 opacity-90">
                                    Tất cả điều dưỡng đều phải vượt qua quy trình kiểm tra năng lực khắt khe trước khi gia nhập hệ thống.
                                </p>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content (Grid) */}
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            {filteredServices.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200"
                                >
                                    <Baby className="w-12 h-12 mx-auto mb-4 text-brand-300" />
                                    <p className="text-lg font-bold text-gray-900">Không tìm thấy dịch vụ nào</p>
                                    <p className="text-gray-500 mt-1 max-w-xs mx-auto">Thử thay đổi bộ lọc hoặc từ khóa để tìm thấy dịch vụ phù hợp nhất.</p>
                                    <button
                                        onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                                        className="mt-6 text-brand-600 font-semibold text-sm hover:underline"
                                    >
                                        Xóa tất cả bộ lọc
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeCategory + searchQuery}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
                                >
                                    {filteredServices.map((service, index) => {
                                        const nurseCount = getNurseCount(service.id);
                                        return (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                                                whileHover={{ y: -5 }}
                                                onClick={() => onSelectService(service.id)}
                                                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-300 flex flex-col cursor-pointer"
                                            >
                                                <div className="h-52 overflow-hidden bg-gray-100 shrink-0 relative">
                                                    <img
                                                        src={service.image}
                                                        alt={service.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-white/95 backdrop-blur-md text-brand-700 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-brand-100/50 shadow-sm capitalize">
                                                            {getCategoryForService(service.id)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">
                                                        {service.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                                                        {service.description}
                                                    </p>

                                                    <div className="flex items-end justify-between pt-5 border-t border-gray-50">
                                                        <div>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-2xl font-black text-gray-900">${service.price}</span>
                                                                <span className="text-gray-400 text-xs font-medium">/{service.unit}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-brand-600 font-medium px-2 py-0.5 bg-brand-50 rounded-full w-fit">
                                                                <Users className="w-3 h-3" />
                                                                <span>{nurseCount} chuyên viên</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 shadow-md shadow-brand-100 active:scale-[0.95] transition-all duration-200"
                                                            onClick={e => { e.stopPropagation(); onSelectService(service.id); }}
                                                        >
                                                            Chi tiết
                                                            <ArrowRight className="w-4 h-4" />
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
                </div>
            </div>

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
