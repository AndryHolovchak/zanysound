export enum PostMessageType {
  Fetch = "Fetch",
  Mp3 = "Mp3",
}

export enum FetchPostMessageType {
  GetUserInfo,
  GetUserPlaylists,
  GetPlaylistTracks,
  GetPlaylistInfo,
  SearchTrack,
  AddTrackToLiked,
  RemoveTrackFromLiked,
  LoadRecommendedTracks,
  CreateNewPlaylist,
  DeletePlaylist,
}
