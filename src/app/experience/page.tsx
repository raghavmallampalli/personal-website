import React from 'react';
import { getExperienceData } from '@/lib/data';
import ExperienceTimeline from './ExperienceTimeline';

export default function ExperiencePage() {
  const data = getExperienceData();

  return <ExperienceTimeline experienceData={data.experience} />;
}