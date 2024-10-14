export const dropTablesQuery = `
    -- Drop user_to_household table
    DROP TABLE IF EXISTS user_to_household;

    -- Drop chore_to_user table
    DROP TABLE IF EXISTS chore_to_user;

    -- Drop avatar table
    DROP TABLE IF EXISTS avatar;

    -- Drop account table
    DROP TABLE IF EXISTS account;

    -- Drop user table
    DROP TABLE IF EXISTS "user";

    -- Drop chore table
    DROP TABLE IF EXISTS chore;

    -- Drop household table
    DROP TABLE IF EXISTS household;
`;

export const dropViewsQuery = `
    DROP VIEW IF EXISTS incomplete_chores_view;
    DROP VIEW IF EXISTS completed_chores_view;
    DROP VIEW IF EXISTS active_chores_view;
    DROP VIEW IF EXISTS chores_by_household_view;
    DROP VIEW IF EXISTS households_with_chores_view;
`;

export const dropIndexesFromViewsQuery = `
    DROP INDEX IF EXISTS idx_chore_household_id;
    DROP INDEX IF EXISTS idx_chore_to_user_chore_id;
    DROP INDEX IF EXISTS idx_chore_to_user_due_date;
    DROP INDEX IF EXISTS idx_chore_to_user_is_completed;
    DROP INDEX IF EXISTS idx_user_id;

    -- Drop indexes from completed_chores_view
    DROP INDEX IF EXISTS idx_chore_household_id;
    DROP INDEX IF EXISTS idx_chore_to_user_chore_id;
    DROP INDEX IF EXISTS idx_chore_to_user_is_completed;
    DROP INDEX IF EXISTS idx_user_id;

    -- Drop indexes from active_chores_view
    DROP INDEX IF EXISTS idx_chore_household_id;
    DROP INDEX IF EXISTS idx_chore_to_user_chore_id;
    DROP INDEX IF EXISTS idx_chore_is_active;
    DROP INDEX IF EXISTS idx_user_id;

    -- Drop indexes from chores_by_household_view
    DROP INDEX IF EXISTS idx_chore_household_id;
    DROP INDEX IF EXISTS idx_chore_to_user_chore_id;
    DROP INDEX IF EXISTS idx_chore_to_user_due_date;
    DROP INDEX IF EXISTS idx_user_id;

    -- Drop indexes from households_with_chores_view
    DROP INDEX IF EXISTS idx_chore_household_id;

    -- Drop indexes from user_to_household table
    DROP INDEX IF EXISTS idx_user_to_household_household_id;
    DROP INDEX IF EXISTS idx_user_to_household_avatar_id;
    DROP INDEX IF EXISTS idx_user_to_household_user_id;
    DROP INDEX IF EXISTS idx_user_to_household_is_active;
    DROP INDEX IF EXISTS idx_user_to_household_is_admin;

    -- Drop indexes from chore_to_user table
    DROP INDEX IF EXISTS idx_chore_to_user_user_id;
    DROP INDEX IF EXISTS idx_chore_to_user_chore_id;
    DROP INDEX IF EXISTS idx_chore_to_user_is_completed;
    DROP INDEX IF EXISTS idx_chore_to_user_due_date;

    -- Drop indexes from avatar table
    DROP INDEX IF EXISTS idx_avatar_name;
    DROP INDEX IF EXISTS idx_avatar_colour_code;

    -- Drop indexes from account table
    DROP INDEX IF EXISTS idx_account_user_name;

    -- Drop indexes from user table
    DROP INDEX IF EXISTS idx_user_user_name;

    -- Drop indexes from chore table
    DROP INDEX IF EXISTS idx_chore_household_id;
    DROP INDEX IF EXISTS idx_chore_is_active;
    DROP INDEX IF EXISTS idx_chore_is_archived;

    -- Drop indexes from household table
    DROP INDEX IF EXISTS idx_household_name;
    DROP INDEX IF EXISTS idx_household_code;
`;

