CREATE TABLE household (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(4) NOT NULL UNIQUE -- Unique code for the household (0000-9999)
);

CREATE TABLE chore (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  household_id INTEGER,
  description VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT FALSE,
  frequency_days INTEGER NOT NULL, -- Frequency of the chore in days (e.g. every 7 days)
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  voice_recording BLOB, -- Binary data to store the actual file
  image BLOB, -- Binary data to store the actual file
  weight INTEGER NOT NULL CHECK (weight BETWEEN 1 AND 10), -- Weight of the chore (1-10)
  FOREIGN KEY (household_id) REFERENCES household(id) -- Many-to-One: Each chore belongs to one household
);

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  account_id INTEGER NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(id) -- Many-to-One: Each user can have one account
);

CREATE TABLE avatar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  image BLOB NOT NULL, -- Binary data to store the actual file
  colour_code VARCHAR(7) NOT NULL -- Represents colour codes like #FF5733
);

CREATE TABLE chore_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  completed BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if the chore is completed
  due_date DATE, -- The date the chore is due
  done_date DATE -- The date the chore was completed
);