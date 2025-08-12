import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const onboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Please select a country"),
  timezone: z.string().min(1, "Please select a timezone"),
  domains: z.array(z.string()).min(1, "Please select at least one domain"),
  subDomains: z.array(z.string()).optional(),
  experience: z.string().min(1, "Please select your experience level"),
  qualification: z.string().min(1, "Please select your qualification"),
  profileUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  bio: z.string().optional(),
  availability: z.array(z.string()).optional(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
