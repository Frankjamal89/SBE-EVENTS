export type EventCategory = 
  | 'Corporate Events'
  | 'Brand Activations'
  | 'Conferences'
  | 'Exhibitions'
  | 'Roadshows'
  | 'Weddings & Social'
  | 'Training Programmes';

export interface PortfolioItem {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  year: string;
  coverImage: string;
  guestCount: string;
  description: string;
  highlights: string[];
  isDemo?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: EventCategory;
  summary: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  suitability: string;
  inclusions: string[];
  recommendedFor: string;
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  eventType: string;
  preferredDate: string;
  venueLocation: string;
  guestCount: string;
  budgetRange: string;
  servicesRequired: string[];
  additionalNotes?: string;
  selectedPackage?: string | null;
  status: 'new' | 'reviewing' | 'contacted' | 'quote_sent' | 'confirmed' | 'archived';
  submittedAt: string;
  adminNotes?: string;
}
