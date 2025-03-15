import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient();

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get course ID from request body
    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    // Check if already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    // If already enrolled, return success
    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        message: "You are already enrolled in this course",
      });
    }

    // Create enrollment
    const { error: enrollError } = await supabase.from("enrollments").insert({
      user_id: session.user.id,
      course_id: courseId,
      created_at: new Date().toISOString(),
      last_accessed: new Date().toISOString(),
    });

    if (enrollError) {
      throw enrollError;
    }

    // Remove from cart if it exists
    await supabase
      .from("carts")
      .delete()
      .eq("user_id", session.user.id)
      .eq("course_id", courseId);

    return NextResponse.json({
      success: true,
      message: `Successfully enrolled in course ${courseId}`,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return NextResponse.json(
      { error: "Failed to enroll in course" },
      { status: 500 },
    );
  }
}
