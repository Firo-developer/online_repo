"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, CreditCard, Clock } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";
import AuthModal from "@/components/auth/AuthModal";

interface CartItem {
  id: string;
  title: string;
  instructor: string;
  image: string;
  price: number;
  originalPrice: number;
}

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      price: 49.99,
      originalPrice: 99.99,
    },
    {
      id: "course-2",
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      price: 59.99,
      originalPrice: 89.99,
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "learn25") {
      setDiscount(25);
    } else {
      alert("Invalid promo code");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateDiscount = () => {
    return (calculateSubtotal() * discount) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }

    // Proceed to checkout
    window.location.href = "/checkout";
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8"
          >
            Your Shopping Cart
          </motion.h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="bg-card rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Cart Items ({cartItems.length})
                  </h2>

                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                      >
                        <div className="sm:w-1/4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            by {item.instructor}
                          </p>
                          <div className="flex items-center mb-4">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">
                              Full lifetime access
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-muted-foreground line-through text-sm">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-card rounded-lg border shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromoCode}
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Checkout
                    </Button>

                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 max-w-md mx-auto"
            >
              <div className="bg-primary/5 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any courses to your cart yet.
              </p>
              <Button
                size="lg"
                onClick={() => (window.location.href = "/courses")}
              >
                Browse Courses
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  );
}
