import { Skeleton } from "@/components/ui/skeleton";

export default function JobPostSkeleton() {
  return (
    <div className="w-full md:grid grid-cols-6 h-[100vh] md:p-5">
      <div className="col-span-2 rounded-s-md p-3 bg-gray-100">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="col-span-4 rounded-r-md p-5 flex flex-col justify-start items-start gap-5">
        <div className="w-full md:w-[40rem]">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full md:w-[40rem]">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full">
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
        <div className="w-full flex gap-3">
          <div className="w-1/2">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-1/2">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="w-full">
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
