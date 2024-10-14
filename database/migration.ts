import {
  createTablesQuery,
  createViewsQuery,
  dropTablesQuery,
  dropViewsQuery,
  insertMockDataQuery,
} from './queries';
import { supabase } from './supabase';

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
async function grantPermissionsToViews() {
  console.log('Running grantPermissionsToViews()...');
  const grantPermissionsToViewsQuery = `
    GRANT ALL PRIVILEGES ON ALL VIEWS IN SCHEMA public TO authenticated;
  `;

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: grantPermissionsToViewsQuery,
  });
  if (error) {
    console.error(
      'Error while running function grantPermissionsToViews():',
      error,
    );
  } else {
    console.log('"grantPermissionsToViews() result:', data);
  }
}

async function dropViews() {
  console.log('Running dropViews()...');
  await grantPermissionsToTables();
  await grantPermissionsToViews();

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: dropViewsQuery,
  });
  if (error) {
    console.error('Error while running function dropViews():', error);
  } else {
    console.log('"dropViews() result:', data);
  }
  await grantPermissionsToTables();
  await grantPermissionsToViews();
}
async function dropIndexesFromViews() {
  console.log('Running dropIndexesFromViews()...');
  await grantPermissionsToTables();
  await grantPermissionsToViews();

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: dropViewsQuery,
  });
  if (error) {
    console.error(
      'Error while running function dropIndexesFromViews():',
      error,
    );
  } else {
    console.log('"dropIndexesFromViews() result:', data);
  }
  await grantPermissionsToTables();
  await grantPermissionsToViews();
}

async function dropTables() {
  console.log('Running dropTables()...');
  await grantPermissionsToTables();
  await grantPermissionsToViews();

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: dropTablesQuery,
  });
  if (error) {
    console.error('Error while running function dropTables():', error);
  } else {
    console.log('"dropTables() result:', data);
  }
  await grantPermissionsToTables();
  await grantPermissionsToViews();
}

async function createViews() {
  console.log('Running createViews()...');
  await grantPermissionsToTables();
  await grantPermissionsToViews();

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: createViewsQuery,
  });
  if (error) {
    console.error('Error while running function createViews():', error);
  } else {
    console.log('"createViews() result:', data);
  }
  await grantPermissionsToTables();
  await grantPermissionsToViews();
}

async function createTables() {
  console.log('Running createTables()...');

  const { data, error } = await supabase.rpc('execute_sql', {
    sql: createTablesQuery,
  });
  if (error) {
    console.error('Error while running function createTables():', error);
  } else {
    console.log('"createTables() result:', data);
  }
  await grantPermissionsToTables();
  await grantPermissionsToViews();
}

export async function insertMockData() {
  console.log('Running insertMockData()...');
  const { data, error } = await supabase.rpc('execute_sql', {
    sql: insertMockDataQuery,
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
    await grantPermissionsToTables();
    await grantPermissionsToViews();
    await dropTables();
    await dropViews();
    await dropIndexesFromViews();
    await createTables();
    await createViews();
    await insertMockData();
  })();
}
