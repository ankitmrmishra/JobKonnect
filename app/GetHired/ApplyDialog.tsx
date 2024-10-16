"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface Application {
  name: string;
  phoneNumber: string;
  coverLetter: string;
  resumeLink: string;
}

export function DialogDemo({ id }: { id: string | string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [applicationdata, setApplicationdata] = useState<Application>({
    name: "",
    phoneNumber: "",
    coverLetter: "",
    resumeLink: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationdata),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const result = await response.json();
      console.log("Job created:", result);
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create job",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Apply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply For the Job</DialogTitle>
          <DialogDescription>
            Fill up the details here for the Job Application
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={applicationdata.name}
                onChange={(e) =>
                  setApplicationdata({
                    ...applicationdata,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <Input
                id="phoneNumber"
                className="col-span-3"
                value={applicationdata.phoneNumber}
                onChange={(e) =>
                  setApplicationdata({
                    ...applicationdata,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resumeLink" className="text-right">
                Resume URL
              </Label>
              <Input
                id="resumeLink"
                type="url"
                className="col-span-3"
                placeholder="https://example.com/my-resume.pdf"
                value={applicationdata.resumeLink}
                onChange={(e) =>
                  setApplicationdata({
                    ...applicationdata,
                    resumeLink: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverLetter" className="text-right">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                className="col-span-3"
                rows={4}
                value={applicationdata.coverLetter}
                onChange={(e) =>
                  setApplicationdata({
                    ...applicationdata,
                    coverLetter: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
