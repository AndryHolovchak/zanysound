import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackModel } from "../commonTypes/modelTypes";
import { RootState } from "../app/store";

export interface LikedState {
  tracks: TrackModel[];
}

const initialState: LikedState = {
  tracks: [],
};

export const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    changeLikedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.tracks = action.payload;
    },
  },
});

export const { changeLikedTracks } = likedSlice.actions;

export const selectLikedTrack = (state: RootState) => state.liked.tracks;

export default likedSlice.reducer;
