"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  TrendingUp,
  Database,
  Lightbulb,
  Smartphone,
} from "lucide-react";

interface CategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

interface PopularCategoriesProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryProps[];
}

const PopularCategories = ({
  title = "Browse Popular Categories",
  subtitle = "Discover top courses in our most sought-after learning categories",
  categories = [
    {
      title: "Web Development",
      description:
        "Learn to build modern, responsive websites and web applications",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      href: "/courses/web-development",
    },
    {
      title: "UI/UX Design",
      description:
        "Master the principles of user interface and experience design",
      icon: <Palette className="h-6 w-6" />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      href: "/courses/design",
    },
    {
      title: "Business & Marketing",
      description:
        "Develop essential skills for business growth and digital marketing",
      icon: <TrendingUp className="h-6 w-6" />,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      href: "/courses/business",
    },
    {
      title: "Data Science",
      description: "Analyze data, build models, and extract valuable insights",
      icon: <Database className="h-6 w-6" />,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
      href: "/courses/data-science",
    },
    {
      title: "Personal Development",
      description:
        "Improve productivity, leadership, and personal growth skills",
      icon: <Lightbulb className="h-6 w-6" />,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
      href: "/courses/personal-development",
    },
    {
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications",
      icon: <Smartphone className="h-6 w-6" />,
      color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      href: "/courses/mobile",
    },
  ],
}: PopularCategoriesProps) => {
  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-background/5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`rounded-full p-3 w-fit mb-4 ${category.color}`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full mt-auto"
                    onClick={() => (window.location.href = category.href)}
                  >
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
