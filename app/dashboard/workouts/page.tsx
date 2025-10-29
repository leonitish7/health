'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Calendar, Clock, Flame, Sparkles } from 'lucide-react';

const workoutQuotes = [
  "Every workout counts. Every rep matters.",
  "The body achieves what the mind believes.",
  "Train insane or remain the same.",
  "Your only limit is you.",
  "Sweat is fat crying.",
];

export default function WorkoutsPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % workoutQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('/api/workouts?limit=100');
      const data = await response.json();
      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || workout.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-10 md:py-12">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
                Workouts
                <span className="animate-bounce">🏃</span>
              </h1>
              <div className="flex items-start gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300 mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-white/90 italic font-medium transition-all duration-500">
                  "{workoutQuotes[quoteIndex]}"
                </p>
              </div>
              <p className="text-sm text-white/70">
                Track and manage your workout sessions
              </p>
              <div className="flex gap-2 mt-3">
                {workoutQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === quoteIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/workouts/new')}
              className="hidden md:flex items-center px-4 py-2 bg-white/90 text-indigo-700 rounded-lg hover:bg-white font-semibold transition-colors shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Workout
            </button>
          </div>
          <div className="absolute right-8 bottom-8 hidden lg:block">
            <div className="text-white/20 text-8xl font-black transform hover:scale-110 transition-transform duration-300">
              💪
            </div>
          </div>
        </div>
      </div>

      {/* Mobile New Workout Button */}
      <div className="md:hidden">
        <button
          onClick={() => router.push('/dashboard/workouts/new')}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Workout
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl dark:shadow-2xl dark:shadow-white/10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl focus:shadow-2xl dark:shadow-lg dark:shadow-white/10 dark:hover:shadow-xl dark:hover:shadow-white/15 dark:focus:shadow-2xl dark:focus:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl focus:shadow-2xl dark:shadow-lg dark:shadow-white/10 dark:hover:shadow-xl dark:hover:shadow-white/15 dark:focus:shadow-2xl dark:focus:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-foreground transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibility</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workouts List */}
      <div className="bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {filteredWorkouts.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            <p className="text-lg">No workouts found</p>
            <button
              onClick={() => router.push('/dashboard/workouts/new')}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              Log your first workout
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="px-6 py-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/5 hover:border-l-2 hover:border-primary group"
                onClick={() => router.push(`/dashboard/workouts/${workout._id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                        {workout.type}
                      </span>
                      <h3 className="ml-3 text-lg font-medium text-foreground">
                        {workout.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                      <span className="text-muted-foreground">
                        {workout.exercises?.length || 0} exercises
                      </span>
                    </div>
                    {workout.notes && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {workout.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
