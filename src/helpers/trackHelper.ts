import { AlbumModel, ArtistModel, TrackModel } from "../commonTypes/modelTypes";

export const parseTrack = (trackFromApi: any): TrackModel => {
  const artist: ArtistModel = {
    id: trackFromApi.artist.id,
    name: trackFromApi.artist.name,
    picture: trackFromApi.artist.picture,
    xlPicture: trackFromApi.artist.picture_xl,
    bigPicture: trackFromApi.artist.picture_big,
    smallPicture: trackFromApi.artist.picture_small,
    mediumPicture: trackFromApi.artist.picture_medium,
  };

  const album: AlbumModel = {
    id: trackFromApi.album.id,
    title: trackFromApi.album.title,
    cover: trackFromApi.album.cover,
    xlCover: trackFromApi.album.cover_xl,
    bigCover: trackFromApi.album.cover_big,
    smallCover: trackFromApi.album.cover_small,
    mediumCover: trackFromApi.album.cover_medium,
  };

  const trackId = trackFromApi.id.toString();

  return {
    album,
    artist,
    id: trackId,
    rank: trackFromApi.rank,
    title: trackFromApi.title,
    duration: trackFromApi.duration,
    shortTitle: trackFromApi.title_short,
    explicitLyrics: trackFromApi.explicit_lyrics,
  };
};
