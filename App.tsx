
import React, { useState, useEffect, useRef } from 'react';
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
  Download, Upload, FileJson
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, DynamicTable, TableRow } from './types';

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

const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void; article: Article }> = ({ isOpen, onClose, article }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"><X size={20} /></button>
        <div id="photocard-content" className="bg-white">
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
            <button onClick={() => alert('স্ক্রিনশট নিন অথবা ইমেজটি চেপে ধরুন।')} className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold active:scale-95 transition-all"><Camera size={18} />ইমেজ সেভ</button>
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
  }, []);

  const saveAll = () => {
    setStorage('categories', categories);
    setStorage('items', items);
    setStorage('articles', articles);
    alert('ডেটা সফলভাবে ব্রাউজারে সেভ হয়েছে!');
  };

  const exportBackup = () => {
    const backupData = {
      categories,
      items,
      articles
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aminpur_portal_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('ব্যাকআপ ফাইলটি ডাউনলোড হয়েছে। এটি আপনি গিটহাবে আপলোড করতে পারবেন।');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.categories && imported.items && imported.articles) {
            setCategories(imported.categories);
            setItems(imported.items);
            setArticles(imported.articles);
            setStorage('categories', imported.categories);
            setStorage('items', imported.items);
            setStorage('articles', imported.articles);
            alert('ডেটা সফলভাবে ইমপোর্ট হয়েছে!');
          }
        } catch (err) {
          alert('ভুল ফাইল ফরম্যাট!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-800">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-xs text-emerald-600 font-bold">মীর রাব্বি হোসেন</p>
        </div>
        <div className="flex gap-2">
          <button onClick={saveAll} className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg" title="Save to Browser"><Save size={20} /></button>
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
                    <div>
                      <h3 className="font-bold text-slate-800">{item.name}</h3>
                      <p className="text-xs text-slate-400">{categories.find(c => c.id === item.categoryId)?.title}</p>
                    </div>
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

        {tab === 'articles' && (
          <>
            <button onClick={() => navigate('/admin/article/new')} className="w-full p-5 bg-white border-2 border-dashed border-rose-300 text-rose-600 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-rose-50"><Plus size={20} /> নতুন নিউজ/আর্টিকেল</button>
            <div className="grid gap-4">
              {articles.map(article => (
                <div key={article.id} className="bg-white p-4 rounded-3xl border shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-4">
                    <img src={article.image} className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-bold text-slate-800 line-clamp-1">{article.title}</h3>
                      <p className="text-xs text-slate-400">{article.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/admin/article/${article.id}`)} className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Edit3 size={18} /></button>
                    <button onClick={() => { if(confirm('ডিলিট করতে চান?')) setArticles(articles.filter(a => a.id !== article.id)); }} className="p-3 bg-red-50 text-red-600 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'categories' && (
          <div className="grid gap-3">
             {categories.map(cat => (
               <div key={cat.id} className="bg-white p-5 rounded-3xl border flex items-center gap-4">
                  <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-white`}><DynamicIcon name={cat.icon} /></div>
                  <div className="flex-grow">
                    <input type="text" value={cat.title} onChange={(e) => {
                      const newCats = [...categories];
                      const idx = newCats.findIndex(c => c.id === cat.id);
                      newCats[idx].title = e.target.value;
                      setCategories(newCats);
                    }} className="font-bold text-slate-800 bg-transparent outline-none border-b border-transparent focus:border-emerald-300 w-full" />
                  </div>
               </div>
             ))}
          </div>
        )}

        {tab === 'backup' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border text-center space-y-4">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><Download size={40} /></div>
               <h2 className="text-xl font-bold">গিটহাব ব্যাকআপ তৈরি করুন</h2>
               <p className="text-gray-500 text-sm leading-relaxed">এই বাটনে ক্লিক করলে আপনার বর্তমান সকল তথ্য (স্কুল, হাসপাতাল, নিউজ) একটি JSON ফাইল আকারে ডাউনলোড হবে। এই ডেটা আপনি ম্যানুয়ালি `data.ts` ফাইলে সেভ করে গিটহাবে পুশ করলে তা স্থায়ীভাবে সংরক্ষিত থাকবে এবং সকল ইউজার দেখতে পাবে।</p>
               <button onClick={exportBackup} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"><Download size={20} /> Export JSON for GitHub</button>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border text-center space-y-4">
               <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto"><Upload size={40} /></div>
               <h2 className="text-xl font-bold">পুরানো ব্যাকআপ ইমপোর্ট</h2>
               <p className="text-gray-500 text-sm leading-relaxed">আপনার কাছে যদি আগে থেকে ব্যাকআপ ফাইল থাকে, তবে তা এখানে আপলোড করে আপনার লোকাল স্টোরেজ আপডেট করতে পারেন।</p>
               <input type="file" accept=".json" onChange={handleImport} className="hidden" id="import-input" />
               <label htmlFor="import-input" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer"><Upload size={20} /> Import Backup File</label>
            </div>
          </div>
        )}
      </main>
      <div className="fixed bottom-6 right-6">
        <Link to="/" className="bg-white p-4 rounded-full shadow-2xl text-emerald-600 border border-emerald-100 flex items-center gap-2 font-bold"><Globe size={20} /> ভিজিট এপস</Link>
      </div>
    </div>
  );
};

