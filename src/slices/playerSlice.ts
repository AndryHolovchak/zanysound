import { TrackModel } from "../commonTypes/deezerTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface PlayerState {
  paused: boolean;
  track: TrackModel | null;
}

const initialState: PlayerState = {
  paused: false,
  track: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changePlayerPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    changePlayerTrack: (state, action: PayloadAction<TrackModel>) => {
      state.track = action.payload;
    },
  },
});

export const { changePlayerPaused, changePlayerTrack } = playerSlice.actions;

export const selectPlayerPaused = (state: RootState) => state.player.paused;
export const selectPlayerTrack = (state: RootState) => state.player.track;

export default playerSlice.reducer;
