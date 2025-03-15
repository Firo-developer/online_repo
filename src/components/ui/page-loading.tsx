import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { motion } from "framer-motion";

export function PageLoading() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <LoadingSpinner size="lg" className="text-primary" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-1 bg-primary mt-8 rounded-full w-[200px]"
        />
        <p className="text-muted-foreground mt-4 text-sm">
          Loading your content...
        </p>
      </motion.div>
    </div>
  );
}
