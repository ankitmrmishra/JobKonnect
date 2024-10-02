"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";

interface FilterOption {
  category: string;
  options: string[];
  ranges?: string[];
}

interface FilterData {
  jobFilters: FilterOption[];
}

const filterData: FilterData = {
  jobFilters: [
    {
      category: "Location",
      options: ["In-Office", "Remote job"],
    },
    {
      category: "Salary",
      options: ["Hourly", "Monthly", "Yearly"],
      ranges: ["Any", "> 30000k", "> 50000k", "> 80000k", "> 100000k"],
    },
    {
      category: "Date of posting",
      options: ["All time", "Last 24 hours", "Last 3 days", "Last 7 days"],
    },
    {
      category: "Work experience",
      options: ["Any experience", "Internship", "Work remotely"],
    },
    {
      category: "Type of employment",
      options: ["Full-time", "Temporary", "Part-time"],
    },
  ],
};

interface FilterGroupProps {
  category: string;
  options: string[];
  selectedOption: string | null;
  onOptionChange: (category: string, option: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  category,
  options,
  selectedOption,
  onOptionChange,
}) => (
  <div className="flex flex-col gap-3 ">
    <span className="font-semibold text-blue-600">{category}</span>
    <RadioGroup
      value={selectedOption || undefined}
      onValueChange={(value) => onOptionChange(category, value)}
    >
      {options.map((option, index) => {
        const id = `${category}-${index}`;
        const isSelected = selectedOption === option;
        return (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={id}
              className={cn(
                isSelected &&
                  " text-blue-600 border-blue-600 ring-offset-blue-300 ring-blue-500"
              )}
            />
            <Label
              htmlFor={id}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                isSelected ? "text-blue-600" : "text-gray-700"
              )}
            >
              {option}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  </div>
);

interface FiltersProps {
  className?: string;
}

const Filters: React.FC<FiltersProps> = ({ className }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >({});

  const [open, setopen] = useState(false);
  const toggleMenu = () => {
    setopen(!open);
  };

  const handleOptionChange = (category: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: option }));
  };

  return (
    <div
      className={cn(
        "md:w-full w-[20rem] max-h-max md:bg-white  rounded-xl p-2",
        className
      )}
    >
      <div className="hidden md:block p-4">
        <h1 className="font-semibold flex justify-start align-middle items-center gap-2">
          Filters <SlidersHorizontal className="size-4" />
        </h1>
        {filterData.jobFilters.map((filter, index) => (
          <FilterGroup
            key={index}
            category={filter.category}
            options={filter.options}
            selectedOption={selectedOptions[filter.category] || null}
            onOptionChange={handleOptionChange}
          />
        ))}
      </div>

      {open ? (
        <div className="md:hidden block p-4 bg-white rounded-lg ">
          {" "}
          <div
            className=" font-semibold flex justify-end align-middle items-cend gap-2 bg-transparent text-black shadow-none"
            onClick={toggleMenu}
          >
            <X className="size-4 " />
          </div>
          {filterData.jobFilters.map((filter, index) => (
            <div key={index} className="rounded-xl">
              <FilterGroup
                key={index}
                category={filter.category}
                options={filter.options}
                selectedOption={selectedOptions[filter.category] || null}
                onOptionChange={handleOptionChange}
              />
            </div>
          ))}
        </div>
      ) : (
        <Button
          className="md:hidden font-semibold flex justify-start align-middle items-center gap-2 bg-white text-black"
          onClick={toggleMenu}
        >
          Filters <SlidersHorizontal className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default Filters;
