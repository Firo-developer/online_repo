"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ error: any } | undefined>;
  signup: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ error: any } | undefined>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any } | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (!error && data.user) {
        // Create user profile in the profiles table
        await supabaseClient.from("profiles").insert({
          id: data.user.id,
          full_name: name,
          email: email,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        });
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
