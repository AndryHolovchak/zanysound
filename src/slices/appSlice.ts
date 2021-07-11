import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AppState {
  isMobileEnv: boolean;
}

const initialState: AppState = {
  isMobileEnv: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeIsMobileEnv: (state, action: PayloadAction<boolean>) => {
      state.isMobileEnv = action.payload;
    },
  },
});

export const { changeIsMobileEnv } = appSlice.actions;

export const selectIsMobileEnv = (state: RootState) => state.app.isMobileEnv;

export default appSlice.reducer;
