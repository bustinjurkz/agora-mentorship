import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'components/utils';
import { RootState } from './store';

interface UserSliceState {
  userId: string;
  userType: UserType | null;
}

const initialState: UserSliceState = {
  userId: '',
  userType: null,
};

export const userStoreSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserSliceState>) => {
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
  },
});

export const selectLoggedInUser = (state: RootState) => state.user;

export const { loginUser } = userStoreSlice.actions;
