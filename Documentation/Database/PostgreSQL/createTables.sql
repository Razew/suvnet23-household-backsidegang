CREATE TABLE household (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(4) NOT NULL UNIQUE -- Unique code for the household (0000-9999)
);

CREATE TABLE chore (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  household_id INTEGER REFERENCES household(id), -- Many-to-One: Each chore belongs to one household
  description VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  frequency_days INTEGER NOT NULL, -- Frequency of the chore in days (e.g. every 7 days)
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  voice_recording BYTEA, -- Binary data to store the actual file
  image BYTEA, -- Binary data to store the actual file
  weight INTEGER NOT NULL CHECK (weight BETWEEN 1 AND 10) -- Weight of the chore (1-10)
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  account_id INTEGER NOT NULL REFERENCES account(id) -- Many-to-One: Each user can have one account
);

CREATE TABLE avatar (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image BYTEA NOT NULL, -- Binary data to store the actual file
  colour_code VARCHAR(7) NOT NULL -- Represents colour codes like #FF5733
);

CREATE TABLE chore_status (
  id SERIAL PRIMARY KEY,
  completed BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if the chore is completed
  due_date DATE, -- The date the chore is due
  done_date DATE -- The date the chore was completed
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE -- Defines the role name (e.g., admin, user)
);

CREATE TABLE chore_to_user_to_chore_status (
  user_id INTEGER NOT NULL REFERENCES "user"(id), -- Many-to-Many: Links to User table (user assigned to a chore)
  chore_id INTEGER NOT NULL REFERENCES chore(id) ON DELETE CASCADE, -- Many-to-Many: Links to Chore table (tracks which chore). Cascade delete on chore_id when chore is deleted to maintain referential integrity
  status_id INTEGER NOT NULL REFERENCES chore_status(id) -- Many-to-Many: Links to ChoreStatus (tracks chore's status)
);

CREATE TABLE user_to_household (
  user_id INTEGER NOT NULL REFERENCES "user"(id), -- Many-to-Many: Links a user to a household they belong to
  household_id INTEGER NOT NULL REFERENCES household(id), -- Many-to-Many: Links a household to users that belong to it
  role_id INTEGER NOT NULL REFERENCES role(id) -- Defines the role of the user within the household (e.g., admin or user)
);

CREATE TABLE user_to_avatar (
  user_id INTEGER NOT NULL REFERENCES "user"(id), -- Many-to-Many: Links a user to an avatar
  avatar_id INTEGER NOT NULL REFERENCES avatar(id) -- Many-to-Many: Links an avatar to users
);