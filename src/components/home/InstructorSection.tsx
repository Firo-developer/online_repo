"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen } from "lucide-react";

interface InstructorProps {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  specialties: string[];
  featured: boolean;
}

interface InstructorSectionProps {
  title?: string;
  subtitle?: string;
  instructors?: InstructorProps[];
}

const InstructorSection = ({
  title = "Learn from Expert Instructors",
  subtitle = "Our instructors are industry professionals with years of real-world experience",
  instructors = [
    {
      name: "Sarah Johnson",
      title: "Senior Web Developer & Instructor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4.9,
      students: 15420,
      courses: 12,
      specialties: ["Web Development", "JavaScript", "React"],
      featured: true,
    },
    {
      name: "Michael Chen",
      title: "Software Architect & Educator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4.8,
      students: 12350,
      courses: 8,
      specialties: ["Advanced JavaScript", "System Design", "Node.js"],
      featured: true,
    },
    {
      name: "Emily Rodriguez",
      title: "UX/UI Design Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4.9,
      students: 9870,
      courses: 6,
      specialties: ["UI Design", "User Research", "Figma"],
      featured: true,
    },
    {
      name: "David Kim",
      title: "Data Scientist & ML Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4.7,
      students: 7650,
      courses: 5,
      specialties: ["Python", "Machine Learning", "Data Analysis"],
      featured: true,
    },
  ],
}: InstructorSectionProps) => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5"></div>
                    <div className="absolute left-0 right-0 -bottom-16 flex justify-center">
                      <div className="h-32 w-32 rounded-full border-4 border-background overflow-hidden">
                        <img
                          src={instructor.avatar}
                          alt={instructor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    {instructor.featured && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        Featured Instructor
                      </Badge>
                    )}
                  </div>

                  <div className="pt-20 pb-6 px-6 text-center">
                    <h3 className="text-xl font-bold mb-1">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {instructor.title}
                    </p>

                    <div className="flex justify-center items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {instructor.rating}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">
                          {instructor.students.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">{instructor.courses}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {instructor.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="bg-primary/5 border-primary/10"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        (window.location.href = `/instructors/${instructor.name
                          .toLowerCase()
                          .replace(" ", "-")}`)
                      }
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/instructors")}
          >
            View All Instructors
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstructorSection;
