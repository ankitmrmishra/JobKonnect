import { Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface JobListingCardProps {
  title: string;
  location: string;
  type: string;
  salary: number;
  description: string;
  companyNew: string;
  jobId: string;
}

export default function JobListingCard({
  title,
  location,
  type,
  salary,
  description,
  companyNew,
  jobId,
}: JobListingCardProps) {
  return (
    <Card className="md:min-w-[50rem] min-w-[20rem] mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          {companyNew && (
            <Badge className="text-sm font-medium bg-transparent shadow-none text-gray-500">
              {companyNew}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full ml-auto z-40"
          >
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Save job</span>
          </Button>
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{salary}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground py-3">{description}</p>

        <Link href={`/GetHired/${jobId}`} className="w-full">
          <Button className="w-full"> Apply Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
