import { getSearchQuery } from "./../utils/youtubeUtils";
import { PostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { Mp3Url } from "./../commonTypes/miscTypes.d";
import { put, select, takeLatest } from "redux-saga/effects";
import config from "../config/config";
import { object2queryParams } from "../utils/urlUtils";
import { selectVideoIds, setMp3Url } from "../slices/mp3Slice";
import { sendPostMessage } from "../utils/postMessage";

export const RETRIEVE_MP3_URL = "mp3/retrieve/url";

export interface RetrieveMp3UrlPayload {
  track: TrackModel;
}

export interface RetrieveMp3Url {
  type: typeof RETRIEVE_MP3_URL;
  payload: RetrieveMp3UrlPayload;
}

export const retrieveMp3UrlAction = (payload: RetrieveMp3UrlPayload): RetrieveMp3Url => ({
  type: RETRIEVE_MP3_URL,
  payload,
});

function* retrieveMp3UrlWatcher({ payload }: RetrieveMp3Url): any {
  const { track } = payload;
  const videoIds = yield select(selectVideoIds);

  yield sendPostMessage({
    type: PostMessageType.Mp3,
    payload: {
      query: getSearchQuery(track),
      trackId: track.id,
      videoId: videoIds[track.id],
    },
  });
}

export default function* mp3Saga() {
  yield takeLatest(RETRIEVE_MP3_URL, retrieveMp3UrlWatcher);
}
