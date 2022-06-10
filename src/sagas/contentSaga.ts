import { TrackModel } from "./../commonTypes/deezerTypes.d";
import {
  addToPlaylistApiCall,
  createNewPlaylistApiCall,
  deletePlaylistApiCall,
  getPlaylistInfoApiCall,
  getPlaylistTracks,
  loadRecommendedTracksApiCall,
  removeFromPlaylistApiCall,
} from "./../helpers/deezerApiHelper";
import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { searchTrackApiCall } from "../helpers/deezerApiHelper";
import { changeSearchResult } from "../slices/searchSlice";
import { isLiked } from "../utils/trackUtils";
import { changePlaylistsTracks, changeRecommendedTracks, selectPlaylistsTracks } from "../slices/contentSlice";

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
  yield getPlaylistTracks(playlistId);
}

function* loadRecommendedTracksWatcher({ payload }: LoadRecommendedTracks): any {
  const { startIndex } = payload;

  yield loadRecommendedTracksApiCall(startIndex);
}

function* createNewPlaylistWatcher({ payload }: CreateNewPlaylist) {
  const { title } = payload;

  yield createNewPlaylistApiCall(title);
}

function* loadPlaylistInfoWatcher({ payload }: LoadPlaylistInfo) {
  const { playlistId } = payload;

  yield getPlaylistInfoApiCall(playlistId);
}

function* deletePlaylistWatcher({ payload }: DeletePlaylist) {
  const { playlistId } = payload;

  yield deletePlaylistApiCall(playlistId);
}

function* addToPlaylistWatcher({ payload }: AddToPlaylist) {
  const { trackId, playlistId } = payload;

  yield addToPlaylistApiCall(trackId, playlistId);
}

function* removeFromPlaylistWatcher({ payload }: RemoveFromPlaylist) {
  const { trackId, playlistId } = payload;

  yield removeFromPlaylistApiCall(trackId, playlistId);
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
