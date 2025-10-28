import mongoose, { Schema, models } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  goalWeight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoal?: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_endurance';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    height: {
      type: Number,
      min: 0,
    },
    weight: {
      type: Number,
      min: 0,
    },
    goalWeight: {
      type: Number,
      min: 0,
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      default: 'moderate',
    },
    fitnessGoal: {
      type: String,
      enum: ['lose_weight', 'gain_muscle', 'maintain', 'improve_endurance'],
      default: 'maintain',
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
