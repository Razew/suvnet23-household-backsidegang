# Submission 2 - The Household

In this submission, your group of 5 will create a native app using React Native (RN), Expo, and TypeScript. The application you are tasked with building is called The Household. Below is information about the application, including a list of requirements.

**Purpose**: Make it easier to coordinate and be reminded of household chores.  
**Target Audience**: Families, cohabitants, relatives.  
**Product Owner**: David Jensen.  
**Avatars**: 🦊 🐷 🐸 🐥 🐙 🐬 🦉 🦄

**Read through the entire assignment description carefully before you start.**

## Requirements List

\*: These requirements must be completed (20 in total).  
Total number of requirements: 40.  
Pass: 20 (50%).  
Distinction: 32 (80%).

### Requirements List (4)

- [ ] A logo, splash screen, and app icon should be designed and used. **Mandatory for G** \*  
- [ ] The application should be built with RN, Expo & TS. **Mandatory for G** \*  
- [ ] The design of the app should be based on existing sketches; exceptions can be made but must be discussed with the product owner, approved, and documented. **Mandatory for G** \*  
- [ ] Information should be communicated to and from a server. (VG)

### Household (7)

- [ ] A household should have a name and a generated (simple) code so others can join the household. The name should be editable. **Mandatory for G** \*  
- [ ] All users in a household should be able to see who belongs to the household.  
- [ ] An owner of a household should be able to see requests to join the household.  
- [ ] An owner should be able to accept or decline requests.  
- [ ] An owner should be able to make others owners.  
- [ ] An owner should be able to pause a user, and during paused periods, users should not be included in the statistics.  
- [ ] If a user has been paused during part of a period in the statistics, the graphs should be normalized.

### Account (5)

- [ ] A user should be able to register and log in. **Mandatory for G** \*  
- [ ] A user should be able to create a new household. **Mandatory for G** \*  
- [ ] A user should be able to join a household by entering the household's code. **Mandatory for G** \*  
- [ ] When a user has chosen to join a household, an owner of the household needs to approve the user first.  
- [ ] A user should be able to leave a household.

### Profile (6)

- [ ] A user should be able to enter their name. **Mandatory for G** \*  
- [ ] A user should be able to choose an avatar (emoji animal + color) from a predefined list. **Mandatory for G** \*  
- [ ] Chosen avatars should not be selectable by other users in the household. **Mandatory for G** \*  
- [ ] The avatar should be used in the app to show what the user has done. **Mandatory for G** \*  
- [ ] A user should be able to set the app's appearance (dark, light, auto).  
- [ ] If a user belongs to two or more households, they should be able to switch between the different households.

### Chores (6)

- [ ] An owner should be able to add chores to be done in the home. **Mandatory for G** \*  
- [ ] A chore should have a name, a description (text), how often it should be done (days), and a weight that describes how energy-consuming it is. **Mandatory for G** \*  
- [ ] A user should be able to add a voice recording and a picture to further describe the chore.  
- [ ] An owner should be able to edit a chore. **Mandatory for G** \*  
- [ ] An owner should be able to delete a chore.  
- [ ] When a chore is deleted, the user should receive a warning that all statistics related to the chore will also be deleted and be given the option to archive the chore instead.

### Daily View (3)

- [ ] All chores should be listed in a daily view and provide an overview of what needs to be done. **Mandatory for G** \*  
- [ ] In addition to the chore's name, it should also show who has done the chore, how many days since the chore was last done, and if it is overdue. **Mandatory for G** \*  
- [ ] When a user selects a chore, the description of the chore should be displayed, and it should be possible to mark the chore as done with a simple tap. **Mandatory for G** \*

### Statistics (6)

- [ ] A user should be able to see the distribution of completed chores among the users in their household. **Mandatory for G** \*  
- [ ] Each statistics view should show the total distribution (including the weights of the chores) as well as the distribution of each individual chore. **Mandatory for G** \* 
- [ ] There should be a statistics view for the "current week." **Mandatory for G** \*  
- [ ] There should be a statistics view for the "previous week."  
- [ ] There should be a statistics view for the "previous month."

