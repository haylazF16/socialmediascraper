import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import natural from 'natural';

const prisma = new PrismaClient();
const analyzer = new natural.SentimentAnalyzer();

export async function POST(request: Request) {
  try {
    const { keywords, platforms, dateRange, location } = await request.json();

    // Validate request data
    if (!keywords || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Mock social media API calls (replace with actual API integrations)
    const mockData = await Promise.all(
      platforms.map(async (platform: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          platform,
          results: keywords.map((keyword: string) => ({
            username: `user_${Math.floor(Math.random() * 1000)}`,
            message: `Sample post about ${keyword}`,
            postedAt: new Date().toISOString(),
            engagement: Math.floor(Math.random() * 100),
          })),
        };
      })
    );

    // Process and analyze the data
    const processedResults = mockData.flatMap(platformData =>
      platformData.results.map(result => {
        // Perform sentiment analysis
        const tokens = new natural.WordTokenizer().tokenize(result.message);
        const sentiment = analyzer.getSentiment(tokens || []);

        // Calculate lead score based on engagement and sentiment
        const leadScore = Math.floor(
          (result.engagement * 0.7 + (sentiment + 1) * 15) / 2
        );

        return {
          platform: platformData.platform,
          username: result.username,
          message: result.message,
          sentiment: sentiment > 0 ? 'Positive' : sentiment < 0 ? 'Negative' : 'Neutral',
          leadScore,
          postedAt: result.postedAt,
          engagement: result.engagement,
        };
      })
    );

    // Store results in database
    const search = await prisma.search.create({
      data: {
        userId: 'default-user', // Replace with actual user ID from auth
        keywords,
        platforms,
        location,
        dateRange: dateRange
          ? {
              create: {
                startDate: new Date(dateRange.start),
                endDate: new Date(dateRange.end),
              },
            }
          : undefined,
        results: {
          create: processedResults.map(result => ({
            platform: result.platform,
            username: result.username,
            message: result.message,
            sentiment: result.sentiment,
            leadScore: result.leadScore,
            engagement: result.engagement,
            postedAt: new Date(result.postedAt),
          })),
        },
      },
      include: {
        results: true,
        dateRange: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: search,
    });
  } catch (error) {
    console.error('Error processing scrape request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const results = await prisma.search.findMany({
      include: {
        results: true,
        dateRange: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}