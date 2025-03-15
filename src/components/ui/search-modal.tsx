"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function - in a real app, this would call an API
  const performSearch = (query: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock results
      const results = [
        {
          id: "course-1",
          title: "Complete Web Development Bootcamp",
          instructor: "Sarah Johnson",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
          rating: 4.8,
          price: 49.99,
          originalPrice: 99.99,
          category: "Development",
          level: "Beginner",
          duration: "12 weeks",
          students: 3245,
        },
        {
          id: "course-2",
          title: "UI/UX Design Masterclass",
          instructor: "Emily Rodriguez",
          image:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
          rating: 4.7,
          price: 59.99,
          originalPrice: 89.99,
          category: "Design",
          level: "Beginner",
          duration: "10 weeks",
          students: 1876,
        },
      ].filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-card">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for courses, instructors, or topics..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Searching...</p>
            </div>
          ) : searchQuery.length >= 2 ? (
            <>
              <h3 className="text-lg font-semibold mb-4">
                {searchResults.length > 0
                  ? `Found ${searchResults.length} results for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`}
              </h3>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        window.location.href = `/courses/${course.id}`;
                        onClose();
                      }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <div className="bg-black/70 text-white text-sm px-2 py-1 rounded-md flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-400 mr-1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {course.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {course.instructor}
                        </p>
                        <div className="flex items-center text-sm mb-2">
                          <span className="text-muted-foreground">
                            {course.level} • {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-bold">
                              ${course.price.toFixed(2)}
                            </span>
                            {course.originalPrice > course.price && (
                              <span className="text-muted-foreground line-through text-sm ml-2">
                                ${course.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or browse our categories
                  </p>
                  <Button
                    onClick={() => {
                      window.location.href = "/courses";
                      onClose();
                    }}
                  >
                    Browse All Courses
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Web Development",
                  "Python",
                  "Data Science",
                  "UI/UX Design",
                  "JavaScript",
                  "React",
                  "Machine Learning",
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      performSearch(term);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-4">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Development",
                  "Business",
                  "Design",
                  "Marketing",
                  "Photography",
                  "Music",
                ].map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      window.location.href = `/courses?category=${category.toLowerCase()}`;
                      onClose();
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
