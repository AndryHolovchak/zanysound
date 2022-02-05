import { logWarning } from "./../helpers/dev";
import { AsyncContent, PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { changePlaylistsTracks, selectLikedTracks, selectLikedTracksIds, selectPlaylistsTracks } from "./../slices/userSlice";
import { addTrackToLikedApiCall, getPlaylistTracks, removeTrackFromLikedApiCall } from "./../helpers/deezerApiHelper";
import { parsePlaylist } from "./../helpers/deezerDataHelper";
import { PlaylistModel, TrackModel } from "./../commonTypes/deezerTypes.d";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { getUserPlaylists } from "../helpers/deezerApiHelper";
import { changeLikedTracks, changeLikedTracksIds, changeUserPlaylists } from "../slices/userSlice";
import { AsyncContentState } from "../commonDefinitions/miscCommonDefinitions";

export const LOAD_BASIC_USER_INFO = "user/load/basicInfo";
export const LOAD_USER_PLAYLISTS = "user/load/playlists";
export const ADD_TRACK_TO_LIKED = "user/add/trackToLiked";
export const REMOVE_TRACK_FROM_LIKED = "user/remove/trackFromLiked";
export const LOAD_PLAYLIST_TRACKS = "user/load/playlistTracks";

export interface AddTrackToLikedPayload {
  track: TrackModel;
}

export interface RemoveTrackFromLikedPayload {
  track: TrackModel;
}

export interface LoadPlaylistTracksPayload {
  playlistId: string;
}

export interface LoadBasicUserInfo {
  type: typeof LOAD_BASIC_USER_INFO;
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

export interface LoadPlaylistTracks {
  type: typeof LOAD_PLAYLIST_TRACKS;
  payload: LoadPlaylistTracksPayload;
}

export const loadBasicUserInfo = (): LoadBasicUserInfo => ({
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

export const loadPlaylistTracksAction = (payload: LoadPlaylistTracksPayload): LoadPlaylistTracks => ({
  type: LOAD_PLAYLIST_TRACKS,
  payload,
});

function* loadBasicUserInfoWatcher(): any {
  yield put(loadUserPlaylists());
}

function* loadUserPlaylistsWatcher(): any {
  let response: any[] = yield getUserPlaylists();
  const playlists: PlaylistModel[] = [];

  for (const playlistJson of response) {
    const parsedPlaylist = parsePlaylist(playlistJson);

    if (parsedPlaylist.isLikedTracks) {
      const likedTracksJson: any[] = yield getPlaylistTracks(parsedPlaylist.id);
      const likedTracks: TrackModel[] = likedTracksJson.map((e) => parseTrack(e));
      const reversedTracks = likedTracks.reverse();

      yield put(changeLikedTracks(likedTracks));
      yield put(changeLikedTracksIds(reversedTracks.map((e) => e.id)));
    } else {
      playlists.push(parsedPlaylist);
    }
  }

  yield put(changeUserPlaylists(playlists));
}

function* addTrackToLikedWatcher({ payload }: AddTrackToLiked) {
  const { track } = payload;
  const likedTracks: TrackModel[] = yield select(selectLikedTracks);
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  yield put(changeLikedTracks([track, ...likedTracks]));
  yield put(changeLikedTracksIds([track.id, ...likedTracksIds]));

  yield addTrackToLikedApiCall(track.id);
}

function* removeTrackFromLikedWatcher({ payload }: RemoveTrackFromLiked) {
  const { track } = payload;
  const likedTracks: TrackModel[] = yield select(selectLikedTracks);
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  const trackIndex = likedTracks.indexOf(track);
  const trackIdIndex = likedTracksIds.indexOf(track.id);

  if (trackIndex === -1 && trackIdIndex === -1) {
    console.log("ERROR: The track is not liked");
    return;
  }

  if ((trackIndex === -1 && trackIdIndex !== -1) || (trackIdIndex === -1 && trackIndex !== -1)) {
    throw new Error("track ids sync error");
  }

  const newLiked = Array.from(likedTracks);
  const newLikedIds = Array.from(likedTracksIds);

  newLiked.splice(trackIndex, 1);
  newLikedIds.splice(trackIdIndex, 1);

  yield put(changeLikedTracks([...newLiked]));
  yield put(changeLikedTracksIds([...newLikedIds]));

  yield removeTrackFromLikedApiCall(track.id);
}

function* loadPlaylistTracksWatcher({ payload }: LoadPlaylistTracks): any {
  const { playlistId } = payload;
  const playlistsTracks: PlaylistsTracks = yield select(selectPlaylistsTracks);

  if (playlistsTracks[playlistId]?.state === AsyncContentState.Loading) {
    logWarning("Playlist tracks is already loading");
    return;
  }

  let tracksAsyncContent: AsyncContent<TrackModel[]> = {
    state: AsyncContentState.Loading,
    content: [],
  };

  yield put(changePlaylistsTracks({ ...playlistsTracks, [playlistId]: { ...tracksAsyncContent } }));

  try {
    const tracks: any = yield getPlaylistTracks(playlistId);
    tracksAsyncContent.content = tracks.map((e: any) => parseTrack(e));
  } catch {
    tracksAsyncContent.state = AsyncContentState.Error;
  }

  yield put(changePlaylistsTracks({ ...playlistsTracks, [playlistId]: { ...tracksAsyncContent } }));
}

export default function* userSaga() {
  yield takeLatest(LOAD_BASIC_USER_INFO, loadBasicUserInfoWatcher);
  yield takeLatest(LOAD_USER_PLAYLISTS, loadUserPlaylistsWatcher);
  yield takeLatest(ADD_TRACK_TO_LIKED, addTrackToLikedWatcher);
  yield takeLatest(REMOVE_TRACK_FROM_LIKED, removeTrackFromLikedWatcher);
  yield takeLatest(LOAD_PLAYLIST_TRACKS, loadPlaylistTracksWatcher);
}
