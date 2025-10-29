import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Workout from '@/models/Workout';

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

    const workout = await Workout.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.error('Get workout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching workout' },
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

    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      body,
      { new: true, runValidators: true }
    );

    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.error('Update workout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating workout' },
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

    const workout = await Workout.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Workout deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete workout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting workout' },
      { status: 500 }
    );
  }
}
