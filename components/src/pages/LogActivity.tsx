import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Activity } from "lucide-react";
import { toast } from "sonner";

const activityTypes = [
  { value: "running", label: "Running", icon: "🏃" },
  { value: "cycling", label: "Cycling", icon: "🚴" },
  { value: "swimming", label: "Swimming", icon: "🏊" },
  { value: "gym", label: "Gym Workout", icon: "💪" },
  { value: "yoga", label: "Yoga", icon: "🧘" },
  { value: "hiking", label: "Hiking", icon: "🥾" },
  { value: "walking", label: "Walking", icon: "🚶" },
];

const LogActivity = () => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    duration: "",
    distance: "",
    calories: "",
    heartRate: "",
    elevation: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Activity logged successfully!", {
      description: `${formData.title || "Workout"} has been added to your activities.`,
    });
    // Reset form
    setFormData({
      type: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      duration: "",
      distance: "",
      calories: "",
      heartRate: "",
      elevation: "",
      notes: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <PlusCircle className="w-10 h-10 text-primary" />
            Log New Activity
          </h1>
          <p className="text-muted-foreground text-lg">Record your workout details and track your progress</p>
        </div>

        {/* Form Card */}
        <Card className="p-8 shadow-elevated animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Activity Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-base font-semibold">
                Activity Type *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="type" className="h-12">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Activity Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Morning Run, Evening Ride"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="h-12"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-semibold">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
                className="h-12"
              />
            </div>

            {/* Duration and Distance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-base font-semibold">
                  Duration * (HH:MM:SS)
                </Label>
                <Input
                  id="duration"
                  placeholder="00:45:30"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance" className="text-base font-semibold">
                  Distance (km)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  placeholder="8.5"
                  value={formData.distance}
                  onChange={(e) => handleChange("distance", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Calories and Heart Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="calories" className="text-base font-semibold">
                  Calories Burned
                </Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="680"
                  value={formData.calories}
                  onChange={(e) => handleChange("calories", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heartRate" className="text-base font-semibold">
                  Avg Heart Rate (bpm)
                </Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="152"
                  value={formData.heartRate}
                  onChange={(e) => handleChange("heartRate", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Elevation */}
            <div className="space-y-2">
              <Label htmlFor="elevation" className="text-base font-semibold">
                Elevation Gain (m)
              </Label>
              <Input
                id="elevation"
                type="number"
                placeholder="85"
                value={formData.elevation}
                onChange={(e) => handleChange("elevation", e.target.value)}
                className="h-12"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base font-semibold">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about your workout..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
                <Activity className="w-5 h-5 mr-2" />
                Log Activity
              </Button>
            </div>
          </form>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-6 p-6 bg-muted/50 animate-fade-in">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            💡 Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Fields marked with * are required</li>
            <li>• Enter duration in HH:MM:SS format (e.g., 00:45:30 for 45 minutes 30 seconds)</li>
            <li>• Distance should be in kilometers</li>
            <li>• Heart rate and elevation are optional but help track your progress</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default LogActivity;
