export type Account = {
  id: number;
  user_name: string;
  hashed_password: string;
};
export type Chore = {
  id: number;
  name: string;
  description: string;
  household: Household;
  is_active: boolean;
  frequency: number;
  is_archived: boolean;
  voice_recording: string;
  image: string;
  weight: 1 | 2 | 4 | 6 | 8;
};
export type Household = {
  id: number;
  name: string;
  code: string;
  chores: Chore[];
};
export type Avatar = {
  id: number;
  name: string;
  image: string;
  colour_code: string;
};

export type HouseholdUserProfile = {
  id: number;
  nickname: string;
  account: Account;
  household: Household;
  avatar: Avatar;
  is_active: boolean;
  is_admin: boolean;
};

export type ChoreStatus = {
  id: number;
  chore: Chore;
  user: HouseholdUserProfile;
  is_completed: boolean;
  due_date: Date;
  done_date: Date | null;
};
