import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get enrollments with course details
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from("enrollments")
      .select(
        `
        last_accessed,
        courses(*, profiles!courses_instructor_id_fkey(full_name, avatar_url))
      `,
      )
      .eq("user_id", session.user.id);

    if (enrollmentsError) {
      throw enrollmentsError;
    }

    // Process each enrollment to get progress data
    const enrolledCourses = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const course = enrollment.courses;

        // Get all sections for this course
        const { data: sections, error: sectionsError } = await supabase
          .from("sections")
          .select("id")
          .eq("course_id", course.id);

        if (sectionsError) throw sectionsError;

        if (!sections || sections.length === 0) {
          return {
            id: course.id,
            title: course.title,
            instructor: course.profiles.full_name,
            instructorAvatar: course.profiles.avatar_url,
            image: course.image_url,
            price: course.price,
            originalPrice: course.original_price,
            category: course.category,
            level: course.level,
            duration: course.duration,
            progress: 0,
            lastAccessed: enrollment.last_accessed
              ? new Date(enrollment.last_accessed).toLocaleDateString()
              : "Never",
            totalLessons: 0,
            completedLessons: 0,
            nextLesson: "No lessons available",
          };
        }

        const sectionIds = sections.map((section: any) => section.id);

        // Get all lessons for these sections
        const { data: lessons, error: lessonsError } = await supabase
          .from("lessons")
          .select("id, title, order")
          .in("section_id", sectionIds)
          .order("order", { ascending: true });

        if (lessonsError) throw lessonsError;

        if (!lessons || lessons.length === 0) {
          return {
            id: course.id,
            title: course.title,
            instructor: course.profiles.full_name,
            instructorAvatar: course.profiles.avatar_url,
            image: course.image_url,
            price: course.price,
            originalPrice: course.original_price,
            category: course.category,
            level: course.level,
            duration: course.duration,
            progress: 0,
            lastAccessed: enrollment.last_accessed
              ? new Date(enrollment.last_accessed).toLocaleDateString()
              : "Never",
            totalLessons: 0,
            completedLessons: 0,
            nextLesson: "No lessons available",
          };
        }

        const lessonIds = lessons.map((lesson: any) => lesson.id);

        // Get completed lessons
        const { data: completedLessons, error: progressError } = await supabase
          .from("progress")
          .select("lesson_id")
          .eq("user_id", session.user.id)
          .eq("completed", true)
          .in("lesson_id", lessonIds);

        if (progressError) throw progressError;

        // Calculate progress percentage
        const totalLessons = lessons.length;
        const completedCount = completedLessons.length;
        const progressPercentage =
          totalLessons > 0
            ? Math.round((completedCount / totalLessons) * 100)
            : 0;

        // Find next lesson (first incomplete lesson)
        let nextLesson = "Introduction";
        if (completedCount < totalLessons) {
          const completedIds = completedLessons.map((l: any) => l.lesson_id);
          const nextLessonObj = lessons.find(
            (lesson: any) => !completedIds.includes(lesson.id),
          );

          if (nextLessonObj) {
            nextLesson = nextLessonObj.title;
          }
        }

        return {
          id: course.id,
          title: course.title,
          instructor: course.profiles.full_name,
          instructorAvatar: course.profiles.avatar_url,
          image: course.image_url,
          price: course.price,
          originalPrice: course.original_price,
          category: course.category,
          level: course.level,
          duration: course.duration,
          progress: progressPercentage,
          lastAccessed: enrollment.last_accessed
            ? new Date(enrollment.last_accessed).toLocaleDateString()
            : "Never",
          totalLessons,
          completedLessons: completedCount,
          nextLesson,
        };
      }),
    );

    return NextResponse.json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrolled courses" },
      { status: 500 },
    );
  }
}
