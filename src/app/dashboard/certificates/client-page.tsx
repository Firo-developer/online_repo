"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Eye } from "lucide-react";

export default function CertificatesPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/dashboard/certificates";
    return null;
  }

  const certificates = [
    {
      id: "cert-1",
      title: "HTML & CSS Mastery",
      issueDate: "June 15, 2023",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
    },
    {
      id: "cert-2",
      title: "JavaScript Fundamentals",
      issueDate: "August 22, 2023",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    },
    {
      id: "cert-3",
      title: "React & Redux Masterclass",
      issueDate: "October 10, 2023",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="student" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
          <p className="text-muted-foreground mb-8">
            Certificates you've earned from completed courses
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white font-bold text-lg">
                          {cert.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Issued on {cert.issueDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-primary" />
                      <span>Certificate of Completion</span>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
