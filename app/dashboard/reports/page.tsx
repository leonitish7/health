'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { Sparkles } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

const analyticsQuotes = [
  "What gets measured gets managed.",
  "Progress is impossible without change.",
  "Data is the new oil. Refine it to fuel your success.",
  "Track your journey, celebrate your progress.",
  "Numbers don't lie. They reveal your dedication.",
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<any>(null);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % analyticsQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [days]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports?days=${days}`);
      const data = await response.json();
      setStats(data.stats);
      setWorkouts(data.workouts || []);
      setHealthMetrics(data.healthMetrics || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Prepare workout type data for pie chart
  const workoutTypeData = Object.entries(stats?.workoutsByType || {}).map(
    ([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count,
    })
  );

  // Prepare weight trend data
  const weightData = healthMetrics
    .filter((m) => m.weight)
    .reverse()
    .map((m) => ({
      date: format(new Date(m.date), 'MMM dd'),
      weight: m.weight,
    }));

  // Prepare workout duration over time
  const workoutDurationData = workouts
    .slice()
    .reverse()
    .map((w) => ({
      date: format(new Date(w.date), 'MMM dd'),
      duration: w.duration,
      calories: w.caloriesBurned || 0,
    }));

  // Prepare sleep and water data
  const sleepWaterData = healthMetrics
    .filter((m) => m.sleep || m.water)
    .reverse()
    .map((m) => ({
      date: format(new Date(m.date), 'MMM dd'),
      sleep: m.sleep || 0,
      water: m.water || 0,
    }));

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-10 md:py-12">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
                Reports & Analytics
                <span className="animate-bounce">📊</span>
              </h1>
              <div className="flex items-start gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300 mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-white/90 italic font-medium transition-all duration-500">
                  "{analyticsQuotes[quoteIndex]}"
                </p>
              </div>
              <p className="text-sm text-white/70">
                Visualize your fitness progress and trends
              </p>
              <div className="flex gap-2 mt-3">
                {analyticsQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === quoteIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="hidden md:block px-4 py-2 bg-white/90 text-emerald-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white font-semibold shadow-lg"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
          <div className="absolute right-8 bottom-8 hidden lg:block">
            <div className="text-white/20 text-8xl font-black transform hover:scale-110 transition-transform duration-300">
              📈
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Time Period Selector */}
      <div className="md:hidden">
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full px-4 py-2 bg-background/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl focus:shadow-2xl dark:shadow-lg dark:shadow-white/10 dark:hover:shadow-xl dark:hover:shadow-white/15 dark:focus:shadow-2xl dark:focus:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-all duration-200"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-muted-foreground">Total Workouts</h3>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {stats?.totalWorkouts || 0}
            </p>
          </div>
        </div>
        <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-muted-foreground">Total Duration</h3>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {Math.round((stats?.totalDuration || 0) / 60)}h
            </p>
          </div>
        </div>
        <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-muted-foreground">Calories Burned</h3>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {stats?.totalCalories || 0}
            </p>
          </div>
        </div>
        <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Sleep</h3>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {stats?.averageSleep ? `${stats.averageSleep.toFixed(1)}h` : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Types Distribution */}
        {workoutTypeData.length > 0 && (
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Workout Distribution by Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workoutTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workoutTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Weight Trend */}
        {weightData.length > 0 && (
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Weight Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Weight (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Workout Duration Over Time */}
        {workoutDurationData.length > 0 && (
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Workout Duration & Calories
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workoutDurationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="duration"
                  fill="#6366f1"
                  name="Duration (min)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="calories"
                  fill="#f59e0b"
                  name="Calories"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Sleep & Water Tracking */}
        {sleepWaterData.length > 0 && (
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Sleep & Water Intake
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sleepWaterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sleep"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Sleep (hours)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="water"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Water (liters)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* No Data Message */}
      {workouts.length === 0 && healthMetrics.length === 0 && (
        <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-xl dark:shadow-2xl dark:shadow-white/10 p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-muted-foreground text-lg">
            No data available for the selected time period.
          </p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Start logging your workouts and health metrics to see your progress!
          </p>
        </div>
      )}
    </div>
  );
}
