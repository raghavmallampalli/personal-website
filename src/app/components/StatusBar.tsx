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

  const clickableIconClass = "!text-[var(--dracula-foreground)] hover:!text-[var(--dracula-purple)]";
  const clickableTextClass = "!text-[var(--dracula-foreground)]";
  const unselectableIconClass = "text-[var(--dracula-comment)]";
  const linkClass = `flex items-center space-x-1 ${clickableTextClass} hover:!text-[var(--dracula-purple)]`;

  const { wsl_indicator, left_section, right_section } = statusData.statusbar;

  // Get icon component
  const getIcon = (iconName: string, size?: number) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <footer
      className="h-8 flex items-center justify-between text-xs relative"
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
        className="absolute left-0 top-0 h-full w-10 flex items-center justify-center cursor-pointer hover:opacity-80"
        style={{ backgroundColor: wsl_indicator.background_color }}
      >
        {getIcon(wsl_indicator.icon, 14) && (
          <div style={{ color: 'var(--dracula-background)' }}>
            {getIcon(wsl_indicator.icon, 14)}
          </div>
        )}
      </a>

      {/* Left Section */}
      <div className="flex items-center space-x-4 pl-12">
        <span className={unselectableIconClass}>{left_section.title}</span>
        {left_section.links.map((link, index) => (
          <a 
            key={index}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={clickableIconClass}
          >
            {getIcon(link.icon)}
          </a>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 px-4">
        <div className={`flex items-center space-x-1 ${unselectableIconClass}`}>
          {getIcon(right_section.status_indicators.sync_icon)} 
          {getIcon('VscError')} <span>{right_section.status_indicators.errors}</span>
          {getIcon('VscWarning')} <span>{right_section.status_indicators.warnings}</span>
        </div>
        
        {right_section.contact_links.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            {...(link.type !== 'email' && { target: "_blank", rel: "noopener noreferrer" })}
            {...(link.title && { title: link.title })}
            className={link.display_text ? linkClass : clickableIconClass}
          >
            {getIcon(link.icon, link.size)}
            {link.display_text && (
              <span className={link.show_text_on_mobile === false ? "hidden md:inline" : ""}>
                {link.display_text}
              </span>
            )}
          </a>
        ))}
        
        {getIcon(right_section.notification_icon) && (
          <div className={unselectableIconClass}>
            {getIcon(right_section.notification_icon)}
          </div>
        )}
      </div>
    </footer>
  );
}