// --- ITEM EDITOR ---
const ItemEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<InformationItem[]>(getStorage('items', INITIAL_INFO_ITEMS));
  const categories = getStorage('categories', INITIAL_CATEGORIES);
  
  const isNew = id === 'new';
  const itemData = isNew ? {
    id: 'item-' + Date.now(),
    categoryId: CategoryId.EDUCATION,
    name: '',
    image: '',
    gallery: [],
    description: '',
    location: '',
    phone: '',
    tables: []
  } as InformationItem : items.find(i => i.id === id);

  const [formData, setFormData] = useState<InformationItem>(itemData!);

  const addGalleryImage = () => {
    const url = prompt('ইমেজ ইউআরএল দিন:');
    if (url) setFormData({...formData, gallery: [...(formData.gallery || []), url]});
  };

  const addTable = () => {
    const title = prompt('টেবিলের নাম:');
    if (title) {
      const newTable: DynamicTable = { id: 'table-' + Date.now(), title, rows: [{ label: '', value: '' }] };
      setFormData({...formData, tables: [...(formData.tables || []), newTable]});
    }
  };

  const save = () => {
    if (isNew) {
      setStorage('items', [...items, formData]);
    } else {
      setStorage('items', items.map(i => i.id === id ? formData : i));
    }
    navigate('/admin/dashboard');
  };

  if (!formData) return <div>Data not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold">{isNew ? 'নতুন তথ্য' : 'তথ্য সম্পাদনা'}</h1>
      </div>
      <div className="bg-white p-6 rounded-[2rem] shadow-sm space-y-5 border">
        <div><label className="text-sm font-bold text-gray-500">ক্যাটাগরি</label>
        <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value as CategoryId})} className="w-full p-4 bg-gray-50 rounded-2xl border">
          {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select></div>
        <div><label className="text-sm font-bold text-gray-500">নাম</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">ছবির লিংক</label><input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">লোকেশন</label><input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">ফোন</label><input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">বর্ণনা</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border h-32" /></div>
        
        <div className="pt-4 border-t">
          <button onClick={addTable} className="text-emerald-600 font-bold flex items-center gap-1"><Plus size={18} /> টেবিল যোগ করুন</button>
          {formData.tables?.map(table => (
             <div key={table.id} className="mt-3 p-4 bg-slate-50 rounded-2xl border">
                <div className="flex justify-between items-center mb-2">
                   <input value={table.title} onChange={(e) => {
                     const newTables = formData.tables?.map(t => t.id === table.id ? {...t, title: e.target.value} : t);
                     setFormData({...formData, tables: newTables});
                   }} className="font-bold bg-transparent outline-none border-b border-slate-300 w-full" />
                   <button onClick={() => setFormData({...formData, tables: formData.tables?.filter(t => t.id !== table.id)})} className="text-red-500 ml-2"><Trash2 size={16} /></button>
                </div>
                {table.rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-2 mb-2">
                    <input placeholder="Label" value={row.label} onChange={(e) => {
                      const newTables = [...(formData.tables || [])];
                      const tIdx = newTables.findIndex(t => t.id === table.id);
                      newTables[tIdx].rows[rIdx].label = e.target.value;
                      setFormData({...formData, tables: newTables});
                    }} className="w-full p-2 bg-white rounded-lg border text-xs" />
                    <input placeholder="Value" value={row.value} onChange={(e) => {
                      const newTables = [...(formData.tables || [])];
                      const tIdx = newTables.findIndex(t => t.id === table.id);
                      newTables[tIdx].rows[rIdx].value = e.target.value;
                      setFormData({...formData, tables: newTables});
                    }} className="w-full p-2 bg-white rounded-lg border text-xs" />
                  </div>
                ))}
                <button onClick={() => {
                  const newTables = formData.tables?.map(t => t.id === table.id ? {...t, rows: [...t.rows, { label: '', value: '' }]} : t);
                  setFormData({...formData, tables: newTables});
                }} className="text-xs font-bold text-emerald-600">+ Row</button>
             </div>
          ))}
        </div>
      </div>
      <button onClick={save} className="fixed bottom-6 left-4 right-4 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"><CheckCircle size={20} /> সেভ করুন</button>
    </div>
  );
};

