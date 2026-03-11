export interface Course {
  id: string;
  name: string;
  slug: string;
  duration: string | null;
  price_cents: number;
  concession_price_cents: number | null;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Booking {
  id: string;
  created_at: string;
  course_name: string;
  course_date: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  concession: boolean;
  returning_student: boolean;
  group_booking: boolean;
  group_name: string | null;
  participants: number;
  deposit_paid: boolean;
  stripe_session_id: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string | null;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  replied: boolean;
}
