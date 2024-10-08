import { Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobListingCardProps {
  title: string;
  location: string;
  type: string;
  salary: number;
  description: string;
  isNew?: boolean;
}

export default function JobListingCard({
  title,
  location,
  type,
  salary,
  description,
  isNew = false,
}: JobListingCardProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          {isNew && (
            <Badge
              variant="secondary"
              className="text-sm font-medium bg-blue-600 text-white"
            >
              New
            </Badge>
          )}
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
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
        <p className="text-sm text-muted-foreground">{description}</p>

        <Button className="w-full">Apply Now</Button>
      </CardContent>
    </Card>
  );
}
