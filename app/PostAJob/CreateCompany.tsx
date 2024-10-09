import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";
export interface CompanyData {
  id: string;
  companyName: string;
  companyImage: string;
}
const CreateCompany = () => {
  const [companyData, setcompanyData] = useState<CompanyData>({
    id: "",
    companyName: "",
    companyImage: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setcompanyData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field
    }));
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <Label>Company Name</Label>
          <Input
            name="companyName"
            value={companyData.companyName}
            placeholder="eg: Google"
            className="text-black"
            onChange={handleInputChange}
          />
        </div>
        <div className="inputs">
          <Label>Company Logo</Label>
          <Input
            name="companyImage"
            value={companyData.companyImage}
            onChange={handleInputChange}
            className="text-black"
          />
        </div>
        <Button type="submit" className="mt-4">
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default CreateCompany;
