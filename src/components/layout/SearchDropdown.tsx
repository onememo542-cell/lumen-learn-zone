import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { courses, categories } from "@/data/mock";
import { Button } from "@/components/ui/button";

const SearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const suggestedCategories = query.trim()
    ? categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : categories.slice(0, 4);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsOpen((o) => !o)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search courses, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-[340px] overflow-y-auto p-2">
              {!query.trim() && (
                <div className="px-2 pb-2">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/courses?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                      >
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && suggestedCategories.length > 0 && (
                <div className="px-2 pb-2">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/courses?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="rounded-full border border-border bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && filtered.length > 0 && (
                <div>
                  <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">Courses</p>
                  {filtered.slice(0, 5).map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-10 w-14 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-card-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor.name} · {course.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.trim() && filtered.length === 0 && suggestedCategories.length === 0 && (
                <p className="px-2 py-4 text-center text-sm text-muted-foreground">No results found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
