'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import CustomScrollbar from '@/components/CustomScrollbar';
import { ExperienceItem } from '@/lib/data';

interface ExperienceTimelineProps {
  experienceData: ExperienceItem[];
}

interface GitLayout {
  presentY: number;
  initialCommitY: number;
  totalHeight: number;
  jobs: {
    headingY: number;
    firstEventY: number;
    lastEventY: number;
    eventYs: number[];
  }[];
}

export default function ExperienceTimeline({ experienceData }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const presentRef = useRef<HTMLDivElement>(null);
  const initialCommitRef = useRef<HTMLDivElement>(null);
  const jobHeadingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eventRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const [layout, setLayout] = useState<GitLayout | null>(null);

  // Process jobs from most recent to oldest (top-to-bottom on screen)
  const sortedJobs = useMemo(() => {
    return [...experienceData].reverse();
  }, [experienceData]);

  // Adjust container height to match parent main element
  useEffect(() => {
    const setContainerHeight = () => {
      const mainElement = document.querySelector('main');
      if (mainElement && containerRef.current) {
        const mainHeight = mainElement.offsetHeight;
        const paddingBottom = 20;
        containerRef.current.style.height = `${mainHeight - paddingBottom}px`;
      }
    };

    setContainerHeight();
    window.addEventListener('resize', setContainerHeight);
    return () => window.removeEventListener('resize', setContainerHeight);
  }, []);

  // Measure vertical positions of all nodes dynamically
  useEffect(() => {
    if (!contentWrapperRef.current || sortedJobs.length === 0) return;

    const measureLayout = () => {
      const wrapper = contentWrapperRef.current;
      if (!wrapper) return;

      const wrapperRect = wrapper.getBoundingClientRect();

      const getCenterY = (el: HTMLElement | null): number => {
        if (!el) return 0;
        const elRect = el.getBoundingClientRect();
        return elRect.top - wrapperRect.top + elRect.height / 2;
      };

      const presentY = getCenterY(presentRef.current);
      const initialCommitY = getCenterY(initialCommitRef.current);

      const jobsLayout = sortedJobs.map((job, jobIdx) => {
        const headingEl = jobHeadingRefs.current[jobIdx];
        const headingY = getCenterY(headingEl);

        const eventYs = (job.events || []).map((_, eventIdx) => {
          const eventEl = eventRefs.current[jobIdx]?.[eventIdx];
          return getCenterY(eventEl);
        });

        const firstEventY = eventYs.length > 0 ? eventYs[0] : headingY;
        const lastEventY = eventYs.length > 0 ? eventYs[eventYs.length - 1] : headingY;

        return {
          headingY,
          firstEventY,
          lastEventY,
          eventYs,
        };
      });

      setLayout({
        presentY,
        initialCommitY,
        totalHeight: wrapperRect.height,
        jobs: jobsLayout,
      });
    };

    // Measure initially and attach ResizeObserver for dynamic text wrap tracking
    measureLayout();

    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });

    resizeObserver.observe(contentWrapperRef.current);

    // Initial frame fallbacks to ensure fonts and layout have settled
    const timer1 = setTimeout(measureLayout, 60);
    const timer2 = setTimeout(measureLayout, 200);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [sortedJobs]);

  // SVG Geometry constants
  const xMaster = 14;
  const xBranch = 38;

  return (
    <div ref={containerRef} className="experience-container flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 mb-4">
        <h1 className="text-2xl md:text-3xl font-light page-title">
          Professional Experience
        </h1>
        <p className="text-sm" style={{ color: 'var(--dracula-comment)' }}>
          What got me up in the morning
        </p>
      </div>

      <CustomScrollbar className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
        <div ref={contentWrapperRef} className="relative min-w-full pb-8">
          {/* Dynamic SVG Git Timeline overlay */}
          {layout && (
            <svg
              className="absolute top-0 left-0 h-full pointer-events-none"
              style={{ width: '56px', overflow: 'visible' }}
            >
              {/* 1. Purple Master Spine line */}
              <line
                x1={xMaster}
                y1={layout.presentY}
                x2={xMaster}
                y2={layout.initialCommitY}
                stroke="var(--dracula-purple)"
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {/* 2. Top PRESENT node */}
              <circle
                cx={xMaster}
                cy={layout.presentY}
                r={5.5}
                fill="var(--dracula-purple)"
                stroke="var(--dracula-background)"
                strokeWidth={2}
              />

              {/* 3. Job branches & achievements */}
              {layout.jobs.map((jobLayout, jobIdx) => {
                const { headingY, firstEventY, lastEventY, eventYs } = jobLayout;
                const hasEvents = eventYs.length > 0;

                return (
                  <g key={jobIdx}>
                    {/* Job commit node on master line */}
                    <circle
                      cx={xMaster}
                      cy={headingY}
                      r={5.5}
                      fill="var(--dracula-purple)"
                      stroke="var(--dracula-background)"
                      strokeWidth={2}
                    />

                    {hasEvents && (
                      <>
                        {/* Branch cubic Bézier curve */}
                        <path
                          d={`M ${xMaster} ${headingY} C ${xMaster} ${(headingY + firstEventY) / 2}, ${xBranch} ${(headingY + firstEventY) / 2}, ${xBranch} ${firstEventY}`}
                          fill="none"
                          stroke="var(--dracula-yellow)"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                        />

                        {/* Yellow vertical branch connecting multiple achievements */}
                        {eventYs.length > 1 && (
                          <line
                            x1={xBranch}
                            y1={firstEventY}
                            x2={xBranch}
                            y2={lastEventY}
                            stroke="var(--dracula-yellow)"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                          />
                        )}

                        {/* Yellow event dots on branch */}
                        {eventYs.map((evY, evIdx) => (
                          <circle
                            key={evIdx}
                            cx={xBranch}
                            cy={evY}
                            r={4.5}
                            fill="var(--dracula-yellow)"
                            stroke="var(--dracula-background)"
                            strokeWidth={1.5}
                          />
                        ))}
                      </>
                    )}
                  </g>
                );
              })}

              {/* 4. Bottom INITIAL COMMIT node */}
              <circle
                cx={xMaster}
                cy={layout.initialCommitY}
                r={5.5}
                fill="var(--dracula-purple)"
                stroke="var(--dracula-background)"
                strokeWidth={2}
              />
            </svg>
          )}

          {/* HTML Text Content Column (pl-14 ensures text clears the git tree) */}
          <div className="pl-14 space-y-4">
            {/* Top Node */}
            <div ref={presentRef} className="py-1">
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[var(--dracula-foreground)]">
                PRESENT
              </span>
            </div>

            {/* Jobs list */}
            {sortedJobs.map((job, jobIdx) => {
              if (!eventRefs.current[jobIdx]) {
                eventRefs.current[jobIdx] = [];
              }

              return (
                <div key={jobIdx} className="space-y-2">
                  {/* Job Heading */}
                  <div
                    ref={(el) => {
                      jobHeadingRefs.current[jobIdx] = el;
                    }}
                    className="py-1"
                  >
                    <h2 className="text-xs md:text-sm font-semibold uppercase tracking-wide text-[var(--dracula-cyan)] break-words leading-relaxed">
                      {job.occupation} | {job['start-date']} | {job.place}
                    </h2>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-1.5 pl-2">
                    {job.events.map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        ref={(el) => {
                          eventRefs.current[jobIdx][eventIdx] = el;
                        }}
                        className="py-1"
                      >
                        <p className="text-xs md:text-sm text-[var(--dracula-foreground)] break-words leading-relaxed">
                          {event.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Bottom Node */}
            <div ref={initialCommitRef} className="py-2">
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[var(--dracula-comment)]">
                INITIAL COMMIT
              </span>
            </div>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  );
}
