'use client';

import React, { useEffect, useRef } from 'react';
import { createGitgraph, templateExtend, TemplateName, Orientation } from '@gitgraph/js';
import CustomScrollbar from '@/components/CustomScrollbar';
import { ExperienceItem } from '@/lib/data';

interface ExperienceTimelineProps {
  experienceData: ExperienceItem[];
}

export default function ExperienceTimeline({ experienceData }: ExperienceTimelineProps) {
  const gitgraphContainer = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set container height to match main element
    const setContainerHeight = () => {
      const mainElement = document.querySelector('main');
      if (mainElement && containerRef.current) {
        const mainHeight = mainElement.offsetHeight;
        const paddingBottom = 20; // Add 20px bottom padding to prevent overflow
        containerRef.current.style.height = `${mainHeight - paddingBottom}px`;
      }
    };

    setContainerHeight();
    window.addEventListener('resize', setContainerHeight);

    return () => {
      window.removeEventListener('resize', setContainerHeight);
    };
  }, []);

  useEffect(() => {
    if (!gitgraphContainer.current || !experienceData || experienceData.length === 0) return;

    // Clear previous content
    gitgraphContainer.current.innerHTML = '';

    // Get the graph container HTML element.
    const graphContainer = gitgraphContainer.current;

    // Get CSS variable values
    const computedStyle = getComputedStyle(document.documentElement);
    const branchLineWidth = parseInt(computedStyle.getPropertyValue('--gitgraph-branch-line-width')) || 3;
    const branchSpacing = parseInt(computedStyle.getPropertyValue('--gitgraph-branch-spacing')) || 35;
    const commitSpacing = parseInt(computedStyle.getPropertyValue('--gitgraph-commit-spacing')) || 30;
    const dotSize = parseInt(computedStyle.getPropertyValue('--gitgraph-dot-size')) || 6;
    const dotStrokeWidth = parseInt(computedStyle.getPropertyValue('--gitgraph-dot-stroke-width')) || 2;
    const purpleColor = computedStyle.getPropertyValue('--dracula-purple').trim() || '#bd93f9';
    const yellowColor = computedStyle.getPropertyValue('--dracula-yellow').trim() || '#f1fa8c';
    const foregroundColor = computedStyle.getPropertyValue('--dracula-foreground').trim() || '#f8f8f2';

    // Target horizontal coordinates
    const targetBranchX = Math.round(branchSpacing * 1.2); // ~42px
    const textAbsoluteX = targetBranchX + 24; // ~66px

    // Instantiate the graph.
    const gitgraph = createGitgraph(graphContainer, {
      template: templateExtend(TemplateName.Metro, {
        colors: [purpleColor, yellowColor], // Dracula colors from CSS variables
        branch: {
          lineWidth: branchLineWidth,
          spacing: branchSpacing * 1.2,
        },
        commit: {
          spacing: commitSpacing * 1.3,
          dot: {
            size: dotSize,
            strokeWidth: dotStrokeWidth,
          },
          message: {
            font: 'inherit',
          },
        },
      }),
      orientation: Orientation.VerticalReverse,
    });

    // Main career timeline spine (Purple, Column 0)
    const master = gitgraph.branch({
      name: "career",
      style: {
        color: purpleColor,
        label: {
          display: false,
        }
      }
    });
    
    // Top of timeline (PRESENT)
    master.commit({
      subject: "PRESENT",
      style: {
        color: purpleColor,
        dot: {
          color: purpleColor,
        },
        message: {
          color: foregroundColor,
          font: 'inherit',
          displayHash: false,
          displayAuthor: false,
        },
      },
    });

    // Process jobs from most recent to oldest (top-to-bottom on screen)
    const sortedJobs = [...experienceData].reverse();

    sortedJobs.forEach((job, index) => {
      // 1. Commit the Job Heading on the master career spine (Column 0, Purple)
      master.commit({
        subject: `${job.occupation} | ${job['start-date']} | ${job.place}`,
        style: {
          color: purpleColor,
          dot: {
            color: purpleColor,
          },
          message: {
            color: foregroundColor,
            font: 'inherit',
            displayHash: false,
            displayAuthor: false,
          },
        },
      });

      // 2. Distinct branch for each job so Gitgraph draws a separate path from this heading
      const eventBranch = master.branch({
        name: `job-${index}`,
        style: {
          color: yellowColor,
          label: {
            display: false,
          }
        }
      });

      // 3. Commit each achievement on this job's branch
      job.events.forEach((event) => {
        eventBranch.commit({
          subject: `${event.name}`,
          style: {
            color: yellowColor,
            dot: {
              color: yellowColor,
            },
            message: {
              color: foregroundColor,
              font: 'inherit',
              displayHash: false,
              displayAuthor: false,
            },
          },
        });
      });
    });

    // Final commit at the bottom of the timeline (Column 0, Purple)
    master.commit({
      subject: "INITIAL COMMIT",
      style: {
        color: purpleColor,
        dot: {
          color: purpleColor,
        },
        message: {
          color: foregroundColor,
          font: 'inherit',
          displayHash: false,
          displayAuthor: false,
        },
      },
    });

    // Post-process SVG: align all yellow branches, dots, and text messages
    const alignSvg = () => {
      const svg = gitgraphContainer.current?.querySelector('svg');
      if (!svg) return;

      // 1. Align all branch curve paths to targetBranchX
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        if (!d) return;

        // Skip straight master spine at x=0; only modify branching paths
        if (d.includes('C') || d.includes('c')) {
          const newD = d.replace(/([0-9.]+)\s+([0-9.]+)/g, (match, xStr, yStr) => {
            const x = parseFloat(xStr);
            const y = parseFloat(yStr);
            const newX = x > 5 ? targetBranchX : x;
            return `${newX} ${y}`;
          });
          path.setAttribute('d', newD);
        }
      });

      // 2. Align all commit dots and their corresponding text messages
      const commitGroups = svg.querySelectorAll('g');
      commitGroups.forEach((g) => {
        const transform = g.getAttribute('transform');
        if (transform && transform.startsWith('translate(')) {
          const match = transform.match(/translate\(\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*\)/);
          if (match) {
            const x = parseFloat(match[1]);
            const y = parseFloat(match[2]);
            const isBranchCommit = x > 5;

            // Set group transform to either 0 (master) or targetBranchX (yellow branch)
            if (isBranchCommit) {
              g.setAttribute('transform', `translate(${targetBranchX}, ${y})`);
            } else {
              g.setAttribute('transform', `translate(0, ${y})`);
            }

            // Align text inside this commit group
            const textElement = g.querySelector('text');
            if (textElement) {
              const textContent = textElement.textContent || '';
              const isOccupation = experienceData.some(() => textContent.includes("|"));
              
              if (isOccupation) {
                textElement.classList.add('occupation-commit');
              } else {
                textElement.classList.add('event-commit');
              }

              // Position relative to group so all text aligns at exact textAbsoluteX
              const relX = isBranchCommit ? (textAbsoluteX - targetBranchX) : textAbsoluteX;
              textElement.setAttribute('x', String(relX));
              textElement.removeAttribute('transform');
            }
          }
        }
      });
    };

    // Execute alignment immediately and after render frames
    setTimeout(alignSvg, 50);
    setTimeout(alignSvg, 150);
    setTimeout(alignSvg, 300);

  }, [experienceData]);

  return (
    <div ref={containerRef} className="experience-container">
      <h1 className="text-2xl md:text-3xl font-light page-title">
        Professional Experience
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--dracula-comment)' }}>
        What got me up in the morning
      </p>
      
      <CustomScrollbar className="experience-scrollable">
        <div ref={gitgraphContainer} />
      </CustomScrollbar>
    </div>
  );
}
