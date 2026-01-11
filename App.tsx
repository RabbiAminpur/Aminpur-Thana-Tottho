
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Clock, Newspaper, Bus, 
  LayoutDashboard, GraduationCap, Hospital, Stethoscope, 
  Shield, Building, Briefcase, Camera, Share2, Mic, 
  Flame, ShoppingCart, PlusCircle, Building2, Package,
  Info, User, Mail, Smartphone, ArrowRight, Lock, Globe, Heart,
  Edit, Trash2, Plus, Image as ImageIcon, Users, Settings, Save,
  Download, Upload, RefreshCw, FileJson, AlertCircle
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, StaffProfile } from './types';

// Icons mapping for dynamic selection
const IconMap: any = {
  'graduation-cap': <GraduationCap size={22} />,
  'hospital': <Hospital size={22} />,
  'stethoscope': <Stethoscope size={22} />,
  'shield': <Shield size={22} />,
  'building': <Building size={22} />,
  'briefcase': <Briefcase size={22} />,
  'govt-building': <Building2 size={22} />,
  'courier': <Package size={22} />,
  'bus': <Bus size={22} />,
  'camera': <Camera size={22} />,
  'share-2': <Share2 size={22} />,
  'mic': <Mic size={22} />,
  'fire': <Flame size={22} />,
  'shopping-cart': <ShoppingCart size={22} />,
  'news': <Newspaper size={22} />,
  'plus-circle': <PlusCircle size={22} />,
};

const DynamicIcon = ({ name, className, size = 22 }: { name: string, className?: string, size?: number }) => {
  const Icon = IconMap[name];
  return <div className={className}>{Icon ? React.cloneElement(Icon, { size }) : <PlusCircle size={size} />}</div>;
};

// Storage Helpers
const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- INFO PAGES ---

const AboutUs: React.FC = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><Building2 size={32} /></div>
      <h1 className="text-3xl font-black text-slate-800 mb-4">আমাদের সম্পর্কে</h1>
      <div className="text-slate-600 space-y-4 leading-relaxed text-sm">
        <p>পাবনা জেলার বেড়া উপজেলার অন্তর্গত একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা হলো আমিনপুর। এটি যমুনা ও পদ্মা নদীর মোহনায় অবস্থিত একটি গুরুত্বপূর্ণ বাণিজ্যিক ও আবাসিক কেন্দ্র।</p>
        <p>আমিনপুর থানা ২০১৩ সালে প্রতিষ্ঠিত হয়। এই অঞ্চলের শান্তি-শৃঙ্খলা বজায় রাখা এবং জনগণের দোরগোড়ায় সরকারি সেবা পৌঁছে দেওয়ার লক্ষ্যে এই থানা নিরলস কাজ করে যাচ্ছে। আমাদের এই ডিজিটাল পোর্টালটির উদ্দেশ্য হলো আমিনপুর থানার সকল গুরুত্বপূর্ণ তথ্য, প্রতিষ্ঠান এবং সেবা সম্পর্কে মানুষকে মুহূর্তের মধ্যে তথ্য প্রদান করা।</p>
      </div>
    </div>
  </div>
);

