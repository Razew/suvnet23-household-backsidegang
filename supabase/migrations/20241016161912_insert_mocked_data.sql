-- Insert data into household table
INSERT INTO household (name, code) VALUES
('Svensson Family', 'SVNS'),
('Johansson Family', 'JHNS');

-- Insert data into chore table for household_id 1
INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES
('Vacuum Living Room', 'Vacuum the entire living room', 1, TRUE, 7, FALSE, 4), -- weekly
('Wash Dishes', 'Wash all the dirty dishes', 1, TRUE, 1, FALSE, 2), -- daily
('Mow Lawn', 'Mow the front and back lawn', 1, TRUE, 14, FALSE, 6), -- bi-weekly
('Laundry', 'Wash and fold all dirty clothes', 1, TRUE, 7, FALSE, 4), -- weekly
('Clean Bathroom', 'Clean the sink, toilet, and shower', 1, TRUE, 7, FALSE, 4), -- weekly
('Take Out Trash', 'Take out the trash and replace the bag', 1, TRUE, 1, FALSE, 2), -- daily
('Dust Furniture', 'Dust all the furniture in the house', 1, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Windows', 'Clean all the windows inside and out', 1, TRUE, 30, FALSE, 6), -- monthly
('Water Plants', 'Water all indoor and outdoor plants', 1, TRUE, 3, FALSE, 2), -- every 3 days
('Grocery Shopping', 'Buy groceries for the week', 1, TRUE, 7, FALSE, 4), -- weekly
('Cook Dinner', 'Prepare and cook dinner for the family', 1, TRUE, 1, FALSE, 4), -- daily
('Feed Pets', 'Feed the pets and refill their water', 1, TRUE, 1, FALSE, 2), -- daily
('Walk Dog', 'Take the dog for a walk', 1, TRUE, 1, FALSE, 4), -- daily
('Clean Fridge', 'Clean out the fridge and throw away old food', 1, TRUE, 30, FALSE, 4), -- monthly
('Organize Garage', 'Organize and clean the garage', 1, TRUE, 90, FALSE, 8), -- quarterly
('Clean Car', 'Wash and vacuum the car', 1, TRUE, 30, FALSE, 6), -- monthly
('Pay Bills', 'Pay all the household bills', 1, TRUE, 30, FALSE, 4), -- monthly
('Change Bed Sheets', 'Change and wash all bed sheets', 1, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Oven', 'Clean the inside of the oven', 1, TRUE, 90, FALSE, 6), -- quarterly
('Clean Microwave', 'Clean the inside of the microwave', 1, TRUE, 30, FALSE, 4), -- monthly
('Sweep Porch', 'Sweep the front and back porch', 1, TRUE, 7, FALSE, 2), -- weekly
('Clean Gutters', 'Clean out the gutters', 1, TRUE, 180, FALSE, 8), -- semi-annually
('Rake Leaves', 'Rake leaves in the yard', 1, TRUE, 30, FALSE, 6), -- monthly
('Shovel Snow', 'Shovel snow from the driveway and walkways', 1, TRUE, 1, FALSE, 6), -- daily
('Clean Basement', 'Clean and organize the basement', 1, TRUE, 90, FALSE, 8), -- quarterly
('Clean Attic', 'Clean and organize the attic', 1, TRUE, 180, FALSE, 8), -- semi-annually
('Wash Windows', 'Wash all windows inside and out', 1, TRUE, 60, FALSE, 6), -- bi-monthly
('Clean Deck', 'Clean and organize the deck', 1, TRUE, 30, FALSE, 6), -- monthly
('Clean Pool', 'Clean and maintain the pool', 1, TRUE, 7, FALSE, 6), -- weekly
('Clean BBQ Grill', 'Clean the BBQ grill', 1, TRUE, 30, FALSE, 4), -- monthly
('Sweep Driveway', 'Sweep the driveway and remove debris', 1, FALSE, 14, FALSE, 4), -- bi-weekly, is_active set to FALSE
('Organize Pantry', 'Organize and clean the pantry', 1, TRUE, 60, TRUE, 4), -- bi-monthly, is_archived set to TRUE
('Clean Patio Furniture', 'Clean and maintain patio furniture', 1, TRUE, 30, TRUE, 4), -- monthly, is_archived set to TRUE
('Wash Dog', 'Give the dog a bath', 1, TRUE, 30, FALSE, 4), -- monthly
('Clean Fireplace', 'Clean out the fireplace and dispose of ashes', 1, TRUE, 90, TRUE, 6), -- quarterly, is_archived set to TRUE
('Clean Garage', 'Clean and organize the garage', 1, FALSE, 90, FALSE, 8), -- quarterly, is_active set to FALSE
('Clean Attic', 'Clean and organize the attic', 1, TRUE, 180, TRUE, 8), -- semi-annually, is_archived set to TRUE
('Clean Basement', 'Clean and organize the basement', 1, FALSE, 90, FALSE, 8); -- quarterly, is_active set to FALSE

-- Insert data into chore table for household_id 2
INSERT INTO chore (name, description, household_id, is_active, frequency, is_archived, weight) VALUES
('Vacuum Living Room', 'Vacuum the entire living room', 2, TRUE, 7, FALSE, 4), -- weekly
('Wash Dishes', 'Wash all the dirty dishes', 2, TRUE, 1, FALSE, 2), -- daily
('Mow Lawn', 'Mow the front and back lawn', 2, TRUE, 14, FALSE, 6), -- bi-weekly
('Laundry', 'Wash and fold all dirty clothes', 2, TRUE, 7, FALSE, 4), -- weekly
('Clean Bathroom', 'Clean the sink, toilet, and shower', 2, TRUE, 7, FALSE, 4), -- weekly
('Take Out Trash', 'Take out the trash and replace the bag', 2, TRUE, 1, FALSE, 2), -- daily
('Dust Furniture', 'Dust all the furniture in the house', 2, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Windows', 'Clean all the windows inside and out', 2, TRUE, 30, FALSE, 6), -- monthly
('Water Plants', 'Water all indoor and outdoor plants', 2, TRUE, 3, FALSE, 2), -- every 3 days
('Grocery Shopping', 'Buy groceries for the week', 2, TRUE, 7, FALSE, 4), -- weekly
('Cook Dinner', 'Prepare and cook dinner for the family', 2, TRUE, 1, FALSE, 4), -- daily
('Feed Pets', 'Feed the pets and refill their water', 2, TRUE, 1, FALSE, 2), -- daily
('Walk Dog', 'Take the dog for a walk', 2, TRUE, 1, FALSE, 4), -- daily
('Clean Fridge', 'Clean out the fridge and throw away old food', 2, TRUE, 30, FALSE, 4), -- monthly
('Organize Garage', 'Organize and clean the garage', 2, TRUE, 90, FALSE, 8), -- quarterly
('Clean Car', 'Wash and vacuum the car', 2, TRUE, 30, FALSE, 6), -- monthly
('Pay Bills', 'Pay all the household bills', 2, TRUE, 30, FALSE, 4), -- monthly
('Change Bed Sheets', 'Change and wash all bed sheets', 2, TRUE, 14, FALSE, 4), -- bi-weekly
('Clean Oven', 'Clean the inside of the oven', 2, TRUE, 90, FALSE, 6), -- quarterly
('Clean Microwave', 'Clean the inside of the microwave', 2, TRUE, 30, FALSE, 4), -- monthly
('Sweep Porch', 'Sweep the front and back porch', 2, TRUE, 7, FALSE, 2), -- weekly
('Clean Gutters', 'Clean out the gutters', 2, TRUE, 180, FALSE, 8), -- semi-annually
('Rake Leaves', 'Rake leaves in the yard', 2, TRUE, 30, FALSE, 6), -- monthly
('Shovel Snow', 'Shovel snow from the driveway and walkways', 2, TRUE, 1, FALSE, 6), -- daily
('Clean Basement', 'Clean and organize the basement', 2, TRUE, 90, FALSE, 8), -- quarterly
('Clean Attic', 'Clean and organize the attic', 2, TRUE, 180, FALSE, 8), -- semi-annually
('Wash Windows', 'Wash all windows inside and out', 2, TRUE, 60, FALSE, 6), -- bi-monthly
('Clean Deck', 'Clean and organize the deck', 2, TRUE, 30, FALSE, 6), -- monthly
('Clean Pool', 'Clean and maintain the pool', 2, TRUE, 7, FALSE, 6), -- weekly
('Clean BBQ Grill', 'Clean the BBQ grill', 2, TRUE, 30, FALSE, 4), -- monthly
('Sweep Driveway', 'Sweep the driveway and remove debris', 2, FALSE, 14, FALSE, 4), -- bi-weekly, is_active set to FALSE
('Organize Pantry', 'Organize and clean the pantry', 2, TRUE, 60, TRUE, 4), -- bi-monthly, is_archived set to TRUE
('Clean Patio Furniture', 'Clean and maintain patio furniture', 2, TRUE, 30, TRUE, 4), -- monthly, is_archived set to TRUE
('Wash Dog', 'Give the dog a bath', 2, TRUE, 30, FALSE, 4), -- monthly
('Clean Fireplace', 'Clean out the fireplace and dispose of ashes', 2, TRUE, 90, TRUE, 6), -- quarterly, is_archived set to TRUE
('Clean Garage', 'Clean and organize the garage', 2, FALSE, 90, FALSE, 8), -- quarterly, is_active set to FALSE
('Clean Attic', 'Clean and organize the attic', 2, TRUE, 180, TRUE, 8), -- semi-annually, is_archived set to TRUE
('Clean Basement', 'Clean and organize the basement', 2, FALSE, 90, FALSE, 8); -- quarterly, is_active set to FALSE

-- -- Insert data into user table
INSERT INTO "user" (user_name, hashed_password) VALUES
('anna', 'hashed_password_1'),
('johan', 'hashed_password_2'),
('lisa', 'hashed_password_3'),
('peter', 'hashed_password_4'),
('sara', 'hashed_password_5'),
('erik', 'hashed_password_6'),
('maria', 'hashed_password_7'),
('karl', 'hashed_password_8'),
('olivia', 'hashed_password_9'),
('oscar', 'hashed_password_10'),
('emma', 'hashed_password_11'),
('lucas', 'hashed_password_12'),
('ella', 'hashed_password_13'),
('william', 'hashed_password_14'),
('alice', 'hashed_password_15'),
('alexander', 'hashed_password_16'),
('freja', 'hashed_password_17'),
('gustav', 'hashed_password_18'),
('elin', 'hashed_password_19'),
('henrik', 'hashed_password_20');

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

-- Insert data into user_to_household table
INSERT INTO user_to_household (nickname, household_id, avatar_id, user_id, is_active, is_admin) VALUES
-- Household 1
('anna', 1, 1, 1, TRUE, TRUE), -- is_admin set to TRUE
('johan', 1, 2, 2, TRUE, FALSE),
('lisa', 1, 3, 3, TRUE, FALSE),
('peter', 1, 4, 4, TRUE, FALSE),
('sara', 1, 5, 5, FALSE, FALSE), -- is_active set to FALSE
('erik', 1, 6, 6, TRUE, FALSE),
('maria', 1, 7, 7, FALSE, FALSE), -- is_active set to FALSE
('alexander', 1, 8, 16, TRUE, TRUE), -- is_admin set to TRUE

-- Household 2
('karl', 2, 1, 8, TRUE, TRUE), -- is_admin set to TRUE
('olivia', 2, 2, 9, TRUE, FALSE),
('oscar', 2, 3, 10, TRUE, FALSE),
('emma', 2, 4, 11, TRUE, FALSE),
('lucas', 2, 5, 12, TRUE, FALSE),
('ella', 2, 6, 13, TRUE, FALSE),
('william', 2, 7, 14, FALSE, FALSE), -- is_active set to FALSE
('alice', 2, 8, 15, TRUE, FALSE),

-- Users in both households
('freja', 1, 1, 17, TRUE, FALSE),
('freja', 2, 1, 17, TRUE, TRUE), -- is_admin set to TRUE for Household 2
('gustav', 1, 2, 18, TRUE, FALSE),
('gustav', 2, 2, 18, TRUE, FALSE),
('elin', 1, 3, 19, TRUE, FALSE),
('elin', 2, 3, 19, TRUE, FALSE),
('henrik', 1, 4, 20, TRUE, FALSE),
('henrik', 2, 4, 20, FALSE, FALSE); -- is_active set to FALSE for Household 2


-- Insert data into chore_to_user table
-- Insert data into chore_to_user table
INSERT INTO chore_to_user (user_id, chore_id, is_completed, due_date, done_date) VALUES
(1, 1, TRUE, '2024-10-01 08:00:00', '2024-10-01 10:00:00'),
(2, 2, FALSE, '2024-10-02 09:00:00', NULL),
(3, 3, TRUE, '2024-10-03 10:00:00', '2024-10-03 12:00:00'),
(4, 4, TRUE, '2024-10-04 11:00:00', '2024-10-04 13:00:00'),
(5, 5, FALSE, '2024-10-05 12:00:00', NULL),
(6, 6, TRUE, '2024-10-06 13:00:00', '2024-10-06 15:00:00'),
(7, 7, TRUE, '2024-10-07 14:00:00', '2024-10-07 16:00:00'),
(8, 8, FALSE, '2024-10-08 15:00:00', NULL),
(9, 9, TRUE, '2024-10-09 16:00:00', '2024-10-09 18:00:00'),
(10, 10, TRUE, '2024-10-10 17:00:00', '2024-10-10 19:00:00'),
(11, 11, FALSE, '2024-10-11 18:00:00', NULL),
(12, 12, TRUE, '2024-10-12 19:00:00', '2024-10-12 21:00:00'),
(13, 13, TRUE, '2024-10-13 20:00:00', '2024-10-13 22:00:00'),
(14, 14, FALSE, '2024-10-14 21:00:00', NULL),
(15, 15, TRUE, '2024-10-15 22:00:00', '2024-10-15 23:59:00'),
(16, 16, TRUE, '2024-10-16 23:00:00', '2024-10-17 01:00:00'),
(17, 17, FALSE, '2024-10-17 08:00:00', NULL),
(18, 18, TRUE, '2024-10-18 09:00:00', '2024-10-18 11:00:00'),
(19, 19, TRUE, '2024-10-19 10:00:00', '2024-10-19 12:00:00'),
(20, 20, FALSE, '2024-10-20 11:00:00', NULL),
(1, 21, TRUE, '2024-10-21 12:00:00', '2024-10-21 14:00:00'),
(2, 22, TRUE, '2024-10-22 13:00:00', '2024-10-22 15:00:00'),
(3, 23, FALSE, '2024-10-23 14:00:00', NULL),
(4, 24, TRUE, '2024-10-24 15:00:00', '2024-10-24 17:00:00'),
(5, 25, TRUE, '2024-10-25 16:00:00', '2024-10-25 18:00:00'),
(6, 26, FALSE, '2024-10-26 17:00:00', NULL),
(7, 27, TRUE, '2024-10-27 18:00:00', '2024-10-27 20:00:00'),
(8, 28, TRUE, '2024-10-28 19:00:00', '2024-10-28 21:00:00'),
(9, 29, FALSE, '2024-10-29 20:00:00', NULL),
(10, 30, TRUE, '2024-10-30 21:00:00', '2024-10-30 23:00:00'),
(11, 31, TRUE, '2024-10-31 22:00:00', '2024-10-31 23:59:00'),
(12, 32, FALSE, '2024-10-01 08:00:00', NULL),
(13, 33, TRUE, '2024-10-02 09:00:00', '2024-10-02 11:00:00'),
(14, 34, TRUE, '2024-10-03 10:00:00', '2024-10-03 12:00:00'),
(15, 35, FALSE, '2024-10-04 11:00:00', NULL),
(16, 36, TRUE, '2024-10-05 12:00:00', '2024-10-05 14:00:00'),
(17, 37, TRUE, '2024-10-06 13:00:00', '2024-10-06 15:00:00'),
(18, 38, FALSE, '2024-10-07 14:00:00', NULL),
(19, 39, TRUE, '2024-10-08 15:00:00', '2024-10-08 17:00:00'),
(20, 40, TRUE, '2024-10-09 16:00:00', '2024-10-09 18:00:00'),
(1, 41, FALSE, '2024-10-10 17:00:00', NULL),
(2, 42, TRUE, '2024-10-11 18:00:00', '2024-10-11 20:00:00'),
(3, 43, TRUE, '2024-10-12 19:00:00', '2024-10-12 21:00:00'),
(4, 44, FALSE, '2024-10-13 20:00:00', NULL),
(5, 45, TRUE, '2024-10-14 21:00:00', '2024-10-14 23:00:00'),
(6, 46, TRUE, '2024-10-15 22:00:00', '2024-10-15 23:59:00'),
(7, 47, FALSE, '2024-10-16 23:00:00', NULL),
(8, 48, TRUE, '2024-10-17 08:00:00', '2024-10-17 10:00:00'),
(9, 49, TRUE, '2024-10-18 09:00:00', '2024-10-18 11:00:00'),
(10, 50, FALSE, '2024-10-19 10:00:00', NULL),
(11, 51, TRUE, '2024-10-20 11:00:00', '2024-10-20 13:00:00'),
(12, 52, TRUE, '2024-10-21 12:00:00', '2024-10-21 14:00:00'),
(13, 53, FALSE, '2024-10-22 13:00:00', NULL),
(14, 54, TRUE, '2024-10-23 14:00:00', '2024-10-23 16:00:00'),
(15, 55, TRUE, '2024-10-24 15:00:00', '2024-10-24 17:00:00'),
(16, 56, FALSE, '2024-10-25 16:00:00', NULL),
(17, 57, TRUE, '2024-10-26 17:00:00', '2024-10-26 19:00:00'),
(18, 58, TRUE, '2024-10-27 18:00:00', '2024-10-27 20:00:00'),
(19, 59, FALSE, '2024-10-28 19:00:00', NULL),
(20, 60, TRUE, '2024-10-29 20:00:00', '2024-10-29 22:00:00'),
(1, 61, TRUE, '2024-10-30 21:00:00', '2024-10-30 23:00:00'),
(2, 62, FALSE, '2024-10-31 22:00:00', NULL),
(3, 63, TRUE, '2024-10-01 08:00:00', '2024-10-01 10:00:00'),
(4, 64, TRUE, '2024-10-02 09:00:00', '2024-10-02 11:00:00'),
(5, 65, FALSE, '2024-10-03 10:00:00', NULL),
(6, 66, TRUE, '2024-10-04 11:00:00', '2024-10-04 13:00:00'),
(7, 67, TRUE, '2024-10-05 12:00:00', '2024-10-05 14:00:00'),
(8, 68, FALSE, '2024-10-06 13:00:00', NULL),
(9, 69, TRUE, '2024-10-07 14:00:00', '2024-10-07 16:00:00'),
(10, 70, TRUE, '2024-10-08 15:00:00', '2024-10-08 17:00:00'),
(11, 71, FALSE, '2024-10-09 16:00:00', NULL),
(12, 72, TRUE, '2024-10-10 17:00:00', '2024-10-10 19:00:00'),
(13, 73, TRUE, '2024-10-11 18:00:00', '2024-10-11 20:00:00'),
(14, 74, FALSE, '2024-10-12 19:00:00', NULL),
(15, 75, TRUE, '2024-10-13 20:00:00', '2024-10-13 22:00:00'),
(16, 76, TRUE, '2024-10-14 21:00:00', '2024-10-14 23:00:00');
