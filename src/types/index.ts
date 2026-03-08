export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  rating: number;
  reviewCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  price: number;
  isFree: boolean;
  modules: Module[];
  tags: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isCompleted?: boolean;
  isFree?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  expertise: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  coursesCount: number;
  color: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  progress: number;
  lastAccessed: string;
}
