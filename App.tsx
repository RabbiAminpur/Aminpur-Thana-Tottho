
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Newspaper, Bus, LayoutDashboard, GraduationCap, 
  Hospital, Stethoscope, Shield, Building, Building2, 
  Package, Camera, Share2, Mic, Flame, ShoppingCart, 
  PlusCircle, Info, Mail, Lock, Sparkles, ChevronRight, 
  Calendar, UserCheck, Globe, Facebook, Plus, Trash2, 
  Edit, Save, ExternalLink, User as UserIcon, Filter,
  ArrowLeft, BookOpen, Award, Briefcase, Home, Clock, Download, LogOut, Settings, Database, CloudUpload,
  Layers, ListFilter, ArrowRight
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS } from './data';
import { CategoryId, InformationItem, Category, StaffProfile } from './types';

// --- Utilities ---
const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const IconMap: any = {
  'graduation-cap': <GraduationCap size={18} />,
  'hospital': <Hospital size={18} />,
  'stethoscope': <Stethoscope size={18} />,
  'shield': <Shield size={18} />,
  'building': <Building size={18} />,
  'govt-building': <Building2 size={18} />,
  'news': <Newspaper size={18} />,
  'plus-circle': <PlusCircle size={20} />,
  'user-check': <UserCheck size={18} />,
  'package': <Package size={18} />,
  'bus': <Bus size={18} />,
  'camera': <Camera size={18} />,
  'mic': <Mic size={18} />,
};

// --- Public Components ---

