import { NextResponse } from "next/server";
import { submitReview } from "@/lib/course-helpers";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function POST(request: Request) {
  try {
    const { courseId, rating, comment } = await request.json();

    // Get current user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!courseId || !rating) {
      return NextResponse.json(
        { error: "Course ID and rating are required" },
        { status: 400 },
      );
    }

    const success = await submitReview(
      user.id,
      courseId,
      rating,
      comment || "",
    );

    if (!success) {
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Review submitted successfully`,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 },
    );
  }
}
