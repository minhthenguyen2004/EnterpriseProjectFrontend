import fiiLogo from '../../assets/images/fii_logo.webp';

function OpenSidebarButton({ handleToggle, isSidebarOpen, isFoxconn }) {
  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isSidebarOpen ? 'Đóng thanh bên' : 'Mở thanh bên'}
      title={isSidebarOpen ? 'Đóng thanh bên' : 'Mở thanh bên'}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 bg-white border ${
        isFoxconn
          ? isSidebarOpen
            ? 'border-white ring-2 ring-white/60 shadow-md'
            : 'border-white/30 hover:border-white hover:ring-2 hover:ring-white/40 shadow-sm'
          : isSidebarOpen
            ? 'border-black/50 ring-2 ring-black/40 shadow-md'
            : 'border-black/20 hover:border-black hover:ring-2 hover:ring-black/20 shadow-sm'
      }`}
    >
      {/* Logo to open sidebar */}
      <img
        src={fiiLogo}
        alt="Fii Logo"
        className={`w-full h-full object-contain rounded-lg transition-transform duration-200 ${
          isSidebarOpen ? 'scale-90' : 'hover:scale-105'
        }`}
      />
    </button>
  );
}

export default OpenSidebarButton;
