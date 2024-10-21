import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar } from '../../types/types';
import { supabase } from '../../utils/supabase';
import { createAppAsyncThunk } from '../hooks';
import { RootState } from '../store';

interface AvatarsState {
  list: Avatar[];
  errorMessage?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AvatarsState = {
  list: [],
  errorMessage: undefined,
  loading: 'idle',
};

export const fetchAvatars = createAppAsyncThunk<Avatar[], void>(
  'avatars/fetchAvatars',
  async (_, { rejectWithValue }) => {
    console.log('Fetching avatars...');
    try {
      const { data: fetchedAvatars, error } = await supabase
        .from('avatar')
        .select('*');
      console.log('Fetched Avatars:', fetchedAvatars);

      if (error) {
        console.error('Supabase Error:', error);
        return rejectWithValue(error.message);
      }

      if (!fetchedAvatars || fetchedAvatars.length === 0) {
        console.error('No avatars found');
        return rejectWithValue('No avatars found');
      }

      return fetchedAvatars;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Error while fetching avatars');
    }
  },
);

const avatarsSlice = createSlice({
  name: 'avatars',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvatars.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = undefined;
    });
    builder.addCase(
      fetchAvatars.fulfilled,
      (state, action: PayloadAction<Avatar[]>) => {
        state.list = action.payload;
        state.loading = 'succeeded';
      },
    );
    builder.addCase(fetchAvatars.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.loading = 'failed';
    });
  },
});

export const avatarsReducer = avatarsSlice.reducer;

// SELECTORS
export const selectAvatars = (state: RootState) => state.avatars.list;
