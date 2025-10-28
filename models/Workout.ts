import mongoose, { Schema, models } from 'mongoose';

export interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number; // in kg
  duration?: number; // in minutes for cardio
  distance?: number; // in km for running/cycling
  calories?: number;
  notes?: string;
}

export interface IWorkout extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports' | 'other';
  exercises: IExercise[];
  duration: number; // total workout duration in minutes
  caloriesBurned?: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new Schema<IExercise>({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    min: 0,
    default: 0,
  },
  reps: {
    type: Number,
    min: 0,
    default: 0,
  },
  weight: {
    type: Number,
    min: 0,
  },
  duration: {
    type: Number,
    min: 0,
  },
  distance: {
    type: Number,
    min: 0,
  },
  calories: {
    type: Number,
    min: 0,
  },
  notes: {
    type: String,
  },
});

const WorkoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'sports', 'other'],
      required: true,
    },
    exercises: [ExerciseSchema],
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
WorkoutSchema.index({ userId: 1, date: -1 });

const Workout = models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);

export default Workout;
