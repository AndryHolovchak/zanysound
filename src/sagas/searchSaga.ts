import { parseTrack } from "../helpers/deezerDataHelper";
import { put, takeLatest } from "redux-saga/effects";
import { searchTrackApiCall } from "../helpers/deezerApiHelper";
import { changeSearchResult } from "../slices/searchSlice";
import { isLiked } from "../utils/trackUtils";

export const SEARCH_TRACK = "search/track";

export interface SearchTrackPayload {
  query: string;
  startIndex: number;
}

export interface SearchTrack {
  type: typeof SEARCH_TRACK;
  payload: SearchTrackPayload;
}

export const searchTrack = (payload: SearchTrackPayload): SearchTrack => ({
  type: SEARCH_TRACK,
  payload,
});

export function* searchTrackWatcher({ payload }: SearchTrack): any {
  const { query, startIndex } = payload;

  yield searchTrackApiCall(query, startIndex);
}

export default function* searchSaga() {
  yield takeLatest(SEARCH_TRACK, searchTrackWatcher);
}
