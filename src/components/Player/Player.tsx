import classNames from "classnames";
import React, { AnimationEvent, useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PlayerContext from "../../contexts/playerContext";
import { selectPlaylists } from "../../slices/contentSlice";
import { selectPlayerPaused, selectPlayerTrack } from "../../slices/playerSlice";
import { selectLikedTracksIds } from "../../slices/userSlice";
import Icon from "../Icon/Icon";
import { IconType } from "../Icon/iconCommonDefinition";
import { LikeButton } from "../LikeButton/LikeButton";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { TrackPopupMenu } from "../TrackPopupMenu/TrackPopupMenu";
import styles from "./player.module.sass";

export const Player = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {opened && <FullSizePlayer onClose={() => setOpened(false)} />}
      <CompactPlayer onClick={() => setOpened(true)} />
    </>
  );
};

interface FullSizePlayerProps {
  onClose: () => void;
}

const FullSizePlayer = ({ onClose }: FullSizePlayerProps) => {
  const playerContext = useContext(PlayerContext);
  const likedTracksIds = useAppSelector(selectLikedTracksIds);
  const playerPlaylists = useAppSelector(selectPlaylists);
  const playerPlaylistsIds = Object.keys(playerPlaylists);

  const [isHiding, setIsHiding] = useState(false);

  console.log(window.screen.orientation);

  const track = playerContext.track;

  if (!track) {
    return <></>;
  }

  const handleAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName.includes("player_hide-full-size-player")) {
      onClose();
    }
  };

  const containerClassName = classNames([styles.full_size_player, isHiding && styles["full_size_player--hiding"]]);

  const repeatIconClassName = classNames([
    styles.full_size_player__mode_icon,
    styles.full_size_player__mode_font_icon,
    playerContext.onRepeat && styles["full_size_player__mode_icon--active"],
  ]);

  const shuffleIconClassName = classNames([
    styles.full_size_player__mode_icon,
    styles.full_size_player__mode_svg_icon,
    playerContext.shuffled && styles["full_size_player__mode_icon--active"],
  ]);

  const parentPlaylistId = playerPlaylistsIds.find((e) => e === playerContext.tracklistId);

  return (
    <div className={containerClassName} onAnimationEnd={handleAnimationEnd}>
      <div className={styles.full_size_player__hide_click_area} onClick={() => setIsHiding(true)}>
        <Icon stopClickPropagation={false} name="angle-down" className={styles.full_size_player__close_button} />
      </div>
      <img src={track.album.xlCover} className={styles.full_size_player__background} />
      <img src={track.album.xlCover} className={styles.full_size_player__cover} />
      <div className={styles.full_size_player__top_section}>
        <div className={styles.full_size_player__top_section_text}>
          <span className={styles.full_size_player__title}>{track.title}</span>
          <span className={styles.full_size_player__artist}>{track.artist.name}</span>
        </div>
        <div className={styles.full_size_player__track_buttons}>
          <LikeButton
            className={styles.full_size_player__like}
            liked={likedTracksIds.includes(track.id)}
            track={track}
          />
          <TrackPopupMenu
            trackId={track.id}
            playlistId={parentPlaylistId}
            mainIconClassName={styles.full_size_player__popup_icon}
          />
        </div>
      </div>
      <ProgressBar className={styles.full_size_player__progress_bar} />
      <div className={styles.full_size_player__mode_controls}>
        <Icon name="repeat" className={repeatIconClassName} onClick={() => playerContext.toggleRepeat()} />
        <img src="icons/shuffle.svg" className={shuffleIconClassName} onClick={() => playerContext.toggleShuffle()} />
      </div>
      <div className={styles.full_size_player__main_controls}>
        <Icon
          name="backward"
          type={IconType.Solid}
          className={styles.full_size_player__prev_button}
          onClick={() => playerContext.previous()}
        />
        <Icon
          name={playerContext.paused ? "play" : "pause"}
          type={IconType.Solid}
          className={styles.full_size_player__toggle_play}
          onClick={() => playerContext.togglePlay()}
        />
        <Icon
          name="forward"
          type={IconType.Solid}
          className={styles.full_size_player__next_button}
          onClick={() => playerContext.next()}
        />
      </div>
    </div>
  );
};

interface CompactPlayerProps {
  onClick: () => void;
}

const CompactPlayer = ({ onClick }: CompactPlayerProps) => {
  const playerContext = useContext(PlayerContext);
  const likedTracksIds = useAppSelector(selectLikedTracksIds);
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
        <LikeButton className={styles.compact_player__like} liked={likedTracksIds.includes(track.id)} track={track} />
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
