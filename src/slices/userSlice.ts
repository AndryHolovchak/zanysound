import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  playlistsIds: string[];
  likedTracksIds: string[];
  likedTracks: TrackModel[];
}

const initialState: UserState = {
  playlistsIds: [],
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
    changeUserPlaylistsIds: (state, action: PayloadAction<string[]>) => {
      state.playlistsIds = [...action.payload];
    },
  },
});

export const { changeLikedTracks, changeLikedTracksIds, changeUserPlaylistsIds } = userSlice.actions;

export const selectLikedTracks = (state: RootState) => state.user.likedTracks;
export const selectLikedTracksIds = (state: RootState) => state.user.likedTracksIds;
export const selectUserPlaylistsIds = (state: RootState) => state.user.playlistsIds;

export default userSlice.reducer;
