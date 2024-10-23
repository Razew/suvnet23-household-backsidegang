// store/chores/slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabase';
import { RootState } from '../store';
import { Chore } from '../../types/types';

interface ChoreState {
  allChores: Chore[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage: string | null;
}

const initialState: ChoreState = {
  allChores: [],
  loading: 'idle',
  errorMessage: null,
};

export const fetchChores = createAsyncThunk(
  'chores/fetchChores',
  async (_, { rejectWithValue }) => {
    console.log('Fetching chores...');
    try {
      const { data: fetchedChores, error } = await supabase
        .from('chore')
        .select('*');
      console.log('Fetched Chores:', fetchedChores);

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
      console.error('Error while fetching chores:', error);
      return rejectWithValue(error);
    }
  },
);

const choresSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.allChores = action.payload;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});

// Selector function
export const selectAllChores = (state: RootState) => state.chores.allChores;

export default choresSlice.reducer;
