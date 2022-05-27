import { FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { RequestType } from "../commonDefinitions/miscCommonDefinitions";
import { PostMessageType } from "../commonDefinitions/postMessageCommonDefinitions";

export interface PostMessageResponse {
  initiator: PostMessage;
  response: any;
}

export interface PostMessage {
  type: PostMessageType;
  payload: PostMessageFetchPayload | PostMessageMp3Payload;
}

export interface PostMessageFetchPayload {
  type: FetchPostMessageType;
  url: string;
  method: RequestType;
  body?: any;
}

export interface PostMessageMp3Payload {
  trackId: string;
}
