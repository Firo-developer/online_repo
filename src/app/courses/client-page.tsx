"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageLoading } from "@/components/ui/page-loading";
import { CourseCardSkeleton } from "@/components/ui/course-skeleton";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock courses data
const courses = [
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
    title: "Advanced JavaScript: From Fundamentals to Functional JS",
    instructor: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    rating: 4.9,
    price: 69.99,
    originalPrice: 129.99,
    category: "Development",
    level: "Intermediate",
    duration: "8 weeks",
    students: 2187,
  },
  {
    id: "course-3",
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
    id: "course-4",
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
  {
    id: "course-5",
    title: "Mobile App Development with React Native",
    instructor: "Jessica Taylor",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    rating: 4.6,
    price: 64.99,
    originalPrice: 119.99,
    category: "Development",
    level: "Intermediate",
    duration: "9 weeks",
    students: 1298,
  },
  {
    id: "course-6",
    title: "Digital Marketing Fundamentals",
    instructor: "Robert Wilson",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    rating: 4.5,
    price: 39.99,
    originalPrice: 79.99,
    category: "Marketing",
    level: "Beginner",
    duration: "6 weeks",
    students: 2456,
  },
  {
    id: "course-7",
    title: "Business Analytics & Intelligence",
    instructor: "Jennifer Lee",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    rating: 4.7,
    price: 54.99,
    originalPrice: 99.99,
    category: "Business",
    level: "Intermediate",
    duration: "8 weeks",
    students: 1876,
  },
  {
    id: "course-8",
    title: "Full-Stack Web Development with MERN",
    instructor: "Alex Johnson",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    rating: 4.8,
    price: 69.99,
    originalPrice: 129.99,
    category: "Development",
    level: "Advanced",
    duration: "12 weeks",
    students: 2134,
  },
  {
    id: "course-9",
    title: "Graphic Design for Beginners",
    instructor: "Sophia Martinez",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    rating: 4.6,
    price: 49.99,
    originalPrice: 89.99,
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    students: 3210,
  },
];

const categories = [
  "All Categories",
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...courses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== "All Levels") {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Sort
    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real app, you would sort by date
        result.sort((a, b) => b.students - a.students);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled in the useEffect
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSortBy("popularity");
  };

  const handleCourseClick = (courseId: string) => {
    window.location.href = `/courses/${courseId}`;
  };

  if (isLoading) {
    return <PageLoading />;
  }

  // Calculate pagination
  const coursesPerPage = 9;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Expand Your Knowledge
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground mb-8"
              >
                Discover thousands of courses to help you grow personally and
                professionally
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl mx-auto"
              >
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for courses..."
                    className="pl-10 h-12 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1 rounded-full"
                  >
                    Search
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {filteredCourses.length} Courses Available
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <label
                    htmlFor="sort"
                    className="mr-2 text-sm whitespace-nowrap"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="border rounded-md px-3 py-1.5 bg-background text-foreground w-full sm:w-auto"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters (Desktop) */}
              <div className="hidden md:block space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          className="mr-2"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Level</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label
                        key={level}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="level"
                          className="mr-2"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                        />
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Price</h3>
                  <div className="space-y-2">
                    {["All Prices", "Free", "Paid"].map((price) => (
                      <label
                        key={price}
                        className="flex items-center cursor-pointer"
                      >
                        <input type="radio" name="price" className="mr-2" />
                        <span>{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>

              {/* Filters (Mobile) */}
              {showFilters && (
                <div className="md:hidden bg-card border rounded-lg p-6 mb-6 col-span-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Categories</h4>
                      <select
                        className="w-full border rounded-md px-3 py-1.5 bg-background text-foreground"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Level</h4>
                      <select
                        className="w-full border rounded-md px-3 py-1.5 bg-background text-foreground"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                      >
                        {levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Price</h4>
                      <select className="w-full border rounded-md px-3 py-1.5 bg-background text-foreground">
                        <option>All Prices</option>
                        <option>Free</option>
                        <option>Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}

              {/* Course Grid */}
              <div className="lg:col-span-3">
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <SlidersHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {isLoading
                        ? // Show skeletons while loading
                          Array.from({ length: 6 }).map((_, index) => (
                            <CourseCardSkeleton key={index} />
                          ))
                        : // Show actual courses
                          currentCourses.map((course) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="cursor-pointer"
                              onClick={() => handleCourseClick(course.id)}
                            >
                              <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:bg-card">
                                <div className="relative h-40 overflow-hidden">
                                  <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-2 right-2">
                                    <div className="bg-black/70 text-white text-sm px-2 py-1 rounded-md flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 text-yellow-400 mr-1"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {course.rating}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                                    {course.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {course.instructor}
                                  </p>
                                  <div className="flex items-center text-sm mb-2">
                                    <span className="text-muted-foreground">
                                      {course.level} • {course.duration}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="font-bold">
                                        ${course.price.toFixed(2)}
                                      </span>
                                      {course.originalPrice && (
                                        <span className="text-muted-foreground line-through ml-2 text-sm">
                                          ${course.originalPrice.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="hover:bg-primary/10"
                                    >
                                      Details
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Pagination className="mt-8">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  prev > 1 ? prev - 1 : prev,
                                )
                              }
                              className={currentPage === 1 ? "opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  prev < totalPages ? prev + 1 : prev,
                                )
                              }
                              className={
                                currentPage === totalPages ? "opacity-50" : ""
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
