import classNames from "classnames";
import React, { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PlayerContext from "../../contexts/playerContext";
import { selectPlayerPaused, selectPlayerTrack } from "../../slices/playerSlice";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import styles from "./player.module.sass";

export const Player = () => {
  const playerContext = useContext(PlayerContext);
  const track = playerContext.track;

  if (!track) {
    return <></>;
  }

  const repeatClassName = classNames([styles.player__mode_control, playerContext.onRepeat && styles["player__mode_control--active"]]);
  const shuffleClassName = classNames([styles.player__shuffle, playerContext.shuffled && styles["player__shuffle--active"]]);

  return (
    <div className={styles.player}>
      <ProgressBar />
      <div className={styles.player__bottom}>
        <img src={track.album.xlCover} className={styles.player__cover} />
        <div className={styles.player__main_info}>
          <span className={styles.player__title}>{track.title}</span>
          <span className={styles.player__artist}>{track.artist.name}</span>
        </div>
        <div className={styles.player__controls}>
          <Icon name="chevron-left" className={styles.player__queue_control} onClick={playerContext.previous} />
          <Icon name={playerContext.paused ? "play" : "pause"} className={styles.player__toggle_play} onClick={playerContext.togglePlay} />
          <Icon name="chevron-right" className={styles.player__queue_control} onClick={playerContext.next} />
        </div>
        <div className={styles.player__mode_controls}>
          <Icon name="repeat-1" className={repeatClassName} onClick={playerContext.toggleRepeat} />
          <img src="/icons/shuffle.svg" className={shuffleClassName} onClick={playerContext.toggleShuffle} />
        </div>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const playerContext = useContext(PlayerContext);
  const duration = playerContext.duration || 0;
  const progress = playerContext.progress || 0;

  return (
    <div className={styles.progress_bar}>
      <div className={styles.progress_bar__progress}>{progress.toFixed(2)}</div>
      <div className={styles.progress_bar__duration}>{duration.toFixed(2)}</div>
    </div>
  );
};
