"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export default function InstructorMessagesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(0);

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
    {
      id: "message-4",
      studentName: "Michael Brown",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      courseName: "Complete Web Development Bootcamp",
      message:
        "I'm getting an error when trying to deploy my project. Can you help me troubleshoot?",
      date: "2023-12-12",
      unread: false,
    },
    {
      id: "message-5",
      studentName: "David Wilson",
      studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      courseName: "Mobile App Development with React Native",
      message:
        "The app crashes when I try to implement the navigation. I've attached a screenshot of the error.",
      date: "2023-12-10",
      unread: false,
    },
  ];

  // Filter messages based on search query
  const filteredMessages = messages.filter((message) => {
    const query = searchQuery.toLowerCase();
    return (
      message.studentName.toLowerCase().includes(query) ||
      message.courseName.toLowerCase().includes(query) ||
      message.message.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/instructor/messages";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="instructor" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with your students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 border rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-muted/50">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`p-4 flex gap-3 cursor-pointer hover:bg-muted/50 ${index === selectedConversation ? "bg-muted/50" : ""}`}
                      onClick={() => setSelectedConversation(index)}
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
                        <p className="text-sm truncate">{message.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No messages found matching your search."
                        : "No messages yet."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 border rounded-lg overflow-hidden">
              {filteredMessages.length > 0 ? (
                <>
                  <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            filteredMessages[selectedConversation].studentAvatar
                          }
                          alt={
                            filteredMessages[selectedConversation].studentName
                          }
                        />
                        <AvatarFallback>
                          {filteredMessages[
                            selectedConversation
                          ].studentName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {filteredMessages[selectedConversation].studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {filteredMessages[selectedConversation].courseName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-96 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              filteredMessages[selectedConversation]
                                .studentAvatar
                            }
                            alt={
                              filteredMessages[selectedConversation].studentName
                            }
                          />
                          <AvatarFallback>
                            {filteredMessages[
                              selectedConversation
                            ].studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">
                            {filteredMessages[selectedConversation].message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {filteredMessages[selectedConversation].date}
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
                </>
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
