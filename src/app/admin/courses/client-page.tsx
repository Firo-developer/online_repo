"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  AlertCircle,
  Users,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminCoursesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock courses data
  const courses = [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      price: 49.99,
      students: 3245,
      rating: 4.8,
      status: "published",
      lastUpdated: "2023-10-15",
      category: "Development",
      level: "Beginner",
    },
    {
      id: "course-2",
      title: "Advanced JavaScript: From Fundamentals to Functional JS",
      instructor: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      price: 69.99,
      students: 2187,
      rating: 4.9,
      status: "published",
      lastUpdated: "2023-11-20",
      category: "Development",
      level: "Intermediate",
    },
    {
      id: "course-3",
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      price: 59.99,
      students: 1876,
      rating: 4.7,
      status: "published",
      lastUpdated: "2023-09-05",
      category: "Design",
      level: "Beginner",
    },
    {
      id: "course-4",
      title: "Data Science and Machine Learning with Python",
      instructor: "David Kim",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      price: 79.99,
      students: 1543,
      rating: 4.9,
      status: "published",
      lastUpdated: "2023-08-12",
      category: "Data Science",
      level: "Advanced",
    },
    {
      id: "course-5",
      title: "Mobile App Development with React Native",
      instructor: "Jessica Taylor",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      price: 64.99,
      students: 1298,
      rating: 4.6,
      status: "draft",
      lastUpdated: "2023-12-10",
      category: "Development",
      level: "Intermediate",
    },
    {
      id: "course-6",
      title: "Digital Marketing Fundamentals",
      instructor: "Robert Wilson",
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      price: 39.99,
      students: 2456,
      rating: 4.5,
      status: "published",
      lastUpdated: "2023-07-25",
      category: "Marketing",
      level: "Beginner",
    },
    {
      id: "course-7",
      title: "Business Analytics & Intelligence",
      instructor: "Jennifer Lee",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      price: 54.99,
      students: 1876,
      rating: 4.7,
      status: "published",
      lastUpdated: "2023-06-18",
      category: "Business",
      level: "Intermediate",
    },
    {
      id: "course-8",
      title: "Full-Stack Web Development with MERN",
      instructor: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      price: 69.99,
      students: 2134,
      rating: 4.8,
      status: "draft",
      lastUpdated: "2023-12-05",
      category: "Development",
      level: "Advanced",
    },
  ];

  // Categories for filter
  const categories = [
    "All Categories",
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
  ];

  // Filter courses based on search query, category, and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/admin/courses";
    return null;
  }

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="admin" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Course Management</h1>
              <p className="text-muted-foreground">
                Manage and monitor all courses on the platform
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/admin/courses/create")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Course
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
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
                        course.status === "published" ? "default" : "secondary"
                      }
                    >
                      {course.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold line-clamp-1">
                      {course.title}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/admin/courses/edit/${course.id}`)
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `/courses/${course.id}`)
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {course.instructor}
                  </p>
                  <div className="flex items-center text-sm mb-2">
                    <span className="text-muted-foreground">
                      {course.category} • {course.level} • $
                      {course.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
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
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last updated: {course.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ||
                filterCategory !== "all" ||
                filterStatus !== "all"
                  ? "No courses match your current filters."
                  : "There are no courses in the system yet."}
              </p>
              {(searchQuery ||
                filterCategory !== "all" ||
                filterStatus !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                    setFilterStatus("all");
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
  );
}
