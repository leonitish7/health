import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Workout from '@/models/Workout';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const query: any = { userId: session.user.id };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const workouts = await Workout.find(query)
      .sort({ date: -1 })
      .limit(limit);

    return NextResponse.json({ workouts }, { status: 200 });
  } catch (error) {
    console.error('Get workouts error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching workouts' },
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
    const { title, type, exercises, duration, caloriesBurned, date, notes } =
      body;

    if (!title || !type || !duration) {
      return NextResponse.json(
        { error: 'Title, type, and duration are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const workout = await Workout.create({
      userId: session.user.id,
      title,
      type,
      exercises: exercises || [],
      duration,
      caloriesBurned,
      date: date || new Date(),
      notes,
    });

    return NextResponse.json({ workout }, { status: 201 });
  } catch (error) {
    console.error('Create workout error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating workout' },
      { status: 500 }
    );
  }
}
