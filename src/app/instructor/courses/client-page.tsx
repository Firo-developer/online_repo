"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Search,
  Edit,
  Eye,
  Upload,
  Trash2,
  MoreHorizontal,
  Users,
  Star,
} from "lucide-react";

export default function InstructorCoursesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

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

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/courses";
    return null;
  }

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Courses</h1>
              <p className="text-muted-foreground">
                Manage your courses and track their performance
              </p>
            </div>
            <Button onClick={handleCreateCourse}>
              <Plus className="mr-2 h-4 w-4" /> Create New Course
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
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
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
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
