import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meeting } from '../generated/graphql';
import { isBefore } from 'date-fns';
import { RootState } from './store';
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
        (x: Meeting) =>
          x?.start_time &&
          !x.end_time &&
          !x.cancelled &&
          isBefore(new Date(), new Date(x?.start_time)),
      );
      const pendingFiltered = action.payload.filter(
        (x: Meeting) => !x?.start_time && x?.proposed_times && !x.cancelled,
      );
      const pastFiltered = action.payload.filter((x: Meeting) => x?.end_time);
      state.upcomingMeetings = upcomingFiltered;
      state.pendingMeetings = pendingFiltered;
      state.pastMeetings = pastFiltered;
    },
    removeMeeting: (state, action: PayloadAction<number>) => {
      state.pendingMeetings = state.pendingMeetings.filter(
        (x) => x.id !== action.payload,
      );

      state.upcomingMeetings = state.upcomingMeetings.filter(
        (x) => x.id !== action.payload,
      );
    },
  },
});

export const selectPastMeetings = (state: RootState) =>
  state.meetings.pastMeetings;

export const selectUpcomingMeetings = (state: RootState) =>
  state.meetings.upcomingMeetings;
export const selectPendingMeetings = (state: RootState) =>
  state.meetings.pendingMeetings;

export const { addMeetings, removeMeeting } = meetingStoreSlice.actions;
