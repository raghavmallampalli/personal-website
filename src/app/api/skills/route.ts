import { NextResponse } from 'next/server';
import { getSkillsData } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const data = getSkillsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return NextResponse.json({ error: 'Failed to load skills data' }, { status: 500 });
  }
}