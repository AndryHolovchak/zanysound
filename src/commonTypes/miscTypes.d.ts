import { AsyncContent } from "./miscTypes.d";
import { TrackModel, PlaylistModel } from "./deezerTypes.d";
import { AsyncContentState } from "../commonDefinitions/miscCommonDefinitions";

export interface Mp3Url {
  url: string;
  expires: string;
}

export interface Mp3UrlCollection {
  [trackId: string]: string;
}

export interface VideoIdsCollection {
  [trackId: string]: string;
}

export interface Playlists {
  [playlistId: string]: PlaylistModel;
}

export interface PlaylistsTracks {
  [playlistId: string]: TrackModel[];
}

export interface NotificationsCollection {
  [id: string]: Notification;
}

export type Notification = {
  id: string;
  title: string;
  text?: string;
  timestamp: number;
  lifetime: number;
};
