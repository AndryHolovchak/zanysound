import { parseTrack } from "./../helpers/trackHelper";
import { put, takeLatest } from "redux-saga/effects";
import { searchTrackApiCall } from "../helpers/deezerApiHelper";
import { changeSearchResult } from "../slices/searchSlice";

export const SEARCH_TRACK = "search/track";

export interface SearchTrackPayload {
  query: string;
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
  const { query } = payload;

  const response = yield searchTrackApiCall(query);
  yield put(changeSearchResult(response.map((e: any) => parseTrack(e))));
}

export default function* searchSaga() {
  yield takeLatest(SEARCH_TRACK, searchTrackWatcher);
}
