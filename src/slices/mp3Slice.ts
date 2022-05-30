import { Mp3Url, Mp3UrlCollection, VideoIdsCollection } from "./../commonTypes/miscTypes.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Mp3State {
  urls: Mp3UrlCollection;
  videoIds: VideoIdsCollection;
}

const initialState: Mp3State = {
  urls: {},
  videoIds: {},
};

export const mp3Slice = createSlice({
  name: "mp3",
  initialState,
  reducers: {
    changeMp3Urls: (state, action: PayloadAction<Mp3UrlCollection>) => {
      state.urls = action.payload;
    },
    setMp3Url: (state, action: PayloadAction<{ id: string; mp3Url: string }>) => {
      state.urls = {
        ...state.urls,
        [action.payload.id]: action.payload.mp3Url,
      };
    },
    setVideoId: (state, action: PayloadAction<{ trackId: string; videoId: string }>) => {
      state.videoIds = {
        ...state.videoIds,
        [action.payload.trackId]: action.payload.videoId,
      };
    },
  },
});

export const { changeMp3Urls, setMp3Url, setVideoId } = mp3Slice.actions;

export const selectMp3Urls = (state: RootState) => state.mp3.urls;
export const selectVideoIds = (state: RootState) => state.mp3.videoIds;

export default mp3Slice.reducer;
