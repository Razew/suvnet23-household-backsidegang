import { supabase } from './supabase';

async function dropTables() {
  console.log('Running dropTables()...');
  await grantPermissionsToTables();

  const dropTablesQuery = `
  DROP TABLE IF EXISTS user_to_household;
  DROP TABLE IF EXISTS chore_to_user;
  DROP TABLE IF EXISTS chore;
  DROP TABLE IF EXISTS household;
  DROP TABLE IF EXISTS account;
  DROP TABLE IF EXISTS avatar;
  `;

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: dropTablesQuery,
  });
  if (error) {
    console.error('Error while running function dropTables():', error);
  } else {
    console.log('"dropTables() result:', data);
  }
}

async function createTables() {
  console.log('Running createTables()...');
  const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS household (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS chore (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      household_id serial REFERENCES household(id),
      is_active BOOLEAN DEFAULT TRUE,
      frequency INTEGER,
      is_archived BOOLEAN DEFAULT FALSE,
      weight INTEGER NOT NULL CHECK (weight IN (1, 2, 4, 6, 8))
  );
  CREATE TABLE IF NOT EXISTS account (
      id SERIAL PRIMARY KEY,
      user_name TEXT NOT NULL,
      hashed_password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS avatar (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image bytea NOT NULL,
      colour_code TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS chore_to_user (
      account_id INTEGER REFERENCES account(id),
      chore_id INTEGER REFERENCES chore(id),
      is_completed BOOLEAN DEFAULT FALSE,
      due_date TIMESTAMP,
      done_date TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS user_to_household (
      account_id INTEGER REFERENCES account(id),
      household_id INTEGER REFERENCES household(id),
      avatar_id INTEGER REFERENCES avatar(id),
      nickname TEXT,
      isActive BOOLEAN DEFAULT TRUE,
      isAdmin BOOLEAN DEFAULT FALSE
  );
  `;

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: createTablesQuery,
  });
  if (error) {
    console.error('Error while running function createTables():', error);
  } else {
    console.log('"createTables() result:', data);
  }
  await grantPermissionsToTables();
}

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
    console.log('dropping tables...');
    await dropTables();
    console.log('creating tables...');
    await createTables();
  })();
}
