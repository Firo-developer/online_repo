"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";
import {
  Home,
  BookOpen,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Layers,
  MessageSquare,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Award,
  User,
  PieChart,
  ShoppingCart,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  userRole?: "student" | "instructor" | "admin";
}

const Sidebar = ({ userRole = "student" }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login?redirect=/dashboard";
    }
    return null;
  }

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        title: "Profile",
        href: "/profile",
        icon: <User className="h-5 w-5" />,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        title: "Help & Support",
        href: "/support",
        icon: <HelpCircle className="h-5 w-5" />,
      },
    ];

    const studentItems = [
      {
        title: "My Courses",
        href: "/dashboard/courses",
        icon: <BookOpen className="h-5 w-5" />,
        badge: "7",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        title: "Wishlist",
        href: "/dashboard/wishlist",
        icon: <Layers className="h-5 w-5" />,
        badge: "3",
        badgeColor: "bg-muted text-muted-foreground",
      },
      {
        title: "Messages",
        href: "/dashboard/messages",
        icon: <MessageSquare className="h-5 w-5" />,
        badge: "5",
        badgeColor: "bg-blue-500 text-white",
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: <Bell className="h-5 w-5" />,
        badge: "2",
        badgeColor: "bg-red-500 text-white",
      },
      {
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Certificates",
        href: "/dashboard/certificates",
        icon: <Award className="h-5 w-5" />,
        badge: "3",
        badgeColor: "bg-amber-500 text-white",
      },
      {
        title: "Purchase History",
        href: "/dashboard/purchases",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ];

    const instructorItems = [
      {
        title: "My Courses",
        href: "/instructor/courses",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        title: "Students",
        href: "/instructor/students",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Analytics",
        href: "/instructor/analytics",
        icon: <BarChart2 className="h-5 w-5" />,
      },
      {
        title: "Messages",
        href: "/instructor/messages",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Reviews",
        href: "/instructor/reviews",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Earnings",
        href: "/instructor/earnings",
        icon: <CreditCard className="h-5 w-5" />,
      },
    ];

    const adminItems = [
      {
        title: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Courses",
        href: "/admin/courses",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        title: "Instructors",
        href: "/admin/instructors",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        title: "Students",
        href: "/admin/students",
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        title: "Sales",
        href: "/admin/sales",
        icon: <ShoppingCart className="h-5 w-5" />,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: <PieChart className="h-5 w-5" />,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ];

    switch (userRole) {
      case "student":
        return [...studentItems, ...commonItems];
      case "instructor":
        return [...instructorItems, ...commonItems];
      case "admin":
        return adminItems;
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 font-semibold",
            collapsed && "justify-center",
          )}
        >
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground mr-2">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">LearnHub</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-3 py-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-3 mb-6 bg-muted/50",
            collapsed ? "justify-center" : "justify-start",
          )}
        >
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage
              src={user?.avatar || undefined}
              alt={user?.name || "User"}
            />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium truncate">{user?.name}</span>
              <span className="text-xs text-muted-foreground truncate">
                {user?.email}
              </span>
              <span className="text-xs mt-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit">
                {user?.role || "student"}
              </span>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block w-full">
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start relative",
                  collapsed && "justify-center px-0",
                )}
                onClick={() => (window.location.href = item.href)}
              >
                {item.icon}
                {!collapsed && <span className="ml-2">{item.title}</span>}
                {!collapsed && item.badge && (
                  <span
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 text-xs font-medium ${item.badgeColor || "bg-primary text-primary-foreground"}`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span
                    className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium ${item.badgeColor || "bg-primary text-primary-foreground"}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto p-4 space-y-3">
        <Separator className="my-2" />
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start",
            collapsed && "justify-center px-0",
          )}
          onClick={() => (window.location.href = "/")}
        >
          <Home className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Back to Home</span>}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20",
            collapsed && "justify-center px-0",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: mobileOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r md:hidden flex flex-col"
      >
        {sidebarContent}
      </motion.aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex h-screen sticky top-0 flex-col bg-card border-r transition-all duration-300 z-30 overflow-hidden",
          collapsed ? "w-[70px]" : "w-64",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default Sidebar;
