import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface ProgressTrackerProps {
  totalXp: number;
  currentLevel: number;
}

const ProgressTracker = ({ totalXp, currentLevel }: ProgressTrackerProps) => {
  const xpForNextLevel = currentLevel * 500;
  const currentLevelXp = totalXp % xpForNextLevel;
  const progress = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <Card className="p-4 min-w-[280px] gradient-card border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-terminal-yellow" />
        <span className="font-semibold">Level {currentLevel}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
          <span className="font-mono font-bold text-primary">
            {currentLevelXp}/{xpForNextLevel} XP
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </Card>
  );
};

export default ProgressTracker;
