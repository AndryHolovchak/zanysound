import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  playlists: PlaylistModel[];
  likedTracks: TrackModel[];
  likedTracksIds: string[];
}

const initialState: UserState = {
  playlists: [],
  likedTracks: [],
  likedTracksIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserPlaylists: (state, action: PayloadAction<PlaylistModel[]>) => {
      state.playlists = [...action.payload];
    },
    changeLikedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.likedTracks = [...action.payload];
    },
    changeLikedTracksIds: (state, action: PayloadAction<string[]>) => {
      state.likedTracksIds = [...action.payload];
    },
  },
});

export const { changeUserPlaylists, changeLikedTracks, changeLikedTracksIds } = userSlice.actions;

export const selectUserPlaylists = (state: RootState) => state.user.playlists;
export const selectLikedTracks = (state: RootState) => state.user.likedTracks;
export const selectLikedTracksIds = (state: RootState) => state.user.likedTracksIds;

export default userSlice.reducer;