const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-300/30 rounded-full animate-blob-vibrant"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-300/30 rounded-full animate-blob-vibrant animation-delay-2000"></div>
    <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-rose-300/30 rounded-full animate-blob-vibrant animation-delay-4000"></div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  if (isAdminPath) return <div className="bg-[#fcfdfd] min-h-screen font-sans selection:bg-emerald-100">{children}</div>;

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-emerald-200">
      <AnimatedBackground />
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 bg-slate-900 rounded-lg shadow-md"><Sparkles className="text-white" size={16} /></div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">আমিনপুর থানা</h1>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all">
          <Menu size={20} />
        </button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-2xl z-[70] shadow-2xl sidebar-transition transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <span className="font-bold text-sm">মেনু</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>
        <nav className="p-6 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-3 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors text-sm">
            <Home size={18} /> হোম পেজ
          </Link>
          <Link to="/" className="flex items-center gap-3 p-3 text-slate-700 rounded-xl font-medium hover:bg-slate-100 transition-colors text-sm">
            <BookOpen size={18} /> তথ্য কোষ
          </Link>
        </nav>
      </aside>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-6 py-6 sm:py-10">
        {children}
      </main>
      <footer className="py-8 bg-white/10 backdrop-blur-sm border-t border-white/30 text-center">
        <div className="font-bold text-slate-400 text-[10px] tracking-[0.2em] uppercase">মীর রাব্বি হোসেন © ২০২৫</div>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const filteredCategories = categories.filter(cat => cat.title.includes(searchTerm));

  return (
    <div className="space-y-16 animate-fadeIn">
      <section className="text-center space-y-4 pt-4">
        <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">স্বাগতম!</h2>
        <p className="text-slate-500 font-medium text-lg md:text-xl">আমিনপুরের সকল তথ্য একসাথে</p>
        <div className="relative group max-w-xl mx-auto rounded-2xl overflow-hidden mt-10 shadow-lg shadow-emerald-500/5">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
          <input 
            type="text" placeholder="সার্চ করুন..." 
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 outline-none text-base font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>
      <section className="category-grid">
        {filteredCategories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center p-4 bg-white/70 rounded-3xl shadow-sm border border-white hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all group glass-card">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 ${cat.color} text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-all`}>
              {IconMap[cat.icon]}
            </div>
            <span className="text-[11px] sm:text-[13px] font-bold text-slate-700 text-center leading-tight">{cat.title}</span>
          </Link>
        ))}
      </section>
    </div>
  );
};

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const category = categories.find(c => c.id === categoryId);

  if (!category) return null;
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  if (hasSubCategories && !activeSubId) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm"><ChevronLeft size={20}/></button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">{category.title}</h1>
          <p className="text-slate-400 text-sm font-medium">উপ-বিভাগ নির্বাচন করুন</p>
        </div>
        <section className="category-grid">
          {category.subCategories?.map(sub => (
            <button key={sub.id} onClick={() => setActiveSubId(sub.id)} className="flex flex-col items-center p-5 bg-white/70 rounded-3xl border border-white hover:border-emerald-400 hover:shadow-xl transition-all group glass-card w-full">
              <div className={`w-12 h-12 ${category.color} text-white rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:rotate-6 transition-transform`}>{IconMap[category.icon]}</div>
              <span className="text-sm font-bold text-slate-700">{sub.title}</span>
            </button>
          ))}
        </section>
      </div>
    );
  }

  const list = items.filter(i => i.categoryId === categoryId && (!activeSubId || i.subCategoryId === activeSubId));
  const subCategoryTitle = activeSubId ? category.subCategories?.find(s => s.id === activeSubId)?.title : '';

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => hasSubCategories ? setActiveSubId(null) : navigate(-1)} className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
          {hasSubCategories ? <ArrowLeft size={18} /> : <ChevronLeft size={18} />}
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{category.title} {subCategoryTitle && `› ${subCategoryTitle}`}</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">মোট {list.length}টি তথ্য</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(item => (
          <Link key={item.id} to={`/detail/${item.id}`} className="flex items-center p-4 bg-white/70 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group glass-card gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
            </div>
            <div className="min-w-0 flex-grow">
              <h3 className="text-sm font-bold text-slate-800 truncate">{item.name}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium mt-1"><MapPin size={10} className="text-emerald-500"/><span className="truncate">{item.location}</span></div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </Link>
        ))}
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
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"><ChevronLeft size={20}/></button>
      <div className="space-y-10">
        <div className="w-full aspect-video md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white">
          <img src={item.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{item.name}</h1>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full border border-slate-100 text-[11px] font-bold text-slate-500"><MapPin size={14} className="text-emerald-500" /> {item.location}</div>
            {item.phone && <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 rounded-full text-[11px] font-bold text-white"><Phone size={14} /> {item.phone}</a>}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">বিস্তারিত</h3>
              <div className="bg-white/60 p-6 md:p-10 rounded-[2rem] shadow-inner border border-white leading-relaxed text-slate-700 text-base whitespace-pre-line">
                {item.description || "তথ্য পাওয়া যায়নি।"}
              </div>
            </div>
            {item.staff && item.staff.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-3">দায়িত্বশীল ব্যক্তিবর্গ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.staff.map(s => (
                    <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-4 p-4 bg-white border border-slate-50 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all shadow-sm group">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img src={s.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="text-sm font-bold text-slate-800 truncate">{s.name}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{s.designation}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl space-y-6">
               <h4 className="text-sm font-bold uppercase tracking-widest opacity-60">একনজরে</h4>
               <div className="space-y-3">
                 <div className="flex justify-between items-center py-2 border-b border-white/10 text-xs">
                   <span className="text-slate-400 font-medium">প্রতিষ্ঠা</span>
                   <span className="font-bold">{item.establishmentYear || '-'}</span>
                 </div>
                 {item.infoSections?.flatMap(s => s.fields).map((field, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 text-xs">
                      <span className="text-slate-400 font-medium">{field.label}</span>
                      <span className="font-bold text-right">{field.value}</span>
                    </div>
                 ))}
               </div>
               <button className="w-full py-3 bg-emerald-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-colors">শেয়ার করুন</button>
             </div>
          </div>
        </div>
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
    <div className="animate-fadeIn max-w-2xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 active:scale-95 shadow-sm"><ChevronLeft size={20}/></button>
      <div className="bg-white/90 p-8 sm:p-12 rounded-[3rem] shadow-xl border border-white space-y-10 glass-card">
        <div className="text-center space-y-6">
          <img src={staff.image} className="w-40 h-40 rounded-[2.5rem] object-cover mx-auto border-[6px] border-white shadow-xl" alt="" />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">{staff.name}</h1>
            <p className="px-4 py-1 bg-slate-900 text-white rounded-full inline-block font-bold text-[9px] uppercase tracking-widest">{staff.designation}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-sm font-medium">
          {staff.educationalQualification && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><GraduationCap size={12}/> শিক্ষাগত যোগ্যতা</p>
              <p className="font-bold text-slate-800">{staff.educationalQualification}</p>
            </div>
          )}
          {staff.phone && (
            <a href={`tel:${staff.phone}`} className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm"><Phone size={18}/></div>
              <div className="flex-grow">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-50">ফোন</p>
                <p className="font-bold text-lg tracking-tight">{staff.phone}</p>
              </div>
            </a>
          )}
          <div className="grid grid-cols-2 gap-4">
            {staff.joiningDate && <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">যোগদান</p><p className="font-bold text-xs">{staff.joiningDate}</p></div>}
            {staff.address && <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">ঠিকানা</p><p className="font-bold text-xs truncate">{staff.address}</p></div>}
          </div>
        </div>
        <div className="flex justify-center gap-4 pt-6 border-t border-slate-100">
          {staff.facebook && <a href={staff.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"><Facebook size={20} /></a>}
          {staff.email && <a href={`mailto:${staff.email}`} className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform"><Mail size={20} /></a>}
        </div>
      </div>
    </div>
  );
};

// --- Admin Components (Minimal & Modern) ---

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'mirrabbihossain' && password === 'Rabbi@198027') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      <div className="w-full max-w-xs bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 text-center space-y-8">
        <div className="space-y-2">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock size={28}/></div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">অ্যাডমিন লগইন</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">মীর রাব্বি হোসেন</p>
        </div>
        <div className="space-y-4">
          <input type="text" placeholder="ইউজারনেম" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold" />
          <input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold" />
          <button onClick={handleLogin} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">প্রবেশ করুন</button>
        </div>
        <Link to="/" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 inline-block">হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InformationItem[]>([]);
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin');
    setItems(getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS));
  }, [navigate]);

  const handleExport = () => {
    const dataString = `import { CategoryId, Category, InformationItem, Article } from './types';

export const CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const INFO_ITEMS: InformationItem[] = ${JSON.stringify(items, null, 2)};

export const ARTICLES: Article[] = [];`;

    const blob = new Blob([dataString], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.ts';
    link.click();
    alert('data.ts ফাইলটি ডাউনলোড হয়েছে। গিটহাবে আপডেট করুন।');
  };

  const groupedItems = useMemo(() => {
    return categories.map(cat => ({
      category: cat,
      items: items.filter(i => i.categoryId === cat.id)
    }));
  }, [items, categories]);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 pb-40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center"><LayoutDashboard size={24}/></div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">ড্যাশবোর্ড</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{items.length} টি তথ্য বিদ্যমান</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="px-5 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all"><CloudUpload size={16}/> ব্যাকআপ (Export)</button>
          <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all"><LogOut size={20}/></button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">নতুন তথ্য যোগ করুন</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => navigate(`/admin/item/new?cat=${cat.id}`)} className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-500 hover:shadow-md transition-all group">
              <div className={`w-8 h-8 ${cat.color} text-white rounded-lg flex items-center justify-center mb-2`}>{IconMap[cat.icon]}</div>
              <span className="text-[10px] font-bold text-slate-600 text-center">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12 pt-8">
        {groupedItems.map(group => group.items.length > 0 && (
          <div key={group.category.id} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2"><div className={`w-1.5 h-4 ${group.category.color} rounded-full`}></div> {group.category.title}</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.items.map(i => (
                <div key={i.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100"><img src={i.image} className="w-full h-full object-cover" alt="" /></div>
                  <div className="min-w-0 flex-grow">
                    <h3 className="text-[11px] font-bold text-slate-800 truncate">{i.name}</h3>
                    <p className="text-[9px] font-bold text-slate-400 truncate mt-0.5">{i.location}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => navigate(`/admin/item/edit/${i.id}`)} className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-colors"><Edit size={14}/></button>
                    <button onClick={() => { if(confirm('ডিলিট করতে চান?')) { const u = items.filter(x => x.id !== i.id); setItems(u); setStorage('items', u); } }} className="p-2 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminItemEditor: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const preSelectedCat = searchParams.get('cat') as CategoryId;

  const [item, setItem] = useState<Partial<InformationItem>>({
    id: id || Date.now().toString(),
    categoryId: preSelectedCat || CategoryId.EDUCATION,
    name: '', image: '', description: '', location: '', phone: '',
    infoSections: [], staff: [], establishmentYear: ''
  });

  const categories = INITIAL_CATEGORIES;

  useEffect(() => {
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const found = existing.find(i => i.id === id);
    if (found) setItem(found);
    else if (preSelectedCat) setItem(prev => ({...prev, categoryId: preSelectedCat}));
  }, [id, preSelectedCat]);

  const save = () => {
    if (!item.name || !item.categoryId) return alert('তথ্য অসম্পূর্ণ!');
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const updated = id ? existing.map(i => i.id === id ? item as InformationItem : i) : [...existing, item as InformationItem];
    setStorage('items', updated);
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 space-y-8 pb-40">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-all"><ChevronLeft size={18}/></button>
        <h2 className="text-xl font-bold text-slate-900">{id ? 'তথ্য এডিট' : 'নতুন তথ্য এন্ট্রি'}</h2>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">বিভাগ</label>
            <select value={item.categoryId} onChange={e => setItem({...item, categoryId: e.target.value as CategoryId})} className="w-full p-3 bg-slate-50 rounded-xl border-none font-bold text-sm">
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">সাব-বিভাগ</label>
            <select value={item.subCategoryId || ''} onChange={e => setItem({...item, subCategoryId: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border-none font-bold text-sm">
              <option value="">নির্বাচন করুন</option>
              {categories.find(c => c.id === item.categoryId)?.subCategories?.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">নাম</label>
            <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="নাম দিন..." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">ছবি URL</label>
            <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold text-sm" placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">অবস্থান</label>
            <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold text-sm" placeholder="ঠিকানা দিন..." />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">বিস্তারিত বর্ণনা</label>
          <textarea rows={5} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-6 bg-slate-50 rounded-2xl border-none font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="বর্ণনা লিখুন..." />
        </div>

        <div className="space-y-6 pt-6 border-t border-slate-50">
           <div className="flex justify-between items-center px-1">
             <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">ব্যক্তিবর্গের প্রোফাইল</h3>
             <button onClick={() => setItem({...item, staff: [...(item.staff || []), { id: Date.now().toString(), name: '', designation: '', image: '' }]})} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest">+ যোগ করুন</button>
           </div>
           <div className="space-y-4">
             {item.staff?.map(s => (
               <div key={s.id} className="p-6 bg-slate-50 rounded-2xl relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button onClick={() => setItem({...item, staff: item.staff?.filter(st => st.id !== s.id)})} className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg"><Trash2 size={14}/></button>
                 <input placeholder="নাম" value={s.name} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, name: e.target.value} : st)})} className="w-full p-3 bg-white rounded-lg border-none font-bold text-xs" />
                 <input placeholder="পদবী" value={s.designation} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, designation: e.target.value} : st)})} className="w-full p-3 bg-white rounded-lg border-none font-bold text-xs" />
                 <input placeholder="ছবি URL" value={s.image} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, image: e.target.value} : st)})} className="w-full p-3 bg-white rounded-lg border-none font-bold text-xs" />
                 <input placeholder="ফোন" value={s.phone} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, phone: e.target.value} : st)})} className="w-full p-3 bg-white rounded-lg border-none font-bold text-xs" />
               </div>
             ))}
           </div>
        </div>

        <button onClick={save} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all">সংরক্ষণ করুন</button>
      </div>
    </div>
  );
};

// --- App Root ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:categoryId" element={<CategoryListView />} />
          <Route path="/detail/:itemId" element={<DetailView />} />
          <Route path="/detail/:itemId/staff/:staffId" element={<StaffDetailView />} />
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
