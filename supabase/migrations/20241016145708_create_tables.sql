CREATE TABLE
IF NOT EXISTS household
(
    id SERIAL PRIMARY KEY,
    name VARCHAR
(64) NOT NULL, 
    code VARCHAR
(4) NOT NULL,
    -- CONSTRAINT unique_name_code UNIQUE (name, code),  -- Ensure that the combination of name and code is unique
    CONSTRAINT code_length CHECK
(LENGTH
(code) = 4)  -- Ensure that the code is exactly 4 characters long
);

CREATE TABLE
IF NOT EXISTS chore
(
    id SERIAL PRIMARY KEY,
    name VARCHAR
(15) NOT NULL,
    description VARCHAR
(255),
    household_id INTEGER REFERENCES household
(id), -- Many-to-One: Each chore belongs to one household. INTEGER is used here because household_id is a foreign key referencing the id column in the household table, which is of type SERIAL (INTEGER).
    is_active BOOLEAN DEFAULT TRUE,
    frequency INTEGER NOT NULL, -- Frequency of the chore in days (e.g. every 7 days). Is frequency_days more meaningful?
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    voice_recording BYTEA, -- Binary data to store the actual file
    image BYTEA, -- Binary data to store the actual file
    weight INTEGER NOT NULL CHECK
(weight IN
(1, 2, 4, 6, 8)) -- Weight of the chore. Constraint: weight should be one of 1, 2, 4, 6, 8
);

CREATE TABLE
IF NOT EXISTS "user"
(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR
(64) NOT NULL UNIQUE,
    hashed_password VARCHAR
(64) NOT NULL
);

CREATE TABLE
IF NOT EXISTS avatar
(
    id SERIAL PRIMARY KEY,
    name VARCHAR
(64) NOT NULL UNIQUE,
    emoji VARCHAR NOT NULL UNIQUE, -- Store the emoji as text
    colour_code VARCHAR
(7) NOT NULL -- Represents colour codes like #FF5733
);

CREATE TABLE
IF NOT EXISTS chore_to_user
(
    user_id INTEGER NOT NULL REFERENCES "user"
(id), -- Many-to-Many: Links to User table (user assigned to a chore)
    chore_id INTEGER NOT NULL REFERENCES chore
(id) ON
DELETE CASCADE, -- Many-to-Many: Links to Chore table (tracks which chore). Cascade delete on chore_id when chore is deleted to maintain referential integrity
    is_completed BOOLEAN
NOT NULL DEFAULT FALSE, -- Indicates if the chore is completed
    due_date DATE, -- The date the chore is due
    done_date DATE, -- The date the chore was completed
    -- PRIMARY KEY (user_id, chore_id) -- Composite primary key to ensure uniqueness of the combination of user_id and chore_id
);

CREATE TABLE
IF NOT EXISTS user_to_household
(
    nickname VARCHAR
(64) NOT NULL,
    household_id INTEGER NOT NULL REFERENCES household
(id), -- Many-to-Many: Links a household to users that belong to it
    avatar_id INTEGER NOT NULL REFERENCES avatar
(id), -- Many-to-Many: Links an avatar to users
    user_id INTEGER NOT NULL REFERENCES "user"
(id), -- Many-to-Many: Links a user to a household they belong to
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY
(household_id, avatar_id, user_id) -- Composite primary key to ensure uniqueness of the combination of household_id, avatar_id, and user_id
    UNIQUE
(household_id, user_id) -- Additional constraint to ensure uniqueness of the household_id and avatar_id combination
);