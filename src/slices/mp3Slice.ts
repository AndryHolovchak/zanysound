import { Mp3Url, Mp3UrlCollection } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Mp3State {
  urls: Mp3UrlCollection;
}

const initialState: Mp3State = {
  urls: {},
};

export const mp3Slice = createSlice({
  name: "mp3",
  initialState,
  reducers: {
    changeMp3Urls: (state, action: PayloadAction<Mp3UrlCollection>) => {
      state.urls = action.payload;
    },
    setMp3Url: (
      state,
      action: PayloadAction<{ id: string; mp3Url: Mp3Url }>
    ) => {
      state.urls = {
        ...state.urls,
        [action.payload.id]: action.payload.mp3Url,
      };
    },
  },
});

export const { changeMp3Urls, setMp3Url } = mp3Slice.actions;

export const selectMp3Urls = (state: RootState) => state.mp3.urls;

export default mp3Slice.reducer;
