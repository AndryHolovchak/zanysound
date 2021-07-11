import { Mp3Url } from "./../commonTypes/miscTypes.d";
import { put, takeLatest } from "redux-saga/effects";
import config from "../config/config";
import { object2queryParams } from "../utils/urlUtils";
import { changeMp3Urls, setMp3Url } from "../slices/mp3Slice";

export const GENERATE_MP3_URL = "mp3/generate/url";

export interface GenerateMp3UrlPayload {
  title: string;
  artist: string;
  trackId: string;
}

export interface GenerateMp3Url {
  type: typeof GENERATE_MP3_URL;
  payload: GenerateMp3UrlPayload;
}

export const generateMp3Url = (
  payload: GenerateMp3UrlPayload
): GenerateMp3Url => ({
  type: GENERATE_MP3_URL,
  payload,
});

export function* generateMp3UrlWatcher({ payload }: GenerateMp3Url): any {
  const { title, artist, trackId } = payload;

  const queryParams = object2queryParams({ title, artist, deezerId: trackId });
  console.log(config.MP3_SERVER_URL + "/url/mp3" + queryParams);
  const response = yield fetch(
    config.MP3_SERVER_URL + "/url/mp3" + queryParams
  );
  const data = yield response.json();
  const mp3Url: Mp3Url = {
    ulr: data,
    expires: response.headers.get("Expires"),
    canExpire: true,
  };

  yield put(setMp3Url({ id: trackId, mp3Url }));
}

export default function* mp3Saga() {
  yield takeLatest(GENERATE_MP3_URL, generateMp3UrlWatcher);
}
