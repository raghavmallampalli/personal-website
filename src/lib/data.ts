import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface AboutLink {
  icon: string;
  text: string;
  type: 'internal' | 'external';
  url: string;
}

export interface AboutData {
  about: {
    profile: {
      name: string;
      title: string;
    };
    links: AboutLink[];
    current_hustle: {
      title: string;
      message: string;
      link_text: string;
      link_url: string;
    };
  };
}

export interface Obsession {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

export interface ObsessionsData {
  obsessions: Obsession[];
}

export interface Skill {
  name: string;
  color: string;
  description: string;
}

export interface SkillSection {
  cell_number: string;
  cell_type: string;
  title: string;
  skills: Skill[];
}

export interface OutputItem {
  text: string;
  color: string;
}

export interface CodeCell {
  cell_number: string;
  cell_type: string;
  code: string;
  output: OutputItem[];
}

export interface SkillsData {
  skills: {
    sections: SkillSection[];
    code_cell: CodeCell;
  };
}

export interface ExperienceEvent {
  name: string;
}

export interface ExperienceItem {
  occupation: string;
  'start-date': string;
  place: string;
  events: ExperienceEvent[];
}

export interface ExperienceData {
  experience: ExperienceItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactLink {
  type: string;
  url: string;
  display_text?: string;
  title?: string;
  icon: string;
  size?: number;
  show_text_on_mobile?: boolean;
}

export interface StatusBarData {
  statusbar: {
    wsl_indicator: {
      url: string;
      icon: string;
      background_color: string;
    };
    left_section: {
      title: string;
      links: SocialLink[];
    };
    right_section: {
      status_indicators: {
        sync_icon: string;
        errors: number;
        warnings: number;
      };
      contact_links: ContactLink[];
      notification_icon: string;
    };
  };
}

function loadYamlFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as T;
}

export function getAboutData(): AboutData {
  return loadYamlFile<AboutData>('about.yaml');
}

export function getObsessionsData(): ObsessionsData {
  return loadYamlFile<ObsessionsData>('obsessions.yaml');
}

export function getSkillsData(): SkillsData {
  return loadYamlFile<SkillsData>('skills.yaml');
}

export function getExperienceData(): ExperienceData {
  return loadYamlFile<ExperienceData>('experience.yaml');
}

export function getStatusbarData(): StatusBarData {
  return loadYamlFile<StatusBarData>('statusbar.yaml');
}