If there are no statistics for one of the views, that view should not be displayed.

### Scheduling (3)

- [ ] An owner should be able to assign and remove chores from users in the household.  
- [ ] Users should be able to see the assigned chores in their interface.  
- [ ] An owner should be able to create groups of chores that are automatically assigned to users in the household and rotated based on an interval in days.

## Submission

- [ ] To pass this assignment, you MUST use GIT and GitHub.  
- [ ] The submission is done as usual via the learning platform. In your project folder, there should be (in addition to all code):
  - [ ] a README.md file. It should contain a title, a description of the project, information on how to build and run the project, and which requirements are met.  
  - [ ] Also, include a .git folder so I can find your public repo.

## Presentation

The presentation is divided into three parts. The first part is a pitch of about 2-3 minutes where you should try to sell your solutions and design choices. The second part is a demo of the application. Finally, you should reflect on the project. Each group has about 20 minutes.

## Review & Individual Reflection

At the end of the course, you will review each other's work and submit an individual reflection. You will receive more information on how this will be conducted later on.

# Requirements for Pass

- [ ] The mandatory requirements from the list above are met.  
- [ ] Git & GitHub have been used.  
- [ ] The project folder contains a README.md file (see above for more info).  
- [ ] The assignment is submitted on time!  
- [ ] An oral presentation is conducted.

# Requirements for Distinction:

- [ ] All points for a pass are met.  
- [ ] You have used CI/CD during the project.  
- [ ] The application communicates data to and from a backend service (of your choice) using Redux & redux-thunk.

# G Requirements (20)

### General (3)

- [ ] A logo, splash screen, and app icon should be designed and used. **Mandatory for G** \*  
- [ ] The application should be built with RN, Expo & TS. **Mandatory for G** \*  
- [ ] The design of the app should be based on existing sketches; exceptions can be made but must be discussed with the product owner, approved, and documented. **Mandatory for G** \*

### Household (1)

- [ ] A household should have a name and a generated (simple) code so others can join the household. The name should be editable. **Mandatory for G** \*

### Account (3)

- [ ] A user should be able to register and log in. **Mandatory for G** \*  
- [ ] A user should be able to create a new household. **Mandatory for G** \*  
- [ ] A user should be able to join a household by entering the household's code. **Mandatory for G** \*

### Profile (4)

- [ ] A user should be able to enter their name. **Mandatory for G** \*  
- [ ] A user should be able to choose an avatar (emoji animal + color) from a predefined list. **Mandatory for G** \*  
- [ ] Chosen avatars should not be selectable by other users in the household. **Mandatory for G** \*  
- [ ] The avatar should be used in the app to show what the user has done. **Mandatory for G** \*

### Chores (3)

- [ ] An owner should be able to add chores to be done in the home. **Mandatory for G** \*  
- [ ] A chore should have a name, a description (text), how often it should be done (days), and a weight that describes how energy-consuming it is. **Mandatory for G** \*  
- [ ] An owner should be able to edit a chore. **Mandatory for G** \*

### Daily View (3)

- [ ] All chores should be listed in a daily view and provide an overview of what needs to be done. **Mandatory for G** \*  
- [ ] In addition to the chore's name, it should also show who has done the chore, how many days since the chore was last done, and if it is overdue. **Mandatory for G** \*  
- [ ] When a user selects a chore, the description of the chore should be displayed, and it should be possible to mark the chore as done with a simple tap. **Mandatory for G** \*

### Statistics (3)

- [ ] A user should be able to see the distribution of completed chores among the users in their household. **Mandatory for G** \*  
- [ ] Each statistics view should show the total distribution (including the weights of the chores) as well as the distribution of each individual chore. **Mandatory for G** \*  
- [ ] There should be a statistics view for the "current week." **Mandatory for G** \*
