import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame } from "lucide-react";

const ProgressTracker = () => {
  const currentXP = 1240;
  const nextLevelXP = 2000;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card className="p-4 min-w-[280px] gradient-card border-border/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-terminal-yellow" />
          <span className="font-semibold">Level 8</span>
        </div>
        <div className="flex items-center gap-1 text-terminal-red">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-bold">7 day streak</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level 9</span>
          <span className="font-mono font-bold text-primary">
            {currentXP}/{nextLevelXP} XP
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </Card>
  );
};

export default ProgressTracker;
