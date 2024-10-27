export type User = {
  id: number;
  username: string;
  password?: string | null;
};

export type Household = {
  id: number;
  name: string;
  code: string;
};

export type NewHousehold = Omit<Household, 'id'>;

export type Chore = {
  id: number;
  name: string;
  household_id: number;
  description: string;
  is_active: boolean;
  frequency: number;
  is_archived: boolean;
  voice_recording: string; // unsure if this is the correct type. will need to check
  image: string; // unsure if this is the correct type. will need to check
  weight: 1 | 2 | 4 | 6 | 8;
};

export type NewChore = Omit<
  Chore,
  'id' | 'is_active' | 'is_archived' | 'voice_recording' | 'image'
>;

export type Avatar = {
  id: number;
  name: string;
  emoji: string;
  colour_code: string;
};

export type User_To_Household = {
  user_id: number;
  household_id: number;
  avatar_id: number;
  nickname: string;
  is_active: boolean;
  is_admin: boolean;
};

export type Chore_To_User = {
  user_id: number;
  chore_id: number;
  is_completed: boolean;
  due_date?: Date | null;
  done_date?: Date | null;
};

export type PieDataItem = {
  value: number;
  color: string;
  emoji: string;
};
