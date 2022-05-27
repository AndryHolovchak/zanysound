import { TrackModel } from "./../commonTypes/deezerTypes.d";

export const getSearchQuery = (track: TrackModel) => `${track.artist.name} - ${track.title} Official Audio`;
