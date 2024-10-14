import {
  Household,
  Chore,
  Account,
  Avatar,
  HouseholdUserProfile,
} from '../types/types';

export const mockedHouseholds: Household[] = [
  { id: 1, name: 'Svensson Family', code: 'A123', chores: [] },
  { id: 2, name: 'Johansson Family', code: 'B456', chores: [] },
  { id: 3, name: 'Nilsson Family', code: 'C789', chores: [] },
];

export const mockedChores: Chore[] = [
  {
    id: 1,
    name: 'Dishes',
    description: 'Wash the dishes',
    household: mockedHouseholds[0],
    is_active: true,
    frequency: 1,
    is_archived: false,
    weight: 2,
    voice_recording: '',
    image: '',
  },
  {
    id: 2,
    name: 'Laundry',
    description: 'Do the laundry',
    household: mockedHouseholds[0],
    is_active: false,
    frequency: 7,
    is_archived: true,
    weight: 4,
    voice_recording: '',
    image: '',
  },
  {
    id: 3,
    name: 'Vacuum',
    description: 'Vacuum the house',
    household: mockedHouseholds[1],
    is_active: true,
    frequency: 3,
    is_archived: false,
    weight: 6,
    voice_recording: '',
    image: '',
  },
  {
    id: 4,
    name: 'Trash',
    description: 'Take out the trash',
    household: mockedHouseholds[2],
    is_active: false,
    frequency: 1,
    is_archived: true,
    weight: 1,
    voice_recording: '',
    image: '',
  },
  {
    id: 5,
    name: 'Gardening',
    description: 'Water the plants',
    household: mockedHouseholds[1],
    is_active: true,
    frequency: 2,
    is_archived: false,
    weight: 4,
    voice_recording: '',
    image: '',
  },
  {
    id: 6,
    name: 'Cooking',
    description: 'Prepare dinner',
    household: mockedHouseholds[2],
    is_active: true,
    frequency: 1,
    is_archived: false,
    weight: 8,
    voice_recording: '',
    image: '',
  },
  {
    id: 7,
    name: 'Dusting',
    description: 'Dust the furniture',
    household: mockedHouseholds[0],
    is_active: false,
    frequency: 5,
    is_archived: true,
    weight: 2,
    voice_recording: '',
    image: '',
  },
  {
    id: 8,
    name: 'Mopping',
    description: 'Mop the floors',
    household: mockedHouseholds[1],
    is_active: true,
    frequency: 4,
    is_archived: false,
    weight: 4,
    voice_recording: '',
    image: '',
  },
  {
    id: 9,
    name: 'Windows',
    description: 'Clean the windows',
    household: mockedHouseholds[2],
    is_active: false,
    frequency: 6,
    is_archived: true,
    weight: 8,
    voice_recording: '',
    image: '',
  },
];

mockedHouseholds[0].chores = [
  mockedChores[0],
  mockedChores[1],
  mockedChores[7],
];
mockedHouseholds[1].chores = [
  mockedChores[2],
  mockedChores[4],
  mockedChores[8],
];
mockedHouseholds[2].chores = [
  mockedChores[3],
  mockedChores[5],
  mockedChores[6],
];

export const mockedAccounts: Account[] = [
  { id: 1, user_name: 'anna_svensson', hashed_password: 'hashed_password_1' },
  { id: 2, user_name: 'johan_johansson', hashed_password: 'hashed_password_2' },
  { id: 3, user_name: 'lisa_nilsson', hashed_password: 'hashed_password_3' },
  { id: 4, user_name: 'peter_svensson', hashed_password: 'hashed_password_4' },
  { id: 5, user_name: 'sara_johansson', hashed_password: 'hashed_password_5' },
];
export const mockedAvatars: Avatar[] = [
  {
    id: 1,
    name: 'Avatar1',
    image: '\\x89504e470d0a1a0a0000000d49484452',
    colour_code: '#FF5733',
  },
  {
    id: 2,
    name: 'Avatar2',
    image: '\\x89504e470d0a1a0a0000000d49484452',
    colour_code: '#33FF57',
  },
  {
    id: 3,
    name: 'Avatar3',
    image: '\\x89504e470d0a1a0a0000000d49484452',
    colour_code: '#3357FF',
  },
  {
    id: 4,
    name: 'Avatar4',
    image: '\\x89504e470d0a1a0a0000000d49484452',
    colour_code: '#FF33A1',
  },
  {
    id: 5,
    name: 'Avatar5',
    image: '\\x89504e470d0a1a0a0000000d49484452',
    colour_code: '#33A1FF',
  },
];

