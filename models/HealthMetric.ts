import mongoose, { Schema, models } from 'mongoose';

export interface IHealthMetric extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  date: Date;
  weight?: number; // in kg
  bodyFat?: number; // percentage
  muscleMass?: number; // in kg
  waist?: number; // in cm
  chest?: number; // in cm
  arms?: number; // in cm
  thighs?: number; // in cm
  sleep?: number; // hours
  water?: number; // liters
  steps?: number;
  heartRate?: number; // resting heart rate
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  mood?: 'excellent' | 'good' | 'okay' | 'poor' | 'bad';
  energyLevel?: 1 | 2 | 3 | 4 | 5;
  stressLevel?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HealthMetricSchema = new Schema<IHealthMetric>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    weight: {
      type: Number,
      min: 0,
    },
    bodyFat: {
      type: Number,
      min: 0,
      max: 100,
    },
    muscleMass: {
      type: Number,
      min: 0,
    },
    waist: {
      type: Number,
      min: 0,
    },
    chest: {
      type: Number,
      min: 0,
    },
    arms: {
      type: Number,
      min: 0,
    },
    thighs: {
      type: Number,
      min: 0,
    },
    sleep: {
      type: Number,
      min: 0,
      max: 24,
    },
    water: {
      type: Number,
      min: 0,
    },
    steps: {
      type: Number,
      min: 0,
    },
    heartRate: {
      type: Number,
      min: 0,
    },
    bloodPressureSystolic: {
      type: Number,
      min: 0,
    },
    bloodPressureDiastolic: {
      type: Number,
      min: 0,
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'okay', 'poor', 'bad'],
    },
    energyLevel: {
      type: Number,
      min: 1,
      max: 5,
    },
    stressLevel: {
      type: Number,
      min: 1,
      max: 5,
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
HealthMetricSchema.index({ userId: 1, date: -1 });

const HealthMetric = models.HealthMetric || mongoose.model<IHealthMetric>('HealthMetric', HealthMetricSchema);

export default HealthMetric;
