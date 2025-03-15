"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface CallToActionProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CallToAction = ({
  onPrimaryClick,
  onSecondaryClick,
}: CallToActionProps) => {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="container mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90 z-0"></div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-xl">
                Join thousands of students already learning on our platform. Get
                unlimited access to all courses, projects, and exclusive
                community support.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Access to 500+ premium courses",
                  "Learn at your own pace, anywhere, anytime",
                  "Earn certificates upon completion",
                  "Connect with expert instructors",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={onPrimaryClick}
                  className="bg-white text-primary hover:bg-white/90 px-6"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onSecondaryClick}
                  className="border-white text-white hover:bg-white/10 px-6"
                >
                  Explore Courses
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0 w-full md:w-auto"
            >
              <div className="bg-white p-1 rounded-xl shadow-xl max-w-sm mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                  alt="Students learning"
                  className="rounded-lg w-full h-auto"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">Web Development Bootcamp</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Bestseller
                    </span>
                  </div>
                  <div className="flex items-center text-amber-500 mb-2">
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
                    <span className="ml-1 text-sm text-gray-600">
                      4.9 (2,540)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg">$49.99</span>
                      <span className="text-gray-500 line-through text-sm ml-2">
                        $99.99
                      </span>
                    </div>
                    <span className="text-green-600 font-medium">50% off</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
