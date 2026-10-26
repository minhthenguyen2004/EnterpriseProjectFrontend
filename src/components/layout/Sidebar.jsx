import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import useSidebar from '../../hooks/useSidebar';
import { menuGroups } from '../../utils/Menu';

export default function Sidebar() {
  const { brand, language } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  const isFoxconn = brand === 'foxconn';
  const [openSubMenus, setOpenSubMenus] = useState({});

  // Tự động mở menu con nếu đường dẫn hiện tại nằm trong menu đó
  useEffect(() => {
    menuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) => location.pathname === child.path
          );
          if (hasActiveChild) {
            const key = item.id || item.name.en || item.name.vi;
            setOpenSubMenus((prev) => ({ ...prev, [key]: true }));
          }
        }
      });
    });
  }, [location.pathname]);

  const toggleSubMenu = (key) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const itemKey = item.id || item.name.en || item.name.vi;
                  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

                  // Render mục có sub-menu (như RACK)
                  if (hasChildren) {
                    const isSubExpanded = !!openSubMenus[itemKey];
                    const isAnyChildActive = item.children.some(
                      (child) => location.pathname === child.path
                    );

                    return (
                      <div key={itemKey} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => toggleSubMenu(itemKey)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                            isAnyChildActive
                              ? isFoxconn
                                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60'
                                : 'bg-zinc-900/80 text-[#76B900] border border-[#76B900]/30 font-bold shadow-[0_0_10px_rgba(118,185,0,0.1)]'
                              : isFoxconn
                              ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                              : 'text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`transition-colors duration-200 ${
                                isAnyChildActive
                                  ? isFoxconn
                                    ? 'text-blue-800'
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

                          <div className="flex items-center gap-1.5 shrink-0">
                            {renderBadge(item.badge)}
                            <svg
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isSubExpanded ? 'rotate-180' : ''
                              } ${
                                isFoxconn ? 'text-slate-400' : 'text-zinc-500'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {/* Danh sách sub-menu con */}
                        {isSubExpanded && (
                          <div
                            className={`ml-4 pl-3 space-y-1 pt-0.5 border-l-2 transition-all duration-200 ${
                              isFoxconn ? 'border-slate-200' : 'border-zinc-800'
                            }`}
                          >
                            {item.children.map((child) => {
                              const isChildActive = location.pathname === child.path;

                              return (
                                <NavLink
                                  key={child.path}
                                  to={child.path}
                                  onClick={handleLinkClick}
                                  className={({ isActive: linkActive }) => {
                                    const active = isChildActive || linkActive;
                                    return `flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-all duration-200 group cursor-pointer ${
                                      active
                                        ? isFoxconn
                                          ? 'bg-linear-to-r from-[#002766] to-[#003893] text-white shadow-sm font-semibold'
                                          : 'bg-[#76B900]/20 text-[#76B900] border-l-2 border-[#76B900] shadow-[0_0_8px_rgba(118,185,0,0.2)] font-semibold pl-2'
                                        : isFoxconn
                                        ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                        : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200'
                                    }`;
                                  }}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                                        isChildActive
                                          ? isFoxconn
                                            ? 'bg-white ring-2 ring-blue-300'
                                            : 'bg-[#76B900] shadow-[0_0_6px_#76B900]'
                                          : isFoxconn
                                          ? 'bg-slate-300 group-hover:bg-slate-500'
                                          : 'bg-zinc-600 group-hover:bg-zinc-400'
                                      }`}
                                    />
                                    <span className="truncate">
                                      {child.name[language] || child.name.vi}
                                    </span>
                                  </div>

                                  {renderBadge(child.badge)}
                                </NavLink>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Render mục đơn bình thường
                  const isActive =
                    location.pathname === item.path ||
                    ((item.path === '/autoline-management' || item.path === '/models') && location.pathname === '/');

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
