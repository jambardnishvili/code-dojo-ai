import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Lightbulb, Trophy } from "lucide-react";
import { lessons, type Lesson, type Task } from "@/courses/bash-basics/lessons";
import { useToast } from "@/hooks/use-toast";

interface LessonViewProps {
  lessonId: number;
  onComplete: (lessonId: number, xp: number) => void;
  onBack: () => void;
}

const LessonView = ({ lessonId, onComplete, onBack }: LessonViewProps) => {
  const lesson = lessons.find(l => l.id === lessonId);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showHints, setShowHints] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  if (!lesson) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Lesson not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </Card>
    );
  }

  const progress = (completedTasks.size / lesson.tasks.length) * 100;
  const isLessonComplete = completedTasks.size === lesson.tasks.length;

  const handleTaskComplete = (taskId: string) => {
    if (!completedTasks.has(taskId)) {
      setCompletedTasks(prev => new Set([...prev, taskId]));
      toast({
        title: "Task Complete! 🎉",
        description: "Great job! Keep going!",
      });
    }
  };

  const toggleHint = (taskId: string) => {
    setShowHints(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleCompleteLesson = () => {
    onComplete(lesson.id, lesson.xp);
    toast({
      title: `Lesson Complete! +${lesson.xp} XP`,
      description: "You're making great progress!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="p-6 gradient-card border-border/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">Lesson {lesson.id}</Badge>
              <Badge className="bg-primary/20 text-primary">
                {lesson.xp} XP
              </Badge>
            </div>
            <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono font-bold text-primary">
              {completedTasks.size}/{lesson.tasks.length} tasks
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Learning Objectives */}
      <Card className="p-6 border-border/50">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-terminal-yellow" />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {lesson.learningObjectives.map((obj, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {obj}
            </li>
          ))}
        </ul>
      </Card>

      {/* Tasks */}
      <div className="space-y-4">
        {lesson.tasks.map((task, idx) => {
          const isComplete = completedTasks.has(task.id);
          const showHint = showHints.has(task.id);

          return (
            <Card
              key={task.id}
              className={`p-5 transition-all ${
                isComplete
                  ? "border-terminal-green/50 bg-terminal-green/5"
                  : "border-border/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isComplete ? (
                    <CheckCircle2 className="w-6 h-6 text-terminal-green" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      Task {idx + 1}
                    </span>
                    {isComplete && (
                      <Badge variant="secondary" className="text-xs">
                        Complete
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm mb-3">{task.instruction}</p>

                  {task.hint && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHint(task.id)}
                      className="text-xs gap-2 mb-2"
                    >
                      <Lightbulb className="w-3 h-3" />
                      {showHint ? "Hide" : "Show"} Hint
                    </Button>
                  )}

                  {showHint && task.hint && (
                    <div className="p-3 rounded-lg bg-muted/50 border border-border/50 mb-3">
                      <p className="text-sm text-muted-foreground font-mono">
                        {task.hint}
                      </p>
                    </div>
                  )}

                  {!isComplete && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTaskComplete(task.id)}
                    >
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Complete Lesson Button */}
      {isLessonComplete && (
        <Card className="p-6 bg-primary/10 border-primary/30">
          <div className="text-center">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">All Tasks Complete!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've finished all tasks in this lesson. Claim your {lesson.xp} XP!
            </p>
            <Button onClick={handleCompleteLesson} size="lg">
              Complete Lesson & Earn {lesson.xp} XP
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LessonView;
