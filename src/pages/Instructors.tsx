import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Users, BookOpen } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { instructors } from "@/data/mock";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Instructors = () => (
  <MainLayout>
    <section className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary-foreground md:text-4xl"
        >
          Our Instructors
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-primary-foreground/80"
        >
          Learn from industry experts and thought leaders
        </motion.p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-12 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {instructors.map((inst) => (
          <motion.div key={inst.id} variants={fadeUp}>
            <Link
              to={`/instructor/${inst.id}`}
              className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img
                src={inst.avatar}
                alt={inst.name}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-border"
              />
              <div>
                <h3 className="font-semibold text-card-foreground">{inst.name}</h3>
                <p className="text-sm text-muted-foreground">{inst.title}</p>
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">{inst.bio}</p>
              <div className="mt-auto flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {inst.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {inst.studentsCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> {inst.coursesCount}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </MainLayout>
);

export default Instructors;
