import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courseList } from "@/courses";

interface CourseSelectorProps {
  onSelectCourse: (courseId: string) => void;
  completedCourses: { [courseId: string]: number };
}

const CourseSelector = ({ onSelectCourse, completedCourses }: CourseSelectorProps) => {
  return (
    <Card className="p-6 gradient-card border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Course Tracks</h2>
        <p className="text-sm text-muted-foreground">
          Choose your learning path
        </p>
      </div>

      <div className="space-y-4">
        {courseList.map((course) => {
          const Icon = course.icon;
          const completed = completedCourses[course.id] || 0;

          return (
            <Card
              key={course.id}
              className="p-4 transition-all cursor-pointer hover:border-primary/50 border-border/30"
              onClick={() => onSelectCourse(course.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${course.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${course.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{course.title}</h3>
                    {completed > 0 && (
                      <Badge variant="secondary" className="text-xs bg-terminal-green/20 text-terminal-green">
                        {completed}/{course.lessons} lessons
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{course.lessons} lessons</span>
                    <span>•</span>
                    <span>{course.xp} XP</span>
                  </div>
                </div>
              </div>
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

export default CourseSelector;
