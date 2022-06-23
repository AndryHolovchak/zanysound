import { FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { RequestType } from "./../commonDefinitions/miscCommonDefinitions";
import { deezerApiRequest } from "./../helpers/deezerApiHelper";
import { takeLatest } from "redux-saga/effects";

export const LOAD_PLAYLIST_TRACKS = "content/load/playlistTracks";
export const LOAD_RECOMMENDED_TRACKS = "content/load/recommendedTracks";
export const CREATE_NEW_PLAYLIST = "content/create/playlist";
export const LOAD_PLAYLIST_INFO = "content/load/playlist";
export const DELETE_PLAYLIST = "content/delete/playlist";
export const ADD_TO_PLAYLIST = "content/add/toPlaylist";
export const REMOVE_FROM_PLAYLIST = "content/remove/fromPlaylist";

export interface LoadPlaylistTracksPayload {
  playlistId: string;
}

export interface LoadRecommendedTracksPayload {
  startIndex: number;
}

export interface CreateNewPlaylistPayload {
  title: string;
}

export interface LoadPlaylistInfoPayload {
  playlistId: string;
}

export interface DeletePlaylistPayload {
  playlistId: string;
}

export interface AddToPlaylistPayload {
  trackId: string;
  playlistId: string;
}

export interface RemoveFromPlaylistPayload {
  trackId: string;
  playlistId: string;
}

export interface LoadPlaylistTracks {
  type: typeof LOAD_PLAYLIST_TRACKS;
  payload: LoadPlaylistTracksPayload;
}

export interface LoadRecommendedTracks {
  type: typeof LOAD_RECOMMENDED_TRACKS;
  payload: LoadRecommendedTracksPayload;
}

export interface CreateNewPlaylist {
  type: typeof CREATE_NEW_PLAYLIST;
  payload: CreateNewPlaylistPayload;
}

export interface LoadPlaylistInfo {
  type: typeof LOAD_PLAYLIST_INFO;
  payload: LoadPlaylistInfoPayload;
}

export interface DeletePlaylist {
  type: typeof DELETE_PLAYLIST;
  payload: DeletePlaylistPayload;
}

export interface AddToPlaylist {
  type: typeof ADD_TO_PLAYLIST;
  payload: AddToPlaylistPayload;
}

export interface RemoveFromPlaylist {
  type: typeof REMOVE_FROM_PLAYLIST;
  payload: RemoveFromPlaylistPayload;
}

export const loadPlaylistTracksAction = (payload: LoadPlaylistTracksPayload): LoadPlaylistTracks => ({
  type: LOAD_PLAYLIST_TRACKS,
  payload,
});

export const loadRecommendedTracksAction = (payload: LoadRecommendedTracksPayload): LoadRecommendedTracks => ({
  type: LOAD_RECOMMENDED_TRACKS,
  payload,
});

export const createNewPlaylistAction = (payload: CreateNewPlaylistPayload): CreateNewPlaylist => ({
  type: CREATE_NEW_PLAYLIST,
  payload,
});

export const loadPlaylistInfoAction = (payload: LoadPlaylistInfoPayload): LoadPlaylistInfo => ({
  type: LOAD_PLAYLIST_INFO,
  payload,
});

export const deletePlaylistAction = (payload: DeletePlaylistPayload): DeletePlaylist => ({
  type: DELETE_PLAYLIST,
  payload,
});

export const addToPlaylistAction = (payload: AddToPlaylistPayload): AddToPlaylist => ({
  type: ADD_TO_PLAYLIST,
  payload,
});

export const removeFromPlaylistAction = (payload: RemoveFromPlaylistPayload): RemoveFromPlaylist => ({
  type: REMOVE_FROM_PLAYLIST,
  payload,
});

function* loadPlaylistTracksWatcher({ payload }: LoadPlaylistTracks): any {
  const { playlistId } = payload;
  yield deezerApiRequest(FetchPostMessageType.GetPlaylistTracks, `/playlist/${playlistId}`);
}

function* loadRecommendedTracksWatcher({ payload }: LoadRecommendedTracks): any {
  const { startIndex } = payload;
  yield deezerApiRequest(
    FetchPostMessageType.LoadRecommendedTracks,
    `/user/me/recommendations/tracks?index=${startIndex}`
  );
}

function* createNewPlaylistWatcher({ payload }: CreateNewPlaylist) {
  const { title } = payload;
  yield deezerApiRequest(FetchPostMessageType.CreateNewPlaylist, "/user/me/playlists", { title }, RequestType.Post);
}

function* loadPlaylistInfoWatcher({ payload }: LoadPlaylistInfo) {
  const { playlistId } = payload;
  yield deezerApiRequest(FetchPostMessageType.GetPlaylistInfo, `/playlist/${playlistId}`);
}

function* deletePlaylistWatcher({ payload }: DeletePlaylist) {
  const { playlistId } = payload;

  yield deezerApiRequest(FetchPostMessageType.DeletePlaylist, `/playlist/${playlistId}`, {}, RequestType.Delete);
}

function* addToPlaylistWatcher({ payload }: AddToPlaylist) {
  const { trackId, playlistId } = payload;

  yield deezerApiRequest(
    FetchPostMessageType.AddToPlaylist,
    `/playlist/${playlistId}/tracks`,
    { songs: [trackId] },
    RequestType.Post
  );
}

function* removeFromPlaylistWatcher({ payload }: RemoveFromPlaylist) {
  const { trackId, playlistId } = payload;

  yield deezerApiRequest(
    FetchPostMessageType.RemoveFromPlaylist,
    `/playlist/${playlistId}/tracks`,
    { songs: [trackId] },
    RequestType.Delete
  );
}

export default function* contentSaga() {
  yield takeLatest(LOAD_PLAYLIST_TRACKS, loadPlaylistTracksWatcher);
  yield takeLatest(LOAD_RECOMMENDED_TRACKS, loadRecommendedTracksWatcher);
  yield takeLatest(CREATE_NEW_PLAYLIST, createNewPlaylistWatcher);
  yield takeLatest(LOAD_PLAYLIST_INFO, loadPlaylistInfoWatcher);
  yield takeLatest(DELETE_PLAYLIST, deletePlaylistWatcher);
  yield takeLatest(ADD_TO_PLAYLIST, addToPlaylistWatcher);
  yield takeLatest(REMOVE_FROM_PLAYLIST, removeFromPlaylistWatcher);
}
