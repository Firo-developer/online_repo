import { NextResponse } from "next/server";
import { getCourseById } from "@/lib/course-helpers";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const courseId = params.courseId;
    const course = await getCourseById(courseId);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
