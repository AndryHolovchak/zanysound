import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export interface UserState {
  name: string;
  email: string;
  picture: string;
  likedTracksIds: string[];
  likedTracks: TrackModel[];
}

const initialState: UserState = {
  name: "",
  email: "",
  picture: "",
  likedTracks: [],
  likedTracksIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changeUserPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    },
    changeLikedTracks: (state, action: PayloadAction<TrackModel[]>) => {
      state.likedTracks = [...action.payload];
    },
    changeLikedTracksIds: (state, action: PayloadAction<string[]>) => {
      state.likedTracksIds = [...action.payload];
    },
  },
});

export const { changeUserName, changeUserEmail, changeUserPicture, changeLikedTracks, changeLikedTracksIds } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserPicture = (state: RootState) => state.user.picture;
export const selectLikedTracks = (state: RootState) => state.user.likedTracks;
export const selectLikedTracksIds = (state: RootState) => state.user.likedTracksIds;

export default userSlice.reducer;
