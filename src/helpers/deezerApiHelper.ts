import { call, select } from "redux-saga/effects";
import { store } from "../app/store";
import { selectDeezerToken } from "../slices/deezerSlice";
import { object2queryParams } from "./../utils/urlUtils";
export enum RequestType {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
}

const API_URL = "https://api.deezer.com";

export function* deezerApiRequest(path: string, queryParams: object = {}, method = RequestType.Get, body: any = {}) {
  const token: string = yield select(selectDeezerToken);
  const params = object2queryParams(Object.assign(queryParams, { access_token: token }));
  const generatedPath = API_URL + path + params;
  const finallBody = method === RequestType.Get ? undefined : body;

  const response: Response = yield call(fetch, generatedPath, { method, body: finallBody });
  return response;
}

export function* getUserInfo() {
  let response: Response = yield deezerApiRequest("/user/me");
  let json: string = yield response.json();
  return json;
}

export function* getUserPlaylists() {
  let response: Response = yield deezerApiRequest("/user/me/playlists");
  let json: string = yield response.json();
  return json;
}

export const getPlaylistTracks = async (id: string) => {
  let response: any = await deezerApiRequest(`/playlist/${id}`);
  let json = await response.json();
  return json;
};

export const searchTrackApiCall = async (query: string, index: number = 0) => {
  let encodedQueyr = encodeURIComponent(query);
  let response: any = await deezerApiRequest(`/search?q=${encodedQueyr}&strict=off&order=RANKING&index=${index}`);
  let json = await response.json();
  return json;
};

export const addTrackToLikedApiCall = async (id: string) => {
  let response: any = await deezerApiRequest(`/user/me/tracks`, { track_id: id }, RequestType.Post);
};

export const removeTrackFromLikedApiCall = async (id: string) => {
  let response: any = await deezerApiRequest(`/user/me/tracks`, { track_id: id }, RequestType.Delete);
};

export const loadRecommendedTracksApiCall = async () => {
  let response: any = await deezerApiRequest("/user/me/recommendations/tracks");
  let json = await response.json();
  return json;
};
