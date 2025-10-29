'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Activity, Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
        <div className="max-w-md w-full">
          {/* Frosted Glass Card */}
          <div className="relative group">
            {/* Subtle Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-2xl opacity-50 group-hover:opacity-75 blur transition duration-1000 group-hover:duration-200" />
            
            {/* Card Content - Frosted Glass */}
            <div className="relative bg-white/20 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/30">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-black rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <Activity className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  Welcome Back
                  <Sparkles className="w-6 h-6 text-white/80 animate-pulse" />
                </h2>
                <p className="text-white/90 text-sm">
                  Sign in to continue your fitness journey
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                    <span className="text-red-300">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Register Link */}
              <div className="text-center pt-6 border-t border-white/20 mt-6">
                <p className="text-white/80 text-sm">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="font-semibold text-white hover:text-white/70 transition-colors inline-flex items-center gap-1 group"
                  >
                    Create account
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
