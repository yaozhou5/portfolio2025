import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rssUrl = 'https://byshay.substack.com/feed';
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }
    
    const xmlText = await response.text();
    
    // Parse RSS XML
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xmlText)) !== null && items.length < 4) {
      const itemContent = match[1];
      
      // Try multiple patterns for title (CDATA, escaped, plain)
      const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/);
      // Try multiple patterns for link
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>|<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/);
      // Try multiple patterns for date
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>|<dc:date>([\s\S]*?)<\/dc:date>/);
      
      if (titleMatch && linkMatch) {
        const title = (titleMatch[1] || titleMatch[2] || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        const link = (linkMatch[1] || linkMatch[2] || '').trim();
        let date = '';
        
        if (pubDateMatch) {
          const pubDateStr = pubDateMatch[1] || pubDateMatch[2] || '';
          try {
            const pubDate = new Date(pubDateStr);
            if (!isNaN(pubDate.getTime())) {
              date = pubDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
            }
          } catch (e) {
            // If date parsing fails, leave date empty
          }
        }
        
        if (title && link) {
          items.push({
            title: title.trim(),
            link: link.trim(),
            date: date
          });
        }
      }
    }
    
    return NextResponse.json({ articles: items });
  } catch (error) {
    console.error('Error fetching Substack articles:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}

