"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

interface CheckoutPageProps {
  courseId: string;
}

const courses = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    price: 49.99,
    originalPrice: 99.99,
  },
  // Add more courses as needed
];

// Custom PayPal icon component
const CustomPaypalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 11l5-5 5 5M7 13l5 5 5-5" />
  </svg>
);

export default function CheckoutPage({ courseId }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Find the course by ID
  const course = courses.find((c) => c.id === courseId) || courses[0];

  // Calculate totals
  const subtotal = course.price;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg border shadow-md p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your purchase. You now have access to "
                {course.title}".
              </p>
              <Button
                size="lg"
                className="mb-4"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Go to Dashboard
              </Button>
              <p className="text-sm text-muted-foreground">
                A receipt has been sent to your email address.
              </p>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex items-start gap-4 mb-6 pb-6 border-b">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {course.instructor}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-6 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <Lock className="h-4 w-4 mr-1" /> Secure checkout
                  </p>
                  <p className="mt-1">30-day money-back guarantee</p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label
                        htmlFor="credit-card"
                        className="flex items-center cursor-pointer"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label
                        htmlFor="paypal"
                        className="flex items-center cursor-pointer"
                      >
                        <CustomPaypalIcon />
                        <span className="ml-2">PayPal</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 p-4 rounded-md text-center">
                      <p className="text-sm mb-4">
                        You will be redirected to PayPal to complete your
                        purchase securely.
                      </p>
                      <img
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                        alt="PayPal"
                        className="h-10 mx-auto"
                      />
                    </div>
                  )}

                  <Separator className="my-6" />

                  <h2 className="text-xl font-semibold mb-4">
                    Billing Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-6">
                    <Checkbox id="terms" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        I agree to the terms and conditions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        By completing this purchase, you agree to our{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay $${total.toFixed(2)}`}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
