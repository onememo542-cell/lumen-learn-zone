import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { categories, courses } from "@/data/mock";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Categories = () => (
  <MainLayout>
    <section className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-primary-foreground md:text-4xl"
        >
          Browse Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-primary-foreground/80"
        >
          Explore our wide range of learning categories
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
        {categories.map((cat) => {
          const count = courses.filter((c) => c.category === cat.name).length;
          return (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="text-5xl">{cat.icon}</span>
                <h3 className="text-lg font-semibold text-card-foreground">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.coursesCount} courses</p>
                {count > 0 && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {count} available now
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  </MainLayout>
);

export default Categories;
