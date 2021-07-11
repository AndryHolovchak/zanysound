import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  playlists: PlaylistModel[];
  likedTracks: TrackModel[];
}

const initialState: UserState = {
  playlists: [],
  likedTracks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserPlaylists: (state, action: PayloadAction<PlaylistModel[]>) => {
      state.playlists = action.payload;
    },
    changeLikedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.likedTracks = action.payload;
    },
  },
});

export const { changeUserPlaylists, changeLikedTracks } = userSlice.actions;

export const selectUserPlaylists = (state: RootState) => state.user.playlists;
export const selectLikedTracks = (state: RootState) => state.user.likedTracks;

export default userSlice.reducer;
