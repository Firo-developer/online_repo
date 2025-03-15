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

    // Get cart items with course details
    const { data, error } = await supabase
      .from("carts")
      .select(
        `
        courses(*, profiles!courses_instructor_id_fkey(full_name, avatar_url))
      `,
      )
      .eq("user_id", session.user.id);

    if (error) {
      throw error;
    }

    // Format the response
    const cartItems = data.map((item: any) => {
      const course = item.courses;
      const instructor = course.profiles;

      return {
        id: course.id,
        title: course.title,
        instructor: instructor.full_name,
        instructorAvatar: instructor.avatar_url,
        image: course.image_url,
        price: course.price,
        originalPrice: course.original_price,
        category: course.category,
        level: course.level,
        duration: course.duration,
      };
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 },
    );
  }
}

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

    // Check if already in cart
    const { data: existingItem, error: checkError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    // If already in cart, return success
    if (existingItem) {
      return NextResponse.json({
        success: true,
        message: "Course is already in your cart",
      });
    }

    // Check if already enrolled
    const { data: existingEnrollment, error: enrollmentCheckError } =
      await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("course_id", courseId)
        .maybeSingle();

    if (enrollmentCheckError) {
      throw enrollmentCheckError;
    }

    // If already enrolled, don't add to cart
    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already enrolled in this course",
        },
        { status: 400 },
      );
    }

    // Add to cart
    const { error: insertError } = await supabase.from("carts").insert({
      user_id: session.user.id,
      course_id: courseId,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: "Successfully added course to cart",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
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

    // Remove from cart
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("user_id", session.user.id)
      .eq("course_id", courseId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Successfully removed course from cart",
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 },
    );
  }
}
