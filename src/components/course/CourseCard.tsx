import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types";

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      to={`/course/${course.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {course.isFree && (
          <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
            Free
          </Badge>
        )}
        <Badge variant="outline" className="absolute right-3 top-3 border-card bg-card/90 text-card-foreground backdrop-blur-sm">
          {course.level}
        </Badge>
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-medium text-primary">{course.category}</p>
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <div className="mb-3 flex items-center gap-2">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.studentsCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessonsCount}
          </span>
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <span className="text-lg font-bold text-foreground">
            {course.isFree ? "Free" : `$${course.price}`}
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default CourseCard;
