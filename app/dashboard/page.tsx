'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Dumbbell,
  Heart,
  TrendingUp,
  Calendar,
  Flame,
  Clock,
  Activity as ActivityIcon,
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      const [reportsRes, workoutsRes] = await Promise.all([
        fetch('/api/reports?days=30'),
        fetch('/api/workouts?limit=5'),
      ]);

      const reportsData = await reportsRes.json();
      const workoutsData = await workoutsRes.json();

      setStats(reportsData.stats);
      setRecentWorkouts(workoutsData.workouts || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Workouts',
      value: stats?.totalWorkouts || 0,
      icon: Dumbbell,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      name: 'Total Duration',
      value: `${Math.round((stats?.totalDuration || 0) / 60)}h ${
        (stats?.totalDuration || 0) % 60
      }m`,
      icon: Clock,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      name: 'Calories Burned',
      value: stats?.totalCalories || 0,
      icon: Flame,
      color: 'bg-orange-500',
      change: '+15%',
    },
    {
      name: 'Current Weight',
      value: stats?.latestWeight ? `${stats.latestWeight} kg` : 'N/A',
      icon: Heart,
      color: 'bg-red-500',
      change: stats?.latestWeight && stats?.averageWeight 
        ? `${((stats.latestWeight - stats.averageWeight) / stats.averageWeight * 100).toFixed(1)}%`
        : '0%',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Here's your fitness overview for the last 30 days
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`${card.color} rounded-lg p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {card.name}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {card.value}
                      </p>
                      {card.change && (
                        <span className="ml-2 text-sm text-green-600">
                          {card.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <button
          onClick={() => router.push('/dashboard/workouts/new')}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <Dumbbell className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-semibold">Log Workout</h3>
          <p className="text-sm opacity-90 mt-1">Track your exercise session</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/health/new')}
          className="bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <Heart className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-semibold">Log Health Metrics</h3>
          <p className="text-sm opacity-90 mt-1">Record your health data</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/reports')}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <TrendingUp className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-semibold">View Reports</h3>
          <p className="text-sm opacity-90 mt-1">Analyze your progress</p>
        </button>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Workouts
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentWorkouts.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              <ActivityIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No workouts logged yet</p>
              <button
                onClick={() => router.push('/dashboard/workouts/new')}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Log your first workout
              </button>
            </div>
          ) : (
            recentWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/dashboard/workouts/${workout._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                        {workout.type}
                      </span>
                      <h3 className="ml-3 text-sm font-medium text-gray-900">
                        {workout.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(workout.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {workout.duration} min
                      </span>
                      {workout.caloriesBurned && (
                        <span className="flex items-center">
                          <Flame className="h-4 w-4 mr-1" />
                          {workout.caloriesBurned} cal
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900">
                    {workout.exercises?.length || 0} exercises
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
