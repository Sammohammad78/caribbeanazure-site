import { NextResponse } from 'next/server';

// List of static pages to include in the sitemap. Dynamic routes could be
// generated here as well.
const pages = ['/', '/privacy', '/terms', '/thank-you'];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://caribbeanazure.com';
  const urls = pages
    .map((p) => `<url><loc>${baseUrl}${p}</loc></url>`) // join after map
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}