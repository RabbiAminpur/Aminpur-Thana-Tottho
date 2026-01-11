
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Menu, X, ChevronLeft, Phone, MapPin, Calendar, Info, Users, Search, User, BookOpen, Facebook, Globe, Mail } from 'lucide-react';
import { CATEGORIES, INFO_ITEMS } from './data';
import { CategoryId, InformationItem } from './types';

// Icons mapping helper
const IconMap: any = {
  'graduation-cap': <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />,
  'hospital': <path d="M18 7c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h12zM9 14h6m-3-3v6M12 2v5" />,
  'stethoscope': <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3ZM3 13h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm11 0h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Zm-1-5V4a1 1 0 0 1 1-1h5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1Z" />,
  'shield': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />,
  'building': <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />,
  'briefcase': <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />,
  'camera': <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />,
  'share-2': <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  'mic': <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8" />,
  'flame': <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.56-2.63-1.46-3.53a3.5 3.5 0 0 1 4.92 4.92A2.5 2.5 0 0 0 13.5 18a2.5 2.5 0 0 0 0-5" />,
  'shopping-cart': <circle cx="8" cy="21" r="1" />,
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
      {IconMap[name]}
    </svg>
  );
};

// Components
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-600 text-white shadow-lg fixed top-0 w-full z-50 px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <DynamicIcon name="shield" className="text-emerald-600 w-5 h-5" />
          </div>
          <span>আমিনপুর থানা সেবা</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-1 hover:bg-emerald-700 rounded-lg transition-colors">
          <Menu size={28} />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-800">মেনু</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-lg text-gray-700 font-medium">
            <DynamicIcon name="plus-circle" className="w-5 h-5 text-emerald-600" />
            <span>হোম</span>
          </Link>
          
          <div className="pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">তথ্য ও সেবা</div>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`} 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-lg text-gray-600 transition-colors"
            >
              <DynamicIcon name={cat.icon} className="w-5 h-5" />
              <span>{cat.title}</span>
            </Link>
          ))}

          <div className="pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">অ্যাপ সম্পর্কে</div>
          <Link to="/about" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-lg text-gray-600 transition-colors">
            <BookOpen size={20} className="text-blue-500" />
            <span>এবাউট আস</span>
          </Link>
          <Link to="/developer" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-lg text-gray-600 transition-colors">
            <User size={20} className="text-orange-500" />
            <span>ডেভেলপার</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-16 px-4 md:max-w-4xl md:mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
        <p>© ২০২৪ আমিনপুর থানা তথ্য ও সেবা পোর্টাল</p>
        <p className="mt-2 text-emerald-700 font-semibold">ডেভেলপার: মীর রাব্বি হোসেন</p>
      </footer>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome & Search */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold mb-2">স্বাগতম!</h1>
        <p className="opacity-90 text-sm mb-4">আমিনপুর থানার সকল নাগরিক তথ্য এক জায়গায়।</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
          <input 
            type="text" 
            placeholder="কি খুঁজছেন? যেমন: স্কুল, হাসপাতাল..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 focus:ring-4 focus:ring-emerald-200 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => (
          <Link 
            key={cat.id} 
            to={`/category/${cat.id}`}
            className="group flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-sm border border-transparent hover:border-emerald-200 hover:shadow-md transition-all active:scale-95"
          >
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
              <DynamicIcon name={cat.icon} className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-gray-700 text-center leading-tight">{cat.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CategoryListView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const items = INFO_ITEMS.filter(i => i.categoryId === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{category.title}</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">এই ক্যাটাগরিতে এখনো কোনো তথ্য যুক্ত করা হয়নি।</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <Link 
              key={item.id} 
              to={`/detail/${item.id}`}
              className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="p-3 flex-grow flex flex-col justify-center">
                <h3 className="font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} />
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
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">এবাউট আস</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <p className="text-gray-700 leading-relaxed text-center italic">
            "আমিনপুর থানা তথ্য ও সেবা অ্যাপের মাধ্যমে আপনি আপনার এলাকার সকল গুরুত্বপূর্ণ তথ্য এক নিমিষেই আপনার হাতের নাগালে পাবেন।"
          </p>
        </div>
        
        <h3 className="text-lg font-bold text-emerald-800">আমাদের উদ্দেশ্য</h3>
        <p className="text-gray-600 leading-relaxed">
          আমাদের মূল লক্ষ্য হলো আমিনপুর থানার সাধারণ নাগরিকদের ডিজিটাল সেবা প্রদান করা। জরুরি প্রয়োজনে সঠিক তথ্য খুঁজে বের করা অনেক সময় কষ্টসাধ্য হয়। আমরা সেই সমস্যা সমাধানের লক্ষ্যেই শিক্ষা প্রতিষ্ঠান, হাসপাতাল, পুলিশ স্টেশন এবং প্রশাসনের সকল প্রয়োজনীয় কন্টাক্ট ইনফরমেশন একই প্ল্যাটফর্মে নিয়ে এসেছি।
        </p>

        <h3 className="text-lg font-bold text-emerald-800">অ্যাপের বৈশিষ্ট্যসমূহ</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>শিক্ষা প্রতিষ্ঠানের বিস্তারিত তথ্য (EIIN, শিক্ষকদের তালিকা)।</li>
          <li>হাসপাতাল ও ডাক্তারগণের সাথে সরাসরি যোগাযোগের সুযোগ।</li>
          <li>থানা ও ফায়ার সার্ভিসের কন্টাক্ট নাম্বার।</li>
          <li>ইউনিয়ন পরিষদের চেয়ারম্যান ও সদস্যদের তথ্য।</li>
          <li>হাট-বাজার ও দর্শনীয় স্থানের বিবরণ।</li>
        </ul>
      </div>
    </div>
  );
};

const DeveloperView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">ডেভেলপার প্রোফাইল</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden text-center p-8">
        <div className="relative inline-block mb-6">
          <img 
            src="https://picsum.photos/seed/developer-rabbi/400/400" 
            alt="মীর রাব্বি হোসেন" 
            className="w-40 h-40 rounded-full object-cover border-4 border-emerald-500 p-1 shadow-lg mx-auto"
          />
          <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-full shadow-md">
            <User size={20} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">মীর রাব্বি হোসেন</h2>
        <p className="text-emerald-600 font-medium mb-4">Full-Stack Developer & UI/UX Designer</p>
        
        <p className="text-gray-600 leading-relaxed max-w-lg mx-auto mb-8">
          আমি একজন অভিজ্ঞ ফুল-স্ট্যাক ডেভেলপার হিসেবে আধুনিক প্রযুক্তি ব্যবহার করে ইউজার-ফ্রেন্ডলি অ্যাপলিকেশন তৈরিতে কাজ করছি। এই অ্যাপটি আমিনপুর থানার মানুষের উপকারের জন্য একটি স্বেচ্ছাসেবী উদ্যোগ হিসেবে তৈরি করা হয়েছে।
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="#" className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
            <Facebook className="text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-500">Facebook</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
            <Globe className="text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-500">Website</span>
          </a>
          <a href="mailto:contact@mirrabbi.com" className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
            <Mail className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-500">Email</span>
          </a>
          <a href="tel:01700000000" className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
            <Phone className="text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-500">Call Me</span>
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
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 truncate">{item.name}</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">{item.name}</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">লোকেশন</p>
                <p className="text-sm font-semibold text-gray-700">{item.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">ফোন নাম্বার</p>
                <a href={`tel:${item.phone}`} className="text-sm font-semibold text-emerald-700 underline underline-offset-4">{item.phone}</a>
              </div>
            </div>
            {item.estYear && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">স্থাপিত</p>
                  <p className="text-sm font-semibold text-gray-700">{item.estYear} খ্রি.</p>
                </div>
              </div>
            )}
            {item.eiin && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">EIIN নাম্বার</p>
                  <p className="text-sm font-semibold text-gray-700">{item.eiin}</p>
                </div>
              </div>
            )}
          </section>

          {item.fullDetails && (
            <section>
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 border-b pb-2">
                <Info size={18} className="text-emerald-600" />
                বিস্তারিত তথ্য
              </h3>
              <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                {item.fullDetails}
              </p>
            </section>
          )}

          {item.teachers && (
            <section>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <Users size={18} className="text-emerald-600" />
                শিক্ষকবৃন্দের তালিকা
              </h3>
              <div className="grid gap-3">
                {item.teachers.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100 shadow-sm" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{t.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{t.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {item.doctors && (
            <section>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <Users size={18} className="text-emerald-600" />
                ডাক্তারগণের তালিকা
              </h3>
              <div className="grid gap-3">
                {item.doctors.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={d.image} alt={d.name} className="w-14 h-14 rounded-xl object-cover border-2 border-emerald-100 shadow-sm" />
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{d.name}</h4>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">{d.specialty}</p>
                      </div>
                    </div>
                    <a href={`tel:${d.phone}`} className="p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors">
                      <Phone size={18} />
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
          <Route path="/about" element={<AboutUsView />} />
          <Route path="/developer" element={<DeveloperView />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
