"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

interface ActivityChartProps {
  title: string;
  data: ChartData;
  type: "line" | "bar" | "doughnut" | "pie";
  height?: number;
  className?: string;
  options?: any;
}

export default function ActivityChart({
  title,
  data,
  type = "line",
  height = 300,
  className,
  options = {},
}: ActivityChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    const initChart = async () => {
      try {
        // Check if we're in a browser environment and the ref is available
        if (typeof window === "undefined" || !chartRef.current) {
          return;
        }

        const Chart = (await import("chart.js/auto")).default;

        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Get theme colors from CSS variables
        const isDarkMode = document.documentElement.classList.contains("dark");
        const foregroundColor = getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--foreground");
        const cardColor = getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--card");
        const mutedForegroundColor = getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--muted-foreground");
        const borderColor = getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--border");

        // Set default options based on chart type
        const defaultOptions: any = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                usePointStyle: true,
                boxWidth: 6,
                boxHeight: 6,
                padding: 20,
                color: foregroundColor,
              },
            },
            tooltip: {
              backgroundColor: cardColor,
              titleColor: foregroundColor,
              bodyColor: mutedForegroundColor,
              borderColor: borderColor,
              borderWidth: 1,
              padding: 12,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                // Format numbers with commas
                label: function (context: any) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat().format(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },
          scales:
            type !== "doughnut" && type !== "pie"
              ? {
                  x: {
                    grid: {
                      color: borderColor,
                    },
                    ticks: {
                      color: mutedForegroundColor,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: borderColor,
                    },
                    ticks: {
                      color: mutedForegroundColor,
                      callback: function (value: number) {
                        return value >= 1000 ? value / 1000 + "k" : value;
                      },
                    },
                  },
                }
              : undefined,
        };

        // Merge default options with provided options
        const mergedOptions = { ...defaultOptions, ...options };

        // Double-check that the ref is still valid before creating the chart
        if (chartRef.current) {
          // Create the chart
          chartInstance.current = new Chart(chartRef.current, {
            type,
            data,
            options: mergedOptions,
          });
        }
      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    };

    // Only run in browser environment
    if (typeof window !== "undefined") {
      initChart();
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, options]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }} className="bg-card">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
