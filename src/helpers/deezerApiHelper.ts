import { FetchPostMessageType, PostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { sendPostMessage } from "../utils/postMessage";
import { call, select } from "redux-saga/effects";
import { store } from "../app/store";
import { selectDeezerToken } from "../slices/deezerSlice";
import { object2queryParams } from "./../utils/urlUtils";
import { RequestType } from "../commonDefinitions/miscCommonDefinitions";
import { TrackModel } from "../commonTypes/deezerTypes";

const API_URL = "https://api.deezer.com";

export function* deezerApiRequest(
  type: FetchPostMessageType,
  path: string,
  queryParams: object = {},
  method = RequestType.Get,
  body: any = {},
  metainfo?: any
) {
  const token: string = yield select(selectDeezerToken);
  const params = object2queryParams(Object.assign(queryParams, { access_token: token }));
  const generatedPath = API_URL + path + params;
  const finallBody = method === RequestType.Get ? undefined : body;

  yield sendPostMessage({
    metainfo,
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

export function* searchTrackApiCall(query: string, startIndex: number) {
  let encodedQuery = encodeURIComponent(query);
  yield deezerApiRequest(FetchPostMessageType.SearchTrack, `/search?q=${encodedQuery}&strict=off&order=RANKING&index=${startIndex}`);
}

export function* addTrackToLikedApiCall(track: TrackModel) {
  yield deezerApiRequest(FetchPostMessageType.AddTrackToLiked, `/user/me/tracks`, { track_id: track.id }, RequestType.Post, {}, { track });
}

export function* removeTrackFromLikedApiCall(track: TrackModel) {
  yield deezerApiRequest(FetchPostMessageType.RemoveTrackFromLiked, `/user/me/tracks`, { track_id: track.id }, RequestType.Delete, {}, { track });
}

export function* loadRecommendedTracksApiCall(startIndex: number) {
  yield deezerApiRequest(FetchPostMessageType.LoadRecommendedTracks, `/chart/0/tracks?index=${startIndex}`);
}

export function* createNewPlaylistApiCall(title: string) {
  yield deezerApiRequest(FetchPostMessageType.CreateNewPlaylist, "/user/me/playlists", { title }, RequestType.Post);
}

export function* deletePlaylistApiCall(id: string) {
  yield deezerApiRequest(FetchPostMessageType.DeletePlaylist, `/playlist/${id}`, {}, RequestType.Delete);
}

export function* addToPlaylistApiCall(trackId: string, playlistId: string) {
  yield deezerApiRequest(FetchPostMessageType.AddToPlaylist, `/playlist/${playlistId}/tracks`, { songs: [trackId] }, RequestType.Post);
}
export function* removeFromPlaylistApiCall(trackId: string, playlistId: string) {
  yield deezerApiRequest(FetchPostMessageType.RemoveFromPlaylist, `/playlist/${playlistId}/tracks`, { songs: [trackId] }, RequestType.Delete);
}
