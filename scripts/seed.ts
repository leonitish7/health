import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../lib/mongodb';

// Import models
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  goalWeight: Number,
  activityLevel: String,
  fitnessGoal: String,
}, { timestamps: true });

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: Number,
  notes: String,
  exercises: [{
    name: { type: String, required: true },
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    distance: Number,
  }],
}, { timestamps: true });

const HealthMetricSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: Number,
  bodyFat: Number,
  muscleMass: Number,
  waist: Number,
  chest: Number,
  arms: Number,
  thighs: Number,
  sleep: Number,
  water: Number,
  steps: Number,
  heartRate: Number,
  bloodPressureSystolic: Number,
  bloodPressureDiastolic: Number,
  mood: String,
  energyLevel: Number,
  stressLevel: Number,
  notes: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Workout = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
const HealthMetric = mongoose.models.HealthMetric || mongoose.model('HealthMetric', HealthMetricSchema);

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await HealthMetric.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.create([
      {
        email: 'john@test.com',
        password: hashedPassword,
        name: 'John Doe',
        age: 28,
        gender: 'Male',
        height: 180,
        weight: 82,
        goalWeight: 75,
        activityLevel: 'Very Active',
        fitnessGoal: 'Weight Loss',
      },
      {
        email: 'sarah@test.com',
        password: hashedPassword,
        name: 'Sarah Johnson',
        age: 25,
        gender: 'Female',
        height: 165,
        weight: 58,
        goalWeight: 62,
        activityLevel: 'Moderately Active',
        fitnessGoal: 'Muscle Gain',
      },
      {
        email: 'mike@test.com',
        password: hashedPassword,
        name: 'Mike Wilson',
        age: 35,
        gender: 'Male',
        height: 175,
        weight: 90,
        goalWeight: 80,
        activityLevel: 'Active',
        fitnessGoal: 'General Fitness',
      },
    ]);

    console.log('Created 3 test users');

    // Generate workout data for the past 30 days
    const workoutTypes = ['Strength Training', 'Cardio', 'HIIT', 'Yoga', 'Sports'];
    const strengthExercises = [
      { name: 'Bench Press', sets: 4, reps: 10, weight: 80 },
      { name: 'Squats', sets: 4, reps: 12, weight: 100 },
      { name: 'Deadlifts', sets: 3, reps: 8, weight: 120 },
      { name: 'Shoulder Press', sets: 3, reps: 10, weight: 40 },
      { name: 'Pull-ups', sets: 3, reps: 12 },
      { name: 'Bicep Curls', sets: 3, reps: 12, weight: 15 },
      { name: 'Tricep Dips', sets: 3, reps: 15 },
    ];

    const cardioExercises = [
      { name: 'Running', duration: 30, distance: 5 },
      { name: 'Cycling', duration: 45, distance: 15 },
      { name: 'Swimming', duration: 30, distance: 1 },
      { name: 'Rowing', duration: 20, distance: 3 },
    ];

    for (const user of users) {
      const workouts = [];
      const healthMetrics = [];

      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Create 2-3 workouts per week
        if (i % 3 === 0 || i % 4 === 0) {
          const type = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
          let exercises = [];
          let duration = 0;
          let caloriesBurned = 0;

          if (type === 'Strength Training') {
            exercises = strengthExercises
              .sort(() => Math.random() - 0.5)
              .slice(0, 4 + Math.floor(Math.random() * 3));
            duration = 60 + Math.floor(Math.random() * 30);
            caloriesBurned = 250 + Math.floor(Math.random() * 150);
          } else if (type === 'Cardio') {
            exercises = [cardioExercises[Math.floor(Math.random() * cardioExercises.length)]];
            duration = exercises[0].duration;
            caloriesBurned = 300 + Math.floor(Math.random() * 200);
          } else if (type === 'HIIT') {
            exercises = [
              { name: 'Burpees', sets: 5, reps: 15 },
              { name: 'Jump Squats', sets: 5, reps: 20 },
              { name: 'Mountain Climbers', sets: 5, reps: 30 },
            ];
            duration = 30;
            caloriesBurned = 350 + Math.floor(Math.random() * 150);
          } else if (type === 'Yoga') {
            exercises = [
              { name: 'Vinyasa Flow', duration: 45 },
              { name: 'Sun Salutations', sets: 5 },
            ];
            duration = 45;
            caloriesBurned = 150 + Math.floor(Math.random() * 100);
          } else {
            exercises = [
              { name: 'Basketball', duration: 60 },
            ];
            duration = 60;
            caloriesBurned = 400 + Math.floor(Math.random() * 200);
          }

          workouts.push({
            userId: user._id,
            title: `${type} Session`,
            type,
            date,
            duration,
            caloriesBurned,
            exercises,
            notes: `Great workout session!`,
          });
        }

        // Create health metrics every 3 days
        if (i % 3 === 0) {
          const baseWeight = user.weight;
          const weightProgress = (user.goalWeight - baseWeight) * (i / 30) * 0.3;
          
          healthMetrics.push({
            userId: user._id,
            date,
            weight: +(baseWeight + weightProgress).toFixed(1),
            bodyFat: user.gender === 'Male' ? 18 - (i * 0.1) : 25 - (i * 0.1),
            muscleMass: user.gender === 'Male' ? 35 + (i * 0.05) : 28 + (i * 0.05),
            waist: user.gender === 'Male' ? 85 - (i * 0.2) : 70 - (i * 0.2),
            chest: user.gender === 'Male' ? 100 : 90,
            arms: user.gender === 'Male' ? 35 : 28,
            thighs: user.gender === 'Male' ? 55 : 50,
            sleep: 6 + Math.floor(Math.random() * 3),
            water: 2000 + Math.floor(Math.random() * 1000),
            steps: 8000 + Math.floor(Math.random() * 5000),
            heartRate: 60 + Math.floor(Math.random() * 20),
            bloodPressureSystolic: 115 + Math.floor(Math.random() * 15),
            bloodPressureDiastolic: 75 + Math.floor(Math.random() * 10),
            mood: ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
            energyLevel: 3 + Math.floor(Math.random() * 3),
            stressLevel: 1 + Math.floor(Math.random() * 3),
            notes: 'Feeling good!',
          });
        }
      }

      await Workout.insertMany(workouts);
      await HealthMetric.insertMany(healthMetrics);
      console.log(`Created ${workouts.length} workouts and ${healthMetrics.length} health metrics for ${user.name}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Users:');
    console.log('-----------------------------------');
    console.log('1. Email: john@test.com');
    console.log('   Password: password123');
    console.log('   Name: John Doe (Weight Loss Goal)');
    console.log('');
    console.log('2. Email: sarah@test.com');
    console.log('   Password: password123');
    console.log('   Name: Sarah Johnson (Muscle Gain Goal)');
    console.log('');
    console.log('3. Email: mike@test.com');
    console.log('   Password: password123');
    console.log('   Name: Mike Wilson (General Fitness Goal)');
    console.log('-----------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
