import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { reportType, dateRange, format } = await request.json();

    // Validate request data
    if (!reportType || !dateRange) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get data for the report
    const results = await prisma.result.findMany({
      where: {
        search: {
          dateRange: {
            startDate: {
              gte: new Date(dateRange.start),
            },
            endDate: {
              lte: new Date(dateRange.end),
            },
          },
        },
      },
      include: {
        search: {
          include: {
            dateRange: true,
          },
        },
      },
    });

    // Process data based on report type
    let reportData;
    switch (reportType) {
      case 'engagement':
        reportData = processEngagementData(results);
        break;
      case 'sentiment':
        reportData = processSentimentData(results);
        break;
      case 'leads':
        reportData = processLeadData(results);
        break;
      default:
        reportData = results;
    }

    // Format report based on requested format
    const formattedReport = formatReport(reportData, format);

    return NextResponse.json({
      success: true,
      data: formattedReport,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function processEngagementData(results: any[]) {
  // Group data by platform and calculate engagement metrics
  const engagementByPlatform = results.reduce((acc, result) => {
    const platform = result.platform;
    if (!acc[platform]) {
      acc[platform] = {
        totalEngagement: 0,
        postCount: 0,
        averageEngagement: 0,
      };
    }

    acc[platform].totalEngagement += result.engagement;
    acc[platform].postCount += 1;
    acc[platform].averageEngagement =
      acc[platform].totalEngagement / acc[platform].postCount;

    return acc;
  }, {});

  return {
    type: 'engagement',
    data: engagementByPlatform,
    summary: {
      totalPosts: results.length,
      averageEngagement:
        results.reduce((sum, result) => sum + result.engagement, 0) /
        results.length,
    },
  };
}

function processSentimentData(results: any[]) {
  // Calculate sentiment distribution
  const sentimentCounts = results.reduce(
    (acc, result) => {
      acc[result.sentiment.toLowerCase()] += 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const total = results.length;
  return {
    type: 'sentiment',
    data: {
      distribution: sentimentCounts,
      percentages: {
        positive: (sentimentCounts.positive / total) * 100,
        neutral: (sentimentCounts.neutral / total) * 100,
        negative: (sentimentCounts.negative / total) * 100,
      },
    },
    summary: {
      dominantSentiment: Object.entries(sentimentCounts).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0],
      totalAnalyzed: total,
    },
  };
}

function processLeadData(results: any[]) {
  // Sort and categorize leads by score
  const sortedLeads = [...results].sort((a, b) => b.leadScore - a.leadScore);
  const leadCategories = {
    high: sortedLeads.filter((lead) => lead.leadScore >= 7),
    medium: sortedLeads.filter(
      (lead) => lead.leadScore >= 4 && lead.leadScore < 7
    ),
    low: sortedLeads.filter((lead) => lead.leadScore < 4),
  };

  return {
    type: 'leads',
    data: leadCategories,
    summary: {
      totalLeads: results.length,
      highPriorityLeads: leadCategories.high.length,
      averageLeadScore:
        results.reduce((sum, result) => sum + result.leadScore, 0) /
        results.length,
    },
  };
}

function formatReport(data: any, format: string = 'json') {
  // In a real application, you would implement proper formatting
  // for different output types (Excel, PDF, etc.)
  switch (format.toLowerCase()) {
    case 'json':
      return data;
    case 'csv':
      return {
        format: 'csv',
        content: 'CSV data would be generated here',
        data: data,
      };
    case 'excel':
      return {
        format: 'excel',
        content: 'Excel data would be generated here',
        data: data,
      };
    case 'pdf':
      return {
        format: 'pdf',
        content: 'PDF report would be generated here',
        data: data,
      };
    default:
      return data;
  }
}