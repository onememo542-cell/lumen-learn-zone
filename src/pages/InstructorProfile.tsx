import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/course/CourseCard";
import { instructors, courses } from "@/data/mock";
import { Star, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InstructorProfile = () => {
  const { id } = useParams();
  const instructor = instructors.find((i) => i.id === id);

  if (!instructor) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          Instructor not found.
        </div>
      </MainLayout>
    );
  }

  const instructorCourses = courses.filter((c) => c.instructor.id === instructor.id);

  return (
    <MainLayout>
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
            <img src={instructor.avatar} alt={instructor.name} className="mb-4 h-28 w-28 rounded-full object-cover ring-4 ring-primary-foreground/30" />
            <h1 className="mb-2 text-3xl font-bold text-primary-foreground">{instructor.name}</h1>
            <p className="mb-4 text-primary-foreground/70">{instructor.title}</p>
            <div className="mb-6 flex gap-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary-foreground" /> {instructor.rating}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {instructor.studentsCount.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {instructor.coursesCount} courses</span>
            </div>
            <div className="flex gap-2">
              {instructor.expertise.map((e) => (
                <Badge key={e} className="bg-primary-foreground/20 text-primary-foreground">{e}</Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold text-foreground">About</h2>
            <p className="mb-12 text-muted-foreground">{instructor.bio}</p>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-foreground">Courses by {instructor.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructorCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default InstructorProfile;
