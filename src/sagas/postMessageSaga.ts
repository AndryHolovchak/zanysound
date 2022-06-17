import { searchTrack } from "./searchSaga";
import {
  changeUserEmail,
  changeUserName,
  changeUserPicture,
  selectLikedTracks,
  selectLikedTracksIds,
} from "./../slices/userSlice";
import { loadPlaylistInfoAction, loadPlaylistTracksAction, loadRecommendedTracksAction } from "./contentSaga";
import { copyObject, createNotificationItem, generateId } from "./../utils/common";
import { getPlaylistTracks } from "./../helpers/deezerApiHelper";
import { Playlists, PlaylistsTracks } from "./../commonTypes/miscTypes.d";
import {
  selectPlaylists,
  changePlaylists,
  selectPlaylistsTracks,
  changePlaylistsTracks,
  changeRecommendedTracks,
  selectRecommendedTracks,
  addRecommendedTracks,
} from "./../slices/contentSlice";
import { parsePlaylist } from "./../helpers/deezerDataHelper";
import { PlaylistModel, TrackModel } from "./../commonTypes/deezerTypes.d";
import { PostMessageType, FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { PostMessage, PostMessageFetchPayload, PostMessageResponse } from "./../commonTypes/postMessageTypes";
import { parseTrack } from "../helpers/deezerDataHelper";
import { put, select, takeLatest } from "redux-saga/effects";
import { addSearchResult, changeSearchResult, changeSearchResultId, selectSearchResult } from "../slices/searchSlice";
import { changeLikedTracks, changeLikedTracksIds } from "../slices/userSlice";
import { setMp3Url, setVideoId } from "../slices/mp3Slice";
import { addNotification } from "../slices/notificationSlice";
import config from "../config/config";
import { NotificationType } from "../commonDefinitions/miscCommonDefinitions";

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
  const { initiator, response } = parsed;
  const networkError = parsed.networkError;

  if (networkError) {
    console.log("Network Error");
    yield put(addNotification(createNotificationItem(NotificationType.Error, "No internet connection")));
    return;
  }

  //hande fetch response
  if (initiator.type === PostMessageType.Fetch) {
    const initiatorPayload = initiator.payload as PostMessageFetchPayload;

    switch (initiatorPayload.type) {
      case FetchPostMessageType.GetUserInfo:
        yield handleGetUserInfo(response);
        break;
      case FetchPostMessageType.GetUserPlaylists:
        yield handleGetUserPlaylist(response.data);
        break;
      case FetchPostMessageType.GetPlaylistTracks:
        yield handleGetPlaylistTracks(response);
        break;
      case FetchPostMessageType.GetPlaylistInfo:
        yield handleGetPlaylistInfo(response);
        break;
      case FetchPostMessageType.SearchTrack:
        yield handleSearchTrack(initiator, response);
        break;
      case FetchPostMessageType.LoadRecommendedTracks:
        yield handleLoadRecomendedTracks(response.data);
        break;
      case FetchPostMessageType.CreateNewPlaylist:
        yield handleCreateNewPlaylistResponse(response);
        break;
      case FetchPostMessageType.DeletePlaylist:
        yield handleDeletePlaylistResponse(initiator, response);
        break;
      case FetchPostMessageType.AddToPlaylist:
      case FetchPostMessageType.RemoveFromPlaylist:
        yield handlePlaylistTracksChangeResponse(initiator, response);
        break;
      case FetchPostMessageType.AddTrackToLiked:
        yield handleAddToLikedResponse(initiator);
        break;
      case FetchPostMessageType.RemoveTrackFromLiked:
        yield handleRemoveFromLikedResponse(initiator);
        break;
    }
  } else if (initiator.type === PostMessageType.Mp3) {
    yield handleMp3Response(response.data);
  }
}

function* handleGetUserInfo(response: any) {
  const { name, email, picture_xl } = response;

  yield put(changeUserName(name));
  yield put(changeUserEmail(email));
  yield put(changeUserPicture(picture_xl));
}

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

function* handleGetPlaylistInfo(response: any) {
  const allPlaylists: Playlists = yield select(selectPlaylists);
  const playlistsTracks: PlaylistsTracks = yield select(selectPlaylistsTracks);

  const parsedPlaylist = parsePlaylist(response);
  const parsedTracks: TrackModel[] = response.tracks.data.map((e: any) => parseTrack(e));

  yield put(changePlaylists({ ...allPlaylists, [parsedPlaylist.id]: parsedPlaylist }));
  yield put(changePlaylistsTracks({ ...playlistsTracks, [parsedPlaylist.id]: parsedTracks }));
}

