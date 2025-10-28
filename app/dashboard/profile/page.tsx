'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User, Save } from 'lucide-react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [fitnessGoal, setFitnessGoal] = useState('maintain');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      
      if (data.user) {
        setName(data.user.name || '');
        setAge(data.user.age?.toString() || '');
        setGender(data.user.gender || '');
        setHeight(data.user.height?.toString() || '');
        setWeight(data.user.weight?.toString() || '');
        setGoalWeight(data.user.goalWeight?.toString() || '');
        setActivityLevel(data.user.activityLevel || 'moderate');
        setFitnessGoal(data.user.fitnessGoal || 'maintain');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const bmi = calculateBMI();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your personal information and fitness goals
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Profile updated successfully!
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Account Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              Email cannot be changed
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Body Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Body Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="170"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="65"
              />
            </div>
          </div>

          {bmi && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Your BMI: <span className="text-2xl font-bold text-indigo-600">{bmi}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {parseFloat(bmi) < 18.5 && 'Underweight'}
                {parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25 && 'Normal weight'}
                {parseFloat(bmi) >= 25 && parseFloat(bmi) < 30 && 'Overweight'}
                {parseFloat(bmi) >= 30 && 'Obese'}
              </p>
            </div>
          )}
        </div>

        {/* Fitness Goals */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Fitness Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (intense exercise daily)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Goal
              </label>
              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="lose_weight">Lose Weight</option>
                <option value="gain_muscle">Gain Muscle</option>
                <option value="maintain">Maintain Weight</option>
                <option value="improve_endurance">Improve Endurance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
