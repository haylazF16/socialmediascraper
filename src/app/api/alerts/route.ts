import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { keywords, platforms, frequency, active } = await request.json();

    // Validate request data
    if (!keywords || !platforms || !frequency) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Create new alert
    const alert = await prisma.alert.create({
      data: {
        userId: 'default-user', // Replace with actual user ID from auth
        keywords,
        platforms,
        frequency,
        active: active ?? true,
      },
    });

    // In a real application, you would set up a background job here
    // to monitor social media platforms based on the alert frequency

    return NextResponse.json({
      success: true,
      data: alert,
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        userId: 'default-user', // Replace with actual user ID from auth
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, active } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing alert ID' },
        { status: 400 }
      );
    }

    const updatedAlert = await prisma.alert.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json({
      success: true,
      data: updatedAlert,
    });
  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing alert ID' },
        { status: 400 }
      );
    }

    await prisma.alert.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Alert deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}