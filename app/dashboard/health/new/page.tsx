'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function NewHealthMetricPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [sleep, setSleep] = useState('');
  const [water, setWater] = useState('');
  const [steps, setSteps] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data: any = {
        date: new Date(date),
      };

      if (weight) data.weight = parseFloat(weight);
      if (bodyFat) data.bodyFat = parseFloat(bodyFat);
      if (muscleMass) data.muscleMass = parseFloat(muscleMass);
      if (waist) data.waist = parseFloat(waist);
      if (chest) data.chest = parseFloat(chest);
      if (arms) data.arms = parseFloat(arms);
      if (thighs) data.thighs = parseFloat(thighs);
      if (sleep) data.sleep = parseFloat(sleep);
      if (water) data.water = parseFloat(water);
      if (steps) data.steps = parseInt(steps);
      if (heartRate) data.heartRate = parseInt(heartRate);
      if (bloodPressureSystolic)
        data.bloodPressureSystolic = parseInt(bloodPressureSystolic);
      if (bloodPressureDiastolic)
        data.bloodPressureDiastolic = parseInt(bloodPressureDiastolic);
      if (mood) data.mood = mood;
      if (energyLevel) data.energyLevel = parseInt(energyLevel);
      if (stressLevel) data.stressLevel = parseInt(stressLevel);
      if (notes) data.notes = notes;

      const response = await fetch('/api/health-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create health metric');
      }

      router.push('/dashboard/health');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Log Health Metrics
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Record your health and body measurements
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Date
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Body Measurements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="70.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body Fat (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="15.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Muscle Mass (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={muscleMass}
                onChange={(e) => setMuscleMass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="55.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waist (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chest (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arms (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={arms}
                onChange={(e) => setArms(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="35"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thighs (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={thighs}
                onChange={(e) => setThighs(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="60"
              />
            </div>
          </div>
        </div>

        {/* Daily Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sleep (hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="7.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Water (liters)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Steps
              </label>
              <input
                type="number"
                min="0"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="10000"
              />
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resting Heart Rate (bpm)
              </label>
              <input
                type="number"
                min="0"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="65"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Pressure (Systolic)
              </label>
              <input
                type="number"
                min="0"
                value={bloodPressureSystolic}
                onChange={(e) => setBloodPressureSystolic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Pressure (Diastolic)
              </label>
              <input
                type="number"
                min="0"
                value={bloodPressureDiastolic}
                onChange={(e) => setBloodPressureDiastolic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="80"
              />
            </div>
          </div>
        </div>

        {/* Wellness */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Wellness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="okay">Okay</option>
                <option value="poor">Poor</option>
                <option value="bad">Bad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Energy Level (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stress Level (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="3"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notes
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="How are you feeling? Any observations?"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : 'Save Metrics'}
          </button>
        </div>
      </form>
    </div>
  );
}
