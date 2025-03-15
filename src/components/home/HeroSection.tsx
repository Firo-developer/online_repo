"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface HeroSectionProps {
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick, onSecondaryCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Unlock Your Potential with
              <span className="text-primary"> Expert-Led</span> Online Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Join thousands of learners from around the world and transform
              your career with our cutting-edge courses taught by industry
              experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onCtaClick} className="px-6">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onSecondaryCtaClick}
                className="px-6"
              >
                Explore Courses
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
                ].map((avatar, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 rounded-full border-2 border-background overflow-hidden"
                  >
                    <img
                      src={avatar}
                      alt={`Student ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-medium">Trusted by 25,000+ students</p>
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    4.8/5 from 3,200+ reviews
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students learning"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Web Development Bootcamp
                      </h3>
                      <p className="text-white/80 text-sm">
                        Learn to build modern websites
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                    >
                      <Play className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-10 -right-10 bg-card p-4 rounded-lg shadow-lg border hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">500+ Courses</p>
                  <p className="text-sm text-muted-foreground">
                    In 20+ categories
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-10 -left-10 bg-card p-4 rounded-lg shadow-lg border hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Expert Instructors</p>
                  <p className="text-sm text-muted-foreground">
                    Learn from the best
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
