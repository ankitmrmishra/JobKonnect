import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, MapPin, Briefcase, Calendar } from "lucide-react";

export default function ProfilePageSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="w-32 h-32 rounded-full mb-4" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-56 mb-4" />
            <div className="w-full space-y-2">
              {[Phone, MapPin, Briefcase, Calendar].map((Icon, index) => (
                <div key={index} className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-gray-300" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="md:col-span-2 space-y-4">
          {["About Me", "Skills", "Education", "Achievements"].map(
            (section, index) => (
              <Card key={index} className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  {index === 3 && <Skeleton className="h-4 w-3/4" />}
                </div>
              </Card>
            )
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  );
}
