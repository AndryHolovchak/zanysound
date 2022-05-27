export enum PostMessageType {
  Fetch = "Fetch",
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
