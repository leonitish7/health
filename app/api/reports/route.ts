import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Workout from '@/models/Workout';
import HealthMetric from '@/models/HealthMetric';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch workouts
    const workouts = await Workout.find({
      userId: session.user.id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Fetch health metrics
    const healthMetrics = await HealthMetric.find({
      userId: session.user.id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Calculate statistics
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0
    );
    const totalCalories = workouts.reduce(
      (sum, workout) => sum + (workout.caloriesBurned || 0),
      0
    );

    // Workout type distribution
    const workoutsByType = workouts.reduce((acc: any, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {});

    // Get latest weight
    const latestWeight = healthMetrics
      .filter((m) => m.weight)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0]?.weight;

    // Calculate average metrics
    const weightMetrics = healthMetrics.filter((m) => m.weight);
    const averageWeight =
      weightMetrics.length > 0
        ? weightMetrics.reduce((sum, m) => sum + (m.weight || 0), 0) /
          weightMetrics.length
        : null;

    const sleepMetrics = healthMetrics.filter((m) => m.sleep);
    const averageSleep =
      sleepMetrics.length > 0
        ? sleepMetrics.reduce((sum, m) => sum + (m.sleep || 0), 0) /
          sleepMetrics.length
        : null;

    const waterMetrics = healthMetrics.filter((m) => m.water);
    const averageWater =
      waterMetrics.length > 0
        ? waterMetrics.reduce((sum, m) => sum + (m.water || 0), 0) /
          waterMetrics.length
        : null;

    return NextResponse.json(
      {
        stats: {
          totalWorkouts,
          totalDuration,
          totalCalories,
          workoutsByType,
          latestWeight,
          averageWeight,
          averageSleep,
          averageWater,
        },
        workouts,
        healthMetrics,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get reports error:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating reports' },
      { status: 500 }
    );
  }
}
