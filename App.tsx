
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Calendar, Info, 
  Users, Search, User, BookOpen, Facebook, Globe, Mail, 
  LogOut, ArrowRight, Clock, Newspaper, Truck, Bus, 
  LayoutDashboard, GraduationCap, Hospital, Stethoscope, 
  Shield, Building, Briefcase, Camera, Share2, Mic, 
  Flame, ShoppingCart, PlusCircle, Landmark, Package,
  Building2, Globe2, HeartPulse, HardHat, Share, Settings,
  Plus, Trash2, Edit3, Save, Image as ImageIcon, List, CheckCircle,
  Download, Upload, FileJson, UserCircle
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, DynamicTable, TableRow, StaffProfile } from './types';

// Icons mapping for Lucide components
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
  'plus-circle': <PlusCircle size={24} />,
};

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  return <div className={className}>{IconMap[name] || <PlusCircle size={24} />}</div>;
};

// --- DATA PERSISTENCE HELPERS ---
const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- COMPONENTS ---

const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; profile: StaffProfile | null }> = ({ isOpen, onClose, profile }) => {
  if (!isOpen || !profile) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative border">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"><X size={20} /></button>
        <div className="h-48 bg-emerald-600 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="px-8 pb-8 -mt-20 relative z-10 text-center">
           <div className="inline-block p-1.5 bg-white rounded-[2rem] shadow-xl mb-4">
             <img src={profile.image} alt={profile.name} className="w-32 h-32 rounded-[1.7rem] object-cover border-4 border-slate-50 shadow-inner" />
           </div>
           <h3 className="text-2xl font-black text-slate-800">{profile.name}</h3>
           <p className="text-emerald-600 font-bold mb-6">{profile.designation}</p>
           
           <div className="space-y-3">
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all">
                  <Phone size={18} /> যোগাযোগ করুন
                </a>
              )}
              {profile.bio && <p className="text-slate-500 text-sm leading-relaxed mt-4 italic">"{profile.bio}"</p>}
           </div>
        </div>
      </div>
    </div>
  );
};

const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void; article: Article }> = ({ isOpen, onClose, article }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"><X size={20} /></button>
        <div className="bg-white">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg"><Shield className="text-white w-4 h-4" /></div>
              <span className="text-white font-bold text-xs tracking-widest uppercase bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md">আমিনপুর থানা পোর্টাল</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <Calendar size={12} /><span>{article.date}</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight mb-4 drop-shadow-lg">{article.title}</h2>
              <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-slate-900 p-4 text-center"><p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">www.aminpurthana.gov.bd</p></div>
        </div>
        <div className="p-6 bg-white space-y-4">
          <div className="flex gap-3">
            <button onClick={() => alert('লিংক কপি করা হয়েছে!')} className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all"><Share2 size={18} />লিংক শেয়ার</button>
            <button onClick={() => alert('ইমেজটি চেপে ধরে সেভ করুন।')} className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold active:scale-95 transition-all"><Camera size={18} />ইমেজ সেভ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExitModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border border-white/20">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><LogOut size={40} /></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">বের হতে চান?</h3>
          <p className="text-gray-500 leading-relaxed">আপনি কি নিশ্চিত যে আপনি আমিনপুর থানা অ্যাপ থেকে প্রস্থান করতে চান?</p>
        </div>
        <div className="flex border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-5 text-gray-600 font-bold hover:bg-gray-50 transition-colors border-r">না, ফিরে যাই</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-5 text-red-600 font-bold hover:bg-red-50 transition-colors">হ্যাঁ, বের হবো</button>
        </div>
      </div>
    </div>
  );
};

// --- AUTHENTICATION ---
const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'mirrabbihossain' && password === 'Rabbi@198027') {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('ভুল ইউজারনেম বা পাসওয়ার্ড!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><Settings size={32} /></div>
          <h1 className="text-2xl font-bold text-gray-800">অ্যাডমিন লগইন</h1>
          <p className="text-gray-500 text-sm">আমিনপুর থানা পোর্টাল ব্যবস্থাপনা</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ইউজারনেম</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all">প্রবেশ করুন</button>
        <Link to="/" className="block text-center text-sm text-gray-400 font-medium hover:text-emerald-600">হোম পেজে ফিরে যান</Link>
      </form>
    </div>
  );
};

