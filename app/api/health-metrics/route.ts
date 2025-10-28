import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import HealthMetric from '@/models/HealthMetric';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const query: any = { userId: session.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const metrics = await HealthMetric.find(query)
      .sort({ date: -1 })
      .limit(limit);

    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.error('Get health metrics error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching health metrics' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    await dbConnect();

    const metric = await HealthMetric.create({
      userId: session.user.id,
      ...body,
      date: body.date || new Date(),
    });

    return NextResponse.json({ metric }, { status: 201 });
  } catch (error) {
    console.error('Create health metric error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating health metric' },
      { status: 500 }
    );
  }
}
