import { create } from 'zustand';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: string;
  type: 'video' | 'text' | 'audio' | 'quiz';
  order: number;
}

interface CourseStore {
  courses: Course[];
  lessons: Lesson[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addLesson: (lesson: Lesson) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  lessons: [],
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
  updateCourse: (id, updates) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id ? { ...course, ...updates } : course
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
  addLesson: (lesson) => set((state) => ({ lessons: [...state.lessons, lesson] })),
}));