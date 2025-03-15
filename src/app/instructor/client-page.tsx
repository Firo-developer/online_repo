"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ActivityChart from "@/components/dashboard/ActivityChart";
import {
  BookOpen,
  Users,
  DollarSign,
  BarChart2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function InstructorDashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor";
    return null;
  }

  // Mock data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const enrollmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Enrollments",
        data: [25, 40, 35, 50, 45, 60],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const courseRatingData = {
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    datasets: [
      {
        label: "Ratings",
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
          "hsl(var(--success))",
          "hsl(var(--primary))",
          "hsl(var(--warning))",
          "hsl(var(--orange))",
          "hsl(var(--destructive))",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock courses data
  const courses = [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      price: 49.99,
      students: 3245,
      rating: 4.8,
      status: "published",
      lastUpdated: "2023-10-15",
      revenue: 162250,
      category: "Development",
      level: "Beginner",
    },
    {
      id: "course-2",
      title: "Advanced JavaScript: From Fundamentals to Functional JS",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      price: 69.99,
      students: 2187,
      rating: 4.9,
      status: "published",
      lastUpdated: "2023-11-20",
      revenue: 153090,
      category: "Development",
      level: "Intermediate",
    },
    {
      id: "course-3",
      title: "UI/UX Design Masterclass",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      price: 59.99,
      students: 1876,
      rating: 4.7,
      status: "published",
      lastUpdated: "2023-09-05",
      revenue: 112560,
      category: "Design",
      level: "Beginner",
    },
    {
      id: "course-4",
      title: "Mobile App Development with React Native",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      price: 64.99,
      students: 1298,
      rating: 4.6,
      status: "draft",
      lastUpdated: "2023-12-10",
      revenue: 0,
      category: "Development",
      level: "Intermediate",
    },
  ];

  // Filter courses based on search query and filter status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Mock students data
  const students = [
    {
      id: "student-1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      enrolledCourses: 2,
      lastActive: "2 days ago",
    },
    {
      id: "student-2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      enrolledCourses: 3,
      lastActive: "Today",
    },
    {
      id: "student-3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      enrolledCourses: 1,
      lastActive: "Yesterday",
    },
    {
      id: "student-4",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      enrolledCourses: 2,
      lastActive: "3 days ago",
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
        "This course is amazing! I learned so much and was able to build my own website from scratch.",
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
        "Great course with in-depth explanations. Would have liked more practical examples.",
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
        "The instructor's approach to teaching design principles is excellent. Highly recommended!",
      date: "2023-12-05",
    },
  ];

  // Mock messages data
  const messages = [
    {
      id: "message-1",
      studentName: "John Smith",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      courseName: "Complete Web Development Bootcamp",
      message:
        "I'm having trouble with the JavaScript section. Can you provide some additional resources?",
      date: "2023-12-18",
      unread: true,
    },
    {
      id: "message-2",
      studentName: "Emily Johnson",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      courseName: "Advanced JavaScript: From Fundamentals to Functional JS",
      message:
        "Thank you for the quick response to my previous question. I have one more about closures.",
      date: "2023-12-16",
      unread: false,
    },
    {
      id: "message-3",
      studentName: "Sarah Davis",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      courseName: "UI/UX Design Masterclass",
      message:
        "Could you review my final project when you have time? I've implemented all your suggestions.",
      date: "2023-12-14",
      unread: false,
    },
  ];

  const handleCreateCourse = () => {
    setIsCreateCourseModalOpen(true);
  };

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setIsEditCourseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.name || "Instructor"}!
                </h1>
                <p className="text-muted-foreground">
                  Manage your courses, track student progress, and grow your
                  teaching business.
                </p>
              </div>
              <Button onClick={handleCreateCourse}>
                <Plus className="mr-2 h-4 w-4" /> Create New Course
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Courses
                      </p>
                      <p className="text-2xl font-bold">{courses.length}</p>
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
                        Total Students
                      </p>
                      <p className="text-2xl font-bold">
                        {courses.reduce(
                          (sum, course) => sum + course.students,
                          0,
                        )}
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        $
                        {courses
                          .reduce((sum, course) => sum + course.revenue, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Average Rating
                      </p>
                      <p className="text-2xl font-bold">
                        {(
                          courses.reduce(
                            (sum, course) => sum + course.rating,
                            0,
                          ) / courses.length
                        ).toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ActivityChart
                    title="Monthly Revenue"
                    data={revenueData}
                    type="line"
                    height={300}
                  />
                </div>
                <div>
                  <ActivityChart
                    title="Course Ratings"
                    data={courseRatingData}
                    type="doughnut"
                    height={300}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityChart
                      title=""
                      data={enrollmentData}
                      type="line"
                      height={250}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.slice(0, 3).map((message) => (
                        <div
                          key={message.id}
                          className="flex gap-4 items-start"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={message.studentAvatar}
                              alt={message.studentName}
                            />
                            <AvatarFallback>
                              {message.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {message.studentName}
                              </p>
                              <div className="flex items-center">
                                <p className="text-xs text-muted-foreground">
                                  {message.date}
                                </p>
                                {message.unread && (
                                  <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {message.courseName}
                            </p>
                            <p className="text-sm mt-1 line-clamp-1">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        View All Messages
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        className="pl-9 w-full md:w-80"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateCourse}>
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={
                              course.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {course.status === "published"
                              ? "Published"
                              : "Draft"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1 mb-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center text-sm mb-2">
                          <span className="text-muted-foreground">
                            {course.level} • ${course.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              {course.students} students
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="text-sm">
                              {course.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              (window.location.href = `/courses/${course.id}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                        ? `No courses match "${searchQuery}".`
                        : "You haven't created any courses yet."}
                    </p>
                    <Button onClick={handleCreateCourse}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Course
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Your Students</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-9 w-full md:w-80"
                    />
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Student</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Enrolled Courses</th>
                            <th className="text-left p-4">Last Active</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr
                              key={student.id}
                              className="border-b hover:bg-muted/50"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={student.avatar}
                                      alt={student.name}
                                    />
                                    <AvatarFallback>
                                      {student.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {student.name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-muted-foreground">
                                {student.email}
                              </td>
                              <td className="p-4">{student.enrolledCourses}</td>
                              <td className="p-4 text-muted-foreground">
                                {student.lastActive}
                              </td>
                              <td className="p-4">
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" />{" "}
                                  Message
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Course Reviews</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
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
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
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
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-9 w-full md:w-80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 border rounded-lg overflow-hidden">
                    <div className="p-4 border-b bg-muted/50">
                      <h3 className="font-semibold">Conversations</h3>
                    </div>
                    <div className="divide-y">
                      {messages.map((message, index) => (
                        <div
                          key={message.id}
                          className={`p-4 flex gap-3 cursor-pointer hover:bg-muted/50 ${index === 0 ? "bg-muted/50" : ""}`}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={message.studentAvatar}
                              alt={message.studentName}
                            />
                            <AvatarFallback>
                              {message.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">
                                {message.studentName}
                              </p>
                              <div className="flex items-center">
                                <p className="text-xs text-muted-foreground">
                                  {message.date}
                                </p>
                                {message.unread && (
                                  <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {message.courseName}
                            </p>
                            <p className="text-sm truncate">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 border rounded-lg overflow-hidden">
                    <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={messages[0].studentAvatar}
                            alt={messages[0].studentName}
                          />
                          <AvatarFallback>
                            {messages[0].studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {messages[0].studentName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {messages[0].courseName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-96 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={messages[0].studentAvatar}
                              alt={messages[0].studentName}
                            />
                            <AvatarFallback>
                              {messages[0].studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm">{messages[0].message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {messages[0].date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <p className="text-sm">
                              Hi there! I'd be happy to help. Here are some
                              additional resources for the JavaScript section...
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Today
                            </p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user?.avatar || undefined}
                              alt={user?.name || "User"}
                            />
                            <AvatarFallback>
                              {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input placeholder="Type your message..." />
                        <Button>Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Course Modal */}
      <Dialog
        open={isCreateCourseModalOpen}
        onOpenChange={setIsCreateCourseModalOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" placeholder="Enter course title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="49.99" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g. 8 weeks" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Course Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="published" />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateCourseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsCreateCourseModalOpen(false)}>
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Modal */}
      {selectedCourse && (
        <Dialog
          open={isEditCourseModalOpen}
          onOpenChange={setIsEditCourseModalOpen}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input id="edit-title" defaultValue={selectedCourse.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  defaultValue="This comprehensive course covers everything you need to know about web development."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select defaultValue={selectedCourse.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-level">Level</Label>
                  <Select defaultValue={selectedCourse.level.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    defaultValue={selectedCourse.price}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input id="edit-duration" defaultValue="12 weeks" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Course Image</Label>
                <div className="relative">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <Button variant="secondary" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Change Image
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  defaultChecked={selectedCourse.status === "published"}
                />
                <Label htmlFor="edit-published">Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditCourseModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsEditCourseModalOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
