import { DeezerSignInStatus } from "./../commonDefinitions/deezerCommonDefinitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface DeezerState {
  deezerIsInitialized: boolean;
  signInStatus: DeezerSignInStatus;
}

const initialState: DeezerState = {
  deezerIsInitialized: false,
  signInStatus: DeezerSignInStatus.NotSignedIn,
};

export const deezerSlice = createSlice({
  name: "deezer",
  initialState,
  reducers: {
    changeDeezerIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.deezerIsInitialized = action.payload;
    },
    changeDeezerSignInStatus: (
      state,
      action: PayloadAction<DeezerSignInStatus>
    ) => {
      state.signInStatus = action.payload;
    },
  },
});

export const { changeDeezerIsInitialized, changeDeezerSignInStatus } =
  deezerSlice.actions;

export const selectDeezerIsInitialized = (state: RootState) =>
  state.deezer.deezerIsInitialized;
export const selectDeezerSignInStatus = (state: RootState) =>
  state.deezer.signInStatus;

export default deezerSlice.reducer;
