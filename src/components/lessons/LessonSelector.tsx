import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { lessons } from "@/courses/bash-basics/lessons";
import { BookOpen, Trophy } from "lucide-react";

interface LessonSelectorProps {
  onSelectLesson: (lessonId: string) => void;
}

const LessonSelector = ({ onSelectLesson }: LessonSelectorProps) => {
  return (
    <Card className="p-6 gradient-card border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Bash Basics Course</h2>
        <p className="text-sm text-muted-foreground">
          Start your command line journey
        </p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="p-4 transition-all cursor-pointer hover:border-primary/50 border-border/30"
            onClick={() => onSelectLesson(`lesson-${lesson.id}`)}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-terminal-green/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-terminal-green" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{lesson.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {lesson.xp} XP
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {lesson.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Trophy className="w-3 h-3" />
                  <span>{lesson.tasks.length} tasks</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default LessonSelector;
