import { RequestType } from "./../commonDefinitions/miscCommonDefinitions";
import { FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { deezerApiRequest } from "./../helpers/deezerApiHelper";
import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { put, takeLatest } from "redux-saga/effects";

const LOAD_BASIC_USER_INFO = "user/load/basicInfo";
const LOAD_USER_PLAYLISTS = "user/load/playlists";
const ADD_TRACK_TO_LIKED = "user/add/trackToLiked";
const REMOVE_TRACK_FROM_LIKED = "user/remove/trackFromLiked";

export interface AddTrackToLikedPayload {
  track: TrackModel;
}

export interface RemoveTrackFromLikedPayload {
  track: TrackModel;
}

export interface LoadPlaylistTracksPayload {
  playlistId: string;
}

export interface LoadUserPlaylists {
  type: typeof LOAD_USER_PLAYLISTS;
}

export interface AddTrackToLiked {
  type: typeof ADD_TRACK_TO_LIKED;
  payload: AddTrackToLikedPayload;
}

export interface RemoveTrackFromLiked {
  type: typeof REMOVE_TRACK_FROM_LIKED;
  payload: RemoveTrackFromLikedPayload;
}

export const loadBasicUserInfo = () => ({
  type: LOAD_BASIC_USER_INFO,
});

export const loadUserPlaylists = (): LoadUserPlaylists => ({
  type: LOAD_USER_PLAYLISTS,
});

export const addTrackToLikedAction = (payload: AddTrackToLikedPayload): AddTrackToLiked => ({
  type: ADD_TRACK_TO_LIKED,
  payload,
});

export const removeTrackFromLikedAction = (payload: RemoveTrackFromLikedPayload): RemoveTrackFromLiked => ({
  type: REMOVE_TRACK_FROM_LIKED,
  payload,
});

function* loadBasicUserInfoWatcher() {
  yield put(loadUserPlaylists());
  yield deezerApiRequest(FetchPostMessageType.GetUserInfo, "/user/me");
}

function* loadUserPlaylistsWatcher(): any {
  yield deezerApiRequest(FetchPostMessageType.GetUserPlaylists, "/user/me/playlists");
}

function* addTrackToLikedWatcher({ payload }: AddTrackToLiked) {
  const { track } = payload;
  yield deezerApiRequest(
    FetchPostMessageType.AddTrackToLiked,
    `/user/me/tracks`,
    { track_id: track.id },
    RequestType.Post,
    {},
    { track }
  );
}

function* removeTrackFromLikedWatcher({ payload }: RemoveTrackFromLiked) {
  const { track } = payload;
  yield deezerApiRequest(
    FetchPostMessageType.RemoveTrackFromLiked,
    `/user/me/tracks`,
    { track_id: track.id },
    RequestType.Delete,
    {},
    { track }
  );
}

export default function* userSaga() {
  yield takeLatest(LOAD_BASIC_USER_INFO, loadBasicUserInfoWatcher);
  yield takeLatest(LOAD_USER_PLAYLISTS, loadUserPlaylistsWatcher);
  yield takeLatest(ADD_TRACK_TO_LIKED, addTrackToLikedWatcher);
  yield takeLatest(REMOVE_TRACK_FROM_LIKED, removeTrackFromLikedWatcher);
}
