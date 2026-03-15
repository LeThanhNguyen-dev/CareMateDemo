import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Newspaper, Lightbulb, Heart, Clock, 
  User, MessageCircle, Flame, ArrowUpRight, 
  Bookmark, Share2, TrendingUp 
} from 'lucide-react';
import { cn } from '../lib/utils';

type Category = 'all' | 'experience' | 'tips' | 'sharing' | 'news';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  likes: number;
  comments: number;
  tags: string[];
  isTrending?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'GenZ làm mẹ: Vượt qua tháng đầu tiên không "mất não" 🧠✨',
    excerpt: 'Lần đầu làm mẹ có thể khiến bạn hoang mang, nhưng với bí kíp sống sót này, tháng đầu tiên sẽ nhẹ nhàng hơn rất nhiều. Cùng khám phá cách cân bằng giữa việc thức đêm và yêu thương bản thân.',
    category: 'experience',
    author: 'Khánh Vy',
    date: '15/03/2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
    likes: 1245,
    comments: 342,
    tags: ['Làm mẹ lần đầu', 'Sức khỏe tinh thần'],
    isTrending: true
  },
  {
    id: '2',
    title: '5 Bí quyết "hack" dáng sau sinh cực mượt',
    excerpt: 'Lấy lại vóc dáng không khó như lời nguyền. Các bài tập nhẹ nhàng và chế độ eat-clean giúp mẹ lấy lại tự tin chỉ sau 3 tháng.',
    category: 'tips',
    author: 'HLV Thu Trà',
    date: '14/03/2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1555243896-771a812328ba?auto=format&fit=crop&q=80&w=800',
    likes: 890,
    comments: 156,
    tags: ['Fitness', 'Giảm cân']
  },
  {
    id: '3',
    title: 'Chuyện đi đẻ không giống trên phim như nào?',
    excerpt: 'Review chi tiết hành trình "đi biển một mình" cười ra nước mắt của một bà mẹ Gen Y. Không phải lúc nào cũng gào thét đâu các mom ơi!',
    category: 'sharing',
    author: 'Mẹ Bơ',
    date: '12/03/2026',
    readTime: '8 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    likes: 2100,
    comments: 543,
    tags: ['Review', 'Vượt cạn'],
    isTrending: true
  },
  {
    id: '4',
    title: 'HOT: App CareMate ra mắt tính năng đặt lịch khám',
    excerpt: 'Chỉ với 3 chạm, mẹ bỉm đã có thể đặt lịch bác sĩ ngay trên ứng dụng không cần chờ đợi. Xem ngay hướng dẫn!',
    category: 'news',
    author: 'CareMate Tech',
    date: '10/03/2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    likes: 456,
    comments: 89,
    tags: ['Cập nhật', 'Công nghệ']
  },
  {
    id: '5',
    title: 'Nhận biết "Baby Blues" vs Trầm cảm sau sinh',
    excerpt: 'Đừng nhầm lẫn giữa hai trạng thái này! Cẩm nang giúp người thân và chính người mẹ nhận biết dấu hiệu quá tải tâm lý.',
    category: 'experience',
    author: 'Ths. Tâm lý Trần Quân',
    date: '08/03/2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&q=80&w=800',
    likes: 3450,
    comments: 890,
    tags: ['Tâm lý', 'Sức khỏe'],
    isTrending: true
  },
  {
    id: '6',
    title: 'Ăn dặm tự chỉ huy (BLW): Bắt đầu từ đâu?',
    excerpt: 'Để con tự bốc ăn không phải là "cho ăn đại". Đây là cách thiết lập thực đơn chuẩn khoa học cho bé từ 6 tháng.',
    category: 'tips',
    author: 'Mẹ SuSu',
    date: '05/03/2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=800',
    likes: 1230,
    comments: 420,
    tags: ['Ăn dặm', 'Dinh dưỡng']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Tất cả siêu hot', icon: Flame, color: 'text-brand-500', shadow: 'shadow-brand-500/20' },
  { id: 'experience', label: 'Kinh nghiệm xương máu', icon: BookOpen, color: 'text-brand-500', shadow: 'shadow-brand-500/20' },
  { id: 'tips', label: 'Bí kíp thả tim', icon: Lightbulb, color: 'text-brand-500', shadow: 'shadow-brand-500/20' },
  { id: 'sharing', label: 'Chuyện chị em', icon: Heart, color: 'text-brand-500', shadow: 'shadow-brand-500/20' },
  { id: 'news', label: 'Hóng biến CareMate', icon: Newspaper, color: 'text-brand-500', shadow: 'shadow-brand-500/20' },
];

