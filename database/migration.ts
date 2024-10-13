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

export async function signUpOrLogIn(email: string, password: string) {
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

export async function addMockData() {
  const addMockDataQuery = `
  INSERT INTO household (name, code) VALUES ('Household 1', '1234');
  INSERT INTO household (name, code) VALUES ('Household 2', '5678');
  INSERT INTO account (user_name, hashed_password) VALUES ('Alice', '1234');
  INSERT INTO account (user_name, hashed_password) VALUES ('Bob', '5678');
  INSERT INTO avatar (name, image, colour_code) VALUES ('Avatar 1', 'image1', 'red');
  INSERT INTO avatar (name, image, colour_code) VALUES ('Avatar 2', 'image2', 'blue');
  INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES ('Chore 1', 'Description 1', 1, TRUE, 1, FALSE, 1);
  INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES ('Chore 2', 'Description 2', 1, TRUE, 2, FALSE, 2);
  INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES ('Chore 3', 'Description 3', 1, TRUE, 3, FALSE, 4);
  INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES ('Chore 4', 'Description 4', 1, TRUE, 4, FALSE, 6);
  INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES ('Chore 5', 'Description 5', 1, TRUE, 5, FALSE, 8);
  INSERT INTO chore_to_user (account_id, chore_id, is_completed, due_date, done_date) VALUES (1, 1, FALSE, '2021-01-01', NULL);
  INSERT INTO chore_to_user (account_id, chore_id, is_completed, due_date, done_date) VALUES (1, 2, FALSE, '2021-01-02', NULL);
  INSERT INTO chore_to_user (account_id, chore_id, is_completed, due_date, done_date) VALUES (1, 3, FALSE, '2021-01-03', NULL);
  INSERT INTO chore_to_user (account_id, chore_id, is_completed, due_date, done_date) VALUES (1, 4, FALSE, '2021-01-04', NULL);
  INSERT INTO chore_to_user (account_id, chore_id, is_completed, due_date, done_date) VALUES (1, 5, FALSE, '2021-01-05', NULL);
  INSERT INTO user_to_household (account_id, household_id, avatar_id, nickname, isActive, isAdmin) VALUES (1, 1, 1, 'Alice', TRUE, TRUE);
  INSERT INTO user_to_household (account_id, household_id, avatar_id, nickname, isActive, isAdmin) VALUES (1, 2, 2, 'Alice', TRUE, TRUE);
  INSERT INTO user_to_household (account_id, household_id, avatar_id, nickname, isActive, isAdmin) VALUES (2, 1, 1, 'Bob', TRUE, FALSE);
  INSERT INTO user_to_household (account_id, household_id, avatar_id, nickname, isActive, isAdmin) VALUES (2, 2, 2, 'Bob', TRUE, FALSE);
  `;
  const { data, error } = await supabase.rpc('execute_sql', {
    sql: addMockDataQuery,
  });
  if (error) {
    console.error('Error while running function addMockData():', error);
  } else {
    console.log('"addMockData() result:', data);
  }
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
    console.log('adding mock data...');
    await addMockData();
  })();
}
