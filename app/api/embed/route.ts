import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tmdbId = searchParams.get('id');

  if (!tmdbId) {
    return NextResponse.json({ error: 'Missing TMDB ID' }, { status: 400 });
  }

  const embedUrl = `https://flicky.host/embed/movie/?id=${tmdbId}`;

  return NextResponse.json({ embedUrl });
}
