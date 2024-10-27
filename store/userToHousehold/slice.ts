import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User_To_Household as UserToHousehold } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface UsersToHouseholdsState {
  list: UserToHousehold[];
  current?: UserToHousehold;
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export const initialState: UsersToHouseholdsState = {
  list: [],
  current: undefined,
  errorMessage: undefined,
  loading: 'idle',
};

export type TableId = {
  avatarId: number;
  userId: number;
  currentHouseholdId: number;
};
export type NicknameAndIds = {
  nickname: string;
  userId: number;
  currentHouseholdId: number;
};

export const fetchUsersToHouseholds = createAppAsyncThunk<
  UserToHousehold[],
  void
>(
  'usersToHouseholds/fetchUsersToHouseholds',
  async (_, { rejectWithValue }) => {
    // console.log('Fetching users to households...');
    try {
      const { data: fetchedUsersToHouseholds, error } = await supabase
        .from('user_to_household')
        .select('*');
      // console.log('Fetched users to households:', fetchedUsersToHouseholds);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedUsersToHouseholds || fetchedUsersToHouseholds.length === 0) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      return fetchedUsersToHouseholds;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching user to household');
    }
  },
);

export const updateAvatarEmoji = createAppAsyncThunk(
  'usersToHouseholds/updateAvatarEmoji',
  async (
    { avatarId, userId, currentHouseholdId }: TableId,
    { rejectWithValue },
  ) => {
    try {
      const { error } = await supabase
        .from('user_to_household')
        .update({ avatar_id: avatarId })
        .match({ user_id: userId, household_id: currentHouseholdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return console.log('Avatar updated');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

export const updateNickname = createAppAsyncThunk(
  'usersToHouseholds/updateNickname',
  async (
    { nickname, userId, currentHouseholdId }: NicknameAndIds,
    { rejectWithValue },
  ) => {
    try {
      const { error } = await supabase
        .from('user_to_household')
        .update({ nickname })
        .match({ user_id: userId, household_id: currentHouseholdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return console.log('Nickname updated');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

export const togglePauseUser = createAppAsyncThunk(
  'usersToHouseholds/togglePauseUser',
  async (
    { userId, householdId }: { userId: number; householdId: number },
    { rejectWithValue },
  ) => {
    try {
      const { data: userToHousehold, error } = await supabase
        .from('user_to_household')
        .select('*')
        .match({ user_id: userId, household_id: householdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!userToHousehold || userToHousehold.length === 0) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      const updatedUserToHousehold = userToHousehold[0];
      const updatedIsActive = !updatedUserToHousehold.is_active;
      const { error: updateError } = await supabase
        .from('user_to_household')
        .update({ is_active: updatedIsActive })
        .match({ user_id: userId, household_id: householdId });

      if (updateError) {
        console.error('Supabase Error:', updateError);
        return rejectWithValue(updateError.message);
      }

      return console.log('User paused');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while pausing user');
    }
  },
);

export const kickUserFromHousehold = createAppAsyncThunk(
  'usersToHouseholds/kickUser',
  async ({ userId, householdId }: { userId: number; householdId: number }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('user_to_household')
        .delete()
        .match({ user_id: userId, household_id: householdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return console.log('User kicked');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while kicking user');
    }
  },
);

export const toggleAdmin = createAppAsyncThunk(
  'usersToHouseholds/toggleAdmin',
  async ({ userId, householdId }: { userId: number; householdId: number }, { rejectWithValue }) => {
    try {
      const { data: userToHousehold, error } = await supabase
        .from('user_to_household')
        .select('*')
        .match({ user_id: userId, household_id: householdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!userToHousehold || userToHousehold.length === 0) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      const updatedUserToHousehold = userToHousehold[0];
      const updatedIsAdmin = !updatedUserToHousehold.is_admin;
      const { error: updateError } = await supabase
        .from('user_to_household')
        .update({ is_admin: updatedIsAdmin })
        .match({ user_id: userId, household_id: householdId });

      if (updateError) {
        console.error('Supabase Error:', updateError);
        return rejectWithValue(updateError.message);
      }

      return console.log('Admin status updated');
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating admin status');
    }
  },
);

const usersToHouseholdsSlice = createSlice({
  name: 'usersToHouseholds',
  initialState: initialState,
  reducers: {
    setCurrentProfile(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersToHouseholds.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchUsersToHouseholds.fulfilled,
      (state, action: PayloadAction<UserToHousehold[]>) => {
        state.list = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchUsersToHouseholds.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const usersToHouseholdsReducer = usersToHouseholdsSlice.reducer;

// SELECTORS
export const selectUsersToHouseholds = (state: RootState) =>
  state.usersToHouseholds.list;
export const selectCurrentProfile = (state: RootState) =>
  state.usersToHouseholds.current;

export const { setCurrentProfile } = usersToHouseholdsSlice.actions;
