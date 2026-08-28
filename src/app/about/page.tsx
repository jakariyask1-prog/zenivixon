import React from "react";
import { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Leadership & AI-First Technology Team",
  description:
    "Meet the leadership and engineering team behind ZENIVIXON TECHNOLOGIES: our problem-first engineering philosophy, Founder & CEO profile, and technical specialists delivering practical AI systems.",
};

export default function AboutPage() {
  return <AboutContent />;
}
