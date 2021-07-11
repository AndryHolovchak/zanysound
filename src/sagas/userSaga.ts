import { getPlaylistTracks } from "./../helpers/deezerApiHelper";
import { parsePlaylist } from "./../helpers/deezerDataHelper";
import { PlaylistModel, TrackModel } from "./../commonTypes/deezerTypes.d";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, takeLatest } from "redux-saga/effects";
import { getUserPlaylists } from "../helpers/deezerApiHelper";
import { changeLikedTracks, changeUserPlaylists } from "../slices/userSlice";

export const LOAD_BASIC_USER_INFO = "user/load/basicInfo";
export const LOAD_USER_PLAYLISTS = "user/load/playlists";

export interface LoadBasicUserInfo {
  type: typeof LOAD_BASIC_USER_INFO;
}

export interface LoadUserPlaylists {
  type: typeof LOAD_USER_PLAYLISTS;
}

export const loadBasicUserInfo = (): LoadBasicUserInfo => ({
  type: LOAD_BASIC_USER_INFO,
});

export const loadUserPlaylists = (): LoadUserPlaylists => ({
  type: LOAD_USER_PLAYLISTS,
});

export function* loadBasicUserInfoWatcher(): any {
  yield put(loadUserPlaylists());
}

export function* loadUserPlaylistsWatcher(): any {
  let response: any[] = yield getUserPlaylists();

  const playlists: PlaylistModel[] = [];

  for (const playlistJson of response) {
    const parsedPlaylist = parsePlaylist(playlistJson);

    if (parsedPlaylist.isLikedTracks) {
      const likedTracksJson: any[] = yield getPlaylistTracks(parsedPlaylist.id);
      const likedTracks: TrackModel[] = likedTracksJson.map((e) =>
        parseTrack(e)
      );
      yield put(changeLikedTracks(likedTracks.reverse()));
    } else {
      playlists.push(parsedPlaylist);
    }
  }

  yield put(changeUserPlaylists(playlists));
}

export default function* userSaga() {
  yield takeLatest(LOAD_BASIC_USER_INFO, loadBasicUserInfoWatcher);
  yield takeLatest(LOAD_USER_PLAYLISTS, loadUserPlaylistsWatcher);
}
