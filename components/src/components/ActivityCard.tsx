import { Calendar, Clock, Flame, Heart, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  type: string;
  title: string;
  date: string;
  duration: string;
  distance?: string;
  calories: number;
  heartRate?: number;
  elevation?: number;
  className?: string;
  style?: React.CSSProperties;
}

const activityColors = {
  Running: "bg-primary/10 text-primary border-primary/20",
  Cycling: "bg-secondary/10 text-secondary border-secondary/20",
  Swimming: "bg-accent/10 text-accent border-accent/20",
  Gym: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Yoga: "bg-chart-5/10 text-chart-5 border-chart-5/20",
};

const ActivityCard = ({
  type,
  title,
  date,
  duration,
  distance,
  calories,
  heartRate,
  elevation,
  className,
  style,
}: ActivityCardProps) => {
  const colorClass = activityColors[type as keyof typeof activityColors] || activityColors.Running;

  return (
    <Card className={cn("p-6 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group", className)} style={style}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge className={cn("mb-2", colorClass)}>{type}</Badge>
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-semibold">{duration}</p>
          </div>
        </div>

        {distance && (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="font-semibold">{distance}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="font-semibold">{calories}</p>
          </div>
        </div>

        {heartRate && (
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Avg HR</p>
              <p className="font-semibold">{heartRate} bpm</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityCard;
