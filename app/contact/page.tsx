"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Facebook, Linkedin, Instagram } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export default function JobKonnectContactPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Basic",
      price: "$9.99/mo",
      features: ["10 job postings/month", "Basic analytics", "Email support"],
    },
    {
      name: "Pro",
      price: "$29.99/mo",
      features: [
        "50 job postings/month",
        "Advanced analytics",
        "Priority support",
        "Featured listings",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited job postings",
        "Custom analytics",
        "Dedicated account manager",
        "API access",
      ],
    },
  ];

  const faqs = [
    {
      question: "How does JobKonnect work?",
      answer:
        "JobKonnect connects employers with job seekers through our advanced matching algorithm and user-friendly platform.",
    },
    {
      question: "What makes JobKonnect different?",
      answer:
        "Our AI-powered matching, real-time analytics, and flexible subscription models set us apart from traditional job boards.",
    },
    {
      question: "Can I try JobKonnect for free?",
      answer:
        "Yes! We offer a 14-day free trial for all our subscription plans.",
    },
  ];

  return (
    <div className="container px-10  md:p-24">
      <section className="text-center py-5">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Job<span className="text-blue-500">Konnect</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing the way employers and job seekers connect.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={selectedPlan === plan.name ? "border-primary" : ""}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={selectedPlan === plan.name ? "default" : "outline"}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="md:px-52 px-5 py-36">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Get in Touch
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md mx-auto space-y-4"
        >
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <select className="w-full p-2 border rounded">
            <option value="">Select Inquiry Type</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="partnership">Partnership</option>
          </select>
          <Textarea placeholder="Your Message" className="h-32" />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <TwitterLogoIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Instagram className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <footer className="text-center text-muted-foreground">
        <p>&copy; 2024 JobKonnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
