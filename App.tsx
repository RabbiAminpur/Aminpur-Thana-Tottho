
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
  'graduation-cap': <GraduationCap size={20} />,
  'hospital': <Hospital size={20} />,
  'stethoscope': <Stethoscope size={20} />,
  'shield': <Shield size={20} />,
  'building': <Building size={20} />,
  'govt-building': <Building2 size={20} />,
  'news': <Newspaper size={20} />,
  'plus-circle': <PlusCircle size={22} />,
  'user-check': <UserCheck size={20} />,
  'package': <Package size={20} />,
  'bus': <Bus size={20} />,
  'camera': <Camera size={20} />,
  'mic': <Mic size={20} />,
};

// --- Public Components ---

const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-300 rounded-full animate-blob-vibrant"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-300 rounded-full animate-blob-vibrant animation-delay-2000"></div>
    <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-rose-300 rounded-full animate-blob-vibrant animation-delay-4000"></div>
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

  if (isAdminPath) return <div className="bg-[#f8fafc] min-h-screen font-sans">{children}</div>;

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200"><Sparkles className="text-white" size={18} /></div>
          <h1 className="text-lg font-black text-slate-800 tracking-tight">আমিনপুর থানা বাতায়ন</h1>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-all">
          <Menu size={20} />
        </button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-2xl z-[70] shadow-2xl sidebar-transition transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 bg-emerald-600 text-white flex items-center justify-between shadow-lg">
          <span className="font-bold">প্রধান মেনু</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-white/20 rounded-lg"><X size={24} /></button>
        </div>
        <nav className="p-6 space-y-3">
          <Link to="/" className="flex items-center gap-3 p-3.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors">
            <LayoutDashboard size={18} /> ডিরেক্টরি হোম
          </Link>
          <Link to="/admin" className="flex items-center gap-3 p-3.5 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            <Lock size={18} /> অ্যাডমিন প্যানেল
          </Link>
        </nav>
      </aside>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-6 py-6 sm:py-10">
        {children}
      </main>
      <footer className="py-8 bg-white/30 backdrop-blur-sm border-t border-white/50 text-center">
        <div className="font-bold text-slate-400 text-xs tracking-widest uppercase">মীর রাব্বি হোসেন © ২০২৫</div>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const filteredCategories = categories.filter(cat => cat.title.includes(searchTerm));

  return (
    <div className="space-y-12 animate-fadeIn">
      <section className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-2 shadow-sm border border-emerald-200">Local Directory</div>
        <h2 className="text-4xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight">আমিনপুর ডিজিটাল তথ্য ভাণ্ডার</h2>
        <div className="relative group max-w-2xl mx-auto shadow-2xl shadow-indigo-100 rounded-3xl overflow-hidden mt-8 transform hover:scale-[1.02] transition-transform duration-500">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" size={24} />
          <input 
            type="text" placeholder="কি খুঁজছেন? যেমন: স্কুল, হাসপাতাল..." 
            className="w-full pl-16 pr-6 py-6 bg-white/95 outline-none text-xl font-bold placeholder:text-slate-300"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>
      <section className="category-grid">
        {filteredCategories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center p-5 bg-white/80 rounded-[2.5rem] shadow-sm border border-white hover:border-emerald-400 hover:shadow-2xl hover:-translate-y-2 transition-all group glass-card">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${cat.color} text-white rounded-[1.5rem] flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              {IconMap[cat.icon]}
            </div>
            <span className="text-[12px] sm:text-sm font-black text-slate-700 text-center leading-tight tracking-tight px-1">{cat.title}</span>
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
      <div className="space-y-10 animate-fadeIn">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all"><ChevronLeft size={20}/></button>
          <div>
            <h1 className="text-3xl font-black text-slate-900">{category.title}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">উপ-বিভাগ সমূহ নির্বাচন করুন</p>
          </div>
        </div>
        <section className="category-grid">
          {category.subCategories?.map(sub => (
            <button key={sub.id} onClick={() => setActiveSubId(sub.id)} className="flex flex-col items-center p-6 bg-white/80 rounded-[2.5rem] shadow-sm border border-white hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 transition-all group glass-card w-full">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${category.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>{IconMap[category.icon]}</div>
              <span className="text-sm font-black text-slate-700">{sub.title}</span>
            </button>
          ))}
        </section>
      </div>
    );
  }

  const list = items.filter(i => i.categoryId === categoryId && (!activeSubId || i.subCategoryId === activeSubId));
  const subCategoryTitle = activeSubId ? category.subCategories?.find(s => s.id === activeSubId)?.title : '';

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => hasSubCategories ? setActiveSubId(null) : navigate(-1)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all">
          {hasSubCategories ? <ArrowLeft size={20} /> : <ChevronLeft size={20} />}
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900">{category.title} {subCategoryTitle && `› ${subCategoryTitle}`}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">মোট {list.length}টি ফলাফল পাওয়া গেছে</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(item => (
          <Link key={item.id} to={`/detail/${item.id}`} className="flex items-center p-5 bg-white/80 rounded-[2rem] border border-slate-200 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all group glass-card gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-50 border border-white">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
            </div>
            <div className="min-w-0 flex-grow space-y-2">
              <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">{item.name}</h3>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold"><MapPin size={12} className="text-emerald-500"/><span className="truncate">{item.location}</span></div>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest"><Phone size={10}/> {item.phone || 'N/A'}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all"><ArrowRight size={16}/></div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto"><Database size={40}/></div>
            <p className="text-slate-400 font-bold">এই বিভাগে এখনো কোনো তথ্য যোগ করা হয়নি।</p>
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
      <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"><ChevronLeft size={24}/></button>
      <div className="space-y-12">
        <div className="w-full aspect-video md:h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white group relative">
          <img src={item.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
            <p className="text-white font-bold text-lg">Local Landmark</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">{item.name}</h1>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-100 text-xs font-bold text-slate-600 shadow-sm"><MapPin size={16} className="text-emerald-500" /> {item.location}</div>
                {item.phone && <a href={`tel:${item.phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 rounded-full text-xs font-bold text-white shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-colors"><Phone size={16} /> {item.phone}</a>}
              </div>
            </div>
            {item.establishmentYear && (
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">প্রতিষ্ঠিত</p>
                <p className="text-2xl font-black text-emerald-600">{item.establishmentYear}</p>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <div className="w-2 h-8 bg-emerald-600 rounded-full"></div> বিস্তারিত বর্ণনা
              </h3>
              <div className="bg-white/70 p-8 md:p-12 rounded-[3rem] shadow-inner border border-white leading-relaxed text-slate-700 text-lg whitespace-pre-line">
                {item.description || "এই প্রতিষ্ঠানের বিস্তারিত বর্ণনা এখনো যোগ করা হয়নি। আমরা তথ্য সংগ্রহ করছি।"}
              </div>
            </div>
            {item.staff && item.staff.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-600 rounded-full"></div> সংশ্লিষ্ট ব্যক্তিবর্গ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {item.staff.map(s => (
                    <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[2rem] hover:border-emerald-500 hover:shadow-2xl transition-all shadow-sm group">
                      <div className="w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-50">
                        <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="text-base font-black text-slate-800 truncate">{s.name}</p>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{s.designation}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all"><ChevronRight size={16} /></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <h4 className="text-xl font-black">তথ্য একনজরে</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">বিভাগ</span>
                   <span className="font-bold">{INITIAL_CATEGORIES.find(c => c.id === item.categoryId)?.title}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">লোকেশন</span>
                   <span className="font-bold text-right text-sm">{item.location}</span>
                </div>
                {item.infoSections?.flatMap(s => s.fields).map((field, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{field.label}</span>
                    <span className="font-bold text-right text-sm">{field.value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <Share2 size={16}/> তথ্য শেয়ার করুন
              </button>
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
    <div className="animate-fadeIn max-w-2xl mx-auto space-y-10 pb-20">
      <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"><ChevronLeft size={24}/></button>
      <div className="bg-white/95 p-10 sm:p-16 rounded-[4rem] shadow-2xl border border-white space-y-12 glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[4rem] blur-2xl"></div>
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <img src={staff.image} className="w-48 h-48 sm:w-56 sm:h-56 rounded-[3.5rem] object-cover mx-auto border-[10px] border-white shadow-2xl" alt="" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-emerald-600 text-white rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl whitespace-nowrap">
              {staff.designation}
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{staff.name}</h1>
            <p className="text-slate-400 font-bold">Personal Profile Card</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {staff.educationalQualification && (
            <div className="p-7 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"><GraduationCap size={14} className="text-emerald-500"/> শিক্ষাগত যোগ্যতা</p>
              <p className="font-bold text-slate-800 text-lg">{staff.educationalQualification}</p>
            </div>
          )}
          {staff.phone && (
            <a href={`tel:${staff.phone}`} className="p-7 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-6 group hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-md group-hover:scale-110 transition-transform"><Phone size={24}/></div>
              <div className="flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">ফোন নাম্বার</p>
                <p className="text-xl font-black tracking-tight">{staff.phone}</p>
              </div>
              <ArrowRight size={20} className="opacity-30 group-hover:opacity-100" />
            </a>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {staff.joiningDate && <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">যোগদান</p><p className="font-bold">{staff.joiningDate}</p></div>}
            {staff.address && <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ঠিকানা</p><p className="font-bold truncate">{staff.address}</p></div>}
          </div>
        </div>
        <div className="flex justify-center gap-5 pt-8 border-t border-slate-100">
          {staff.facebook && <a href={staff.facebook} target="_blank" rel="noreferrer" className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-100 transition-all active:scale-90"><Facebook size={24} /></a>}
          {staff.email && <a href={`mailto:${staff.email}`} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all active:scale-90"><Mail size={24} /></a>}
        </div>
      </div>
    </div>
  );
};

// --- Admin Components ---

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] text-white">
      <div className="w-full max-w-md bg-[#1e293b] p-10 rounded-[3.5rem] shadow-2xl space-y-8 border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
        <div className="text-center space-y-3 relative z-10">
          <div className="w-24 h-24 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 mb-4 transform -rotate-12"><Lock size={40}/></div>
          <h2 className="text-3xl font-black tracking-tighter">অ্যাডমিন এক্সেস</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">আমিনপুর থানা বাতায়ন পোর্টাল</p>
        </div>
        <div className="space-y-5 relative z-10">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Username</label>
            <input type="text" placeholder="ইউজারনেম দিন" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-5 bg-slate-800 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 font-bold transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Password</label>
            <input type="password" placeholder="পাসওয়ার্ড দিন" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-5 bg-slate-800 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 font-bold transition-all" />
          </div>
          <button onClick={handleLogin} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 transition-all mt-4">লগইন করুন</button>
        </div>
        <div className="text-center pt-4">
           <Link to="/" className="text-xs font-bold text-slate-500 hover:text-emerald-500 flex items-center justify-center gap-2"><ArrowLeft size={12}/> ফিরে যান</Link>
        </div>
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
    
    alert('ডেটা সম্বলিত "data.ts" ফাইলটি ডাউনলোড হয়েছে। \n\nগিটহাবে এই কোডটি আপডেট করুন।');
  };

  const groupedItems = useMemo(() => {
    return categories.map(cat => ({
      category: cat,
      items: items.filter(i => i.categoryId === cat.id)
    }));
  }, [items, categories]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12 animate-fadeIn pb-40">
      <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
        <div className="flex items-center gap-6">
           <div className="w-20 h-20 bg-slate-900 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl"><LayoutDashboard size={36}/></div>
           <div>
             <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">অ্যাডমিন ম্যানেজমেন্ট</h1>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Database size={12} className="text-emerald-500"/> মোট সার্ভিস ডাটা: {items.length} টি
             </p>
           </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleExport} 
            className="px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black flex items-center gap-3 text-sm shadow-2xl active:scale-95 transition-all"
          >
            <CloudUpload size={20} className="text-blue-400"/> গিটহাব আপডেট ফাইল
          </button>
          <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }} className="p-5 bg-rose-50 text-rose-600 rounded-[2rem] font-bold hover:bg-rose-100 active:scale-95 transition-all shadow-sm">
            <LogOut size={24}/>
          </button>
        </div>
      </div>

      {/* Category-Specific Add Buttons (Directory Entry Points) */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 px-4">
          <Layers size={20} className="text-emerald-600"/> নতুন তথ্য যোগ করার অপশন (ক্যাটাগরি ভিত্তিক)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => navigate(`/admin/item/new?cat=${cat.id}`)}
              className="flex flex-col items-center p-6 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-emerald-500 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className={`w-12 h-12 ${cat.color} text-white rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Plus size={24}/>
              </div>
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter text-center">নতুন {cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Data Table/Directory */}
      <div className="space-y-10 pt-10 border-t border-slate-100">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 px-4">
          <ListFilter size={20} className="text-emerald-600"/> বিদ্যমান তথ্য ডিরেক্টরি
        </h3>
        
        {groupedItems.map(group => group.items.length > 0 && (
          <div key={group.category.id} className="space-y-5 bg-slate-50/50 p-6 rounded-[3rem] border border-slate-100">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${group.category.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>{IconMap[group.category.icon]}</div>
                <h4 className="font-black text-slate-800 text-lg">{group.category.title}</h4>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.items.length} টি আইটেম</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.items.map(i => (
                <div key={i.id} className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4 group hover:shadow-xl transition-all relative">
                  <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-50">
                    <img src={i.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="px-1 space-y-1">
                    <h3 className="font-black text-slate-800 truncate text-sm">{i.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 truncate">{i.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/admin/item/edit/${i.id}`)} className="flex-grow py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-wider active:scale-95 transition-all">এডিট</button>
                    <button onClick={() => { if(confirm('ডিলিট করতে চান?')) { const u = items.filter(x => x.id !== i.id); setItems(u); setStorage('items', u); } }} className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={18}/></button>
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
    if (!item.name || !item.categoryId) {
      alert('নাম এবং ক্যাটাগরি অবশ্যই দিতে হবে।');
      return;
    }
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const updated = id ? existing.map(i => i.id === id ? item as InformationItem : i) : [...existing, item as InformationItem];
    setStorage('items', updated);
    navigate('/admin/dashboard');
  };

  const isEducation = item.categoryId === CategoryId.EDUCATION;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 pb-40 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 active:scale-90 transition-all"><ChevronLeft size={20}/></button>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">{id ? 'তথ্য এডিট' : 'নতুন তথ্য এন্ট্রি'}</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {categories.find(c => c.id === item.categoryId)?.title} ডিরেক্টরি ব্যবস্থাপনা
          </p>
        </div>
      </div>

      <div className="bg-white p-10 sm:p-16 rounded-[4rem] border border-slate-200 shadow-2xl space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] border-l border-b border-slate-100 flex items-center justify-center text-slate-200">
           {IconMap[categories.find(c => c.id === item.categoryId)?.icon || 'plus-circle']}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">বিভাগ নির্বাচন</label>
            <select value={item.categoryId} onChange={e => setItem({...item, categoryId: e.target.value as CategoryId, subCategoryId: undefined})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner">
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">সাব-বিভাগ (ঐচ্ছিক)</label>
            <select value={item.subCategoryId || ''} onChange={e => setItem({...item, subCategoryId: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner">
              <option value="">নির্বাচন করুন</option>
              {categories.find(c => c.id === item.categoryId)?.subCategories?.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">প্রতিষ্ঠানের নাম</label>
            <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="যেমন: আমিনপুর কলেজ" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">ছবির লিঙ্ক (URL)</label>
            <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">প্রতিষ্ঠার বছর</label>
            <input value={item.establishmentYear} onChange={e => setItem({...item, establishmentYear: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="যেমন: ১৯৭৫" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">অবস্থান/ঠিকানা</label>
            <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="আমিনপুর বাজার সংলগ্ন" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">ফোন নম্বর</label>
            <input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="+৮৮০১৭..." />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">বিস্তারিত বর্ণনা (বাংলায়)</label>
          <textarea rows={6} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-8 bg-slate-50 rounded-[3rem] border-2 border-transparent outline-none focus:border-emerald-500 focus:bg-white font-bold transition-all shadow-inner" placeholder="প্রতিষ্ঠানের ইতিহাস ও কার্যাবলী..." />
        </div>

        {/* Dynamic Personnel Section */}
        <div className="space-y-8 pt-12 border-t border-slate-100 relative z-10">
           <div className="flex justify-between items-center px-2">
             <div className="space-y-1">
               <h3 className="text-xl font-black text-slate-900">ব্যক্তিবর্গের প্রোফাইল</h3>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">যেমন: প্রধান শিক্ষক, ডাক্তার বা সংশ্লিষ্ট অফিসার</p>
             </div>
             <button 
               onClick={() => setItem({...item, staff: [...(item.staff || []), { id: Date.now().toString(), name: '', designation: '', image: '' }]})} 
               className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
             >
               + প্রোফাইল যোগ
             </button>
           </div>
           
           <div className="space-y-6">
             {item.staff?.map(s => (
               <div key={s.id} className="p-8 bg-slate-50 rounded-[3.5rem] border border-slate-200 relative grid grid-cols-1 sm:grid-cols-2 gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                 <button onClick={() => setItem({...item, staff: item.staff?.filter(st => st.id !== s.id)})} className="absolute -top-3 -right-3 w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-xl hover:rotate-90 transition-all active:scale-90 z-10"><Trash2 size={20}/></button>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">নাম</label><input value={s.name} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, name: e.target.value} : st)})} className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold text-sm outline-none focus:border-emerald-500" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">পদবী</label><input value={s.designation} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, designation: e.target.value} : st)})} className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold text-sm outline-none focus:border-emerald-500" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">যোগদান</label><input value={s.joiningDate} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, joiningDate: e.target.value} : st)})} className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold text-sm outline-none focus:border-emerald-500" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">প্রোফাইল ছবি URL</label><input value={s.image} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, image: e.target.value} : st)})} className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold text-sm outline-none focus:border-emerald-500" /></div>
               </div>
             ))}
           </div>
        </div>

        <button 
          onClick={save} 
          className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
        >
           <Save size={36}/> ডিরেক্টরিতে সেভ করুন
        </button>
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
