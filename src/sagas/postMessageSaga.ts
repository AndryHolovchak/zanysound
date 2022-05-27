import { generateId } from "./../utils/common";
import { getPlaylistTracks } from "./../helpers/deezerApiHelper";
import { Playlists, PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import { selectPlaylists, changePlaylists, selectPlaylistsTracks, changePlaylistsTracks, changeRecommendedTracks } from "./../slices/contentSlice";
import { parsePlaylist } from "./../helpers/deezerDataHelper";
import { PlaylistModel, TrackModel } from "./../commonTypes/deezerTypes.d";
import { PostMessageType, FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { PostMessageFetchPayload, PostMessageResponse } from "./../commonTypes/postMessageTypes";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { searchTrackApiCall } from "../helpers/deezerApiHelper";
import { changeSearchResult, changeSearchResultId } from "../slices/searchSlice";
import { isLiked } from "../utils/trackUtils";
import { changeLikedTracks, changeLikedTracksIds, changeUserPlaylistsIds } from "../slices/userSlice";

const HANDLE_POST_MESSAGE = "postMessage/handle";

interface HandlePostMessagePayload {
  message: MessageEvent;
}

interface HandlePostMessage {
  type: typeof HANDLE_POST_MESSAGE;
  payload: HandlePostMessagePayload;
}

export const handlePostMessageAction = (payload: HandlePostMessagePayload): HandlePostMessage => ({
  type: HANDLE_POST_MESSAGE,
  payload,
});

export function* handlePostMessageWatcher({ payload }: HandlePostMessage): any {
  const { message } = payload;

  const parsed: PostMessageResponse = JSON.parse(message.data);
  const initiator = parsed.initiator;
  const response = parsed.response;

  //hande fetch response
  if (initiator.type === PostMessageType.Fetch) {
    const initiatorPayload = initiator.payload as PostMessageFetchPayload;

    switch (initiatorPayload.type) {
      case FetchPostMessageType.GetUserInfo:
        yield handleGetUserInfo(response.data);
        break;
      case FetchPostMessageType.GetUserPlaylists:
        yield handleGetUserPlaylist(response.data);
        break;
      case FetchPostMessageType.GetPlaylistTracks:
        yield handleGetPlaylistTracks(response);
        break;
      case FetchPostMessageType.SearchTrack:
        yield handleSearchTrack(response.data);
        break;
      case FetchPostMessageType.AddTrackToLiked:
      case FetchPostMessageType.RemoveTrackFromLiked:
        //Nothing to handle so far
        break;
      case FetchPostMessageType.LoadRecommendedTracks:
        yield handleLoadRecomendedTracks(response.data);
    }
  }
}

function* handleGetUserInfo(response: any) {}

function* handleGetUserPlaylist(response: any[]) {
  const receivedPlaylists: PlaylistModel[] = [];
  let likedPlaylist: PlaylistModel | null = null;

  for (const playlistJson of response) {
    const parsedPlaylist = parsePlaylist(playlistJson);

    if (parsedPlaylist.isLikedTracks) {
      likedPlaylist = parsedPlaylist;
    } else {
      receivedPlaylists.push(parsedPlaylist);
    }
  }
  const allPlaylists: Playlists = yield select(selectPlaylists);

  const playlistsObject: Playlists = {};

  receivedPlaylists.forEach((item) => {
    playlistsObject[item.id] = item;
  });

  yield put(changePlaylists({ ...allPlaylists, ...playlistsObject }));
  yield put(changeUserPlaylistsIds(receivedPlaylists.map((p) => p.id)));

  //load liked tracks
  if (likedPlaylist) {
    yield getPlaylistTracks(likedPlaylist.id);
  }
}

function* handleGetPlaylistTracks(response: any) {
  const playlist = parsePlaylist(response);

  const playlistsTracks: PlaylistsTracks = yield select(selectPlaylistsTracks);
  const parsedTracks: TrackModel[] = response.tracks.data.map((e: any) => parseTrack(e));

  if (playlist.isLikedTracks) {
    const reversedTracks = parsedTracks.reverse();
    yield put(changeLikedTracks(parsedTracks));
    yield put(changeLikedTracksIds(reversedTracks.map((e) => e.id)));
  } else {
    yield put(changePlaylistsTracks({ ...playlistsTracks, [playlist.id]: parsedTracks }));
  }
}

function* handleSearchTrack(response: any[]) {
  yield put(changeSearchResult(response.map((e: any) => parseTrack(e))));
  yield put(changeSearchResultId(generateId()));
}

function* handleLoadRecomendedTracks(response: any[]) {
  const parsedTracks: TrackModel[] = response.map((t) => parseTrack(t));
  yield put(changeRecommendedTracks(parsedTracks));
}

export default function* poseMessageSaga() {
  yield takeLatest(HANDLE_POST_MESSAGE, handlePostMessageWatcher);
}
