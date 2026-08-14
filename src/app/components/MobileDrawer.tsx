"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useNav } from "../context/NavContext";
import {
  VscFiles,
  VscTools,
  VscSourceControl,
  VscEdit,
  VscClose,
  VscRemote,
  VscSymbolProperty,
} from "react-icons/vsc";
import {
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function MobileDrawer() {
  const { isMobileDrawerOpen, closeDrawer } = useNav();
  const currentPath = usePathname();

  const normalizePath = (path: string) => {
    if (path === "/") return path;
    return path.replace(/\/$/, "");
  };

  const navItems = [
    {
      href: "/",
      title: "Welcome",
      subtext: "welcome.tsx",
      icon: VscFiles,
      isExternal: false,
    },
    {
      href: "/skills",
      title: "Skills",
      subtext: "skills.ipynb",
      icon: VscTools,
      isExternal: false,
    },
    {
      href: "/experience",
      title: "Experience",
      subtext: "experience.git",
      icon: VscSourceControl,
      isExternal: false,
    },
    {
      href: "https://www.instagram.com/suneclipsedmoon/",
      title: "Blog",
      subtext: "blog.md",
      icon: VscEdit,
      isExternal: true,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/raghavmallampalli/",
      icon: FaGithub,
      color: "var(--dracula-foreground)",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/raghav-mallampalli/",
      icon: FaLinkedin,
      color: "var(--dracula-cyan)",
    },
    {
      name: "Twitter / X",
      href: "https://x.com/r_mallampalli",
      icon: FaTwitter,
      color: "var(--dracula-purple)",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/raghavmallampalli/",
      icon: FaInstagram,
      color: "var(--dracula-pink)",
    },
    {
      name: "Email",
      href: "mailto:raghavmallampalli1234@gmail.com",
      icon: FaEnvelope,
      color: "var(--dracula-yellow)",
    },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col justify-between border-l shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--dracula-darker)",
          borderColor: "var(--dracula-comment)",
        }}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div>
          <div
            className="h-12 px-4 flex items-center justify-between border-b"
            style={{
              borderColor: "var(--dracula-selection)",
              backgroundColor: "var(--dracula-background)",
            }}
          >
            <div className="flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-[var(--dracula-comment)]">
              <VscSymbolProperty className="text-[var(--dracula-purple)]" size={16} />
              <span>EXPLORER</span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1 rounded text-[var(--dracula-comment)] hover:text-[var(--dracula-foreground)] hover:bg-[var(--dracula-current-line)] transition-colors"
              aria-label="Close menu"
            >
              <VscClose size={20} />
            </button>
          </div>

          {/* Profile Card */}
          <div
            className="p-4 flex items-center space-x-3 border-b"
            style={{ borderColor: "var(--dracula-selection)" }}
          >
            <div
              className="w-11 h-11 rounded-full flex-shrink-0 border overflow-hidden"
              style={{
                backgroundColor: "var(--dracula-background)",
                borderColor: "var(--dracula-purple)",
              }}
            >
              <Image
                src="/profile_photo.jpg"
                alt="Raghav Mallampalli"
                width={44}
                height={44}
                priority
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate text-[var(--dracula-foreground)]">
                Raghav Mallampalli
              </p>
              <p className="text-xs truncate text-[var(--dracula-comment)]">
                DL Researcher | Data Scientist
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-3">
            <p className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--dracula-comment)]">
              Workspace Pages
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  !item.isExternal &&
                  normalizePath(item.href) === normalizePath(currentPath);
                const IconComponent = item.icon;

                if (item.isExternal) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeDrawer}
                      className="flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors text-[var(--dracula-foreground)] hover:bg-[var(--dracula-current-line)]"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent
                          size={18}
                          className="text-[var(--dracula-comment)]"
                        />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--dracula-comment)]">
                        {item.subtext} ↗
                      </span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={closeDrawer}
                    className={`flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--dracula-current-line)] text-[var(--dracula-pink)] font-medium"
                        : "text-[var(--dracula-foreground)] hover:bg-[var(--dracula-current-line)]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent
                        size={18}
                        className={
                          isActive
                            ? "text-[var(--dracula-pink)]"
                            : "text-[var(--dracula-comment)]"
                        }
                      />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--dracula-comment)]">
                      {item.subtext}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Socials / Contacts Section */}
          <div className="px-3 pt-2">
            <p className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--dracula-comment)]">
              Connect & Socials
            </p>
            <div className="grid grid-cols-1 gap-1">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeDrawer}
                    className="flex items-center space-x-3 px-3 py-2 rounded text-xs text-[var(--dracula-foreground)] hover:bg-[var(--dracula-current-line)] transition-colors"
                  >
                    <IconComponent
                      size={15}
                      style={{ color: social.color }}
                      className="flex-shrink-0"
                    />
                    <span className="truncate">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer (WSL Indicator) */}
        <div
          className="p-3 border-t flex items-center justify-between text-xs"
          style={{ borderColor: "var(--dracula-selection)" }}
        >
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded w-full transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--dracula-purple)",
              color: "var(--dracula-background)",
            }}
          >
            <VscRemote size={15} />
            <span className="font-semibold text-xs">WSL: Ubuntu</span>
          </a>
        </div>
      </aside>
    </>
  );
}
