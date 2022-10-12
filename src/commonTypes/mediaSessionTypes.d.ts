export type MediaSessionCallback = () => void;
export type MediaSessionSeekCallback = (time: number) => void;

export interface MediaSessionCallbacks {
  onPlay: MediaSessionCallback;
  onPause: MediaSessionCallback;
  onPlayPrevious: MediaSessionCallback;
  onPlayNext: MediaSessionCallback;
  onSeek: MediaSessionSeekCallback;
}
