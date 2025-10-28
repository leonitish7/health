import { Activity, Flame, Heart, TrendingUp, Clock, Award } from "lucide-react";
import StatCard from "@/components/StatCard";
import ActivityCard from "@/components/ActivityCard";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", distance: 5.2, calories: 420 },
  { day: "Tue", distance: 3.8, calories: 310 },
  { day: "Wed", distance: 6.5, calories: 520 },
  { day: "Thu", distance: 4.2, calories: 340 },
  { day: "Fri", distance: 7.1, calories: 580 },
  { day: "Sat", distance: 8.5, calories: 680 },
  { day: "Sun", distance: 5.9, calories: 470 },
];

const recentActivities = [
  {
    type: "Running",
    title: "Morning Run",
    date: "Today, 6:30 AM",
    duration: "45:23",
    distance: "8.5 km",
    calories: 680,
    heartRate: 152,
  },
  {
    type: "Cycling",
    title: "Evening Ride",
    date: "Yesterday, 5:00 PM",
    duration: "1:12:45",
    distance: "25.3 km",
    calories: 890,
    heartRate: 138,
  },
  {
    type: "Gym",
    title: "Strength Training",
    date: "Yesterday, 7:00 AM",
    duration: "55:00",
    calories: 420,
    heartRate: 125,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 text-white shadow-elevated animate-fade-in">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back, Athlete! 💪</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              You've completed 12 workouts this month. Keep up the amazing progress!
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm opacity-80">Weekly Goal</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm opacity-80">Active Days</p>
                <p className="text-2xl font-bold">6/7</p>
              </div>
            </div>
          </div>
          <Activity className="absolute right-8 bottom-8 w-48 h-48 opacity-10" />
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Distance"
            value="41.2"
            unit="km"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Time"
            value="6.5"
            unit="hrs"
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Calories Burned"
            value="3,320"
            unit="kcal"
            icon={Flame}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Avg Heart Rate"
            value="142"
            unit="bpm"
            icon={Heart}
            trend={{ value: 3, isPositive: false }}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Distance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="distance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              Calories Burned
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="calories" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

        {/* Recent Activities */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Recent Activities
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                {...activity}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
