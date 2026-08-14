import { NextResponse } from 'next/server';
import { getObsessionsData } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const data = getObsessionsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading obsessions data:', error);
    return NextResponse.json({ error: 'Failed to load obsessions data' }, { status: 500 });
  }
}