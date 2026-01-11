
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, Phone, MapPin, Calendar, Info, 
  Users, Search, User, BookOpen, Facebook, Globe, Mail, 
  LogOut, ArrowRight, Clock, Newspaper, Truck, Bus, 
  LayoutDashboard, GraduationCap, Hospital, Stethoscope, 
  Shield, Building, Briefcase, Camera, Share2, Mic, 
  Flame, ShoppingCart, PlusCircle, Landmark, Package,
  Building2, Globe2, HeartPulse, HardHat
} from 'lucide-react';
import { CATEGORIES, INFO_ITEMS, ARTICLES } from './data';
import { CategoryId, InformationItem, Article } from './types';

// Icons mapping using Lucide components for better visuals
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
  return (
    <div className={className}>
      {IconMap[name] || <PlusCircle size={24} />}
    </div>
  );
};

// Exit Confirmation Modal Component
const ExitModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border border-white/20">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <LogOut size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">বের হতে চান?</h3>
          <p className="text-gray-500 leading-relaxed">আপনি কি নিশ্চিত যে আপনি আমিনপুর থানা অ্যাপ থেকে প্রস্থান করতে চান?</p>
        </div>
        <div className="flex border-t border-gray-100">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-5 text-gray-600 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-100"
          >
            না, ফিরে যাই
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-5 text-red-600 font-bold hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            হ্যাঁ, বের হবো
          </button>
        </div>
      </div>
    </div>
  );
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Handle hardware back button logic for Home page
  useEffect(() => {
    if (location.pathname === '/') {
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

  const handleConfirmExit = () => {
    window.location.href = "about:blank";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ExitModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)} 
        onConfirm={handleConfirmExit} 
      />

      <header className="bg-emerald-600 text-white shadow-md fixed top-0 w-full z-50 px-4 py-3 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-xl shadow-inner">
            <Shield className="text-emerald-600 w-5 h-5" />
          </div>
          <span className="tracking-tight">আমিনপুর থানা</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
      </header>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b flex justify-between items-center bg-emerald-50">
          <div>
            <h2 className="text-lg font-bold text-emerald-900">মেনু নেভিগেশন</h2>
            <p className="text-xs text-emerald-600">আমিনপুর থানা ডিজিটাল সেবা</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1 h-[calc(100%-80px)] overflow-y-auto">
          <Link to="/" className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 rounded-xl text-gray-700 font-semibold group transition-all">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <LayoutDashboard size={20} />
            </div>
            <span>হোম পেজ</span>
          </Link>
          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">প্রধান তথ্য ও সেবা</div>
          <div className="grid gap-1">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-xl text-gray-600 font-medium transition-all">
                <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                  <DynamicIcon name={cat.icon} className="w-5 h-5" />
                </div>
                <span>{cat.title}</span>
              </Link>
            ))}
          </div>
          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">সাপোর্ট ও অন্যান্য</div>
          <Link to="/about-us" className="flex items-center gap-3 p-3.5 hover:bg-blue-50 rounded-xl text-gray-600 font-medium transition-all">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={20} /></div>
            <span>আমাদের সম্পর্কে</span>
          </Link>
          <Link to="/about-app" className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 rounded-xl text-gray-600 font-medium transition-all">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Info size={20} /></div>
            <span>এপস সম্পর্কে</span>
          </Link>
          <Link to="/developer" className="flex items-center gap-3 p-3.5 hover:bg-orange-50 rounded-xl text-gray-600 font-medium transition-all">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><User size={20} /></div>
            <span>ডেভেলপার প্রোফাইল</span>
          </Link>

          <div className="mt-8 pt-4 border-t">
            <button 
              onClick={() => {
                setIsSidebarOpen(false);
                setShowExitModal(true);
              }}
              className="w-full flex items-center gap-3 p-3.5 hover:bg-red-50 rounded-xl text-red-600 font-bold transition-all"
            >
              <div className="p-2 bg-red-100 text-red-600 rounded-lg"><LogOut size={20} /></div>
              <span>প্রস্থান করুন</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-grow pt-20 pb-16 px-4 md:max-w-4xl md:mx-auto w-full">
        {children}
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-500 text-xs">
        <p className="font-medium">© ২০২৪ আমিনপুর থানা তথ্য ও সেবা পোর্টাল</p>
        <p className="mt-2 text-emerald-700 font-bold uppercase tracking-wider">ডেভেলপার: মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isSearching = searchTerm.trim() !== '';

  // Filter categories for the grid - Exclude NEWS during search
  const filteredCategories = CATEGORIES.filter(cat => {
    const matches = cat.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (isSearching) {
      return matches && cat.id !== CategoryId.NEWS;
    }
    return true; // Show all when not searching
  });

  // Filter items for direct results during search - Exclude items in NEWS category
  const filteredItems = INFO_ITEMS.filter(item => {
    if (!isSearching) return false;
    const matches = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matches && item.categoryId !== CategoryId.NEWS;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-7 text-white shadow-xl text-center">
        <h1 className="text-3xl font-extrabold mb-1">স্বাগতম!</h1>
        <p className="opacity-90 text-sm mb-6 font-medium">আমিনপুর থানার সকল প্রয়োজনীয় তথ্য এখন হাতের মুঠোয়।</p>
        <div className="relative group max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="স্কুল, হাসপাতাল বা ইউনিয়ন খুঁজুন..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 bg-slate-100 focus:bg-white focus:ring-4 focus:ring-emerald-200/50 outline-none transition-all shadow-inner border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Grid or Search Results */}
      <section className="space-y-6">
        {isSearching && filteredItems.length > 0 && (
          <div className="space-y-4">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>খুঁজে পাওয়া তথ্যসমূহ
            </h2>
            <div className="grid gap-4">
              {filteredItems.map(item => (
                <Link key={item.id} to={`/detail/${item.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                  <div className="w-24 h-24 shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-center">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={12} className="text-emerald-500" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Icons Grid */}
        <div className="space-y-4">
           {!isSearching && (
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>সেবা ক্যাটাগরি
            </h2>
           )}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
            {filteredCategories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all active:scale-95">
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <DynamicIcon name={cat.icon} className="w-7 h-7" />
                </div>
                <span className="text-[14px] font-bold text-slate-700 text-center leading-tight group-hover:text-emerald-700 transition-colors">{cat.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles - ONLY SHOW WHEN NOT SEARCHING */}
      {!isSearching && (
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>সর্বশেষ আর্টিকেল
            </h2>
            <Link to={`/category/${CategoryId.NEWS}`} className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
              সব দেখুন <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES.map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300" >
                <div className="h-44 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
                    <Clock size={12} /><span>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 leading-tight line-clamp-2 transition-colors">{article.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-400 font-medium">লিখেছেন: {article.author}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><ArrowRight size={16} /></div>
                  </div>
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
  const article = ARTICLES.find(a => a.id === articleId);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 hover:bg-gray-50 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 truncate">আর্টিকেল বিস্তারিত</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="relative h-72">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Clock size={14} /><span>{article.date}</span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight">{article.title}</h2>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 border-b pb-6">
             <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-lg">
                {article.author.charAt(0)}
             </div>
             <div>
                <p className="text-slate-400 text-xs uppercase font-bold">লেখক</p>
                <p className="text-slate-800 font-bold">{article.author}</p>
             </div>
          </div>
          <article className="prose prose-slate max-w-none">
             <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                {article.content}
             </p>
          </article>
        </div>
      </div>
    </div>
  );
};

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === categoryId);
  
  if (!category) return <div>Category not found</div>;

  if (categoryId === CategoryId.NEWS) {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
        </div>
        <div className="grid gap-4">
          {ARTICLES.map(article => (
            <Link key={article.id} to={`/article/${article.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
              <div className="w-28 h-28 shrink-0 overflow-hidden"><img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" /></div>
              <div className="p-4 flex-grow flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">{article.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500"><Clock size={12} className="text-emerald-500" /><span>{article.date}</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const items = INFO_ITEMS.filter(i => i.categoryId === categoryId);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4"><Info size={32} /></div>
          <p className="text-slate-400 font-medium">এই ক্যাটাগরিতে এখনো কোনো তথ্য যুক্ত করা হয়নি।</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <Link key={item.id} to={`/detail/${item.id}`} className="flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
              <div className="w-28 h-28 shrink-0 overflow-hidden"><img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" /></div>
              <div className="p-4 flex-grow flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={14} className="text-emerald-500" /><span className="truncate">{item.location}</span></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AboutUsView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-slate-800">আমাদের সম্পর্কে</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm p-8 space-y-6 border border-slate-100">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <p className="text-emerald-900 leading-relaxed text-center font-medium">পাবনা জেলার বেড়া উপজেলার অন্তর্গত একটি ঐতিহ্যবাহী প্রশাসনিক এলাকা আমিনপুর থানা। যমুনা ও হুরাসাগর নদীর কোল ঘেঁষে গড়ে ওঠা এই অঞ্চল তার প্রাকৃতিক সৌন্দর্য এবং সামাজিক ভ্রাতৃত্বের জন্য সুপরিচিত।</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-emerald-800">ঐতিহ্য ও সংস্কৃতি</h3>
          <p className="text-slate-600 leading-relaxed">আমিনপুর থানা এলাকাটি কৃষি ও বাণিজ্যের জন্য বিখ্যাত। এখানকার মানুষ সহজ-সরল এবং অতিথিপরায়ণ। শিক্ষার প্রসারে অত্র এলাকায় অসংখ্য সরকারি-বেসরকারি স্কুল ও মাদ্রাসা রয়েছে যা আলোকবর্তিকা হিসেবে কাজ করছে।</p>
        </div>
      </div>
    </div>
  );
};

const AboutAppView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-slate-800">এপস সম্পর্কে</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm p-8 space-y-6 border border-slate-100">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <p className="text-indigo-900 leading-relaxed text-center italic font-medium">"আমিনপুর থানা তথ্য ও সেবা" - আপনার এলাকার ডিজিটাল ডিরেক্টরি।</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-indigo-800">অ্যাপের লক্ষ্য</h3>
          <p className="text-slate-600 leading-relaxed">স্মার্ট বাংলাদেশ গড়ার প্রত্যয়ে আমিনপুর থানার সাধারণ নাগরিকদের দোরগোড়ায় প্রয়োজনীয় তথ্য পৌঁছে দিতে এই অ্যাপটি ডিজাইন করা হয়েছে।</p>
        </div>
        <div className="pt-6 border-t text-center text-xs text-slate-400 font-medium">ভার্সন: ১.০.০ | আপডেট: মে ২০২৪</div>
      </div>
    </div>
  );
};

const DeveloperView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-slate-800">ডেভেলপার প্রোফাইল</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-sm text-center p-8 border border-slate-100">
        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-emerald-500/20 mx-auto mb-8">
           <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop" alt="মীর রাব্বি হোসেন" className="w-full h-full object-cover"/>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">মীর রাব্বি হোসেন</h2>
        <p className="text-emerald-600 font-bold mb-6 tracking-wide">Full-Stack Developer & UI/UX Designer</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="#" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all"><Facebook className="text-blue-600" /><span className="text-xs font-bold text-slate-500">ফেসবুক</span></a>
          <a href="#" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-all"><Globe className="text-emerald-600" /><span className="text-xs font-bold text-slate-500">ওয়েবসাইট</span></a>
          <a href="mailto:contact@mirrabbi.com" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-red-50 transition-all"><Mail className="text-red-500" /><span className="text-xs font-bold text-slate-500">ইমেইল</span></a>
          <a href="tel:01700000000" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-all"><Phone className="text-emerald-600" /><span className="text-xs font-bold text-slate-500">কল করুন</span></a>
        </div>
      </div>
    </div>
  );
};

const DetailView: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const item = INFO_ITEMS.find(i => i.id === itemId);

  if (!item) return <div>Item not found</div>;

  const isUnion = item.categoryId === CategoryId.UNION;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100 transition-all hover:bg-gray-50"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold text-slate-800 truncate">{item.name}</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="relative h-64">
           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h2 className="text-3xl font-bold text-white">{item.name}</h2>
           </div>
        </div>
        
        <div className="p-8 space-y-8">
          <section>
             <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full"></div>সংক্ষিপ্ত বর্ণনা
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm"><MapPin size={24} /></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">লোকেশন</p><p className="text-sm font-bold text-slate-700">{item.location}</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm"><Phone size={24} /></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">যোগাযোগ</p><a href={`tel:${item.phone}`} className="text-lg font-bold text-emerald-700 hover:underline">{item.phone}</a></div>
            </div>
            {item.chairman && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm"><User size={24} /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">চেয়ারম্যান</p><p className="text-sm font-bold text-slate-700">{item.chairman}</p></div>
              </div>
            )}
            {item.estYear && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm"><Calendar size={24} /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">স্থাপিত</p><p className="text-sm font-bold text-slate-700">{item.estYear} খ্রি.</p></div>
              </div>
            )}
          </section>

          {item.fullDetails && (
            <section className="space-y-3">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Info size={20} className="text-emerald-600" />বিস্তারিত তথ্য</h3>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-slate-600 leading-relaxed text-sm whitespace-pre-line">{item.fullDetails}</div>
            </section>
          )}

          {item.teachers && (
            <section className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Users size={20} className="text-emerald-600" />শিক্ষকবৃন্দের তালিকা</h3>
              <div className="grid gap-3">
                {item.teachers.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all shadow-sm">
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-4 border-slate-50" />
                    <div><h4 className="font-bold text-slate-800">{t.name}</h4><p className="text-xs text-slate-500 font-semibold">{t.designation}</p></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {item.doctors && (
            <section className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Users size={20} className="text-emerald-600" />ডাক্তারগণের তালিকা</h3>
              <div className="grid gap-3">
                {item.doctors.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <img src={d.image} alt={d.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-50" />
                      <div><h4 className="font-bold text-slate-800">{d.name}</h4><p className="text-xs text-emerald-600 font-bold uppercase">{d.specialty}</p></div>
                    </div>
                    <a href={`tel:${d.phone}`} className="p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all"><Phone size={20} /></a>
                  </div>
                ))}
              </div>
            </section>
          )}
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
          <Route path="/about-us" element={<AboutUsView />} />
          <Route path="/about-app" element={<AboutAppView />} />
          <Route path="/developer" element={<DeveloperView />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
