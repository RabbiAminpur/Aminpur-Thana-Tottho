
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Menu, X, ChevronLeft, Phone, MapPin, Calendar, Info, Users, Search, User, BookOpen, Facebook, Globe, Mail, LogOut, ArrowRight, Clock, Newspaper } from 'lucide-react';
import { CATEGORIES, INFO_ITEMS, ARTICLES } from './data';
import { CategoryId, InformationItem, Article } from './types';

// Icons mapping helper
const IconMap: any = {
  'graduation-cap': <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />,
  'hospital': <path d="M18 7c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h12zM9 14h6m-3-3v6M12 2v5" />,
  'stethoscope': <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-11 5h2v-4h4v-2h-4V7h-2v4H7v2h4v4z" />, // Medicine/Doctor
  'shield': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm0-16.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM12 18c-2.48 0-4.5-2.02-4.5-4.5S9.52 9 12 9s4.5 2.02 4.5 4.5S14.48 18 12 18z" />, // Police Badge
  'building': <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />,
  'briefcase': <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />,
  'camera': <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />,
  'share-2': <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  'mic': <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 15H6v-2h2v2zm0-4H6V9h2v2zm10 4H10v-2h8v2zm0-4H10V9h8v2z" />, // Press Card
  'flame': <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.56-2.63-1.46-3.53a3.5 3.5 0 0 1 4.92 4.92A2.5 2.5 0 0 0 13.5 18a2.5 2.5 0 0 0 0-5" />,
  'shopping-cart': <circle cx="8" cy="21" r="1" />,
  'newspaper': <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />,
  'plus-circle': <circle cx="12" cy="12" r="10" />
};

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {IconMap[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// Exit Confirmation Modal
const ExitModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fadeIn">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">প্রস্থান নিশ্চিত করুন</h3>
          <p className="text-gray-500">আপনি কি অ্যাপ থেকে বের হতে চান?</p>
        </div>
        <div className="flex border-t">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-4 text-gray-600 font-bold hover:bg-gray-50 transition-colors border-r"
          >
            না
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-4 text-red-600 font-bold hover:bg-red-50 transition-colors"
          >
            হ্যাঁ
          </button>
        </div>
      </div>
    </div>
  );
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white shadow-md fixed top-0 w-full z-50 px-4 py-3 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-xl shadow-inner">
            <DynamicIcon name="shield" className="text-emerald-600 w-5 h-5" />
          </div>
          <span className="tracking-tight">আমিনপুর থানা</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b flex justify-between items-center bg-emerald-50">
          <div>
            <h2 className="text-lg font-bold text-emerald-900">মেনু নেভিগেশন</h2>
            <p className="text-xs text-emerald-600">আমিনপুর থানা ডিজিটাল সেবা</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1 h-[calc(100%-80px)] overflow-y-auto">
          <Link to="/" className="flex items-center gap-3 p-3.5 hover:bg-emerald-50 rounded-xl text-gray-700 font-semibold transition-all group">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <DynamicIcon name="plus-circle" className="w-5 h-5" />
            </div>
            <span>হোম পেজ</span>
          </Link>
          
          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">প্রধান তথ্য ও সেবা</div>
          <div className="grid gap-1">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`} 
                className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-xl text-gray-600 font-medium transition-all"
              >
                <div className={`w-10 h-10 ${cat.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                  <DynamicIcon name={cat.icon} className="w-5 h-5" />
                </div>
                <span>{cat.title}</span>
              </Link>
            ))}
          </div>

          <div className="pt-6 pb-2 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">সাপোর্ট ও অন্যান্য</div>
          <Link to="/about" className="flex items-center gap-3 p-3.5 hover:bg-blue-50 rounded-xl text-gray-600 font-medium transition-all">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <BookOpen size={20} />
            </div>
            <span>এবাউট আস</span>
          </Link>
          <Link to="/developer" className="flex items-center gap-3 p-3.5 hover:bg-orange-50 rounded-xl text-gray-600 font-medium transition-all">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <User size={20} />
            </div>
            <span>ডেভেলপার প্রোফাইল</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-16 px-4 md:max-w-4xl md:mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-gray-500 text-xs">
        <p className="font-medium">© ২০২৪ আমিনপুর থানা তথ্য ও সেবা পোর্টাল</p>
        <p className="mt-2 text-emerald-700 font-bold uppercase tracking-wider">ডেভেলপার: মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  const navigate = useNavigate();

  // Handling hardware back button on Home
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      // Push state to prevent immediate exit and show modal
      window.history.pushState(null, '', window.location.href);
      setShowExitModal(true);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleConfirmExit = () => {
    window.location.href = "about:blank";
  };

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <ExitModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)} 
        onConfirm={handleConfirmExit} 
      />

      {/* Welcome & Search */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-7 text-white shadow-xl text-center">
        <h1 className="text-3xl font-extrabold mb-1">স্বাগতম!</h1>
        <p className="opacity-90 text-sm mb-6 font-medium">আমিনপুর থানার সকল প্রয়োজনীয় তথ্য এখন হাতের মুঠোয়।</p>
        <div className="relative group max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="কি খুঁজছেন? যেমন: স্কুল, হাসপাতাল..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 bg-emerald-50 focus:bg-white focus:ring-4 focus:ring-emerald-200/50 outline-none transition-all shadow-inner border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          {filteredCategories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all active:scale-95"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <DynamicIcon name={cat.icon} className="w-7 h-7" />
              </div>
              <span className="text-[14px] font-bold text-slate-700 text-center leading-tight group-hover:text-emerald-700 transition-colors">{cat.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
             সর্বশেষ আর্টিকেল
          </h2>
          <Link to={`/category/${CategoryId.NEWS}`} className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
             সব দেখুন <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ARTICLES.map((article) => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300"
            >
              <div className="h-44 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
                  <Clock size={12} />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-slate-400 font-medium">লিখেছেন: {article.author}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const ArticleDetailView: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.id === articleId);

  if (!article) return <div>Article not found</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 truncate">আর্টিকেল বিস্তারিত</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-100">
        <div className="relative h-72">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Clock size={14} />
              <span>{article.date}</span>
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

  // Handle News Category specifically
  if (categoryId === CategoryId.NEWS) {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-all border border-slate-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
        </div>

        <div className="grid gap-4">
          {ARTICLES.map(article => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`}
              className="flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group"
            >
              <div className="w-28 h-28 shrink-0 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors line-clamp-1">{article.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={12} className="text-emerald-500" />
                  <span>{article.date}</span>
                </div>
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
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-all border border-slate-100"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">{category.title}</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info size={32} />
          </div>
          <p className="text-slate-400 font-medium">এই ক্যাটাগরিতে এখনো কোনো তথ্য যুক্ত করা হয়নি।</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <Link 
              key={item.id} 
              to={`/detail/${item.id}`}
              className="flex bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group"
            >
              <div className="w-28 h-28 shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} className="text-emerald-500" />
                  <span className="truncate">{item.location}</span>
                </div>
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
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">এবাউট আস</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-8 space-y-6 border border-slate-100">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <p className="text-emerald-900 leading-relaxed text-center italic font-medium">
            "আমিনপুর থানা তথ্য ও সেবা অ্যাপের মাধ্যমে আপনি আপনার এলাকার সকল গুরুত্বপূর্ণ তথ্য এক নিমিষেই আপনার হাতের নাগালে পাবেন।"
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-emerald-800">আমাদের উদ্দেশ্য</h3>
          <p className="text-slate-600 leading-relaxed">
            আমাদের মূল লক্ষ্য হলো আমিনপুর থানার সাধারণ নাগরিকদের ডিজিটাল সেবা প্রদান করা। জরুরি প্রয়োজনে সঠিক তথ্য খুঁজে বের করা অনেক সময় কষ্টসাধ্য হয়। আমরা সেই সমস্যা সমাধানের লক্ষ্যেই শিক্ষা প্রতিষ্ঠান, হাসপাতাল, পুলিশ স্টেশন এবং প্রশাসনের সকল প্রয়োজনীয় কন্টাক্ট ইনফরমেশন একই প্ল্যাটফর্মে নিয়ে এসেছি।
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-emerald-800">অ্যাপের বৈশিষ্ট্যসমূহ</h3>
          <ul className="space-y-3">
            {[
              "শিক্ষা প্রতিষ্ঠানের বিস্তারিত তথ্য (EIIN, শিক্ষকদের তালিকা)।",
              "হাসপাতাল ও ডাক্তারগণের সাথে সরাসরি যোগাযোগের সুযোগ।",
              "থানা ও ফায়ার সার্ভিসের কন্টাক্ট নাম্বার।",
              "ইউনিয়ন পরিষদের চেয়ারম্যান ও সদস্যদের তথ্য।",
              "হাট-বাজার ও দর্শনীয় স্থানের বিবরণ।"
            ].map((text, idx) => (
              <li key={idx} className="flex gap-3 text-slate-600 items-start">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const DeveloperView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">ডেভেলপার প্রোফাইল</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden text-center p-8 border border-slate-100">
        <div className="relative inline-block mb-8">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-emerald-500/20">
             <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop" 
              alt="মীর রাব্বি হোসেন" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg border-2 border-white">
            <User size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-1">মীর রাব্বি হোসেন</h2>
        <p className="text-emerald-600 font-bold mb-6 tracking-wide">Full-Stack Developer & UI/UX Designer</p>
        
        <p className="text-slate-600 leading-relaxed max-w-lg mx-auto mb-8 font-medium">
          আমি একজন অভিজ্ঞ ফুল-স্ট্যাক ডেভেলপার হিসেবে আধুনিক প্রযুক্তি ব্যবহার করে ইউজার-ফ্রেন্ডলি অ্যাপলিকেশন তৈরিতে কাজ করছি। এই অ্যাপটি আমিনপুর থানার মানুষের উপকারের জন্য একটি স্বেচ্ছাসেবী উদ্যোগ হিসেবে তৈরি করা হয়েছে।
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="#" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100">
            <Facebook className="text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-500">ফেসবুক</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-all group border border-transparent hover:border-emerald-100">
            <Globe className="text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-500">ওয়েবসাইট</span>
          </a>
          <a href="mailto:contact@mirrabbi.com" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-red-50 transition-all group border border-transparent hover:border-red-100">
            <Mail className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-500">ইমেইল</span>
          </a>
          <a href="tel:01700000000" className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-all group border border-transparent hover:border-emerald-100">
            <Phone className="text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-500">কল করুন</span>
          </a>
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

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-3 bg-white text-gray-700 rounded-2xl shadow-sm border border-slate-100">
          <ChevronLeft size={24} />
        </button>
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
            <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">লোকেশন</p>
                <p className="text-sm font-bold text-slate-700">{item.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ফোন নাম্বার</p>
                <a href={`tel:${item.phone}`} className="text-lg font-bold text-emerald-700 hover:underline">{item.phone}</a>
              </div>
            </div>
            {item.estYear && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">স্থাপিত</p>
                  <p className="text-sm font-bold text-slate-700">{item.estYear} খ্রি.</p>
                </div>
              </div>
            )}
            {item.eiin && (
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                  <Info size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">EIIN নাম্বার</p>
                  <p className="text-sm font-bold text-slate-700 font-mono tracking-widest">{item.eiin}</p>
                </div>
              </div>
            )}
          </section>

          {item.fullDetails && (
            <section className="space-y-3">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Info size={20} className="text-emerald-600" />
                বিস্তারিত তথ্য
              </h3>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-slate-600 leading-relaxed text-sm">
                {item.fullDetails}
              </div>
            </section>
          )}

          {item.teachers && (
            <section className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                শিক্ষকবৃন্দের তালিকা
              </h3>
              <div className="grid gap-3">
                {item.teachers.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all shadow-sm">
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-4 border-slate-50 shadow-inner" />
                    <div>
                      <h4 className="font-bold text-slate-800">{t.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{t.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {item.doctors && (
            <section className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                ডাক্তারগণের তালিকা
              </h3>
              <div className="grid gap-4">
                {item.doctors.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-5">
                      <img src={d.image} alt={d.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-50 shadow-md" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{d.name}</h4>
                        <p className="text-xs text-emerald-600 font-black uppercase tracking-widest">{d.specialty}</p>
                      </div>
                    </div>
                    <a href={`tel:${d.phone}`} className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 active:scale-90 transition-all shadow-lg shadow-emerald-200">
                      <Phone size={20} />
                    </a>
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
          <Route path="/about" element={<AboutUsView />} />
          <Route path="/developer" element={<DeveloperView />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
