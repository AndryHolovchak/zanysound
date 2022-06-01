import { FetchPostMessageType, PostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { sendPostMessage } from "../utils/postMessage";
import { call, select } from "redux-saga/effects";
import { store } from "../app/store";
import { selectDeezerToken } from "../slices/deezerSlice";
import { object2queryParams } from "./../utils/urlUtils";
import { RequestType } from "../commonDefinitions/miscCommonDefinitions";

const API_URL = "https://api.deezer.com";

export function* deezerApiRequest(type: FetchPostMessageType, path: string, queryParams: object = {}, method = RequestType.Get, body: any = {}) {
  const token: string = yield select(selectDeezerToken);
  const params = object2queryParams(Object.assign(queryParams, { access_token: token }));
  const generatedPath = API_URL + path + params;
  const finallBody = method === RequestType.Get ? undefined : body;

  yield sendPostMessage({
    type: PostMessageType.Fetch,
    payload: {
      type,
      method,
      body: finallBody,
      url: generatedPath,
    },
  });
}

export const getUserInfo = async () => {
  await deezerApiRequest(FetchPostMessageType.GetUserInfo, "/user/me");
};

export function* getUserPlaylists() {
  yield deezerApiRequest(FetchPostMessageType.GetUserPlaylists, "/user/me/playlists");
}

export function* getPlaylistTracks(id: string) {
  yield deezerApiRequest(FetchPostMessageType.GetPlaylistTracks, `/playlist/${id}`);
}

export function* getPlaylistInfoApiCall(id: string) {
  yield deezerApiRequest(FetchPostMessageType.GetPlaylistInfo, `/playlist/${id}`);
}

export function* searchTrackApiCall(query: string, index: number = 0) {
  let encodedQuery = encodeURIComponent(query);
  yield deezerApiRequest(FetchPostMessageType.SearchTrack, `/search?q=${encodedQuery}&strict=off&order=RANKING&index=${index}`);
}

export function* addTrackToLikedApiCall(id: string) {
  yield deezerApiRequest(FetchPostMessageType.AddTrackToLiked, `/user/me/tracks`, { track_id: id }, RequestType.Post);
}

export function* removeTrackFromLikedApiCall(id: string) {
  yield deezerApiRequest(FetchPostMessageType.RemoveTrackFromLiked, `/user/me/tracks`, { track_id: id }, RequestType.Delete);
}

export function* loadRecommendedTracksApiCall() {
  yield deezerApiRequest(FetchPostMessageType.LoadRecommendedTracks, "/user/me/recommendations/tracks");
}

export function* createNewPlaylistApiCall(title: string) {
  yield deezerApiRequest(FetchPostMessageType.CreateNewPlaylist, "/user/me/playlists", { title }, RequestType.Post);
}

export function* deletePlaylistApiCall(id: string) {
  yield deezerApiRequest(FetchPostMessageType.DeletePlaylist, `/playlist/${id}`, {}, RequestType.Delete);
}
