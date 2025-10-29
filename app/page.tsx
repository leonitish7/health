'use client';

import Link from 'next/link';
import { Activity, Dumbbell, Heart, BarChart3, CheckCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-black dark:bg-white rounded-lg group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white dark:text-black" />
              </div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white group-hover:opacity-80 transition-opacity">
                <span className="hidden sm:inline">Workout Health Tracker</span>
                <span className="sm:hidden">WHT</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                  )}
                </button>
              )}
              <Link
                href="/login"
                className="text-foreground hover:text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-foreground text-background px-6 py-2 rounded-lg hover:bg-foreground/90 transition-colors shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 dark:from-black/80 dark:via-black/70 dark:to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
              Track Your Fitness Journey
              <span className="block text-white/90 mt-2">Achieve Your Goals</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/90 mb-10 drop-shadow-lg leading-relaxed">
              A comprehensive health and workout tracking application to help you monitor your progress,
              stay motivated, and reach your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                Start Tracking Now
                <Activity className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border-2 border-white/30 shadow-xl"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to help you track, analyze, and improve your fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Workout Tracking</h3>
              <p className="text-muted-foreground">
                Log your workouts with detailed exercise information, sets, reps, and weights.
                Track strength, cardio, and flexibility training.
              </p>
            </div>

            <div className="group p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-600 dark:bg-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Health Metrics</h3>
              <p className="text-muted-foreground">
                Monitor weight, body fat, measurements, sleep, water intake, and vital signs.
                Keep track of your overall wellness.
              </p>
            </div>

            <div className="group p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl hover:shadow-2xl hover:scale-105 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Progress Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your progress with interactive charts and graphs. Track trends and
                celebrate your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Choose Workout Health Tracker?
              </h2>
              <div className="space-y-4">
                {[
                  'Easy-to-use interface for logging workouts and health data',
                  'Comprehensive tracking of exercises, sets, reps, and weights',
                  'Monitor body measurements, sleep, water intake, and more',
                  'Beautiful charts and graphs to visualize your progress',
                  'Set and track your fitness goals',
                  'Secure and private - your data belongs to you',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <p className="text-foreground text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              {/* Minimal Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
              
              {/* Card Content */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold text-foreground mb-4">Start Your Journey Today</h3>
                <p className="text-lg mb-6 text-muted-foreground">
                  Join thousands of users who are already tracking their fitness journey and
                  achieving their goals with Workout Health Tracker.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Create Free Account
                  <Activity className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
