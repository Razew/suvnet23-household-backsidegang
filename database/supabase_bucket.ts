import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const getSupabaseBucketURL = (): string => {
  if (!process.env.EXPO_PUBLIC_SUPABASE_BUCKET_URL) {
    throw new Error('Missing SUPABASE_URL');
  }
  return process.env.EXPO_PUBLIC_SUPABASE_BUCKET_URL;
};
const getSupabaseBucketKey = (): string => {
  if (!process.env.EXPO_PUBLIC_SUPABASE_BUCKET_KEY) {
    throw new Error('Missing SUPABASE_KEY');
  }
  return process.env.EXPO_PUBLIC_SUPABASE_BUCKET_KEY;
};
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_KEY;
console.log('supabaseBucketUrl:', getSupabaseBucketURL());
console.log('supabaseBucketAnonKey:', getSupabaseBucketKey());
if (!getSupabaseBucketURL || !getSupabaseBucketKey) {
  throw new Error('Missing SUPABASE_BUCKET_URL or SUPABASE_BUCKET_KEY');
}
export const supabaseBucket = createClient(
  getSupabaseBucketURL(),
  getSupabaseBucketKey(),
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
