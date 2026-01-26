import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const calculator = searchParams.get('calculator');

  if (!calculator) {
    return NextResponse.json({ error: 'Calculator slug required' }, { status: 400 });
  }

  try {
    // Try locale-specific file
    let filePath = path.join(process.cwd(), 'messages', locale, `${calculator}.json`);
    
    if (!fs.existsSync(filePath) && locale !== 'en') {
      // Fallback to English
      filePath = path.join(process.cwd(), 'messages', 'en', `${calculator}.json`);
    }

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
  } catch (error) {
    console.error('Error loading translation:', error);
    return NextResponse.json({ error: 'Failed to load translation' }, { status: 500 });
  }
}
