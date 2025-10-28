'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export default function HealthMetricsPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/health-metrics?limit=100');
      const data = await response.json();
      setMetrics(data.metrics || []);
    } catch (error) {
      console.error('Failed to fetch health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWeightTrend = () => {
    if (metrics.length < 2) return null;
    const recentMetrics = metrics.filter((m) => m.weight).slice(0, 2);
    if (recentMetrics.length < 2) return null;
    const diff = recentMetrics[0].weight - recentMetrics[1].weight;
    return diff;
  };

  const weightTrend = getWeightTrend();

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
          <h1 className="text-3xl font-bold text-gray-900">Health Metrics</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your body measurements and health data
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/health/new')}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Metrics
        </button>
      </div>

      {/* Summary Cards */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics[0].weight && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-600">
                Latest Weight
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">
                  {metrics[0].weight}
                </p>
                <span className="ml-2 text-gray-600">kg</span>
                {weightTrend !== null && (
                  <span
                    className={`ml-3 flex items-center text-sm ${
                      weightTrend > 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {weightTrend > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(weightTrend).toFixed(1)} kg
                  </span>
                )}
              </div>
            </div>
          )}

          {metrics[0].sleep && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-600">
                Latest Sleep
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">
                  {metrics[0].sleep}
                </p>
                <span className="ml-2 text-gray-600">hours</span>
              </div>
            </div>
          )}

          {metrics[0].water && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-600">
                Latest Water Intake
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">
                  {metrics[0].water}
                </p>
                <span className="ml-2 text-gray-600">liters</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Metrics List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {metrics.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <p className="text-lg">No health metrics logged yet</p>
            <button
              onClick={() => router.push('/dashboard/health/new')}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Log your first entry
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {metrics.map((metric) => (
              <div
                key={metric._id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() =>
                  router.push(`/dashboard/health/${metric._id}`)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(metric.date)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {metric.weight && (
                        <div>
                          <p className="text-xs text-gray-500">Weight</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.weight} kg
                          </p>
                        </div>
                      )}
                      {metric.bodyFat && (
                        <div>
                          <p className="text-xs text-gray-500">Body Fat</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.bodyFat}%
                          </p>
                        </div>
                      )}
                      {metric.sleep && (
                        <div>
                          <p className="text-xs text-gray-500">Sleep</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.sleep}h
                          </p>
                        </div>
                      )}
                      {metric.water && (
                        <div>
                          <p className="text-xs text-gray-500">Water</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.water}L
                          </p>
                        </div>
                      )}
                      {metric.steps && (
                        <div>
                          <p className="text-xs text-gray-500">Steps</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.steps.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {metric.heartRate && (
                        <div>
                          <p className="text-xs text-gray-500">Heart Rate</p>
                          <p className="text-sm font-medium text-gray-900">
                            {metric.heartRate} bpm
                          </p>
                        </div>
                      )}
                    </div>
                    {metric.notes && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-1">
                        {metric.notes}
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
