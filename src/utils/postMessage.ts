import { put } from "redux-saga/effects";
import { handlePostMessageAction } from "./../sagas/postMessageSaga";
import { PostMessage } from "../commonTypes/postMessageTypes";
import config from "../config/config";

export function* sendPostMessage(message: PostMessage): any {
  //@ts-ignore
  const webview = window.ReactNativeWebView;

  if (webview) {
    webview.postMessage(JSON.stringify(message));
  } else {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response: Response = yield fetch(config.BACKEND_URL, {
        method: "POST",
        body: JSON.stringify(message),
        headers,
      });
      const json: any = yield response.json();

      yield put(
        handlePostMessageAction({
          message: {
            data: JSON.stringify({ initiator: message, response: json }),
          } as MessageEvent,
        })
      );
    } catch (e: any) {
      yield put(
        handlePostMessageAction({
          message: {
            data: JSON.stringify({ initiator: message, response: {}, networkError: true }),
          } as MessageEvent,
        })
      );
    }
  }
}
