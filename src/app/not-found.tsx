import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Layers, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";

export default function NotFound() {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <AmbientOrbs />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
          ERROR 404 &bull; PAGE NOT FOUND
        </Badge>

        <div className="space-y-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight">
            4<span className="text-gradient-animated">0</span>4
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            System Route Not Found
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            The page or resource you are looking for doesn&apos;t exist, has been moved, or the URL may be mistyped.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Button variant="primary" size="lg" href="/" icon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button variant="secondary" size="lg" href="/solutions" icon={<Compass className="w-4 h-4" />}>
            Explore Solutions
          </Button>
        </div>

        {/* Quick Links Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm max-w-md mx-auto text-left space-y-3">
          <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
            Popular Navigation Hubs
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/projects"
              className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Project Showcase</span>
            </Link>
            <Link
              href="/start-a-project"
              className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-cyan-600" />
              <span>Start a Project</span>
            </Link>
            <Link
              href="/about"
              className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
              <span>About Us</span>
            </Link>
            <Link
              href="/contact"
              className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
