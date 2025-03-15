"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import ActivityChart from "@/components/dashboard/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageLoading } from "@/components/ui/page-loading";
import {
  BookOpen,
  Clock,
  Award,
  BarChart2,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Bell,
  Play,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(65);

  useEffect(() => {
    // Check if it's the user's first visit
    const isFirstVisit =
      localStorage.getItem("dashboardFirstVisit") !== "false";
    if (isFirstVisit && user) {
      setShowWelcomeModal(true);
      localStorage.setItem("dashboardFirstVisit", "false");
    }
  }, [user]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = "/login";
    return null;
  }

  // Mock data for charts
  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Spent",
        data: [2.5, 3.2, 1.8, 4.0, 2.9, 5.1, 3.5],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const progressData = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Courses",
        data: [4, 2, 1],
        backgroundColor: [
          "hsl(var(--success))",
          "hsl(var(--warning))",
          "hsl(var(--muted))",
        ],
        borderWidth: 1,
      },
    ],
  };

  const enrolledCourses = [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      progress: 78,
      lastAccessed: "2 days ago",
    },
    {
      id: "course-2",
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      progress: 45,
      lastAccessed: "Yesterday",
    },
    {
      id: "course-3",
      title: "Data Science and Machine Learning with Python",
      instructor: "David Kim",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      progress: 92,
      lastAccessed: "Today",
    },
  ];

  const recommendedCourses = [
    {
      id: "course-4",
      title: "Advanced JavaScript: From Fundamentals to Functional JS",
      instructor: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      rating: 4.9,
      price: 69.99,
    },
    {
      id: "course-5",
      title: "Mobile App Development with React Native",
      instructor: "Jessica Taylor",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      rating: 4.6,
      price: 64.99,
    },
  ];

  const upcomingEvents = [
    {
      id: "event-1",
      title: "Live Q&A Session: Web Development",
      date: "Tomorrow, 3:00 PM",
      instructor: "Sarah Johnson",
    },
    {
      id: "event-2",
      title: "Workshop: Responsive Design Principles",
      date: "Friday, 2:00 PM",
      instructor: "Michael Chen",
    },
  ];

  const certificates = [
    {
      id: "cert-1",
      title: "HTML & CSS Mastery",
      issueDate: "June 15, 2023",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
    },
    {
      id: "cert-2",
      title: "JavaScript Fundamentals",
      issueDate: "August 22, 2023",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="student" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground">
                  Track your progress, manage your courses, and continue your
                  learning journey.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                  <div className="mr-3">
                    <p className="text-sm text-muted-foreground">
                      Profile Completion
                    </p>
                    <p className="font-semibold">{completionPercentage}%</p>
                  </div>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <Button size="sm">Complete Profile</Button>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full max-w-3xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="calendar" className="hidden md:inline-flex">
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="hidden md:inline-flex"
              >
                Certificates
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Enrolled Courses
                      </p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Hours Spent
                      </p>
                      <p className="text-2xl font-bold">42.5</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Certificates
                      </p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Completed Courses
                      </p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ActivityChart
                    title="Weekly Learning Activity"
                    data={activityData}
                    type="line"
                    height={300}
                  />
                </div>
                <div>
                  <ActivityChart
                    title="Course Progress"
                    data={progressData}
                    type="doughnut"
                    height={300}
                  />
                </div>
              </div>

              {/* Recent Courses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Continue Learning</h2>
                  <Button variant="link" size="sm" className="gap-1">
                    View All Courses <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
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
                          >
                            <Play className="h-4 w-4" /> Continue
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <p className="text-white text-sm">
                              Last accessed: {course.lastAccessed}
                            </p>
                            <Badge variant="secondary">
                              {course.progress}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.instructor}
                        </p>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming Events and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.instructor}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      View All Events
                    </Button>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Recommended Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedCourses.map((course) => (
                        <div key={course.id} className="flex gap-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {course.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-1">
                              {course.instructor}
                            </p>
                            <div className="flex items-center">
                              <div className="flex text-amber-500 mr-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${star <= Math.floor(course.rating) ? "fill-current" : "fill-none"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs">{course.rating}</span>
                            </div>
                            <p className="text-sm font-medium mt-1">
                              ${course.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Browse More Courses
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* My Courses Tab */}
            <TabsContent value="courses">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <div className="flex gap-2">
                    <select className="border rounded-md px-3 py-1.5 bg-background text-foreground">
                      <option>All Courses</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Not Started</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <BarChart2 className="h-4 w-4 mr-2" /> Sort
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
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
                          >
                            <Play className="h-4 w-4" /> Continue
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <p className="text-white text-sm">
                              Last accessed: {course.lastAccessed}
                            </p>
                            <Badge variant="secondary">
                              {course.progress}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.instructor}
                        </p>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Continue Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{course.title}</h3>
                            <span className="text-sm font-medium">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Last accessed: {course.lastAccessed}</span>
                            <span>Instructor: {course.instructor}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Learning Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Total Learning Time</span>
                            <span>42.5 hours</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Courses Completed</span>
                            <span>4 of 7</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "57%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Assignments Submitted</span>
                            <span>12 of 15</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Learning Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center flex-col">
                        <div className="text-5xl font-bold text-primary mb-2">
                          3
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Days in a row
                        </p>
                        <div className="flex gap-1 mb-6">
                          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs ${i < 3 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                          Keep learning daily to build your streak and earn
                          rewards!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Calendar View Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      We're working on a calendar feature to help you schedule
                      your learning sessions and never miss an important event.
                    </p>
                    <Button>View Upcoming Events</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Your Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                          <div className="p-4 w-full">
                            <h3 className="text-white font-bold text-lg">
                              {cert.title}
                            </h3>
                            <p className="text-white/80 text-sm">
                              Issued on {cert.issueDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Certificate ID: {cert.id}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