function* handleSearchTrack(initiator: PostMessage, response: any) {
  const searchResult: TrackModel[] = yield select(selectSearchResult);

  if (!searchResult.length) {
    yield put(changeSearchResultId(generateId()));
  }

  if (!response.data.length) {
    yield put(changeSearchResult(null));
    return;
  }

  yield put(addSearchResult(response.data.map((e: any) => parseTrack(e))));

  const numberOfTracks = searchResult.length + response.data.length;

  if (numberOfTracks < config.NUMBER_OF_SEARCH_TRACKS && numberOfTracks < response.total) {
    yield put(searchTrack({ query: initiator.metainfo?.query, startIndex: numberOfTracks }));
  }
}

function* handleLoadRecomendedTracks(response: any[]) {
  const parsedTracks: TrackModel[] = response.map((t) => parseTrack(t));
  yield put(addRecommendedTracks(parsedTracks));

  const recommendedTracks: TrackModel[] = yield select(selectRecommendedTracks);

  if (recommendedTracks.length < config.NUMBER_OF_RECOMMENDED_TRACKS) {
    yield put(loadRecommendedTracksAction({ startIndex: recommendedTracks.length }));
  }
}

function* handleCreateNewPlaylistResponse(response: any) {
  const { id } = response;

  yield put(loadPlaylistInfoAction({ playlistId: id }));
}

function* handleDeletePlaylistResponse(message: PostMessage, response: any) {
  if (response) {
    const playlists: Playlists = yield select(selectPlaylists);
    const playlistsTracks: PlaylistsTracks = yield select(selectPlaylistsTracks);

    const playlistsCopy = copyObject(playlists);
    const playlistsTracksCopy = copyObject(playlistsTracks);

    const url = new URL((message.payload as PostMessageFetchPayload).url);

    const pathnameArray = url.pathname.split("/");
    const playlistId = pathnameArray[pathnameArray.length - 1];

    delete playlistsCopy[playlistId];
    delete playlistsTracksCopy[playlistId];

    yield put(changePlaylists(playlistsCopy));
    yield put(changePlaylistsTracks(playlistsTracksCopy));
  } else {
    //TODO: show error
  }
}

function* handleMp3Response(response: any) {
  const { trackId, videoId, mp3 } = response;

  yield put(
    setMp3Url({
      id: trackId,
      mp3Url: mp3,
    })
  );
  yield put(setVideoId({ trackId, videoId }));
}

function* handlePlaylistTracksChangeResponse(initiator: PostMessage, response: any) {
  if (response && !response.error) {
    const payload = initiator.payload as PostMessageFetchPayload;
    const url = new URL(payload.url);
    const playlistId = url.pathname.split("/")[2];
    console.log(playlistId);

    yield put(loadPlaylistTracksAction({ playlistId }));
    yield put(addNotification(createNotificationItem(NotificationType.Success, "Track added to the playlist")));
  } else {
    yield put(addNotification(createNotificationItem(NotificationType.Error, "Track is already in this playlist")));
  }
}

function* handleAddToLikedResponse(initiator: PostMessage) {
  const track = initiator.metainfo?.track;

  if (track) {
    const likedTracks: TrackModel[] = yield select(selectLikedTracks);
    const likedTracksIds: string[] = yield select(selectLikedTracksIds);

    yield put(changeLikedTracks([track, ...likedTracks]));
    yield put(changeLikedTracksIds([track.id, ...likedTracksIds]));
  } else {
    console.error("There is no track in metainfo object");
  }
}

function* handleRemoveFromLikedResponse(initiator: PostMessage) {
  const track = initiator.metainfo?.track;

  if (!track) {
    console.error("There is no track in metainfo object");
    return;
  }

  const likedTracks: TrackModel[] = yield select(selectLikedTracks);
  const likedTracksIds: string[] = yield select(selectLikedTracksIds);

  const trackIndex = likedTracks.findIndex((e) => e.id === track.id);
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
}

export default function* poseMessageSaga() {
  yield takeLatest(HANDLE_POST_MESSAGE, handlePostMessageWatcher);
}
