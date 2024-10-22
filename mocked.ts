export interface Household {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  householdId: number;
  color: string;
  emoji: string;
}
const emojis = ['🐶', '🐱', '🐰', '🐼', '🦊'];
export interface Chore {
  id: number;
  name: string;
  householdId: number;
}

export interface CompletedChore {
  id: number;
  userId: number;
  choreId: number;
  date: string;
  name: string;
}

export const households: Household[] = [
  { id: 1, name: 'Smith Family' },
  { id: 2, name: 'Johnson Family' },
  { id: 3, name: 'Williams Family' },
  { id: 4, name: 'Brown Family' },
  { id: 5, name: 'Jones Family' },
];

const colors = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A1', // Pink
  '#FF8C33', // Orange
  '#8C33FF', // Purple
  '#33FFF5', // Cyan
  '#F5FF33', // Yellow
];

export const users: User[] = [
  // Smith Family Users
  {
    id: 1,
    name: 'John Smith',
    householdId: 1,
    color: colors[0],
    emoji: emojis[0],
  },
  {
    id: 2,
    name: 'Jane Smith',
    householdId: 1,
    color: colors[1],
    emoji: emojis[1],
  },
  {
    id: 3,
    name: 'Jimmy Smith',
    householdId: 1,
    color: colors[2],
    emoji: emojis[2],
  },
  {
    id: 4,
    name: 'Jenny Smith',
    householdId: 1,
    color: colors[3],
    emoji: emojis[3],
  },

  // Johnson Family Users
  {
    id: 5,
    name: 'Jack Johnson',
    householdId: 2,
    color: colors[4],
    emoji: emojis[4],
  },
  {
    id: 6,
    name: 'Jill Johnson',
    householdId: 2,
    color: colors[5],
    emoji: emojis[5],
  },
  {
    id: 7,
    name: 'Jerry Johnson',
    householdId: 2,
    color: colors[6],
    emoji: emojis[6],
  },
  {
    id: 8,
    name: 'Janet Johnson',
    householdId: 2,
    color: colors[7],
    emoji: emojis[7],
  },
  {
    id: 9,
    name: 'Jacob Johnson',
    householdId: 2,
    color: colors[0],
    emoji: emojis[0],
  },

  // Williams Family Users
  {
    id: 10,
    name: 'Will Williams',
    householdId: 3,
    color: colors[1],
    emoji: emojis[1],
  },
  {
    id: 11,
    name: 'Wendy Williams',
    householdId: 3,
    color: colors[2],
    emoji: emojis[2],
  },
  {
    id: 12,
    name: 'Wesley Williams',
    householdId: 3,
    color: colors[3],
    emoji: emojis[3],
  },
  {
    id: 13,
    name: 'Whitney Williams',
    householdId: 3,
    color: colors[4],
    emoji: emojis[4],
  },

  // Brown Family Users
  {
    id: 14,
    name: 'Bob Brown',
    householdId: 4,
    color: colors[5],
    emoji: emojis[5],
  },
  {
    id: 15,
    name: 'Barbara Brown',
    householdId: 4,
    color: colors[6],
    emoji: emojis[6],
  },
  {
    id: 16,
    name: 'Billy Brown',
    householdId: 4,
    color: colors[7],
    emoji: emojis[7],
  },
  {
    id: 17,
    name: 'Bella Brown',
    householdId: 4,
    color: colors[0],
    emoji: emojis[0],
  },
  {
    id: 18,
    name: 'Becky Brown',
    householdId: 4,
    color: colors[1],
    emoji: emojis[1],
  },

  // Jones Family Users
  {
    id: 19,
    name: 'James Jones',
    householdId: 5,
    color: colors[2],
    emoji: emojis[2],
  },
  {
    id: 20,
    name: 'Jenny Jones',
    householdId: 5,
    color: colors[3],
    emoji: emojis[3],
  },
  {
    id: 21,
    name: 'Jackie Jones',
    householdId: 5,
    color: colors[4],
    emoji: emojis[4],
  },
  {
    id: 22,
    name: 'Jordan Jones',
    householdId: 5,
    color: colors[5],
    emoji: emojis[5],
  },
];

