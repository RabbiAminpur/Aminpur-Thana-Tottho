
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Clock, Newspaper, Bus, 
  LayoutDashboard, GraduationCap, Hospital, Stethoscope, 
  Shield, Building, Briefcase, Camera, Share2, Mic, 
  Flame, ShoppingCart, PlusCircle, Building2, Package,
  Info, User, Mail, Smartphone, ArrowRight, Lock, Globe,
  Edit, Trash2, Plus, Image as ImageIcon, Users, Settings, Save,
  Calendar, UserCheck, ChevronRight, Heart, Sparkles
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, StaffProfile, CustomField } from './types';

// Icons mapping for categories
const IconMap: any = {
  'graduation-cap': <GraduationCap size={24} />,
  'hospital': <Hospital size={24} />,
  'stethoscope': <Stethoscope size={24} />,
  'shield': <Shield size={24} />,
  'building': <Building size={24} />,
  'briefcase': <Briefcase size={24} />,
  'govt-building': <Building2 size={24} />,
  'courier': <Package size={24} />,
  'bus': <Bus size={24} />,
  'camera': <Camera size={24} />,
  'share-2': <Share2 size={24} />,
  'mic': <Mic size={24} />,
  'fire': <Flame size={24} />,
  'shopping-cart': <ShoppingCart size={24} />,
  'news': <Newspaper size={24} />,
  'plus-circle': <PlusCircle size={28} />,
};

// Storage Helpers
const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- ENHANCED BACKGROUND ANIMATION ---
const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-300/20 blur-[140px] rounded-full animate-blob-vibrant"></div>
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-violet-300/20 blur-[140px] rounded-full animate-blob-vibrant animation-delay-3000"></div>
      <div className="absolute bottom-[-15%] left-[10%] w-[70%] h-[70%] bg-amber-200/15 blur-[140px] rounded-full animate-blob-vibrant animation-delay-6000"></div>
      <div className="absolute top-[60%] left-[40%] w-[30%] h-[30%] bg-rose-200/20 blur-[100px] rounded-full animate-blob-vibrant"></div>
    </div>
  );
};

