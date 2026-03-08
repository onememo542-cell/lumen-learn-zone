import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, BookOpen } from "lucide-react";
import type { Instructor } from "@/types";

const InstructorCard = ({ instructor }: { instructor: Instructor }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Link
      to={`/instructor/${instructor.id}`}
      className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-shadow hover:shadow-card-hover"
    >
      <img
        src={instructor.avatar}
        alt={instructor.name}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-border"
      />
      <div>
        <h3 className="font-semibold text-card-foreground">{instructor.name}</h3>
        <p className="text-sm text-muted-foreground">{instructor.title}</p>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {instructor.rating}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" /> {instructor.studentsCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> {instructor.coursesCount}
        </span>
      </div>
    </Link>
  </motion.div>
);

export default InstructorCard;
