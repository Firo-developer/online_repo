"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, ThumbsUp } from "lucide-react";

export default function InstructorReviewsPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  // Mock courses data for filter
  const courses = [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
    },
    {
      id: "course-2",
      title: "Advanced JavaScript: From Fundamentals to Functional JS",
    },
    {
      id: "course-3",
      title: "UI/UX Design Masterclass",
    },
    {
      id: "course-4",
      title: "Mobile App Development with React Native",
    },
  ];

  // Mock reviews data
  const reviews = [
    {
      id: "review-1",
      courseId: "course-1",
      courseName: "Complete Web Development Bootcamp",
      studentName: "John Smith",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      rating: 5,
      comment:
        "This course is amazing! I learned so much and was able to build my own website from scratch. The instructor explains everything clearly and provides great examples.",
      date: "2023-12-15",
    },
    {
      id: "review-2",
      courseId: "course-2",
      courseName: "Advanced JavaScript: From Fundamentals to Functional JS",
      studentName: "Emily Johnson",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4,
      comment:
        "Great course with in-depth explanations. Would have liked more practical examples, but overall very helpful for understanding advanced JavaScript concepts.",
      date: "2023-11-28",
    },
    {
      id: "review-3",
      courseId: "course-3",
      courseName: "UI/UX Design Masterclass",
      studentName: "Michael Brown",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      comment:
        "The instructor's approach to teaching design principles is excellent. Highly recommended for anyone looking to improve their UI/UX skills!",
      date: "2023-12-05",
    },
    {
      id: "review-4",
      courseId: "course-1",
      courseName: "Complete Web Development Bootcamp",
      studentName: "Sarah Davis",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 3,
      comment:
        "Good content but some sections felt rushed. I had to look up additional resources to fully understand certain concepts. The projects were helpful though.",
      date: "2023-11-20",
    },
    {
      id: "review-5",
      courseId: "course-4",
      courseName: "Mobile App Development with React Native",
      studentName: "David Wilson",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4,
      comment:
        "Very practical course that helped me build my first mobile app. The instructor is knowledgeable and responsive to questions.",
      date: "2023-12-10",
    },
  ];

  // Filter reviews based on search query, course, and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || review.courseId === filterCourse;
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesCourse && matchesRating;
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/reviews";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Course Reviews</h1>
            <p className="text-muted-foreground">
              See what students are saying about your courses
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={review.studentAvatar}
                            alt={review.studentName}
                          />
                          <AvatarFallback>
                            {review.studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {review.studentName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Course: {review.courseName}
                        </p>
                        <p className="text-sm">{review.comment}</p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ||
                  filterCourse !== "all" ||
                  filterRating !== "all"
                    ? "No reviews match your current filters."
                    : "You don't have any reviews yet."}
                </p>
                {(searchQuery ||
                  filterCourse !== "all" ||
                  filterRating !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterCourse("all");
                      setFilterRating("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
