"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Users, Globe, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About LearnHub
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground mb-8"
              >
                Empowering learners worldwide with high-quality online education
                since 2018
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  LearnHub was founded with a simple mission: to make quality
                  education accessible to everyone, everywhere. What started as
                  a small collection of coding tutorials has grown into a global
                  learning platform with thousands of courses across dozens of
                  disciplines.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founders, a team of educators and technologists,
                  recognized that traditional education wasn't meeting the needs
                  of today's rapidly evolving job market. They envisioned a
                  platform where anyone could learn in-demand skills directly
                  from industry experts, at their own pace, and at an affordable
                  price.
                </p>
                <p className="text-muted-foreground">
                  Today, LearnHub serves millions of students worldwide, helping
                  them master new skills, advance their careers, and fulfill
                  their potential. We're proud of how far we've come, but we're
                  even more excited about where we're going.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Trusted by</p>
                      <p className="text-2xl font-bold">500+ Companies</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-background p-4 shadow-sm">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground">Courses Available</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-background p-4 shadow-sm">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">25,000+</h3>
                <p className="text-muted-foreground">Active Students</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-background p-4 shadow-sm">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">120+</h3>
                <p className="text-muted-foreground">Expert Instructors</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-background p-4 shadow-sm">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">180+</h3>
                <p className="text-muted-foreground">Countries Reached</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at LearnHub
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe education should be accessible to everyone,
                  regardless of geographic location or financial circumstances.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We're committed to providing the highest quality educational
                  content, with rigorous standards for our courses and
                  instructors.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate our platform and teaching methods to
                  provide the most effective learning experience possible.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals driving our mission forward
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  role: "CEO & Co-Founder",
                  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                  bio: "Former education technology executive with a passion for democratizing education.",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO & Co-Founder",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                  bio: "Computer science PhD with expertise in educational technology and AI.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Chief Learning Officer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                  bio: "Former university professor dedicated to effective teaching methodologies.",
                },
                {
                  name: "Priya Patel",
                  role: "Chief Marketing Officer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                  bio: "Digital marketing strategist with a background in educational publishing.",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border"
                >
                  <div className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-background">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-4"
              >
                Join Our Learning Community
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Start your learning journey today and unlock your full potential
                with LearnHub's expert-led courses.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="mr-4"
                  onClick={() => (window.location.href = "/courses")}
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
