export enum PostMessageType {
  Fetch = "Fetch",
  Mp3 = "Mp3",
}

export enum FetchPostMessageType {
  GetUserInfo,
  GetUserPlaylists,
  GetPlaylistTracks,
  SearchTrack,
  AddTrackToLiked,
  RemoveTrackFromLiked,
  LoadRecommendedTracks,
}
