"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Menu, X, ChevronDown, Search, LogOut, User } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import SearchModal from "@/components/ui/search-modal";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "signup">(
    "login",
  );
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAuthModal = (tab: "login" | "signup") => {
    setActiveAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">LearnHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-primary hover:bg-accent/50"}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative group px-3 py-2">
                <button className="flex items-center text-sm font-medium text-foreground/80 hover:text-primary">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {isAuthenticated && (
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-accent/50"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/instructor"
                    className="block px-4 py-2 text-sm hover:bg-accent/50"
                  >
                    Become an Instructor
                  </Link>
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm hover:bg-accent/50"
                  >
                    Admin Panel
                  </Link>
                </div>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                aria-label="Search"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <ThemeSwitcher />

              {isAuthenticated ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.avatar || undefined}
                            alt={user?.name || "User"}
                          />
                          <AvatarFallback>{getInitials()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user?.name}</p>
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/cart">Cart</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => (window.location.href = "/login")}
                    className="px-3 py-1.5"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    className="px-3 py-1.5"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? "text-primary bg-accent/50" : "text-foreground/80 hover:text-primary hover:bg-accent/50"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/instructor"
                  className="px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become an Instructor
                </Link>

                <div className="pt-2 pb-3 border-t border-border">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.avatar || undefined}
                            alt={user?.name || "User"}
                          />
                          <AvatarFallback>{getInitials()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-full mb-2 py-1.5"
                        onClick={() => {
                          window.location.href = "/login";
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full py-1.5"
                        onClick={() => {
                          window.location.href = "/signup";
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={activeAuthTab}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
