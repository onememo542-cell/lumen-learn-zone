import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { courses } from "@/data/mock";
import { Star, Clock, Users, BookOpen, Play, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Course not found.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground">{course.category}</Badge>
                <h1 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">{course.title}</h1>
                <p className="mb-6 text-primary-foreground/80">{course.description}</p>
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" /> {course.rating} ({course.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.studentsCount.toLocaleString()} students</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.lessonsCount} lessons</span>
                </div>
                <Link to={`/instructor/${course.instructor.id}`} className="flex items-center gap-3">
                  <img src={course.instructor.avatar} alt={course.instructor.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-foreground/30" />
                  <div>
                    <p className="text-sm font-medium text-primary-foreground">{course.instructor.name}</p>
                    <p className="text-xs text-primary-foreground/60">{course.instructor.title}</p>
                  </div>
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <div className="overflow-hidden rounded-2xl border border-primary-foreground/10 bg-card shadow-elevated">
                <div className="relative aspect-video">
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/90">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-3xl font-bold text-card-foreground">
                    {course.isFree ? "Free" : `$${course.price}`}
                  </p>
                  <Button className="mb-3 w-full bg-gradient-primary text-primary-foreground hover:opacity-90" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Course Curriculum</h2>
              <Accordion type="multiple" className="space-y-3">
                {course.modules.map((mod) => (
                  <AccordionItem key={mod.id} value={mod.id} className="rounded-xl border border-border bg-card px-4">
                    <AccordionTrigger className="text-sm font-semibold text-card-foreground hover:no-underline">
                      <div className="flex items-center gap-2">
                        {mod.title}
                        <Badge variant="outline" className="text-xs">{mod.lessons.length} lessons</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pb-2">
                        {mod.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted">
                            <div className="flex items-center gap-3">
                              {lesson.isFree ? (
                                <Play className="h-4 w-4 text-primary" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-card-foreground">{lesson.title}</span>
                              {lesson.isFree && <Badge variant="outline" className="text-xs">Preview</Badge>}
                            </div>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* About Instructor */}
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">About the Instructor</h2>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                  <img src={course.instructor.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-card-foreground">{course.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-card-foreground">This course includes</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration} of content</li>
                  <li className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {course.lessonsCount} lessons</li>
                  <li className="flex items-center gap-2"><Users className="h-4 w-4" /> {course.studentsCount.toLocaleString()} enrolled</li>
                  <li className="flex items-center gap-2">📱 Mobile access</li>
                  <li className="flex items-center gap-2">🏆 Certificate of completion</li>
                  <li className="flex items-center gap-2">♾️ Lifetime access</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseDetails;
