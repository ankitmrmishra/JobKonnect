import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "./MenuBar";
export interface CompanyData {
  companyName: string;
  companyImage: string;
  companyDetail: string;
}
const CreateCompany = ({
  handlecompanycreated,
}: {
  handlecompanycreated: () => void;
}) => {
  const [companyData, setcompanyData] = useState<CompanyData>({
    companyName: "",
    companyImage: "",
    companyDetail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setcompanyData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleEditorChange = (content: string) => {
    setcompanyData((prev) => ({ ...prev, companyDetail: content }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Wohoo!! comapny Created Successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
        handlecompanycreated();
      }
      if (!response.ok) {
        throw new Error("Failed to create a company");
      }

      const result = await response.json();
      console.log("company created:", result);
      // Handle successful job creation (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error creating company:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create comapny",
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
    <div className=" p-5  flex flex-col justify-center align-middle items-center  gap-5">
      <div className="md:p-10 md:px-52 text-3xl md:text-5xl font-semibold text-center">
        Hey, Thank You for Choosing Job
        <span className="text-blue-600">Konnect</span> for hiring the best
        talents{" "}
      </div>
      <form
        className="w-full h-full flex flex-col justify-start  items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex md:flex-row flex-col justify-start items-start align-middle gap-10 ">
          <div className="inputs w-full md:max-w-max">
            <Label className="text-black font-semibold text-2xl -tracking-tight">
              Company Name
            </Label>
            <Input
              name="companyName"
              value={companyData.companyName}
              placeholder="eg: Google"
              className="text-black w-[20rem]"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="inputs w-full md:max-w-max">
            <Label className="text-black font-semibold text-2xl -tracking-tight">
              Company Logo
            </Label>
            <Input
              name="companyImage"
              value={companyData.companyImage}
              onChange={handleInputChange}
              className="text-black w-[20rem]"
            />
          </div> */}
        </div>
        <div className="">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Write In Detail About the Company
          </Label>
          <RichTextEditor onChange={handleEditorChange} />
        </div>
        <Button type="submit" className="mt-4">
          Create Company
        </Button>
      </form>
    </div>
  );
};

export default CreateCompany;
