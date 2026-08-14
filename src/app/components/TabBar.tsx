"use client";

import { usePathname } from "next/navigation";
import { VscHome, VscTools, VscSourceControl, VscFiles, VscClose, VscEllipsis, VscMenu } from "react-icons/vsc";
import { useNav } from "../context/NavContext";

interface TabItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  path: string;
}

const TabItem: React.FC<TabItemProps> = ({ icon: Icon, label, isActive }) => {
  return (
    <div
      className={`flex items-center h-full space-x-1.5 px-3 cursor-default`}
      style={{
        backgroundColor: isActive ? 'var(--dracula-background)' : 'var(--dracula-darker)',
        borderColor: 'var(--dracula-comment)',
        color: isActive ? 'var(--dracula-foreground)' : 'var(--dracula-comment)'
      }}
    >
      <Icon size={14} className={`${isActive ? "text-[var(--dracula-pink)]" : "text-[var(--dracula-comment)]"}`} />
      <span className="text-xs">{label}</span>
      {isActive && (
         <VscClose size={14} className="ml-1.5 text-[var(--dracula-comment)] hover:text-[var(--dracula-foreground)]" />
      )}
    </div>
  );
};

export default function TabBar() {
  const currentPath = usePathname();
  const { toggleDrawer, isMobileDrawerOpen } = useNav();

  const normalizePath = (path: string) => {
    if (path === "/") return path;
    return path.replace(/\/$/, "");
  };

  const getPageName = (path: string): string => {
    const cleanPath = normalizePath(path);
    switch (cleanPath) {
      case "":
      case "/":
        return "Welcome";
      case "/skills":
        return "Skills";
      case "/experience":
        return "Experience";
      default:
        return "New Page";
    }
  };

  const getPageIcon = (path: string): React.ElementType => {
    const cleanPath = normalizePath(path);
    switch (cleanPath) {
      case "":
      case "/":
        return VscHome;
      case "/skills":
        return VscTools;
      case "/experience":
        return VscSourceControl;
      default:
        return VscFiles;
    }
  };

  const currentPageName = getPageName(currentPath);
  const currentPageIcon = getPageIcon(currentPath);

  return (
    <div 
      className="h-8 flex justify-between items-center select-none"
      style={{
        backgroundColor: 'var(--dracula-darker)',
        borderColor: 'var(--dracula-comment)'
      }}
    >
      <div className="flex h-full">
        <TabItem 
          icon={currentPageIcon} 
          label={currentPageName} 
          isActive={true} 
          path={currentPath} 
        />
      </div>
      <div className="px-2 flex items-center h-full">
        <button
          onClick={toggleDrawer}
          className={`h-6 px-2 rounded transition-all flex items-center justify-center cursor-pointer border ${
            isMobileDrawerOpen
              ? "text-[var(--dracula-pink)] bg-[var(--dracula-current-line)] border-[var(--dracula-pink)] shadow-sm"
              : "text-[var(--dracula-foreground)] bg-[var(--dracula-current-line)]/60 border-[var(--dracula-comment)]/60 hover:text-[var(--dracula-pink)] hover:bg-[var(--dracula-current-line)] hover:border-[var(--dracula-purple)]"
          } active:scale-95`}
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          {/* 3-line hamburger menu in portrait/mobile */}
          <VscMenu size={16} className="block md:hidden" />
          {/* 3-dots ellipsis on desktop */}
          <VscEllipsis size={16} className="hidden md:block" />
        </button>
      </div>
    </div>
  );
} 