const DeveloperInfo: React.FC = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
      <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-emerald-500">
        <User size={60} className="text-slate-300" />
      </div>
      <h1 className="text-2xl font-black text-slate-800 mb-1">মীর রাব্বি হোসেন</h1>
      <p className="text-emerald-600 font-bold text-sm mb-6">সফটওয়্যার ইঞ্জিনিয়ার ও টেক-উদ্যোক্তা</p>
      <div className="text-slate-600 space-y-4 leading-relaxed text-sm text-left">
        <p>স্থানীয় সমস্যা সমাধানে ডিজিটাল টুলস তৈরি করা আমার লক্ষ্য। আমিনপুর থানার মানুষকে একটি একক প্ল্যাটফর্মে সকল তথ্য দেওয়ার লক্ষ্য থেকেই এই পোর্টালটি তৈরি করা হয়েছে।</p>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Mail size={32} /></div>
      <h1 className="text-3xl font-black text-slate-800 mb-4">যোগাযোগ</h1>
      <div className="text-slate-600 space-y-4 leading-relaxed text-sm">
        <p>যেকোনো জিজ্ঞাসা, অভিযোগ বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।</p>
        <div className="space-y-3 mt-6">
          <p className="flex items-center gap-3"><Phone size={18} className="text-emerald-600" /> +৮৮০ ১৭০০-০০০০০০</p>
          <p className="flex items-center gap-3"><Mail size={18} className="text-emerald-600" /> mirrabbihossain@gmail.com</p>
          <p className="flex items-center gap-3"><MapPin size={18} className="text-emerald-600" /> আমিনপুর থানা, পাবনা, বাংলাদেশ।</p>
        </div>
      </div>
    </div>
  </div>
);

const AppInfo: React.FC = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6"><Smartphone size={32} /></div>
      <h1 className="text-3xl font-black text-slate-800 mb-4">এপস সম্পর্কে</h1>
      <div className="text-slate-600 space-y-4 leading-relaxed text-sm">
        <p>আমিনপুর ডিজিটাল বাতায়ন একটি আধুনিক তথ্য পোর্টাল যা স্থানীয় নাগরিকদের প্রয়োজনীয় সকল তথ্য এক জায়গায় প্রদানের লক্ষ্যে তৈরি করা হয়েছে।</p>
        <p className="font-bold text-slate-800 mt-4">সংস্করণ: ১.১.০ (Database Export Enabled)</p>
        <p className="font-bold text-slate-800">সর্বশেষ আপডেট: মে ২০২৪</p>
      </div>
    </div>
  </div>
);

