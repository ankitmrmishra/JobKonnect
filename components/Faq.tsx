"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { QuestionMarkIcon } from "@radix-ui/react-icons";

const Faq = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  return (
    <section className="flex justify-center align-middle text-center items-center flex-col  md:mx-56 text-white rounded-3xl md:py-20 py-10">
      <div className="badge bg-black max-w-max flex justify-center align-middle items-center text-white rounded-full px-2 py-[6px] text-xs gap-1">
        <QuestionMarkIcon className="bg-white text-black rounded-full " /> Clear
        Your Doubts
      </div>
      <h2 className="text-3xl font-bold  text-black">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 mb-8 ">Your answers could be right here.</p>
      <div className="flex flex-col md:flex-row gap-8 w-full md:p-20 bg-black md:rounded-3xl rounded-t-3xl p-6">
        <div id="FAQ" className="flex-1 ">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-gray-900 text-white rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`transform transition-transform ${
                    openQuestion === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openQuestion === index && (
                <div className="md:p-12 p-3 bg-gray-900 text-white mt-2 rounded-lg ">
                  <p className="  text-start text-wrap">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

const faqData = [
  {
    question: "How do I create an account on JobConnect?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your basic information, including your name, email address, and password. You can then choose to set up a job seeker or employer profile.",
  },

  {
    question: "How do I apply for a job on JobConnect?",
    answer:
      "To apply for a job, click on the job listing you're interested in. You'll see an 'Apply Now' button. Clicking this will either allow you to apply directly through JobConnect or redirect you to the company's application page, depending on the employer's preference.",
  },
  {
    question: "Can employers contact me directly?",
    answer:
      "Yes, if your profile is set to visible, employers can contact you directly through our messaging system. You can adjust your privacy settings to control who can view your profile and contact you.",
  },
  {
    question: "How can I post a job as an employer?",
    answer:
      "To post a job, you need to create an employer account. Once logged in, click on 'Post a Job' in your dashboard. Fill in the job details, including title, description, requirements, and application instructions. Review and publish your listing.",
  },

  {
    question: "How can I get notifications about new job postings?",
    answer:
      "You can set up job alerts based on your preferences. Go to your account settings and look for 'Job Alerts'. Here, you can specify the types of jobs you're interested in, and we'll send you notifications when matching positions are posted.",
  },
  {
    question: "Is my personal information secure on JobConnect?",
    answer:
      "We take data security very seriously. All personal information is encrypted and stored securely. We do not share your data with third parties without your consent. For more details, please review our Privacy Policy.",
  },
];
