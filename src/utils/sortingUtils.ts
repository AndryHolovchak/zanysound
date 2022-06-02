import { PlaylistModel } from "../commonTypes/deezerTypes";

export const sortPlaylistsByDate = (a: PlaylistModel, b: PlaylistModel) => +new Date(b.creationDate) - +new Date(a.creationDate);
