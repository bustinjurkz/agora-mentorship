import { configureStore } from '@reduxjs/toolkit';
import { meetingStoreSlice } from './meetingSlice';
import { userStoreSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    meetings: meetingStoreSlice.reducer,
    user: userStoreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
