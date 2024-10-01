"use client";
import { Goal } from "lucide-react";

import React, { useEffect, useState } from "react";
import { Upload, Tag, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FeatPortal = () => {
  const [resumeProgress, setResumeProgress] = useState(45);
  const [highlightedCategory, setHighlightedCategory] = useState("Tech");
  const [applicationCounts, setApplicationCounts] = useState({
    "Pending Review": 3,
    "Interviews Scheduled": 2,
    "Offers Received": 1,
  });
  const [isHovering, setIsHovering] = useState(false);

  const categories = [
    "Tech",
    "Finance",
    "Marketing",
    "Design",
    "Decoer",
    "Art",
    "Sales",
    "Data Analytics",
    "Devrel",
    "Chef",
  ];

  const handleCategoryHover = () => {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setHighlightedCategory(randomCategory);
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isHovering) {
      interval = setInterval(() => {
        setApplicationCounts({
          "Pending Review": 1,
          "Interviews Scheduled": 9,
          "Offers Received": 5,
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="flex w-[90%] justify-center align-middle items-center flex-col py-16">
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
      <div className="feats grid md:grid-cols-1 lg:grid-cols-3 grid-cols-1">
        <div className="ResumeUpload p-4">
          <motion.div
            className="bg-white overflow-hidden shadow rounded-lg h-[20rem]"
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

        <div className="Customcateg p-4 h-full">
          <motion.div
            className="bg-white overflow-hidden shadow rounded-lg h-[20rem] max-h-max"
            onHoverStart={handleCategoryHover}
            onHoverEnd={() => setHighlightedCategory("Tech")}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <Tag className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Customizable Job Categories
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Filter and find jobs that match your interests and skills.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.span
                      key={category}
                      className={`px-2 py-1 text-sm rounded-full font-medium ${
                        category === highlightedCategory
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                      animate={{
                        scale: category === highlightedCategory ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {category}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="ApplicationTracking p-4">
          <motion.div
            className="bg-white overflow-hidden shadow rounded-lg h-[20rem] "
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => {
              setIsHovering(false);
              setApplicationCounts({
                "Pending Review": 3,
                "Interviews Scheduled": 2,
                "Offers Received": 1,
              });
            }}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <Bell className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Tracking
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Stay updated on your job applications with real-time
                    notifications.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {Object.entries(applicationCounts).map(([label, count]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-500">{label}</span>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={count}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-black text-white"
                        >
                          {count}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeatPortal;
