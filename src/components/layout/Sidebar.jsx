import { NavLink, useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import useSidebar from '../../hooks/useSidebar';
import { menuGroups } from '../../utils/Menu';

export default function Sidebar() {
  const { brand, language } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  const isFoxconn = brand === 'foxconn';

  // Danh mục menu mẫu phong phú cho trạm Foxconn & NVIDIA

  // Render badge phong cách Foxconn hoặc NVIDIA
  const renderBadge = (badge) => {
    if (!badge) return null;
    let badgeStyle = '';

    if (isFoxconn) {
      switch (badge.type) {
        case 'success':
          badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          break;
        case 'warning':
          badgeStyle = 'bg-amber-100 text-amber-800 border-amber-200';
          break;
        case 'nvidia':
          badgeStyle = 'bg-lime-100 text-lime-900 border-lime-300 font-bold';
          break;
        default:
          badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
      }
    } else {
      switch (badge.type) {
        case 'success':
          badgeStyle = 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
          break;
        case 'warning':
          badgeStyle = 'bg-amber-950/80 text-amber-400 border-amber-800/60';
          break;
        case 'nvidia':
          badgeStyle = 'bg-[#76B900]/20 text-[#76B900] border-[#76B900]/40 font-bold shadow-[0_0_8px_rgba(118,185,0,0.3)]';
          break;
        default:
          badgeStyle = 'bg-zinc-800 text-zinc-300 border-zinc-700';
      }
    }

    return (
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}>
        {badge.text}
      </span>
    );
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Backdrop layer when the menu is opened on mobile and tablet devices */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 2. Placeholder (Spacer) in Flex layout:
             - On Desktop (lg and above): Automatically expand/shrink from 0 to 288px to push and expand content smoothly
             - On Mobile/Tablet: Hidden to prevent content from being compressed */}
      <div
        aria-hidden="true"
        className={`hidden lg:block shrink-0 transition-[width] duration-300 ease-in-out pointer-events-none ${
          isOpen ? 'w-64 sm:w-72' : 'w-0'
        }`}
      />

      {/* Realistic sidebar Menu:
             - Fixed by fixed top-16 left-0 bottom-0
             - Ensure 100% touch the bottom edge of the Navbar (h-16 = 64px) and full screen height to the bottom */}
      <aside
        aria-label="Sidebar Menu"
        className={`fixed top-16 left-0 bottom-0 z-40 w-64 sm:w-72 h-[calc(100vh-4rem)] flex flex-col justify-between border-r shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-700'
            : 'bg-zinc-950 border-zinc-800 text-zinc-300'
        }`}
      >
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 pt-3 space-y-4 scrollbar-thin">
          {menuGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              <div
                className={`px-3 py-1 text-[13px] font-bold uppercase tracking-wider select-none ${
                  isFoxconn ? 'text-black' : 'text-zinc-500'
                }`}
              >
                {group.title[language] || group.title.vi}
              </div>

              <div className="space-y-2">
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path === '/dashboard' && location.pathname === '/');

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={({ isActive: linkActive }) => {
                        const active = isActive || linkActive;
                        return `flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                          active
                            ? isFoxconn
                              ? 'bg-linear-to-r from-[#002766] to-[#003893] text-white shadow-md shadow-blue-900/25'
                              : 'bg-[#76B900]/15 text-[#76B900] border-l-3 border-[#76B900] shadow-[0_0_12px_rgba(118,185,0,0.15)] pl-2.5'
                            : isFoxconn
                            ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            : 'text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-100'
                        }`;
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? isFoxconn
                                ? 'text-white'
                                : 'text-[#76B900]'
                              : isFoxconn
                              ? 'text-slate-400 group-hover:text-slate-700'
                              : 'text-zinc-500 group-hover:text-zinc-200'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">
                          {item.name[language] || item.name.vi}
                        </span>
                      </div>

                      {renderBadge(item.badge)}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
