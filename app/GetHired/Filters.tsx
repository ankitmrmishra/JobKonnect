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

interface FilterGroupProps {
  category: string;
  options: string[];
  selectedOption: string | null;
  onOptionChange: (category: string, option: string) => void;
}

interface FiltersProps {
  className?: string;
  onFilterChange?: (filters: Record<string, string | null>) => void;
}

// Updated to match JobDetail model
const filterData: FilterData = {
  jobFilters: [
    {
      category: "Employment Type",
      options: [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "TEMPORARY",
      ],
    },
    {
      category: "Location",
      options: ["REMOTE", "ON_SITE", "HYBRID"],
    },
    {
      category: "Salary Range",
      options: [
        "< $50k",
        "$50k - $80k",
        "$80k - $100k",
        "$100k - $150k",
        "> $150k",
      ],
    },
    {
      category: "Posted Within",
      options: ["Last 24 hours", "Last week", "Last month", "Any time"],
    },
    {
      category: "Company Type",
      options: ["Startup", "Enterprise", "Agency", "Consulting"],
    },
  ],
};

const FilterGroup: React.FC<FilterGroupProps> = ({
  category,
  options,
  selectedOption,
  onOptionChange,
}) => (
  <div className="flex flex-col gap-3 mt-4">
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
                  "text-blue-600 border-blue-600 ring-offset-blue-300 ring-blue-500"
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

const Filters: React.FC<FiltersProps> = ({ className, onFilterChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >({});
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleOptionChange = (category: string, option: string) => {
    const newFilters = { ...selectedOptions, [category]: option };
    setSelectedOptions(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedOptions({});
    onFilterChange?.({});
  };

  return (
    <div
      className={cn(
        "md:w-full w-[20rem] max-h-max md:bg-white rounded-xl p-2 shadow-sm",
        className
      )}
    >
      <div className="hidden md:block p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold flex items-center gap-2">
            Filters <SlidersHorizontal className="size-4" />
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        </div>
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
        <div className="md:hidden block p-4 bg-white rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold">Filters</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="size-4" />
            </Button>
          </div>
          {filterData.jobFilters.map((filter, index) => (
            <div key={index} className="rounded-xl">
              <FilterGroup
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
          className="md:hidden flex items-center gap-2 bg-white text-black hover:bg-gray-100"
          onClick={toggleMenu}
        >
          Filters <SlidersHorizontal className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default Filters;
