"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Globe } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

interface StatisticsSectionProps {
  stats?: StatProps[];
  background?: string;
}

const StatisticsSection = ({
  stats = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      value: "500+",
      label: "Courses Available",
      delay: 0,
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "25,000+",
      label: "Active Students",
      delay: 0.1,
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      value: "120+",
      label: "Expert Instructors",
      delay: 0.2,
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      value: "180+",
      label: "Countries Reached",
      delay: 0.3,
    },
  ],
  background = "bg-primary/5 dark:bg-primary/10",
}: StatisticsSectionProps) => {
  return (
    <section className={`py-12 ${background}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-background p-4 shadow-sm">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
