import { TrackModel } from "../commonTypes/deezerTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface SearchState {
  result: TrackModel[];
}

const initialState: SearchState = {
  result: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchResult: (state, action: PayloadAction<TrackModel[]>) => {
      state.result = action.payload;
    },
  },
});

export const { changeSearchResult } = searchSlice.actions;

export const selectSearchResult = (state: RootState) => state.search.result;

export default searchSlice.reducer;
