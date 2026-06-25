export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatarUrl?: string;
  quote: string;
  metrics?: string;
  category: 'apae' | 'autism' | 'rehabilitation' | 'clinic';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'faturamento' | 'prontuario' | 'agenda' | 'geral';
}

export interface SolutionSector {
  id: string;
  title: string;
  description: string;
  badge: string;
  features: string[];
  ctaText: string;
  iconName: string;
  targetAudience: string;
}

export interface LeadFormData {
  name: string;
  email?: string;
  phone?: string;
  clinicName: string;
  role: string;
  professionalsCount: number;
  mainChallenge: string;
  acceptsTerms?: boolean;
}
