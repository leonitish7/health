import Link from 'next/link';
import { Activity, Dumbbell, Heart, BarChart3, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">FitTrack</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Track Your Fitness Journey
              <span className="block text-indigo-600 mt-2">Achieve Your Goals</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
              A comprehensive health and workout tracking application to help you monitor your progress,
              stay motivated, and reach your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Tracking Now
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-indigo-600 bg-white rounded-lg hover:bg-gray-50 transition-colors border-2 border-indigo-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you track, analyze, and improve your fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Workout Tracking</h3>
              <p className="text-gray-600">
                Log your workouts with detailed exercise information, sets, reps, and weights.
                Track strength, cardio, and flexibility training.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Metrics</h3>
              <p className="text-gray-600">
                Monitor weight, body fat, measurements, sleep, water intake, and vital signs.
                Keep track of your overall wellness.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Analytics</h3>
              <p className="text-gray-600">
                Visualize your progress with interactive charts and graphs. Track trends and
                celebrate your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose FitTrack?
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
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Start Your Journey Today</h3>
              <p className="text-lg mb-6 text-indigo-100">
                Join thousands of users who are already tracking their fitness journey and
                achieving their goals with FitTrack.
              </p>
              <Link
                href="/register"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Activity className="h-8 w-8 text-indigo-400" />
            <span className="ml-2 text-2xl font-bold text-white">FitTrack</span>
          </div>
          <p className="text-center text-gray-400">
            © 2025 FitTrack. Your personal fitness tracking companion.
          </p>
        </div>
      </footer>
    </div>
  );
}
