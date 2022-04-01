import { AsyncContent } from "./miscTypes.d";
import { TrackModel } from "./deezerTypes.d";
import { AsyncContentState } from "../commonDefinitions/miscCommonDefinitions";

export interface Mp3Url {
  ulr: string;
  expires: string;
  canExpire: boolean;
}

export interface Mp3UrlCollection {
  [key: string]: Mp3Url;
}

export interface Playlists {
  [playlistId: string]: PlaylistModel;
}

export interface PlaylistsTracks {
  [playlistId: string]: TrackModel[];
}
