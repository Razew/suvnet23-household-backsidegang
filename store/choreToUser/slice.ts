import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore_To_User as ChoreToUser } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface ChoresToUsersState {
  list: ChoreToUser[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ChoresToUsersState = {
  list: [],
  errorMessage: undefined,
  loading: 'idle',
};

// type NewChoreToUser = Omit<ChoreToUser, 'due_date'>;
// type OptimisticChoreToUser = ChoreToUser & { tempId: number };
type OptimisticChoreToUser = Omit<ChoreToUser, 'due_date' | 'done_date'> & {
  due_date?: string | null;
  done_date?: string | null;
  tempId: number;
};

export const fetchChoresToUsers = createAppAsyncThunk<ChoreToUser[], void>(
  'choresToUsers/fetchChoresToUsers',
  async (_, { rejectWithValue }) => {
    // console.log('Fetching chores to users...');
    try {
      const { data: fetchedChoresToUsers, error } = await supabase
        .from('chore_to_user')
        .select('*');
      // console.log('Fetched Chores To Users:', fetchedChoresToUsers);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedChoresToUsers || fetchedChoresToUsers.length === 0) {
        console.error('No chore to user found');
        return rejectWithValue('No chore to user found');
      }

      return fetchedChoresToUsers;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching chore to user');
    }
  },
);

export const addChoreToUser = createAppAsyncThunk<
  OptimisticChoreToUser,
  ChoreToUser
>(
  'choresToUsers/addChoreToUser',
  async (newChoreToUser, { rejectWithValue, dispatch }) => {
    const tempId = Date.now();
    const optimisticChoreToUser: OptimisticChoreToUser = {
      ...newChoreToUser,
      due_date: newChoreToUser.due_date?.toISOString() || null,
      done_date: newChoreToUser.done_date?.toISOString() || null,
      tempId,
    };

    dispatch(addOptimisticChoreToUser(optimisticChoreToUser));

    try {
      const { data: insertedChoreToUser, error } = await supabase
        .from('chore_to_user')
        .insert(newChoreToUser)
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        dispatch(removeOptimisticChoreToUser(tempId));
        return rejectWithValue(error.message);
      }

      // dispatch(removeOptimisticChoreToUser(tempId));
      // return insertedChoreToUser;
      return { ...insertedChoreToUser, tempId };
    } catch (error) {
      console.error(error);
      dispatch(removeOptimisticChoreToUser(tempId));
      return rejectWithValue('Error while adding chore to user');
    }
  },
);

const choresToUsersSlice = createSlice({
  name: 'choresToUsers',
  initialState: initialState,
  reducers: {
    addOptimisticChoreToUser: (
      state,
      action: PayloadAction<OptimisticChoreToUser>,
    ) => {
      state.list.push(action.payload as ChoreToUser);
    },
    removeOptimisticChoreToUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (choreToUser) =>
          (choreToUser as OptimisticChoreToUser).tempId !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChoresToUsers.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchChoresToUsers.fulfilled,
      (state, action: PayloadAction<ChoreToUser[]>) => {
        state.list = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchChoresToUsers.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
    builder.addCase(addChoreToUser.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      addChoreToUser.fulfilled,
      (state, action: PayloadAction<OptimisticChoreToUser>) => {
        const index = state.list.findIndex(
          (item) =>
            (item as OptimisticChoreToUser).tempId === action.payload.tempId,
        );
        if (index !== -1) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { tempId, ...actualChoreToUser } = action.payload;
          state.list[index] = actualChoreToUser;
        }
        state.loading = 'succeeded';
      },
    );
    builder.addCase(addChoreToUser.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const { addOptimisticChoreToUser, removeOptimisticChoreToUser } =
  choresToUsersSlice.actions;
export const choresToUsersReducer = choresToUsersSlice.reducer;

// SELECTORS
export const selectChoresToUsers = (state: RootState) =>
  state.choresToUsers.list;
export const selectChoresToUsersByChoreId =
  (choreId: number) => (state: RootState) =>
    state.choresToUsers.list.filter(
      (choreRecord) => choreRecord.chore_id === choreId,
    );
export const selectChoresToUserByUserId =
  (userId: number) => (state: RootState) =>
    state.choresToUsers.list.filter(
      (choreRecord) => choreRecord.user_id === userId,
    );
export const selectCompletedChoreToUsersByChoreId = (choreId: number) =>
  createSelector([selectChoresToUsers], (choresToUsers) =>
    choresToUsers.filter(
      (choreRecord) =>
        choreRecord.chore_id === choreId && choreRecord.is_completed,
    ),
  );
// export const selectCompletedChoresToUsers;
