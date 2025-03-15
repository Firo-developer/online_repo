"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/shared/CourseCard";

interface FeaturedCoursesProps {
  title?: string;
  subtitle?: string;
  courses?: Array<{
    id: string;
    title: string;
    instructor: string;
    image: string;
    rating: number;
    price: number;
    originalPrice?: number;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    students: number;
  }>;
}

const FeaturedCourses = ({
  title = "Featured Courses",
  subtitle = "Explore our most popular courses and expand your knowledge",
  courses = [
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
  ],
}: FeaturedCoursesProps) => {
  const handleCourseClick = (courseId: string) => {
    window.location.href = `/courses/${courseId}`;
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard
                {...course}
                onClick={() => handleCourseClick(course.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/courses")}
            className="group"
          >
            Explore All Courses
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
