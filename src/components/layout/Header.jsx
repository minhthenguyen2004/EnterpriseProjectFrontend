import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/action';
import useTheme from '../../hooks/useTheme';
import useSidebar from '../../hooks/useSidebar';
import { Languages } from '../../utils/Languages.jsx';
import toast from 'react-hot-toast';
import OpenSidebarButton from '../common/OpenSidebarButton.jsx';
import ChangeBrandButton from '../common/ChangeBrandButton.jsx';
import LanguageSelection from '../common/LanguageSelection.jsx';
import AvatarDropdownMenu from '../common/AvatarDropdownMenu.jsx';
import Avatar from '../common/Avatar.jsx';

export default function Header({ onToggleSidebar }) {
  const { brand, setBrand, language, setLanguage } = useTheme();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Lấy thông tin tài khoản từ Redux auth, dự phòng từ localStorage
  const savedAuth = (() => {
    try {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const currentUser = {
    name: auth?.username || savedAuth?.username || '',
    cardId: auth?.cardId || savedAuth?.cardId || '',
    avatar: auth?.avatar || savedAuth?.avatar || '',
    roles: auth?.roles || savedAuth?.roles || [],
  };

  const isUserAuthenticated = Boolean(
    auth?.jwtToken || savedAuth?.jwtToken
  );

  let sidebarContext = null;

  try {
    // Cho phép dùng cả qua hook useSidebar và qua prop onToggleSidebar
    sidebarContext = useSidebar();
  } catch { 
    sidebarContext = null;
  }

  const handleToggle = onToggleSidebar || sidebarContext?.toggleSidebar;
  const isSidebarOpen = Boolean(sidebarContext?.isOpen);

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const langRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();



  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const currentLang = Languages.find((l) => l.code === language) || Languages[0];


  const handleLogout = () => {
    dispatch(logoutUser(toast, navigate));
    setUserDropdownOpen(false);
  };


  const isFoxconn = brand === 'foxconn';
  

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 shadow-lg ${
        isFoxconn
          ? 'bg-linear-to-r from-[#002766] via-[#003893] to-[#002766] border-b border-[#001f52] text-white'
          : 'bg-[#76B900] border-b border-[#609900] text-slate-950'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-3 gap-2 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left most  */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

          <OpenSidebarButton handleToggle={handleToggle} isSidebarOpen={isSidebarOpen} isFoxconn={isFoxconn} />
          
          <h1
            className={`hidden lg:block text-base lg:text-lg font-extrabold tracking-[0.16em] uppercase select-none transition-colors duration-300 ${
              isFoxconn ? 'text-white' : 'text-slate-950'
            }`}
          >
            STATION MANAGEMENT
          </h1>
        </div>

        {/* Rightmost part: Change brand button + language + LOGIN/USER AVATAR */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">

          <ChangeBrandButton isFoxconn={isFoxconn} setBrand={setBrand} />

          <LanguageSelection Languages={Languages} langRef={langRef} setLangDropdownOpen={setLangDropdownOpen} setLanguage={setLanguage} language={language} isFoxconn={isFoxconn} langDropdownOpen={langDropdownOpen} currentLang={currentLang} />

          {/* Rightmost part: Button to choose brand + language + LOGIN/USER AVATAR */}
          {isUserAuthenticated ? (

            // Already logged in: Username on the left, Avatar in the right
            <div className="relative" ref={userRef}>
              <Avatar currentUser={currentUser} isFoxconn={isFoxconn} setUserDropdownOpen={setUserDropdownOpen} />

              {userDropdownOpen && (
                <AvatarDropdownMenu 
                  currentUser={currentUser}
                  isFoxconn={isFoxconn}
                  handleLogout={handleLogout}
                  setUserDropdownOpen={setUserDropdownOpen}
                />
              )}
            </div>
          ) : (
            
            // Not logged in: Login button
            <Link
              to="/login"
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                isFoxconn
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/40'
                  : 'bg-black hover:bg-zinc-900 text-white shadow-black/40'
              } ${location.pathname === '/login' ? 'ring-2 ring-white/50' : ''}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
