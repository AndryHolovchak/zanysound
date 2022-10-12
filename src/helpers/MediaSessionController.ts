import { TrackModel } from "./../commonTypes/deezerTypes.d";
import { MediaSessionCallbacks } from "../commonTypes/mediaSessionTypes";

export default class MediaSessionController {
  private readonly callbacks: MediaSessionCallbacks;

  constructor(callbacks: MediaSessionCallbacks) {
    this.callbacks = { ...callbacks };

    if (this.hasMediaSession()) {
      //@ts-ignore
      navigator.mediaSession.setActionHandler("play", this.callbacks.onPlay);
      //@ts-ignore
      navigator.mediaSession.setActionHandler("play", this.callbacks.onPlay);
      //@ts-ignore
      navigator.mediaSession.setActionHandler("previoustrack", this.callbacks.onPlayPrevious);
      //@ts-ignore
      navigator.mediaSession.setActionHandler("nexttrack", this.callbacks.onPlayPrevious);
    }
  }

  updateMedatada(track: TrackModel, isPlaying: boolean) {
    if (this.hasMediaSession()) {
      if (track) {
        //@ts-ignore
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist.name,
          album: track.album.title,
          // artwork: [
          //   {
          //     src: track.album.smallCover,
          //     sizes: "96x96",
          //     type: "image/jpeg",
          //   },
          //   {
          //     src: track.album.mediumCover,
          //     sizes: "128x128",
          //     type: "image/jpeg",
          //   },
          //   {
          //     src: track.album.mediumCover,
          //     sizes: "192x192",
          //     type: "image/jpeg",
          //   },
          //   {
          //     src: track.album.bigCover,
          //     sizes: "256x256",
          //     type: "image/jpeg",
          //   },
          //   {
          //     src: track.album.xlCover,
          //     sizes: "384x384",
          //     type: "image/jpeg",
          //   },
          //   {
          //     src: track.album.xlCover,
          //     sizes: "512x512",
          //     type: "image/jpeg",
          //   },
          // ],
        });
        //@ts-ignore
        navigator.mediaSession.playbackState = "playing";
        console.log("UPDATED");
      } else {
        return;
        //@ts-ignore
        navigator.mediaSession.metadata = null;
        //@ts-ignore
        navigator.mediaSession.playbackState = "none";
      }
    }
  }

  private hasMediaSession(): boolean {
    return "mediaSession" in navigator;
  }
}
