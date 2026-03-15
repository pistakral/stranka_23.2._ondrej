import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pacedozzqdgscxxkgimc.supabase.co';
const supabaseAnonKey = 'TVOJ_ANON_KEY_SEM'; // ← VLOŽ SEM ANON KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript typy (optional, ale odporúčam)
export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string | null;
  capacity: string;
  color: string;
  category_id: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  stock_status: string;
  grade: string;
  condition_appearance: string | null;
  condition_display: string | null;
  condition_functionality: string | null;
  condition_battery_percent: number | null;
  main_image: string;
  images: string[];
  specs: any; // JSONB
  serial_number: string | null;
  warranty: string;
  description: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}