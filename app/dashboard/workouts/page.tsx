'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Calendar, Clock, Flame } from 'lucide-react';

export default function WorkoutsPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage your workout sessions
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/workouts/new')}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Workout
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
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
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {filteredWorkouts.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <p className="text-lg">No workouts found</p>
            <button
              onClick={() => router.push('/dashboard/workouts/new')}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Log your first workout
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/dashboard/workouts/${workout._id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                        {workout.type}
                      </span>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">
                        {workout.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
                      <span className="text-gray-600">
                        {workout.exercises?.length || 0} exercises
                      </span>
                    </div>
                    {workout.notes && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
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
