-- Fix the SQL error related to the reviews column in the GROUP BY clause
-- The error was: column "reviews_1.rating" must appear in the GROUP BY clause or be used in an aggregate function

-- Modify the courses view to properly handle the reviews rating column
CREATE OR REPLACE VIEW course_details AS
SELECT 
  c.id,
  c.title,
  c.description,
  c.price,
  c.instructor_id,
  u.name AS instructor_name,
  u.avatar AS instructor_avatar,
  c.category_id,
  cat.name AS category_name,
  c.level,
  c.duration,
  c.status,
  c.created_at,
  c.updated_at,
  c.thumbnail,
  COUNT(DISTINCT e.user_id) AS student_count,
  AVG(r.rating) AS avg_rating,
  COUNT(DISTINCT r.id) AS review_count
FROM 
  courses c
LEFT JOIN 
  users u ON c.instructor_id = u.id
LEFT JOIN 
  categories cat ON c.category_id = cat.id
LEFT JOIN 
  enrollments e ON c.id = e.course_id
LEFT JOIN 
  reviews r ON c.id = r.course_id
GROUP BY 
  c.id, c.title, c.description, c.price, c.instructor_id, u.name, u.avatar,
  c.category_id, cat.name, c.level, c.duration, c.status, c.created_at, c.updated_at, c.thumbnail;
