import classNames from "classnames";
import React, { useContext, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PlayerContext from "../../contexts/playerContext";
import { selectPlayerPaused, selectPlayerTrack } from "../../slices/playerSlice";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./player.module.sass";

export const Player = () => {
  const [opened, setOpened] = useState(false);

  if (opened) {
    return <FullSizePlayer />;
  } else {
    return <CompactPlayer onClick={() => setOpened(true)} />;
  }
};

const FullSizePlayer = () => {
  const playerContext = useContext(PlayerContext);
  const track = playerContext.track;

  if (!track) {
    return <></>;
  }

  return (
    <div className={styles.full_size_player}>
      <img src={track.album.xlCover} className={styles.full_size_player__background} />
    </div>
  );
};

interface CompactPlayerProps {
  onClick: () => void;
}

const CompactPlayer = ({ onClick }: CompactPlayerProps) => {
  const playerContext = useContext(PlayerContext);
  const track = playerContext.track;

  if (!track) {
    return <></>;
  }

  return (
    <div className={styles.compact_player} onClick={onClick}>
      <div className={styles.compact_player__left}>
        <img src={track.album.xlCover} className={styles.compact_player__cover} />
        <div className={styles.compact_player__main_info}>
          <span className={styles.compact_player__title}>{track.title}</span>
          <span className={styles.compact_player__artist}>{track.artist.name}</span>
        </div>
      </div>
      <div className={styles.compact_player__controls}>
        <Icon
          stopClickPropagation
          name={playerContext.paused ? "play" : "pause"}
          type={IconType.Solid}
          className={styles.compact_player__toggle_play}
          onClick={playerContext.togglePlay}
        />
        <Icon
          stopClickPropagation
          name="forward"
          type={IconType.Solid}
          className={styles.compact_player__queue_control}
          onClick={playerContext.next}
        />
      </div>
    </div>
  );
};
