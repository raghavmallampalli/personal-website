import React from 'react';
import CustomScrollbar from '@/components/CustomScrollbar';
import { getSkillsData } from '@/lib/data';

export default function SkillsPage() {
  const skillsData = getSkillsData();

  return (
    <div className="page-container">
      <h1 className="text-2xl md:text-3xl font-light page-title">Skills</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--dracula-comment)' }}>
        A collection of my technical skills organized by domain
      </p>
      
      <CustomScrollbar className="flex-1">
        <div className="notebook-container">
          {/* Render skill sections dynamically */}
          {skillsData.skills.sections.map((section, index) => (
            <div key={index} className="notebook-cell">
              <div className="cell-header">
                <span className="cell-number">{section.cell_number}</span>
                <span className="cell-type">{section.cell_type}</span>
              </div>
              <div className="cell-content">
                <h2 className="section-title">{section.title}</h2>
                <div className="skills-grid">
                  {section.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <span className="skill-name" style={{ color: skill.color }}>
                        {skill.name}
                      </span>
                      <span className="skill-desc">{skill.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Code execution cell */}
          <div className="notebook-cell">
            <div className="cell-header">
              <span className="cell-number">{skillsData.skills.code_cell.cell_number}</span>
              <span className="cell-type">{skillsData.skills.code_cell.cell_type}</span>
            </div>
            <div className="cell-content code-cell">
              <pre><code style={{ color: 'var(--dracula-foreground)' }}>
                {skillsData.skills.code_cell.code}
              </code></pre>
            </div>
            <div className="cell-output">
              <span style={{ color: 'var(--dracula-comment)' }}>Out [4]:</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {skillsData.skills.code_cell.output.map((item, index) => (
                  <span key={index} style={{ color: item.color }}>
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  );
}