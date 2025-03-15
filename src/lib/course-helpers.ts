import { supabase } from "./supabase";
import { Course, EnrolledCourse, CourseCurriculum } from "./course";

export async function getCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select(
        `
        *,
        users!courses_instructor_id_fkey(name, avatar_url),
        reviews(count, rating)
      `,
      )
      .eq("is_published", true);

    if (error) throw error;

    return data.map((course) => {
      const instructor = course.users;
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

      return {
        id: course.id,
        title: course.title,
        instructor: instructor.name,
        instructorAvatar: instructor.avatar_url,
        image: course.image_url,
        rating: avgRating,
        reviewCount: reviewCount,
        price: course.price,
        originalPrice: course.original_price,
        category: course.category,
        level: course.level,
        duration: course.duration,
        students: 0, // Will be calculated in a separate query
        description: course.description,
        whatYouWillLearn: (course.what_you_will_learn as string[]) || [],
        requirements: (course.requirements as string[]) || [],
      };
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    // Get course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select(
        `
        *,
        users!courses_instructor_id_fkey(id, name, avatar_url),
        reviews(count, rating, comment, created_at, users(name, avatar_url))
      `,
      )
      .eq("id", courseId)
      .single();

    if (courseError) throw courseError;
    if (!course) return null;

    // Get curriculum (sections and lessons)
    const { data: sections, error: sectionsError } = await supabase
      .from("sections")
      .select(
        `
        id, title, order,
        lessons(id, title, duration, is_preview, order, video_url)
      `,
      )
      .eq("course_id", courseId)
      .order("order", { ascending: true });

    if (sectionsError) throw sectionsError;

    // Format curriculum
    const curriculum: CourseCurriculum[] = sections.map((section: any) => ({
      title: section.title,
      lessons: section.lessons
        .sort((a: any, b: any) => a.order - b.order)
        .map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          isPreview: lesson.is_preview,
          videoUrl: lesson.video_url,
        })),
    }));

    // Count enrolled students
    const { count: studentCount, error: countError } = await supabase
      .from("enrollments")
      .select("id", { count: "exact" })
      .eq("course_id", courseId);

    if (countError) throw countError;

    // Format reviews
    const reviews = course.reviews.map((review: any) => ({
      id: review.id,
      name: review.users.name,
      avatar: review.users.avatar_url,
      rating: review.rating,
      date: new Date(review.created_at).toLocaleDateString(),
      comment: review.comment,
    }));

    // Calculate average rating
    let avgRating = 0;
    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
    }

    return {
      id: course.id,
      title: course.title,
      instructor: course.users.name,
      instructorTitle: "Instructor", // This could be stored in the users table
      instructorAvatar: course.users.avatar_url,
      instructorBio:
        "Experienced instructor with expertise in this subject area.", // This could be stored in the users table
      image: course.image_url,
      rating: avgRating,
      reviewCount: reviews.length,
      price: course.price,
      originalPrice: course.original_price,
      category: course.category,
      level: course.level,
      duration: course.duration,
      students: studentCount || 0,
      description: course.description,
      whatYouWillLearn: (course.what_you_will_learn as string[]) || [],
      requirements: (course.requirements as string[]) || [],
      curriculum: curriculum,
      reviews: reviews,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export async function getEnrolledCourses(
  userId: string,
): Promise<EnrolledCourse[]> {
  try {
    // Get enrollments with course details
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from("enrollments")
      .select(
        `
        last_accessed,
        courses(*, users!courses_instructor_id_fkey(name, avatar_url))
      `,
      )
      .eq("user_id", userId);

    if (enrollmentsError) throw enrollmentsError;

    // For each enrollment, get progress data
    const enrolledCourses = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const course = enrollment.courses;

        // Get all lessons for this course
        const { data: lessons, error: lessonsError } = await supabase
          .from("lessons")
          .select("id")
          .in(
            "section_id",
            supabase.from("sections").select("id").eq("course_id", course.id),
          );

        if (lessonsError) throw lessonsError;

        // Get completed lessons
        const { data: completedLessons, error: progressError } = await supabase
          .from("progress")
          .select("lesson_id")
          .eq("user_id", userId)
          .eq("completed", true)
          .in(
            "lesson_id",
            lessons.map((l: any) => l.id),
          );

        if (progressError) throw progressError;

        // Calculate progress percentage
        const totalLessons = lessons.length;
        const completedCount = completedLessons.length;
        const progressPercentage =
          totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

        // Get next lesson (first incomplete lesson)
        let nextLesson = "Introduction";
        if (completedCount < totalLessons) {
          const completedIds = completedLessons.map((l: any) => l.lesson_id);
          const { data: nextLessonData, error: nextLessonError } =
            await supabase
              .from("lessons")
              .select("title")
              .in(
                "section_id",
                supabase
                  .from("sections")
                  .select("id")
                  .eq("course_id", course.id),
              )
              .not("id", "in", `(${completedIds.join(",")})`) // Exclude completed lessons
              .order("order", { ascending: true })
              .limit(1)
              .single();

          if (!nextLessonError && nextLessonData) {
            nextLesson = nextLessonData.title;
          }
        }

        return {
          id: course.id,
          title: course.title,
          instructor: course.users.name,
          image: course.image_url,
          rating: 0, // This would be calculated from reviews
          price: course.price,
          originalPrice: course.original_price,
          category: course.category,
          level: course.level,
          duration: course.duration,
          students: 0, // This would be calculated from enrollments
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

    return enrolledCourses;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
}

export async function enrollInCourse(
  userId: string,
  courseId: string,
): Promise<boolean> {
  try {
    // Check if already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (checkError) throw checkError;

    // If already enrolled, return true
    if (existingEnrollment) return true;

    // Create enrollment
    const { error: enrollError } = await supabase.from("enrollments").insert({
      user_id: userId,
      course_id: courseId,
      last_accessed: new Date().toISOString(),
    });

    if (enrollError) throw enrollError;

    // Remove from cart if it exists
    await supabase
      .from("carts")
      .delete()
      .eq("user_id", userId)
      .eq("course_id", courseId);

    return true;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return false;
  }
}

export async function updateCourseProgress(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean,
): Promise<boolean> {
  try {
    // Update last accessed time for the enrollment
    const { error: updateEnrollmentError } = await supabase
      .from("enrollments")
      .update({ last_accessed: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (updateEnrollmentError) throw updateEnrollmentError;

    // Check if progress record exists
    const { data: existingProgress, error: checkError } = await supabase
      .from("progress")
      .select("id, completed")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    if (checkError) throw checkError;

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

        if (updateError) throw updateError;
      }
    } else {
      // Create new progress record
      const { error: insertError } = await supabase.from("progress").insert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        completion_date: completed ? new Date().toISOString() : null,
      });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error("Error updating course progress:", error);
    return false;
  }
}

export async function addToCart(
  userId: string,
  courseId: string,
): Promise<boolean> {
  try {
    // Check if already in cart
    const { data: existingItem, error: checkError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (checkError) throw checkError;

    // If already in cart, return true
    if (existingItem) return true;

    // Check if already enrolled
    const { data: existingEnrollment, error: enrollmentCheckError } =
      await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .maybeSingle();

    if (enrollmentCheckError) throw enrollmentCheckError;

    // If already enrolled, don't add to cart
    if (existingEnrollment) return false;

    // Add to cart
    const { error: insertError } = await supabase.from("carts").insert({
      user_id: userId,
      course_id: courseId,
    });

    if (insertError) throw insertError;

    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
}

export async function getCartItems(userId: string): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select(
        `
        courses(*, users!courses_instructor_id_fkey(name, avatar_url))
      `,
      )
      .eq("user_id", userId);

    if (error) throw error;

    return data.map((item: any) => {
      const course = item.courses;
      const instructor = course.users;

      return {
        id: course.id,
        title: course.title,
        instructor: instructor.name,
        image: course.image_url,
        rating: 0, // This would be calculated from reviews
        price: course.price,
        originalPrice: course.original_price,
        category: course.category,
        level: course.level,
        duration: course.duration,
        students: 0, // This would be calculated from enrollments
      };
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
}

export async function removeFromCart(
  userId: string,
  courseId: string,
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return false;
  }
}

export async function submitReview(
  userId: string,
  courseId: string,
  rating: number,
  comment: string,
): Promise<boolean> {
  try {
    // Check if user is enrolled in the course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (enrollmentError) throw enrollmentError;
    if (!enrollment) return false; // User is not enrolled

    // Check if user has already reviewed this course
    const { data: existingReview, error: reviewCheckError } = await supabase
      .from("reviews")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (reviewCheckError) throw reviewCheckError;

    if (existingReview) {
      // Update existing review
      const { error: updateError } = await supabase
        .from("reviews")
        .update({
          rating,
          comment,
        })
        .eq("id", existingReview.id);

      if (updateError) throw updateError;
    } else {
      // Create new review
      const { error: insertError } = await supabase.from("reviews").insert({
        user_id: userId,
        course_id: courseId,
        rating,
        comment,
      });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error("Error submitting review:", error);
    return false;
  }
}
