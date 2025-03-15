"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Search, Download, Filter } from "lucide-react";

export default function InstructorStudentsPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock students data
  const students = [
    {
      id: "student-1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      enrolledCourses: 2,
      lastActive: "2 days ago",
      enrollmentDate: "2023-10-15",
      progress: 65,
      completedLessons: 12,
      totalLessons: 18,
    },
    {
      id: "student-2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      enrolledCourses: 3,
      lastActive: "Today",
      enrollmentDate: "2023-09-22",
      progress: 78,
      completedLessons: 28,
      totalLessons: 36,
    },
    {
      id: "student-3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      enrolledCourses: 1,
      lastActive: "Yesterday",
      enrollmentDate: "2023-11-05",
      progress: 42,
      completedLessons: 8,
      totalLessons: 19,
    },
    {
      id: "student-4",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      enrolledCourses: 2,
      lastActive: "3 days ago",
      enrollmentDate: "2023-08-30",
      progress: 91,
      completedLessons: 32,
      totalLessons: 35,
    },
    {
      id: "student-5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      enrolledCourses: 4,
      lastActive: "1 week ago",
      enrollmentDate: "2023-07-12",
      progress: 85,
      completedLessons: 42,
      totalLessons: 49,
    },
    {
      id: "student-6",
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      enrolledCourses: 2,
      lastActive: "4 days ago",
      enrollmentDate: "2023-10-01",
      progress: 52,
      completedLessons: 15,
      totalLessons: 29,
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/students";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Students</h1>
              <p className="text-muted-foreground">
                Manage and track your students' progress
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                      <th className="text-left p-4">Progress</th>
                      <th className="text-left p-4">Last Active</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
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
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {student.email}
                        </td>
                        <td className="p-4">{student.enrolledCourses}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {student.lastActive}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" /> Message
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg mt-6">
              <h3 className="text-xl font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `No students match "${searchQuery}".`
                  : "You don't have any students yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
