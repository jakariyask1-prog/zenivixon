import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address."),
  phone: z.string().trim().max(30, "Phone number is too long").optional(),
  company: z.string().trim().max(100).optional(),
  service: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000, "Message is too long. Please limit to 5000 characters."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectBriefSchema = z.object({
  projectType: z.string().trim().min(1, "Project type is required"),
  problemDescription: z.string().trim().min(10, "Please provide a more detailed description (at least 10 characters).").max(3000, "Description is too long."),
  currentTools: z.string().trim().max(1000).optional(),
  budget: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  projectFileUrl: z.string().trim().url("Please provide a valid URL (e.g. https://...)").optional().or(z.literal("")),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address."),
  phone: z.string().trim().max(30, "Phone number is too long").optional(),
  company: z.string().trim().max(100).optional(),
  preferredChannel: z.string().trim().optional(),
});

export type ProjectBriefFormData = z.infer<typeof projectBriefSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("A valid email address is required."),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

