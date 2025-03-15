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
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Get the user profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      throw error;
    }

    // Return the user data
    const user = {
      id: profile.id,
      name: profile.full_name,
      email: profile.email,
      avatar: profile.avatar_url,
      role: profile.role || "student",
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting current user:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
