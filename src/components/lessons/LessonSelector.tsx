import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courseList } from "@/courses";

interface LessonSelectorProps {
  onSelectLesson: (lessonId: string) => void;
  activeLesson: string | null;
}

const LessonSelector = ({ onSelectLesson, activeLesson }: LessonSelectorProps) => {
  return (
    <Card className="p-6 gradient-card border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Lesson Tracks</h2>
        <p className="text-sm text-muted-foreground">
          Choose your learning path
        </p>
      </div>

      <div className="space-y-4">
        {courseList.map((track) => {
          const Icon = track.icon;
          const isActive = activeLesson === track.id;

          return (
            <Card
              key={track.id}
              className={`p-4 transition-all cursor-pointer hover:border-primary/50 ${
                isActive ? "border-primary bg-primary/5" : "border-border/30"
              }`}
              onClick={() => onSelectLesson(track.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${track.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${track.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{track.title}</h3>
                    {isActive && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {track.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{track.lessons} lessons</span>
                    <span>•</span>
                    <span>{track.xp} XP</span>
                  </div>
                </div>
              </div>

              {isActive && (
                <Button size="sm" className="w-full mt-4" variant="outline">
                  Continue Learning
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/30">
        <p className="text-sm text-muted-foreground text-center">
          Complete lessons to unlock new tracks and earn XP
        </p>
      </div>
    </Card>
  );
};

export default LessonSelector;
