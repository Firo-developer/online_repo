import React from "react";
import CheckoutPage from "./client-page";

export default function Checkout({ params }: { params: { courseId: string } }) {
  return <CheckoutPage courseId={params.courseId} />;
}
