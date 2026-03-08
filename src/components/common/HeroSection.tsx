import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
    </div>
    <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            🚀 Start learning today
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
        >
          Unlock Your Potential with{" "}
          <span className="underline decoration-secondary decoration-4 underline-offset-4">World-Class</span>{" "}
          Learning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 text-lg text-primary-foreground/80 md:text-xl"
        >
          Join thousands of learners mastering new skills with expert-led courses in technology, business, design, and more.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-8 flex items-center gap-2 mx-auto max-w-xl rounded-full border border-primary-foreground/20 bg-primary-foreground/10 p-1.5 backdrop-blur-sm"
        >
          <Search className="ml-3 h-5 w-5 text-primary-foreground/60" />
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="flex-1 bg-transparent px-2 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
          />
          <Button className="rounded-full bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90">
            Search
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70"
        >
          <span>✓ 500+ Courses</span>
          <span>✓ Expert Instructors</span>
          <span>✓ Certificates</span>
          <span>✓ Lifetime Access</span>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