// --- LAYOUT ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  if (isAdminPath) return <div className="bg-[#f8fafc] min-h-screen">{children}</div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      
      {/* Header - Simple & Clean */}
      <header className="sticky top-0 z-50 bg-emerald-600/90 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-xl">
             <Sparkles className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">আমিনপুর থানা</h1>
        </Link>

        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/20 shadow-sm"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[4px] z-[60]" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Colorful Side Menu with Borders */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-2xl z-[70] shadow-2xl sidebar-transition transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} />
            <span className="font-bold text-lg tracking-tighter uppercase">প্রধান মেনু</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-6 space-y-4">
          {[
            { to: "/", icon: <LayoutDashboard size={20} />, label: "হোম পেজ", color: "border-emerald-100 bg-emerald-50/50 text-emerald-700" },
            { to: "/category/news", icon: <Newspaper size={20} />, label: "খবরাখবর", color: "border-rose-100 bg-rose-50/50 text-rose-700" },
            { to: "/about", icon: <Info size={20} />, label: "আমাদের সম্পর্কে", color: "border-blue-100 bg-blue-50/50 text-blue-700" },
            { to: "/contact", icon: <Mail size={20} />, label: "যোগাযোগ", color: "border-amber-100 bg-amber-50/50 text-amber-700" },
          ].map((item, idx) => (
            <Link 
              key={idx} 
              to={item.to} 
              className={`flex items-center gap-4 p-4 border rounded-2xl font-bold transition-all hover:scale-[1.03] shadow-sm ${item.color}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-slate-100">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-4 mb-3">জরুরী কন্টাক্ট</p>
             <a href="tel:999" className="flex items-center gap-4 p-4 bg-rose-600 text-white rounded-2xl font-black transition-all shadow-lg hover:bg-rose-700">
               <Shield size={20} />
               <span>৯৯৯ জাতীয় হেল্পলাইন</span>
             </a>
          </div>
        </nav>
      </aside>

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-6 md:py-10">
        {children}
      </main>

      {/* Minimalism Footer with Medium Text Size */}
      <footer className="py-10 mt-auto border-t border-slate-200/50 bg-white/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xl font-bold text-slate-800 tracking-tight opacity-90">মীর রাব্বি হোসেন</p>
          <div className="w-8 h-0.5 bg-emerald-500 mx-auto mt-2 rounded-full"></div>
        </div>
      </footer>
    </div>
  );
};

// --- VIEWS ---

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  
  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section: Welcome + Full Width Search with custom border color */}
      <section className="text-center py-8 space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">স্বাগতম!</h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full opacity-60"></div>
        </div>

        <div className="relative group max-w-4xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-700 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="আপনার প্রয়োজনীয় তথ্যটি এখানে খুঁজুন..." 
            className="w-full pl-14 pr-6 py-4 rounded-2xl glass-card shadow-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-lg border-2 border-emerald-500/40" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </section>

      {/* Stylish Category Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCategories.map(cat => (
          <Link 
            key={cat.id} 
            to={`/category/${cat.id}`} 
            className="flex flex-col items-center justify-center p-8 glass-card rounded-[3rem] shadow-lg hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2 transition-all group overflow-hidden border border-white/60"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/20 group-hover:rotate-12 group-hover:scale-110 transition-transform">
              {IconMap[cat.icon] || <PlusCircle size={32} />}
            </div>
            <span className="text-md font-black text-slate-800 text-center tracking-tight leading-none group-hover:text-emerald-700 transition-colors">{cat.title}</span>
          </Link>
        ))}
      </section>
      
      {filteredCategories.length === 0 && (
        <div className="py-20 text-center glass-card rounded-[4rem] border border-white">
           <Search size={48} className="mx-auto text-slate-200 mb-6" />
           <p className="text-slate-400 font-black text-xl">দুঃখিত, কোনো বিভাগ পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
};

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const category = categories.find(c => c.id === categoryId);

  if (!category) return null;

  const list = categoryId === CategoryId.NEWS ? articles.slice().reverse() : items.filter(i => i.categoryId === categoryId);

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
          <ChevronLeft size={28} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{category.title}</h1>
          <div className="flex items-center gap-2 mt-2">
             <div className="w-8 h-1 bg-emerald-500 rounded-full"></div>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">ডাইরেক্টরি লিস্ট</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.length > 0 ? list.map((item: any) => (
          <Link 
            key={item.id} 
            to={categoryId === CategoryId.NEWS ? `/article/${item.id}` : `/detail/${item.id}`} 
            className="flex flex-col p-2 glass-card rounded-[2.5rem] group hover:border-emerald-400 hover:shadow-2xl transition-all border border-white"
          >
            <div className="aspect-video w-full rounded-[2.2rem] overflow-hidden relative shadow-inner">
               <img src={item.image || item.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">{item.name || item.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                   <MapPin size={14} className="text-emerald-500" />
                   <p className="text-sm text-slate-500 font-medium">{item.location || item.author}</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <ChevronRight size={24} />
              </div>
            </div>
          </Link>
        )) : (
          <div className="col-span-full py-32 text-center glass-card rounded-[4rem] border border-white">
             <Search size={48} className="mx-auto text-slate-200 mb-6" />
             <p className="text-slate-400 font-black text-xl">দুঃখিত, বর্তমানে কোনো তথ্য নেই।</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailView: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);

  if (!item) return null;

  return (
    <div className="space-y-12 animate-fadeIn max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
          <ChevronLeft size={28} />
        </button>
        <span className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600">বিস্তারিত বাতায়ন</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <div className="aspect-video w-full rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white/50 ring-1 ring-black/5">
            <img src={item.image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{item.name}</h1>
               <div className="flex items-center gap-3 mt-6 text-white/90">
                 <div className="p-2 bg-emerald-600 rounded-lg"><MapPin size={20} /></div>
                 <span className="text-lg font-bold">{item.location}</span>
               </div>
            </div>
          </div>

          <section className="space-y-6">
            <h3 className="text-2xl font-black text-slate-800 border-l-8 border-emerald-600 pl-6">প্রতিষ্ঠানের বিবরণ</h3>
            <p className="text-slate-600 leading-relaxed text-xl whitespace-pre-line bg-white/40 p-10 rounded-[3rem] border border-white/60">{item.description}</p>
          </section>

          {item.gallery && item.gallery.length > 0 && (
            <section className="space-y-8">
              <h3 className="text-2xl font-black text-slate-800 border-l-8 border-emerald-600 pl-6">ফটো গ্যালারি</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {item.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3.5rem] border border-white shadow-2xl space-y-10">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest text-center">জরুরী যোগাযোগ</h4>
              <a href={`tel:${item.phone}`} className="flex flex-col items-center gap-4 group">
                 <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/30 group-hover:scale-110 transition-all">
                    <Phone size={32} />
                 </div>
                 <span className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-emerald-700 transition-colors">{item.phone}</span>
              </a>
            </div>

            {item.customFields && item.customFields.length > 0 && (
              <div className="space-y-6 pt-10 border-t border-slate-100/50">
                {item.customFields.map((f, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{f.label}</span>
                    <span className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{f.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {item.staff && item.staff.length > 0 && (
            <div className="glass-card p-8 rounded-[3.5rem] border border-white shadow-xl space-y-8">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">সংশ্লিষ্ট ব্যক্তিবর্গ</h4>
              <div className="space-y-4">
                {item.staff.map(s => (
                  <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white/60 transition-all border border-transparent hover:border-emerald-100 group">
                    <img src={s.image} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" alt="" />
                    <div>
                      <p className="text-lg font-black text-slate-800 leading-none group-hover:text-emerald-700 transition-colors">{s.name}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">{s.designation}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StaffDetailView: React.FC = () => {
  const { itemId, staffId } = useParams();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);
  const staff = item?.staff?.find(s => s.id === staffId);

  if (!staff) return null;

  return (
    <div className="space-y-12 animate-fadeIn max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
        <ChevronLeft size={28} />
      </button>
      <div className="text-center glass-card p-14 rounded-[4rem] border border-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-emerald-600"></div>
        <div className="w-48 h-48 rounded-[3rem] overflow-hidden mx-auto shadow-2xl border-8 border-white mb-10 rotate-3 group hover:rotate-0 transition-transform duration-500">
          <img src={staff.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{staff.name}</h1>
          <div className="inline-block px-10 py-3 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20">
            {staff.designation}
          </div>
          <div className="max-w-md mx-auto py-10 border-y border-emerald-50 mt-4">
             <p className="text-slate-600 leading-relaxed text-xl">{staff.bio || 'বিস্তারিত তথ্যাদি শীঘ্রই আপলোড করা হবে।'}</p>
          </div>
        </div>
        {staff.phone && (
          <a href={`tel:${staff.phone}`} className="inline-flex items-center gap-4 px-14 py-6 bg-slate-900 text-white rounded-full font-black text-xl shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all mt-10">
            <Phone size={24} /> কল করুন
          </a>
        )}
      </div>
    </div>
  );
};

const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const article = articles.find(a => a.id === articleId);

  if (!article) return null;

  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto pb-20">
      <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
        <ChevronLeft size={28} />
      </button>
      
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-rose-600 text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"><Calendar size={18} /> {article.date}</span>
          <span className="glass-card text-slate-700 px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border border-white flex items-center gap-2"><UserCheck size={18} /> {article.author}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{article.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {article.images.map((img, i) => (
          <div key={i} className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/50 aspect-video">
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>

      <article className="text-slate-700 text-2xl md:text-3xl leading-relaxed whitespace-pre-line border-t border-slate-100 pt-12">
        {article.content}
      </article>
    </div>
  );
};

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { 
      localStorage.setItem('isAdmin', 'true'); 
      navigate('/admin/dashboard'); 
    } else { 
      alert('ভুল পাসওয়ার্ড!'); 
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <AnimatedBackground />
      <form onSubmit={handleLogin} className="w-full max-w-sm glass-card p-14 rounded-[4rem] shadow-2xl border border-white space-y-10 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-900/30"><Lock size={40} /></div>
          <h2 className="text-3xl font-black tracking-tight">এডমিন পোর্টাল</h2>
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400 font-bold">লগইন বাধ্যতামূলক</p>
        </div>
        <input 
          type="password" 
          placeholder="পাসওয়ার্ড" 
          className="w-full p-6 bg-white/50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/20 text-center font-black text-2xl tracking-widest"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-6 bg-slate-900 text-white rounded-full font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all hover:scale-[1.03]">লগইন করুন</button>
        <div className="pt-4"><Link to="/" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">বাতিল করুন</Link></div>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:categoryId" element={<CategoryListView />} />
          <Route path="/detail/:itemId" element={<DetailView />} />
          <Route path="/detail/:itemId/staff/:staffId" element={<StaffDetailView />} />
          <Route path="/article/:articleId" element={<ArticleDetailView />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
