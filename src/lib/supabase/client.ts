import { createClient } from '@supabase/supabase-js'

// Mock supabase URL and key since we likely don't have real ones
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'exampleanonkey';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
