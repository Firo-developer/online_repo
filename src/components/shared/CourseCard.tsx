import React from "react";
import { Star, Clock, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id?: string;
  title?: string;
  instructor?: string;
  image?: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  students?: number;
  onClick?: () => void;
}

const CourseCard = ({
  id = "course-1",
  title = "Introduction to Web Development",
  instructor = "Sarah Johnson",
  image = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  rating = 4.8,
  price = 49.99,
  originalPrice = 99.99,
  category = "Development",
  level = "Beginner",
  duration = "6 weeks",
  students = 1245,
  onClick,
}: CourseCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card
      className="w-full max-w-[350px] h-[420px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-3 right-3 font-bold"
          >
            {discount}% OFF
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-3 left-3">
          {category}
        </Badge>
      </div>

      <CardHeader className="pt-4 pb-0">
        <div className="flex justify-between items-center mb-1">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              level === "Beginner"
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : level === "Intermediate"
                  ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                  : "bg-red-50 text-red-600 border-red-200",
            )}
          >
            {level}
          </Badge>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 stroke-amber-500 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">by {instructor}</p>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 opacity-70" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 opacity-70" />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-muted-foreground line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Enroll Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
