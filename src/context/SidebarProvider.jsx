import { useState } from 'react';
import { SidebarContext } from './SidebarContext.js';

export default function SidebarProvider({ children }) {
  // Default false (closed), opens when the user clicks the 3-bar button
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
