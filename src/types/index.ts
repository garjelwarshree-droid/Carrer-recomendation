/**
 * Type definitions for the Career Advisor application
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserProfile {
  skills: string[];
  interests: string[];
  educationLevel: string;
  yearsExperience: string;
  currentRole?: string;
  userId?: string;
  updatedAt?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  interests: string[];
  educationLevel: string[];
  averageSalary: string;
  growthRate: string;
  matchScore: number;
  matchedSkills: string[];
  matchedInterests: string[];
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
