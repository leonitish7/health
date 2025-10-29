'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const healthQuotes = [
  "Take care of your body. It's the only place you have to live.",
  "Health is wealth. Invest in yourself.",
  "A healthy outside starts from the inside.",
  "Your body hears everything your mind says. Stay positive.",
  "The greatest wealth is health.",
];

export default function HealthMetricsPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % healthQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-10 md:py-12">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
                Health Metrics
                <span className="animate-pulse">❤️</span>
              </h1>
              <div className="flex items-start gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300 mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-white/90 italic font-medium transition-all duration-500">
                  "{healthQuotes[quoteIndex]}"
                </p>
              </div>
              <p className="text-sm text-white/70">
                Track your body measurements and health data
              </p>
              <div className="flex gap-2 mt-3">
                {healthQuotes.map((_, index) => (
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
              onClick={() => router.push('/dashboard/health/new')}
              className="hidden md:flex items-center px-4 py-2 bg-white/90 text-rose-700 rounded-lg hover:bg-white font-semibold transition-colors shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Log Metrics
            </button>
          </div>
          <div className="absolute right-8 bottom-8 hidden lg:block">
            <div className="text-white/20 text-8xl font-black transform hover:scale-110 transition-transform duration-300">
              🏥
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Log Metrics Button */}
      <div className="md:hidden">
        <button
          onClick={() => router.push('/dashboard/health/new')}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Metrics
        </button>
      </div>

      {/* Summary Cards */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics[0].weight && (
            <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Latest Weight
                </h3>
                <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-foreground">
                  {metrics[0].weight}
                </p>
                <span className="ml-2 text-muted-foreground">kg</span>
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
            </div>
          )}

          {metrics[0].sleep && (
            <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Latest Sleep
                </h3>
                <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-foreground">
                  {metrics[0].sleep}
                </p>
                <span className="ml-2 text-muted-foreground">hours</span>
              </div>
              </div>
            </div>
          )}

          {metrics[0].water && (
            <div className="group relative bg-card/50 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/15 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Latest Water Intake
                </h3>
                <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-foreground">
                  {metrics[0].water}
                </p>
                <span className="ml-2 text-muted-foreground">liters</span>
              </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Metrics List */}
      <div className="bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-white/10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {metrics.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            <p className="text-lg">No health metrics logged yet</p>
            <button
              onClick={() => router.push('/dashboard/health/new')}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              Log your first entry
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {metrics.map((metric) => (
              <div
                key={metric._id}
                className="px-6 py-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-white/5 hover:border-l-2 hover:border-primary"
                onClick={() =>
                  router.push(`/dashboard/health/${metric._id}`)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(metric.date)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {metric.weight && (
                        <div>
                          <p className="text-xs text-muted-foreground">Weight</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.weight} kg
                          </p>
                        </div>
                      )}
                      {metric.bodyFat && (
                        <div>
                          <p className="text-xs text-muted-foreground">Body Fat</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.bodyFat}%
                          </p>
                        </div>
                      )}
                      {metric.sleep && (
                        <div>
                          <p className="text-xs text-muted-foreground">Sleep</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.sleep}h
                          </p>
                        </div>
                      )}
                      {metric.water && (
                        <div>
                          <p className="text-xs text-muted-foreground">Water</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.water}L
                          </p>
                        </div>
                      )}
                      {metric.steps && (
                        <div>
                          <p className="text-xs text-muted-foreground">Steps</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.steps.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {metric.heartRate && (
                        <div>
                          <p className="text-xs text-muted-foreground">Heart Rate</p>
                          <p className="text-sm font-medium text-foreground">
                            {metric.heartRate} bpm
                          </p>
                        </div>
                      )}
                    </div>
                    {metric.notes && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-1">
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
