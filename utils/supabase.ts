import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
"https://menzmxvjpkublxsbxwhb.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lbnpteHZqcGt1Ymx4c2J4d2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTIxMTIsImV4cCI6MjA0NTc2ODExMn0.au5SBhJbdP9gIdJQ8bRqKtDs6hLJieN5FjBQvOIOlRc",

  // 'https://cekznfkclcpyfxvzipqb.supabase.co',
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNla3puZmtjbGNweWZ4dnppcHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzM0NTIsImV4cCI6MjA0NDgwOTQ1Mn0.puPkuPS1TgNLIH1ub_ZDoj1YMBDVBvkjllhUqUv4K5A',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
