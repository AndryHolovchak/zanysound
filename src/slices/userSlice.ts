import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  likedTracksIds: string[];
  likedTracks: TrackModel[];
  playlists: PlaylistModel[];
  playlistsTracks: PlaylistsTracks;
}

const initialState: UserState = {
  playlists: [],
  likedTracks: [],
  likedTracksIds: [],
  playlistsTracks: {},
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
    changePlaylistsTracks: (state, action: PayloadAction<PlaylistsTracks>) => {
      state.playlistsTracks = { ...action.payload };
    },
  },
});

export const { changeUserPlaylists, changeLikedTracks, changeLikedTracksIds, changePlaylistsTracks } = userSlice.actions;

export const selectUserPlaylists = (state: RootState) => state.user.playlists;
export const selectLikedTracks = (state: RootState) => state.user.likedTracks;
export const selectLikedTracksIds = (state: RootState) => state.user.likedTracksIds;
export const selectPlaylistsTracks = (state: RootState) => state.user.playlistsTracks;

export default userSlice.reducer;
