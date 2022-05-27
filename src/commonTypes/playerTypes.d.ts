import { TrackModel } from "./deezerTypes.d";

export interface PlayerContextValue {
  tracklistId: string;
  onRepeat: boolean;
  shuffled: boolean;
  paused: boolean;
  track: TrackModel | null;
  duration: number;
  progress: number;
  next: () => void;
  previous: () => void;
  togglePlay: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  playTrackFromTracklist: (track: TrackModel) => void;
  playNewTracklist: (id: string, tracks: TrackModel[], initTrack: TrackModel) => void;
  syncTracklist: (tracks: TrackModel[]) => void;
}
