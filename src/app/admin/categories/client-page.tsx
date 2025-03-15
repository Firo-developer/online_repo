"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Edit,
  Folder,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Mock categories data
  const categories = [
    {
      id: "cat-1",
      name: "Development",
      slug: "development",
      description:
        "Learn programming languages, web development, mobile app development, and more.",
      icon: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      courseCount: 120,
      featured: true,
    },
    {
      id: "cat-2",
      name: "Business",
      slug: "business",
      description:
        "Master business fundamentals, entrepreneurship, management, and leadership skills.",
      icon: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      courseCount: 85,
      featured: true,
    },
    {
      id: "cat-3",
      name: "Design",
      slug: "design",
      description:
        "Explore graphic design, UI/UX design, web design, and other creative disciplines.",
      icon: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      courseCount: 95,
      featured: true,
    },
    {
      id: "cat-4",
      name: "Marketing",
      slug: "marketing",
      description:
        "Learn digital marketing, social media, SEO, content marketing, and analytics.",
      icon: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      courseCount: 60,
      featured: true,
    },
    {
      id: "cat-5",
      name: "IT & Software",
      slug: "it-software",
      description:
        "Master IT certifications, network administration, cybersecurity, and cloud computing.",
      icon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      courseCount: 75,
      featured: false,
    },
    {
      id: "cat-6",
      name: "Personal Development",
      slug: "personal-development",
      description:
        "Improve productivity, leadership, communication, and other soft skills.",
      icon: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
      courseCount: 45,
      featured: false,
    },
    {
      id: "cat-7",
      name: "Photography",
      slug: "photography",
      description:
        "Learn photography basics, editing, composition, and specialized techniques.",
      icon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      courseCount: 30,
      featured: false,
    },
    {
      id: "cat-8",
      name: "Health & Fitness",
      slug: "health-fitness",
      description:
        "Explore nutrition, fitness, mental health, and overall wellness topics.",
      icon: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      courseCount: 25,
      featured: false,
    },
  ];

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/admin/categories";
    return null;
  }

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleAddCategory = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="admin" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Category Management</h1>
              <p className="text-muted-foreground">
                Manage course categories and subcategories
              </p>
            </div>
            <Button onClick={handleAddCategory}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-9 w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-bold text-lg">
                          {category.name}
                        </h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-white/20"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `/courses?category=${category.slug}`)
                              }
                            >
                              <Folder className="mr-2 h-4 w-4" /> View Courses
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-white/80 text-sm">
                        <span>{category.courseCount} courses</span>
                        {category.featured && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/80 text-white text-xs rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        (window.location.href = `/courses?category=${category.slug}`)
                      }
                    >
                      <Folder className="mr-2 h-4 w-4" /> View Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <FolderPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No categories found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `No categories match "${searchQuery}".`
                  : "There are no categories yet."}
              </p>
              <Button onClick={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      <Dialog
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="Enter category name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="category-slug" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Category Icon/Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Feature this category on the homepage</span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddCategoryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsAddCategoryModalOpen(false)}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      {selectedCategory && (
        <Dialog
          open={isEditCategoryModalOpen}
          onOpenChange={setIsEditCategoryModalOpen}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input id="edit-name" defaultValue={selectedCategory.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input id="edit-slug" defaultValue={selectedCategory.slug} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  defaultValue={selectedCategory.description}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Category Icon/Image</Label>
                <div className="relative">
                  <img
                    src={selectedCategory.icon}
                    alt={selectedCategory.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <Button variant="secondary" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Change Image
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    defaultChecked={selectedCategory.featured}
                  />
                  <span>Feature this category on the homepage</span>
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditCategoryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsEditCategoryModalOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
