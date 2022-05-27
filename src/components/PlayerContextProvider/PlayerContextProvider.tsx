import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { TrackModel } from "../../commonTypes/deezerTypes";
import { PlayerContextValue } from "../../commonTypes/playerTypes";
import PlayerContext, { PlayerProvider } from "../../contexts/playerContext";
import { selectMp3Urls } from "../../slices/mp3Slice";
import { getSearchQuery } from "../../utils/youtubeUtils";

export interface PlayerContextProvider {}

export const PlayerContextProvider: React.FC<PlayerContextProvider> = ({ children }) => {
  const [tracklist, setTracklist] = useState<TrackModel[]>([]);
  const [tracklistId, setTracklistId] = useState("");
  const [track, setTrack] = useState<TrackModel | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState(true);
  const [onRepeat, setOnRepeat] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioEleme = document.createElement("audio");
    let lastProgressUpdataTime = Date.now();

    audioEleme.onpause = () => setPaused(true);
    audioEleme.onplay = () => setPaused(false);
    audioEleme.onplaying = () => setPaused(false);
    audioEleme.onabort = () => setPaused(true);
    audioEleme.ontimeupdate = () => {
      // Throttling
      if (Date.now() - lastProgressUpdataTime >= 1000) {
        setProgress(audioEleme?.currentTime || 0);
        lastProgressUpdataTime = Date.now();
      }
    };
    audioEleme.ondurationchange = () => setDuration(audioEleme.duration);

    setAudio(audioEleme);
  }, []);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        if (onRepeat) {
          audio.currentTime = 0;
          audio.play();
        } else {
          next();
        }
      };
    }
  }, [track, onRepeat, audio]);

  const toggleRepeat = () => setOnRepeat(!onRepeat);

  const toggleShuffle = () => setShuffled(!shuffled);

  const getValidTrackIndex = (index: number) => {
    switch (index) {
      case tracklist.length:
        return 0;
      case -1:
        return tracklist.length - 1;
      case -2: // if a user delets current track (findIndex will return -1) and press previous button
        return 0;
      default:
        return index;
    }
  };

  const next = () => {
    const nextTrackIndex = tracklist.findIndex((e) => e.id === track?.id) + 1;
    const nextTrack = tracklist[getValidTrackIndex(nextTrackIndex)];

    playMp3(nextTrack);
  };

  const previous = () => {
    const nextTrackIndex = tracklist.findIndex((e) => e.id === track?.id) - 1;
    const nextTrack = tracklist[getValidTrackIndex(nextTrackIndex)];

    playMp3(nextTrack);
  };

  const togglePlay = () => {
    // 4 === enough data available to start playing
    if (audio?.readyState !== 4) {
      return;
    }

    if (paused) {
      audio?.play();
    } else {
      audio?.pause();
    }
  };

  const playTrackFromTracklist = (track: TrackModel) => {
    playMp3(track);
  };

  const playNewTracklist = (id: string, tracks: TrackModel[], initTrack: TrackModel) => {
    setTracklistId(id);
    setTracklist(tracks);
    playMp3(initTrack);
  };

  const playMp3 = async (targetTrack: TrackModel) => {
    setTrack(targetTrack);

    audio?.setAttribute("src", "");

    const mp3VideoIdResponse = await fetch(`http://localhost:3001/youtube/search?q=${encodeURIComponent(getSearchQuery(targetTrack))}`);
    const mp3VideoIdJson = await mp3VideoIdResponse.json();
    const mp3VideoId = mp3VideoIdJson.id;

    const mp3UrlResponse = await fetch(`http://localhost:3001/youtube/mp3?id=${mp3VideoId}`);
    const mp3UrlJson = await mp3UrlResponse.json();
    const mp3Url = mp3UrlJson.url;

    if (mp3Url) {
      audio?.setAttribute("src", mp3Url);
      audio?.play();
      // audio?.volume && (audio.volume = 0);
    }
  };

  const syncTracklist = (tracks: TrackModel[]) => {
    setTracklist(tracks);
  };

  const value: PlayerContextValue = {
    tracklistId,
    onRepeat,
    shuffled,
    paused,
    track,
    duration,
    progress,
    next,
    previous,
    togglePlay,
    toggleRepeat,
    toggleShuffle,
    playTrackFromTracklist,
    playNewTracklist,
    syncTracklist,
  };

  return <PlayerProvider value={value}>{children}</PlayerProvider>;
};
