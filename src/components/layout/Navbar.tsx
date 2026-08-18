"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, MessageSquare, Bot, Cpu, Network, Globe } from "lucide-react";
import { MAIN_NAVIGATION } from "@/data/navigation";
import { COMPANY_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const solutionIcons: Record<string, React.ReactNode> = {
  "/solutions/ai-agents": <Bot className="w-5 h-5 text-blue-600" />,
  "/solutions/ai-automation": <Cpu className="w-5 h-5 text-cyan-600" />,
  "/solutions/software-web-development": <Globe className="w-5 h-5 text-indigo-600" />,
  "/solutions/ai-integration": <Network className="w-5 h-5 text-purple-600" />,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setSolutionsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FCFDFE]/95 backdrop-blur-md border-b border-slate-200/90 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
          >
            <div className="flex items-center justify-center transition-transform group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="ZENIVIXON Logo" 
                width={36} 
                height={36} 
                className="object-contain rounded-lg shadow-sm"
                priority 
              />
            </div>
            <span className="font-extrabold text-lg tracking-widest text-[#0F172A] font-heading">
              ZENIVIXON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {MAIN_NAVIGATION.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setSolutionsDropdownOpen(true)}
                    onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setSolutionsDropdownOpen(false)}
                      aria-haspopup="true"
                      aria-expanded={solutionsDropdownOpen}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          solutionsDropdownOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </Link>

                    {/* Dropdown Menu — always rendered, toggled via CSS for smooth transition */}
                    <div
                      className={`absolute top-full left-0 w-80 pt-2 z-50 transition-all duration-200 origin-top ${
                        solutionsDropdownOpen
                          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      <div className="rounded-2xl bg-white border border-slate-200 p-2.5 shadow-xl shadow-slate-200/50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setSolutionsDropdownOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 group-hover:border-blue-200 transition-colors">
                              {solutionIcons[child.href]}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors font-heading">
                                {child.label}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                {child.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              href={COMPANY_INFO.channels.whatsapp}
              external
              icon={<MessageSquare className="w-4 h-4 text-emerald-600" />}
              iconPosition="left"
              className="text-slate-600 hover:text-emerald-600"
            >
              WhatsApp
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="/start-a-project"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your AI Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer — smooth slide + fade animation */}
      <div
        id="mobile-navigation-drawer"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-b border-slate-200 bg-white px-4 pt-4 pb-6 mt-3 shadow-xl">
          <div className="space-y-1">
            {MAIN_NAVIGATION.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1 mt-1 border-l border-slate-200 ml-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          pathname === child.href
                            ? "text-blue-600 font-semibold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <Button
              variant="whatsapp"
              size="md"
              href={COMPANY_INFO.channels.whatsapp}
              external
              onClick={closeMenu}
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
              className="w-full justify-center"
            >
              Chat on WhatsApp
            </Button>
            <Button
              variant="primary"
              size="md"
              href="/start-a-project"
              onClick={closeMenu}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              Start Your AI Project
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
