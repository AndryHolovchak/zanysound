import { Playlists, PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { PlaylistModel } from "./../commonTypes/deezerTypes.d";
import { TrackModel } from "../commonTypes/deezerTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ContentState {
  playlists: Playlists;
  playlistsTracks: PlaylistsTracks;
  recommendedTracks: TrackModel[];
}

const initialState: ContentState = {
  playlists: [],
  playlistsTracks: {},
  recommendedTracks: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    changePlaylists: (state, action: PayloadAction<Playlists>) => {
      state.playlists = { ...action.payload };
    },
    changePlaylistsTracks: (state, action: PayloadAction<PlaylistsTracks>) => {
      state.playlistsTracks = { ...action.payload };
    },
    changeRecommendedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.recommendedTracks = [...action.payload];
    },
  },
});

export const { changePlaylists, changePlaylistsTracks, changeRecommendedTracks } = contentSlice.actions;

export const selectPlaylists = (state: RootState) => state.content.playlists;
export const selectPlaylistsTracks = (state: RootState) => state.content.playlistsTracks;
export const selectRecommendedTracks = (state: RootState) => state.content.recommendedTracks;

export default contentSlice.reducer;
