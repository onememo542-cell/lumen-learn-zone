import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { courses } from "@/data/mock";
import { Play, CheckCircle2, FileText, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const LessonPlayer = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [currentLessonId, setCurrentLessonId] = useState(course?.modules[0]?.lessons[0]?.id || "");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  if (!course) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          Course not found.
        </div>
      </MainLayout>
    );
  }

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === currentLessonId);

  const toggleComplete = () => {
    setCompletedLessons((prev) =>
      prev.includes(currentLessonId)
        ? prev.filter((id) => id !== currentLessonId)
        : [...prev, currentLessonId]
    );
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full border-b border-border bg-card lg:w-80 lg:border-b-0 lg:border-r">
        <div className="border-b border-border p-4">
          <h2 className="line-clamp-1 text-sm font-semibold text-card-foreground">{course.title}</h2>
          <p className="text-xs text-muted-foreground">
            {completedLessons.length}/{allLessons.length} completed
          </p>
        </div>
        <ScrollArea className="h-64 lg:h-[calc(100vh-73px)]">
          {course.modules.map((mod) => (
            <div key={mod.id}>
              <div className="bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground">
                {mod.title}
              </div>
              {mod.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonId(lesson.id)}
                  className={`flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors ${
                    currentLessonId === lesson.id
                      ? "border-l-primary bg-accent text-accent-foreground"
                      : "border-l-transparent text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {completedLessons.includes(lesson.id) ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                  ) : (
                    <Play className="h-4 w-4 shrink-0" />
                  )}
                  <span className="flex-1 line-clamp-1">{lesson.title}</span>
                  <span className="text-xs">{lesson.duration}</span>
                </button>
              ))}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Video Player Placeholder */}
        <div className="relative aspect-video w-full bg-foreground/95">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
            <Play className="mb-2 h-16 w-16" />
            <p className="text-lg font-medium">{currentLesson?.title}</p>
            <p className="text-sm opacity-60">{currentLesson?.duration}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="border-b border-border bg-card p-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-card-foreground">{currentLesson?.title}</h1>
              <p className="text-sm text-muted-foreground">Duration: {currentLesson?.duration}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={completedLessons.includes(currentLessonId) ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={toggleComplete}
              >
                <CheckCircle2 className="h-4 w-4" />
                {completedLessons.includes(currentLessonId) ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>
        </div>

        {/* Notes & Resources */}
        <div className="container mx-auto p-4 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <FileText className="h-4 w-4" /> Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes for this lesson..."
                className="min-h-[200px] w-full rounded-xl border border-border bg-card p-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <Download className="h-4 w-4" /> Resources
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <span className="text-sm text-card-foreground">Lesson slides.pdf</span>
                  <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <span className="text-sm text-card-foreground">Source code.zip</span>
                  <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
