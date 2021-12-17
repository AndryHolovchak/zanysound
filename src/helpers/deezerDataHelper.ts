import { AlbumModel, ArtistModel, PlaylistModel, TrackModel } from "../commonTypes/deezerTypes";

export const parseTrack = (trackFromApi: any): TrackModel => {
  const artist: ArtistModel = {
    id: trackFromApi.artist.id.toString(),
    name: trackFromApi.artist.name,
    picture: trackFromApi.artist.picture,
    xlPicture: trackFromApi.artist.picture_xl,
    bigPicture: trackFromApi.artist.picture_big,
    smallPicture: trackFromApi.artist.picture_small,
    mediumPicture: trackFromApi.artist.picture_medium,
  };

  const album: AlbumModel = {
    id: trackFromApi.album.id.toString(),
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

export const parsePlaylist = (playlistFromApi: any): PlaylistModel => {
  return {
    id: playlistFromApi.id.toString(),
    title: playlistFromApi.title,
    creatorId: playlistFromApi.creator.id,
    creationDate: new Date(playlistFromApi.creation_date),
    isLikedTracks: playlistFromApi.is_loved_track,
    picture: playlistFromApi.picture,
    smallPicture: playlistFromApi.picture_small,
    mediumPicture: playlistFromApi.picture_medium,
    bitPicture: playlistFromApi.picture_big,
    xlPicture: playlistFromApi.picture_xl,
  };
};
