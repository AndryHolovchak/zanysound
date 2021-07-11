export interface ArtistModel {
  id: number;
  name: string;
  picture: string;
  smallPicture: string;
  mediumPicture: string;
  bigPicture: string;
  xlPicture: string;
}

export interface AlbumModel {
  id: number;
  title: string;
  cover: string;
  smallCover: stinrg;
  mediumCover: string;
  bigCover: string;
  xlCover: string;
}

export interface TrackModel {
  id: number;
  title: string;
  shortTitle: string;
  rank: number;
  duration: number;
  explicitLyrics: boolean;
  album: AlbumModel;
  artist: ArtistModel;
}
