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
  Download,
  TrendingUp,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function InstructorEarningsPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState("30days");

  // Mock data for charts
  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings",
        data: [1200, 1900, 1500, 2500, 2200, 3000],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const courseEarningsData = {
    labels: ["Web Dev Bootcamp", "Advanced JS", "UI/UX Design", "React Native"],
    datasets: [
      {
        label: "Earnings",
        data: [12500, 9800, 7600, 5400],
        backgroundColor: [
          "hsla(var(--primary), 0.8)",
          "hsla(var(--primary), 0.6)",
          "hsla(var(--primary), 0.4)",
          "hsla(var(--primary), 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock transactions data
  const transactions = [
    {
      id: "txn-1",
      date: "2023-12-15",
      description: "Course Purchase: Complete Web Development Bootcamp",
      amount: 49.99,
      type: "credit",
    },
    {
      id: "txn-2",
      date: "2023-12-14",
      description: "Course Purchase: Advanced JavaScript",
      amount: 69.99,
      type: "credit",
    },
    {
      id: "txn-3",
      date: "2023-12-10",
      description: "Course Purchase: UI/UX Design Masterclass",
      amount: 59.99,
      type: "credit",
    },
    {
      id: "txn-4",
      date: "2023-12-01",
      description: "Monthly Payout",
      amount: 1250.0,
      type: "debit",
    },
    {
      id: "txn-5",
      date: "2023-11-28",
      description: "Course Purchase: Complete Web Development Bootcamp",
      amount: 49.99,
      type: "credit",
    },
    {
      id: "txn-6",
      date: "2023-11-25",
      description: "Course Purchase: Mobile App Development with React Native",
      amount: 64.99,
      type: "credit",
    },
  ];

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/earnings";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Earnings</h1>
              <p className="text-muted-foreground">
                Track your revenue and payment history
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
                    Total Earnings
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
                    This Month
                  </p>
                  <p className="text-2xl font-bold">$3,250</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8% from last month
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Available for Payout
                  </p>
                  <p className="text-2xl font-bold">$1,875</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next payout on Jan 1, 2024
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Lifetime Students
                  </p>
                  <p className="text-2xl font-bold">8,642</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +15% from last month
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActivityChart
              title="Earnings Over Time"
              data={earningsData}
              type="line"
              height={300}
            />
            <ActivityChart
              title="Earnings by Course"
              data={courseEarningsData}
              type="pie"
              height={300}
            />
          </div>

          {/* Transactions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Description</th>
                      <th className="text-right p-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="p-4">{transaction.date}</td>
                        <td className="p-4">{transaction.description}</td>
                        <td className="p-4 text-right">
                          <span
                            className={`flex items-center justify-end ${transaction.type === "credit" ? "text-green-500" : "text-red-500"}`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            ${transaction.amount.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Payout Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payout Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Payout Method</p>
                    <p className="text-muted-foreground">
                      PayPal - example@email.com
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Payout Schedule</p>
                    <p className="text-muted-foreground">
                      Monthly (1st of each month)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Next Payout</p>
                    <p className="text-muted-foreground">
                      January 1, 2024 - $1,875.00
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Last Payout</p>
                    <p className="text-muted-foreground">
                      December 1, 2023 - $1,250.00
                    </p>
                  </div>
                </div>
                <Button variant="outline">Update Payout Information</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
