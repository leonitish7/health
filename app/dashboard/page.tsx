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
  Sparkles,
} from 'lucide-react';

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success starts with self-discipline.",
  "Push yourself because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "The difference between try and triumph is a little 'umph'.",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Rotate quotes every 10 seconds
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Hero Section with Image and Quote */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
              Welcome back, {session?.user?.name}! 
              <span className="animate-pulse">💪</span>
            </h1>
            <div className="flex items-start gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
              <p className="text-lg md:text-xl text-white/90 italic font-medium transition-all duration-500">
                "{motivationalQuotes[quoteIndex]}"
              </p>
            </div>
            <p className="text-sm text-white/70">
              Here's your fitness overview for the last 30 days
            </p>
            <div className="flex gap-2 mt-4">
              {motivationalQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === quoteIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="absolute right-8 bottom-8 hidden md:block">
            <div className="text-white/20 text-9xl font-black transform hover:scale-110 transition-transform duration-300">
              🏋️
            </div>
          </div>
        </div>
      </div>

      <div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.name}
              className="group relative bg-card/50 backdrop-blur-sm overflow-hidden rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-[0_25px_60px_-12px_rgba(255,255,255,0.25)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6">
                <div className="flex items-center">
                  <div className={`${card.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.name}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-foreground">
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
          className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Dumbbell className="h-8 w-8 mb-2 relative z-10 drop-shadow-lg" />
          <h3 className="text-lg font-semibold relative z-10 drop-shadow-lg">Log Workout</h3>
          <p className="text-sm opacity-90 mt-1 relative z-10 drop-shadow-lg">Track your exercise session</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/health/new')}
          className="group relative bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Heart className="h-8 w-8 mb-2 relative z-10 drop-shadow-lg" />
          <h3 className="text-lg font-semibold relative z-10 drop-shadow-lg">Log Health Metrics</h3>
          <p className="text-sm opacity-90 mt-1 relative z-10 drop-shadow-lg">Record your health data</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/reports')}
          className="group relative bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <TrendingUp className="h-8 w-8 mb-2 relative z-10 drop-shadow-lg" />
          <h3 className="text-lg font-semibold relative z-10 drop-shadow-lg">View Reports</h3>
          <p className="text-sm opacity-90 mt-1 relative z-10 drop-shadow-lg">Analyze your progress</p>
        </button>
      </div>

      {/* Recent Workouts */}
      <div className="bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Workouts
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentWorkouts.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground">
              <ActivityIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p>No workouts logged yet</p>
              <button
                onClick={() => router.push('/dashboard/workouts/new')}
                className="mt-4 text-primary hover:text-primary/80 font-medium"
              >
                Log your first workout
              </button>
            </div>
          ) : (
            recentWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="px-6 py-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/5 hover:border-l-2 hover:border-primary"
                onClick={() => router.push(`/dashboard/workouts/${workout._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {workout.type}
                      </span>
                      <h3 className="ml-3 text-sm font-medium text-foreground">
                        {workout.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground space-x-4">
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
                  <div className="ml-4 text-sm font-medium text-foreground">
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
