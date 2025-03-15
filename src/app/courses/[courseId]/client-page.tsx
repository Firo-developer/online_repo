"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageLoading } from "@/components/ui/page-loading";
import { useAuth } from "@/providers/auth-provider";
import { Course, getCourseById, enrollInCourse } from "@/lib/course";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  ShoppingCart,
  Play,
} from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params?.courseId || "";
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch course data
        const courseData = await getCourseById(courseId);
        if (courseData) {
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsEnrolling(true);
    setEnrollmentError("");
    try {
      const success = await enrollInCourse(user!.id, courseId);
      if (success) {
        setEnrollmentSuccess(true);
        setTimeout(() => {
          window.location.href = `/courses/${courseId}/learn`;
        }, 1500);
      } else {
        setEnrollmentError("Failed to enroll in course. Please try again.");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setEnrollmentError("An error occurred. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    // Add to cart logic
    window.location.href = "/cart";
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => (window.location.href = "/courses")}>
            Browse Courses
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Course Header */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4">{course.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      ({course.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-1">{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-1">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-1">{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={
                          course.instructorAvatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`
                        }
                        alt={course.instructor}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.instructorTitle || "Instructor"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {enrollmentSuccess ? (
                    <Button className="w-full sm:w-auto" disabled>
                      <CheckCircle className="mr-2 h-4 w-4" /> Enrolled
                      Successfully
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="w-full sm:w-auto"
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                      >
                        {isEnrolling ? "Enrolling..." : "Enroll Now"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </>
                  )}
                </div>

                {enrollmentError && (
                  <div className="mt-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md text-sm">
                    {enrollmentError}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-xl aspect-video"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full w-16 h-16 p-0"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Price Card (Mobile) */}
        <div className="lg:hidden bg-card border rounded-lg mx-4 -mt-6 p-6 shadow-lg z-10 relative mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold">
                ${course.price.toFixed(2)}
              </span>
              {course.originalPrice && (
                <span className="text-muted-foreground line-through ml-2">
                  ${course.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {course.originalPrice && (
              <Badge variant="secondary">
                {Math.round(
                  ((course.originalPrice - course.price) /
                    course.originalPrice) *
                    100,
                )}
                % off
              </Badge>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <span>Full lifetime access</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-muted-foreground mr-2" />
              <span>Certificate of completion</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {enrollmentSuccess ? (
              <Button className="w-full" disabled>
                <CheckCircle className="mr-2 h-4 w-4" /> Enrolled Successfully
              </Button>
            ) : (
              <>
                <Button
                  className="w-full"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? "Enrolling..." : "Enroll Now"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        About This Course
                      </h2>
                      <p className="text-muted-foreground">
                        {course.description}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        What You'll Learn
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(course.whatYouWillLearn || []).map(
                          (item: string, index: number) => (
                            <div key={index} className="flex">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {(course.requirements || []).map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        Course Content
                      </h2>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-muted-foreground">
                          {course.curriculum?.reduce(
                            (total: number, section: any) =>
                              total + section.lessons.length,
                            0,
                          ) || 0}{" "}
                          lessons • {course.duration}
                        </p>
                        <Button variant="link">Expand All Sections</Button>
                      </div>

                      <div className="space-y-4">
                        {(course.curriculum || []).map(
                          (section: any, sectionIndex: number) => (
                            <div
                              key={sectionIndex}
                              className="border rounded-lg overflow-hidden"
                            >
                              <div className="bg-muted/50 p-4">
                                <h3 className="font-semibold">
                                  {section.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {section.lessons.length} lessons
                                </p>
                              </div>
                              <div className="divide-y">
                                {section.lessons.map(
                                  (lesson: any, lessonIndex: number) => (
                                    <div
                                      key={lessonIndex}
                                      className="p-4 flex justify-between items-center"
                                    >
                                      <div className="flex items-start">
                                        {lesson.isPreview ? (
                                          <Play className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                                        ) : (
                                          <Lock className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                                        )}
                                        <div>
                                          <p className="font-medium">
                                            {lesson.title}
                                          </p>
                                          <div className="flex items-center mt-1">
                                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                            <span className="text-sm text-muted-foreground">
                                              {lesson.duration}
                                            </span>
                                            {lesson.isPreview && (
                                              <Badge
                                                variant="outline"
                                                className="ml-2"
                                              >
                                                Preview
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full overflow-hidden">
                          <img
                            src={
                              course.instructorAvatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`
                            }
                            alt={course.instructor}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-1">
                          {course.instructor}
                        </h2>
                        <p className="text-primary mb-4">
                          {course.instructorTitle || "Instructor"}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 font-medium">
                              4.8 Instructor Rating
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span className="ml-1">12,345 Students</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <span className="ml-1">8 Courses</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {course.instructorBio ||
                            "Experienced instructor with expertise in this subject area."}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Student Reviews</h2>
                        <div className="flex items-center">
                          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-2xl font-bold">
                            {course.rating.toFixed(1)}
                          </span>
                          <span className="ml-1 text-muted-foreground">
                            ({course.reviewCount || 0} reviews)
                          </span>
                        </div>
                      </div>

                      {(course.reviews || []).length > 0 ? (
                        <div className="space-y-6">
                          {(course.reviews || []).map(
                            (review: any, index: number) => (
                              <div
                                key={index}
                                className="border-b pb-6 last:border-0 last:pb-0"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full overflow-hidden">
                                      <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h3 className="font-semibold">
                                        {review.name}
                                      </h3>
                                      <span className="text-sm text-muted-foreground">
                                        {review.date}
                                      </span>
                                    </div>
                                    <div className="flex mb-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                        />
                                      ))}
                                    </div>
                                    <p className="text-muted-foreground">
                                      {review.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-lg">
                          <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold mb-2">
                            No reviews yet
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Be the first to review this course
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Course Price Card (Desktop) */}
              <div className="hidden lg:block">
                <div className="bg-card border rounded-lg p-6 shadow-lg sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold">
                        ${course.price.toFixed(2)}
                      </span>
                      {course.originalPrice && (
                        <span className="text-muted-foreground line-through ml-2">
                          ${course.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge variant="secondary">
                        {Math.round(
                          ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100,
                        )}
                        % off
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-muted-foreground mr-2" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {enrollmentSuccess ? (
                      <Button className="w-full" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" /> Enrolled
                        Successfully
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="w-full"
                          onClick={handleEnroll}
                          disabled={isEnrolling}
                        >
                          {isEnrolling ? "Enrolling..." : "Enroll Now"}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  );
}

// Lock icon component
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
