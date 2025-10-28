import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Target, Calendar, Settings, Award, LogIn, UserPlus } from "lucide-react";

const achievements = [
  { icon: "🏃", title: "First 10K", description: "Completed your first 10km run", date: "Jan 15, 2024" },
  { icon: "🔥", title: "30-Day Streak", description: "Worked out for 30 consecutive days", date: "Feb 28, 2024" },
  { icon: "🚴", title: "Century Rider", description: "Cycled 100km in a single ride", date: "Mar 22, 2024" },
  { icon: "💪", title: "Gym Warrior", description: "Completed 50 gym sessions", date: "Apr 10, 2024" },
  { icon: "⭐", title: "Goal Crusher", description: "Achieved all monthly goals", date: "May 31, 2024" },
  { icon: "🏊", title: "Swimmer", description: "Completed 25 swimming sessions", date: "Jun 8, 2024" },
];

const stats = [
  { label: "Total Workouts", value: "128", icon: Trophy },
  { label: "Total Distance", value: "645 km", icon: Target },
  { label: "Active Days", value: "89", icon: Calendar },
  { label: "Achievements", value: "12", icon: Award },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <Card className="p-8 mb-8 shadow-elevated animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-muted-foreground mb-3">Fitness Enthusiast • Running • Cycling</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Premium Member
                </Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Level 15
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => navigate("/auth")}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center shadow-card hover:shadow-elevated transition-all animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Current Goals */}
        <Card className="p-8 mb-8 shadow-card animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Current Goals
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Run 150km this month</span>
                <span className="text-sm text-muted-foreground">125 / 150 km</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-primary rounded-full h-3 transition-all" style={{ width: "83%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Complete 25 workouts</span>
                <span className="text-sm text-muted-foreground">20 / 25 sessions</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-secondary rounded-full h-3 transition-all" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Burn 10,000 calories</span>
                <span className="text-sm text-muted-foreground">9,800 / 10,000 kcal</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-accent rounded-full h-3 transition-all" style={{ width: "98%" }}></div>
              </div>
            </div>
          </div>
          <Button className="w-full mt-6" variant="outline">
            Set New Goals
          </Button>
        </Card>

        {/* Achievements */}
        <Card className="p-8 shadow-card animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{achievement.icon}</div>
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
