# Requirements

## G Requirements (20)

### General (3)

- [x] 1. A logo, splash screen, and app icon should be designed and used.
- [x] 2. The application should be built with RN, Expo & TS.
- [x] 3. The design of the app should be based on existing sketches; exceptions can be made but must be discussed with the product owner, approved, and documented.

### Household (1)

- [x] 4. A household should have a name and a generated (simple) code so others can join the household; the name should be editable.

### Account (3)

- [x] 5. A user should be able to register and log in.
- [x] 6. A user should be able to create a new household.
- [ ] 7. A user should be able to join a household by entering the household’s code.

### Profile (4)

- [x] 8. A user should be able to enter their name.
- [x] 9. A user should be able to choose an avatar (emoji animal + color) from a predefined list.
- [x] 10. Chosen avatars should not be selectable by other users in the household.
- [x] 11. The avatar should be used in the app to show what the user has done.

### Chores (3)

- [x] 12. An owner should be able to add chores to be done in the home.
- [x] 13. A chore should have a name, a description (text), how often it should be done (days), and a weight that describes how energy-consuming it is.
- [x] 14. An owner should be able to edit a chore.

### Daily View (3)

- [x] 15. All chores should be listed in a daily view and provide an overview of what needs to be done.
- [x] 16. In addition to the chore’s name, it should also show who has done the chore, how many days since the chore was last done, and if it is overdue.
- [x] 17. When a user selects a chore, the description of the chore should be displayed, and it should be possible to mark the chore as done with a simple tap.

### Statistics (3)

- [x] 18. A user should be able to see the distribution of completed chores among the users in their household.
- [x] 19. Each statistics view should show the total distribution (including the weights of the chores) as well as the distribution of each individual chore.
- [x] 20. There should be a statistics view for the “current week.”

---

## VG Requirements (20)

### General (1)

- [x] 1. Information should be communicated to and from a server.

### Household (6)

- [x] 2. All users in a household should be able to see who belongs to the household.
- [ ] 3. An owner of a household should be able to see requests to join the household.
- [ ] 4. An owner should be able to accept or decline requests.
- [x] 5. An owner should be able to make others owners.
- [x] 6. An owner should be able to pause a user, and during paused periods, users should not be included in the statistics.
- [ ] 7. If a user has been paused during part of a period in the statistics, the graphs should be normalized.

### Account (2)

- [ ] 8. When a user has chosen to join a household, an owner of the household needs to approve the user first.
- [x] 9. A user should be able to leave a household.

### Profile (2)

- [x] 10. A user should be able to set the app’s appearance (dark, light, auto).
- [x] 11. If a user belongs to two or more households, they should be able to switch between the different households.

### Chores (3)

- [ ] 12. A user should be able to add a voice recording and a picture to further describe the chore.
- [x] 13. An owner should be able to delete a chore.
- [x] 14. When a chore is deleted, the user should receive a warning that all statistics related to the chore will also be deleted and be given the option to archive the chore instead.

### Daily View (0)

- _(No additional VG requirements listed in this section)_

### Statistics (3)

- [x] 15. There should be a statistics view for the “previous week.”
- [x] 16. There should be a statistics view for the “previous month.”
- [x] 17. If there are no statistics for one of the views, that view should not be displayed.

### Scheduling (3)

- [ ] 18. An owner should be able to assign and remove chores from users in the household.
- [ ] 19. Users should be able to see the assigned chores in their interface.
- [ ] 20. An owner should be able to create groups of chores that are automatically assigned to users in the household and rotated based on an interval in days.
