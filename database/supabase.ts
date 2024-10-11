import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const getSupabaseURL = (): string => {
  if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing SUPABASE_URL');
  }
  return process.env.EXPO_PUBLIC_SUPABASE_URL;
};
const getSupabaseKey = (): string => {
  if (!process.env.EXPO_PUBLIC_SUPABASE_KEY) {
    throw new Error('Missing SUPABASE_KEY');
  }
  return process.env.EXPO_PUBLIC_SUPABASE_KEY;
};
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_KEY;
console.log('supabaseUrl:', getSupabaseURL());
console.log('supabaseAnonKey:', getSupabaseKey());
if (!getSupabaseURL || !getSupabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY');
}
export const supabase = createClient(getSupabaseURL(), getSupabaseKey(), {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
