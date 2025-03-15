import CourseDetailPage from "./client-page";

export default function CourseDetail({
  params,
}: {
  params: { courseId: string };
}) {
  return <CourseDetailPage params={params} />;
}
