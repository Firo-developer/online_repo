"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Globe, Lock, Moon, Palette, Shield, Sun } from "lucide-react";

export default function SettingsPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [theme, setTheme] = useState("system");

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/settings";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="student" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and preferences
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        defaultValue={user?.email || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
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
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="flex justify-center mb-3">
                          <Sun className="h-8 w-8 text-amber-500" />
                        </div>
                        <p className="text-center font-medium">Light</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="flex justify-center mb-3">
                          <Moon className="h-8 w-8 text-indigo-500" />
                        </div>
                        <p className="text-center font-medium">Dark</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="flex justify-center mb-3">
                          <Palette className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-center font-medium">System</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Language Preference</p>
                          <p className="text-sm text-muted-foreground">
                            Select your preferred language
                          </p>
                        </div>
                      </div>
                      <select className="border rounded-md px-3 py-1.5 bg-background text-foreground">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Course Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about updates to your enrolled courses
                        </p>
                      </div>
                      <Switch defaultChecked id="course-updates" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Lessons</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new lessons are available
                        </p>
                      </div>
                      <Switch defaultChecked id="new-lessons" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions</p>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional offers and discounts
                        </p>
                      </div>
                      <Switch id="promotions" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Account Activity</p>
                        <p className="text-sm text-muted-foreground">
                          Get important notifications about your account
                        </p>
                      </div>
                      <Switch defaultChecked id="account-activity" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications in your browser
                        </p>
                      </div>
                      <Switch id="browser-notifications" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mobile Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your mobile device
                        </p>
                      </div>
                      <Switch defaultChecked id="mobile-notifications" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-muted-foreground">
                            Control who can see your profile
                          </p>
                        </div>
                      </div>
                      <select className="border rounded-md px-3 py-1.5 bg-background text-foreground">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                      </select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Activity Status</p>
                          <p className="text-sm text-muted-foreground">
                            Show when you're active on the platform
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked id="activity-status" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect usage data to improve your
                          experience
                        </p>
                      </div>
                      <Switch defaultChecked id="data-collection" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Personalized Ads</p>
                        <p className="text-sm text-muted-foreground">
                          Allow us to show personalized ads based on your
                          activity
                        </p>
                      </div>
                      <Switch id="personalized-ads" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cookie Preferences</p>
                        <p className="text-sm text-muted-foreground">
                          Manage your cookie preferences
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
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
