import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface DeezerState {
  token: string;
}

const initialState: DeezerState = {
  token: "fr0P5wwenb9sKu523vT6rCFPetPrvXJiZx3wqpbj9mI94aD9jN",
};

export const deezerSlice = createSlice({
  name: "deezer",
  initialState,
  reducers: {
    changeDeezerToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { changeDeezerToken } = deezerSlice.actions;

export const selectDeezerToken = (state: RootState) => state.deezer.token;

export default deezerSlice.reducer;
