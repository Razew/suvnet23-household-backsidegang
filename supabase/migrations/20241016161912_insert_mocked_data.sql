-- Insert data into household table
INSERT INTO household (name, code) VALUES
('Svensson Family', 'SVNS'),
('Johansson Family', 'JHNS');

-- Insert data into chore table for household_id 1
INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES
('Vacuum Room', 'Vacuum the entire living room', 1, TRUE, 7, FALSE, 4), -- weekly
('Wash Dishes', 'Wash all the dirty dishes', 1, TRUE, 1, FALSE, 2), -- daily
('Mow Lawn', 'Mow the front and back lawn', 1, TRUE, 14, FALSE, 6), -- bi-weekly
('Laundry', 'Wash and fold all dirty clothes', 1, TRUE, 7, FALSE, 4), -- weekly
('Clean Bathrm', 'Clean the sink, toilet, and shower', 1, TRUE, 7, FALSE, 4), -- weekly
('Take Trash', 'Take out the trash and replace the bag', 1, TRUE, 1, FALSE, 2), -- daily
('Dust Furnitr', 'Dust all the furniture in the house', 1, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Windws', 'Clean all the windows inside and out', 1, TRUE, 30, FALSE, 6), -- monthly
('Water Plants', 'Water all indoor and outdoor plants', 1, TRUE, 3, FALSE, 2), -- every 3 days
('Grocery Shop', 'Buy groceries for the week', 1, TRUE, 7, FALSE, 4), -- weekly
('Cook Dinner', 'Prepare and cook dinner for the family', 1, TRUE, 1, FALSE, 4), -- daily
('Feed Pets', 'Feed the pets and refill their water', 1, TRUE, 1, FALSE, 2), -- daily
('Walk Dog', 'Take the dog for a walk', 1, TRUE, 1, FALSE, 4), -- daily
('Clean Fridge', 'Clean out the fridge and throw away old food', 1, TRUE, 30, FALSE, 4), -- monthly
('Organize Gar', 'Organize and clean the garage', 1, TRUE, 90, FALSE, 8), -- quarterly
('Clean Car', 'Wash and vacuum the car', 1, TRUE, 30, FALSE, 6), -- monthly
('Pay Bills', 'Pay all the household bills', 1, TRUE, 30, FALSE, 4), -- monthly
('Change Sheets', 'Change and wash all bed sheets', 1, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Oven', 'Clean the inside of the oven', 1, TRUE, 90, FALSE, 6), -- quarterly
('Clean Micro', 'Clean the inside of the microwave', 1, TRUE, 30, FALSE, 4), -- monthly
('Sweep Porch', 'Sweep the front and back porch', 1, TRUE, 7, FALSE, 2), -- weekly
('Clean Gutters', 'Clean out the gutters', 1, TRUE, 180, FALSE, 8), -- semi-annually
('Rake Leaves', 'Rake leaves in the yard', 1, TRUE, 30, FALSE, 6), -- monthly
('Shovel Snow', 'Shovel snow from the driveway and walkways', 1, TRUE, 1, FALSE, 6), -- daily
('Clean Basemt', 'Clean and organize the basement', 1, TRUE, 90, FALSE, 8), -- quarterly
('Clean Attic', 'Clean and organize the attic', 1, TRUE, 180, FALSE, 8), -- semi-annually
('Wash Windows', 'Wash all windows inside and out', 1, TRUE, 60, FALSE, 6), -- bi-monthly
('Clean Deck', 'Clean and organize the deck', 1, TRUE, 30, FALSE, 6), -- monthly
('Clean Pool', 'Clean and maintain the pool', 1, TRUE, 7, FALSE, 6), -- weekly
('Clean Grill', 'Clean the BBQ grill', 1, TRUE, 30, FALSE, 4), -- monthly
('Sweep Drive', 'Sweep the driveway and remove debris', 1, FALSE, 14, FALSE, 4), -- bi-weekly
('Org. Pantry', 'Organize and clean the pantry', 1, TRUE, 60, TRUE, 4), -- bi-monthly, is_archived set to TRUE
('Clean Patio', 'Clean and maintain patio furniture', 1, TRUE, 30, TRUE, 4), -- monthly, is_archived set to TRUE
('Wash Dog', 'Give the dog a bath', 1, TRUE, 30, FALSE, 4), -- monthly
('Clean Firepl', 'Clean out the fireplace and dispose of ashes', 1, TRUE, 90, TRUE, 6), -- quarterly, is_archived set to TRUE
('Clean Garage', 'Clean and organize the garage', 1, FALSE, 90, FALSE, 8), -- quarterly, is_active set to FALSE
('Clean Attic', 'Clean and organize the attic', 1, TRUE, 180, TRUE, 8), -- semi-annually, is_archived set to TRUE
('Clean Basemt', 'Clean and organize the basement', 1, FALSE, 90, FALSE, 8); -- quarterly, is_active set to FALSE

-- Insert data into chore table for household_id 2
INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES
('Vacuum Room', 'Vacuum the entire living room', 2, TRUE, 7, FALSE, 4), -- weekly
('Wash Dishes', 'Wash all the dirty dishes', 2, TRUE, 1, FALSE, 2), -- daily
('Mow Lawn', 'Mow the front and back lawn', 2, TRUE, 14, FALSE, 6), -- bi-weekly
('Laundry', 'Wash and fold all dirty clothes', 2, TRUE, 7, FALSE, 4), -- weekly
('Clean Bathrm', 'Clean the sink, toilet, and shower', 2, TRUE, 7, FALSE, 4), -- weekly
('Take Trash', 'Take out the trash and replace the bag', 2, TRUE, 1, FALSE, 2), -- daily
('Dust Furnitr', 'Dust all the furniture in the house', 2, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Windws', 'Clean all the windows inside and out', 2, TRUE, 30, FALSE, 6), -- monthly
('Water Plants', 'Water all indoor and outdoor plants', 2, TRUE, 3, FALSE, 2), -- every 3 days
('Grocery Shop', 'Buy groceries for the week', 2, TRUE, 7, FALSE, 4), -- weekly
('Cook Dinner', 'Prepare and cook dinner for the family', 2, TRUE, 1, FALSE, 4), -- daily
('Feed Pets', 'Feed the pets and refill their water', 2, TRUE, 1, FALSE, 2), -- daily
('Walk Dog', 'Take the dog for a walk', 2, TRUE, 1, FALSE, 4), -- daily
('Clean Fridge', 'Clean out the fridge and throw away old food', 2, TRUE, 30, FALSE, 4), -- monthly
('Organize Gar', 'Organize and clean the garage', 2, TRUE, 90, FALSE, 8), -- quarterly
('Clean Car', 'Wash and vacuum the car', 2, TRUE, 30, FALSE, 6), -- monthly
('Pay Bills', 'Pay all the household bills', 2, TRUE, 30, FALSE, 4), -- monthly
('Change Sheets', 'Change and wash all bed sheets', 2, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Oven', 'Clean the inside of the oven', 2, TRUE, 90, FALSE, 6), -- quarterly
('Clean Micro', 'Clean the inside of the microwave', 2, TRUE, 30, FALSE, 4), -- monthly
('Sweep Porch', 'Sweep the front and back porch', 2, TRUE, 7, FALSE, 2), -- weekly
('Clean Gutters', 'Clean out the gutters', 2, TRUE, 180, FALSE, 8), -- semi-annually
('Rake Leaves', 'Rake leaves in the yard', 2, TRUE, 30, FALSE, 6), -- monthly
('Shovel Snow', 'Shovel snow from the driveway and walkways', 2, TRUE, 1, FALSE, 6), -- daily
('Clean Basemt', 'Clean and organize the basement', 2, TRUE, 90, FALSE, 8), -- quarterly
('Clean Attic', 'Clean and organize the attic', 2, TRUE, 180, FALSE, 8), -- semi-annually
('Wash Windows', 'Wash all windows inside and out', 2, TRUE, 60, FALSE, 6), -- bi-monthly
('Clean Deck', 'Clean and organize the deck', 2, TRUE, 30, FALSE, 6), -- monthly
('Clean Pool', 'Clean and maintain the pool', 2, TRUE, 7, FALSE, 6), -- weekly
('Clean Grill', 'Clean the BBQ grill', 2, TRUE, 30, FALSE, 4), -- monthly
('Sweep Drive', 'Sweep the driveway and remove debris', 2, FALSE, 14, FALSE, 4), -- bi-weekly
('Org. Pantry', 'Organize and clean the pantry', 2, TRUE, 60, TRUE, 4), -- bi-monthly, is_archived set to TRUE
('Clean Patio', 'Clean and maintain patio furniture', 2, TRUE, 30, TRUE, 4), -- monthly, is_archived set to TRUE
('Wash Dog', 'Give the dog a bath', 2, TRUE, 30, FALSE, 4), -- monthly
('Clean Firepl', 'Clean out the fireplace and dispose of ashes', 2, TRUE, 90, TRUE, 6), -- quarterly, is_archived set to TRUE
('Clean Garage', 'Clean and organize the garage', 2, FALSE, 90, FALSE, 8), -- quarterly, is_active set to FALSE
('Clean Attic', 'Clean and organize the attic', 2, TRUE, 180, TRUE, 8), -- semi-annually, is_archived set to TRUE
('Clean Basemt', 'Clean and organize the basement', 2, FALSE, 90, FALSE, 8); -- quarterly, is_active set to FALSE

-- Insert data into avatar table
INSERT INTO avatar (name, emoji, colour_code) VALUES
('Fox', '🦊', '#FFA500'),
('Pig', '🐷', '#FFD3B0'),
('Frog', '🐸', '#00FF00'),
('Chicken', '🐥', '#FFFF00'),
('Octopus', '🐙', '#FF605D'),
('Dolphin', '🐬', '#0000FF'),
('Owl', '🦉', '#964B00'),
('Unicorn', '🦄', '#BF40BF');

-- Insert data into user table
INSERT INTO "user" (user_name, hashed_password) VALUES
('anna', '12345678'),
('johan', '12345678'),
('lisa', '12345678'),
('peter', '12345678'),
('sara', '12345678'),
('erik', '12345678');

-- Insert data into user_to_household table
INSERT INTO user_to_household (nickname, household_id, avatar_id, user_id, is_active, is_admin) VALUES
-- Household 1
('anna_banana', 1, 1, 1, TRUE, TRUE), -- is_admin set to TRUE
('jojo', 1, 2, 2, TRUE, FALSE),
('lil_lisa', 1, 3, 3, TRUE, FALSE),

-- Household 2
('pete', 2, 4, 4, TRUE, FALSE),
('sassy_sara', 2, 1, 5, TRUE, TRUE), -- is_admin set to TRUE
('erik_the_red', 2, 6, 6, TRUE, FALSE),

-- Users in both households
('sassy_sara', 1, 5, 5, TRUE, FALSE),
('erik_the_red', 1, 8, 6, TRUE, FALSE);

-- Insert data into chore_to_user table
INSERT INTO chore_to_user (user_id, chore_id, is_completed, due_date, done_date) VALUES
(1, 1, TRUE, '2024-10-01', '2024-10-01'),
(2, 2, FALSE, '2024-10-02', NULL),
(3, 3, TRUE, '2024-10-03', '2024-10-03'),
(4, 4, TRUE, '2024-10-04', '2024-10-04'),
(5, 5, FALSE, '2024-10-05', NULL),
(6, 6, TRUE, '2024-10-06', '2024-10-06'),
(1, 7, TRUE, '2024-10-07', '2024-10-07'),
(2, 8, FALSE, '2024-10-08', NULL),
(3, 9, TRUE, '2024-10-09', '2024-10-09'),
(4, 10, TRUE, '2024-10-10', '2024-10-10'),
(5, 11, FALSE, '2024-10-11', NULL),
(6, 12, TRUE, '2024-10-12', '2024-10-12'),
(1, 13, TRUE, '2024-10-13', '2024-10-13'),
(2, 14, FALSE, '2024-10-14', NULL),
(3, 15, TRUE, '2024-10-15', '2024-10-15'),
(4, 16, TRUE, '2024-10-16', '2024-10-17'),
(5, 17, FALSE, '2024-10-17', NULL),
(6, 18, TRUE, '2024-10-18', '2024-10-18'),
(1, 19, TRUE, '2024-10-19', '2024-10-19'),
(2, 20, FALSE, '2024-10-20', NULL),
(3, 21, TRUE, '2024-10-21', '2024-10-21'),
(4, 22, TRUE, '2024-10-22', '2024-10-22'),
(5, 23, FALSE, '2024-10-23', NULL),
(6, 24, TRUE, '2024-10-24', '2024-10-24'),
(1, 25, TRUE, '2024-10-24', NULL),
(6, 26, FALSE, '2024-10-26', NULL),
(1, 27, TRUE, '2024-10-27', '2024-10-27'),
(2, 28, TRUE, '2024-10-28', '2024-10-28'),
(3, 29, FALSE, '2024-10-29', NULL),
(4, 30, TRUE, '2024-10-30', '2024-10-30'),
(5, 31, TRUE, '2024-10-31', '2024-10-31'),
(6, 32, FALSE, '2024-10-01', NULL),
(1, 33, TRUE, '2024-10-02', '2024-10-02'),
(2, 34, TRUE, '2024-10-03', '2024-10-03'),
(3, 35, FALSE, '2024-10-04', NULL),
(4, 36, TRUE, '2024-10-05', '2024-10-05'),
(5, 37, TRUE, '2024-10-06', '2024-10-06'),
(6, 38, FALSE, '2024-10-07', NULL),
(1, 39, TRUE, '2024-10-08', '2024-10-08'),
(2, 40, TRUE, '2024-10-09', '2024-10-09'),
(3, 41, FALSE, '2024-10-10', NULL),
(4, 42, TRUE, '2024-10-11', '2024-10-11'),
(5, 43, TRUE, '2024-10-12', '2024-10-12'),
(6, 44, FALSE, '2024-10-13', NULL),
(1, 45, TRUE, '2024-10-14', '2024-10-14'),
(2, 46, TRUE, '2024-10-15', '2024-10-15'),
(3, 47, FALSE, '2024-10-16', NULL),
(4, 48, TRUE, '2024-10-17', '2024-10-17'),
(5, 49, TRUE, '2024-10-18', '2024-10-18'),
(6, 50, FALSE, '2024-10-19', NULL),
(1, 51, TRUE, '2024-10-20', '2024-10-20'),
(2, 52, TRUE, '2024-10-21', '2024-10-21'),
(3, 53, FALSE, '2024-10-22', NULL),
(4, 54, TRUE, '2024-10-23', '2024-10-23'),
(5, 55, TRUE, '2024-10-24', '2024-10-24'),
(6, 56, FALSE, '2024-10-25', NULL),
(1, 57, TRUE, '2024-10-26', '2024-10-26'),
(2, 58, TRUE, '2024-10-27', '2024-10-27'),
(3, 59, FALSE, '2024-10-28', NULL),
(4, 60, TRUE, '2024-10-29', '2024-10-29'),
(5, 61, TRUE, '2024-10-30', '2024-10-30'),
(6, 62, FALSE, '2024-10-31', NULL),
(1, 63, TRUE, '2024-10-01', '2024-10-01'),
(2, 64, TRUE, '2024-10-02', '2024-10-02'),
(3, 65, FALSE, '2024-10-03', NULL),
(4, 66, TRUE, '2024-10-04', '2024-10-04');
