export type UserRole = "client" | "provider" | "admin";
export type RequestStatus = "pending" | "accepted" | "rejected" | "completed";

export interface Profile {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role: UserRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Provider {
  id: string;
  user_id: string | null;
  professional_name: string;
  category_id: string | null;
  description: string | null;
  experience_years: number;
  city: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_premium: boolean;
  is_validated: boolean;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  client_id: string | null;
  provider_id: string | null;
  service_type: string | null;
  description: string;
  city: string | null;
  desired_date: string | null;
  status: RequestStatus;
  created_at: string;
}

export interface Review {
  id: string;
  client_id: string | null;
  provider_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  position: string;
  active: boolean;
  created_at: string;
}

export interface ProviderWithCategory extends Provider {
  categories: Pick<Category, "id" | "name"> | null;
}

export interface ProviderWithStats extends ProviderWithCategory {
  reviews_count: number;
  average_rating: number;
}

export interface RequestWithRelations extends ServiceRequest {
  providers: Pick<Provider, "id" | "professional_name" | "city"> | null;
  profiles: Pick<Profile, "id" | "full_name" | "email" | "phone"> | null;
}
