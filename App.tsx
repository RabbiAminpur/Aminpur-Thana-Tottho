
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
  ArrowLeft, BookOpen, Award, Briefcase, Home, Clock
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
    <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-amber-200 rounded-full animate-blob-vibrant"></div>
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
            <LayoutDashboard size={18} /> হোম পেজ
          </Link>
          <Link to="/admin" className="flex items-center gap-3 p-3.5 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 transition-colors">
            <Lock size={18} /> এডমিন লগইন
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
  
  // Custom logic for the requested layouts
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
  const list = items.filter(i => {
    const isMainCat = i.categoryId === categoryId;
    if (!isMainCat) return false;
    if (!activeSubId) return true;
    return i.subCategoryId === activeSubId;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => hasSubCategories ? setActiveSubId(null) : navigate(-1)} 
            className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all"
          >
            {hasSubCategories ? <ArrowLeft size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900">
              {hasSubCategories ? activeSubTitle : category.title}
            </h1>
            <div className={`h-1.5 w-16 ${category.color} rounded-full`}></div>
          </div>
        </div>
        
        {hasSubCategories && (
          <button 
            onClick={() => setActiveSubId(null)}
            className="px-4 py-2 bg-white text-slate-600 rounded-xl font-black text-xs border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Filter size={14} /> বিভাগ পরিবর্তন
          </button>
        )}
      </div>

      <div className={`grid ${isSpecialLayout ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-4 sm:gap-6`}>
        {list.length > 0 ? list.map(item => (
          isSpecialLayout ? (
            /* Special Centered Layout (Education, Hospital, Citizen, Transport, Union) */
            <Link 
              key={item.id} 
              to={`/detail/${item.id}`} 
              className={`flex flex-col items-center p-4 bg-white/80 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-xl active:scale-[0.98] hover:-translate-y-1 transition-all duration-300 group glass-card text-center`}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[5px] overflow-hidden shadow-sm mb-4 border border-slate-100 bg-slate-50">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.name} 
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors mb-2">
                {item.name}
              </h3>
              <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold">
                <MapPin size={10} className="text-emerald-400" />
                <span className="truncate max-w-[120px]">{item.location}</span>
              </div>
            </Link>
          ) : (
            /* Standard Layout */
            <Link 
              key={item.id} 
              to={`/detail/${item.id}`} 
              className={`flex items-center p-2.5 bg-white/80 rounded-3xl border border-slate-200 hover:bg-white hover:shadow-xl active:scale-[0.98] hover:-translate-y-1 transition-all duration-300 group glass-card overflow-hidden`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 border-2 border-white bg-slate-50">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.name} 
                />
              </div>
              <div className="flex-grow min-w-0 pl-4 pr-1">
                <h3 className="text-md sm:text-lg font-black text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                  <MapPin size={10} className="text-emerald-400" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
              <div className="pr-3 text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
                <ChevronRight size={20} />
              </div>
            </Link>
          )
        )) : (
          <div className="col-span-full py-20 text-center bg-white/40 rounded-[2.5rem] border border-dashed border-slate-200 backdrop-blur-sm">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <Info size={32} />
             </div>
             <p className="text-slate-400 font-black text-lg">বর্তমানে কোনো তথ্য নেই</p>
             <button onClick={() => hasSubCategories ? setActiveSubId(null) : navigate(-1)} className="mt-4 text-emerald-600 font-bold hover:underline">ফিরে যান</button>
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

  const isEducation = item.categoryId === CategoryId.EDUCATION;
  const isHospital = item.categoryId === CategoryId.HOSPITAL;
  const isUnion = item.categoryId === CategoryId.UNION;
  const isCitizen = item.categoryId === CategoryId.CITIZEN_SERVICE;
  const isTransport = item.categoryId === CategoryId.TRANSPORT;
  const isSpecialGrid = isEducation || isHospital || isUnion || isCitizen || isTransport;

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

        {/* Info Grid - 2 Columns for Special categories */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-800 border-l-6 border-emerald-600 pl-4">সাধারণ তথ্য</h3>
          <div className={`grid ${isSpecialGrid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-4`}>
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

        {/* Staff/Profile List */}
        {item.staff && item.staff.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 border-l-6 border-emerald-600 pl-4">
              {isEducation ? 'শিক্ষকদের তালিকা' : isHospital ? 'ডাক্তারগণের তালিকা' : isUnion ? 'চেয়ারম্যান ও মেম্বারদের তালিকা' : 'দায়িত্বরত ব্যক্তিবর্গ'}
            </h3>
            <div className={`grid ${isUnion ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-3 sm:gap-4`}>
              {item.staff.map(s => (
                <Link 
                  key={s.id} 
                  to={`/detail/${item.id}/staff/${s.id}`} 
                  className={`flex items-center gap-3 p-3 sm:p-4 bg-white border border-slate-200 rounded-[1.2rem] hover:border-emerald-500 hover:shadow-lg transition-all shadow-sm group glass-card overflow-hidden`}
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-slate-50">
                    <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-sm sm:text-base font-bold text-slate-800 truncate group-hover:text-emerald-700">{s.name}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-emerald-600 mt-0.5 truncate uppercase tracking-tighter sm:tracking-widest">{s.designation}</p>
                  </div>
                  <div className="text-slate-300 flex-shrink-0">
                    <ChevronRight size={16} />
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
    <div className="animate-fadeIn max-w-2xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></button>
      
      <div className="bg-white/90 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl border border-white space-y-10 glass-card">
        {/* Top Header Card */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <img src={staff.image} className="w-40 h-40 sm:w-48 sm:h-48 rounded-[3rem] object-cover mx-auto border-8 border-white shadow-2xl bg-white" alt="" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
               <UserIcon size={22} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">{staff.name}</h1>
            <p className="px-6 py-2 bg-emerald-600 text-white rounded-full inline-block font-black text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-200">
              {staff.designation}
            </p>
          </div>
        </div>

        {/* Detailed Profile Information */}
        <div className="space-y-4">
          {staff.joiningDate && (
            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">দায়িত্ব গ্রহণের তারিখ</p>
                <p className="text-slate-800 font-bold text-lg">{staff.joiningDate}</p>
              </div>
            </div>
          )}

          {staff.educationalQualification && (
            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BookOpen size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">শিক্ষাগত যোগ্যতা / ডিগ্রি</p>
                <p className="text-slate-800 font-bold text-lg">{staff.educationalQualification}</p>
              </div>
            </div>
          )}

          {staff.experience && (
            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">অভিজ্ঞতা</p>
                <p className="text-slate-800 font-bold text-lg">{staff.experience}</p>
              </div>
            </div>
          )}

          {staff.address && (
            <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Home size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ঠিকানা</p>
                <p className="text-slate-800 font-bold text-lg">{staff.address}</p>
              </div>
            </div>
          )}

          {staff.phone && (
             <a href={`tel:${staff.phone}`} className="flex gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 group hover:bg-emerald-600 transition-all">
                <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest group-hover:text-emerald-200">ফোন নাম্বার</p>
                  <p className="text-emerald-700 font-bold text-lg group-hover:text-white">{staff.phone}</p>
                </div>
             </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-4 border-t border-slate-100">
          {staff.facebook && (
            <a href={staff.facebook} target="_blank" rel="noreferrer" className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              <Facebook size={24} />
            </a>
          )}
          {staff.email && (
            <a href={`mailto:${staff.email}`} className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <Mail size={24} />
            </a>
          )}
          {staff.website && (
            <a href={staff.website} target="_blank" rel="noreferrer" className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all shadow-sm">
              <Globe size={24} />
            </a>
          )}
        </div>

        {staff.bio && (
          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-bold leading-relaxed italic">"{staff.bio}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ... Admin components stay largely the same but would need fields for joiningDate ...
// For brevity, I'll update the staff editor part of AdminItemEditor

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InformationItem[]>([]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin');
    setItems(getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS));
  }, [navigate]);

  const handleDelete = (id: string) => {
    if (window.confirm('নিশ্চিত?')) {
      const updated = items.filter(i => i.id !== id);
      setItems(updated);
      setStorage('items', updated);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-200 gap-4 shadow-sm">
        <h1 className="text-xl font-black uppercase tracking-tight">এডমিন প্যানেল</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate('/admin/item/new')} className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 text-sm shadow-xl shadow-emerald-100 transition-transform active:scale-95"><Plus size={18}/> নতুন যোগ</button>
          <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }} className="px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-colors hover:bg-slate-200">লগআউট</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(i => (
          <div key={i.id} className="bg-white p-5 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4 hover:shadow-lg transition-all group">
            <div className="relative h-40 overflow-hidden rounded-[1.8rem] bg-slate-50">
              <img src={i.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
            </div>
            <h3 className="font-black text-slate-800 truncate text-sm px-2">{i.name}</h3>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/admin/item/edit/${i.id}`)} className="flex-grow py-3 bg-slate-900 text-white rounded-xl font-bold text-xs transition-transform active:scale-95">এডিট</button>
              <button onClick={() => handleDelete(i.id)} className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center transition-colors hover:bg-rose-100"><Trash2 size={18}/></button>
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
    categoryId: CategoryId.OTHERS,
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

  const addSection = () => setItem({...item, infoSections: [...(item.infoSections || []), { id: Date.now().toString(), title: 'নতুন ছক', fields: [] }]});
  const addStaff = () => setItem({...item, staff: [...(item.staff || []), { id: Date.now().toString(), name: '', designation: '', image: '' }]});

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 pb-40">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></button>
      <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl space-y-10">
        <h2 className="text-3xl font-black tracking-tight">{id ? 'এডিট মোড' : 'নতুন সংযোজন'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ক্যাটাগরি</label>
            <select 
              value={item.categoryId} 
              onChange={e => setItem({...item, categoryId: e.target.value as CategoryId, subCategoryId: undefined})} 
              className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          {item.categoryId && categories.find(c => c.id === item.categoryId)?.subCategories && (
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">সাব-ক্যাটাগরি</label>
              <select 
                value={item.subCategoryId || ''} 
                onChange={e => setItem({...item, subCategoryId: e.target.value})} 
                className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="">নির্বাচন করুন</option>
                {categories.find(c => c.id === item.categoryId)?.subCategories?.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">প্রতিষ্ঠানের নাম</label>
            <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ছবির URL</label>
            <input value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">প্রতিষ্ঠার সাল</label>
            <input value={item.establishmentYear} onChange={e => setItem({...item, establishmentYear: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">অবস্থান</label>
            <input value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ফোন নম্বর</label>
            <input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">বিস্তারিত বর্ণনা</label>
          <textarea rows={5} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 font-bold outline-none focus:border-emerald-500 transition-colors" />
        </div>

        <div className="space-y-6 pt-10 border-t border-slate-100">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-black text-xl">অতিরিক্ত তথ্য (ছক)</h3>
            <button onClick={addSection} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-100 active:scale-95 transition-transform">নতুন ছক যোগ করুন</button>
          </div>
          {item.infoSections?.map(s => (
            <div key={s.id} className="p-8 bg-slate-50 rounded-[2.5rem] space-y-5 border border-slate-100">
              <input value={s.title} onChange={e => {
                const updated = item.infoSections?.map(sec => sec.id === s.id ? {...sec, title: e.target.value} : sec);
                setItem({...item, infoSections: updated});
              }} className="w-full p-4 bg-white rounded-xl font-black text-indigo-700 outline-none border-2 border-slate-200" />
              {s.fields.map((f, fIdx) => (
                <div key={fIdx} className="flex gap-3">
                  <input placeholder="লেবেল" value={f.label} onChange={e => {
                    const fields = s.fields.map((field, idx) => idx === fIdx ? {...field, label: e.target.value} : field);
                    const sections = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields} : sec);
                    setItem({...item, infoSections: sections});
                  }} className="flex-grow p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
                  <input placeholder="তথ্য" value={f.value} onChange={e => {
                    const fields = s.fields.map((field, idx) => idx === fIdx ? {...field, value: e.target.value} : field);
                    const sections = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields} : sec);
                    setItem({...item, infoSections: sections});
                  }} className="flex-grow p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
                </div>
              ))}
              <button onClick={() => {
                const updated = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields: [...sec.fields, {label: '', value: ''}]} : sec);
                setItem({...item, infoSections: updated});
              }} className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider px-2 hover:bg-indigo-50 py-2 rounded-lg transition-colors">+ নতুন Row</button>
            </div>
          ))}
        </div>

        <div className="space-y-6 pt-10 border-t border-slate-100">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-black text-xl">ব্যক্তিবর্গ / চেয়ারম্যান-মেম্বার</h3>
            <button onClick={addStaff} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-100 active:scale-95 transition-transform">প্রোফাইল যোগ করুন</button>
          </div>
          {item.staff?.map(s => (
            <div key={s.id} className="p-8 bg-slate-50 rounded-[2.5rem] grid grid-cols-1 sm:grid-cols-2 gap-5 border border-slate-100 relative group/staff">
              <input placeholder="নাম" value={s.name} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, name: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="পদবী" value={s.designation} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, designation: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="দায়িত্ব গ্রহণের তারিখ" value={s.joiningDate} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, joiningDate: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="ছবি URL" value={s.image} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, image: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="শিক্ষাগত যোগ্যতা" value={s.educationalQualification} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, educationalQualification: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="অভিজ্ঞতা" value={s.experience} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, experience: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="ঠিকানা" value={s.address} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, address: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100 col-span-full" />
              <input placeholder="মোবাইল" value={s.phone} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, phone: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
              <input placeholder="ফেসবুক লিঙ্ক" value={s.facebook} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, facebook: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-4 bg-white rounded-xl font-bold text-sm border-2 border-slate-100" />
            </div>
          ))}
        </div>

        <button onClick={save} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 active:scale-95">
           <Save size={26}/> সংরক্ষণ করুন
        </button>
      </div>
    </div>
  );
};

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <AnimatedBackground />
      <div className="w-full max-sm bg-white/90 p-12 rounded-[4rem] shadow-2xl border border-white text-center space-y-10 glass-card">
        <div className="w-20 h-20 bg-emerald-600 text-white rounded-[2.2rem] flex items-center justify-center mx-auto shadow-xl"><Lock size={32}/></div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">এডমিন এক্সেস</h2>
          <p className="text-xs font-bold text-slate-400">নিরাপত্তার জন্য পাসওয়ার্ড প্রদান করুন</p>
        </div>
        <input type="password" placeholder="••••••••" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-slate-100 text-center font-black text-2xl tracking-[0.5em] focus:border-emerald-500 transition-colors" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => { if(password === 'admin123') { localStorage.setItem('isAdmin', 'true'); navigate('/admin/dashboard'); } else alert('ভুল পাসওয়ার্ড!'); }} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform">লগইন করুন</button>
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
