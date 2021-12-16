import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPlayerPaused, selectPlayerTrack } from "../../slices/playerSlice";
import styles from "./player.module.sass";

export const Player = () => {
  const dispatch = useAppDispatch();
  const paused = useAppSelector(selectPlayerPaused);
  const track = useAppSelector(selectPlayerTrack);

  if (!track) {
    return <></>;
  }

  return (
    <div className={styles.player}>
      <img src={track.album.mediumCover} className={styles.player__cover} />
      <div className={styles.plauyer__main_info}>
        <span className={styles.player__title}>{track.album.title}</span>
        <span className={styles.player__artist}>{track.artist.name}</span>
      </div>
    </div>
  );
};
