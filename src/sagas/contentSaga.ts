import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { getPlaylistTracks, loadRecommendedTracksApiCall } from "./../helpers/deezerApiHelper";
import { PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { searchTrackApiCall } from "../helpers/deezerApiHelper";
import { changeSearchResult } from "../slices/searchSlice";
import { isLiked } from "../utils/trackUtils";
import { changePlaylistsTracks, changeRecommendedTracks, selectPlaylistsTracks } from "../slices/contentSlice";

export const LOAD_PLAYLIST_TRACKS = "content/load/playlistTracks";
export const LOAD_RECOMMENDED_TRACKS = "content/load/recommendedTracks";

export interface LoadPlaylistTracksPayload {
  playlistId: string;
}

export interface LoadPlaylistTracks {
  type: typeof LOAD_PLAYLIST_TRACKS;
  payload: LoadPlaylistTracksPayload;
}

export const loadPlaylistTracksAction = (payload: LoadPlaylistTracksPayload): LoadPlaylistTracks => ({
  type: LOAD_PLAYLIST_TRACKS,
  payload,
});

export const loadRecommendedTracksAction = () => ({
  type: LOAD_RECOMMENDED_TRACKS,
});

function* loadPlaylistTracksWatcher({ payload }: LoadPlaylistTracks): any {
  const { playlistId } = payload;
  const playlistsTracks: PlaylistsTracks = yield select(selectPlaylistsTracks);

  const tracks: any = yield getPlaylistTracks(playlistId);
  const parsedTracks: TrackModel[] = tracks.map((e: any) => parseTrack(e));

  yield put(changePlaylistsTracks({ ...playlistsTracks, [playlistId]: parsedTracks }));
}

function* loadRecommendedTracksWatcher(): any {
  const tracks: any[] = yield loadRecommendedTracksApiCall();
  const parsedTracks: TrackModel[] = tracks.map((t) => parseTrack(t));
  yield put(changeRecommendedTracks(parsedTracks));
}

export default function* contentSaga() {
  yield takeLatest(LOAD_PLAYLIST_TRACKS, loadPlaylistTracksWatcher);
  yield takeLatest(LOAD_RECOMMENDED_TRACKS, loadRecommendedTracksWatcher);
}
