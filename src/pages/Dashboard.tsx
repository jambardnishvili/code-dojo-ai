import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, BookOpen, Trophy, Zap, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TerminalEmulator from "@/components/terminal/TerminalEmulator";
import LessonSelector from "@/components/lessons/LessonSelector";
import ProgressTracker from "@/components/progress/ProgressTracker";
import AIMentor from "@/components/ai/AIMentor";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface UserProgress {
  total_xp: number;
  current_level: number;
  streak_days: number;
}

const Dashboard = () => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;

    const { data: progress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const { data: completed } = await supabase
      .from("completed_lessons")
      .select("*")
      .eq("user_id", user.id);

    if (progress) {
      setUserProgress(progress);
    }
    if (completed) {
      setCompletedLessonsCount(completed.length);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Terminal className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-4">
            <ProgressTracker
              totalXp={userProgress?.total_xp || 0}
              currentLevel={userProgress?.current_level || 1}
            />
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
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
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-bold">{userProgress?.total_xp || 0}</p>
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
                  <p className="text-2xl font-bold">{completedLessonsCount}/45</p>
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
                  <p className="text-2xl font-bold">{userProgress?.streak_days || 0} days</p>
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
