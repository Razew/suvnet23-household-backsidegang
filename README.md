# Hushållet

## Project Description

**Hushållet** is a React Native application developed to help households coordinate chores and keep track of task completion in a shared environment. Targeting families, cohabitants, and relatives, this app allows users to create or join households, manage chore assignments, and track progress through individual and group statistics. By centralizing household tasks, **Hushållet** encourages smoother cooperation and accountability among members.

### Key Features

- **User and Household Management**: Users can register, create households, and join existing households through a unique code.
- **Personalization**: Users can set their display name, select unique avatars, and customize the app’s appearance.
- **Chore Management**: Owners can add, edit, delete, or archive chores, with details on frequency, energy expenditure, and descriptions.
- **Daily View and Statistics**: A daily overview of chores with user-specific completion stats, offering a detailed breakdown by day, week, and month.

## Requirements Met

The following requirements have been successfully implemented:

### General

- Designed and integrated a **logo**, **splash screen**, and **app icon**.
- Built the application using **React Native**, **Expo**, and **TypeScript**.
- **Design** follows the approved sketches with minor modifications.

### Household

- A household has a **name** and **generated code** for others to join.
- All members in a household can view other members.
- Owners can **pause a user** (paused users are excluded from statistics).

### Account

- Users can **register** and **log in**.
- Users can **create a new household**.
- Users can **join a household** using a household code.

### Profile

- Users can **set their name** and **choose a unique avatar**.
- Selected avatars are **not available** to other members within the household.
- Users can customize the app appearance (dark, light, auto).
- Members of multiple households can **switch between households**.

### Chores

- Owners can **add chores** with details such as name, description, frequency, and energy level.
- Owners can **edit** or **delete chores**.
- Upon chore deletion, users receive a warning with an option to archive instead.

### Daily View

- Displays a **daily list** of chores with information on completion status, assigned members, and overdue tasks.
- Users can **mark chores as done** with a tap, which updates the status.

### Statistics

- Statistics show a **distribution of chores completed** by each member, considering the weights assigned to chores.
- **Current week, previous week, and previous month** statistics views are available.

### Development and Deployment

- **Git and GitHub** were used to track progress and manage code collaboratively.
- **CI/CD** tools were integrated to streamline development and deployment.
- Data communication between app and server was implemented with **Redux** and **redux-thunk**.

## How to Build and Run the Project

### Prerequisites

- **Node.js** (version 14 or higher)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Git** for version control

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Razew/suvnet23-household-backsidegang.git
   cd hushållet
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   expo start
   ```
   - Use the Expo Go app on your device or an emulator to preview the app.

### Running on a Device

1. Install the **Expo Go app** on your iOS or Android device.
2. After running `expo start`, scan the QR code from your terminal or the Expo DevTools page.

### Building for Production

To create a production build, follow the steps on [Expo's documentation for building standalone apps](https://docs.expo.dev/distribution/building-standalone-apps/).

## Additional Information

This project meets all requirements needed for a passing grade, including additional requirements like CI/CD integration and backend communication.
