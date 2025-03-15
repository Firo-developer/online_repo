"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Upload, Pencil, Globe, Briefcase, GraduationCap } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/profile";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground mb-8">
            Manage your personal information and preferences
          </p>

          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage
                      src={
                        user?.avatar ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      }
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    <Badge variant="secondary">
                      {user?.role || "Instructor"}
                    </Badge>
                    <Badge variant="outline">4 Courses</Badge>
                    <Badge variant="outline">8,642 Students</Badge>
                  </div>
                </div>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="bio">Bio & Skills</TabsTrigger>
              <TabsTrigger value="social">Social Profiles</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user?.name || ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          defaultValue={user?.email || ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, Country" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Senior Web Developer & Instructor"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell students about yourself and your teaching experience..."
                        rows={6}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Input
                        id="skills"
                        placeholder="e.g. JavaScript, React, Node.js, UI/UX Design"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages</Label>
                      <Input
                        id="languages"
                        placeholder="e.g. English (Fluent), Spanish (Intermediate)"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education & Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Education</Label>
                        <Button variant="outline" size="sm">
                          <GraduationCap className="mr-2 h-4 w-4" /> Add
                          Education
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">
                              Master of Computer Science
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Stanford University
                            </p>
                            <p className="text-sm text-muted-foreground">
                              2018 - 2020
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Work Experience</Label>
                        <Button variant="outline" size="sm">
                          <Briefcase className="mr-2 h-4 w-4" /> Add Experience
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">
                              Senior Web Developer
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Google
                            </p>
                            <p className="text-sm text-muted-foreground">
                              2020 - Present
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id="website"
                            placeholder="https://yourwebsite.com"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                            <span className="text-muted-foreground">
                              twitter.com/
                            </span>
                          </div>
                          <Input
                            id="twitter"
                            placeholder="username"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                            <span className="text-muted-foreground">
                              linkedin.com/in/
                            </span>
                          </div>
                          <Input
                            id="linkedin"
                            placeholder="username"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                            <span className="text-muted-foreground">
                              github.com/
                            </span>
                          </div>
                          <Input
                            id="github"
                            placeholder="username"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Course Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about course updates and new
                          content
                        </p>
                      </div>
                      <Switch id="course-updates" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Student Messages</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications when students send you
                          messages
                        </p>
                      </div>
                      <Switch id="student-messages" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Reviews & Ratings</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when students leave reviews on
                          your courses
                        </p>
                      </div>
                      <Switch id="reviews" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Promotional Emails</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about promotions, features, and updates
                        </p>
                      </div>
                      <Switch id="promotional" />
                    </div>
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
