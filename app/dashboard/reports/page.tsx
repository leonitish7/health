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

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<any>(null);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Visualize your fitness progress and trends
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Workouts</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.totalWorkouts || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Duration</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.round((stats?.totalDuration || 0) / 60)}h
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Calories Burned</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.totalCalories || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600">Avg Sleep</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.averageSleep ? `${stats.averageSleep.toFixed(1)}h` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Types Distribution */}
        {workoutTypeData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">
            No data available for the selected time period.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Start logging your workouts and health metrics to see your progress!
          </p>
        </div>
      )}
    </div>
  );
}
