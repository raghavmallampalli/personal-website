import { NextResponse } from 'next/server';
import { getExperienceData } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const data = getExperienceData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading experience data:', error);
    return NextResponse.json({ error: 'Failed to load experience data' }, { status: 500 });
  }
}