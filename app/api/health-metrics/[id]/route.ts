import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import HealthMetric from '@/models/HealthMetric';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    const metric = await HealthMetric.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 });
    }

    return NextResponse.json({ metric }, { status: 200 });
  } catch (error) {
    console.error('Get health metric error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching health metric' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await dbConnect();

    const metric = await HealthMetric.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      body,
      { new: true, runValidators: true }
    );

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 });
    }

    return NextResponse.json({ metric }, { status: 200 });
  } catch (error) {
    console.error('Update health metric error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating health metric' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    const metric = await HealthMetric.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Metric deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete health metric error:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting health metric' },
      { status: 500 }
    );
  }
}
