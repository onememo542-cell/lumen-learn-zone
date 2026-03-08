import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { courses } from "@/data/mock";
import { Play, BookOpen, Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const mockProgress = [
  { courseId: "1", progress: 65, lastAccessed: "2 hours ago" },
  { courseId: "2", progress: 30, lastAccessed: "Yesterday" },
  { courseId: "5", progress: 100, lastAccessed: "3 days ago" },
];

const Dashboard = () => {
  const inProgress = mockProgress.filter((p) => p.progress < 100);
  const completed = mockProgress.filter((p) => p.progress === 100);

  return (
    <MainLayout>
      <section className="bg-gradient-hero py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-2 text-3xl font-bold text-primary-foreground">Welcome back! 👋</h1>
            <p className="text-primary-foreground/70">Continue your learning journey</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: BookOpen, label: "Enrolled", value: mockProgress.length },
              { icon: Play, label: "In Progress", value: inProgress.length },
              { icon: Award, label: "Completed", value: completed.length },
              { icon: Clock, label: "Hours Learned", value: 48 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <stat.icon className="mb-2 h-5 w-5 text-primary" />
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-foreground">Continue Learning</h2>
          <div className="space-y-4">
            {inProgress.map((p) => {
              const course = courses.find((c) => c.id === p.courseId);
              if (!course) return null;
              return (
                <motion.div
                  key={p.courseId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
                >
                  <img src={course.thumbnail} alt={course.title} className="h-20 w-32 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-card-foreground">{course.title}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">{p.lastAccessed}</p>
                    <div className="flex items-center gap-3">
                      <Progress value={p.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium text-primary">{p.progress}%</span>
                    </div>
                  </div>
                  <Link to={`/course/${course.id}/lesson`}>
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground">
                      Continue
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Completed */}
      {completed.length > 0 && (
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-foreground">Completed Courses</h2>
            <div className="space-y-4">
              {completed.map((p) => {
                const course = courses.find((c) => c.id === p.courseId);
                if (!course) return null;
                return (
                  <div key={p.courseId} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                    <img src={course.thumbnail} alt={course.title} className="h-20 w-32 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-card-foreground">{course.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <Award className="h-4 w-4" /> Completed
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Certificate</Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Dashboard;