// --- CLIENT VIEWS ---

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const isSearching = searchTerm.trim() !== '';

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const filteredCategories = categories.filter(cat => cat.id !== CategoryId.NEWS && (isSearching ? cat.title.toLowerCase().includes(searchTerm.toLowerCase()) : true));
  const filteredItems = items.filter(item => isSearching && (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2rem] p-10 text-white shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-4 -right-4 opacity-5 rotate-12"><Shield size={100} /></div>
        <h1 className="text-4xl font-black mb-1.5 tracking-tight leading-none">স্বাগতম!</h1>
        <p className="opacity-80 text-[11px] mb-8 font-medium tracking-tight">আমিনপুর থানার সকল তথ্য একসাথে</p>
        <div className="relative group max-w-[320px] mx-auto z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="কী খুঁজছেন?" 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-slate-800 bg-white outline-none shadow-xl focus:ring-4 focus:ring-emerald-500/10 transition-all text-xs" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </section>

      {!isSearching && (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredCategories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center justify-center p-5 bg-white rounded-[1.8rem] shadow-sm border border-slate-50 hover:border-emerald-100 transition-all active:scale-95 group">
                <div className={`w-11 h-11 ${cat.color} rounded-xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}><DynamicIcon name={cat.icon} /></div>
                <span className="text-[11px] font-bold text-slate-700 text-center">{cat.title}</span>
              </Link>
            ))}
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-slate-800">খবরাখবর</h2>
              <Link to={`/category/${CategoryId.NEWS}`} className="text-rose-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">সব খবরের তালিকা <ArrowRight size={10} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articles.slice().reverse().slice(0, 3).map(article => (
                <Link key={article.id} to={`/article/${article.id}`} className="bg-white rounded-[1.8rem] overflow-hidden border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300">
                  <div className="h-40 overflow-hidden"><img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 mb-2 uppercase tracking-tighter"><Clock size={10} /><span>{article.date}</span></div>
                    <h3 className="text-sm font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const StaffDetailView: React.FC = () => {
  const { itemId, staffId } = useParams();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);
  const staff = item?.staff?.find(s => s.id === staffId);

  if (!staff) return <div className="p-10 text-center">তথ্য পাওয়া যায়নি</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100"><ChevronLeft size={22} /></button>
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl mb-6">
            <img src={staff.image} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">{staff.name}</h1>
          <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-6">{staff.designation}</p>
          <div className="max-w-2xl text-slate-600 leading-relaxed">
            <p>{staff.bio || 'ব্যক্তিগত পরিচিতি যুক্ত করা হয়নি।'}</p>
          </div>
          {staff.phone && (
            <a href={`tel:${staff.phone}`} className="mt-8 flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
              <Phone size={20} />
              কল করুন
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailView: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);

  if (!item) return <div className="p-10 text-center font-bold">তথ্য পাওয়া যায়নি</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-2xl border border-slate-100 shadow-sm"><ChevronLeft size={20} /></button>
        <span className="font-bold text-sm text-slate-500">ফিরে যান</span>
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="h-64 overflow-hidden relative">
          <img src={item.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-2xl font-black tracking-tight">{item.name}</h1>
          </div>
        </div>
        <div className="p-8 space-y-10">
          <section className="space-y-3">
            <h3 className="font-black text-lg text-slate-800 border-l-4 border-emerald-500 pl-3">পরিচিতি</h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{item.description}</p>
          </section>

          {item.gallery && item.gallery.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-black text-lg text-slate-800 border-l-4 border-emerald-500 pl-3">গ্যালারি</h3>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {item.gallery.map((img, idx) => (
                  <img key={idx} src={img} className="w-48 h-32 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm" />
                ))}
              </div>
            </section>
          )}

          {item.staff && item.staff.length > 0 && (
            <section className="space-y-4">
              <h3 className="font-black text-lg text-slate-800 border-l-4 border-emerald-500 pl-3">কর্মকর্তা/সদস্যবৃন্দ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.staff.map((s) => (
                  <Link key={s.id} to={`/detail/${item.id}/staff/${s.id}`} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all">
                    <img src={s.image} className="w-14 h-14 rounded-xl object-cover shadow-md" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.designation}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-slate-50">
             <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm"><MapPin size={20} /></div>
                <div><p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">অবস্থান</p><p className="font-bold text-xs text-slate-700">{item.location}</p></div>
             </div>
             {item.phone && (
               <a href={`tel:${item.phone}`} className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg"><Phone size={18} /></div>
                  <div><p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mb-1">সরাসরি যোগাযোগ</p><p className="font-bold text-xs text-emerald-800">{item.phone}</p></div>
               </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const article = articles.find(a => a.id === articleId);

  if (!article) return <div className="p-10 text-center">Not found</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100"><ChevronLeft size={22} /></button>
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="h-64 overflow-hidden relative">
          <img src={article.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 flex flex-col justify-end p-8">
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">{article.date}</span>
            <h2 className="text-2xl font-black text-white leading-tight">{article.title}</h2>
          </div>
        </div>
        <div className="p-8"><article className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{article.content}</article></div>
      </div>
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

  if (!category) return <div className="p-10 text-center">তথ্য পাওয়া যায়নি</div>;
  const list = categoryId === CategoryId.NEWS ? articles.slice().reverse() : items.filter(i => i.categoryId === categoryId);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-100"><ChevronLeft size={22} /></button>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{category.title}</h1>
      </div>
      <div className="grid gap-3">
        {list.map((item: any) => (
          <Link key={item.id} to={categoryId === CategoryId.NEWS ? `/article/${item.id}` : `/detail/${item.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-50 group hover:border-emerald-100 transition-all">
            <div className="w-24 h-24 shrink-0 overflow-hidden"><img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            <div className="p-4 flex flex-col justify-center">
              <h3 className="font-bold text-sm text-slate-800 mb-1">{item.name || item.title}</h3>
              <p className="text-[10px] text-slate-400 flex items-center gap-2">
                {item.location ? <MapPin size={10} className="text-emerald-500" /> : <Clock size={10} className="text-rose-500" />}
                {item.location || item.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsSidebarOpen(false); }, [location]);

  if (location.pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <header className="bg-emerald-600 text-white shadow-xl fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-black tracking-tight leading-none">আমিনপুর থানা</Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-emerald-700 rounded-xl transition-colors"><Menu size={24} /></button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b flex flex-col gap-1 bg-slate-50 relative">
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-slate-400 p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
          <h2 className="font-black text-emerald-600 text-xl tracking-tighter leading-none">আমিনপুর থানা</h2>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">ডিজিটাল তথ্য পোর্টাল</p>
        </div>
        
        <nav className="p-6 space-y-2 overflow-y-auto h-[calc(100%-140px)] scrollbar-hide">
          <Link to="/" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group">
            <LayoutDashboard size={18} className="text-emerald-600" />
            <span>হোমপেজ</span>
          </Link>
          <Link to="/about" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group"><Info size={18} className="text-emerald-600" /><span>আমাদের সম্পর্কে</span></Link>
          <Link to="/developer" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group"><User size={18} className="text-emerald-600" /><span>ডেভেলপার সম্পর্কে</span></Link>
          <Link to="/contact" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group"><Mail size={18} className="text-emerald-600" /><span>যোগাযোগ</span></Link>
          <Link to="/app-info" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group"><Smartphone size={18} className="text-emerald-600" /><span>এপস সম্পর্কে</span></Link>
          <Link to="/admin" className="flex items-center gap-4 p-4 hover:bg-rose-50 rounded-2xl text-rose-700 font-bold transition-all text-sm group"><Lock size={18} /><span>এডমিন লগইন</span></Link>
        </nav>
        
        <div className="absolute bottom-8 left-8 right-8 text-center">
           <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.3em] leading-none">আমিনপুর ডিজিটাল বাতায়ন</p>
        </div>
      </aside>

      <main className="flex-grow pt-24 pb-16 px-5 md:max-w-4xl md:mx-auto w-full">{children}</main>
      <footer className="bg-white border-t py-6 text-center">
        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-none">মীররাব্বিহোসেন</p>
      </footer>
    </div>
  );
};

// --- ADMIN VIEWS ---

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username === 'mirrabbihossain' && password === 'Rabbi@198027') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        alert('ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><Lock size={32} /></div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">এডমিন প্যানেল</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 leading-none">শুধুমাত্র অনুমোদিত এক্সেস</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="ইউজারনেম" className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm font-bold" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="পাসওয়ার্ড" className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm font-bold" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" disabled={isLoading} className={`w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 mt-4 ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-emerald-700 active:scale-[0.98]'}`}>
              {isLoading ? 'প্রবেশ করা হচ্ছে...' : 'লগইন করুন'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
          <div className="mt-8 text-center"><Link to="/" className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">ফিরে যান</Link></div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'items' | 'articles' | 'categories' | 'database'>('items');
  const [editingItem, setEditingItem] = useState<InformationItem | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [items, setItems] = useState<InformationItem[]>(() => getStorage('items', INITIAL_INFO_ITEMS));
  const [articles, setArticles] = useState<Article[]>(() => getStorage('articles', INITIAL_ARTICLES));
  const [categories, setCategories] = useState<Category[]>(() => getStorage('categories', INITIAL_CATEGORIES));

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin');
  }, [navigate]);

  const saveAll = (newItems?: InformationItem[], newArticles?: Article[], newCategories?: Category[]) => {
    if (newItems) { setItems(newItems); setStorage('items', newItems); }
    if (newArticles) { setArticles(newArticles); setStorage('articles', newArticles); }
    if (newCategories) { setCategories(newCategories); setStorage('categories', newCategories); }
    setEditingItem(null);
    setEditingArticle(null);
    setEditingCategory(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string, type: 'item' | 'article') => {
    if (window.confirm('আপনি কি নিশ্চিত?')) {
      if (type === 'item') saveAll(items.filter(i => i.id !== id));
      else saveAll(undefined, articles.filter(a => a.id !== id));
    }
  };

  // Database Management Logic
  const handleExport = () => {
    const data = {
      items,
      articles,
      categories
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aminpur_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.items && data.articles && data.categories) {
          if (window.confirm('এই ফাইলটি আপনার বর্তমান সকল ডাটা রিপ্লেস করবে। আপনি কি নিশ্চিত?')) {
            saveAll(data.items, data.articles, data.categories);
            alert('ডাটা সফলভাবে ইমপোর্ট হয়েছে!');
          }
        } else {
          alert('ভুল ফরম্যাট! সঠিক JSON ফাইল আপলোড করুন।');
        }
      } catch (err) {
        alert('ফাইলটি পড়তে সমস্যা হয়েছে।');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('আপনি কি আপনার সকল লোকাল পরিবর্তন মুছে ফেলে ডিফল্ট ডাটায় ফিরে যেতে চান?')) {
      localStorage.removeItem('items');
      localStorage.removeItem('articles');
      localStorage.removeItem('categories');
      window.location.reload();
    }
  };

  // Forms Components
  const ItemForm = ({ item, isNew }: { item?: InformationItem, isNew?: boolean }) => {
    const [formData, setFormData] = useState<InformationItem>(item || {
      id: Math.random().toString(36).substr(2, 9),
      categoryId: CategoryId.OTHERS,
      name: '', image: '', description: '', location: '', phone: '',
      gallery: [], staff: []
    });

    const [newStaff, setNewStaff] = useState<StaffProfile>({ id: '', name: '', designation: '', image: '', bio: '', phone: '' });

    const addStaff = () => {
      if (!newStaff.name) return;
      const s = { ...newStaff, id: Math.random().toString(36).substr(2, 9) };
      setFormData({ ...formData, staff: [...(formData.staff || []), s] });
      setNewStaff({ id: '', name: '', designation: '', image: '', bio: '', phone: '' });
    };

    return (
      <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">নাম</label>
            <input className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100 focus:border-emerald-300" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ক্যাটাগরি</label>
            <select className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value as CategoryId })}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">প্রধান ছবি (URL)</label>
            <input className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ফোন নম্বর</label>
            <input className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">অবস্থান</label>
          <input className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">পরিচিতি</label>
          <textarea rows={4} className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-slate-100" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
        </div>
        
        {/* Gallery */}
        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="font-bold text-slate-700 flex items-center gap-2"><ImageIcon size={18} /> গ্যালারি (ছবি যোগ করুন)</h4>
          <div className="flex gap-2">
            <input id="gal-inp" placeholder="ছবির URL" className="flex-grow p-3 rounded-xl border border-slate-200" />
            <button className="bg-emerald-600 text-white px-5 rounded-xl font-bold" onClick={() => {
              const inp = document.getElementById('gal-inp') as HTMLInputElement;
              if (inp.value) {
                setFormData({ ...formData, gallery: [...(formData.gallery || []), inp.value] });
                inp.value = '';
              }
            }}>যোগ করুন</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {formData.gallery?.map((g, i) => (
              <div key={i} className="relative shrink-0 group">
                <img src={g} className="w-20 h-20 rounded-xl object-cover" />
                <button className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100" onClick={() => setFormData({ ...formData, gallery: formData.gallery?.filter((_, idx) => idx !== i) })}><X size={10} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="font-bold text-slate-700 flex items-center gap-2"><Users size={18} /> সদস্য/কর্মকর্তা যুক্ত করুন</h4>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="নাম" className="p-3 rounded-xl border border-slate-200" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} />
            <input placeholder="পদবী" className="p-3 rounded-xl border border-slate-200" value={newStaff.designation} onChange={e => setNewStaff({ ...newStaff, designation: e.target.value })} />
            <input placeholder="ছবি (URL)" className="p-3 rounded-xl border border-slate-200" value={newStaff.image} onChange={e => setNewStaff({ ...newStaff, image: e.target.value })} />
            <button className="bg-emerald-600 text-white rounded-xl font-bold" onClick={addStaff}>সদস্য যুক্ত করুন</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {formData.staff?.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={s.image} className="w-8 h-8 rounded-full object-cover" />
                  <div><p className="text-xs font-bold text-slate-800 leading-none">{s.name}</p><p className="text-[10px] text-slate-400">{s.designation}</p></div>
                </div>
                <button className="text-rose-500" onClick={() => setFormData({ ...formData, staff: formData.staff?.filter((_, idx) => idx !== i) })}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20" onClick={() => {
          const newList = isNew ? [...items, formData] : items.map(i => i.id === formData.id ? formData : i);
          saveAll(newList);
        }}>{isNew ? 'তৈরি করুন' : 'পরিবর্তন সেভ করুন'}</button>
      </div>
    );
  };

  const ArticleForm = ({ article, isNew }: { article?: Article, isNew?: boolean }) => {
    const [formData, setFormData] = useState<Article>(article || {
      id: Math.random().toString(36).substr(2, 9),
      title: '', image: '', excerpt: '', content: '', date: new Date().toLocaleDateString('bn-BD'), author: 'এডমিন'
    });

    return (
      <div className="p-8 space-y-4 max-h-[80vh] overflow-y-auto">
        <input placeholder="শিরোনাম" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        <input placeholder="ছবি URL" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
        <input placeholder="সংক্ষিপ্ত সারসংক্ষেপ" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
        <textarea placeholder="মূল সংবাদ..." rows={10} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
        <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold" onClick={() => {
          const newList = isNew ? [...articles, formData] : articles.map(a => a.id === formData.id ? formData : a);
          saveAll(undefined, newList);
        }}>{isNew ? 'প্রকাশ করুন' : 'পরিবর্তন সেভ করুন'}</button>
      </div>
    );
  };

  const CategoryForm = ({ cat }: { cat: Category }) => {
    const [formData, setFormData] = useState<Category>(cat);
    return (
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 ${formData.color} text-white rounded-2xl flex items-center justify-center shadow-md`}><DynamicIcon name={formData.icon} size={24} /></div>
          <div className="flex-grow">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ক্যাটাগরি নাম</label>
            <input className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">আইকন (Icon Name)</label>
          <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
            {Object.keys(IconMap).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg" onClick={() => {
          const newList = categories.map(c => c.id === formData.id ? formData : c);
          saveAll(undefined, undefined, newList);
        }}>ক্যাটাগরি আপডেট করুন</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 animate-fadeIn relative">
      {(editingItem || editingArticle || editingCategory || isAdding) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-3xl shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800">{isAdding ? 'নতুন যোগ করুন' : 'সম্পাদনা করুন'}</h3>
              <button onClick={() => saveAll()} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} /></button>
            </div>
            {editingItem && <ItemForm item={editingItem} />}
            {editingArticle && <ArticleForm article={editingArticle} />}
            {editingCategory && <CategoryForm cat={editingCategory} />}
            {isAdding && activeTab === 'items' && <ItemForm isNew={true} />}
            {isAdding && activeTab === 'articles' && <ArticleForm isNew={true} />}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-slate-800 transition-colors"><ChevronLeft size={24} /></button>
            <div><h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">ড্যাশবোর্ড</h1><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">তথ্য ম্যানেজমেন্ট সিস্টেম</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsAdding(true)} className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-2 text-sm"><Plus size={18} /> নতুন তথ্য</button>
            <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }} className="px-5 py-3 bg-white text-rose-500 border border-rose-100 rounded-xl font-bold hover:bg-rose-50 transition-all text-sm">লগ আউট</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">
          <button onClick={() => setActiveTab('items')} className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs ${activeTab === 'items' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>তথ্য সমূহ</button>
          <button onClick={() => setActiveTab('articles')} className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs ${activeTab === 'articles' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>খবরাখবর</button>
          <button onClick={() => setActiveTab('categories')} className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs ${activeTab === 'categories' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>ক্যাটাগরি</button>
          <button onClick={() => setActiveTab('database')} className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs ${activeTab === 'database' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>ডাটা ম্যানেজমেন্ট</button>
        </div>

        {activeTab === 'database' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-amber-600">
                <Download size={24} />
                <h3 className="text-xl font-black">ডাটা এক্সপোর্ট (Export)</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">আপনার করা সকল পরিবর্তন একটি ফাইলে সেভ করুন। এই ফাইলটি গিটহাবে আপলোড করলে সকল ইউজার আপনার আপডেটগুলো দেখতে পাবে।</p>
              <button onClick={handleExport} className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all">
                <FileJson size={20} />
                JSON ফাইল ডাউনলোড করুন
              </button>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Globe size={12} /> গিটহাব আপডেট গাইড:</h4>
                <ol className="text-[11px] text-slate-600 space-y-2 list-decimal ml-4">
                  <li>প্রথমে ওপরের বাটন থেকে ফাইলটি ডাউনলোড করুন।</li>
                  <li>ফাইলটি টেক্সট এডিটর (Notepad/VS Code) দিয়ে ওপেন করে সব লেখা কপি করুন।</li>
                  <li>আপনার গিটহাব রিপোজিটরির `data.ts` ফাইলে গিয়ে এক্সপোর্ট করা ডাটা দিয়ে রিপ্লেস করুন।</li>
                  <li>সেভ (Commit) করুন। ব্যাস! সবার জন্য ডাটা আপডেট হয়ে যাবে।</li>
                </ol>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-blue-600">
                <Upload size={24} />
                <h3 className="text-xl font-black">ব্যাকআপ ইমপোর্ট (Import)</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">আগে থেকে সেভ করা কোনো ব্যাকআপ ফাইল থাকলে সেটি এখানে আপলোড করে আপনার লোকাল ডাটা আপডেট করতে পারেন।</p>
              <label className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-all cursor-pointer">
                <Upload size={20} />
                ফাইল আপলোড করুন
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
              
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-rose-600 mb-4">
                  <RefreshCw size={24} />
                  <h3 className="text-xl font-black">রিসেট (Reset)</h3>
                </div>
                <p className="text-sm text-slate-500 mb-4">আপনার সকল লোকাল পরিবর্তন মুছে ফেলে প্রজেক্টের একদম শুরুর ডাটায় ফিরে যান।</p>
                <button onClick={handleReset} className="w-full py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl font-bold hover:bg-rose-100 transition-all">
                  সবকিছু ডিফল্ট করুন
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest leading-none">নাম/শিরোনাম</th>
                  {activeTab === 'items' && <th className="px-8 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest text-right leading-none">ক্যাটাগরি</th>}
                  <th className="px-8 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest text-right leading-none">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeTab === 'items' && items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                        <div><p className="font-bold text-slate-800 text-sm leading-none">{item.name}</p><p className="text-[10px] text-slate-400 mt-1 leading-none">{item.location}</p></div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">{item.categoryId}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingItem(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(item.id, 'item')} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'articles' && articles.slice().reverse().map(article => (
                  <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={article.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                        <div><p className="font-bold text-slate-800 text-sm leading-none">{article.title}</p><p className="text-[10px] text-slate-400 mt-1 leading-none">{article.date}</p></div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingArticle(article)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(article.id, 'article')} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'categories' && categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${cat.color} text-white rounded-xl flex items-center justify-center shadow-md`}><DynamicIcon name={cat.icon} size={18} /></div>
                        <p className="font-bold text-slate-800 text-sm leading-none">{cat.title}</p>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button onClick={() => setEditingCategory(cat)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Settings size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
          <Route path="/about" element={<AboutUs />} />
          <Route path="/developer" element={<DeveloperInfo />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/app-info" element={<AppInfo />} />
          <Route path="/category/:categoryId" element={<CategoryListView />} />
          <Route path="/detail/:itemId" element={<DetailView />} />
          <Route path="/detail/:itemId/staff/:staffId" element={<StaffDetailView />} />
          <Route path="/article/:articleId" element={<ArticleDetailView />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
