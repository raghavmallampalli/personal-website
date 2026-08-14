import React from 'react';
import Link from "next/link";
import { getAboutData, getObsessionsData } from "@/lib/data";

export default function Home() {
  const aboutData = getAboutData();
  const obsessionsData = getObsessionsData();

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-light page-title">
          {aboutData.about.profile.name}
        </h1>
        <p 
          className="text-sm"
          style={{ color: 'var(--dracula-comment)' }}
        >
          {aboutData.about.profile.title}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About Me Section */}
          <section>
            <h2 
              className="text-lg font-medium mb-3"
              style={{ color: 'var(--dracula-green)' }}
            >
              About Me
            </h2>
            <div className="space-y-2">
              {aboutData.about.links.map((link, index) => {
                const LinkComponent = link.type === 'internal' ? Link : 'a';
                const linkProps = link.type === 'internal' 
                  ? { href: link.url }
                  : { 
                      href: link.url, 
                      target: "_blank", 
                      rel: "noopener noreferrer" 
                    };

                return (
                  <LinkComponent
                    key={index}
                    {...linkProps}
                    className="flex items-center space-x-3 p-2 rounded text-sm transition-all duration-200 hover:opacity-80"
                    style={{ 
                      backgroundColor: 'var(--dracula-current-line)', 
                      color: 'var(--dracula-foreground)',
                      textDecoration: 'none'
                    }}
                  >
                    <span className="w-4">{link.icon}</span>
                    <span>{link.text}</span>
                  </LinkComponent>
                );
              })}
            </div>
          </section>

          {/* Current Hustle Section */}
          <section>
            <h2 
              className="text-lg font-medium mb-3"
              style={{ color: 'var(--dracula-green)' }}
            >
              {aboutData.about.current_hustle.title}
            </h2>
            <p 
              className="text-xs"
              style={{ color: 'var(--dracula-foreground)' }}
            >
              {aboutData.about.current_hustle.message}{' '}
              <a 
                href={aboutData.about.current_hustle.link_url} 
                className="underline" 
                style={{ color: 'var(--dracula-cyan)' }}
              >
                {aboutData.about.current_hustle.link_text}
              </a>
            </p>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          <section className="flex-1">
            <h2 
              className="text-lg font-medium mb-4"
              style={{ color: 'var(--dracula-green)' }}
            >
              My Current Obsessions
            </h2>
            <div className="space-y-3">
              {obsessionsData.obsessions.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  className="flex items-center space-x-3 p-2 rounded transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: 'var(--dracula-darker)', textDecoration: 'none' }}
                >
                  <div 
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: item.color, color: 'var(--dracula-background)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm" style={{ color: 'var(--dracula-foreground)' }}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--dracula-comment)' }}>
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
          
          {/* Open Source Footer */}
          <div className="mt-6 text-right">
            <p className="text-xs" style={{ color: 'var(--dracula-comment)' }}>
              code for this site is opensourced on{' '}
              <a 
                href="https://github.com/raghavmallampalli/personal_website"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors duration-200"
                style={{ color: 'var(--dracula-cyan)' }}
              >
                https://github.com/raghavmallampalli/personal_website
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
