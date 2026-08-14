import { NextResponse } from 'next/server';
import { getAboutData } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const data = getAboutData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading about data:', error);
    return NextResponse.json({ error: 'Failed to load about data' }, { status: 500 });
  }
}