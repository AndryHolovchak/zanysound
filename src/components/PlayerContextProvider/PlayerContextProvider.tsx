import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PlayerReadyState } from "../../commonDefinitions/playerCommonDefinitions";
import { PostMessageType } from "../../commonDefinitions/postMessageCommonDefinitions";
import { TrackModel } from "../../commonTypes/deezerTypes";
import { PlayerContextValue } from "../../commonTypes/playerTypes";
import PlayerContext, { PlayerProvider } from "../../contexts/playerContext";
import { retrieveMp3UrlAction } from "../../sagas/mp3Saga";
import { selectMp3Urls, selectVideoIds } from "../../slices/mp3Slice";
import { shuffle } from "../../utils/arrayUtils";
import { sendPostMessage } from "../../utils/postMessage";
import { isExpired } from "../../utils/trackUtils";
import { getSearchQuery } from "../../utils/youtubeUtils";

let lastProgressUpdataTime = Date.now();

export const PlayerContextProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const mp3 = useAppSelector(selectMp3Urls);

  const [originalQueue, setOriginalQueue] = useState<TrackModel[]>([]);
  const [currentQueue, setCurrentQueue] = useState<TrackModel[]>([]);
  const [tracklistId, setTracklistId] = useState("");
  const [track, setTrack] = useState<TrackModel | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState(true);
  const [onRepeat, setOnRepeat] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [readyState, setReadyState] = useState(PlayerReadyState.Waiting);

  useEffect(() => {
    const audioEleme = document.createElement("audio");

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

    audioEleme.onwaiting = () => setReadyState(PlayerReadyState.Waiting);
    audioEleme.oncanplay = () => setReadyState(PlayerReadyState.Ready);

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

  useEffect(() => {
    if (audio && track && !audio.getAttribute("src")) {
      const trackMp3Url = mp3[track.id];

      if (trackMp3Url && !isExpired(trackMp3Url)) {
        audio.setAttribute("src", trackMp3Url);
        audio.play();
      }
    }
  }, [track, mp3, audio]);

  const seek = (time: number) => {
    if (audio) {
      audio.currentTime = time;
      setReadyState(PlayerReadyState.Seeking);
      lastProgressUpdataTime = 0;
    }
  };

  const toggleRepeat = () => setOnRepeat(!onRepeat);

  const toggleShuffle = () => {
    if (shuffled) {
      setCurrentQueue(originalQueue);
    } else {
      setCurrentQueue(shuffle(originalQueue));
    }

    setShuffled(!shuffled);
  };

  const getValidTrackIndex = (index: number) => {
    switch (index) {
      case currentQueue.length:
        return 0;
      case -1:
        return currentQueue.length - 1;
      case -2: // if a user delets current track (findIndex will return -1) and press previous button
        return 0;
      default:
        return index;
    }
  };

  const next = () => {
    const nextTrackIndex = currentQueue.findIndex((e) => e.id === track?.id) + 1;
    const nextTrack = currentQueue[getValidTrackIndex(nextTrackIndex)];
    lastProgressUpdataTime = 0;

    playMp3(nextTrack);
  };

  const previous = () => {
    const nextTrackIndex = currentQueue.findIndex((e) => e.id === track?.id) - 1;
    const nextTrack = currentQueue[getValidTrackIndex(nextTrackIndex)];
    lastProgressUpdataTime = 0;

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
    setOriginalQueue(tracks);
    playMp3(initTrack);

    if (shuffled) {
      setCurrentQueue(shuffle(tracks));
    } else {
      setCurrentQueue(tracks);
    }
  };

  const playMp3 = async (targetTrack: TrackModel) => {
    setTrack(targetTrack);

    audio?.setAttribute("src", "");

    const targetUrl = mp3[targetTrack.id];

    if (targetUrl && !isExpired(targetUrl)) {
      audio?.setAttribute("src", targetUrl);
      audio?.play();
      // audio?.volume && (audio.volume = 0);
    } else {
      dispatch(retrieveMp3UrlAction({ track: targetTrack }));
    }
  };

  const syncTracklist = (tracks: TrackModel[]) => {
    setOriginalQueue(tracks);

    if (shuffled) {
      // keep current queue order
      const newQueue = currentQueue.filter((track) => tracks.find((e) => e.id === track.id));

      //and add new tracks
      tracks.forEach((track) => {
        if (!newQueue.find((e) => e.id === track.id)) {
          newQueue.push(track);
        }
      });

      setCurrentQueue(newQueue);
    } else {
      setCurrentQueue(tracks);
    }
  };

  const value: PlayerContextValue = {
    tracklistId,
    onRepeat,
    shuffled,
    paused,
    track,
    duration,
    progress,
    readyState,
    next,
    previous,
    seek,
    togglePlay,
    toggleRepeat,
    toggleShuffle,
    playTrackFromTracklist,
    playNewTracklist,
    syncTracklist,
  };

  return <PlayerProvider value={value}>{children}</PlayerProvider>;
};
