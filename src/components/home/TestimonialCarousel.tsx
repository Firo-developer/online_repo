"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

interface TestimonialCarouselProps {
  testimonials?: TestimonialProps[];
  autoplaySpeed?: number;
}

const TestimonialCarousel = ({
  testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechCorp Inc.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content:
        "The Web Development Bootcamp completely transformed my career. I went from knowing nothing about coding to landing my dream job as a frontend developer in just 6 months. The instructors are incredibly knowledgeable and supportive throughout the entire journey.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UX Designer",
      company: "DesignHub",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      content:
        "The UI/UX Design Masterclass exceeded all my expectations. The practical projects and detailed feedback helped me build a portfolio that impressed employers. I'm now working at my dream company and using the skills I learned every day.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "DataTech Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      content:
        "As someone transitioning from a different field, the Data Science course provided the perfect foundation. The curriculum was comprehensive yet accessible, and the hands-on projects gave me real-world experience that helped me secure my first role in the industry.",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Product Manager",
      company: "InnovateCo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      content:
        "The Business & Marketing courses helped me develop the strategic thinking and analytical skills needed to advance in my career. The instructors bring real-world experience and provide insights you can't get from textbooks alone.",
    },
  ],
  autoplaySpeed = 5000,
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextTestimonial, autoplaySpeed);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isPaused, nextTestimonial, autoplaySpeed]);

  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from our community of learners who have transformed their
            careers through our courses
          </motion.p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-xl bg-card shadow-lg border">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-primary/10">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -left-2 bg-primary text-white p-2 rounded-full">
                        <Quote className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg md:text-xl italic mb-6">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h4 className="font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonials[currentIndex].role} at{" "}
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/30"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full hidden md:flex"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full hidden md:flex"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
