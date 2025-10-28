import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Award, Target } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyProgress = [
  { month: "Jan", distance: 85, calories: 6500, workouts: 12 },
  { month: "Feb", distance: 92, calories: 7200, workouts: 14 },
  { month: "Mar", distance: 78, calories: 6100, workouts: 11 },
  { month: "Apr", distance: 105, calories: 8200, workouts: 16 },
  { month: "May", distance: 118, calories: 9100, workouts: 18 },
  { month: "Jun", distance: 125, calories: 9800, workouts: 20 },
];

const heartRateZones = [
  { zone: "Recovery", value: 15, color: "hsl(var(--chart-3))" },
  { zone: "Aerobic", value: 35, color: "hsl(var(--chart-2))" },
  { zone: "Threshold", value: 30, color: "hsl(var(--chart-5))" },
  { zone: "Max", value: 20, color: "hsl(var(--chart-1))" },
];

const activityBreakdown = [
  { type: "Running", count: 45, color: "hsl(var(--chart-1))" },
  { type: "Cycling", count: 28, color: "hsl(var(--chart-2))" },
  { type: "Swimming", count: 15, color: "hsl(var(--chart-3))" },
  { type: "Gym", count: 22, color: "hsl(var(--chart-4))" },
  { type: "Yoga", count: 18, color: "hsl(var(--chart-5))" },
];

const personalRecords = [
  { activity: "Longest Run", value: "21.5 km", date: "June 15, 2024" },
  { activity: "Fastest 5K", value: "22:45", date: "May 28, 2024" },
  { activity: "Most Calories", value: "1,250 kcal", date: "June 10, 2024" },
  { activity: "Highest Elevation", value: "580m", date: "April 22, 2024" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10 text-primary" />
            Performance Analytics
          </h1>
          <p className="text-muted-foreground text-lg">
            Deep dive into your fitness progress and achievements
          </p>
        </div>

        {/* Monthly Progress Chart */}
        <Card className="p-6 mb-8 shadow-card animate-fade-in">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            6-Month Progress Overview
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyProgress}>
              <defs>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="distance"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorDistance)"
                name="Distance (km)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Workouts per Month */}
          <Card className="p-6 shadow-card animate-slide-up">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Monthly Workout Count
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="workouts" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Heart Rate Zones */}
          <Card className="p-6 shadow-card animate-slide-up" style={{ animationDelay: "100ms" } as React.CSSProperties}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Training Heart Rate Zones
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={heartRateZones}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ zone, percent }) => `${zone}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {heartRateZones.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Activity Breakdown */}
          <Card className="p-6 shadow-card animate-slide-up" style={{ animationDelay: "200ms" } as React.CSSProperties}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Activity Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="type" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {activityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Personal Records */}
          <Card className="p-6 shadow-card animate-slide-up" style={{ animationDelay: "300ms" } as React.CSSProperties}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Personal Records
            </h3>
            <div className="space-y-4">
              {personalRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground">{record.activity}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{record.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Goals Section */}
        <Card className="p-8 bg-gradient-analytics text-white shadow-elevated animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-7 h-7" />
            Monthly Goals Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Distance Goal</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">125</span>
                <span className="text-lg">/ 150 km</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: "83%" }}></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Workout Goal</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">20</span>
                <span className="text-lg">/ 25 sessions</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Calorie Goal</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">9.8k</span>
                <span className="text-lg">/ 10k kcal</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: "98%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
