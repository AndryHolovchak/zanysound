import { PlayerReadyState } from "./../commonDefinitions/playerCommonDefinitions";
import { TrackModel } from "./deezerTypes.d";

export interface PlayerContextValue {
  tracklistId: string;
  onRepeat: boolean;
  shuffled: boolean;
  paused: boolean;
  track: TrackModel | null;
  duration: number;
  getProgress: () => number;
  readyState: PlayerReadyState;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  togglePlay: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  playTrackFromTracklist: (track: TrackModel) => void;
  playNewTracklist: (id: string, tracks: TrackModel[], initTrack: TrackModel) => void;
  syncTracklist: (tracks: TrackModel[]) => void;
}
