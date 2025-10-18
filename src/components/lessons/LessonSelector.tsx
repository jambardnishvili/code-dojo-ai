import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { lessons } from "@/courses/bash-basics/lessons";
import { BookOpen, Trophy } from "lucide-react";

interface LessonSelectorProps {
  onSelectLesson: (lessonId: number) => void;
  completedLessons: number[];
  onBack: () => void;
}

const LessonSelector = ({ onSelectLesson, completedLessons, onBack }: LessonSelectorProps) => {
  return (
    <Card className="p-6 gradient-card border-border/50 flex flex-col h-full max-h-[calc(100vh-12rem)]">
      <div className="mb-6 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={onBack} className="mb-4">
          ← Back to Courses
        </Button>
        <h2 className="text-2xl font-bold mb-2">Bash Basics Course</h2>
        <p className="text-sm text-muted-foreground">
          Start your command line journey
        </p>
      </div>

      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-3 pr-4">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <Card
                key={lesson.id}
                className={`p-4 transition-all cursor-pointer hover:border-primary/50 ${
                  isCompleted 
                    ? "border-terminal-green/50 bg-terminal-green/5" 
                    : "border-border/30"
                }`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg ${
                      isCompleted ? "bg-terminal-green/30" : "bg-terminal-green/20"
                    } flex items-center justify-center flex-shrink-0`}>
                      <BookOpen className="w-5 h-5 text-terminal-green" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{lesson.title}</h3>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {lesson.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Trophy className="w-3 h-3" />
                        <span>{lesson.tasks.length} tasks</span>
                      </div>
                    </div>
                  </div>

                  <Badge 
                    variant={isCompleted ? "default" : "secondary"} 
                    className={`text-xs ${
                      isCompleted ? "bg-terminal-green/20 text-terminal-green" : ""
                    }`}
                  >
                    {isCompleted ? "✓ " : ""}{lesson.xp} XP
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default LessonSelector;