export const chores: Chore[] = [
  { id: 1, name: '123456789012345', householdId: 1 },
  { id: 2, name: '123456789012', householdId: 1 },
  { id: 3, name: '123456789012345', householdId: 2 },
  { id: 4, name: 'Mow lawn', householdId: 2 },
  { id: 5, name: 'Take out trash', householdId: 3 },
  { id: 6, name: 'Clean garage', householdId: 3 },
  { id: 7, name: 'Dust shelves', householdId: 1 },
  { id: 8, name: 'Laundry', householdId: 1 },
  { id: 9, name: 'Clean windows', householdId: 2 },
  { id: 10, name: 'Water plants', householdId: 2 },
  { id: 11, name: 'Feed pets', householdId: 3 },
  { id: 12, name: 'Sweep porch', householdId: 3 },
  { id: 13, name: 'Clean bathroom', householdId: 1 },
  { id: 14, name: 'Organize closet', householdId: 1 },
  { id: 15, name: 'Wash car', householdId: 2 },
  { id: 16, name: 'Wash dishes', householdId: 4 },
  { id: 17, name: 'Vacuum room', householdId: 4 },
  { id: 18, name: 'Mow lawn', householdId: 4 },
  { id: 19, name: 'Take out trash', householdId: 4 },
  { id: 20, name: 'Clean attic', householdId: 4 },
  { id: 21, name: 'Wash dishes', householdId: 5 },
  { id: 22, name: 'Vacuum room', householdId: 5 },
  { id: 23, name: 'Mow lawn', householdId: 5 },
  { id: 24, name: 'Take out trash', householdId: 5 },
  { id: 25, name: 'Clean basement', householdId: 5 },
];

const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const getRandomUserId = (householdId: number) => {
  const householdUsers = users.filter(
    (user) => user.householdId === householdId,
  );
  const randomUser =
    householdUsers[Math.floor(Math.random() * householdUsers.length)];
  return randomUser.id;
};

export const completedChores: CompletedChore[] = [];

// Generate 10-15 completed chores per household
households.forEach((household) => {
  const householdChores = chores.filter(
    (chore) => chore.householdId === household.id,
  );
  const numCompletedChores = Math.floor(Math.random() * 6) + 10; // 10-15 completed chores

  for (let i = 0; i < numCompletedChores; i++) {
    const randomChore =
      householdChores[Math.floor(Math.random() * householdChores.length)];
    const randomUserId = getRandomUserId(household.id);
    const randomDate = getRandomDate(new Date(2023, 8, 1), new Date())
      .toISOString()
      .split('T')[0]; // Random date from September 1, 2023 to today

    completedChores.push({
      id: completedChores.length + 1,
      userId: randomUserId,
      choreId: randomChore.id,
      date: randomDate,
      name: randomChore.name,
    });
  }

  // Mock 4 completed chores for today
  const today = new Date().toISOString().split('T')[0];
  for (let i = 0; i < 4; i++) {
    const randomChore =
      householdChores[Math.floor(Math.random() * householdChores.length)];
    const randomUserId = getRandomUserId(household.id);

    completedChores.push({
      id: completedChores.length + 1,
      userId: randomUserId,
      choreId: randomChore.id,
      date: today,
      name: randomChore.name,
    });
  }

  // Mock 4 completed chores per day for the last week
  for (let daysAgo = 1; daysAgo <= 7; daysAgo++) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateString = date.toISOString().split('T')[0];

    for (let i = 0; i < 4; i++) {
      const randomChore =
        householdChores[Math.floor(Math.random() * householdChores.length)];
      const randomUserId = getRandomUserId(household.id);

      completedChores.push({
        id: completedChores.length + 1,
        userId: randomUserId,
        choreId: randomChore.id,
        date: dateString,
        name: randomChore.name,
      });
    }
  }
});
// Function to get chores data for the specified timespan
export const getChoresData = (
  timespan: string[],
  householdId: number,
): { user: string; completed: number }[] => {
  const choresInTimespan = completedChores.filter((chore) =>
    timespan.includes(chore.date),
  );

  const usersInHousehold = users.filter(
    (user) => user.householdId === householdId,
  );

  const userChoreCounts = usersInHousehold.map((user) => {
    const completed = choresInTimespan.filter(
      (chore) => chore.userId === user.id,
    ).length;
    return { user: user.name, completed };
  });

  return userChoreCounts;
};
