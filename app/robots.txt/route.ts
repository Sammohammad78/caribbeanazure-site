import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://caribbeanazure.com';
  const body = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}