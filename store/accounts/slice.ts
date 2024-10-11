import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../database/supabase';
import { Account } from '../../types/types';

interface AccountsState {
  accounts: Account[];
  loading: 'idle' | 'pending';
  errorMessage: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading: 'idle',
  errorMessage: null,
};

export const setAccounts = createAsyncThunk(
  'accounts/setAccounts',
  async (_, { rejectWithValue }) => {
    console.log('Fetching accounts...');
    try {
      const { data: fetchedAccounts, error } = await supabase
        .from('account')
        .select('*');
      console.log('Fetched Accounts:', fetchedAccounts);

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      if (!fetchedAccounts) {
        console.error('Error while fetching accounts');
        // throw new Error("No accounts found");
      }
      if (fetchedAccounts.length === 0) {
        console.error('No accounts found');
        // throw new Error("No accounts found");
      }
      fetchedAccounts.forEach((account: any) => {
        console.log(`Account ID: ${account.id}, Account Name: ${account.name}`);
      });

      const accounts = fetchedAccounts.map((account: any) => ({
        id: account.id,
        user_name: account.user_name,
        hashed_password: account.hashed_password,
      })) as Account[];
      return accounts;
    } catch (error: any) {
      console.error('Error:', error);
      return rejectWithValue(error.message || 'Network request failed');
    }
  },
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAccounts.pending, (state) => {
      state.loading = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(setAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
      state.loading = 'idle';
    });
    builder.addCase(setAccounts.rejected, (state, action) => {
      state.loading = 'idle';
      state.errorMessage = action.payload as string;
    });
  },
});

export default accountsSlice.reducer;
