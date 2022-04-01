import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { PlaylistModel } from "../../commonTypes/deezerTypes";
import styles from "./playlistPreview.module.sass";

export interface PlaylistPreviewProps {
  playlistModel: PlaylistModel;
}

export const PlaylistPreview = ({ playlistModel }: PlaylistPreviewProps) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/playlist/${playlistModel.id}`);
  };

  return (
    <div className={styles.playlist_preview} onClick={handleClick}>
      <img className={styles.playlist_preview__cover} src={playlistModel.xlPicture} alt="" />
      <div className={styles.playlist_preview__right_side}>
        <span className={styles.playlist_preview__title}>{playlistModel.title}</span>
      </div>
    </div>
  );
};
