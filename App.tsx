
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Search, 
  Clock, Newspaper, Bus, 
  LayoutDashboard, GraduationCap, Hospital, Stethoscope, 
  Shield, Building, Briefcase, Camera, Share2, Mic, 
  Flame, ShoppingCart, PlusCircle, Building2, Package,
  Info, User, Mail, Smartphone, ArrowRight
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, INFO_ITEMS as INITIAL_INFO_ITEMS, ARTICLES as INITIAL_ARTICLES } from './data';
import { CategoryId, InformationItem, Article, Category, StaffProfile } from './types';

// Icons mapping
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

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  return <div className={className}>{IconMap[name] || <PlusCircle size={22} />}</div>;
};

// Storage Helpers
const getStorage = <T,>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

// --- CLIENT VIEWS ---

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const isSearching = searchTerm.trim() !== '';

  const filteredCategories = categories.filter(cat => cat.id !== CategoryId.NEWS && (isSearching ? cat.title.toLowerCase().includes(searchTerm.toLowerCase()) : true));
  const filteredItems = items.filter(item => isSearching && (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[2.5rem] p-8 text-white shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-4 -right-4 opacity-5 rotate-12"><Shield size={120} /></div>
        
        <h1 className="text-5xl font-black mb-2 tracking-tight">স্বাগতম!</h1>
        <p className="opacity-80 text-xs mb-8 font-medium tracking-tight">আমিনপুর থানার সকল তথ্য একসাথে</p>
        
        <div className="relative group max-w-sm mx-auto z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="কী খুঁজছেন?" 
            className="w-full pl-11 pr-5 py-3.5 rounded-2xl text-slate-800 bg-white outline-none shadow-xl focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </section>

      {isSearching && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold px-1 text-slate-800">সার্চ রেজাল্ট ({filteredItems.length})</h2>
          <div className="grid gap-3">
            {filteredItems.map(item => (
              <Link key={item.id} to={`/detail/${item.id}`} className="flex bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2 hover:border-emerald-200 transition-all">
                <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="p-3 flex flex-col justify-center"><h3 className="font-bold text-sm text-slate-800">{item.name}</h3><p className="text-[10px] text-slate-400 mt-0.5">{item.location}</p></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!isSearching && (
        <>
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredCategories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center justify-center p-5 bg-white rounded-[1.8rem] shadow-sm border border-slate-50 hover:border-emerald-100 transition-all active:scale-95 group">
                  <div className={`w-11 h-11 ${cat.color} rounded-xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}><DynamicIcon name={cat.icon} /></div>
                  <span className="text-[12px] font-bold text-slate-700 text-center">{cat.title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-slate-800">খবরাখবর</h2>
              <Link to={`/category/${CategoryId.NEWS}`} className="text-rose-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">সব খবরের তালিকা <ArrowRight size={10} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articles.slice(0, 3).map(article => (
                <Link key={article.id} to={`/article/${article.id}`} className="bg-white rounded-[1.8rem] overflow-hidden border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300">
                  <div className="h-40 overflow-hidden"><img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 mb-2 uppercase tracking-tighter"><Clock size={10} /><span>{article.date}</span></div>
                    <h3 className="text-sm font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{article.excerpt}</p>
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

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const categories = getStorage<Category[]>('categories', INITIAL_CATEGORIES);
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const articles = getStorage<Article[]>('articles', INITIAL_ARTICLES);
  const category = categories.find(c => c.id === categoryId);

  if (!category) return <div className="p-10 text-center">তথ্য পাওয়া যায়নি</div>;
  const list = categoryId === CategoryId.NEWS ? articles : items.filter(i => i.categoryId === categoryId);

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

const DetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const items = getStorage<InformationItem[]>('items', INITIAL_INFO_ITEMS);
  const item = items.find(i => i.id === itemId);

  if (!item) return <div className="p-10 text-center font-bold">তথ্য পাওয়া যায়নি</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
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
        <div className="p-8 space-y-8">
          <section className="space-y-3">
            <h3 className="font-black text-lg text-slate-800">প্রতিষ্ঠানের পরিচিতি</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
          </section>
          
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
  const { articleId } = useParams<{ articleId: string }>();
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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsSidebarOpen(false); }, [location]);

  if (location.pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <header className="bg-emerald-600 text-white shadow-xl fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-black tracking-tight">আমিনপুর থানা</Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-emerald-700 rounded-xl transition-colors"><Menu size={24} /></button>
      </header>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b flex flex-col gap-1 bg-slate-50 relative">
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-slate-400 p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
          <h2 className="font-black text-emerald-600 text-xl tracking-tighter">আমিনপুর থানা</h2>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ডিজিটাল তথ্য পোর্টাল</p>
        </div>
        
        <nav className="p-6 space-y-2 overflow-y-auto h-[calc(100%-140px)] scrollbar-hide">
          <Link to="/" className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group">
            <LayoutDashboard size={18} className="text-emerald-600" />
            <span>হোমপেজ</span>
          </Link>
          
          <button onClick={() => alert('আমাদের সম্পর্কে বিস্তারিত তথ্য শীঘ্রই যুক্ত করা হবে।')} className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group text-left">
            <Info size={18} className="text-emerald-600" />
            <span>আমাদের সম্পর্কে</span>
          </button>
          
          <button onClick={() => alert('ডেভেলপার: মীর রাব্বি হোসেন')} className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group text-left">
            <User size={18} className="text-emerald-600" />
            <span>ডেভেলপার সম্পর্কে</span>
          </button>
          
          <button onClick={() => alert('যোগাযোগ করুন: mirrabbihossain@gmail.com')} className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group text-left">
            <Mail size={18} className="text-emerald-600" />
            <span>যোগাযোগ</span>
          </button>
          
          <button onClick={() => alert('আমিনপুর থানা তথ্য বাতায়ন ভার্সন ১.০.০')} className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl text-slate-700 font-bold transition-all text-sm group text-left">
            <Smartphone size={18} className="text-emerald-600" />
            <span>এপস সম্পর্কে</span>
          </button>
        </nav>
        
        <div className="absolute bottom-8 left-8 right-8 text-center">
           <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">আমিনপুর ডিজিটাল বাতায়ন</p>
        </div>
      </aside>

      <main className="flex-grow pt-24 pb-16 px-5 md:max-w-4xl md:mx-auto w-full">{children}</main>
      <footer className="bg-white border-t py-6 text-center">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

// --- ADMIN VIEWS ---

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 mb-6 text-center tracking-tight">এডমিন লগইন</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড প্রবেশ করুন" 
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">প্রবেশ করুন</button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'items' | 'articles'>('items');
  
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const [items, setItems] = useState<InformationItem[]>(() => getStorage('items', INITIAL_INFO_ITEMS));
  const [articles, setArticles] = useState<Article[]>(() => getStorage('articles', INITIAL_ARTICLES));

  const handleDeleteItem = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত?')) {
      const newList = items.filter(i => i.id !== id);
      setItems(newList);
      localStorage.setItem('items', JSON.stringify(newList));
    }
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত?')) {
      const newList = articles.filter(a => a.id !== id);
      setArticles(newList);
      localStorage.setItem('articles', JSON.stringify(newList));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">এডমিন ড্যাশবোর্ড</h1>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="px-5 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">লগ আউট</button>
            <Link to="/" className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all text-sm">সাইট দেখুন</Link>
          </div>
        </div>

        <div className="flex gap-2 p-1.5 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('items')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'items' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >তথ্য সমূহ</button>
          <button 
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${activeTab === 'articles' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >খবরাখবর</button>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest">নাম/শিরোনাম</th>
                  <th className="px-8 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {activeTab === 'items' ? items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button onClick={() => handleDeleteItem(item.id)} className="text-rose-500 font-black hover:text-rose-700 text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-rose-50 rounded-lg transition-all">ডিলিট</button>
                    </td>
                  </tr>
                )) : articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={article.image} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{article.title}</p>
                          <p className="text-[10px] text-slate-400">{article.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button onClick={() => handleDeleteArticle(article.id)} className="text-rose-500 font-black hover:text-rose-700 text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-rose-50 rounded-lg transition-all">ডিলিট</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
