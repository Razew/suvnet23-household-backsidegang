export type User = {
  id: number;
  username: string;
  password: string;
};

export type Household = {
  id: number;
  name: string;
  code: string;
};

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

export type Avatar = {
  id: number;
  name: string;
  emoji: string;
  colour_code: string;
};

export type User_To_Household = {
  id: number;
  user_id: number;
  household_id: number;
  avatar_id: number;
  nickname: string;
  is_active: boolean;
  is_admin: boolean;
};

export type Chore_To_User = {
  id: number;
  user_id: number;
  chore_id: number;
  is_complete: boolean;
  due_data: Date; // unsure if this is the correct type, maybe string? will need to check
  done_date: Date; // unsure if this is the correct type, maybe string? will need to check
};
