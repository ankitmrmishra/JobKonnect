import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HiringCTAs({ className }: { className: string }) {
  return (
    <div className={cn("w-full max-w-md mx-auto space-y-4 ", className)}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Email me for jobs
          </CardTitle>
          <CardDescription>
            Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
            ea foes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="email" placeholder="name@mail.com" />
            <Button className="w-full">Subcribe</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center">
            <Rocket className="mr-2 h-5 w-5" />
            Get noticed faster
          </CardTitle>
          <CardDescription>
            Quis eiusmod deserunt cillum laboris magna cupidatat esse labore
            irure quis cupidatat in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Upload your resume</Button>
        </CardContent>
      </Card>
    </div>
  );
}
