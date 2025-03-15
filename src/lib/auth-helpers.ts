import { supabase } from "./supabase";
import { User } from "./auth";

export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<User | null> {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) return null;

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email,
        name,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: "student",
      })
      .select()
      .single();

    if (userError) throw userError;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar_url,
      role: userData.role,
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw authError;
    if (!authData.user) return null;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (userError) throw userError;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar_url,
      role: userData.role,
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export async function resetPassword(email: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error resetting password:", error);
    return false;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) return null;

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single();

    if (error) throw error;

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar_url,
      role: userData.role,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
