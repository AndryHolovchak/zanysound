import { changePlaylistsTracks, selectPlaylists, selectPlaylistsTracks } from "./../slices/contentSlice";
import { logWarning } from "./../helpers/dev";
import { Playlists, PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { selectLikedTracks, selectLikedTracksIds } from "./../slices/userSlice";
import { addTrackToLikedApiCall, getPlaylistTracks, removeTrackFromLikedApiCall } from "./../helpers/deezerApiHelper";
import { parsePlaylist } from "./../helpers/deezerDataHelper";
import { PlaylistModel, TrackModel } from "./../commonTypes/deezerTypes.d";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { getUserPlaylists } from "../helpers/deezerApiHelper";
import { changeLikedTracks, changeLikedTracksIds } from "../slices/userSlice";
import { AsyncContentState } from "../commonDefinitions/miscCommonDefinitions";
import { changePlaylists } from "../slices/contentSlice";

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

function* loadBasicUserInfoWatcher(): any {
  yield put(loadUserPlaylists());
}

function* loadUserPlaylistsWatcher(): any {
  yield getUserPlaylists();
}

function* addTrackToLikedWatcher({ payload }: AddTrackToLiked) {
  const { track } = payload;
  yield addTrackToLikedApiCall(track);
}

function* removeTrackFromLikedWatcher({ payload }: RemoveTrackFromLiked) {
  const { track } = payload;
  yield removeTrackFromLikedApiCall(track);
}

export default function* userSaga() {
  yield takeLatest(LOAD_BASIC_USER_INFO, loadBasicUserInfoWatcher);
  yield takeLatest(LOAD_USER_PLAYLISTS, loadUserPlaylistsWatcher);
  yield takeLatest(ADD_TRACK_TO_LIKED, addTrackToLikedWatcher);
  yield takeLatest(REMOVE_TRACK_FROM_LIKED, removeTrackFromLikedWatcher);
}
