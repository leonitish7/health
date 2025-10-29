'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function NewWorkoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [type, setType] = useState('strength');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState<any[]>([
    { name: '', sets: '', reps: '', weight: '', duration: '', distance: '', notes: '' },
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: '', sets: '', reps: '', weight: '', duration: '', distance: '', notes: '' },
    ]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const exerciseData = exercises
        .filter((ex) => ex.name.trim())
        .map((ex) => ({
          name: ex.name,
          sets: ex.sets ? parseInt(ex.sets) : 0,
          reps: ex.reps ? parseInt(ex.reps) : 0,
          weight: ex.weight ? parseFloat(ex.weight) : undefined,
          duration: ex.duration ? parseInt(ex.duration) : undefined,
          distance: ex.distance ? parseFloat(ex.distance) : undefined,
          notes: ex.notes || undefined,
        }));

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          date: new Date(date),
          duration: parseInt(duration),
          caloriesBurned: caloriesBurned ? parseInt(caloriesBurned) : undefined,
          exercises: exerciseData,
          notes: notes || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create workout');
      }

      router.push('/dashboard/workouts');
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Log Workout</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Record your workout session details
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Workout Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Morning Run, Chest Day, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="45"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories Burned
              </label>
              <input
                type="number"
                min="0"
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="How did you feel? Any observations?"
              />
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Exercises</h2>
            <button
              type="button"
              onClick={addExercise}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Exercise
            </button>
          </div>

          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 relative"
              >
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        updateExercise(index, 'name', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Bench Press, Running, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sets
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(index, 'sets', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reps
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={exercise.reps}
                      onChange={(e) =>
                        updateExercise(index, 'reps', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={exercise.weight}
                      onChange={(e) =>
                        updateExercise(index, 'weight', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={exercise.duration}
                      onChange={(e) =>
                        updateExercise(index, 'duration', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance (km)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={exercise.distance}
                      onChange={(e) =>
                        updateExercise(index, 'distance', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="5"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={exercise.notes}
                      onChange={(e) =>
                        updateExercise(index, 'notes', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Any specific notes for this exercise"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            {loading ? 'Saving...' : 'Save Workout'}
          </button>
        </div>
      </form>
    </div>
  );
}
