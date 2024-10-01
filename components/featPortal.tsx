"use client";
import { Goal } from "lucide-react";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

const FeatPortal = () => {
  const [resumeProgress, setResumeProgress] = useState(45);
  // const [highlightedCategory, setHighlightedCategory] = useState("Tech");
  // const [applicationCounts, setApplicationCounts] = useState({
  //   "Pending Review": 3,
  //   "Interviews Scheduled": 2,
  //   "Offers Received": 1,
  // });

  // const categories = ["Tech", "Finance", "Marketing", "Design", "Sales"];

  // const handleCategoryHover = () => {
  //   const randomCategory =
  //     categories[Math.floor(Math.random() * categories.length)];
  //   setHighlightedCategory(randomCategory);
  // };

  // const handleApplicationHover = () => {
  //   const interval = setInterval(() => {
  //     setApplicationCounts((prev) => ({
  //       "Pending Review": Math.floor(Math.random() * 10),
  //       "Interviews Scheduled": Math.floor(Math.random() * 5),
  //       "Offers Received": Math.floor(Math.random() * 3),
  //     }));
  //   }, 100);
  //   return () => clearInterval(interval);
  // };
  return (
    <div className="flex justify-center align-middle items-center flex-col py-16">
      <div className="badge bg-black max-w-max flex justify-center align-middle items-center text-white rounded-full px-2 py-[6px] text-xs gap-1">
        <Goal /> Your job search progress
      </div>
      <div className="head text-center">
        <h1 className="text-3xl  font-semibold py-5">
          Streamlining Your Job Search Process
        </h1>
        <span className="text-sm text-gray-400">
          By simplifying applications, offering personalized job matches, and
          providing real-time updates on your applications
        </span>
      </div>
      <div className="feats grid grid-cols-3">
        <div className="ResumeUpload p-4">
          <motion.div
            className="bg-white overflow-hidden shadow rounded-lg"
            onHoverStart={() => setResumeProgress(90)}
            onHoverEnd={() => setResumeProgress(45)}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <Upload className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg  text-gray-900 font-semibold">
                  Easy Resume Upload
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Seamlessly upload and manage your resume. Get matched you
                    with suitable jobs.
                  </p>
                </div>
                <span className="text-4xl">{resumeProgress}%</span>
                <motion.div
                  className="mt-3 w-full bg-gray-200 rounded-full h-2.5"
                  initial={{ width: "45%" }}
                  animate={{ width: `${resumeProgress}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div
                    className="bg-black h-2.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </motion.div>

                <p className="mt-2 text-sm text-gray-500">
                  Resume analysis in progress
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="ResumeUpload p-4">
          <motion.div
            className="bg-white overflow-hidden shadow rounded-lg"
            onHoverStart={() => setResumeProgress(90)}
            onHoverEnd={() => setResumeProgress(45)}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <Upload className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg  text-gray-900 font-semibold">
                  Easy Resume Upload
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Seamlessly upload and manage your resume. Get matched you
                    with suitable jobs.
                  </p>
                </div>
                <span className="text-4xl">{resumeProgress}%</span>
                <motion.div
                  className="mt-3 w-full bg-gray-200 rounded-full h-2.5"
                  initial={{ width: "45%" }}
                  animate={{ width: `${resumeProgress}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div
                    className="bg-black h-2.5 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </motion.div>

                <p className="mt-2 text-sm text-gray-500">
                  Resume analysis in progress
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="Customcateg"></div>
        <div className="ApplicationTracking"></div>
      </div>
    </div>
  );
};

export default FeatPortal;