export const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS household (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64) NOT NULL UNIQUE,  -- Unique name for the household
        code VARCHAR(4) NOT NULL UNIQUE  -- Unique code for the household. Consider indexing to speed up queries
    );

    -- Create indexes for household table
    CREATE INDEX IF NOT EXISTS idx_household_name ON household(name); -- Index on name to speed up queries involving household name
    CREATE INDEX IF NOT EXISTS idx_household_code ON household(code); -- Index on code to speed up queries involving household code

    CREATE TABLE IF NOT EXISTS chore (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        description VARCHAR(255),
        household_id INTEGER REFERENCES household(id), -- Many-to-One: Each chore belongs to one household. INTEGER is used here because household_id is a foreign key referencing the id column in the household table, which is of type SERIAL (INTEGER).
        is_active BOOLEAN DEFAULT TRUE,
        frequency INTEGER NOT NULL, -- Frequency of the chore in days (e.g. every 7 days). Is frequency_days more meaningful?
        is_archived BOOLEAN NOT NULL DEFAULT FALSE,
        voice_recording BYTEA, -- Binary data to store the actual file
        image BYTEA, -- Binary data to store the actual file
        weight INTEGER NOT NULL CHECK (weight IN (1, 2, 4, 6, 8)) -- Weight of the chore. Constraint: weight should be one of 1, 2, 4, 6, 8
    );

    -- Create indexes for chore table
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_chore_is_active ON chore(is_active); -- Index on is_active to speed up queries filtering active chores
    CREATE INDEX IF NOT EXISTS idx_chore_is_archived ON chore(is_archived); -- Index on is_archived to speed up queries filtering archived chores

    CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(64) NOT NULL,
        hashed_password VARCHAR(64) NOT NULL
    );

    -- Create indexes for user table
    CREATE INDEX IF NOT EXISTS idx_user_user_name ON "user"(user_name); -- Index on user_name to speed up queries involving user names

    CREATE TABLE IF NOT EXISTS account (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(64) NOT NULL,
        hashed_password VARCHAR(255) NOT NULL
    );

    -- Create indexes for account table
    CREATE INDEX IF NOT EXISTS idx_account_user_name ON account(user_name); -- Index on user_name to speed up queries involving account user names

    CREATE TABLE IF NOT EXISTS avatar (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        image BYTEA NOT NULL, -- Binary data to store the actual file
        colour_code VARCHAR(7) NOT NULL -- Represents colour codes like #FF5733
    );

    -- Create indexes for avatar table
    CREATE INDEX IF NOT EXISTS idx_avatar_name ON avatar(name); -- Index on name to speed up queries involving avatar names
    CREATE INDEX IF NOT EXISTS idx_avatar_colour_code ON avatar(colour_code); -- Index on colour_code to speed up queries involving avatar colour codes

    CREATE TABLE IF NOT EXISTS chore_to_user (
        user_id INTEGER NOT NULL REFERENCES "user"(id), -- Many-to-Many: Links to User table (user assigned to a chore)
        chore_id INTEGER NOT NULL REFERENCES chore(id) ON DELETE CASCADE, -- Many-to-Many: Links to Chore table (tracks which chore). Cascade delete on chore_id when chore is deleted to maintain referential integrity
        is_completed BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if the chore is completed
        due_date TIMESTAMP, -- The date the chore is due
        done_date TIMESTAMP, -- The date the chore was completed
        PRIMARY KEY (user_id, chore_id) -- Composite primary key to ensure uniqueness of the combination of user_id and chore_id
    );

    -- Create indexes for chore_to_user table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_user_id ON chore_to_user(user_id); -- Index on user_id to speed up joins with user table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_chore_id ON chore_to_user(chore_id); -- Index on chore_id to speed up joins with chore table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_is_completed ON chore_to_user(is_completed); -- Index on is_completed to speed up queries filtering completed chores
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_due_date ON chore_to_user(due_date); -- Index on due_date to speed up queries involving due dates

    CREATE TABLE IF NOT EXISTS user_to_household (
        nickname VARCHAR(64) NOT NULL,
        household_id INTEGER NOT NULL REFERENCES household(id), -- Many-to-Many: Links a household to users that belong to it
        avatar_id INTEGER NOT NULL REFERENCES avatar(id), -- Many-to-Many: Links an avatar to users
        user_id INTEGER NOT NULL REFERENCES "user"(id), -- Many-to-Many: Links a user to a household they belong to
        is_active BOOLEAN DEFAULT TRUE,
        is_admin BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (household_id, avatar_id, user_id) -- Composite primary key to ensure uniqueness of the combination of household_id, avatar_id, and user_id
    );

    -- Create indexes for user_to_household table
    CREATE INDEX IF NOT EXISTS idx_user_to_household_household_id ON user_to_household(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_user_to_household_avatar_id ON user_to_household(avatar_id); -- Index on avatar_id to speed up joins with avatar table
    CREATE INDEX IF NOT EXISTS idx_user_to_household_user_id ON user_to_household(user_id); -- Index on user_id to speed up joins with user table
    CREATE INDEX IF NOT EXISTS idx_user_to_household_is_active ON user_to_household(is_active); -- Index on is_active to speed up queries filtering active users
    CREATE INDEX IF NOT EXISTS idx_user_to_household_is_admin ON user_to_household(is_admin); -- Index on is_admin to speed up queries filtering admin users
`;

export const createViewsQuery = `
    -- Create a view to list all chores with their household names and household IDs
    CREATE VIEW households_with_chores_view AS
    SELECT
        c.id AS chore_id,
        c.name AS chore_name,
        c.description,
        c.is_active,
        c.frequency,
        c.is_archived,
        c.weight,
        h.id AS household_id,
        h.name AS household_name
    FROM
        chore c
    JOIN
        household h ON c.household_id = h.id;

    -- Create indexes for households_with_chores_view
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table

    -- Create a view to list all chores by household, ordered by due date
    CREATE VIEW chores_by_household_view AS
    SELECT
        c.id AS chore_id,
        c.name AS chore_name,
        c.description,
        c.is_active,
        c.frequency,
        c.is_archived,
        c.weight,
        cu.due_date, -- Include due date
        u.id AS user_id, -- Include user ID
        u.user_name, -- Include user name
        h.id AS household_id,
        h.name AS household_name
    FROM
        chore c
    JOIN
        household h ON c.household_id = h.id 
    JOIN
        chore_to_user cu ON c.id = cu.chore_id -- Join with chore_to_user to get due date
    JOIN
        "user" u ON cu.user_id = u.id          -- Join with user to get user info
    ORDER BY
        h.id, cu.due_date; -- Order by household ID and due date

    -- Create indexes for chores_by_household_view
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_chore_id ON chore_to_user(chore_id); -- Index on chore_id to speed up joins with chore table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_due_date ON chore_to_user(due_date); -- Index on due_date to speed up ordering by due date
    CREATE INDEX IF NOT EXISTS idx_user_id ON "user"(id); -- Index on user_id to speed up joins with user table

    -- Create a view to list all active chores with due date and user info
    CREATE VIEW active_chores_view AS
    SELECT
        c.id AS chore_id,
        c.name AS chore_name,
        c.description,
        c.frequency,
        c.weight,
        cu.due_date, -- Include due date
        u.id AS user_id, -- Include user ID
        u.user_name, -- Include user name
        h.id AS household_id,
        h.name AS household_name
    FROM
        chore c
    JOIN
        household h ON c.household_id = h.id 
    JOIN
        chore_to_user cu ON c.id = cu.chore_id -- Join with chore_to_user to get due date
    JOIN
        "user" u ON cu.user_id = u.id          -- Join with user to get user info
    WHERE
        c.is_active = TRUE;

    -- Create indexes for active_chores_view
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_chore_id ON chore_to_user(chore_id); -- Index on chore_id to speed up joins with chore table
    CREATE INDEX IF NOT EXISTS idx_chore_is_active ON chore(is_active); -- Index on is_active to speed up filtering active chores
    CREATE INDEX IF NOT EXISTS idx_user_id ON "user"(id); -- Index on user_id to speed up joins with user table

    -- Create a view to list all completed chores with their completion dates
    CREATE VIEW completed_chores_view AS
    SELECT
        c.id AS chore_id,
        c.name AS chore_name,
        cu.done_date,
        u.user_name,
        h.id AS household_id,
        h.name AS household_name
    FROM
        chore c
    JOIN
        chore_to_user cu ON c.id = cu.chore_id -- Join chores with chore_to_user based on chore_id
    JOIN
        "user" u ON cu.user_id = u.id          -- Join users with chore_to_user based on user_id
    JOIN
        household h ON c.household_id = h.id   -- Join households with chores based on household_id
    WHERE
        cu.is_completed = TRUE;                -- Filter to include only completed chores

    -- Create indexes for completed_chores_view
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_chore_id ON chore_to_user(chore_id); -- Index on chore_id to speed up joins with chore table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_is_completed ON chore_to_user(is_completed); -- Index on is_completed to speed up filtering completed chores
    CREATE INDEX IF NOT EXISTS idx_user_id ON "user"(id); -- Index on user_id to speed up joins with user table

    -- Create a view to list all upcoming incomplete tasks for all families
    CREATE VIEW incomplete_chores_view AS
    SELECT
        c.id AS chore_id,
        c.name AS chore_name,
        c.description,
        cu.due_date,
        h.id AS household_id,
        h.name AS household_name,
        u.user_name
    FROM
        chore c
    JOIN
        chore_to_user cu ON c.id = cu.chore_id -- Join chores with chore_to_user based on chore_id
    JOIN
        household h ON c.household_id = h.id   -- Join households with chores based on household_id
    JOIN
        "user" u ON cu.user_id = u.id          -- Join users with chore_to_user based on user_id
    WHERE
        cu.is_completed = FALSE                -- Filter to include only incomplete tasks
        AND cu.due_date > CURRENT_TIMESTAMP;   -- Filter to include only upcoming tasks

    -- Create indexes for incomplete_chores_view
    CREATE INDEX IF NOT EXISTS idx_chore_household_id ON chore(household_id); -- Index on household_id to speed up joins with household table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_chore_id ON chore_to_user(chore_id); -- Index on chore_id to speed up joins with chore table
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_due_date ON chore_to_user(due_date); -- Index on due_date to speed up filtering by due date
    CREATE INDEX IF NOT EXISTS idx_chore_to_user_is_completed ON chore_to_user(is_completed); -- Index on is_completed to speed up filtering incomplete chores
    CREATE INDEX IF NOT EXISTS idx_user_id ON "user"(id); -- Index on user_id to speed up joins with user table
`;

export const insertMockDataQuery = `
    -- Insert data into household table
    INSERT INTO household (name, code) VALUES
    ('Svensson Family', 'A123'),
    ('Johansson Family', 'B456'),
    ('Nilsson Family', 'C789');

    -- Insert data into chore table
    INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES
    ('Dishes', 'Wash the dishes', 1, TRUE, 1, FALSE, 2),
    ('Laundry', 'Do the laundry', 1, FALSE, 7, TRUE, 4),
    ('Vacuum', 'Vacuum the house', 2, TRUE, 3, FALSE, 6),
    ('Trash', 'Take out the trash', 3, FALSE, 1, TRUE, 1),
    ('Gardening', 'Water the plants', 2, TRUE, 2, FALSE, 4),
    ('Cooking', 'Prepare dinner', 3, TRUE, 1, FALSE, 8),
    ('Dusting', 'Dust the furniture', 1, FALSE, 5, TRUE, 2),
    ('Mopping', 'Mop the floors', 2, TRUE, 4, FALSE, 4),
    ('Windows', 'Clean the windows', 3, FALSE, 6, TRUE, 8);

    -- Insert data into user table
    INSERT INTO "user" (user_name, hashed_password) VALUES
    ('anna_svensson', 'hashed_password_1'),
    ('johan_johansson', 'hashed_password_2'),
    ('lisa_nilsson', 'hashed_password_3'),
    ('peter_svensson', 'hashed_password_4'),
    ('sara_johansson', 'hashed_password_5');

    -- Insert data into account table
    INSERT INTO account (user_name, hashed_password) VALUES
    ('anna_svensson', 'hashed_password_1'),
    ('johan_johansson', 'hashed_password_2'),
    ('lisa_nilsson', 'hashed_password_3'),
    ('peter_svensson', 'hashed_password_4'),
    ('sara_johansson', 'hashed_password_5');

    -- Insert data into avatar table
    INSERT INTO avatar (name, image, colour_code) VALUES
    ('Avatar1', '\\x89504e470d0a1a0a0000000d49484452', '#FF5733'),
    ('Avatar2', '\\x89504e470d0a1a0a0000000d49484452', '#33FF57'),
    ('Avatar3', '\\x89504e470d0a1a0a0000000d49484452', '#3357FF'),
    ('Avatar4', '\\x89504e470d0a1a0a0000000d49484452', '#FF33A1'),
    ('Avatar5', '\\x89504e470d0a1a0a0000000d49484452', '#33A1FF');

    -- Insert data into chore_to_user table
    INSERT INTO chore_to_user (user_id, chore_id, is_completed, due_date, done_date) VALUES
    (1, 1, FALSE, '2023-10-01 10:00:00', NULL),
    (2, 2, TRUE, '2023-10-02 10:00:00', '2023-10-02 18:00:00'),
    (3, 3, FALSE, '2023-10-03 10:00:00', NULL),
    (4, 4, TRUE, '2023-10-04 10:00:00', '2023-10-04 12:00:00'),
    (5, 5, FALSE, '2023-10-05 10:00:00', NULL),
    (1, 6, TRUE, '2023-10-06 10:00:00', '2023-10-06 19:00:00'),
    (2, 7, FALSE, '2023-10-07 10:00:00', NULL),
    (3, 8, TRUE, '2023-10-08 10:00:00', '2023-10-08 20:00:00'),
    (4, 9, FALSE, '2023-10-09 10:00:00', NULL);

    -- Insert data into user_to_household table
    INSERT INTO user_to_household (nickname, household_id, avatar_id, user_id, is_active, is_admin) VALUES
    ('Anna', 1, 1, 1, TRUE, TRUE),
    ('Johan', 2, 2, 2, TRUE, FALSE),
    ('Lisa', 3, 3, 3, FALSE, FALSE),
    ('Peter', 1, 4, 4, TRUE, FALSE),
    ('Sara', 2, 5, 5, FALSE, TRUE);
`;
