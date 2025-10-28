# FitTrack - Health & Workout Tracking Application

A comprehensive full-stack web application built with Next.js, TypeScript, Tailwind CSS, and MongoDB Atlas for tracking workouts, health metrics, and visualizing fitness progress.

## Features

### 🏋️ Workout Tracking
- Log detailed workout sessions with exercises, sets, reps, and weights
- Track different workout types: Strength, Cardio, Flexibility, Sports
- Record workout duration and calories burned
- Add custom notes for each workout and exercise

### 💓 Health Metrics
- Monitor weight, body fat percentage, and muscle mass
- Track body measurements (waist, chest, arms, thighs)
- Log daily metrics: sleep hours, water intake, steps
- Record vital signs: heart rate, blood pressure
- Track mood, energy levels, and stress

### 📊 Analytics & Reports
- Interactive charts and graphs powered by Recharts
- Weight trend analysis
- Workout duration and calorie tracking over time
- Sleep and water intake visualization
- Workout type distribution
- Customizable time periods (7 days, 30 days, 90 days, 1 year)

### 🔐 Authentication & User Management
- Secure email/password authentication with NextAuth.js
- User registration with detailed profile setup
- Profile management with BMI calculation
- Personalized fitness goals and activity levels

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js with bcryptjs
- **Database:** MongoDB Atlas with Mongoose ODM
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Utilities:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/leonitish/Desktop/health
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables:**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration:

   ```env
   # MongoDB Atlas Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fittrack?retryWrites=true&w=majority

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_a_random_secret_key_here

   # Environment
   NODE_ENV=development
   ```

   **To generate a secure NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Set up MongoDB Atlas:**
   
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (free M0 cluster is sufficient)
   - Click "Connect" and choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password
   - Whitelist your IP address or use `0.0.0.0/0` for development (allow access from anywhere)
   - Paste the connection string into your `.env.local` file as `MONGODB_URI`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
health/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth authentication
│   │   ├── register/          # User registration
│   │   ├── user/              # User profile management
│   │   ├── workouts/          # Workout CRUD operations
│   │   ├── health-metrics/    # Health metrics CRUD operations
│   │   └── reports/           # Analytics and reports
│   ├── dashboard/             # Protected dashboard pages
│   │   ├── workouts/          # Workout pages
│   │   ├── health/            # Health metrics pages
│   │   ├── reports/           # Analytics page
│   │   └── profile/           # User profile page
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   └── page.tsx               # Landing page
├── components/                # Reusable React components
│   ├── DashboardLayout.tsx    # Main dashboard layout
│   └── Providers.tsx          # NextAuth session provider
├── models/                    # Mongoose database models
│   ├── User.ts                # User model
│   ├── Workout.ts             # Workout model
│   └── HealthMetric.ts        # Health metrics model
├── lib/                       # Utility functions
│   ├── mongodb.ts             # MongoDB connection
│   └── auth.ts                # NextAuth configuration
├── types/                     # TypeScript type definitions
│   └── next-auth.d.ts         # NextAuth type extensions
└── .env.example               # Environment variables template
```

## Usage Guide

### Registration

1. Navigate to the registration page
2. **Step 1:** Enter your email and password
3. **Step 2:** Complete your profile with:
   - Full name (required)
   - Age, gender, height, weight
   - Goal weight
   - Activity level
   - Fitness goal

### Logging Workouts

1. Go to Dashboard → Workouts → New Workout
2. Enter workout details:
   - Title, type, date
   - Duration and calories burned
   - Notes
3. Add exercises with:
   - Exercise name
   - Sets, reps, weight
   - Duration, distance (for cardio)
   - Exercise-specific notes

### Tracking Health Metrics

1. Navigate to Dashboard → Health Metrics → Log Metrics
2. Record various metrics:
   - Body measurements
   - Daily metrics (sleep, water, steps)
   - Vital signs
   - Wellness indicators

### Viewing Reports

1. Go to Dashboard → Reports
2. Select time period (7, 30, 90 days, or 1 year)
3. View interactive charts:
   - Workout distribution
   - Weight trends
   - Duration and calories over time
   - Sleep and water intake patterns

## API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/auth/signin` - Sign in with credentials
- `POST /api/auth/signout` - Sign out

### User
- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile

### Workouts
- `GET /api/workouts` - Get user's workouts
- `POST /api/workouts` - Create new workout
- `GET /api/workouts/[id]` - Get specific workout
- `PUT /api/workouts/[id]` - Update workout
- `DELETE /api/workouts/[id]` - Delete workout

### Health Metrics
- `GET /api/health-metrics` - Get user's health metrics
- `POST /api/health-metrics` - Create new health metric entry
- `GET /api/health-metrics/[id]` - Get specific metric
- `PUT /api/health-metrics/[id]` - Update metric
- `DELETE /api/health-metrics/[id]` - Delete metric

### Reports
- `GET /api/reports?days=30` - Get analytics for specified period

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Important Notes

- Make sure to set all environment variables in your deployment platform
- Update `NEXTAUTH_URL` to your production domain
- Ensure MongoDB Atlas allows connections from your deployment platform's IP addresses

## Security Considerations

- Passwords are hashed using bcryptjs before storage
- Authentication is handled by NextAuth.js with secure session management
- API routes are protected and require authentication
- Environment variables keep sensitive data secure
- MongoDB connection uses secure connection string

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions:
1. Check the MongoDB Atlas connection
2. Ensure all environment variables are set correctly
3. Verify Node.js version compatibility
4. Check the browser console for errors

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Database hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Happy Tracking! 💪**
