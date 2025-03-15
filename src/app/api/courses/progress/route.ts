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

    // Get data from request body
    const { courseId, lessonId, completed } = await request.json();

    if (!courseId || !lessonId) {
      return NextResponse.json(
        { error: "Course ID and lesson ID are required" },
        { status: 400 },
      );
    }

    // Update last accessed time for the enrollment
    const { error: updateEnrollmentError } = await supabase
      .from("enrollments")
      .update({ last_accessed: new Date().toISOString() })
      .eq("user_id", session.user.id)
      .eq("course_id", courseId);

    if (updateEnrollmentError) {
      throw updateEnrollmentError;
    }

    // Check if progress record exists
    const { data: existingProgress, error: checkError } = await supabase
      .from("progress")
      .select("id, completed")
      .eq("user_id", session.user.id)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingProgress) {
      // Update existing progress
      if (existingProgress.completed !== completed) {
        const { error: updateError } = await supabase
          .from("progress")
          .update({
            completed,
            completion_date: completed ? new Date().toISOString() : null,
          })
          .eq("id", existingProgress.id);

        if (updateError) {
          throw updateError;
        }
      }
    } else {
      // Create new progress record
      const { error: insertError } = await supabase.from("progress").insert({
        user_id: session.user.id,
        lesson_id: lessonId,
        completed,
        completion_date: completed ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        throw insertError;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Progress updated for lesson ${lessonId}`,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient();

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get course ID from query params
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    // Get all lessons for this course
    const { data: sections, error: sectionsError } = await supabase
      .from("sections")
      .select("id")
      .eq("course_id", courseId);

    if (sectionsError) {
      throw sectionsError;
    }

    if (!sections || sections.length === 0) {
      return NextResponse.json({ progress: [] });
    }

    const sectionIds = sections.map((section) => section.id);

    // Get all lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("id")
      .in("section_id", sectionIds);

    if (lessonsError) {
      throw lessonsError;
    }

    if (!lessons || lessons.length === 0) {
      return NextResponse.json({ progress: [] });
    }

    const lessonIds = lessons.map((lesson) => lesson.id);

    // Get completed lessons
    const { data: progress, error: progressError } = await supabase
      .from("progress")
      .select("lesson_id, completed")
      .eq("user_id", session.user.id)
      .in("lesson_id", lessonIds);

    if (progressError) {
      throw progressError;
    }

    return NextResponse.json({
      totalLessons: lessons.length,
      completedLessons: progress.filter((p) => p.completed).length,
      progress: progress,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 },
    );
  }
}
