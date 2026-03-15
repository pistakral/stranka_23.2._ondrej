import { createClient } from '@supabase/supabase-js';

// Načítaj credentials z .env súboru
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bezpečnostná kontrola - ak chybí .env súbor, hneď upozorní
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Missing Supabase environment variables!\n' +
    'Make sure you have a .env file with:\n' +
    'VITE_SUPABASE_URL=your_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_key'
  );
}

// Vytvor Supabase klienta
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