// --- ARTICLE EDITOR ---
const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>(getStorage('articles', INITIAL_ARTICLES));
  const isNew = id === 'new';
  const [formData, setFormData] = useState<Article>(isNew ? {
    id: 'art-' + Date.now(), title: '', image: '', date: new Date().toLocaleDateString('bn-BD'), excerpt: '', content: '', author: 'অ্যাডমিন'
  } : articles.find(a => a.id === id)!);

  const save = () => {
    if (isNew) { setStorage('articles', [...articles, formData]); } 
    else { setStorage('articles', articles.map(a => a.id === id ? formData : a)); }
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold">নিউজ এডিটর</h1>
      </div>
      <div className="bg-white p-6 rounded-[2rem] shadow-sm space-y-5 border">
        <div><label className="text-sm font-bold text-gray-500">শিরোনাম</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">ছবির লিংক</label><input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border" /></div>
        <div><label className="text-sm font-bold text-gray-500">মূল নিউজ (Content)</label><textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl border h-64" /></div>
      </div>
      <button onClick={save} className="fixed bottom-6 left-4 right-4 bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2">পাবলিশ করুন</button>
    </div>
  );
};

// --- CLIENT LAYOUT ---

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
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-xl shadow-inner"><Shield className="text-emerald-600 w-5 h-5" /></div>
          <span className="tracking-tight">আমিনপুর থানা</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-emerald-700 rounded-xl transition-all"><Menu size={24} /></button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b flex justify-between items-center bg-emerald-50">
           <h2 className="text-lg font-bold text-emerald-900">মেনু নেভিগেশন</h2>
           <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-red-500 rounded-full"><X size={24} /></button>
        </div>
        <nav className="p-4 space-y-1 h-[calc(100%-80px)] overflow-y-auto">
          <Link to="/" className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 rounded-xl text-gray-700 font-semibold transition-all">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><LayoutDashboard size={20} /></div>
            <span>হোম পেজ</span>
          </Link>
          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">প্রধান তথ্য ও সেবা</div>
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-xl text-gray-600 font-medium">
              <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center text-white`}><DynamicIcon name={cat.icon} className="w-5 h-5" /></div>
              <span>{cat.title}</span>
            </Link>
          ))}
          <div className="mt-8 pt-4 border-t">
            <button onClick={() => { setIsSidebarOpen(false); setShowExitModal(true); }} className="w-full flex items-center gap-3 p-3.5 hover:bg-red-50 rounded-xl text-red-600 font-bold transition-all">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg"><LogOut size={20} /></div>
              <span>প্রস্থান করুন</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-grow pt-20 pb-16 px-4 md:max-w-4xl md:mx-auto w-full">{children}</main>
      <footer className="bg-white border-t py-8 text-center text-gray-500 text-xs">
        <p className="font-medium">© ২০২৪ আমিনপুর থানা তথ্য ও সেবা পোর্টাল</p>
        <p className="mt-2 text-emerald-700 font-bold uppercase tracking-wider">ডেভেলপার: মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

// --- VIEWS ---

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const isSearching = searchTerm.trim() !== '';

  const filteredCategories = categories.filter(cat => cat.title.toLowerCase().includes(searchTerm.toLowerCase()) && (isSearching ? cat.id !== CategoryId.NEWS : true));
  const filteredItems = items.filter(item => isSearching && (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())) && item.categoryId !== CategoryId.NEWS);

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-7 text-white shadow-xl text-center">
        <h1 className="text-3xl font-extrabold mb-1">স্বাগতম!</h1>
        <p className="opacity-90 text-sm mb-6">আমিনপুর থানার সকল প্রয়োজনীয় তথ্য এখন হাতের মুঠোয়।</p>
        <div className="relative group max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="খুঁজুন..." className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 bg-slate-100 outline-none shadow-inner" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </section>

      <section className="space-y-6">
        {isSearching && filteredItems.length > 0 && (
          <div className="space-y-4">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>সার্চ রেজাল্ট</h2>
             <div className="grid gap-4">
              {filteredItems.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm border group transition-all">
                  <img src={item.image} className="w-24 h-24 object-cover" />
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500"><MapPin size={12} className="text-emerald-500" /><span>{item.location}</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredCategories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border hover:border-emerald-200 transition-all active:scale-95">
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-3 shadow-md`}><DynamicIcon name={cat.icon} className="w-7 h-7" /></div>
              <span className="text-[14px] font-bold text-slate-700 text-center">{cat.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {!isSearching && (
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>সর্বশেষ নিউজ</h2>
            <Link to={`/category/${CategoryId.NEWS}`} className="text-emerald-600 text-sm font-bold flex items-center gap-1">সব দেখুন <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.slice(0, 4).map(article => (
              <Link key={article.id} to={`/article/${article.id}`} className="bg-white rounded-3xl overflow-hidden border flex flex-col group hover:shadow-xl transition-all duration-300">
                <img src={article.image} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 mb-2 uppercase"><Clock size={12} /><span>{article.date}</span></div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight line-clamp-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const article = articles.find(a => a.id === articleId);
  if (!article) return <div className="p-10 text-center font-bold">আর্টিকেল পাওয়া যায়নি</div>;
  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} article={article} />
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border"><ChevronLeft size={24} /></button>
        <button onClick={() => setIsShareModalOpen(true)} className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all"><Share2 size={18} /><span>শেয়ার</span></button>
      </div>
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border">
        <div className="relative h-72">
          <img src={article.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-end p-8">
            <span className="text-emerald-400 text-xs font-bold uppercase mb-2">{article.date}</span>
            <h2 className="text-3xl font-bold text-white leading-tight">{article.title}</h2>
          </div>
        </div>
        <div className="p-8"><article className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">{article.content}</article></div>
      </div>
    </div>
  );
};

const DetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);
  if (!item) return <div className="p-10 text-center font-bold">তথ্য পাওয়া যায়নি</div>;
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border shadow-sm"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold text-slate-800 truncate">{item.name}</h1>
      </div>
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border">
        <img src={item.image} className="w-full h-64 object-cover" />
        <div className="p-8 space-y-8">
          <section className="space-y-2">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><div className="w-1 h-5 bg-emerald-500 rounded-full"></div>বর্ণনা</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
          </section>
          {item.tables?.map(table => (
            <section key={table.id} className="space-y-4">
               <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><List size={20} className="text-emerald-600" />{table.title}</h3>
               <div className="overflow-hidden border rounded-2xl">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y">
                      {table.rows.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-5 py-4 font-bold text-slate-700 border-r w-1/3">{row.label}</td>
                          <td className="px-5 py-4 text-slate-600">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </section>
          ))}
        </div>
      </div>
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
  if (!category) return <div>Category not found</div>;
  if (categoryId === CategoryId.NEWS) {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm border"><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold">{category.title}</h1></div>
        <div className="grid gap-4">
          {articles.map(article => (
            <Link key={article.id} to={`/article/${article.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm border group">
              <img src={article.image} className="w-28 h-28 object-cover" />
              <div className="p-4 flex flex-col justify-center"><h3 className="font-bold text-slate-800 text-lg line-clamp-1">{article.title}</h3><div className="flex items-center gap-2 text-xs text-slate-500"><Clock size={12} className="text-emerald-500" /><span>{article.date}</span></div></div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  const items = allItems.filter(i => i.categoryId === categoryId);
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6"><button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl border shadow-sm"><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold">{category.title}</h1></div>
      {items.length === 0 ? <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed text-slate-400">কোনো তথ্য নেই</div> : (
        <div className="grid gap-4">
          {items.map(item => (
            <Link key={item.id} to={`/detail/${item.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm border group">
              <img src={item.image} className="w-28 h-28 object-cover" />
              <div className="p-4 flex flex-col justify-center"><h3 className="font-bold text-slate-800 text-lg">{item.name}</h3><div className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={14} className="text-emerald-500" /><span className="truncate">{item.location}</span></div></div>
            </Link>
          ))}
        </div>
      )}
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
          <Route path="/admin/article/:id" element={<ArticleEditor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
