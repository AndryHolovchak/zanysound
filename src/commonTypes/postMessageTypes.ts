import { FetchPostMessageType } from "./../commonDefinitions/postMessageCommonDefinitions";
import { RequestType } from "../commonDefinitions/miscCommonDefinitions";
import { PostMessageType } from "../commonDefinitions/postMessageCommonDefinitions";

export interface PostMessageResponse {
  initiator: PostMessage;
  response: any;
  networkError?: boolean;
}

export interface PostMessage {
  type: PostMessageType;
  payload: PostMessageFetchPayload | PostMessageMp3Payload;
  metainfo?: any;
}

export interface PostMessageFetchPayload {
  type: FetchPostMessageType;
  url: string;
  method: RequestType;
  body?: any;
}

export interface PostMessageMp3Payload {
  query: string;
  trackId: string;
  videoId?: string;
}
