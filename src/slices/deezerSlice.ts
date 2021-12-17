import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface DeezerState {
  deezerIsInitialized: boolean;
  token: string;
}

const initialState: DeezerState = {
  deezerIsInitialized: false,
  token: "",
};

export const deezerSlice = createSlice({
  name: "deezer",
  initialState,
  reducers: {
    changeDeezerIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.deezerIsInitialized = action.payload;
    },
    changeDeezerToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { changeDeezerIsInitialized, changeDeezerToken } = deezerSlice.actions;

export const selectDeezerIsInitialized = (state: RootState) => state.deezer.deezerIsInitialized;
export const selectDeezerToken = (state: RootState) => state.deezer.token;

export default deezerSlice.reducer;
