import React from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function AuthStoryboard() {
  return <AuthModal isOpen={true} onClose={() => {}} defaultTab="login" />;
}
