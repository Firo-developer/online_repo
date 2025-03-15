export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string | null;
          role: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          role?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
          role?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor_id: string;
          price: number;
          original_price: number | null;
          image_url: string;
          category: string;
          level: string;
          duration: string;
          created_at: string;
          updated_at: string | null;
          is_published: boolean;
          what_you_will_learn: Json | null;
          requirements: Json | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor_id: string;
          price: number;
          original_price?: number | null;
          image_url: string;
          category: string;
          level: string;
          duration: string;
          created_at?: string;
          updated_at?: string | null;
          is_published?: boolean;
          what_you_will_learn?: Json | null;
          requirements?: Json | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          instructor_id?: string;
          price?: number;
          original_price?: number | null;
          image_url?: string;
          category?: string;
          level?: string;
          duration?: string;
          created_at?: string;
          updated_at?: string | null;
          is_published?: boolean;
          what_you_will_learn?: Json | null;
          requirements?: Json | null;
        };
      };
      sections: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          order?: number;
          created_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          section_id: string;
          title: string;
          content: string | null;
          video_url: string | null;
          duration: string;
          is_preview: boolean;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          title: string;
          content?: string | null;
          video_url?: string | null;
          duration: string;
          is_preview?: boolean;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          title?: string;
          content?: string | null;
          video_url?: string | null;
          duration?: string;
          is_preview?: boolean;
          order?: number;
          created_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          created_at: string;
          last_accessed: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          created_at?: string;
          last_accessed?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          created_at?: string;
          last_accessed?: string | null;
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completion_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          completion_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          completion_date?: string | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
