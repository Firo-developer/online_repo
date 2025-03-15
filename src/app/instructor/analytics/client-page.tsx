"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityChart from "@/components/dashboard/ActivityChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react";

export default function InstructorAnalyticsPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState("30days");

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

  const coursePerformanceData = {
    labels: ["Web Dev Bootcamp", "Advanced JS", "UI/UX Design", "React Native"],
    datasets: [
      {
        label: "Revenue",
        data: [12500, 9800, 7600, 5400],
        backgroundColor: "hsla(var(--primary), 0.7)",
      },
      {
        label: "Enrollments",
        data: [250, 196, 152, 108],
        backgroundColor: "hsla(var(--primary), 0.3)",
      },
    ],
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/analytics";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Track your performance and growth metrics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">$27,500</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
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
                    Total Students
                  </p>
                  <p className="text-2xl font-bold">8,642</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
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
                    Course Enrollments
                  </p>
                  <p className="text-2xl font-bold">12,345</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +15% from last month
                  </p>
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
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +0.2 from last month
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Star className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ActivityChart
                title="Revenue Over Time"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart
              title="Enrollments Over Time"
              data={enrollmentData}
              type="line"
              height={300}
            />
            <ActivityChart
              title="Course Performance"
              data={coursePerformanceData}
              type="bar"
              height={300}
            />
          </div>

          {/* Top Performing Courses */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Course</th>
                      <th className="text-left p-4">Students</th>
                      <th className="text-left p-4">Revenue</th>
                      <th className="text-left p-4">Rating</th>
                      <th className="text-left p-4">Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">
                        Complete Web Development Bootcamp
                      </td>
                      <td className="p-4">3,245</td>
                      <td className="p-4">$162,250</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>4.8</span>
                        </div>
                      </td>
                      <td className="p-4">78%</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">Advanced JavaScript</td>
                      <td className="p-4">2,187</td>
                      <td className="p-4">$153,090</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>4.9</span>
                        </div>
                      </td>
                      <td className="p-4">82%</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">
                        UI/UX Design Masterclass
                      </td>
                      <td className="p-4">1,876</td>
                      <td className="p-4">$112,560</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>4.7</span>
                        </div>
                      </td>
                      <td className="p-4">75%</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">
                        Mobile App Development with React Native
                      </td>
                      <td className="p-4">1,298</td>
                      <td className="p-4">$84,370</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>4.6</span>
                        </div>
                      </td>
                      <td className="p-4">70%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Student Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Location</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">United States</span>
                        <span className="text-sm">42%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">India</span>
                        <span className="text-sm">18%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "18%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">United Kingdom</span>
                        <span className="text-sm">12%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "12%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Other</span>
                        <span className="text-sm">28%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "28%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Live Q&A Session</h4>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow, 3:00 PM • Web Development Bootcamp
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Workshop: Advanced React Patterns
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Friday, 2:00 PM • Advanced JavaScript
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Course Launch: Python for Data Science
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Next Monday, 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
