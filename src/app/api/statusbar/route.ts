import { NextResponse } from 'next/server';
import { getStatusbarData } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const data = getStatusbarData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading statusbar data:', error);
    return NextResponse.json({ error: 'Failed to load statusbar data' }, { status: 500 });
  }
}