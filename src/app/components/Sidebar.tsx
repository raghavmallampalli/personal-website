"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { VscFiles, VscTools, VscSourceControl, VscEdit } from "react-icons/vsc";

const iconStyle = "text-[var(--dracula-comment)] hover:text-[var(--dracula-purple)] cursor-pointer";
const activeIconStyle = "text-[var(--dracula-bright-white)]";

export default function Sidebar() {
  const currentPath = usePathname();

  const navItems = [
    { href: "/", title: "Home", icon: VscFiles },
    { href: "/skills", title: "Skills", icon: VscTools },
    { href: "/experience", title: "Experience", icon: VscSourceControl },
    { href: "https://www.instagram.com/suneclipsedmoon/", title: "Blog", icon: VscEdit },
  ];

  // Normalize path for comparison (remove trailing slashes except for root)
  const normalizePath = (path: string) => {
    if (path === "/") return path;
    return path.replace(/\/$/, "");
  };

  return (
    <aside 
      className="hidden md:flex w-12 p-4 flex-col items-center justify-between h-full flex-shrink-0"
      style={{ backgroundColor: 'var(--dracula-current-line)' }}
    >
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item) => {
          const isExternal = item.href.startsWith('http');
          const isActive = !isExternal && normalizePath(item.href) === normalizePath(currentPath);
          
          if (isExternal) {
            return (
              <a 
                key={item.title} 
                href={item.href} 
                title={item.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon size={28} className={iconStyle} />
              </a>
            );
          }
          
          return (
            <Link key={item.title} href={item.href} title={item.title}>
              <item.icon size={28} className={isActive ? activeIconStyle : iconStyle} />
            </Link>
          );
        })}
      </div>
      
      {/* Profile photo at bottom */}
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center border overflow-hidden"
        style={{ 
          backgroundColor: 'var(--dracula-background)', 
          borderColor: 'var(--dracula-comment)'
        }}
        title="Profile Photo"
      >
        <Image
          src="/profile_photo.jpg"
          alt="Profile Photo"
          width={32}
          height={32}
          priority
          loading="eager"
          className="w-full h-full object-cover rounded-full scale-110 translate-x-[2px]"
        />
      </div>
    </aside>
  );
} 