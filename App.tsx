
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Newspaper, Bus, LayoutDashboard, GraduationCap, 
  Hospital, Stethoscope, Shield, Building, Building2, 
  Package, Camera, Share2, Mic, Flame, ShoppingCart, 
  PlusCircle, Info, Mail, Lock, Sparkles, ChevronRight, 
  Calendar, UserCheck, Globe, Facebook, Plus, Trash2, 
  Edit, Save, ExternalLink, User as UserIcon, Filter,
  ArrowLeft, BookOpen, Award, Briefcase, Home, Clock, Download, LogOut
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, StaffProfile, InfoSection } from './types';

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

const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

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

  if (isAdminPath) return <div className="bg-[#f0f2f5] min-h-screen font-sans">{children}</div>;

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
            <LayoutDashboard size={18} /> হোম পেজ
          </Link>
          {/* Admin link removed from sidebar as requested */}
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
    <div className="space-y-10 animate-fadeIn">
      <section className="text-center space-y-4">
        <div className="space-y-1">
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter leading-tight">স্বাগতম!</h2>
          <p className="text-lg md:text-xl font-bold text-emerald-600/80">আমিনপুরের সব তথ্য এক জায়গায়</p>
        </div>
        <div className="relative group max-w-2xl mx-auto shadow-2xl shadow-indigo-100 rounded-3xl overflow-hidden mt-6">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
          <input 
            type="text" placeholder="সার্চ করুন..." 
            className="w-full pl-14 pr-6 py-5 bg-white/90 outline-none text-lg font-bold placeholder:text-slate-300"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section className="category-grid">
        {filteredCategories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center p-4 bg-white/80 rounded-[2rem] shadow-sm border border-white hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 transition-all group glass-card">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 ${cat.color} text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
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
  const isSpecialLayout = [
    CategoryId.EDUCATION, 
    CategoryId.HOSPITAL, 
    CategoryId.CITIZEN_SERVICE, 
    CategoryId.TRANSPORT, 
    CategoryId.UNION
  ].includes(category.id as CategoryId);

  if (hasSubCategories && !activeSubId) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900">{category.title}</h1>
            <p className="text-xs font-bold text-slate-400">একটি বিভাগ নির্বাচন করুন</p>
          </div>
        </div>
        <section className="category-grid">
          {category.subCategories?.map(sub => (
            <button 
              key={sub.id} 
              onClick={() => setActiveSubId(sub.id)}
              className="flex flex-col items-center p-4 bg-white/80 rounded-[2rem] shadow-sm border border-white hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 active:scale-95 transition-all group glass-card w-full"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${category.color} text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                {IconMap[category.icon]}
              </div>
              <span className="text-[12px] sm:text-sm font-black text-slate-700 text-center leading-tight tracking-tight px-1">{sub.title}</span>
            </button>
          ))}
        </section>
      </div>
    );
  }

  const activeSubTitle = category.subCategories?.find(s => s.id === activeSubId)?.title;
  const list = items.filter(i => i.categoryId === categoryId && (!activeSubId || i.subCategoryId === activeSubId));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={() => hasSubCategories ? setActiveSubId(null) : navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all">
            {hasSubCategories ? <ArrowLeft size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900">{hasSubCategories ? activeSubTitle : category.title}</h1>
            <div className={`h-1.5 w-16 ${category.color} rounded-full`}></div>
          </div>
        </div>
      </div>

      <div className={`grid ${isSpecialLayout ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-4 sm:gap-6`}>
        {list.map(item => (
          <Link key={item.id} to={`/detail/${item.id}`} className={`flex flex-col items-center p-4 bg-white/80 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-xl active:scale-[0.98] transition-all duration-300 group glass-card text-center`}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[5px] overflow-hidden shadow-sm mb-4 border border-slate-100 bg-slate-50">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors mb-2">{item.name}</h3>
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold">
              <MapPin size={10} className="text-emerald-400" />
              <span className="truncate max-w-[120px]">{item.location}</span>
            </div>
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

  const isEducation = item.categoryId === CategoryId.EDUCATION;
  const isHospital = item.categoryId === CategoryId.HOSPITAL;
  const isUnion = item.categoryId === CategoryId.UNION;

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></button>

      <div className="space-y-10">
        <div className="w-full aspect-video md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
          <img src={item.image} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">{item.name}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 text-sm font-bold text-slate-500 shadow-sm">
              <MapPin size={16} className="text-emerald-500" /> {item.location}
            </div>
            {item.phone && (
              <a href={`tel:${item.phone}`} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 text-sm font-bold text-emerald-700 shadow-sm hover:bg-emerald-100 transition-colors">
                <Phone size={16} /> {item.phone}
              </a>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-800 border-l-6 border-emerald-600 pl-4">সাধারণ তথ্য</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.establishmentYear && (
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="font-bold text-slate-500">প্রতিষ্ঠার সাল</span>
                <span className="font-black text-emerald-600"> {item.establishmentYear}</span>
              </div>
            )}
            {item.infoSections?.flatMap(s => s.fields).map((field, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="font-bold text-slate-500">{field.label}</span>
                <span className="font-black text-slate-800">{field.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-black text-slate-800 border-l-6 border-emerald-600 pl-4">বিস্তারিত বর্ণনা</h3>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line bg-white/60 p-8 sm:p-10 rounded-[2.5rem] shadow-inner border border-white">{item.description}</p>
        </div>

        {item.staff && item.staff.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 border-l-6 border-emerald-600 pl-4">
              {isEducation ? 'শিক্ষকদের তালিকা' : isHospital ? 'ডাক্তারগণের তালিকা' : isUnion ? 'চেয়ারম্যান ও মেম্বারদের তালিকা' : 'দায়িত্বরত ব্যক্তিবর্গ'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.staff.map(s => (
                <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-[1.2rem] hover:border-emerald-500 hover:shadow-lg transition-all shadow-sm group">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-slate-50">
                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-sm font-bold text-slate-800 truncate">{s.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{s.designation}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
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
    <div className="animate-fadeIn max-w-2xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></button>
      <div className="bg-white/90 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl border border-white space-y-10 glass-card">
        <div className="text-center space-y-6">
          <img src={staff.image} className="w-40 h-40 sm:w-48 sm:h-48 rounded-[3rem] object-cover mx-auto border-8 border-white shadow-2xl" alt="" />
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">{staff.name}</h1>
            <p className="px-6 py-2 bg-emerald-600 text-white rounded-full inline-block font-black text-[11px] uppercase tracking-widest">{staff.designation}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {staff.joiningDate && <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center"><span className="text-xs font-black text-slate-400 uppercase tracking-widest">যোগদানের তারিখ</span><span className="font-bold">{staff.joiningDate}</span></div>}
          {staff.educationalQualification && <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">শিক্ষাগত যোগ্যতা</p><p className="font-bold">{staff.educationalQualification}</p></div>}
          {staff.experience && <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">অভিজ্ঞতা</p><p className="font-bold">{staff.experience}</p></div>}
          {staff.address && <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ঠিকানা</p><p className="font-bold">{staff.address}</p></div>}
          {staff.phone && <a href={`tel:${staff.phone}`} className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4 hover:bg-emerald-600 hover:text-white transition-all"><Phone size={20}/><div className="flex-grow"><p className="text-[10px] font-black uppercase tracking-widest opacity-70">ফোন</p><p className="font-black">{staff.phone}</p></div></a>}
        </div>
        <div className="flex justify-center gap-4 pt-4 border-t border-slate-100">
          {staff.facebook && <a href={staff.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></a>}
          {staff.email && <a href={`mailto:${staff.email}`} className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><Mail size={20} /></a>}
        </div>
      </div>
    </div>
  );
};

/* --- ADMIN PANEL COMPONENTS --- */

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f2f5]">
      <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-[3rem] shadow-2xl space-y-8 border border-white">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl"><Lock size={36}/></div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">অ্যাডমিন এক্সেস</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">মীর রাব্বি হোসেন পোর্টাল</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">ইউজারনেম</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-emerald-500 font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">পাসওয়ার্ড</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-emerald-500 font-bold" />
          </div>
          <button onClick={handleLogin} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all">প্রবেশ করুন</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InformationItem[]>([]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin');
    setItems(getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleExport = () => {
    const dataString = `export const INFO_ITEMS: InformationItem[] = ${JSON.stringify(items, null, 2)};`;
    const blob = new Blob([dataString], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.ts';
    link.click();
    alert('ডেটা এক্সপোর্ট সফল হয়েছে! এই ফাইলটি আপনার প্রজেক্টের data.ts এর সাথে পরিবর্তন করুন এবং গিটহাবে পুশ করুন।');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-200 gap-4 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center"><LayoutDashboard size={24}/></div>
           <div>
             <h1 className="text-xl font-black uppercase tracking-tight">মেইন ড্যাশবোর্ড</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase">তথ্য নিয়ন্ত্রণ কেন্দ্র</p>
           </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => navigate('/admin/item/new')} className="flex-grow sm:flex-none px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-xl shadow-emerald-100 active:scale-95 transition-all"><Plus size={18}/> নতুন তথ্য যোগ</button>
          <button onClick={handleExport} className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors flex items-center gap-2" title="GitHub Sync"><Download size={18}/></button>
          <button onClick={handleLogout} className="px-4 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-100 transition-colors" title="Logout"><LogOut size={18}/></button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm space-y-3 group hover:shadow-lg transition-all">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <img src={i.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
            </div>
            <div className="px-1">
              <h3 className="font-black text-slate-800 truncate text-xs">{i.name}</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{i.categoryId}</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => navigate(`/admin/item/edit/${i.id}`)} className="flex-grow py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all">এডিট</button>
              <button onClick={() => { if(confirm('ডিলিট করতে চান?')) { const u = items.filter(x => x.id !== i.id); setItems(u); setStorage('items', u); } }} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminItemEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Partial<InformationItem>>({
    id: id || Date.now().toString(),
    categoryId: CategoryId.EDUCATION,
    name: '', image: '', description: '', location: '', phone: '',
    infoSections: [], staff: [], establishmentYear: ''
  });

  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);

  useEffect(() => {
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const found = existing.find(i => i.id === id);
    if (found) setItem(found);
  }, [id]);

  const save = () => {
    const existing = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
    const updated = id ? existing.map(i => i.id === id ? item as InformationItem : i) : [...existing, item as InformationItem];
    setStorage('items', updated);
    navigate('/admin/dashboard');
  };

  const isEducation = item.categoryId === CategoryId.EDUCATION;
  const isHospital = item.categoryId === CategoryId.HOSPITAL;
  const isUnion = item.categoryId === CategoryId.UNION;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 pb-40 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></button>
        <h2 className="text-2xl font-black tracking-tight text-slate-800">{id ? 'তথ্য সম্পাদন' : 'নতুন তথ্য যুক্ত করুন'}</h2>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">প্রধান ক্যাটাগরি</label>
            <select value={item.categoryId} onChange={e => setItem({...item, categoryId: e.target.value as CategoryId, subCategoryId: undefined})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500">
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">সাব-ক্যাটাগরি</label>
            <select value={item.subCategoryId || ''} onChange={e => setItem({...item, subCategoryId: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500">
              <option value="">নির্বাচন করুন</option>
              {categories.find(c => c.id === item.categoryId)?.subCategories?.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">নাম</label>
            <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">ছবির লিঙ্ক (URL)</label>
            <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">প্রতিষ্ঠার সাল</label>
            <input value={item.establishmentYear} onChange={e => setItem({...item, establishmentYear: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">অবস্থান/ঠিকানা</label>
            <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">অফিসিয়াল ফোন</label>
            <input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">বিস্তারিত বর্ণনা</label>
          <textarea rows={6} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 font-bold outline-none focus:border-emerald-500" />
        </div>

        {/* Dynamic Staff/Personnel Section */}
        <div className="space-y-6 pt-10 border-t border-slate-100">
           <div className="flex justify-between items-center">
             <h3 className="text-xl font-black text-slate-800">
               {isEducation ? 'শিক্ষকদের প্রোফাইল' : isHospital ? 'ডাক্তারদের প্রোফাইল' : isUnion ? 'চেয়ারম্যান ও মেম্বারদের প্রোফাইল' : 'ব্যক্তিবর্গের প্রোফাইল'}
             </h3>
             <button onClick={() => setItem({...item, staff: [...(item.staff || []), { id: Date.now().toString(), name: '', designation: '', image: '' }]})} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest">+ প্রোফাইল যোগ করুন</button>
           </div>
           
           <div className="space-y-4">
             {item.staff?.map(s => (
               <div key={s.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button onClick={() => setItem({...item, staff: item.staff?.filter(st => st.id !== s.id)})} className="absolute -top-3 -right-3 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg"><Trash2 size={14}/></button>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">নাম</label><input value={s.name} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, name: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">পদবী</label><input value={s.designation} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, designation: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">যোগদানের তারিখ</label><input value={s.joiningDate} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, joiningDate: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">ছবি URL</label><input value={s.image} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, image: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="col-span-full space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">শিক্ষাগত যোগ্যতা/ডিগ্রি</label><input value={s.educationalQualification} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, educationalQualification: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">মোবাইল</label><input value={s.phone} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, phone: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
                 <div className="space-y-1"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">ফেসবুক লিংক</label><input value={s.facebook} onChange={e => setItem({...item, staff: item.staff?.map(st => st.id === s.id ? {...st, facebook: e.target.value} : st)})} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold text-sm" /></div>
               </div>
             ))}
           </div>
        </div>

        <button onClick={save} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-4">
           <Save size={28}/> সংরক্ষণ ও আপডেট করুন
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
