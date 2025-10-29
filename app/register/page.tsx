'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Activity, Mail, Lock, User, Sparkles, ArrowRight, ArrowLeft, UserCircle, Target, TrendingUp } from 'lucide-react';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Personal Info
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [fitnessGoal, setFitnessGoal] = useState('maintain');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          age: age ? parseInt(age) : undefined,
          gender: gender || undefined,
          height: height ? parseFloat(height) : undefined,
          weight: weight ? parseFloat(weight) : undefined,
          goalWeight: goalWeight ? parseFloat(goalWeight) : undefined,
          activityLevel,
          fitnessGoal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dark Black Background */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50" />
      </div>

      {/* Large Faded Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <Activity className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white opacity-5" />
      </div>

      {/* Floating Elements - Very Subtle */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-[0.02] animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-gray-400 rounded-full mix-blend-overlay filter blur-3xl opacity-[0.02] animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gray-300 rounded-full mix-blend-overlay filter blur-3xl opacity-[0.02] animate-blob animation-delay-4000" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-2xl w-full">
          {/* Frosted Glass Card */}
          <div className="relative group">
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-2xl opacity-50 group-hover:opacity-75 blur transition duration-1000 group-hover:duration-200" />
            
            {/* Card Content - Frosted Glass */}
            <div className="relative bg-white/20 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/30">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-black rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Activity className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  Create Account
                  <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
                </h2>
                <p className="text-white/90 text-sm">
                  Join us and start your fitness journey today
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= 1
                          ? 'bg-white text-gray-900 shadow-lg scale-110'
                          : 'bg-white/20 text-white/50'
                      }`}
                    >
                      1
                    </div>
                    <span className={`text-sm font-medium ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
                      Credentials
                    </span>
                  </div>
                  <div className="w-12 sm:w-20 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full bg-white transition-all duration-500 ${
                        step >= 2 ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= 2
                          ? 'bg-white text-gray-900 shadow-lg scale-110'
                          : 'bg-white/20 text-white/50'
                      }`}
                    >
                      2
                    </div>
                    <span className={`text-sm font-medium ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                      Details
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <span className="text-red-300">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1: Credentials */}
              {step === 1 && (
                <form className="space-y-5" onSubmit={handleStep1Submit}>
                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <form className="space-y-5" onSubmit={handleStep2Submit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Age
                      </label>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          placeholder="25"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      >
                        <option value="" className="bg-gray-900">Select</option>
                        <option value="male" className="bg-gray-900">Male</option>
                        <option value="female" className="bg-gray-900">Female</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>

                    {/* Height */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="number"
                          step="0.1"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          placeholder="170"
                        />
                      </div>
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Current Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        placeholder="70"
                      />
                    </div>

                    {/* Goal Weight */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Goal Weight (kg)
                      </label>
                      <div className="relative">
                        <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="number"
                          step="0.1"
                          value={goalWeight}
                          onChange={(e) => setGoalWeight(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          placeholder="65"
                        />
                      </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Activity Level
                      </label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      >
                        <option value="sedentary" className="bg-gray-900">Sedentary</option>
                        <option value="light" className="bg-gray-900">Light</option>
                        <option value="moderate" className="bg-gray-900">Moderate</option>
                        <option value="active" className="bg-gray-900">Active</option>
                        <option value="very_active" className="bg-gray-900">Very Active</option>
                      </select>
                    </div>

                    {/* Fitness Goal */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Fitness Goal
                      </label>
                      <select
                        value={fitnessGoal}
                        onChange={(e) => setFitnessGoal(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      >
                        <option value="lose_weight" className="bg-gray-900">Lose Weight</option>
                        <option value="gain_muscle" className="bg-gray-900">Gain Muscle</option>
                        <option value="maintain" className="bg-gray-900">Maintain Weight</option>
                        <option value="improve_endurance" className="bg-gray-900">Improve Endurance</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="group flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Sign In Link */}
              <div className="text-center pt-6 border-t border-white/20 mt-6">
                <p className="text-white/80 text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-white hover:text-white/70 transition-colors inline-flex items-center gap-1 group"
                  >
                    Sign in
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-tilt {
          animation: tilt 3s infinite;
        }
      `}</style>
    </div>
  );
}
