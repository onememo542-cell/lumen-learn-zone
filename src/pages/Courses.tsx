import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import SectionWrapper from "@/components/common/SectionWrapper";
import CourseCard from "@/components/course/CourseCard";
import { courses, categories } from "@/data/mock";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const levels = ["All", "beginner", "intermediate", "advanced"];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Explore Courses
          </h1>
          <p className="mb-8 text-primary-foreground/80">
            Find the perfect course to advance your skills
          </p>
          <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 p-1.5 backdrop-blur-sm">
            <Search className="ml-3 h-5 w-5 text-primary-foreground/60" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.name)].map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-8 overflow-hidden rounded-xl border border-border bg-card p-4"
          >
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Level</p>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 capitalize"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <p className="mb-6 text-sm text-muted-foreground">{filtered.length} courses found</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No courses found. Try adjusting your filters.
          </div>
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default Courses;
