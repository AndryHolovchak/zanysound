import { FetchPostMessageType, PostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { sendPostMessage } from "../utils/postMessage";
import { select } from "redux-saga/effects";
import { selectDeezerToken } from "../slices/deezerSlice";
import { object2queryParams } from "./../utils/urlUtils";
import { RequestType } from "../commonDefinitions/miscCommonDefinitions";

const API_URL = "https://api.deezer.com";

export function* deezerApiRequest(
  type: FetchPostMessageType,
  path: string,
  queryParams: object = {},
  method = RequestType.Get,
  body: any = {},
  metainfo?: any
) {
  const token: string = yield select(selectDeezerToken);
  const params = object2queryParams(Object.assign(queryParams, { access_token: token }));
  const generatedPath = API_URL + path + params;
  const finallBody = method === RequestType.Get ? undefined : body;

  yield sendPostMessage({
    metainfo,
    type: PostMessageType.Fetch,
    payload: {
      type,
      method,
      body: finallBody,
      url: generatedPath,
    },
  });
}