export const Community = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredArticles = ARTICLES.filter(article => 
    activeCategory === 'all' ? true : article.category === activeCategory
  );

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-2xl text-brand-600 font-bold text-sm mb-6 shadow-sm border border-brand-100">
              <TrendingUp className="w-4 h-4" />
              <span>Chuyện nóng hổi hôm nay</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Khám phá không gian <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
                Sống chất & Làm mẹ vui
              </span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" />
                </div>
              ))}
            </div>
            <div className="px-3">
              <p className="text-sm font-bold text-slate-800">+12k Thành viên</p>
              <p className="text-xs text-slate-500 font-medium">Đang thảo luận sôi nổi</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Nav - Modern Filter Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sticky top-20 z-30 py-2">
        <div className="flex overflow-x-auto py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 hide-scrollbar gap-2 lg:gap-3 items-center md:justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap",
                  isActive
                    ? "bg-slate-900 text-white scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 hover:scale-105 hover:shadow-md"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? cat.color : "text-slate-400")} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => {
              // Create a bento grid pattern
              const isHero = activeCategory === 'all' && index === 0;
              const isTall = activeCategory === 'all' && (index === 1 || index === 2);
              const gridClass = isHero 
                ? "md:col-span-8 md:row-span-2" 
                : isTall 
                  ? "md:col-span-4 md:row-span-1" 
                  : "col-span-1 md:col-span-4 row-span-1";

              return (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "group relative bg-white rounded-[2rem] overflow-hidden cursor-pointer",
                    "border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500",
                    "hover:-translate-y-2 flex flex-col",
                    gridClass
                  )}
                >
                  {/* Image Container */}
                  <div className={cn(
                    "relative overflow-hidden w-full",
                    isHero ? "h-64 md:h-[100%] absolute inset-0" : "h-56 shrink-0"
                  )}>
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {isHero && <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />}
                  </div>

                  {/* Content Container */}
                  <div className={cn(
                    "relative flex-1 flex flex-col z-10",
                    isHero ? "p-6 md:p-10 justify-end h-[480px]" : "p-6 lg:p-7 bg-white"
                  )}>
                    {/* Tags & Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {article.isTrending && (
                        <span className="px-3 py-1 bg-red-500 text-white text-[11px] font-black rounded-xl uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-red-500/30">
                          <Flame className="w-3 h-3" /> HOT
                        </span>
                      )}
                      <span className={cn(
                        "px-3 py-1 text-[11px] font-bold rounded-xl",
                        isHero 
                          ? "bg-white/20 backdrop-blur-md text-white border border-white/30" 
                          : "bg-slate-100 text-slate-700"
                      )}>
                        {CATEGORIES.find(c => c.id === article.category)?.label.split(' ')[0]}
                      </span>
                      <span className={cn(
                        "text-[12px] font-medium flex items-center gap-1 ml-auto",
                        isHero ? "text-white/80" : "text-slate-400"
                      )}>
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                      "font-black leading-tight mb-3 group-hover:text-brand-500 transition-colors",
                      isHero ? "text-3xl md:text-5xl text-white drop-shadow-lg" : "text-2xl text-slate-900 line-clamp-2"
                    )}>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={cn(
                      "mb-6 flex-1",
                      isHero ? "text-white/90 text-lg line-clamp-2 md:line-clamp-3 md:max-w-2xl font-medium drop-shadow-md" : "text-slate-500 text-sm line-clamp-3 leading-relaxed"
                    )}>
                      {article.excerpt}
                    </p>

                    {/* Footer / Meta */}
                    <div className={cn(
                      "flex items-center justify-between pt-4 mt-auto border-t",
                      isHero ? "border-white/20" : "border-slate-100"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                           <img src={`https://i.pravatar.cc/150?u=${article.author}`} alt={article.author} className="w-full h-full object-cover"/>
                        </div>
                        <div>
                          <p className={cn("font-bold text-sm", isHero ? "text-white" : "text-slate-900")}>
                            {article.author}
                          </p>
                          <p className={cn("text-xs font-medium", isHero ? "text-white/60" : "text-slate-400")}>
                            {article.date}
                          </p>
                        </div>
                      </div>

                      {/* Social Actions */}
                      <div className="flex items-center gap-4">
                        <button className={cn(
                          "flex items-center gap-1.5 text-sm font-bold transition-colors hover:scale-110",
                          isHero ? "text-white hover:text-rose-400" : "text-slate-400 hover:text-rose-500"
                        )}>
                          <Heart className="w-5 h-5" />
                          <span className="hidden sm:inline">{article.likes}</span>
                        </button>
                        <button className={cn(
                          "flex items-center gap-1.5 text-sm font-bold transition-colors hover:scale-110",
                          isHero ? "text-white hover:text-blue-400" : "text-slate-400 hover:text-blue-500"
                        )}>
                          <MessageCircle className="w-5 h-5" />
                          <span className="hidden sm:inline">{article.comments}</span>
                        </button>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110",
                          isHero ? "hover:bg-white text-white hover:text-slate-900" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                        )}>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Newspaper className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Chưa có "biến" nào mới</h3>
              <p className="text-slate-500">Chờ một chút để CareMate cập nhật thêm nha.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="bg-brand-600 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-brand-500/20"
        >
          {/* Glass floating elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-[2rem] rotate-12" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 backdrop-blur-2xl rounded-[2rem] rotate-45" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 text-white text-xs font-black tracking-widest uppercase mb-6 backdrop-blur-md">
              Join The Club
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Kịp trend làm mẹ <br />
              <span className="text-white/80">Không bỏ lỡ deal hời</span>
            </h3>
            <p className="text-white/80 mb-10 text-lg md:text-xl font-medium">
              Nhận bản tin "ngon nghẻ" hàng tuần với các tips nuôi con nhàn tênh và ưu đãi độc quyền từ CareMate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Email của bạn là gì nè?" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 font-medium text-lg transition-all"
              />
              <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 whitespace-nowrap text-lg flex items-center justify-center gap-2">
                Đăng ký <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-6 text-white/50 text-sm font-medium">
              *Tụi mình cam kết không gửi spam nội dung nhảm nhí.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
