export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  instructorBio?: string;
  image: string;
  rating: number;
  reviewCount?: number;
  price: number;
  originalPrice?: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  description?: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  curriculum?: CourseCurriculum[];
  reviews?: CourseReview[];
}

export interface CourseCurriculum {
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id?: string;
  title: string;
  duration: string;
  isPreview?: boolean;
  videoUrl?: string;
  completed?: boolean;
  current?: boolean;
}

export interface CourseReview {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface EnrolledCourse extends Course {
  progress: number;
  lastAccessed: string;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
}

// Mock API functions
export const getCourses = async (): Promise<Course[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      instructorTitle: "Senior Web Developer & Instructor",
      instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      instructorBio:
        "Sarah is a senior web developer with over 10 years of experience building web applications and teaching coding skills to thousands of students worldwide.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      rating: 4.8,
      reviewCount: 1245,
      price: 49.99,
      originalPrice: 99.99,
      category: "Development",
      level: "Beginner",
      duration: "12 weeks",
      students: 3245,
      description:
        "This comprehensive web development bootcamp covers everything you need to know to become a full-stack web developer. From HTML, CSS, and JavaScript to Node.js, React, and MongoDB, you'll learn all the essential technologies used in modern web development.",
    },
    {
      id: "course-2",
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      rating: 4.7,
      price: 59.99,
      originalPrice: 89.99,
      category: "Design",
      level: "Beginner",
      duration: "10 weeks",
      students: 1876,
    },
    {
      id: "course-3",
      title: "Data Science and Machine Learning with Python",
      instructor: "David Kim",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      rating: 4.9,
      price: 79.99,
      originalPrice: 149.99,
      category: "Data Science",
      level: "Advanced",
      duration: "14 weeks",
      students: 1543,
    },
  ];
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    // First try to fetch from API
    const response = await fetch(`/api/courses/${id}`);

    if (response.ok) {
      return await response.json();
    }

    // Fallback to mock data if API fails
    console.log("Falling back to mock data");
    const courses = await getCourses();
    return courses.find((course) => course.id === id) || null;
  } catch (error) {
    console.error("Error in getCourseById:", error);
    // Fallback to mock data
    const courses = await getCourses();
    return courses.find((course) => course.id === id) || null;
  }
};

export const getEnrolledCourses = async (
  userId: string,
): Promise<EnrolledCourse[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      rating: 4.8,
      price: 49.99,
      originalPrice: 99.99,
      category: "Development",
      level: "Beginner",
      duration: "12 weeks",
      students: 3245,
      progress: 35,
      lastAccessed: "2 days ago",
      totalLessons: 48,
      completedLessons: 17,
      nextLesson: "JavaScript Fundamentals: Functions",
    },
    {
      id: "course-2",
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      rating: 4.7,
      price: 59.99,
      originalPrice: 89.99,
      category: "Design",
      level: "Intermediate",
      duration: "10 weeks",
      students: 1876,
      progress: 68,
      lastAccessed: "Yesterday",
      totalLessons: 36,
      completedLessons: 24,
      nextLesson: "Creating User Personas",
    },
  ];
};

export const enrollInCourse = async (
  userId: string,
  courseId: string,
): Promise<boolean> => {
  try {
    // Try to enroll via API
    const response = await fetch("/api/courses/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.success;
    }

    // Fallback to mock behavior
    console.log(`User ${userId} enrolled in course ${courseId}`);
    return true;
  } catch (error) {
    console.error("Error in enrollInCourse:", error);
    // Fallback to mock behavior
    console.log(`User ${userId} enrolled in course ${courseId}`);
    return true;
  }
};

export const updateCourseProgress = async (
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean,
): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would update the user's progress in the course
  console.log(
    `User ${userId} ${completed ? "completed" : "started"} lesson ${lessonId} in course ${courseId}`,
  );
  return true;
};
