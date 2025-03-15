"use client";

import React from "react";
import { useAuth } from "@/providers/auth-provider";
import Sidebar from "@/components/dashboard/Sidebar";
import { PageLoading } from "@/components/ui/page-loading";
import { Button } from "@/components/ui/button";
import { Layers, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/dashboard/wishlist";
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar userRole="student" />

      <div className="flex-1 p-6 md:p-8 pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground mb-8">
            Courses you've saved for later
          </p>

          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Your wishlist is being developed
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on this feature. Soon you'll be able to save courses
              to your wishlist and get notified about discounts.
            </p>
            <Button onClick={() => (window.location.href = "/courses")}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
