"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageLoading } from "@/components/ui/page-loading";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  Play,
  Filter,
  Search,
  BarChart2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { getEnrolledCourses } from "@/lib/course";

export default function DashboardCoursesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user?.id) {
        try {
          const enrolledCourses = await getEnrolledCourses(user.id);
          setCourses(enrolledCourses);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setIsCoursesLoading(false);
        }
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  useEffect(() => {
    // Filter courses based on search query and active tab
    let filtered = [...courses];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query),
      );
    }

    if (activeTab === "in-progress") {
      filtered = filtered.filter(
        (course) => course.progress > 0 && course.progress < 100,
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter((course) => course.progress === 100);
    } else if (activeTab === "not-started") {
      filtered = filtered.filter((course) => course.progress === 0);
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, activeTab]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/dashboard/courses";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="student" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your enrolled courses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="not-started">Not Started</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Courses Grid */}
          {isCoursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-40 bg-muted animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3 mb-3"></div>
                    <div className="h-2 bg-muted animate-pulse rounded mb-4"></div>
                    <div className="h-8 bg-muted animate-pulse rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            (window.location.href = `/courses/${course.id}/learn`)
                          }
                        >
                          <Play className="h-4 w-4" /> Continue
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex justify-between items-center">
                          <p className="text-white text-sm">
                            Last accessed: {course.lastAccessed}
                          </p>
                          <Badge variant="secondary">{course.progress}%</Badge>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold line-clamp-1 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {course.instructor}
                      </p>
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                        <span className="mx-1">•</span>
                        <BookOpen className="h-4 w-4" />
                        <span>
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2 mb-3" />
                      <div className="mt-auto">
                        <Separator className="my-3" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Next: {course.nextLesson}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/courses/${course.id}/learn`)
                            }
                          >
                            Resume
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab !== "all"
                  ? `You don't have any ${activeTab.replace("-", " ")} courses.`
                  : searchQuery
                    ? `No courses match "${searchQuery}".`
                    : "You haven't enrolled in any courses yet."}
              </p>
              <Button onClick={() => (window.location.href = "/courses")}>
                Browse Courses
              </Button>
            </div>
          )}

          {/* Course Statistics */}
          {filteredCourses.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Learning Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Completed Courses
                        </p>
                        <p className="text-2xl font-bold">
                          {courses.filter((c) => c.progress === 100).length}
                        </p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          In Progress
                        </p>
                        <p className="text-2xl font-bold">
                          {
                            courses.filter(
                              (c) => c.progress > 0 && c.progress < 100,
                            ).length
                          }
                        </p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                        <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Not Started
                        </p>
                        <p className="text-2xl font-bold">
                          {courses.filter((c) => c.progress === 0).length}
                        </p>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full">
                        <XCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
