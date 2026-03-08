import { motion } from "framer-motion";
import HeroSection from "@/components/common/HeroSection";
import SectionWrapper from "@/components/common/SectionWrapper";
import CourseCard from "@/components/course/CourseCard";
import CategoryCard from "@/components/course/CategoryCard";
import InstructorCard from "@/components/course/InstructorCard";
import { courses, categories, instructors, testimonials } from "@/data/mock";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => (
  <MainLayout>
    <HeroSection />

    {/* Popular Courses */}
    <SectionWrapper title="Popular Courses" subtitle="Discover the most popular courses chosen by our learners">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {courses.slice(0, 6).map((course) => (
          <motion.div key={course.id} variants={fadeUp}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-10 text-center">
        <Link to="/courses">
          <Button variant="outline" size="lg" className="gap-2">
            View All Courses <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>

    {/* Categories */}
    <SectionWrapper title="Browse Categories" subtitle="Find courses in your area of interest" className="bg-muted/50">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={fadeUp}>
            <CategoryCard category={cat} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>

    {/* Top Instructors */}
    <SectionWrapper title="Top Instructors" subtitle="Learn from industry experts and thought leaders">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {instructors.map((inst) => (
          <motion.div key={inst.id} variants={fadeUp}>
            <InstructorCard instructor={inst} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>

    {/* Testimonials */}
    <SectionWrapper title="What Our Learners Say" subtitle="Success stories from our community" className="bg-muted/50">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>

    {/* CTA */}
    <section className="relative overflow-hidden bg-gradient-hero py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Join our community of learners and start your journey today.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  </MainLayout>
);

export default Index;
