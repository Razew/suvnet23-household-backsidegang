import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  'https://teokhvzdfbpemkugaoia.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlb2todnpkZmJwZW1rdWdhb2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDY2NjksImV4cCI6MjA0NDY4MjY2OX0.1CSAZsvNmlh7KL-Q_9IFESF9oiZ-Cxla93MTwImWNE0',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
