import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  likedTracksIds: string[];
  likedTracks: TrackModel[];
}

const initialState: UserState = {
  likedTracks: [],
  likedTracksIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeLikedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.likedTracks = [...action.payload];
    },
    changeLikedTracksIds: (state, action: PayloadAction<string[]>) => {
      state.likedTracksIds = [...action.payload];
    },
  },
});

export const { changeLikedTracks, changeLikedTracksIds } = userSlice.actions;

export const selectLikedTracks = (state: RootState) => state.user.likedTracks;
export const selectLikedTracksIds = (state: RootState) => state.user.likedTracksIds;

export default userSlice.reducer;
