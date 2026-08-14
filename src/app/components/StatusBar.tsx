import React from 'react';
import { FaTwitter, FaInstagram, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { VscRemote, VscError, VscWarning, VscSync, VscBell } from "react-icons/vsc";
import { getStatusbarData } from '@/lib/data';

// Icon mapping
const iconMap = {
  VscRemote,
  VscError,
  VscWarning,
  VscSync,
  VscBell,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
};

export default function StatusBar() {
  const statusData = getStatusbarData();

  const clickableIconClass = "!text-[var(--dracula-foreground)] hover:!text-[var(--dracula-purple)] transition-colors";
  const clickableTextClass = "!text-[var(--dracula-foreground)]";
  const unselectableIconClass = "text-[var(--dracula-comment)]";
  const linkClass = `flex items-center space-x-1 ${clickableTextClass} hover:!text-[var(--dracula-purple)] transition-colors`;

  const { wsl_indicator, left_section, right_section } = statusData.statusbar;

  // Get icon component
  const getIcon = (iconName: string, size?: number) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <footer
      className="h-8 flex items-center justify-between text-xs relative flex-shrink-0 w-full select-none z-10"
      style={{
        backgroundColor: "var(--dracula-darker)",
        color: "var(--dracula-foreground)",
      }}
    >
      {/* WSL Indicator - Full height strip at left edge */}
      <a 
        href={wsl_indicator.url}
        target="_blank" 
        rel="noopener noreferrer"
        title="WSL: Ubuntu"
        className="absolute left-0 top-0 h-full w-8 md:w-10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: wsl_indicator.background_color }}
      >
        {getIcon(wsl_indicator.icon, 14) && (
          <div style={{ color: 'var(--dracula-background)' }}>
            {getIcon(wsl_indicator.icon, 14)}
          </div>
        )}
      </a>

      {/* Left Section */}
      <div className="flex items-center space-x-2.5 md:space-x-4 pl-10 md:pl-12">
        <span className={`${unselectableIconClass} hidden sm:inline text-[11px]`}>{left_section.title}</span>
        {left_section.links.map((link, index) => (
          <a 
            key={index}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={link.platform}
            className={clickableIconClass}
          >
            {getIcon(link.icon, 13)}
          </a>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2.5 md:space-x-4 px-2 md:px-4">
        {/* Sync & Errors (hidden on small mobile to avoid crowding) */}
        <div className={`hidden sm:flex items-center space-x-1 text-[11px] ${unselectableIconClass}`}>
          {getIcon(right_section.status_indicators.sync_icon, 12)} 
          {getIcon('VscError', 12)} <span>{right_section.status_indicators.errors}</span>
          {getIcon('VscWarning', 12)} <span>{right_section.status_indicators.warnings}</span>
        </div>
        
        {/* Contact Links */}
        <div className="flex items-center space-x-2.5 md:space-x-3">
          {right_section.contact_links.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              {...(link.type !== 'email' && { target: "_blank", rel: "noopener noreferrer" })}
              {...(link.title && { title: link.title })}
              className={link.display_text ? linkClass : clickableIconClass}
            >
              {getIcon(link.icon, link.size || 13)}
              {link.display_text && (
                <span className={link.show_text_on_mobile === false ? "hidden md:inline" : ""}>
                  {link.display_text}
                </span>
              )}
            </a>
          ))}
        </div>
        
        {getIcon(right_section.notification_icon, 13) && (
          <div className={`${unselectableIconClass} hidden sm:block`}>
            {getIcon(right_section.notification_icon, 13)}
          </div>
        )}
      </div>
    </footer>
  );
}