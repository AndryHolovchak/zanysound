import { TrackModel } from "../commonTypes/deezerTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface SearchState {
  result: TrackModel[];
  resultId: string;
}

const initialState: SearchState = {
  result: [],
  resultId: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchResult: (state, action: PayloadAction<TrackModel[]>) => {
      state.result = [...action.payload];
    },
    addSearchResult: (state, action: PayloadAction<TrackModel[]>) => {
      state.result = [...state.result, ...action.payload];
    },
    changeSearchResultId: (state, action: PayloadAction<string>) => {
      state.resultId = action.payload;
    },
  },
});

export const { changeSearchResult, changeSearchResultId, addSearchResult } = searchSlice.actions;

export const selectSearchResult = (state: RootState) => state.search.result;
export const selectSearchResultId = (state: RootState) => state.search.resultId;

export default searchSlice.reducer;
