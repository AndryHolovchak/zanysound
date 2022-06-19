import { RequestType } from "./../commonDefinitions/miscCommonDefinitions";
import { FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { takeLatest } from "redux-saga/effects";
import { deezerApiRequest } from "../helpers/deezerApiHelper";

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

  const encodedQuery = encodeURIComponent(query);
  yield deezerApiRequest(
    FetchPostMessageType.SearchTrack,
    `/search?q=${encodedQuery}&strict=off&order=RANKING&index=${startIndex}`,
    {},
    RequestType.Get,
    {},
    { query }
  );
}

export default function* searchSaga() {
  yield takeLatest(SEARCH_TRACK, searchTrackWatcher);
}
