import { useState } from "react";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Activity, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const allActivities = [
  {
    type: "Running",
    title: "Morning Run",
    date: "Today, 6:30 AM",
    duration: "45:23",
    distance: "8.5 km",
    calories: 680,
    heartRate: 152,
    elevation: 85,
  },
  {
    type: "Cycling",
    title: "Evening Ride",
    date: "Yesterday, 5:00 PM",
    duration: "1:12:45",
    distance: "25.3 km",
    calories: 890,
    heartRate: 138,
    elevation: 320,
  },
  {
    type: "Gym",
    title: "Strength Training",
    date: "Yesterday, 7:00 AM",
    duration: "55:00",
    calories: 420,
    heartRate: 125,
  },
  {
    type: "Running",
    title: "Interval Training",
    date: "2 days ago, 6:00 AM",
    duration: "38:15",
    distance: "7.2 km",
    calories: 580,
    heartRate: 165,
    elevation: 45,
  },
  {
    type: "Swimming",
    title: "Pool Session",
    date: "3 days ago, 7:30 PM",
    duration: "42:00",
    distance: "1.5 km",
    calories: 520,
    heartRate: 118,
  },
  {
    type: "Yoga",
    title: "Morning Flow",
    date: "3 days ago, 6:00 AM",
    duration: "50:00",
    calories: 180,
    heartRate: 95,
  },
  {
    type: "Cycling",
    title: "Hill Climb",
    date: "4 days ago, 5:30 PM",
    duration: "1:25:30",
    distance: "28.7 km",
    calories: 1020,
    heartRate: 145,
    elevation: 580,
  },
  {
    type: "Running",
    title: "Easy Recovery Run",
    date: "5 days ago, 6:30 AM",
    duration: "35:00",
    distance: "6.0 km",
    calories: 450,
    heartRate: 135,
    elevation: 20,
  },
];

const activityTypes = ["All", "Running", "Cycling", "Swimming", "Gym", "Yoga"];

const Activities = () => {
  const [selectedType, setSelectedType] = useState("All");

  const filteredActivities =
    selectedType === "All"
      ? allActivities
      : allActivities.filter((activity) => activity.type === selectedType);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Activity className="w-10 h-10 text-primary" />
            Your Activities
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and view all your workouts
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 animate-fade-in">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {activityTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="transition-all"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Total Workouts</p>
            <p className="text-2xl font-bold text-foreground">{filteredActivities.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
            <p className="text-2xl font-bold text-foreground">
              {filteredActivities
                .reduce((sum, act) => sum + (parseFloat(act.distance || "0") || 0), 0)
                .toFixed(1)}{" "}
              km
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Total Calories</p>
            <p className="text-2xl font-bold text-foreground">
              {filteredActivities.reduce((sum, act) => sum + act.calories, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Avg Heart Rate</p>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(
                filteredActivities.reduce((sum, act) => sum + (act.heartRate || 0), 0) /
                  filteredActivities.length
              )}{" "}
              bpm
            </p>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <ActivityCard
              key={index}
              {...activity}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground">
              Try selecting a different activity type or log a new workout!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
