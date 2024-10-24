import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chore } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface ChoresState {
  list: Chore[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ChoresState = {
  list: [],
  errorMessage: undefined,
  loading: 'idle',
};

type NewChorePayload = Omit<
  Chore,
  'id' | 'voice_recording' | 'image' | 'is_active' | 'is_archived'
>;

type UpdateChorePayload = Partial<
  Omit<Chore, 'household_id' | 'voice_recording' | 'image'>
> & { id: number };

export const fetchChores = createAppAsyncThunk<Chore[], void>(
  'chores/fetchChores',
  async (_, { rejectWithValue }) => {
    try {
      const { data: fetchedChores, error } = await supabase
        .from('chore')
        .select('*');

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedChores || fetchedChores.length === 0) {
        console.error('No chores found');
        return rejectWithValue('No chores found');
      }

      return fetchedChores;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching chores');
    }
  },
);

export const addChore = createAppAsyncThunk<Chore, NewChorePayload>(
  'chores/addChore',
  async (newChore, { rejectWithValue }) => {
    try {
      const { data: insertedChore, error } = await supabase
        .from('chore')
        .insert(newChore)
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      return insertedChore;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while adding chore');
    }
  },
);

const choresSlice = createSlice({
  name: 'chores',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChores.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchChores.fulfilled,
      (state, action: PayloadAction<Chore[]>) => {
        state.list = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchChores.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
    builder.addCase(addChore.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      addChore.fulfilled,
      (state, action: PayloadAction<Chore>) => {
        state.list.push(action.payload);
        state.loading = 'succeeded';
      },
    );
    builder.addCase(addChore.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const choresReducer = choresSlice.reducer;

// SELECTORS
export const selectChores = (state: RootState) => state.chores.list;
export const selectChoreById = (id: number) => (state: RootState) =>
  state.chores.list.find((chore) => chore.id === id);
export const selectActiveChores = (state: RootState) =>
  state.chores.list.filter((chore) => chore.is_active && !chore.is_archived);
