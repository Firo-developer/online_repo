import CourseLearnPage from "./client-page";

export default function CourseLearn({
  params,
}: {
  params: { courseId: string };
}) {
  return <CourseLearnPage params={params} />;
}
