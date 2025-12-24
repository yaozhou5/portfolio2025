import { NextResponse } from 'next/server';

interface Article {
  title: string;
  date: string;
  link: string;
}

export async function GET() {
  try {
    // Fetch RSS feed from Substack
    const rssUrl = 'https://byshay.substack.com/feed';
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();
    
    // Parse RSS XML to extract articles
    const articles: Article[] = [];
    
    // Extract all item elements
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xmlText)) !== null && articles.length < 4) {
      const itemContent = match[1];
      
      // Extract title
      const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : '';
      
      // Extract link
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      // Extract pubDate and format it
      const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
      let formattedDate = '';
      if (dateMatch) {
        const pubDate = new Date(dateMatch[1]);
        formattedDate = pubDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      
      if (title && link) {
        articles.push({
          title: title.trim(),
          date: formattedDate,
          link: link.trim(),
        });
      }
    }
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching Substack articles:', error);
    // Return empty array on error so the page still renders
    return NextResponse.json([]);
  }
}