export const mockedHouseholdUserProfiles: HouseholdUserProfile[] = [
  {
    id: 1,
    nickname: 'Anna',
    household: mockedHouseholds[0],
    avatar: mockedAvatars[0],
    account: mockedAccounts[0],
    is_active: true,
    is_admin: true,
  },
  {
    id: 2,
    nickname: 'Johan',
    household: mockedHouseholds[1],
    avatar: mockedAvatars[1],
    account: mockedAccounts[1],
    is_active: true,
    is_admin: false,
  },
  {
    id: 3,
    nickname: 'Lisa',
    household: mockedHouseholds[2],
    avatar: mockedAvatars[2],
    account: mockedAccounts[2],
    is_active: false,
    is_admin: false,
  },
  {
    id: 4,
    nickname: 'Peter',
    household: mockedHouseholds[0],
    avatar: mockedAvatars[3],
    account: mockedAccounts[3],
    is_active: true,
    is_admin: false,
  },
  {
    id: 5,
    nickname: 'Sara',
    household: mockedHouseholds[1],
    avatar: mockedAvatars[4],
    account: mockedAccounts[4],
    is_active: false,
    is_admin: true,
  },
];

export const logMockedData = () => {
  console.log('Mocked data:');
  console.log('---------------------------------');
  console.log(' Accounts:');
  mockedAccounts.forEach((account) => {
    console.log('   Account id: ', account.id);
    console.log('   User name: ', account.user_name);
    console.log('   Hashed password: ', account.hashed_password);
    console.log(' ');
  });
  console.log('---------------------------------');
  console.log(' Avatars:');
  mockedAvatars.forEach((avatar) => {
    console.log('   Avatar id: ', avatar.id);
    console.log('   Name: ', avatar.name);
    console.log('   Image: ', avatar.image);
    console.log('   Colour code: ', avatar.colour_code);
    console.log(' ');
  });
  console.log('---------------------------------');
  console.log(' Chores:');
  mockedChores.forEach((chore) => {
    console.log('   Chore id: ', chore.id);
    console.log('   Name: ', chore.name);
    console.log('   Description: ', chore.description);
    console.log('   Household: ', chore.household.name);
    console.log('   Is active: ', chore.is_active);
    console.log('   Frequency: ', chore.frequency);
    console.log('   Is archived: ', chore.is_archived);
    console.log('   Voice recording: ', chore.voice_recording);
    console.log('   Image: ', chore.image);
    console.log('   Weight: ', chore.weight);
    console.log(' ');
  });
  console.log('---------------------------------');
  console.log(' Household user profiles:');
  mockedHouseholdUserProfiles.forEach((householdUserProfile) => {
    console.log('   Household user profile id: ', householdUserProfile.id);
    console.log('   Nickname: ', householdUserProfile.nickname);
    console.log('   Account: ', householdUserProfile.account.user_name);
    console.log('   Household: ', householdUserProfile.household.name);
    console.log('   Avatar: ', householdUserProfile.avatar.name);
    console.log('   Is active: ', householdUserProfile.is_active);
    console.log('   Is admin: ', householdUserProfile.is_admin);
    console.log(' ');
  });
  console.log('---------------------------------');
  console.log(' Households:');
  mockedHouseholds.forEach((household) => {
    console.log('   Household id: ', household.id);
    console.log('   Name: ', household.name);
    console.log('   Code: ', household.code);
    console.log('   Chores: ');
    household.chores.forEach((chore) => console.log('     ' + chore.name)),
      console.log(' ');
  });
  console.log('---------------------------------');
  console.log(' ');
};
