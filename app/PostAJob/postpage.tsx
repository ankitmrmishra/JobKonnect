"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { useState, useCallback } from "react";
// import { useDebounce } from "use-debounce";
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
// } from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "./MenuBar";

const Postpage = () => {
  // const handleEditorChange = (content: string) => {
  //   console.log("Editor content:", content);
  // };
  return (
    <div className="w-full md:grid grid-cols-6 h-[100vh] md:p-5 ">
      <div className="postpage_dashboard col-span-2 rounded-s-md p-3 bg-gray-100 ">
        <span className="main_text font-semibold">Your Job Posts</span>
        <div className="drafts_and_posted w-full">
          <Tabs defaultValue="Posted" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black text-white  ">
              <TabsTrigger value="Posted">Posted</TabsTrigger>
              <TabsTrigger value="Drafts">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="Posted">
              This is Job Posted Section where you will see all your posted
              jobs.
            </TabsContent>
            <TabsContent value="Drafts">
              This is the section where you will see all your drafts of the job
              that you have not posted yet.
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="postpage_editor_area col-span-4  rounded-r-md p-5 flex flex-col justify-start align-middle items-start gap-5">
        <div className=" md:w-[40rem] w-full">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Job Position
          </Label>
          <Input placeholder="eg: Software Developer" className=" text-black" />
        </div>
        <div className=" md:w-[40rem] w-full">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Description
          </Label>
          <Input
            placeholder="Describe the job role in brief"
            className=" text-black"
          />
        </div>
        <div className="location">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Location
          </Label>
          <div className=" flex  gap-2">
            <Input placeholder="City" className=" text-black" />
            <Input placeholder="Country" className=" text-black" />
          </div>
        </div>
        <div className="sal_emplytype flex gap-3">
          <div className="salary">
            <Label className="text-black font-semibold text-lg -tracking-tight">
              Salary
            </Label>
            <Input placeholder="Salary in $" className=" text-black" />
          </div>
          <div className="employment_type">
            <Label className="text-black font-semibold text-lg -tracking-tight">
              Employment Type
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select the Employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employment Type</SelectLabel>
                  <SelectItem value="apple">Full-Time</SelectItem>
                  <SelectItem value="banana">Internship</SelectItem>
                  <SelectItem value="blueberry">Contract Basis</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="">
          <Label className="text-black font-semibold text-lg -tracking-tight">
            Write In Detail About the Job
          </Label>
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
};

export default Postpage;

// interface Prediction {
//   place_id: string;
//   description: string;
// }

// const LocationAutocomplete: React.FC = () => {
//   const [input, setInput] = useState("");
//   const [debouncedInput] = useDebounce(input, 300);
//   const [predictions, setPredictions] = useState<Prediction[]>([]);
//   const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

//   const fetchPredictions = useCallback(async (value: string) => {
//     if (value.length > 2) {
//       try {
//         const response = await fetch(
//           `/api/autocomplete?input=${encodeURIComponent(value)}`
//         );
//         const data = await response.json();
//         console.log(data);

//         setPredictions(data);
//       } catch (error) {
//         console.error("Error fetching predictions:", error);
//       }
//     } else {
//       setPredictions([]);
//     }
//   }, []);

//   React.useEffect(() => {
//     fetchPredictions(debouncedInput);
//   }, [debouncedInput, fetchPredictions]);

//   const handleSelect = (selectedItem: Prediction) => {
//     console.log(selectedItem.description, "this is description");

//     setInput(selectedItem.description);

//     setSelectedPlaceId(selectedItem.description);
//   };

//   return (
//     <div className="">
//       <Command className="rounded-lg border shadow-md">
//         <CommandInput
//           placeholder="Search for location..."
//           value={input}
//           onValueChange={setInput}
//         />
//         <CommandList>
//           <CommandEmpty>No results found.</CommandEmpty>
//           <CommandGroup heading="Suggestions">
//             {predictions.map((item) => (
//               <CommandItem
//                 key={item.place_id}
//                 onSelect={() => handleSelect(item)}
//               >
//                 {item.description}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </CommandList>
//       </Command>
//       {input && (
//         <div className="selected-location-box mt-4 p-4 border border-red-600 bg-red-100 rounded-md">
//           <p className="text-red-600 font-semibold">Selected Location:</p>
//           <p>Description: {input.description}</p>
//           <p>Place ID: {input.place_id}</p>
//         </div>
//       )}
//     </div>
//   );
// };
