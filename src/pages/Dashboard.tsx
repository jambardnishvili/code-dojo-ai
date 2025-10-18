import { useState } from "react";
import { Terminal, BookOpen, Trophy, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TerminalEmulator from "@/components/terminal/TerminalEmulator";
import LessonSelector from "@/components/lessons/LessonSelector";
import ProgressTracker from "@/components/progress/ProgressTracker";
import AIMentor from "@/components/ai/AIMentor";

const Dashboard = () => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 terminal-text-glow">
              AI Terminal Tutor
            </h1>
            <p className="text-muted-foreground">
              Learn the command line by doing — guided by AI
            </p>
          </div>
          <ProgressTracker />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Terminal Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 gradient-card border-border/50 transition-all hover:border-primary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">XP Today</p>
                  <p className="text-2xl font-bold">340</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 gradient-card border-border/50 transition-all hover:border-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                  <p className="text-2xl font-bold">12/24</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 gradient-card border-border/50 transition-all hover:border-terminal-yellow/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-terminal-yellow/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-terminal-yellow" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Terminal */}
          <Card className="p-0 terminal-glow border-primary/20 overflow-hidden">
            <div className="bg-card/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
              </div>
              <Terminal className="w-4 h-4 ml-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-mono">
                ~/terminal-tutor
              </span>
            </div>
            <TerminalEmulator 
              activeLesson={activeLesson}
              onAIRequest={() => setShowAI(true)}
            />
          </Card>

          {/* AI Assistant Toggle */}
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowAI(!showAI)}
              className="gap-2"
              variant={showAI ? "default" : "outline"}
            >
              <Zap className="w-4 h-4" />
              {showAI ? "Hide" : "Show"} AI Mentor
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {showAI ? (
            <AIMentor />
          ) : (
            <LessonSelector 
              onSelectLesson={setActiveLesson}
              activeLesson={activeLesson}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
