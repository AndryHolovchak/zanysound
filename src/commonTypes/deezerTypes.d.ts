export interface ArtistModel {
  id: string;
  name: string;
  picture: string;
  smallPicture: string;
  mediumPicture: string;
  bigPicture: string;
  xlPicture: string;
}

export interface AlbumModel {
  id: string;
  title: string;
  cover: string;
  smallCover: stinrg;
  mediumCover: string;
  bigCover: string;
  xlCover: string;
}

export interface TrackModel {
  id: string;
  title: string;
  shortTitle: string;
  rank: number;
  duration: number;
  explicitLyrics: boolean;
  album: AlbumModel;
  artist: ArtistModel;
}

export interface PlaylistModel {
  id: string;
  title: string;
  creatorId: number;
  creationDate: Date;
  isLikedTracks: boolean;
  picture: string;
  smallPicture: string;
  mediumPicture: string;
  bitPicture: string;
  xlPicture: string;
}
