import { PlayerReadyState } from "./../commonDefinitions/playerCommonDefinitions";
import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { PlayerContextValue } from "./../commonTypes/playerTypes.d";
import React from "react";

const PlayerContext = React.createContext<PlayerContextValue>({
  tracklistId: "",
  onRepeat: false,
  shuffled: false,
  paused: false,
  track: null,
  duration: 0,
  progress: 0,
  readyState: PlayerReadyState.Waiting,
  next: () => {},
  previous: () => {},
  seek: (time: number) => {},
  togglePlay: () => {},
  toggleRepeat: () => {},
  toggleShuffle: () => {},
  playTrackFromTracklist: (track: TrackModel) => {},
  playNewTracklist: (id: string, tracks: TrackModel[], initTrack: TrackModel) => {},
  syncTracklist: (tracks: TrackModel[]) => {},
});

export const PlayerProvider = PlayerContext.Provider;

export default PlayerContext;
