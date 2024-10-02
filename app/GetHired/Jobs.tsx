import { cn } from "@/lib/utils";
import { Calendar, DollarSign, LocateIcon, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";

const Jobs = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        " space-y-4  flex flex-col justify-start items-start",
        className
      )}
    >
      <div className="flex">
        <span className="md:text-4xl text-2xl text-white ">3722 Jobs</span>
      </div>

      <div className="jobcards">
        {jobListings.map((jobs, index) => (
          <div key={index} className="py-5">
            <JobCard
              image={jobs.companyImage}
              Jobprofile={jobs.jobTitle}
              companyName={jobs.companyName}
              description={jobs.description}
              location={jobs.location}
              postedTime={jobs.postedTime}
              salaryRange={jobs.salary}
              type_of_employment={jobs.jobType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
interface JobCardProps {
  image: string;
  companyName: string;
  Jobprofile: string;
  location: string;
  type_of_employment: string;
  salaryRange: string;
  postedTime: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({
  image,
  companyName,
  Jobprofile,
  location,
  type_of_employment,
  salaryRange,
  postedTime,
  description,
}) => {
  //   const formattedDate = postedTime.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-900 text-white rounded-xl">
      <div className="image_section md:w-[15rem] w-[10rem] flex justify-start align-middle items-start p-4">
        <Image
          src={image}
          alt={companyName}
          width={100}
          height={100}
          className=" bg-white p-1 rounded-md  md:size-15 size-10 "
        />
      </div>
      <div className="detail_of_job flex justify-start align-middle items-start flex-col p-3 gap-2">
        <div className="">
          <span className="md:text-2xl text-lg ">{companyName}</span>
        </div>
        <div className="md:text-4xl text-xl">{Jobprofile}</div>
        <div className="flex md:gap-7 gap-3 text-gray-500">
          <span className="Location flex md:flex-row flex-col justify-center align-middle items-center gap-1  text-sm">
            <LocateIcon className="size-5 " /> {location}
          </span>
          <span className="Typeofemp flex md:flex-row flex-col  justify-center align-middle items-center gap-1 text-sm">
            <Timer className="size-5" /> {type_of_employment}
          </span>
          <span className="package flex md:flex-row flex-col  justify-center align-middle items-center gap-1 text-sm">
            <DollarSign className="size-5 " /> {salaryRange}
          </span>
          <span className="time flex md:flex-row flex-col  justify-center align-middle items-center gap-1 text-sm">
            <Calendar className="size-5" /> {postedTime}
          </span>
        </div>
        <div className="text-gray-600 ">
          <p className="line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

const jobListings = [
  {
    companyName: "Solana Labs",
    companyImage: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024",
    jobTitle: "Software Engineer",
    location: "Brussels",
    jobType: "Full time",
    salary: "50-55k",
    postedTime: "29 min ago",
    description:
      "Join Solana Labs and work on cutting-edge blockchain technology. We're seeking a talented Software Engineer to help develop and maintain our high-performance blockchain network. You'll be working on core protocol improvements, smart contract development, and scaling solutions. Strong background in Rust, distributed systems, and cryptography is preferred.",
  },
  {
    companyName: "Serum",
    companyImage: "https://cryptologos.cc/logos/serum-srm-logo.png?v=024",
    jobTitle: "Junior UI Designer",
    location: "Madrid",
    jobType: "Full time",
    salary: "30-32k",
    postedTime: "1 day ago",
    description:
      "Serum is looking for a creative Junior UI Designer to join our team in Madrid. You'll be responsible for creating intuitive and visually appealing interfaces for our decentralized exchange platform. This role involves collaborating with UX designers and front-end developers to implement user-friendly designs. Proficiency in Figma and a portfolio demonstrating clean, modern design aesthetics are required.",
  },
  {
    companyName: "ChainLink",
    companyImage: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=035",
    jobTitle: "Technical Support Engineer",
    location: "United States",
    jobType: "Full time",
    salary: "50-52k",
    postedTime: "1 day ago",
    description:
      "ChainLink is seeking a Technical Support Engineer to assist with our oracle network infrastructure. In this role, you'll be the bridge between our development team and node operators, providing crucial support and troubleshooting. Strong knowledge of blockchain technology, experience with Linux systems, and excellent communication skills are essential. You'll play a key role in maintaining the reliability of our decentralized oracle network.",
  },
  {
    companyName: "Space ID",
    companyImage: "https://cryptologos.cc/logos/space-id-id-logo.png?v=035",
    jobTitle: "Product Designer",
    location: "London",
    jobType: "Full time",
    salary: "40-42k",
    postedTime: "2 day ago",
    description:
      "Space ID is revolutionizing digital identity in the blockchain space, and we need a talented Product Designer to help shape our user experience. You'll be responsible for designing intuitive interfaces for our decentralized identity solutions. This role requires a deep understanding of user-centered design principles, experience with blockchain applications, and the ability to simplify complex concepts into user-friendly designs.",
  },
  {
    companyName: "Mango Markets",
    companyImage:
      "https://cryptologos.cc/logos/mango-markets-mngo-logo.png?v=024",
    jobTitle: "Copywriter (Growth)",
    location: "London",
    jobType: "Full time",
    salary: "38-40k",
    postedTime: "3 day ago",
    description:
      "Mango Markets is looking for a skilled Copywriter to join our Growth team. In this role, you'll craft compelling content for our decentralized trading platform, including website copy, blog posts, social media content, and educational materials. The ideal candidate has a strong understanding of DeFi concepts, excellent writing skills, and the ability to explain complex financial products in an engaging, easy-to-understand manner.",
  },
  {
    companyName: "Flare",
    companyImage: "https://cryptologos.cc/logos/flare-flr-logo.png?v=035",
    jobTitle: "Senior UX/UI Designer",
    location: "Paris",
    jobType: "Full time",
    salary: "38-40k",
    postedTime: "4 day ago",
    description:
      "Flare is seeking an experienced Senior UX/UI Designer to lead the design of our cross-chain applications and tools. You'll be responsible for creating seamless user experiences across multiple blockchain networks, designing intuitive interfaces for complex DeFi products, and establishing design guidelines for our growing team. Strong experience in designing for Web3 applications, proficiency in design systems, and a portfolio showcasing innovative blockchain UX solutions are required.",
  },
];
