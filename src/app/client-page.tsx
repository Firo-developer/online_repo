"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLoading } from "@/components/ui/page-loading";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import PopularCategories from "@/components/home/PopularCategories";
import InstructorSection from "@/components/home/InstructorSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import FaqSection from "@/components/home/FaqSection";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/home/Footer";
import AuthModal from "@/components/auth/AuthModal";
import { useTheme } from "next-themes";

export default function ClientPage() {
  const { theme } = useTheme();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content animations
      setTimeout(() => setIsPageLoaded(true), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  const handleOpenAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar
        onLoginClick={() => handleOpenAuthModal("login")}
        onSignupClick={() => handleOpenAuthModal("signup")}
      />

      <AnimatePresence>
        {isPageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <div className="pt-20">
              <HeroSection
                onCtaClick={() => handleOpenAuthModal("signup")}
                onSecondaryCtaClick={() => (window.location.href = "/courses")}
              />
            </div>

            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <StatisticsSection />
            </motion.div>

            {/* Popular Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <PopularCategories />
            </motion.div>

            {/* Featured Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FeaturedCourses />
            </motion.div>

            {/* Instructor Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <InstructorSection />
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TestimonialCarousel />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FaqSection />
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <CallToAction
                onPrimaryClick={() => handleOpenAuthModal("signup")}
                onSecondaryClick={() => (window.location.href = "/courses")}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        defaultTab={authModalTab}
      />
    </main>
  );
}
