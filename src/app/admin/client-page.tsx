"use client";

import React, { useState, useEffect } from "react";
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
  Layers,
  FileText,
  PieChart,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState("30days");

  // Mock data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const usersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Students",
        data: [250, 400, 350, 500, 450, 600],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Instructors",
        data: [30, 45, 40, 60, 55, 70],
        borderColor: "hsl(var(--secondary))",
        backgroundColor: "hsla(var(--secondary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: [
      "Development",
      "Business",
      "Design",
      "Marketing",
      "IT & Software",
      "Personal Development",
    ],
    datasets: [
      {
        label: "Courses",
        data: [120, 80, 95, 60, 75, 45],
        backgroundColor: [
          "hsla(var(--primary), 0.8)",
          "hsla(var(--primary), 0.7)",
          "hsla(var(--primary), 0.6)",
          "hsla(var(--primary), 0.5)",
          "hsla(var(--primary), 0.4)",
          "hsla(var(--primary), 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const platformStatsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Course Completions",
        data: [85, 120, 105, 145, 135, 170],
        borderColor: "hsl(var(--success))",
        backgroundColor: "hsla(var(--success), 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "New Enrollments",
        data: [150, 220, 190, 280, 250, 320],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/admin";
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
            You don't have permission to access the admin dashboard. Please
            contact an administrator if you believe this is an error.
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
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Platform overview and management
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
                  <p className="text-2xl font-bold">$275,000</p>
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
                    Total Users
                  </p>
                  <p className="text-2xl font-bold">24,521</p>
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
                    Total Courses
                  </p>
                  <p className="text-2xl font-bold">475</p>
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
                    Completion Rate
                  </p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5% from last month
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart
              title="Revenue Overview"
              data={revenueData}
              type="line"
              height={300}
            />
            <ActivityChart
              title="User Growth"
              data={usersData}
              type="line"
              height={300}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart
              title="Course Categories"
              data={categoryData}
              type="doughnut"
              height={300}
            />
            <ActivityChart
              title="Platform Statistics"
              data={platformStatsData}
              type="bar"
              height={300}
            />
          </div>

          {/* Recent Activity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Event</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4">New course published</td>
                      <td className="p-4">Sarah Johnson</td>
                      <td className="p-4">Today, 10:30 AM</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" /> Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4">User registration</td>
                      <td className="p-4">Michael Brown</td>
                      <td className="p-4">Today, 9:15 AM</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" /> Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4">Payment processing</td>
                      <td className="p-4">David Wilson</td>
                      <td className="p-4">Yesterday, 3:45 PM</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                          <AlertCircle className="mr-1 h-3 w-3" /> Pending
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4">Course update</td>
                      <td className="p-4">Jennifer Lee</td>
                      <td className="p-4">Yesterday, 1:30 PM</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" /> Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-4">Refund request</td>
                      <td className="p-4">Robert Taylor</td>
                      <td className="p-4">2 days ago</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                          <XCircle className="mr-1 h-3 w-3" /> Rejected
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center justify-center gap-2"
              onClick={() => (window.location.href = "/admin/users")}
            >
              <Users className="h-8 w-8" />
              <span>Manage Users</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center justify-center gap-2"
              onClick={() => (window.location.href = "/admin/courses")}
            >
              <BookOpen className="h-8 w-8" />
              <span>Manage Courses</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center justify-center gap-2"
              onClick={() => (window.location.href = "/admin/categories")}
            >
              <Layers className="h-8 w-8" />
              <span>Manage Categories</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center justify-center gap-2"
              onClick={() => (window.location.href = "/admin/settings")}
            >
              <Settings className="h-8 w-8" />
              <span>Platform Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
