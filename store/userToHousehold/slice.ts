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

type UniqueUserToHousehold = Pick<UserToHousehold, 'user_id' | 'household_id'>;

type UpdateUserToHousehold = UniqueUserToHousehold &
  Partial<Omit<UserToHousehold, 'user_id' | 'household_id'>>;

export type NicknameAndIds = {
  nickname: string;
  userId: number;
  currentHouseholdId: number;
};

export const fetchUsersToHouseholds = createAppAsyncThunk<
  UserToHousehold[],
  void
>('userToHousehold/fetchUsersToHouseholds', async (_, { rejectWithValue }) => {
  try {
    const { data: fetchedUsersToHouseholds, error } = await supabase
      .from('user_to_household')
      .select('*');

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
});

export const updateUserToHousehold = createAppAsyncThunk<
  UserToHousehold,
  UpdateUserToHousehold
>(
  'userToHousehold/updateUserToHousehold',
  async (updateUserData, { rejectWithValue }) => {
    try {
      const { data: updatedUserToHousehold, error } = await supabase
        .from('user_to_household')
        .update(updateUserData)
        .match({
          user_id: updateUserData.user_id,
          household_id: updateUserData.household_id,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return updatedUserToHousehold;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while updating user to household');
    }
  },
);

export const deleteUserToHousehold = createAppAsyncThunk<
  UniqueUserToHousehold,
  UniqueUserToHousehold
>(
  'userToHousehold/deleteUserToHousehold',
  async (deleteUserData, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('user_to_household')
        .delete()
        .match({
          user_id: deleteUserData.user_id,
          household_id: deleteUserData.household_id,
        });

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return deleteUserData;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while deleting user from household');
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
    builder.addCase(updateUserToHousehold.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      updateUserToHousehold.fulfilled,
      (state, action: PayloadAction<UserToHousehold>) => {
        const targetUser = state.list.find(
          (user) =>
            user.user_id === action.payload.user_id &&
            user.household_id === action.payload.household_id,
        );
        if (targetUser) {
          Object.assign(targetUser, action.payload);
        }
        if (
          state.current?.user_id === action.payload.user_id &&
          state.current.household_id === action.payload.household_id
        ) {
          state.current = action.payload;
        }
        state.loading = 'succeeded';
      },
    );
    builder.addCase(updateUserToHousehold.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
    builder.addCase(deleteUserToHousehold.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      deleteUserToHousehold.fulfilled,
      (state, action: PayloadAction<UniqueUserToHousehold>) => {
        state.list = state.list.filter(
          (user) =>
            !(
              user.user_id === action.payload.user_id &&
              user.household_id === action.payload.household_id
            ),
        );
        state.loading = 'succeeded';
      },
    );
    builder.addCase(deleteUserToHousehold.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const { setCurrentProfile } = usersToHouseholdsSlice.actions;
export const usersToHouseholdsReducer = usersToHouseholdsSlice.reducer;

// SELECTORS
export const selectUsersToHouseholds = (state: RootState) =>
  state.usersToHouseholds.list;
export const selectCurrentProfile = (state: RootState) =>
  state.usersToHouseholds.current;
