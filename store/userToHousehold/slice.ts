import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User_To_Household as UserToHousehold } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface UsersToHouseholdsState {
  list: UserToHousehold[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UsersToHouseholdsState = {
  list: [],
  errorMessage: undefined,
  loading: 'idle',
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

export const updateAvatarEmoji = createAppAsyncThunk<
  UserToHousehold,
  { avatarId: number; userId: number }
>(
  'usersToHouseholds/updateAvatarEmoji',
  async ({ avatarId, userId }, { rejectWithValue }) => {
    try {
      const { data: updatedUserToHousehold, error } = await supabase
        .from('user_to_household')
        .update({ avatar_id: avatarId })
        .match({ user_id: userId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (updatedUserToHousehold === null) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      return updatedUserToHousehold[0];
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

export const updateNickname = createAppAsyncThunk<
  UserToHousehold,
  { nickname: string; userId: number; currentHouseholdId: number }
>(
  'usersToHouseholds/updateNickname',
  async ({ nickname, userId, currentHouseholdId }, { rejectWithValue }) => {
    try {
      const { data: updatedUserToHousehold, error } = await supabase
        .from('user_to_household')
        .update({ nickname: nickname })
        .match({ user_id: userId, household_id: currentHouseholdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (updatedUserToHousehold === null) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      return updatedUserToHousehold[0];
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

export const updateHouseholdName = createAppAsyncThunk<
  UserToHousehold,
  { householdName: string; householdId: number }
>(
  'usersToHouseholds/updateHouseholdName',
  async ({ householdName, householdId }, { rejectWithValue }) => {
    try {
      const { data: updatedUserToHousehold, error } = await supabase
        .from('user_to_household')
        .update({ household_name: householdName })
        .match({ household_id: householdId });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (updatedUserToHousehold === null) {
        console.error('No user to household found');
        return rejectWithValue('No user to household found');
      }

      return updatedUserToHousehold[0];
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

const usersToHouseholdsSlice = createSlice({
  name: 'usersToHouseholds',
  initialState: initialState,
  reducers: {},
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
