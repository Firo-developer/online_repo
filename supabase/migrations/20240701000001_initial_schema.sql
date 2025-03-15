-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  what_you_will_learn JSONB,
  requirements JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create sections table
CREATE TABLE sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create lessons table
CREATE TABLE lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration TEXT NOT NULL,
  is_preview BOOLEAN DEFAULT FALSE,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Create progress table
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Create carts table
CREATE TABLE carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Set up Row Level Security (RLS)
-- Enable row level security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Courses policies
CREATE POLICY "Published courses are viewable by everyone" ON courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Instructors can view their own unpublished courses" ON courses
  FOR SELECT USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can insert their own courses" ON courses
  FOR INSERT WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update their own courses" ON courses
  FOR UPDATE USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can delete their own courses" ON courses
  FOR DELETE USING (auth.uid() = instructor_id);

-- Sections policies
CREATE POLICY "Sections of published courses are viewable by everyone" ON sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sections.course_id
      AND courses.is_published = true
    )
  );

CREATE POLICY "Instructors can view sections of their own courses" ON sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sections.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can insert sections for their own courses" ON sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sections.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can update sections of their own courses" ON sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sections.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can delete sections of their own courses" ON sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = sections.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- Lessons policies
CREATE POLICY "Lessons of published courses are viewable by everyone" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN courses ON courses.id = sections.course_id
      WHERE sections.id = lessons.section_id
      AND courses.is_published = true
    )
  );

CREATE POLICY "Instructors can view lessons of their own courses" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN courses ON courses.id = sections.course_id
      WHERE sections.id = lessons.section_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can insert lessons for their own courses" ON lessons
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM sections
      JOIN courses ON courses.id = sections.course_id
      WHERE sections.id = lessons.section_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can update lessons of their own courses" ON lessons
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN courses ON courses.id = sections.course_id
      WHERE sections.id = lessons.section_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can delete lessons of their own courses" ON lessons
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN courses ON courses.id = sections.course_id
      WHERE sections.id = lessons.section_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view enrollments for their courses" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = enrollments.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own enrollments" ON enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Progress policies
CREATE POLICY "Users can view their own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view progress for their courses" ON progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN sections ON sections.id = lessons.section_id
      JOIN courses ON courses.id = sections.course_id
      WHERE lessons.id = progress.lesson_id
      AND courses.instructor_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own progress" ON progress
  FOR INSERT WITH