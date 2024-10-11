import { supabase } from './supabase';

async function grantPermissionsToTables() {
  console.log('Running grantPermissionsToTables()...');
  const grantPermissionsToTablesQuery = `
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO authenticated;
  `;

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: grantPermissionsToTablesQuery,
  });
  if (error) {
    console.error(
      'Error while running function grantPermissionsToTables():',
      error,
    );
  } else {
    console.log('"grantPermissionsToTables() result:', data);
  }
}

async function signUpOrLogIn(email: string, password: string) {
  console.log('Running signUpOrLogIn()...');
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  let user = data?.user;

  if (error) {
    if (error) {
      console.error('Error logging in:', error);
      return;
    }
  }

  console.log('User logged in:', user);
}

export function migrate() {
  console.log('Running migrate()...');
  (async () => {
    const supabaseUsername = process.env.EXPO_PUBLIC_SUPABASE_USERNAME;
    const supabasePassword = process.env.EXPO_PUBLIC_SUPABASE_PASSWORD;
    console.log('supabaseUsername:', supabaseUsername);
    console.log('supabasePassword:', supabasePassword);
    if (!supabaseUsername || !supabasePassword) {
      throw new Error('Missing SUPABASE_USERNAME or SUPABASE_PASSWORD');
    }
    console.log('signing in...');
    await signUpOrLogIn(supabaseUsername, supabasePassword);
  })();
}
