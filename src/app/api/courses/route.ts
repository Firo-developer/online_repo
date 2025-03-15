import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "popularity";

    // Start building the query
    let query = supabase
      .from("courses")
      .select(
        `
        *,
        profiles!courses_instructor_id_fkey(id, full_name, avatar_url),
        reviews(count, rating)
      `,
      )
      .eq("is_published", true);

    // Apply filters
    if (category && category !== "All Categories") {
      query = query.eq("category", category);
    }

    if (level && level !== "All Levels") {
      query = query.eq("level", level);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Process the data
    const courses = data.map((course) => {
      const instructor = course.profiles;
      const reviewData = course.reviews;

      // Calculate average rating
      let avgRating = 0;
      let reviewCount = 0;

      if (reviewData && reviewData.length > 0) {
        reviewCount = reviewData.length;
        avgRating =
          reviewData.reduce(
            (sum: number, review: any) => sum + review.rating,
            0,
          ) / reviewCount;
      }

      // Get student count (in a real app, this would be a separate query)
      const studentCount = Math.floor(Math.random() * 5000) + 100; // Mock data

      return {
        id: course.id,
        title: course.title,
        instructor: instructor.full_name,
        instructorAvatar: instructor.avatar_url,
        image: course.image_url,
        rating: avgRating || 4.5, // Default rating if none exists
        reviewCount: reviewCount,
        price: course.price,
        originalPrice: course.original_price,
        category: course.category,
        level: course.level,
        duration: course.duration,
        students: studentCount,
        description: course.description,
      };
    });

    // Sort the courses
    if (sort === "popularity") {
      courses.sort((a, b) => b.students - a.students);
    } else if (sort === "rating") {
      courses.sort((a, b) => b.rating - a.rating);
    } else if (sort === "price-low") {
      courses.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      courses.sort((a, b) => b.price - a.price);
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient();

    // Check if user is authenticated and is an instructor
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!userProfile || userProfile.role !== "instructor") {
      return NextResponse.json(
        { error: "Only instructors can create courses" },
        { status: 403 },
      );
    }

    // Parse request body
    const courseData = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "image_url",
      "category",
      "level",
      "duration",
    ];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    // Insert the course
    const { data, error } = await supabase
      .from("courses")
      .insert({
        ...courseData,
        instructor_id: session.user.id,
        is_published: false, // Default to unpublished
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