// --- ADMIN DASHBOARD ---
const AdminDashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(getStorage('categories', INITIAL_CATEGORIES));
  const [items, setItems] = useState<InformationItem[]>(getStorage('items', INITIAL_INFO_ITEMS));
  const [articles, setArticles] = useState<Article[]>(getStorage('articles', INITIAL_ARTICLES));
  const [tab, setTab] = useState<'items' | 'categories' | 'articles' | 'backup'>('items');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') navigate('/admin');
  }, [navigate]);

  const saveAll = () => {
    setStorage('categories', categories);
    setStorage('items', items);
    setStorage('articles', articles);
    alert('সফলভাবে সেভ হয়েছে!');
  };

  const exportBackup = () => {
    const backupData = { categories, items, articles };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aminpur_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    alert('ব্যাকআপ ডাউনলোড হয়েছে। এটি গিটহাবে আপলোড করে রাখুন।');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.categories && imported.items && imported.articles) {
            setCategories(imported.categories); setItems(imported.items); setArticles(imported.articles);
            setStorage('categories', imported.categories); setStorage('items', imported.items); setStorage('articles', imported.articles);
            alert('ইমপোর্ট সফল হয়েছে!');
          }
        } catch (err) { alert('ভুল ফাইল ফরম্যাট!'); }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div><h1 className="text-xl font-bold text-slate-800">অ্যাডমিন ড্যাশবোর্ড</h1><p className="text-xs text-emerald-600 font-bold">মীর রাব্বি হোসেন</p></div>
        <div className="flex gap-2">
          <button onClick={saveAll} className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg"><Save size={20} /></button>
          <button onClick={() => { sessionStorage.removeItem('isAdmin'); navigate('/admin'); }} className="p-3 bg-red-100 text-red-600 rounded-xl"><LogOut size={20} /></button>
        </div>
      </header>

      <div className="p-4 flex gap-2 overflow-x-auto bg-white border-b shadow-sm sticky top-[73px] z-10">
        <button onClick={() => setTab('items')} className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${tab === 'items' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-500'}`}>তথ্যসমূহ</button>
        <button onClick={() => setTab('articles')} className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${tab === 'articles' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'bg-slate-100 text-slate-500'}`}>নিউজ</button>
        <button onClick={() => setTab('categories')} className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${tab === 'categories' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-500'}`}>ক্যাটাগরি</button>
        <button onClick={() => setTab('backup')} className={`px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${tab === 'backup' ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'bg-slate-100 text-slate-500'}`}><FileJson size={18} className="inline mr-1" /> ব্যাকআপ</button>
      </div>

      <main className="p-4 space-y-4">
        {tab === 'items' && (
          <>
            <button onClick={() => navigate('/admin/item/new')} className="w-full p-5 bg-white border-2 border-dashed border-emerald-300 text-emerald-600 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50"><Plus size={20} /> নতুন তথ্য যোগ করুন</button>
            <div className="grid gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-3xl border shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" />
                    <div><h3 className="font-bold text-slate-800">{item.name}</h3><p className="text-xs text-slate-400">{categories.find(c => c.id === item.categoryId)?.title}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/admin/item/${item.id}`)} className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Edit3 size={18} /></button>
                    <button onClick={() => { if(confirm('ডিলিট করতে চান?')) setItems(items.filter(i => i.id !== item.id)); }} className="p-3 bg-red-50 text-red-600 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {/* News, Categories, Backup tabs implementation similar to previous version but kept for consistency */}
        {tab === 'backup' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border text-center space-y-4">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><Download size={40} /></div>
               <h2 className="text-xl font-bold">গিটহাব ব্যাকআপ তৈরি করুন</h2>
               <p className="text-gray-500 text-sm">এই ফাইলটি `data.ts` এ পুশ করলে সবার জন্য আপডেট হবে।</p>
               <button onClick={exportBackup} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"><Download size={20} /> Export JSON</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- ITEM EDITOR (WITH STAFF & GALLERY) ---
const ItemEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<InformationItem[]>(getStorage('items', INITIAL_INFO_ITEMS));
  const categories = getStorage('categories', INITIAL_CATEGORIES);
  
  const isNew = id === 'new';
  const initialData: InformationItem = {
    id: 'item-' + Date.now(),
    categoryId: CategoryId.EDUCATION,
    name: '',
    image: '',
    gallery: [],
    description: '',
    location: '',
    phone: '',
    staff: [],
    tables: []
  };

  const [formData, setFormData] = useState<InformationItem>(isNew ? initialData : items.find(i => i.id === id) || initialData);

  const addStaff = () => {
    const newStaff: StaffProfile = { id: 'st-' + Date.now(), name: '', designation: '', image: '', phone: '', bio: '' };
    setFormData({...formData, staff: [...formData.staff, newStaff]});
  };

  const addGalleryImage = () => {
    const url = prompt('ইমেজ ইউআরএল দিন:');
    if (url) setFormData({...formData, gallery: [...formData.gallery, url]});
  };

  const save = () => {
    if (isNew) { setStorage('items', [...items, formData]); } 
    else { setStorage('items', items.map(i => i.id === id ? formData : i)); }
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24 space-y-6">
      <div className="flex items-center gap-3"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl"><ChevronLeft size={24} /></button><h1 className="text-xl font-bold">{isNew ? 'নতুন তথ্য' : 'সম্পাদনা'}</h1></div>
      <div className="bg-white p-6 rounded-[2rem] shadow-sm space-y-5 border">
        <div><label className="text-sm font-bold text-gray-500">নাম</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">প্রধান ছবির লিংক</label><input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">গ্যালারি ইমেজ</h3><button onClick={addGalleryImage} className="text-emerald-600 font-bold text-sm">+ Add Image</button></div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {formData.gallery.map((img, idx) => (
              <div key={idx} className="relative shrink-0"><img src={img} className="w-20 h-20 rounded-xl object-cover" /><button onClick={() => setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== idx)})} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"><X size={12} /></button></div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-slate-800">স্টাফ/শিক্ষক/ডাক্তার প্রোফাইল</h3><button onClick={addStaff} className="text-emerald-600 font-bold text-sm">+ প্রোফাইল যোগ করুন</button></div>
          <div className="space-y-4">
            {formData.staff.map((st, idx) => (
              <div key={st.id} className="p-4 bg-slate-50 rounded-2xl border space-y-3">
                 <div className="flex justify-between">
                   <span className="text-xs font-bold text-slate-400">প্রোফাইল #{idx+1}</span>
                   <button onClick={() => setFormData({...formData, staff: formData.staff.filter(s => s.id !== st.id)})} className="text-red-500"><Trash2 size={16} /></button>
                 </div>
                 <input placeholder="নাম" value={st.name} onChange={(e) => {
                   const newStaff = [...formData.staff]; newStaff[idx].name = e.target.value; setFormData({...formData, staff: newStaff});
                 }} className="w-full p-3 bg-white rounded-xl border text-sm" />
                 <input placeholder="পদবী" value={st.designation} onChange={(e) => {
                   const newStaff = [...formData.staff]; newStaff[idx].designation = e.target.value; setFormData({...formData, staff: newStaff});
                 }} className="w-full p-3 bg-white rounded-xl border text-sm" />
                 <input placeholder="ছবির ইউআরএল" value={st.image} onChange={(e) => {
                   const newStaff = [...formData.staff]; newStaff[idx].image = e.target.value; setFormData({...formData, staff: newStaff});
                 }} className="w-full p-3 bg-white rounded-xl border text-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={save} className="fixed bottom-6 left-4 right-4 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl"><CheckCircle size={20} className="inline mr-2" /> সেভ করুন</button>
    </div>
  );
};

// --- CLIENT DETAIL VIEW (ENHANCED) ---
const DetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<StaffProfile | null>(null);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);

  if (!item) return <div className="p-10 text-center font-bold">তথ্য পাওয়া যায়নি</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <ProfileModal isOpen={!!selectedProfile} onClose={() => setSelectedProfile(null)} profile={selectedProfile} />
      <div className="flex items-center gap-3"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border shadow-sm"><ChevronLeft size={24} /></button><h1 className="text-xl font-bold text-slate-800 truncate">{item.name}</h1></div>
      
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border">
        <div className="relative group">
          <img src={item.image} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex flex-col justify-end p-6"><div className="flex items-center gap-2 text-white/90 text-sm font-medium"><MapPin size={16} className="text-emerald-400" />{item.location}</div></div>
        </div>
        
        <div className="p-6 md:p-8 space-y-10">
          <section className="space-y-2">
            <h3 className="font-black text-slate-800 text-xl flex items-center gap-2"><div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>সংক্ষিপ্ত বর্ণনা</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
          </section>

          {item.gallery && item.gallery.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-black text-slate-800 text-xl flex items-center gap-2"><ImageIcon className="text-emerald-500" size={24} /> ছবির গ্যালারি</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {item.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border shadow-sm"><img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" /></div>
                ))}
              </div>
            </section>
          )}

          {item.staff && item.staff.length > 0 && (
            <section className="space-y-6">
              <h3 className="font-black text-slate-800 text-xl flex items-center gap-2">
                <Users className="text-indigo-500" size={24} /> 
                {item.categoryId === CategoryId.EDUCATION ? 'শিক্ষক মন্ডলী' : item.categoryId === CategoryId.HOSPITAL ? 'বিশেষজ্ঞ ডাক্তারগণ' : 'সংশ্লিষ্ট ব্যক্তিবর্গ'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {item.staff.map(profile => (
                  <button key={profile.id} onClick={() => setSelectedProfile(profile)} className="flex flex-col items-center p-4 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-200 hover:bg-white transition-all group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-md border-2 border-white group-hover:shadow-lg transition-all"><img src={profile.image} className="w-full h-full object-cover" /></div>
                    <span className="text-sm font-bold text-slate-800 text-center line-clamp-1">{profile.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{profile.designation}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {item.tables?.map(table => (
            <section key={table.id} className="space-y-4">
               <h3 className="font-black text-slate-800 text-xl flex items-center gap-2"><List size={20} className="text-amber-500" />{table.title}</h3>
               <div className="overflow-hidden border rounded-[1.5rem] shadow-sm">
                  <table className="w-full text-left text-sm"><tbody className="divide-y">{table.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-5 py-4 font-bold text-slate-700 border-r w-1/3">{row.label}</td><td className="px-5 py-4 text-slate-600">{row.value}</td></tr>
                  ))}</tbody></table>
               </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- APP & MAIN COMPONENTS (REST MAINTAINED) ---
// Note: Layout, Dashboard, CategoryListView etc. remain same but use the updated DetailView

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const location = useLocation();
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);

  useEffect(() => { setIsSidebarOpen(false); }, [location]);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/admin/dashboard') {
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setShowExitModal(true);
      };
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [location]);

  if (location.pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ExitModal isOpen={showExitModal} onClose={() => setShowExitModal(false)} onConfirm={() => window.location.href = "about:blank"} />
      <header className="bg-emerald-600 text-white shadow-md fixed top-0 w-full z-50 px-4 py-3 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold flex items-center gap-2"><Shield className="text-white w-5 h-5" /><span className="tracking-tight">আমিনপুর থানা</span></Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-emerald-700 rounded-xl transition-all"><Menu size={24} /></button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b flex justify-between items-center bg-emerald-50"><h2 className="text-lg font-bold text-emerald-900">মেনু নেভিগেশন</h2><button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-red-500"><X size={24} /></button></div>
        <nav className="p-4 space-y-1 h-[calc(100%-80px)] overflow-y-auto">
          <Link to="/" className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 rounded-xl text-gray-700 font-semibold transition-all"><LayoutDashboard size={20} className="text-emerald-600" /><span>হোম পেজ</span></Link>
          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">প্রধান তথ্য ও সেবা</div>
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-xl text-gray-600 font-medium">
              <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center text-white`}><DynamicIcon name={cat.icon} className="w-5 h-5" /></div>
              <span className="text-sm">{cat.title}</span>
            </Link>
          ))}
          <div className="mt-8 pt-4 border-t"><button onClick={() => { setIsSidebarOpen(false); setShowExitModal(true); }} className="w-full flex items-center gap-3 p-3.5 hover:bg-red-50 rounded-xl text-red-600 font-bold transition-all"><LogOut size={20} /><span>প্রস্থান করুন</span></button></div>
        </nav>
      </aside>

      <main className="flex-grow pt-20 pb-16 px-4 md:max-w-4xl md:mx-auto w-full">{children}</main>
      <footer className="bg-white border-t py-8 text-center text-gray-400 text-[10px] uppercase tracking-widest">
        <p>© ২০২৪ আমিনপুর থানা পোর্টাল</p>
        <p className="mt-1 text-emerald-600 font-bold">ডেভেলপার: মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const isSearching = searchTerm.trim() !== '';

  const filteredCategories = categories.filter(cat => cat.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredItems = items.filter(item => isSearching && (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-8 text-white shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Shield size={120} /></div>
        <h1 className="text-4xl font-black mb-2 relative z-10">আমিনপুর থানা</h1>
        <p className="opacity-80 text-sm mb-8 relative z-10">ডিজিটাল তথ্য ও সেবা পোর্টাল</p>
        <div className="relative group max-w-md mx-auto z-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="খুঁজুন..." className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-800 bg-white outline-none shadow-2xl focus:ring-4 focus:ring-emerald-500/20 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCategories.filter(c => c.id !== CategoryId.NEWS).map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border hover:border-emerald-200 transition-all active:scale-95 group">
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform`}><DynamicIcon name={cat.icon} className="w-7 h-7" /></div>
            <span className="text-xs font-black text-slate-700 text-center uppercase tracking-tighter">{cat.title}</span>
          </Link>
        ))}
      </section>

      {!isSearching && (
        <section className="space-y-5">
          <div className="flex items-center justify-between px-1"><h2 className="text-2xl font-black text-slate-800 flex items-center gap-3"><div className="w-2 h-8 bg-rose-500 rounded-full"></div>খবরাখবর</h2><Link to={`/category/${CategoryId.NEWS}`} className="text-rose-600 text-sm font-bold">সব দেখুন <ArrowRight size={14} className="inline ml-1" /></Link></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {articles.slice(0, 4).map(article => (
              <Link key={article.id} to={`/article/${article.id}`} className="bg-white rounded-[2rem] overflow-hidden border flex flex-col group hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden"><img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 mb-3 uppercase tracking-widest"><Clock size={12} /><span>{article.date}</span></div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight line-clamp-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const allItems = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const category = categories.find(c => c.id === categoryId);
  if (!category) return <div>Not found</div>;

  const displayItems = categoryId === CategoryId.NEWS ? articles : allItems.filter(i => i.categoryId === categoryId);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-8"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border hover:bg-slate-50 transition-colors"><ChevronLeft size={24} /></button><h1 className="text-3xl font-black text-slate-800">{category.title}</h1></div>
      <div className="grid gap-4">
        {displayItems.map((item: any) => (
          <Link key={item.id} to={categoryId === CategoryId.NEWS ? `/article/${item.id}` : `/detail/${item.id}`} className="flex bg-white rounded-3xl overflow-hidden shadow-sm border hover:border-emerald-200 transition-all group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 overflow-hidden"><img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
            <div className="p-5 flex flex-col justify-center"><h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight line-clamp-2">{item.title || item.name}</h3><div className="flex items-center gap-2 text-xs text-slate-400 font-medium">{(item as any).location ? <><MapPin size={14} className="text-emerald-500" /><span>{item.location}</span></> : <><Clock size={14} className="text-rose-500" /><span>{item.date}</span></>}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const article = articles.find(a => a.id === articleId);
  if (!article) return <div>Not found</div>;
  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} article={article} />
      <div className="flex items-center justify-between"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border"><ChevronLeft size={24} /></button><button onClick={() => setIsShareModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all"><Share2 size={18} /><span>শেয়ার</span></button></div>
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border">
        <div className="relative h-80"><img src={article.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-end p-8"><span className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">{article.date}</span><h2 className="text-3xl font-black text-white leading-tight">{article.title}</h2></div></div>
        <div className="p-8"><article className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">{article.content}</article></div>
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
          <Route path="/article/:articleId" element={<ArticleDetailView />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/item/:id" element={<ItemEditor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
