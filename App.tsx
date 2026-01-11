
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Newspaper, Bus, LayoutDashboard, GraduationCap, 
  Hospital, Stethoscope, Shield, Building, Building2, 
  Package, Camera, Share2, Mic, Flame, ShoppingCart, 
  PlusCircle, Info, Mail, Lock, Sparkles, ChevronRight, 
  Calendar, UserCheck, Globe, Briefcase, User, Facebook,
  Plus, Trash2, Edit, Save, Image as ImageIcon, ExternalLink
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, StaffProfile, InfoSection, CustomField } from './types';

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

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[4px] z-[60]" onClick={() => setIsSidebarOpen(false)} />
      )}

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
            { to: "/admin", icon: <Lock size={20} />, label: "এডমিন লগইন", color: "border-slate-100 bg-slate-50 text-slate-700" },
          ].map((item, idx) => (
            <Link key={idx} to={item.to} className={`flex items-center gap-4 p-4 border rounded-2xl font-bold transition-all hover:scale-[1.03] shadow-sm ${item.color}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        {children}
      </main>

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
  const filteredCategories = categories.filter(cat => cat.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="text-center py-8 space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">স্বাগতম!</h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full opacity-60"></div>
        </div>
        <div className="relative group max-w-4xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 group-focus-within:text-indigo-700 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="আপনার প্রয়োজনীয় তথ্যটি এখানে খুঁজুন..." 
            className="w-full pl-14 pr-6 py-5 rounded-2xl glass-card shadow-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-lg border-2 border-indigo-500/40" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCategories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center justify-center p-8 glass-card rounded-[3rem] shadow-lg hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2 transition-all group overflow-hidden border border-white/60">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/20 group-hover:rotate-12 group-hover:scale-110 transition-transform">
              {IconMap[cat.icon] || <PlusCircle size={32} />}
            </div>
            <span className="text-md font-black text-slate-800 text-center tracking-tight leading-none group-hover:text-emerald-700 transition-colors">{cat.title}</span>
          </Link>
        ))}
      </section>
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
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{category.title}</h1>
      </div>

      <div className="space-y-5">
        {list.length > 0 ? list.map((item: any) => (
          <Link 
            key={item.id} 
            to={categoryId === CategoryId.NEWS ? `/article/${item.id}` : `/detail/${item.id}`} 
            className="flex flex-row items-start p-5 glass-card rounded-[2.5rem] border-2 border-slate-100 hover:border-emerald-400 hover:shadow-xl transition-all group bg-white/50"
          >
            <div className="w-24 h-24 sm:w-36 sm:h-36 flex-shrink-0 rounded-3xl overflow-hidden shadow-md border-4 border-white">
              <img src={item.image || item.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="ml-6 flex-grow pt-1">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{item.name || item.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-bold truncate">{item.location || item.author}</span>
                </div>
                {item.phone && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone size={16} className="text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-bold truncate">{item.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} className="text-rose-500 flex-shrink-0" />
                  <span className="text-sm font-bold">বিস্তারিত দেখুন</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex self-center w-12 h-12 items-center justify-center text-slate-300 group-hover:text-emerald-600 transition-colors">
              <ChevronRight size={28} />
            </div>
          </Link>
        )) : (
          <div className="py-20 text-center glass-card rounded-[3rem] border border-white">
            <Search size={48} className="mx-auto text-slate-200 mb-6" />
            <p className="text-slate-400 font-black text-xl">বর্তমানে কোনো তথ্য নেই।</p>
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
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
          <ChevronLeft size={28} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-white/50 px-6 py-2 rounded-full border border-emerald-100">ইনফরমেশন পোর্টাল</span>
      </div>

      <div className="space-y-10">
        <div className="w-full h-64 md:h-96 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-black/5">
          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">{item.name}</h1>
          <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
        </div>

        {/* Basic Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white/70 rounded-[2rem] border-2 border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center"><MapPin size={28}/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">অবস্থান / ঠিকানা</p>
              <p className="text-lg font-black text-slate-800 leading-tight">{item.location}</p>
            </div>
          </div>
          <a href={`tel:${item.phone}`} className="p-6 bg-white/70 rounded-[2rem] border-2 border-slate-100 shadow-sm flex items-center gap-5 hover:border-emerald-400 transition-all group">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Phone size={28}/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">সরাসরি কল করুন</p>
              <p className="text-lg font-black text-slate-800 leading-tight">{item.phone}</p>
            </div>
          </a>
        </div>

        {/* Dynamic Multiple Tables (InfoSections) */}
        {item.infoSections?.map((section) => (
          <div key={section.id} className="space-y-6">
            <h3 className="text-2xl font-black text-slate-800 border-l-8 border-emerald-600 pl-4">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {section.fields.map((field, idx) => (
                 <div key={idx} className="p-6 bg-white/60 rounded-[2rem] border border-slate-100 flex flex-col justify-center gap-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{field.label}</p>
                   <p className="text-lg font-black text-slate-800">{field.value}</p>
                 </div>
               ))}
            </div>
          </div>
        ))}

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-800 border-l-8 border-emerald-600 pl-4">বিস্তারিত বিবরণ</h3>
          <div className="text-slate-700 leading-relaxed text-lg md:text-xl bg-white/50 p-10 rounded-[3rem] border-2 border-white shadow-inner whitespace-pre-line">
            {item.description}
          </div>
        </div>

        {/* Staff Members Section */}
        {item.staff && item.staff.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-slate-800 border-l-8 border-emerald-600 pl-4">সংশ্লিষ্ট ব্যক্তিবর্গ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {item.staff.map(s => (
                <Link 
                  key={s.id} 
                  to={`/detail/${item.id}/staff/${s.id}`} 
                  className="flex items-center gap-5 p-5 rounded-[2.5rem] bg-white/80 border-2 border-slate-100 hover:border-emerald-500 hover:shadow-2xl transition-all group shadow-sm"
                >
                  <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-md border-2 border-white flex-shrink-0">
                    <img src={s.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xl font-black text-slate-800 leading-none group-hover:text-emerald-700 transition-colors truncate">{s.name}</p>
                    <div className="mt-2.5 inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                      {s.designation}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StaffDetailView: React.FC = () => {
  const { itemId, staffId } = useParams();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const staff = items.find(i => i.id === itemId)?.staff?.find(s => s.id === staffId);

  if (!staff) return null;

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto space-y-8">
      <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
        <ChevronLeft size={28} />
      </button>
      <div className="text-center glass-card p-12 rounded-[4rem] border border-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-emerald-600"></div>
        <img src={staff.image} className="w-44 h-44 rounded-[3rem] object-cover mx-auto shadow-2xl border-4 border-white mb-8" alt="" />
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{staff.name}</h1>
        <div className="mt-4 px-10 py-2.5 bg-emerald-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest inline-block shadow-lg shadow-emerald-900/20">{staff.designation}</div>
        
        {/* Social & Contact Icons */}
        <div className="flex justify-center gap-6 mt-10">
          {staff.phone && (
            <a href={`tel:${staff.phone}`} className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 hover:scale-110 transition-transform shadow-sm">
              <Phone size={24} />
            </a>
          )}
          {staff.email && (
            <a href={`mailto:${staff.email}`} className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100 hover:scale-110 transition-transform shadow-sm">
              <Mail size={24} />
            </a>
          )}
          {staff.facebook && (
            <a href={staff.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 hover:scale-110 transition-transform shadow-sm">
              <Facebook size={24} />
            </a>
          )}
          {staff.website && (
            <a href={staff.website} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 hover:scale-110 transition-transform shadow-sm">
              <Globe size={24} />
            </a>
          )}
        </div>

        <div className="mt-10 max-w-md mx-auto py-8 border-y border-emerald-50">
          <p className="text-slate-600 text-xl leading-relaxed">{staff.bio || 'বিস্তারিত তথ্যাদি শীঘ্রই হালনাগাদ করা হবে।'}</p>
        </div>
      </div>
    </div>
  );
};

// --- ARTICLE DETAIL VIEW ---
const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const article = articles.find(a => a.id === articleId);

  if (!article) return null;

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-4 glass-card rounded-2xl shadow-md hover:bg-emerald-600 hover:text-white transition-all text-slate-500 border border-white">
          <ChevronLeft size={28} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 bg-white/50 px-6 py-2 rounded-full border border-rose-100">সংবাদ ও খবরাখবর</span>
      </div>

      <div className="space-y-10">
        <div className="w-full h-64 md:h-96 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-black/5">
          <img src={article.images[0]} className="w-full h-full object-cover" alt={article.title} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
             <div className="flex items-center gap-1.5 bg-white/60 px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                <Calendar size={14} className="text-rose-500" />
                <span>{article.date}</span>
             </div>
             <div className="flex items-center gap-1.5 bg-white/60 px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                <User size={14} className="text-blue-500" />
                <span>{article.author}</span>
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">{article.title}</h1>
          <div className="w-20 h-1.5 bg-rose-500 rounded-full"></div>
        </div>

        <div className="text-slate-700 leading-relaxed text-lg md:text-xl bg-white/50 p-10 rounded-[3rem] border-2 border-white shadow-inner whitespace-pre-line">
          {article.content}
        </div>
        
        {article.images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {article.images.slice(1).map((img, idx) => (
              <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
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
      <form onSubmit={handleLogin} className="w-full max-w-sm glass-card p-12 rounded-[3.5rem] shadow-2xl border border-white space-y-8 text-center">
        <div className="w-20 h-20 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl"><Lock size={32} /></div>
        <h2 className="text-2xl font-black">এডমিন পোর্টাল</h2>
        <input 
          type="password" 
          placeholder="পাসওয়ার্ড" 
          className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 text-center font-black text-xl tracking-widest"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-lg shadow-xl hover:bg-emerald-700 transition-all">লগইন করুন</button>
      </form>
    </div>
  );
};

// --- ADMIN DASHBOARD ---
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [items, setItems] = useState<InformationItem[]>([]);
  const [activeTab, setActiveTab] = useState<'items' | 'news'>('items');

  useEffect(() => {
    if (!isAdmin) navigate('/admin');
    setItems(getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS));
  }, [isAdmin, navigate]);

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      const updated = items.filter(i => i.id !== id);
      setItems(updated);
      setStorage('items', updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-10">
      <div className="flex items-center justify-between glass-card p-6 rounded-3xl border border-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Lock size={20}/></div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 uppercase">এডমিন প্যানেল</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">ওয়েবসাইট দেখুন</button>
          <button onClick={handleLogout} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-rose-700 transition-all">লগআউট</button>
        </div>
      </div>

      <div className="flex gap-4">
         <button onClick={() => navigate('/admin/item/new')} className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all">
           <Plus size={20} /> নতুন তথ্য যোগ করুন
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="glass-card p-5 rounded-[2.5rem] border border-white flex flex-col gap-4 shadow-xl">
             <div className="aspect-video rounded-[2rem] overflow-hidden border-4 border-white">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
             </div>
             <div className="px-2">
               <h3 className="text-xl font-black text-slate-800 truncate">{item.name}</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.categoryId}</p>
             </div>
             <div className="flex gap-2 mt-2">
                <button onClick={() => navigate(`/admin/item/edit/${item.id}`)} className="flex-grow py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"><Edit size={14}/> এডিট</button>
                <button onClick={() => handleDelete(item.id)} className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={18}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ADMIN EDIT/NEW ITEM VIEW ---
const AdminItemEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Partial<InformationItem>>({
    id: id || Date.now().toString(),
    categoryId: CategoryId.OTHERS,
    name: '',
    image: '',
    description: '',
    location: '',
    phone: '',
    infoSections: [],
    staff: []
  });

  useEffect(() => {
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const found = existing.find(i => i.id === id);
    if (found) setItem(found);
  }, [id]);

  const saveItem = () => {
    if (!item.name || !item.image) { alert('নাম এবং ছবি বাধ্যতামূলক!'); return; }
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    let updated;
    if (id) {
      updated = existing.map(i => i.id === id ? item as InformationItem : i);
    } else {
      updated = [...existing, item as InformationItem];
    }
    setStorage('items', updated);
    navigate('/admin/dashboard');
  };

  // Multiple Tables (InfoSections) Logic
  const addSection = () => {
    const newSections = [...(item.infoSections || []), { id: Date.now().toString(), title: 'নতুন ছক', fields: [] }];
    setItem({ ...item, infoSections: newSections });
  };

  const removeSection = (sId: string) => {
    setItem({ ...item, infoSections: item.infoSections?.filter(s => s.id !== sId) });
  };

  const addField = (sId: string) => {
    const updated = item.infoSections?.map(s => s.id === sId ? { ...s, fields: [...s.fields, { label: '', value: '' }] } : s);
    setItem({ ...item, infoSections: updated });
  };

  // Staff Management Logic
  const addStaff = () => {
    const newStaff = [...(item.staff || []), { id: Date.now().toString(), name: '', designation: '', image: '', phone: '', email: '', facebook: '', website: '', bio: '' }];
    setItem({ ...item, staff: newStaff });
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-10 pb-40">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/admin/dashboard')} className="p-4 glass-card rounded-2xl shadow-md border border-white hover:bg-emerald-600 hover:text-white transition-all"><ChevronLeft size={24}/></button>
        <h1 className="text-3xl font-black text-slate-800">{id ? 'তথ্য এডিট করুন' : 'নতুন তথ্য যোগ করুন'}</h1>
      </div>

      <div className="glass-card p-10 rounded-[3rem] border border-white space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">প্রতিষ্ঠানের নাম</label>
              <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">বিভাগ (Category)</label>
              <select value={item.categoryId} onChange={e => setItem({...item, categoryId: e.target.value as CategoryId})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold">
                 {Object.values(CategoryId).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">ছবির ইউআরএল (Image URL)</label>
              <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">মোবাইল নম্বর</label>
              <input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
           </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">অবস্থান / ঠিকানা</label>
          <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">বিস্তারিত বর্ণনা</label>
          <textarea rows={5} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-5 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold" />
        </div>

        {/* Dynamic Sections Management */}
        <div className="pt-10 border-t border-slate-100 space-y-10">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">অতিরিক্ত তথ্য (একাধিক ছক)</h3>
              <button onClick={addSection} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all"><Plus size={16}/> নতুন ছক যোগ করুন</button>
           </div>

           {item.infoSections?.map((section, sIdx) => (
             <div key={section.id} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 space-y-6 relative">
                <button onClick={() => removeSection(section.id)} className="absolute top-6 right-6 p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                <div className="max-w-xs space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">ছক বা টেবিলের নাম</label>
                   <input value={section.title} onChange={e => {
                     const updated = item.infoSections?.map(s => s.id === section.id ? { ...s, title: e.target.value } : s);
                     setItem({ ...item, infoSections: updated });
                   }} className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-black text-indigo-700" />
                </div>

                <div className="space-y-4">
                   {section.fields.map((field, fIdx) => (
                     <div key={fIdx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div className="space-y-1">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">লেবেল (উদা: ইমেইল)</label>
                           <input value={field.label} onChange={e => {
                              const updatedFields = section.fields.map((f, i) => i === fIdx ? { ...f, label: e.target.value } : f);
                              const updatedSections = item.infoSections?.map(s => s.id === section.id ? { ...s, fields: updatedFields } : s);
                              setItem({ ...item, infoSections: updatedSections });
                           }} className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none font-bold" />
                        </div>
                        <div className="flex gap-2">
                           <div className="flex-grow space-y-1">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">তথ্য (উদা: info@mail.com)</label>
                              <input value={field.value} onChange={e => {
                                 const updatedFields = section.fields.map((f, i) => i === fIdx ? { ...f, value: e.target.value } : f);
                                 const updatedSections = item.infoSections?.map(s => s.id === section.id ? { ...s, fields: updatedFields } : s);
                                 setItem({ ...item, infoSections: updatedSections });
                              }} className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none font-bold" />
                           </div>
                           <button onClick={() => {
                              const updatedFields = section.fields.filter((_, i) => i !== fIdx);
                              const updatedSections = item.infoSections?.map(s => s.id === section.id ? { ...s, fields: updatedFields } : s);
                              setItem({ ...item, infoSections: updatedSections });
                           }} className="p-4 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </div>
                     </div>
                   ))}
                   <button onClick={() => addField(section.id)} className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-800 transition-colors py-2"><Plus size={14}/> নতুন ফিল্ড যোগ করুন</button>
                </div>
             </div>
           ))}
        </div>

        {/* Staff Management */}
        <div className="pt-10 border-t border-slate-100 space-y-10">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">সংশ্লিষ্ট ব্যক্তিবর্গ</h3>
              <button onClick={addStaff} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all"><Plus size={16}/> নতুন প্রোফাইল যোগ করুন</button>
           </div>

           <div className="space-y-8">
              {item.staff?.map((s, idx) => (
                <div key={s.id} className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm space-y-6 relative">
                   <button onClick={() => setItem({ ...item, staff: item.staff?.filter(staff => staff.id !== s.id) })} className="absolute top-6 right-6 p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">নাম</label>
                         <input value={s.name} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, name: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">পদবী</label>
                         <input value={s.designation} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, designation: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">প্রোফাইল ছবি (URL)</label>
                         <input value={s.image} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, image: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                      {/* Social & Contact Fields */}
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">মোবাইল</label>
                         <input value={s.phone} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, phone: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">ইমেইল</label>
                         <input value={s.email} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, email: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">ফেসবুক প্রোফাইল (URL)</label>
                         <input value={s.facebook} onChange={e => {
                            const updated = item.staff?.map(st => st.id === s.id ? { ...st, facebook: e.target.value } : st);
                            setItem({ ...item, staff: updated });
                         }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <button onClick={saveItem} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3">
           <Save size={24}/> তথ্য সংরক্ষণ করুন
        </button>
      </div>
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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/item/new" element={<AdminItemEditor />} />
          <Route path="/admin/item/edit/:id" element={<AdminItemEditor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;