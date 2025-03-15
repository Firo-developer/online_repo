import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}

export function CourseDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-20">
      {/* Course Header */}
      <section className="bg-primary/5 py-12 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-6" />

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="flex items-center mb-6">
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>

            <div className="mb-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card border rounded-lg p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>

              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
