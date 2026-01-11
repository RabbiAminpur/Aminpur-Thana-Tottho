
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Newspaper, Bus, LayoutDashboard, GraduationCap, 
  Hospital, Stethoscope, Shield, Building, Building2, 
  Package, Camera, Share2, Mic, Flame, ShoppingCart, 
  PlusCircle, Info, Mail, Lock, Sparkles, ChevronRight, 
  Calendar, UserCheck, Globe, Facebook, Plus, Trash2, 
  Edit, Save, ExternalLink, User as UserIcon
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
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const category = categories.find(c => c.id === categoryId);

  if (!category) return null;

  const list = items.filter(i => i.categoryId === categoryId);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-emerald-600 hover:text-white transition-all">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-slate-900">{category.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.length > 0 ? list.map(item => (
          <Link key={item.id} to={`/detail/${item.id}`} className="flex items-start p-4 bg-white/90 rounded-3xl border border-white hover:border-emerald-400 transition-all group gap-4 glass-card shadow-sm hover:shadow-lg">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="flex-grow min-w-0 py-1">
              <h3 className="text-lg font-black text-slate-800 truncate">{item.name}</h3>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-500 text-[12px] font-bold">
                  <MapPin size={14} className="text-emerald-500" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[12px] font-bold">
                  <Phone size={14} className="text-blue-500" />
                  <span>{item.phone}</span>
                </div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="col-span-full py-20 text-center bg-white/50 rounded-[3rem] border border-white">
             <p className="text-slate-400 font-bold">তথ্য পাওয়া যায়নি</p>
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
    <div className="animate-fadeIn max-w-4xl mx-auto space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>

      <div className="space-y-10">
        <div className="w-full aspect-video md:h-96 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
          <img src={item.image} className="w-full h-full object-cover" alt="" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">{item.name}</h1>

        {item.infoSections?.map(section => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 border-l-4 border-emerald-600 pl-3">{section.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.fields.map((field, idx) => (
                <div key={idx} className="p-5 bg-white/90 rounded-2xl border border-white shadow-sm flex flex-col gap-0.5 glass-card">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{field.label}</span>
                  <span className="text-md font-black text-slate-800">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-800 border-l-4 border-emerald-600 pl-3">বিস্তারিত</h3>
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line bg-white/60 p-8 rounded-[2.5rem] shadow-inner border border-white">{item.description}</p>
        </div>

        {item.staff && item.staff.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 border-l-4 border-emerald-600 pl-3">দায়িত্বরত ব্যক্তিবর্গ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.staff.map(s => (
                <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-4 p-4 bg-white border border-white rounded-[2rem] hover:border-emerald-500 transition-all shadow-sm group glass-card">
                  <img src={s.image} className="w-16 h-16 rounded-2xl object-cover border border-white shadow-sm" alt="" />
                  <div>
                    <p className="font-black text-slate-800 leading-tight group-hover:text-emerald-700">{s.name}</p>
                    <p className="text-[10px] font-black text-emerald-600 mt-1 uppercase tracking-widest">{s.designation}</p>
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
    <div className="animate-fadeIn max-w-xl mx-auto space-y-8">
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>
      <div className="text-center bg-white/80 p-10 rounded-[3.5rem] shadow-2xl border border-white space-y-6 glass-card">
        <img src={staff.image} className="w-40 h-40 rounded-[2.5rem] object-cover mx-auto border-4 border-white shadow-lg" alt="" />
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{staff.name}</h1>
          <p className="mt-3 px-6 py-1.5 bg-emerald-600 text-white rounded-full inline-block font-black text-[10px] uppercase tracking-widest">{staff.designation}</p>
        </div>
        
        <div className="flex justify-center gap-4">
          {staff.phone && <a href={`tel:${staff.phone}`} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 hover:scale-110 transition-transform"><Phone size={20}/></a>}
          {staff.email && <a href={`mailto:${staff.email}`} className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center border border-rose-100 hover:scale-110 transition-transform"><Mail size={20}/></a>}
          {staff.facebook && <a href={staff.facebook} target="_blank" className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100 hover:scale-110 transition-transform"><Facebook size={20}/></a>}
          {staff.website && <a href={staff.website} target="_blank" className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100 hover:scale-110 transition-transform"><Globe size={20}/></a>}
        </div>

        <p className="text-slate-600 text-lg leading-relaxed border-t border-slate-100 pt-6">{staff.bio || 'বিস্তারিত তথ্য শীঘ্রই যুক্ত করা হবে।'}</p>
      </div>
    </div>
  );
};

// --- ADMIN PANELS ---
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
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 gap-4 shadow-sm">
        <h1 className="text-xl font-black uppercase">এডমিন প্যানেল</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate('/admin/item/new')} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg"><Plus size={18}/> নতুন যোগ</button>
          <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin'); }} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm">লগআউট</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
            <img src={i.image} className="w-full h-32 object-cover rounded-2xl" alt="" />
            <h3 className="font-black text-slate-800 truncate text-sm">{i.name}</h3>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/admin/item/edit/${i.id}`)} className="flex-grow py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs">এডিট</button>
              {/* FIXED: Changed 'id' to 'i.id' as 'id' was not defined in this scope */}
              <button onClick={() => handleDelete(i.id)} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center"><Trash2 size={16}/></button>
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
    infoSections: [], staff: []
  });

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
      <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200"><ChevronLeft size={20}/></button>
      <div className="bg-white p-8 sm:p-12 rounded-[3rem] border border-slate-200 shadow-2xl space-y-8">
        <h2 className="text-2xl font-black">{id ? 'এডিট মোড' : 'নতুন সংযোজন'}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="প্রতিষ্ঠানের নাম" value={item.name} onChange={e => setItem({...item, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold outline-none focus:border-emerald-500" />
          <input placeholder="ছবির URL" value={item.image} onChange={e => setItem({...item, image: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold outline-none focus:border-emerald-500" />
          <input placeholder="অবস্থান" value={item.location} onChange={e => setItem({...item, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold outline-none focus:border-emerald-500" />
          <input placeholder="ফোন নম্বর" value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold outline-none focus:border-emerald-500" />
        </div>

        <textarea placeholder="বিস্তারিত বর্ণনা" rows={5} value={item.description} onChange={e => setItem({...item, description: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold outline-none focus:border-emerald-500" />

        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <h3 className="font-black">অতিরিক্ত তথ্য (ছক)</h3>
            <button onClick={addSection} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs">নতুন ছক যোগ করুন</button>
          </div>
          {item.infoSections?.map(s => (
            <div key={s.id} className="p-6 bg-slate-50 rounded-2xl space-y-4 border border-slate-200">
              <input value={s.title} onChange={e => {
                const updated = item.infoSections?.map(sec => sec.id === s.id ? {...sec, title: e.target.value} : sec);
                setItem({...item, infoSections: updated});
              }} className="w-full p-3 bg-white rounded-lg font-black text-indigo-700 outline-none" />
              {s.fields.map((f, fIdx) => (
                <div key={fIdx} className="flex gap-2">
                  <input placeholder="লেবেল" value={f.label} onChange={e => {
                    const fields = s.fields.map((field, idx) => idx === fIdx ? {...field, label: e.target.value} : field);
                    const sections = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields} : sec);
                    setItem({...item, infoSections: sections});
                  }} className="flex-grow p-3 bg-white rounded-lg font-bold text-sm" />
                  <input placeholder="তথ্য" value={f.value} onChange={e => {
                    const fields = s.fields.map((field, idx) => idx === fIdx ? {...field, value: e.target.value} : field);
                    const sections = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields} : sec);
                    setItem({...item, infoSections: sections});
                  }} className="flex-grow p-3 bg-white rounded-lg font-bold text-sm" />
                </div>
              ))}
              <button onClick={() => {
                const updated = item.infoSections?.map(sec => sec.id === s.id ? {...sec, fields: [...sec.fields, {label: '', value: ''}]} : sec);
                setItem({...item, infoSections: updated});
              }} className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider">+ নতুন Row</button>
            </div>
          ))}
        </div>

        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <h3 className="font-black">ব্যক্তিবর্গ</h3>
            <button onClick={addStaff} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs">প্রোফাইল যোগ করুন</button>
          </div>
          {item.staff?.map(s => (
            <div key={s.id} className="p-6 bg-slate-50 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 border border-slate-200">
              <input placeholder="নাম" value={s.name} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, name: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-3 bg-white rounded-lg font-bold text-sm" />
              <input placeholder="পদবী" value={s.designation} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, designation: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-3 bg-white rounded-lg font-bold text-sm" />
              <input placeholder="ছবি URL" value={s.image} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, image: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-3 bg-white rounded-lg font-bold text-sm col-span-full" />
              <input placeholder="মোবাইল" value={s.phone} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, phone: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-3 bg-white rounded-lg font-bold text-sm" />
              <input placeholder="ফেসবুক লিঙ্ক" value={s.facebook} onChange={e => {
                const updated = item.staff?.map(st => st.id === s.id ? {...st, facebook: e.target.value} : st);
                setItem({...item, staff: updated});
              }} className="p-3 bg-white rounded-lg font-bold text-sm" />
            </div>
          ))}
        </div>

        <button onClick={save} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
           <Save size={22}/> সংরক্ষণ করুন
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
      <div className="w-full max-w-sm bg-white/90 p-10 rounded-[3rem] shadow-2xl border border-white text-center space-y-8 glass-card">
        <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl"><Lock size={28}/></div>
        <h2 className="text-xl font-black">এডমিন এক্সেস</h2>
        <input type="password" placeholder="পাসওয়ার্ড" className="w-full p-4 bg-slate-50 rounded-xl outline-none border-2 border-slate-100 text-center font-black text-lg tracking-widest" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => { if(password === 'admin123') { localStorage.setItem('isAdmin', 'true'); navigate('/admin/dashboard'); } else alert('ভুল পাসওয়ার্ড!'); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black">লগইন</button>
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
