import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth-helpers";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    const user = await signUp(name, email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
