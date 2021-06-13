import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

interface PlanState {
  region: string;
}

const initialState: PlanState = {
  region: 'Auckland',
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
  },
});

export const PlanActions = planSlice.actions;

export const PlanSelectors = {
  region: (state: RootState) => state.plan.region,
};

export default planSlice.reducer;
