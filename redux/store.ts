import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeetingType } from 'components/utils';
import { Meeting } from '../generated/graphql';

interface MeetingSliceState {
  upcomingMeetings: Meeting[];
  pendingMeetings: Meeting[];
  pastMeetings: Meeting[];
}
const initialState: MeetingSliceState = {
  upcomingMeetings: [],
  pendingMeetings: [],
  pastMeetings: [],
};

export const meetingStoreSlice = createSlice({
  name: 'meetingStore',
  initialState,
  reducers: {
    addMeetings: (state, action: PayloadAction<Meeting[]>) => {
      const upcomingFiltered = action.payload.filter(
        (x: Meeting) => x?.start_time && !x.end_time && !x.cancelled,
      );
      const pendingFiltered = action.payload.filter(
        (x: Meeting) => !x?.start_time && x?.proposed_times && !x.cancelled,
      );
      const pastFiltered = action.payload.filter(
        (x: Meeting) => !x?.start_time && x?.proposed_times && !x.cancelled,
      );
      state.upcomingMeetings = upcomingFiltered;
      state.pendingMeetings = pendingFiltered;
      state.pastMeetings = pastFiltered;
    },
    removeMeeting: (
      state,
      action: PayloadAction<{ meetingId: number; meetingType: MeetingType }>,
    ) => {
      switch (action.payload.meetingType) {
        case 'past':
          state.pastMeetings.filter((x) => x.id !== action.payload.meetingId);
          break;
        case 'pending':
          state.pendingMeetings.filter(
            (x) => x.id !== action.payload.meetingId,
          );
          break;
        case 'upcoming':
          state.upcomingMeetings.filter(
            (x) => x.id !== action.payload.meetingId,
          );
          break;
        default:
          break;
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    meetings: meetingStoreSlice.reducer,
  },
});

export const selectPastMeetings = (state: RootState) =>
  state.meetings.pastMeetings;

export const selectUpcomingMeetings = (state: RootState) =>
  state.meetings.upcomingMeetings;
export const selectPendingMeetings = (state: RootState) =>
  state.meetings.pendingMeetings;

export const { addMeetings, removeMeeting } = meetingStoreSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
